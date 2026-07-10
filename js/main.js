/* ========== 数据层 ========== */
const STORE='mint_demo_v2';
const APP_VERSION='2.1.0';
const APP_BUILD_DATE='2026-07-05';
const APP_CACHE_VERSION='20260705_stats_edit_cache_v1';
const AUTH_STORE=STORE+'_api_password';
const $=id=>document.getElementById(id);
const TYPE_MAP={income:'收入',expense:'支出',transfer:'转账',invest:'投资收益'};
const ACC_META={cash:{i:'💵',c:'#10b981',n:'现金'},savings:{i:'🏦',c:'#f59e0b',n:'储蓄卡'},investment:{i:'📈',c:'#8b5cf6',n:'投资账户'},debt:{i:'📉',c:'#ef4444',n:'负债'},receivable:{i:'🤝',c:'#06b6d4',n:'债权'},custom:{i:'📦',c:'#94a3b8',n:'自定义资产'}};
const QUICK_NOTES={
  expense:['早餐','午餐','晚餐','饮料','公交','地铁','打车'],
  income:['工资','奖金','兼职','红包','退款'],
  transfer:['还信用卡','提现','转入银行卡','账户整理'],
  invest:['基金收益','股票收益','理财收益','定投收益','分红']
};
const CATEGORY_QUICK_NOTES={
  '餐饮':['早餐','午餐','晚餐','外卖','饮料','咖啡'],
  '交通出行':['公交','地铁','打车','加油','停车'],
  '住房':['房租','水费','电费','燃气','物业'],
  '购物':['网购','衣服','鞋包','数码','淘宝'],
  '娱乐休闲':['电影','游戏','会员','KTV','门票'],
  '生活':['菜钱','房租','短剧','电费','腾讯云'],
  '旅行':['酒店','机票','火车','景点','打车'],
  '人情':['红包','礼物','请客','份子钱','家庭'],
  '学习':['书籍','课程','考试','文具','软件'],
  '医疗':['挂号','药品','体检','牙科','眼镜'],
  '通讯网络':['话费','流量','宽带','充值','云服务'],
  '数码电子':['手机','电脑','配件','充电','耳机'],
  '家庭亲友':['姐姐','爸爸','妈妈','家用','转给家人'],
  '个人护理':['理发','护肤','美容','洗剪吹','剃须'],
  '其他':['临时','杂项','待确认','补记','其他']
};
const QUOTES=[
  {t:'真正的富有，是知道自己拥有什么。',a:'亨利·戴维·梭罗'},
  {t:'不积跬步，无以至千里；不积小流，无以成江海。',a:'荀子'},
  {t:'理财的第一步，是开始记录。',a:'理财格言'},
  {t:'控制支出，就是增加收入。',a:'本杰明·富兰克林'},
  {t:'存钱不是目的，自由才是。',a:'FIRE运动'},
  {t:'每一分花的明白，每一分赚的安心。',a:'TT日常记账'},
  {t:'预算不是限制生活，而是把钱花在真正重要的地方。',a:'生活感悟'},
  {t:'今天记下的一笔，是明天更从容的选择。',a:'TT日常记账'},
  {t:'钱的流向，藏着生活的优先级。',a:'生活感悟'},
  {t:'先看清现金流，再谈财富增长。',a:'理财格言'},
  {t:'稳定的小习惯，最终会变成巨大的安全感。',a:'生活感悟'},
  {t:'会花钱的人，不是少花，而是花得值得。',a:'生活感悟'},
  {t:'财务自由始于一次诚实的盘点。',a:'TT日常记账'},
  {t:'留一点余地给未来，也留一点奖励给现在。',a:'生活感悟'},
  {t:'把账记清楚，焦虑就少一半。',a:'TT日常记账'},
  {t:'收入决定上限，结余决定速度。',a:'理财格言'},
  {t:'每一次复盘，都是在帮未来的自己省钱。',a:'TT日常记账'},
  {t:'少一点冲动，多一点选择权。',a:'生活感悟'},
  {t:'资产增长不靠运气，靠持续看见和调整。',a:'理财格言'},
  {t:'真正的预算，是为喜欢的生活腾出空间。',a:'生活感悟'},
  {t:'先照顾好现金流，再追求高收益。',a:'理财格言'},
  {t:'最好的理财，是长期做正确的小事。',a:'生活感悟'},
  {t:'消费可以带来快乐，清醒消费可以留下快乐。',a:'生活感悟'},
  {t:'记账不是回头看，而是为了下一步走得更稳。',a:'TT日常记账'},
  {t:'有计划的钱，才更容易变成自由。',a:'生活感悟'},
  {t:'你记账的天数，就是你对生活认真程度的天数。',a:'TT日常记账'},
  {t:'不看账单的人，永远不知道自己的钱花去了哪里。',a:'理财格言'},
  {t:'财富积累的过程，就是不断对抗即时满足的过程。',a:'生活感悟'},
  {t:'大多数人的问题在于，他们的支出随着收入一起增长。',a:'沃伦·巴菲特'},
  {t:'一个人能存下多少钱，取决于他能区分「想要」和「需要」的能力。',a:'理财格言'},
  {t:'记账三个月后，你会惊讶于自己原来花了这么多冤枉钱。',a:'TT日常记账'},
  {t:'穷人和富人的区别，不在于赚多少，而在于让钱为自己工作的意识。',a:'罗伯特·清崎'},
  {t:'不要在最能存钱的时候选择精致穷，未来的你会感谢现在的克制。',a:'生活感悟'},
  {t:'每一笔小额支出的背后，都是一个月度总支出的缩影。',a:'理财格言'},
  {t:'如果你不知道自己的钱花在哪里，那你就不配拥有更多。',a:'戴夫·拉姆齐'},
  {t:'复利是世界第八大奇迹，理解它的人赚取它，不理解的人支付它。',a:'爱因斯坦'},
  {t:'建立应急基金，是给自己的人生买一份最低成本的保险。',a:'理财格言'},
  {t:'投资最大的风险，是你自己——情绪、贪婪和恐惧。',a:'本杰明·格雷厄姆'},
  {t:'不要让今天的消费，成为明天凌晨三点失眠的理由。',a:'生活感悟'},
  {t:'当一个人开始认真记账，他就已经在财务上领先了大多数人。',a:'TT日常记账'},
  {t:'省钱不是为了过苦日子，而是为了在重要时刻有说「好」的底气。',a:'生活感悟'},
  {t:'理财的核心不是赚更多，而是让已有的每一分钱都发挥最大价值。',a:'理财格言'},
  {t:'你无法管理看不见的东西，记账就是让你的财务状况清晰可见。',a:'TT日常记账'},
  {t:'月入一万花一万和月入五千存两千的人，三年后的人生截然不同。',a:'理财格言'},
  {t:'真正的奢侈不是买贵的东西，而是拥有选择的自由和时间的主权。',a:'生活感悟'},
  {t:'不要用自己的时间换钱，再用钱换快感，最后用快感换后悔。',a:'生活感悟'},
  {t:'记账的本质，是用数据的理性去对抗消费的冲动。',a:'TT日常记账'},
  {t:'一个人的财务健康程度，往往和他对数字的敏感度成正比。',a:'理财格言'},
  {t:'世界上最遥远的距离，是你的收入和你的欲望之间的距离。',a:'生活感悟'},
  {t:'当你开始为退休存钱时，最好的时机是十年前，其次是现在。',a:'中国谚语'},
  {t:'攒钱买喜欢的东西是延迟满足，刷卡买不喜欢的东西是纯浪费。',a:'生活感悟'},
  {t:'每月结余哪怕只有10%，十年后也能让你比别人多出一个选择权。',a:'理财格言'}
];
const PERSONAS=[
  {t:'极简生活家',i:'🌿',d:'你的支出非常克制，恩格尔系数很低，生活精致且有条理。'},
  {t:'美食探索者',i:'🍜',d:'餐饮支出占比最高，懂得享受生活，但记得关注其他方面的平衡。'},
  {t:'理性理财家',i:'🧠',d:'你的收支比例很健康，结余率保持良好，理财意识很强。'},
  {t:'购物达人',i:'🛍️',d:'购物支出较为突出，喜欢尝试新鲜事物，适当控制冲动消费会更好。'},
  {t:'社交蝴蝶',i:'🦋',d:'人情往来支出较多，重视人际关系，建议设置社交预算上限。'}
];

// 预设备注关键词自动分类映射
const PRESET_AUTO_CAT_KEYWORDS={
  expense:[
    {kw:['外卖','包子','火锅','午饭','面','水','烧烤','乡村基','吃饭','泡面','饭扫光','早餐','肯德基','蜜雪冰城','冒菜','一把骨','聚餐','请客吃饭','小吃','零食','奶茶','咖啡','饮料'],catName:'餐饮'},
    {kw:['地铁','公交','滴滴','小拉出行','打车','停车费','动车','高铁','火车','出租车','网约车','代驾','加油'],catName:'交通'},
    {kw:['猫粮','猫砂','充电器','鼠标','洗面奶','电池','衣服','裤子','鞋子','包包','化妆品','护肤品','洗发水','沐浴露','牙膏','牙刷','纸巾','洗衣液','洗洁精','垃圾袋','京东','淘宝','拼多多','天猫','手机','电脑','平板','耳机','键盘','显示器','电视','冰箱','洗衣机','空调','数据线','充电宝','路由器','网购'],catName:'购物'},
    {kw:['电费','水费','气费','话费','电话费','搬家','维修','保洁','洗衣','理发','洗车','照片','打印','复印','快递','邮寄','会员','订阅','短剧','房租','书','教材','课程','培训','学费','考试','报名','考级','考证','驾照','驾校','网课','辅导班','补习班'],catName:'生活'},
    {kw:['门票','电影','影院','KTV','唱吧','游戏','Steam','网吧','网咖','剧本杀','密室','游乐园','公园','景区','彩票','刮刮乐','打赏','直播','音乐会','演唱会','球赛','体彩大乐透','大乐透','按摩'],catName:'娱乐'},
    {kw:['红包','结婚','生日','份子钱','送礼','礼物','鲜花','蛋糕','请客','招待','孝顺','父母','长辈','亲戚'],catName:'人情'},
    {kw:['机票','酒店','民宿','客栈','旅馆','宾馆','度假村','温泉','签证','护照','旅行','旅游','度假','出国'],catName:'旅行'},
    {kw:['医院','诊所','药店','药房','挂号','体检','疫苗','牙科','眼科','CT','B超','验血','输液','打针','药费','医疗费'],catName:'医疗'},

    {kw:['基金','股票','证券','债券','理财','定投','ETF','余额宝','零钱通','国债','黄金','保险'],catName:'投资'}
  ]
};

/* ========== 全局状态管理 ========== */
window.App=window.App||{};
App.State={
  data:null,txType:'expense',selMood:'',selCat:null,editingAccId:null,editingTxId:null,trendC:null,pieC:null,assetC:null,
  isDark:(()=>{const s=localStorage.getItem('mint_dark');if(s!==null)return s==='1';return window.matchMedia('(prefers-color-scheme:dark)').matches})(),
  quoteIndex:-1,blankMode:false,blankAlertTimer:null,calViewDate:new Date(),
  topExpenseRange:'month',topExpenseSort:'amount',calendarMode:'day',
  billViewMode:'list',selectedBillId:null,billTableSort:{key:'date',dir:'desc'},
  billCompact:localStorage.getItem('bill_compact')==='1',
  assetViewMode:'list',assetChartRange:'3y',
  selectedBatchIds:new Set(),pendingOnly:false,splitWorkbenchOn:false,contextTxId:null,
  currentPage:'home',homeBillMonth:localMonthStr(),homeBillKeyword:'',
  lastInteractionSoundAt:0,quickEntryType:'expense',
  qnmSelectedCatId:null,qnmSelectedCatName:'',
  calYear:void 0,calMonth:void 0,calSelectedDate:void 0,calBookFilter:'all',
  currentBillTab:'day',monthBillViewDate:new Date(),yearBillViewDate:new Date(),
  currentBillCatFilter:null,currentBillAccountFilter:null,largeOnly:false,
  investCalendarYear:new Date().getFullYear(),
  txModalDirty:false,voiceRecognition:null,lastAutoNote:'',
  delId:null,confirmAction:null,pendingImportText:'',
  appStarted:false,ctrlComboUsed:false,
  // 无限滚动状态
  _billInfiniteState:{allList:[],rendered:0,loading:false,done:false},
  _billTableInfiniteState:{allSorted:[],rendered:0,loading:false,done:false,cols:[],colNames:{},d:null},
  _investInfiniteState:{allRows:[],rendered:0,loading:false,done:false}
};
// 创建全局代理（保持向后兼容，现有代码无需修改）
const _stateProps=['data','txType','selMood','selCat','editingAccId','editingTxId','trendC','pieC','assetC','isDark','quoteIndex','blankMode','blankAlertTimer','calViewDate','topExpenseRange','topExpenseSort','calendarMode','billViewMode','selectedBillId','billTableSort','billCompact','assetViewMode','assetChartRange','selectedBatchIds','pendingOnly','splitWorkbenchOn','contextTxId','currentPage','homeBillMonth','homeBillKeyword','lastInteractionSoundAt','quickEntryType','qnmSelectedCatId','qnmSelectedCatName','calYear','calMonth','calSelectedDate','calBookFilter','currentBillTab','monthBillViewDate','yearBillViewDate','currentBillCatFilter','currentBillAccountFilter','largeOnly','investCalendarYear','txModalDirty','voiceRecognition','lastAutoNote','delId','confirmAction','pendingImportText','appStarted','ctrlComboUsed','_billInfiniteState','_billTableInfiniteState','_investInfiniteState'];
_stateProps.forEach(p=>{Object.defineProperty(window,p,{get(){return App.State[p]},set(v){App.State[p]=v},configurable:true});});

// 兼容性：初始化 body class
document.body.classList.toggle('bill-compact',App.State.billCompact);
const DEFAULT_COLUMNS=['date','type','cat','acc','amount','desc','tags'];

function getApiPassword(){
  try{return localStorage.getItem(AUTH_STORE)||''}catch(e){return ''}
}
function setApiPassword(pwd){
  try{localStorage.setItem(AUTH_STORE,pwd);localStorage.setItem(AUTH_STORE+'_date',localDateStr())}catch(e){}
}
function clearApiPassword(){
  try{localStorage.removeItem(AUTH_STORE);localStorage.removeItem(AUTH_STORE+'_date')}catch(e){}
}
function isApiPasswordExpired(){
  try{
    const savedDate=localStorage.getItem(AUTH_STORE+'_date');
    return savedDate!==localDateStr();
  }catch(e){return true}
}
async function apiFetch(url,options={}){
  const opts=Object.assign({},options);
  const headers=Object.assign({},opts.headers||{});
  const pwd=getApiPassword();
  if(pwd)headers['X-Bookkeeping-Password']=pwd;
  opts.headers=headers;
  const res=await fetch(url,opts);
  if(res.status===401){
    clearApiPassword();
    showLoginModal();
    throw new Error('未授权，请先登录');
  }
  return res;
}
async function verifyApiPassword(pwd){
  const res=await fetch('data-api.php?action=login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({password:pwd})
  });
  return await res.json().catch(()=>({success:false,msg:'登录失败'}));
}
function showLoginModal(){
  $('loginModal')?.classList.add('show');
  setTimeout(()=>$('loginPassword')?.focus(),80);
}
function hideLoginModal(){
  $('loginModal')?.classList.remove('show');
}
function showBlankModeAlert(){
  const dlg=$('blankModeAlert');
  if(!dlg)return;
  if(blankAlertTimer)clearInterval(blankAlertTimer);
  let left=5;
  const cd=$('blankModeCountdown'),ok=$('blankModeAlertOk');
  const render=()=>{
    if(cd)cd.textContent=`${left} 秒后自动关闭`;
    if(ok)ok.textContent=`知道了（${left}）`;
  };
  render();
  dlg.classList.add('show');
  blankAlertTimer=setInterval(()=>{
    left--;
    if(left<=0){hideBlankModeAlert();return;}
    render();
  },1000);
}
function hideBlankModeAlert(){
  if(blankAlertTimer){clearInterval(blankAlertTimer);blankAlertTimer=null;}
  const dlg=$('blankModeAlert');
  if(dlg)dlg.classList.remove('show');
}
async function enterBlankMode(){
  blankMode=true;
  clearApiPassword();
  data=seed();
  data.settings=data.settings||{};
  data.settings.assetSnapshots=[];
  hideLoginModal();
  await startApp(true);
  setTimeout(showBlankModeAlert,120);
}
async function handleLogin(){
  const pwd=($('loginPassword')?.value||'').trim();
  if(!pwd){toast('请输入访问密码');return false}
  $('loginBtn').disabled=true;
  $('loginBtn').textContent='验证中...';
  try{
    const result=await verifyApiPassword(pwd);
    if(result.success){
      setApiPassword(pwd);
      hideLoginModal();
      toast('登录成功');
      await startApp();
      return true;
    }
    await enterBlankMode();
    return false;
  }catch(e){
    toast('登录失败，请检查服务器接口');
  }finally{
    $('loginBtn').disabled=false;
    $('loginBtn').textContent='进入账本';
  }
  return false;
}
function logoutApp(){
  clearApiPassword();
  toast('已退出登录','success');
  setTimeout(()=>location.reload(),350);
}
function copyDebugInfo(){
  const d=load();
  const info=[
    'TT日常记账调试信息',
    '前端版本：'+APP_VERSION,
    '构建日期：'+APP_BUILD_DATE,
    '缓存版本：'+APP_CACHE_VERSION,
    '账单数量：'+(d.txs||[]).length,
    '账户数量：'+(d.accs||[]).length,
    '当前页面：'+currentPage,
    '时间：'+localDateTimeStr()
  ].join('\n');
  navigator.clipboard?.writeText(info).then(()=>toast('调试信息已复制','success')).catch(()=>toast(info));
}
function markAppCacheFresh(){
  try{localStorage.setItem(STORE+'_app_cache_version',APP_CACHE_VERSION)}catch(e){}
}
function isAppCacheFresh(){
  try{return localStorage.getItem(STORE+'_app_cache_version')===APP_CACHE_VERSION}catch(e){return true}
}
function autoClearPageCache(){
  try{
    if(localStorage.getItem(STORE+'_app_cache_version')===APP_CACHE_VERSION)return;
    if(window.caches&&caches.keys){
      caches.keys().then(keys=>keys.forEach(k=>caches.delete(k))).catch(()=>{});
    }
  }catch(e){}
}
/* ========== 主题色系统 ========== */
const THEME_COLORS={
  purple:{primary:'#6366f1',light:'#818cf8',label:'紫罗兰'},
  blue:{primary:'#3b82f6',light:'#60a5fa',label:'海蓝'},
  green:{primary:'#10b981',light:'#34d399',label:'薄荷'},
  orange:{primary:'#f97316',light:'#fb923c',label:'橙光'},
  pink:{primary:'#ec4899',light:'#f472b6',label:'桃粉'},
  teal:{primary:'#14b8a6',light:'#2dd4bf',label:'青绿'}
};
function applyThemeColor(colorName){
  const theme=THEME_COLORS[colorName]||THEME_COLORS.purple;
  const r=document.documentElement.style;
  r.setProperty('--primary',theme.primary);
  r.setProperty('--primary-light',theme.light);
  r.setProperty('--primary-soft',theme.primary+'1f');
  // 更新 meta theme-color
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.content=theme.primary;
}
function renderThemeColorSettings(){
  const container=$('themeColorSettings');
  if(!container)return;
  const d=load();
  const current=(d.settings&&d.settings.themeColor)||'purple';
  container.innerHTML='';
  Object.entries(THEME_COLORS).forEach(([name,{primary,light,label}])=>{
    const dot=document.createElement('button');
    dot.type='button';
    dot.style.cssText=`display:flex;align-items:center;gap:6px;height:34px;padding:0 10px;border-radius:999px;cursor:pointer;background:var(--surface);border:1px solid var(--border);color:var(--text-secondary);font-size:12px;font-weight:900;transition:transform .2s,box-shadow .2s;flex-shrink:0;`;
    dot.innerHTML=`<i style="display:inline-block;width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,${primary},${light})"></i>${label}`;
    if(name===current){
      dot.style.border='1px solid '+primary;
      dot.style.boxShadow='0 0 0 2px '+primary+',0 2px 8px rgba(0,0,0,.2)';
      dot.style.color='var(--primary)';
    }
    dot.title=label;
    dot.addEventListener('click',()=>{
      d.settings.themeColor=name;
      save(d);
      applyThemeColor(name);
      toast('主题色已切换');
      renderThemeColorSettings();
    });
    container.appendChild(dot);
  });
}

function renderSoundSetting(){
  if(!$('soundToggleState'))return;
  const mode=getInteractionSoundMode();
  const label={off:'关闭',light:'轻量',full:'完整'}[mode]||'关闭';
  $('soundToggleState').innerHTML=`<span class="status-badge ${mode==='off'?'':'system'}">${label}</span>`;
}

function toggleSuccessSound(){
  const d=load();
  d.settings=d.settings||{};
  const cur=getInteractionSoundMode();
  d.settings.interactionSoundMode=cur==='off'?'light':cur==='light'?'full':'off';
  d.settings.successSound=d.settings.interactionSoundMode!=='off';
  save(d);data=d;
  renderSoundSetting();
  if(d.settings.interactionSoundMode!=='off')playInteractionSound('success',true);
  toast(`交互音效已切换为：${{off:'关闭',light:'轻量',full:'完整'}[d.settings.interactionSoundMode]}`,'success');
}

function getInteractionSoundMode(){
  const s=load().settings||{};
  return s.interactionSoundMode||(s.successSound?'light':'off');
}

function playInteractionSound(kind='click',force=false){
  const mode=getInteractionSoundMode();
  if(mode==='off'&&!force)return;
  if(mode==='light'&&kind==='click'&&!force)return;
  const now=performance.now();
  if(!force&&now-lastInteractionSoundAt<150)return;
  lastInteractionSoundAt=now;
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return;
    const ctx=new Ctx();
    const gain=ctx.createGain();
    const osc=ctx.createOscillator();
    osc.type='sine';
    const freq={click:520,dbl:720,success:880,error:220}[kind]||520;
    osc.frequency.setValueAtTime(freq,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(kind==='error'?180:freq*1.35,ctx.currentTime+.08);
    gain.gain.setValueAtTime(.001,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(kind==='click' ? .018 : .04,ctx.currentTime+.015);
    gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+(kind==='click' ? .09 : .16));
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime+(kind==='click' ? .1 : .18));
    setTimeout(()=>ctx.close&&ctx.close(),260);
  }catch(e){}
}

function playSuccessSound(){playInteractionSound('success');}
function playTapSound(){playInteractionSound('click');}

/* ========== 自定义快捷键系统 ========== */
const DEFAULT_SHORTCUTS={
  new_expense:'n',new_income:'i',new_transfer:'t',new_invest:'v',
  asset_snapshot:'w',search:'/',
  page_home:'a',page_bills:'s',page_investment:'d',page_stats:'f',page_accounts:'g',page_settings:'h',
  refresh:'r',shortcut_guide:'j'
};
// 不可自定义的快捷键（组合键/特殊键）
const NON_CUSTOMIZABLE=['command_palette','sync_save','save_modal','esc','calendar','double_click'];
function normalizeShortcutKey(key){
  const raw=String(key||'').trim();
  if(!raw)return '';
  const lower=raw.toLowerCase();
  const map={control:'ctrl',ctrl:'ctrl',escape:'escape',esc:'escape',' ':'space',spacebar:'space',space:'space',arrowleft:'arrowleft',arrowright:'arrowright',arrowup:'arrowup',arrowdown:'arrowdown'};
  return map[lower]||lower;
}
function formatShortcutKey(key){
  const k=normalizeShortcutKey(key);
  const names={ctrl:'Ctrl',escape:'Esc',space:'Space',arrowleft:'←',arrowright:'→',arrowup:'↑',arrowdown:'↓'};
  if(names[k])return names[k];
  return k.length===1?k.toUpperCase():k;
}
function getShortcutKey(action,defaultKey){
  const d=load();
  const custom=d.settings&&d.settings.customKeys&&d.settings.customKeys[action];
  if(custom&&custom!=='')return normalizeShortcutKey(custom);
  return defaultKey;
}
function keyMatches(e,action,defaultKey){
  const key=getShortcutKey(action,defaultKey);
  if(!key)return false;
  const k=normalizeShortcutKey(key);
  const eventKey=String(e.key||'').toLowerCase();
  const code=String(e.code||'');
  if(k==='ctrl')return e.key==='Control'&&!e.altKey&&!e.shiftKey&&!e.metaKey;
  if(k==='escape')return e.key==='Escape';
  if(k==='space')return e.key===' ';
  if(k==='arrowleft'||k==='arrowright'||k==='arrowup'||k==='arrowdown')return eventKey===k;
  if(eventKey===k)return true;
  if(k.length===1&&/[a-z]/.test(k)&&code==='Key'+k.toUpperCase())return true;
  if(k.length===1&&/[0-9]/.test(k)&&code==='Digit'+k)return true;
  if(k==='/'&&code==='Slash')return true;
  return false;
}
function renderShortcutEditor(){
  const grid=$('shortcutGrid');
  if(!grid)return;
  const d=load();
  const customKeys=(d.settings&&d.settings.customKeys)||{};
  const items=grid.querySelectorAll('.shortcut-item[data-action]');
  const used={};
  Object.entries(DEFAULT_SHORTCUTS).forEach(([action,def])=>{
    const key=normalizeShortcutKey(customKeys[action]||def||'');
    if(key)used[key]=[...(used[key]||[]),action];
  });
  const conflicts=Object.entries(used).filter(([,arr])=>arr.length>1);
  if($('shortcutConflictTip'))$('shortcutConflictTip').textContent=conflicts.length?`有 ${conflicts.length} 个快捷键冲突`:'';
  items.forEach(item=>{
    const action=item.dataset.action;
    if(!action||NON_CUSTOMIZABLE.includes(action))return;
    const keySpan=item.querySelector('.shortcut-key');
    if(!keySpan)return;
    // 更新显示的文字
    const defaultKey=DEFAULT_SHORTCUTS[action];
    if(defaultKey){
      const currentKey=customKeys[action]||defaultKey;
      keySpan.textContent=formatShortcutKey(currentKey);
      keySpan.title='点击修改';
      keySpan.style.cursor='pointer';
      keySpan.style.outline=(used[normalizeShortcutKey(currentKey)]||[]).length>1?'2px solid var(--expense)':'';
      // 确保只绑定一次事件
      if(!keySpan.dataset.editableBound){
        keySpan.dataset.editableBound='1';
        keySpan.addEventListener('click',()=>{
          if(keySpan.tagName==='INPUT')return;
          const currentVal=customKeys[action]||defaultKey;
          const input=document.createElement('input');
          input.type='text';
          input.value=formatShortcutKey(currentVal);
          input.maxLength=12;
          input.placeholder='按键';
          input.style.cssText='width:58px;height:24px;text-align:center;font-size:12px;font-weight:700;border:2px solid var(--primary);border-radius:6px;outline:none;background:var(--bg);color:var(--text);padding:0;';
          keySpan.textContent='';
          keySpan.appendChild(input);
          input.focus();
          input.select();
          let cancelled=false;
          function finishEdit(){
            if(cancelled)return;
            cancelled=true;
            const d2=load();
            d2.settings=d2.settings||{};
            d2.settings.customKeys=d2.settings.customKeys||{};
            d2.settings.customKeys[action]=normalizeShortcutKey(input.value);
            save(d2);
            renderShortcutEditor();
          }
          input.addEventListener('keydown',e=>{
            e.preventDefault();
            e.stopPropagation();
            if(e.key==='Escape'){
              cancelled=true;
              renderShortcutEditor();
              return;
            }
            if(e.key==='Backspace'||e.key==='Delete'){
              input.value='';
              finishEdit();
              return;
            }
            if(e.key==='Tab'||e.key==='CapsLock'||e.key==='Meta'||e.key==='Alt'||e.key==='Shift')return;
            input.value=formatShortcutKey(e.key);
            finishEdit();
          });
          input.addEventListener('blur',()=>{
            // 失焦时如果没取消就保存
            if(!cancelled)finishEdit();
          });
        });
      }
    }
  });
}

function resetShortcutKeys(){
  const d=load();d.settings=d.settings||{};d.settings.customKeys={};
  save(d);data=d;
  renderShortcutEditor();
  toast('快捷键已恢复默认','success');
}

function seed(){
  const cats=[
    // 支出 - 按消费频率从高到低排列
    {id:1,n:'餐饮',t:'expense',i:'🍜',c:'#f43f5e'},
    {id:2,n:'交通出行',t:'expense',i:'🚗',c:'#6366f1'},
    {id:3,n:'住房',t:'expense',i:'🏠',c:'#f59e0b'},
    {id:4,n:'购物',t:'expense',i:'🛍️',c:'#8b5cf6'},
    {id:5,n:'娱乐休闲',t:'expense',i:'🎮',c:'#ec4899'},
    {id:6,n:'医疗',t:'expense',i:'🏥',c:'#10b981'},
    {id:7,n:'人情',t:'expense',i:'🎁',c:'#f97316'},
    {id:8,n:'数码电子',t:'expense',i:'📱',c:'#06b6d4'},
    {id:9,n:'生活',t:'expense',i:'🏡',c:'#14b8a6'},
    {id:10,n:'学习',t:'expense',i:'📚',c:'#8b5cf6'},
    {id:11,n:'旅行',t:'expense',i:'✈️',c:'#0ea5e9'},
    {id:12,n:'通讯网络',t:'expense',i:'📶',c:'#64748b'},
    // 收入
    {id:20,n:'工资',t:'income',i:'💰',c:'#10b981'},
    {id:21,n:'兼职',t:'income',i:'💼',c:'#6366f1'},
    {id:22,n:'红包礼金',t:'income',i:'🧧',c:'#f43f5e'},
    {id:23,n:'退款/优惠',t:'income',i:'↩️',c:'#8b5cf6'},
    {id:24,n:'奖金',t:'income',i:'🏆',c:'#f59e0b'},
    // 投资
    {id:30,n:'股票',t:'invest',i:'📈',c:'#f43f5e'},
    {id:31,n:'基金',t:'invest',i:'📊',c:'#6366f1'},
    {id:32,n:'理财',t:'invest',i:'💎',c:'#f59e0b'}
  ];
  cats.forEach(c=>{if(c.t==='expense'&&c.budget==null)c.budget=0;});
  const accs=[
    {id:1,n:'现金',t:'cash',b:0,ib:0,ac:1},{id:2,n:'微信',t:'custom',b:0,ib:0,ac:1},{id:3,n:'支付宝',t:'custom',b:0,ib:0,ac:1},
    {id:4,n:'银行卡',t:'savings',b:0,ib:0,ac:1},{id:5,n:'信用卡',t:'debt',b:0,ib:0,ac:1},
    {id:6,n:'股票账户',t:'investment',b:0,ib:0,ac:1},{id:7,n:'基金账户',t:'investment',b:0,ib:0,ac:1}
  ];
  return {cats,accs,txs:[],budget:5000,book:1};
}
function load(){
  if(data)return data;
  try{const r=localStorage.getItem(STORE);if(r){const d=JSON.parse(r);normalizeData(d);return d;}}catch(e){}
  const s=seed();localStorage.setItem(STORE,JSON.stringify(s));return s;
}
function save(d){
  d=normalizeData(d);
  data=d;
  if(blankMode){
    setSaveStatus('saved','空账本');
    return;
  }
  localStorage.setItem(STORE,JSON.stringify(d));
  markAppCacheFresh();
  syncSave(d);
}
async function syncSave(d){
  if(blankMode)return true;
  try{
    setSaveStatus('saving','保存中');
    // 剥离 assetSnapshots，不写入主数据文件（单独存到 asset-snapshots.json）
    var dCopy=JSON.parse(JSON.stringify(d));
    if(dCopy.settings)dCopy.settings.assetSnapshots=undefined;
    var body=JSON.stringify(dCopy);
    const res=await apiFetch('data-api.php?action=save',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:body
    });
    if(!res.ok)throw new Error('HTTP '+res.status);
    setSaveStatus('saved','已保存');
    return true;
  }catch(e){console.warn('[syncSave] 保存失败:',e.message);setSaveStatus('error','保存失败');toast('保存失败：'+e.message,'error');return false;}
}
/* ========== 重新计算账户余额 ========== */
function recalcAllBalances(){
  openConfirmDialog(
    '将根据所有正常账单重新计算每个启用账户的余额，当前余额将被覆盖。是否继续？',
    doRecalcAllBalances,
    '重新计算账户余额'
  );
}
function doRecalcAllBalances(){
  closeConfirmDialog();
  const d=load();
  let changedCount=0;
  const details=[];
  d.accs.forEach(acc=>{
    if(acc.ac!==1)return;
    let base=acc.ib||0;
    d.txs.forEach(tx=>{
      if(tx.st!=='normal'||tx.balApplied!==true)return;
      if(String(tx.acc)!==String(acc.id))return;
      const amt=parseFloat(tx.amount)||0;
      if(tx.type==='expense'){base=+(base-amt).toFixed(2);}
      else if(tx.type==='income'||tx.type==='invest'){base=+(base+amt).toFixed(2);}
      else if(tx.type==='transfer'){
        base=+(base-amt).toFixed(2);/* 转出减 */
        /* 转入加在转入账户的循环中处理 */
      }
    });
    /* 转账转入加 */
    d.txs.forEach(tx=>{
      if(tx.st!=='normal'||tx.balApplied!==true)return;
      if(tx.type!=='transfer')return;
      if(String(tx.toAcc)!==String(acc.id))return;
      const amt=parseFloat(tx.amount)||0;
      base=+(base+amt).toFixed(2);
    });
    const diff=Math.round((base-(acc.b||0))*100)/100;
    if(diff!==0){
      details.push(acc.n+': '+fmt(acc.b)+' → '+fmt(base)+' ('+(diff>0?'+':'')+fmt(diff)+')');
      acc.b=base;
      changedCount++;
    }
  });
  if(changedCount>0){
    logAction(d,'重新计算账户余额','共调整 '+changedCount+' 个账户: '+details.join('; '));
    save(d);data=d;
    renderHome();renderAccounts();
  }
  closeConfirmDialog();
  toast('已重新计算所有账户余额，共调整 '+changedCount+' 个账户','success');
}

/* 总资产快照独立同步（存到 asset-snapshots.json） */
var assetSaveTimer=null;
function syncAssetSave(snaps){
  if(blankMode)return;
  if(assetSaveTimer)clearTimeout(assetSaveTimer);
  assetSaveTimer=setTimeout(async function(){
    try{
      setSaveStatus('saving','快照保存中');
      await apiFetch('data-api.php?action=assetSnapshots&sub=save',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(snaps)
      });
      setSaveStatus('saved','快照已保存');
      console.log('[syncAssetSave] 已同步'+snaps.length+'条快照到服务器');
    }catch(e){console.warn('[syncAssetSave] 同步失败:',e.message);setSaveStatus('error','快照保存失败');toast('总资产快照保存失败：'+e.message,'error');}
    assetSaveTimer=null;
  },300);
}
async function syncAssetLoad(){
  try{
    var res=await apiFetch('data-api.php?action=assetSnapshots&sub=load');
    if(!res.ok)return null;
    var result=await res.json();
    if(result.success&&Array.isArray(result.data))return result.data;
    return null;
  }catch(e){return null;}
}
async function initData(){
  try{
    const cached=localStorage.getItem(STORE);
    if(cached&&isAppCacheFresh()){
      data=normalizeData(JSON.parse(cached));
      // 异步拉取服务器主数据
      apiFetch('data-api.php?action=load').then(r=>r.json()).then(result=>{
        if(result.success&&result.data){
          data=normalizeData(result.data);
          // 同步拉取服务器总资产快照（独立文件）
          syncAssetLoad().then(function(snaps){
            if(snaps){
              data.settings=data.settings||{};
              data.settings.assetSnapshots=snaps;
            }
            localStorage.setItem(STORE,JSON.stringify(data));
            markAppCacheFresh();
            runCategoryCleanupMigration();
            runDiscountBalanceMigration();
            fillMonths();fillCats();
            currentPage==='home'?renderHome():refreshAllViews();
          });
        }
      }).catch(()=>{});
      return;
    }
  }catch(e){}
  try{
    const res=await apiFetch('data-api.php?action=load');
    const result=await res.json();
    if(result.success&&result.data){
      data=normalizeData(result.data);
      localStorage.setItem(STORE,JSON.stringify(data));
      markAppCacheFresh();
      return;
    }
  }catch(e){}
  // 服务器无数据，尝试本地缓存
  try{
    const r=localStorage.getItem(STORE);
    if(r){
      data=normalizeData(JSON.parse(r));
      markAppCacheFresh();
      return;
    }
  }catch(e){}
  // 都没有则生成种子数据 + 演示假数据
  seedDemoDataIfEmpty();
  syncSave(data);
}

function seedDemoDataIfEmpty(){
  // 如果已有数据则跳过
  if(data.txs&&data.txs.length>0)return;
  const now=new Date();
  const y=now.getFullYear(),m=now.getMonth()+1;
  // 生成近3个月的演示数据
  const demoExpenses=[
    {cat:1,desc:'午餐外卖',amt:28.5},{cat:1,desc:'晚餐聚餐',amt:156},{cat:1,desc:'早餐',amt:8},{cat:1,desc:'咖啡',amt:22},{cat:1,desc:'超市买菜',amt:68.3},{cat:1,desc:'水果',amt:35},{cat:1,desc:'下午茶',amt:18},
    {cat:2,desc:'地铁通勤',amt:6},{cat:2,desc:'打车',amt:32},{cat:2,desc:'加油',amt:200},{cat:2,desc:'公交车',amt:2},
    {cat:3,desc:'房租',amt:2500},{cat:3,desc:'水电费',amt:186.5},{cat:3,desc:'物业费',amt:120},
    {cat:4,desc:'网购衣服',amt:268},{cat:4,desc:'日用品',amt:56},{cat:4,desc:'鞋子',amt:399},{cat:4,desc:'淘宝',amt:88},
    {cat:5,desc:'电影票',amt:68},{cat:5,desc:'游戏充值',amt:128},{cat:5,desc:'KTV',amt:180},
    {cat:6,desc:'感冒药',amt:42},{cat:6,desc:'体检',amt:380},
    {cat:7,desc:'朋友生日红包',amt:200},{cat:7,desc:'结婚礼金',amt:500},
    {cat:8,desc:'手机壳',amt:29},{cat:8,desc:'充电线',amt:19},
    {cat:9,desc:'纸巾',amt:18},{cat:9,desc:'洗衣液',amt:35},{cat:9,desc:'牙膏',amt:15},
    {cat:10,desc:'买书',amt:68},{cat:10,desc:'网课',amt:199},
    {cat:11,desc:'周末游',amt:680},{cat:11,desc:'高铁票',amt:320},
    {cat:12,desc:'手机话费',amt:50},{cat:12,desc:'宽带费',amt:80},
  ];
  const demoIncome=[
    {cat:20,desc:'工资',amt:12000},{cat:20,desc:'项目奖金',amt:3000},
    {cat:21,desc:'周末兼职',amt:800},{cat:22,desc:'微信红包',amt:88},{cat:22,desc:'抢红包',amt:66},
    {cat:23,desc:'淘宝退款',amt:56},{cat:24,desc:'季度奖金',amt:5000},
  ];
  const demoTxs=[];
  // 生成5月、6月、7月的数据
  for(let mo=m-2;mo<=m;mo++){
    const mm=mo<1?mo+12:mo; // 处理跨年
    const yy=mo<1?y-1:y;
    const daysInMonth=new Date(yy,mm,0).getDate();
    // 每月生成15-25笔支出
    const expCount=15+Math.floor(Math.random()*11);
    for(let i=0;i<expCount;i++){
      const exp=demoExpenses[Math.floor(Math.random()*demoExpenses.length)];
      const day=1+Math.floor(Math.random()*daysInMonth);
      const dd=String(day).padStart(2,'0'),mon=String(mm).padStart(2,'0');
      demoTxs.push({
        id:genId(),type:'expense',amount:exp.amt+(Math.random()*20-10).toFixed(1)*1,
        acc:Math.floor(Math.random()*3)+2, // 微信/支付宝/银行卡
        date:`${yy}-${mon}-${dd}`,time:Math.floor(Math.random()*14+8)+':'+Math.floor(Math.random()*60).toString().padStart(2,'0'),
        desc:exp.desc,cat:exp.cat,st:'normal',status:'normal',tags:[],balApplied:true
      });
    }
    // 每月1-2笔收入
    const incCount=1+Math.floor(Math.random()*2);
    for(let i=0;i<incCount;i++){
      const inc=demoIncome[Math.floor(Math.random()*demoIncome.length)];
      const day=1+Math.floor(Math.random()*daysInMonth);
      const dd2=String(day).padStart(2,'0'),mon2=String(mm).padStart(2,'0');
      demoTxs.push({
        id:genId(),type:'income',amount:inc.amt+(Math.random()*100-50).toFixed(1)*1,
        acc:Math.floor(Math.random()*3)+2,date:`${yy}-${mon2}-${dd2}`,time:Math.floor(Math.random()*14+8)+':'+Math.floor(Math.random()*60).toString().padStart(2,'0'),
        desc:inc.desc,cat:inc.cat,st:'normal',status:'normal',tags:[],balApplied:true
      });
    }
    // 每月加一笔固定工资
    const monStr=String(mm).padStart(2,'0');
    demoTxs.push({
      id:genId(),type:'income',amount:12000,
      acc:4,date:`${yy}-${monStr}-15`,time:'09:30',
      desc:'工资',cat:20,st:'normal',status:'normal',tags:[],balApplied:true
    });
  }
  // 按日期倒序排列
  demoTxs.sort((a,b)=>b.date.localeCompare(a.date)||b.time.localeCompare(a.time));
  data.txs=demoTxs;
  // 更新账户余额
  data.accs.forEach(a=>{
    const incomeTxs=demoTxs.filter(t=>t.type==='income'&&t.acc===a.id);
    const expenseTxs=demoTxs.filter(t=>t.type==='expense'&&t.acc===a.id);
    a.b=(incomeTxs.reduce((s,t)=>s+t.amount,0)-expenseTxs.reduce((s,t)=>s+t.amount,0)).toFixed(2)*1;
    if(a.b<0)a.b=0;
  });
  data.accs[3].b=45000; // 银行卡储蓄
  data.accs[5].b=38000; // 股票账户
  data.accs[6].b=18000; // 基金账户
  data.budget=3000;
  localStorage.setItem(STORE,JSON.stringify(data));
  markAppCacheFresh();
}

async function reloadServerData(){
  try{
    const res=await apiFetch('data-api.php?action=load');
    const result=await res.json();
    if(result.success&&result.data){
      data=normalizeData(result.data);
      const snaps=await syncAssetLoad();
      if(snaps){
        data.settings=data.settings||{};
        data.settings.assetSnapshots=snaps;
      }
      localStorage.setItem(STORE,JSON.stringify(data));
      markAppCacheFresh();
      return true;
    }
  }catch(e){}
  return false;
}

function normalizeData(d){
  if(!d||!Array.isArray(d.txs))return d;
  let changed=false;
  if(!Array.isArray(d.cats))d.cats=[];
  d.cats.forEach(c=>{
    if(c.t==='expense'&&c.budget==null){c.budget=0;changed=true;}
    if(c.ac==null){c.ac=1;changed=true;}
  });
  // 去重分类：同名同类型且都活跃(ac=1)只保留id最小的，账单转移
  const catMap=new Map();
  d.cats.forEach(c=>{
    if(c.ac===0)return; // 已删除的不参与去重
    const key=c.t+':'+c.n;
    if(catMap.has(key)){
      const existing=catMap.get(key);
      // 转移账单到旧分类
      d.txs.forEach(t=>{if(String(t.cat)===String(c.id))t.cat=existing.id;});
      c.ac=0;changed=true;
    }else{
      catMap.set(key,c);
    }
  });
  if(!d.settings||Array.isArray(d.settings)){d.settings={};changed=true;}
  if(!Array.isArray(d.tags)){d.tags=[{id:genId(),n:'旅游',k:'project'},{id:genId(),n:'报销',k:'normal'},{id:genId(),n:'家庭',k:'normal'},{id:genId(),n:'必要支出',k:'need'},{id:genId(),n:'可选支出',k:'want'}];changed=true;}
  if(!Array.isArray(d.history)){d.history=[];changed=true;}
  if(!Array.isArray(d.settings.billColumns)){d.settings.billColumns=[...DEFAULT_COLUMNS];changed=true;}
  if(!Array.isArray(d.settings.searchHistory)){d.settings.searchHistory=[];changed=true;}
  if(!Array.isArray(d.settings.noteAliasRules)){d.settings.noteAliasRules=[];changed=true;}
  if(!Array.isArray(d.settings.assetSnapshots)){d.settings.assetSnapshots=[];changed=true;}
  if(d.settings.largeExpenseThreshold==null){d.settings.largeExpenseThreshold=500;changed=true;}
  if(!d.settings.quickNotes||typeof d.settings.quickNotes!=='object'||Array.isArray(d.settings.quickNotes)){d.settings.quickNotes={};changed=true;}
  if(!Array.isArray(d.rules)){
    d.rules=[
      {id:genId(),kw:'美团',type:'expense',cat:1},
      {id:genId(),kw:'饿了么',type:'expense',cat:1},
      {id:genId(),kw:'地铁',type:'expense',cat:2},
      {id:genId(),kw:'滴滴',type:'expense',cat:2}
    ];
    changed=true;
  }
  if(!Array.isArray(d.recurring))d.recurring=[];
  if(Array.isArray(d.accs)){
    const typeMap={bank:'savings',invest:'investment',wechat:'custom',alipay:'custom',other:'custom',credit:'debt'};
    d.accs.forEach(a=>{
      if(typeMap[a.t]){a.t=typeMap[a.t];changed=true;}
      if(a.t==='debt'&&a.b>0){a.b=-Math.abs(a.b);changed=true;}
      if(a.t==='receivable'&&a.b<0){a.b=Math.abs(a.b);changed=true;}
    });
  }
  const kept=[];
  d.txs.forEach(t=>{
    if(t.type==='invest'&&t.rate==null)t.rate='';
    if(!Array.isArray(t.tags))t.tags=[];
    if(!t.status)t.status='normal';
    kept.push(t);
  });
  if(changed)d.txs=kept;
  return d;
}

function shouldRollbackOnDelete(t){
  return t&&t.balApplied===true;
}

function rollbackTxBalance(d,t){
  const amount=parseFloat(t.amount)||0;
  const acc=d.accs.find(a=>String(a.id)===String(t.acc));
  if(t.type==='expense'){if(acc)acc.b=+(acc.b+amount).toFixed(2);}
  else if(t.type==='income'||t.type==='invest'){if(acc)acc.b=+(acc.b-amount).toFixed(2);}
  else if(t.type==='transfer'){
    const from=d.accs.find(a=>String(a.id)===String(t.acc));
    const to=d.accs.find(a=>String(a.id)===String(t.toAcc));
    if(from)from.b=+(from.b+amount).toFixed(2);
    if(to)to.b=+(to.b-amount).toFixed(2);
  }
}

function applyTxBalance(d,t){
  if(!t||!t.balApplied)return;
  const amount=parseFloat(t.amount)||0;
  const acc=d.accs.find(a=>String(a.id)===String(t.acc));
  if(t.type==='expense'){if(acc)acc.b=+(acc.b-amount).toFixed(2);}
  else if(t.type==='income'||t.type==='invest'){if(acc)acc.b=+(acc.b+amount).toFixed(2);}
  else if(t.type==='transfer'){
    const from=d.accs.find(a=>String(a.id)===String(t.acc));
    const to=d.accs.find(a=>String(a.id)===String(t.toAcc));
    if(from)from.b=+(from.b-amount).toFixed(2);
    if(to)to.b=+(to.b+amount).toFixed(2);
  }
}

/* ========== 工具 ========== */
let _homeAnimated=false;
function animateCount(elId,target,dur=600){
  const el=$(elId);if(!el)return;
  const start=0;const end=parseFloat(target)||0;
  const startTime=performance.now();
  function step(now){
    const p=Math.min((now-startTime)/dur,1);
    const ease=1-Math.pow(1-p,3);
    const cur=start+(end-start)*ease;
    el.textContent=fmt(cur);
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function toast(m,type){
  const t=$('toast');if(!t)return;
  const tp=toastType(m,type);
  const icon={success:'✅',warn:'⚠️',error:'❌',info:'🔔'}[tp]||'🔔';
  t.className='toast '+tp;
  t.innerHTML=icon+' '+esc(m);
  t.classList.add('show');
  if(tp==='error')playInteractionSound('error');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),tp==='error'?3200:2200);
}
function setSaveStatus(status,msg){
  const box=$('syncStatus'),txt=$('syncStatusText');if(!box||!txt)return;
  box.classList.remove('saving','saved','error');
  if(status)box.classList.add(status);
  txt.textContent=msg||{saving:'保存中',saved:'已保存',error:'保存失败',idle:'待同步'}[status]||'待同步';
  if(status==='saved'){
    clearTimeout(box._timer);
    box._timer=setTimeout(()=>{box.classList.remove('saved');txt.textContent='已同步';},2600);
  }
}
function showCoin(type){const el=$('successAnim'),coin=$('successCoin');coin.textContent=type==='expense'?'💸':'💰';el.classList.add('show');setTimeout(()=>el.classList.remove('show'),900)}
/* 浮动金额动画（支付宝风格） */
function showFloatAmount(type,amount,sourceEl){
  const el=$('floatAmountAnim');
  if(!el)return;
  const prefix=type==='expense'?'-':'+';
  el.textContent=prefix+fmt(amount);
  el.className='float-amount-anim'+(type==='income'?' income-type':'');
  // 定位在源元素上方
  let rect;
  if(sourceEl){rect=sourceEl.getBoundingClientRect();}
  else{rect={left:window.innerWidth/2,top:window.innerHeight/2};}
  el.style.left=rect.left+rect.width/2-40+'px';
  el.style.top=rect.top-10+'px';
  // 触发动画
  requestAnimationFrame(()=>{el.classList.add('fly');});
  setTimeout(()=>{el.classList.remove('fly');el.className='float-amount-anim';},1300);
}
/* 获取分类快捷备注（自定义 + 预设合并，去重） */
function getCategoryQuickNotes(catName){
  const d=load();
  const custom=(d.settings&&d.settings.quickNotes)||{};
  const alias={'交通':'交通出行','娱乐':'娱乐休闲','亲友':'家庭亲友','数码':'数码电子','护理':'个人护理','通讯':'通讯网络'};
  // 获取自定义备注
  let customList=custom[catName]&&custom[catName].length?[...custom[catName]]:[];
  if(!customList.length){const m=alias[catName];if(m&&custom[m]&&custom[m].length)customList=[...custom[m]];}
  // 获取预设备注
  let defaultList=CATEGORY_QUICK_NOTES[catName]&&CATEGORY_QUICK_NOTES[catName].length?[...CATEGORY_QUICK_NOTES[catName]]:[];
  if(!defaultList.length){const m=alias[catName];if(m&&CATEGORY_QUICK_NOTES[m]&&CATEGORY_QUICK_NOTES[m].length)defaultList=[...CATEGORY_QUICK_NOTES[m]];}
  // 合并：自定义在前，预设在后，去重
  const seen=new Set(customList);
  defaultList.forEach(n=>{if(!seen.has(n)){customList.push(n);seen.add(n);}});
  return customList;
}

/* ========== 手机端左滑操作 ========== */
function initTxSwipe(){
  let startX=0,startY=0,dragging=false,swiping=false,currentWrap=null;
  const THRESHOLD=100,BTN_WIDTH=140;
  function closeAllSwipe(instant=false){
    document.querySelectorAll('.tx-swipe-wrap.open').forEach(w=>{
      w.classList.remove('open');
      const item=w.querySelector('.tx-item');
      item.style.transition=instant?'none':'transform .3s cubic-bezier(.25,.8,.25,1)';
      item.style.transform='';
      if(instant){
        const btns=w.querySelector('.tx-swipe-btns');
        if(btns)btns.style.transition='none';
      }
    });
    currentWrap=null;
  }
  document.addEventListener('touchstart',e=>{
    const wrap=e.target.closest('.tx-swipe-wrap');
    if(!wrap)return;
    const item=wrap.querySelector('.tx-item');
    if(!item)return;
    // 如果已经打开，点击收起
    if(wrap.classList.contains('open')){
      closeAllSwipe();
      dragging=false;return;
    }
    // 关闭其他已打开的
    if(currentWrap&&currentWrap!==wrap)closeAllSwipe();
    const touch=e.touches[0];
    startX=touch.clientX;startY=touch.clientY;
    currentWrap=wrap;dragging=true;swiping=false;
  },{passive:true});
  document.addEventListener('touchmove',e=>{
    if(!dragging||!currentWrap)return;
    const touch=e.touches[0];
    const dx=touch.clientX-startX;
    const dy=touch.clientY-startY;
    if(!swiping){
      if(dx<-12&&Math.abs(dx)>Math.abs(dy)*1.5){
        swiping=true;
        // 恢复按钮transition（可能被instant关闭时去掉了）
        const btns=currentWrap.querySelector('.tx-swipe-btns');
        if(btns)btns.style.transition='';
      }else if(dx>5){
        // 向右滑忽略
      }else return;
    }
    if(!swiping)return;
    e.preventDefault();
    const item=currentWrap.querySelector('.tx-item');
    if(!item)return;
    // 只允许向左滑，加阻尼效果
    let moveD=0;
    if(dx<0){
      // 阻尼：越接近最大值越难拉
      const ratio=Math.abs(dx)/BTN_WIDTH;
      const damp=ratio>1?1:1-Math.pow(1-ratio,2)*0.4;
      moveD=Math.max(-BTN_WIDTH*1.1,dx*damp);
    }
    item.style.transition='none';
    item.style.transform=`translateX(${moveD}px)`;
  },{passive:false});
  document.addEventListener('touchend',e=>{
    if(!dragging){return;}
    dragging=false;
    if(!currentWrap)return;
    const touch=e.changedTouches[0];
    const dx=touch.clientX-startX;
    const item=currentWrap.querySelector('.tx-item');
    if(!item){currentWrap=null;return;}
    item.style.transition='transform .35s cubic-bezier(.22,1,.36,1)';
    if(swiping&&dx<-THRESHOLD){
      // 滑动超过阈值 → 展开按钮（带震动）
      item.style.transform=`translateX(-${BTN_WIDTH}px)`;
      currentWrap.classList.add('open');
      if(navigator.vibrate)navigator.vibrate(15);
      playTapSound();
    }else{
      // 回弹
      item.style.transform='';
      currentWrap.classList.remove('open');
    }
    currentWrap=null;swiping=false;
  });
  // 点击空白关闭
  document.addEventListener('touchstart',e=>{
    if(!e.target.closest('.tx-swipe-wrap')&&!e.target.closest('.tx-swipe-btns')){
      closeAllSwipe();
    }
  },{passive:true});
  // 按钮点击事件
  let swipeBtnClicked=false;
  document.addEventListener('click',e=>{
    const editBtn=e.target.closest('.tx-swipe-edit');
    const delBtn=e.target.closest('.tx-swipe-del');
    if(editBtn&&!swipeBtnClicked){
      swipeBtnClicked=true;
      e.preventDefault();e.stopPropagation();
      const sid=editBtn.dataset.sid;
      contextTxId=sid;
      handleContextCommand('editnow');
      // 不关闭swipe，让弹窗遮罩盖住；编辑弹窗关闭时自动收起swipe
      setTimeout(()=>{swipeBtnClicked=false;},600);
    }
    if(delBtn&&!swipeBtnClicked){
      swipeBtnClicked=true;
      e.preventDefault();e.stopPropagation();
      const sid=delBtn.dataset.sid;
      contextTxId=sid;
      handleContextCommand('delete');
      // 删除确认弹窗关闭后也会触发closeAllSwipe
      setTimeout(()=>{swipeBtnClicked=false;},600);
    }
  });
}
initTxSwipe();

/* ========== 快速记账 ========== */
function initQuickEntry(){
  const inp=$('quickEntryAmount');
  const hint=$('quickEntryHint');
  if(!inp)return;
  // 限制输入字符
  inp.addEventListener('keydown',e=>{
    const allowed=e.ctrlKey||e.metaKey||['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Enter','Escape'].includes(e.key);
    if(allowed)return;
    if(!/^[0-9+\-*/().\s]$/.test(e.key))e.preventDefault();
  });
  // 输入时更新计算提示
  inp.addEventListener('input',()=>{
    const clean=sanitizeAmountInput(inp.value);
    if(inp.value!==clean)inp.value=clean;
    const val=inp.value.trim();
    if(hint){
      if(val&&!/[+\-*/]/.test(val)){hint.textContent='';}
      else{
        try{
          const r=Function('"use strict";return ('+val+')')();
          if(Number.isFinite(r))hint.textContent='= '+r.toFixed(2);
          else hint.textContent='';
        }catch(e){hint.textContent='';}
      }
    }
  });
  // 回车触发快速记账（先收起键盘再弹分类）
  inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      e.preventDefault();
      const amount=parseAmountInput(inp.value);
      if(!amount||amount<=0){toast('请输入有效金额');return;}
      inp.blur();
      setTimeout(()=>openQuickCatPanel(amount),150);
    }
  });
  // 类型切换按钮
  document.querySelectorAll('[data-qe-type]').forEach(btn=>{
    btn.onclick=()=>{
      quickEntryType=btn.dataset.qeType;
      document.querySelectorAll('[data-qe-type]').forEach(b=>b.classList.toggle('active',b.dataset.qeType===quickEntryType));
    };
  });
  // 取消按钮
  $('quickCatCancel').onclick=()=>{$('quickCatOverlay').classList.remove('show');};
  // 点击遮罩关闭
  $('quickCatOverlay').addEventListener('click',e=>{
    if(e.target===$('quickCatOverlay'))$('quickCatOverlay').classList.remove('show');
  });
  // "记"按钮点击触发（先收起键盘再弹分类）
  $('quickEntryGo').onclick=()=>{
    const amount=parseAmountInput(inp.value);
    if(!amount||amount<=0){toast('请输入有效金额');inp.focus();return;}
    inp.blur();
    setTimeout(()=>openQuickCatPanel(amount),150);
  };
  // 管理快捷备注按钮
  $('quickCatManage').onclick=()=>{openQuickNotesManager();};
  // 管理弹窗关闭
  $('quickNotesManageClose').onclick=()=>{$('quickNotesManageOverlay').classList.remove('show');};
  $('quickNotesManageOverlay').addEventListener('click',e=>{
    if(e.target===$('quickNotesManageOverlay'))$('quickNotesManageOverlay').classList.remove('show');
  });
}
function openQuickCatPanel(amount){
  const overlay=$('quickCatOverlay');
  const grid=$('quickCatGrid');
  const title=$('quickCatTitle');
  const descInp=$('quickCatDesc');
  if(!overlay||!grid)return;
  title.textContent='选择分类 · '+fmt(amount);
  descInp.value='';
  // 渲染分类网格（排除隐藏分类，按排序字段排序）
  const d=load();
  const cats=d.cats.filter(c=>c.t===quickEntryType&&c.ac!==0).sort((a,b)=>(Number(a.ord)||Number(a.id)||0)-(Number(b.ord)||Number(b.id)||0));
  const isMobile=window.innerWidth<700;
  // 移动端支出分类按固定顺序排列
  let displayCats=cats;
  if(isMobile&&quickEntryType==='expense'){
    const mobileOrder=['餐饮','交通','住房','购物','娱乐','医疗','生活','人情','旅行','其他','学习','通讯','亲友'];
    const alias={交通出行:'交通',娱乐休闲:'娱乐',通讯网络:'通讯',医疗健康:'医疗',人情社交:'人情',学习成长:'学习'};
    const picked=new Set();
    displayCats=mobileOrder.map(name=>{
      const item=cats.find(c=>{
        const label=alias[c.n]||c.n;
        return label===name&&!picked.has(String(c.id));
      });
      if(item){picked.add(String(item.id));return {...item,mobileName:name};}
      return null;
    }).filter(Boolean);
    // 补充不在固定列表中的分类
    cats.forEach(c=>{if(!picked.has(String(c.id))){displayCats.push(c);}});
  }
  // 存储当前选中的分类ID
  let selectedCatId=null;
  grid.innerHTML=displayCats.map(c=>`<div class="qc-item" data-qc-id="${c.id}" style="--cat-color:${c.c}"><div class="qc-item-icon" style="background:${c.c}18;color:${c.c}">${c.i}</div><div class="qc-item-name">${esc(c.mobileName||c.n)}</div></div>`).join('');
  // 隐藏快捷备注和描述行
  $('quickCatNoteRow').style.display='none';
  $('quickCatDescRow').style.display='none';
  // 点击分类 → 高亮并显示快捷备注
  grid.querySelectorAll('.qc-item').forEach(item=>{
    item.onclick=()=>{
      // 取消之前的高亮
      grid.querySelectorAll('.qc-item').forEach(x=>x.style.borderColor='');
      item.style.borderColor='var(--primary)';
      selectedCatId=item.dataset.qcId;
      // 查找分类的快捷备注
      const cat=d.cats.find(c=>String(c.id)===String(selectedCatId));
      const noteRow=$('quickCatNoteRow');
      const descRow=$('quickCatDescRow');
      if(cat){
        const notes=getCategoryQuickNotes(cat.n);
        if(notes.length){
          const notesEl=$('quickCatNotes');
          $('quickCatNoteLabel').textContent=esc(cat.mobileName||cat.n)+' 快捷备注';
          notesEl.innerHTML=notes.map(n=>`<button class="qc-note-btn" data-note="${esc(n)}">${esc(n)}</button>`).join('');
          notesEl.querySelectorAll('.qc-note-btn').forEach(btn=>{
            btn.onclick=()=>{saveQuickEntry(amount,selectedCatId,btn.dataset.note);};
          });
          noteRow.style.display='block';
        }else{
          noteRow.style.display='none';
        }
      }
      // 显示备注输入行和保存按钮
      descRow.style.display='flex';
      descInp.value='';
      // 显示备注输入行和保存按钮（不自动focus，避免手机端弹出键盘）
    };
  });
  // 保存按钮
  $('quickCatSave').onclick=()=>{
    if(!selectedCatId){toast('请先选择分类');return;}
    saveQuickEntry(amount,selectedCatId,descInp.value.trim());
  };
  overlay.classList.add('show');
}
function saveQuickEntry(amount,catId,desc){
  $('quickCatOverlay').classList.remove('show');
  const d=load();
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  // 默认账户：微+银+信+E
  const defaultAcc=d.accs.find(a=>a.n==='微+银+信+E'&&a.ac!==0);
  const accId=defaultAcc?defaultAcc.id:null;
  const now=new Date();
  const dateVal=localDateStr();
  const tx={id:genId(),type:quickEntryType,amount,acc:accId,date:dateVal,time:now.toTimeString().slice(0,5),desc:desc||'',mood:'',cat:catId,st:'normal',balApplied:false,source:'quick'};
  d.txs.unshift(tx);
  applyTxBalance(d,tx);
  logAction(d,'快速记账',`${TYPE_MAP[quickEntryType]} ${fmt(amount)} · ${cat?cat.n:'未分类'}`);
  save(d);data=d;
  // 清空输入框
  $('quickEntryAmount').value='';
  $('quickEntryHint').textContent='';
  // 动画
  const entryBar=$('quickEntryBar');
  showCoin(quickEntryType);
  showFloatAmount(quickEntryType,amount,entryBar);
  playSuccessSound();
  refreshAllViews();
  highlightTx(tx.id);
  toast((quickEntryType==='expense'?'支出':'收入')+' '+fmt(amount)+' 已记录','success');
}
/* ========== 快捷备注管理 ========== */
function openQuickNotesManager(){
  const overlay=$('quickNotesManageOverlay');
  const grid=$('quickNotesManageGrid');
  if(!overlay||!grid)return;
  // 隐藏编辑区
  $('quickNotesEditRow').style.display='none';
  qnmSelectedCatId=null;qnmSelectedCatName='';
  // 渲染支出分类网格
  const d=load();
  const cats=d.cats.filter(c=>c.t==='expense'&&c.ac!==0).sort((a,b)=>(Number(a.ord)||Number(a.id)||0)-(Number(b.ord)||Number(b.id)||0));
  grid.innerHTML=cats.map(c=>`<div class="qc-item" data-qnm-id="${c.id}" style="--cat-color:${c.c}"><div class="qc-item-icon" style="background:${c.c}18;color:${c.c}">${c.i}</div><div class="qc-item-name">${esc(c.mobileName||c.n)}</div></div>`).join('');
  grid.querySelectorAll('.qc-item').forEach(item=>{
    item.onclick=()=>{
      grid.querySelectorAll('.qc-item').forEach(x=>x.style.borderColor='');
      item.style.borderColor='var(--primary)';
      qnmSelectedCatId=item.dataset.qnmId;
      const cat=d.cats.find(c=>String(c.id)===String(qnmSelectedCatId));
      qnmSelectedCatName=cat?cat.n:'';
      renderQuickNotesEdit();
    };
  });
  overlay.classList.add('show');
}
function renderQuickNotesEdit(){
  const row=$('quickNotesEditRow');
  const list=$('quickNotesEditList');
  const label=$('quickNotesEditLabel');
  if(!qnmSelectedCatId){row.style.display='none';return;}
  row.style.display='block';
  label.textContent=qnmSelectedCatName+' 快捷备注';
  const notes=getCategoryQuickNotes(qnmSelectedCatName);
  if(notes.length){
    list.innerHTML=notes.map((n,i)=>`<button class="qc-note-btn" data-idx="${i}">${esc(n)} <span style="color:var(--expense);margin-left:2px">✕</span></button>`).join('');
    list.querySelectorAll('.qc-note-btn').forEach(btn=>{
      btn.onclick=()=>{removeQuickNote(qnmSelectedCatName,parseInt(btn.dataset.idx));};
    });
  }else{
    list.innerHTML='<span style="font-size:12px;color:var(--text-tertiary)">暂无快捷备注，使用默认值</span>';
  }
}
function addQuickNote(catName,note){
  if(!note||!catName)return;
  const d=load();
  d.settings=d.settings||{};
  d.settings.quickNotes=d.settings.quickNotes||{};
  d.settings.quickNotes[catName]=d.settings.quickNotes[catName]||[];
  if(!d.settings.quickNotes[catName].includes(note)){
    d.settings.quickNotes[catName].push(note);
    save(d);data=d;
    renderQuickNotesEdit();
    toast('已添加','success');
  }else{toast('该备注已存在');}
}
function removeQuickNote(catName,idx){
  if(!catName)return;
  const d=load();
  d.settings=d.settings||{};
  d.settings.quickNotes=d.settings.quickNotes||{};
  if(d.settings.quickNotes[catName]&&d.settings.quickNotes[catName][idx]!==undefined){
    d.settings.quickNotes[catName].splice(idx,1);
    if(!d.settings.quickNotes[catName].length)delete d.settings.quickNotes[catName];
    save(d);data=d;
    renderQuickNotesEdit();
    toast('已删除');
  }
}
// 绑定管理弹窗的添加按钮和回车
$('quickNotesEditAdd').onclick=()=>{
  const val=$('quickNotesEditInput').value.trim();
  if(val){addQuickNote(qnmSelectedCatName,val);$('quickNotesEditInput').value='';}
};
$('quickNotesEditInput').addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();$('quickNotesEditAdd').click();}
});
initQuickEntry();

/* ========== 主题 ========== */
function applyTheme(){document.documentElement.classList.toggle('dark',isDark);const icon=$('btnTheme')?.querySelector('.tool-icon');if(icon)icon.textContent=isDark?'☀️':'🌙'}
applyTheme();
$('btnTheme').onclick=()=>{isDark=!isDark;localStorage.setItem('mint_dark',isDark?'1':'0');applyTheme();};
$('btnRefresh').onclick=()=>refreshCurrentPage(true);
if($('btnSearch'))$('btnSearch').onclick=()=>openSearch();
if($('btnCalendar'))$('btnCalendar').onclick=()=>openCalendar();
if($('syncStatus'))$('syncStatus').onclick=()=>{
  if(!$('syncStatus').classList.contains('error'))return;
  const d=load();
  syncSave(d);
  if(d.settings&&Array.isArray(d.settings.assetSnapshots))syncAssetSave(d.settings.assetSnapshots);
};

/* ========== 导航 ========== */
function switchPage(page){
  if(currentPage===page&&!$(('page'+page.charAt(0).toUpperCase()+page.slice(1)))?.classList.contains('hide'))return;
  var prevPage=currentPage;
  currentPage=page;
  document.body.classList.toggle('home-page',page==='home');
  document.querySelectorAll('.bot-tab, .sb-tab').forEach(t=>{
    t.classList.toggle('active', t.dataset.page===page);
  });
  // 离开统计页时，清除 renderStats 设置的内联样式，否则 hide 类的 display:none!important 无法覆盖内联 !important
  if(prevPage==='stats'){
    var sp=$('pageStats');
    if(sp)sp.removeAttribute('style');
    var cc=document.querySelector('#pageStats .asset-change-card');
    if(cc)cc.removeAttribute('style');
    var ll=document.querySelector('#pageStats .asset-ledger-layout');
    if(ll)ll.removeAttribute('style');
    var lr=document.querySelector('#pageStats .asset-ledger-left');
    if(lr)lr.removeAttribute('style');
    var ar=$('assetChangeRecords');
    if(ar)ar.removeAttribute('style');
    var tv=document.querySelector('#pageStats .asset-view-toggle');
    if(tv)tv.removeAttribute('style');
  }
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hide'));
  const id='page'+page.charAt(0).toUpperCase()+page.slice(1);
  const el=$(id); if(el) el.classList.remove('hide');
  if(page==='home')renderHome();
  if(page==='bills'){
    // 手机端也保留日账单，便于直接查看和筛选明细
    switchBillTab(currentBillTab);
  }
  if(page==='accounts')renderAccounts();
  if(page==='investment')renderInvestment();
  if(page==='stats')renderStats();
  if(page==='settings'){
    updateSettingsOverview();renderRuleManager();renderAmountRuleManager();renderAliasManager();renderBillEnhanceSettings();renderTagManager();renderColumnSettings();renderDataTools();renderHomeIndicatorSettings();renderThemeColorSettings();renderSoundSetting();renderShortcutEditor();
    reloadServerData().then(ok=>{
      if(ok&&currentPage==='settings'){
        updateSettingsOverview();renderRuleManager();renderAmountRuleManager();renderAliasManager();renderBillEnhanceSettings();renderTagManager();renderColumnSettings();renderDataTools();renderHomeIndicatorSettings();renderThemeColorSettings();renderSoundSetting();renderShortcutEditor();
      }
    });
  }
}
/* ========== 搜索页 ========== */
function openSearch(){
  const el=$('pageSearch');if(!el)return;
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hide'));
  el.classList.remove('hide');
  setTimeout(()=>{$('searchInput')?.focus();},100);
}
function closeSearch(){
  $('pageSearch')?.classList.add('hide');
  renderHome();
}
function doSearch(){
  const q=$('searchInput')?.value.trim().toLowerCase();
  const empty=$('searchEmpty');const results=$('searchResults');
  if(!q){empty.style.display='flex';if(results)results.style.display='none';return;}
  const data=load();
  const bills=(data.txs||[]).filter(t=>{
    if(!t)return false;
    // 搜索金额
    if(String(t.amount||'').includes(q))return true;
    // 搜索备注
    if((t.desc||'').toLowerCase().includes(q))return true;
    // 搜索分类名
    const cat=data.cats.find(c=>c.id===t.cat);
    if(cat&&cat.n.toLowerCase().includes(q))return true;
    // 搜索标签
    if(Array.isArray(t.tags)&&t.tags.some(tag=>tag.toLowerCase().includes(q)))return true;
    // 搜索日期
    if((t.date||'').includes(q))return true;
    return false;
  });
  if(empty)empty.style.display='none';
  if(results){
    if(bills.length===0){results.innerHTML='<div class="search-empty" style="padding:40px 0">未找到匹配账单</div>';}
    else{
      results.innerHTML=bills.sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))).map(b=>{
        const d=b.date||'';
        const cat=data.cats.find(c=>c.id===b.cat);
        const catName=cat?cat.n:'其他';
        const catIcon=cat?cat.i:'📄';
        const amt=b.type==='income'?'+'+fmt(b.amount):'-'+fmt(b.amount);
        const typeCls=b.type==='income'?'type-income':'type-expense';
        const cls=b.type==='income'?'income':'expense';
        return '<div class="tx-item '+typeCls+'" data-jump-tx="'+b.id+'" title="点击查看详情"><div class="tx-icon">'+catIcon+'</div><div class="tx-main"><div class="tx-title">'+esc(catName)+'</div><div class="tx-sub">'+(b.desc||'')+' · '+d+'</div></div><div class="tx-amount '+cls+'">'+amt+'</div></div>';
      }).join('');
    }
    results.style.display='block';
    // 绑定点击跳转
    results.querySelectorAll('[data-jump-tx]').forEach(el=>{
      el.onclick=()=>{closeSearch();switchPage('bills');setTimeout(()=>{jumpToBillTx(el.dataset.jumpTx);},200);};
    });
  }
}
/* ========== 日历页 ========== */
function openCalendar(){
  const el=$('pageCalendar');if(!el)return;
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hide'));
  el.classList.remove('hide');
  const now=new Date();
  calYear=now.getFullYear();calMonth=now.getMonth();
  calSelectedDate=formatDate(now);
  initCalBookSelect();
  renderCalendar();
}
function closeCalendar(){
  $('pageCalendar')?.classList.add('hide');
  $('calSheet')?.classList.remove('open');
  renderHome();
}
function initCalBookSelect(){
  const sel=$('calBookSelect');if(!sel)return;
  const data=load();
  const books=data.books||[{id:1,name:'日常账本'}];
  let html='<option value="all">全部账本</option>';
  books.forEach(b=>{html+='<option value="'+b.id+'">'+b.name+'</option>';});
  sel.innerHTML=html;
  sel.value=calBookFilter;
}
function prevCalMonth(){calMonth--;if(calMonth<0){calMonth=11;calYear--;}renderCalendar();}
function nextCalMonth(){calMonth++;if(calMonth>11){calMonth=0;calYear++;}renderCalendar();}
function showCalMonthPicker(){
  const y=prompt('输入年份:',calYear);
  if(!y)return;const yy=parseInt(y);if(isNaN(yy))return;
  const m=prompt('输入月份 (1-12):',calMonth+1);
  if(!m)return;const mm=parseInt(m);if(isNaN(mm)||mm<1||mm>12)return;
  calYear=yy;calMonth=mm-1;renderCalendar();
}
function renderCalendar(){
  const grid=$('calGridPage');const header=$('calMonthText');const sel=$('calBookSelect');
  if(!grid||!header)return;
  if(sel)calBookFilter=sel.value;
  header.textContent=calYear+'年'+String(calMonth+1).padStart(2,'0')+'月';
  const firstDay=new Date(calYear,calMonth,1).getDay();
  const daysInMonth=new Date(calYear,calMonth+1,0).getDate();
  const prevMonthDays=new Date(calYear,calMonth,0).getDate();
  const data=load();
  const allTxs=(data.txs||[]);
  const txs=calBookFilter==='all'?allTxs:allTxs.filter(t=>String(t.book||1)===String(calBookFilter));
  const dayTotals={};
  txs.forEach(t=>{
    if(!t||!t.date)return;
    if(!dayTotals[t.date])dayTotals[t.date]={income:0,expense:0};
    if(t.type==='income')dayTotals[t.date].income+=Number(t.amount||0);
    else dayTotals[t.date].expense+=Number(t.amount||0);
  });
  let html='';
  const startOffset=firstDay===0?6:firstDay-1;
  for(let i=startOffset-1;i>=0;i--){
    html+='<div class="cal-cell other-month"><span class="cal-day-num">'+(prevMonthDays-i)+'</span></div>';
  }
  const todayStr=formatDate(new Date());
  for(let d=1;d<=daysInMonth;d++){
    const dateStr=calYear+'-'+String(calMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    const isToday=dateStr===todayStr;
    const isSelected=dateStr===calSelectedDate;
    const dt=dayTotals[dateStr];
    let cls='cal-cell';if(isToday)cls+=' today';if(isSelected)cls+=' selected';
    let amountHtml='';
    if(dt){
      if(dt.expense>0)amountHtml+='<span class="cal-day-amount expense">-'+dt.expense.toFixed(0)+'</span>';
      else if(dt.income>0)amountHtml+='<span class="cal-day-amount income">+'+dt.income.toFixed(0)+'</span>';
    }
    html+='<div class="'+cls+'" onclick="selectCalDate(\''+dateStr+'\')" data-date="'+dateStr+'"><span class="cal-day-num">'+d+'</span>'+amountHtml+'</div>';
  }
  const totalCells=startOffset+daysInMonth;
  const remain=(7-totalCells%7)%7;
  for(let i=1;i<=remain;i++){
    html+='<div class="cal-cell other-month"><span class="cal-day-num">'+i+'</span></div>';
  }
  grid.innerHTML=html;
  if(calSelectedDate&&calSelectedDate.startsWith(calYear+'-'+String(calMonth+1).padStart(2,'0'))){
    selectCalDate(calSelectedDate);
  }else{
    $('calSheet')?.classList.remove('open');
  }
}
function selectCalDate(dateStr){
  calSelectedDate=dateStr;
  const cells=$('pageCalendar')?.querySelectorAll('.cal-cell');
  if(cells){
    cells.forEach(c=>c.classList.remove('selected'));
    cells.forEach(c=>{if(c.dataset.date===dateStr)c.classList.add('selected');});
  }
  const dateEl=$('calBillsDate');const totalEl=$('calBillsTotal');const list=$('calBillsList');const sheet=$('calSheet');
  if(!dateEl||!list||!sheet)return;
  const d=new Date(dateStr);
  const weekdays=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  const data=load();
  const cats=data.cats||[];
  const allTxs=(data.txs||[]);
  const txs=calBookFilter==='all'?allTxs:allTxs.filter(t=>String(t.book||1)===String(calBookFilter));
  const dayTxs=txs.filter(t=>t&&t.date===dateStr);
  const expTotal=dayTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount||0),0);
  const incTotal=dayTxs.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount||0),0);
  dateEl.textContent=String(d.getMonth()+1).padStart(2,'0')+'月'+String(d.getDate()).padStart(2,'0')+'日 '+weekdays[d.getDay()];
  let totalText='';
  if(expTotal>0)totalText+='支出：'+expTotal.toFixed(2)+' ';
  if(incTotal>0)totalText+='收入：'+incTotal.toFixed(2);
  if(!totalText)totalText='无收支';
  totalEl.textContent=totalText;
  if(dayTxs.length===0){list.innerHTML='<div style="text-align:center;padding:20px;color:#999;font-size:13px">暂无记录</div>';}
  else{
    list.innerHTML=dayTxs.sort((a,b)=>b.time?.localeCompare(a.time||'')).map(t=>{
      const cat=cats.find(c=>c.id===t.cat);
      const catName=cat?cat.n:(t.cat?'分类'+t.cat:'其他');
      const icon=cat?cat.i:'📄';
      const amt=t.type==='income'?'+'+Number(t.amount).toFixed(2):'-'+Number(t.amount).toFixed(2);
      return '<div class="tx-item"><div class="tx-icon">'+icon+'</div><div class="tx-main"><div class="tx-title">'+catName+'</div><div class="tx-sub">'+(t.desc||'')+'</div></div><div class="tx-amount">'+amt+'</div></div>';
    }).join('');
  }
  sheet.classList.add('open');
}
function addBillFromCalendar(){
  closeCalendar();
  openTx('expense');
  setTimeout(()=>{
    const dateInput=$('txDate');if(dateInput&&calSelectedDate)dateInput.value=calSelectedDate;
  },100);
}
function goCalendarToday(){
  const now=new Date();
  calYear=now.getFullYear();calMonth=now.getMonth();
  calSelectedDate=formatDate(now);
  renderCalendar();
}
function formatDate(d){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),dd=String(d.getDate()).padStart(2,'0');return y+'-'+m+'-'+dd;}
document.querySelectorAll('.bot-tab, .sb-tab').forEach(tab=>{
  tab.onclick=()=>{
    if(tab.classList.contains('fab-add')){
      openTx('expense');
      return;
    }
    const page=tab.dataset.page;
    if(!page)return;
    navigateDefault(page);
  };
});
document.body.classList.add('home-page');

function navigateDefault(page){
  resetPageDefaultState(page);
  if(page===currentPage){
    refreshCurrentPage(false);
  }else{
    switchPage(page);
  }
}

function resetPageDefaultState(page){
  if(page==='home'){
    homeBillMonth=localMonthStr();
    homeBillKeyword='';
    calViewDate=new Date();
    calendarMode='day';
    topExpenseRange='month';
    topExpenseSort='amount';
    fillMonths();
  }
  if(page==='bills'){
    resetBillsPageState();
    fillMonths();
    fillCats();
  }
  if(page==='investment'){
    investCalendarYear=new Date().getFullYear();
  }
}
function refreshAllViews(){
  fillMonths();
  fillCats();
  if(currentPage==='home')renderHome();
  if(currentPage==='bills'){renderBills();if(currentBillTab==='month')renderMonthBill();if(currentBillTab==='year')renderYearBill();}
  if(currentPage==='investment')renderInvestment();
  if(currentPage==='stats')renderStats();
  if(currentPage==='accounts')renderAccounts();
  if(currentPage==='settings'){updateSettingsOverview();renderRuleManager();renderAmountRuleManager();renderAliasManager();renderBillEnhanceSettings();renderTagManager();renderColumnSettings();renderDataTools();}
}

function refreshCurrentPage(showMsg=true){
  data=load();
  if(currentPage==='home'){
    homeBillMonth=localMonthStr();
    homeBillKeyword='';
    calViewDate=new Date();
    calendarMode='day';
    topExpenseRange='month';
    topExpenseSort='amount';
    fillMonths();
    renderHome();
  }else if(currentPage==='bills'){
    resetBillsPageState();
    fillMonths();
    fillCats();
    switchBillTab('day');
  }else if(currentPage==='investment'){
    investCalendarYear=new Date().getFullYear();
    renderInvestment();
  }else if(currentPage==='stats'){
    renderStats();
  }else if(currentPage==='accounts'){
    renderAccounts();
  }else if(currentPage==='settings'){
    updateSettingsOverview();
    renderRuleManager();renderAmountRuleManager();
    renderAliasManager();
    renderBillEnhanceSettings();
    renderTagManager();
    renderColumnSettings();
    renderDataTools();
    reloadServerData().then(ok=>{
      if(ok&&currentPage==='settings'){
        updateSettingsOverview();renderRuleManager();renderAmountRuleManager();renderAliasManager();renderBillEnhanceSettings();renderTagManager();renderColumnSettings();renderDataTools();
      }
    });
  }
  if(showMsg)toast('当前页面已恢复默认状态');
}

function resetBillsPageState(){
  currentBillTab='day';
  billViewMode='list';
  selectedBillId=null;
  selectedBatchIds.clear();
  pendingOnly=false;
  largeOnly=false;
  splitWorkbenchOn=false;
  currentBillCatFilter=null;
  currentBillAccountFilter=null;
  monthBillViewDate=new Date();
  yearBillViewDate=new Date();
  $('fType').value='';
  $('fKeyword').value='';
  if($('advancedFilterPanel'))$('advancedFilterPanel').classList.add('hide');
  ['advStart','advEnd','advMin','advMax','advAcc','advTag','advStatus','advSource','advDup'].forEach(id=>{if($(id))$(id).value='';});
  $('pendingOnlyBtn')?.classList.remove('active');
  $('largeOnlyBtn')?.classList.remove('active');
  $('splitWorkbenchBtn')?.classList.remove('active');
  selectedBillId=null;
}
/* PC 端显示顶部导航 */
function applyResponsiveNav(){
  const isPC = window.innerWidth >= 1024;
  document.querySelector('.top-nav')?.style.setProperty('display', isPC ? 'flex' : 'none');
  const bnav = document.querySelector('.bottom-nav');
  if(bnav) bnav.style.display = isPC ? 'none' : '';
}
applyResponsiveNav();
window.addEventListener('resize',()=>{applyResponsiveNav();requestAnimationFrame(alignHomeExpenseRank);});

/* ========== 首页 ========== */
function renderHome(){
  const d=load();
  // 首页指标显隐控制
  const indicators=d.settings.homeIndicators&&d.settings.homeIndicators.length?d.settings.homeIndicators:['wallet','networth','calendar','toprank','monthInsight','persona'];
  const indSet=new Set(indicators);
  const walletEl=document.querySelector('#pageHome .wallet-card');
  const networthEl=document.querySelector('#pageHome .networth-card');
  const calendarEl=document.querySelector('#pageHome .calendar-card');
  const toprankEl=document.querySelector('#pageHome .top-expense-card');
  const personaEl=document.querySelector('#pageHome .persona-card');
  if(walletEl)walletEl.style.display=indSet.has('wallet')?'':'none';
  if(networthEl)networthEl.style.display=indSet.has('networth')?'':'none';
  if(calendarEl)calendarEl.style.display=indSet.has('calendar')?'':'none';
  if(toprankEl)toprankEl.style.display=indSet.has('toprank')?'':'none';
  if(personaEl)personaEl.style.display=indSet.has('persona')?'':'none';
  // 月度洞察
  const miEl=$('monthInsight');
  if(miEl)miEl.style.display=indSet.has('monthInsight')?'':'none';

  const ym=localMonthStr();
  const month=d.txs.filter(t=>t.st==='normal'&&t.date.indexOf(ym)===0);
  const inc=month.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const exp=month.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const bal=inc-exp;
  const total=d.accs.reduce((s,a)=>s+a.b,0);

  if(!_homeAnimated){
    animateCount('wIncome',inc,500);
    animateCount('wExpense',exp,500);
    animateCount('wBalance',bal,700);
    _homeAnimated=true;
  }else{
    $('wIncome').textContent=fmt(inc);
    $('wExpense').textContent=fmt(exp);
    $('wBalance').textContent=fmt(bal);
    if($('wIncome2'))$('wIncome2').textContent=fmt(inc).replace('¥','');
    if($('wExpense2'))$('wExpense2').textContent=fmt(exp).replace('¥','');
  }
  $('wBalance').classList.toggle('negative',bal<0);

  // 预算进度条
  const budgetBar=$('budgetBar');
  if(budgetBar){
    const budget=Number(d.budget)||0;
    const rawPct=budget>0?(exp/budget)*100:0;
    const pct=budget>0?Math.min(rawPct,100):0;
    const today=new Date();
    const monthDays=new Date(today.getFullYear(),today.getMonth()+1,0).getDate();
    const leftDays=Math.max(monthDays-today.getDate(),0);
    const remain=Math.max(budget-exp,0);
    const daily=leftDays>0?remain/leftDays:remain;
    $('wBudget').textContent=budget>0?fmt(budget):'未设置';
    if($('wBudgetSub'))$('wBudgetSub').textContent=budget>0?`剩余 ${fmt(remain)} · 日均可花 ${fmt(daily)} · 已用 ${Math.round(rawPct)}%`:'点击设置月预算';
    budgetBar.style.width=pct+'%';
    budgetBar.classList.toggle('over',budget>0&&exp>budget);
  }
  // 手机端独立预算进度卡片
  const homeBudgetBar=$('homeBudgetBar');
  if(homeBudgetBar){
    const budget=Number(d.budget)||0;
    const rawPct=budget>0?(exp/budget)*100:0;
    const pct=budget>0?Math.min(rawPct,100):0;
    const remain=Math.max(budget-exp,0);
    homeBudgetBar.style.width=pct+'%';
    const homeBudgetInfo=$('homeBudgetInfo');
    if(homeBudgetInfo){
      homeBudgetInfo.textContent=budget>0?`已花费 ${fmt(exp)} / ${fmt(budget)} · 剩余 ${fmt(remain)}`:'未设置月预算';
    }
  }

  // 日历
  renderCalendar(d.txs);

  // 一句话：首次随机，点击可切换下一条
  if(quoteIndex<0)quoteIndex=Math.floor(Math.random()*QUOTES.length);
  const q=QUOTES[quoteIndex];
  $('quoteText').innerHTML=esc(q.t)+'<span class="quote-author">'+esc(q.a)+'</span>';

  // 人格
  const catSpend={};
  month.filter(t=>t.type==='expense').forEach(t=>{catSpend[t.cat]=(catSpend[t.cat]||0)+t.amount});
  let maxCat=Object.keys(catSpend).sort((a,b)=>catSpend[b]-catSpend[a])[0];
  let pi=2; // 默认理性理财家
  if(maxCat==='1')pi=1; if(maxCat==='4')pi=3; if(maxCat==='7')pi=4;
  const rate=inc>0?Math.round((bal/inc)*100):0;
  const persona=PERSONAS[pi];

  // 迷你支出分布条（取前3分类）
  const totalExp=Object.values(catSpend).reduce((s,v)=>s+v,0);
  let barHtml='';
  if(totalExp>0){
    const topCats=Object.entries(catSpend).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const segs=topCats.map(([cid,amt])=>{
      const c=d.cats.find(x=>String(x.id)===String(cid));
      const pct=Math.round((amt/totalExp)*100);
      return `<div class="p-bar-seg" style="width:${pct}%;background:${c?c.c:'#94a3b8'}"></div>`;
    }).join('');
    const labels=topCats.map(([cid,amt])=>{
      const c=d.cats.find(x=>String(x.id)===String(cid));
      return `<span class="p-bar-label"><i style="background:${c?c.c:'#94a3b8'}"></i>${c?c.n:'其他'} ${Math.round((amt/totalExp)*100)}%</span>`;
    }).join('');
    barHtml=`<div class="p-bar-wrap">${segs}</div><div class="p-bar-labels">${labels}</div>`;
  }

  $('personaCard').innerHTML=`<div class="persona-tag">🏷️ 消费人格</div>
    <div class="persona-title">${persona.i} ${persona.t}</div>
    <div class="persona-desc">${persona.d.replace('XX',rate)}</div>
    ${barHtml}`;

  // 首页日账单（可切换月份，默认当月）
  if(!homeBillMonth)homeBillMonth=localMonthStr();
  if($('homeBillMonth'))$('homeBillMonth').value=homeBillMonth;
  if($('homeBillKeyword'))$('homeBillKeyword').value=homeBillKeyword;
  const homeMonthTxs=d.txs.filter(t=>t.st==='normal'&&String(t.date||'').indexOf(homeBillMonth)===0);
  const homeKw=String(homeBillKeyword||'').toLowerCase().trim();
  const recent=homeMonthTxs.filter(t=>!homeKw||matchBillKeywordWithQuery(t,homeKw,d)).sort((a,b)=>b.date.localeCompare(a.date)||(b.time||'').localeCompare(a.time||''));
  const grouped=groupByDate(recent);
  const homeMonthLabel=homeBillMonth?homeBillMonth.replace('-','年')+'月':'所选月份';
  $('recentList').innerHTML=recent.length?grouped.map(g=>dateGroupHtml(g,false,true,homeKw)).join(''):`<div class="empty"><span class="em">📝</span><div class="empty-title">${homeKw?'没有匹配的日账单':homeMonthLabel+'暂无记录'}</div><div class="empty-desc">${homeKw?'换个关键词试试':'可切换其他月份，或点击底部 + 开始记账'}</div></div>`;
  $('recentList').querySelectorAll('[data-del]').forEach(b=>b.onclick=e=>{e.stopPropagation();confirmDel(b.dataset.del)});
  bindTxEditors($('recentList'));

  // 侧边栏
  renderMonthInsight(d,month,inc,exp,bal);
  renderAccountSnapshot(d);
  renderTopExpenses();
  renderNetWorth();
  bindHomeCardSort();
  requestAnimationFrame(alignHomeExpenseRank);
}

function bindHomeCardSort(){
  const box=document.querySelector('#pageHome .col-right');
  if(!box)return;
  const cards=Array.from(box.children);
  cards.forEach((card,i)=>{
    if(!card.dataset.homeCard)card.dataset.homeCard=card.classList.contains('calendar-card')?'calendar':card.classList.contains('top-expense-card')?'rank':'card'+i;
    card.draggable=true;
    card.title=card.title||'可拖拽调整首页卡片顺序';
  });
  const order=load().settings?.homeCardOrder||[];
  if(order.length){
    order.map(id=>cards.find(c=>c.dataset.homeCard===id)).filter(Boolean).forEach(c=>box.appendChild(c));
  }
  let dragging=null;
  box.querySelectorAll('[data-home-card]').forEach(card=>{
    card.ondragstart=e=>{dragging=card;card.classList.add('dragging');e.dataTransfer.effectAllowed='move';};
    card.ondragover=e=>{
      e.preventDefault();
      if(!dragging||dragging===card)return;
      const rect=card.getBoundingClientRect();
      box.insertBefore(dragging,e.clientY>rect.top+rect.height/2?card.nextSibling:card);
    };
    card.ondragend=()=>{
      if(dragging)dragging.classList.remove('dragging');
      dragging=null;
      const d=load();d.settings=d.settings||{};d.settings.homeCardOrder=Array.from(box.querySelectorAll('[data-home-card]')).map(c=>c.dataset.homeCard);save(d);data=d;toast('首页卡片顺序已保存');
    };
  });
}

function alignHomeExpenseRank(){
  const rank=document.querySelector('#pageHome .top-expense-card');
  const calendar=document.querySelector('#pageHome .calendar-card');
  const daily=document.querySelector('#pageHome .col-main .list-card');
  const quick=document.querySelector('#pageHome .col-main .quick-row');
  if(!rank||!calendar||!daily||!quick)return;
  rank.style.marginTop='0px';
  calendar.style.height='';
  if(!window.matchMedia('(min-width:1024px)').matches)return;
  const calTop=calendar.getBoundingClientRect().top;
  const quickBottom=quick.getBoundingClientRect().bottom;
  let targetHeight=Math.max(0,quickBottom-calTop);
  if(calendar.classList.contains('calendar-year-active'))targetHeight=Math.max(targetHeight,380);
  if(targetHeight)calendar.style.height=targetHeight+'px';
  const naturalTop=rank.getBoundingClientRect().top;
  const targetTop=daily.getBoundingClientRect().top;
  rank.style.marginTop=Math.max(0,targetTop-naturalTop)+'px';
}

function renderMonthInsight(d,month,inc,exp,bal){
  const days=avgDaysForMonth(new Date());
  const avg=days?exp/days:0;
  const maxExp=[...month].filter(t=>t.type==='expense').sort((a,b)=>b.amount-a.amount)[0];
  const maxCatName=maxExp?(d.cats.find(c=>c.id===maxExp.cat)?.n||''):'';
  const maxExpNote=maxExp?(String(maxExp.desc||'').trim()||maxCatName):'';
  const streak=bookkeepingStreak(d);
  const today=localDateStr();
  const todayCount=month.filter(t=>t.date===today).length;
  const todayExp=month.filter(t=>t.type==='expense'&&t.date===today).reduce((s,t)=>s+t.amount,0);
  const now=new Date();
  const dayBudget=(Number(d.budget)||0)/new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
  const remain=dayBudget-todayExp;
  const pct=dayBudget>0?Math.min(100,Math.max(0,todayExp/dayBudget*100)):0;
  const budgetVal=dayBudget>0?`<div>${fmt(todayExp)} / ${fmt(dayBudget)}</div>`:'<div>未设置预算</div>';
  $('monthInsight').innerHTML=[
    [
      {label:'本月笔数',val:`${month.length} 笔`},
      {label:'今日笔数',val:`${todayCount} 笔`,title:`今天已记录 ${todayCount} 笔账单`,info:`今天已记录 ${todayCount} 笔账单`}
    ],
    [
      {label:'日均支出',val:fmt(avg),cls:'expense'},
      {label:'今日预算进度',val:budgetVal,title:dayBudget>0?`今日已花 ${fmt(todayExp)}，日预算 ${fmt(dayBudget)}，${remain>=0?'还剩 '+fmt(remain):'已超 '+fmt(Math.abs(remain))}`:'还没有设置月预算',info:dayBudget>0?`今日已花 ${fmt(todayExp)}，日预算 ${fmt(dayBudget)}，${remain>=0?'还剩 '+fmt(remain):'已超 '+fmt(Math.abs(remain))}`:'还没有设置月预算'}
    ],
    [
      {label:'最大单笔',val:maxExp?fmt(maxExp.amount)+(maxExpNote?' · '+esc(maxExpNote):''):'¥0.00',cls:'expense',txId:maxExp?.id},
      {label:'连续记账',val:`${streak.current} 天`,title:`最长连续 ${streak.longest} 天`,info:`当前连续记账 ${streak.current} 天，最长连续 ${streak.longest} 天`}
    ]
  ].map(pair=>`<div class="wallet-insight-pair">${pair.map(x=>`<div class="wallet-insight-item" ${x.txId?`data-jump-tx="${x.txId}" title="点击查看这笔账单" style="cursor:pointer"`:x.info?`data-insight-info="${esc(x.info)}" style="cursor:pointer"`:''} title="${esc(x.title||'')}"><div class="wallet-insight-label">${x.label}</div><div class="wallet-insight-val ${x.cls||''}">${x.val}</div></div>`).join('')}</div>`).join('');
  $('monthInsight').querySelectorAll('[data-jump-tx]').forEach(el=>el.onclick=()=>jumpToBillTx(el.dataset.jumpTx));
  $('monthInsight').querySelectorAll('[data-insight-info]').forEach(el=>el.onclick=()=>toast(el.dataset.insightInfo));
}

function financeWeather(d,month){
  const today=localDateStr();
  const todayExp=month.filter(t=>t.type==='expense'&&t.date===today).reduce((s,t)=>s+t.amount,0);
  const now=new Date();
  const monthDays=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
  const dayBudget=(Number(d.budget)||0)/monthDays;
  const ratio=dayBudget>0?todayExp/dayBudget:(todayExp===0?0:todayExp<30?.6:todayExp<100?1.15:1.7);
  if(ratio<=.5)return{icon:'☀️',name:'晴',cls:'income',desc:`今日支出 ${fmt(todayExp)}，节奏很轻松`};
  if(ratio<=1)return{icon:'⛅',name:'多云',cls:'',desc:`今日支出 ${fmt(todayExp)}，整体还算稳`};
  if(ratio<=1.5)return{icon:'🌧️',name:'小雨',cls:'expense',desc:`今日支出 ${fmt(todayExp)}，略高于日预算`};
  return{icon:'⛈️',name:'暴雨',cls:'expense',desc:`今日支出 ${fmt(todayExp)}，建议收一收`};
}

function bookkeepingStreak(d){
  const dates=[...new Set((d.txs||[]).filter(t=>t.st==='normal'&&(t.type==='income'||t.type==='expense')).map(t=>String(t.date||'').slice(0,10)).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)))].sort();
  const set=new Set(dates);
  const countBack=start=>{
    let c=0,dt=new Date(start);
    while(set.has(dt.toISOString().slice(0,10))){c++;dt.setDate(dt.getDate()-1);}
    return c;
  };
  const today=localDateStr();
  const latest=dates[dates.length-1]||today;
  let longest=0,run=0,prev=null;
  dates.forEach(ds=>{
    const cur=new Date(ds);
    run=prev&&Math.round((cur-prev)/86400000)===1?run+1:1;
    longest=Math.max(longest,run);
    prev=cur;
  });
  return{current:countBack(set.has(today)?today:latest),longest};
}

function monthlyTitle(d,month,inc,exp,bal){
  const budget=Number(d.budget)||0;
  const expenseTxs=month.filter(t=>t.type==='expense');
  const incomeRate=inc>0?bal/inc:0;
  const catSpend={};
  expenseTxs.forEach(t=>{catSpend[t.cat]=(catSpend[t.cat]||0)+t.amount});
  const topCatId=Object.entries(catSpend).sort((a,b)=>b[1]-a[1])[0]?.[0];
  const topCat=d.cats.find(c=>String(c.id)===String(topCatId));
  if(budget>0&&exp<=budget*.85)return{title:'预算大师',desc:'本月预算控制得很漂亮'};
  if(incomeRate>=.35&&inc>0)return{title:'存钱高手',desc:'本月结余率很健康'};
  if(expenseTxs.length>=80)return{title:'账本掌控者',desc:'记录很细，账本很完整'};
  if(topCat?.n?.includes('餐'))return{title:'干饭研究员',desc:'餐饮是本月主线'};
  if(topCat?.n?.includes('交通'))return{title:'城市穿梭者',desc:'通勤和出行占比较高'};
  if(topCat?.n?.includes('购物'))return{title:'购物观察家',desc:'购物消费最活跃'};
  return{title:'理性记录者',desc:'本月收支节奏较均衡'};
}

function jumpToBillTx(id){
  const d=load();
  const t=d.txs.find(x=>String(x.id)===String(id));
  if(!t){toast('这笔账单不存在');return;}
  switchPage('bills');
  switchBillTab('day');
  billViewMode='list';
  currentBillCatFilter=null;
  currentBillAccountFilter=null;
  selectedBatchIds.clear();
  $('fType').value='';
  $('fCat').value='';
  $('fKeyword').value='';
  $('fMonth').value=String(t.date||'').slice(0,7);
  selectedBillId=t.id;
  renderBills();
  setTimeout(()=>{
    const row=$('billsList')?.querySelector(`[data-edit-tx="${CSS.escape(String(t.id))}"]`);
    if(row)row.scrollIntoView({behavior:'smooth',block:'center'});
  },80);
}

function defaultAccSortWeight(a){
  return (a.t==='debt'||a.t==='receivable')?1:0;
}
function sortedSnapshotAccounts(d){
  const all=d.accs;
  const hasCustom=all.some(a=>Number.isFinite(Number(a.ord)));
  return all.map((a,i)=>({a,i})).sort((x,y)=>{
    if(hasCustom){
      const xo=Number.isFinite(Number(x.a.ord))?Number(x.a.ord):9999+defaultAccSortWeight(x.a)*100+x.i;
      const yo=Number.isFinite(Number(y.a.ord))?Number(y.a.ord):9999+defaultAccSortWeight(y.a)*100+y.i;
      return xo-yo;
    }
    return defaultAccSortWeight(x.a)-defaultAccSortWeight(y.a)||x.i-y.i;
  }).map(x=>x.a);
}
function renderAccountSnapshot(d){
  const list=sortedSnapshotAccounts(d);
  $('accountSnapshot').innerHTML=list.length?list.map(a=>{
    const meta=ACC_META[a.t]||ACC_META.custom;
    const balCls=a.b>=0?'income':'expense';
    return `<div class="account-mini" draggable="true" data-snapshot-acc="${a.id}" data-dbl-edit-acc="${a.id}" title="拖动排序，双击编辑账户">
      <div class="account-mini-icon" style="background:${meta.c}18;color:${meta.c}">${meta.i}</div>
      <div class="account-mini-main">
        <div class="account-mini-name">${esc(a.n)}</div>
        <div class="account-mini-type">${meta.n}</div>
      </div>
      <div class="account-mini-bal ${balCls}" data-acc-balance="${a.id}" style="cursor:pointer" title="点击修改余额">${fmt(a.b)}</div>
      <div class="account-mini-actions">
        <button class="acc-mini-btn" data-quick-transfer="${a.id}" title="快速转账">🔄</button>
      </div>
    </div>`;
  }).join(''):'<div style="text-align:center;padding:14px;color:var(--text-tertiary);font-size:13px">暂无账户</div>';
  bindAccountSnapshotSort();
  // 绑定事件
  $('accountSnapshot').querySelectorAll('[data-acc-balance]').forEach(el=>{
    el.onclick=()=>{openQuickBalanceEdit(el.dataset.accBalance);};
  });
  $('accountSnapshot').querySelectorAll('[data-quick-transfer]').forEach(b=>{
    b.onclick=e=>{e.stopPropagation();openQuickTransfer(b.dataset.quickTransfer);};
  });
  $('accountSnapshot').querySelectorAll('[data-dbl-edit-acc]').forEach(row=>{
    row.ondblclick=e=>{
      if(e.target.closest('button'))return;
      playInteractionSound('dbl');
      openAccEdit(row.dataset.dblEditAcc);
    };
  });
}

function openQuickBalanceEdit(id){
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(id));
  if(!acc)return;
  const displayBal=(acc.t==='debt'||acc.t==='receivable')?Math.abs(acc.b):acc.b;
  const newBal=prompt('修改「'+acc.n+'」的余额（当前 '+fmt(acc.b)+'）：', displayBal);
  if(newBal===null)return;
  const v=normalizeAccBalance(acc.t, newBal);
  if(isNaN(v)){toast('请输入有效数字');return;}
  if(v===acc.b){toast('余额未变化');return;}
  const diff=Math.round((v-acc.b)*100)/100;
  const diffStr=(diff>0?'+':'')+fmt(diff);
  $('balCalMsg').innerHTML='<div style="margin-bottom:6px"><b>'+esc(acc.n)+'</b></div>'
    +'<div>旧余额: '+fmt(acc.b)+'</div>'
    +'<div>新余额: '+fmt(v)+'</div>'
    +'<div style="margin-top:4px;color:var(--text-primary)">差额: <b>'+diffStr+'</b></div>';
  $('balCalReason').value='';
  _balCalState={accId:id,newBal:v,diff,diffStr};
  $('balCalibrateDlg').classList.add('show');
  $('balCalibrateDlg').style.display='';
  setTimeout(()=>$('balCalReason').focus(),100);
}
var _balCalState=null;
function closeBalCalDlg(){
  $('balCalibrateDlg').classList.remove('show');
  $('balCalibrateDlg').style.display='none';
  _balCalState=null;
}
$('balCalCancel').onclick=closeBalCalDlg;
$('balCalibrateDlg').onclick=e=>{if(e.target===$('balCalibrateDlg'))closeBalCalDlg();};
$('balCalOk').onclick=()=>{
  if(!_balCalState){closeBalCalDlg();return;}
  const st=_balCalState;
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(st.accId));
  if(!acc){closeBalCalDlg();return;}
  const oldBal=acc.b;
  acc.b=st.newBal;
  const reason=$('balCalReason').value.trim();
  const detail=acc.n+' 余额校准: '+fmt(oldBal)+' → '+fmt(st.newBal)+' ('+st.diffStr+')'+(reason?' | 原因: '+reason:'');
  logAction(d,'余额校准',detail);
  save(d);data=d;
  closeBalCalDlg();
  renderHome();renderAccounts();
  toast('余额已校准: '+st.diffStr,'success');
};

function openQuickTransfer(fromId){
  const d=load();
  const fromAcc=d.accs.find(a=>String(a.id)===String(fromId));
  if(!fromAcc){toast('账户不存在');return}
  const otherAccs=d.accs.filter(a=>a.ac&&String(a.id)!==String(fromId));
  if(otherAccs.length<1){toast('至少需要两个账户才能转账');return;}
  openTx('transfer');
  $('txAccount').value=String(fromAcc.id);
  const target=otherAccs[0];
  $('txToAccount').value=String(target.id);
  $('txDesc').value='快速转账';
  $('txAmount').focus();
}

function renderTopExpenses(){
  const d=load();
  const label=expenseRankLabel(topExpenseRange);
  $('topExpenseTitle').textContent=`🔥 ${label}支出排行`;
  $('topExpenseHint').textContent=topExpenseSort==='count'?'按笔数排序，双击类别查看账单':'按金额排序，双击类别查看账单';
  $('topExpenseSwitch').querySelectorAll('[data-rank-range]').forEach(btn=>btn.classList.toggle('active',btn.dataset.rankRange===topExpenseRange));
  $('topExpenseSortSwitch')?.querySelectorAll('[data-rank-sort]').forEach(btn=>btn.classList.toggle('active',btn.dataset.rankSort===topExpenseSort));
  const rangeExp=d.txs.filter(t=>t.st==='normal'&&t.type==='expense'&&txInExpenseRankRange(t,topExpenseRange));
  const catMap={};
  rangeExp.forEach(t=>{
    const c=d.cats.find(x=>x.id===t.cat);
    const name=c?c.n:'其他';
    if(!catMap[name])catMap[name]={amount:0,count:0,catId:c?c.id:''};
    catMap[name].amount+=t.amount;
    catMap[name].count++;
  });
  const sorted=Object.entries(catMap).sort((a,b)=>topExpenseSort==='count'?(b[1].count-a[1].count||b[1].amount-a[1].amount):(b[1].amount-a[1].amount));
  const maxValue=topExpenseSort==='count'?(sorted[0]?.[1].count||1):(sorted[0]?.[1].amount||1);
  const colors=['#f43f5e','#f97316','#f59e0b','#8b5cf6','#6366f1'];
  $('topExpenseList').innerHTML=sorted.length?sorted.map(([name,data],i)=>{
    const amount=data.amount;
    const primary=topExpenseSort==='count'?data.count:amount;
    const pct=(primary/maxValue*100).toFixed(0);
    const c=colors[i]||'#94a3b8';
    return `<div class="top-exp-item" data-exp-cat="${data.catId}" data-exp-name="${esc(name)}" title="双击查看${esc(name)}账单">
      <div class="top-exp-info">
        <span class="top-exp-rank" style="background:${c}20;color:${c}">${i+1}</span>
        <span class="top-exp-name">${esc(name)}</span>
      </div>
      <div class="top-exp-bar-wrap"><div class="top-exp-bar" style="width:${pct}%;background:${c}"></div></div>
      <div class="top-exp-amt">${topExpenseSort==='count'?`${data.count} 笔 · ${fmt(amount)}`:fmt(amount)}</div>
    </div>`;
  }).join(''):`<div class="empty" style="padding:28px 16px"><span class="em" style="font-size:40px">📊</span><div class="empty-title" style="font-size:14px">${label}暂无支出</div><div class="empty-desc">去记一笔吧</div></div>`;
  $('topExpenseList').querySelectorAll('[data-exp-cat]').forEach(item=>{
    item.ondblclick=()=>openMonthlyCategoryBills(item.dataset.expCat,item.dataset.expName,topExpenseRange);
  });
}

function jumpHomeDayBills(date){
  const ym=String(date||'').slice(0,7);
  if(ym&&homeBillMonth!==ym){
    homeBillMonth=ym;
    fillMonths();
    renderHome();
  }
  const list=$('recentList');
  requestAnimationFrame(()=>{
    const target=list?.querySelector(`[data-date="${date}"]`);
    if(!target){toast('这一天暂无账单，已切换到对应月份');return;}
    list.scrollTo({top:target.offsetTop-list.offsetTop,behavior:'smooth'});
  });
}

function jumpHomeBillMonth(month){
  if(!month)return;
  homeBillMonth=month;
  fillMonths();
  renderHome();
  requestAnimationFrame(()=>$('recentList')?.scrollTo({top:0,behavior:'smooth'}));
}

function openMonthlyCategoryBills(catId,catName,range='month'){
  currentBillCatFilter={catId:String(catId),name:catName||'该类别'};
  switchPage('bills');
  switchBillTab('day');
  fillMonths();
  fillCats();
  $('fType').value='expense';
  $('fMonth').value=range==='year'?'':localMonthStr();
  $('fKeyword').value='';
  renderBills();
  toast(range==='year'?`已筛选全部月份「${catName}」支出`:`已筛选本月「${catName}」支出`);
}

function renderNetWorth(){
  const d=load();
  const dailyTxs=d.txs.filter(t=>t.st==='normal'&&(t.type==='income'||t.type==='expense'));
  const total=d.accs.reduce((s,a)=>s+a.b,0);
  const assets=d.accs.filter(a=>a.b>0).reduce((s,a)=>s+a.b,0);
  const debt=Math.abs(d.accs.filter(a=>a.b<0).reduce((s,a)=>s+a.b,0));
  const validDates=[...new Set(dailyTxs.map(t=>String(t.date||'').slice(0,10)).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)))].sort();
  const activeDays=validDates.length;
  let days=activeDays;
  if(validDates.length>=2){
    days=Math.floor((new Date(validDates[validDates.length-1])-new Date(validDates[0]))/86400000)+1;
  }
  $('netWorthAmt').textContent=fmt(total);
  $('totalAssetsAmt').textContent=fmt(assets);
  $('totalDebtAmt').textContent=fmt(debt);
  $('totalBookDays').textContent=`${days} 天`;
  $('totalBookDays').title=`按第一笔到最后一笔日常收支的累计跨度计算；实际有记录日期 ${activeDays} 天`;
  $('totalBookCount').textContent=`${dailyTxs.length} 笔`;
  $('totalBookCount').title='仅统计日常收入和支出，不包含投资收益、总资产快照等非日常账单';
  // 同步设置页用户数据
  if($('userTotalDays'))$('userTotalDays').textContent=String(days);
  if($('userTotalBills'))$('userTotalBills').textContent=String(dailyTxs.length);
  const el=$('netWorthTrend');
  el.textContent=`${d.accs.length} 个账户余额合计`;
  el.style.color='var(--text-secondary)';
}

function renderCalendar(txs){
  $('calendarModeSwitch').querySelectorAll('[data-calendar-mode]').forEach(btn=>btn.classList.toggle('active',btn.dataset.calendarMode===calendarMode));
  const calCard=document.querySelector('#pageHome .calendar-card');
  if(calCard)calCard.classList.toggle('calendar-year-active',calendarMode==='year');
  if(calendarMode==='month')renderCalendarMonth(txs);
  else if(calendarMode==='year')renderCalendarYear(txs);
  else renderCalendarDay(txs);
  requestAnimationFrame(alignHomeExpenseRank);
}

function renderCalendarDay(txs){
  const now=new Date();
  const view=new Date(calViewDate.getFullYear(),calViewDate.getMonth(),1);
  const ym=localMonthStr(view);
  const today=localDateStr(now);
  $('calMonth').textContent=`${view.getFullYear()}年${view.getMonth()+1}月`;
  $('calGrid').className='calendar-grid';
  const first=new Date(view.getFullYear(),view.getMonth(),1);
  const days=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
  const start=first.getDay();
  const weeks=Math.ceil((start+days)/7);
  const wds=['日','一','二','三','四','五','六'];
  let html=wds.map(w=>`<div class="calendar-day-hd">${w}</div>`).join('');
  for(let i=0;i<start;i++)html+='<div class="calendar-empty"></div>';
  for(let d=1;d<=days;d++){
    const ds=`${ym}-${String(d).padStart(2,'0')}`;
    const dayTxs=txs.filter(t=>t.date===ds&&t.st==='normal');
    const incAmt=dayTxs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
    const expAmt=dayTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
    const isToday=ds===today;
    let amtHtml='';
    if(expAmt>0&&incAmt>0){
      amtHtml=`<div class="c-amt inc">+${short(incAmt)}</div><div class="c-amt exp">-${short(expAmt)}</div>`;
    }else if(expAmt>0){
      amtHtml=`<div class="c-amt exp">-${short(expAmt)}</div>`;
    }else if(incAmt>0){
      amtHtml=`<div class="c-amt inc">+${short(incAmt)}</div>`;
    }
    const title=dayTxs.length?` title="收入 ${fmt(incAmt)} / 支出 ${fmt(expAmt)}"`:'';
    html+=`<div class="calendar-cell${isToday?' today':''}" data-cal-date="${ds}"${title}><div class="c-day">${d}</div>${amtHtml}</div>`;
  }
  for(let i=start+days;i<weeks*7;i++)html+='<div class="calendar-empty"></div>';
  $('calGrid').style.setProperty('--calendar-weeks',weeks);
  $('calGrid').innerHTML=html;
  $('calGrid').querySelectorAll('[data-cal-date]').forEach(cell=>{
    cell.onclick=()=>jumpHomeDayBills(cell.dataset.calDate);
  });
}

function renderCalendarMonth(txs){
  const year=calViewDate.getFullYear();
  const nowYm=localMonthStr();
  $('calMonth').textContent=`${year}年`;
  $('calGrid').className='calendar-grid month-mode';
  let html='';
  for(let m=1;m<=12;m++){
    const ym=year+'-'+pad2(m);
    const list=txs.filter(t=>t.st==='normal'&&String(t.date||'').indexOf(ym)===0);
    const inc=list.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
    const exp=list.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
    if(inc<=0&&exp<=0)continue;
    const incCount=list.filter(t=>t.type==='income').length;
    const expCount=list.filter(t=>t.type==='expense').length;
    const countHtml=calendarCountHtml(incCount,expCount);
    const amountHtml=calendarMoneyHtml(inc,exp,'text');
    html+=`<div class="calendar-period-cell${ym===nowYm?' active':''}" data-cal-month="${ym}" title="收入 ${fmt(inc)} / 支出 ${fmt(exp)}">
      <div class="calendar-period-name">${m}月</div>
      ${countHtml}
      ${amountHtml}
    </div>`;
  }
  if(!html){
    $('calGrid').innerHTML='<div class="empty" style="grid-column:1/-1"><span class="em">📅</span><div class="empty-title">这一年还没有月度收支记录</div></div>';
    return;
  }
  $('calGrid').innerHTML=html;
  $('calGrid').querySelectorAll('[data-cal-month]').forEach(cell=>{
    cell.onclick=()=>{const ym=cell.dataset.calMonth;const [y,m]=ym.split('-');calViewDate=new Date(+y,+m-1,1);calendarMode='day';jumpHomeBillMonth(ym);renderCalendar(load().txs);};
  });
}

function renderCalendarYear(txs){
  const curYear=new Date().getFullYear();
  const recordYears=[...new Set(txs
    .filter(t=>t.st==='normal'&&(t.type==='income'||t.type==='expense')&&String(t.date||'').match(/^\d{4}-/))
    .map(t=>parseInt(String(t.date).slice(0,4),10)))]
    .filter(Boolean)
    .sort((a,b)=>a-b);
  if(!recordYears.length){
    $('calMonth').textContent='暂无年份';
    $('calGrid').className='calendar-grid year-mode';
    $('calGrid').innerHTML='<div class="empty" style="grid-column:1/-1"><span class="em">📅</span><div class="empty-title">还没有年度收支记录</div></div>';
    return;
  }
  const firstYear=recordYears[0],lastYear=recordYears[recordYears.length-1];
  $('calMonth').textContent=firstYear===lastYear?`${firstYear}年`:`${firstYear} - ${lastYear}年`;
  $('calGrid').className='calendar-grid year-mode';
  let html='';
  recordYears.forEach(y=>{
    const list=txs.filter(t=>t.st==='normal'&&String(t.date||'').indexOf(y+'-')===0);
    const inc=list.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
    const exp=list.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
    const incCount=list.filter(t=>t.type==='income').length;
    const expCount=list.filter(t=>t.type==='expense').length;
    const countHtml=calendarCountHtml(incCount,expCount);
    const amountHtml=calendarMoneyHtml(inc,exp,'pill');
    html+=`<div class="calendar-period-cell${y===curYear?' active':''}" data-cal-year="${y}" title="收入 ${fmt(inc)} / 支出 ${fmt(exp)}">
      <div class="calendar-period-name">${y}年</div>
      ${countHtml}
      ${amountHtml}
    </div>`;
  });
  $('calGrid').innerHTML=html;
  $('calGrid').querySelectorAll('[data-cal-year]').forEach(cell=>{
    cell.onclick=()=>{calViewDate=new Date(+cell.dataset.calYear,0,1);calendarMode='month';renderCalendar(load().txs);};
  });
}

/* ========== 账单 ========== */

function goToYearBill(){
  switchPage('bills');
  setTimeout(()=>{
    switchBillTab('day');
  },50);
}

function switchBillTab(tab){
  currentBillTab=tab;
  document.querySelectorAll('.bills-tab').forEach(t=>t.classList.toggle('active',t.dataset.billtab===tab));
  document.querySelectorAll('.bills-panel').forEach(p=>p.classList.add('hide'));
  document.querySelectorAll('.bill-side-panel').forEach(p=>p.classList.add('hide'));
  $('billsPanel'+tab.charAt(0).toUpperCase()+tab.slice(1)).classList.remove('hide');
  const sideId={day:'dayBillSide',month:'monthBillSide',year:'yearBillSide'}[tab];
  if(sideId&&$(sideId))$(sideId).classList.remove('hide');
  if(tab==='day')renderBills();
  if(tab==='month')renderMonthBill();
  if(tab==='year')renderYearBill();
}
document.querySelectorAll('.bills-tab').forEach(t=>{t.onclick=()=>switchBillTab(t.dataset.billtab);});

// 无限滚动状态
const BILL_PAGE_SIZE=50;

function renderBills(){
  const d=load();
  renderSearchHistory(d);
  const list=getFilteredBillList(d);
  renderBillResultSummary(list);
  renderBillModeButtons();
  if(billViewMode==='table'){
    $('billsList').classList.add('hide');
    $('billsTableWrap').classList.remove('hide');
    renderBillTable(list,d);
  }else{
    $('billsList').classList.remove('hide');
    $('billsTableWrap').classList.add('hide');
    _billInfiniteState={allList:list,rendered:0,loading:false,done:false};
    // 初始渲染第一批
    $('billsList').innerHTML='';
    if(list.length){
      appendBillPage();
    }else{
      $('billsList').innerHTML=`<div class="empty"><span class="em">📋</span><div class="empty-title">没有找到记录</div><div class="empty-desc">${randomEmptyDesc()}</div></div>`;
    }
    setupBillInfiniteScroll();
  }
  renderBillDetailPanel();
  renderBillsSidebar(d);
}

function appendBillPage(){
  const st=_billInfiniteState;
  if(st.loading||st.done)return;
  st.loading=true;
  const start=st.rendered;
  const end=Math.min(start+BILL_PAGE_SIZE,st.allList.length);
  const batch=st.allList.slice(start,end);
  const grouped=groupByDate(batch);
  const billKeyword=($('fKeyword')?.value||'').trim();
  // 生成HTML并追加
  const html=dateGroupsWithYearHtml(grouped,true,false,billKeyword);
  // 去掉首次渲染的年份分隔线（和已有内容衔接）
  const container=$('billsList');
  const tmp=document.createElement('div');
  tmp.innerHTML=html;
  // 首次渲染时需要保留年份线，追加时去掉第一条年份线（避免重复）
  if(start>0){
    const firstYear=tmp.querySelector('.year-separator');
    if(firstYear)firstYear.remove();
  }
  while(tmp.firstChild)container.appendChild(tmp.firstChild);
  // 绑定新元素事件
  tmp.querySelectorAll('[data-del]').forEach(b=>b.onclick=e=>{e.stopPropagation();confirmDel(b.dataset.del)});
  tmp.querySelectorAll('[data-copy]').forEach(b=>b.onclick=e=>{e.stopPropagation();copyTx(b.dataset.copy);});
  bindTxEditors(container);
  bindBillSelection(container);
  bindBatchChecks(container);
  bindQuickFilters(container);
  st.rendered=end;
  st.loading=false;
  if(st.rendered>=st.allList.length){
    st.done=true;
    // 移除加载提示
    const loader=container.querySelector('.bill-load-more');
    if(loader)loader.remove();
  }else{
    // 添加/更新加载提示
    ensureBillLoadMore(container);
  }
}

function ensureBillLoadMore(container){
  let loader=container.querySelector('.bill-load-more');
  if(!loader){
    loader=document.createElement('div');
    loader.className='bill-load-more';
    loader.textContent='加载更多...';
    container.appendChild(loader);
  }
  loader.textContent=_billInfiniteState.done
    ?`已加载全部 ${_billInfiniteState.allList.length} 笔`
    :`已加载 ${_billInfiniteState.rendered} / ${_billInfiniteState.allList.length} 笔，滚动加载更多`;
}

let _billScrollObserver=null;
function setupBillInfiniteScroll(){
  if(_billScrollObserver)_billScrollObserver.disconnect();
  const container=$('billsList');
  if(!container)return;
  _billScrollObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting&&!_billInfiniteState.done&&!_billInfiniteState.loading){
        appendBillPage();
      }
    });
  },{rootMargin:'200px'});
  // 观察加载更多元素
  const observe=()=>{
    const loader=container.querySelector('.bill-load-more');
    if(loader)_billScrollObserver.observe(loader);
  };
  // 延迟观察（等DOM更新）
  requestAnimationFrame(observe);
}

function bindQuickFilters(root){
  if(!root)return;
  root.querySelectorAll('[data-filter-cat]').forEach(el=>el.onclick=e=>{
    e.stopPropagation();
    currentBillCatFilter={catId:el.dataset.filterCat,name:el.dataset.filterCatName};
    currentBillAccountFilter=null;
    $('fKeyword').value='';
    renderBills();
    toast('已筛选分类：'+el.dataset.filterCatName);
  });
  root.querySelectorAll('[data-filter-acc]').forEach(el=>el.onclick=e=>{
    e.stopPropagation();
    currentBillAccountFilter={accId:el.dataset.filterAcc,name:el.dataset.filterAccName};
    currentBillCatFilter=null;
    $('fKeyword').value='';
    renderBills();
    toast('已筛选账户：'+el.dataset.filterAccName);
  });
}

function renderBillResultSummary(list){
  if(!$('billResultSummary'))return;
  $('billResultSummary').classList.remove('removed');
  const count=list.length;
  const expList=list.filter(t=>t.type==='expense');
  const incList=list.filter(t=>t.type==='income');
  const investList=list.filter(t=>t.type==='invest');
  const transferList=list.filter(t=>t.type==='transfer');
  const exp=expList.reduce((s,t)=>s+Number(t.amount||0),0);
  const inc=incList.reduce((s,t)=>s+Number(t.amount||0),0);
  const invest=investList.reduce((s,t)=>s+Number(t.amount||0),0);
  const transfer=transferList.reduce((s,t)=>s+Number(t.amount||0),0);
  const allExpList=expList;
  const allExp=allExpList.reduce((s,t)=>s+Number(t.amount||0),0);
  const net=inc+invest-exp;
  const keyword=$('fKeyword')?.value?.trim();
  const scope=keyword?`关键词：${esc(keyword)}`:'当前筛选结果';
  const yearMap={};
  list.forEach(t=>{
    const y=String(t.date||'').slice(0,4);
    if(!/^\d{4}$/.test(y))return;
    yearMap[y]=yearMap[y]||{exp:0,inc:0,count:0};
    if(t.type==='expense')yearMap[y].exp+=Number(t.amount||0);
    if(t.type==='income')yearMap[y].inc+=Number(t.amount||0);
    yearMap[y].count++;
  });
  const yearSummaryHtml=Object.keys(yearMap).sort((a,b)=>b.localeCompare(a)).map(y=>{
    const s=yearMap[y];
    return `<span class="bill-year-pill"><span>${y}</span><span class="expense">${fmt(s.exp)}</span><span>${s.count} 笔</span></span>`;
  }).join('');
  $('billResultSummary').innerHTML=`
    <div class="bill-sum-card"><div class="bill-sum-label">匹配账单</div><div class="bill-sum-value">${count} 笔</div><div class="bill-sum-sub">${scope}</div></div>
    <div class="bill-sum-card"><div class="bill-sum-label">累计合计</div><div class="bill-sum-value expense">${fmt(allExp)}</div><div class="bill-sum-sub">${allExpList.length} 笔支出</div></div>
    <div class="bill-sum-card filterable-card" data-filter-type="expense"><div class="bill-sum-label">支出合计</div><div class="bill-sum-value expense">${fmt(exp)}</div><div class="bill-sum-sub">${expList.length} 笔支出</div></div>
    <div class="bill-sum-card filterable-card" data-filter-type="income"><div class="bill-sum-label">收入合计</div><div class="bill-sum-value income">${fmt(inc)}</div><div class="bill-sum-sub">${incList.length} 笔收入</div></div>
    <div class="bill-sum-card"><div class="bill-sum-label">净额</div><div class="bill-sum-value ${net>=0?'income':'expense'}">${fmt(net)}</div><div class="bill-sum-sub">${investList.length?`投资净额 ${fmt(invest)} · `:''}${transferList.length?`转账 ${transferList.length} 笔 ${fmt(transfer)}`:'收入+投资-支出'}</div></div>
    ${yearSummaryHtml?`<div class="bill-year-summary"><span class="bill-year-summary-title">年度汇总</span>${yearSummaryHtml}</div>`:''}`;
  document.querySelectorAll('#billResultSummary .filterable-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const filterType=card.dataset.filterType;
      const currentType=$('fType').value;
      if(currentType===filterType){
        $('fType').value='';
      }else{
        $('fType').value=filterType;
      }
      document.querySelectorAll('#billResultSummary .filterable-card').forEach(c=>c.classList.remove('active'));
      if($('fType').value===filterType){
        card.classList.add('active');
      }
      renderBills();
    });
  });
  // 初始化高亮状态
  const initType=$('fType').value;
  document.querySelectorAll('#billResultSummary .filterable-card').forEach(c=>{
    if(c.dataset.filterType===initType)c.classList.add('active');
  });
}

function getFilteredBillList(d){
  const type=$('fType').value,month=$('fMonth').value,keyword=$('fKeyword').value.toLowerCase().trim(),cat=$('fCat').value;
  let list=d.txs.filter(t=>t.st==='normal');
  if(pendingOnly)list=list.filter(t=>t.status==='pending'||!t.cat||!t.acc||!t.desc);
  if(largeOnly)list=list.filter(t=>isLargeExpense(t,d));
  if(type)list=list.filter(t=>t.type===type);
  if(month)list=list.filter(t=>t.date.indexOf(month)===0);
  if(cat)list=list.filter(t=>String(t.cat)===String(cat));
  if(keyword)list=list.filter(t=>matchBillKeyword(t,keyword,d));
  if(!$('advancedFilterPanel').classList.contains('hide')){
    const s=$('advStart').value,e=$('advEnd').value,min=parseFloat($('advMin').value),max=parseFloat($('advMax').value),acc=$('advAcc').value,tag=$('advTag').value,status=$('advStatus').value,source=$('advSource').value,dup=$('advDup').value;
    if(s)list=list.filter(t=>t.date>=s);
    if(e)list=list.filter(t=>t.date<=e);
    if(!isNaN(min))list=list.filter(t=>t.amount>=min);
    if(!isNaN(max))list=list.filter(t=>t.amount<=max);
    if(acc)list=list.filter(t=>String(t.acc)===String(acc)||String(t.toAcc)===String(acc));
    if(tag)list=list.filter(t=>(t.tags||[]).includes(tag));
    if(status)list=list.filter(t=>(t.status||'normal')===status);
    if(source)list=list.filter(t=>t.source===source);
    if(dup)list=list.filter(t=>isDuplicateTx(d.txs.filter(x=>String(x.id)!==String(t.id)&&x.st==='normal'),t));
  }
  if(currentBillCatFilter)list=list.filter(t=>String(t.cat)===String(currentBillCatFilter.catId));
  if(currentBillAccountFilter)list=list.filter(t=>String(t.acc)===String(currentBillAccountFilter.accId)||String(t.toAcc)===String(currentBillAccountFilter.accId));
  if(currentBillCatFilter||currentBillAccountFilter){
    $('billCatFilter').classList.remove('hide');
    const label=currentBillCatFilter?`${month||'全部月份'}「${esc(currentBillCatFilter.name)}」支出`:`账户流水：${esc(currentBillAccountFilter.name)}`;
    $('billCatFilter').innerHTML=`<span>当前筛选：${label}</span><button id="clearBillCatFilter">清除</button>`;
    setTimeout(()=>{$('clearBillCatFilter').onclick=()=>{currentBillCatFilter=null;currentBillAccountFilter=null;renderBills();};},0);
  }else{
    $('billCatFilter').classList.add('hide');
    $('billCatFilter').innerHTML='';
  }
  list.sort((a,b)=>b.date.localeCompare(a.date)||(b.time||'').localeCompare(a.time||''));
  renderSplitWorkbench(list,d);
  renderBatchBar(d,list);
  return list;
}

function renderBillsSidebar(d){
  // 侧边栏：快捷统计
  const allTxs=d.txs.filter(t=>t.st==='normal');
  const todayStr=localDateStr();
  const todayCount=allTxs.filter(t=>t.date===todayStr).length;
  const todayExp=allTxs.filter(t=>t.date===todayStr&&t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const thisMonth=localMonthStr();
  const thisYear=String(new Date().getFullYear());
  const monthCount=allTxs.filter(t=>t.date.indexOf(thisMonth)===0).length;
  const monthExp=allTxs.filter(t=>t.date.indexOf(thisMonth)===0&&t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const yearExp=allTxs.filter(t=>String(t.date||'').indexOf(thisYear+'-')===0&&t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const totalExp=allTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  if($('billsQuickStats')){
    $('billsQuickStats').innerHTML=`
      <div class="bqs-item"><div class="bqs-label">今日记账</div><div class="bqs-val">${todayCount} 笔</div></div>
      <div class="bqs-item"><div class="bqs-label">今日支出</div><div class="bqs-val expense">${fmt(todayExp)}</div></div>
      <div class="bqs-item"><div class="bqs-label">本月记账</div><div class="bqs-val">${monthCount} 笔</div></div>
      <div class="bqs-item"><div class="bqs-label">本月支出</div><div class="bqs-val expense">${fmt(monthExp)}</div></div>
      <div class="bqs-item"><div class="bqs-label">本年合计</div><div class="bqs-val expense">${fmt(yearExp)}</div></div>
      <div class="bqs-item"><div class="bqs-label">累计支出</div><div class="bqs-val">${fmt(totalExp)}</div></div>`;
  }
  // 侧边栏：常用分类 TOP5
  if($('billsTopCats')){
    const catMap={};
    allTxs.filter(t=>t.type==='expense').forEach(t=>{
      const c=d.cats.find(x=>x.id===t.cat);
      if(c){
        const prev=catMap[c.n]||{amount:0,count:0,icon:c.i,color:c.c};
        catMap[c.n]={...prev,amount:prev.amount+t.amount,count:prev.count+1,icon:c.i,color:c.c};
      }
    });
    const top5=Object.entries(catMap).sort((a,b)=>b[1].amount-a[1].amount).slice(0,5);
    $('billsTopCats').innerHTML=top5.length?top5.map(([name,data])=>`
      <div class="bqs-cat-row"><span class="bqs-cat-icon" style="background:${data.color}18;color:${data.color}">${data.icon}</span><span class="bqs-cat-name">${esc(name)}</span><span class="bqs-cat-amt">${fmt(data.amount)}</span></div>
    `).join(''):'<div style="text-align:center;padding:20px;color:var(--text-tertiary);font-size:13px">暂无数据</div>';
  }
  renderBillsAnomalyPanel(d,allTxs);
}

function renderBillsAnomalyPanel(d,allTxs){
  if(!$('billsAnomalyPanel'))return;
  const ym=localMonthStr();
  const now=new Date();
  const monthTxs=allTxs.filter(t=>String(t.date||'').indexOf(ym)===0);
  const monthExp=monthTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount||0),0);
  const cards=[];
  const big=monthTxs.filter(t=>t.type==='expense').sort((a,b)=>b.amount-a.amount)[0];
  if(big&&big.amount>=largeExpenseThreshold(d)){
    cards.push({title:'大额支出',desc:`${big.date} · ${fmt(big.amount)} · ${big.desc||'无备注'}`,action:'large'});
  }
  const dupCount=countLikelyDuplicatesFast(monthTxs);
  if(dupCount>0)cards.push({title:'疑似重复',desc:`本月发现 ${dupCount} 笔疑似重复记录`,action:'dup'});
  const pending=monthTxs.filter(t=>t.status==='pending'||!t.cat||!t.acc||!t.desc).length;
  if(pending>0)cards.push({title:'待整理账单',desc:`本月还有 ${pending} 笔需要补分类、账户或备注`,action:'pending'});
  const prevMonths=[1,2,3].map(i=>{const dt=new Date(now);dt.setMonth(dt.getMonth()-i);return localMonthStr(dt)});
  const highCat=d.cats.filter(c=>c.t==='expense').map(c=>{
    const cur=monthTxs.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)).reduce((s,t)=>s+t.amount,0);
    const avg=prevMonths.reduce((s,m)=>s+allTxs.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)&&String(t.date).indexOf(m)===0).reduce((a,t)=>a+t.amount,0),0)/3;
    return {c,cur,avg};
  }).filter(x=>x.avg>0&&x.cur>x.avg*1.35).sort((a,b)=>(b.cur-b.avg)-(a.cur-a.avg))[0];
  if(highCat)cards.push({title:`${highCat.c.n}偏高`,desc:`本月 ${fmt(highCat.cur)}，高于近 3 个月均值 ${fmt(highCat.avg)}`,action:'cat',catId:highCat.c.id});
  if(!cards.length){
    $('billsAnomalyPanel').innerHTML='<div style="text-align:center;padding:16px;color:var(--text-tertiary);font-size:13px">本月暂无明显异常</div>';
    return;
  }
  $('billsAnomalyPanel').innerHTML=cards.slice(0,4).map((c,i)=>`<div class="insight-card warn" style="margin-bottom:8px">
    <div class="insight-title">${esc(c.title)}</div>
    <div class="insight-desc">${esc(c.desc)}</div>
    <div class="mini-action-row"><button data-bill-anomaly="${i}">查看</button></div>
  </div>`).join('');
  $('billsAnomalyPanel').querySelectorAll('[data-bill-anomaly]').forEach(btn=>btn.onclick=()=>{
    const c=cards[parseInt(btn.dataset.billAnomaly,10)];
    switchPage('bills');switchBillTab('day');$('fMonth').value=ym;$('fKeyword').value='';currentBillCatFilter=null;currentBillAccountFilter=null;
    if(c.action==='large'){largeOnly=true;$('advancedFilterPanel').classList.add('hide');}
    if(c.action==='dup'){$('advancedFilterPanel').classList.remove('hide');$('advDup').value='dup';}
    if(c.action==='pending'){pendingOnly=true;}
    if(c.action==='cat'){currentBillCatFilter={catId:c.catId,name:c.title.replace('偏高','')};}
    renderBills();
  });
}

function renderBillModeButtons(){
  $('billListModeBtn')?.classList.toggle('active',billViewMode==='list');
  $('billTableModeBtn')?.classList.toggle('active',billViewMode==='table');
  $('billCompactBtn')?.classList.toggle('active',billCompact);
  $('pendingOnlyBtn')?.classList.toggle('active',pendingOnly);
  $('largeOnlyBtn')?.classList.toggle('active',largeOnly);
}

function bindBillSelection(root){
  if(!root)return;
  root.querySelectorAll('[data-edit-tx]').forEach(row=>{
    row.onclick=e=>{
      if(e.target.closest('button'))return;
      selectedBillId=row.dataset.editTx;
      renderBillDetailPanel();
      root.querySelectorAll('.tx-item').forEach(x=>x.classList.toggle('selected',String(x.dataset.editTx)===String(selectedBillId)));
    };
  });
}

// 表格无限滚动状态

function buildBillTableRow(t,d,cols){
  const cat=d.cats.find(c=>String(c.id)===String(t.cat));
  const acc=d.accs.find(a=>String(a.id)===String(t.acc));
  const tagText=(t.tags||[]).join('、');
  const cell={date:esc(t.date),type:esc(TYPE_MAP[t.type]||t.type),cat:cat?highlightSearchText(cat.i+' '+cat.n,d):'-',acc:acc?esc(acc.n):'-',amount:`<span class="amount-cell ${t.type==='income'?'income':'expense'}">${t.type==='income'?'+':t.type==='expense'?'-':''}${fmt(t.amount).replace(/[+-]/,'')}</span>`,desc:highlightSearchText(t.desc||'',d),tags:esc(tagText),status:t.status==='pending'?'待整理':'正常',source:esc(t.source||'手动')};
  return `<tr data-table-tx="${t.id}" oncontextmenu="showTxContextMenu(event,'${t.id}')">
    <td><input class="tx-select" type="checkbox" data-batch-id="${t.id}" ${selectedBatchIds.has(String(t.id))?'checked':''}></td>
    ${cols.map(k=>`<td>${cell[k]||''}</td>`).join('')}
  </tr>`;
}

function appendBillTablePage(){
  const st=_billTableInfiniteState;
  if(st.loading||st.done)return;
  st.loading=true;
  const start=st.rendered;
  const end=Math.min(start+BILL_PAGE_SIZE,st.allSorted.length);
  const batch=st.allSorted.slice(start,end);
  const tbody=$('billTableBody');
  if(tbody)tbody.insertAdjacentHTML('beforeend',batch.map(t=>buildBillTableRow(t,st.d,st.cols)).join(''));
  st.rendered=end;st.loading=false;
  const loader=$('billTableLoader');
  if(loader){
    if(st.rendered>=st.allSorted.length){st.done=true;loader.remove();}
    else loader.textContent=`已加载 ${st.rendered} / ${st.allSorted.length} 笔，滚动加载更多`;
  }
}

let _billTableScrollObs=null;
function setupBillTableInfiniteScroll(){
  if(_billTableScrollObs)_billTableScrollObs.disconnect();
  _billTableScrollObs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting&&!_billTableInfiniteState.done&&!_billTableInfiniteState.loading){
        appendBillTablePage();
      }
    });
  },{rootMargin:'200px'});
  requestAnimationFrame(()=>{
    const loader=$('billTableLoader');
    if(loader)_billTableScrollObs.observe(loader);
  });
}

function renderBillTable(list,d){
  const sorted=[...list].sort((a,b)=>{
    const k=billTableSort.key;
    let av=k==='cat'?(d.cats.find(c=>String(c.id)===String(a.cat))?.n||''):k==='acc'?(d.accs.find(x=>String(x.id)===String(a.acc))?.n||''):(a[k]||'');
    let bv=k==='cat'?(d.cats.find(c=>String(c.id)===String(b.cat))?.n||''):k==='acc'?(d.accs.find(x=>String(x.id)===String(b.acc))?.n||''):(b[k]||'');
    if(k==='amount')return billTableSort.dir==='asc'?a.amount-b.amount:b.amount-a.amount;
    return billTableSort.dir==='asc'?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av));
  });
  const viewRows=sorted.slice(0,BILL_PAGE_SIZE);
  const cols=(d.settings.billColumns||DEFAULT_COLUMNS);
  const colNames={date:'日期',type:'类型',cat:'分类',acc:'账户',amount:'金额',desc:'备注',tags:'标签',status:'状态',source:'来源'};
  _billTableInfiniteState={allSorted:sorted,rendered:0,loading:false,done:false,cols,colNames,d};
  $('billsTableWrap').innerHTML=sorted.length?`<table class="bill-table" id="billTableMain">
    <thead><tr><th><input type="checkbox" id="tableSelectAll"></th>${cols.map(k=>`<th data-sort-bill="${k}">${colNames[k]||k}${billTableSort.key===k?(billTableSort.dir==='asc'?' ↑':' ↓'):''}</th>`).join('')}</tr></thead>
    <tbody id="billTableBody">${viewRows.map(t=>buildBillTableRow(t,d,cols)).join('')}</tbody></table>`:'<div class="empty"><span class="em">📋</span><div class="empty-title">没有找到记录</div></div>';
  if(sorted.length>BILL_PAGE_SIZE){
    const loader=document.createElement('div');
    loader.className='bill-load-more';
    loader.id='billTableLoader';
    loader.textContent=`已加载 ${BILL_PAGE_SIZE} / ${sorted.length} 笔，滚动加载更多`;
    $('billsTableWrap').appendChild(loader);
    setupBillTableInfiniteScroll();
  }
  $('billsTableWrap').querySelectorAll('[data-sort-bill]').forEach(th=>th.onclick=()=>{
    const key=th.dataset.sortBill;
    billTableSort.dir=billTableSort.key===key&&billTableSort.dir==='desc'?'asc':'desc';
    billTableSort.key=key;renderBills();
  });
  $('billsTableWrap').querySelectorAll('[data-table-tx]').forEach(tr=>tr.onclick=()=>{
    selectedBillId=tr.dataset.tableTx;
    renderBillDetailPanel();
    $('billsTableWrap').querySelectorAll('tr').forEach(x=>x.classList.toggle('selected',String(x.dataset.tableTx)===String(selectedBillId)));
  });
  bindBatchChecks($('billsTableWrap'));
  if($('tableSelectAll'))$('tableSelectAll').onchange=e=>toggleSelectAll(viewRows,e.target.checked);
}

function renderBillDetailPanel(){
  const panel=$('billDetailPanel');if(!panel)return;
  const d=load();
  const t=d.txs.find(x=>String(x.id)===String(selectedBillId)&&x.st==='normal');
  if(!t){panel.innerHTML='<div class="bill-detail-empty">点击左侧任意账单，在这里直接修改金额、分类、账户、备注；修改后会自动保存。</div>';return}
  const cats=d.cats.filter(c=>c.t===t.type&&c.ac!==0);
  let accs=d.accs.filter(a=>a.ac);
  if(t.acc!=null&&t.acc!==''&&!accs.some(a=>String(a.id)===String(t.acc))){
    const oldAcc=d.accs.find(a=>String(a.id)===String(t.acc));
    if(oldAcc)accs=[oldAcc,...accs];
  }
  panel.innerHTML=`<div class="detail-head"><div class="detail-title">账单详情</div><button class="icon-btn-sm" id="detailClose">✕</button></div>
    <div class="detail-grid">
      <label>类型<select id="detailType"><option value="expense">支出</option><option value="income">收入</option><option value="transfer">转账</option><option value="invest">投资收益</option></select></label>
      <label>金额<input type="number" id="detailAmount" step="0.01" value="${t.amount}"></label>
      <label>日期<input type="date" id="detailDate" value="${esc(String(t.date).slice(0,10))}"></label>
      <label>分类<select id="detailCat">${cats.map(c=>`<option value="${c.id}">${esc(c.i+' '+c.n)}</option>`).join('')}</select></label>
      <label>账户<select id="detailAcc">${accs.map(a=>`<option value="${a.id}">${esc(a.n)}</option>`).join('')}<option value="">不关联账户（不影响余额）</option></select></label>
      <label>状态<select id="detailStatus"><option value="normal">正常</option><option value="pending">待整理</option></select></label>
      <label>标签<input type="text" id="detailTags" value="${esc((t.tags||[]).join('、'))}" placeholder="多个标签用顿号或逗号分隔"></label>
      <label>备注<input type="text" id="detailDesc" maxlength="60" value="${esc(t.desc||'')}"></label>
    </div>
    <div class="mini-action-row"><button id="detailCopy">复制一笔</button><button id="detailDelete">删除</button></div>
    <div class="detail-save-hint">修改字段后自动保存；快捷键 Esc 可关闭选择。</div>`;
  $('detailType').value=t.type;$('detailCat').value=t.cat||'';$('detailAcc').value=t.acc||'';$('detailStatus').value=t.status||'normal';
  $('detailClose').onclick=()=>{selectedBillId=null;renderBillDetailPanel();renderBills();};
  $('detailCopy').onclick=()=>copyTx(t.id);
  $('detailDelete').onclick=()=>confirmDel(t.id);
  ['detailType','detailAmount','detailDate','detailCat','detailAcc','detailStatus','detailTags','detailDesc'].forEach(id=>{
    $(id).onchange=()=>saveBillDetail(t.id);
    if(id==='detailDesc'||id==='detailAmount'||id==='detailTags')$(id).oninput=debounce(()=>saveBillDetail(t.id),500);
  });
}

function renderBatchBar(d,list){
  if(!$('batchBar'))return;
  fillAdvancedFilterOptions(d);
  fillBatchOptions(d);
  $('batchBar').classList.remove('hide');
  $('batchCount').textContent=`已选 ${selectedBatchIds.size} 笔`;
}

function fillAdvancedFilterOptions(d){
  if(!$('advAcc'))return;
  const accVal=$('advAcc').value,tagVal=$('advTag').value;
  $('advAcc').innerHTML='<option value="">全部账户</option>'+d.accs.filter(a=>a.ac).map(a=>`<option value="${a.id}">${esc(a.n)}</option>`).join('');
  $('advTag').innerHTML='<option value="">全部标签</option>'+(d.tags||[]).map(t=>`<option value="${esc(t.n)}">${esc(t.n)}</option>`).join('');
  $('advAcc').value=accVal;$('advTag').value=tagVal;
}

function fillBatchOptions(d){
  if(!$('batchCat'))return;
  $('batchCat').innerHTML='<option value="">分类不变</option>'+d.cats.filter(c=>c.ac!==0).map(c=>`<option value="${c.id}">${esc(c.i+' '+c.n)}</option>`).join('');
  $('batchAcc').innerHTML='<option value="">账户不变</option>'+d.accs.filter(a=>a.ac).map(a=>`<option value="${a.id}">${esc(a.n)}</option>`).join('');
}

function bindBatchChecks(root){
  root.querySelectorAll('[data-batch-id]').forEach(ch=>{
    ch.onchange=e=>{
      e.stopPropagation();
      const id=String(ch.dataset.batchId);
      ch.checked?selectedBatchIds.add(id):selectedBatchIds.delete(id);
      renderBatchBar(load(),getFilteredBillList(load()));
    };
  });
}

function toggleSelectAll(list,checked){
  list.forEach(t=>checked?selectedBatchIds.add(String(t.id)):selectedBatchIds.delete(String(t.id)));
  renderBills();
}

function applyBatchEdit(action){
  const d=load();
  const ids=[...selectedBatchIds];
  if(!ids.length){toast('请先选择账单');return}
  ids.forEach(id=>{
    const t=d.txs.find(x=>String(x.id)===String(id));
    if(!t)return;
    if(action==='delete'){moveTxToTrash(d,t);return}
    if(action==='pending'){t.status='pending';return}
    const cat=$('batchCat').value,acc=$('batchAcc').value,tag=$('batchTag').value.trim();
    if(cat)t.cat=parseInt(cat);
    if(acc)t.acc=acc;
    if(tag&&!t.tags.includes(tag))t.tags.push(tag);
    if(t.cat&&t.acc)t.status='normal';
  });
  logAction(d,action==='delete'?'批量删除':action==='pending'?'批量标为待整理':'批量编辑',`${ids.length} 笔账单`);
  save(d);data=d;selectedBatchIds.clear();refreshAllViews();toast('批量操作已完成');
}

function renderSplitWorkbench(list,d){
  if(!$('splitWorkbench'))return;
  $('splitWorkbench').classList.toggle('hide',!splitWorkbenchOn);
  if(!splitWorkbenchOn)return;
  const inc=list.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0),exp=list.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  $('splitStats').innerHTML=`<div class="bqs-item"><div class="bqs-label">筛选收入</div><div class="bqs-val income">${fmt(inc)}</div></div><div class="bqs-item"><div class="bqs-label">筛选支出</div><div class="bqs-val expense">${fmt(exp)}</div></div><div class="bqs-item"><div class="bqs-label">账单数</div><div class="bqs-val">${list.length} 笔</div></div>`;
  $('splitAccounts').innerHTML=d.accs.filter(a=>a.ac).slice(0,6).map(a=>`<div class="bqs-cat-row"><span class="bqs-cat-name">${esc(a.n)}</span><span class="bqs-cat-amt">${fmt(a.b)}</span></div>`).join('');
}

function saveBillDetail(id){
  const d=load();
  const t=d.txs.find(x=>String(x.id)===String(id));
  if(!t)return;
  const old={...t};
  const amount=parseFloat($('detailAmount').value);
  if(!amount||amount<=0)return;
  if(shouldRollbackOnDelete(t))rollbackTxBalance(d,t);
  t.type=$('detailType').value;t.amount=amount;t.date=$('detailDate').value;t.cat=$('detailCat').value?parseInt($('detailCat').value):null;t.acc=$('detailAcc').value||null;t.desc=$('detailDesc').value.trim();t.status=$('detailStatus').value;t.tags=$('detailTags').value.split(/[、,，\s]+/).map(x=>x.trim()).filter(Boolean);t.balApplied=!!t.acc;
  applyTxBalance(d,t);
  logAction(d,'详情面板保存',`${t.desc||TYPE_MAP[t.type]} ${fmt(t.amount)}`);
  save(d);data=d;
  refreshAllViews();
  selectedBillId=id;
  toast('已自动保存');
}

function debounce(fn,ms){let t;return function(){clearTimeout(t);t=setTimeout(()=>fn.apply(this,arguments),ms)}}

function matchBillKeyword(t,keyword,d){
  return matchBillKeywordWithQuery(t,keyword,d);
}

function matchBillKeywordWithQuery(t,keyword,d){
  const cat=d.cats.find(c=>String(c.id)===String(t.cat));
  const acc=d.accs.find(a=>String(a.id)===String(t.acc));
  const toAcc=d.accs.find(a=>String(a.id)===String(t.toAcc));
  const text=[t.desc,cat?.n,acc?.n,toAcc?.n,TYPE_MAP[t.type],t.date].join(' ').toLowerCase();
  const amountRules=[];
  let q=keyword.replace(/([<>]=?|=)\s*(\d+(?:\.\d+)?)/g,(m,op,num)=>{amountRules.push({op,num:parseFloat(num)});return ' ';});
  q=q.replace(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/g,(m,a,b)=>{amountRules.push({op:'range',min:parseFloat(a),max:parseFloat(b)});return ' ';}).trim();
  const amount=Math.abs(parseFloat(t.amount)||0);
  const amountOk=amountRules.every(r=>{
    if(r.op==='>')return amount>r.num;
    if(r.op==='>=')return amount>=r.num;
    if(r.op==='<')return amount<r.num;
    if(r.op==='<=')return amount<=r.num;
    if(r.op==='=')return amount===r.num;
    if(r.op==='range')return amount>=Math.min(r.min,r.max)&&amount<=Math.max(r.min,r.max);
    return true;
  });
  const words=q.split(/\s+/).filter(Boolean);
  return amountOk&&words.every(w=>matchKeywordWordByAlias(text,w,d));
}

function matchKeywordWordByAlias(text,word,d){
  if(text.includes(word))return true;
  const rules=d.settings?.noteAliasRules||[];
  const hit=rules.find(r=>{
    const target=String(r.target||'').toLowerCase().trim();
    const aliases=(r.aliases||[]).map(x=>String(x).toLowerCase().trim()).filter(Boolean);
    return target===word||aliases.includes(word);
  });
  if(!hit)return false;
  const terms=[hit.target,...(hit.aliases||[])].map(x=>String(x).toLowerCase().trim()).filter(Boolean);
  return terms.some(term=>text.includes(term));
}

function largeExpenseThreshold(d=load()){
  const n=parseFloat(d.settings?.largeExpenseThreshold);
  return isNaN(n)||n<0?500:n;
}

function isLargeExpense(t,d=load()){
  return t&&t.type==='expense'&&(t.manualLarge||(!t.ignoreLarge&&Number(t.amount||0)>=largeExpenseThreshold(d)));
}

function clearBillFilters(showMsg=true){
  currentBillCatFilter=null;
  currentBillAccountFilter=null;
  pendingOnly=false;
  largeOnly=false;
  selectedBatchIds.clear();
  $('fType').value='';
  $('fMonth').value='';
  $('fCat').value='';
  $('fKeyword').value='';
  if($('advancedFilterPanel'))$('advancedFilterPanel').classList.add('hide');
  ['advStart','advEnd','advMin','advMax','advAcc','advTag','advStatus','advSource','advDup'].forEach(id=>{if($(id))$(id).value='';});
  $('pendingOnlyBtn')?.classList.remove('active');
  $('largeOnlyBtn')?.classList.remove('active');
  renderBills();
  if(showMsg)toast('筛选已清空');
}

function saveSearchHistory(keyword){
  keyword=String(keyword||'').trim();
  if(!keyword)return;
  const d=load();
  d.settings=d.settings||{};
  const old=d.settings.searchHistory||[];
  d.settings.searchHistory=[keyword,...old.filter(x=>String(x)!==keyword)].slice(0,8);
  save(d);data=d;
  renderSearchHistory(d);
}

function renderSearchHistory(d=load()){
  const box=$('billSearchHistory');
  if(!box)return;
  const list=(d.settings?.searchHistory||[]).filter(Boolean).slice(0,8);
  if(!list.length){box.classList.add('hide');box.innerHTML='';return;}
  box.classList.remove('hide');
  box.innerHTML=`<span class="history-label">最近搜索：</span>${list.map(k=>`<button data-search-history="${esc(k)}">${esc(k)}</button>`).join('')}<button data-clear-search-history="1">清空</button>`;
  box.querySelectorAll('[data-search-history]').forEach(btn=>btn.onclick=()=>{$('fKeyword').value=btn.dataset.searchHistory;$('fMonth').value='';currentBillCatFilter=null;currentBillAccountFilter=null;renderBills();});
  box.querySelector('[data-clear-search-history]')?.addEventListener('click',()=>{
    const d=load();d.settings=d.settings||{};d.settings.searchHistory=[];save(d);data=d;renderSearchHistory(d);toast('搜索历史已清空');
  });
}

function openAccountFlow(id){
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(id));
  if(!acc){toast('账户不存在');return}
  currentBillAccountFilter={accId:String(id),name:acc.n};
  currentBillCatFilter=null;
  switchPage('bills');
  switchBillTab('day');
  $('fType').value='';
  $('fCat').value='';
  $('fKeyword').value='';
  renderBills();
  toast(`正在查看「${acc.n}」账户流水`);
}

function bindTxEditors(root){
  if(!root)return;
  root.querySelectorAll('[data-edit-tx]').forEach(row=>{
    row.ondblclick=e=>{
      if(e.target.closest('[data-del]'))return;
      playInteractionSound('dbl');
      openTxEdit(row.dataset.editTx);
    };
  });
}

function bindAccountSnapshotSort(){
  const box=$('accountSnapshot');
  let dragging=null;
  box.querySelectorAll('[data-snapshot-acc]').forEach(row=>{
    row.ondragstart=e=>{
      if(e.target.closest('button')){e.preventDefault();return}
      dragging=row;
      row.classList.add('dragging');
      e.dataTransfer.effectAllowed='move';
      e.dataTransfer.setData('text/plain',row.dataset.snapshotAcc);
    };
    row.ondragover=e=>{
      e.preventDefault();
      const over=row;
      if(!dragging||dragging===over)return;
      const rect=over.getBoundingClientRect();
      const after=e.clientY>rect.top+rect.height/2;
      box.insertBefore(dragging,after?over.nextSibling:over);
    };
    row.ondragend=()=>{
      if(dragging)dragging.classList.remove('dragging');
      dragging=null;
      saveAccountSnapshotOrder();
    };
  });
}

function saveAccountSnapshotOrder(){
  const ids=Array.from($('accountSnapshot').querySelectorAll('[data-snapshot-acc]')).map(el=>String(el.dataset.snapshotAcc));
  if(!ids.length)return;
  const d=load();
  ids.forEach((id,i)=>{
    const acc=d.accs.find(a=>String(a.id)===id);
    if(acc)acc.ord=i+1;
  });
  save(d);data=d;
}

function groupByDate(txs){
  const groups={};
  txs.forEach(t=>{
    if(!groups[t.date])groups[t.date]=[];
    groups[t.date].push(t);
  });
  return Object.keys(groups).sort((a,b)=>b.localeCompare(a)).map(date=>({date,txs:groups[date]}));
}
function dateGroupsWithYearHtml(groups,showDel=false,isHome=false,keyword=''){
  let lastYear='';
  const yearSummary={};
  groups.forEach(g=>{
    const year=String(g.date||'').slice(0,4)||'未知年份';
    yearSummary[year]=yearSummary[year]||{inc:0,exp:0,count:0};
    g.txs.forEach(t=>{
      if(t.type==='income')yearSummary[year].inc+=Number(t.amount||0);
      if(t.type==='expense')yearSummary[year].exp+=Number(t.amount||0);
      yearSummary[year].count++;
    });
  });
  return groups.map(g=>{
    const year=String(g.date||'').slice(0,4)||'未知年份';
    const s=yearSummary[year]||{inc:0,exp:0,count:0};
    const sumText=s.exp>0?`合计：-${fmt(s.exp).replace(/[+-]/,'')}`:(s.inc>0?`合计：+${fmt(s.inc).replace(/[+-]/,'')}`:`合计：${s.count} 笔`);
    const yearHtml=year!==lastYear?`<div class="year-separator"><span>${esc(year)}年</span><span class="year-separator-sum">${sumText}</span></div>`:'';
    lastYear=year;
    return yearHtml+dateGroupHtml(g,showDel,isHome,keyword);
  }).join('');
}
function formatDateHeader(dateStr){
  const d=new Date(dateStr);
  const today=localDateStr();
  const yesterdayDate=new Date();yesterdayDate.setDate(yesterdayDate.getDate()-1);
  const yesterday=yesterdayDate.toISOString().slice(0,10);
  const weekDays=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  const month=d.getMonth()+1;
  const day=d.getDate();
  const weekDay=weekDays[d.getDay()];
  const prefix=dateStr===today?'今天 ':dateStr===yesterday?'昨天 ':'';
  return `${prefix}${month}月${day}日 ${weekDay}`;
}
function dateGroupHtml(group,showDel=false,isHome=false,keyword=''){
  const inc=group.txs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const exp=group.txs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  let summaryHtml='';
  if(inc>0)summaryHtml+=`<span class="ds-item inc">收入：+${short(inc)}</span>`;
  if(exp>0)summaryHtml+=`<span class="ds-item exp">支出：-${short(exp)}</span>`;
  return `<div class="date-group" data-date="${group.date}">
    <div class="date-header">
      <span class="date-label">${formatDateHeader(group.date)}</span>
      <span class="date-summary">${summaryHtml}</span>
    </div>
    ${group.txs.map(t=>txRow(t,showDel,isHome,keyword)).join('')}
  </div>`;
}

function getSearchHighlightTerms(d=load()){
  let q=($('fKeyword')?.value||'').toLowerCase().trim();
  if(!q)return [];
  q=q.replace(/([<>]=?|=)\s*(\d+(?:\.\d+)?)/g,' ');
  q=q.replace(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/g,' ');
  const base=q.split(/\s+/).map(x=>x.trim()).filter(Boolean);
  const terms=[...base];
  const rules=d.settings?.noteAliasRules||[];
  base.forEach(w=>{
    rules.forEach(r=>{
      const group=[r.target,...(r.aliases||[])].map(x=>String(x||'').toLowerCase().trim()).filter(Boolean);
      if(group.includes(w))terms.push(...group);
    });
  });
  return [...new Set(terms)].filter(t=>t.length>0).sort((a,b)=>b.length-a.length);
}

function highlightSearchText(text,d=load()){
  const raw=String(text==null?'':text);
  const terms=getSearchHighlightTerms(d);
  if(!terms.length)return esc(raw);
  const lower=raw.toLowerCase();
  let ranges=[];
  terms.forEach(term=>{
    let idx=0;
    while((idx=lower.indexOf(term,idx))!==-1){
      ranges.push([idx,idx+term.length]);
      idx+=term.length||1;
    }
  });
  if(!ranges.length)return esc(raw);
  ranges=ranges.sort((a,b)=>a[0]-b[0]||b[1]-a[1]).reduce((acc,r)=>{
    const last=acc[acc.length-1];
    if(!last||r[0]>last[1])acc.push(r);
    else last[1]=Math.max(last[1],r[1]);
    return acc;
  },[]);
  let out='',pos=0;
  ranges.forEach(([s,e])=>{
    out+=esc(raw.slice(pos,s));
    out+=`<span class="search-hit">${esc(raw.slice(s,e))}</span>`;
    pos=e;
  });
  out+=esc(raw.slice(pos));
  return out;
}

/* 关键词高亮（<mark>标签），用于dateGroupHtml传入的keyword */
function highlightKeyword(text,keyword){
  const raw=String(text==null?'':text);
  if(!keyword)return esc(raw);
  const kw=keyword.toLowerCase();
  const lower=raw.toLowerCase();
  let ranges=[];
  let idx=0;
  while((idx=lower.indexOf(kw,idx))!==-1){
    ranges.push([idx,idx+kw.length]);
    idx+=kw.length||1;
  }
  if(!ranges.length)return esc(raw);
  let out='',pos=0;
  ranges.forEach(([s,e])=>{
    out+=esc(raw.slice(pos,s));
    out+=`<mark>${esc(raw.slice(s,e))}</mark>`;
    pos=e;
  });
  out+=esc(raw.slice(pos));
  return out;
}

function txRow(t,showDel,isHome=false,keyword=''){
  const cat=data.cats.find(c=>String(c.id)===String(t.cat))||{};
  const acc=data.accs.find(a=>String(a.id)===String(t.acc));
  const toAcc=data.accs.find(a=>String(a.id)===String(t.toAcc));
  const largeBadge=isLargeExpense(t,data)?'<span class="large-badge">大额</span>':'';
  const noAccBadge=(!t.acc&&t.type!=='transfer')?'<span class="status-badge">无账户</span>':'';
  const hiddenAccBadge=(t.acc&&!acc)?'<span class="status-badge warn">账户不存在</span>':((acc&&acc.ac===0)||(toAcc&&toAcc.ac===0)?'<span class="status-badge warn">已隐藏</span>':'');
  const systemBadge=t.source==='reconcile'?'<span class="status-badge system">系统</span>':'';
  let accLabel=acc?`${esc(acc.n)}${toAcc?' → '+esc(toAcc.n):''}`:(t.type==='transfer'?'':'未关联账户');
  const rateText=t.type==='invest'&&t.rate!==''&&t.rate!=null?`<span>${parseFloat(t.rate)>0?'+':''}${esc(t.rate)}%</span>`:'';
  if(isHome){
    const isPreferred=a=>a&&String(a.n).replace(/\s+/g,'')==='微+银+信+E';
    accLabel=(isPreferred(acc)||isPreferred(toAcc))?'微+银+信+E':'';
  }
  const tags=(t.tags||[]).map(x=>`<span class="tag-pill">${esc(x)}</span>`).join('');
  // 搜索高亮：优先用传入的keyword，否则用已有的highlightSearchText
  const catTitleRaw=keyword?highlightKeyword(cat.n||TYPE_MAP[t.type],keyword):highlightSearchText(cat.n||TYPE_MAP[t.type],data);
  const catTitle=cat.id&&!isHome?`<span data-filter-cat="${cat.id}" data-filter-cat-name="${esc(cat.n||TYPE_MAP[t.type])}" title="点击筛选此分类" style="cursor:pointer">${catTitleRaw}</span>`:catTitleRaw;
  const descTitle=t.desc?' · '+(keyword?highlightKeyword(t.desc,keyword):highlightSearchText(t.desc,data)):'';
  const accHtmlRaw=keyword&&accLabel?highlightKeyword(accLabel,keyword):esc(accLabel);
  const accHtml=acc?.id&&!isHome?`<span data-filter-acc="${acc.id}" data-filter-acc-name="${esc(acc.n)}" title="点击筛选此账户" style="cursor:pointer">${accHtmlRaw}</span>`:accHtmlRaw;
  const innerHtml=`<div class="tx-icon" style="background:${cat.c||'#94a3b8'}18;color:${cat.c||'#94a3b8'}">${cat.i||'📦'}</div>
    <div class="tx-main">
      <div class="tx-title"><span class="tx-cat-dot" style="background:${cat.c||'#94a3b8'}"></span>${t.status==='pending'?'🟡 ':''}${catTitle}${largeBadge}${noAccBadge}${hiddenAccBadge}${systemBadge}${descTitle||'<span style="color:var(--text-tertiary)"> · 无备注</span>'}${tags}</div>
      <div class="tx-sub">
        ${t.time?`<span class="tx-time">${t.time}</span>`:''}
        ${accLabel?`<span>${keyword?accHtml:esc(accLabel)}</span>`:''}
        ${rateText}
        ${t.mood?`<span class="mood">${getMood(t.mood)}</span>`:''}
      </div>
    </div>
    <div class="tx-amount ${t.type==='expense'?'expense':t.type==='income'?'income':''}">${t.type==='expense'?'-':t.type==='income'?'+':''}${fmt(t.amount).replace(/[+-]/,'')}</div>
    ${showDel?`<div class="tx-actions"><button class="icon-btn-sm tx-copy" data-copy="${t.id}" title="复制一笔">⧉</button><button class="icon-btn-sm" data-del="${t.id}" title="删除">🗑</button></div>`:''}`;
  const swipeBtns=`<div class="tx-swipe-btns"><button class="tx-swipe-edit" data-sid="${t.id}">编辑</button><button class="tx-swipe-del" data-sid="${t.id}">删除</button></div>`;
  return `<div class="tx-swipe-wrap"><div class="tx-item type-${esc(t.type)} ${isLargeExpense(t,data)?'big-expense':''}" data-edit-tx="${t.id}" title="双击编辑记录" oncontextmenu="showTxContextMenu(event,'${t.id}')">
    ${showDel?`<input class="tx-select" type="checkbox" data-batch-id="${t.id}" ${selectedBatchIds.has(String(t.id))?'checked':''}>`:''}
    ${innerHtml}
  </div>${swipeBtns}</div>`;
}

function copyTx(id){
  const d=load();
  const old=d.txs.find(t=>String(t.id)===String(id));
  if(!old){toast('记录不存在');return}
  const tx={...old,id:genId(),date:localDateStr(),time:new Date().toTimeString().slice(0,5),balApplied:!!old.balApplied,source:'copy'};
  if(old.type==='invest')tx.date=localMonthStr()+'-01';
  d.txs.unshift(tx);
  applyTxBalance(d,tx);
  logAction(d,'复制账单',`${old.desc||TYPE_MAP[old.type]} ${fmt(old.amount)}`);
  save(d);data=d;
  refreshAllViews();
  highlightTx(tx.id);
  toast('已复制一笔，可双击修改');
}

function highlightTx(id){
  requestAnimationFrame(()=>{
    document.querySelectorAll(`[data-edit-tx="${id}"]`).forEach(el=>{
      el.classList.add('just-added');
      el.scrollIntoView({behavior:'smooth',block:'nearest'});
      setTimeout(()=>el.classList.remove('just-added'),2000);
    });
  });
}

function calendarCountHtml(incCount,expCount){
  const total=incCount+expCount;
  return `<div class="calendar-period-count single">
    <div class="calendar-count-total">${total}笔</div>
  </div>`;
}

function calendarMoneyHtml(inc,exp,style='text'){
  if(inc<=0&&exp<=0){
    return '<div class="calendar-period-money single"><div class="calendar-money-line zero">¥0.00</div></div>';
  }
  if(style==='pill'){
    return `<div class="calendar-period-money">
      <div class="calendar-money-pill inc">${inc>0?`<span class="m-label">收</span><span class="m-value">+${short(inc)}</span>`:'<span class="m-value">-</span>'}</div>
      <div class="calendar-money-pill exp">${exp>0?`<span class="m-label">支</span><span class="m-value">-${short(exp)}</span>`:'<span class="m-value">-</span>'}</div>
    </div>`;
  }
  return `<div class="calendar-period-money">
    <div class="calendar-money-line inc">${inc>0?`收 +${short(inc)}`:'-'}</div>
    <div class="calendar-money-line exp">${exp>0?`支 -${short(exp)}`:'-'}</div>
  </div>`;
}

function renderMonthBill(){
  const d=load();
  const isMobile=window.innerWidth<700;
  const year=monthBillViewDate.getFullYear();
  // 手机端：显示当前年份每个月的收支汇总
  if(isMobile){
    const yearTxs=d.txs.filter(t=>t.st==='normal'&&t.date.startsWith(String(year)));
    const monthMap={};
    for(let m=1;m<=12;m++){monthMap[pad2(m)]={inc:0,exp:0};}
    yearTxs.forEach(t=>{
      const m=t.date.split('-')[1];
      if(!monthMap[m])monthMap[m]={inc:0,exp:0};
      if(t.type==='income')monthMap[m].inc+=t.amount;
      else if(t.type==='expense')monthMap[m].exp+=t.amount;
    });
    const totalInc=yearTxs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
    const totalExp=yearTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
    const totalBal=totalInc-totalExp;
    let html=`<div class="month-bill-month-nav"><button id="mbPrev">◀</button><div class="mb-month-text">${year}年 各月收支</div><button id="mbNext">▶</button></div>`;
    html+=`<div class="mb-item" style="display:flex;justify-content:center;gap:24px;padding:10px 0;margin-bottom:12px;background:var(--bg);border:1px solid var(--border-light);border-radius:var(--radius-sm)">
      <div style="text-align:center"><div class="mb-label">总收入</div><div class="mb-val income" style="font-size:16px">${fmt(totalInc)}</div></div>
      <div style="text-align:center"><div class="mb-label">总支出</div><div class="mb-val expense" style="font-size:16px">${fmt(totalExp)}</div></div>
      <div style="text-align:center"><div class="mb-label">总结余</div><div class="mb-val" style="color:${totalBal>=0?'var(--income)':'var(--expense)'};font-size:16px">${fmt(totalBal)}</div></div>
    </div>`;
    html+='<div class="year-bill-months">';
    html+='<div class="year-month-header"><span>月份</span><span>收入</span><span>支出</span><span>结余</span></div>';
    for(let m=1;m<=12;m++){
      const key=pad2(m);
      const {inc,exp}=monthMap[key];
      if(inc>0||exp>0){
        const bal=inc-exp;
        html+=`<div class="year-month-row" data-go-month="${year}-${key}"><span>${m}月</span><span class="income">${fmt(inc)}</span><span class="expense">${fmt(exp)}</span><span style="color:${bal>=0?'var(--income)':'var(--expense)'}">${fmt(bal)}</span></div>`;
      }
    }
    html+='</div>';
    $('monthBillSummary').innerHTML=html;
    $('monthBillCats').innerHTML='';
    $('mbPrev').onclick=()=>{monthBillViewDate.setFullYear(monthBillViewDate.getFullYear()-1);renderMonthBill();};
    $('mbNext').onclick=()=>{monthBillViewDate.setFullYear(monthBillViewDate.getFullYear()+1);renderMonthBill();};
    $('monthBillSummary').querySelectorAll('[data-go-month]').forEach(r=>{
      r.onclick=()=>{monthBillViewDate=new Date(r.dataset.goMonth+'-01');switchBillTab('year');};
    });
    return;
  }
  // PC端：保持原有单月详细数据
  const ym=year+'-'+pad2(monthBillViewDate.getMonth()+1);
  const monthTxs=d.txs.filter(t=>t.st==='normal'&&t.date.indexOf(ym)===0);
  const inc=monthTxs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const exp=monthTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const bal=inc-exp;
  const count=monthTxs.length;
  const avgDays=avgDaysForMonth(monthBillViewDate);
  // 摘要
  $('monthBillSummary').innerHTML=`
    <div class="month-bill-month-nav">
      <button id="mbPrev">◀</button>
      <div class="mb-month-text">${year}年${monthBillViewDate.getMonth()+1}月</div>
      <button id="mbNext">▶</button>
    </div>
    <div class="month-bill-summary-inner">
      <div class="mb-item"><div class="mb-label">收入</div><div class="mb-val income">${fmt(inc)}</div></div>
      <div class="mb-item"><div class="mb-label">支出</div><div class="mb-val expense">${fmt(exp)}</div></div>
      <div class="mb-item"><div class="mb-label">结余</div><div class="mb-val" style="color:${bal>=0?'var(--income)':'var(--expense)'}">${fmt(bal)}</div></div>
    </div>
    <div class="mb-item" style="margin-bottom:16px;text-align:center;background:var(--bg);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:10px">
      <div class="mb-label">交易笔数：${count} 笔 · 日均支出：${fmt(exp/avgDays)}</div>
    </div>`;
  // 支出类别排行
  const expCat={};
  monthTxs.filter(t=>t.type==='expense').forEach(t=>{
    const c=d.cats.find(x=>x.id===t.cat);
    if(c)expCat[c.n]={...expCat[c.n]||{amount:0,icon:c.i,color:c.c},amount:expCat[c.n]?expCat[c.n].amount+t.amount:t.amount,icon:c.i,color:c.c};
  });
  const incCat={};
  monthTxs.filter(t=>t.type==='income').forEach(t=>{
    const c=d.cats.find(x=>x.id===t.cat);
    if(c)incCat[c.n]={...incCat[c.n]||{amount:0,icon:c.i,color:c.c},amount:incCat[c.n]?incCat[c.n].amount+t.amount:t.amount,icon:c.i,color:c.c};
  });
  let catsHtml='';
  if(Object.keys(expCat).length){
    const sorted=Object.entries(expCat).sort((a,b)=>b[1].amount-a[1].amount);
    const maxAmt=sorted[0][1].amount||1;
    catsHtml+=`<div class="side-card"><div class="side-card-title">🔥 支出类别</div>${sorted.map(([name,data])=>{
      const pct=(data.amount/maxAmt*100).toFixed(0);
      return `<div class="top-exp-item"><div class="top-exp-info"><span class="top-exp-rank" style="background:${data.color}20;color:${data.color}">${data.icon}</span><span class="top-exp-name">${esc(name)}</span></div><div class="top-exp-bar-wrap"><div class="top-exp-bar" style="width:${pct}%;background:${data.color}"></div></div><div class="top-exp-amt">${fmt(data.amount)}</div></div>`;
    }).join('')}</div>`;
  }
  if(Object.keys(incCat).length){
    const sorted=Object.entries(incCat).sort((a,b)=>b[1].amount-a[1].amount);
    const maxAmt=sorted[0][1].amount||1;
    catsHtml+=`<div class="side-card"><div class="side-card-title">💰 收入类别</div>${sorted.map(([name,data])=>{
      const pct=(data.amount/maxAmt*100).toFixed(0);
      return `<div class="top-exp-item"><div class="top-exp-info"><span class="top-exp-rank" style="background:${data.color}20;color:${data.color}">${data.icon}</span><span class="top-exp-name">${esc(name)}</span></div><div class="top-exp-bar-wrap"><div class="top-exp-bar" style="width:${pct}%;background:${data.color}"></div></div><div class="top-exp-amt">${fmt(data.amount)}</div></div>`;
    }).join('')}</div>`;
  }
  if(!catsHtml)catsHtml='<div class="empty"><span class="em">📊</span><div class="empty-title">本月暂无数据</div></div>';
  $('monthBillCats').innerHTML=catsHtml;
  // 绑定月份切换
  $('mbPrev').onclick=()=>{monthBillViewDate.setMonth(monthBillViewDate.getMonth()-1);renderMonthBill();};
  $('mbNext').onclick=()=>{monthBillViewDate.setMonth(monthBillViewDate.getMonth()+1);renderMonthBill();};

  // 月账单侧边栏
  const budgetPct=d.budget>0?Math.min((exp/d.budget)*100,100):0;
  const onTrack=d.budget>0&&exp<=d.budget;
  if($('monthInsightPanel')){
    $('monthInsightPanel').innerHTML=`
      <div style="padding:12px;border-radius:12px;background:${onTrack?'var(--income-soft)':'var(--expense-soft)'};margin-bottom:12px">
        <div style="font-size:14px;font-weight:700;color:${onTrack?'var(--income)':'var(--expense)'}">${onTrack?'✅ 预算正常':'⚠️ 预算超支'}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">已用 ${Math.round(budgetPct)}% · 剩余 ${fmt(Math.max(d.budget-exp,0))}</div>
      </div>
      <div style="height:6px;border-radius:3px;background:var(--border-light);overflow:hidden;margin-bottom:12px"><div style="height:100%;width:${budgetPct}%;background:${onTrack?'var(--income)':'var(--expense)'};border-radius:3px;transition:width .4s ease"></div></div>
      <div class="bqs-item"><div class="bqs-label">结余率</div><div class="bqs-val">${inc>0?Math.round(((inc-exp)/inc)*100):0}%</div></div>
      <div class="bqs-item"><div class="bqs-label">日均支出</div><div class="bqs-val expense">${fmt(exp/avgDays)}</div></div>
      <div class="bqs-item"><div class="bqs-label">最大单笔</div><div class="bqs-val">${monthTxs.filter(t=>t.type==='expense').sort((a,b)=>b.amount-a.amount)[0]?fmt(monthTxs.filter(t=>t.type==='expense').sort((a,b)=>b.amount-a.amount)[0].amount):'¥0.00'}</div></div>`;
  }
  if($('monthTopCatsPanel')){
    const top3=Object.entries(expCat).sort((a,b)=>b[1].amount-a[1].amount).slice(0,3);
    $('monthTopCatsPanel').innerHTML=top3.length?top3.map(([name,data],i)=>{
      const catPct=exp>0?Math.round((data.amount/exp)*100):0;
      return `<div class="bqs-cat-row"><span class="bqs-cat-icon" style="background:${data.color}18;color:${data.color}">${data.icon}</span><div style="flex:1;min-width:0"><div class="bqs-cat-name">${esc(name)}</div><div style="height:4px;border-radius:2px;background:var(--border-light);margin-top:4px;overflow:hidden"><div style="height:100%;width:${catPct}%;background:${data.color};border-radius:2px"></div></div></div><span class="bqs-cat-amt">${catPct}%</span></div>`;
    }).join(''):'<div style="text-align:center;padding:20px;color:var(--text-tertiary);font-size:13px">暂无支出数据</div>';
  }
}

function showMonthDetail(year,month){
  monthBillViewDate=new Date(year,month-1,1);
  switchBillTab('month');
  renderMonthBill();
}
function showYearDetail(year){
  // 点击年份切换到该年的月账单视图
  monthBillViewDate=new Date(parseInt(year),0,1);
  switchBillTab('month');
  renderMonthBill();
}

function renderYearBill(){
  const d=load();
  const txs=d.txs.filter(t=>t.st==='normal');
  // 按年份分组汇总
  const yearMap={};
  txs.forEach(t=>{
    const y=t.date?.split('-')[0];if(!y)return;
    if(!yearMap[y])yearMap[y]={inc:0,exp:0};
    if(t.type==='income')yearMap[y].inc+=t.amount;
    else if(t.type==='expense')yearMap[y].exp+=t.amount;
  });
  const years=Object.keys(yearMap).sort((a,b)=>b.localeCompare(a));
  const totalInc=years.reduce((s,y)=>s+yearMap[y].inc,0);
  const totalExp=years.reduce((s,y)=>s+yearMap[y].exp,0);
  const totalBal=totalInc-totalExp;
  // 年度摘要（所有年份总计）
  $('yearBillSummary').innerHTML=`
    <div class="mb-item" style="grid-column:1/3;text-align:center;padding-bottom:4px">
      <div class="mb-label" style="margin-bottom:4px">总结余</div>
      <div class="mb-val" style="color:${totalBal>=0?'#333':'#ff4d4f'};font-size:28px;font-weight:800">${fmt(totalBal).replace('¥','')}</div>
    </div>
    <div class="mb-item" style="display:flex;justify-content:center;gap:24px;padding-top:4px">
      <div style="text-align:center"><div class="mb-label">总收入</div><div class="mb-val income" style="font-size:16px">${fmt(totalInc)}</div></div>
      <div style="text-align:center"><div class="mb-label">总支出</div><div class="mb-val expense" style="font-size:16px">${fmt(totalExp)}</div></div>
    </div>`;
  // 历年列表
  let html='<div class="year-month-header"><span>年份</span><span>年收入</span><span>年支出</span><span>年结余</span></div>';
  html+=years.map(y=>{
    const {inc,exp}=yearMap[y];const bal=inc-exp;
    return `<div class="year-month-row" onclick="showYearDetail('${y}')">
      <span class="ym-col-month">${y}年</span>
      <span class="ym-col-inc" style="color:${inc>0?'#52C41A':'#ccc'}">${inc>0?short(inc):'0.00'}</span>
      <span class="ym-col-exp" style="color:${exp>0?'#ff4d4f':'#ccc'}">${exp>0?short(exp):'0.00'}</span>
      <span class="ym-col-bal" style="color:${bal>=0?'#333':'#ff4d4f'}">${short(bal)}</span>
      <span class="ym-col-arrow">›</span>
    </div>`;
  }).join('');
  if(years.length===0)html+='<div class="empty" style="padding:40px 0"><span class="em">📆</span><div class="empty-title">暂无数据</div></div>';
  else html+='<div style="text-align:center;padding:20px;color:#999;font-size:12px">年账单为自然年（1.1-12.31）</div>';
  $('yearBillMonths').innerHTML=html;
  // 隐藏年份导航按钮（手机端不需要，因为显示了所有年份）
  if($('ybYearText'))$('ybYearText').textContent='历年账单';
}

/* ========== 投资 ========== */
const INVEST_PAGE_SIZE=50;

function renderInvestment(){
  const d=load();
  const now=new Date();
  const ym=prevMonthStr(now);
  const year=String(now.getFullYear());
  const investTxs=d.txs.filter(t=>t.st==='normal'&&t.type==='invest');
  const monthTxs=investTxs.filter(t=>t.date.indexOf(ym)===0);
  const yearTxs=investTxs.filter(t=>t.date.indexOf(year+'-')===0);
  const monthProfit=monthTxs.reduce((s,t)=>s+t.amount,0);
  const yearProfit=yearTxs.reduce((s,t)=>s+t.amount,0);
  const totalProfit=investTxs.reduce((s,t)=>s+t.amount,0);
  $('investMonthProfit').textContent=fmt(monthProfit);
  $('investMonthProfit').className='ss-value '+(monthProfit>=0?'income':'expense');
  $('investYearProfit').textContent=fmt(yearProfit);
  $('investYearProfit').className='ss-value '+(yearProfit>=0?'income':'expense');
  $('investTotalProfit').textContent=fmt(totalProfit);
  $('investTotalProfit').className='ss-value '+(totalProfit>=0?'income':'expense');
  renderInvestmentCalendar(investTxs);
  const rows=[...investTxs].sort((a,b)=>b.date.localeCompare(a.date)||(b.time||'').localeCompare(a.time||''));
  _investInfiniteState={allRows:rows,rendered:0,loading:false,done:false};
  const container=$('investmentList');
  container.innerHTML='';
  if(rows.length){
    appendInvestPage();
    setupInvestInfiniteScroll();
  }else{
    container.innerHTML='<div class="empty"><span class="em">📈</span><div class="empty-title">暂无投资收益记录</div><div class="empty-desc">后续可在这里记录每月投资理财收益</div></div>';
  }
  bindTxEditors(container);
  renderInvestmentAnalysis(d,investTxs,monthTotalsFromTxs(investTxs));
}

function appendInvestPage(){
  const st=_investInfiniteState;
  if(st.loading||st.done)return;
  st.loading=true;
  const start=st.rendered;
  const end=Math.min(start+INVEST_PAGE_SIZE,st.allRows.length);
  const batch=st.allRows.slice(start,end);
  const groups={};
  batch.forEach(t=>{
    const m=String(t.date||'').slice(0,7);
    if(!groups[m])groups[m]=[];
    groups[m].push(t);
  });
  const html=Object.keys(groups).sort((a,b)=>b.localeCompare(a)).map(m=>{
    const list=groups[m];
    const total=list.reduce((s,t)=>s+t.amount,0);
    const totalCls=total>=0?'income':'expense';
    const totalText=total>=0?'+'+fmt(total).replace(/[+-]/,''):fmt(total);
    const rowsHtml=list.map(t=>{
      const cls=t.amount>=0?'income':'expense';
      const amountText=t.amount>=0?'+'+fmt(t.amount).replace(/[+-]/,''):fmt(t.amount);
      const rateText=t.rate!==''&&t.rate!=null?`<span>${parseFloat(t.rate)>0?'+':''}${esc(t.rate)}%</span>`:'';
      return `<div class="tx-item investment-record" data-edit-tx="${t.id}" title="双击修改这条投资收益">
        <div class="tx-icon" style="background:var(--income-soft);color:var(--income)">📈</div>
        <div class="tx-main"><div class="tx-title">${esc(t.desc||'投资理财收益')}</div><div class="tx-sub">${t.time?`<span class="tx-time">${t.time}</span>`:''}<span>投资理财收益</span>${rateText}</div></div>
        <div class="tx-amount ${cls}">${amountText}</div>
      </div>`;
    }).join('');
    return `<div class="invest-month-group" data-invest-month-group="${m}">
      <div class="invest-month-head">
        <span class="invest-month-title">${monthLabel(m)}</span>
        <span class="invest-month-stat ${totalCls}">${list.length} 笔 · 合计 ${totalText}</span>
      </div>
      ${rowsHtml}
    </div>`;
  }).join('');
  const container=$('investmentList');
  container.insertAdjacentHTML('beforeend',html);
  bindTxEditors(container);
  st.rendered=end;
  st.loading=false;
  if(st.rendered>=st.allRows.length){
    st.done=true;
    const loader=container.querySelector('.bill-load-more');
    if(loader)loader.remove();
  }else{
    let loader=container.querySelector('.bill-load-more');
    if(!loader){
      loader=document.createElement('div');
      loader.className='bill-load-more';
      container.appendChild(loader);
    }
    loader.textContent=`已加载 ${st.rendered} / ${st.allRows.length} 条，滚动加载更多`;
  }
}

let _investScrollObserver=null;
function setupInvestInfiniteScroll(){
  if(_investScrollObserver)_investScrollObserver.disconnect();
  const container=$('investmentList');
  if(!container)return;
  _investScrollObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting&&!_investInfiniteState.done&&!_investInfiniteState.loading){
        appendInvestPage();
      }
    });
  },{rootMargin:'200px'});
  requestAnimationFrame(()=>{
    const loader=container.querySelector('.bill-load-more');
    if(loader)_investScrollObserver.observe(loader);
  });
}

function monthTotalsFromTxs(investRows){
  const monthTotals={};
  investRows.forEach(t=>{
    const m=String(t.date||'').slice(0,7);
    monthTotals[m]=(monthTotals[m]||0)+Number(t.amount||0);
  });
  return monthTotals;
}

function renderInvestmentAnalysis(d,investRows,monthTotals){
  if($('investAnalysisPanel')){
    const years=new Set();
    investRows.forEach(t=>years.add(t.date.slice(0,4)));
    const investCount=investRows.length;
    const monthEntries=Object.entries(monthTotals).sort((a,b)=>a[0].localeCompare(b[0]));
    const investMonths=monthEntries.map(x=>x[1]);
    const profitMonths=investMonths.filter(v=>v>0).length;
    const lossMonths=investMonths.filter(v=>v<0).length;
    const flatMonths=investMonths.filter(v=>v===0).length;
    const best=monthEntries.slice().sort((a,b)=>b[1]-a[1])[0];
    const worst=monthEntries.slice().sort((a,b)=>a[1]-b[1])[0];
    const avg=investMonths.length?investMonths.reduce((a,b)=>a+b,0)/investMonths.length:0;
    const winRate=investMonths.length?Math.round(profitMonths/investMonths.length*100):0;
    const last12=monthEntries.slice(-12);
    const maxAbs=Math.max(...last12.map(x=>Math.abs(x[1])),1);
    const bars=last12.length?last12.map(([m,total])=>{
      const cls=total>=0?'income':'expense';
      const pct=Math.max(4,Math.round(Math.abs(total)/maxAbs*100));
      const text=total>0?'+'+fmt(total).replace(/[+-]/,''):fmt(total);
      return `<div class="invest-mini-row" title="${m} ${text}">
        <span>${m.slice(5)}月</span>
        <div class="invest-mini-track"><div class="invest-mini-fill ${cls}" style="width:${pct}%"></div></div>
        <span class="invest-mini-value ${cls}">${short(total)}</span>
      </div>`;
    }).join(''):'<div class="empty" style="padding:14px">暂无月度数据</div>';
    const latest=investRows.slice().sort((a,b)=>b.date.localeCompare(a.date)||(b.time||'').localeCompare(a.time||'')).slice(0,4);
    $('investAnalysisPanel').innerHTML=`
      <div class="invest-analysis-grid">
        <div class="invest-metric"><div class="invest-metric-label">记录数</div><div class="invest-metric-value">${investCount} 条</div></div>
        <div class="invest-metric"><div class="invest-metric-label">盈利胜率</div><div class="invest-metric-value ${winRate>=50?'income':'expense'}">${winRate}%</div></div>
        <div class="invest-metric"><div class="invest-metric-label">月均收益</div><div class="invest-metric-value ${avg>=0?'income':'expense'}">${fmt(avg)}</div></div>
        <div class="invest-metric"><div class="invest-metric-label">记录年数</div><div class="invest-metric-value">${years.size||0} 年</div></div>
      </div>
      <div class="side-card-title" style="margin:8px 0">近 12 个月收益</div>
      <div class="invest-mini-bars">${bars}</div>
      <div class="invest-detail-list">
        <div class="invest-detail-item"><span>盈利月份</span><b class="income">${profitMonths} 个</b></div>
        <div class="invest-detail-item"><span>亏损月份</span><b class="expense">${lossMonths} 个</b></div>
        <div class="invest-detail-item"><span>最佳月份</span><b class="${best&&best[1]>=0?'income':'expense'}">${best?`${best[0]} · ${fmt(best[1])}`:'-'}</b></div>
        <div class="invest-detail-item"><span>最差月份</span><b class="${worst&&worst[1]>=0?'income':'expense'}">${worst?`${worst[0]} · ${fmt(worst[1])}`:'-'}</b></div>
        <div class="invest-detail-item"><span>持平月份</span><b>${flatMonths} 个</b></div>
      </div>
      <div class="side-card-title" style="margin:14px 0 8px">最近记录</div>
      <div class="invest-detail-list">
        ${latest.length?latest.map(t=>`<div class="invest-detail-item" data-invest-jump="${t.id}" style="cursor:pointer"><span>${esc(t.date)} · ${esc(t.desc||'投资收益')}</span><b class="${t.amount>=0?'income':'expense'}">${t.amount>=0?'+':''}${fmt(t.amount).replace(/[+-]/,'')}</b></div>`).join(''):'<div class="empty" style="padding:10px">暂无记录</div>'}
      </div>`;
    $('investAnalysisPanel').querySelectorAll('[data-invest-jump]').forEach(el=>el.onclick=()=>{
      const row=$('investmentList').querySelector(`[data-edit-tx="${CSS.escape(String(el.dataset.investJump))}"]`);
      if(row)row.scrollIntoView({behavior:'smooth',block:'center'});
    });
  }
}

function renderInvestmentCalendar(investTxs){
  $('investCalendarYear').textContent=investCalendarYear+'年';
  const nowYm=localMonthStr();
  let html='';
  for(let m=1;m<=12;m++){
    const ym=investCalendarYear+'-'+pad2(m);
    const list=investTxs.filter(t=>String(t.date||'').indexOf(ym)===0);
    const total=list.reduce((s,t)=>s+t.amount,0);
    const cls=total>0?'profit':total<0?'loss':'';
    const active=ym===nowYm?' active':'';
    const amount=total>0?'+'+fmt(total).replace(/[+-]/,''):total<0?fmt(total):'¥0.00';
    const empty=list.length?'':' empty-month';
    html+=`<div class="invest-month-cell ${cls}${active}${empty}" data-invest-month="${ym}" title="${list.length?'点击查看':'暂无'}${ym.replace('-','年')}月记录">
      <div class="invest-month-name">${m}月</div>
      <div class="invest-month-amt">${amount}</div>
      <div class="invest-month-count">${list.length?list.length+' 笔':'暂无记录'}</div>
    </div>`;
  }
  $('investCalendarGrid').innerHTML=html;
  $('investCalendarGrid').querySelectorAll('[data-invest-month]').forEach(cell=>{
    cell.onclick=()=>jumpInvestmentMonth(cell.dataset.investMonth);
  });
}

function jumpInvestmentMonth(ym){
  const target=$('investmentList').querySelector(`[data-invest-month-group="${ym}"]`);
  if(!target){toast('这个月份暂无投资记录');return;}
  target.scrollIntoView({behavior:'smooth',block:'start'});
}

function addInvestBatchRow(vals={}){
  const row=document.createElement('div');
  row.className='invest-batch-row';
  row.innerHTML=`
    <input type="month" class="invest-batch-month" value="${vals.month||getInvestBatchDefaultMonth()}">
    <input type="number" class="invest-batch-amount" step="0.01" placeholder="收益/亏损" value="${vals.amount||''}">
    <input type="text" class="invest-batch-desc" maxlength="60" placeholder="备注，例如 支付宝 / 基金" value="${esc(vals.desc||'')}">
    <button class="invest-batch-remove" title="删除这一行">×</button>`;
  row.querySelector('.invest-batch-remove').onclick=()=>{row.remove();bindInvestBatchMonthSync();};
  $('investBatchRows').appendChild(row);
  bindInvestBatchMonthSync();
}

function getInvestBatchDefaultMonth(){
  const first=$('investBatchRows')?.querySelector('.invest-batch-month');
  return first&&first.value?first.value:prevMonthStr();
}

function bindInvestBatchMonthSync(){
  const months=Array.from($('investBatchRows').querySelectorAll('.invest-batch-month'));
  const first=months[0];
  if(!first)return;
  first.onchange=()=>{
    months.slice(1).forEach(input=>{input.value=first.value;});
  };
}

function openInvestBatch(){
  $('investBatchRows').innerHTML='';
  addInvestBatchRow();
  addInvestBatchRow();
  addInvestBatchRow();
  $('investBatchModal').classList.add('show');
}

function closeInvestBatch(){
  $('investBatchModal').classList.remove('show');
}

function saveInvestBatch(){
  const rows=Array.from($('investBatchRows').querySelectorAll('.invest-batch-row'));
  const d=load();
  const now=new Date();
  const time=now.toTimeString().slice(0,5);
  let added=0;
  for(const row of rows){
    const month=row.querySelector('.invest-batch-month').value;
    const amount=parseFloat(row.querySelector('.invest-batch-amount').value);
    const desc=row.querySelector('.invest-batch-desc').value.trim();
    if(!month&&!amount&&!desc)continue;
    if(!month||!amount){toast('请补全批量添加里的月份和金额');return;}
    d.txs.unshift({id:genId(),type:'invest',amount,acc:null,date:month+'-01',time,desc,mood:'',cat:null,st:'normal',balApplied:false});
    added++;
  }
  if(!added){toast('请至少填写一笔投资收益');return;}
  save(d);data=d;
  closeInvestBatch();
  refreshAllViews();
  toast(`已批量添加 ${added} 笔投资收益`);
}

/* ========== 账户 ========== */
function renderAccounts(){
  const d=load();
  const list=d.accs;
  const total=list.reduce((s,a)=>s+a.b,0);
  const isMobile=window.innerWidth<700;
  if(isMobile){
    const assets=list.filter(a=>a.b>=0).reduce((s,a)=>s+a.b,0);
    const debts=Math.abs(list.filter(a=>a.b<0).reduce((s,a)=>s+a.b,0));
    $('accountsList').innerHTML=`<div class="acc-mobile-summary"><div class="acc-mobile-summary-item"><span>总资产</span><span class="pos">${fmt(assets)}</span></div><div class="acc-mobile-summary-item"><span>负债</span><span class="neg">${fmt(debts)}</span></div><div class="acc-mobile-summary-item"><span>净资产</span><span class="pos">${fmt(total)}</span></div></div>`+list.map(a=>{const m=ACC_META[a.t]||ACC_META.custom;return `<div class="acc-mobile-row" data-open-acc-flow="${a.id}"><span class="acc-mobile-icon">${m.i}</span><span class="acc-mobile-name">${esc(a.n)}</span><span class="acc-mobile-bal ${a.b>=0?'pos':'neg'}">${fmt(a.b)}</span></div>`;}).join('');
    $('accountsList').querySelectorAll('[data-open-acc-flow]').forEach(row=>{row.onclick=e=>showAccActionMenu(row.dataset.openAccFlow);});
    return;
  }
  $('accountsList').innerHTML=list.map((a,i)=>{
    const m=ACC_META[a.t]||ACC_META.custom;
    const related=d.txs.filter(t=>t.st==='normal'&&(String(t.acc)===String(a.id)||String(t.toAcc)===String(a.id))).sort((x,y)=>String(y.date||'').localeCompare(String(x.date||'')));
    const lastDate=related[0]?.date||'暂无变动';
    const sleepy=related[0]&&((new Date()-new Date(related[0].date))/86400000>90);
    return `<div class="acc-card${a.ac===0?' acc-hidden':''}" data-open-acc-flow="${a.id}" title="点击查看账户流水">
      <div class="acc-no">${i<15?i+1:''}</div>
      <div class="acc-icon" style="background:${m.c}18;color:${m.c}">${m.i}</div>
      <div class="acc-info"><div class="acc-name">${esc(a.n)}${a.ac===0?'<span class="status-badge warn">已隐藏</span>':''}${sleepy?'<span class="status-badge warn">沉睡账户</span>':''}</div><div class="acc-type">${m.n} · 最近 ${esc(lastDate)}</div></div>
      <div class="acc-balance ${a.b>=0?'pos':'neg'} copyable" data-copy-balance="${a.b}" title="点击复制余额">${fmt(a.b)}</div>
      <div class="acc-actions">
        <button class="icon-btn-sm acc-edit" data-edit-acc="${a.id}">编辑</button>
        <button class="icon-btn-sm acc-edit" data-hide-acc="${a.id}">${a.ac===0?'显示':'隐藏'}</button>
        <button class="icon-btn-sm acc-edit acc-delete" data-del-acc="${a.id}">删除</button>
      </div>
    </div>`;
  }).join('')+`<div class="acc-card" style="background:linear-gradient(135deg,var(--primary-soft),var(--income-soft));border:none">
    <div class="acc-icon" style="background:linear-gradient(135deg,var(--primary),#7c3aed);color:#fff">💎</div>
    <div class="acc-info"><div class="acc-name">净资产</div><div class="acc-type">${list.length} 个活跃账户</div></div>
    <div class="acc-balance pos" style="font-size:20px">${fmt(total)}</div>
  </div>`;
  $('accountsList').querySelectorAll('[data-edit-acc]').forEach(b=>b.onclick=e=>{e.stopPropagation();openAccEdit(b.dataset.editAcc);});
  $('accountsList').querySelectorAll('[data-hide-acc]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleAccountVisibility(b.dataset.hideAcc);});
  $('accountsList').querySelectorAll('[data-del-acc]').forEach(b=>b.onclick=e=>{e.stopPropagation();deleteAccount(b.dataset.delAcc);});
  $('accountsList').querySelectorAll('[data-copy-balance]').forEach(b=>b.onclick=e=>{e.stopPropagation();navigator.clipboard?.writeText(String(b.dataset.copyBalance));toast('账户余额已复制','success');});
  $('accountsList').querySelectorAll('[data-open-acc-flow]').forEach(row=>row.onclick=e=>{
    if(e.target.closest('button'))return;
    openAccountFlow(row.dataset.openAccFlow);
  });
  // 侧边栏：资产分布
  if($('accountsDistribution')){
    const active=d.accs.filter(a=>a.ac);
    const totalBal=active.reduce((s,a)=>s+a.b,0);
    const posAccs=active.filter(a=>a.b>0).sort((a,b)=>b.b-a.b);
    $('accountsDistribution').innerHTML=posAccs.length?posAccs.map(a=>{
      const m=ACC_META[a.t]||ACC_META.custom;
      const pct=totalBal>0?Math.round((a.b/totalBal)*100):0;
      return `<div class="bqs-cat-row">
        <span class="bqs-cat-icon" style="background:${m.c}18;color:${m.c}">${m.i}</span>
        <div style="flex:1;min-width:0">
          <div class="bqs-cat-name">${esc(a.n)}</div>
          <div style="height:4px;border-radius:2px;background:var(--border-light);margin-top:4px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${m.c};border-radius:2px"></div></div>
        </div>
        <span class="bqs-cat-amt">${pct}%</span>
      </div>`;
    }).join(''):'<div style="text-align:center;padding:20px;color:var(--text-tertiary);font-size:13px">暂无活跃账户</div>';
  }
  renderAccountLedgerPanel(d);
  renderAccountReconcilePanel(d);
  renderBalanceSheetPanel(d);
  if($('accountBalanceChart')){
    $('accountBalanceChart').innerHTML='';
  }
}

function renderAccountLedgerPanel(d){
  if(!$('accountLedgerPanel'))return;
  const acc=d.accs.find(a=>a.ac)||d.accs[0];
  const txs=d.txs.filter(t=>t.st==='normal'&&(String(t.acc)===String(acc?.id)||String(t.toAcc)===String(acc?.id))).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,80);
  $('accountLedgerPanel').innerHTML=acc?`
    <div class="insight-card"><div class="insight-title">${esc(acc.n)} 最近流水</div><div class="insight-desc">点击账户卡可切换到该账户完整流水。</div></div>
    ${txs.length?txs.map(t=>`<div class="tx-item"><div class="tx-main"><div class="tx-title">${esc(t.date)} · ${esc(TYPE_MAP[t.type])}</div><div class="tx-sub">${esc(t.desc||'无备注')}</div></div><div class="tx-amount ${t.type==='income'?'income':'expense'}">${t.type==='income'?'+':t.type==='expense'?'-':''}${fmt(t.amount).replace(/[+-]/,'')}</div></div>`).join(''):'<div class="empty" style="padding:16px">暂无账户流水</div>'}`:'<div class="empty">暂无账户</div>';
}

function renderAccountReconcilePanel(d){
  if(!$('accountReconcilePanel'))return;
  const accs=d.accs.filter(a=>a.ac);
  $('accountReconcilePanel').innerHTML=accs.map(a=>`<div class="reconcile-row">
    <div><div class="bqs-cat-name">${esc(a.n)}</div><div class="rank-hint">系统 ${fmt(a.b)}</div></div>
    <input type="number" step="0.01" value="${a.b}" data-real-balance="${a.id}">
    <button class="tool-btn" data-reconcile="${a.id}">对账</button>
  </div>`).join('')||'<div class="empty">暂无账户</div>';
  $('accountReconcilePanel').querySelectorAll('[data-reconcile]').forEach(btn=>btn.onclick=()=>{
    const id=btn.dataset.reconcile;
    const input=$('accountReconcilePanel').querySelector(`[data-real-balance="${id}"]`);
    reconcileAccount(id,parseFloat(input.value));
  });
}

function reconcileAccount(id,realBalance){
  if(isNaN(realBalance)){toast('请输入真实余额');return}
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(id));
  if(!acc)return;
  const diff=+(realBalance-acc.b).toFixed(2);
  if(Math.abs(diff)<0.01){toast('余额一致，无需调整');return}
  acc.b=realBalance;
  d.txs.unshift({id:genId(),type:diff>=0?'income':'expense',amount:Math.abs(diff),acc:acc.id,date:localDateStr(),time:new Date().toTimeString().slice(0,5),desc:'账户对账调整',cat:null,st:'normal',balApplied:false,source:'reconcile'});
  save(d);data=d;refreshAllViews();toast('已生成对账调整记录');
}

function renderBalanceSheetPanel(d){
  if(!$('balanceSheetPanel'))return;
  const active=d.accs.filter(a=>a.ac);
  const assets=active.filter(a=>a.t!=='debt').reduce((s,a)=>s+Math.max(0,a.b),0);
  const debts=Math.abs(active.filter(a=>a.t==='debt'||a.b<0).reduce((s,a)=>s+Math.min(0,a.b),0));
  const net=assets-debts;
  $('balanceSheetPanel').innerHTML=`<div class="balance-sheet">
    <div class="balance-box"><div class="balance-label">资产</div><div class="balance-val income">${fmt(assets)}</div></div>
    <div class="balance-box"><div class="balance-label">负债</div><div class="balance-val expense">${fmt(debts)}</div></div>
    <div class="balance-box"><div class="balance-label">净资产</div><div class="balance-val">${fmt(net)}</div></div>
  </div>`;
}

function renderAccountBalanceChart(d){
  if(!$('accountBalanceChart')||typeof echarts==='undefined')return;
  const months=[];
  const now=new Date();
  for(let i=11;i>=0;i--){const dt=new Date(now.getFullYear(),now.getMonth()-i,1);months.push(localMonthStr(dt));}
  const active=d.accs.filter(a=>a.ac);
  const initialTotal=active.reduce((s,a)=>s+(a.ib||0),0);
  let running=initialTotal;
  const values=months.map(m=>{
    const delta=d.txs.filter(t=>t.st==='normal'&&String(t.date).slice(0,7)===m).reduce((s,t)=>{
      if(t.type==='income')return s+t.amount;
      if(t.type==='expense')return s-t.amount;
      return s;
    },0);
    running+=delta;return +running.toFixed(2);
  });
  const current=values[values.length-1]||0;
  const max=Math.max(...values,0);
  const min=Math.min(...values,0);
  if($('accountBalanceSummary')){
    $('accountBalanceSummary').innerHTML=`<div class="balance-box"><div class="balance-label">当前余额</div><div class="balance-val ${current>=0?'income':'expense'}">${fmt(current)}</div></div>
      <div class="balance-box"><div class="balance-label">近12月最高</div><div class="balance-val">${fmt(max)}</div></div>
      <div class="balance-box"><div class="balance-label">近12月最低</div><div class="balance-val">${fmt(min)}</div></div>`;
  }
  if($('accountBalanceValues')){
    $('accountBalanceValues').innerHTML=months.map((m,i)=>`<span class="account-balance-chip">${m.slice(5)}月 ${short(values[i])}</span>`).join('');
  }
  const el=$('accountBalanceChart');
  const old=echarts.getInstanceByDom(el);
  if(old)old.dispose();
  const c=echarts.init(el);
  c.setOption({
    grid:{left:56,right:24,top:42,bottom:44,containLabel:true},
    tooltip:{trigger:'axis',formatter:ps=>ps.map(p=>`${p.axisValue}<br/>余额：${fmt(p.value)}`).join('')},
    xAxis:{type:'category',data:months.map(m=>m.slice(5)+'月'),axisLabel:{interval:0,fontSize:10}},
    yAxis:{type:'value',axisLabel:{fontSize:10,formatter:v=>short(v)}},
    series:[{type:'line',smooth:true,areaStyle:{opacity:.12},data:values,color:'#8b5cf6',symbolSize:7,label:{show:true,position:'top',fontSize:10,color:'var(--text-secondary)',formatter:p=>short(p.value)}}]
  });
  requestAnimationFrame(()=>c.resize());
  setTimeout(()=>c.resize(),120);
}

function toggleAccountVisibility(id){
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(id));
  if(!acc)return;
  acc.ac=acc.ac===0?1:0;
  save(d);data=d;
  renderAccounts();
  renderHome();
  renderAccSelects();
  toast(acc.ac?'账户已显示':'账户已隐藏，记账时不再显示');
}

function deleteAccount(id){
  const d=load();
  const idx=d.accs.findIndex(a=>String(a.id)===String(id));
  if(idx<0){toast('账户不存在');return}
  const acc=d.accs[idx];
  const related=d.txs.some(t=>String(t.acc)===String(id)||String(t.toAcc)===String(id));
  const msg=related?`确定删除「${acc.n}」吗？\n该账户有关联账单，将从账户列表隐藏，但历史账单仍保留账户名称。`:`确定删除「${acc.n}」吗？`;
  if(!confirm(msg))return;
  if(related){acc.ac=0;}else{d.accs.splice(idx,1);}
  save(d);data=d;renderAccounts();renderHome();renderAccSelects();toast('账户已删除');
}

/* ========== 统计 ========== */
function renderStats(){
  const d=load();
  const ym=localMonthStr();
  const all=d.txs.filter(t=>t.st==='normal');
  const monthTxs=all.filter(t=>t.date.indexOf(ym)===0);
  const inc=monthTxs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const exp=monthTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const bal=inc-exp;
  const rate=inc>0?Math.round((bal/inc)*100):0;
  const count=monthTxs.length;
  const days=avgDaysForMonth(new Date());
  const avg=exp/days;
  const maxTx=[...monthTxs].sort((a,b)=>b.amount-a.amount)[0];
  const today=new Date();
  const monthDays=new Date(today.getFullYear(),today.getMonth()+1,0).getDate();
  const leftDays=Math.max(monthDays-today.getDate(),0);
  const prevYm=prevMonthStr(today);
  const prevMonthTxs=all.filter(t=>t.date.indexOf(prevYm)===0);
  const prevExp=prevMonthTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const prevSameDayExp=prevMonthTxs.filter(t=>t.type==='expense'&&parseInt(String(t.date).slice(8,10))<=today.getDate()).reduce((s,t)=>s+t.amount,0);
  const diffSame=exp-prevSameDayExp;
  const remainingBudget=Math.max((d.budget||0)-exp,0);
  const dailyCanSpend=leftDays>0?remainingBudget/leftDays:remainingBudget;
  if($('statsIncome')){$('statsIncome').textContent=fmt(inc).replace(/^[+-]/,'')}
  if($('statsExpense')){$('statsExpense').textContent=fmt(exp).replace(/^[+-]/,'')}
  if($('statsBalance')){$('statsBalance').textContent=fmt(bal).replace(/^[+-]/,'');$('statsBalance').style.color=bal>=0?'var(--income)':'var(--expense)'}
  if($('statsRate')){$('statsRate').textContent=rate+'%';$('statsRate').style.color=rate>=0?'var(--income)':'var(--expense)'}
  if($('statsCount')){$('statsCount').textContent=count+' 笔'}
  if($('statsAvg')){$('statsAvg').textContent=fmt(avg).replace(/^[+-]/,'')}
  if($('statsMax')){$('statsMax').textContent=maxTx?fmt(maxTx.amount).replace(/^[+-]/,''):'¥0.00'}
  if($('statsOverviewExtra')){
    const budget=Number(d.budget)||0;
    const budgetPct=budget>0?Math.min(100,Math.round(exp/budget*100)):0;
    const expCatMap={};
    monthTxs.filter(t=>t.type==='expense').forEach(t=>{
      const c=d.cats.find(x=>String(x.id)===String(t.cat));
      const name=c?`${c.i} ${c.n}`:'其他支出';
      expCatMap[name]=(expCatMap[name]||0)+t.amount;
    });
    const topCat=Object.entries(expCatMap).sort((a,b)=>b[1]-a[1])[0];
    $('statsOverviewExtra').innerHTML=`
      <div class="overview-mini">
        <div class="overview-mini-title">预算进度</div>
        <div class="overview-mini-value">${budget?`${budgetPct}% · ${fmt(exp)} / ${fmt(budget)}`:'未设置月预算'}</div>
        <div class="overview-bar"><i style="width:${budget?budgetPct:0}%;background:${budget&&exp>budget?'var(--expense)':'var(--primary)'}"></i></div>
      </div>
      <div class="overview-mini">
        <div class="overview-mini-title">剩余每天可花</div>
        <div class="overview-mini-value">${budget?fmt(dailyCanSpend):'设置预算后显示'}</div>
      </div>
      <div class="overview-mini">
        <div class="overview-mini-title">本月主要支出</div>
        <div class="overview-mini-value">${topCat?`${esc(topCat[0])} · ${fmt(topCat[1])}`:'暂无支出分类'}</div>
      </div>`;
  }

  const months=[];for(let i=5;i>=0;i--){const dt=new Date();dt.setMonth(dt.getMonth()-i);months.push(localMonthStr(dt))}
  const dataM=months.map(m=>{const mi=all.filter(t=>t.type==='income'&&t.date.indexOf(m)===0).reduce((s,t)=>s+t.amount,0);const me=all.filter(t=>t.type==='expense'&&t.date.indexOf(m)===0).reduce((s,t)=>s+t.amount,0);return{m:m.slice(5)+'月',inc:mi,exp:me};});

  if($('chartTrend')){
    if(!trendC)trendC=echarts.init($('chartTrend'),null,{renderer:'svg'});
    trendC.setOption({animation:true,tooltip:{trigger:'axis'},legend:{data:['收入','支出'],top:4,right:8},grid:{left:50,right:20,top:36,bottom:30},xAxis:{type:'category',data:dataM.map(x=>x.m)},yAxis:{type:'value',splitLine:{lineStyle:{type:'dashed'}}},series:[
      {name:'收入',type:'line',smooth:true,data:dataM.map(x=>x.inc),lineStyle:{color:'#10b981',width:3},itemStyle:{color:'#10b981'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(16,185,129,.3)'},{offset:1,color:'rgba(16,185,129,0)'}]}}},
      {name:'支出',type:'line',smooth:true,data:dataM.map(x=>x.exp),lineStyle:{color:'#f43f5e',width:3},itemStyle:{color:'#f43f5e'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(244,63,94,.3)'},{offset:1,color:'rgba(244,63,94,0)'}]}}}
    ]},true);
  }

  const expCat={};monthTxs.filter(t=>t.type==='expense').forEach(t=>{const c=d.cats.find(x=>x.id===t.cat);if(c){expCat[c.n]=(expCat[c.n]||0)+t.amount;}});
  const pieD=Object.keys(expCat).map(k=>{const c=d.cats.find(x=>x.n===k);return{name:k,value:+expCat[k].toFixed(2),itemStyle:{color:c?c.c:'#94a3b8'}};});
  if($('chartPie')){
    if(!pieC)pieC=echarts.init($('chartPie'),null,{renderer:'svg'});
    pieC.setOption({animation:true,tooltip:{trigger:'item',formatter:'{b}: ¥{c} ({d}%)'},legend:{type:'scroll',orient:'vertical',right:10,top:'middle'},series:[{type:'pie',radius:['40%','70%'],center:['32%','50%'],data:pieD,label:{show:true,formatter:'{b}\n¥{c}'},emphasis:{itemStyle:{shadowBlur:10,shadowColor:'rgba(0,0,0,.2)'}}}]},true);
  }

  // 侧边栏：收支明细
  if($('statsDetailPanel')){
    const cats=[...new Set(monthTxs.filter(t=>t.type==='expense').map(t=>{const c=d.cats.find(x=>x.id===t.cat);return c?c.n:'其他'}))];
    const topTx=monthTxs.filter(t=>t.type==='expense').sort((a,b)=>b.amount-a.amount)[0];
    const budgetRows=d.cats.filter(c=>c.t==='expense'&&Number(c.budget)>0).map(c=>{
      const used=monthTxs.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)).reduce((s,t)=>s+t.amount,0);
      const pct=c.budget>0?Math.min(100,Math.round(used/c.budget*100)):0;
      return `<div class="category-budget-row" data-cat-budget-jump="${c.id}">
        <span class="bqs-cat-icon" style="background:${c.c}18;color:${c.c}">${c.i}</span>
        <div style="flex:1;min-width:0"><div class="bqs-cat-name">${esc(c.n)}预算</div><div style="height:5px;border-radius:3px;background:var(--border-light);margin-top:5px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${used>c.budget?'var(--expense)':c.c};border-radius:3px"></div></div></div>
        <span class="bqs-cat-amt">${fmt(used)} / ${fmt(c.budget)}</span>
      </div>`;
    }).join('');
    $('statsDetailPanel').innerHTML=`
      <div class="insight-card">
        <div class="insight-title">本月查账摘要</div>
        <div class="insight-desc">涉及 ${cats.length} 个支出分类，收入 ${monthTxs.filter(t=>t.type==='income').length} 笔，支出 ${monthTxs.filter(t=>t.type==='expense').length} 笔，转账 ${monthTxs.filter(t=>t.type==='transfer').length} 笔。</div>
      </div>
      <div class="insight-card ${diffSame<=0?'good':'warn'}">
        <div class="insight-title">相比上月同期</div>
        <div class="insight-desc">本月支出${diffSame>=0?'多':'少'} ${fmt(Math.abs(diffSame))}，上月整月支出 ${fmt(prevExp)}。</div>
      </div>
      ${topTx?`<div class="insight-card"><div class="insight-title">最大单笔</div><div class="insight-desc">${topTx.date} · ${fmt(topTx.amount)} · ${esc(topTx.desc||'无备注')}</div></div>`:''}
      ${budgetRows||'<div class="insight-card"><div class="insight-title">分类预算</div><div class="insight-desc">还没有设置分类预算，可以在设置页添加。</div></div>'}`;
    $('statsDetailPanel').querySelectorAll('[data-cat-budget-jump]').forEach(row=>row.onclick=()=>openMonthlyCategoryBills(row.dataset.catBudgetJump,row.querySelector('.bqs-cat-name').textContent.replace('预算','')));
  }
  // 侧边栏：理财洞察
  if($('statsInsightPanel')){
    const avgExp=days>0?exp/days:0;
    const monthTotalDays=new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate();
    const dailyBudget=(Number(d.budget)||0)/monthTotalDays;
    const onTrack=dailyBudget>0&&avgExp<=dailyBudget;
    $('statsInsightPanel').innerHTML=`
      <div class="insight-card ${onTrack?'good':'warn'}">
        <div class="insight-title">${onTrack?'支出节奏正常':'超支预警'}</div>
        <div class="insight-desc">日均支出 ${fmt(avgExp)}，预算日均 ${fmt(dailyBudget)}。</div>
      </div>
      <div class="insight-card">
        <div class="insight-title">接下来每天可花</div>
        <div class="insight-desc">本月还剩 ${leftDays} 天，预算剩余 ${fmt(remainingBudget)}，折合每天 ${fmt(dailyCanSpend)}。</div>
      </div>
      <div class="insight-card">
        <div class="insight-title">结余与预算</div>
        <div class="insight-desc">${inc>0?`收入结余率 ${Math.round(((inc-exp)/inc)*100)}%。`:''}本月预算已使用 ${d.budget>0?Math.round((exp/d.budget)*100):0}%。</div>
      </div>`;
  }
  renderCashFlowPanel(d,monthTxs);
  renderYearComparePanel(d,all);
  renderAnomalyPanel(d,all,monthTxs,exp);
  renderAdvancedStatsPanel(d,all,monthTxs);
  renderNeedsAnalysisPanel(d,monthTxs);
  renderAssetChangePage(d);
  renderCategoryYearMatrix(d,all);
  renderKeywordYearTrend(d,all);
  renderAnomalyExpenseList(d,all);
}

function renderCashFlowPanel(d,monthTxs){
  if(!$('cashFlowPanel'))return;
  const flows=[];
  monthTxs.filter(t=>t.type==='income').forEach(t=>{
    const cat=d.cats.find(c=>String(c.id)===String(t.cat))?.n||'收入';
    const acc=d.accs.find(a=>String(a.id)===String(t.acc))?.n||'未关联账户';
    flows.push({from:cat,to:acc,amt:t.amount});
  });
  monthTxs.filter(t=>t.type==='expense').forEach(t=>{
    const acc=d.accs.find(a=>String(a.id)===String(t.acc))?.n||'未关联账户';
    const cat=d.cats.find(c=>String(c.id)===String(t.cat))?.n||'支出';
    flows.push({from:acc,to:cat,amt:t.amount});
  });
  const map={};
  flows.forEach(f=>{const k=f.from+'→'+f.to;map[k]=map[k]||{...f,amt:0};map[k].amt+=f.amt;});
  const top=Object.values(map).sort((a,b)=>b.amt-a.amt).slice(0,8);
  $('cashFlowPanel').innerHTML=top.length?`<div class="flow-list">${top.map(f=>`<div class="flow-row">
    <div class="flow-node">${esc(f.from)}<div class="flow-amt">${fmt(f.amt)}</div></div><div class="flow-arrow">→</div><div class="flow-node">${esc(f.to)}</div>
  </div>`).join('')}</div>`:'<div class="empty" style="padding:18px">本月还没有可展示的收支流向</div>';
}

function renderYearComparePanel(d,all){
  if(!$('statsYearComparePanel'))return;
  const now=new Date(),ym=localMonthStr(now),lastYearYm=(now.getFullYear()-1)+'-'+pad2(now.getMonth()+1);
  const sum=(m,type)=>all.filter(t=>t.type===type&&String(t.date).indexOf(m)===0).reduce((s,t)=>s+t.amount,0);
  const curExp=sum(ym,'expense'),lyExp=sum(lastYearYm,'expense'),curInc=sum(ym,'income'),lyInc=sum(lastYearYm,'income');
  const catGrowth=d.cats.filter(c=>c.t==='expense').map(c=>{
    const cur=all.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)&&String(t.date).indexOf(ym)===0).reduce((s,t)=>s+t.amount,0);
    const prev=all.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)&&String(t.date).indexOf(prevMonthStr(now))===0).reduce((s,t)=>s+t.amount,0);
    return {c,cur,prev,diff:cur-prev};
  }).sort((a,b)=>b.diff-a.diff).find(x=>x.diff>0);
  $('statsYearComparePanel').innerHTML=`
    <div class="insight-card"><div class="insight-title">今年 vs 去年同月</div><div class="insight-desc">收入 ${fmt(curInc)}（去年 ${fmt(lyInc)}），支出 ${fmt(curExp)}（去年 ${fmt(lyExp)}）。</div></div>
    <div class="insight-card ${curExp>lyExp&&lyExp>0?'warn':'good'}"><div class="insight-title">同比支出</div><div class="insight-desc">${lyExp>0?`比去年同月${curExp>=lyExp?'多':'少'} ${fmt(Math.abs(curExp-lyExp))}`:'去年同月暂无支出数据'}。</div></div>
    <div class="insight-card"><div class="insight-title">上涨最快分类</div><div class="insight-desc">${catGrowth?`${catGrowth.c.i} ${catGrowth.c.n} 比上月多 ${fmt(catGrowth.diff)}`:'暂无明显上涨分类'}。</div></div>`;
}

function renderAnomalyPanel(d,all,monthTxs,monthExp){
  if(!$('statsAnomalyPanel'))return;
  const now=new Date();
  const prevMonths=[1,2,3].map(i=>{const dt=new Date(now);dt.setMonth(dt.getMonth()-i);return localMonthStr(dt)});
  const cards=[];
  d.cats.filter(c=>c.t==='expense').forEach(c=>{
    const cur=monthTxs.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)).reduce((s,t)=>s+t.amount,0);
    const avg=prevMonths.reduce((s,m)=>s+all.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)&&String(t.date).indexOf(m)===0).reduce((a,t)=>a+t.amount,0),0)/3;
    if(avg>0&&cur>avg*1.35)cards.push(`<div class="insight-card warn"><div class="insight-title">${esc(c.n)}偏高</div><div class="insight-desc">本月 ${fmt(cur)}，高于近 3 个月均值 ${fmt(avg)}。</div></div>`);
  });
  const big=monthTxs.filter(t=>t.type==='expense').sort((a,b)=>b.amount-a.amount)[0];
  if(big&&monthExp>0&&big.amount>monthExp*.35)cards.push(`<div class="insight-card warn"><div class="insight-title">单笔支出占比较高</div><div class="insight-desc">${big.date} 的 ${fmt(big.amount)} 占本月支出 ${Math.round(big.amount/monthExp*100)}%。</div></div>`);
  const days=avgDaysForMonth(now),monthDays=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
  const forecast=(monthExp/Math.max(1,now.getDate()))*monthDays;
  cards.push(`<div class="insight-card ${forecast>(d.budget||0)&&d.budget>0?'warn':'good'}"><div class="insight-title">月底预算预测</div><div class="insight-desc">按当前节奏，预计月底支出 ${fmt(forecast)}${d.budget?`，预算 ${fmt(d.budget)}`:''}。</div></div>`);
  $('statsAnomalyPanel').innerHTML=cards.join('');
}

function renderAdvancedStatsPanel(d,all,monthTxs){
  if(!$('advancedStatsPanel'))return;
  const fixed=detectRecurringExpenses(d,all).slice(0,5);
  const projects=(d.tags||[]).filter(t=>t.k==='project').map(tag=>{
    const sum=all.filter(x=>x.type==='expense'&&(x.tags||[]).includes(tag.n)).reduce((s,x)=>s+x.amount,0);
    return {tag:tag.n,sum};
  }).filter(x=>x.sum>0).sort((a,b)=>b.sum-a.sum).slice(0,5);
  const now=new Date(),monthDays=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
  const inc=monthTxs.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0),exp=monthTxs.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const forecastInc=inc/Math.max(1,now.getDate())*monthDays,forecastExp=exp/Math.max(1,now.getDate())*monthDays;
  $('advancedStatsPanel').innerHTML=`
    <div class="insight-card"><div class="insight-title">固定支出识别</div><div class="insight-desc">${fixed.length?fixed.map(x=>`${esc(x.name)} ${fmt(x.avg)}`).join('，'):'暂未识别到稳定的每月固定支出'}。</div></div>
    <div class="insight-card"><div class="insight-title">项目支出</div><div class="insight-desc">${projects.length?projects.map(x=>`${esc(x.tag)} ${fmt(x.sum)}`).join('，'):'给账单添加“项目”标签后可在这里复盘'}。</div></div>
    <div class="insight-card ${forecastInc-forecastExp>=0?'good':'warn'}"><div class="insight-title">现金流预测</div><div class="insight-desc">预计月底收入 ${fmt(forecastInc)}，支出 ${fmt(forecastExp)}，净现金流 ${fmt(forecastInc-forecastExp)}。</div></div>`;
}

function currentTotalAssets(d=load()){
  return d.accs.filter(a=>a.ac&&a.t!=='debt').reduce((s,a)=>s+Math.max(0,Number(a.b||0)),0);
}

function assetSortKey(s){
  const date=String(s.date||'0000-00-00').slice(0,10);
  const time=String(s.time||'00:00').slice(0,5);
  return `${date} ${time}:00`;
}
function assetDateObj(s){
  const key=assetSortKey(s);
  const y=+key.slice(0,4),m=+key.slice(5,7)-1,d=+key.slice(8,10),hh=+key.slice(11,13),mm=+key.slice(14,16),ss=+key.slice(17,19);
  return new Date(y,m,d,hh,mm,ss);
}
function assetDaysBetween(a,b){
  return Math.max(1,Math.ceil((assetDateObj(b)-assetDateObj(a))/(1000*60*60*24)));
}
function assetSnapshots(d=load()){
  return (d.settings?.assetSnapshots||[]).map(s=>({
    id:s.id||genId(),
    date:s.date,
    time:s.time||'00:00',
    timestamp:assetSortKey(s),
    amount:Number(s.amount||0),
    note:s.note||''
  })).filter(s=>s.date&&!isNaN(s.amount)).sort((a,b)=>assetSortKey(a).localeCompare(assetSortKey(b)));
}

function renderAssetChangePage(d){
  if(!$('assetChangeSummary'))return;
  d.settings=d.settings||{};
  if(!Array.isArray(d.settings.assetSnapshots))d.settings.assetSnapshots=[];
  const current=currentTotalAssets(d);
  if($('assetSnapshotDate')&&!$('assetSnapshotDate').value)$('assetSnapshotDate').value=localDateStr();
  if($('assetSnapshotTime')&&!$('assetSnapshotTime').value)$('assetSnapshotTime').value=new Date().toTimeString().slice(0,5);
  const snaps=assetSnapshots(d);
  const first=snaps[0];
  const latest=snaps[snaps.length-1];
  const displayCurrent=latest?latest.amount:current;
  if($('assetSnapshotAmount')&&!$('assetSnapshotAmount').value)$('assetSnapshotAmount').value=displayCurrent.toFixed(2);
  // 较上月对比（找到最近一个月前的记录）
  var monthCompareHtml='';
  if(snaps.length>=2){
    var now=assetDateObj(latest);
    var monthAgo=new Date(now);monthAgo.setMonth(monthAgo.getMonth()-1);
    var prevMonth=null;
    for(var mi=snaps.length-2;mi>=0;mi--){
      var d2=assetDateObj(snaps[mi]);
      if(d2<=monthAgo){prevMonth=snaps[mi];break;}
    }
    if(prevMonth){
      var mc=latest.amount-prevMonth.amount;
      var mcPct=prevMonth.amount?(mc/Math.abs(prevMonth.amount)*100).toFixed(1):0;
      var arrow=mc>=0?'&#9650;':'&#9660;';
      var mcColor=mc>=0?'var(--expense)':'var(--income)';
      monthCompareHtml='<span class="asset-gain-tag">较上月</span><span style="font-size:13px;font-weight:800;color:'+mcColor+'">'+arrow+' '+(mc>=0?'+':'')+fmt(mc).replace(/^[+-]/,'')+' ('+mcPct+'%)</span>';
    }else{monthCompareHtml='<span class="asset-gain-tag">较上月</span><span style="font-size:12px;color:var(--text-tertiary);font-weight:700">暂无数据</span>';}
  }
  const change=first&&latest?latest.amount-first.amount:0;
  const rate=first&&first.amount?Math.round(change/first.amount*100):0;
  const recordDays=first&&latest?assetDaysBetween(first,latest)+1:0;
  $('assetChangeSummary').innerHTML=`
    <div class="asset-ledger-hero">
      <div class="asset-current-card">
        <div class="asset-current-label">当前总余额</div>
        <div class="asset-current-value">${fmt(displayCurrent).replace(/^[+-]/,'')}</div>
        <div class="asset-gain-row">
          <span class="asset-gain-tag">累计增加</span>
          <span class="asset-gain-value ${change>=0?'expense':'income'}">${snaps.length>=2?(change>=0?'+':'')+fmt(change).replace(/[+-]/,''):'暂无对比'}</span>
        </div>
        <div class="asset-gain-row" style="margin-top:6px">${monthCompareHtml}</div>
        <div class="asset-gain-meta">
          <span>记账天数：${recordDays}天</span>
          <span>记账次数：${snaps.length}次</span>
        </div>
      </div>
    </div>
    <div class="asset-mobile-add-btn" style="display:none;text-align:center;padding:8px 12px 4px"><button class="btn-primary" onclick="showAssetSnapshotModal()" style="width:100%;padding:10px;font-size:14px;border-radius:12px">记一笔总资产</button></div>`;
  // 统计指标卡片
  if(snaps.length>=2){
    var days=assetDaysBetween(first,latest);
    var months=days/30;
    var totalChange=latest.amount-first.amount;
    var monthlyAvg=months>0?totalChange/months:0;
    var maxAmt=Math.max.apply(null,snaps.map(function(s){return s.amount}));
    var minAmt=Math.min.apply(null,snaps.map(function(s){return s.amount}));
    var annualRate=first.amount>0&&days>0?((Math.pow(latest.amount/first.amount,365/days)-1)*100):0;
    $('assetChangeSummary').innerHTML+='<div class="asset-summary-grid"><div class="asset-metric"><div class="asset-metric-label">月均增长</div><div class="asset-metric-value" style="color:'+(monthlyAvg>=0?'var(--income)':'var(--expense)')+'">'+(monthlyAvg>=0?'+':'')+fmt(monthlyAvg)+'</div></div><div class="asset-metric"><div class="asset-metric-label">最高资产</div><div class="asset-metric-value">'+fmt(maxAmt)+'</div></div><div class="asset-metric"><div class="asset-metric-label">最低资产</div><div class="asset-metric-value">'+fmt(minAmt)+'</div></div><div class="asset-metric"><div class="asset-metric-label">年化收益率</div><div class="asset-metric-value" style="color:'+(annualRate>=0?'var(--income)':'var(--expense)')+'">'+annualRate.toFixed(1)+'%</div></div></div>';
  }
  renderAssetChangeChart(snaps,displayCurrent);
  renderAssetChangeRecords(snaps,rate);
  // 移动端：显示记一笔按钮 + 记录区域独立滚动（绕过CSS缓存）
  if(window.innerWidth<700){
    var toggleEl=document.querySelector('#pageStats .asset-view-toggle');
    if(toggleEl){toggleEl.style.marginTop='-6px';toggleEl.style.marginBottom='2px';toggleEl.style.paddingBottom='2px';}
    // 显示移动端记一笔按钮
    var mobileAddBtn=document.querySelector('.asset-mobile-add-btn');
    if(mobileAddBtn)mobileAddBtn.style.display='block';
    var statsPage=$('pageStats');
    if(statsPage){statsPage.style.setProperty('display','flex','important');statsPage.style.setProperty('flex-direction','column','important');statsPage.style.setProperty('height','calc(100dvh - 52px)','important');statsPage.style.setProperty('overflow','hidden','important');}
    var changeCard=document.querySelector('#pageStats .asset-change-card');
    if(changeCard){changeCard.style.setProperty('display','flex','important');changeCard.style.setProperty('flex-direction','column','important');changeCard.style.setProperty('flex','1','important');changeCard.style.setProperty('overflow','hidden','important');}
    var ledgerLayout=document.querySelector('#pageStats .asset-ledger-layout');
    if(ledgerLayout){ledgerLayout.style.setProperty('display','flex','important');ledgerLayout.style.setProperty('flex-direction','column','important');ledgerLayout.style.setProperty('flex','1','important');ledgerLayout.style.setProperty('overflow','hidden','important');}
    var ledgerLeft=document.querySelector('#pageStats .asset-ledger-left');
    if(ledgerLeft){ledgerLeft.style.setProperty('display','flex','important');ledgerLeft.style.setProperty('flex-direction','column','important');ledgerLeft.style.setProperty('flex','1','important');ledgerLeft.style.setProperty('overflow','hidden','important');}
    var recordsEl=$('assetChangeRecords');
    if(recordsEl){recordsEl.style.setProperty('flex','1','important');recordsEl.style.setProperty('overflow-y','auto','important');recordsEl.style.setProperty('-webkit-overflow-scrolling','touch','important');}
  }
}

function renderAssetChangeChart(snaps,current){
  if(!$('assetChangeChart')||typeof echarts==='undefined')return;
  // 渲染图表概览面板（填充空白区域）
  if($('assetChartOverview')&&snaps.length>=2){
    var ovSnaps=assetChartRange&&assetChartRange!=='3y'?snaps.filter(function(s){return s.date>=getRangeDate(getRangeMonths(assetChartRange))}):snaps;
    var ovFirst=ovSnaps[0],ovLast=ovSnaps[ovSnaps.length-1];
    var ovChange=ovLast.amount-ovFirst.amount;
    var ovPct=ovFirst.amount?((ovChange/ovFirst.amount)*100).toFixed(1):0;
    var ovMax=Math.max.apply(null,ovSnaps.map(function(s){return s.amount}));
    var ovMin=Math.min.apply(null,ovSnaps.map(function(s){return s.amount}));
    var ovAvg=Math.round(ovSnaps.reduce(function(s,x){return s+x.amount},0)/ovSnaps.length);
    $('assetChartOverview').innerHTML='<div class="asset-chart-overview-title">趋势概览</div><div class="asset-chart-range-bar"><button class="asset-chart-range-btn'+(assetChartRange==='3m'?' active':'')+'" data-range="3m">近3月</button><button class="asset-chart-range-btn'+(assetChartRange==='6m'?' active':'')+'" data-range="6m">近6月</button><button class="asset-chart-range-btn'+(assetChartRange==='1y'?' active':'')+'" data-range="1y">近1年</button><button class="asset-chart-range-btn'+(assetChartRange==='3y'||!assetChartRange?' active':'')+'" data-range="3y">全部</button></div><div class="asset-chart-stats"><div class="asset-chart-stat"><div class="asset-chart-stat-label">区间涨幅</div><div class="asset-chart-stat-value" style="color:'+(ovChange>=0?'var(--income)':'var(--expense)')+'">'+(ovPct>=0?'+':'')+ovPct+'%</div></div><div class="asset-chart-stat"><div class="asset-chart-stat-label">区间最高</div><div class="asset-chart-stat-value">'+fmt(ovMax)+'</div></div><div class="asset-chart-stat"><div class="asset-chart-stat-label">区间最低</div><div class="asset-chart-stat-value">'+fmt(ovMin)+'</div></div><div class="asset-chart-stat"><div class="asset-chart-stat-label">区间均值</div><div class="asset-chart-stat-value">'+fmt(ovAvg)+'</div></div><div class="asset-chart-stat"><div class="asset-chart-stat-label">区间增幅</div><div class="asset-chart-stat-value" style="color:'+(ovChange>=0?'var(--income)':'var(--expense)')+'">'+(ovChange>=0?'+':'')+fmt(ovChange)+'</div></div><div class="asset-chart-stat"><div class="asset-chart-stat-label">记录数</div><div class="asset-chart-stat-value">'+ovSnaps.length+'条</div></div></div>';
    // 绑定时间范围按钮
    $('assetChartOverview').querySelectorAll('.asset-chart-range-btn').forEach(function(btn){
      btn.onclick=function(){
        assetChartRange=this.dataset.range;
        renderAssetChangePage(load());
      };
    });
  }else if($('assetChartOverview')){
    $('assetChartOverview').innerHTML='';
  }
  var chartSnaps=assetChartRange&&assetChartRange!=='3y'?snaps.filter(function(s){return s.date>=getRangeDate(getRangeMonths(assetChartRange))}):snaps;
  const data=chartSnaps.length?chartSnaps:[{date:localDateStr(),time:new Date().toTimeString().slice(0,5),timestamp:localDateStr()+' 00:00:00',amount:current,note:'当前总资产'}];
  const notePoints=data.map((s,i)=>s.note?{
    name:String(s.note).slice(0,12),
    coord:[formatAssetDate(s.date),s.amount],
    value:String(s.note).slice(0,12),
    itemStyle:{color:'#6366f1'}
  }:null).filter(Boolean);
  if(!assetC)assetC=echarts.init($('assetChangeChart'),null,{renderer:'svg'});
  assetC.setOption({
    animation:true,
    tooltip:{trigger:'axis',formatter:ps=>{
      const p=ps[0];
      const s=data[p.dataIndex];
      return `${s.date} ${s.time||''}<br/>总资产：${fmt(s.amount)}${s.note?`<br/>备注：${esc(s.note)}`:''}`;
    }},
    grid:{left:58,right:24,top:48,bottom:42,containLabel:true},
    xAxis:{type:'category',data:data.map(s=>formatAssetDate(s.date)),axisLabel:{fontSize:10,rotate:data.length>8?30:0}},
    yAxis:{type:'value',axisLabel:{formatter:v=>short(v),fontSize:10},splitLine:{lineStyle:{type:'dashed'}}},
    series:[{name:'总资产',type:'line',smooth:true,symbolSize:8,data:data.map((s,i)=>{
      // 大额变动标记（>5%）用红色大圆点+文字
      if(i>0){
        var prev=data[i-1].amount;
        var pct=prev?((s.amount-prev)/Math.abs(prev)*100):0;
        if(Math.abs(pct)>5){
          return{value:s.amount,symbol:'circle',symbolSize:14,itemStyle:{color:pct>0?'#ef4444':'#f59e0b'}};
        }
      }
      return s.amount;
    }),lineStyle:{width:3,color:'#10b981'},itemStyle:{color:'#10b981'},areaStyle:{opacity:.14,color:'#10b981'},markPoint:notePoints.length?{symbol:'pin',symbolSize:44,label:{fontSize:9,formatter:p=>p.value},data:notePoints}:undefined,label:{show:data.length<=8,position:'top',fontSize:10,formatter:(p)=>{
      var s=data[p.dataIndex];
      if(p.dataIndex>0){
        var prev=data[p.dataIndex-1].amount;
        var pct=prev?((s.amount-prev)/Math.abs(prev)*100):0;
        if(Math.abs(pct)>5&&s.note)return short(p.value)+'\\n'+esc(s.note);
      }
      return short(p.value);
    }}}]
  },true);
  requestAnimationFrame(()=>assetC.resize());
  setTimeout(()=>assetC.resize(),120);
}

function renderAssetChangeRecords(snaps,rate){
  if(!$('assetChangeRecords'))return;
  var isMobile=window.innerWidth<700;
  var viewMode=isMobile?'list':assetViewMode;
  var lb=$('assetListModeBtn'),tb=$('assetTableModeBtn');
  if(lb)lb.classList.toggle('active',viewMode==='list');
  if(tb)tb.classList.toggle('active',viewMode==='table');
  const indexedSnaps=snaps.map(function(s,i){
    var prev=snaps[i-1];
    var diff=prev?s.amount-prev.amount:0;
    var interval=prev?assetIntervalText(prev.timestamp,s.timestamp):'首次记录';
    return Object.assign({},s,{diff:diff,interval:interval,recordIndex:i+1});
  });
  // 填充年份筛选
  var yearSel=$('assetYearFilter'),monthSel=$('assetMonthFilter');
  if(yearSel){
    var years=[...new Set(indexedSnaps.map(function(s){return String(s.date||'').slice(0,4)}).filter(function(y){return/^\d{4}$/.test(y)}))].sort();
    var curVal=yearSel.value;
    yearSel.innerHTML='<option value="">全部年份</option>'+years.map(function(y){return '<option value="'+y+'"'+(y===curVal?' selected':'')+'>'+y+'年</option>'}).join('');
  }
  // 筛选
  var filterYear=yearSel?yearSel.value:'';
  var filterMonth=monthSel?monthSel.value:'';
  var viewSnaps=indexedSnaps.slice();
  if(filterYear||filterMonth){
    viewSnaps=viewSnaps.filter(function(s){
      if(filterYear&&String(s.date||'').slice(0,4)!==filterYear)return false;
      if(filterMonth&&String(s.date||'').slice(5,7)!==filterMonth)return false;
      return true;
    });
  }
  // 更新月份选项
  if(monthSel&&filterYear){
    var months=[...new Set(indexedSnaps.filter(function(s){return String(s.date||'').slice(0,4)===filterYear}).map(function(s){return String(s.date||'').slice(5,7)}))].sort();
    var curM=monthSel.value;
    monthSel.innerHTML='<option value="">全部月份</option>'+months.map(function(m){return '<option value="'+m+'"'+(m===curM?' selected':'')+'>'+parseInt(m)+'月</option>'}).join('');
  }
  if(!viewSnaps.length){
    $('assetChangeRecords').innerHTML='<div class="empty" style="padding:18px">'+(filterYear||filterMonth?'当前筛选条件下没有记录':'还没有总资产快照。填写金额后点击\u201c记录总资产\u201d，这里会只展示总资产变化记录。')+'</div>';
    return;
  }
  var rows=viewSnaps.slice().reverse();
  if(viewMode==='table'){
    var ths='<th style="text-align:left;padding:10px 12px;font-weight:700;border-bottom:2px solid var(--border)">序号</th><th style="text-align:left;padding:10px 12px;font-weight:700;border-bottom:2px solid var(--border)">日期</th><th style="text-align:right;padding:10px 12px;font-weight:700;border-bottom:2px solid var(--border)">总资产</th><th style="text-align:right;padding:10px 12px;font-weight:700;border-bottom:2px solid var(--border)">较上次</th><th style="text-align:center;padding:10px 12px;font-weight:700;border-bottom:2px solid var(--border)">间隔</th><th style="text-align:left;padding:10px 12px;font-weight:700;border-bottom:2px solid var(--border)">备注</th>';
    var tbody=rows.map(function(r){return '<tr data-edit-asset-snapshot-row="'+r.id+'" title="双击编辑"><td style="padding:10px 12px;border-bottom:1px solid var(--border-light);color:var(--text-tertiary)">'+r.recordIndex+'</td><td style="padding:10px 12px;border-bottom:1px solid var(--border-light);white-space:nowrap"><b>'+formatAssetDate(r.date)+'</b> <span style="color:var(--text-tertiary)">'+esc(r.time||'')+'</span></td><td style="padding:10px 12px;border-bottom:1px solid var(--border-light);text-align:right;font-weight:800;white-space:nowrap">'+fmt(r.amount).replace(/^[+-]/,'')+'</td><td style="padding:10px 12px;border-bottom:1px solid var(--border-light);text-align:right;color:'+(r.diff>=0?'var(--expense)':'var(--income)')+';font-weight:700;white-space:nowrap">'+(r.diff?(r.diff>=0?'+':'')+fmt(r.diff).replace(/[+-]/,''):'首次记录')+'</td><td style="padding:10px 12px;border-bottom:1px solid var(--border-light);text-align:center;color:var(--text-tertiary);white-space:nowrap">'+esc(r.interval)+'</td><td style="padding:10px 12px;border-bottom:1px solid var(--border-light);color:var(--text-secondary);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+esc(r.note||'')+'">'+esc(r.note||'-')+'</td></tr>';}).join('');
    $('assetChangeRecords').innerHTML='<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr style="background:var(--bg)">'+ths+'</tr></thead><tbody>'+tbody+'</tbody></table></div><div class="rank-hint" style="margin-top:8px">累计变化率：'+(indexedSnaps.length>=2?rate+'%':'记录至少两次后显示')+'</div>';
  }else{
    $('assetChangeRecords').innerHTML='<div class="asset-record-list">'+rows.map(function(r){return '<div class="asset-record-card" data-edit-asset-snapshot-row="'+r.id+'" title="双击编辑"><div class="asset-record-top"><div class="asset-record-date">记录日期：<b>'+formatAssetDate(r.date)+'</b> <span>'+esc(r.time||'')+'</span></div><div class="asset-record-index">第'+r.recordIndex+'次记录</div></div><div class="asset-record-amount">'+fmt(r.amount).replace(/^[+-]/,'')+'</div><div class="asset-record-change '+(r.diff>=0?'expense':'income')+'">比上一次：'+(r.diff?(r.diff>=0?'+':'')+fmt(r.diff).replace(/[+-]/,''):'首次记录')+'</div><div class="asset-record-interval">距离上次：'+esc(r.interval)+'</div>'+(r.note?'<div class="asset-record-note" title="'+esc(r.note)+'">'+esc(r.note)+'</div>':'')+'</div>';}).join('')+'</div><div class="rank-hint" style="margin-top:8px">累计变化率：'+(indexedSnaps.length>=2?rate+'%':'记录至少两次后显示')+'</div>';
  }
  $('assetChangeRecords').querySelectorAll('[data-edit-asset-snapshot-row]').forEach(function(row){
    row.ondblclick=function(e){
      playInteractionSound('dbl');
      editAssetSnapshot(row.dataset.editAssetSnapshotRow);
    };
  });
  // 移动端：记录区域撑满宽度（与记一笔按钮对齐）
  if(isMobile){
    var btnEl=document.querySelector('.asset-mobile-add-btn button');
    var recordList=$('assetChangeRecords').querySelector('.asset-record-list');
    if(btnEl&&recordList){
      var br=btnEl.getBoundingClientRect();
      var pr=recordList.parentElement.getBoundingClientRect();
      recordList.style.cssText='display:flex;flex-direction:column;gap:0;width:'+br.width+'px;margin-left:'+(br.left-pr.left)+'px';
    }
    var tableWrap=$('assetChangeRecords').querySelector('div[style*="overflow-x:auto"]');
    if(btnEl&&tableWrap){
      var br=btnEl.getBoundingClientRect();
      var pr=tableWrap.parentElement.getBoundingClientRect();
      tableWrap.style.cssText='width:'+br.width+'px;margin-left:'+(br.left-pr.left)+'px;overflow-x:auto;-webkit-overflow-scrolling:touch';
    }
  }

}

/* ========== 总资产快照 导入导出 ========== */
$('btnAssetExport').onclick=()=>{
  const snaps=assetSnapshots();
  if(!snaps.length){toast('没有可导出的总资产快照');return}
  let csv='\uFEFF日期,时间,金额,较上次,环比率(%),间隔天数,备注\n';
  snaps.forEach((s,i)=>{
    var diff='',pct='',interval='';
    if(i>0){
      var prev=snaps[i-1];
      diff=s.amount-prev.amount;
      pct=prev.amount?((diff/Math.abs(prev.amount))*100).toFixed(1):'0';
      var days=Math.ceil((new Date(s.timestamp)-new Date(prev.timestamp))/(1000*60*60*24));
      interval=days;
    }
    csv+=`${s.date},${s.time},${s.amount},${diff>0?'+':''}${diff},${pct},${interval},"${String(s.note||'').replace(/"/g,'""')}"\n`;
  });
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`总资产快照_${localDateStr()}.csv`;a.click();URL.revokeObjectURL(a.href);
  logAction(load(),'导出总资产快照',`共${snaps.length}条记录`);
  toast('已导出 '+snaps.length+' 条总资产快照（含环比数据）');
};

$('btnAssetImport').onclick=function(e){
  const rect=this.getBoundingClientRect();
  let menu=document.getElementById('assetImportMenu');
  if(menu){menu.remove();return}
  menu=document.createElement('div');
  menu.id='assetImportMenu';
  menu.className='asset-import-menu';
  menu.innerHTML='<div class="asset-import-item" data-action="file">📁 从文件导入（CSV/JSON）</div><div class="asset-import-item" data-action="paste">📋 粘贴文字导入</div>';
  menu.style.cssText=`position:fixed;top:${rect.bottom+6}px;left:${rect.left}px;z-index:99999;min-width:200px;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.15);padding:6px;overflow:hidden`;
  document.body.appendChild(menu);
  menu.querySelectorAll('.asset-import-item').forEach(item=>{
    item.style.cssText='padding:10px 14px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;color:var(--text);transition:background .12s';
    item.onmouseenter=()=>item.style.background='var(--primary-soft)';
    item.onmouseleave=()=>item.style.background='transparent';
    item.onclick=()=>{menu.remove();const a=item.dataset.action;if(a==='file')$('assetImportFile').click();else if(a==='paste'){$('assetPasteModal').classList.add('show');$('assetPasteText').value='';$('assetPasteText').focus()}};
  });
  setTimeout(()=>document.addEventListener('click',function cls(ev){if(!menu.contains(ev.target)){menu.remove();document.removeEventListener('click',cls)}},{once:true}),0);
};
$('assetImportFile').onchange=function(){
  const file=this.files[0];if(!file)return;this.value='';
  const reader=new FileReader();
  reader.onload=function(){
    try{
      const text=reader.result;
      const isJSON=file.name.endsWith('.json');
      const snaps=isJSON?parseAssetImportJSON(text):parseAssetImportCSV(text);
      if(!snaps.length){toast('未解析到有效记录，请检查文件格式');return}
      const d=load();d.settings=d.settings||{};
      const existing=d.settings.assetSnapshots||[];
      d.settings.assetSnapshots=mergeSnapshots(existing,snaps);
      save(d);data=d;renderAssetChangePage(d);
      logAction(d,'导入总资产快照',`导入${snaps.length}条记录`);
      syncAssetSave(d.settings.assetSnapshots||[]);
      toast('已导入 '+snaps.length+' 条总资产快照');
    }catch(e){toast('导入失败：'+e.message);console.error(e)}
  };
  reader.readAsText(file,'utf-8');
};

function parseAssetImportCSV(text){
  const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(l=>l.trim());
  if(lines.length<2)return[];
  const header=lines[0].toLowerCase();
  const rows=[];
  for(let i=1;i<lines.length;i++){
    const cols=parseCSVLine(lines[i]);
    if(cols.length<2)continue;
    let date='',time='00:00',amount=0,note='';
    if(cols.length>=3&&cols[0]&&cols[2]){
      date=cols[0].trim();
      if(cols[1])time=cols[1].trim();
      amount=parseFloat(cols[2]);
      note=cols[3]?cols[3].trim():'';
    }else if(cols.length>=2&&cols[0]&&cols[1]){
      date=cols[0].trim();
      amount=parseFloat(cols[1]);
    }
    if(!date||isNaN(amount))continue;
    rows.push({id:genId(),date,time,timestamp:`${date} ${time}:00`,amount:+amount.toFixed(2),note});
  }
  return rows;
}

function parseAssetImportJSON(text){
  const arr=JSON.parse(text);
  if(!Array.isArray(arr))return[];
  return arr.map(item=>{
    let date='',time='00:00',amount=0,note='';
    if(item.timestamp){
      const ts=item.timestamp;
      const m=ts.match(/(\d{4}[-/]\d{1,2}[-/]\d{1,2})\D*(\d{1,2}:\d{2}(:\d{2})?)?/);
      if(m){date=m[1].replace(/\//g,'-');time=m[2]||'00:00'}
    }else if(item.date){date=item.date.replace(/\//g,'-');time=item.time||'00:00'}
    amount=Number(item.amount||0);note=item.remark||item.note||'';
    return {id:genId(),date,time,timestamp:`${date} ${time}:00`,amount:+amount.toFixed(2),note};
  }).filter(r=>r.date&&!isNaN(r.amount));
}

function mergeSnapshots(existing, incoming){
  const map=new Map();
  existing.forEach(s=>map.set(s.date+'_'+s.time, s));
  incoming.forEach(s=>{
    const key=s.date+'_'+s.time;
    if(map.has(key)){
      map.get(key).amount=s.amount;
      if(s.note)map.get(key).note=s.note;
    }else{
      map.set(key, s);
    }
  });
  return Array.from(map.values());
}

function parseCSVLine(line){
  const result=[];let cur='';let inQ=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(inQ){if(c==='"'&&line[i+1]==='"'){cur+='"';i++}else if(c==='"'){inQ=false}else{cur+=c}}
    else{if(c==='"'){inQ=true}else if(c===','){result.push(cur);cur=''}else{cur+=c}}
  }
  result.push(cur);return result;
}

/* 粘贴导入弹窗逻辑 */
$('assetPasteClose').onclick=()=>$('assetPasteModal').classList.remove('show');
$('assetPasteClear').onclick=()=>{$('assetPasteText').value='';$('assetPasteText').focus()};
$('assetPasteModal').onclick=function(e){if(e.target===this)this.classList.remove('show')};
$('assetPasteImport').onclick=function(){
  const text=$('assetPasteText').value.trim();
  if(!text){toast('请先粘贴数据');return}
  try{
    const textClean=text.replace(/^\uFEFF/,'').trim();
    let snaps=[];
    if(textClean.startsWith('[')){
      snaps=parseAssetImportJSON(textClean);
    }else if(textClean.includes(',')&&textClean.includes('\n')){
      snaps=parseAssetImportCSV(textClean);
    }else{
      toast('无法识别数据格式，请粘贴 JSON 数组或 CSV 文本');return;
    }
    if(!snaps.length){toast('未解析到有效记录，请检查数据格式');return}
    const d=load();d.settings=d.settings||{};
    const existing=d.settings.assetSnapshots||[];
    d.settings.assetSnapshots=mergeSnapshots(existing,snaps);
    save(d);data=d;renderAssetChangePage(d);
    logAction(d,'粘贴导入总资产快照',`导入${snaps.length}条记录`);
    $('assetPasteModal').classList.remove('show');
    syncAssetSave(d.settings.assetSnapshots||[]);
    toast('已导入 '+snaps.length+' 条总资产快照');
  }catch(e){toast('导入失败：'+e.message);console.error(e)}
};

function addAssetSnapshot(){
  const date=$('assetSnapshotDate').value||localDateStr();
  const time=$('assetSnapshotTime')?$('assetSnapshotTime').value:new Date().toTimeString().slice(0,5);
  const amount=parseFloat($('assetSnapshotAmount').value);
  const note=$('assetSnapshotNote').value.trim();
  if(isNaN(amount)){toast('请输入总资产金额');return;}
  const d=load();
  d.settings=d.settings||{};
  d.settings.assetSnapshots=d.settings.assetSnapshots||[];
  const editingId=$('assetSnapshotAddBtn').dataset.editAssetId;
  const timestamp=`${date} ${time}:00`;
  const existing=editingId?d.settings.assetSnapshots.find(s=>String(s.id)===String(editingId)):null;
  if(existing){existing.date=date;existing.time=time;existing.timestamp=timestamp;existing.amount=+amount.toFixed(2);existing.note=note;}
  else d.settings.assetSnapshots.push({id:genId(),date,time,timestamp,amount:+amount.toFixed(2),note});
  save(d);data=d;
  syncAssetSave(d.settings.assetSnapshots||[]);
  $('assetSnapshotNote').value='';
  delete $('assetSnapshotAddBtn').dataset.editAssetId;
  $('assetSnapshotAddBtn').textContent='记一笔总资产';
  renderAssetChangePage(d);
  // 波动解释：检测与上一次快照的差额，波动较大时自动提示
  var sortedSnaps=(d.settings.assetSnapshots||[]).slice().sort(function(a,b){return assetSortKey(a).localeCompare(assetSortKey(b));});
  var prevSnap=null;
  for(var si=0;si<sortedSnaps.length;si++){
    if(String(sortedSnaps[si].id)===String(existing?existing.id:d.settings.assetSnapshots[d.settings.assetSnapshots.length-1].id)){break;}
    prevSnap=sortedSnaps[si];
  }
  if(!prevSnap&&sortedSnaps.length>=2){prevSnap=sortedSnaps[sortedSnaps.length-2];}
  if(prevSnap){
    var diff=amount-prevSnap.amount;
    var prevAbs=Math.abs(prevSnap.amount);
    var pct=prevAbs>0?(Math.abs(diff)/prevAbs*100):0;
    if(pct>5){
      var hint='⚠️ 较上次变化 ¥'+fmt(diff).replace(/^[+-]/,'')+' ('+pct.toFixed(1)+'%)，建议填写原因';
      $('assetSnapshotNote').value=hint;
      toast(hint);
    }
  }
  renderStats();
  toast(existing?'总资产记录已更新':'总资产已记录');
}

function addAssetSnapshotModal(){
  const date=$('modalAssetSnapshotDate').value||localDateStr();
  const time=new Date().toTimeString().slice(0,5);
  const amount=parseFloat($('modalAssetSnapshotAmount').value);
  const note=$('modalAssetSnapshotNote').value.trim();
  if(isNaN(amount)){toast('请输入总资产金额');return;}
  const d=load();
  d.settings=d.settings||{};
  d.settings.assetSnapshots=d.settings.assetSnapshots||[];
  const editingId=$('modalAssetSnapshotAddBtn').dataset.editAssetId;
  const timestamp=`${date} ${time}:00`;
  const existing=editingId?d.settings.assetSnapshots.find(s=>String(s.id)===String(editingId)):null;
  if(existing){existing.date=date;existing.time=time;existing.timestamp=timestamp;existing.amount=+amount.toFixed(2);existing.note=note;}
  else d.settings.assetSnapshots.push({id:genId(),date,time,timestamp,amount:+amount.toFixed(2),note});
  save(d);data=d;
  syncAssetSave(d.settings.assetSnapshots||[]);
  $('modalAssetSnapshotNote').value='';
  delete $('modalAssetSnapshotAddBtn').dataset.editAssetId;
  $('modalAssetSnapshotAddBtn').textContent='保存';
  closeAssetSnapshotModal();
  // 波动解释：检测与上一次快照的差额，波动较大时自动提示
  var sortedSnaps=(d.settings.assetSnapshots||[]).slice().sort(function(a,b){return assetSortKey(a).localeCompare(assetSortKey(b));});
  var prevSnap=null;
  for(var si=0;si<sortedSnaps.length;si++){
    if(String(sortedSnaps[si].id)===String(existing?existing.id:d.settings.assetSnapshots[d.settings.assetSnapshots.length-1].id)){break;}
    prevSnap=sortedSnaps[si];
  }
  if(!prevSnap&&sortedSnaps.length>=2){prevSnap=sortedSnaps[sortedSnaps.length-2];}
  if(prevSnap){
    var diff=amount-prevSnap.amount;
    var prevAbs=Math.abs(prevSnap.amount);
    var pct=prevAbs>0?(Math.abs(diff)/prevAbs*100):0;
    if(pct>5){
      var hint='⚠️ 较上次变化 ¥'+fmt(diff).replace(/^[+-]/,'')+' ('+pct.toFixed(1)+'%)，建议填写原因';
      toast(hint);
    }
  }
  renderAssetChangePage(d);
  renderStats();
  toast(existing?'总资产记录已更新':'总资产已记录');
}

function showAssetSnapshotModal(){
  $('assetSnapshotModal').classList.add('show');
  if($('modalAssetSnapshotDate')&&!$('modalAssetSnapshotDate').value)$('modalAssetSnapshotDate').value=localDateStr();
  const d=load();
  const current=currentTotalAssets(d);
  const snaps=assetSnapshots(d);
  const latest=snaps[snaps.length-1];
  const displayCurrent=latest?latest.amount:current;
  if($('modalAssetSnapshotAmount')&&!$('modalAssetSnapshotAmount').value)$('modalAssetSnapshotAmount').value=displayCurrent.toFixed(2);
  setTimeout(()=>{$('modalAssetSnapshotAmount')?.focus();},120);
}

function closeAssetSnapshotModal(){
  $('assetSnapshotModal').classList.remove('show');
  $('modalAssetSnapshotNote').value='';
  delete $('modalAssetSnapshotAddBtn').dataset.editAssetId;
  $('modalAssetSnapshotAddBtn').textContent='保存';
}

function editAssetSnapshot(id){
  const d=load();
  const s=(d.settings?.assetSnapshots||[]).find(x=>String(x.id)===String(id));
  if(!s)return;
  $('assetEditId').value=id;
  $('assetEditDate').value=s.date||localDateStr();
  $('assetEditTime').value=s.time||'00:00';
  $('assetEditAmount').value=Number(s.amount||0).toFixed(2);
  $('assetEditNote').value=s.note||'';
  $('assetEditModal').classList.add('show');
  setTimeout(()=>{$('assetEditAmount')?.focus();$('assetEditAmount')?.select();},120);
}

function closeAssetEditModal(){
  $('assetEditModal').classList.remove('show');
  $('assetEditId').value='';
}

function saveAssetSnapshotEdit(){
  const id=$('assetEditId').value;
  const amount=parseFloat($('assetEditAmount').value);
  if(!id){toast('没有正在编辑的记录');return}
  if(isNaN(amount)){toast('请输入总资产金额');return}
  const d=load();
  d.settings=d.settings||{};
  d.settings.assetSnapshots=d.settings.assetSnapshots||[];
  const s=d.settings.assetSnapshots.find(x=>String(x.id)===String(id));
  if(!s){toast('这条总资产记录不存在');closeAssetEditModal();return}
  const date=$('assetEditDate').value||localDateStr();
  const time=$('assetEditTime').value||'00:00';
  s.date=date;
  s.time=time;
  s.timestamp=`${date} ${time}:00`;
  s.amount=+amount.toFixed(2);
  s.note=$('assetEditNote').value.trim();
  save(d);data=d;
  syncAssetSave(d.settings.assetSnapshots||[]);
  closeAssetEditModal();
  renderStats();
  toast('总资产记录已更新');
}

function formatAssetDate(date){
  const [y,m,d]=String(date||'').split('-');
  return y&&m&&d?`${y.slice(2)}/${m}/${d}`:date;
}

function assetIntervalText(prevTs,curTs){
  const a=new Date(prevTs),b=new Date(curTs);
  if(isNaN(a)||isNaN(b))return '无间隔';
  const days=Math.floor((new Date(b.getFullYear(),b.getMonth(),b.getDate())-new Date(a.getFullYear(),a.getMonth(),a.getDate()))/(1000*60*60*24));
  if(days<=0)return '今天';
  return `${days}天前`;
}

function deleteAssetSnapshot(id){
  openConfirmDialog('确定删除这条总资产快照记录吗？删除后将从总资产趋势中移除。',()=>{
    deleteAssetSnapshotConfirmed(id);
  });
}

function deleteAssetSnapshotConfirmed(id){
  const d=load();
  d.settings=d.settings||{};
  d.settings.assetSnapshots=(d.settings.assetSnapshots||[]).filter(s=>String(s.id)!==String(id));
  save(d);data=d;
  syncAssetSave(d.settings.assetSnapshots||[]);
  renderStats();
  toast('总资产记录已删除');
}

function statsYears(all){
  const years=[...new Set(all.map(t=>String(t.date||'').slice(0,4)).filter(y=>/^\d{4}$/.test(y)))].sort();
  const cur=String(new Date().getFullYear());
  if(!years.includes(cur))years.push(cur);
  return years.slice(-4);
}

function renderCategoryYearMatrix(d,all){
  if(!$('categoryYearMatrix'))return;
  const years=statsYears(all);
  const cats=d.cats.filter(c=>c.t==='expense'&&c.ac!==0).map(c=>{
    const sums=years.map(y=>all.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)&&String(t.date||'').indexOf(y+'-')===0).reduce((s,t)=>s+t.amount,0));
    return {c,sums,total:sums.reduce((a,b)=>a+b,0)};
  }).filter(x=>x.total>0).sort((a,b)=>b.total-a.total).slice(0,12);
  if(!cats.length){$('categoryYearMatrix').innerHTML='<div class="empty" style="padding:18px">暂无年度分类支出数据</div>';return;}
  $('categoryYearMatrix').innerHTML=`<table class="matrix-table"><thead><tr><th>分类</th>${years.map(y=>`<th>${y}</th>`).join('')}<th>趋势</th></tr></thead><tbody>
    ${cats.map(row=>{
      const first=row.sums.find(v=>v>0)||0,last=[...row.sums].reverse().find(v=>v>0)||0;
      const trend=last>first?'↑':last<first?'↓':'→';
      const cls=last>first?'matrix-up':last<first?'matrix-down':'';
      return `<tr><td>${esc(row.c.i+' '+row.c.n)}</td>${row.sums.map(v=>`<td>${v?fmt(v):'-'}</td>`).join('')}<td class="${cls}">${trend}</td></tr>`;
    }).join('')}
  </tbody></table>`;
}

function renderKeywordYearTrend(d,all){
  if(!$('keywordYearTrend'))return;
  const kw=String($('statsKeywordInput')?.value||d.settings?.lastStatsKeyword||'喝酒').trim();
  if($('statsKeywordInput'))$('statsKeywordInput').value=kw;
  if(!kw){$('keywordYearTrend').innerHTML='<div class="empty" style="padding:18px">输入关键词后查看年度趋势</div>';return;}
  const query=kw.toLowerCase();
  const list=all.filter(t=>t.type==='expense'&&matchBillKeywordWithQuery(t,query,d));
  const years=statsYears(list.length?list:all);
  const months=Array.from({length:12},(_,i)=>pad2(i+1));
  if(!list.length){$('keywordYearTrend').innerHTML=`<div class="empty" style="padding:18px">没有找到「${esc(kw)}」相关支出</div>`;return;}
  $('keywordYearTrend').innerHTML=years.map(y=>{
    const vals=months.map(m=>list.filter(t=>String(t.date||'').indexOf(`${y}-${m}`)===0).reduce((s,t)=>s+t.amount,0));
    const total=vals.reduce((a,b)=>a+b,0);
    return `<div class="keyword-year-row">
      <div class="keyword-cell">${y}</div>
      ${vals.map((v,i)=>`<div class="keyword-cell ${v?'hit':''}" title="${y}-${months[i]} ${fmt(v)}">${v?short(v):'-'}</div>`).join('')}
      <div class="keyword-cell hit">${fmt(total)}</div>
    </div>`;
  }).join('')+`<div class="rank-hint">从左到右为 1-12 月，最后一列为全年合计。</div>`;
}

function buildAnomalyExpenseRows(d,all){
  const now=new Date(),ym=localMonthStr(now);
  const monthTxs=all.filter(t=>String(t.date||'').indexOf(ym)===0);
  const prevMonths=[1,2,3].map(i=>{const dt=new Date(now);dt.setMonth(dt.getMonth()-i);return localMonthStr(dt)});
  const rows=[];
  const threshold=largeExpenseThreshold(d);
  monthTxs.filter(t=>t.type==='expense'&&t.amount>=threshold).forEach(t=>rows.push({t,reason:`大额支出，超过 ${fmt(threshold)}`}));
  monthTxs.filter(t=>t.type==='expense').forEach(t=>{
    const same=monthTxs.filter(x=>String(x.id)!==String(t.id)&&x.type===t.type&&x.date===t.date&&Math.abs(x.amount-t.amount)<0.01&&String(x.desc||'').trim()===String(t.desc||'').trim());
    if(same.length)rows.push({t,reason:'疑似重复账单'});
  });
  d.cats.filter(c=>c.t==='expense').forEach(c=>{
    const cur=monthTxs.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)).reduce((s,t)=>s+t.amount,0);
    const avg=prevMonths.reduce((s,m)=>s+all.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)&&String(t.date).indexOf(m)===0).reduce((a,t)=>a+t.amount,0),0)/3;
    if(avg>0&&cur>avg*1.35){
      monthTxs.filter(t=>t.type==='expense'&&String(t.cat)===String(c.id)).sort((a,b)=>b.amount-a.amount).slice(0,3).forEach(t=>rows.push({t,reason:`${c.n}本月偏高`}));
    }
  });
  const seen=new Set();
  return rows.filter(r=>{const k=r.t.id+'|'+r.reason;if(seen.has(k))return false;seen.add(k);return true;}).slice(0,80);
}

function renderAnomalyExpenseList(d,all){
  if(!$('anomalyExpenseList'))return;
  const rows=buildAnomalyExpenseRows(d,all);
  if(!rows.length){$('anomalyExpenseList').innerHTML='<div class="empty" style="padding:18px">本月暂无异常支出明细</div>';return;}
  $('anomalyExpenseList').innerHTML=`<table class="anomaly-table"><thead><tr><th>日期</th><th>备注</th><th>金额</th><th>异常原因</th></tr></thead><tbody>
    ${rows.map(r=>`<tr data-anomaly-tx="${r.t.id}"><td>${esc(r.t.date)}</td><td>${esc(r.t.desc||'无备注')}</td><td class="expense">${fmt(r.t.amount)}</td><td>${esc(r.reason)}</td></tr>`).join('')}
  </tbody></table>`;
  $('anomalyExpenseList').querySelectorAll('[data-anomaly-tx]').forEach(row=>row.onclick=()=>jumpToBillTx(row.dataset.anomalyTx));
}

function detectRecurringExpenses(d,all){
  const map={};
  all.filter(t=>t.type==='expense').forEach(t=>{
    const c=d.cats.find(x=>String(x.id)===String(t.cat));
    const key=(c?.n||'支出')+'|'+Math.round(t.amount/10)*10;
    const m=String(t.date).slice(0,7);
    map[key]=map[key]||{name:c?.n||t.desc||'固定支出',months:new Set(),sum:0,count:0};
    map[key].months.add(m);map[key].sum+=t.amount;map[key].count++;
  });
  return Object.values(map).filter(x=>x.months.size>=2).map(x=>({...x,avg:x.sum/x.count})).sort((a,b)=>b.months.size-a.months.size);
}

function renderNeedsAnalysisPanel(d,monthTxs){
  if(!$('needsAnalysisPanel'))return;
  const tagKind=name=>(d.tags||[]).find(t=>t.n===name)?.k;
  let need=0,want=0,other=0;
  monthTxs.filter(t=>t.type==='expense').forEach(t=>{
    const kinds=(t.tags||[]).map(tagKind);
    if(kinds.includes('need'))need+=t.amount;
    else if(kinds.includes('want'))want+=t.amount;
    else other+=t.amount;
  });
  const total=need+want+other;
  $('needsAnalysisPanel').innerHTML=`<div class="bqs-item"><div class="bqs-label">必要支出</div><div class="bqs-val">${fmt(need)} · ${total?Math.round(need/total*100):0}%</div></div>
  <div class="bqs-item"><div class="bqs-label">可选支出</div><div class="bqs-val">${fmt(want)} · ${total?Math.round(want/total*100):0}%</div></div>
  <div class="bqs-item"><div class="bqs-label">未标记</div><div class="bqs-val">${fmt(other)}</div></div>`;
}

window.addEventListener('resize',()=>{if(trendC)trendC.resize();if(pieC)pieC.resize();});

/* ========== 记账弹窗 ========== */
function setTxDateInput(type,dateVal){
  const input=$('txDate');
  if(!input)return;
  if(type==='invest'){
    input.type='month';
    input.value=dateVal?String(dateVal).slice(0,7):prevMonthStr();
    input.defaultValue=input.value;
  }else{
    input.type='date';
    input.value=dateVal||localDateStr();
    input.defaultValue=input.value;
  }
}
function ensureTxDateFilled(){
  const input=$('txDate');
  if(!input||txType==='invest')return;
  if(!input.value){
    input.value=localDateStr();
    input.defaultValue=input.value;
  }
}
function openTx(type){
  editingTxId=null;
  txType=type;selCat=null;selMood='';
  // 支出类型默认选中"餐饮"分类
  if(type==='expense'){
    const d=load();
    const cat=d.cats.find(c=>c.t==='expense'&&c.n==='餐饮');
    if(cat)selCat=cat.id;
  }
  $('txTitle').textContent={expense:'记一笔支出',income:'记一笔收入',transfer:'账户转账',invest:'记录投资收益'}[type];
  $('txSave').textContent='保存';
  $('txSaveAnother').style.display='none';
  document.querySelectorAll('.pill').forEach(p=>p.classList.toggle('active',p.dataset.type===type));
  updateTxTypeUI(type);
  resetDiscountFields();
  $('txAmount').value='';$('txDesc').value='';$('txRate').value='';if($('txRepeat'))$('txRepeat').checked=false;setTxDateInput(type);
  renderCatPills(type==='transfer'?'expense':type);
  renderAccSelects();
  document.querySelectorAll('.mood-btn').forEach(m=>m.classList.remove('active'));
  $('txModal').classList.add('show');
  ensureTxDateFilled();
  updateTxSaveHint();
  txModalDirty=false;
  restoreTxGridOrder();
  setTimeout(()=>{
    ensureTxDateFilled();
    if(type==='expense'){const inp=$('txOriginalPrice');if(inp){inp.focus();inp.select();}}
    else{$('txAmount')?.focus();$('txAmount')?.select();}
  },200);
}
function openTxEdit(id){
  // 防止重复调用（触摸设备可能触发两次）
  if(editingTxId===id&&$('txModal').classList.contains('show'))return;
  const d=load();
  const t=d.txs.find(x=>String(x.id)===String(id));
  if(!t){toast('记录不存在');return}
  editingTxId=t.id;
  txType=t.type;selCat=t.cat||null;selMood=t.mood||'';
  $('txTitle').textContent='编辑记录';
  $('txSave').textContent='保存修改';
  document.querySelectorAll('.pill').forEach(p=>p.classList.toggle('active',p.dataset.type===txType));
  updateTxTypeUI(txType);
  $('txAmount').value=t.amount;
  $('txDesc').value=t.desc||'';
  $('txRate').value=t.rate||'';
  if($('txRepeat'))$('txRepeat').checked=false;
  setTxDateInput(txType,t.date||localDateStr());
  renderCatPills(txType==='transfer'?'expense':txType);
  renderAccSelects(t.acc,t.toAcc);
  $('txAccount').value=t.acc==null?'':String(t.acc);
  if(t.toAcc!=null)$('txToAccount').value=String(t.toAcc);
  document.querySelectorAll('.mood-btn').forEach(m=>m.classList.toggle('active',m.dataset.mood===selMood));
  // 优惠字段回填：编辑支出时，查找关联的优惠收入记录并回填原价/实付
  if(txType==='expense'){
    resetDiscountFields();
    $('txOriginalPrice').value=parseFloat(t.amount||0).toFixed(2);
    const discTx=findDiscountForExpense(d,t);
    if(discTx){
      $('txOriginalPrice').value=(parseFloat(t.amount)+parseFloat(discTx.amount)).toFixed(2);
      $('txActualPay').value=parseFloat(discTx.amount).toFixed(2);
      calcDiscount();
    }
  }
  $('txModal').classList.add('show');
  updateTxEditPreview();
  updateTxSaveHint();
  txModalDirty=false;
  restoreTxGridOrder();
  setTimeout(()=>{
    if(txType==='expense'){const inp=$('txOriginalPrice');if(inp){inp.focus();inp.select();}}
    else{$('txAmount')?.focus();$('txAmount')?.select();}
  },200);
}

function restoreTxGridOrder(){
  const container=$('txGridInner');
  if(!container)return;
  const saved=localStorage.getItem('txGridOrder');
  if(!saved)return;
  let order;
  try{order=JSON.parse(saved);}catch(e){return;}
  if(!Array.isArray(order)||order.length!==4)return;
  const items=Array.from(container.querySelectorAll('.tx-grid-item'));
  const map=new Map(items.map(el=>[el.dataset.field,el]));
  order.forEach(field=>{
    const el=map.get(field);
    if(el)container.appendChild(el);
  });
}

function renderTxSettings(){
  const d=load();
  const fieldLabels={original:'原价',desc:'备注',actual:'优惠',date:'日期'};
  // 字段排序
  const savedOrder=localStorage.getItem('txGridOrder');
  let order;try{order=JSON.parse(savedOrder);}catch(e){}
  if(!Array.isArray(order)||order.length!==4)order=['original','desc','actual','date'];
  $('txFieldOrderList').innerHTML=order.map((field,i)=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-warm);border-radius:8px">
    <span style="font-weight:700">${fieldLabels[field]}</span>
    <div style="display:flex;gap:4px">
      <button onclick="moveTxField(${i},-1)" style="padding:2px 8px;font-size:12px;border-radius:6px;background:var(--surface);border:1px solid var(--border);color:var(--text-secondary);cursor:pointer" ${i===0?'disabled':''}>↑</button>
      <button onclick="moveTxField(${i},1)" style="padding:2px 8px;font-size:12px;border-radius:6px;background:var(--surface);border:1px solid var(--border);color:var(--text-secondary);cursor:pointer" ${i===3?'disabled':''}>↓</button>
    </div>
  </div>`).join('');
  // 分类管理
  const typeMap={expense:'支出',income:'收入',transfer:'转账',invest:'投资'};
  const currentType=txType==='transfer'?'expense':txType;
  const cats=d.cats.filter(c=>c.t===currentType&&c.ac!==0);
  $('txCatManageList').innerHTML=cats.map(c=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-warm);border-radius:8px">
    <span>${esc(c.i+' '+c.n)}</span>
    <div style="display:flex;gap:4px">
      <button onclick="editTxCatName(${c.id})" style="padding:2px 8px;font-size:12px;border-radius:6px;background:var(--surface);border:1px solid var(--border);color:var(--primary);cursor:pointer">编辑</button>
      <button onclick="deleteTxCat(${c.id})" style="padding:2px 8px;font-size:12px;border-radius:6px;background:var(--surface);border:1px solid var(--border);color:var(--expense);cursor:pointer">删除</button>
    </div>
  </div>`).join('')||'<div style="padding:8px 12px;color:var(--text-tertiary)">暂无分类</div>';
  // 金额智能匹配规则
  const allCats=d.cats.filter(c=>c.ac!==0&&(c.t==='expense'||c.t==='income'));
  $('txAmountRuleCat').innerHTML=allCats.map(c=>`<option value="${c.id}" data-type="${c.t}">${esc(c.i+' '+c.n)}</option>`).join('');
  const rules=(d.settings?.amountRules||[]);
  $('txAmountRuleList').innerHTML=rules.map(r=>{
    const c=d.cats.find(x=>String(x.id)===String(r.cat));
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-warm);border-radius:8px">
      <div style="display:flex;gap:10px;flex:1">
        <span style="font-weight:700">${parseFloat(r.amount).toFixed(r.amount%1===0?0:2)}</span>
        <span style="color:var(--text-secondary)">${esc(r.note||'')}</span>
        <span style="color:var(--text-tertiary)">${esc(c?c.i+' '+c.n:'未知')}</span>
      </div>
      <button onclick="deleteTxAmountRule(${r.id})" style="padding:2px 8px;font-size:12px;border-radius:6px;background:var(--surface);border:1px solid var(--border);color:var(--expense);cursor:pointer">删除</button>
    </div>`;
  }).join('')||'<div style="padding:8px 12px;color:var(--text-tertiary)">还没有规则</div>';
  // 账户显示
  const accs=d.accs;
  $('txAccManageList').innerHTML=accs.map(a=>{const m=ACC_META[a.t]||ACC_META.custom;return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-warm);border-radius:8px">
    <span>${esc(m.i+' '+a.n)}</span>
    <label style="display:flex;align-items:center;gap:4px;font-size:12px;cursor:pointer">
      <input type="checkbox" ${a.ac!==0?'checked':''} onchange="toggleTxAccVisibility(${a.id},this.checked)" style="cursor:pointer">
      显示
    </label>
  </div>`;}).join('');
}
window.moveTxField=function(idx,dir){
  const saved=localStorage.getItem('txGridOrder');
  let order;try{order=JSON.parse(saved);}catch(e){}
  if(!Array.isArray(order)||order.length!==4)order=['original','desc','actual','date'];
  const newIdx=idx+dir;
  if(newIdx<0||newIdx>=4)return;
  [order[idx],order[newIdx]]=[order[newIdx],order[idx]];
  localStorage.setItem('txGridOrder',JSON.stringify(order));
  renderTxSettings();
  restoreTxGridOrder();
};
window.editTxCatName=function(catId){
  const d=load();
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  if(!cat)return;
  const newName=prompt('修改分类名称',cat.n);
  if(newName&&newName.trim()&&newName.trim()!==cat.n){
    cat.n=newName.trim();
    save(d);data=d;
    renderTxSettings();
    renderCatPills(txType==='transfer'?'expense':txType);
    toast('分类名称已修改');
  }
};
window.deleteTxCat=function(catId){
  if(!confirm('确定要删除这个分类吗？已有的账单记录不会受影响。'))return;
  const d=load();
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  if(!cat)return;
  cat.ac=0;
  save(d);data=d;
  renderTxSettings();
  renderCatPills(txType==='transfer'?'expense':txType);
  toast('分类已删除');
};
window.deleteTxAmountRule=function(ruleId){
  const d=load();
  d.settings=d.settings||{};
  d.settings.amountRules=(d.settings.amountRules||[]).filter(r=>String(r.id)!==String(ruleId));
  save(d);data=d;
  renderTxSettings();
  toast('规则已删除');
};
$('txAmountRuleAddBtn').onclick=()=>{
  const amount=parseFloat($('txAmountRuleVal').value);
  if(!Number.isFinite(amount)||amount<=0){toast('请输入有效金额');return}
  const note=$('txAmountRuleNote').value.trim();
  if(!note){toast('请输入备注');return}
  const cat=$('txAmountRuleCat').value;
  if(!cat){toast('请选择分类');return}
  const d=load();
  d.settings=d.settings||{};
  d.settings.amountRules=d.settings.amountRules||[];
  const catObj=d.cats.find(c=>String(c.id)===String(cat));
  const type=catObj?.t||'expense';
  d.settings.amountRules.push({id:genId(),amount:+amount.toFixed(2),note,cat,type});
  // 同步添加自动分类规则
  d.rules=d.rules||[];
  const exists=d.rules.some(r=>r.kw===note&&String(r.cat)===String(cat)&&r.type===type);
  if(!exists){d.rules.push({id:genId(),kw:note,type,cat:parseInt(cat)});}
  save(d);data=d;
  $('txAmountRuleVal').value='';$('txAmountRuleNote').value='';
  renderTxSettings();
  toast('规则已添加');
};
window.toggleTxAccVisibility=function(accId,visible){
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(accId));
  if(!acc)return;
  acc.ac=visible?1:0;
  save(d);data=d;
  renderAccSelects();
  renderAccountSnapshot();
  toast(visible?'账户已显示':'账户已隐藏');
};

function updateTxEditPreview(){
  const el=$('txEditPreview');
  if(!el)return;
  if(!editingTxId){el.style.display='none';return;}
  const d=load();
  const t=d.txs.find(x=>String(x.id)===String(editingTxId));
  if(!t){el.style.display='none';return;}
  const newAcc=$('txAccount').value;
  const newAmount=parseAmountInput($('txAmount').value)||0;
  const oldAcc=t.acc==null?'':String(t.acc);
  const oldAmount=parseFloat(t.amount)||0;
  const accChanged=newAcc!==oldAcc;
  const amtChanged=newAmount!==oldAmount;
  if(!accChanged&&!amtChanged){el.style.display='none';return;}
  let html='';
  if(accChanged){
    const oldAccObj=d.accs.find(a=>String(a.id)===oldAcc);
    const newAccObj=d.accs.find(a=>String(a.id)===newAcc);
    html+='<div>将从 '+( oldAccObj?esc(oldAccObj.n):'未选账户')+' 回滚 '+fmt(oldAmount)+'</div>';
    html+='<div>将应用到 '+( newAccObj?esc(newAccObj.n):'未选账户')+' '+fmt(newAmount)+'</div>';
  }else{
    const accObj=d.accs.find(a=>String(a.id)===newAcc);
    html+='<div>账户: '+(accObj?esc(accObj.n):'未选')+' | 金额: '+fmt(oldAmount)+' → '+fmt(newAmount)+'</div>';
  }
  el.innerHTML=html;
  el.style.display='block';
}

function parseAmountInput(v){
  const raw=String(v||'').trim();
  if(!raw)return NaN;
  if(!/^[\d+\-*/().\s]+$/.test(raw))return parseFloat(raw);
  try{
    const val=Function('"use strict";return ('+raw+')')();
    return Number.isFinite(val)?Math.round(val*100)/100:NaN;
  }catch(e){return parseFloat(raw)}
}

function sanitizeAmountInput(v){
  return String(v||'').replace(/[^\d+\-*/().\s]/g,'');
}

function resetDiscountFields(){
  const o=$('txOriginalPrice');if(o)o.value='';
  const a=$('txActualPay');if(a)a.value='';
  const r=$('discountResult');if(r)r.textContent='';
}

function findDiscountForExpense(d,expenseTx){
  if(!d||!expenseTx)return null;
  const direct=d.txs.find(x=>x.source==='discount'&&String(x.discountFor||'')===String(expenseTx.id));
  if(direct)return direct;
  const candidates=d.txs.filter(x=>x.source==='discount'&&!x.discountFor&&x.date===expenseTx.date&&String(x.acc)===String(expenseTx.acc));
  if(candidates.length===1)return candidates[0];
  const desc=String(expenseTx.desc||'').trim();
  if(desc&&candidates.length>1){
    const byDesc=candidates.filter(x=>String(x.desc||'').indexOf(desc)===0);
    if(byDesc.length===1)return byDesc[0];
  }
  return null;
}

function calcDiscount(){
  const original=parseFloat($('txOriginalPrice')?.value)||0;
  const discount=parseFloat($('txActualPay')?.value)||0;
  const result=$('discountResult');
  const amountInput=$('txAmount');
  if(!result)return;
  if(original>0&&discount>0&&discount<original){
    const actual=original-discount;
    result.textContent='支出记原价，实付'+actual.toFixed(2)+'元';
    // 金额框显示原价（支出按原价记）
    if(amountInput)amountInput.value=original;
  }else if(original>0&&discount>0&&discount>=original){
    result.textContent='优惠金额应小于原价';
  }else if(original>0&&discount===0){
    // 只填了原价，金额框显示原价
    if(amountInput)amountInput.value=original;
    result.textContent='';
  }else{
    result.textContent='';
  }
  updateCalcHint('txOriginalPrice','txOriginalHint');
  updateCalcHint('txActualPay','txActualHint');
}
function updateCalcHint(inputId,hintId){
  const input=$(inputId),hint=$(hintId);
  if(!input||!hint)return;
  const val=String(input.value||'').trim();
  if(!val||!/[+\-*/]/.test(val)){hint.textContent='';return;}
  try{
    const result=Function('"use strict";return ('+val+')')();
    if(Number.isFinite(result))hint.textContent='= '+Number(result).toFixed(2);
    else hint.textContent='';
  }catch(e){hint.textContent='';}
}
function markTxDirty(){txModalDirty=true;}
function updateTxSaveHint(){
  const btn=$('txSave');if(!btn)return;
  const accId=$('txAccount')?.value||'';
  const acc=load().accs.find(a=>String(a.id)===String(accId));
  if(txType==='expense'&&acc)btn.textContent='💾 保存并从 '+acc.n+' 扣款';
  else if((txType==='income'||txType==='invest')&&acc)btn.textContent='💾 保存并计入 '+acc.n;
  else btn.textContent=editingTxId?'💾 保存修改':'💾 保存记录';
}

function updateTxTypeUI(type){
  $('catField').classList.toggle('hide',type==='transfer');
  $('toAccField').classList.toggle('hide',type!=='transfer');
  $('rateField').classList.toggle('hide',type!=='invest');
  if($('repeatField'))$('repeatField').classList.toggle('hide',!!editingTxId);
  // 支出时显示四字段网格（原价/实付/日期/备注），非支出显示大金额框+日期备注网格
  const mg=$('txMainGrid');
  const af=$('txAmountField');
  const go=$('txGridOriginal');
  const ga=$('txGridActual');
  if(type==='expense'){
    if(mg)mg.style.display='block';
    if(af)af.style.display='none';
    if(go)go.style.display='block';
    if(ga)ga.style.display='block';
  }else{
    if(mg)mg.style.display='block';
    if(af)af.style.display='block';
    if(go)go.style.display='none';
    if(ga)ga.style.display='none';
    resetDiscountFields();
  }
  renderQuickNotes(type);
}

function renderQuickNotes(type){
  let notes=QUICK_NOTES[type]||[];
  if(type==='expense'&&selCat){
    const d=load();
    const cat=d.cats.find(c=>String(c.id)===String(selCat));
    if(cat&&CATEGORY_QUICK_NOTES[cat.n])notes=CATEGORY_QUICK_NOTES[cat.n];
  }
  $('quickNotes').innerHTML=notes.map(n=>`<button type="button" class="quick-note" data-note="${esc(n)}">${esc(n)}</button>`).join('');
  $('quickNotes').querySelectorAll('[data-note]').forEach(btn=>{
    btn.onclick=()=>{
      const input=$('txDesc');
      input.value=input.value?input.value+' '+btn.dataset.note:btn.dataset.note;
      input.focus();
    };
  });
}

function renderCatPills(type){
  const d=load();
  let cats=d.cats.filter(c=>c.t===type&&c.ac!==0).sort((a,b)=>(Number(a.ord)||Number(a.id)||0)-(Number(b.ord)||Number(b.id)||0));
  const isMobile=window.innerWidth<700;
  if(isMobile&&type==='expense'){
    const mobileOrder=['餐饮','交通','住房','购物','娱乐','医疗','生活','人情','旅行','其他','学习','通讯','亲友'];
    const alias={交通出行:'交通',娱乐休闲:'娱乐',通讯网络:'通讯',医疗健康:'医疗',人情社交:'人情',学习成长:'学习'};
    const picked=new Set();
    cats=mobileOrder.map(name=>{
      const item=cats.find(c=>{
        const label=alias[c.n]||c.n;
        return label===name&&!picked.has(String(c.id));
      });
      if(item){
        picked.add(String(item.id));
        return {...item,mobileName:name};
      }
      return null;
    }).filter(Boolean);
  }
  $('catPills').innerHTML=cats.map(c=>`<div class="cat-pill${selCat===c.id?' active':''}" data-id="${c.id}" data-cat-type="${type}" draggable="${type==='expense'&&!isMobile}" ondblclick="showCatActionMenu(${c.id})" style="--cat-color:${c.c}"><span style="margin-right:2px">${c.i}</span>${esc(c.mobileName||c.n)}</div>`).join('');
  $('catPills').querySelectorAll('.cat-pill').forEach(p=>{p.onclick=()=>{selCat=p.dataset.id;document.querySelectorAll('.cat-pill').forEach(x=>x.classList.remove('active'));p.classList.add('active');renderQuickNotes(txType);};});
  if(!isMobile)bindCatPillSort(type);
}

function bindCatPillSort(type){
  if(type!=='expense')return;
  const box=$('catPills');
  let dragging=null;
  box.querySelectorAll('.cat-pill').forEach(p=>{
    p.ondragstart=e=>{
      dragging=p;
      p.classList.add('dragging');
      e.dataTransfer.effectAllowed='move';
      e.dataTransfer.setData('text/plain',p.dataset.id);
    };
    p.ondragover=e=>{
      e.preventDefault();
      if(!dragging||dragging===p)return;
      const rect=p.getBoundingClientRect();
      const sameRow=Math.abs(e.clientY-(rect.top+rect.height/2))<rect.height/2;
      const after=sameRow?e.clientX>rect.left+rect.width/2:e.clientY>rect.top+rect.height/2;
      box.insertBefore(dragging,after?p.nextSibling:p);
    };
    p.ondragend=()=>{
      if(dragging)dragging.classList.remove('dragging');
      dragging=null;
      saveCatPillOrder('expense');
    };
  });
}

function saveCatPillOrder(type='expense'){
  const ids=Array.from($('catPills').querySelectorAll(`.cat-pill[data-cat-type="${type}"]`)).map(el=>String(el.dataset.id));
  if(!ids.length)return;
  const d=load();
  ids.forEach((id,i)=>{
    const cat=d.cats.find(c=>String(c.id)===id&&c.t===type);
    if(cat)cat.ord=i+1;
  });
  save(d);data=d;
}
function startCatNameEdit(catId){
  const pill=$('catPills').querySelector(`.cat-pill[data-id="${catId}"]`);
  if(!pill)return;
  const d=load();
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  if(!cat)return;
  const oldName=cat.n;
  const span=pill.querySelector('span');
  const origHTML=pill.innerHTML;
  // 临时替换为输入框
  pill.innerHTML='<input type="text" class="cat-name-edit" value="'+esc(oldName)+'" style="width:100%;border:none;background:transparent;font-size:inherit;font-weight:inherit;color:inherit;text-align:center;outline:none;padding:2px;font-family:inherit">';
  const inp=pill.querySelector('input');
  inp.focus();inp.select();
  const finish=()=>{
    const v=inp?.value.trim();
    if(v&&v!==oldName){
      const d2=load();
      const c2=d2.cats.find(c=>String(c.id)===String(catId));
      if(c2){c2.n=v;save(d2);data=d2;}
      toast('分类已重命名为"'+v+'"');
    }
    renderCatPills(cat.t);
    if(selCat===catId)selCat=catId;
  };
  inp.onblur=finish;
  inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();inp.blur();}if(e.key==='Escape'){pill.innerHTML=origHTML;}};
}

function showCatActionMenu(catId){
  const d=load();
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  if(!cat)return;
  // 关闭已存在的菜单
  let existing=$('catActionMenu');
  if(existing)existing.remove();
  // 创建遮罩+弹窗
  const overlay=document.createElement('div');
  overlay.id='catActionMenu';
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:99999;display:flex;align-items:center;justify-content:center';
  overlay.innerHTML=`<div style="background:var(--surface);border-radius:20px;padding:32px 28px;width:340px;max-width:90vw;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3)">
    <div style="font-size:48px;margin-bottom:12px;line-height:1">${cat.i}</div>
    <div style="font-size:22px;font-weight:700;margin-bottom:6px;color:var(--text)">${esc(cat.n)}</div>
    <div style="font-size:13px;color:var(--text-tertiary);margin-bottom:24px">${cat.t==='expense'?'支出分类':(cat.t==='income'?'收入分类':'投资分类')}</div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <button onclick="closeCatActionMenu();startCatNameEdit(${catId})" style="width:100%;padding:14px;border-radius:14px;border:1.5px solid var(--border);background:var(--bg);color:var(--text);font-weight:600;cursor:pointer;font-size:15px">✏️ 编辑名称</button>
      <button onclick="closeCatActionMenu();confirmTransferCat(${catId})" style="width:100%;padding:14px;border-radius:14px;border:1.5px solid var(--primary);background:var(--primary-soft);color:var(--primary);font-weight:600;cursor:pointer;font-size:15px">📦 转移账单</button>
      <button onclick="closeCatActionMenu();confirmDeleteCat(${catId})" style="width:100%;padding:14px;border-radius:14px;border:none;background:var(--expense);color:#fff;font-weight:600;cursor:pointer;font-size:15px">🗑️ 删除分类</button>
    </div>
    <button onclick="closeCatActionMenu()" style="margin-top:16px;padding:10px 24px;border:none;background:transparent;color:var(--text-tertiary);font-size:14px;cursor:pointer">取消</button>
  </div>`;
  document.body.appendChild(overlay);
  // 点击遮罩关闭
  overlay.onclick=e=>{if(e.target===overlay)closeCatActionMenu();};
}
function closeCatActionMenu(){
  const el=$('catActionMenu');if(el)el.remove();
}

/* ========== 账户操作菜单（手机端） ========== */
function showAccActionMenu(accId){
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(accId));
  if(!acc)return;
  let existing=$('accActionMenu');
  if(existing)existing.remove();
  const overlay=document.createElement('div');
  overlay.id='accActionMenu';
  overlay.className='acc-action-overlay';
  overlay.innerHTML=`<div class="acc-action-panel">
    <div class="acc-action-title">${esc(acc.n)}</div>
    <div class="acc-action-subtitle">${fmt(acc.b)}</div>
    <div class="acc-action-grid">
      <button class="acc-action-btn" onclick="closeAccActionMenu();openQuickBalanceEdit('${accId}')"><span class="icon">💰</span>修改余额</button>
      <button class="acc-action-btn" onclick="closeAccActionMenu();openQuickTransfer('${accId}')"><span class="icon">🔄</span>转账</button>
      <button class="acc-action-btn" onclick="closeAccActionMenu();openAccountFlow('${accId}')"><span class="icon">📒</span>查看流水</button>
      <button class="acc-action-btn" onclick="closeAccActionMenu();openAccEdit('${accId}')"><span class="icon">✏️</span>编辑账户</button>
    </div>
    <button class="acc-action-cancel" onclick="closeAccActionMenu()">取消</button>
  </div>`;
  document.body.appendChild(overlay);
  overlay.onclick=e=>{if(e.target===overlay)closeAccActionMenu();};
}
function closeAccActionMenu(){
  const el=$('accActionMenu');if(el)el.remove();
}

/* ========== 转移账单 ========== */
function confirmTransferCat(catId){
  const d=load();
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  if(!cat)return;
  const relatedTxs=d.txs.filter(t=>String(t.cat)===String(catId));
  const count=relatedTxs.length;
  const otherCats=d.cats.filter(c=>c.t===cat.t&&c.ac!==0&&String(c.id)!==String(catId));
  if(count===0){toast('该分类下没有账单');return;}
  if(otherCats.length===0){toast('没有其他同类型分类可转移');return;}
  showCatTransferDialog(cat,otherCats,relatedTxs);
}

/* ========== 删除分类 ========== */
function confirmDeleteCat(catId){
  const d=load();
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  if(!cat)return;
  const relatedTxs=d.txs.filter(t=>String(t.cat)===String(catId));
  const count=relatedTxs.length;
  const otherCats=d.cats.filter(c=>c.t===cat.t&&c.ac!==0&&String(c.id)!==String(catId));
  if(count>0&&otherCats.length===0){
    toast('该分类下有'+count+'笔账单，且没有其他同类型分类可转移');return;
  }
  if(!confirm('确定删除分类「'+cat.n+'」吗？'+(count>0?'该分类下有'+count+'笔账单，删除后将转移到其他分类。':'')))return;
  if(count>0){
    showCatTransferDialog(cat,otherCats,relatedTxs);
  }else{
    doDeleteCat(catId,null);
  }
}
function showCatTransferDialog(deletedCat,otherCats,relatedTxs){
  // 构建弹窗HTML
  const modalId='catTransferModal';
  let existing=$('catTransferModal');
  if(existing)existing.remove();
  const div=document.createElement('div');
  div.id=modalId;
  div.className='modal-overlay';
  div.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center';
  let options=otherCats.map(c=>'<option value="'+c.id+'">'+esc(c.n)+'</option>').join('');
  div.innerHTML=`<div class="modal-sheet" style="max-width:360px;width:90%;padding:20px">
    <h3 style="margin:0 0 12px;font-size:16px">转移账单</h3>
    <p style="margin:0 0 12px;font-size:13px;color:var(--text-secondary)">分类「${esc(deletedCat.n)}」下有 <b>${relatedTxs.length}</b> 笔账单，请选择要转移到的目标分类：</p>
    <div class="field"><select id="transferTargetCat" style="width:100%;padding:10px;border-radius:10px;border:1.5px solid var(--border);font-size:14px">${options}</select></div>
    <div style="display:flex;gap:10px;margin-top:16px">
      <button class="btn-secondary" style="flex:1;padding:12px;border-radius:12px;border:1.5px solid var(--border);background:var(--surface);color:var(--text);font-weight:600;cursor:pointer" onclick="closeCatTransferDialog()">取消</button>
      <button class="btn-primary" style="flex:1;padding:12px;border-radius:12px;border:none;background:var(--primary);color:#fff;font-weight:600;cursor:pointer" onclick="doTransferAndDelete(${deletedCat.id})">确认转移并删除</button>
    </div>
  </div>`;
  document.body.appendChild(div);
}
function closeCatTransferDialog(){
  const el=$('catTransferModal');if(el)el.remove();
}
function doTransferAndDelete(catId){
  const targetId=$('transferTargetCat')?.value;
  if(!targetId){toast('请选择目标分类');return;}
  doDeleteCat(catId,targetId);
  closeCatTransferDialog();
}
function doDeleteCat(catId,targetCatId){
  const d=load();
  // 转移账单
  if(targetCatId){
    d.txs.forEach(t=>{if(String(t.cat)===String(catId))t.cat=targetCatId;});
  }
  // 删除分类（标记为删除而不是真正删除，避免id冲突）
  const cat=d.cats.find(c=>String(c.id)===String(catId));
  if(cat){cat.ac=0;}
  save(d);data=d;
  if(selCat===catId)selCat=null;
  renderCatPills(cat?.t||'expense');
  toast('分类已删除'+(targetCatId?'，账单已转移':''));
}

function renderAccSelects(selectedAccId=null,selectedToAccId=null){
  const d=load();
  const all=d.accs;
  const active=d.accs.filter(a=>a.ac);
  const optionHtml=a=>{const m=ACC_META[a.t]||ACC_META.custom;return `<option value="${a.id}">${m.i} ${esc(a.n)} (${fmt(a.b)})</option>`};
  const ensureSelectedAcc=(list,id)=>{
    if(id==null||id==='')return list;
    if(list.some(a=>String(a.id)===String(id)))return list;
    const found=d.accs.find(a=>String(a.id)===String(id));
    return found?[found,...list]:list;
  };
  // 转账显示全部账户，支出/收入只显示活跃账户
  const accList=txType==='transfer'?all:active;
  const accListWithSelected=ensureSelectedAcc(accList,selectedAccId);
  const allWithToSelected=ensureSelectedAcc(all,selectedToAccId);
  const opts=accListWithSelected.map(optionHtml).join('');
  const toOpts=allWithToSelected.map(optionHtml).join('');
  const noAcc='<option value="">不关联账户（不影响余额）</option>';
  $('txToAccount').innerHTML=toOpts;
  if(txType!=='transfer'){
    const preferred=accList.find(a=>String(a.n).replace(/\s+/g,'')==='微+银+信+E');
    const selectedOption=selectedAccId!=null&&selectedAccId!==''?accListWithSelected.filter(a=>String(a.id)===String(selectedAccId)).map(optionHtml).join(''):'';
    const preferredOption=preferred&&String(preferred.id)!==String(selectedAccId)?optionHtml(preferred):'';
    const rest=accListWithSelected.filter(a=>String(a.id)!==String(selectedAccId)&&(!preferred||String(a.id)!==String(preferred.id))).map(optionHtml).join('');
    $('txAccount').innerHTML=selectedOption+preferredOption+rest+noAcc;
    if(selectedAccId!=null&&selectedAccId!==''){
      $('txAccount').value=String(selectedAccId);
    }else if(txType==='invest'){
      $('txAccount').value='';
    }else if(preferred){
      $('txAccount').value=String(preferred.id);
    }
  }else{
    $('txAccount').innerHTML=opts;
    if(selectedAccId!=null&&selectedAccId!=='')$('txAccount').value=String(selectedAccId);
    if(selectedToAccId!=null&&selectedToAccId!=='')$('txToAccount').value=String(selectedToAccId);
  }
}
function closeTxModal(){
  $('txModal').classList.remove('show');txModalDirty=false;
  // 编辑弹窗关闭时，自动收起滑动
  if(typeof closeAllSwipe==='function')closeAllSwipe();
}
$('txClose').onclick=closeTxModal;
$('txModal').onclick=e=>{if(e.target===$('txModal'))closeTxModal();};
$('txSettingsBtn').onclick=()=>{$('txSettingsPanel').style.display='block';renderTxSettings();};
$('txSettingsClose').onclick=()=>{$('txSettingsPanel').style.display='none';};
/* ========== 语音记账 ========== */
function initVoiceInput(){
  const btn=$('txVoiceBtn');
  const hint=$('txVoiceHint');
  if(!btn||!hint)return;
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRecognition){btn.classList.add('voice-unsupported');btn.title='当前浏览器不支持语音识别';return;}
  voiceRecognition=new SpeechRecognition();
  voiceRecognition.lang='zh-CN';
  voiceRecognition.interimResults=false;
  voiceRecognition.maxAlternatives=1;
  voiceRecognition.continuous=false;
  btn.onclick=()=>{
    if(voiceRecognition.state==='listening'){voiceRecognition.stop();return;}
    voiceRecognition.start();
    btn.classList.add('listening');
    hint.textContent='正在听...';
    hint.classList.add('show');
  };
  voiceRecognition.onresult=e=>{
    const text=e.results[0][0].transcript.trim();
    hint.textContent='"'+text+'"';
    setTimeout(()=>hint.classList.remove('show'),2000);
    applyVoiceResult(text);
  };
  voiceRecognition.onerror=e=>{
    btn.classList.remove('listening');hint.classList.remove('show');
    if(e.error==='not-allowed'){toast('请允许麦克风权限后再使用语音记账');}
    else if(e.error!=='aborted'){toast('语音识别失败：'+e.error);}
  };
  voiceRecognition.onend=()=>{btn.classList.remove('listening');hint.classList.remove('show');};
}
function parseVoiceText(text){
  let t=text.replace(/[零〇]/g,'0').replace(/一/g,'1').replace(/[二两]/g,'2').replace(/三/g,'3').replace(/四/g,'4').replace(/五/g,'5').replace(/六/g,'6').replace(/七/g,'7').replace(/八/g,'8').replace(/九/g,'9').replace(/十/g,'10').replace(/百/g,'00').replace(/千/g,'000');
  t=t.replace(/块钱/g,'元').replace(/块/g,'元');
  const nums=t.match(/\d+(?:\.\d+)?/g);
  let amount=null;
  const yuanMatch=t.match(/(\d+(?:\.\d+)?)\s*元/);
  if(yuanMatch){amount=parseFloat(yuanMatch[1]);}
  else if(nums&&nums.length>0){amount=parseFloat(nums[nums.length-1]);}
  let desc=t.replace(/\s*[\d.,]+(\.\d+)?\s*元?\s*/g,' ').trim();
  desc=desc.replace(/(元|块钱?|块|圆)$/,'').trim();
  return{amount:Number.isFinite(amount)?amount:null,desc};
}
function applyVoiceResult(text){
  const{amount,desc}=parseVoiceText(text);
  if(!amount){toast('未识别到金额：'+text);return;}
  const d=load();
  if(txType==='expense'){
    $('txOriginalPrice').value=amount.toFixed(2);
    calcDiscount();
    handleAmountAutoCat();
  }else{
    $('txAmount').value=amount.toFixed(2);
    const result=matchAmountAutoCat(d,amount,txType);
    if(result){applyAutoCat(result.cat);if(result.note)$('txDesc').value=result.note;}
  }
  if(desc){
    const autoNote=lastAutoNote||'';
    if(autoNote&&desc.length>autoNote.length){$('txDesc').value=desc;}
    else if(!autoNote){$('txDesc').value=desc;}
  }
  const descVal=$('txDesc').value.trim();
  if(descVal){
    const cat=matchPresetAutoCat(d,descVal,txType)||matchAutoRule(d,descVal,txType);
    if(cat)applyAutoCat(cat);
  }
  updateTxEditPreview();updateTxSaveHint();markTxDirty();
  toast('语音识别：'+text);
}
initVoiceInput();
/* ========== 长按记一笔 = 语音记账 ========== */
function initLongPressVoice(){
  const btn=$('botAddBtn');
  if(!btn)return;
  let timer=null,longPressed=false;
  const LONG_PRESS_MS=500;
  function startPress(e){
    longPressed=false;
    btn.style.transform='scale(0.92)';
    timer=setTimeout(()=>{
      longPressed=true;
      btn.style.transform='scale(1)';
      openTx('expense');
      const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
      if(SpeechRecognition&&voiceRecognition){
        try{
          voiceRecognition.start();
          const micBtn=$('txVoiceBtn');
          const hint=$('txVoiceHint');
          if(micBtn)micBtn.classList.add('listening');
          if(hint){hint.textContent='正在听...';hint.classList.add('show');}
        }catch(err){}
      }else{
        closeTxModal();
        setTimeout(showFallbackVoiceInput,300);
      }
    },LONG_PRESS_MS);
  }
  function endPress(e){
    if(timer){clearTimeout(timer);timer=null;}
    btn.style.transform='scale(1)';
    if(longPressed){
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
  btn.addEventListener('touchstart',startPress,{passive:true});
  btn.addEventListener('touchend',endPress,{passive:false});
  btn.addEventListener('touchcancel',endPress,{passive:false});
  btn.addEventListener('mousedown',startPress);
  btn.addEventListener('mouseup',endPress);
  btn.addEventListener('mouseleave',endPress);
  btn.addEventListener('contextmenu',e=>e.preventDefault());
  btn.addEventListener('click',e=>{if(longPressed){e.preventDefault();e.stopPropagation();longPressed=false;}});
}
initLongPressVoice();
$('swapTransferAcc').onclick=()=>{const a=$('txAccount').value,b=$('txToAccount').value;$('txAccount').value=b;$('txToAccount').value=a;updateTxEditPreview();updateTxSaveHint();};
$('txSaveAnother').onclick=()=>{const lastType=txType;openTx(lastType);$('txSaveAnother').style.display='none';};
document.querySelectorAll('.pill').forEach(p=>{p.onclick=()=>{const curAcc=$('txAccount')?.value||'';const curToAcc=$('txToAccount')?.value||'';txType=p.dataset.type;document.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));p.classList.add('active');updateTxTypeUI(txType);$('txTitle').textContent=editingTxId?'编辑记录':{expense:'记一笔支出',income:'记一笔收入',transfer:'账户转账',invest:'记录投资收益'}[txType];setTxDateInput(txType,txType==='invest'?null:$('txDate').value);renderAccSelects(curAcc,curToAcc);if(txType!=='transfer')renderCatPills(txType);updateTxSaveHint();};});
document.querySelectorAll('.mood-btn').forEach(m=>{m.onclick=()=>{selMood=m.dataset.mood;document.querySelectorAll('.mood-btn').forEach(x=>x.classList.remove('active'));m.classList.add('active');};});
$('txAccount').addEventListener('input',updateTxEditPreview);
$('txAccount').addEventListener('change',()=>{updateTxEditPreview();updateTxSaveHint();});
['txOriginalPrice','txActualPay','txDesc','txDate','txRate'].forEach(id=>{const el=$(id);if(el)el.addEventListener('input',markTxDirty);});
['txOriginalPrice','txActualPay'].forEach(id=>{const el=$(id);if(el)el.addEventListener('input',handleAmountAutoCat);});
// txDesc 实时关键词检测自动切换分类（新增记录时生效，编辑模式不自动切换）
$('txDesc').addEventListener('input',()=>{
  if(editingTxId)return;
  lastAutoNote='';
  const desc=$('txDesc').value.trim();
  if(!desc)return;
  const d=load();
  let cat=matchPresetAutoCat(d,desc,txType);
  if(!cat)cat=matchAutoRule(d,desc,txType);
  if(cat)applyAutoCat(cat);
  // 从备注中自动提取数字同步到金额框（支持"优惠"关键词拆分）
  const nums=desc.match(/\d+(?:\.\d+)?/g);
  if(nums&&nums.length>0){
    const discountIdx=desc.indexOf('优惠');
    if(txType==='expense'&&discountIdx!==-1){
      const beforeText=desc.slice(0,discountIdx);
      const afterText=desc.slice(discountIdx+2);
      const beforeNums=beforeText.match(/\d+(?:\.\d+)?/g);
      const afterNums=afterText.match(/\d+(?:\.\d+)?/g);
      if(beforeNums){
        const originalVal=parseFloat(beforeNums[beforeNums.length-1]);
        if(Number.isFinite(originalVal)&&originalVal>0){$('txOriginalPrice').value=originalVal;}
      }
      if(afterNums){
        const discountVal=parseFloat(afterNums[0]);
        if(Number.isFinite(discountVal)&&discountVal>0){$('txActualPay').value=discountVal;}
      }
      calcDiscount();
    }else{
      const val=parseFloat(nums[0]);
      if(Number.isFinite(val)&&val>0){
        if(txType==='expense'){
          const op=$('txOriginalPrice');
          if(op){op.value=val;handleAmountAutoCat();}
        }else{
          const am=$('txAmount');
          if(am){am.value=val;}
        }
      }
    }
  }
});
// 金额输入预判分类（备注为空时生效）
function handleAmountAutoCat(){
  if(editingTxId)return;
  const desc=$('txDesc').value.trim();
  if(desc)return;
  const d=load();
  let amount=null;
  if(txType==='expense'){amount=parseFloat($('txOriginalPrice')?.value)||parseFloat($('txActualPay')?.value);}
  else{amount=parseFloat($('txAmount')?.value);}
  const result=matchAmountAutoCat(d,amount,txType);
  if(result){
    lastAutoNote=result.note||'';
    applyAutoCat(result.cat);
    if(result.note)$('txDesc').value=result.note;
  }else if(lastAutoNote){
    // 金额不再匹配任何规则，且备注是由金额自动填充的，则清空备注并恢复默认分类
    if($('txDesc').value.trim()===lastAutoNote){$('txDesc').value='';}
    lastAutoNote='';
    // 恢复默认分类：支出→餐饮
    if(txType==='expense'){
      const defCat=d.cats.find(c=>c.t==='expense'&&c.n==='餐饮');
      if(defCat)applyAutoCat(defCat);
    }else{
      selCat=null;
      document.querySelectorAll('.cat-pill').forEach(x=>x.classList.remove('active'));
    }
  }
}
$('txAmount').addEventListener('keydown',e=>{
  const allowedCtrl=e.ctrlKey||e.metaKey||['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End','Enter','Escape'].includes(e.key);
  if(allowedCtrl)return;
  if(!/^[0-9+\-*/().\s]$/.test(e.key))e.preventDefault();
});
$('txAmount').addEventListener('input',()=>{
  const clean=sanitizeAmountInput($('txAmount').value);
  if($('txAmount').value!==clean)$('txAmount').value=clean;
  updateTxEditPreview();updateTxSaveHint();updateCalcHint('txAmount','txAmountHint');markTxDirty();handleAmountAutoCat();
});
$('txAmount').addEventListener('change',()=>{const v=parseAmountInput($('txAmount').value);if(Number.isFinite(v))$('txAmount').value=v;updateTxEditPreview();updateTxSaveHint();updateCalcHint('txAmount','txAmountHint');});

$('txSave').onclick=()=>{
  txModalDirty=false;
  // 支出类型从原价/实付框获取金额（按原价记支出）
  if(txType==='expense'){
    const discount=parseFloat($('txActualPay')?.value)||0;
    const original=parseFloat($('txOriginalPrice')?.value)||0;
    // 支出按原价记，优惠部分另记为收入
    if(original>0)$('txAmount').value=original;
    else if(discount>0)$('txAmount').value=discount;
  }
  const amount=parseAmountInput($('txAmount').value);
  if(!amount||(txType!=='invest'&&amount<=0)){toast(txType==='invest'?'请输入非 0 收益金额':'请输入金额');return}
  if((txType==='expense'||txType==='income')&&!selCat){
    toast('请选择分类');
    $('catPills')?.scrollIntoView({behavior:'smooth',block:'center'});
    return;
  }
  let desc=$('txDesc').value.trim();
  if(!desc){toast('请填写备注');$('txDesc')?.focus();return;}
  const discountIdx=desc.indexOf('优惠');
  if(discountIdx!==-1){desc=desc.slice(0,discountIdx).trim();}
  const d=load();
  const now=new Date();
  const rawAcc=$('txAccount').value;
  const old=editingTxId?d.txs.find(x=>String(x.id)===String(editingTxId)):null;
  const dateVal=txType==='invest'?($('txDate').value||prevMonthStr())+'-01':($('txDate').value||localDateStr());
  const repeat=false;
  const ruledCat=matchPresetAutoCat(d,desc,txType)||matchAutoRule(d,desc,txType);
  const tx={id:old?old.id:genId(),type:txType,amount,acc:rawAcc||null,date:dateVal,time:old?(old.time||now.toTimeString().slice(0,5)):now.toTimeString().slice(0,5),desc,mood:selMood,cat:ruledCat?ruledCat.id:(selCat||null),rate:txType==='invest'?$('txRate').value.trim():'',st:'normal',balApplied:false,source:old?old.source:undefined};
  if(txType==='transfer'){
    if(!tx.acc){toast('转账需要选择转出账户');return}
    tx.toAcc=$('txToAccount').value||null;
    if(!tx.toAcc){toast('转账需要选择转入账户');return}
    if(tx.acc===tx.toAcc){toast('转出和转入不能相同');return}
    tx.balApplied=true;
  }else if(tx.acc){
    tx.balApplied=true;
  }
  if(old){
    const idx=d.txs.findIndex(x=>String(x.id)===String(old.id));
    if(shouldRollbackOnDelete(old))rollbackTxBalance(d,old);
    d.txs[idx]=tx;
    // 编辑时只删除当前支出关联的旧优惠记录，避免同一天同账户多笔优惠互相覆盖
    const linkedDiscount=findDiscountForExpense(d,old);
    const oldDiscountIdx=linkedDiscount?d.txs.findIndex(t=>String(t.id)===String(linkedDiscount.id)):-1;
    if(oldDiscountIdx!==-1){
      const oldDisc=d.txs[oldDiscountIdx];
      if(shouldRollbackOnDelete(oldDisc))rollbackTxBalance(d,oldDisc);
      d.txs.splice(oldDiscountIdx,1);
    }
  }else{
    d.txs.unshift(tx);
    if(repeat){
      const base=new Date(dateVal);
      for(let i=1;i<12;i++){
        const dt=new Date(base.getFullYear(),base.getMonth()+i,base.getDate());
        const clone={...tx,id:genId(),date:txType==='invest'?localMonthStr(dt)+'-01':localDateStr(dt),time:tx.time,balApplied:false,source:'repeat'};
        d.txs.push(clone);
      }
    }
  }
  applyTxBalance(d,tx);
  // 优惠自动记为收入（如果填了实付金额且小于原价）
  let discountTx=null;
  if(txType==='expense'){
    const original=parseFloat($('txOriginalPrice')?.value)||0;
    const discount=parseFloat($('txActualPay')?.value)||0;
    if(original>0&&discount>0&&discount<original){
      // 查找或创建"优惠减免"分类
      let discCat=d.cats.find(c=>c.n==='优惠减免'&&c.t==='income');
      if(!discCat){
        discCat={id:genId(),n:'优惠减免',t:'income',i:'🎫',c:'#10b981'};
        d.cats.push(discCat);
      }
      discountTx={id:genId(),type:'income',amount:discount,acc:rawAcc||null,date:dateVal,time:now.toTimeString().slice(0,5),desc:(desc?desc+' ':'')+'【优惠'+discount.toFixed(2)+'元】',mood:'',cat:discCat.id,st:'normal',balApplied:false,source:'discount',discountFor:tx.id};
      d.txs.unshift(discountTx);
      applyTxBalance(d,discountTx);
    }
  }
  logAction(d,old?'更新账单':'新增账单',`${tx.desc||TYPE_MAP[tx.type]} ${fmt(tx.amount)}`+(discountTx?' + 优惠收入 '+fmt(discountTx.amount):''));
  save(d);data=d;$('txModal').classList.remove('show');
  if(!old){showCoin(txType);playSuccessSound();showFloatAmount(txType,tx.amount,$('txSave'));}
  editingTxId=null;
  resetDiscountFields();
  refreshAllViews();
  highlightTx(tx.id);
  toast(old?'记录已更新':(discountTx?'已保存，优惠'+discountTx.amount.toFixed(2)+'元已记为收入':'已保存，按 N 可再记一笔'));
};

document.querySelectorAll('.q-btn').forEach(b=>{b.onclick=()=>openTx(b.dataset.type)});

/* ========== 账户弹窗 ========== */
function openAccAdd(){
  editingAccId=null;
  $('accTitle').textContent='添加账户';
  $('accSave').textContent='✅ 添加账户';
  $('accName').value='';
  $('accType').value='cash';
  $('accBalance').value='';
  updateAccBalanceHint();
  $('accModal').classList.add('show');
}
function openAccEdit(id){
  const d=load();
  const acc=d.accs.find(a=>String(a.id)===String(id));
  if(!acc){toast('账户不存在');return}
  editingAccId=acc.id;
  $('accTitle').textContent='编辑账户';
  $('accBalanceLabel').textContent='当前余额';
  $('accSave').textContent='💾 保存修改';
  $('accName').value=acc.n;
  $('accType').value=acc.t;
  $('accBalance').value=(acc.t==='debt'||acc.t==='receivable')?Math.abs(acc.b):acc.b;
  updateAccBalanceHint();
  $('accModal').classList.add('show');
}
$('btnAddAccount').onclick=openAccAdd;
function updateAccBalanceHint(){
  const isDebt=$('accType').value==='debt';
  const isReceivable=$('accType').value==='receivable';
  $('accBalanceLabel').textContent=isDebt?'负债金额（自动计入负数）':isReceivable?'债权金额（别人欠你的钱）':(editingAccId!==null?'当前余额':'初始余额');
  $('accBalance').placeholder=isDebt?'请输入欠款金额，如 5000':isReceivable?'请输入借出金额，如 3000':'0.00';
}
$('accType').onchange=updateAccBalanceHint;
function closeAccModal(){$('accModal').classList.remove('show');editingAccId=null;}
$('accClose').onclick=closeAccModal;
$('accModal').onclick=e=>{if(e.target===$('accModal'))closeAccModal();};
$('accSave').onclick=()=>{
  const n=$('accName').value.trim();if(!n){toast('请输入名称');return}
  const t=$('accType').value,b=normalizeAccBalance(t,$('accBalance').value);
  const d=load();
  if(editingAccId!==null){
    const acc=d.accs.find(a=>String(a.id)===String(editingAccId));
    if(!acc){toast('账户不存在');return}
    acc.n=n;acc.t=t;acc.b=b;
    if(acc.ib==null)acc.ib=b;
    save(d);data=d;editingAccId=null;
    $('accModal').classList.remove('show');renderAccounts();renderHome();toast('账户已修改');
    return;
  }
  d.accs.push({id:genId(),n,t,b,ib:b,ac:1});save(d);data=d;
  $('accModal').classList.remove('show');renderAccounts();renderHome();toast('账户已添加');
};

/* ========== 删除 ========== */
function openConfirmDialog(msg,onOk,title='确认删除'){
  const dlg=$('confirmDlg');
  dlg.querySelector('.confirm-title').textContent=title;
  dlg.querySelector('.confirm-msg').textContent=msg;
  confirmAction=onOk;
  dlg.classList.add('show');
}
function closeConfirmDialog(){
  $('confirmDlg').classList.remove('show');
  delId=null;
  confirmAction=null;
}
function confirmDel(id){
  delId=id;
  openConfirmDialog('这条记录将移入回收站，并回滚已影响的账户余额。',deleteConfirmedTx);
}
$('cfCancel').onclick=closeConfirmDialog;
$('cfOk').onclick=()=>{
  const action=confirmAction;
  if(typeof action==='function')action();
  closeConfirmDialog();
};

function deleteConfirmedTx(){
  if(!delId)return;
  const d=load();
  const idx=d.txs.findIndex(x=>x.id===delId);
  if(idx>=0){
    const t=d.txs[idx];
    moveTxToTrash(d,t);
    logAction(d,'删除账单',`${t.desc||TYPE_MAP[t.type]} ${fmt(t.amount)}`);
    save(d);data=d;
    refreshAllViews();
    toast('已删除');
  }
  delId=null;
}

function moveTxToTrash(d,t){
  if(shouldRollbackOnDelete(t))rollbackTxBalance(d,t);
  t.st='deleted';t.deletedAt=new Date().toISOString();t.balApplied=false;
}

function restoreTx(id){
  const d=load(),t=d.txs.find(x=>String(x.id)===String(id));
  if(!t)return;
  t.st='normal';delete t.deletedAt;
  if(t.acc){t.balApplied=true;applyTxBalance(d,t)}
  logAction(d,'恢复账单',`${t.desc||TYPE_MAP[t.type]} ${fmt(t.amount)}`);
  save(d);data=d;refreshAllViews();renderDataTools();toast('已恢复');
}

function purgeTrash(){
  const d=load();
  const before=d.txs.length;
  d.txs=d.txs.filter(t=>t.st!=='deleted');
  logAction(d,'清空回收站',`${before-d.txs.length} 笔`);
  save(d);data=d;renderDataTools();toast('回收站已清空');
}

function logAction(d,action,detail=''){
  if(isSilentHistory(action,detail))return;
  d.history=d.history||[];
  d.history.unshift({id:genId(),time:new Date().toISOString(),action,detail});
  d.history=d.history.slice(0,80);
}

function isSilentHistory(action,detail=''){
  return action==='分类整理迁移'&&/迁移\s*0\s*笔账单/.test(String(detail||''));
}

function quickEntry(){
  const raw=$('quickEntryInput').value.trim();
  if(!raw){toast('请输入快速录入内容');return}
  const d=load();
  const amountMatch=raw.match(/-?\d+(\.\d+)?/);
  if(!amountMatch){toast('未识别到金额');return}
  const amount=Math.abs(parseFloat(amountMatch[0]));
  const text=raw.replace(amountMatch[0],'').trim();
  const type=/工资|收入|奖金|报销到账|收款/.test(raw)?'income':'expense';
  const acc=d.accs.find(a=>a.ac&&raw.includes(a.n))||d.accs.find(a=>a.ac);
  const cat=d.cats.find(c=>c.t===type&&raw.includes(c.n))||matchPresetAutoCat(d,raw,type)||matchAutoRule(d,raw,type)||d.cats.find(c=>c.t===type&&c.ac);
  const tx={id:genId(),type,amount,acc:acc?.id||null,date:localDateStr(),time:new Date().toTimeString().slice(0,5),desc:text||raw,cat:cat?.id||null,st:'normal',status:cat&&acc?'normal':'pending',tags:[],balApplied:!!acc,source:'quick'};
  d.txs.unshift(tx);if(tx.balApplied)applyTxBalance(d,tx);logAction(d,'快速录入',raw);
  save(d);data=d;$('quickEntryInput').value='';refreshAllViews();highlightTx(tx.id);toast('已快速录入');
}

function showTxContextMenu(e,id){
  e.preventDefault();contextTxId=id;
  let menu=$('txContextMenu');
  if(!menu){
    menu=document.createElement('div');menu.id='txContextMenu';menu.className='context-menu';
    menu.innerHTML='<button data-cmd="edit">编辑详情</button><button data-cmd="editnow">✏️ 直接编辑</button><button data-cmd="copy">复制一笔</button><button data-cmd="copydesc">复制备注</button><button data-cmd="copyamount">复制金额</button><button data-cmd="searchdesc">按此备注搜索</button><button data-cmd="pending">标为待整理</button><button data-cmd="large">标记/取消大额</button><button data-cmd="tag">添加标签</button><button data-cmd="samecat">查看同类账单</button><button data-cmd="sameacc">查看同账户流水</button><button data-cmd="delete">删除</button>';
    document.body.appendChild(menu);
    menu.onclick=ev=>handleContextCommand(ev.target.dataset.cmd);
    // 点击其他区域关闭菜单
    document.addEventListener('click',function closeMenu(ev){
      if(menu&&menu.style.display==='block'&&!menu.contains(ev.target)){menu.style.display='none';}
    },{once:true});
    // 触摸关闭
    document.addEventListener('touchstart',function closeMenuTouch(ev){
      if(menu&&menu.style.display==='block'&&!menu.contains(ev.target)){menu.style.display='none';}
    },{once:true});
  }
  // 获取坐标（支持触摸和鼠标）
  let x,y;
  if(e.touches&&e.touches.length){x=e.touches[0].clientX;y=e.touches[0].clientY;}
  else if(e.changedTouches&&e.changedTouches.length){x=e.changedTouches[0].clientX;y=e.changedTouches[0].clientY;}
  else{x=e.clientX;y=e.clientY;}
  menu.style.display='block';
  // 防止溢出屏幕
  const mw=menu.offsetWidth,mh=menu.offsetHeight;
  if(x+mw>window.innerWidth)x=window.innerWidth-mw-8;
  if(y+mh>window.innerHeight)y=window.innerHeight-mh-8;
  menu.style.left=x+'px';menu.style.top=y+'px';
}

function handleContextCommand(cmd){
  const menu=$('txContextMenu');if(menu)menu.style.display='none';
  if(!cmd||!contextTxId)return;
  const d=load(),t=d.txs.find(x=>String(x.id)===String(contextTxId));if(!t)return;
  if(cmd==='edit'){selectedBillId=t.id;switchPage('bills');renderBillDetailPanel();}
  if(cmd==='editnow')openTxEdit(t.id);
  if(cmd==='copy')copyTx(t.id);
  if(cmd==='copydesc')copyText(t.desc||'');
  if(cmd==='copyamount')copyText(String(t.amount||0));
  if(cmd==='searchdesc'){switchPage('bills');switchBillTab('day');$('fKeyword').value=t.desc||'';$('fMonth').value='';currentBillCatFilter=null;currentBillAccountFilter=null;renderBills();toast('已按备注搜索');}
  if(cmd==='delete')confirmDel(t.id);
  if(cmd==='pending'){t.status='pending';logAction(d,'标为待整理',t.desc||'账单');save(d);data=d;refreshAllViews();toast('已标为待整理');}
  if(cmd==='large'){if(isLargeExpense(t,d)){t.ignoreLarge=true;t.manualLarge=false;toast('已取消大额标记');}else{t.manualLarge=true;t.ignoreLarge=false;toast('已标记为大额');}logAction(d,'切换大额标记',t.desc||'账单');save(d);data=d;refreshAllViews();}
  if(cmd==='tag'){const tag=prompt('输入标签：','');if(tag){t.tags=t.tags||[];if(!t.tags.includes(tag))t.tags.push(tag);logAction(d,'添加标签',tag);save(d);data=d;refreshAllViews();}}
  if(cmd==='samecat'){currentBillCatFilter={catId:t.cat,name:(d.cats.find(c=>String(c.id)===String(t.cat))?.n||'分类')};switchPage('bills');}
  if(cmd==='sameacc'){currentBillAccountFilter={accId:t.acc,name:(d.accs.find(a=>String(a.id)===String(t.acc))?.n||'账户')};switchPage('bills');}
}

function copyText(text){
  text=String(text||'');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>toast('已复制')).catch(()=>fallbackCopyText(text));
  }else fallbackCopyText(text);
}

function fallbackCopyText(text){
  const ta=document.createElement('textarea');
  ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy');toast('已复制');}catch(e){toast('复制失败');}
  ta.remove();
}

/* ========== 筛选 ========== */
function fillMonths(){
  const d=load();const ms=new Set();d.txs.filter(t=>t.st==='normal').forEach(t=>ms.add(t.date.slice(0,7)));
  const cur=localMonthStr();
  ms.add(cur);
  if(!homeBillMonth)homeBillMonth=cur;
  if(homeBillMonth)ms.add(homeBillMonth);
  const monthOpts=Array.from(ms).sort().reverse().map(m=>`<option value="${m}"${m===homeBillMonth?' selected':''}>${m.replace('-','年')}月</option>`).join('');
  $('fMonth').innerHTML='<option value="">全部月份</option>'+monthOpts;
  if($('homeBillMonth'))$('homeBillMonth').innerHTML=monthOpts;
  if($('homeMonthSelect'))$('homeMonthSelect').innerHTML=monthOpts;
}
function fillCats(){
  const d=load();
  const opts=d.cats.filter(c=>c.ac).map(c=>`<option value="${c.id}">${c.i} ${esc(c.n)}</option>`).join('');
  $('fCat').innerHTML='<option value="">全部分类</option>'+opts;
}
$('fType').onchange=$('fMonth').onchange=$('fCat').onchange=()=>{currentBillCatFilter=null;currentBillAccountFilter=null;renderBills();};
$('fKeyword').oninput=(()=>{let t;return()=>{currentBillCatFilter=null;currentBillAccountFilter=null;const kw=$('fKeyword').value.trim();if(kw)$('fMonth').value='';clearTimeout(t);t=setTimeout(()=>{renderBills();if(kw)saveSearchHistory(kw);},300)}})();
if($('homeBillMonth'))$('homeBillMonth').onchange=e=>{homeBillMonth=e.target.value||localMonthStr();renderHome();};
if($('homeMonthSelect'))$('homeMonthSelect').onchange=e=>{homeBillMonth=e.target.value||localMonthStr();renderHome();};
/* ===== 手机端滚轮年月选择器 ===== */
(function(){
  /* ====== 双滚轮年月选择器 ====== */
  var overlay,container,bodyEl,onChange;
  var ITEM_H=40, FRICTION=0.97, VELOCITY_THRESHOLD=5, ACCEL=1.8;
  var cols=[]; // [{el, items, selectedIdx, ...}]
  function init(){
    overlay=document.createElement('div');overlay.className='wp-overlay';
    container=document.createElement('div');container.className='wp-container';
    container.innerHTML='<div class="wp-header"><button class="wp-cancel" type="button">取消</button><span class="wp-title"></span><button class="wp-confirm" type="button">确认</button></div><div class="wp-body"><div class="wp-cols"><div class="wp-col" id="wpColYear"></div><div class="wp-col" id="wpColMonth"></div></div></div>';
    document.body.appendChild(overlay);document.body.appendChild(container);
    bodyEl=container.querySelector('.wp-body');
    overlay.addEventListener('click',close);
    container.querySelector('.wp-cancel').addEventListener('click',close);
    container.querySelector('.wp-confirm').addEventListener('click',confirm);
    ['wpColYear','wpColMonth'].forEach(function(id){
      var el=container.querySelector('#'+id);
      el.style.touchAction='none';
      el.style.overflowY='hidden';
      var col={el:el,items:[],selectedIdx:0,startY:0,startScroll:0,lastY:0,lastTime:0,velocity:0,animId:null,isDragging:false,history:[]};
      cols.push(col);
      (function(c){
        c.el.addEventListener('touchstart',function(e){
          e.preventDefault();
          cancelAnim(c);
          c.isDragging=true;c.history=[];
          onStart(c,e.touches[0].clientY);
        },{passive:false});
        c.el.addEventListener('touchmove',function(e){
          e.preventDefault();
          if(!c.isDragging)return;
          onMove(c,e.touches[0].clientY);
        },{passive:false});
        c.el.addEventListener('touchend',function(e){
          e.preventDefault();
          if(!c.isDragging)return;
          c.isDragging=false;
          onEnd(c);
        },{passive:false});
        c.el.addEventListener('mousedown',function(e){e.preventDefault();
          cancelAnim(c);c.isDragging=true;c.history=[];
          onStart(c,e.clientY);
          function mm(e){e.preventDefault();onMove(c,e.clientY);}
          function mu(e){e.preventDefault();c.isDragging=false;onEnd(c);document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);}
          document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);
        });
      })(col);
    });
  }
  function cancelAnim(c){if(c.animId){cancelAnimationFrame(c.animId);c.animId=null;}}
  function onStart(c,y){
    c.startY=c.lastY=y;c.startScroll=getScroll(c);c.lastTime=Date.now();c.velocity=0;c.history=[];
  }
  function getScroll(c){
    var pad=(c.el.clientHeight-ITEM_H)/2;
    var val=parseFloat(c.el.dataset.scroll)||0;
    return val;
  }
  function setScroll(c,val){
    var maxS=c.items.length*ITEM_H-c.el.clientHeight;if(maxS<0)maxS=0;
    val=Math.max(0,Math.min(val,maxS));
    c.el.dataset.scroll=val;
    var pad=(c.el.clientHeight-ITEM_H)/2;
    c.el.scrollTop=val;
    /* 同时通过 transform 偏移内部 items */
    var inner=c.el.querySelector('.wp-col-inner');
    if(inner)inner.style.transform='translateY('+(-(val-pad))+'px)';
  }
  function onMove(c,y){
    var dy=y-c.startY;
    var newScroll=c.startScroll-dy;
    setScroll(c,newScroll);
    var now=Date.now(),dt=now-c.lastTime;
    if(dt>0){
      var v=(c.lastY-y)/dt*1000;
      c.history.push({t:now,v:v});
      if(c.history.length>5)c.history.shift();
    }
    c.lastY=y;c.lastTime=now;
    updateHighlight(c);
  }
  function onEnd(c){
    /* 取最近几次采样的平均速度 */
    if(c.history.length>=2){
      var total=0;
      for(var i=0;i<c.history.length;i++)total+=c.history[i].v;
      c.velocity=(total/c.history.length)*ACCEL;
    }else{
      var now=Date.now(),dt=now-c.lastTime;
      if(dt>0&&dt<300)c.velocity=(c.lastY-(c.lastY+c.velocity*.001))/1*ACCEL;
      else c.velocity=0;
    }
    inertiaScroll(c);
  }
  function inertiaScroll(c){
    cancelAnim(c);
    c.velocity*=FRICTION;
    if(Math.abs(c.velocity)<VELOCITY_THRESHOLD){snapToNearest(c);return;}
    var cur=getScroll(c);
    setScroll(c,cur-c.velocity*.016);
    updateHighlight(c);
    c.animId=requestAnimationFrame(function(){inertiaScroll(c);});
  }
  function snapToNearest(c){
    cancelAnim(c);
    var pad=(c.el.clientHeight-ITEM_H)/2;
    var cur=getScroll(c);
    var y=cur+pad;var idx=Math.round(y/ITEM_H);
    if(idx<0)idx=0;if(idx>=c.items.length)idx=c.items.length-1;
    var target=idx*ITEM_H-pad;
    /* 平滑动画到目标位置 */
    var start=getScroll(c),diff=target-start,startT=Date.now(),dur=200;
    function anim(){
      var elapsed=Date.now()-startT;
      var t=Math.min(1,elapsed/dur);
      /* ease-out cubic */
      t=1-Math.pow(1-t,3);
      setScroll(c,start+diff*t);
      updateHighlight(c);
      if(t<1)c.animId=requestAnimationFrame(anim);
      else{c.selectedIdx=idx;updateHighlight(c);}
    }
    anim();
  }
  function updateHighlight(c){
    var pad=(c.el.clientHeight-ITEM_H)/2;
    var y=getScroll(c)+pad;var idx=Math.round(y/ITEM_H);
    if(idx<0)idx=0;if(idx>=c.items.length)idx=c.items.length-1;
    c.selectedIdx=idx;
    for(var i=0;i<c.items.length;i++){
      c.items[i].classList.toggle('selected',i===idx);
    }
  }
  function buildCol(c,vals,curIdx){
    c.selectedIdx=Math.max(0,Math.min(curIdx,vals.length-1));
    var html='<div class="wp-col-inner"><div class="wp-padding-top"></div>';
    for(var i=0;i<vals.length;i++)html+='<div class="wp-item'+(i===c.selectedIdx?' selected':'')+'">'+vals[i]+'</div>';
    html+='<div class="wp-padding-bottom"></div></div>';
    c.el.innerHTML=html;c.items=c.el.querySelectorAll('.wp-item');
    requestAnimationFrame(function(){
      var pad=(c.el.clientHeight-ITEM_H)/2;
      var target=c.selectedIdx*ITEM_H-pad;
      c.el.dataset.scroll=target;
      c.el.scrollTop=target;
      var inner=c.el.querySelector('.wp-col-inner');
      if(inner)inner.style.transform='translateY('+(-(target-pad))+'px)';
    });
  }
  function open(years,months,curYearIdx,curMonthIdx,_cb){
    if(!overlay)init();
    onChange=_cb;
    var yearLabels=years.map(function(y){return y+'年';});
    var monthLabels=months.map(function(m){return m+'月';});
    container.querySelector('.wp-title').textContent='选择年月';
    buildCol(cols[0],yearLabels,curYearIdx);
    buildCol(cols[1],monthLabels,curMonthIdx);
    overlay.classList.add('show');container.classList.add('show');
  }
  function close(){overlay.classList.remove('show');container.classList.remove('show');}
  function confirm(){
    if(cols.length===2&&onChange)onChange(cols[0].selectedIdx,cols[1].selectedIdx);
    close();
  }
  /* 获取年份范围 */
  function getYearRange(){
    var d=load(),years=new Set();
    (d.bills||[]).forEach(function(b){var y=b.d&&b.d.substring(0,4);if(y)years.add(parseInt(y));});
    years.add(new Date().getFullYear());
    var arr=Array.from(years).sort(function(a,b){return a-b;});
    var lo=arr.length?arr[0]-1:new Date().getFullYear()-1;
    var hi=arr.length?arr[arr.length-1]+1:new Date().getFullYear()+1;
    var res=[];for(var y=lo;y<=hi;y++)res.push(y);
    return res;
  }
  /* 首页月份点击触发 select 下拉选择 */
  function syncDisplay(){
    var yb=$('wsYearBtn'),mb=$('wsMonthBtn'),sel=$('homeMonthSelect');
    if(!yb||!mb)return;
    var parts=(homeBillMonth||localMonthStr()).split('-');
    yb.textContent=parts[0]+'年';
    mb.textContent=parseInt(parts[1])+'月';
    if(sel)sel.value=homeBillMonth||localMonthStr();
  }
  var monthBlock=$('wsMonthBlock');
  var monthSelect=$('homeMonthSelect');
  if(monthBlock&&monthSelect){
    monthBlock.style.cursor='pointer';
    monthBlock.addEventListener('click',function(){
      syncDisplay();
      monthSelect.focus();
      monthSelect.click();
    });
  }
  /* 初始同步 */
  syncDisplay();
  /* 每次fillMonths后也同步 */
  var _origFill=window.fillMonths;if(_origFill){window.fillMonths=function(){_origFill();syncDisplay();};}
})();
if($('homeBillKeyword'))$('homeBillKeyword').oninput=(()=>{let t;return e=>{homeBillKeyword=e.target.value.trim();clearTimeout(t);t=setTimeout(renderHome,180);};});

/* ===== 排行页面 ===== */
var rankingType='income';
var rankingSortBy='amount';
function openRanking(type){
  rankingType=type||'income';
  rankingSortBy='amount';
  var title=document.getElementById('rankingTitle');
  if(title)title.textContent=type==='income'?'收入排行':'支出排行';
  updateRankSortBtns();
  renderRanking();
  switchPage('ranking');
}
function setRankSort(sort){
  rankingSortBy=sort;
  updateRankSortBtns();
  renderRanking();
}
function updateRankSortBtns(){
  var btnAmount=document.getElementById('rankSortAmount');
  var btnDate=document.getElementById('rankSortDate');
  if(btnAmount)btnAmount.classList.toggle('active',rankingSortBy==='amount');
  if(btnDate)btnDate.classList.toggle('active',rankingSortBy==='date');
}
function renderRanking(){
  var data=load();
  var ym=homeBillMonth||localMonthStr();
  var parts=ym.split('-');
  var monthLabel=parts[0]+'年'+parseInt(parts[1])+'月';
  var monthEl=document.getElementById('rankingMonth');
  if(monthEl)monthEl.textContent=monthLabel;
  var txs=data.txs.filter(function(t){return t.st==='normal'&&t.date&&t.date.indexOf(ym)===0&&t.type===rankingType;});
  if(!txs.length){
    var list=document.getElementById('rankingList');
    if(list)list.innerHTML='<div class="ranking-empty">暂无'+(rankingType==='income'?'收入':'支出')+'记录</div>';
    return;
  }
  var cats=data.cats||[];
  if(rankingSortBy==='amount'){
    txs.sort(function(a,b){return b.amount-a.amount;});
  }else{
    txs.sort(function(a,b){return b.date.localeCompare(a.date)||b.amount-a.amount;});
  }
  var html='';
  txs.forEach(function(t,i){
    var rankCls='ranking-rank';
    if(i===0)rankCls+=' r1';
    else if(i===1)rankCls+=' r2';
    else if(i===2)rankCls+=' r3';
    var catObj=cats.find(function(c){return c.id===t.cat;});
    var catName=catObj?(catObj.i||'')+' '+(catObj.n||''):(t.catName||'其他');
    var amtCls=rankingType==='income'?'income':'expense';
    var amtSign=rankingType==='income'?'+':'-';
    var dateParts=t.date.split('-');
    var dateStr=parseInt(dateParts[1])+'/'+parseInt(dateParts[2]);
    html+='<div class="ranking-item">'
      +'<div class="'+rankCls+'">'+(i+1)+'</div>'
      +'<div class="ranking-info">'
        +'<div class="ranking-cat">'+esc(catName)+'</div>'
        +'<div class="ranking-note">'+esc(t.desc||'')+'</div>'
      +'</div>'
      +'<div class="ranking-right">'
        +'<div class="ranking-amount '+amtCls+'">'+amtSign+Number(t.amount).toFixed(2)+'</div>'
        +'<div class="ranking-date">'+dateStr+'</div>'
      +'</div>'
    +'</div>';
  });
  var list=document.getElementById('rankingList');
  if(list)list.innerHTML=html;
}

/* 首页收入支出点击跳转排行 */
var wsIncome=document.getElementById('wIncome2');
var wsExpense=document.getElementById('wExpense2');
if(wsIncome)wsIncome.parentElement.style.cursor='pointer';
if(wsExpense)wsExpense.parentElement.style.cursor='pointer';
if(wsIncome)wsIncome.parentElement.addEventListener('click',function(){openRanking('income');});
if(wsExpense)wsExpense.parentElement.addEventListener('click',function(){openRanking('expense');});

['advStart','advEnd','advMin','advMax','advAcc','advTag','advStatus','advSource','advDup'].forEach(id=>{if($(id))$(id).onchange=renderBills});
$('advancedFilterBtn').onclick=()=>{$('advancedFilterPanel').classList.toggle('hide');renderBills();};
$('pendingOnlyBtn').onclick=()=>{pendingOnly=!pendingOnly;$('pendingOnlyBtn').classList.toggle('active',pendingOnly);renderBills();};
$('largeOnlyBtn').onclick=()=>{largeOnly=!largeOnly;$('largeOnlyBtn').classList.toggle('active',largeOnly);renderBills();};
$('splitWorkbenchBtn').onclick=()=>{splitWorkbenchOn=!splitWorkbenchOn;$('splitWorkbenchBtn').classList.toggle('active',splitWorkbenchOn);renderBills();};
$('clearBillFiltersBtn').onclick=()=>clearBillFilters(true);
if($('batchApplyBtn'))$('batchApplyBtn').onclick=()=>applyBatchEdit('apply');
if($('batchPendingBtn'))$('batchPendingBtn').onclick=()=>applyBatchEdit('pending');
if($('batchDeleteBtn'))$('batchDeleteBtn').onclick=()=>applyBatchEdit('delete');
if($('quickEntryBtn'))$('quickEntryBtn').onclick=quickEntry;
if($('quickEntryInput'))$('quickEntryInput').addEventListener('keydown',e=>{if(e.key==='Enter')quickEntry();});

/* ========== 导入鲨鱼记账数据 ========== */
$('setImport').onclick=()=>{$('importFile').click();};
$('importFile').onchange=function(){
  const file=this.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=function(e){
    try{
      const buf=e.target.result;
      const text=decodeImportBuffer(buf);
      pendingImportText=text;
      const preview=importSharkCSV(text,true);
      showImportPreview(preview);
    }catch(err){
      toast('导入失败：'+err.message);
    }
  };
  reader.readAsArrayBuffer(file);
  this.value='';
};
function decodeImportBuffer(buf){
  const u8=new Uint8Array(buf);
  if(u8[0]===0xff&&u8[1]===0xfe)return new TextDecoder('utf-16le').decode(buf).replace(/^\uFEFF/,'');
  if(u8[0]===0xfe&&u8[1]===0xff){
    const swapped=new Uint8Array(u8.length-2);
    for(let i=2;i+1<u8.length;i+=2){swapped[i-2]=u8[i+1];swapped[i-1]=u8[i];}
    return new TextDecoder('utf-16le').decode(swapped).replace(/^\uFEFF/,'');
  }
  let text=new TextDecoder('utf-8').decode(buf);
  const firstLine=(text.split(/\r?\n/)[0]||'');
  if(text.includes('�')||!/日期|时间|金额|类型|收支|分类|类别/.test(firstLine)){
    try{text=new TextDecoder('gb18030').decode(buf);}catch(_){}
  }
  return text.replace(/^\uFEFF/,'');
}
function showImportPreview(preview){
  $('importPreviewBody').innerHTML=`
    <div class="insight-card ${preview.duplicates?'warn':'good'}">
      <div class="insight-title">识别到 ${preview.count} 条记录</div>
      <div class="insight-desc">收入 ${fmt(preview.income)}，支出 ${fmt(preview.expense)}。${preview.duplicates?`发现 ${preview.duplicates} 条可能重复，确认导入时会自动跳过。`:'未发现明显重复。'}</div>
    </div>
    <div class="list-card" style="max-height:280px;overflow:auto">
      ${preview.rows.slice(0,20).map(r=>`<div class="tx-item${r.duplicate?' selected':''}">
        <div class="tx-main"><div class="tx-title">${r.duplicate?'⚠️ 可能重复 · ':''}${esc(r.date)} · ${esc(TYPE_MAP[r.type])} · ${esc(r.catName)}</div><div class="tx-sub">${esc(r.desc||'无备注')} ${r.accName?`· ${esc(r.accName)}`:''}</div></div>
        <div class="tx-amount ${r.type==='income'?'income':'expense'}">${r.type==='income'?'+':'-'}${fmt(r.amount).replace(/[+-]/,'')}</div>
      </div>`).join('')}
      ${preview.count>20?`<div class="empty" style="padding:16px">仅预览前 20 条</div>`:''}
    </div>`;
  $('importPreviewModal').classList.add('show');
}

$('importPreviewClose').onclick=()=>{$('importPreviewModal').classList.remove('show');pendingImportText='';};
$('importPreviewModal').onclick=e=>{if(e.target===$('importPreviewModal'))$('importPreviewClose').click();};
$('importPreviewConfirm').onclick=()=>{
  if(!pendingImportText){toast('没有待导入文件');return}
  try{
    const result=importSharkCSV(pendingImportText,false);
    $('importPreviewModal').classList.remove('show');
    pendingImportText='';
    refreshAllViews();
    toast('成功导入 '+result.count+' 条记录');
  }catch(err){toast('导入失败：'+err.message);}
};

function importSharkCSV(text,preview=false){
  const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(l=>l.trim());
  if(lines.length<1)throw new Error('文件为空');
  const rows=lines.map(line=>parseAnySeparatedLine(line));
  let headerRow=-1, idx=null;
  for(let i=0;i<Math.min(rows.length,12);i++){
    const header=rows[i].map(h=>normalizeHeader(cleanCell(h)));
    const candidate={
      date:findHeader(header,['日期','时间','交易时间','记账时间','记账日期']),
      type:findHeader(header,['收支类型','类型','收支','账目类型']),
      cat:findHeader(header,['类别','分类','一级分类','收支分类']),
      subcat:findHeader(header,['子类别','二级分类','项目','明细分类']),
      amount:findHeader(header,['金额','金额元','收入金额','支出金额']),
      account:findHeader(header,['账户','账户名称','支付账户','钱包','支付方式']),
      note:findHeader(header,['备注','说明','描述','商家','账单备注'])
    };
    if(candidate.date>=0&&candidate.amount>=0){headerRow=i;idx=candidate;break;}
  }
  // 兜底：截图所示鲨鱼记账格式常见为：日期、收支类型、类别、金额、备注
  if(!idx){
    idx={date:0,type:1,cat:2,subcat:-1,amount:3,account:-1,note:4};
    headerRow=parseSharkDate(cleanCell(rows[0][0]))? -1 : 0;
  }
  // 鲨鱼记账CSV常见列：交易时间,分类,子分类,金额,账户,备注
  // 也兼容截图中的：日期、收支类型、类别、金额、备注
  const d=preview?normalizeData(JSON.parse(JSON.stringify(load()))):load();
  const existing=load().txs.filter(t=>t.st==='normal');
  let imported=0,income=0,expense=0,duplicates=0;
  const previewRows=[];
  for(let i=headerRow+1;i<rows.length;i++){
    const cols=rows[i].map(c=>cleanCell(c));
    if(cols.length<3)continue;
    const date=parseSharkDate(cols[idx.date]);
    const amount=Math.abs(parseMoney(cols[idx.amount]));
    if(!date)continue;
    if(amount<=0)continue;
    const rawType=(idx.type>=0?cols[idx.type]:'')+' '+cols.join(' ');
    let type=/收入|入账|转入|退款|报销|奖金|工资|红包|利息/.test(rawType)?'income':'expense';
    if(/支出|消费|付款|转出|还款/.test(rawType))type='expense';
    const signedAmount=parseMoney(cols[idx.amount]);
    if(signedAmount<0)type='expense';
    const note=idx.note>=0?cols[idx.note]:'';
    const ruledCat=matchPresetAutoCat(d,note,type)||matchAutoRule(d,note,type);
    const catName=ruledCat?.n||cols[idx.subcat]||cols[idx.cat]||(type==='income'?'其他收入':'其他支出');
    const accName=idx.account>=0?cols[idx.account]:'';
    const catId=ruledCat?.id||ensureImportCategory(d,catName,type);
    const accId=ensureImportAccount(d,accName);
    if(isDuplicateTx(existing,{date,type,amount,desc:note})){
      duplicates++;
      previewRows.push({date,type,amount,desc:note,catName,accName,duplicate:true});
      if(!preview)continue;
    }
    d.txs.push({id:genId(),type,amount,acc:accId,date,time:'00:00',desc:note,cat:catId,st:'normal',source:'shark',balApplied:false});
    if(type==='income')income+=amount;
    if(type==='expense')expense+=amount;
    if(!previewRows[previewRows.length-1]?.duplicate)previewRows.push({date,type,amount,desc:note,catName,accName,duplicate:false});
    imported++;
  }
  if(imported===0&&duplicates===0)throw new Error('未识别到有效记录');
  if(preview)return {count:imported,income,expense,rows:previewRows,duplicates};
  save(d);data=d;
  return {count:imported,income,expense,rows:previewRows,duplicates};
}

function matchPresetAutoCat(d,desc,type){
  if(type!=='expense'&&type!=='income')return null;
  const text=String(desc||'');
  const rules=PRESET_AUTO_CAT_KEYWORDS[type]||[];
  for(const r of rules){
    if(r.kw.some(k=>text.includes(k))){
      const cat=d.cats.find(c=>{
        if(c.t!==type)return false;
        const displayName=c.mobileName||c.n;
        return displayName===r.catName||c.n===r.catName||c.n.includes(r.catName)||r.catName.includes(c.n);
      });
      if(cat)return cat;
    }
  }
  return null;
}

function matchAmountAutoCat(d,amount,type){
  if(type!=='expense'&&type!=='income')return null;
  const amt=parseFloat(amount);
  if(!Number.isFinite(amt))return null;
  // 优先读取用户自定义金额规则
  const customRules=(d.settings?.amountRules||[]).filter(r=>r.type===type);
  for(const r of customRules){
    if(Math.abs(parseFloat(r.amount)-amt)<0.01){
      const cat=d.cats.find(c=>String(c.id)===String(r.cat));
      if(cat)return{cat,note:r.note||''};
    }
  }
  // 预设规则兜底
  let catName=null,note='';
  if(Math.abs(amt-1.8)<0.01){catName='交通';note='公交';}
  else if(Math.abs(amt-4)<0.01||Math.abs(amt-7.2)<0.01){catName='交通';note='地铁';}
  else if(Math.abs(amt-50)<0.01){catName='生活';note='话费';}
  if(!catName)return null;
  const cat=d.cats.find(c=>{
    if(c.t!==type)return false;
    const displayName=c.mobileName||c.n;
    return displayName===catName||c.n===catName||c.n.includes(catName)||catName.includes(c.n);
  });
  return cat?{cat,note}:null;
}

function applyAutoCat(cat){
  if(!cat||selCat===cat.id)return;
  selCat=cat.id;
  document.querySelectorAll('.cat-pill').forEach(x=>x.classList.remove('active'));
  const pill=$('catPills').querySelector(`.cat-pill[data-id="${cat.id}"]`);
  if(pill){pill.classList.add('active');pill.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});}
  renderQuickNotes(txType);
}

function matchAutoRule(d,desc,type){
  const text=String(desc||'').toLowerCase();
  const rule=(d.rules||[]).find(r=>r.type===type&&r.kw&&text.includes(String(r.kw).toLowerCase()));
  return rule?d.cats.find(c=>String(c.id)===String(rule.cat)):null;
}

function findAliasHits(d,text){
  const s=String(text||'').toLowerCase();
  return (d.settings?.noteAliasRules||[]).filter(r=>{
    const terms=[r.target,...(r.aliases||[])].map(x=>String(x||'').toLowerCase()).filter(Boolean);
    return terms.some(t=>s.includes(t));
  });
}

function testRuleMatch(){
  const text=$('ruleTestInput')?.value?.trim();
  if(!text){toast('请输入测试备注');return;}
  const d=load();
  const type=$('ruleTestType')?.value||'expense';
  const cat=matchPresetAutoCat(d,text,type)||matchAutoRule(d,text,type)||d.cats.find(c=>c.t===type&&text.includes(c.n));
  const aliasHits=findAliasHits(d,text);
  const tagHits=(d.tags||[]).filter(t=>text.includes(t.n));
  const amount=parseMoney(text);
  $('ruleTestResult').innerHTML=`
    <div><b>测试内容：</b>${esc(text)}${amount?` · 金额 ${fmt(amount)}`:''}</div>
    <div><b>匹配分类：</b>${cat?esc(cat.i+' '+cat.n):'未匹配，新增账单时会进入待整理或使用默认分类'}</div>
    <div><b>匹配别名：</b>${aliasHits.length?aliasHits.map(r=>`${esc(r.target)} ← ${esc((r.aliases||[]).join('、'))}`).join('；'):'未命中别名规则'}</div>
    <div><b>匹配标签：</b>${tagHits.length?tagHits.map(t=>esc(t.n)).join('、'):'未命中标签'}</div>`;
}

function isDuplicateTx(list,t){
  const desc=String(t.desc||'').replace(/\s+/g,'');
  return list.some(x=>x.type===t.type&&x.date===t.date&&Math.abs((parseFloat(x.amount)||0)-t.amount)<0.01&&similarText(String(x.desc||'').replace(/\s+/g,''),desc)>=0.72);
}

function similarText(a,b){
  if(!a&&!b)return 1;
  if(!a||!b)return 0;
  if(a===b)return 1;
  const short=a.length<b.length?a:b,long=a.length>=b.length?a:b;
  let hit=0;for(const ch of short){if(long.includes(ch))hit++;}
  return hit/Math.max(long.length,1);
}
function cleanCell(v){return String(v==null?'':v).replace(/^\uFEFF/,'').trim().replace(/^"|"$/g,'')}
function normalizeHeader(v){return cleanCell(v).replace(/\s/g,'').replace(/[()（）【】\[\]:：]/g,'')}
function parseAnySeparatedLine(line){
  const comma=parseCsvLine(line,',');
  const tab=parseCsvLine(line,'\t');
  const semi=parseCsvLine(line,';');
  return [comma,tab,semi].sort((a,b)=>b.length-a.length)[0];
}
function parseCsvLine(line,sep){
  const out=[];let cur='',q=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"'&&line[i+1]==='"'){cur+='"';i++;continue}
    if(ch==='"'){q=!q;continue}
    if(ch===sep&&!q){out.push(cur);cur='';continue}
    cur+=ch;
  }
  out.push(cur);return out;
}
function findHeader(headers,names){return headers.findIndex(h=>names.some(n=>h===n||h.includes(n)))}
function parseMoney(v){
  const s=String(v||'').replace(/,/g,'').replace(/[￥¥元\s]/g,'');
  const n=parseFloat(s.replace(/[^0-9.\-]/g,''));
  return isNaN(n)?0:n;
}
function parseSharkDate(v){
  const s=String(v||'').trim();
  let m=s.match(/(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/);
  if(m)return `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`;
  m=s.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if(m)return `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`;
  m=s.match(/^(\d{4})(\d{2})(\d{2})$/);
  if(m)return `${m[1]}-${m[2]}-${m[3]}`;
  return '';
}
function ensureImportCategory(d,name,type){
  const clean=name||(type==='income'?'其他收入':'其他支出');
  const found=d.cats.find(c=>c.t===type&&(c.n===clean||clean.includes(c.n)||c.n.includes(clean)));
  if(found)return found.id;
  const id=Math.max(0,...d.cats.map(c=>parseInt(c.id)||0))+1;
  d.cats.push({id,n:clean,t:type,i:type==='income'?'💰':'📦',c:type==='income'?'#f43f5e':'#10b981'});
  return id;
}
function ensureImportAccount(d,name){
  if(!name)return (d.accs.find(a=>a.ac)||d.accs[0]).id;
  const found=d.accs.find(a=>a.n===name);
  if(found)return found.id;
  const id=genId();
  d.accs.push({id,n:name,t:'custom',b:0,ib:0,ac:1});
  return id;
}

function runCategoryCleanupMigration(){
  const d=load();
  d.settings=d.settings||{};
  const clean=s=>String(s||'').replace(/\s+/g,'').trim();
  const findCat=name=>d.cats.find(c=>c.t==='expense'&&c.ac!==0&&clean(c.n)===clean(name));
  const findCatAny=names=>names.map(findCat).find(Boolean);
  const allOldNames=['房租','话费','充话费','充值费','互联网','线上网购','零食','零食饮料','数码','姐姐','何美玲','长辈','公司消费','公司/报销','立减金','羊毛支出','彩栗','彩票','优惠活动','每月杂钱','理发💇‍♀️','理发','个人护理','人情','社交','学习','医疗'];
  const hasPendingOld=allOldNames.some(n=>{const c=findCat(n);return c&&c.ac!==0;});
  const noPendingAfterMigrated=d.settings.categoryCleanupV1&&!hasPendingOld;
  try{localStorage.setItem(STORE+'_category_cleanup_backup_v1',JSON.stringify(d));}catch(e){}
  const ensureCat=(name,icon,color,fromCat)=>{
    let cat=findCat(name);
    if(cat){cat.ac=1;return cat;}
    const id=Math.max(0,...d.cats.map(c=>parseInt(c.id)||0))+1;
    cat={id,n:name,t:'expense',i:icon||(fromCat?.i)||'📦',c:color||(fromCat?.c)||'#10b981',budget:fromCat?.budget||0,ac:1};
    d.cats.push(cat);
    return cat;
  };
  const appendRemark=(tx,remark)=>{
    if(!remark)return;
    const note=`原分类：${remark}`;
    tx.desc=String(tx.desc||'').trim();
    if(!tx.desc.includes(note))tx.desc=tx.desc?`${tx.desc}（${note}）`:note;
  };
  const remarkNames=['线上网购','姐姐','何美玲','长辈','公司消费','公司/报销','立减金','羊毛支出','彩栗','彩票','优惠活动','每月杂钱'];
  let tagRemarkFixes=0;
  d.txs.forEach(tx=>{
    if(!Array.isArray(tx.tags))return;
    const moved=tx.tags.filter(t=>remarkNames.includes(t));
    moved.forEach(t=>appendRemark(tx,t));
    if(moved.length){
      tx.tags=tx.tags.filter(t=>!remarkNames.includes(t));
      tagRemarkFixes++;
    }
  });
  if(noPendingAfterMigrated&&!tagRemarkFixes)return {changed:false,skipped:true};
  const rules=[
    {old:['房租'],target:'住房',icon:'🏠',color:'#f59e0b'},
    {old:['话费','充话费','充值费','互联网'],target:'通讯网络',icon:'📶',color:'#06b6d4'},
    {old:['线上网购'],target:'购物',icon:'🛍️',color:'#8b5cf6',remarkOld:true},
    {old:['数码'],target:'数码电子',icon:'📱',color:'#06b6d4'},
    {old:['零食','零食饮料'],target:'餐饮',icon:'🍜',color:'#f43f5e'},
    {old:['姐姐','何美玲','长辈'],target:'家庭亲友',icon:'👪',color:'#ec4899',remarkOld:true},
    {old:['公司消费','公司/报销'],target:'其他',icon:'📦',color:'#94a3b8',remarkOld:true},
    {old:['立减金','羊毛支出','彩栗','彩票','优惠活动'],target:'其他',icon:'📦',color:'#94a3b8',remarkOld:true},
    {old:['每月杂钱'],target:'其他',icon:'📦',color:'#94a3b8',remarkOld:true},
    {old:['理发💇‍♀️','理发','个人护理'],target:'生活',icon:'🏡',color:'#14b8a6'},
    {old:['人情社交','社交'],target:'人情',icon:'🎁',color:'#f97316'},
    {old:['学习成长'],target:'学习',icon:'📚',color:'#8b5cf6'},
    {old:['医疗健康'],target:'医疗',icon:'🏥',color:'#10b981'},
    {old:['日用'],target:'生活',icon:'🏡',color:'#14b8a6'}
  ];
  const oldToNew=new Map(), oldToRemark=new Map();
  let affectedCats=0, affectedTxs=0, createdCats=0, createdTags=0;
  rules.forEach(rule=>{
    const oldCats=rule.old.map(findCat).filter(Boolean);
    if(!oldCats.length)return;
    const beforeCats=d.cats.length;
    const target=ensureCat(rule.target,rule.icon,rule.color,oldCats[0]);
    if(d.cats.length>beforeCats)createdCats++;
    oldCats.forEach(old=>{
      oldToNew.set(String(old.id),target.id);
      if(rule.remarkOld)oldToRemark.set(String(old.id),old.n);
      if(String(old.id)!==String(target.id)){
        target.budget=+(Number(target.budget||0)+Number(old.budget||0)).toFixed(2);
        old.ac=0;
      }
      affectedCats++;
    });
  });
  d.txs.forEach(tx=>{
    const key=String(tx.cat);
    if(oldToNew.has(key)){
      tx.cat=oldToNew.get(key);
      appendRemark(tx,oldToRemark.get(key));
      affectedTxs++;
    }
  });
  d.settings.categoryCleanupV1={time:new Date().toISOString(),affectedCats,affectedTxs,createdCats,createdTags,backupKey:STORE+'_category_cleanup_backup_v1'};
  logAction(d,'分类整理迁移',`迁移 ${affectedTxs} 笔账单，整理 ${affectedCats} 个分类`);
  save(d);data=d;
  return {changed:true,affectedCats,affectedTxs,createdCats,createdTags};
}

function runDiscountBalanceMigration(){
  const d=load();
  d.settings=d.settings||{};
  if(d.settings.discountBalanceFixed)return {changed:false};
  let affected=0;
  d.txs.forEach(tx=>{
    if(tx.source==='discount'&&tx.balApplied===true){
      // 回滚优惠对余额的影响（优惠不应计入余额，已在实付金额中体现）
      const acc=d.accs.find(a=>String(a.id)===String(tx.acc));
      if(acc&&tx.type==='income'){
        acc.b=+(acc.b-parseFloat(tx.amount)).toFixed(2);
      }
      tx.balApplied=false;
      affected++;
    }
  });
  if(affected>0){
    d.settings.discountBalanceFixed={time:new Date().toISOString(),affected};
    logAction(d,'优惠余额修正',`修正 ${affected} 笔优惠记录的余额影响`);
    save(d);data=d;
  }else{
    d.settings.discountBalanceFixed={time:new Date().toISOString(),affected:0};
    save(d);data=d;
  }
  return {changed:affected>0,affected};
}

function editBudget(){
  const d=load();
  $('budgetInput').value=d.budget||0;
  $('budgetModal').classList.add('show');
  setTimeout(()=>$('budgetInput').focus(),0);
}

function closeBudgetModal(){
  $('budgetModal').classList.remove('show');
}

function saveBudgetFromModal(){
  const d=load();
  const n=parseFloat(String($('budgetInput').value).replace(/[^0-9.]/g,''));
  if(isNaN(n)||n<0){toast('请输入有效预算金额');return}
  d.budget=+n.toFixed(2);
  save(d);data=d;renderHome();closeBudgetModal();toast('月预算已更新');
}

function editCategoryBudget(){
  const d=load();
  const cats=d.cats.filter(c=>c.t==='expense');
  const list=cats.map((c,i)=>`${i+1}. ${c.i} ${c.n}（当前 ${fmt(c.budget||0)}）`).join('\n');
  const pick=prompt('选择要设置预算的分类编号：\n'+list);
  if(pick===null)return;
  const cat=cats[parseInt(pick,10)-1];
  if(!cat){toast('分类编号不存在');return}
  const val=prompt(`请输入「${cat.n}」每月预算，填 0 可取消：`, cat.budget||0);
  if(val===null)return;
  const n=parseFloat(String(val).replace(/[^0-9.]/g,''));
  if(isNaN(n)||n<0){toast('请输入有效预算金额');return}
  cat.budget=+n.toFixed(2);
  save(d);data=d;
  renderStats();renderHome();
  toast(`${cat.n}预算已更新`);
}

function renderRuleManager(){
  if(!$('ruleList'))return;
  const d=load();
  const cats=d.cats.filter(c=>c.ac!==0);
  $('ruleCat').innerHTML=cats.map(c=>`<option value="${c.id}" data-type="${c.t}">${esc(c.i+' '+c.n)}</option>`).join('');
  const type=$('ruleType').value;
  const first=cats.find(c=>c.t===type);
  if(first)$('ruleCat').value=first.id;
  $('ruleList').innerHTML=(d.rules||[]).map(r=>{
    const c=d.cats.find(x=>String(x.id)===String(r.cat));
    return `<div class="rule-row">
      <input value="${esc(r.kw)}" data-rule-kw="${r.id}">
      <select data-rule-cat="${r.id}">${cats.filter(c=>c.t===r.type).map(c=>`<option value="${c.id}"${String(c.id)===String(r.cat)?' selected':''}>${esc(c.i+' '+c.n)}</option>`).join('')}</select>
      <select data-rule-type="${r.id}"><option value="expense"${r.type==='expense'?' selected':''}>支出</option><option value="income"${r.type==='income'?' selected':''}>收入</option></select>
      <button data-del-rule="${r.id}">删除</button>
    </div>`;
  }).join('')||'<div class="empty" style="padding:16px">还没有规则</div>';
  $('ruleList').querySelectorAll('[data-del-rule]').forEach(b=>b.onclick=()=>{const d=load();d.rules=d.rules.filter(r=>String(r.id)!==String(b.dataset.delRule));save(d);data=d;renderRuleManager();toast('规则已删除');});
  $('ruleList').querySelectorAll('[data-rule-kw],[data-rule-cat],[data-rule-type]').forEach(el=>el.onchange=()=>updateRuleFromEl(el));
}

function updateRuleFromEl(el){
  const id=el.dataset.ruleKw||el.dataset.ruleCat||el.dataset.ruleType;
  const d=load(),r=(d.rules||[]).find(x=>String(x.id)===String(id));if(!r)return;
  const row=el.closest('.rule-row');
  r.kw=row.querySelector('[data-rule-kw]').value.trim();
  r.type=row.querySelector('[data-rule-type]').value;
  r.cat=parseInt(row.querySelector('[data-rule-cat]').value);
  save(d);data=d;renderRuleManager();toast('规则已更新');
}

function addAutoRule(){
  const kw=$('ruleKeyword').value.trim();
  if(!kw){toast('请输入关键词');return}
  const d=load();
  d.rules=d.rules||[];
  d.rules.push({id:genId(),kw,type:$('ruleType').value,cat:parseInt($('ruleCat').value)});
  save(d);data=d;$('ruleKeyword').value='';renderRuleManager();toast('规则已添加');
}

function renderAmountRuleManager(){
  if(!$('amountRuleList'))return;
  const d=load();
  const cats=d.cats.filter(c=>c.ac!==0&&(c.t==='expense'||c.t==='income'));
  $('amountRuleCat').innerHTML=cats.map(c=>`<option value="${c.id}" data-type="${c.t}">${esc(c.i+' '+c.n)}</option>`).join('');
  const rules=(d.settings?.amountRules||[]);
  $('amountRuleList').innerHTML=rules.map(r=>{
    const c=d.cats.find(x=>String(x.id)===String(r.cat));
    return `<div class="rule-row">
      <div style="flex:0.8;font-size:13px;font-weight:800">${parseFloat(r.amount).toFixed(r.amount%1===0?0:2)}</div>
      <div style="flex:1;font-size:13px">${esc(r.note||'')}</div>
      <div style="flex:1;font-size:13px">${esc(c?c.i+' '+c.n:'未知分类')}</div>
      <button data-del-amount-rule="${r.id}" style="flex:0.5">删除</button>
    </div>`;
  }).join('')||'<div class="empty" style="padding:16px">还没有金额规则</div>';
  $('amountRuleList').querySelectorAll('[data-del-amount-rule]').forEach(b=>b.onclick=()=>{
    const d=load();d.settings=d.settings||{};d.settings.amountRules=(d.settings.amountRules||[]).filter(r=>String(r.id)!==String(b.dataset.delAmountRule));
    save(d);data=d;renderAmountRuleManager();toast('规则已删除');
  });
}

function addAmountRule(){
  const amount=parseFloat($('amountRuleVal').value);
  if(!Number.isFinite(amount)||amount<=0){toast('请输入有效金额');return}
  const note=$('amountRuleNote').value.trim();
  if(!note){toast('请输入自动备注');return}
  const cat=$('amountRuleCat').value;
  if(!cat){toast('请选择分类');return}
  const d=load();
  d.settings=d.settings||{};
  d.settings.amountRules=d.settings.amountRules||[];
  const catObj=d.cats.find(c=>String(c.id)===String(cat));
  const type=catObj?.t||'expense';
  d.settings.amountRules.push({id:genId(),amount:+amount.toFixed(2),note,cat, type});
  // 同步添加自动分类规则
  d.rules=d.rules||[];
  const exists=d.rules.some(r=>r.kw===note&&String(r.cat)===String(cat)&&r.type===type);
  if(!exists){d.rules.push({id:genId(),kw:note,type,cat:parseInt(cat)});}
  save(d);data=d;
  $('amountRuleVal').value='';$('amountRuleNote').value='';
  renderAmountRuleManager();renderRuleManager();toast('金额规则已添加');
}

function renderBillEnhanceSettings(){
  if(!$('largeExpenseInput'))return;
  const d=load();
  $('largeExpenseInput').value=largeExpenseThreshold(d);
}

function saveLargeExpenseThreshold(){
  const n=parseFloat($('largeExpenseInput').value);
  if(isNaN(n)||n<0){toast('请输入有效金额');return}
  const d=load();
  d.settings=d.settings||{};
  d.settings.largeExpenseThreshold=+n.toFixed(2);
  save(d);data=d;
  renderBills();
  toast('大额支出阈值已保存');
}

function renderAliasManager(){
  if(!$('aliasRuleList'))return;
  const d=load();
  const rules=d.settings?.noteAliasRules||[];
  $('aliasRuleList').innerHTML=rules.map(r=>`<div class="rule-row alias-row">
    <input value="${esc(r.target||'')}" data-alias-target="${r.id}">
    <input value="${esc((r.aliases||[]).join('、'))}" data-alias-words="${r.id}">
    <button data-del-alias="${r.id}">删除</button>
  </div>`).join('')||'<div class="empty" style="padding:16px">还没有备注别名规则</div>';
  $('aliasRuleList').querySelectorAll('[data-del-alias]').forEach(btn=>btn.onclick=()=>{
    const d=load();d.settings=d.settings||{};d.settings.noteAliasRules=(d.settings.noteAliasRules||[]).filter(r=>String(r.id)!==String(btn.dataset.delAlias));
    save(d);data=d;renderAliasManager();renderBills();toast('别名规则已删除');
  });
  $('aliasRuleList').querySelectorAll('[data-alias-target],[data-alias-words]').forEach(el=>el.onchange=()=>updateAliasRule(el));
}

function updateAliasRule(el){
  const id=el.dataset.aliasTarget||el.dataset.aliasWords;
  const d=load();
  const r=(d.settings?.noteAliasRules||[]).find(x=>String(x.id)===String(id));
  if(!r)return;
  const row=el.closest('.alias-row');
  r.target=row.querySelector('[data-alias-target]').value.trim();
  r.aliases=row.querySelector('[data-alias-words]').value.split(/[、,，\s]+/).map(x=>x.trim()).filter(Boolean);
  save(d);data=d;renderAliasManager();renderBills();toast('别名规则已更新');
}

function addAliasRule(){
  const target=$('aliasTargetInput').value.trim();
  const aliases=$('aliasWordsInput').value.split(/[、,，\s]+/).map(x=>x.trim()).filter(Boolean);
  if(!target||!aliases.length){toast('请填写统一名称和别名');return}
  const d=load();
  d.settings=d.settings||{};
  d.settings.noteAliasRules=d.settings.noteAliasRules||[];
  d.settings.noteAliasRules.push({id:genId(),target,aliases});
  save(d);data=d;
  $('aliasTargetInput').value='';
  $('aliasWordsInput').value='';
  renderAliasManager();
  renderBills();
  toast('别名规则已添加');
}

function renderTagManager(){
  if(!$('tagList'))return;
  const d=load();
  $('tagList').innerHTML=(d.tags||[]).map(t=>`<div class="rule-row">
    <input value="${esc(t.n)}" data-tag-name="${t.id}">
    <select data-tag-kind="${t.id}"><option value="normal"${t.k==='normal'?' selected':''}>普通</option><option value="need"${t.k==='need'?' selected':''}>必要支出</option><option value="want"${t.k==='want'?' selected':''}>可选支出</option><option value="project"${t.k==='project'?' selected':''}>项目</option></select>
    <button data-del-tag="${t.id}">删除</button><div></div>
  </div>`).join('')||'<div class="empty" style="padding:16px">暂无标签</div>';
  $('tagList').querySelectorAll('[data-del-tag]').forEach(b=>b.onclick=()=>{const d=load();d.tags=d.tags.filter(t=>String(t.id)!==String(b.dataset.delTag));save(d);data=d;renderTagManager();toast('标签已删除');});
  $('tagList').querySelectorAll('[data-tag-name],[data-tag-kind]').forEach(el=>el.onchange=()=>{const id=el.dataset.tagName||el.dataset.tagKind;const d=load();const t=d.tags.find(x=>String(x.id)===String(id));if(!t)return;const row=el.closest('.rule-row');t.n=row.querySelector('[data-tag-name]').value.trim();t.k=row.querySelector('[data-tag-kind]').value;save(d);data=d;renderTagManager();});
}

function addTag(){
  const n=$('tagNameInput').value.trim();if(!n){toast('请输入标签名');return}
  const d=load();d.tags=d.tags||[];d.tags.push({id:genId(),n,k:$('tagKindInput').value});logAction(d,'新增标签',n);save(d);data=d;$('tagNameInput').value='';renderTagManager();toast('标签已添加');
}

function renderHomeIndicatorSettings(){
  const box=$('homeIndicatorSettings');
  if(!box)return;
  const defaultIndicators=['wallet','networth','calendar','toprank','monthInsight','persona'];
  const indicatorList=[
    {key:'wallet',name:'钱包卡片（本月结余）',icon:'💰'},
    {key:'networth',name:'净资产（总资产/总负债）',icon:'💎'},
    {key:'calendar',name:'日历',icon:'📅'},
    {key:'toprank',name:'支出排行',icon:'🔥'},
    {key:'monthInsight',name:'月度洞察',icon:'💡'},
    {key:'persona',name:'消费人格',icon:'🏷️'}
  ];
  const d=load();
  const current=d.settings.homeIndicators&&d.settings.homeIndicators.length?d.settings.homeIndicators:defaultIndicators;
  box.innerHTML=indicatorList.map(ind=>{
    const checked=current.includes(ind.key);
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;font-size:13px;color:var(--text-secondary);font-weight:800">
      <span>${ind.icon} ${ind.name}</span>
      <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer">
        <input type="checkbox" data-home-ind="${ind.key}" ${checked?'checked':''} style="opacity:0;width:0;height:0">
        <span style="position:absolute;inset:0;background:${checked?'var(--primary)':'var(--border)'};border-radius:999px;transition:.3s"></span>
        <span style="position:absolute;top:2px;left:${checked?'22px':'2px'};width:20px;height:20px;background:#fff;border-radius:50%;transition:.3s;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span>
      </label>
    </div>`;
  }).join('');
  box.querySelectorAll('[data-home-ind]').forEach(cb=>{
    cb.onchange=()=>{
      const d2=load();d2.settings=d2.settings||{};
      d2.settings.homeIndicators=defaultIndicators.filter(k=>box.querySelector(`[data-home-ind="${k}"]`)?.checked);
      save(d2);data=d2;
      // 刷新开关样式
      renderHomeIndicatorSettings();
      // 刷新首页
      renderHome();
      toast('首页指标设置已保存');
    };
  });
}

function renderColumnSettings(){
  if(!$('columnSettings'))return;
  const d=load();d.settings=d.settings||{};
  const cols=d.settings.billColumns||DEFAULT_COLUMNS;
  const names={date:'日期',type:'类型',cat:'分类',acc:'账户',amount:'金额',desc:'备注',tags:'标签',status:'状态',source:'来源'};
  $('columnSettings').innerHTML=Object.entries(names).map(([k,n])=>`<label style="display:inline-flex;align-items:center;gap:6px;margin:6px 12px 6px 0;font-size:12px;color:var(--text-secondary);font-weight:800"><input type="checkbox" data-col-set="${k}" ${cols.includes(k)?'checked':''}> ${n}</label>`).join('');
  $('columnSettings').querySelectorAll('[data-col-set]').forEach(ch=>ch.onchange=()=>{
    const d=load();let cols=d.settings.billColumns||DEFAULT_COLUMNS;cols=ch.checked?[...new Set([...cols,ch.dataset.colSet])]:cols.filter(c=>c!==ch.dataset.colSet);
    d.settings.billColumns=cols.length?cols:[...DEFAULT_COLUMNS];save(d);data=d;renderBills();
  });
}

function renderDataTools(){
  const d=load();
  if($('healthPanel')){
    const normal=d.txs.filter(t=>t.st==='normal'),uncat=normal.filter(t=>!t.cat).length,noacc=normal.filter(t=>!t.acc&&t.type!=='transfer').length,pending=normal.filter(t=>t.status==='pending').length,dups=countLikelyDuplicatesFast(normal);
    const score=Math.max(0,100-uncat*3-noacc*3-pending*2-dups*4);
    $('healthPanel').innerHTML=`<div class="health-score">${score}</div><div class="insight-desc">数据健康分。未分类 ${uncat} 笔，无账户 ${noacc} 笔，待整理 ${pending} 笔，疑似重复 ${dups} 笔。</div><div class="mini-action-row"><button onclick="pendingOnly=true;switchPage('bills');renderBills()">整理问题账单</button><button onclick="exportBackup()">导出完整备份包</button></div>`;
  }
  if($('trashPanel')){
    const trash=d.txs.filter(t=>t.st==='deleted').slice(0,10);
    $('trashPanel').innerHTML=`<div class="side-card-title">🗑️ 回收站</div>${trash.length?trash.map(t=>`<div class="tx-item"><div class="tx-main"><div class="tx-title">${esc(t.desc||TYPE_MAP[t.type])}</div><div class="tx-sub">${esc(t.date)} · ${fmt(t.amount)}</div></div><button class="tool-btn" onclick="restoreTx('${t.id}')">恢复</button></div>`).join(''):'<div class="empty" style="padding:12px">回收站为空</div>'}<div class="mini-action-row"><button onclick="purgeTrash()">清空回收站</button></div>`;
  }
  if($('historyPanel')){
    const history=(d.history||[]).filter(h=>!isSilentHistory(h.action,h.detail)).slice(0,12);
    $('historyPanel').innerHTML='<div class="side-card-title">🕘 最近操作</div>'+(history.length?history.map(h=>`<div class="bqs-cat-row"><span class="bqs-cat-name">${esc(h.action)} · ${esc(h.detail||'')}</span><span class="rank-hint">${new Date(h.time).toLocaleString()}</span></div>`).join(''):'<div class="empty">暂无历史</div>');
  }
}

function filterSettingsSections(keyword){
  const q=String(keyword||'').trim().toLowerCase();
  document.querySelectorAll('#pageSettings .list-card').forEach(card=>{
    const text=card.textContent.toLowerCase();
    card.style.display=!q||text.includes(q)?'':'none';
  });
}

function countLikelyDuplicatesFast(list){
  const map={};
  let count=0;
  list.forEach(t=>{
    const amount=Math.round((parseFloat(t.amount)||0)*100);
    const desc=String(t.desc||'').replace(/\s+/g,'').slice(0,8);
    const key=[t.date,t.type,amount,desc].join('|');
    map[key]=(map[key]||0)+1;
  });
  Object.values(map).forEach(n=>{if(n>1)count+=n-1;});
  return count;
}

function exportBackup(){
  const d=load();
  const count=(d.txs||[]).filter(t=>t.st==='normal').length;
  const blob=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});
  const fileName=`记账完整备份_${count}笔_${localDateStr()}.json`;
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fileName;a.click();URL.revokeObjectURL(a.href);
  d.settings.lastBackup=localDateStr();logAction(d,'导出备份',`完整备份包 · ${count}笔`);save(d);data=d;toast(`已导出备份：${fileName}`);
}

function openCommandPalette(){
  $('commandPalette').style.display='flex';
  renderCommands('');
  setTimeout(()=>$('commandInput').focus(),0);
}

function closeCommandPalette(){
  $('commandPalette').style.display='none';
}

function renderCommands(q){
  const qc=String(q||'').trim();
  const cmds=[
    ['新增支出',()=>openTx('expense')],['新增收入',()=>openTx('income')],['搜索账单',()=>{switchPage('bills');$('fKeyword').focus()}],
    ['打开统计',()=>switchPage('stats')],['打开账户',()=>switchPage('accounts')],['导入数据',()=>$('importFile').click()],
    ['导出备份',()=>exportBackup()],['自动分类规则',()=>switchPage('settings')],['待整理账单',()=>{pendingOnly=true;switchPage('bills');renderBills()}],
    ['数据体检',()=>switchPage('settings')],['表格模式',()=>{billViewMode='table';switchPage('bills');renderBills()}]
  ].filter(([n])=>!qc||n.includes(qc));
  const results=[];
  if(qc.length>=1){
    const d=load();
    // 搜索账单备注
    const now=new Date(),monthAgo=new Date(now);monthAgo.setMonth(monthAgo.getMonth()-1);
    const monthAgoStr=formatDate(monthAgo);
    d.txs.filter(t=>t.st==='normal'&&t.date>=monthAgoStr).forEach(t=>{
      const desc=String(t.desc||'');const typeLabel=TYPE_MAP[t.type]||t.type;
      if(desc.includes(qc)||typeLabel.includes(qc)||String(t.amount).includes(qc)){
        results.push(['📋 '+t.date+' · '+esc(desc||'无备注')+' · '+fmt(t.amount),()=>{switchPage('bills');switchBillTab('day');jumpToBillTx(t.id);}]);
      }
    });
    // 搜索分类
    d.cats.filter(c=>c.ac!==0).forEach(c=>{
      if(c.n.includes(qc)||c.i.includes(qc)){
        results.push(['🏷️ 分类：'+esc(c.i+' '+c.n),()=>{currentBillCatFilter={catId:String(c.id),name:c.n};switchPage('bills');switchBillTab('day');renderBills();}]);
      }
    });
    // 搜索账户
    d.accs.filter(a=>a.ac).forEach(a=>{
      if(a.n.includes(qc)){
        results.push(['💳 账户：'+esc(a.n),()=>{currentBillAccountFilter={accId:String(a.id),name:a.n};switchPage('bills');switchBillTab('day');renderBills();}]);
      }
    });
  }
  const allItems=[...cmds,...results.slice(0,12)];
  $('commandList').innerHTML=allItems.map(([n],i)=>`<button class="command-item" data-cmd-idx="${i}">${esc(n)}</button>`).join('');
  $('commandList').querySelectorAll('[data-cmd-idx]').forEach(b=>b.onclick=()=>{const fn=allItems[parseInt(b.dataset.cmdIdx,10)][1];closeCommandPalette();fn();});
}

/* ========== 导出 ========== */
$('btnExport').onclick=()=>{
  const d=load();let csv='\uFEFF日期,类型,金额,账户,备注,心情\n';
  d.txs.filter(t=>t.st==='normal').forEach(t=>{
    const a=d.accs.find(x=>String(x.id)===String(t.acc));
    csv+=`${t.date},${TYPE_MAP[t.type]},${t.amount},${a?a.n:''},"${String(t.desc||'').replace(/"/g,'""')}",${t.mood||''}\n`;
  });
  const b=new Blob([csv],{type:'text/csv'});
  const u=URL.createObjectURL(b);
  const el=document.createElement('a');
  const csvCount=d.txs.filter(t=>t.st==='normal').length;
  el.href=u;el.download=`TT日常记账_${csvCount}笔_${localDateStr()}.csv`;el.click();URL.revokeObjectURL(u);
  d.settings=d.settings||{};
  d.settings.lastBackupDate=localDateStr();
  save(d);data=d;
  updateSettingsOverview();
  toast('已导出CSV');
};
if($('btnLogout'))$('btnLogout').onclick=logoutApp;

$('setTheme').onclick=()=>{$('btnTheme').click();};
$('setExportData').onclick=()=>{$('btnExport').click();};
$('setBudget').onclick=editBudget;
if($('setCatBudget'))$('setCatBudget').onclick=editCategoryBudget;
if($('setSoundToggle'))$('setSoundToggle').onclick=toggleSuccessSound;
document.addEventListener('click',e=>{
  if(getInteractionSoundMode()!=='full')return;
  if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
  if(e.target.closest('button,.tx-item,.q-btn,.sb-tab,.bot-tab,.tool-btn,.icon-btn-sm,.shortcut-key,.wallet-insight-item,[data-page]'))playInteractionSound('click');
},true);
if($('loginBtn'))$('loginBtn').onclick=handleLogin;
if($('loginPassword'))$('loginPassword').addEventListener('keydown',e=>{if(e.key==='Enter')handleLogin();});
if($('toggleLoginPwd'))$('toggleLoginPwd').onclick=()=>{const i=$('loginPassword');i.type=i.type==='password'?'text':'password';$('toggleLoginPwd').textContent=i.type==='password'?'👁':'🙈';};
if($('blankModeAlertOk'))$('blankModeAlertOk').onclick=hideBlankModeAlert;
if($('blankModeAlert'))$('blankModeAlert').onclick=e=>{if(e.target===$('blankModeAlert'))hideBlankModeAlert();};
if($('settingsSearchInput'))$('settingsSearchInput').oninput=e=>filterSettingsSections(e.target.value);
$('walletBudgetItem').onclick=editBudget;
$('budgetClose').onclick=closeBudgetModal;
$('budgetSave').onclick=saveBudgetFromModal;
$('budgetInput').addEventListener('keydown',e=>{if(e.key==='Enter')saveBudgetFromModal();});
$('budgetModal').onclick=e=>{if(e.target===$('budgetModal'))closeBudgetModal();};
$('ruleAddBtn').onclick=addAutoRule;
$('amountRuleAddBtn').onclick=addAmountRule;
$('ruleType').onchange=renderRuleManager;
$('ruleTestBtn').onclick=testRuleMatch;
if($('ruleTestInput'))$('ruleTestInput').addEventListener('keydown',e=>{if(e.key==='Enter')testRuleMatch();});
$('aliasAddBtn').onclick=addAliasRule;
if($('largeExpenseSaveBtn'))$('largeExpenseSaveBtn').onclick=saveLargeExpenseThreshold;
if($('tagAddBtn'))$('tagAddBtn').onclick=addTag;
if($('statsKeywordBtn'))$('statsKeywordBtn').onclick=()=>{const d=load();d.settings=d.settings||{};d.settings.lastStatsKeyword=$('statsKeywordInput').value.trim();save(d);data=d;renderStats();};
if($('statsKeywordInput'))$('statsKeywordInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('statsKeywordBtn').click();});
if($('assetSnapshotAddBtn'))$('assetSnapshotAddBtn').onclick=addAssetSnapshot;
if($('assetSnapshotAmount'))$('assetSnapshotAmount').addEventListener('keydown',e=>{if(e.key==='Enter')addAssetSnapshot();});
if($('modalAssetSnapshotAddBtn'))$('modalAssetSnapshotAddBtn').onclick=addAssetSnapshotModal;
if($('modalAssetSnapshotAmount'))$('modalAssetSnapshotAmount').addEventListener('keydown',e=>{if(e.key==='Enter')addAssetSnapshotModal();});
if($('assetSnapshotClose'))$('assetSnapshotClose').onclick=closeAssetSnapshotModal;
if($('assetSnapshotModal'))$('assetSnapshotModal').onclick=function(e){if(e.target===this)this.classList.remove('show');};
if($('assetEditClose'))$('assetEditClose').onclick=closeAssetEditModal;
if($('assetEditSave'))$('assetEditSave').onclick=saveAssetSnapshotEdit;
if($('assetEditDelete'))$('assetEditDelete').onclick=function(){
  const id=$('assetEditId').value;
  if(!id){toast('没有正在编辑的记录');return}
  closeAssetEditModal();
  deleteAssetSnapshot(id);
};
if($('assetEditModal'))$('assetEditModal').onclick=e=>{if(e.target===$('assetEditModal'))closeAssetEditModal();};
['assetEditDate','assetEditTime','assetEditAmount','assetEditNote'].forEach(id=>{if($(id))$(id).addEventListener('keydown',e=>{if(e.key==='Enter')saveAssetSnapshotEdit();});});
if($('settingsNav'))$('settingsNav').querySelectorAll('[data-settings-jump]').forEach(btn=>btn.onclick=()=>{
  $('settingsNav').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));
  $(btn.dataset.settingsJump)?.scrollIntoView({behavior:'smooth',block:'start'});
});
$('billListModeBtn').onclick=()=>{billViewMode='list';renderBills();};
$('billTableModeBtn').onclick=()=>{billViewMode='table';renderBills();};
$('billCompactBtn').onclick=()=>{billCompact=!billCompact;localStorage.setItem('bill_compact',billCompact?'1':'0');document.body.classList.toggle('bill-compact',billCompact);renderBills();};
$('assetListModeBtn').onclick=()=>{assetViewMode='list';renderAssetChangePage(load());};
$('assetTableModeBtn').onclick=()=>{assetViewMode='table';renderAssetChangePage(load());};
$('assetYearFilter').onchange=$('assetMonthFilter').onchange=function(){renderAssetChangePage(load());};
$('billClearSelectionBtn').onclick=()=>{selectedBillId=null;renderBillDetailPanel();renderBills();};
$('btnAddInvestment').onclick=()=>openTx('invest');
$('btnBatchInvestment').onclick=openInvestBatch;
$('investBatchClose').onclick=closeInvestBatch;
$('investBatchModal').onclick=e=>{if(e.target===$('investBatchModal'))closeInvestBatch();};
$('investBatchAddRow').onclick=()=>addInvestBatchRow();
$('investBatchSave').onclick=saveInvestBatch;
$('topExpenseSwitch').querySelectorAll('[data-rank-range]').forEach(btn=>{
  btn.onclick=()=>{topExpenseRange=btn.dataset.rankRange;renderTopExpenses();};
});
$('topExpenseSortSwitch')?.querySelectorAll('[data-rank-sort]').forEach(btn=>{
  btn.onclick=()=>{topExpenseSort=btn.dataset.rankSort;renderTopExpenses();};
});
$('calendarModeSwitch').querySelectorAll('[data-calendar-mode]').forEach(btn=>{
  btn.onclick=()=>{calendarMode=btn.dataset.calendarMode;renderCalendar(load().txs);};
});
$('quoteText').onclick=()=>{
  quoteIndex=(quoteIndex+1)%QUOTES.length;
  const q=QUOTES[quoteIndex];
  $('quoteText').style.opacity='0';
  setTimeout(()=>{
    $('quoteText').innerHTML=esc(q.t)+'<span class="quote-author">'+esc(q.a)+'</span>';
    $('quoteText').style.opacity='1';
  },200);
};
$('calPrev').onclick=()=>{
  if(calendarMode==='year')calViewDate=new Date(calViewDate.getFullYear()-6,0,1);
  else if(calendarMode==='month')calViewDate=new Date(calViewDate.getFullYear()-1,0,1);
  else calViewDate=new Date(calViewDate.getFullYear(),calViewDate.getMonth()-1,1);
  renderCalendar(load().txs);
};
$('calNext').onclick=()=>{
  if(calendarMode==='year')calViewDate=new Date(calViewDate.getFullYear()+6,0,1);
  else if(calendarMode==='month')calViewDate=new Date(calViewDate.getFullYear()+1,0,1);
  else calViewDate=new Date(calViewDate.getFullYear(),calViewDate.getMonth()+1,1);
  renderCalendar(load().txs);
};
$('investYearPrev').onclick=()=>{investCalendarYear--;renderInvestment();};
$('investYearNext').onclick=()=>{investCalendarYear++;renderInvestment();};
function updateHomeClock(){
  const el=$('homeClock');
  if(el)el.textContent='🕒 '+localDateTimeStr();
}
updateHomeClock();
setInterval(updateHomeClock,1000);

function updateSettingsOverview(){
  if(!$('settingsOverview'))return;
  const totalTxs=data.txs.filter(t=>t.st==='normal').length;
  const totalAccs=data.accs.filter(a=>a.ac).length;
  const firstTx=data.txs.filter(t=>t.st==='normal').sort((a,b)=>a.date.localeCompare(b.date))[0];
  const last=getLatestBackupDate()||'暂无记录';
  const backupCount=data.settings?.serverBackupCount||0;
  $('settingsOverview').innerHTML=`
    <div class="bqs-item"><div class="bqs-label">总记账笔数</div><div class="bqs-val">${totalTxs} 笔</div></div>
    <div class="bqs-item"><div class="bqs-label">活跃账户</div><div class="bqs-val">${totalAccs} 个</div></div>
    <div class="bqs-item"><div class="bqs-label">首次记账</div><div class="bqs-val" style="font-size:12px">${firstTx?firstTx.date:'暂无'}</div></div>
    <div class="bqs-item"><div class="bqs-label">前端版本</div><div class="bqs-val">${APP_VERSION}</div></div>
    <div class="bqs-item"><div class="bqs-label">最近备份</div><div class="bqs-val" style="font-size:12px">${last}</div></div>
    <div class="bqs-item"><div class="bqs-label">服务器备份</div><div class="bqs-val">${backupCount} 个</div></div>`;
  if($('versionInfoPanel')){
    $('versionInfoPanel').innerHTML=`
      <div class="tx-item" onclick="copyDebugInfo()" title="点击复制调试信息"><div class="tx-main"><div class="tx-title">TT日常记账</div><div class="tx-sub">版本 ${APP_VERSION} · 构建日期 ${APP_BUILD_DATE} · 点击复制调试信息</div></div><div class="tx-amount" style="font-size:12px;color:var(--text-tertiary)">v${APP_VERSION}</div></div>
      <div class="tx-item"><div class="tx-main"><div class="tx-title">数据存储</div><div class="tx-sub">本地缓存 + 服务器 JSON；总资产快照独立备份</div></div><div class="tx-amount" style="font-size:12px;color:var(--text-tertiary)">${backupCount} 备份</div></div>
      <div class="tx-item"><div class="tx-main"><div class="tx-title">缓存版本</div><div class="tx-sub">${APP_CACHE_VERSION}</div></div><div class="tx-amount" style="font-size:12px;color:var(--text-tertiary)">Cache</div></div>`;
  }
  // 功能说明
  var guideItems=[
    ['🏠 首页','三栏布局：快速记账、消费日历、本月支出排行。支持键盘快捷键 N 记账，W 记总资产，/ 搜索账单。'],
    ['📝 账单','按月查看所有收支记录，支持筛选（分类/账户/类型/关键词）、排序、批量删除。双击账单可编辑。支持 CSV 导入（鲨鱼记账等格式）。'],
    ['📈 投资','管理股票、基金等投资账户，记录买入/卖出操作，自动计算持仓成本、盈亏和收益率。'],
    ['📊 统计','月度收支概览 + 总资产变化台账。支持手动记录/导入/粘贴导入总资产快照，自动计算月均增长、年化收益率。图表会标记大额变动和带备注的资产快照。'],
    ['💳 账户','管理所有资金账户（现金、银行卡、微信、支付宝等），查看账户余额、流水和资产负债表。支持账户对账。'],
    ['⚙️ 设置','分类管理（收入/支出）、自动分类规则、预算设置、表格列设置、数据导入导出与备份、快捷键说明。'],
    ['💾 数据','本地 localStorage + 服务器 data.json 双重存储。总资产快照独立存储并自动备份。顶部会显示保存中、已保存或保存失败状态。']
  ];
  var guideHtml=guideItems.map(function(item){
    return '<div style="margin-bottom:10px"><b style="color:var(--text)">'+item[0]+'</b><br/>'+item[1]+'</div>';
  }).join('<hr style="border:none;border-top:1px solid var(--border-light);margin:10px 0">');
  $('settingsGuideBody').innerHTML=guideHtml;
}

function remindBackupIfNeeded(){
  const last=getLatestBackupDate();
  if(!last){setTimeout(()=>toast('还没有检测到备份，建议导出一次'),1200);return;}
  const days=(new Date(localDateStr())-new Date(last))/(24*3600*1000);
  if(days>=7)setTimeout(()=>toast(`距离上次备份已 ${Math.floor(days)} 天，建议导出备份`),1200);
}

function getLatestBackupDate(){
  const dates=[data.settings?.lastBackupDate,data.settings?.serverBackupDate].filter(Boolean).sort();
  return dates.length?dates[dates.length-1]:'';
}

async function loadServerBackupStatus(){
  try{
    const res=await apiFetch('data-api.php?action=backupStatus');
    const result=await res.json();
    if(result.success&&result.data){
      data.settings=data.settings||{};
      data.settings.serverBackupDate=result.data.latestDate||'';
      data.settings.serverBackupTime=result.data.latestTime||'';
      data.settings.serverBackupCount=result.data.count||0;
      localStorage.setItem(STORE,JSON.stringify(data));
    }
  }catch(e){}
}

/* ========== 初始化 ========== */
// 初始化：先给默认空数据，再异步从服务器加载
async function startApp(useBlank=false){
  if(appStarted)return;
  appStarted=true;
  // 恢复用户主题色选择
  const savedData=blankMode?seed():load();
  if(savedData.settings&&savedData.settings.themeColor)applyThemeColor(savedData.settings.themeColor);
  autoClearPageCache();
  data=seed();
  // 测试模式：首次加载时注入演示假数据
  if(!useBlank&&!blankMode&&!localStorage.getItem(STORE+'_demo_seeded')){
    localStorage.setItem(STORE+'_demo_seeded','1');
    seedDemoDataIfEmpty();
    localStorage.setItem(STORE,JSON.stringify(data));
    markAppCacheFresh();
  }
  if(!useBlank&&!blankMode)await initData();
  // 测试模式：如果数据为空，强制注入演示假数据
  if(!useBlank&&!blankMode&&(!data.txs||data.txs.length===0)){seedDemoDataIfEmpty();}
  const cleanupResult=runCategoryCleanupMigration();
  const discResult=runDiscountBalanceMigration();
  fillMonths();
  fillCats();
  renderHome();
  const sk=$('homeSkeleton');if(sk)sk.classList.add('hide');
  if(cleanupResult.changed)setTimeout(()=>toast(`分类整理完成：已迁移 ${cleanupResult.affectedTxs} 笔账单`),900);
  if(discResult.changed)setTimeout(()=>toast(`优惠余额修正：已修正 ${discResult.affected} 笔优惠记录`),1200);
  if(blankMode){setSaveStatus('saved','空账本');return;}
  setTimeout(async()=>{
    await loadServerBackupStatus();
    if(currentPage==='settings'){updateSettingsOverview();renderRuleManager();renderAmountRuleManager();renderAliasManager();renderBillEnhanceSettings();renderTagManager();renderColumnSettings();renderDataTools();renderThemeColorSettings();renderSoundSetting();renderShortcutEditor();}
    remindBackupIfNeeded();
  },80);
}

async function bootWithAuth(){
  // 测试模式：跳过密码登录
  const skipLogin=true;
  if(skipLogin){await startApp();return;}
  const pwd=getApiPassword();
  // 每天只需验证一次：有密码且今天已验证过，直接进入
  if(pwd&&!isApiPasswordExpired()){await startApp();return;}
  // 密码过期或不存在，需要重新验证
  if(pwd){
    try{
      const result=await verifyApiPassword(pwd);
      if(result.success){
        setApiPassword(pwd);// 刷新日期
        await startApp();return;
      }
    }catch(e){}
    clearApiPassword();
  }
  showLoginModal();
}

bootWithAuth();

// PC 全局快捷键
function isTypingNow(){
  const tag=(document.activeElement?.tagName||'').toLowerCase();
  return ['input','textarea','select'].includes(tag)||document.activeElement?.isContentEditable;
}
function openShortcutGuide(){
  switchPage('settings');
  setTimeout(()=>{
    const el=$('settingsShortcuts');
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
  },80);
}
document.addEventListener('keydown',e=>{
  const typing=isTypingNow();
  if(e.ctrlKey&&e.key!=='Control')ctrlComboUsed=true;
  if(e.key==='Escape'){
    $('txModal').classList.remove('show');$('investBatchModal').classList.remove('show');$('accModal').classList.remove('show');$('budgetModal').classList.remove('show');$('confirmDlg').classList.remove('show');$('importPreviewModal').classList.remove('show');$('assetEditModal')?.classList.remove('show');closeBalCalDlg();closeCommandPalette();
    selectedBillId=null;renderBillDetailPanel();return;
  }
  if(e.ctrlKey&&e.key.toLowerCase()==='s'){
    e.preventDefault();
    const d=load();
    syncSave(d);
    if(d.settings&&Array.isArray(d.settings.assetSnapshots))syncAssetSave(d.settings.assetSnapshots);
    toast('已触发同步保存','success');
    return;
  }
  if(e.ctrlKey&&e.key.toLowerCase()==='f'){openCommandPalette();e.preventDefault();return;}
  if(e.ctrlKey&&e.key==='/'){openShortcutGuide();e.preventDefault();return;}
  if($('txModal').classList.contains('show')&&e.key==='Enter'){
    $('txSave').click();e.preventDefault();return;
  }
  const shortcutGuideDefault=DEFAULT_SHORTCUTS.shortcut_guide||'j';
  const shortcutGuideKey=getShortcutKey('shortcut_guide',shortcutGuideDefault);
  const key=e.key.toLowerCase();
  if($('txModal').classList.contains('show')&&!typing&&document.activeElement?.closest('#txModal')&&(
    keyMatches(e,'new_expense','n')||
    keyMatches(e,'new_income','i')||
    keyMatches(e,'new_transfer','t')||
    keyMatches(e,'new_invest','v')
  )){
    closeTxModal();e.preventDefault();return;
  }
  if(typing)return;
  // 使用自定义快捷键映射
  if(normalizeShortcutKey(shortcutGuideKey)!=='ctrl'&&keyMatches(e,'shortcut_guide',shortcutGuideDefault)){
    openShortcutGuide();e.preventDefault();return;
  }
  if(keyMatches(e,'new_expense','n')){
    if($('txModal').classList.contains('show'))closeTxModal();
    else openTx('expense');
    e.preventDefault();return;
  }
  if(keyMatches(e,'new_income','i')){openTx('income');e.preventDefault();return;}
  if(keyMatches(e,'new_transfer','t')){openTx('transfer');e.preventDefault();return;}
  if(keyMatches(e,'new_invest','v')){openTx('invest');e.preventDefault();return;}
  if(keyMatches(e,'page_home','a')){switchPage('home');e.preventDefault();return;}
  if(keyMatches(e,'page_bills','s')){switchPage('bills');e.preventDefault();return;}
  if(keyMatches(e,'page_investment','d')){switchPage('investment');e.preventDefault();return;}
  if(keyMatches(e,'page_stats','f')){switchPage('stats');e.preventDefault();return;}
  if(keyMatches(e,'page_accounts','g')){switchPage('accounts');e.preventDefault();return;}
  if(keyMatches(e,'page_settings','h')){switchPage('settings');e.preventDefault();return;}
  if(keyMatches(e,'refresh','r')){refreshCurrentPage(true);e.preventDefault();return;}
  if(keyMatches(e,'asset_snapshot','w')){
    switchPage('stats');
    setTimeout(()=>{var inp=$('assetSnapshotAmount');if(inp){inp.focus();inp.select();}},100);
    e.preventDefault();return;
  }
  if(e.key==='?'||e.key==='？'){e.preventDefault();$('shortcutTip')?.classList.toggle('show');return;}
  if(keyMatches(e,'search','/')){switchPage('bills');setTimeout(()=>$('fKeyword').focus(),0);e.preventDefault();return;}
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){
    const btn=e.key==='ArrowLeft'?'calPrev':'calNext';
    if(!document.body.classList.contains('home-page'))return;
    $(btn).click();e.preventDefault();
  }
});
document.addEventListener('keyup',e=>{
  if(e.key==='Control'){
    const typing=isTypingNow();
    if(!typing&&!ctrlComboUsed&&normalizeShortcutKey(getShortcutKey('shortcut_guide',DEFAULT_SHORTCUTS.shortcut_guide||'j'))==='ctrl')openShortcutGuide();
    ctrlComboUsed=false;
  }
});
$('commandInput').oninput=e=>renderCommands(e.target.value.trim());
$('commandPalette').onclick=e=>{if(e.target===$('commandPalette'))closeCommandPalette();};
document.addEventListener('click',e=>{if(!e.target.closest('#txContextMenu')){const m=$('txContextMenu');if(m)m.style.display='none';}});

/* ========== 快捷键提示浮层 ========== */
function showShortcutTip(){$('shortcutTip')?.classList.add('show');}
function hideShortcutTip(){$('shortcutTip')?.classList.remove('show');}
if($('shortcutTipClose'))$('shortcutTipClose').onclick=hideShortcutTip;
if(!localStorage.getItem(STORE+'_shortcut_tip_shown')&&window.innerWidth>=700){showShortcutTip();localStorage.setItem(STORE+'_shortcut_tip_shown','1');}

/* ========== 导入拖拽 ========== */
(function setupDragImport(){
  let dragCounter=0;
  const overlay=document.createElement('div');
  overlay.className='drag-import-overlay';
  overlay.style.cssText='position:fixed;inset:0;z-index:9997;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;pointer-events:none';
  overlay.innerHTML='<div style="background:var(--surface);padding:28px 36px;border-radius:20px;text-align:center;box-shadow:var(--shadow-lg);pointer-events:none"><div style="font-size:42px;margin-bottom:10px">📥</div><div style="font-size:16px;font-weight:800;color:var(--text)">松开导入文件</div><div style="font-size:12px;color:var(--text-tertiary);margin-top:4px">支持 CSV / JSON 格式</div></div>';
  document.body.appendChild(overlay);
  document.body.addEventListener('dragenter',e=>{e.preventDefault();dragCounter++;if(dragCounter===1)overlay.style.display='flex';});
  document.body.addEventListener('dragleave',e=>{e.preventDefault();dragCounter--;if(dragCounter<=0){dragCounter=0;overlay.style.display='none';}});
  document.body.addEventListener('dragover',e=>{e.preventDefault();});
  document.body.addEventListener('drop',e=>{
    e.preventDefault();dragCounter=0;overlay.style.display='none';
    const files=Array.from(e.dataTransfer.files);
    const file=files.find(f=>f.name.endsWith('.csv')||f.name.endsWith('.json'));
    if(!file){toast('请拖拽 CSV 或 JSON 文件');return;}
    const reader=new FileReader();
    reader.onload=function(){
      try{
        const text=reader.result;
        if(file.name.endsWith('.json')){
          const d=load();
          const imported=JSON.parse(text);
          if(imported&&Array.isArray(imported.txs)){
            mergeImportData(imported);return;
          }
        }
        pendingImportText=text;
        const preview=importSharkCSV(text,true);
        showImportPreview(preview);
      }catch(err){toast('文件解析失败：'+err.message);}
    };
    reader.readAsText(file,'utf-8');
  });
})();

function mergeImportData(imported){
  const d=load();
  if(!imported.txs||!Array.isArray(imported.txs)){toast('导入文件格式不正确');return;}
  const merged=[...d.txs];
  let added=0;
  imported.txs.forEach(t=>{
    if(!merged.find(x=>String(x.id)===String(t.id))){merged.push(t);added++;}
  });
  d.txs=merged;
  if(imported.cats&&Array.isArray(imported.cats)){imported.cats.forEach(c=>{if(!d.cats.find(x=>String(x.id)===String(c.id)))d.cats.push(c);});}
  if(imported.accs&&Array.isArray(imported.accs)){imported.accs.forEach(a=>{if(!d.accs.find(x=>String(x.id)===String(a.id)))d.accs.push(a);});}
  save(d);data=d;refreshAllViews();
  toast('已导入 '+added+' 条记录');
}
