/* ========== 纯工具函数（从 main.js 提取） ========== */

function getRangeDate(monthsAgo){var d=new Date();d.setMonth(d.getMonth()-monthsAgo);return d.toISOString().slice(0,10);}
function getRangeMonths(range){return range==='3m'?3:range==='6m'?6:range==='1y'?12:36;}

function genId(){return 'r'+Date.now().toString(36)+Math.random().toString(36).slice(2,5)}

function fmt(n){const v=parseFloat(n)||0;return(v>=0?'':'-')+'¥'+Math.abs(v).toFixed(2)}
function short(n){const v=parseFloat(n)||0;return(v>=0?'':'-')+Math.abs(v).toFixed(2)}
function pad2(n){return String(n).padStart(2,'0')}
function localDateStr(dt=new Date()){return `${dt.getFullYear()}-${pad2(dt.getMonth()+1)}-${pad2(dt.getDate())}`}
function localMonthStr(dt=new Date()){return `${dt.getFullYear()}-${pad2(dt.getMonth()+1)}`}
function prevMonthStr(dt=new Date()){return localMonthStr(new Date(dt.getFullYear(),dt.getMonth()-1,1))}
function monthLabel(dateStr){const m=String(dateStr||'').slice(0,7);return m?m.replace('-','年')+'月':''}
function weekRangeStr(dt=new Date()){
  const d=new Date(dt.getFullYear(),dt.getMonth(),dt.getDate());
  const day=d.getDay()||7;
  const start=new Date(d);start.setDate(d.getDate()-day+1);
  const end=new Date(start);end.setDate(start.getDate()+6);
  return {start:localDateStr(start),end:localDateStr(end)};
}
function txInExpenseRankRange(t,range){
  const date=String(t.date||'');
  if(range==='week'){const w=weekRangeStr();return date>=w.start&&date<=w.end}
  if(range==='year')return date.indexOf(String(new Date().getFullYear())+'-')===0;
  return date.indexOf(localMonthStr())===0;
}
function expenseRankLabel(range){
  return range==='week'?'本周':range==='year'?'本年':'本月';
}
function localDateTimeStr(dt=new Date()){return `${dt.getFullYear()}年${pad2(dt.getMonth()+1)}月${pad2(dt.getDate())}日 ${pad2(dt.getHours())}:${pad2(dt.getMinutes())}:${pad2(dt.getSeconds())}`}
function avgDaysForMonth(dt=new Date()){
  const now=new Date();
  return localMonthStr(dt)===localMonthStr(now)?now.getDate():new Date(dt.getFullYear(),dt.getMonth()+1,0).getDate();
}
function normalizeAccBalance(type,b){const v=parseFloat(b)||0;if(type==='debt')return -Math.abs(v);if(type==='receivable')return Math.abs(v);return v}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))}
function randomEmptyDesc(){
  const list=['账本空一点，心情轻一点。','换个筛选条件，也许记录就在旁边。','今天还没有新记录，保持轻松。','每一笔记录，都是未来的线索。','没有结果，说明这组条件很干净。'];
  return list[Math.floor(Math.random()*list.length)];
}
function toastType(m,type){
  if(type)return type;
  const s=String(m||'');
  if(/失败|错误|异常|未授权|不存在|无法|请输入|缺少|无效/.test(s))return 'error';
  if(/建议|提醒|跳过|待整理|确认|超出|没有/.test(s))return 'warn';
  if(/成功|已保存|已同步|已更新|已删除|已恢复|已导出|已导入|已记录|登录成功|完成/.test(s))return 'success';
  return 'info';
}
function getMood(m){return{happy:'😊',normal:'😐',sad:'😔',angry:'😤',excited:'🤩'}[m]||''}
