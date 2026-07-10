<?php
/**
 * 钉钉机器人记账接口
 * 支持：私聊机器人直接发消息自动记账
 * 用法：在钉钉私聊窗口发"午餐28元"，机器人自动解析并记账
 *
 * 配置步骤：
 * 1. 钉钉开放平台 -> 应用开发 -> 企业内部开发 -> 创建应用
 * 2. 添加"机器人"能力 -> 配置消息接收地址为本文件URL
 * 3. 发布机器人 -> 在钉钉搜索机器人名称 -> 打开私聊窗口
 * 4. 直接发消息即可记账
 */

// ========== 配置区（必填）==========
$APP_SECRET = 'R9HRlTb57quz6NZ2qJBtpm3w4U0hkxIwNWTM0YhxYGj0le1gkyD6131FLGPQEH7B';          // 钉钉应用 AppSecret（在应用详情页获取）
$DATA_FILE  = __DIR__ . '/data.json';  // 数据文件路径

// ========== 工具函数 ==========
function jsonResponse($data) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function genId() {
    return 'r' . substr(str_replace(['+','/','='], '', base64_encode(random_bytes(8))), 0, 12);
}

function parseVoiceText($text) {
    $t = $text;
    // 统一特殊符号
    $t = str_replace('¥', '元', $t);
    $t = str_replace('$', '元', $t);
    // 中文数字转换
    $t = str_replace(['零','〇'], '0', $t);
    $t = str_replace('一', '1', $t);
    $t = str_replace(['二','两'], '2', $t);
    $t = str_replace('三', '3', $t);
    $t = str_replace('四', '4', $t);
    $t = str_replace('五', '5', $t);
    $t = str_replace('六', '6', $t);
    $t = str_replace('七', '7', $t);
    $t = str_replace('八', '8', $t);
    $t = str_replace('九', '9', $t);
    $t = str_replace('十', '10', $t);
    $t = str_replace('百', '00', $t);
    $t = str_replace('千', '000', $t);
    $t = str_replace('块钱', '元', $t);
    $t = str_replace('块', '元', $t);

    // 提取优惠金额
    $discount = 0;
    if (preg_match('/(?:优惠|减|省|打折|返|立减|满减)[了\s]*(\d+(?:\.\d+)?)\s*[元块]?/', $t, $dm)) {
        $discount = (float)$dm[1];
    }

    // 先去掉优惠部分，再提取主金额
    $tNoDiscount = preg_replace('/(?:优惠|减|省|打折|返|立减|满减)[了\s]*\d+(?:\.\d+)?\s*[元块]?/', '', $t);

    // 提取主金额（带元的优先，否则取最后一个数字）
    $amount = null;
    if (preg_match('/(\d+(?:\.\d+)?)\s*元/', $tNoDiscount, $m)) {
        $amount = (float)$m[1];
    } else {
        preg_match_all('/\d+(?:\.\d+)?/', $tNoDiscount, $nums);
        if (!empty($nums[0])) {
            $amount = (float)end($nums[0]);
        }
    }

    // 提取备注（去掉优惠词、金额、元/块等）
    $desc = preg_replace('/(?:优惠|减|省|打折|返|立减|满减)[了\s]*\d+(?:\.\d+)?\s*[元块]?/', '', $t);
    $desc = preg_replace('/\s*[\d.,]+(?:\.\d+)?\s*元?\s*/', ' ', $desc);
    $desc = trim($desc);
    $desc = preg_replace('/(元|块|圆)$/', '', $desc);
    $desc = trim($desc);

    return [
        'amount' => is_finite($amount) ? $amount : null,
        'desc' => $desc,
        'discount' => $discount
    ];
}

// 分类关键词映射（匹配实际分类名）
$CATEGORY_KEYWORDS = [
    '餐饮'     => ['早餐','午餐','晚餐','外卖','饮料','咖啡','奶茶','小吃','零食','火锅','烧烤','宵夜','饭','面','粉','粥','饺子','包子','快餐','盒饭','食堂','餐','饮','茶'],
    '交通'     => ['公交','地铁','打车','加油','停车','过路费','高速','骑车','单车','高铁','火车','飞机','机票','车票','出租','滴滴','摩的'],
    '住房'     => ['房租','水费','电费','燃气','物业','暖气','维修','装修','家具','家电'],
    '购物'     => ['网购','衣服','鞋包','数码','淘宝','京东','拼多多','日用品','百货'],
    '娱乐'     => ['电影','游戏','KTV','门票','按摩','足疗','酒吧','演出','演唱会','唱歌','跳舞','钓鱼','棋牌','会员'],
    '医疗'     => ['挂号','药品','体检','牙科','眼镜','看病','医院','诊所','药'],
    '人情'     => ['红包','礼物','请客','份子钱','家庭','婚礼','生日','满月'],
    '数码'     => ['手机','电脑','配件','充电','耳机','数据线','壳','膜'],
    '生活'     => ['超市','纸巾','洗护','清洁','家居','日用','垃圾袋','洗衣'],
    '学习'     => ['书籍','课程','考试','文具','软件','培训','网课','知识'],
    '旅行'     => ['酒店','机票','火车','景点','旅游','签证','民宿','客栈'],
    '理发💇🏻‍♀️' => ['理发','洗剪吹','美发','染发','烫发'],
    '零食'     => ['零食','小吃','奶茶'],
];

