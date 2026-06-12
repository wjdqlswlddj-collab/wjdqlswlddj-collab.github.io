function sim(){
  let tabs={},gm=[];
  Object.keys(G).forEach(g=>{
    let m={};G[g].forEach(c=>m[c]=tableRow(c));
    PAIR.forEach((p,i)=>{
      let x=play(G[g][p[0]],G[g][p[1]],false,g+(i+1));gm.push(x);
      let a=m[x.a],b=m[x.b];a.p++;b.p++;a.gf+=x.ga;a.ga+=x.gb;b.gf+=x.gb;b.ga+=x.ga;
      if(x.ga>x.gb){a.w++;b.l++;a.pts+=3}else if(x.ga<x.gb){b.w++;a.l++;b.pts+=3}else{a.d++;b.d++;a.pts++;b.pts++}
    });
    tabs[g]=Object.values(m).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||rating(b.c)-rating(a.c)||Math.random()-.5)
  });
  let thirds=Object.keys(G).map(g=>Object.assign({g:g},tabs[g][2])).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||rating(b.c)-rating(a.c));
  let q=[];Object.keys(G).forEach(g=>q.push(tabs[g][0],tabs[g][1]));q=q.concat(thirds.slice(0,8));
  q.sort((a,b)=>{let ca=a.c||a,cb=b.c||b,pa=tabs[T[ca][2]].findIndex(x=>x.c===ca),pb=tabs[T[cb][2]].findIndex(x=>x.c===cb);return pa-pb||rating(cb)-rating(ca)});
  let seeds=q.map(x=>x.c||x),pairs=[];
  for(let i=0;i<16;i++)pairs.push([seeds[i],seeds[31-i]]);
  for(let i=0;i<pairs.length;i++)if(T[pairs[i][0]][2]===T[pairs[i][1]][2]){
    for(let j=i+1;j<pairs.length;j++)if(T[pairs[i][0]][2]!==T[pairs[j][1]][2]&&T[pairs[j][0]][2]!==T[pairs[i][1]][2]){let z=pairs[i][1];pairs[i][1]=pairs[j][1];pairs[j][1]=z;break}
  }
  let id=73;function round(ps){return ps.map(p=>play(p[0],p[1],true,id++))}
  let r32=round(pairs),r16=round(Array.from({length:8},(_,i)=>[r32[i*2].w,r32[i*2+1].w])),qf=round(Array.from({length:4},(_,i)=>[r16[i*2].w,r16[i*2+1].w])),sf=round(Array.from({length:2},(_,i)=>[qf[i*2].w,qf[i*2+1].w])),final=play(sf[0].w,sf[1].w,true,104);
  let sfLosers=sf.map(m=>m.a===m.w?m.b:m.a),third=play(sfLosers[0],sfLosers[1],true,103);
  let reach={r32:new Set(seeds),r16:new Set(r32.map(x=>x.w)),qf:new Set(r16.map(x=>x.w)),sf:new Set(qf.map(x=>x.w)),fin:new Set(sf.map(x=>x.w)),win:new Set([final.w])};
  return{tabs:tabs,thirds:thirds,gm:gm,rounds:[r32,r16,qf,sf,[final]],third:third,champ:final.w,runner:final.a===final.w?final.b:final.a,reach:reach,time:Date.now()}
}
function compact(t,n){return{n:n,time:t.time,tabs:t.tabs,gm:t.gm||[],rounds:t.rounds,third:t.third,champ:t.champ,runner:t.runner}}
function expand(a){
  let reach={r32:new Set(),r16:new Set(),qf:new Set(),sf:new Set(),fin:new Set(),win:new Set([a.champ])};
  (a.rounds[0]||[]).forEach(m=>{reach.r32.add(m.a);reach.r32.add(m.b);reach.r16.add(m.w)});
  (a.rounds[1]||[]).forEach(m=>reach.qf.add(m.w));(a.rounds[2]||[]).forEach(m=>reach.sf.add(m.w));(a.rounds[3]||[]).forEach(m=>reach.fin.add(m.w));
  return Object.assign({gm:[]},a,{reach:reach})
}
function applyVaultInterest(){
  let principal=Math.max(0,Math.floor(S.wallet.vault||0)),interest=Math.floor(principal*.001);S.wallet.lastInterest=interest;
  if(interest>0){S.wallet.vault+=interest;S.wallet.interest+=interest;S.wallet.vaultLog.unshift({type:'interest',n:S.last,amount:interest,balance:S.wallet.vault,time:Date.now()});S.wallet.vaultLog=S.wallet.vaultLog.slice(0,100)}
  return interest
}
function commit(t,keep){
  S.total++;S.last++;
  Object.keys(t.tabs).forEach(g=>t.tabs[g].forEach((x,i)=>{let z=S.teams[x.c];z.pts+=x.pts;z.gf+=x.gf;z.ga+=x.ga;if(i===0)z.gw++}));
  SK.forEach(k=>t.reach[k].forEach(c=>S.teams[c][k]++));
  applyVaultInterest();
  if(keep!==false){S.archives.push(compact(t,S.last));if(S.archives.length>300)S.archives.shift()}save()
}
function stageAlive(r){if(!S.active)return[];if(r<0)return C.slice();let k=SK[Math.min(r,5)];return Array.from(S.active.t.reach[k]||[])}
function nextOpponent(c){
  let a=S.active;if(!a)return null;
  if(a.reveal<0){let ar=G[T[c][2]],i=ar.indexOf(c);return ar[i===0?1:0]}
  if(a.reveal>4)return null;
  let round=a.t.rounds[a.reveal];if(!round)return null;let m=round.find(x=>x.a===c||x.b===c);return m?(m.a===c?m.b:m.a):null
}
function priorProb(c,target,current){let r=rating(c),start=current+1,need=target-start+1;if(target===0&&current<0)return .18+.68*logistic((r-77)/7);let one=.24+.63*logistic((r-82)/8);return Math.pow(one,Math.max(1,need))}
function oddsInfo(c,target){
  let current=S.active?S.active.reveal:-1,den=current<0?S.total:S.teams[c][SK[current]],num=S.teams[c][SK[target]],hist=den?num/den:0,prior=priorProb(c,target,current),w=den/(den+60),p=hist*w+prior*(1-w),opp=nextOpponent(c),adj=1,mp=null;
  if(opp){mp=logistic((rating(c)-rating(opp))/7);let avg=logistic((rating(c)-82)/7);adj=mp/Math.max(.08,avg);p*=adj}
  p=Math.max(.000001,Math.min(.995,p));return{p:p,odds:.96/p,opp:opp,mp:mp,adj:adj,hist:hist,prior:prior}
}
function feeRate(){let n=S.active?S.active.bets.length:0;return FEE[Math.min(n,FEE.length-1)]}
function windowKey(){return S.active?'w'+S.active.reveal:'none'}
function placeBet(){
  if(!S.active)return;
  let alive=stageAlive(S.active.reveal),c=selectedTeam,t=selectedTarget,a=Math.floor(amount);
  if(S.active.bets.some(b=>b.window===windowKey()))return alert('현재 베팅 시점에는 이미 베팅했음');
  if(S.active.locked&&S.active.locked!==c)return alert('처음 선택한 국가가 생존 중이므로 변경할 수 없음');
  if(alive.indexOf(c)<0)return alert('현재 생존 국가만 선택 가능함');
  if(t<=S.active.reveal)return alert('이미 결정된 목표 라운드는 선택할 수 없음');
  if(!a||a<10)return alert('최소 베팅금액은 10원임');
  let fr=feeRate(),f=Math.max(30,Math.ceil(a*fr));if(S.wallet.bal<a+f)return alert('베팅액과 수수료를 합산한 보유금액이 부족함');
  let o=oddsInfo(c,t),b={id:Date.now(),window:windowKey(),at:S.active.reveal,team:c,target:t,stake:a,fee:f,odds:o.odds,opp:o.opp,status:'open',pay:0};
  S.wallet.bal-=a+f;S.wallet.fee+=f;S.wallet.betN++;S.active.bets.push(b);S.active.locked=c;amount=0;save();render()
}
function decisiveMatch(teamCode,target,tournament){
  if(target===0)return null;
  let desired=(tournament.rounds[target-1]||[]).find(m=>m.a===teamCode||m.b===teamCode);if(desired)return desired;
  for(let i=Math.min(target-2,4);i>=0;i--){let m=(tournament.rounds[i]||[]).find(x=>x.a===teamCode||x.b===teamCode);if(m)return m}
  return null
}
function betResultData(b,a,hit){
  let m=decisiveMatch(b.team,b.target,a.t),opp=m?(m.a===b.team?m.b:m.a):null,score=m?(m.a===b.team?[m.ga,m.gb]:[m.gb,m.ga]):null;
  if(m&&m.pen){let pen=m.a===b.team?m.pen:[m.pen[1],m.pen[0]];score=score.concat(pen)}
  return{bet:b,hit:hit,match:m,opp:opp,score:score,stage:b.target===0?'조별리그':ST[b.target-1],tour:a.t,reveal:a.reveal}
}
function settle(){
  let a=S.active;if(!a)return;let settled=[];
  a.bets.forEach(b=>{
    if(b.status!=='open')return;let decided=a.reveal>=b.target,alive=stageAlive(a.reveal).indexOf(b.team)>=0;
    if(decided||!alive){let hit=a.t.reach[SK[b.target]].has(b.team);b.status=hit?'hit':'miss';
      if(hit){b.pay=Math.floor(b.stake*b.odds);S.wallet.bal+=b.pay;S.wallet.hit++;S.wallet.profit+=b.pay-b.stake-b.fee;if(b.target===5){S.player.champStars++;b.achievement=true}}else{S.wallet.miss++;S.wallet.profit-=b.stake+b.fee}
      S.wallet.log.unshift({n:S.last+1,team:b.team,target:b.target,stake:b.stake,fee:b.fee,odds:b.odds,status:b.status,pay:b.pay,profit:hit?b.pay-b.stake-b.fee:-b.stake-b.fee,opp:b.opp,achievement:!!b.achievement});
      S.wallet.log=S.wallet.log.slice(0,100);settled.push(betResultData(b,a,hit))
    }
  });
  if(a.locked&&stageAlive(a.reveal).indexOf(a.locked)<0)a.locked=null;
  if(settled.length)pendingBetResults=pendingBetResults.concat(settled)
}
function prepare(silent){if(busy)return;let recoveryRequired=S.wallet.bal<130;S.active={t:sim(),reveal:-1,bets:[],locked:null,committed:false,recovery:null,recoverySettled:false,recoveryRequired:recoveryRequired};selectedTeam=C.slice().sort((x,y)=>rating(y)-rating(x))[0];selectedTarget=0;amount=0;bracketRound=0;save();if(!silent)render()}
function recoveryPick(){if(!S.active||!S.active.recoveryRequired)return;let el=document.getElementById('recoveryTeam'),c=el?el.value:selectedTeam;S.active.recovery=c;S.active.recoverySettled=false;S.wallet.recoveryTry++;save();render()}
function settleRecovery(){let a=S.active;if(!a||!a.recoveryRequired||!a.recovery||a.recoverySettled)return;let alive=stageAlive(a.reveal).indexOf(a.recovery)>=0,decided=a.reveal===5||!alive;if(!decided)return;let hit=a.reveal===5&&a.recovery===a.t.champ,pay=hit?10000:0;a.recoverySettled=true;if(hit){S.wallet.bal+=pay;S.wallet.recoveryHit++}let tourNo=a.reveal===5&&a.committed?S.last:S.last+1;S.wallet.log.unshift({n:tourNo,team:a.recovery,target:5,stake:0,fee:0,odds:0,status:hit?'recovery-hit':'recovery-miss',pay:pay,profit:pay});S.wallet.log=S.wallet.log.slice(0,100);pendingBetResults.push({type:'recovery',team:a.recovery,hit:hit,pay:pay,tour:a.t,reveal:a.reveal})}
function revealNext(){
  let a=S.active;if(!a)return;if(a.reveal<0&&a.recoveryRequired&&!a.recovery)return alert('구제 우승국 예측을 먼저 확정해야 함');if(a.reveal>=5)return;
  a.reveal++;bracketRound=Math.min(Math.max(a.reveal,0),4);settle();
  if(a.reveal===5&&!a.committed){a.committed=true;commit(a.t,true)}
  settleRecovery();save();render();if(pendingBetResults.length)setTimeout(showNextBetResult,30)
}
function runBatch(n){if(busy)return;if(S.active&&S.active.reveal<5)return alert('진행 중인 대회를 먼저 완료해야 함');busy=true;let done=0;function chunk(){let lim=Math.min(10,n-done);for(let i=0;i<lim;i++){let t=sim();commit(t,done+i>=n-10)}done+=lim;let ts=document.getElementById('topStatus');if(ts)ts.textContent='누적 '+done+'/'+n;if(done<n)setTimeout(chunk,0);else{busy=false;render()}}chunk()}
function stageName(r){return r<0?'대회 시작 전':r===0?'32강 시작 전':r===1?'16강 시작 전':r===2?'8강 시작 전':r===3?'4강 시작 전':r===4?'결승 시작 전':'대회 종료'}
function targetOptions(){let r=S.active?S.active.reveal:-1,s='';for(let i=r+1;i<6;i++)s+='<option value="'+i+'" '+(selectedTarget===i?'selected':'')+'>'+ST[i]+' 진출</option>';return s}
