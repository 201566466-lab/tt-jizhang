<?php
/**
 * 极简数据 API - 读写 data.json
 * 无需数据库，数据存在服务器文件
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Bookkeeping-Password');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$DATA_FILE = __DIR__ . '/data.json';
$BACKUP_DIR = __DIR__ . '/backup';

// 简单访问密码：上线前请改成你自己的强密码
// 留空字符串 '' 可临时关闭接口鉴权
$ACCESS_PASSWORD = '354616';

// 百度语音识别配置（用于语音记账功能）
// 申请地址：https://ai.baidu.com/tech/speech
// 每天有 50000 次免费调用额度
$BAIDU_API_KEY = 'qjUP5eRFvvI7lxesMONOqR8w';     // 填写你的百度 API Key
$BAIDU_SECRET_KEY = 'HfLkZgO1EvO0KpjXJ7Lli3VG8M5fyLqC';  // 填写你的百度 Secret Key

function jsonResponse($success, $data = null, $msg = '') {
    echo json_encode(['success' => $success, 'data' => $data, 'msg' => $msg]);
    exit;
}

function logHistory(&$data, $action, $detail = '') {
    if (!isset($data['history']) || !is_array($data['history'])) {
        $data['history'] = [];
    }
    array_unshift($data['history'], [
        'id' => 'h' . substr(md5(uniqid(mt_rand(), true)), 0, 12),
        'time' => date('c'),
        'action' => $action,
        'detail' => $detail
    ]);
    $data['history'] = array_slice($data['history'], 0, 80);
}

function typeLabel($type) {
    $map = [
        'expense' => '支出',
        'income' => '收入',
        'transfer' => '转账',
        'invest' => '投资收益'
    ];
    return $map[$type] ?? $type;
}

function backupFile($sourceFile, $backupDir, $prefix, $keep = 20) {
    if (!file_exists($sourceFile)) {
        return;
    }
    if (!is_dir($backupDir)) {
        @mkdir($backupDir, 0755, true);
    }
    $backupFile = $backupDir . '/' . $prefix . '_' . date('Ymd_His') . '.json';
    @copy($sourceFile, $backupFile);
    $backups = glob($backupDir . '/' . $prefix . '_*.json');
    if (count($backups) > $keep) {
        usort($backups, function($a, $b) {
            return filemtime($a) - filemtime($b);
        });
        foreach (array_slice($backups, 0, count($backups) - $keep) as $old) {
            @unlink($old);
        }
    }
}

function getRequestPassword() {
    $pwd = $_SERVER['HTTP_X_BOOKKEEPING_PASSWORD'] ?? '';
    if ($pwd !== '') {
        return $pwd;
    }
    foreach (['token', 'password', 'api_key', 'key'] as $key) {
        if (isset($_GET[$key]) && $_GET[$key] !== '') {
            return (string)$_GET[$key];
        }
    }
    $raw = file_get_contents('php://input');
    if ($raw !== '') {
        $json = json_decode($raw, true);
        if (is_array($json) && isset($json['password'])) {
            return (string)$json['password'];
        }
    }
    return '';
}

// 创建备份目录
if (!is_dir($BACKUP_DIR)) {
    @mkdir($BACKUP_DIR, 0755, true);
}

$action = $_GET['action'] ?? '';

// 登录校验
if ($ACCESS_PASSWORD !== '') {
    if ($action === 'login') {
        $pwd = getRequestPassword();
        jsonResponse(hash_equals($ACCESS_PASSWORD, $pwd), null, hash_equals($ACCESS_PASSWORD, $pwd) ? '登录成功' : '密码错误');
    }
    $pwd = getRequestPassword();
    if (!hash_equals($ACCESS_PASSWORD, (string)$pwd)) {
        http_response_code(401);
        jsonResponse(false, null, '未授权，请先登录');
    }
}

if ($action === 'load') {
    // 读取数据
    if (!file_exists($DATA_FILE)) {
        jsonResponse(true, null, '数据文件不存在，将使用默认数据');
    }
    $content = file_get_contents($DATA_FILE);
    $data = json_decode($content, true);
    if ($data === null) {
        jsonResponse(false, null, '数据文件解析失败');
    }
    jsonResponse(true, $data);

} elseif ($action === 'save') {
    // 保存数据
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    if ($data === null) {
        jsonResponse(false, null, '接收的数据格式错误');
    }

    // 备份旧文件，只保留最近 20 个
    backupFile($DATA_FILE, $BACKUP_DIR, 'data', 20);

    // 写入新数据
    $result = file_put_contents($DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    if ($result === false) {
        jsonResponse(false, null, '写入文件失败，请检查目录权限');
    }
    jsonResponse(true, null, '保存成功');

} elseif ($action === 'export') {
    // 下载数据文件
    if (!file_exists($DATA_FILE)) {
        jsonResponse(false, null, '数据文件不存在');
    }
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="记账数据备份_' . date('Ymd_His') . '.json"');
    readfile($DATA_FILE);
    exit;

} elseif ($action === 'backupStatus') {
    // 返回服务器自动备份状态，用于前端判断是否需要提醒备份
    $backups = glob($BACKUP_DIR . '/data_*.json');
    $latest = null;
    $latestTime = 0;
    foreach ($backups as $file) {
        $mtime = filemtime($file);
        if ($mtime > $latestTime) {
            $latestTime = $mtime;
            $latest = basename($file);
        }
    }
    jsonResponse(true, [
        'count' => count($backups),
        'latestFile' => $latest,
        'latestDate' => $latestTime ? date('Y-m-d', $latestTime) : '',
        'latestTime' => $latestTime ? date('Y-m-d H:i:s', $latestTime) : ''
    ]);

} elseif ($action === 'addTx') {
    // 添加单条交易记录（供外部脚本同步调用）
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input === null) {
        jsonResponse(false, null, '接收的数据格式错误');
    }
    $required = ['date', 'type', 'cat', 'amount'];
    foreach ($required as $f) {
        if (!isset($input[$f]) || $input[$f] === '') {
            jsonResponse(false, null, "缺少必填字段: $f");
        }
    }

    if (!file_exists($DATA_FILE)) {
        jsonResponse(false, null, '数据文件不存在');
    }
    $content = file_get_contents($DATA_FILE);
    $data = json_decode($content, true);
    if ($data === null) {
        jsonResponse(false, null, '数据文件解析失败');
    }

    // externalId 去重（青龙同步去重）
    if (!empty($input['externalId'])) {
        foreach ($data['txs'] as $existingTx) {
            if (!empty($existingTx['externalId']) && (string)$existingTx['externalId'] === (string)$input['externalId']) {
                jsonResponse(true, ['exists' => true, 'id' => $existingTx['id']], '该记录已存在，跳过重复添加');
            }
        }
    }

    // 验证分类ID是否存在
    $catId = intval($input['cat']);
    $catExists = false;
    $catName = '';
    foreach ($data['cats'] as $c) {
        if (intval($c['id']) === $catId) {
            $catExists = true;
            $catName = $c['n'] ?? '';
            break;
        }
    }
    if (!$catExists) {
        jsonResponse(false, null, "分类ID不存在: $catId");
    }

    // 备注优惠识别与金额提取
    $remark = $input['remark'] ?? '';
    $discountAmount = 0;
    $discountTx = null;
    $cleanRemark = $remark;

    if ($input['type'] === 'expense' && !empty($remark)) {
        $discountIdx = mb_strpos($remark, '优惠');
        if ($discountIdx !== false) {
            $afterDiscount = mb_substr($remark, $discountIdx + 2);
            if (preg_match('/(\d+(?:\.\d+)?)/', $afterDiscount, $matches)) {
                $discountAmount = floatval($matches[1]);
                $cleanRemark = trim(mb_substr($remark, 0, $discountIdx));
            }
        }
    }

    // 构造交易记录
    $tx = [
        'id'     => 'r' . substr(md5(uniqid(mt_rand(), true)), 0, 12) . bin2hex(random_bytes(3)),
        'date'   => $input['date'],
        'time'   => $input['time'] ?? '',
        'type'   => $input['type'],
        'cat'    => $catId,
        'amount' => floatval($input['amount']),
        'desc'   => $cleanRemark,
        'acc'    => $input['acc'] ?? '',
        'st'     => 'normal',
        'balApplied' => true
    ];

    // 保存 externalId 到交易记录
    if (!empty($input['externalId'])) {
        $tx['externalId'] = (string)$input['externalId'];
    }

    // 更新关联账户余额
    $accId = $input['acc'] ?? '';
    if ($accId !== '') {
        foreach ($data['accs'] as &$acc) {
            if ((string)$acc['id'] === (string)$accId && ($acc['ac'] ?? 1) == 1) {
                $amount = floatval($input['amount']);
                $type = $input['type'];
                if ($type === 'expense') {
                    $acc['b'] = round($acc['b'] - $amount, 2);
                } elseif ($type === 'income' || $type === 'invest') {
                    $acc['b'] = round($acc['b'] + $amount, 2);
                }
                break;
            }
        }
        unset($acc);
    }

    $data['txs'][] = $tx;

    // 如果检测到优惠，生成优惠减免收入记录
    if ($discountAmount > 0 && $discountAmount < floatval($input['amount'])) {
        $discCatId = null;
        foreach ($data['cats'] as $c) {
            if (($c['n'] ?? '') === '优惠减免' && ($c['t'] ?? '') === 'income' && ($c['ac'] ?? 1) == 1) {
                $discCatId = $c['id'];
                break;
            }
        }
        if ($discCatId === null) {
            $discCatId = 'r' . substr(md5(uniqid(mt_rand(), true)), 0, 12);
            $data['cats'][] = [
                'id' => $discCatId,
                'n' => '优惠减免',
                't' => 'income',
                'i' => '🎫',
                'c' => '#10b981',
                'ac' => 1
            ];
        }

        $discountDesc = $cleanRemark . '【优惠' . number_format($discountAmount, 2, '.', '') . '元】';
        $discountTx = [
            'id'     => 'r' . substr(md5(uniqid(mt_rand(), true)), 0, 12) . bin2hex(random_bytes(3)),
            'date'   => $input['date'],
            'time'   => $input['time'] ?? '',
            'type'   => 'income',
            'cat'    => $discCatId,
            'amount' => $discountAmount,
            'desc'   => $discountDesc,
            'acc'    => $input['acc'] ?? '',
            'st'     => 'normal',
            'balApplied' => false,
            'source' => 'discount',
            'discountFor' => $tx['id']
        ];
        if (!empty($input['externalId'])) {
            $discountTx['externalId'] = (string)$input['externalId'] . '_discount';
        }
        array_unshift($data['txs'], $discountTx);
    }

    $sourceName = trim((string)($input['sourceName'] ?? $input['source'] ?? '青龙面板'));
    if ($sourceName === '') {
        $sourceName = '青龙面板';
    }
    $detailParts = [
        typeLabel($input['type']),
        $catName ?: ('分类' . $catId),
        '¥' . number_format(floatval($input['amount']), 2, '.', ''),
    ];
    if (!empty($cleanRemark)) {
        $detailParts[] = $cleanRemark;
    }
    if ($discountTx) {
        $detailParts[] = '优惠收入¥' . number_format($discountAmount, 2, '.', '');
    }
    logHistory($data, $sourceName . '同步记账', implode(' · ', $detailParts));

    $result = file_put_contents($DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    $respData = ['tx' => $tx];
    if ($discountTx) {
        $respData['discountTx'] = $discountTx;
    }
    jsonResponse($result !== false, $respData, $result !== false ? '添加成功' : '写入失败');

} elseif ($action === 'delTx') {
    // 删除单条交易记录（供外部脚本同步调用）
    $txId = $_GET['id'] ?? '';
    if ($txId === '') {
        jsonResponse(false, null, '缺少交易ID');
    }

    if (!file_exists($DATA_FILE)) {
        jsonResponse(false, null, '数据文件不存在');
    }
    $content = file_get_contents($DATA_FILE);
    $data = json_decode($content, true);
    if ($data === null) {
        jsonResponse(false, null, '数据文件解析失败');
    }

    $found = false;
    $delTx = null;
    foreach ($data['txs'] as $i => $tx) {
        if ($tx['id'] === $txId) {
            $delTx = $tx;
            array_splice($data['txs'], $i, 1);
            $found = true;
            break;
        }
    }
    if (!$found) {
        jsonResponse(false, null, "未找到交易: $txId");
    }

    // 回滚关联账户余额
    if ($delTx && ($delTx['balApplied'] ?? false) && !empty($delTx['acc'])) {
        foreach ($data['accs'] as &$acc) {
            if ((string)$acc['id'] === (string)$delTx['acc'] && ($acc['ac'] ?? 1) == 1) {
                $amount = floatval($delTx['amount'] ?? 0);
                $type = $delTx['type'] ?? '';
                if ($type === 'expense') {
                    $acc['b'] = round($acc['b'] + $amount, 2);
                } elseif ($type === 'income' || $type === 'invest') {
                    $acc['b'] = round($acc['b'] - $amount, 2);
                }
                break;
            }
        }
        unset($acc);
    }

    $result = file_put_contents($DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    jsonResponse($result !== false, null, $result !== false ? '删除成功' : '写入失败');

} elseif ($action === 'setAccBalance') {
    // 直接设置账户余额（供外部同步账户余额变化）
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input === null) {
        jsonResponse(false, null, '接收的数据格式错误');
    }
    if (!isset($input['id']) || $input['id'] === '') {
        jsonResponse(false, null, '缺少账户ID');
    }
    if (!isset($input['balance']) || !is_numeric($input['balance'])) {
        jsonResponse(false, null, '缺少有效余额');
    }

    if (!file_exists($DATA_FILE)) {
        jsonResponse(false, null, '数据文件不存在');
    }
    $content = file_get_contents($DATA_FILE);
    $data = json_decode($content, true);
    if ($data === null) {
        jsonResponse(false, null, '数据文件解析失败');
    }

    $accId = (string)$input['id'];
    $newBalance = round(floatval($input['balance']), 2);
    $found = false;
    $oldBalance = 0;
    $accName = '';

    foreach ($data['accs'] as &$acc) {
        if ((string)$acc['id'] === $accId && ($acc['ac'] ?? 1) == 1) {
            $oldBalance = $acc['b'];
            $acc['b'] = $newBalance;
            $found = true;
            $accName = $acc['n'] ?? $accId;
            break;
        }
    }
    unset($acc);

    if (!$found) {
        jsonResponse(false, null, "未找到账户: $accId");
    }

    // 记录余额校准历史
    $diff = round($newBalance - $oldBalance, 2);
    logHistory($data, '余额校准', "账户「{$accName}」旧余额 ¥" . number_format($oldBalance, 2, '.', '') . " → 新余额 ¥" . number_format($newBalance, 2, '.', '') . "（差额 ¥" . number_format($diff, 2, '.', '') . "）");

    $result = file_put_contents($DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    jsonResponse($result !== false, ['id' => $accId, 'old' => $oldBalance, 'new' => $newBalance], $result !== false ? '余额更新成功' : '写入失败');

} elseif ($action === 'assetSnapshots') {
    $sub = $_GET['sub'] ?? '';
    $SNAP_FILE = __DIR__ . '/asset-snapshots.json';

    if ($sub === 'load') {
        if (!file_exists($SNAP_FILE)) {
            jsonResponse(true, []);
        }
        $content = file_get_contents($SNAP_FILE);
        $snaps = json_decode($content, true);
        if (!is_array($snaps)) {
            jsonResponse(true, []);
        }
        jsonResponse(true, $snaps);

    } elseif ($sub === 'save') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!is_array($input)) {
            jsonResponse(false, null, '数据格式错误');
        }
        backupFile($SNAP_FILE, $BACKUP_DIR, 'asset_snapshots', 20);
        $result = file_put_contents($SNAP_FILE, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
        if ($result === false) {
            jsonResponse(false, null, '写入文件失败，请检查目录权限');
        }
        jsonResponse(true, null, '保存成功');
    } else {
        jsonResponse(false, null, '缺少 sub 参数，可用：load / save');
    }

} elseif ($action === 'voiceRecognize') {
    // 语音记账识别接口
    global $BAIDU_API_KEY, $BAIDU_SECRET_KEY;
    if (empty($BAIDU_API_KEY) || empty($BAIDU_SECRET_KEY)) {
        jsonResponse(false, null, '语音记账未配置：请在 data-api.php 中填写百度 API Key 和 Secret Key（申请地址：https://ai.baidu.com/tech/speech）');
    }
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['speech'])) {
        jsonResponse(false, null, '缺少音频数据');
    }
    $speech = $input['speech'];
    $format = $input['format'] ?? 'wav';
    $rate = $input['rate'] ?? 16000;

    // 获取百度 Access Token（缓存到文件，避免每次请求都获取）
    $tokenFile = $BACKUP_DIR . '/baidu_token.json';
    $token = null;
    if (file_exists($tokenFile)) {
        $tokenData = json_decode(file_get_contents($tokenFile), true);
        if ($tokenData && isset($tokenData['token']) && isset($tokenData['expires']) && $tokenData['expires'] > time()) {
            $token = $tokenData['token'];
        }
    }
    if (!$token) {
        $tokenUrl = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' . urlencode($BAIDU_API_KEY) . '&client_secret=' . urlencode($BAIDU_SECRET_KEY);
        $tokenRes = file_get_contents($tokenUrl);
        $tokenJson = json_decode($tokenRes, true);
        if (!$tokenJson || !isset($tokenJson['access_token'])) {
            jsonResponse(false, null, '获取百度语音 Token 失败：' . ($tokenJson['error_description'] ?? '未知错误'));
        }
        $token = $tokenJson['access_token'];
        file_put_contents($tokenFile, json_encode([
            'token' => $token,
            'expires' => time() + 25 * 24 * 3600 // 25天后过期（token有效期30天）
        ]));
    }

    // 调用百度语音识别
    $apiUrl = 'https://vop.baidu.com/server_api';
    $postData = json_encode([
        'format' => $format,
        'rate' => (int)$rate,
        'channel' => 1,
        'cuid' => 'bookkeeping_' . md5($_SERVER['HTTP_HOST'] ?? 'default'),
        'token' => $token,
        'dev_pid' => 1537, // 普通话(纯中文识别)
        'speech' => $speech,
        'len' => strlen(base64_decode($speech))
    ]);

    $opts = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/json; charset=utf-8',
            'content' => $postData,
            'timeout' => 30
        ]
    ];
    $apiRes = file_get_contents($apiUrl, false, stream_context_create($opts));
    $apiJson = json_decode($apiRes, true);
    if (!$apiJson || $apiJson['err_no'] !== 0) {
        jsonResponse(false, null, '语音识别失败：' . ($apiJson['err_msg'] ?? '未知错误'));
    }
    $text = $apiJson['result'][0] ?? '';
    $text = trim($text, ' ，。！？');
    jsonResponse(true, ['text' => $text], '识别成功');

} else {
    jsonResponse(false, null, '未知操作，可用：load / save / export / backupStatus / addTx / delTx / setAccBalance / assetSnapshots / voiceRecognize');
}