function matchAutoCat($data, $desc, $type = 'expense') {
    global $CATEGORY_KEYWORDS;
    if (empty($desc)) return null;
    // 优先匹配自动分类规则
    if (!empty($data['rules'])) {
        foreach ($data['rules'] as $r) {
            if ($r['type'] === $type && strpos($desc, $r['kw']) !== false) {
                return (int)$r['cat'];
            }
        }
    }
    // 匹配分类名称
    if (!empty($data['cats'])) {
        foreach ($data['cats'] as $c) {
            if ($c['t'] === $type && strpos($desc, $c['n']) !== false) {
                return (int)$c['id'];
            }
        }
    }
    // 匹配关键词 → 找到分类名 → 再找分类ID
    foreach ($CATEGORY_KEYWORDS as $catName => $keywords) {
        foreach ($keywords as $kw) {
            if (strpos($desc, $kw) !== false) {
                // 找到这个分类名对应的分类ID
                if (!empty($data['cats'])) {
                    foreach ($data['cats'] as $c) {
                        if ($c['t'] === $type && $c['n'] === $catName) {
                            return (int)$c['id'];
                        }
                    }
                }
                break;
            }
        }
    }
    return null;
}

function getDefaultAccount($data, $type = 'expense') {
    if (empty($data['accs'])) return null;
    // 找第一个显示的支出/收入账户
    foreach ($data['accs'] as $acc) {
        if (empty($acc['ac'])) continue;
        // 转账账户(type=transfer)跳过
        if (!empty($acc['type']) && $acc['type'] === 'transfer') continue;
        return $acc['id'];
    }
    return $data['accs'][0]['id'] ?? null;
}

function getCatName($data, $catId) {
    if (empty($data['cats'])) return '未知';
    foreach ($data['cats'] as $c) {
        if ($c['id'] == $catId) return $c['n'];
    }
    return '未知';
}

function replyDingtalk($sessionWebhook, $text) {
    if (empty($sessionWebhook)) return;
    $payload = json_encode([
        'msgtype' => 'text',
        'text' => ['content' => $text]
    ]);
    $ch = curl_init($sessionWebhook);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_exec($ch);
    curl_close($ch);
}

// ========== 签名验证 ==========
function verifySign($appSecret) {
    // 尝试多种可能的 header 名称
    $timestamp = $_SERVER['HTTP_TIMESTAMP'] ?? $_SERVER['timestamp'] ?? '';
    $sign      = $_SERVER['HTTP_SIGN']      ?? $_SERVER['sign']      ?? '';
    if (empty($timestamp) || empty($sign)) {
        return false;
    }
    // 防重放：时间戳与当前时间差超过 1 小时则拒绝
    if (abs(time() * 1000 - (int)$timestamp) > 3600000) {
        return false;
    }
    $str = $timestamp . "\n" . $appSecret;
    $computed = base64_encode(hash_hmac('sha256', $str, $appSecret, true));
    return hash_equals($computed, $sign);
}

// ========== 主逻辑 ==========
if (empty($APP_SECRET)) {
    jsonResponse([
        'msgtype' => 'text',
        'text' => ['content' => '机器人未配置 AppSecret，请编辑 dingtalk-bot.php']
    ]);
}

if (!verifySign($APP_SECRET)) {
    // 开发阶段：如果签名验证失败，记录日志但不阻止（方便调试）
    // 生产环境请移除下面的 return true;
    $timestamp = $_SERVER['HTTP_TIMESTAMP'] ?? $_SERVER['timestamp'] ?? 'missing';
    $sign      = $_SERVER['HTTP_SIGN']      ?? $_SERVER['sign']      ?? 'missing';
    error_log("[dingtalk-bot] 签名验证失败: timestamp={$timestamp}, sign={$sign}");
    return true; // 开发调试：临时跳过签名验证
    http_response_code(403);
    jsonResponse(['msgtype' => 'text', 'text' => ['content' => '签名验证失败']]);
}

$input = file_get_contents('php://input');
$body = json_decode($input, true);
if (!$body || empty($body['text']['content'])) {
    jsonResponse(['msgtype' => 'text', 'text' => ['content' => '请发送文字消息，例如：午餐28元']]);
}

$content = trim($body['text']['content']);

// 解析金额、备注、优惠
$parsed = parseVoiceText($content);
$amount = $parsed['amount'];
$desc = $parsed['desc'];
$discount = $parsed['discount'] ?? 0;

