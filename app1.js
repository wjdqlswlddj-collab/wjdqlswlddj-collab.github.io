
const STARTING_BALANCE=100000;
const T={"ALG":["알제리","Algeria","J",78,"dz",[["MAHREZ","FW",83],["AIT NOURI","DF",83],["AOUAR","MF",82]]],"ARG":["아르헨티나","Argentina","J",92,"ar",[["MESSI","FW",89],["E. FERNANDEZ","MF",89],["MOLINA","DF",89]]],"AUS":["호주","Australia","D",78,"au",[["HRUSTIC","FW",74],["MABIL","FW",73],["IRVINE","MF",73]]],"AUT":["오스트리아","Austria","J",84,"at",[["XAVER","MF",81],["SEIWALD","MF",80],["CHUKWUEMEKA","MF",79]]],"BEL":["벨기에","Belgium","G",87,"be",[["COURTOIS","GK",89],["DE BRUYNE","MF",88],["TROSSARD","FW",83]]],"BIH":["보스니아 헤르체고비나","Bosnia And Herzegovina","B",76,"ba",[["VASILJ","GK",71],["KATIĆ","DF",71],["TABAKOVIĆ","FW",71]]],"BRA":["브라질","Brazil","C",91,"br",[["A. BECKER","GK",89],["VINI JR.","FW",89],["ÉDERSON S.","MF",88]]],"CPV":["카보베르데","Cabo Verde","H",71,"cv",[["COSTA","DF",67],["L. DUARTE","MF",65],["VOZINHA","GK",64]]],"CAN":["캐나다","Canada","B",77,"ca",[["SALIBA","MF",88],["DAVIES","DF",85],["ST. CLAIR","GK",74]]],"COL":["콜롬비아","Colombia","K",86,"co",[["LUIS DIAZ","FW",87],["JAMES","MF",83],["C. HERNANDEZ","FW",82]]],"COD":["콩고민주공화국","Congo DR","K",76,"cd",[["CIPENGA","FW",72],["MPASI","GK",70],["MUKAU","MF",70]]],"CIV":["코트디부아르","Côte D'Ivoire","E",81,"ci",[["FOFANA","MF",77],["ADINGRA","FW",77],["YAN DIOMANDE","FW",77]]],"CRO":["크로아티아","Croatia","L",85,"hr",[["GVARDIOL","DF",86],["STANIŠIĆ","DF",81],["VLAŠIĆ","MF",81]]],"CUW":["퀴라소","Curaçao","E",65,"cw",[["VAN EIJMA","DF",60],["J. BACUNA","MF",60],["ANTONISSE","FW",60]]],"CZE":["체코","Czechia","A",78,"cz",[["KOVÁŘ","GK",74],["KREJČÍ","DF",74],["HRANÁČ","DF",73]]],"ECU":["에콰도르","Ecuador","E",83,"ec",[["HINCAPIE","DF",84],["ESTUPIÑÁN","DF",80],["M. CAICEDO","MF",79]]],"EGY":["이집트","Egypt","G",80,"eg",[["MARMOUSH","FW",85],["M. SALAH","FW",75],["H. HASSAN","FW",75]]],"ENG":["잉글랜드","England","L",91,"gb-eng",[["BELLINGHAM","MF",91],["KANE","FW",90],["RASHFORD","FW",89]]],"FRA":["프랑스","France","I",93,"fr",[["MBAPPE","FW",92],["THURAM","FW",91],["KONE","MF",90]]],"GER":["독일","Germany","E",89,"de",[["MUSIALA","MF",89],["WIRTZ","MF",89],["RÜDIGER","DF",87]]],"GHA":["가나","Ghana","L",78,"gh",[["ASANTE","FW",74],["OWUSU","MF",74],["KAMALDEEN","FW",74]]],"HAI":["아이티","Haiti","C",65,"ht",[["SAINTE","MF",60],["EXPERIENCE","DF",60],["BELLEGARDE","MF",60]]],"IRN":["이란","IR Iran","G",80,"ir",[["S. EZATOLAHI","MF",75],["A. ALIPOUR","FW",74],["ARYA","DF",74]]],"IRQ":["이라크","Iraq","I",72,"iq",[["YOUSSEF","MF",66],["AL-HAMADI","FW",66],["MOHANAD","FW",66]]],"JPN":["일본","Japan","F",84,"jp",[["KUBO","MF",84],["ENDO","MF",82],["SUZUKI","GK",81]]],"JOR":["요르단","Jordan","J",70,"jo",[["ALTAMARI","FW",66],["SA'DEH","MF",64],["ABU DAHAB","DF",63]]],"KOR":["대한민국","Korea Republic","A",80,"kr",[["HEUNGMIN","FW",86],["MINJAE","DF",84],["KANGIN","MF",84]]],"MEX":["멕시코","Mexico","A",82,"mx",[["FIDALGO","MF",78],["J. VÁSQUEZ","DF",77],["J. QUIÑONES","FW",77]]],"MAR":["모로코","Morocco","C",85,"ma",[["HAKIMI","DF",88],["BRAHIM","FW",86],["BONO","GK",84]]],"NED":["네덜란드","Netherlands","F",89,"nl",[["GRAVENBERCH","MF",85],["GAKPO","FW",85],["REIJNDERS","MF",85]]],"NZL":["뉴질랜드","New Zealand","G",69,"nz",[["WAINE","FW",65],["CROCOMBE","GK",63],["STAMENIC","MF",63]]],"NOR":["노르웨이","Norway","I",86,"no",[["ØDEGAARD","MF",89],["THORSTVEDT","MF",82],["NUSA","FW",82]]],"PAN":["파나마","Panama","L",74,"pa",[["ISMAEL","MF",69],["J.L. RODRÍGUEZ","MF",67],["CARRASQUILLA","MF",67]]],"PAR":["파라과이","Paraguay","D",79,"py",[["SANABRIA","FW",75],["CABALLERO","MF",75],["D. GÓMEZ","MF",74]]],"POR":["포르투갈","Portugal","K",90,"pt",[["MATHEUS N.","MF",88],["B. FERNANDES","MF",88],["G. RAMOS","FW",88]]],"QAT":["카타르","Qatar","B",72,"qa",[["SALAH","GK",89],["GUEYE","DF",66],["JASSEM","DF",66]]],"KSA":["사우디아라비아","Saudi Arabia","H",74,"sa",[["FERAS","FW",70],["MUSAB","MF",69],["AIMAN","FW",69]]],"SCO":["스코틀랜드","Scotland","C",79,"gb-sct",[["MCTOMINAY","MF",76],["MCGINN","MF",76],["DYKES","FW",75]]],"SEN":["세네갈","Senegal","I",84,"sn",[["LAMINE","MF",80],["B. DIENG","FW",80],["KRÉPIN","DF",80]]],"RSA":["남아프리카공화국","South Africa","A",72,"za",[["SITHOLE","MF",67],["MATULUDI","DF",66],["MBATHA","MF",66]]],"ESP":["스페인","Spain","H",92,"es",[["RODRIGO","MF",90],["MERINO","MF",89],["FERRAN","FW",89]]],"SWE":["스웨덴","Sweden","F",80,"se",[["ISAK","FW",87],["SVENSSON","DF",76],["ZETTERSTRÖM","GK",75]]],"SUI":["스위스","Switzerland","B",84,"ch",[["XHAKA","MF",85],["AKANJI","DF",84],["KOBEL","GK",80]]],"TUN":["튀니지","Tunisia","F",75,"tn",[["SAAD","FW",71],["SLIMANE","MF",71],["GHARBI","MF",70]]],"TUR":["튀르키예","Türkiye","D",82,"tr",[["ÖZCAN","MF",79],["YILDIZ","FW",79],["ZEKİ ÇELİK","DF",77]]],"URU":["우루과이","Uruguay","H",87,"uy",[["E. MARTINEZ","MF",88],["M. UGARTE","MF",84],["R. BENTANCUR","MF",84]]],"USA":["미국","USA","D",83,"us",[["PULISIC","FW",85],["PEPI","FW",79],["TILLMAN","MF",79]]],"UZB":["우즈베키스탄","Uzbekistan","K",74,"uz",[["KHUSANOV","DF",69],["MOZGOVOY","MF",69],["NEMATOV","GK",68]]]},G={"A":["MEX","RSA","KOR","CZE"],"B":["CAN","BIH","QAT","SUI"],"C":["BRA","MAR","HAI","SCO"],"D":["USA","PAR","AUS","TUR"],"E":["GER","CUW","CIV","ECU"],"F":["NED","JPN","SWE","TUN"],"G":["BEL","EGY","IRN","NZL"],"H":["ESP","CPV","KSA","URU"],"I":["FRA","SEN","IRQ","NOR"],"J":["ARG","ALG","AUT","JOR"],"K":["POR","COD","UZB","COL"],"L":["ENG","CRO","GHA","PAN"]},C=Object.keys(T),ST=['32강','16강','8강','4강','결승','우승'],SK=['r32','r16','qf','sf','fin','win'],FEE=[.03,.07,.12,.20,.32,.50],PAIR=[[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]],KEY='wc_mobile_site_v1';
let view='tour',historyTour=null,selectedTeam=C[0],selectedTarget=0,amount=0,busy=false,bracketRound=0,pendingBetResults=[];
function freshTeam(){return{gw:0,r32:0,r16:0,qf:0,sf:0,fin:0,win:0,pts:0,gf:0,ga:0}}
function fresh(){let teams={};C.forEach(c=>teams[c]=freshTeam());return{total:0,last:0,teams:teams,archives:[],wallet:{bal:STARTING_BALANCE,betN:0,hit:0,miss:0,fee:0,profit:0,log:[],recoveryTry:0,recoveryHit:0},active:null}}
function reviveTournament(t){
  if(!t||!Array.isArray(t.rounds))return null;
  t.gm=Array.isArray(t.gm)?t.gm:[];
  t.thirds=Array.isArray(t.thirds)?t.thirds:[];
  t.tabs=t.tabs&&typeof t.tabs==='object'?t.tabs:{};
  let reach={r32:new Set(),r16:new Set(),qf:new Set(),sf:new Set(),fin:new Set(),win:new Set()};
  (t.rounds[0]||[]).forEach(m=>{if(!m)return;if(m.a)reach.r32.add(m.a);if(m.b)reach.r32.add(m.b);if(m.w)reach.r16.add(m.w)});
  (t.rounds[1]||[]).forEach(m=>{if(m&&m.w)reach.qf.add(m.w)});
  (t.rounds[2]||[]).forEach(m=>{if(m&&m.w)reach.sf.add(m.w)});
  (t.rounds[3]||[]).forEach(m=>{if(m&&m.w)reach.fin.add(m.w)});
  let final=(t.rounds[4]||[])[0];
  if(t.champ)reach.win.add(t.champ);else if(final&&final.w){t.champ=final.w;reach.win.add(final.w)}
  if(!t.runner&&final&&final.w)t.runner=final.a===final.w?final.b:final.a;
  t.reach=reach;
  return t
}
function normalize(x){
  if(!x||!x.teams||!x.wallet)return fresh();
  C.forEach(c=>{if(!x.teams[c])x.teams[c]=freshTeam();else x.teams[c]=Object.assign(freshTeam(),x.teams[c])});
  x.total=+x.total||0;x.last=+x.last||0;x.archives=Array.isArray(x.archives)?x.archives:[];
  x.wallet=Object.assign(fresh().wallet,x.wallet||{});x.wallet.log=Array.isArray(x.wallet.log)?x.wallet.log:[];
  if(x.active){
    x.active.bets=Array.isArray(x.active.bets)?x.active.bets:[];
    x.active.reveal=Number.isInteger(x.active.reveal)?x.active.reveal:-1;
    x.active.locked=x.active.locked||null;x.active.committed=!!x.active.committed;x.active.recoverySettled=!!x.active.recoverySettled;
    if(typeof x.active.recoveryRequired!=='boolean')x.active.recoveryRequired=x.active.reveal<0&&x.wallet.bal<130&&x.active.bets.length===0;
    if(!x.active.recoveryRequired&&x.active.bets.length>0){x.active.recovery=null;x.active.recoverySettled=false}
    x.active.t=reviveTournament(x.active.t);
    if(!x.active.t)x.active=null
  }
  return x
}
function load(){try{let raw=localStorage.getItem(KEY);if(!raw)return fresh();return normalize(JSON.parse(raw))}catch(e){try{localStorage.removeItem(KEY)}catch(_){}return fresh()}}
let S=load();function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function esc(x){return String(x).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function flag(c){let iso=T[c][4];return iso?'<img class="flag" src="https://flagcdn.com/w40/'+iso+'.png" alt="'+c+'" onerror="this.outerHTML=\'<b>'+c+'</b>\'">':'<b>'+c+'</b>'}
function team(c){return'<span class="team">'+flag(c)+'<span>'+esc(T[c][0])+'</span></span>'}
function pct(n,d){d=d==null?S.total:d;return d?(n/d*100).toFixed(n/d*100<1?2:1)+'%':'0.0%'}
function rating(c){return T[c][3]}
function logistic(x){return 1/(1+Math.exp(-x))}
function poisson(l){let L=Math.exp(-l),p=1,k=0;do{k++;p*=Math.random()}while(p>L&&k<9);return k-1}
function play(a,b,ko,id){let d=(rating(a)-rating(b))/28,ga=poisson(Math.max(.18,1.28+d)),gb=poisson(Math.max(.18,1.28-d)),pen=null,w=null;if(ko&&ga===gb){let p=logistic((rating(a)-rating(b))/7),aw=Math.random()<p;pen=aw?[5,3]:[3,5];w=aw?a:b}else if(ga!==gb)w=ga>gb?a:b;return{id:id,a:a,b:b,ga:ga,gb:gb,w:w,pen:pen}}
function tableRow(c){return{c:c,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}}
