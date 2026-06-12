function selectTarget(i){selectedTarget=+i;render()}
function selectBetTeam(c){let a=S.active;if(a&&a.locked&&a.locked!==c&&stageAlive(a.reveal).includes(a.locked))return alert('처음 선택한 국가가 생존 중이므로 변경할 수 없음');selectedTeam=c;render()}
function addBetAmount(v){amount=Math.max(0,Math.floor(amount+v));syncAmountUI()}
function clearBetAmount(){amount=0;syncAmountUI()}
function setBetAmount(v){amount=Math.max(0,Math.floor(+v||0));syncAmountUI()}
function syncAmountUI(){let el=document.getElementById('betAmount');if(el)el.value=amount;let box=document.getElementById('oddsPreview');if(box&&S.active){let oi=oddsInfo(selectedTeam,selectedTarget),fr=feeRate(),f=Math.max(30,Math.ceil(amount*fr)),net=Math.floor(amount*oi.odds)-amount-f;box.innerHTML=oddsPreview(oi,f,net,fr)}}
function targetChips(){let r=S.active?S.active.reveal:-1;return'<div class="target-scroll">'+ST.map((x,i)=>{if(i<=r)return'';let oi=oddsInfo(selectedTeam,i);return'<button class="target-chip '+(selectedTarget===i?'on':'')+'" onclick="selectTarget('+i+')"><b>'+x+' 진출</b><small>'+oi.odds.toFixed(2)+'배</small></button>'}).join('')+'</div>'}
function countryBetGrid(alive,locked){let sorted=alive.slice().sort((x,y)=>rating(y)-rating(x));return'<div class="country-grid">'+sorted.map(c=>{let oi=oddsInfo(c,selectedTarget),opp=oi.opp?T[oi.opp][0]:'상대 미정';return'<button class="country-bet '+(selectedTeam===c?'on':'')+'" '+(locked&&locked!==c?'disabled':'')+' onclick="selectBetTeam(\''+c+'\')">'+flag(c)+'<span class="cname"><b>'+esc(T[c][0])+'</b><small>vs '+esc(opp)+' · '+(oi.mp==null?'대진전':Math.round(oi.mp*100)+'%')+'</small></span><span class="codds">'+oi.odds.toFixed(2)+'</span></button>'}).join('')+'</div>'}
function betPanel(){
  let a=S.active;
  if(!a)return'<div class="card bet-hero"><div class="bet-hero-head"><div><h2>제 '+(S.last+1)+'회 대회 준비</h2><p>대회를 생성한 뒤 조별리그 시작 전부터 목표 라운드 베팅 가능</p></div><div class="balance-pill ' + moneyTierClass(S.wallet.bal) + '"><span>보유 베팅 포인트</span><b>'+S.wallet.bal.toLocaleString()+'원</b></div></div><div class="bet-inner"><button class="btn primary" style="width:100%" onclick="prepare()">새 대회 생성</button></div></div>';
  if(a.reveal>=5)return'';
  if(a.recoveryRequired&&a.reveal<0&&!a.recovery)return'<div class="card bet-hero"><div class="bet-hero-head"><div><h2>구제 우승 예측 모드</h2><p>이전 대회 정산 후 보유금액이 130원 미만이어서 활성화됐으며, 현재 대회에서 베팅 후 잔액이 감소한 경우에는 전환되지 않음</p></div><div class="balance-pill ' + moneyTierClass(S.wallet.bal) + '"><span>현재 보유금액</span><b>'+S.wallet.bal.toLocaleString()+'원</b></div></div><div class="bet-inner"><div class="field"><label>우승 예상 국가</label><select id="recoveryTeam">'+C.slice().sort((x,y)=>T[x][0].localeCompare(T[y][0])).map(c=>'<option value="'+c+'">'+T[c][0]+' ('+c+')</option>').join('')+'</select></div><button class="btn gold bet-submit" onclick="recoveryPick()">무료 우승 예측 확정</button></div></div>';
  let alive=stageAlive(a.reveal),locked=a.locked&&alive.includes(a.locked)?a.locked:null;if(locked)selectedTeam=locked;else if(!alive.includes(selectedTeam))selectedTeam=alive[0];if(selectedTarget<=a.reveal)selectedTarget=a.reveal+1;
  let oi=oddsInfo(selectedTeam,selectedTarget),fr=feeRate(),f=Math.max(30,Math.ceil(amount*fr)),net=Math.floor(amount*oi.odds)-amount-f,already=a.bets.some(b=>b.window===windowKey());
  return'<div class="card bet-hero"><div class="bet-hero-head"><div><h2>▣ '+stageName(a.reveal)+' · 목표 라운드 베팅</h2><p>누적 진출확률과 다음 상대 전력을 반영하며 동일 대회 반복 베팅에는 누진 수수료 적용</p></div><div class="balance-pill ' + moneyTierClass(S.wallet.bal) + '"><span>보유 베팅 포인트</span><b>'+S.wallet.bal.toLocaleString()+'원</b></div></div><div class="bet-inner">'+
    '<div class="notice '+(locked?'warn':'')+' lockline">'+(locked?'🔒 '+T[locked][0]+' 생존 중 · 국가 변경 불가':'첫 베팅 국가가 확정되면 해당 국가가 탈락할 때까지 선택팀이 고정됨')+'</div>'+
    '<div class="target-label"><span>목표 라운드 선택</span><small>누적 진출확률·대진 난이도 반영</small></div>'+targetChips()+countryBetGrid(alive,locked)+
    '<div class="selected-bet"><div><small>선택 국가 · 다음 상대</small><b>'+team(selectedTeam)+' · '+(oi.opp?'vs '+team(oi.opp):'상대 미정')+'</b></div><button class="journey-btn" onclick="openJourney(\''+selectedTeam+'\')">진출 경로 보기</button></div>'+
    '<div class="amount-area"><div><div class="target-label"><span>베팅금액 추가</span><small>버튼을 누를 때마다 금액 누적</small></div><div class="amount-quick"><button onclick="addBetAmount(100)">+100</button><button onclick="addBetAmount(1000)">+1,000</button><button onclick="addBetAmount(10000)">+10,000</button><button onclick="addBetAmount(100000)">+100,000</button></div></div><div class="amount-input"><input id="betAmount" type="number" inputmode="numeric" min="0" step="10" value="'+amount+'" oninput="setBetAmount(this.value)" aria-label="베팅금액 직접 입력"><button class="btn" onclick="clearBetAmount()">초기화</button></div></div>'+
    '<div class="bet-preview" id="oddsPreview">'+oddsPreview(oi,f,net,fr)+'</div><button class="btn gold bet-submit" '+(already?'disabled':'')+' onclick="placeBet()">'+(already?'현재 시점 베팅 완료':'베팅 확정')+'</button></div></div>'
}
function oddsPreview(oi,f,net,fr){return'<div><span>목표 달성 추정확률</span><b>'+(oi.p*100).toFixed(2)+'%</b></div><div><span>배당률 · 상한 없음</span><b>'+oi.odds.toFixed(2)+'배</b></div><div><span>누진 수수료</span><b>'+Math.round(fr*100)+'% · '+f.toLocaleString()+'원</b></div><div><span>적중 시 예상 순손익</span><b class="'+(net>=0?'positive':'negative')+'">'+(net>=0?'+':'')+net.toLocaleString()+'원</b></div>'}
function groupHtml(t){return'<div class="groups">'+Object.keys(G).map(g=>'<div class="group"><h3>'+g+'조</h3><table><thead><tr><th>#</th><th>국가</th><th>승점</th><th>득실</th></tr></thead><tbody>'+t.tabs[g].map((x,i)=>'<tr class="'+(i<2?'q':'')+'"><td>'+(i+1)+'</td><td>'+team(x.c)+'</td><td><b>'+x.pts+'</b></td><td>'+((x.gf-x.ga)>0?'+':'')+(x.gf-x.ga)+'</td></tr>').join('')+'</tbody></table></div>').join('')+'</div>'}
function placeholderTeam(){return'<span class="team placeholder-team"><span class="placeholder-flag">?</span><span>대진 미정</span></span>'}
function treeMatchHtml(m,teamsKnown,result,label){
  if(!teamsKnown||!m)return'<div class="tree-match unrevealed unknown"><div class="tree-match-id">'+label+'</div><div class="tree-team">'+placeholderTeam()+'</div><div class="tree-team">'+placeholderTeam()+'</div><div class="spoiler-note">이전 라운드 결과 공개 후 대진 확정</div></div>';
  if(!result)return'<div class="tree-match unrevealed"><div class="tree-match-id">'+label+'</div><div class="tree-team">'+team(m.a)+'</div><div class="tree-team">'+team(m.b)+'</div><div class="spoiler-note">경기 결과 미공개</div></div>';
  return'<div class="tree-match"><div class="tree-match-id">'+label+'</div><div class="tree-team '+(m.w===m.a?'win':'')+'">'+team(m.a)+'<b>'+m.ga+'</b></div><div class="tree-team '+(m.w===m.b?'win':'')+'">'+team(m.b)+'<b>'+m.gb+'</b></div>'+(m.pen?'<small>승부차기 '+m.pen[0]+'-'+m.pen[1]+'</small>':'')+'</div>'
}
function bracketHtml(t,reveal){
  let labels=['32강','16강','8강','4강','결승'],roundCount=5,colW=188,gap=44,canvasH=1120,playTop=55,playH=1010;
  let width=roundCount*colW+(roundCount-1)*gap,cols='',paths='';
  for(let r=0;r<roundCount;r++){
    let round=t.rounds[r]||[],x=r*(colW+gap),teamsKnown=reveal>=r,result=reveal>=r+1,count=Math.pow(2,4-r);
    let matches=Array.from({length:count},(_,i)=>{
      let center=Math.pow(2,r)*(2*i+1),y=playTop+(center/32)*playH,m=teamsKnown?round[i]:null;
      return'<div class="tree-slot" style="top:'+y.toFixed(2)+'px">'+treeMatchHtml(m,teamsKnown,result,labels[r]+' '+(i+1))+'</div>'
    }).join('');
    let status=result?'결과 공개':teamsKnown?'대진 확정':'대진 대기';
    cols+='<section class="tree-round" style="left:'+x+'px;width:'+colW+'px"><div class="tree-round-head"><b>'+labels[r]+'</b><small>'+status+'</small></div>'+matches+'</section>';
    if(r<roundCount-1){
      let x1=x+colW,xMid=x1+gap/2,x2=(r+1)*(colW+gap),nextCount=Math.pow(2,3-r);
      for(let j=0;j<nextCount;j++){
        let ca=Math.pow(2,r)*(4*j+1),cb=Math.pow(2,r)*(4*j+3),cn=Math.pow(2,r+1)*(2*j+1);
        let ya=playTop+(ca/32)*playH,yb=playTop+(cb/32)*playH,yn=playTop+(cn/32)*playH;
        paths+='<path d="M '+x1+' '+ya.toFixed(2)+' H '+xMid+' V '+yn.toFixed(2)+' H '+x2+'"/><path d="M '+x1+' '+yb.toFixed(2)+' H '+xMid+' V '+yn.toFixed(2)+'"/>'
      }
    }
  }
  let third='';
  if(reveal>=5&&t.third){let x=3*(colW+gap),y=930;third='<div class="tree-third" style="left:'+x+'px;top:'+y+'px;width:'+colW+'px"><div class="tree-third-title">3·4위전</div>'+treeMatchHtml(t.third,true,true,'Match 103')+'</div>'}
  return'<div class="bracket-heading"><div><b>토너먼트 대진표</b><small>32강부터 결승까지 승자 이동 흐름</small></div><span>← 좌우 스크롤 →</span></div><div class="tree-scroll" id="tournamentBracket"><div class="tree-canvas" style="width:'+width+'px;height:'+canvasH+'px"><svg class="tree-lines" width="'+width+'" height="'+canvasH+'" viewBox="0 0 '+width+' '+canvasH+'" aria-hidden="true">'+paths+'</svg>'+cols+third+'</div></div>'
}
function stageSteps(r){let labels=['조별','32강','16강','8강','4강','결승'];return'<div class="steps">'+labels.map((x,i)=>{let done=r>=i,now=r<5&&i===r+1;return'<span class="step '+(done?'done ':'')+(now?'now':'')+'">'+x+'</span>'}).join('')+'</div>'}
function nextRevealLabel(r){return r<0?'조별리그 결과 공개':r===0?'32강 결과 공개':r===1?'16강 결과 공개':r===2?'8강 결과 공개':r===3?'4강 결과 공개':r===4?'결승 결과 공개':'대회 종료'}
function renderTour(){
  if(historyTour){let t=expand(historyTour);return'<div class="sectionhead"><div><h1>제 '+historyTour.n+'회 대진 기록</h1><p>'+new Date(historyTour.time).toLocaleString()+'</p></div><button class="btn" onclick="historyTour=null;bracketRound=0;render()">돌아가기</button></div><div class="champ"><div class="cup">🏆</div><div><small>우승</small><h2>'+team(t.champ)+'</h2></div></div><div class="card" style="margin-top:10px">'+bracketHtml(t,5)+'</div><details class="card details-card"><summary>조별리그 최종 순위 보기</summary><div style="margin-top:9px">'+groupHtml(t)+'</div></details>'}
  let a=S.active,s='<div class="sectionhead tournament-head"><div><h1>제 '+(S.last+1)+'회 '+(a?'월드컵':'대회 준비')+'</h1><p>결과는 조별리그부터 순차 공개되며 공개되지 않은 라운드의 점수는 표시하지 않음</p></div><button class="btn new-game-btn" onclick="openNewGameModal()">↻ 새 게임</button></div>'+betPanel();
  if(!a)return s+'<div class="card"><div class="summary"><div class="sum"><span>누적 대회</span><b>'+S.total.toLocaleString()+'회</b></div><div class="sum"><span>보유금액</span><b>'+S.wallet.bal.toLocaleString()+'원</b></div><div class="sum"><span>베팅 적중</span><b>'+S.wallet.hit+'회</b></div><div class="sum"><span>누적 손익</span><b class="'+(S.wallet.profit>=0?'positive':'negative')+'">'+S.wallet.profit.toLocaleString()+'원</b></div></div></div>';
  s+=stageSteps(a.reveal);
  if(a.reveal===0)s+='<div class="card"><div class="sectionhead"><div><h2>조별리그 최종 순위</h2><p>각 조 1·2위와 성적 상위 3위 8개국이 32강 진출</p></div></div>'+groupHtml(a.t)+'</div>';
  if(a.reveal>=0)s+='<div class="card">'+(a.reveal>=5?'<div class="champ" style="margin-bottom:10px"><div class="cup">🏆</div><div><small>WORLD CHAMPION</small><h2>'+team(a.t.champ)+'</h2></div></div>':'')+bracketHtml(a.t,a.reveal)+'</div>';
  s+='<div class="actions"><button class="btn primary" onclick="revealNext()" '+(a.reveal>=5?'disabled':'')+'>'+nextRevealLabel(a.reveal)+'</button>'+(a.reveal>=5?'<button class="btn gold" onclick="prepare()">다음 대회 준비</button>':'')+'</div>';
  if(a.reveal>0)s+='<details class="card details-card"><summary>조별리그 최종 순위 다시 보기</summary><div style="margin-top:9px">'+groupHtml(a.t)+'</div></details>';return s
}
function statButton(c,k,label){return'<button class="statbtn" onclick="openRecords(\''+c+'\',\''+k+'\')"><b>'+pct(S.teams[c][k])+'</b><small>'+label+'</small></button>'}
function renderStats(){let a=C.slice().sort((x,y)=>S.teams[y].win-S.teams[x].win||S.teams[y].fin-S.teams[x].fin||rating(y)-rating(x));return'<div class="sectionhead"><div><h1>누적 진출 확률</h1><p>확률을 누르면 해당 단계에 진출했던 최근 대진 기록 확인 가능</p></div></div><div class="card"><div class="actions"><button class="btn" onclick="runBatch(10)">10회 누적</button><button class="btn" onclick="runBatch(100)">100회 누적</button><button class="btn" onclick="runBatch(1000)">1,000회 누적</button></div></div><div class="statlist">'+a.map((c,i)=>'<div class="statrow"><div class="rank">'+(i+1)+'</div><button style="border:0;background:transparent;color:white;text-align:left;min-width:0" onclick="openTeam(\''+c+'\')">'+team(c)+'</button>'+statButton(c,'r32','32강')+statButton(c,'fin','결승')+statButton(c,'win','우승')+'</div>').join('')+'</div>'}