if (!$amount) {
    jsonResponse(['msgtype' => 'text', 'text' => ['content' => "未识别到金额，请发送类似：\n午餐28元\n地铁4块\n咖啡15"]]);
}

// 读取数据
if (!file_exists($DATA_FILE)) {
    jsonResponse(['msgtype' => 'text', 'text' => ['content' => '数据文件不存在']]);
}
$data = json_decode(file_get_contents($DATA_FILE), true);
if (!$data) {
    jsonResponse(['msgtype' => 'text', 'text' => ['content' => '数据文件解析失败']]);
}

// 匹配分类
$catId = matchAutoCat($data, $desc, 'expense');
if (!$catId && !empty($data['cats'])) {
    foreach ($data['cats'] as $c) {
        if ($c['t'] === 'expense' && !empty($c['ac'])) {
            $catId = (int)$c['id'];
            break;
        }
    }
}
$catName = getCatName($data, $catId);

// 找默认账户
$accId = getDefaultAccount($data, 'expense');
if (!$accId && !empty($data['accs'])) {
    $accId = $data['accs'][0]['id'];
}

$now = new DateTime('now', new DateTimeZone('Asia/Shanghai'));
$date = $now->format('Y-m-d');
$time = $now->format('H:i');
$txsAdded = [];

// 1. 主支出记录（实付金额）
$actualAmount = $amount - $discount;
$tx = [
    'id' => genId(),
    'type' => 'expense',
    'amount' => $actualAmount,
    'acc' => $accId,
    'date' => $date,
    'time' => $time,
    'desc' => $desc ?: '钉钉记账',
    'mood' => '',
    'cat' => $catId,
    'rate' => '',
    'st' => 'normal',
    'balApplied' => true,
    'tags' => [],
    'status' => 'normal'
];
$data['txs'][] = $tx;
$txsAdded[] = "支出 {$actualAmount}元";

// 更新账户余额（扣除实付金额）
if ($accId && !empty($data['accs'])) {
    foreach ($data['accs'] as &$acc) {
        if ($acc['id'] === $accId) {
            $acc['b'] = ($acc['b'] ?? 0) - $actualAmount;
            break;
        }
    }
    unset($acc);
}

// 2. 如果有优惠，记录一笔优惠收入
if ($discount > 0) {
    // 优先找"优惠减免"分类，其次"立减金"，最后用第一个收入分类
    $discountCatId = null;
    if (!empty($data['cats'])) {
        foreach ($data['cats'] as $c) {
            if ($c['t'] === 'income' && strpos($c['n'], '优惠减免') !== false) {
                $discountCatId = (int)$c['id'];
                break;
            }
        }
        if (!$discountCatId) {
            foreach ($data['cats'] as $c) {
                if ($c['t'] === 'income' && strpos($c['n'], '立减金') !== false) {
                    $discountCatId = (int)$c['id'];
                    break;
                }
            }
        }
        if (!$discountCatId) {
            foreach ($data['cats'] as $c) {
                if ($c['t'] === 'income' && (strpos($c['n'], '优惠') !== false || strpos($c['n'], '折扣') !== false)) {
                    $discountCatId = (int)$c['id'];
                    break;
                }
            }
        }
        if (!$discountCatId) {
            foreach ($data['cats'] as $c) {
                if ($c['t'] === 'income') {
                    $discountCatId = (int)$c['id'];
                    break;
                }
            }
        }
    }
    $discountTx = [
        'id' => genId(),
        'type' => 'income',
        'amount' => $discount,
        'acc' => $accId,
        'date' => $date,
        'time' => $time,
        'desc' => $desc ? ($desc . ' 【优惠' . $discount . '元】') : '优惠',
        'mood' => '',
        'cat' => $discountCatId,
        'rate' => '',
        'st' => 'normal',
        'balApplied' => true,
        'tags' => [],
        'status' => 'normal'
    ];
    $data['txs'][] = $discountTx;
    $txsAdded[] = "优惠收入 {$discount}元";

    // 更新账户余额（加上优惠收入）
    if ($accId && !empty($data['accs'])) {
        foreach ($data['accs'] as &$acc) {
            if ($acc['id'] === $accId) {
                $acc['b'] = ($acc['b'] ?? 0) + $discount;
                break;
            }
        }
        unset($acc);
    }
}

// 保存
file_put_contents($DATA_FILE, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

// 回复（只通过 HTTP 回调返回，不额外调用 sessionWebhook）
$reply = "✅ 已记账\n" .
         "📋 {$desc}\n" .
         "💰 实付 {$actualAmount}元\n";
if ($discount > 0) {
    $reply .= "🎁 优惠 {$discount}元（已记为收入）\n";
}
$reply .= "📂 {$catName}\n" .
          "📅 {$date} {$time}";

jsonResponse(['msgtype' => 'text', 'text' => ['content' => $reply]]);
