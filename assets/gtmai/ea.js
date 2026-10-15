function GTMAI_EA(__IN){
// generated from JARVIS_TradeCore.mq5 by mql2js.py - do not edit
var _t1,_t2,_t3,_t4,_t5,_t6,_t7,_t8,_t9,_t10,_t11,_t12,_t13,_t14,_t15,_t16,_t17,_t18,_t19,_t20,_t21,_t22,_t23,_t24,_t25,_t26,_t27,_t28,_t29,_t30,_t31,_t32,_t33,_t34,_t35,_t36,_t37,_t38,_t39,_t40,_t41,_t42,_t43,_t44,_t45,_t46,_t47,_t48,_t49,_t50,_t51,_t52,_t53,_t54,_t55,_t56,_t57,_t58,_t59,_t60,_t61,_t62,_t63,_t64,_t65,_t66,_t67,_t68,_t69,_t70,_t71,_t72,_t73,_t74,_t75,_t76,_t77,_t78,_t79,_t80,_t81,_t82,_t83,_t84,_t85,_t86,_t87,_t88,_t89,_t90,_t91,_t92,_t93,_t94,_t95,_t96,_t97,_t98,_t99,_t100,_t101,_t102,_t103,_t104,_t105,_t106,_t107,_t108,_t109,_t110,_t111,_t112,_t113,_t114,_t115,_t116,_t117,_t118,_t119,_t120,_t121,_t122,_t123,_t124,_t125,_t126,_t127,_t128,_t129,_t130,_t131,_t132,_t133,_t134,_t135,_t136,_t137,_t138,_t139,_t140,_t141,_t142,_t143,_t144,_t145,_t146,_t147,_t148,_t149,_t150,_t151,_t152,_t153,_t154,_t155,_t156,_t157,_t158,_t159,_t160,_t161,_t162,_t163,_t164,_t165,_t166,_t167,_t168,_t169,_t170,_t171,_t172,_t173,_t174,_t175,_t176,_t177,_t178,_t179,_t180,_t181,_t182,_t183,_t184,_t185,_t186,_t187,_t188,_t189,_t190,_t191,_t192,_t193,_t194,_t195,_t196,_t197,_t198,_t199,_t200,_t201,_t202,_t203,_t204,_t205,_t206,_t207,_t208,_t209,_t210,_t211,_t212,_t213,_t214,_t215,_t216,_t217,_t218,_t219,_t220,_t221,_t222,_t223,_t224,_t225,_t226,_t227,_t228,_t229,_t230,_t231,_t232,_t233,_t234,_t235,_t236,_t237,_t238,_t239,_t240,_t241,_t242,_t243,_t244,_t245,_t246,_t247,_t248,_t249,_t250;
class Setup{constructor(){this.on=false;this.tf=0;this.entry=0;this.dir=0;this.p1=0;this.p2=0;this.p3=0;this.lv1=0;this.lv2=0;this.ma=0;this.trend=false;this.trendP=0;this.slMode=0;this.sl=0;this.tp=0;this.lotMode=0;this.lot=0;this.risk=0;this.be=false;this.beAt=0;this.trail=false;this.trStart=0;this.trDist=0;this.htfOn=false;this.htf=0;this.htfType=0;this.hp1=0;this.hp2=0;this.hma=0;this.cwMode=0;this.cwN=0;this.cwPull=0;}_cp(){const o=new Setup();o.on=this.on;o.tf=this.tf;o.entry=this.entry;o.dir=this.dir;o.p1=this.p1;o.p2=this.p2;o.p3=this.p3;o.lv1=this.lv1;o.lv2=this.lv2;o.ma=this.ma;o.trend=this.trend;o.trendP=this.trendP;o.slMode=this.slMode;o.sl=this.sl;o.tp=this.tp;o.lotMode=this.lotMode;o.lot=this.lot;o.risk=this.risk;o.be=this.be;o.beAt=this.beAt;o.trail=this.trail;o.trStart=this.trStart;o.trDist=this.trDist;o.htfOn=this.htfOn;o.htf=this.htf;o.htfType=this.htfType;o.hp1=this.hp1;o.hp2=this.hp2;o.hma=this.hma;o.cwMode=this.cwMode;o.cwN=this.cwN;o.cwPull=this.cwPull; return o;}_zm(){this.on=false;this.tf=0;this.entry=0;this.dir=0;this.p1=0;this.p2=0;this.p3=0;this.lv1=0;this.lv2=0;this.ma=0;this.trend=false;this.trendP=0;this.slMode=0;this.sl=0;this.tp=0;this.lotMode=0;this.lot=0;this.risk=0;this.be=false;this.beAt=0;this.trail=false;this.trStart=0;this.trDist=0;this.htfOn=false;this.htf=0;this.htfType=0;this.hp1=0;this.hp2=0;this.hma=0;this.cwMode=0;this.cwN=0;this.cwPull=0;}}
class JTrade{constructor(){this.open=false;this.live=false;this.ticket=0;this.si=0;this.dir=0;this.tf=0;this.lot=0;this.entry=0;this.sl=0;this.tp=0;this.sl0=0;this.t0=0;this.t1=0;this.exitP=0;this.pl=0;this.win=false;this.beDone=false;this.trailOn=false;this.safe=false;this.id=0;}_cp(){const o=new JTrade();o.open=this.open;o.live=this.live;o.ticket=this.ticket;o.si=this.si;o.dir=this.dir;o.tf=this.tf;o.lot=this.lot;o.entry=this.entry;o.sl=this.sl;o.tp=this.tp;o.sl0=this.sl0;o.t0=this.t0;o.t1=this.t1;o.exitP=this.exitP;o.pl=this.pl;o.win=this.win;o.beDone=this.beDone;o.trailOn=this.trailOn;o.safe=this.safe;o.id=this.id; return o;}_zm(){this.open=false;this.live=false;this.ticket=0;this.si=0;this.dir=0;this.tf=0;this.lot=0;this.entry=0;this.sl=0;this.tp=0;this.sl0=0;this.t0=0;this.t1=0;this.exitP=0;this.pl=0;this.win=false;this.beDone=false;this.trailOn=false;this.safe=false;this.id=0;}}
class AnStat{constructor(){this.n=0;this.wins=0;this.losses=0;this.be=0;this.tpN=0;this.slN=0;this.beN=0;this.tslN=0;this.manN=0;this.buys=0;this.sells=0;this.bWins=0;this.sWins=0;this.maxWs=0;this.maxLs=0;this.net=0;this.gp=0;this.gl=0;this.best=0;this.worst=0;this.lots=0;this.bNet=0;this.sNet=0;}_cp(){const o=new AnStat();o.n=this.n;o.wins=this.wins;o.losses=this.losses;o.be=this.be;o.tpN=this.tpN;o.slN=this.slN;o.beN=this.beN;o.tslN=this.tslN;o.manN=this.manN;o.buys=this.buys;o.sells=this.sells;o.bWins=this.bWins;o.sWins=this.sWins;o.maxWs=this.maxWs;o.maxLs=this.maxLs;o.net=this.net;o.gp=this.gp;o.gl=this.gl;o.best=this.best;o.worst=this.worst;o.lots=this.lots;o.bNet=this.bNet;o.sNet=this.sNet; return o;}_zm(){this.n=0;this.wins=0;this.losses=0;this.be=0;this.tpN=0;this.slN=0;this.beN=0;this.tslN=0;this.manN=0;this.buys=0;this.sells=0;this.bWins=0;this.sWins=0;this.maxWs=0;this.maxLs=0;this.net=0;this.gp=0;this.gl=0;this.best=0;this.worst=0;this.lots=0;this.bNet=0;this.sNet=0;}}
var InpSymbols=(__IN.InpSymbols!==undefined?__IN.InpSymbols:"Volatility 10 Index,Volatility 10 (1s) Index,Volatility 25 Index,Volatility 25 (1s) Index,Volatility 50 Index,Volatility 50 (1s) Index,Volatility 75 Index,Volatility 75 (1s) Index,Volatility 100 Index,Volatility 100 (1s) Index");
var InpSimBalance=(__IN.InpSimBalance!==undefined?__IN.InpSimBalance:1000.0);
var InpAllowLive=(__IN.InpAllowLive!==undefined?__IN.InpAllowLive:true);
var InpMagic=(__IN.InpMagic!==undefined?__IN.InpMagic:850850);
var InpFrameMs=(__IN.InpFrameMs!==undefined?__IN.InpFrameMs:60);
var InpFont=(__IN.InpFont!==undefined?__IN.InpFont:"Bahnschrift");
var InpAIName=(__IN.InpAIName!==undefined?__IN.InpAIName:"GTM AI");
const ROLE_PANEL=0;
const ROLE_BRIDGE=1;
var InpRole=(__IN.InpRole!==undefined?__IN.InpRole:ROLE_PANEL);
var InpAiKey=(__IN.InpAiKey!==undefined?__IN.InpAiKey:"PASTE YOUR AI API KEY HERE");
var InpAiModel=(__IN.InpAiModel!==undefined?__IN.InpAiModel:"auto");
var InpAiBackup=(__IN.InpAiBackup!==undefined?__IN.InpAiBackup:"");
var InpAiPerMin=(__IN.InpAiPerMin!==undefined?__IN.InpAiPerMin:8);
var InpAiPerDay=(__IN.InpAiPerDay!==undefined?__IN.InpAiPerDay:400);
var InpTgToken=(__IN.InpTgToken!==undefined?__IN.InpTgToken:"PASTE YOUR TELEGRAM BOT TOKEN HERE");
var InpTgChat=(__IN.InpTgChat!==undefined?__IN.InpTgChat:0);
var InpTgNotify=(__IN.InpTgNotify!==undefined?__IN.InpTgNotify:true);
var InpTgChartAlerts=(__IN.InpTgChartAlerts!==undefined?__IN.InpTgChartAlerts:true);
const TGV_OFF=0;
const TGV_VOICE=1;
const TGV_ALWAYS=2;
var InpTgVoice=(__IN.InpTgVoice!==undefined?__IN.InpTgVoice:TGV_VOICE);
var InpSpeakReplies=(__IN.InpSpeakReplies!==undefined?__IN.InpSpeakReplies:true);
var InpVoicePerDay=(__IN.InpVoicePerDay!==undefined?__IN.InpVoicePerDay:20);
var InpTalkSec=(__IN.InpTalkSec!==undefined?__IN.InpTalkSec:0);
var InpTtsKey=(__IN.InpTtsKey!==undefined?__IN.InpTtsKey:"PASTE AZURE SPEECH KEY HERE (optional)");
var InpTtsRegion=(__IN.InpTtsRegion!==undefined?__IN.InpTtsRegion:"eastus");
var InpSpeechLang=(__IN.InpSpeechLang!==undefined?__IN.InpSpeechLang:"si-LK");
var gLotOverride=0;
var gTr=new CHashMap();
var gMiss=new CHashMap();
var gLang="en",gLangName="English",gLangFont="";
var gNoTr=false;
var gTrV=new CHashMap();
var gMissN=0;
var gLangT=((0)>>>0),gLangAskT=((0)>>>0),gLangWait=((6000)>>>0);
var LANGFILE="GTM_AI\\lang.txt";
var gBrTts=false;
var gSndWarn=false,gFileBad=false;
var gVDay=0,gVUsed=0;
var gVLearnT=((0)>>>0),gVoiceBackoff=((0)>>>0),gVDoneT=((0)>>>0);
var gVDoneN=0;
var vPendK=[];
var vPendT=[];
var gShotK=-1;
var gShotT=((0)>>>0);
var gShotCap="";
const NSYM=30;
const NAG=6;
const NENTRY=12;
const NTF=6;
const MAXB=400;
const MAXLOG=200;
var gRuleB=_A(NSYM,()=>""),gRuleS=_A(NSYM,()=>"");
const MAXHIST=1800;
const MAXT=300;
const NCONF=140;
const E_MA=0;
const E_RSI=1;
const E_MACD=2;
const E_BRK=3;
const E_BBB=4;
const E_BBX=5;
const E_STO=6;
const E_CCI=7;
const E_SAR=8;
const E_ADX=9;
const E_RULE=10;
const E_WSM=11;
var ENAME=_AFILL(["MA line cross","RSI level","MACD cross","Breakout","Bollinger bounce","Bollinger break","Stochastic cross","CCI level","Parabolic SAR flip","ADX +DI/-DI cross","AI rule (your own conditions)","MA cross + candle SL (WMA7 x SMMA39)"],NENTRY,"");
var ESHORT=_AFILL(["MA X","RSI","MACD","BRK","BB-B","BB-X","STO","CCI","SAR","ADX","RULE","MA-S"],NENTRY,"");
var TFV=_AFILL([PERIOD_M1,PERIOD_M5,PERIOD_M15,PERIOD_M30,PERIOD_H1,PERIOD_H4],NTF,0);
var TFN=_AFILL(["M1","M5","M15","M30","H1","H4"],NTF,"");
var MAN=_AFILL(["SMA","EMA","SMMA","WMA"],4,"");
var SLN=_AFILL(["$ money","Points","ATR x"],3,"");
var DIRN=_AFILL(["Buy + Sell","Buy only","Sell only"],3,"");
var AGN=_AFILL(["RADAR","ORACLE","JUDGE","STRIKER","GUARD","VAULT"],NAG,"");
var AGJOB=_AFILL(["scans your symbols","finds entry signals","checks the risk rules","opens the trades","moves SL: BE + trailing","keeps the account"],NAG,"");
const NHT=6;
var CWN=_AFILL(["No wait - open at once","Wait N candles","Wait N minutes","Wait for a pullback"],4,"");
var HTN=_AFILL(["MA fast above / below slow","Price above / below EMA","MACD above / below signal","RSI above / below 50","Parabolic SAR side","+DI above / below -DI"],NHT,"");
var cv=new CJCanvas();
var gTrade=new CTrade();
var CVNAME="JARVIS_CORE";
var gW=0,gH=0;
var gBg=[];
var gBgOk=false;
var gChartShowWas=true;
var gNS=0;
var gBufShift=1;
var gSym=_A(NSYM,()=>"");
var gShort=_A(NSYM,()=>"");
var gAvail=_A(NSYM,()=>false);
var gSet=_A(NSYM,()=>new Setup());
var gH1=_A(NSYM,()=>0),gH2=_A(NSYM,()=>0),gHT=_A(NSYM,()=>0),gHA=_A(NSYM,()=>0),gHH1=_A(NSYM,()=>0),gHH2=_A(NSYM,()=>0);
var gLastBar=_A(NSYM,()=>0);
var gConf=_A(NSYM,()=>_A(5,()=>0));
var gBias=_A(NSYM,()=>0);
var gSt=_A(NSYM,()=>0);
var gStT=_A(NSYM,()=>0);
var gNote=_A(NSYM,()=>"");
var gPend=_A(NSYM,()=>0);
var gPendPx=_A(NSYM,()=>0);
var gPendT=_A(NSYM,()=>0);
var gPendWhy=_A(NSYM,()=>"");
var gCol=_A(NSYM,()=>0);
var gT=[];
var gTN=0;
var gNextId=1;
var gMode=0;
var gSimStart=1000,gSimBal=1000;
var gMaxOpen=6,gGuardAfter=3;
var gCeleb=true,gLowAnim=false;
var gTester=false,gNoDraw=false;
var gTestSec=0;
var gRun=true;
var gTab=0;
var gFocus=-1;
var gAuto=true;
var gAutoT=((0)>>>0);
var gHistSel=-1;
var gReplayProg=1.0;
var gSelSym=0;
var gEdit=new Setup();
var gDirty=false;
var gLiveArm=0;
var gHist=[];
var gHistT=((0)>>>0);
var gLog=_A(MAXLOG,()=>"");
var gLogC=_A(MAXLOG,()=>0);
var gLogId=_A(MAXLOG,()=>0);
var gLogN=0,gLogNext=1,gLogOff=0,gSpNew=0;
var gAct=_A(NAG,()=>0);
var gAtx=_A(NAG,()=>"");
var gDelay=_A(NAG,()=>0);
var gDelayTx=_A(NAG,()=>"");
const NEDGE=9;
const MAXPK=40;
var pkE=_A(MAXPK,()=>0);
var pkT=_A(MAXPK,()=>0);
var pkC=_A(MAXPK,()=>0);
var pkN=0;
var gLoopT=((0)>>>0);
var gCoreF=0;
var gCoreMix=0;
var gCoreTx="";
var gLinkF=_A(NEDGE,()=>0);
var gCelebF=0;
var gCelebTx="";
var cfX=_A(NCONF,()=>0),cfY=_A(NCONF,()=>0),cfVX=_A(NCONF,()=>0),cfVY=_A(NCONF,()=>0);
var cfC=_A(NCONF,()=>0);
var gRedF=0;
var gRedTx="",gRedSym="",gCelebSym="";
var gBeF=0;
var gBeTx="";
var gFeat=_A(6,()=>0);
var FEATN=_AFILL(["Trend","Momentum","Volatility","Signal","Spread","Session"],6,"");
var bN=0;
var bx1=_A(MAXB,()=>0),by1=_A(MAXB,()=>0),bx2=_A(MAXB,()=>0),by2=_A(MAXB,()=>0);
var bId=_A(MAXB,()=>"");
var gFrame=((0)>>>0);
var gT0=((0)>>>0);
var gLastScan=((0)>>>0),gLastHeat=((0)>>>0),gLastManage=((0)>>>0),gLastAdopt=((0)>>>0),gArmT=((0)>>>0);
var gLiveStart=0;
var gCntSig=0,gCntOk=0,gCntHold=0,gCntOrd=0;
var gLastSig="",gLastJudge="",gLastOrd="",gLastGuard="";
var gHeatOff=0,gBoxOff=0,gBalN=0,gListOff=0,gHistOff=0,gEdOff=0;
var gLiveTf=-1,gZoom=80;
var gHistTf=-1,gHistZoom=30;
var gHcX=0,gHcY=0,gHcW=0,gHcH=0;
var gDrag=0,gDragK=-1;
var gDragPx=0;
var gChX=0,gChY=0,gChW=0,gChH=0,gChK=-1;
var gChLo=0,gChHi=1;
var gPrevLeft=false;
var gMX=-1,gMY=-1;
var gCloseArm=-1;
var gCloseT=((0)>>>0);
var gModal=0;
var gChartScrollWas=true;
var jN=0;
var jLive=[],jDir=[];
var jSym=[],jTag=[];
var jLot=[],jIn=[],jOut=[],jPL=[];
var jT0=[],jT1=[];
var gEditRB="",gEditRS="";
const MAXCHAT=120;
var chTx=_A(MAXCHAT,()=>"");
var chWho=_A(MAXCHAT,()=>0);
var chT=_A(MAXCHAT,()=>0);
var chN=0;
var gChatDraft="";
var gChatOff=0;
var gAiWait=false;
var gAiWaitT=((0)>>>0);
const MAXAPP=6;
var apId=_A(MAXAPP,()=>0);
var apTitle=_A(MAXAPP,()=>""),apText=_A(MAXAPP,()=>""),apActs=_A(MAXAPP,()=>""),apSrc=_A(MAXAPP,()=>"");
var apT=_A(MAXAPP,()=>0);
var apN=0,gApSeq=1;
var apTest=_A(MAXAPP,()=>"");
var gBrSaidT=((0)>>>0),gLockT=((0)>>>0);
var gDupe=false;
var gBrOnline=false,gBrGemini=false,gBrTg=false;
var gBrErr="",gBrModel="",gBrProv="";
var gBrReq=0,gBrReqMax=0;
var gBrBeat=0;
var gStateT=((0)>>>0),gBrCheckT=((0)>>>0);
var gSetView=0;
var gGuardOff=0;
var gAskAll=false;
var gdLossOn=true;
var gdLoss=5;
var gdLossPct=true;
var gdProfOn=true;
var gdProf=10;
var gdProfPct=true;
var gdDdOn=true;
var gdDd=15;
var gdSmartOn=true;
var gdSmartN=3;
var gdSmartCut=50;
var gdCoolOn=true;
var gdCoolMin=10;
var gdMaxOn=false;
var gdMax=20;
var gsLoss=_A(NSYM,()=>0),gsProf=_A(NSYM,()=>0);
var gsMax=_A(NSYM,()=>0);
var gdDay=0;
var gdPeak=0,gdDayEq0=0;
var gdLock=false;
var gdLockWhy="";
var gsLock=_A(NSYM,()=>false);
var gsLockWhy=_A(NSYM,()=>"");
var gsLastLoss=_A(NSYM,()=>0);
var gdConsLoss=0;
var gGuardT=((0)>>>0),gPollT=((0)>>>0);
const MAXWHY=300;
var whyId=_A(MAXWHY,()=>0);
var whyTx=_A(MAXWHY,()=>"");
var whyN=0;
function WhyOf(id){
  for(let i=0;i<whyN;i++) if(whyId[i]===id) return whyTx[i];
  return "";
}
function WhyAdd(id,tx){
  if(whyN>=MAXWHY) {
    for(let i=0;i<MAXWHY-1;i++) {
      whyId[i]=whyId[i+1];
      whyTx[i]=whyTx[i+1];
    }
    whyN--;
  }
  whyId[whyN]=id;
  whyTx[whyN]=tx;
  whyN++;
}
var gPick=false;
var gAll=[];
var gAllG=[];
var gGrp=[];
var gGrpSel=-1;
var gPage=0;
var gFind="";
var EDNAME="JARVIS_FIND";
var SETFILE="GTM_AI\\setups.csv";
var OLDSET="JARVIS\\jarvis_setups.csv";
var JRNFILE="GTM_AI\\journal.csv";
function C(r,g,b){
  return ((((((((0xFF000000|((((Math.trunc(r)>>>0)<<16)>>>0)))>>>0)|((((Math.trunc(g)>>>0)<<8)>>>0)))>>>0)|(Math.trunc(b)>>>0))>>>0))>>>0);
}
var CL_BG=0,CL_BG2=0,CL_PN=0,CL_LN=0,CL_TX=0,CL_MU=0,CL_CY=0,CL_MG=0,CL_AU=0,CL_UP=0,CL_DN=0,CL_VI=0,CL_BL=0,CL_DARK=0;
var AGC=_A(NAG,()=>0);
function InitColours(){
  CL_BG=((C(5,11,31))>>>0);
  CL_BG2=((C(9,20,48))>>>0);
  CL_PN=((C(12,24,54))>>>0);
  CL_LN=((C(35,64,122))>>>0);
  CL_TX=((C(228,243,255))>>>0);
  CL_MU=((C(130,163,201))>>>0);
  CL_CY=((C(63,224,255))>>>0);
  CL_MG=((C(255,95,210))>>>0);
  CL_AU=((C(255,179,71))>>>0);
  CL_UP=((C(61,255,160))>>>0);
  CL_DN=((C(255,77,109))>>>0);
  CL_VI=((C(167,139,255))>>>0);
  CL_BL=((C(77,139,255))>>>0);
  CL_DARK=((C(4,16,28))>>>0);
  AGC[0]=((CL_CY)>>>0);
  AGC[1]=((CL_VI)>>>0);
  AGC[2]=((CL_MG)>>>0);
  AGC[3]=((CL_BL)>>>0);
  AGC[4]=((CL_UP)>>>0);
  AGC[5]=((CL_AU)>>>0);
}
function Lerp(a,b,k){
  if(k<0) k=0;
  if(k>1) k=1;
  let ar=(((((a>>>16))&0xFF)>>>0)),ag=(((((a>>>8))&0xFF)>>>0)),ab=(((a&0xFF)>>>0));
  let br=(((((b>>>16))&0xFF)>>>0)),bg=(((((b>>>8))&0xFF)>>>0)),bb=(((b&0xFF)>>>0));
  return ((C(Math.trunc((ar+(br-ar)*k)),Math.trunc((ag+(bg-ag)*k)),Math.trunc((ab+(bb-ab)*k))))>>>0);
}
function Heat(v){
  return (((v<0.5?Lerp(C(150,30,60),C(180,140,20),v*2):Lerp(C(180,140,20),C(20,170,95),(v-0.5)*2)))>>>0);
}
function Money(v){
  return ((v<0?"-":""))+"$"+DoubleToString(MathAbs(v),2);
}
function Clamp(v,lo,hi){
  return (v<lo?lo:((v>hi?hi:v)));
}
function ClampI(v,lo,hi){
  return (v<lo?lo:((v>hi?hi:v)));
}
function Now(){
  return ((GetTickCount())>>>0);
}
function IMin(a,b){
  return (a<b?a:b);
}
function IMax(a,b){
  return (a>b?a:b);
}
function ShortName(s){
  let r=s;
  (_t1=StringReplace(r,"Volatility ","V"),r=_R[0],_t1);
  (_t2=StringReplace(r," Index",""),r=_R[0],_t2);
  (_t3=StringReplace(r," (1s)",".1s"),r=_R[0],_t3);
  (_t4=StringReplace(r,"Volatility","Vol"),r=_R[0],_t4);
  if(StringLen(r)>16) r=StringSubstr(r,0,16);
  return r;
}
function Log(m,c=0){
  for(let i=MAXLOG-1;i>0;i--) {
    gLog[i]=gLog[i-1];
    gLogC[i]=((gLogC[i-1])>>>0);
    gLogId[i]=gLogId[i-1];
  }
  gLog[0]=TimeToString(TimeLocal(),TIME_SECONDS)+"  "+m;
  gLogC[0]=((((c===0?CL_MU:c)))>>>0);
  gLogId[0]=gLogNext++;
  if(gLogN<MAXLOG) gLogN++;
  if(gLogOff>0) gLogOff++;
  else gSpNew=gLogId[0];
}
function SendPacket(e){
  if(e<0||e>=NEDGE||pkN>=MAXPK) return;
  let ec=_A(NEDGE,()=>0);
  ec[0]=((CL_VI)>>>0);
  ec[1]=((CL_MG)>>>0);
  ec[2]=((CL_BL)>>>0);
  ec[3]=((CL_UP)>>>0);
  ec[4]=((CL_AU)>>>0);
  ec[5]=((CL_AU)>>>0);
  ec[6]=((CL_CY)>>>0);
  ec[7]=((CL_UP)>>>0);
  ec[8]=((CL_VI)>>>0);
  pkE[pkN]=e;
  pkT[pkN]=0;
  pkC[pkN]=((ec[e])>>>0);
  pkN++;
  gLinkF[e]=40;
}
function Pulse(ag,tx,delay=0){
  if(ag<0||ag>=NAG) return;
  if(delay>0) {
    gDelay[ag]=delay;
    gDelayTx[ag]=tx;
    return;
  }
  gAct[ag]=(gLowAnim?25:45);
  gAtx[ag]=tx;
  if(ag>0) SendPacket(ag-1);
  else if(Now()-gLoopT>2600) {
    gLoopT=((Now())>>>0);
    SendPacket(6);
  }
}
const JS_NULL=0;
const JS_BOOL=1;
const JS_NUM=2;
const JS_STR=3;
const JS_ARR=4;
const JS_OBJ=5;
var jsT=[],jsFirst=[],jsNext=[],jsLast=[],jsCnt=[];
var jsK=[],jsS=[];
var jsD=[];
var jsN=0,jsPos=0,jsLen=0;
var jsSrc="";
function JsNew(type){
  if(ArraySize(jsT)<=jsN) {
    let ns=jsN+256;
    ArrayResize(jsT,ns,()=>0);
    ArrayResize(jsFirst,ns,()=>0);
    ArrayResize(jsNext,ns,()=>0);
    ArrayResize(jsLast,ns,()=>0);
    ArrayResize(jsCnt,ns,()=>0);
    ArrayResize(jsK,ns,()=>"");
    ArrayResize(jsS,ns,()=>"");
    ArrayResize(jsD,ns,()=>0);
  }
  jsT[jsN]=type;
  jsFirst[jsN]=-1;
  jsNext[jsN]=-1;
  jsLast[jsN]=-1;
  jsCnt[jsN]=0;
  jsK[jsN]="";
  jsS[jsN]="";
  jsD[jsN]=0;
  jsN++;
  return jsN-1;
}
function JsAdd(parent,child){
  if(jsFirst[parent]<0) jsFirst[parent]=child;
  else jsNext[jsLast[parent]]=child;
  jsLast[parent]=child;
  jsCnt[parent]++;
}
function JsCh(){
  return (jsPos<jsLen?StringGetCharacter(jsSrc,jsPos):0);
}
function JsWs(){
  while(jsPos<jsLen) {
    let c=StringGetCharacter(jsSrc,jsPos);
    if(c===32||c===9||c===13||c===10) jsPos++;
    else break;
  }
}
function JsHex(c){
  if(c>=48&&c<=57) return c-48;
  if(c>=97&&c<=102) return c-97+10;
  if(c>=65&&c<=70) return c-65+10;
  return 0;
}
function JsReadStr(){
  let out="";
  jsPos++;
  let start=jsPos;
  while(jsPos<jsLen) {
    let c=StringGetCharacter(jsSrc,jsPos);
    if(c===34) {
      out+=StringSubstr(jsSrc,start,jsPos-start);
      jsPos++;
      return out;
    }
    if(c===92) {
      out+=StringSubstr(jsSrc,start,jsPos-start);
      jsPos++;
      let e=JsCh();
      if(e===110) out+="\n";
      else if(e===116) out+="\t";
      else if(e===114) out+="\r";
      else if(e===98||e===102) {
      }
      else if(e===117&&jsPos+4<jsLen) {
        let v=JsHex(StringGetCharacter(jsSrc,jsPos+1))*4096+JsHex(StringGetCharacter(jsSrc,jsPos+2))*256+JsHex(StringGetCharacter(jsSrc,jsPos+3))*16+JsHex(StringGetCharacter(jsSrc,jsPos+4));
        out+=ShortToString(v);
        jsPos+=4;
      }
      else out+=ShortToString(e);
      jsPos++;
      start=jsPos;
      continue;
    }
    jsPos++;
  }
  return out+StringSubstr(jsSrc,start);
}
function JsVal(depth){
  JsWs();
  if(jsPos>=jsLen) return JsNew(JS_NULL);
  if(depth>40) {
    jsPos++;
    return JsNew(JS_NULL);
  }
  let c=JsCh();
  if(c===123) {
    let o=JsNew(JS_OBJ);
    jsPos++;
    while(jsPos<jsLen) {
      JsWs();
      if(JsCh()===125) {
        jsPos++;
        break;
      }
      if(JsCh()===44) {
        jsPos++;
        continue;
      }
      if(JsCh()!==34) {
        jsPos++;
        continue;
      }
      let k=JsReadStr();
      JsWs();
      if(JsCh()===58) jsPos++;
      let v=JsVal(depth+1);
      jsK[v]=k;
      JsAdd(o,v);
    }
    return o;
  }
  if(c===91) {
    let a=JsNew(JS_ARR);
    jsPos++;
    while(jsPos<jsLen) {
      JsWs();
      if(JsCh()===93) {
        jsPos++;
        break;
      }
      if(JsCh()===44) {
        jsPos++;
        continue;
      }
      let v=JsVal(depth+1);
      JsAdd(a,v);
    }
    return a;
  }
  if(c===34) {
    let s=JsNew(JS_STR);
    jsS[s]=JsReadStr();
    return s;
  }
  if(StringSubstr(jsSrc,jsPos,4)==="true") {
    let b=JsNew(JS_BOOL);
    jsD[b]=1;
    jsPos+=4;
    return b;
  }
  if(StringSubstr(jsSrc,jsPos,5)==="false") {
    let b=JsNew(JS_BOOL);
    jsD[b]=0;
    jsPos+=5;
    return b;
  }
  if(StringSubstr(jsSrc,jsPos,4)==="null") {
    jsPos+=4;
    return JsNew(JS_NULL);
  }
  let st=jsPos;
  while(jsPos<jsLen) {
    let d=JsCh();
    if((d>=48&&d<=57)||d===45||d===43||d===46||d===101||d===69) jsPos++;
    else break;
  }
  if(jsPos===st) {
    jsPos++;
    return JsNew(JS_NULL);
  }
  let n=JsNew(JS_NUM);
  jsS[n]=StringSubstr(jsSrc,st,jsPos-st);
  jsD[n]=StringToDouble(jsS[n]);
  return n;
}
function JParse(s){
  jsN=0;
  jsSrc=s;
  jsLen=StringLen(s);
  jsPos=0;
  let a=StringFind(s,"{"),b=StringFind(s,"[");
  if(a<0&&b<0) return -1;
  jsPos=((a<0)?b:(((b<0)?a:IMin(a,b))));
  return JsVal(0);
}
function JGet(node,key){
  if(node<0||node>=jsN||jsT[node]!==JS_OBJ) return -1;
  for(let c=jsFirst[node];c>=0;c=jsNext[c]) if(jsK[c]===key) return c;
  return -1;
}
function JLen(node){
  return ((node<0||node>=jsN)?0:jsCnt[node]);
}
function JAt(node,i){
  if(node<0||node>=jsN) return -1;
  let k=0;
  for(let c=jsFirst[node];c>=0;c=jsNext[c]) {
    if(k===i) return c;
    k++;
  }
  return -1;
}
function JStr(node,def=""){
  if(node<0||node>=jsN) return def;
  if(jsT[node]===JS_STR||jsT[node]===JS_NUM) return jsS[node];
  if(jsT[node]===JS_BOOL) return (jsD[node]!==0?"true":"false");
  return def;
}
function JNum(node,def=0){
  if(node<0||node>=jsN) return def;
  if(jsT[node]===JS_NUM||jsT[node]===JS_BOOL) return jsD[node];
  if(jsT[node]===JS_STR&&jsS[node]!=="") {
    let t=jsS[node];
    (_t5=StringReplace(t,"$",""),t=_R[0],_t5);
    (_t6=StringReplace(t,"%",""),t=_R[0],_t6);
    return StringToDouble(t);
  }
  return def;
}
function JBool(node,def=false){
  if(node<0||node>=jsN) return def;
  if(jsT[node]===JS_BOOL||jsT[node]===JS_NUM) return jsD[node]!==0;
  if(jsT[node]===JS_STR) {
    let t=jsS[node];
    (_t7=StringToLower(t),t=_R[0],_t7);
    return (t==="true"||t==="on"||t==="yes"||t==="1");
  }
  return def;
}
function JGS(node,key,def=""){
  return JStr(JGet(node,key),def);
}
function JGN(node,key,def=0){
  return JNum(JGet(node,key),def);
}
function JGB(node,key,def=false){
  return JBool(JGet(node,key),def);
}
function JHas(node,key){
  return JGet(node,key)>=0;
}
function JEsc(s){
  let r=s;
  (_t8=StringReplace(r,"\\","\\\\"),r=_R[0],_t8);
  (_t9=StringReplace(r,"\"","\\\""),r=_R[0],_t9);
  (_t10=StringReplace(r,"\n","\\n"),r=_R[0],_t10);
  (_t11=StringReplace(r,"\r",""),r=_R[0],_t11);
  (_t12=StringReplace(r,"\t"," "),r=_R[0],_t12);
  return r;
}
function JDump(node){
  if(node<0||node>=jsN) return "null";
  switch(jsT[node]) {
    case JS_NULL:
      return "null";
    case JS_BOOL:
      return (jsD[node]!==0?"true":"false");
    case JS_NUM:
      return jsS[node];
    case JS_STR:
      return "\""+JEsc(jsS[node])+"\"";
    case JS_ARR:
      {
        let r="[";
        let f=true;
        for(let c=jsFirst[node];c>=0;c=jsNext[c]) {
          r+=((f?"":","))+JDump(c);
          f=false;
        }
        return r+"]";
      }
  }
  let r="{";
  let f=true;
  for(let c=jsFirst[node];c>=0;c=jsNext[c]) {
    r+=((f?"":","))+"\""+JEsc(jsK[c])+"\":"+JDump(c);
    f=false;
  }
  return r+"}";
}
function JQ(s){
  return "\""+JEsc(s)+"\"";
}
function JNumS(v,dg=2){
  return DoubleToString(v,dg);
}
var BRDIR="GTM_AI\\bridge\\";
function FWriteUtf8(name,text){
  let b=[];
  let n=StringToCharArray(text,b,0,WHOLE_ARRAY,CP_UTF8);
  if(n>0&&b[n-1]===0) n--;
  let h=FileOpen(name,FILE_WRITE|FILE_BIN);
  if(h===INVALID_HANDLE) return false;
  if(n>0) FileWriteArray(h,b,0,n);
  FileClose(h);
  return true;
}
function FReadUtf8(name){
  let h=FileOpen(name,FILE_READ|FILE_BIN|FILE_SHARE_READ|FILE_SHARE_WRITE);
  if(h===INVALID_HANDLE) return "";
  let sz=FileSize(h);
  let s="";
  if(sz>0) {
    let b=[];
    FileReadArray(h,b,0,sz);
    s=CharArrayToString(b,0,WHOLE_ARRAY,CP_UTF8);
  }
  FileClose(h);
  return s;
}
var gMsgSeq=((0)>>>0);
function MailSend(prefix,json){
  gMsgSeq++;
  let id=IntegerToString(GetTickCount())+"_"+IntegerToString(gMsgSeq)+"_"+IntegerToString((MathRand()%1000));
  let tmp=BRDIR+"tmp_"+prefix+id+".json",fin=BRDIR+prefix+id+".json";
  if(!FWriteUtf8(tmp,json)) return false;
  return FileMove(tmp,0,fin,FILE_REWRITE);
}
function FileSizeOf(rel){
  let f=FileOpen(rel,FILE_READ|FILE_BIN|FILE_SHARE_READ|FILE_SHARE_WRITE);
  if(f===INVALID_HANDLE) return 1;
  let z=FileSize(f);
  FileClose(f);
  return z;
}
function MailRead(prefix,out,maxn=8){
  ArrayResize(out,0,()=>"");
  let names=[];
  let nn=0;
  let fn="";
  let hf=(_t13=FileFindFirst(BRDIR+prefix+"*.json",fn),fn=_R[0],_t13);
  if(hf===INVALID_HANDLE) return 0;
  do {
    ArrayResize(names,nn+1,()=>"");
    names[nn]=fn;
    nn++;
  } while(nn<64&&(_t14=FileFindNext(hf,fn),fn=_R[0],_t14));
  FileFindClose(hf);
  let k=0;
  for(let i=0;i<nn&&k<maxn;i++) {
    let full=BRDIR+names[i];
    let s=FReadUtf8(full);
    if(s===""&&FileIsExist(full)&&FileSizeOf(full)>0&&TimeLocal()-FileGetInteger(full,FILE_MODIFY_DATE)<30) continue;
    FileDelete(full);
    if(s==="") continue;
    ArrayResize(out,k+1,()=>"");
    out[k]=s;
    k++;
  }
  return k;
}
function FWriteAtomic(name,text){
  let tmp=name+".tmp";
  if(!FWriteUtf8(tmp,text)) return false;
  return FileMove(tmp,0,name,FILE_REWRITE);
}
const NVOICE=30;
const NCLIP=263;
const V_ONLINE=0;
const V_SCAN=1;
const V_PAUSE=2;
const V_WAIT=3;
const V_HELD=4;
const V_BUY=5;
const V_SELL=6;
const V_REFUSED=7;
const V_BE=8;
const V_TRAIL=9;
const V_TP=10;
const V_TRAILWIN=11;
const V_SL=12;
const V_BECLOSE=13;
const V_MANWIN=14;
const V_MANLOSS=15;
const V_CONFIRM=16;
const V_LIVE=17;
const V_SIM=18;
const V_ALGO=19;
const V_LEVELS=20;
const V_CANCEL=21;
const V_GLOSS=22;
const V_GPROF=23;
const V_GDD=24;
const V_GSYM=25;
const V_APPROVE=26;
const V_DONE=27;
const V_TGMSG=28;
const V_AIOK=29;
const L_GSYMON=138;
var VSENT=_AFILL([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,135,136,137,138,139,140,141,142],NVOICE,0);
const L_BUYON=22;
const L_SELLON=23;
const L_TPON=24;
const L_WELLDONE=25;
const L_TRAILWINON=26;
const L_SLON=27;
const L_BECLOSEON=28;
const L_CLOSEDON=29;
const L_SIGON=30;
const L_WAITCONF=31;
const L_HELDON=32;
const L_RISK=33;
const L_BEON=34;
const L_TRAILON=35;
const L_LEVON=36;
const L_CANCON=37;
const L_REFON=38;
const W_PLUS=39;
const W_MINUS=40;
const W_DOLLAR=41;
const W_DOLLARS=42;
const W_AND=43;
const W_CENT=44;
const W_CENTS=45;
const W_HUNDRED=46;
const W_THOUSAND=47;
const N_0=48;
const N_1=49;
const N_2=50;
const N_3=51;
const N_4=52;
const N_5=53;
const N_6=54;
const N_7=55;
const N_8=56;
const N_9=57;
const N_10=58;
const N_11=59;
const N_12=60;
const N_13=61;
const N_14=62;
const N_15=63;
const N_16=64;
const N_17=65;
const N_18=66;
const N_19=67;
const T_20=68;
const T_30=69;
const T_40=70;
const T_50=71;
const T_60=72;
const T_70=73;
const T_80=74;
const T_90=75;
const S_VOLATILITY=76;
const S_ONESEC=77;
const S_BOOM=78;
const S_CRASH=79;
const S_JUMP=80;
const S_STEP=81;
const S_RANGE=82;
const S_DRIFT=83;
const S_BEAR=84;
const S_BULL=85;
const S_DEX=86;
const S_MULTI=87;
const S_HYBRID=88;
const S_TREND=89;
const S_BASKET=90;
const S_GOLD=91;
const S_SILVER=92;
const S_BITCOIN=93;
const S_ETHEREUM=94;
const S_LITECOIN=95;
const S_OIL=96;
const S_NASDAQ=97;
const S_DOW=98;
const S_SP=99;
const S_DAX=100;
const S_EUR=101;
const S_USD=102;
const S_GBP=103;
const S_JPY=104;
const S_AUD=105;
const S_NZD=106;
const S_CAD=107;
const S_CHF=108;
const A_A=109;
const A_B=110;
const A_C=111;
const A_D=112;
const A_E=113;
const A_F=114;
const A_G=115;
const A_H=116;
const A_I=117;
const A_J=118;
const A_K=119;
const A_L=120;
const A_M=121;
const A_N=122;
const A_O=123;
const A_P=124;
const A_Q=125;
const A_R=126;
const A_S=127;
const A_T=128;
const A_U=129;
const A_V=130;
const A_W=131;
const A_X=132;
const A_Y=133;
const A_Z=134;
var VMS=_AFILL([2455,1444,2743,2424,2348,1397,1352,1835,2027,1679,2034,2427,2130,1884,1742,1638,1826,3309,1401,2659,1402,1324,1543,1465,1401,1187,1515,1340,1702,1146,1252,1662,1220,1600,1952,1824,1687,1571,1231,591,772,588,749,558,517,593,782,859,716,559,559,676,635,612,613,739,602,709,553,823,656,810,805,899,826,962,773,839,708,760,715,739,681,830,655,781,1016,1015,546,656,568,531,1009,912,1076,962,625,1060,779,748,768,769,648,854,967,896,594,806,1125,1095,547,681,588,665,608,659,636,845,603,532,571,604,612,509,715,684,578,532,636,527,449,506,538,529,519,561,443,550,572,508,586,882,529,640,622,3112,4002,2685,1572,1658,946,1782,1862,3022,1682,4191,2577,2787,1670,1638,2241,2366,1538,2637,2721,1386,1844,1529,1467,2351,3786,1246,2774,1464,1285,3631,5132,3453,2317,1637,942,1926,1781,2793,1536,3643,2512,3000,1629,1629,1729,1916,1444,2571,1980,1409,1480,1354,1231,2072,3397,1100,3316,1406,1229,3885,4891,4244,2367,1610,1022,1710,1880,2598,1479,4091,2584,3017,1780,1773,2022,2186,1577,2527,2030,1461,1653,1304,1546,2193,3635,1157,3367,1505,1215,3602,4381,4183,2459,1699,1056,1831,1757,2398,1605,3735,2440,3260,1889,1949,1989,1962,1557,2801,2263,1483,1294,1279,1324,2330,3516,1648,3320,1485,1458,4392,6146,3761,2867,1745,1181,1830,1821],NCLIP,0);
var VCD=_AFILL([0,0,0,45,600,2,2,60,3,5,0,0,0,0,0,0,0,0,0,0,0,60,0,0,0,0,3,3,10,600],NVOICE,0);
var VLAB=_AFILL(["ONLINE","SCANNING","PAUSED","CONFIRMING","SIGNAL HELD","BUY ORDER","SELL ORDER","REFUSED","BREAK-EVEN","TRAILING","TAKE PROFIT","PROFIT","STOP LOSS","BREAK-EVEN","CLOSED +","CLOSED -","CONFIRM LIVE","LIVE MODE","SIMULATOR","ALGO OFF","LEVELS SET","CANCELLED","LOSS LIMIT","PROFIT TARGET","DRAWDOWN","SYMBOL LIMIT","APPROVE?","DONE","TELEGRAM","BRIDGE ON"],NVOICE,"");
var vLast=_A(NVOICE,()=>0);
const MAXVQ=96;
var vQ=_A(MAXVQ,()=>0);
var vQL=_A(MAXVQ,()=>0);
var vQT=_A(MAXVQ,()=>0);
var vQN=0;
var vQF=_A(MAXVQ,()=>"");
var vQM=_A(MAXVQ,()=>0);
var gVoiceEnd=((0)>>>0);
var gVoice=true;
var vCurType=-1;
function VRes(id){
  return "::GTMAI_voice\\v"+((id<100?"0":""))+((id<10?"0":""))+IntegerToString(id)+".wav";
}
function VBegin(type,urgent){
  if(!gVoice||type<0||type>=NVOICE) return false;
  let now=((Now())>>>0);
  let cd=VCD[type];
  if(cd>=30&&InpTalkSec>0) cd=InpTalkSec;
  if(cd>0&&vLast[type]>0&&now-vLast[type]<(Math.trunc(cd)>>>0)*1000) return false;
  if(!urgent&&vQN>MAXVQ-24) return false;
  vLast[type]=((now)>>>0);
  if(urgent) {
    vQN=0;
    gVoiceEnd=((0)>>>0);
    PlaySound(null);
  }
  vCurType=type;
  return true;
}
function VPush(id){
  if(vQN>=MAXVQ||id<-1||id>=NCLIP) return;
  vQ[vQN]=id;
  vQL[vQN]=vCurType;
  vQT[vQN]=((Now())>>>0);
  vCurType=-1;
  vQN++;
}
function VEnd(){
  VPush(-1);
}
function VNum(n){
  if(n<0) n=-n;
  if(n>=1000000) n=999999;
  let said=false;
  if(n>=1000) {
    VNum(Math.trunc(n/1000));
    VPush(W_THOUSAND);
    n%=1000;
    said=true;
  }
  if(n>=100) {
    VPush(N_0+(Math.trunc(n/100)));
    VPush(W_HUNDRED);
    n%=100;
    said=true;
  }
  if(n>=20) {
    VPush(T_20+(Math.trunc(n/10))-2);
    if((n%10)>0) VPush(N_0+((n%10)));
    return;
  }
  if(n>0||!said) VPush(N_0+n);
}
function VMoney(v){
  v=MathAbs(v);
  let d=Math.trunc(MathFloor(v+1e-9));
  let c=Math.trunc(MathRound((v-d)*100));
  if(c>=100) {
    d++;
    c-=100;
  }
  if(d>0) {
    VNum(d);
    VPush((d===1?W_DOLLAR:W_DOLLARS));
    if(c>0&&d<100) {
      VPush(W_AND);
      VNum(c);
      VPush((c===1?W_CENT:W_CENTS));
    }
  }
  else if(c>0) {
    VNum(c);
    VPush((c===1?W_CENT:W_CENTS));
  }
  else {
    VPush(N_0);
    VPush(W_DOLLARS);
  }
}
function VCur(c){
  if(c==="EUR") return S_EUR;
  if(c==="USD") return S_USD;
  if(c==="GBP") return S_GBP;
  if(c==="JPY") return S_JPY;
  if(c==="AUD") return S_AUD;
  if(c==="NZD") return S_NZD;
  if(c==="CAD") return S_CAD;
  if(c==="CHF") return S_CHF;
  return -1;
}
function VAsset(c){
  if(c==="XAU") return S_GOLD;
  if(c==="XAG") return S_SILVER;
  if(c==="BTC") return S_BITCOIN;
  if(c==="ETH") return S_ETHEREUM;
  if(c==="LTC") return S_LITECOIN;
  if(c==="XTI"||c==="WTI"||c==="XBR"||c==="UKO"||c==="USO") return S_OIL;
  return -1;
}
function VWord(w){
  if(w==="VOLATILITY") return S_VOLATILITY;
  if(w==="BOOM") return S_BOOM;
  if(w==="CRASH") return S_CRASH;
  if(w==="JUMP") return S_JUMP;
  if(w==="STEP") return S_STEP;
  if(w==="RANGE") return S_RANGE;
  if(w==="DRIFT") return S_DRIFT;
  if(w==="BEAR") return S_BEAR;
  if(w==="BULL") return S_BULL;
  if(w==="DEX") return S_DEX;
  if(w==="MULTI") return S_MULTI;
  if(w==="HYBRID") return S_HYBRID;
  if(w==="TREND") return S_TREND;
  if(w==="BASKET") return S_BASKET;
  if(w==="GOLD") return S_GOLD;
  if(w==="SILVER") return S_SILVER;
  if(w==="BITCOIN") return S_BITCOIN;
  if(w==="ETHEREUM") return S_ETHEREUM;
  if(w==="OIL") return S_OIL;
  if(w==="NASDAQ"||w==="NAS"||w==="USTEC"||w==="NDX") return S_NASDAQ;
  if(w==="DOW"||w==="DJ"||w==="DJI") return S_DOW;
  if(w==="SPX"||w==="SP") return S_SP;
  if(w==="DAX"||w==="GER"||w==="DE") return S_DAX;
  return -1;
}
function VSkip(w){
  return (w==="INDEX"||w==="INDICES"||w==="MARKET"||w==="BREAK"||w==="SWITCH"||w==="");
}
function VSpell(w){
  let n=StringLen(w),i=0,said=0;
  while(i<n&&said<8) {
    let ch=StringGetCharacter(w,i);
    if(ch>=48&&ch<=57) {
      let j=i;
      while(j<n&&StringGetCharacter(w,j)>=48&&StringGetCharacter(w,j)<=57) j++;
      VNum(StringToInteger(StringSubstr(w,i,j-i)));
      i=j;
      said++;
      continue;
    }
    if(ch>=65&&ch<=90) {
      VPush(A_A+(ch-65));
      said++;
    }
    i++;
  }
}
function VSym(sym){
  let s=sym;
  (_t15=StringReplace(s,"(1s)"," 1S "),s=_R[0],_t15);
  (_t16=StringReplace(s,"(1S)"," 1S "),s=_R[0],_t16);
  (_t17=StringReplace(s,"("," "),s=_R[0],_t17);
  (_t18=StringReplace(s,")"," "),s=_R[0],_t18);
  (_t19=StringReplace(s,"-"," "),s=_R[0],_t19);
  (_t20=StringReplace(s,"/"," "),s=_R[0],_t20);
  (_t21=StringReplace(s,"_"," "),s=_R[0],_t21);
  let tk=[];
  let nt=StringSplit(s,32,tk);
  let said=0;
  for(let t=0;t<nt&&said<6;t++) {
    let w=tk[t];
    let dot=StringFind(w,".");
    if(dot>0) w=StringSubstr(w,0,dot);
    let hs=StringFind(w,"#");
    if(hs>0) w=StringSubstr(w,0,hs);
    if(StringLen(w)===7) {
      let lc=StringGetCharacter(w,6);
      if(lc>=97&&lc<=122) w=StringSubstr(w,0,6);
    }
    (_t22=StringToUpper(w),w=_R[0],_t22);
    if(VSkip(w)) continue;
    if(w==="1S") {
      VPush(S_ONESEC);
      said++;
      continue;
    }
    let k=VWord(w);
    if(k>=0) {
      VPush(k);
      said++;
      continue;
    }
    let digits=true;
    for(let q=0;q<StringLen(w);q++) {
      let ch=StringGetCharacter(w,q);
      if(ch<48||ch>57) {
        digits=false;
        break;
      }
    }
    if(digits) {
      VNum(StringToInteger(w));
      said++;
      continue;
    }
    if(StringLen(w)===6) {
      let a=StringSubstr(w,0,3),b=StringSubstr(w,3,3);
      let ca=VCur(a),cb=VCur(b),aa=VAsset(a);
      if(aa>=0) {
        VPush(aa);
        said++;
        continue;
      }
      if(ca>=0&&cb>=0) {
        VPush(ca);
        VPush(cb);
        said+=2;
        continue;
      }
    }
    let p=0;
    while(p<StringLen(w)&&(StringGetCharacter(w,p)<48||StringGetCharacter(w,p)>57)) p++;
    if(p>0&&p<StringLen(w)) {
      let kw=VWord(StringSubstr(w,0,p));
      if(kw>=0) {
        VPush(kw);
        VNum(StringToInteger(StringSubstr(w,p)));
        said+=2;
        continue;
      }
    }
    VSpell(w);
    said++;
  }
}
function VLead(type){
  switch(type) {
    case V_BUY:
      return L_BUYON;
    case V_SELL:
      return L_SELLON;
    case V_TP:
      return L_TPON;
    case V_TRAILWIN:
      return L_TRAILWINON;
    case V_SL:
      return L_SLON;
    case V_BECLOSE:
      return L_BECLOSEON;
    case V_MANWIN:
      return L_CLOSEDON;
    case V_MANLOSS:
      return L_CLOSEDON;
    case V_WAIT:
      return L_SIGON;
    case V_HELD:
      return L_HELDON;
    case V_BE:
      return L_BEON;
    case V_TRAIL:
      return L_TRAILON;
    case V_LEVELS:
      return L_LEVON;
    case V_CANCEL:
      return L_CANCON;
    case V_REFUSED:
      return L_REFON;
    case V_GSYM:
      return L_GSYMON;
  }
  return VSENT[ClampI(type,0,NVOICE-1)];
}
function Say(type,urgent=false){
  if(!VBegin(type,urgent)) return;
  if(VPhrase(type)) {
    VEnd();
    return;
  }
  VPush(VSENT[type]);
  VEnd();
}
function SaySym(type,sym,urgent=false){
  if(!VBegin(type,urgent)) return;
  if(VPhrase(type)) {
    VSym(sym);
    VEnd();
    return;
  }
  VPush(VLead(type));
  VSym(sym);
  if(type===V_WAIT) VPush(L_WAITCONF);
  if(type===V_HELD) VPush(L_RISK);
  VEnd();
}
function SayTrade(type,sym,pl){
  if(!VBegin(type,true)) return;
  if(VPhrase(type)) {
    VSym(sym);
    if(type!==V_BECLOSE) {
      VPush((pl>=0?W_PLUS:W_MINUS));
      VMoney(pl);
    }
    VEnd();
    return;
  }
  VPush(VLead(type));
  VSym(sym);
  if(type!==V_BECLOSE) {
    VPush((pl>=0?W_PLUS:W_MINUS));
    VMoney(pl);
  }
  if(type===V_TP) VPush(L_WELLDONE);
  VEnd();
}
function VoiceTick(){
  if(vQN===0||Now()<gVoiceEnd) return;
  let id=vQ[0],lab=vQL[0];
  let vf=vQF[0];
  let vm=vQM[0];
  let qt=((vQT[0])>>>0);
  for(let i=0;i<vQN-1;i++) {
    vQ[i]=vQ[i+1];
    vQL[i]=vQL[i+1];
    vQF[i]=vQF[i+1];
    vQM[i]=vQM[i+1];
    vQT[i]=((vQT[i+1])>>>0);
  }
  vQN--;
  if(id!==-1&&Now()-qt>((id===-2&&lab<0?180000:40000))) {
    while(vQN>0&&vQ[0]!==-1&&Now()-vQT[0]>40000&&!(vQ[0]===-2&&vQL[0]<0)) {
      for(let i=0;i<vQN-1;i++) {
        vQ[i]=vQ[i+1];
        vQL[i]=vQL[i+1];
        vQF[i]=vQF[i+1];
        vQM[i]=vQM[i+1];
        vQT[i]=((vQT[i+1])>>>0);
      }
      vQN--;
    }
    return;
  }
  if(id===-2) {
    if(!gVoice) return;
    if(VPlayFile(vf)) {
      gVoiceEnd=((Now()+(Math.trunc(IMax(300,vm+120))>>>0))>>>0);
      gCoreF=IMax(gCoreF,Math.trunc(vm/ClampI(InpFrameMs,40,200))+4);
      if(lab>=0) gCoreTx=VLAB[lab];
    }
    return;
  }
  if(id<0) {
    gVoiceEnd=((Now()+220)>>>0);
    return;
  }
  if(!gVoice) return;
  if(PlaySound(VRes(id))) {
    gVoiceEnd=((Now()+(Math.trunc(IMax(60,VMS[id]-15))>>>0))>>>0);
    gCoreF=IMax(gCoreF,Math.trunc(VMS[id]/ClampI(InpFrameMs,40,200))+4);
    if(lab>=0) gCoreTx=VLAB[lab];
  }
}
function Pt(si){
  let p=SymbolInfoDouble(gSym[si],SYMBOL_POINT);
  return (p>0?p:0.00001);
}
function Dg(si){
  return SymbolInfoInteger(gSym[si],SYMBOL_DIGITS);
}
function PBid(si){
  return SymbolInfoDouble(gSym[si],SYMBOL_BID);
}
function PAsk(si){
  return SymbolInfoDouble(gSym[si],SYMBOL_ASK);
}
var gVppC=_A(NSYM,()=>0);
var gVppT=_A(NSYM,()=>0);
var gVppS=_A(NSYM,()=>"");
function ValPerPrice(si,lot){
  if(si<0||si>=gNS||lot<=0) return 0;
  let nw=((GetTickCount())>>>0);
  if(gVppC[si]<=0||gVppS[si]!==gSym[si]||nw-gVppT[si]>3000) {
    let sy=gSym[si];
    let ts=SymbolInfoDouble(sy,SYMBOL_TRADE_TICK_SIZE),mv=((ts>0?ts:Pt(si)))*200.0;
    let bid=SymbolInfoDouble(sy,SYMBOL_BID),prof=0,v=0;
    if(bid>0&&mv>0&&(_t23=OrderCalcProfit(ORDER_TYPE_BUY,sy,1.0,bid,bid+mv,prof),prof=_R[0],_t23)&&prof>0) v=prof/mv;
    if(v<=0) {
      let tv=SymbolInfoDouble(sy,SYMBOL_TRADE_TICK_VALUE);
      if(ts>0&&tv>0) v=tv/ts;
    }
    gVppC[si]=v;
    gVppT[si]=((nw)>>>0);
    gVppS[si]=sy;
  }
  return lot*gVppC[si];
}
function MinLot(si){
  let mn=SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_MIN);
  return (mn>0?mn:0.01);
}
function NormLot(si,v){
  let st=SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_STEP);
  let mn=SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_MIN);
  let mx=SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_MAX);
  if(st<=0) st=0.01;
  v=MathFloor(v/st+1e-9)*st;
  if(v<mn) v=mn;
  if(mx>0&&v>mx) v=mx;
  let dg=Math.trunc(MathCeil(-MathLog10(st)));
  dg=ClampI(dg,0,8);
  return NormalizeDouble(v,dg);
}
function Balance(){
  return (gMode===1?AccountInfoDouble(ACCOUNT_BALANCE):gSimBal);
}
function TradePL(t){
  if(t.si<0||t.si>=gNS) return 0;
  if(t.live) {
    if(PositionSelectByTicket(t.ticket)) return PositionGetDouble(POSITION_PROFIT)+PositionGetDouble(POSITION_SWAP);
    return t.pl;
  }
  let px=(t.dir>0?PBid(t.si):PAsk(t.si));
  if(px<=0) return t.pl;
  return (px-t.entry)*t.dir*ValPerPrice(t.si,t.lot);
}
function OpenCount(mode){
  let n=0;
  for(let i=0;i<gTN;i++) if(gT[i].open&&(gT[i].live===(mode===1))) n++;
  return n;
}
function SafeCount(mode){
  let n=0;
  for(let i=0;i<gTN;i++) if(gT[i].open&&gT[i].safe&&(gT[i].live===(mode===1))) n++;
  return n;
}
function HasOpen(si){
  for(let i=0;i<gTN;i++) if(gT[i].open&&gT[i].si===si&&gT[i].live===(gMode===1)) return true;
  return false;
}
function HasOpenAny(si){
  for(let i=0;i<gTN;i++) if(gT[i].open&&gT[i].si===si) return true;
  return false;
}
function Floating(mode){
  let f=0;
  for(let i=0;i<gTN;i++) if(gT[i].open&&(gT[i].live===(mode===1))) f+=gT[i].pl;
  return f;
}
function Equity(){
  return (gMode===1?AccountInfoDouble(ACCOUNT_EQUITY):gSimBal+Floating(0));
}
function WinStats(closed,wins){
  closed=0;
  wins=0;
  for(let i=0;i<gTN;i++) if(!gT[i].open&&gT[i].live===(gMode===1)) {
    closed++;
    if(gT[i].win) wins++;
  }
  _R=[closed,wins];
}
function DefaultParams(s){
  s.p1=0;
  s.p2=0;
  s.p3=0;
  s.lv1=0;
  s.lv2=0;
  switch(s.entry) {
    case E_MA:
      s.p1=9;
      s.p2=21;
      break;
    case E_RSI:
      s.p1=14;
      s.lv1=30;
      s.lv2=70;
      break;
    case E_MACD:
      s.p1=12;
      s.p2=26;
      s.p3=9;
      break;
    case E_BRK:
      s.p1=20;
      break;
    case E_BBB:
      s.p1=20;
      s.lv1=2.0;
      break;
    case E_BBX:
      s.p1=20;
      s.lv1=2.0;
      break;
    case E_STO:
      s.p1=14;
      s.p2=3;
      s.p3=3;
      s.lv1=20;
      s.lv2=80;
      break;
    case E_CCI:
      s.p1=14;
      s.lv1=100;
      break;
    case E_SAR:
      s.lv1=0.02;
      s.lv2=0.2;
      break;
    case E_ADX:
      s.p1=14;
      s.lv1=20;
      break;
    case E_WSM:
      s.p1=7;
      s.p2=39;
      s.p3=10;
      s.lv1=1.0;
      s.lv2=2;
      s.ma=3;
      break;
  }
}
function DefaultSetup(s){
  s.on=true;
  s.tf=0;
  s.entry=E_WSM;
  s.dir=0;
  s.ma=1;
  s.trend=false;
  s.trendP=50;
  s.slMode=0;
  s.sl=6;
  s.tp=10;
  s.lotMode=0;
  s.lot=0.5;
  s.risk=1.0;
  s.be=true;
  s.beAt=50;
  s.trail=true;
  s.trStart=70;
  s.trDist=60;
  s.htfOn=false;
  s.htf=4;
  s.htfType=0;
  s.hp1=9;
  s.hp2=21;
  s.hma=1;
  s.cwMode=0;
  s.cwN=2;
  s.cwPull=25;
  DefaultParams(s);
}
function ParamInfo(entry,k,lab,step,mn,mx,dig){
  lab="";
  step=1;
  mn=1;
  mx=500;
  dig=0;
  switch(entry) {
    case E_MA:
      if(k===0) lab="Fast MA period";
      if(k===1) lab="Slow MA period";
      break;
    case E_RSI:
      if(k===0) lab="RSI period";
      if(k===3) {
        lab="BUY when RSI crosses up";
        mn=1;
        mx=99;
      }
      if(k===4) {
        lab="SELL when RSI crosses down";
        mn=1;
        mx=99;
      }
      break;
    case E_MACD:
      if(k===0) lab="MACD fast";
      if(k===1) lab="MACD slow";
      if(k===2) lab="MACD signal";
      break;
    case E_BRK:
      if(k===0) {
        lab="Breakout of last N candles";
        mn=2;
        mx=300;
      }
      break;
    case E_BBB:
    case E_BBX:
      if(k===0) lab="Bands period";
      if(k===3) {
        lab="Deviation";
        step=0.1;
        mn=0.5;
        mx=5;
        dig=1;
      }
      break;
    case E_STO:
      if(k===0) lab="%K period";
      if(k===1) lab="%D period";
      if(k===2) lab="Slowing";
      if(k===3) {
        lab="Oversold level";
        mn=1;
        mx=99;
      }
      if(k===4) {
        lab="Overbought level";
        mn=1;
        mx=99;
      }
      break;
    case E_CCI:
      if(k===0) lab="CCI period";
      if(k===3) {
        lab="CCI level (+/-)";
        step=10;
        mn=10;
        mx=400;
      }
      break;
    case E_SAR:
      if(k===3) {
        lab="SAR step";
        step=0.01;
        mn=0.01;
        mx=0.5;
        dig=2;
      }
      if(k===4) {
        lab="SAR maximum";
        step=0.05;
        mn=0.05;
        mx=1;
        dig=2;
      }
      break;
    case E_ADX:
      if(k===0) lab="ADX period";
      if(k===3) {
        lab="Minimum ADX";
        mn=0;
        mx=80;
      }
      break;
    case E_WSM:
      if(k===0) lab="Fast MA period";
      if(k===1) lab="Slow MA period";
      if(k===2) {
        lab="Stop loss: look back (candles)";
        mn=2;
        mx=100;
      }
      if(k===3) {
        lab="Take profit = SL x  (1 = 1:1, 3 = 1:3)";
        step=0.5;
        mn=0.5;
        mx=20;
        dig=1;
      }
      break;
  }
  { const _rv=lab!==""; _R=[lab,step,mn,mx,dig]; return _rv; }
  _R=[lab,step,mn,mx,dig];
}
function ClampSetup(s){
  s.tf=ClampI(s.tf,0,NTF-1);
  s.entry=ClampI(s.entry,0,NENTRY-1);
  s.dir=ClampI(s.dir,0,2);
  s.p1=ClampI(s.p1,0,500);
  s.p2=ClampI(s.p2,0,500);
  s.p3=ClampI(s.p3,0,500);
  s.lv1=Clamp(s.lv1,0,1000);
  s.lv2=Clamp(s.lv2,0,1000);
  s.ma=ClampI(s.ma,0,3);
  s.trendP=ClampI(s.trendP,2,500);
  s.slMode=ClampI(s.slMode,0,2);
  s.sl=Clamp(s.sl,0.01,100000);
  s.tp=Clamp(s.tp,0.01,100000);
  s.lotMode=ClampI(s.lotMode,0,1);
  s.lot=Clamp(s.lot,0.00001,1000);
  s.cwMode=ClampI(s.cwMode,0,3);
  s.cwN=ClampI(s.cwN,1,100);
  s.cwPull=Clamp(s.cwPull,5,100);
  s.risk=Clamp(s.risk,0.1,20);
  s.beAt=Clamp(s.beAt,5,100);
  s.trStart=Clamp(s.trStart,5,100);
  s.trDist=Clamp(s.trDist,5,200);
  s.htf=ClampI(s.htf,0,NTF-1);
  s.htfType=ClampI(s.htfType,0,NHT-1);
  s.hp1=ClampI(s.hp1,2,500);
  s.hp2=ClampI(s.hp2,2,500);
  s.hma=ClampI(s.hma,0,3);
  if(s.entry!==E_SAR) {
    if(s.p1<1) DefaultParams(s);
  }
  if(s.entry===E_WSM) {
    s.lv2=(+ClampI(Math.trunc(MathRound(s.lv2)),0,3));
    s.p3=ClampI(s.p3,2,100);
    s.lv1=Clamp(s.lv1,0.2,20);
  }
}
var gAccKey="",gSavedAcc="";
function AccountKeyNow(){
  let lg=AccountInfoInteger(ACCOUNT_LOGIN);
  if(lg<=0) return "";
  let sv=AccountInfoString(ACCOUNT_SERVER);
  (_t24=StringReplace(sv,";","_"),sv=_R[0],_t24);
  return IntegerToString(lg)+"@"+sv;
}
function LotsToBroker(){
  let n=0;
  for(let i=0;i<gNS;i++) if(gAvail[i]) {
    let mn=MinLot(i);
    if(MathAbs(gSet[i].lot-mn)>1e-9) {
      gSet[i].lot=mn;
      n++;
    }
  }
  if(gSelSym>=0&&gSelSym<gNS&&!gDirty) gEdit.lot=gSet[gSelSym].lot;
  return n;
}
function SetupLine(si){
  let s=_cp(gSet[si]);
  return gSym[si]+";"+((s.on?"1":"0"))+";"+IntegerToString(s.tf)+";"+IntegerToString(s.entry)+";"+IntegerToString(s.dir)+";"+IntegerToString(s.p1)+";"+IntegerToString(s.p2)+";"+IntegerToString(s.p3)+";"+DoubleToString(s.lv1,4)+";"+DoubleToString(s.lv2,4)+";"+IntegerToString(s.ma)+";"+((s.trend?"1":"0"))+";"+IntegerToString(s.trendP)+";"+IntegerToString(s.slMode)+";"+DoubleToString(s.sl,4)+";"+DoubleToString(s.tp,4)+";"+IntegerToString(s.lotMode)+";"+DoubleToString(s.lot,4)+";"+DoubleToString(s.risk,2)+";"+((s.be?"1":"0"))+";"+DoubleToString(s.beAt,1)+";"+((s.trail?"1":"0"))+";"+DoubleToString(s.trStart,1)+";"+DoubleToString(s.trDist,1)+";"+((s.htfOn?"1":"0"))+";"+IntegerToString(s.htf)+";"+IntegerToString(s.htfType)+";"+IntegerToString(s.hp1)+";"+IntegerToString(s.hp2)+";"+IntegerToString(s.hma)+";"+IntegerToString(s.cwMode)+";"+IntegerToString(s.cwN)+";"+DoubleToString(s.cwPull,1);
}
function SetRead(){
  if(FileIsExist(SETFILE)) return SETFILE;
  if(FileIsExist(OLDSET)) return OLDSET;
  return "";
}
function SaveAll(){
  let h=FileOpen(SETFILE,FILE_WRITE|FILE_TXT|FILE_ANSI);
  if(h===INVALID_HANDLE) {
    Log("Could not save the settings file",CL_DN);
    return false;
  }
  FileWriteString(h,"G;"+IntegerToString(gMaxOpen)+";"+IntegerToString(gGuardAfter)+";"+DoubleToString(gSimStart,2)+";"+((gCeleb?"1":"0"))+";"+((gLowAnim?"1":"0"))+";"+((gVoice?"1":"0"))+";"+gAccKey+"\n");
  let sl="S";
  for(let i=0;i<gNS;i++) sl+=";"+gSym[i];
  FileWriteString(h,sl+"\n");
  for(let i=0;i<gNS;i++) FileWriteString(h,SetupLine(i)+"\n");
  for(let i=0;i<gNS;i++) if(gRuleB[i]!==""||gRuleS[i]!=="") {
    let rb=gRuleB[i],rs=gRuleS[i];
    (_t25=StringReplace(rb,";"," "),rb=_R[0],_t25);
    (_t26=StringReplace(rs,";"," "),rs=_R[0],_t26);
    (_t27=StringReplace(rb,"\n"," "),rb=_R[0],_t27);
    (_t28=StringReplace(rs,"\n"," "),rs=_R[0],_t28);
    FileWriteString(h,"R;"+gSym[i]+";"+rb+";"+rs+"\n");
  }
  FileClose(h);
  return true;
}
function LoadAll(){
  for(let i=0;i<gNS;i++) {
    DefaultSetup(gSet[i]);
    if(gAvail[i]) gSet[i].lot=MinLot(i);
  }
  let fn=SetRead();
  if(fn==="") return;
  let h=FileOpen(fn,FILE_READ|FILE_TXT|FILE_ANSI);
  if(h===INVALID_HANDLE) return;
  while(!FileIsEnding(h)) {
    let line=FileReadString(h);
    let p=[];
    let n=StringSplit(line,59,p);
    if(n>=6&&p[0]==="G") {
      gMaxOpen=ClampI(StringToInteger(p[1]),1,10);
      gGuardAfter=ClampI(StringToInteger(p[2]),1,10);
      gSimStart=Clamp(StringToDouble(p[3]),10,10000000);
      gCeleb=(p[4]==="1");
      gLowAnim=(p[5]==="1");
      if(n>=7) gVoice=(p[6]==="1");
      if(n>=8) gSavedAcc=p[7];
      continue;
    }
    if(n>=1&&p[0]==="S") continue;
    if(n>=4&&p[0]==="R") {
      for(let i=0;i<gNS;i++) if(gSym[i]===p[1]) {
        gRuleB[i]=p[2];
        gRuleS[i]=p[3];
      }
      continue;
    }
    if(n<24) continue;
    for(let i=0;i<gNS;i++) {
      if(gSym[i]!==p[0]) continue;
      let s=new Setup();
      s.on=(p[1]==="1");
      s.tf=StringToInteger(p[2]);
      s.entry=StringToInteger(p[3]);
      s.dir=StringToInteger(p[4]);
      s.p1=StringToInteger(p[5]);
      s.p2=StringToInteger(p[6]);
      s.p3=StringToInteger(p[7]);
      s.lv1=StringToDouble(p[8]);
      s.lv2=StringToDouble(p[9]);
      s.ma=StringToInteger(p[10]);
      s.trend=(p[11]==="1");
      s.trendP=StringToInteger(p[12]);
      s.slMode=StringToInteger(p[13]);
      s.sl=StringToDouble(p[14]);
      s.tp=StringToDouble(p[15]);
      s.lotMode=StringToInteger(p[16]);
      s.lot=StringToDouble(p[17]);
      s.risk=StringToDouble(p[18]);
      s.be=(p[19]==="1");
      s.beAt=StringToDouble(p[20]);
      s.trail=(p[21]==="1");
      s.trStart=StringToDouble(p[22]);
      s.trDist=StringToDouble(p[23]);
      s.htfOn=false;
      s.htf=4;
      s.htfType=0;
      s.hp1=9;
      s.hp2=21;
      s.hma=1;
      s.cwMode=0;
      s.cwN=2;
      s.cwPull=25;
      if(n>=33) {
        s.cwMode=StringToInteger(p[30]);
        s.cwN=StringToInteger(p[31]);
        s.cwPull=StringToDouble(p[32]);
      }
      else if(MathAbs(s.lot-0.5)<1e-9) s.lot=MinLot(i);
      if(n>=30) {
        s.htfOn=(p[24]==="1");
        s.htf=StringToInteger(p[25]);
        s.htfType=StringToInteger(p[26]);
        s.hp1=StringToInteger(p[27]);
        s.hp2=StringToInteger(p[28]);
        s.hma=StringToInteger(p[29]);
      }
      ClampSetup(s);
      gSet[i]=_cp(s);
    }
  }
  FileClose(h);
}
function Release(h){
  if(h!==INVALID_HANDLE) IndicatorRelease(h);
  h=INVALID_HANDLE;
  _R=[h];
}
function MakeHandles(si){
  if(si<0||si>=gNS) return;
  (_t29=Release(gH1[si]),gH1[si]=_R[0],_t29);
  (_t30=Release(gH2[si]),gH2[si]=_R[0],_t30);
  (_t31=Release(gHT[si]),gHT[si]=_R[0],_t31);
  (_t32=Release(gHA[si]),gHA[si]=_R[0],_t32);
  (_t33=Release(gHH1[si]),gHH1[si]=_R[0],_t33);
  (_t34=Release(gHH2[si]),gHH2[si]=_R[0],_t34);
  if(!gAvail[si]) return;
  let s=_cp(gSet[si]);
  let sym=gSym[si];
  let tf=TFV[ClampI(s.tf,0,NTF-1)];
  switch(s.entry) {
    case E_MA:
      gH1[si]=iMA(sym,tf,IMax(1,s.p1),0,s.ma,PRICE_CLOSE);
      gH2[si]=iMA(sym,tf,IMax(1,s.p2),0,s.ma,PRICE_CLOSE);
      break;
    case E_WSM:
      gH1[si]=iMA(sym,tf,IMax(1,s.p1),0,ClampI(s.ma,0,3),PRICE_CLOSE);
      gH2[si]=iMA(sym,tf,IMax(1,s.p2),0,ClampI(Math.trunc(MathRound(s.lv2)),0,3),PRICE_CLOSE);
      break;
    case E_RSI:
      gH1[si]=iRSI(sym,tf,IMax(2,s.p1),PRICE_CLOSE);
      break;
    case E_MACD:
      gH1[si]=iMACD(sym,tf,IMax(1,s.p1),IMax(2,s.p2),IMax(1,s.p3),PRICE_CLOSE);
      break;
    case E_BBB:
    case E_BBX:
      gH1[si]=iBands(sym,tf,IMax(2,s.p1),0,MathMax(0.1,s.lv1),PRICE_CLOSE);
      break;
    case E_STO:
      gH1[si]=iStochastic(sym,tf,IMax(1,s.p1),IMax(1,s.p2),IMax(1,s.p3),MODE_SMA,STO_LOWHIGH);
      break;
    case E_CCI:
      gH1[si]=iCCI(sym,tf,IMax(2,s.p1),PRICE_TYPICAL);
      break;
    case E_SAR:
      gH1[si]=iSAR(sym,tf,MathMax(0.001,s.lv1),MathMax(0.01,s.lv2));
      break;
    case E_ADX:
      gH1[si]=iADX(sym,tf,IMax(2,s.p1));
      break;
  }
  if(s.trend) gHT[si]=iMA(sym,tf,IMax(2,s.trendP),0,MODE_EMA,PRICE_CLOSE);
  if(s.slMode===2) gHA[si]=iATR(sym,tf,14);
  if(s.htfOn) {
    let ht=TFV[ClampI(s.htf,0,NTF-1)];
    switch(s.htfType) {
      case 0:
        gHH1[si]=iMA(sym,ht,s.hp1,0,s.hma,PRICE_CLOSE);
        gHH2[si]=iMA(sym,ht,s.hp2,0,s.hma,PRICE_CLOSE);
        break;
      case 1:
        gHH1[si]=iMA(sym,ht,s.hp1,0,MODE_EMA,PRICE_CLOSE);
        break;
      case 2:
        gHH1[si]=iMACD(sym,ht,s.hp1,IMax(s.hp1+1,s.hp2),9,PRICE_CLOSE);
        break;
      case 3:
        gHH1[si]=iRSI(sym,ht,s.hp1,PRICE_CLOSE);
        break;
      case 4:
        gHH1[si]=iSAR(sym,ht,0.02,0.2);
        break;
      case 5:
        gHH1[si]=iADX(sym,ht,s.hp1);
        break;
    }
  }
  gLastBar[si]=iTime(sym,tf,0);
}
function Buf(h,buf,b1,b2,sh=-1){
  if(h===INVALID_HANDLE) { const _rv=false; _R=[b1,b2]; return _rv; }
  let x=[];
  ArraySetAsSeries(x,true);
  if(CopyBuffer(h,buf,(sh>0?sh:gBufShift),2,x)<2) { const _rv=false; _R=[b1,b2]; return _rv; }
  b1=x[0];
  b2=x[1];
  { const _rv=(b1!==EMPTY_VALUE&&b2!==EMPTY_VALUE); _R=[b1,b2]; return _rv; }
  _R=[b1,b2];
}
const RMAXT=600;
const RMAXC=400;
const RF_OPEN=1;
const RF_HIGH=2;
const RF_LOW=3;
const RF_CLOSE=4;
const RF_EMA=5;
const RF_SMA=6;
const RF_SMMA=7;
const RF_LWMA=8;
const RF_RSI=9;
const RF_ATR=10;
const RF_CCI=11;
const RF_WPR=12;
const RF_MOM=13;
const RF_MACD=14;
const RF_MACDSIG=15;
const RF_MACDHIST=16;
const RF_BBUP=17;
const RF_BBMID=18;
const RF_BBLOW=19;
const RF_STOCHK=20;
const RF_STOCHD=21;
const RF_ADX=22;
const RF_PDI=23;
const RF_MDI=24;
const RF_SAR=25;
const RF_HIGHEST=26;
const RF_LOWEST=27;
const RF_BOS=28;
const RF_CHOCH=29;
const RF_STRUCT=30;
const RF_OB=31;
const RF_FVG=32;
const RF_SWEEP=33;
const RF_CUSTOM=34;
const RF_BODY=35;
const RF_RANGE=36;
const NRF=37;
var RFN=_AFILL(["","OPEN","HIGH","LOW","CLOSE","EMA","SMA","SMMA","LWMA","RSI","ATR","CCI","WPR","MOM","MACD","MACDSIG","MACDHIST","BBUP","BBMID","BBLOW","STOCHK","STOCHD","ADX","PDI","MDI","SAR","HIGHEST","LOWEST","BOS","CHOCH","STRUCT","OB","FVG","SWEEP","CUSTOM","BODY","RANGE"],NRF,"");
const RO_GT=1;
const RO_LT=2;
const RO_GE=3;
const RO_LE=4;
const RO_EQ=5;
const RO_NE=6;
const RO_XUP=7;
const RO_XDN=8;
var rtF=_A(RMAXT,()=>0),rtNA=_A(RMAXT,()=>0),rtTF=_A(RMAXT,()=>0),rtSh=_A(RMAXT,()=>0);
var rtV=_A(RMAXT,()=>0),rtA0=_A(RMAXT,()=>0),rtA1=_A(RMAXT,()=>0),rtA2=_A(RMAXT,()=>0),rtA3=_A(RMAXT,()=>0);
var rtStr=_A(RMAXT,()=>"");
var rtN=0;
var rcL=_A(RMAXC,()=>0),rcOp=_A(RMAXC,()=>0),rcR=_A(RMAXC,()=>0),rcG=_A(RMAXC,()=>0);
var rcN=0;
var ruleFirst=_A(NSYM,()=>_A(2,()=>0)),ruleCnt=_A(NSYM,()=>_A(2,()=>0));
var ruleErr=_A(NSYM,()=>_A(2,()=>""));
var tkS=[];
var tkT=[];
var tkV=[];
var tkN=0,tkP=0;
function TkAdd(t,s,v){
  ArrayResize(tkS,tkN+1,()=>"");
  ArrayResize(tkT,tkN+1,()=>0);
  ArrayResize(tkV,tkN+1,()=>0);
  tkS[tkN]=s;
  tkT[tkN]=t;
  tkV[tkN]=v;
  tkN++;
}
function IsAlpha(c){
  return (c>=65&&c<=90)||(c>=97&&c<=122)||c===95;
}
function IsDigit(c){
  return (c>=48&&c<=57);
}
function Tokenize(src,err){
  tkN=0;
  tkP=0;
  err="";
  let n=StringLen(src),i=0;
  while(i<n) {
    let c=StringGetCharacter(src,i);
    if(c===32||c===9||c===13||c===10) {
      i++;
      continue;
    }
    if(IsAlpha(c)) {
      let j=i;
      while(j<n&&(IsAlpha(StringGetCharacter(src,j))||IsDigit(StringGetCharacter(src,j)))) j++;
      let w=StringSubstr(src,i,j-i);
      (_t35=StringToUpper(w),w=_R[0],_t35);
      TkAdd(1,w,0);
      i=j;
      continue;
    }
    if(IsDigit(c)||(c===46&&i+1<n&&IsDigit(StringGetCharacter(src,i+1)))) {
      let j=i;
      while(j<n&&(IsDigit(StringGetCharacter(src,j))||StringGetCharacter(src,j)===46)) j++;
      let w=StringSubstr(src,i,j-i);
      TkAdd(2,w,StringToDouble(w));
      i=j;
      continue;
    }
    if(c===34||c===39) {
      let j=i+1;
      while(j<n&&StringGetCharacter(src,j)!==c) j++;
      TkAdd(3,StringSubstr(src,i+1,j-i-1),0);
      i=j+1;
      continue;
    }
    let two=StringSubstr(src,i,2);
    if(two===">="||two==="<="||two==="=="||two==="!="||two==="&&"||two==="||") {
      TkAdd(4,two,0);
      i+=2;
      continue;
    }
    if(c===62||c===60||c===40||c===41||c===44||c===91||c===93||c===45||c===61) {
      TkAdd(4,ShortToString(c),0);
      i++;
      continue;
    }
    err="unknown sign '"+ShortToString(c)+"'";
    { const _rv=false; _R=[err]; return _rv; }
  }
  { const _rv=true; _R=[err]; return _rv; }
  _R=[err];
}
function TkPeek(){
  return (tkP<tkN?tkS[tkP]:"");
}
function TfIndex(w){
  for(let i=0;i<NTF;i++) if(TFN[i]===w) return i;
  return -1;
}
function RNewTerm(){
  if(rtN>=RMAXT) return -1;
  rtF[rtN]=0;
  rtNA[rtN]=0;
  rtTF[rtN]=-1;
  rtSh[rtN]=0;
  rtV[rtN]=0;
  rtA0[rtN]=0;
  rtA1[rtN]=0;
  rtA2[rtN]=0;
  rtA3[rtN]=0;
  rtStr[rtN]="";
  rtN++;
  return rtN-1;
}
function RSetArg(t,k,v){
  if(k===0) rtA0[t]=v;
  else if(k===1) rtA1[t]=v;
  else if(k===2) rtA2[t]=v;
  else if(k===3) rtA3[t]=v;
}
function RArg(t,k,def){
  if(k>=rtNA[t]) return def;
  let v=((k===0)?rtA0[t]:(((k===1)?rtA1[t]:(((k===2)?rtA2[t]:rtA3[t])))));
  return v;
}
function RParseTerm(err){
  if(tkP>=tkN) {
    err="a value is missing";
    { const _rv=-1; _R=[err]; return _rv; }
  }
  let neg=false;
  if(tkS[tkP]==="-"&&tkT[tkP]===4) {
    neg=true;
    tkP++;
  }
  if(tkP>=tkN) {
    err="a value is missing";
    { const _rv=-1; _R=[err]; return _rv; }
  }
  let t=RNewTerm();
  if(t<0) {
    err="rule too long";
    { const _rv=-1; _R=[err]; return _rv; }
  }
  if(tkT[tkP]===2) {
    rtV[t]=(neg?-tkV[tkP]:tkV[tkP]);
    tkP++;
    { const _rv=t; _R=[err]; return _rv; }
  }
  if(tkT[tkP]!==1) {
    err="'"+tkS[tkP]+"' is not a value";
    { const _rv=-1; _R=[err]; return _rv; }
  }
  let w=tkS[tkP];
  tkP++;
  if(w==="PRICE") w="CLOSE";
  let f=-1;
  for(let i=1;i<NRF;i++) if(RFN[i]===w) {
    f=i;
    break;
  }
  if(f<0) {
    err="unknown name "+w;
    { const _rv=-1; _R=[err]; return _rv; }
  }
  rtF[t]=f;
  if(TkPeek()==="(") {
    tkP++;
    while(tkP<tkN&&TkPeek()!==")") {
      if(TkPeek()===",") {
        tkP++;
        continue;
      }
      let an=false;
      if(TkPeek()==="-"&&tkT[tkP]===4) {
        an=true;
        tkP++;
      }
      if(tkP>=tkN) break;
      if(tkT[tkP]===2) {
        if(rtNA[t]<4) {
          RSetArg(t,rtNA[t],(an?-tkV[tkP]:tkV[tkP]));
          rtNA[t]++;
        }
        tkP++;
        continue;
      }
      if(tkT[tkP]===3) {
        rtStr[t]=tkS[tkP];
        tkP++;
        continue;
      }
      if(tkT[tkP]===1&&TfIndex(tkS[tkP])>=0) {
        rtTF[t]=TfIndex(tkS[tkP]);
        tkP++;
        continue;
      }
      err="unexpected '"+tkS[tkP]+"' inside "+w+"( )";
      { const _rv=-1; _R=[err]; return _rv; }
    }
    if(TkPeek()!==")") {
      err="a ')' is missing after "+w;
      { const _rv=-1; _R=[err]; return _rv; }
    }
    tkP++;
  }
  if(TkPeek()==="[") {
    tkP++;
    if(tkP<tkN&&tkT[tkP]===2) {
      rtSh[t]=Math.trunc(tkV[tkP]);
      tkP++;
    }
    if(TkPeek()!=="]") {
      err="a ']' is missing";
      { const _rv=-1; _R=[err]; return _rv; }
    }
    tkP++;
  }
  if(f===RF_CUSTOM&&rtStr[t]==="") {
    err="CUSTOM needs the indicator name in quotes";
    { const _rv=-1; _R=[err]; return _rv; }
  }
  if(neg) {
    err="a minus sign before "+w+" is not supported";
    { const _rv=-1; _R=[err]; return _rv; }
  }
  { const _rv=t; _R=[err]; return _rv; }
  _R=[err];
}
function ROpOf(w){
  if(w===">") return RO_GT;
  if(w==="<") return RO_LT;
  if(w===">=") return RO_GE;
  if(w==="<=") return RO_LE;
  if(w==="=="||w==="=") return RO_EQ;
  if(w==="!=") return RO_NE;
  if(w==="CROSSUP"||w==="XUP"||w==="CROSSESABOVE"||w==="CROSSABOVE") return RO_XUP;
  if(w==="CROSSDOWN"||w==="XDOWN"||w==="XDN"||w==="CROSSESBELOW"||w==="CROSSBELOW") return RO_XDN;
  return 0;
}
function RCompile(src,first,err){
  first=rcN;
  err="";
  let s=src;
  (_t36=StringTrimLeft(s),s=_R[0],_t36);
  (_t37=StringTrimRight(s),s=_R[0],_t37);
  if(s==="") { const _rv=0; _R=[first,err]; return _rv; }
  if(!(_t38=Tokenize(s,err),err=_R[0],_t38)) { const _rv=-1; _R=[first,err]; return _rv; }
  let g=0,cnt=0;
  while(tkP<tkN) {
    let a=(_t39=RParseTerm(err),err=_R[0],_t39);
    if(a<0) { const _rv=-1; _R=[first,err]; return _rv; }
    if(tkP>=tkN) {
      err="a comparison (> < CROSSUP ...) is missing";
      { const _rv=-1; _R=[first,err]; return _rv; }
    }
    let op=ROpOf(tkS[tkP]);
    if(op===0) {
      err="'"+tkS[tkP]+"' is not a comparison";
      { const _rv=-1; _R=[first,err]; return _rv; }
    }
    tkP++;
    let b=(_t40=RParseTerm(err),err=_R[0],_t40);
    if(b<0) { const _rv=-1; _R=[first,err]; return _rv; }
    if(rcN>=RMAXC) {
      err="too many conditions";
      { const _rv=-1; _R=[first,err]; return _rv; }
    }
    rcL[rcN]=a;
    rcOp[rcN]=op;
    rcR[rcN]=b;
    rcG[rcN]=g;
    rcN++;
    cnt++;
    if(tkP>=tkN) break;
    let j=tkS[tkP];
    if(j==="AND"||j==="&&") {
      tkP++;
      continue;
    }
    if(j==="OR"||j==="||") {
      tkP++;
      g++;
      continue;
    }
    err="expected AND / OR, found '"+j+"'";
    { const _rv=-1; _R=[first,err]; return _rv; }
  }
  { const _rv=cnt; _R=[first,err]; return _rv; }
  _R=[first,err];
}
function RuleCompileAll(){
  RHandlesTrim();
  rtN=0;
  rcN=0;
  for(let si=0;si<NSYM;si++) for(let sd=0;sd<2;sd++) {
    ruleFirst[si][sd]=0;
    ruleCnt[si][sd]=0;
    ruleErr[si][sd]="";
    if(si>=gNS) continue;
    let f=0;
    let e="";
    let n=(_t41=RCompile((sd===0?gRuleB[si]:gRuleS[si]),f,e),f=_R[0],e=_R[1],_t41);
    if(n<0) {
      ruleErr[si][sd]=e;
      rcN=f;
      continue;
    }
    ruleFirst[si][sd]=f;
    ruleCnt[si][sd]=n;
  }
}
function RuleCheck(src){
  let keepT=rtN,keepC=rcN,f=0;
  let e="";
  let n=(_t42=RCompile(src,f,e),f=_R[0],e=_R[1],_t42);
  rtN=keepT;
  rcN=keepC;
  return (n<0?e:"");
}
const RHMAX=400;
var rhKey=_A(RHMAX,()=>"");
var rhH=_A(RHMAX,()=>0);
var rhN=0;
function RHandle(key){
  for(let i=0;i<rhN;i++) if(rhKey[i]===key) return rhH[i];
  return INVALID_HANDLE-1;
}
function RHandleAdd(key,h){
  if(rhN>=RHMAX) {
    if(rhH[0]!==INVALID_HANDLE) IndicatorRelease(rhH[0]);
    for(let i=0;i<RHMAX-1;i++) {
      rhKey[i]=rhKey[i+1];
      rhH[i]=rhH[i+1];
    }
    rhN=RHMAX-1;
  }
  rhKey[rhN]=key;
  rhH[rhN]=h;
  rhN++;
  return h;
}
function RHandlesRelease(){
  for(let i=0;i<rhN;i++) if(rhH[i]!==INVALID_HANDLE) IndicatorRelease(rhH[i]);
  rhN=0;
}
function RHandlesTrim(){
  if(rhN>RHMAX-60) RHandlesRelease();
}
function RIndHandle(t,sym,tf){
  let f=rtF[t];
  let base=f;
  if(f===RF_MACDSIG||f===RF_MACDHIST) base=RF_MACD;
  if(f===RF_BBMID||f===RF_BBLOW) base=RF_BBUP;
  if(f===RF_STOCHD) base=RF_STOCHK;
  if(f===RF_PDI||f===RF_MDI) base=RF_ADX;
  let key=IntegerToString(base)+"|"+sym+"|"+IntegerToString(Math.trunc(tf))+"|"+DoubleToString(RArg(t,0,0),4)+"|"+DoubleToString(RArg(t,1,0),4)+"|"+DoubleToString(RArg(t,2,0),4)+"|"+DoubleToString(RArg(t,3,0),4)+"|"+rtStr[t];
  let h=RHandle(key);
  if(h!==INVALID_HANDLE-1) return h;
  let p0=Math.trunc(MathMax(1,RArg(t,0,14)));
  switch(base) {
    case RF_EMA:
      h=iMA(sym,tf,Math.trunc(MathMax(1,RArg(t,0,20))),0,MODE_EMA,PRICE_CLOSE);
      break;
    case RF_SMA:
      h=iMA(sym,tf,Math.trunc(MathMax(1,RArg(t,0,20))),0,MODE_SMA,PRICE_CLOSE);
      break;
    case RF_SMMA:
      h=iMA(sym,tf,Math.trunc(MathMax(1,RArg(t,0,20))),0,MODE_SMMA,PRICE_CLOSE);
      break;
    case RF_LWMA:
      h=iMA(sym,tf,Math.trunc(MathMax(1,RArg(t,0,20))),0,MODE_LWMA,PRICE_CLOSE);
      break;
    case RF_RSI:
      h=iRSI(sym,tf,IMax(2,p0),PRICE_CLOSE);
      break;
    case RF_ATR:
      h=iATR(sym,tf,p0);
      break;
    case RF_CCI:
      h=iCCI(sym,tf,IMax(2,p0),PRICE_TYPICAL);
      break;
    case RF_WPR:
      h=iWPR(sym,tf,p0);
      break;
    case RF_MOM:
      h=iMomentum(sym,tf,p0,PRICE_CLOSE);
      break;
    case RF_MACD:
      h=iMACD(sym,tf,Math.trunc(MathMax(1,RArg(t,0,12))),Math.trunc(MathMax(2,RArg(t,1,26))),Math.trunc(MathMax(1,RArg(t,2,9))),PRICE_CLOSE);
      break;
    case RF_BBUP:
      h=iBands(sym,tf,Math.trunc(MathMax(2,RArg(t,0,20))),0,MathMax(0.1,RArg(t,1,2)),PRICE_CLOSE);
      break;
    case RF_STOCHK:
      h=iStochastic(sym,tf,Math.trunc(MathMax(1,RArg(t,0,14))),Math.trunc(MathMax(1,RArg(t,1,3))),Math.trunc(MathMax(1,RArg(t,2,3))),MODE_SMA,STO_LOWHIGH);
      break;
    case RF_ADX:
      h=iADX(sym,tf,IMax(2,p0));
      break;
    case RF_SAR:
      h=iSAR(sym,tf,MathMax(0.001,RArg(t,0,0.02)),MathMax(0.01,RArg(t,1,0.2)));
      break;
    case RF_CUSTOM:
      {
        let np=IMax(0,rtNA[t]-1);
        let prm=[];
        ArrayResize(prm,np+1,()=>new MqlParam());
        prm[0].type=TYPE_STRING;
        prm[0].string_value=rtStr[t];
        for(let k=0;k<np;k++) {
          prm[k+1].type=TYPE_DOUBLE;
          prm[k+1].double_value=RArg(t,k+1,0);
        }
        h=IndicatorCreate(sym,tf,IND_CUSTOM,np+1,prm);
        break;
      }
    default:
      h=INVALID_HANDLE;
  }
  return RHandleAdd(key,h);
}
function RBuf(h,buf,s){
  if(h===INVALID_HANDLE||s<0) return EMPTY_VALUE;
  let x=[];
  if(CopyBuffer(h,buf,s,1,x)<1) return EMPTY_VALUE;
  return x[0];
}
function MapShift(sym,btf,tf,s){
  if(tf===btf) return s;
  let t=iTime(sym,btf,s);
  if(t<=0) return -1;
  let pb=PeriodSeconds(btf),pt=PeriodSeconds(tf);
  if(pt>pb) {
    let k=iBarShift(sym,tf,t,false);
    if(k<0) return -1;
    if(iTime(sym,tf,k)+pt>t+pb) k++;
    return k;
  }
  return iBarShift(sym,tf,t+pb-1,false);
}
const SMCC=24;
var smKey=_A(SMCC,()=>"");
var smBos=_A(SMCC,()=>0),smCho=_A(SMCC,()=>0),smTr=_A(SMCC,()=>0),smOb=_A(SMCC,()=>0),smFvg=_A(SMCC,()=>0),smSw=_A(SMCC,()=>0);
var smNext=0;
function SmcCalc(sym,tf,k,s,bos,cho,trend,ob,fvg,sweep){
  bos=0;
  cho=0;
  trend=0;
  ob=0;
  fvg=0;
  sweep=0;
  k=ClampI(k,1,10);
  let bt=iTime(sym,tf,s);
  if(bt<=0) { const _rv=false; _R=[bos,cho,trend,ob,fvg,sweep]; return _rv; }
  let key=sym+"|"+IntegerToString(Math.trunc(tf))+"|"+IntegerToString(k)+"|"+IntegerToString(bt);
  for(let i=0;i<SMCC;i++) if(smKey[i]===key) {
    bos=smBos[i];
    cho=smCho[i];
    trend=smTr[i];
    ob=smOb[i];
    fvg=smFvg[i];
    sweep=smSw[i];
    { const _rv=true; _R=[bos,cho,trend,ob,fvg,sweep]; return _rv; }
  }
  let r=[];
  let n=CopyRates(sym,tf,s,300,r);
  if(n<4*k+10) { const _rv=false; _R=[bos,cho,trend,ob,fvg,sweep]; return _rv; }
  let shP=0,slP=0;
  let shOk=false,slOk=false;
  let shI=-1,slI=-1;
  let bobT=0,bobB=0,sobT=0,sobB=0;
  let bobOk=false,sobOk=false;
  let bfT=0,bfB=0,sfT=0,sfB=0;
  let bfOk=false,sfOk=false;
  let tr=0,evB=0,evC=0;
  for(let t=2;t<n;t++) {
    let p=t-k;
    if(p>=k) {
      let isH=true,isL=true;
      for(let q=1;q<=k;q++) {
        if(r[p].high<=r[p-q].high||r[p].high<r[p+q].high) isH=false;
        if(r[p].low>=r[p-q].low||r[p].low>r[p+q].low) isL=false;
      }
      if(isH) {
        shP=r[p].high;
        shOk=true;
        shI=p;
      }
      if(isL) {
        slP=r[p].low;
        slOk=true;
        slI=p;
      }
    }
    if(r[t].low>r[t-2].high) {
      bfT=r[t].low;
      bfB=r[t-2].high;
      bfOk=true;
    }
    if(r[t].high<r[t-2].low) {
      sfT=r[t-2].low;
      sfB=r[t].high;
      sfOk=true;
    }
    if(t<n-1) {
      if(bfOk&&r[t].low<bfB) bfOk=false;
      if(sfOk&&r[t].high>sfT) sfOk=false;
    }
    let last=(t===n-1);
    if(shOk&&r[t].close>shP) {
      if(last) {
        if(tr<0) evC=1;
        else evB=1;
      }
      tr=1;
      shOk=false;
      for(let j=t-1;j>=IMax(0,slI);j--) if(r[j].close<r[j].open) {
        bobT=r[j].high;
        bobB=r[j].low;
        bobOk=true;
        break;
      }
    }
    else if(slOk&&r[t].close<slP) {
      if(last) {
        if(tr>0) evC=-1;
        else evB=-1;
      }
      tr=-1;
      slOk=false;
      for(let j=t-1;j>=IMax(0,shI);j--) if(r[j].close>r[j].open) {
        sobT=r[j].high;
        sobB=r[j].low;
        sobOk=true;
        break;
      }
    }
    if(t<n-1) {
      if(bobOk&&r[t].close<bobB) bobOk=false;
      if(sobOk&&r[t].close>sobT) sobOk=false;
    }
  }
  let c=r[n-1];
  bos=evB;
  cho=evC;
  trend=tr;
  if(bobOk&&c.low<=bobT&&c.close>=bobB) ob=1;
  else if(sobOk&&c.high>=sobB&&c.close<=sobT) ob=-1;
  if(bfOk&&c.low<=bfT&&c.close>=bfB) fvg=1;
  else if(sfOk&&c.high>=sfB&&c.close<=sfT) fvg=-1;
  if(slOk&&c.low<slP&&c.close>slP) sweep=1;
  else if(shOk&&c.high>shP&&c.close<shP) sweep=-1;
  let w=smNext;
  smNext=((smNext+1)%SMCC);
  smKey[w]=key;
  smBos[w]=bos;
  smCho[w]=cho;
  smTr[w]=trend;
  smOb[w]=ob;
  smFvg[w]=fvg;
  smSw[w]=sweep;
  { const _rv=true; _R=[bos,cho,trend,ob,fvg,sweep]; return _rv; }
  _R=[bos,cho,trend,ob,fvg,sweep];
}
function RTerm(si,t,base){
  if(t<0) return EMPTY_VALUE;
  let f=rtF[t];
  if(f===0) return rtV[t];
  let sym=gSym[si];
  let btf=TFV[ClampI(gSet[si].tf,0,NTF-1)];
  let tf=((rtTF[t]>=0)?TFV[rtTF[t]]:btf);
  let s=MapShift(sym,btf,tf,base);
  if(s<0) return EMPTY_VALUE;
  s+=rtSh[t];
  switch(f) {
    case RF_OPEN:
      {
        let v=iOpen(sym,tf,s);
        return (v>0?v:EMPTY_VALUE);
      }
    case RF_HIGH:
      {
        let v=iHigh(sym,tf,s);
        return (v>0?v:EMPTY_VALUE);
      }
    case RF_LOW:
      {
        let v=iLow(sym,tf,s);
        return (v>0?v:EMPTY_VALUE);
      }
    case RF_CLOSE:
      {
        let v=iClose(sym,tf,s);
        return (v>0?v:EMPTY_VALUE);
      }
    case RF_BODY:
      {
        let o=iOpen(sym,tf,s),c=iClose(sym,tf,s);
        return ((o>0&&c>0)?MathAbs(c-o):EMPTY_VALUE);
      }
    case RF_RANGE:
      {
        let h=iHigh(sym,tf,s),l=iLow(sym,tf,s);
        return ((h>0&&l>0)?h-l:EMPTY_VALUE);
      }
    case RF_HIGHEST:
      {
        let n=Math.trunc(MathMax(1,RArg(t,0,20)));
        let i=iHighest(sym,tf,MODE_HIGH,n,s+1);
        return (i<0?EMPTY_VALUE:iHigh(sym,tf,i));
      }
    case RF_LOWEST:
      {
        let n=Math.trunc(MathMax(1,RArg(t,0,20)));
        let i=iLowest(sym,tf,MODE_LOW,n,s+1);
        return (i<0?EMPTY_VALUE:iLow(sym,tf,i));
      }
    case RF_BOS:
    case RF_CHOCH:
    case RF_STRUCT:
    case RF_OB:
    case RF_FVG:
    case RF_SWEEP:
      {
        let b=0,c=0,tr=0,ob=0,fv=0,sw=0;
        if(!(_t43=SmcCalc(sym,tf,Math.trunc(RArg(t,0,3)),s,b,c,tr,ob,fv,sw),b=_R[0],c=_R[1],tr=_R[2],ob=_R[3],fv=_R[4],sw=_R[5],_t43)) return EMPTY_VALUE;
        if(f===RF_BOS) return b;
        if(f===RF_CHOCH) return c;
        if(f===RF_STRUCT) return tr;
        if(f===RF_OB) return ob;
        if(f===RF_FVG) return fv;
        return sw;
      }
  }
  let h=RIndHandle(t,sym,tf);
  switch(f) {
    case RF_MACDSIG:
    case RF_BBUP:
    case RF_STOCHD:
    case RF_PDI:
      return RBuf(h,1,s);
    case RF_BBLOW:
    case RF_MDI:
      return RBuf(h,2,s);
    case RF_MACDHIST:
      {
        let a=RBuf(h,0,s),b=RBuf(h,1,s);
        return ((a===EMPTY_VALUE||b===EMPTY_VALUE)?EMPTY_VALUE:a-b);
      }
    case RF_CUSTOM:
      return RBuf(h,Math.trunc(RArg(t,0,0)),s);
  }
  return RBuf(h,0,s);
}
function RCond(si,c,base){
  let a=RTerm(si,rcL[c],base),b=RTerm(si,rcR[c],base);
  if(a===EMPTY_VALUE||b===EMPTY_VALUE) return -1;
  let op=rcOp[c];
  if(op===RO_XUP||op===RO_XDN) {
    let a1=RTerm(si,rcL[c],base+1),b1=RTerm(si,rcR[c],base+1);
    if(a1===EMPTY_VALUE||b1===EMPTY_VALUE) return -1;
    if(op===RO_XUP) return ((a>b&&a1<=b1)?1:0);
    return ((a<b&&a1>=b1)?1:0);
  }
  let eps=MathMax(1e-10,MathAbs(b)*1e-9);
  switch(op) {
    case RO_GT:
      return (a>b?1:0);
    case RO_LT:
      return (a<b?1:0);
    case RO_GE:
      return (a>=b?1:0);
    case RO_LE:
      return (a<=b?1:0);
    case RO_EQ:
      return (MathAbs(a-b)<=eps?1:0);
    case RO_NE:
      return (MathAbs(a-b)>eps?1:0);
  }
  return 0;
}
function RuleEval(si,side,base){
  let n=ruleCnt[si][side];
  if(n<=0) return 0;
  let f=ruleFirst[si][side];
  let notReady=false;
  let g=rcG[f],end=f+n;
  let groupOk=true;
  for(let c=f;c<=end;c++) {
    if(c===end||rcG[c]!==g) {
      if(groupOk) return 1;
      if(c===end) break;
      g=rcG[c];
      groupOk=true;
    }
    if(!groupOk) continue;
    let r=RCond(si,c,base);
    if(r<0) {
      notReady=true;
      groupOk=false;
    }
    else if(r===0) groupOk=false;
  }
  return (notReady?-9:0);
}
function HtfBias(si){
  let s=_cp(gSet[si]);
  let a1=0,a2=0,b1=0,b2=0;
  let ht=TFV[ClampI(s.htf,0,NTF-1)];
  let bt=TFV[ClampI(s.tf,0,NTF-1)];
  let hs=((gBufShift<=1)?1:MapShift(gSym[si],bt,ht,gBufShift));
  if(hs<1) return -9;
  let c=iClose(gSym[si],ht,hs);
  if(c===0) return -9;
  switch(s.htfType) {
    case 0:
      if(!(_t44=Buf(gHH1[si],0,a1,a2,hs),a1=_R[0],a2=_R[1],_t44)||!(_t45=Buf(gHH2[si],0,b1,b2,hs),b1=_R[0],b2=_R[1],_t45)) return -9;
      return (a1>b1?1:((a1<b1?-1:0)));
    case 1:
      if(!(_t46=Buf(gHH1[si],0,a1,a2,hs),a1=_R[0],a2=_R[1],_t46)) return -9;
      return (c>a1?1:((c<a1?-1:0)));
    case 2:
      if(!(_t47=Buf(gHH1[si],0,a1,a2,hs),a1=_R[0],a2=_R[1],_t47)||!(_t48=Buf(gHH1[si],1,b1,b2,hs),b1=_R[0],b2=_R[1],_t48)) return -9;
      return (a1>b1?1:((a1<b1?-1:0)));
    case 3:
      if(!(_t49=Buf(gHH1[si],0,a1,a2,hs),a1=_R[0],a2=_R[1],_t49)) return -9;
      return (a1>50?1:((a1<50?-1:0)));
    case 4:
      if(!(_t50=Buf(gHH1[si],0,a1,a2,hs),a1=_R[0],a2=_R[1],_t50)) return -9;
      return (a1<c?1:((a1>c?-1:0)));
    case 5:
      if(!(_t51=Buf(gHH1[si],1,a1,a2,hs),a1=_R[0],a2=_R[1],_t51)||!(_t52=Buf(gHH1[si],2,b1,b2,hs),b1=_R[0],b2=_R[1],_t52)) return -9;
      return (a1>b1?1:((a1<b1?-1:0)));
  }
  return 0;
}
function Signal(si,why){
  why="";
  let s=_cp(gSet[si]);
  let sym=gSym[si];
  let tf=TFV[ClampI(s.tf,0,NTF-1)];
  let need=((s.entry===E_BRK?IMax(2,s.p1)+3:3));
  let r=[];
  ArraySetAsSeries(r,true);
  if(CopyRates(sym,tf,gBufShift-1,need,r)<need) { const _rv=-9; _R=[why]; return _rv; }
  let c1=r[1].close,c2=r[2].close;
  let sig=0;
  let a1=0,a2=0,b1=0,b2=0;
  switch(s.entry) {
    case E_MA:
      if(!(_t53=Buf(gH1[si],0,a1,a2),a1=_R[0],a2=_R[1],_t53)||!(_t54=Buf(gH2[si],0,b1,b2),b1=_R[0],b2=_R[1],_t54)) { const _rv=-9; _R=[why]; return _rv; }
      if(a1>b1&&a2<=b2) {
        sig=1;
        why=MAN[s.ma]+" "+IntegerToString(s.p1)+" crossed above "+IntegerToString(s.p2);
      }
      if(a1<b1&&a2>=b2) {
        sig=-1;
        why=MAN[s.ma]+" "+IntegerToString(s.p1)+" crossed below "+IntegerToString(s.p2);
      }
      break;
    case E_WSM:
      {
        if(!(_t55=Buf(gH1[si],0,a1,a2),a1=_R[0],a2=_R[1],_t55)||!(_t56=Buf(gH2[si],0,b1,b2),b1=_R[0],b2=_R[1],_t56)) { const _rv=-9; _R=[why]; return _rv; }
        let fnm=MAN[ClampI(s.ma,0,3)]+" "+IntegerToString(s.p1),snm=MAN[ClampI(Math.trunc(MathRound(s.lv2)),0,3)]+" "+IntegerToString(s.p2);
        if(a1>b1&&a2<=b2) {
          sig=1;
          why=fnm+" crossed above "+snm;
        }
        if(a1<b1&&a2>=b2) {
          sig=-1;
          why=fnm+" crossed below "+snm;
        }
        break;
      }
    case E_RSI:
      if(!(_t57=Buf(gH1[si],0,a1,a2),a1=_R[0],a2=_R[1],_t57)) { const _rv=-9; _R=[why]; return _rv; }
      if(a2<s.lv1&&a1>=s.lv1) {
        sig=1;
        why="RSI crossed up "+DoubleToString(s.lv1,0);
      }
      if(a2>s.lv2&&a1<=s.lv2) {
        sig=-1;
        why="RSI crossed down "+DoubleToString(s.lv2,0);
      }
      break;
    case E_MACD:
      if(!(_t58=Buf(gH1[si],0,a1,a2),a1=_R[0],a2=_R[1],_t58)||!(_t59=Buf(gH1[si],1,b1,b2),b1=_R[0],b2=_R[1],_t59)) { const _rv=-9; _R=[why]; return _rv; }
      if(a1>b1&&a2<=b2) {
        sig=1;
        why="MACD crossed above signal";
      }
      if(a1<b1&&a2>=b2) {
        sig=-1;
        why="MACD crossed below signal";
      }
      break;
    case E_BRK:
      {
        let hh=-DBL_MAX,ll=DBL_MAX;
        for(let k=2;k<need&&k<ArraySize(r);k++) {
          hh=MathMax(hh,r[k].high);
          ll=MathMin(ll,r[k].low);
        }
        if(c1>hh) {
          sig=1;
          why="closed above the "+IntegerToString(s.p1)+"-candle high";
        }
        if(c1<ll) {
          sig=-1;
          why="closed below the "+IntegerToString(s.p1)+"-candle low";
        }
        break;
      }
    case E_BBB:
      {
        let u1=0,u2=0,l1=0,l2=0;
        if(!(_t60=Buf(gH1[si],1,u1,u2),u1=_R[0],u2=_R[1],_t60)||!(_t61=Buf(gH1[si],2,l1,l2),l1=_R[0],l2=_R[1],_t61)) { const _rv=-9; _R=[why]; return _rv; }
        if(c2<l2&&c1>l1) {
          sig=1;
          why="back inside the lower band";
        }
        if(c2>u2&&c1<u1) {
          sig=-1;
          why="back inside the upper band";
        }
        break;
      }
    case E_BBX:
      {
        let u1=0,u2=0,l1=0,l2=0;
        if(!(_t62=Buf(gH1[si],1,u1,u2),u1=_R[0],u2=_R[1],_t62)||!(_t63=Buf(gH1[si],2,l1,l2),l1=_R[0],l2=_R[1],_t63)) { const _rv=-9; _R=[why]; return _rv; }
        if(c1>u1&&c2<=u2) {
          sig=1;
          why="broke above the upper band";
        }
        if(c1<l1&&c2>=l2) {
          sig=-1;
          why="broke below the lower band";
        }
        break;
      }
    case E_STO:
      if(!(_t64=Buf(gH1[si],0,a1,a2),a1=_R[0],a2=_R[1],_t64)||!(_t65=Buf(gH1[si],1,b1,b2),b1=_R[0],b2=_R[1],_t65)) { const _rv=-9; _R=[why]; return _rv; }
      if(a1>b1&&a2<=b2&&a2<=s.lv1) {
        sig=1;
        why="Stochastic crossed up in oversold";
      }
      if(a1<b1&&a2>=b2&&a2>=s.lv2) {
        sig=-1;
        why="Stochastic crossed down in overbought";
      }
      break;
    case E_CCI:
      if(!(_t66=Buf(gH1[si],0,a1,a2),a1=_R[0],a2=_R[1],_t66)) { const _rv=-9; _R=[why]; return _rv; }
      if(a2<-s.lv1&&a1>=-s.lv1) {
        sig=1;
        why="CCI crossed up -"+DoubleToString(s.lv1,0);
      }
      if(a2>s.lv1&&a1<=s.lv1) {
        sig=-1;
        why="CCI crossed down +"+DoubleToString(s.lv1,0);
      }
      break;
    case E_SAR:
      if(!(_t67=Buf(gH1[si],0,a1,a2),a1=_R[0],a2=_R[1],_t67)) { const _rv=-9; _R=[why]; return _rv; }
      if(a2>c2&&a1<c1) {
        sig=1;
        why="SAR flipped below price";
      }
      if(a2<c2&&a1>c1) {
        sig=-1;
        why="SAR flipped above price";
      }
      break;
    case E_RULE:
      {
        let rb=RuleEval(si,0,gBufShift),rs=RuleEval(si,1,gBufShift);
        if(rb===-9&&rs===-9) { const _rv=-9; _R=[why]; return _rv; }
        if(rb===1&&rs!==1) {
          sig=1;
          why="rule: "+StringSubstr(gRuleB[si],0,70);
        }
        if(rs===1&&rb!==1) {
          sig=-1;
          why="rule: "+StringSubstr(gRuleS[si],0,70);
        }
        break;
      }
    case E_ADX:
      {
        let x1=0,x2=0;
        if(!(_t68=Buf(gH1[si],0,x1,x2),x1=_R[0],x2=_R[1],_t68)||!(_t69=Buf(gH1[si],1,a1,a2),a1=_R[0],a2=_R[1],_t69)||!(_t70=Buf(gH1[si],2,b1,b2),b1=_R[0],b2=_R[1],_t70)) { const _rv=-9; _R=[why]; return _rv; }
        if(a1>b1&&a2<=b2&&x1>=s.lv1) {
          sig=1;
          why="+DI crossed above -DI, ADX "+DoubleToString(x1,0);
        }
        if(a1<b1&&a2>=b2&&x1>=s.lv1) {
          sig=-1;
          why="-DI crossed above +DI, ADX "+DoubleToString(x1,0);
        }
        break;
      }
  }
  if(sig===0) { const _rv=0; _R=[why]; return _rv; }
  if(s.dir===1&&sig<0) {
    why="SELL skipped (buy only)";
    { const _rv=0; _R=[why]; return _rv; }
  }
  if(s.dir===2&&sig>0) {
    why="BUY skipped (sell only)";
    { const _rv=0; _R=[why]; return _rv; }
  }
  if(s.trend) {
    let e1=0,e2=0;
    if(!(_t71=Buf(gHT[si],0,e1,e2),e1=_R[0],e2=_R[1],_t71)) { const _rv=-9; _R=[why]; return _rv; }
    if(sig>0&&c1<e1) {
      why="BUY blocked: below EMA "+IntegerToString(s.trendP);
      { const _rv=0; _R=[why]; return _rv; }
    }
    if(sig<0&&c1>e1) {
      why="SELL blocked: above EMA "+IntegerToString(s.trendP);
      { const _rv=0; _R=[why]; return _rv; }
    }
  }
  if(s.htfOn) {
    let b=HtfBias(si);
    if(b===-9) { const _rv=-9; _R=[why]; return _rv; }
    let tn=TFN[ClampI(s.htf,0,NTF-1)];
    if(b!==sig) {
      why=((sig>0?"BUY":"SELL"))+" blocked: "+tn+" is "+((b>0?"UP":((b<0?"DOWN":"flat"))));
      { const _rv=0; _R=[why]; return _rv; }
    }
    why=tn+" "+((b>0?"UP":"DOWN"))+" + "+TFN[ClampI(s.tf,0,NTF-1)]+" "+why;
  }
  { const _rv=sig; _R=[why]; return _rv; }
  _R=[why];
}
function StructLevel(si,dir,lvl){
  let s=_cp(gSet[si]);
  let tf=TFV[ClampI(s.tf,0,NTF-1)];
  let nb=ClampI(s.p3,2,100);
  let r=[];
  ArraySetAsSeries(r,true);
  if(CopyRates(gSym[si],tf,gBufShift,nb,r)<nb) { const _rv=false; _R=[lvl]; return _rv; }
  lvl=((dir>0)?DBL_MAX:-DBL_MAX);
  for(let i=0;i<nb;i++) {
    if(dir>0) lvl=MathMin(lvl,MathMin(r[i].open,r[i].close));
    else lvl=MathMax(lvl,MathMax(r[i].open,r[i].close));
  }
  for(let i=1;i<nb-1;i++) {
    let b0=((dir>0)?MathMin(r[i].open,r[i].close):MathMax(r[i].open,r[i].close));
    let bn=((dir>0)?MathMin(r[i-1].open,r[i-1].close):MathMax(r[i-1].open,r[i-1].close));
    let bo=((dir>0)?MathMin(r[i+1].open,r[i+1].close):MathMax(r[i+1].open,r[i+1].close));
    if((dir>0?(b0<=bn&&b0<=bo):(b0>=bn&&b0>=bo))) {
      lvl=b0;
      break;
    }
  }
  { const _rv=(lvl>0&&lvl<DBL_MAX/2); _R=[lvl]; return _rv; }
  _R=[lvl];
}
function DistancesEx(si,dir,slD,tpD,lot,why){
  why="";
  let s=_cp(gSet[si]);
  let pt=Pt(si);
  lot=NormLot(si,s.lot);
  if(gLotOverride>0) lot=NormLot(si,gLotOverride);
  slD=0;
  tpD=0;
  let bid=PBid(si),ask=PAsk(si);
  let minD=MinStopDist(si);
  let spr=MathMax(0.0,ask-bid);
  let need=minD+spr;
  let v1=ValPerPrice(si,1.0);
  let structure=(s.entry===E_WSM);
  let dollar=(!structure&&s.slMode===0);
  if(structure) {
    if(dir===0) { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
    let lvl=0;
    if(!(_t72=StructLevel(si,dir,lvl),lvl=_R[0],_t72)) { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
    let tf=TFV[ClampI(s.tf,0,NTF-1)];
    let px=((gBufShift>1)?iOpen(gSym[si],tf,gBufShift-1):((dir>0?ask:bid)));
    if(px<=0) { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
    slD=((dir>0)?(px-lvl):(lvl-px));
    if(slD<need) slD=need;
    tpD=slD*MathMax(0.2,s.lv1);
  }
  else if(s.slMode===0) {
    if(v1<=0) { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
    slD=s.sl/(v1*lot);
    tpD=s.tp/(v1*lot);
    if(slD<need) {
      lot=MathMin(lot,NormLot(si,s.sl/(v1*need)));
      slD=s.sl/(v1*lot);
      tpD=s.tp/(v1*lot);
      if(slD<need) {
        let lossAtMin=need*v1*lot;
        if(lossAtMin>s.sl*1.15+0.01) {
          why="SL $"+DoubleToString(s.sl,2)+" is too small here: the broker's minimum stop costs $"+DoubleToString(lossAtMin,2)+" with the smallest lot ("+DoubleToString(lot,3)+"). Raise the $ stop to at least that.";
          { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
        }
        slD=need;
      }
    }
  }
  else if(s.slMode===1) {
    slD=s.sl*pt;
    tpD=s.tp*pt;
  }
  else {
    let a1=0,a2=0;
    if(!(_t73=Buf(gHA[si],0,a1,a2),a1=_R[0],a2=_R[1],_t73)||a1<=0) { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
    slD=s.sl*a1;
    tpD=s.tp*a1;
  }
  if(slD<need) slD=need;
  if(tpD<minD) tpD=minD;
  if(!dollar&&s.lotMode===1&&gLotOverride<=0) {
    if(v1<=0||slD<=0) { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
    let want=Balance()*s.risk/100.0;
    lot=NormLot(si,want/(slD*v1));
    let got=slD*v1*lot;
    if(lot<=MinLot(si)*1.0001&&got>want*1.5+0.01) {
      why="risk "+DoubleToString(s.risk,1)+"% ("+Money(want)+") is too small here: the smallest lot already risks "+Money(got)+". Raise the risk % or use a smaller stop.";
      { const _rv=false; _R=[slD,tpD,lot,why]; return _rv; }
    }
  }
  lot=GuardLot(si,lot);
  { const _rv=(slD>0&&tpD>0&&lot>0); _R=[slD,tpD,lot,why]; return _rv; }
  _R=[slD,tpD,lot,why];
}
function Distances(si,slD,tpD,lot){
  let w="";
  { const _rv=(_t74=DistancesEx(si,0,slD,tpD,lot,w),slD=_R[0],tpD=_R[1],lot=_R[2],w=_R[3],_t74); _R=[slD,tpD,lot]; return _rv; }
  _R=[slD,tpD,lot];
}
function AddTrade(t){
  if(gTN>=MAXT) {
    let k=-1;
    for(let i=0;i<gTN;i++) if(!gT[i].open) {
      k=i;
      break;
    }
    if(k<0) return -1;
    for(let i=k;i<gTN-1;i++) gT[i]=_cp(gT[i+1]);
    gTN--;
    if(gFocus===k) gFocus=-1;
    else if(gFocus>k) gFocus--;
    if(gHistSel===k) gHistSel=-1;
    else if(gHistSel>k) gHistSel--;
    if(gDragK===k) {
      gDrag=0;
      gDragK=-1;
    }
    else if(gDragK>k) gDragK--;
    if(gChK===k) gChK=-1;
    else if(gChK>k) gChK--;
    if(gShotK===k) gShotK=-1;
    else if(gShotK>k) gShotK--;
  }
  if(ArraySize(gT)<gTN+1) ArrayResize(gT,gTN+16,()=>new JTrade());
  gT[gTN]=_cp(t);
  gTN++;
  return gTN-1;
}
function GuardCheck(si){
  if(HasOpen(si)) return "already has an open trade";
  let gb=GuardBlock(si);
  if(gb!=="") return gb;
  let n=OpenCount(gMode);
  if(n>=gMaxOpen) return "max "+IntegerToString(gMaxOpen)+" trades open";
  if(n>=gGuardAfter&&SafeCount(gMode)===0) return IntegerToString(n)+" open and none is safe yet (BE / trailing)";
  if(gMode===1) {
    if(!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED)) return "AutoTrading is off in MT5";
    if(!MQLInfoInteger(MQL_TRADE_ALLOWED)) return "trading not allowed for this EA";
  }
  return "";
}
function OpenTrade(si,dir,why){
  let slD=0,tpD=0,lot=0;
  let dw="";
  if(!(_t75=DistancesEx(si,dir,slD,tpD,lot,dw),slD=_R[0],tpD=_R[1],lot=_R[2],dw=_R[3],_t75)) {
    Log(gShort[si]+": "+((dw!==""?dw:"could not size the trade (no ATR / tick value / candles yet)")),CL_DN);
    return false;
  }
  let dg=Dg(si);
  let px=(dir>0?PAsk(si):PBid(si));
  if(px<=0) return false;
  let sl=NormalizeDouble(px-dir*slD,dg);
  let tp=NormalizeDouble(px+dir*tpD,dg);
  let t=new JTrade();
  t._zm();
  t.open=true;
  t.si=si;
  t.dir=dir;
  t.tf=gSet[si].tf;
  t.lot=lot;
  t.entry=px;
  t.sl=sl;
  t.tp=tp;
  t.sl0=sl;
  t.t0=TimeCurrent();
  t.id=gNextId++;
  if(gMode===1) {
    gTrade.SetExpertMagicNumber(InpMagic);
    gTrade.SetTypeFillingBySymbol(gSym[si]);
    let tm=SymbolInfoInteger(gSym[si],SYMBOL_TRADE_MODE);
    if(tm===SYMBOL_TRADE_MODE_DISABLED||tm===SYMBOL_TRADE_MODE_CLOSEONLY||(dir>0&&tm===SYMBOL_TRADE_MODE_SHORTONLY)||(dir<0&&tm===SYMBOL_TRADE_MODE_LONGONLY)) {
      Log(gShort[si]+": trading is not allowed on this symbol now",CL_DN);
      return false;
    }
    let mreq=0,vmin=SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_MIN),vst=SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_STEP);
    let fm=AccountInfoDouble(ACCOUNT_MARGIN_FREE)*0.9;
    for(let g=0;g<40;g++) {
      if(!(_t76=OrderCalcMargin((dir>0?ORDER_TYPE_BUY:ORDER_TYPE_SELL),gSym[si],lot,px,mreq),mreq=_R[0],_t76)) {
        mreq=DBL_MAX;
        break;
      }
      if(mreq<=fm||lot<=vmin+1e-9) break;
      lot=NormLot(si,MathMax(vmin,MathMin(lot*0.7,lot-MathMax(vst,1e-8))));
    }
    let vlim=SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_LIMIT);
    if(vlim>0&&lot+PositionsVolume(gSym[si])>vlim) {
      Log(gShort[si]+": the broker's volume limit is reached",CL_DN);
      return false;
    }
    if(mreq>fm||lot<=0) {
      Log(gShort[si]+": not enough free margin for lot "+DoubleToString(lot,3),CL_DN);
      return false;
    }
    t.lot=lot;
    let ok=!!((dir>0?gTrade.Buy(lot,gSym[si],0,sl,tp,"GTM AI"):gTrade.Sell(lot,gSym[si],0,sl,tp,"GTM AI")));
    if(!ok||(gTrade.ResultRetcode()!==TRADE_RETCODE_DONE&&gTrade.ResultRetcode()!==TRADE_RETCODE_PLACED)) {
      Log(gShort[si]+": order refused - "+gTrade.ResultRetcodeDescription(),CL_DN);
      SaySym(V_REFUSED,gSym[si]);
      return false;
    }
    t.live=true;
    t.ticket=gTrade.ResultOrder();
    let dl=gTrade.ResultDeal();
    if(dl>0&&HistoryDealSelect(dl)) {
      let pid=HistoryDealGetInteger(dl,DEAL_POSITION_ID);
      if(pid>0) t.ticket=pid;
    }
    if(gTrade.ResultPrice()>0) t.entry=gTrade.ResultPrice();
  }
  let k=AddTrade(t);
  if(k<0) return false;
  WhyAdd(t.id,why);
  gSt[si]=3;
  if(gFocus<0) gFocus=k;
  Log(((dir>0?"BUY ":"SELL "))+gShort[si]+"  lot "+DoubleToString(lot,3)+"  ("+why+")",(dir>0?CL_UP:CL_DN));
  gCntOrd++;
  gLastOrd=((dir>0?"BUY ":"SELL "))+gShort[si]+" lot "+DoubleToString(lot,3);
  Pulse(3,gShort[si]+((dir>0?" BUY":" SELL")),8);
  Pulse(4,IntegerToString(OpenCount(gMode))+" open",16);
  Pulse(5,"margin "+Money(Balance()),24);
  SaySym((dir>0?V_BUY:V_SELL),gSym[si]);
  gCoreTx=((dir>0?"BUY ":"SELL "))+gShort[si];
  TgNotify(((dir>0?"🟢 BUY ":"🔴 SELL "))+gSym[si]+"  lot "+DoubleToString(lot,3)+((gMode===1?"  [LIVE]":"  [SIM]"))+"\nWhy: "+why);
  ShotLater(k,((dir>0?"BUY ":"SELL "))+gSym[si]+"  entry "+DoubleToString(t.entry,dg)+"  SL "+DoubleToString(sl,dg)+"  TP "+DoubleToString(tp,dg));
  return true;
}
function JAdd(live,sym,dir,lot,_in,out,t0,t1,pl,tag=""){
  if(ArraySize(jPL)<jN+1) {
    let ns=jN+256;
    ArrayResize(jLive,ns,()=>0);
    ArrayResize(jDir,ns,()=>0);
    ArrayResize(jSym,ns,()=>"");
    ArrayResize(jLot,ns,()=>0);
    ArrayResize(jIn,ns,()=>0);
    ArrayResize(jOut,ns,()=>0);
    ArrayResize(jPL,ns,()=>0);
    ArrayResize(jT0,ns,()=>0);
    ArrayResize(jT1,ns,()=>0);
    ArrayResize(jTag,ns,()=>"");
  }
  jLive[jN]=live;
  jDir[jN]=dir;
  jSym[jN]=sym;
  jLot[jN]=lot;
  jIn[jN]=_in;
  jOut[jN]=out;
  jPL[jN]=pl;
  jT0[jN]=t0;
  jT1[jN]=t1;
  jTag[jN]=tag;
  jN++;
}
function JWrite(k){
  if(gTester) return;
  if(k<0||k>=jN) return;
  let h=FileOpen(JRNFILE,FILE_READ|FILE_WRITE|FILE_TXT|FILE_ANSI);
  if(h===INVALID_HANDLE) return;
  FileSeek(h,0,SEEK_END);
  FileWriteString(h,((jLive[k]===1?"L":"S"))+";"+jSym[k]+";"+IntegerToString(jDir[k])+";"+DoubleToString(jLot[k],5)+";"+DoubleToString(jIn[k],8)+";"+DoubleToString(jOut[k],8)+";"+IntegerToString(jT0[k])+";"+IntegerToString(jT1[k])+";"+DoubleToString(jPL[k],2)+";"+jTag[k]+"\n");
  FileClose(h);
}
function JLoad(){
  jN=0;
  if(!FileIsExist(JRNFILE)) return;
  let h=FileOpen(JRNFILE,FILE_READ|FILE_TXT|FILE_ANSI);
  if(h===INVALID_HANDLE) return;
  while(!FileIsEnding(h)) {
    let line=FileReadString(h);
    let p=[];
    if(StringSplit(line,59,p)<9) continue;
    JAdd((p[0]==="L"?1:0),p[1],StringToInteger(p[2]),StringToDouble(p[3]),StringToDouble(p[4]),StringToDouble(p[5]),StringToInteger(p[6]),StringToInteger(p[7]),StringToDouble(p[8]),(ArraySize(p)>=10?p[9]:""));
  }
  FileClose(h);
}
function AIProfit(all,n,today){
  all=0;
  n=0;
  today=0;
  let d0=TimeCurrent()-((TimeCurrent()%86400));
  for(let i=0;i<jN;i++) {
    if(jLive[i]!==((gMode===1?1:0))) continue;
    all+=jPL[i];
    n++;
    if(jT1[i]>=d0) today+=jPL[i];
  }
  _R=[all,n,today];
}
const CELEBF=95;
const REDF=75;
function Celebrate(pl,sym){
  if(!gCeleb) return;
  gCelebF=CELEBF;
  gRedF=0;
  gCelebTx="+"+Money(pl);
  gCelebSym=sym;
  for(let i=0;i<NCONF;i++) {
    let side=(i%3);
    if(side===0) {
      cfX[i]=gW*0.06;
      cfY[i]=gH*0.95;
      let an=-M_PI/2+0.25+((MathRand()%60))/100.0,sp=9+((MathRand()%90))/10.0;
      cfVX[i]=MathCos(an)*sp;
      cfVY[i]=MathSin(an)*sp;
    }
    else if(side===1) {
      cfX[i]=gW*0.94;
      cfY[i]=gH*0.95;
      let an=-M_PI/2-0.25-((MathRand()%60))/100.0,sp=9+((MathRand()%90))/10.0;
      cfVX[i]=MathCos(an)*sp;
      cfVY[i]=MathSin(an)*sp;
    }
    else {
      cfX[i]=gW*0.5;
      cfY[i]=gH*0.42;
      let an=((MathRand()%628))/100.0,sp=2+((MathRand()%90))/10.0;
      cfVX[i]=MathCos(an)*sp;
      cfVY[i]=MathSin(an)*sp-3;
    }
    let pal=_A(5,()=>0);
    pal[0]=((CL_CY)>>>0);
    pal[1]=((CL_MG)>>>0);
    pal[2]=((CL_AU)>>>0);
    pal[3]=((CL_UP)>>>0);
    pal[4]=((CL_VI)>>>0);
    cfC[i]=((pal[(MathRand()%5)])>>>0);
  }
}
function ExitTag(k,exitP,pl,how){
  if(how==="closed by you") return "MAN";
  if(how==="TAKE PROFIT") return "TP";
  if(how==="STOP LOSS") return "SL";
  if(how==="closed at break-even") return "BE";
  if(how==="trailing stop in profit") return "TSL";
  if(StringFind(how,"switched to LIVE")>=0||StringFind(how,"result not found")>=0) return "MAN";
  let si=gT[k].si;
  if(si<0||si>=gNS) return (pl>0?"TP":"SL");
  let pt=Pt(si),tpD=MathAbs(gT[k].tp-gT[k].entry),tol=MathMax(5*pt,tpD*0.03);
  if(gT[k].tp>0&&MathAbs(exitP-gT[k].tp)<=tol) return "TP";
  let profit=((gT[k].dir>0?exitP>gT[k].entry:exitP<gT[k].entry));
  if(gT[k].trailOn&&profit&&MathAbs(exitP-gT[k].entry)>tol) return "TSL";
  if((gT[k].beDone||gT[k].trailOn)&&MathAbs(exitP-gT[k].entry)<=tol) return "BE";
  if(gT[k].sl0>0&&MathAbs(exitP-gT[k].sl0)<=tol) return "SL";
  return (pl>0?"TP":"SL");
}
function Finish(k,exitP,pl,how0,quiet=false){
  if(k<0||k>=gTN) return;
  let how=how0;
  let tag=ExitTag(k,exitP,pl,how);
  if(StringFind(how,"closed in profit")===0||how==="stopped out") how=((tag==="TP")?"TAKE PROFIT":(((tag==="TSL")?"trailing stop in profit":(((tag==="BE")?"closed at break-even":"STOP LOSS")))));
  gT[k].open=false;
  gT[k].exitP=exitP;
  gT[k].pl=pl;
  gT[k].win=(tag!=="BE"&&pl>0.005);
  gT[k].t1=TimeCurrent();
  let si=gT[k].si;
  if(si>=0&&si<gNS) gSt[si]=0;
  if(!gT[k].live) gSimBal+=pl;
  let sn=((si>=0&&si<gNS)?gShort[si]:"?");
  let side=(gT[k].dir>0?"BUY ":"SELL ");
  JAdd((gT[k].live?1:0),((si>=0&&si<gNS)?gSym[si]:"?"),gT[k].dir,gT[k].lot,gT[k].entry,exitP,gT[k].t0,gT[k].t1,pl,tag);
  JWrite(jN-1);
  if(!quiet) GuardOnClose(si,pl);
  if(pl>0.005&&tag!=="BE") {
    Log(sn+" "+how+"  +"+Money(pl),CL_UP);
    if(!quiet) Celebrate(pl,side+sn);
  }
  else if(pl>-0.005||tag==="BE") {
    Log(sn+" "+how+"  "+Money(pl),CL_AU);
    if(!quiet) {
      gBeF=60;
      gBeTx=sn+" closed at break-even";
    }
  }
  else {
    Log(sn+" "+how+"  "+Money(pl),CL_DN);
    if(!quiet) {
      gRedF=REDF;
      gCelebF=0;
      gRedTx=Money(pl);
      gRedSym=side+sn;
    }
  }
  if(quiet) return;
  TgNotify(((pl>0.005?"✅ ":((pl<-0.005?"❌ ":"⚪ "))))+side+(((si>=0&&si<gNS)?gSym[si]:"?"))+" "+how+"  "+((pl>0?"+":""))+Money(pl));
  ShotLater(k,side+(((si>=0&&si<gNS)?gSym[si]:"?"))+" "+how+"  "+((pl>0?"+":""))+Money(pl));
  let vsym=((si>=0&&si<gNS)?gSym[si]:"");
  if(tag==="MAN") SayTrade((pl>0.005?V_MANWIN:((pl<-0.005?V_MANLOSS:V_BECLOSE))),vsym,pl);
  else if(tag==="BE") SayTrade(V_BECLOSE,vsym,pl);
  else if(pl>0.005) SayTrade((tag==="TSL"?V_TRAILWIN:V_TP),vsym,pl);
  else if(pl>-0.005) SayTrade(V_BECLOSE,vsym,pl);
  else SayTrade(V_SL,vsym,pl);
  gCoreTx="closed "+sn;
  Pulse(4,"closed "+sn);
  Pulse(5,Money(Balance()),10);
  if(gFocus===k) gFocus=-1;
}
function PositionsVolume(sym){
  let v=0;
  for(let i=PositionsTotal()-1;i>=0;i--) {
    let tk=PositionGetTicket(i);
    if(tk>0&&PositionGetString(POSITION_SYMBOL)===sym) v+=PositionGetDouble(POSITION_VOLUME);
  }
  return v;
}
function MinStopDist(si){
  let lv=Math.trunc(MathMax(SymbolInfoInteger(gSym[si],SYMBOL_TRADE_STOPS_LEVEL),SymbolInfoInteger(gSym[si],SYMBOL_TRADE_FREEZE_LEVEL)));
  return (+lv)*Pt(si)+3*Pt(si);
}
function ManageOne(k){
  if(k<0||k>=gTN||!gT[k].open) return;
  let si=gT[k].si;
  if(si<0||si>=gNS) return;
  let s=_cp(gSet[si]);
  let dir=gT[k].dir,dg=Dg(si);
  let bid=PBid(si),ask=PAsk(si);
  if(bid<=0||ask<=0) return;
  let px=(dir>0?bid:ask);
  if(gT[k].live) {
    if(!PositionSelectByTicket(gT[k].ticket)) {
      let pl=0,ex=px;
      let out=false;
      if(HistorySelectByPosition(gT[k].ticket)) {
        let nd=HistoryDealsTotal();
        for(let d=0;d<nd;d++) {
          let dt=HistoryDealGetTicket(d);
          if(dt===0) continue;
          pl+=HistoryDealGetDouble(dt,DEAL_PROFIT)+HistoryDealGetDouble(dt,DEAL_SWAP)+HistoryDealGetDouble(dt,DEAL_COMMISSION);
          let en=HistoryDealGetInteger(dt,DEAL_ENTRY);
          if(en===DEAL_ENTRY_OUT||en===DEAL_ENTRY_OUT_BY) {
            ex=HistoryDealGetDouble(dt,DEAL_PRICE);
            out=true;
          }
        }
      }
      if(!out&&HistorySelect(gT[k].t0-86400,TimeCurrent()+86400)) {
        let pl2=0;
        let out2=false;
        let ex2=px;
        for(let d=HistoryDealsTotal()-1;d>=0;d--) {
          let dt=HistoryDealGetTicket(d);
          if(dt===0||HistoryDealGetInteger(dt,DEAL_POSITION_ID)!==gT[k].ticket) continue;
          pl2+=HistoryDealGetDouble(dt,DEAL_PROFIT)+HistoryDealGetDouble(dt,DEAL_SWAP)+HistoryDealGetDouble(dt,DEAL_COMMISSION);
          let en=HistoryDealGetInteger(dt,DEAL_ENTRY);
          if(en===DEAL_ENTRY_OUT||en===DEAL_ENTRY_OUT_BY) {
            ex2=HistoryDealGetDouble(dt,DEAL_PRICE);
            out2=true;
          }
        }
        if(out2) {
          pl=pl2;
          ex=ex2;
          out=true;
        }
      }
      if(!out) {
        if(gT[k].t1===0) {
          gT[k].t1=TimeCurrent();
          return;
        }
        if(TimeCurrent()-gT[k].t1<30) return;
      }
      if(!out) Log(gShort[si]+": position is gone but the broker history has no result yet - check the MT5 History tab",CL_AU);
      Finish(k,ex,pl,(!out?"closed (result not found in history)":((pl>0?"closed in profit (TP / trailing)":"stopped out"))),!out);
      return;
    }
    gT[k].sl=PositionGetDouble(POSITION_SL);
    gT[k].tp=PositionGetDouble(POSITION_TP);
    gT[k].pl=PositionGetDouble(POSITION_PROFIT)+PositionGetDouble(POSITION_SWAP);
  }
  else {
    let vpp=ValPerPrice(si,gT[k].lot);
    let hitTP=(gT[k].tp>0)&&((dir>0?bid>=gT[k].tp:ask<=gT[k].tp));
    let hitSL=(gT[k].sl>0)&&((dir>0?bid<=gT[k].sl:ask>=gT[k].sl));
    if(hitTP) {
      let pl=(gT[k].tp-gT[k].entry)*dir*vpp;
      Finish(k,gT[k].tp,pl,"TAKE PROFIT");
      return;
    }
    if(hitSL) {
      let pl=(gT[k].sl-gT[k].entry)*dir*vpp;
      let hw="STOP LOSS";
      let btol=MathMax(4*Pt(si),(ask-bid)*2);
      let nearEntry=(MathAbs(gT[k].sl-gT[k].entry)<=btol);
      if((gT[k].beDone||gT[k].trailOn)&&nearEntry) hw="closed at break-even";
      else if(gT[k].trailOn&&pl>0) hw="trailing stop in profit";
      Finish(k,gT[k].sl,pl,hw);
      return;
    }
    gT[k].pl=(px-gT[k].entry)*dir*vpp;
  }
  gT[k].safe=(gT[k].sl>0&&((dir>0?gT[k].sl>=gT[k].entry:gT[k].sl<=gT[k].entry)));
  if(gT[k].sl0<=0||gT[k].tp<=0) return;
  let tpD=MathAbs(gT[k].tp-gT[k].entry);
  let slD=MathAbs(gT[k].entry-gT[k].sl0);
  if(tpD<=0||slD<=0) return;
  let move=(px-gT[k].entry)*dir;
  let newSL=gT[k].sl;
  let why="";
  if(s.be&&!gT[k].beDone&&move>=tpD*s.beAt/100.0) {
    let lockSL=gT[k].entry+dir*2*Pt(si);
    if(gT[k].sl===0||((dir>0?lockSL>gT[k].sl:lockSL<gT[k].sl))) {
      newSL=lockSL;
      why="break-even";
    }
    else gT[k].beDone=true;
  }
  if(s.trail&&move>=tpD*s.trStart/100.0) {
    let cand=px-dir*slD*s.trDist/100.0;
    if(gT[k].sl===0||((dir>0?cand>newSL+Pt(si):cand<newSL-Pt(si)))) {
      newSL=cand;
      why="trailing";
    }
  }
  if(why==="") return;
  let fl=MinStopDist(si);
  if(dir>0) {
    let cap=bid-fl;
    if(newSL>cap) newSL=cap;
  }
  else {
    let cap=ask+fl;
    if(newSL<cap) newSL=cap;
  }
  newSL=NormalizeDouble(newSL,dg);
  if(why==="break-even"&&((dir>0?newSL<=gT[k].entry:newSL>=gT[k].entry))) return;
  let better=(gT[k].sl===0)||((dir>0?newSL>gT[k].sl+Pt(si)*0.5:newSL<gT[k].sl-Pt(si)*0.5));
  if(!better) return;
  if(gT[k].live) {
    let frz=(+SymbolInfoInteger(gSym[si],SYMBOL_TRADE_FREEZE_LEVEL))*Pt(si);
    if(frz>0&&((gT[k].sl>0&&MathAbs(px-gT[k].sl)<=frz)||(gT[k].tp>0&&MathAbs(px-gT[k].tp)<=frz))) return;
    gTrade.SetExpertMagicNumber(InpMagic);
    if(!gTrade.PositionModify(gT[k].ticket,newSL,gT[k].tp)) return;
  }
  let first=!gT[k].beDone&&!gT[k].trailOn;
  if(why==="break-even") gT[k].beDone=true;
  else gT[k].trailOn=true;
  gT[k].sl=newSL;
  gT[k].safe=((dir>0?newSL>=gT[k].entry:newSL<=gT[k].entry));
  gLastGuard=gShort[si]+" "+why+" set";
  if(first||why==="break-even") {
    Log(gShort[si]+" "+why+" -> SL "+DoubleToString(newSL,dg),CL_AU);
    Pulse(4,gShort[si]+" "+why);
    SaySym((why==="break-even"?V_BE:V_TRAIL),gSym[si]);
  }
}
function AdoptLive(){
  let n=PositionsTotal();
  for(let p=0;p<n;p++) {
    let tk=PositionGetTicket(p);
    if(tk===0) continue;
    if(PositionGetInteger(POSITION_MAGIC)!==InpMagic) continue;
    let sym=PositionGetString(POSITION_SYMBOL);
    let si=-1;
    for(let i=0;i<gNS;i++) if(gSym[i]===sym) {
      si=i;
      break;
    }
    if(si<0) continue;
    let known=false;
    for(let i=0;i<gTN;i++) if(gT[i].live&&gT[i].ticket===tk) {
      known=true;
      break;
    }
    if(known) continue;
    let t=new JTrade();
    t._zm();
    t.open=true;
    t.live=true;
    t.ticket=tk;
    t.si=si;
    t.dir=((PositionGetInteger(POSITION_TYPE)===POSITION_TYPE_BUY)?1:-1);
    t.tf=gSet[si].tf;
    t.lot=PositionGetDouble(POSITION_VOLUME);
    t.entry=PositionGetDouble(POSITION_PRICE_OPEN);
    t.sl=PositionGetDouble(POSITION_SL);
    t.tp=PositionGetDouble(POSITION_TP);
    t.sl0=t.sl;
    t.t0=PositionGetInteger(POSITION_TIME);
    t.id=gNextId++;
    if(t.sl!==0&&((t.dir>0?t.sl>=t.entry:t.sl<=t.entry))) {
      t.safe=true;
      t.beDone=true;
    }
    if(AddTrade(t)>=0) {
      gSt[si]=3;
      Log("Adopted live position "+gShort[si]+" #"+IntegerToString(tk),CL_CY);
    }
  }
}
function ModifyTrade(k,nsl,ntp){
  if(k<0||k>=gTN||!gT[k].open) return false;
  let si=gT[k].si;
  if(si<0||si>=gNS) return false;
  let dir=gT[k].dir,dg=Dg(si);
  let bid=PBid(si),ask=PAsk(si),fl=MinStopDist(si);
  nsl=NormalizeDouble(nsl,dg);
  ntp=NormalizeDouble(ntp,dg);
  if(dir>0) {
    if(nsl>0&&nsl>=bid-fl) {
      Log(gShort[si]+": SL must be below the price ("+DoubleToString(bid-fl,dg)+")",CL_DN);
      return false;
    }
    if(ntp>0&&ntp<=ask+fl) {
      Log(gShort[si]+": TP must be above the price ("+DoubleToString(ask+fl,dg)+")",CL_DN);
      return false;
    }
  }
  else {
    if(nsl>0&&nsl<=ask+fl) {
      Log(gShort[si]+": SL must be above the price ("+DoubleToString(ask+fl,dg)+")",CL_DN);
      return false;
    }
    if(ntp>0&&ntp>=bid-fl) {
      Log(gShort[si]+": TP must be below the price ("+DoubleToString(bid-fl,dg)+")",CL_DN);
      return false;
    }
  }
  if(gT[k].live) {
    gTrade.SetExpertMagicNumber(InpMagic);
    if(!gTrade.PositionModify(gT[k].ticket,nsl,ntp)) {
      Log(gShort[si]+": change refused - "+gTrade.ResultRetcodeDescription(),CL_DN);
      return false;
    }
  }
  if(nsl>0&&(gT[k].sl0===0||((dir>0?nsl<gT[k].sl0:nsl>gT[k].sl0)))) gT[k].sl0=nsl;
  gT[k].sl=nsl;
  gT[k].tp=ntp;
  if(nsl>0&&((dir>0?nsl>=gT[k].entry:nsl<=gT[k].entry))) {
    gT[k].safe=true;
    gT[k].beDone=true;
  }
  Log(gShort[si]+" changed by you: SL "+DoubleToString(nsl,dg)+"  TP "+DoubleToString(ntp,dg),CL_AU);
  SaySym(V_LEVELS,gSym[si]);
  Pulse(4,gShort[si]+" SL/TP set");
  return true;
}
function CloseTrade(k){
  if(k<0||k>=gTN||!gT[k].open) return false;
  let si=gT[k].si;
  if(si<0||si>=gNS) return false;
  if(gT[k].live) {
    gTrade.SetExpertMagicNumber(InpMagic);
    if(!gTrade.PositionClose(gT[k].ticket)) {
      Log(gShort[si]+": close refused - "+gTrade.ResultRetcodeDescription(),CL_DN);
      return false;
    }
    ManageOne(k);
    return true;
  }
  let px=(gT[k].dir>0?PBid(si):PAsk(si));
  let pl=(px-gT[k].entry)*gT[k].dir*ValPerPrice(si,gT[k].lot);
  Finish(k,px,pl,"closed by you");
  return true;
}
function ProcessPending(si){
  let dir=gPend[si];
  if(dir===0) return;
  let s=_cp(gSet[si]);
  if(!s.on||HasOpen(si)) {
    gPend[si]=0;
    return;
  }
  let tf=TFV[ClampI(s.tf,0,NTF-1)];
  let bid=PBid(si),ask=PAsk(si);
  if(bid<=0||ask<=0) return;
  let px=(dir>0?ask:bid);
  let slD=0,tpD=0,lot=0;
  let dw="";
  if(!(_t77=DistancesEx(si,dir,slD,tpD,lot,dw),slD=_R[0],tpD=_R[1],lot=_R[2],dw=_R[3],_t77)) slD=0;
  let bars=iBarShift(gSym[si],tf,gPendT[si],false);
  if(bars<0) bars=0;
  let sd=(dir>0?"BUY":"SELL");
  if(slD>0&&((dir>0?bid<=gPendPx[si]-slD:ask>=gPendPx[si]+slD))) {
    gPend[si]=0;
    gSt[si]=0;
    gNote[si]=sd+" cancelled - price hit the SL level while waiting";
    Log(gShort[si]+" "+sd+" cancelled while waiting (SL level reached)",CL_MU);
    Pulse(2,"cancel");
    SaySym(V_CANCEL,gSym[si]);
    return;
  }
  let go=(s.cwMode===0);
  if(s.cwMode===1) {
    go=(bars>=s.cwN);
    gNote[si]=sd+" waiting "+IntegerToString(IMin(bars,s.cwN))+"/"+IntegerToString(s.cwN)+" candles";
  }
  if(s.cwMode===2) {
    let left=s.cwN*60-(TimeCurrent()-gPendT[si]);
    go=(left<=0);
    gNote[si]=sd+" waiting "+IntegerToString((left>0?left:0))+" s";
  }
  if(s.cwMode===3) {
    let lvl=gPendPx[si]-dir*slD*s.cwPull/100.0;
    go=((dir>0?ask<=lvl:bid>=lvl));
    gNote[si]=sd+" waiting pullback to "+DoubleToString(lvl,Dg(si));
    if(!go&&bars>s.cwN) {
      gPend[si]=0;
      gSt[si]=0;
      gNote[si]=sd+" cancelled - no pullback in "+IntegerToString(s.cwN)+" candles";
      Log(gShort[si]+" "+sd+" cancelled - no pullback",CL_MU);
      Pulse(2,"cancel");
      SaySym(V_CANCEL,gSym[si]);
      return;
    }
  }
  gSt[si]=2;
  gStT[si]=((Now())>>>0);
  if(!go) return;
  gPend[si]=0;
  let no=GuardCheck(si);
  if(no!=="") {
    gSt[si]=0;
    gCntHold++;
    gLastJudge="Held "+gShort[si]+": "+no;
    Log(gShort[si]+" "+sd+" confirmed but held - "+no,CL_MU);
    Pulse(2,"wait",6);
    SaySym(V_HELD,gSym[si]);
    return;
  }
  gCntOk++;
  gLastJudge="Confirmed "+gShort[si];
  Pulse(2,"OK "+gShort[si],5);
  OpenTrade(si,dir,gPendWhy[si]+" + confirmed");
}
function Scan(){
  Pulse(0,IntegerToString(gNS)+" symbols");
  for(let si=0;si<gNS;si++) {
    if(!gAvail[si]||!gSet[si].on) {
      if(gPend[si]!==0) {
        gPend[si]=0;
        gSt[si]=0;
      }
      continue;
    }
    if(gPend[si]!==0) {
      ProcessPending(si);
      continue;
    }
    let tf=TFV[ClampI(gSet[si].tf,0,NTF-1)];
    let bt=iTime(gSym[si],tf,0);
    if(bt===0||bt===gLastBar[si]) continue;
    if(gLastBar[si]===0) {
      gLastBar[si]=bt;
      continue;
    }
    let why="";
    let sig=(_t78=Signal(si,why),why=_R[0],_t78);
    if(sig===-9) continue;
    gLastBar[si]=bt;
    if(HasOpen(si)) continue;
    if(sig===0) {
      if(why!=="") gNote[si]=why;
      continue;
    }
    gNote[si]=why;
    gSt[si]=1;
    gStT[si]=((Now())>>>0);
    gCntSig++;
    gLastSig=gShort[si]+((sig>0?" BUY":" SELL"))+" - "+why;
    Pulse(1,gShort[si]+((sig>0?" BUY?":" SELL?")));
    let no=GuardCheck(si);
    if(no!=="") {
      gSt[si]=0;
      gCntHold++;
      gLastJudge="Held "+gShort[si]+": "+no;
      Pulse(2,"wait",6);
      Log(gShort[si]+" "+((sig>0?"BUY":"SELL"))+" signal held - "+no,CL_MU);
      SaySym(V_HELD,gSym[si]);
      continue;
    }
    if(gSet[si].cwMode>0) {
      gPend[si]=sig;
      gPendPx[si]=((sig>0?PAsk(si):PBid(si)));
      gPendT[si]=TimeCurrent();
      gPendWhy[si]=why;
      gSt[si]=2;
      gStT[si]=((Now())>>>0);
      gLastJudge="Waiting "+gShort[si]+": "+CWN[gSet[si].cwMode];
      Pulse(2,"wait "+gShort[si],5);
      Log(gShort[si]+" "+((sig>0?"BUY":"SELL"))+" signal - "+CWN[gSet[si].cwMode]+" ("+why+")",CL_VI);
      SaySym(V_WAIT,gSym[si]);
      continue;
    }
    gSt[si]=2;
    gCntOk++;
    gLastJudge="Approved "+gShort[si];
    Pulse(2,"OK "+gShort[si],5);
    OpenTrade(si,sig,why);
  }
}
function WaitHandles(si){
  let hs=_A(6,()=>0);
  hs[0]=gH1[si];
  hs[1]=gH2[si];
  hs[2]=gHT[si];
  hs[3]=gHA[si];
  hs[4]=gHH1[si];
  hs[5]=gHH2[si];
  for(let tries=0;tries<60;tries++) {
    let ok=true;
    for(let i=0;i<6;i++) if(hs[i]!==INVALID_HANDLE&&BarsCalculated(hs[i])<=0) ok=false;
    for(let i=0;i<rhN;i++) if(rhH[i]!==INVALID_HANDLE&&BarsCalculated(rhH[i])<=0) ok=false;
    if(ok) return;
    Sleep(50);
  }
}
function BacktestNow(si,bars,net,trades,wr){
  net=0;
  trades=0;
  wr=0;
  if(si<0||si>=gNS||!gAvail[si]) { const _rv="symbol not available"; _R=[net,trades,wr]; return _rv; }
  let sym=gSym[si];
  let tf=TFV[ClampI(gSet[si].tf,0,NTF-1)];
  let why="";
  gBufShift=2;
  (_t79=Signal(si,why),why=_R[0],_t79);
  gBufShift=1;
  WaitHandles(si);
  let avail=Bars(sym,tf);
  bars=IMin(bars,avail-320);
  if(bars<50) { const _rv="not enough candles on "+TFN[gSet[si].tf]; _R=[net,trades,wr]; return _rv; }
  let n=0,w=0,buys=0;
  let gp=0,gl=0,cum=0,peak=0,dd=0;
  let _in=false;
  let dir=0;
  let sl=0,tp=0,en=0,lot=0;
  for(let s=bars;s>=1;s--) {
    if(_in) {
      let h=iHigh(sym,tf,s),l=iLow(sym,tf,s);
      let hitS=((dir>0?l<=sl:h>=sl)),hitT=((dir>0?h>=tp:l<=tp));
      if(hitS||hitT) {
        let ex=(hitS?sl:tp);
        let pl=(ex-en)*dir*ValPerPrice(si,lot);
        n++;
        if(pl>0) {
          w++;
          gp+=pl;
        }
        else gl-=pl;
        cum+=pl;
        peak=MathMax(peak,cum);
        dd=MathMax(dd,peak-cum);
        _in=false;
      }
      continue;
    }
    if(s<2) break;
    gBufShift=s;
    let sig=(_t80=Signal(si,why),why=_R[0],_t80);
    if(sig!==1&&sig!==-1) continue;
    let slD=0,tpD=0;
    let dw="";
    if(!(_t81=DistancesEx(si,sig,slD,tpD,lot,dw),slD=_R[0],tpD=_R[1],lot=_R[2],dw=_R[3],_t81)) continue;
    en=iOpen(sym,tf,s-1);
    if(en<=0) continue;
    dir=sig;
    sl=en-dir*slD;
    tp=en+dir*tpD;
    _in=true;
    if(dir>0) buys++;
  }
  gBufShift=1;
  net=cum;
  trades=n;
  wr=(n>0?100.0*w/n:0);
  let pf=(gl>0?DoubleToString(gp/gl,2):((gp>0?"max":"-")));
  { const _rv=gShort[si]+" "+TFN[gSet[si].tf]+", last "+IntegerToString(bars)+" candles: "+IntegerToString(n)+" trades, win "+DoubleToString(wr,0)+"%, net "+Money(cum)+", PF "+pf+", max DD "+Money(dd); _R=[net,trades,wr]; return _rv; }
  _R=[net,trades,wr];
}
function BacktestProposal(si,p,rb,rs,bars,net,trades,wr){
  if(si<0||si>=gNS) { const _rv=""; _R=[net,trades,wr]; return _rv; }
  let keep=_cp(gSet[si]);
  let kb=gRuleB[si],ks=gRuleS[si];
  let lb=gLastBar[si];
  gSet[si]=_cp(p);
  gRuleB[si]=rb;
  gRuleS[si]=rs;
  RuleCompileAll();
  MakeHandles(si);
  let r=(_t82=BacktestNow(si,bars,net,trades,wr),net=_R[0],trades=_R[1],wr=_R[2],_t82);
  gSet[si]=_cp(keep);
  gRuleB[si]=kb;
  gRuleS[si]=ks;
  RuleCompileAll();
  MakeHandles(si);
  gLastBar[si]=lb;
  { const _rv=r; _R=[net,trades,wr]; return _rv; }
  _R=[net,trades,wr];
}
var GUARDFILE="GTM_AI\\guard.csv";
function DayKey(t){
  return (Math.trunc(t/86400));
}
function TodayRealized(si){
  let s=0;
  let lv=((gMode===1?1:0));
  for(let i=jN-1;i>=0;i--) {
    if(DayKey(jT1[i])<gdDay) break;
    if(jLive[i]!==lv||DayKey(jT1[i])!==gdDay) continue;
    if(si>=0&&jSym[i]!==gSym[si]) continue;
    s+=jPL[i];
  }
  return s;
}
function TodayTrades(si){
  let n=0,lv=((gMode===1?1:0));
  for(let i=jN-1;i>=0;i--) {
    if(DayKey(jT1[i])<gdDay) break;
    if(jLive[i]!==lv||DayKey(jT0[i])!==gdDay) continue;
    if(si>=0&&jSym[i]!==gSym[si]) continue;
    n++;
  }
  for(let k=0;k<gTN;k++) if(gT[k].open&&gT[k].live===(gMode===1)&&DayKey(gT[k].t0)===gdDay&&(si<0||gT[k].si===si)) n++;
  return n;
}
function SymFloating(si){
  let f=0;
  for(let k=0;k<gTN;k++) if(gT[k].open&&gT[k].si===si&&gT[k].live===(gMode===1)) f+=gT[k].pl;
  return f;
}
function DayBase(){
  let b=Balance()-TodayRealized(-1);
  return (b>0?b:Balance());
}
function DayPL(){
  return TodayRealized(-1)+Floating(gMode);
}
function GuardSave(){
  let h=FileOpen(GUARDFILE,FILE_WRITE|FILE_TXT|FILE_ANSI);
  if(h===INVALID_HANDLE) return;
  FileWriteString(h,"G;"+((gdLossOn?"1":"0"))+";"+DoubleToString(gdLoss,2)+";"+((gdLossPct?"1":"0"))+";"+((gdProfOn?"1":"0"))+";"+DoubleToString(gdProf,2)+";"+((gdProfPct?"1":"0"))+";"+((gdDdOn?"1":"0"))+";"+DoubleToString(gdDd,2)+";"+((gdSmartOn?"1":"0"))+";"+IntegerToString(gdSmartN)+";"+DoubleToString(gdSmartCut,1)+";"+((gdCoolOn?"1":"0"))+";"+IntegerToString(gdCoolMin)+";"+((gdMaxOn?"1":"0"))+";"+IntegerToString(gdMax)+";"+((gAskAll?"1":"0"))+"\n");
  FileWriteString(h,"L;"+IntegerToString(gdDay)+";"+((gdLock?"1":"0"))+";"+gdLockWhy+";"+DoubleToString(gdPeak,2)+";"+IntegerToString(gdConsLoss)+";"+IntegerToString(gMode)+"\n");
  for(let i=0;i<gNS;i++) FileWriteString(h,"Y;"+gSym[i]+";"+DoubleToString(gsLoss[i],2)+";"+DoubleToString(gsProf[i],2)+";"+IntegerToString(gsMax[i])+";"+((gsLock[i]?"1":"0"))+";"+gsLockWhy[i]+"\n");
  FileClose(h);
}
function GuardLoad(){
  gdDay=DayKey(TimeCurrent());
  if(!FileIsExist(GUARDFILE)) return;
  let h=FileOpen(GUARDFILE,FILE_READ|FILE_TXT|FILE_ANSI);
  if(h===INVALID_HANDLE) return;
  let same=false;
  while(!FileIsEnding(h)) {
    let p=[];
    let n=StringSplit(FileReadString(h),59,p);
    if(n>=17&&p[0]==="G") {
      gdLossOn=(p[1]==="1");
      gdLoss=StringToDouble(p[2]);
      gdLossPct=(p[3]==="1");
      gdProfOn=(p[4]==="1");
      gdProf=StringToDouble(p[5]);
      gdProfPct=(p[6]==="1");
      gdDdOn=(p[7]==="1");
      gdDd=StringToDouble(p[8]);
      gdSmartOn=(p[9]==="1");
      gdSmartN=StringToInteger(p[10]);
      gdSmartCut=StringToDouble(p[11]);
      gdCoolOn=(p[12]==="1");
      gdCoolMin=StringToInteger(p[13]);
      gdMaxOn=(p[14]==="1");
      gdMax=StringToInteger(p[15]);
      gAskAll=(p[16]==="1");
    }
    else if(n>=7&&p[0]==="L") {
      same=(StringToInteger(p[1])===gdDay&&StringToInteger(p[6])===gMode);
      if(same) {
        gdLock=(p[2]==="1");
        gdLockWhy=p[3];
      }
      if(same) {
        gdPeak=StringToDouble(p[4]);
        gdConsLoss=StringToInteger(p[5]);
      }
    }
    else if(n>=7&&p[0]==="Y") {
      for(let i=0;i<gNS;i++) if(gSym[i]===p[1]) {
        gsLoss[i]=StringToDouble(p[2]);
        gsProf[i]=StringToDouble(p[3]);
        gsMax[i]=StringToInteger(p[4]);
        if(same&&p[5]==="1") {
          gsLock[i]=true;
          gsLockWhy[i]=p[6];
        }
      }
    }
  }
  FileClose(h);
  gdLoss=Clamp(gdLoss,0.1,100000);
  gdProf=Clamp(gdProf,0.1,100000);
  gdDd=Clamp(gdDd,1,95);
  gdSmartN=ClampI(gdSmartN,1,20);
  gdSmartCut=Clamp(gdSmartCut,5,100);
  gdCoolMin=ClampI(gdCoolMin,1,1440);
  gdMax=ClampI(gdMax,1,500);
}
function TgNotify(text){
  if(!InpTgNotify||!gBrOnline||!gBrTg) return;
  MailSend("p2b_","{\"kind\":\"tg_send\",\"text\":"+JQ(text)+"}");
}
function GuardLock(why,voice){
  gdLock=true;
  gdLockWhy=why;
  ClearPending();
  Log("ACCOUNT GUARD: "+why+" - no new trades today",CL_DN);
  Say(voice,true);
  TgNotify("🛑 ACCOUNT GUARD: "+why+". No new trades until tomorrow (open trades are still managed).");
  GuardSave();
}
function GuardSymLock(si,why){
  gsLock[si]=true;
  gsLockWhy[si]=why;
  gPend[si]=0;
  Log(gShort[si]+": "+why+" - no more trades on it today",CL_AU);
  SaySym(V_GSYM,gSym[si],true);
  TgNotify("⛔ "+gShort[si]+": "+why+". No more trades on it today.");
  GuardSave();
}
function GuardMonitor(){
  let d=DayKey(TimeCurrent());
  if(d!==gdDay) {
    gdDay=d;
    gdLock=false;
    gdLockWhy="";
    for(let i=0;i<NSYM;i++) {
      gsLock[i]=false;
      gsLockWhy[i]="";
    }
    gdPeak=Equity();
    GuardSave();
  }
  let eq=Equity();
  if(eq>gdPeak||gdPeak<=0) gdPeak=eq;
  if(!gdLock) {
    let base=DayBase(),pl=DayPL();
    if(gdLossOn) {
      let lim=(gdLossPct?base*gdLoss/100.0:gdLoss);
      if(lim>0&&pl<=-lim) GuardLock("daily loss limit reached ("+Money(pl)+")",V_GLOSS);
    }
    if(!gdLock&&gdProfOn) {
      let tg=(gdProfPct?base*gdProf/100.0:gdProf);
      if(tg>0&&pl>=tg) GuardLock("daily profit target reached ("+Money(pl)+")",V_GPROF);
    }
    if(!gdLock&&gdDdOn&&gdPeak>0&&eq<=gdPeak*(1.0-gdDd/100.0)) {
      let nc=0;
      for(let k=0;k<gTN;k++) if(gT[k].open&&gT[k].live===(gMode===1)) {
        if(CloseTrade(k)) nc++;
      }
      GuardLock("max drawdown "+DoubleToString(gdDd,0)+"% from the top ("+IntegerToString(nc)+" trades closed)",V_GDD);
    }
  }
  for(let si=0;si<gNS;si++) {
    if(gsLock[si]||(gsLoss[si]<=0&&gsProf[si]<=0)) continue;
    let pl=TodayRealized(si)+SymFloating(si);
    if(gsLoss[si]>0&&pl<=-gsLoss[si]) GuardSymLock(si,"lost "+Money(pl)+" today (limit "+Money(gsLoss[si])+")");
    else if(gsProf[si]>0&&pl>=gsProf[si]) GuardSymLock(si,"made "+Money(pl)+" today (target "+Money(gsProf[si])+")");
  }
}
function GuardBlock(si){
  if(gdLock) return "account guard: "+gdLockWhy;
  if(si>=0&&si<gNS&&gsLock[si]) return "stopped for today: "+gsLockWhy[si];
  if(gdCoolOn&&si>=0&&si<gNS&&gsLastLoss[si]>0&&TimeCurrent()-gsLastLoss[si]<gdCoolMin*60) return "cooling down after a loss ("+IntegerToString((Math.trunc((gdCoolMin*60-(TimeCurrent()-gsLastLoss[si]))/60))+1)+" min)";
  if(gdMaxOn&&TodayTrades(-1)>=gdMax) return "max "+IntegerToString(gdMax)+" trades today";
  if(si>=0&&si<gNS&&gsMax[si]>0&&TodayTrades(si)>=gsMax[si]) return "max "+IntegerToString(gsMax[si])+" trades on it today";
  return "";
}
function GuardOnClose(si,pl){
  if(pl<-0.005) {
    gdConsLoss++;
    if(si>=0&&si<NSYM) gsLastLoss[si]=TimeCurrent();
  }
  else if(pl>0.005) gdConsLoss=0;
}
function GuardLot(si,lot){
  if(!gdSmartOn||gBufShift>1||gdConsLoss<gdSmartN) return lot;
  return NormLot(si,lot*gdSmartCut/100.0);
}
function GuardSummary(){
  let s="";
  s+="day P/L "+Money(DayPL())+" (base "+Money(DayBase())+")";
  if(gdLock) s+=" | LOCKED: "+gdLockWhy;
  if(gdLossOn) s+=" | loss limit "+((gdLossPct?DoubleToString(gdLoss,1)+"%":Money(gdLoss)));
  if(gdProfOn) s+=" | profit target "+((gdProfPct?DoubleToString(gdProf,1)+"%":Money(gdProf)));
  if(gdDdOn) s+=" | max DD "+DoubleToString(gdDd,0)+"%";
  if(gdSmartOn) s+=" | smart lot after "+IntegerToString(gdSmartN)+" losses -> "+DoubleToString(gdSmartCut,0)+"%";
  if(gdCoolOn) s+=" | cool-down "+IntegerToString(gdCoolMin)+" min";
  if(gdMaxOn) s+=" | max "+IntegerToString(gdMax)+" trades/day";
  return s;
}
function CalcHeat(){
  let tfs=_AFILL([PERIOD_M1,PERIOD_M5,PERIOD_M15,PERIOD_H1],4,0);
  let fT=0,fM=0,fV=0;
  let nf=0;
  for(let si=0;si<gNS;si++) {
    if(!gAvail[si]) {
      for(let k=0;k<5;k++) gConf[si][k]=0;
      continue;
    }
    let sum=0,bias=0;
    for(let k=0;k<4;k++) {
      let r=[];
      let n=CopyRates(gSym[si],tfs[k],1,60,r);
      if(n<30) {
        gConf[si][k]=0;
        continue;
      }
      let ema=r[0].close,a=2.0/21.0,atr=0,up=0,dn=0;
      for(let i=1;i<n;i++) {
        ema=r[i].close*a+ema*(1-a);
        atr+=r[i].high-r[i].low;
        if(i>=n-14) {
          let d=r[i].close-r[i-1].close;
          if(d>0) up+=d;
          else dn-=d;
        }
      }
      atr/=(n-1);
      let rsi=((up+dn)>0?100.0*up/(up+dn):50);
      let tr=(atr>0?Clamp((r[n-1].close-ema)/(2*atr),-1,1):0);
      let mo=(rsi-50)/50.0;
      let b=0.6*tr+0.4*mo;
      gConf[si][k]=Clamp(MathAbs(b),0,1);
      sum+=gConf[si][k];
      bias+=b;
      if(k===1) {
        fT+=MathAbs(tr);
        fM+=MathAbs(mo);
        fV+=Clamp(atr/(r[n-1].close*0.002+1e-9),0,1);
        nf++;
      }
    }
    let ai=sum/4.0;
    if(gSt[si]>=1) ai=MathMin(1,ai+0.25);
    gConf[si][4]=ai;
    gBias[si]=(bias>0.15?1:((bias<-0.15?-1:0)));
  }
  if(nf>0) {
    gFeat[0]=fT/nf;
    gFeat[1]=fM/nf;
    gFeat[2]=fV/nf;
  }
  let sigs=0;
  for(let si=0;si<gNS;si++) if(gSt[si]>=1) sigs++;
  gFeat[3]=(gNS>0?Clamp(0.15+sigs*1.0/gNS,0,1):0);
  let spr=0;
  let ns=0;
  for(let si=0;si<gNS;si++) if(gAvail[si]) {
    let b=PBid(si),a=PAsk(si);
    if(b>0) {
      spr+=(a-b)/b*1000;
      ns++;
    }
  }
  gFeat[4]=(ns>0?Clamp(1-spr/ns,0,1):0.5);
  let dt=new MqlDateTime();
  TimeToStruct(TimeLocal(),dt);
  gFeat[5]=0.5+0.5*MathSin((dt.hour*60+dt.min)/1440.0*2*M_PI);
}
function Font(pt,bold=false){
  cv.FontSet(UiFont(),-pt*10,(bold?FW_BOLD:FW_NORMAL));
}
function Txt(x,y,s,c,pt,bold=false,al=0){
  Font(pt,bold);
  cv.TextOut(x,y,Lng(s),c,al);
}
function TWr(s,pt,bold=false){
  Font(pt,bold);
  return cv.TextWidth(s);
}
function TW(s,pt,bold=false){
  return TWr(Lng(s),pt,bold);
}
function Fit(s,pt,bold,w){
  if(w<=8) return "";
  s=Lng(s);
  if(TWr(s,pt,bold)<=w) return s;
  while(StringLen(s)>1&&TWr(s+"..",pt,bold)>w) s=StringSubstr(s,0,StringLen(s)-1);
  return s+"..";
}
function AddBtn(x1,y1,x2,y2,id){
  if(bN>=MAXB) return;
  bx1[bN]=x1;
  by1[bN]=y1;
  bx2[bN]=x2;
  by2[bN]=y2;
  bId[bN]=id;
  bN++;
}
function InRect(x,y,x1,y1,w,h){
  return (x>=x1&&x<=x1+w&&y>=y1&&y<=y1+h);
}
const MAXCR=24;
var crX1=_A(MAXCR,()=>0),crY1=_A(MAXCR,()=>0),crX2=_A(MAXCR,()=>0),crY2=_A(MAXCR,()=>0),crK=_A(MAXCR,()=>0);
var crC=_A(MAXCR,()=>0);
var crN=0;
var ccX1=_A(MAXCR,()=>0),ccY1=_A(MAXCR,()=>0),ccX2=_A(MAXCR,()=>0),ccY2=_A(MAXCR,()=>0),ccK=_A(MAXCR,()=>0);
var ccC=_A(MAXCR,()=>0);
var ccN=-1,ccW=0,ccH=0;
function RegPanel(x,y,w,h,acc,kind){
  if(crN>=MAXCR) return;
  crX1[crN]=x;
  crY1[crN]=y;
  crX2[crN]=x+w;
  crY2[crN]=y+h;
  crC[crN]=((acc)>>>0);
  crK[crN]=kind;
  crN++;
}
function CacheSame(){
  if(ccN!==crN||ccW!==gW||ccH!==gH) return false;
  for(let i=0;i<crN;i++) if(ccX1[i]!==crX1[i]||ccY1[i]!==crY1[i]||ccX2[i]!==crX2[i]||ccY2[i]!==crY2[i]||ccC[i]!==crC[i]||ccK[i]!==crK[i]) return false;
  return true;
}
function InCache(x,y,w,h){
  for(let i=0;i<ccN;i++) if(ccX1[i]===x&&ccY1[i]===y&&ccX2[i]===x+w&&ccY2[i]===y+h) return true;
  return false;
}
function PanelBody(x1,y1,x2,y2,acc,kind){
  if(kind===2) {
    cv.RectA(x1,y1,x2,y2,C(6,14,36),235);
    cv.RectA(x1,y2,x2,y2,acc,120);
    return;
  }
  let r=((kind===1)?10:14);
  cv.RoundBorder(x1-2,y1-2,x2+2,y2+2,r+2,acc,26,2.0);
  cv.RoundFill(x1,y1,x2,y2,r,(kind===1?CL_DARK:CL_PN),(kind===1?175:200));
  cv.RoundFill(x1+1,y1+1,x2-1,y1+Math.trunc((y2-y1)/3),r,C(255,255,255),(kind===1?4:6));
  cv.RoundBorder(x1,y1,x2,y2,r,acc,(kind===1?120:150),1.2);
  if(kind===0) cv.RoundFill(x1+12,y1+10,x1+15,y1+22,2,acc,230);
}
function Panel(x,y,w,h,title,acc){
  if(!InCache(x,y,w,h)) PanelBody(x,y,x+w,y+h,acc,0);
  if(title!=="") Txt(x+22,y+8,Fit(title,9,true,w-34),Lerp(acc,CL_TX,0.55),9,true);
}
function Btn(x,y,w,h,txt,col,on,id,pt=9){
  let r=IMin(Math.trunc(h/2),8);
  let hov=InRect(gMX,gMY,x,y,w,h);
  cv.RoundFill(x,y,x+w,y+h,r,(on?col:CL_DARK),(on?85:((hov?210:165))));
  cv.RoundBorder(x,y,x+w,y+h,r,col,(on||hov?255:160),1.2);
  Txt(x+Math.trunc(w/2),y+Math.trunc(h/2),txt,(on?CL_TX:col),pt,true,TA_CENTER|TA_VCENTER);
  AddBtn(x,y,x+w,y+h,id);
}
function DashH(x1,x2,y,c){
  for(let x=x1;x<x2;x+=9) cv.Line(x,y,IMin(x+5,x2),y,c);
}
function ScrollBar(x,y,h,total,shown,off,c){
  if(total<=shown||h<20) return;
  cv.RoundFill(x,y,x+3,y+h,2,CL_LN,160);
  let bh=IMax(14,Math.trunc(h*shown/total));
  let by=y+Math.trunc((h-bh)*off/IMax(1,total-shown));
  cv.RoundFill(x,by,x+3,by+bh,2,c,230);
}
function Bezier(x0,y0,x1,y1,c,a,th,dotT,dot){
  let cx1=x0+(x1-x0)*0.5,cx2=cx1;
  let px=x0,py=y0;
  let n=22;
  for(let i=1;i<=n;i++) {
    let t=(+i)/n,u=1-t;
    let x=u*u*u*x0+3*u*u*t*cx1+3*u*t*t*cx2+t*t*t*x1;
    let y=u*u*u*y0+3*u*u*t*y0+3*u*t*t*y1+t*t*t*y1;
    cv.LineT(px,py,x,y,th,c,a);
    px=x;
    py=y;
  }
  if(dot) {
    let t=dotT,u=1-t;
    let x=u*u*u*x0+3*u*u*t*cx1+3*u*t*t*cx2+t*t*t*x1;
    let y=u*u*u*y0+3*u*u*t*y0+3*u*t*t*y1+t*t*t*y1;
    cv.DotA(x,y,2.6,c,IMin(255,a*2+60));
  }
}
var RX=_A(8,()=>0),RY=_A(8,()=>0),RW=_A(8,()=>0),RH=_A(8,()=>0);
var AX=_A(NAG,()=>0),AY=_A(NAG,()=>0),AW=_A(NAG,()=>0),AH=_A(NAG,()=>0);
var CoreX=0,CoreY=0,CoreR=40,gLay=0;
var EPX=_A(NEDGE,()=>_A(8,()=>0)),EPY=_A(NEDGE,()=>_A(8,()=>0)),ELen=_A(NEDGE,()=>0);
var EPN=_A(NEDGE,()=>0);
var gBoxFlash=0,gLogFlash=0;
function PathClear(e){
  EPN[e]=0;
  ELen[e]=0;
}
function PathAdd(e,x,y){
  let n=EPN[e];
  if(n>=8) return;
  EPX[e][n]=x;
  EPY[e][n]=y;
  if(n>0) ELen[e]+=MathSqrt((x-EPX[e][n-1])*(x-EPX[e][n-1])+(y-EPY[e][n-1])*(y-EPY[e][n-1]));
  EPN[e]=n+1;
}
function PathAt(e,t,x,y){
  let n=EPN[e];
  if(n<=0) {
    x=0;
    y=0;
    { _R=[x,y]; return; }
  }
  x=EPX[e][0];
  y=EPY[e][0];
  if(n<2||ELen[e]<=0) { _R=[x,y]; return; }
  let want=Clamp(t,0,1)*ELen[e],run=0;
  for(let i=1;i<n;i++) {
    let dx=EPX[e][i]-EPX[e][i-1],dy=EPY[e][i]-EPY[e][i-1];
    let L=MathSqrt(dx*dx+dy*dy);
    if(run+L>=want&&L>0) {
      let k=(want-run)/L;
      x=EPX[e][i-1]+dx*k;
      y=EPY[e][i-1]+dy*k;
      { _R=[x,y]; return; }
    }
    run+=L;
  }
  x=EPX[e][n-1];
  y=EPY[e][n-1];
  _R=[x,y];
}
function CoreEdge(px,py,x,y){
  let an=MathArctan2(py-CoreY,px-CoreX);
  x=CoreX+(CoreR+4)*MathCos(an);
  y=CoreY+(CoreR+4)*MathSin(an);
  _R=[x,y];
}
function SetCard(i,x,y,w,h){
  AX[i]=x;
  AY[i]=y;
  AW[i]=w;
  AH[i]=h;
}
function LayoutDash(){
  let m=10,top=58,H=gH-top-m,W=gW-2*m;
  let LW=Math.trunc(((W-m)*0.64)),RWd=W-m-LW;
  let H1=Math.trunc((H*0.58));
  RX[1]=m;
  RY[1]=top;
  RW[1]=LW;
  RH[1]=H1;
  let w3=Math.trunc(((LW-m)*0.42));
  RX[3]=m;
  RY[3]=top+H1+m;
  RW[3]=w3;
  RH[3]=H-H1-m;
  RX[2]=m+w3+m;
  RY[2]=RY[3];
  RW[2]=LW-w3-m;
  RH[2]=RH[3];
  let xr=m+LW+m,h6=Math.trunc((H*0.36)),h5=Math.trunc((H*0.27));
  RX[6]=xr;
  RY[6]=top;
  RW[6]=RWd;
  RH[6]=h6;
  RX[5]=xr;
  RY[5]=top+h6+m;
  RW[5]=RWd;
  RH[5]=h5;
  RX[4]=xr;
  RY[4]=RY[5]+h5+m;
  RW[4]=RWd;
  RH[4]=top+H-RY[4];
  let ix=RX[1]+12,iy=RY[1]+32,iw=RW[1]-24,ih=RH[1]-42,g=14;
  let chA=Math.trunc(MathMin(170,ih*0.31));
  let gapA=ih-2*chA;
  for(let e=0;e<NEDGE;e++) PathClear(e);
  if(gapA>=190&&chA>=110&&ih>=iw*0.60) {
    gLay=0;
    let cw=Math.trunc((iw-2*g)/3),ch=chA;
    let c0=ix,c1=ix+cw+g,c2=ix+2*(cw+g),yb=iy+ih-ch;
    SetCard(1,c0,iy,cw,ch);
    SetCard(2,c1,iy,cw,ch);
    SetCard(3,c2,iy,cw,ch);
    SetCard(0,c0,yb,cw,ch);
    SetCard(5,c1,yb,cw,ch);
    SetCard(4,c2,yb,cw,ch);
    CoreX=c1+Math.trunc(cw/2);
    CoreY=iy+Math.trunc(ih/2);
    CoreR=IMax(30,Math.trunc(gapA/2)-12);
    let xa=c0+cw*0.30,xb=c0+cw*0.70,ym=iy+ch/2.0,ymb=yb+ch/2.0;
    PathAdd(0,xa,yb);
    PathAdd(0,xa,iy+ch);
    PathAdd(1,c0+cw,ym);
    PathAdd(1,c1,ym);
    PathAdd(2,c1+cw,ym);
    PathAdd(2,c2,ym);
    PathAdd(3,c2+cw/2.0,iy+ch);
    PathAdd(3,c2+cw/2.0,yb);
    PathAdd(4,c2,ymb);
    PathAdd(4,c1+cw,ymb);
    PathAdd(5,CoreX,yb);
    PathAdd(5,CoreX,CoreY+CoreR+4);
    PathAdd(6,CoreX-CoreR-4,CoreY);
    PathAdd(6,xb,CoreY);
    PathAdd(6,xb,yb);
    let vx=c1+cw*0.30;
    let bx=RX[1]+RW[1]+m/2.0,ty=Clamp(CoreY,RY[6]+40,RY[6]+RH[6]-20);
    PathAdd(7,CoreX+CoreR+4,CoreY);
    PathAdd(7,bx,CoreY);
    PathAdd(7,bx,ty);
    PathAdd(7,RX[6]+6,ty);
    let lx=RX[3]+RW[3]-40,gy=RY[3]-m/2.0;
    PathAdd(8,vx,yb+ch);
    if(lx<vx) {
      PathAdd(8,vx,gy);
      PathAdd(8,lx,gy);
      PathAdd(8,lx,RY[3]+6);
    }
    else PathAdd(8,vx,RY[3]+6);
  }
  else {
    gLay=1;
    let gv=Math.trunc(MathMax(12,ih*0.09));
    let coreW=Math.trunc(MathMin(ih*0.86,iw*0.27));
    let gh=Math.trunc(MathMax(30,iw*0.06));
    let sw=Math.trunc((iw-coreW-2*gh)/2);
    sw=Math.trunc(MathMin(sw,iw*0.27));
    let rh=Math.trunc((ih-2*gv)/3);
    if(rh>118) {
      rh=118;
      gv=Math.trunc((ih-3*rh)/2);
    }
    let lx=ix,rx=ix+iw-sw;
    let r0=iy,r1=iy+rh+gv,r2=iy+2*(rh+gv);
    SetCard(1,lx,r0,sw,rh);
    SetCard(0,lx,r1,sw,rh);
    SetCard(5,lx,r2,sw,rh);
    SetCard(2,rx,r0,sw,rh);
    SetCard(3,rx,r1,sw,rh);
    SetCard(4,rx,r2,sw,rh);
    CoreX=ix+Math.trunc(iw/2);
    CoreY=iy+Math.trunc(ih/2);
    CoreR=IMax(26,IMin(Math.trunc(coreW/2),Math.trunc(ih/2))-22);
    let tl=iy+3,bl=iy+ih-3,ex=0,ey=0;
    let laneL=(lx+sw+CoreX-CoreR)/2.0,laneR=(rx+CoreX+CoreR)/2.0;
    PathAdd(0,lx+sw/2.0,r1);
    PathAdd(0,lx+sw/2.0,r0+rh);
    let y1=r0+rh*0.30;
    PathAdd(1,lx+sw,y1);
    PathAdd(1,laneL,y1);
    PathAdd(1,laneL,tl);
    PathAdd(1,laneR,tl);
    PathAdd(1,laneR,y1);
    PathAdd(1,rx,y1);
    PathAdd(2,rx+sw/2.0,r0+rh);
    PathAdd(2,rx+sw/2.0,r1);
    PathAdd(3,rx+sw/2.0,r1+rh);
    PathAdd(3,rx+sw/2.0,r2);
    let y4=r2+rh*0.70;
    PathAdd(4,rx,y4);
    PathAdd(4,laneR,y4);
    PathAdd(4,laneR,bl);
    PathAdd(4,laneL,bl);
    PathAdd(4,laneL,y4);
    PathAdd(4,lx+sw,y4);
    let y5=r2+rh*0.32;
    (_t83=CoreEdge(lx+sw,y5,ex,ey),ex=_R[0],ey=_R[1],_t83);
    PathAdd(5,lx+sw,y5);
    PathAdd(5,ex,ey);
    let y6=r1+rh*0.5;
    (_t84=CoreEdge(lx+sw,y6,ex,ey),ex=_R[0],ey=_R[1],_t84);
    PathAdd(6,ex,ey);
    PathAdd(6,lx+sw,y6);
    let gy=r0+rh+gv/2.0;
    let bx=RX[1]+RW[1]+m/2.0,ty=Clamp(gy,RY[6]+40,RY[6]+RH[6]-20);
    (_t85=CoreEdge(laneR,gy,ex,ey),ex=_R[0],ey=_R[1],_t85);
    PathAdd(7,ex,ey);
    PathAdd(7,laneR,gy);
    PathAdd(7,bx,gy);
    PathAdd(7,bx,ty);
    PathAdd(7,RX[6]+6,ty);
    let vx=lx+sw*0.5,l8=RX[3]+RW[3]-40,g8=RY[3]-m/2.0;
    PathAdd(8,vx,r2+rh);
    if(l8<vx) {
      PathAdd(8,vx,g8);
      PathAdd(8,l8,g8);
      PathAdd(8,l8,RY[3]+6);
    }
    else PathAdd(8,vx,RY[3]+6);
  }
  for(let i=1;i<=6;i++) RegPanel(RX[i],RY[i],RW[i],RH[i],(i===1?CL_MG:((i===2?CL_VI:((i===3?CL_VI:((i===4?CL_AU:((i===5?CL_UP:CL_UP))))))))),0);
  for(let i=0;i<NAG;i++) RegPanel(AX[i],AY[i],AW[i],AH[i],AGC[i],1);
}
function LayoutTwo(lwMax,lwK){
  let m=10,top=58,H=gH-top-m;
  let lw=Math.trunc(MathMin(lwMax,gW*lwK));
  RX[1]=m;
  RY[1]=top;
  RW[1]=lw;
  RH[1]=H;
  RX[2]=m+lw+m;
  RY[2]=top;
  RW[2]=gW-RX[2]-m;
  RH[2]=H;
  RegPanel(RX[1],RY[1],RW[1],RH[1],(gTab===1?CL_UP:CL_VI),0);
  RegPanel(RX[2],RY[2],RW[2],RH[2],(gTab===1?CL_CY:CL_VI),0);
}
function LayoutSet(){
  let m=10,top=58,H=gH-top-m;
  let lw=Math.trunc(MathMin(270,gW*0.20));
  RX[1]=m;
  RY[1]=top;
  RW[1]=lw;
  RH[1]=H;
  RegPanel(RX[1],RY[1],RW[1],RH[1],CL_CY,0);
  if(gPick||gNS===0||gSetView!==0) {
    RX[2]=m+lw+m;
    RY[2]=top;
    RW[2]=gW-lw-3*m;
    RH[2]=H;
    RegPanel(RX[2],RY[2],RW[2],RH[2],(gPick?CL_CY:CL_AU),0);
    return;
  }
  let ex=m+lw+m,ew=Math.trunc(((gW-ex-m)*0.62));
  RX[2]=ex;
  RY[2]=top;
  RW[2]=ew;
  RH[2]=H;
  RX[3]=ex+ew+m;
  RY[3]=top;
  RW[3]=gW-RX[3]-m;
  RH[3]=H;
  RegPanel(RX[2],RY[2],RW[2],RH[2],CL_UP,0);
  RegPanel(RX[3],RY[3],RW[3],RH[3],CL_AU,0);
}
function BuildBg(){
  cv.Erase(CL_BG);
  for(let y=0;y<gH;y++) cv.Line(0,y,gW-1,y,Lerp(CL_BG2,CL_BG,(+y)/MathMax(1,gH)));
  for(let x=0;x<gW;x+=48) cv.RectA(x,0,x,gH-1,CL_CY,9);
  for(let y=0;y<gH;y+=48) cv.RectA(0,y,gW-1,y,CL_CY,9);
  let r1=Math.trunc(MathMin(420,gW*0.32));
  cv.Glow(Math.trunc((gW*0.08)),0,r1,CL_MG,36);
  cv.Glow(Math.trunc((gW*0.95)),Math.trunc((gH*0.25)),r1,CL_CY,32);
  cv.Glow(Math.trunc((gW*0.5)),gH,r1,CL_VI,28);
  for(let i=0;i<crN;i++) PanelBody(crX1[i],crY1[i],crX2[i],crY2[i],crC[i],crK[i]);
  cv.SaveTo(gBg);
  gBgOk=true;
  ccN=crN;
  ccW=gW;
  ccH=gH;
  for(let i=0;i<crN;i++) {
    ccX1[i]=crX1[i];
    ccY1[i]=crY1[i];
    ccX2[i]=crX2[i];
    ccY2[i]=crY2[i];
    ccC[i]=((crC[i])>>>0);
    ccK[i]=crK[i];
  }
}
function TopBar(){
  Txt(16,13,InpAIName,CL_AU,15,true);
  let tx=16+TW(InpAIName,15,true)+10;
  Txt(tx,17,"TRADE CORE",CL_CY,10,true);
  let x=IMax(200,tx+TW("TRADE CORE",10,true)+18);
  let tabs=_AFILL(["DASHBOARD","LIVE TRADES","HISTORY","DATA ANALYZER","AI CHAT","SETTINGS"],6,"");
  let tid=_AFILL([0,1,2,4,5,3],6,0);
  for(let i=0;i<6;i++) {
    let w=TW(tabs[i],9,true)+24;
    Btn(x,10,w,28,tabs[i],(tid[i]===gTab?CL_AU:CL_CY),tid[i]===gTab,"tab:"+IntegerToString(tid[i]));
    x+=w+6;
  }
  let rx=gW-12;
  let mt=(gMode===1?"LIVE":"SIMULATOR");
  let w1=TW(mt,9,true)+26;
  rx-=w1;
  Btn(rx,10,w1,28,mt,(gMode===1?CL_DN:CL_UP),gMode===1,"mode");
  let rt=(gRun?"|| PAUSE":"> RUN");
  let w2=TW(rt,9,true)+26;
  rx-=w2+6;
  Btn(rx,10,w2,28,rt,(gRun?CL_CY:CL_AU),!gRun,"run");
  let clk=TimeToString(TimeLocal(),TIME_SECONDS);
  rx-=10;
  if(rx-x>140) Txt(rx,24,"EQ "+Money(Equity())+"   "+clk,CL_MU,9,false,TA_RIGHT|TA_VCENTER);
}
function AgentIcon(i,cx,cy,r,c,t,act){
  switch(i) {
    case 0:
      {
        cv.ArcA(cx,cy,r,0,2*M_PI,2,c,255);
        cv.ArcA(cx,cy,r*0.62,0,2*M_PI,1.4,c,170);
        cv.ArcA(cx,cy,r*0.28,0,2*M_PI,1.2,c,140);
        let an=(gLowAnim?-0.7:t/700.0);
        for(let k=0;k<10;k++) cv.LineT(cx,cy,cx+r*MathCos(an-k*0.07),cy+r*MathSin(an-k*0.07),1.6,c,200-k*18);
        cv.FillCircle(cx+Math.trunc((r*0.55*MathCos(1.1))),cy+Math.trunc((r*0.55*MathSin(1.1))),2,CL_TX);
        break;
      }
    case 1:
      {
        let rr=r*1.45;
        cv.ArcA(cx,cy+Math.trunc((r*0.95)),rr,-M_PI*0.5-0.75,-M_PI*0.5+0.75,2.2,c,255);
        cv.ArcA(cx,cy-Math.trunc((r*0.95)),rr,M_PI*0.5-0.75,M_PI*0.5+0.75,2.2,c,255);
        let ox=(act&&!gLowAnim?Math.trunc((MathSin(t/400.0)*r*0.25)):0);
        cv.FillCircle(cx+ox,cy,Math.trunc((r*0.42)),c);
        cv.FillCircle(cx+ox,cy,Math.trunc((r*0.18)),CL_DARK);
        cv.FillCircle(cx+ox+2,cy-2,1,CL_TX);
        break;
      }
    case 2:
      {
        let tilt=(act&&!gLowAnim?MathSin(t/250.0)*0.18:0);
        let bx=Math.trunc((r*0.95*MathCos(tilt))),by=Math.trunc((r*0.95*MathSin(tilt)));
        cv.LineT(cx,cy-r,cx,cy+r*0.8,2,c,255);
        cv.FillTriangle(cx,cy+Math.trunc((r*0.6)),cx-Math.trunc((r*0.55)),cy+r,cx+Math.trunc((r*0.55)),cy+r,c);
        cv.LineT(cx-bx,cy-r*0.6-by,cx+bx,cy-r*0.6+by,2,c,255);
        let lx=cx-bx,ly=Math.trunc((cy-r*0.6-by)),rx2=cx+bx,ry=Math.trunc((cy-r*0.6+by));
        cv.LineT(lx,ly,lx,ly+r*0.55,1,c,200);
        cv.LineT(rx2,ry,rx2,ry+r*0.55,1,c,200);
        cv.ArcA(lx,ly+Math.trunc((r*0.45)),r*0.32,0,M_PI,2,c,255);
        cv.ArcA(rx2,ry+Math.trunc((r*0.45)),r*0.32,0,M_PI,2,c,255);
        break;
      }
    case 3:
      {
        let s=r;
        cv.FillTriangle(cx+Math.trunc((s*0.25)),cy-s,cx-Math.trunc((s*0.55)),cy+Math.trunc((s*0.12)),cx+Math.trunc((s*0.05)),cy+Math.trunc((s*0.12)),c);
        cv.FillTriangle(cx-Math.trunc((s*0.25)),cy+s,cx+Math.trunc((s*0.55)),cy-Math.trunc((s*0.12)),cx-Math.trunc((s*0.05)),cy-Math.trunc((s*0.12)),c);
        if(act) cv.Glow(cx,cy,Math.trunc((r*1.3)),c,90);
        break;
      }
    case 4:
      {
        let s=r;
        cv.FillRectangle(cx-Math.trunc((s*0.8)),cy-s,cx+Math.trunc((s*0.8)),cy+Math.trunc((s*0.15)),c);
        cv.FillTriangle(cx-Math.trunc((s*0.8)),cy+Math.trunc((s*0.15)),cx+Math.trunc((s*0.8)),cy+Math.trunc((s*0.15)),cx,cy+s,c);
        cv.LineT(cx-s*0.38,cy-s*0.05,cx-s*0.08,cy+s*0.3,2.2,CL_DARK,255);
        cv.LineT(cx-s*0.08,cy+s*0.3,cx+s*0.42,cy-s*0.38,2.2,CL_DARK,255);
        break;
      }
    default:
      {
        let s=r;
        cv.Rectangle(cx-s,cy-s,cx+s,cy+s,c);
        cv.Rectangle(cx-s+1,cy-s+1,cx+s-1,cy+s-1,c);
        cv.ArcA(cx,cy,s*0.55,0,2*M_PI,2,c,255);
        let an=(gLowAnim?0:t/600.0);
        for(let k=0;k<4;k++) cv.LineT(cx,cy,cx+s*0.5*MathCos(an+k*M_PI/2),cy+s*0.5*MathSin(an+k*M_PI/2),1.4,c,220);
        cv.FillRectangle(cx+s-3,cy-Math.trunc((s*0.5)),cx+s+1,cy-Math.trunc((s*0.2)),c);
        cv.FillRectangle(cx+s-3,cy+Math.trunc((s*0.2)),cx+s+1,cy+Math.trunc((s*0.5)),c);
        break;
      }
  }
}
function DrawBot(cx,cy,s,c,t,act,seed){
  if(s<14) return;
  let shell=((C(222,234,250))>>>0),shade=((C(170,190,220))>>>0);
  let hw=s*0.80,hh=s*0.46;
  let hx1=cx-hw/2,hy1=cy-s/2+s*0.12;
  cv.LineT(cx,hy1,cx,hy1-s*0.09,1.4,shade,255);
  let blink=(act?(0.5+0.5*MathSin(t/120.0)):0.35);
  cv.DotA(cx,hy1-s*0.11,MathMax(1.5,s*0.045),c,Math.trunc((120+135*blink)));
  if(act) cv.Glow(cx,Math.trunc((hy1-s*0.11)),Math.trunc((s*0.14)),c,90);
  cv.DotA(hx1,hy1+hh*0.5,MathMax(1.5,s*0.07),c,255);
  cv.DotA(hx1+hw,hy1+hh*0.5,MathMax(1.5,s*0.07),c,255);
  cv.RoundFill(Math.trunc(hx1),Math.trunc(hy1),Math.trunc((hx1+hw)),Math.trunc((hy1+hh)),hh*0.42,shell,255);
  cv.RoundFill(Math.trunc((hx1+hw*0.12)),Math.trunc((hy1+hh*0.20)),Math.trunc((hx1+hw*0.88)),Math.trunc((hy1+hh*0.80)),hh*0.28,C(10,22,46),255);
  let ph=MathMod(t/1000.0+seed*0.77,4.0);
  let ex=hw*0.19,ey=hy1+hh*0.50,er=MathMax(1.4,s*0.065);
  let ox=(act&&!gLowAnim?MathSin(t/260.0)*er*0.7:0);
  if(ph<0.13&&!gLowAnim) {
    cv.LineT(cx-ex-er+ox,ey,cx-ex+er+ox,ey,1.4,c,255);
    cv.LineT(cx+ex-er+ox,ey,cx+ex+er+ox,ey,1.4,c,255);
  }
  else {
    cv.DotA(cx-ex+ox,ey,er,c,255);
    cv.DotA(cx+ex+ox,ey,er,c,255);
    cv.DotA(cx-ex+ox-er*0.35,ey-er*0.35,er*0.35,CL_TX,220);
    cv.DotA(cx+ex+ox-er*0.35,ey-er*0.35,er*0.35,CL_TX,220);
  }
  let bw=s*0.56,bh=s*0.30,bodyY=hy1+hh+s*0.03;
  cv.RoundFill(Math.trunc((cx-bw/2)),Math.trunc(bodyY),Math.trunc((cx+bw/2)),Math.trunc((bodyY+bh)),bh*0.38,shell,255);
  cv.RoundFill(Math.trunc((cx-bw*0.22)),Math.trunc((bodyY+bh*0.25)),Math.trunc((cx+bw*0.22)),Math.trunc((bodyY+bh*0.68)),2,c,(act?255:190));
  let shy=bodyY+bh*0.25;
  let lhx=cx-bw/2-s*0.10,lhy=bodyY+bh*0.95;
  if(act&&!gLowAnim) {
    lhx=cx-bw/2-s*0.17;
    lhy=bodyY-s*0.06+MathSin(t/140.0)*s*0.07;
  }
  cv.LineT(cx-bw/2+1,shy,lhx,lhy,MathMax(1.4,s*0.07),shade,255);
  cv.DotA(lhx,lhy,MathMax(1.4,s*0.05),c,255);
  cv.LineT(cx+bw/2-1,shy,cx+bw/2+s*0.10,bodyY+bh*0.95,MathMax(1.4,s*0.07),shade,255);
  cv.DotA(cx+bw/2+s*0.10,bodyY+bh*0.95,MathMax(1.4,s*0.05),c,255);
}
function AgentStatus(i,l1,l2){
  let on=0;
  for(let si=0;si<gNS;si++) if(gAvail[si]&&gSet[si].on) on++;
  let wait=0;
  for(let si=0;si<gNS;si++) if(gPend[si]!==0) wait++;
  let closed=0,wins=0;
  (_t86=WinStats(closed,wins),closed=_R[0],wins=_R[1],_t86);
  switch(i) {
    case 0:
      l1="Scanning "+IntegerToString(on)+" of "+IntegerToString(gNS)+" symbols";
      l2=(gRun?"checks every new candle":"PAUSED - press RUN");
      break;
    case 1:
      l1="Signals found: "+IntegerToString(gCntSig);
      l2=(gLastSig===""?"waiting for a setup":gLastSig);
      break;
    case 2:
      l1="OK "+IntegerToString(gCntOk)+"  held "+IntegerToString(gCntHold)+((wait>0?"  waiting "+IntegerToString(wait):""));
      l2=(gLastJudge===""?"risk rules ready":gLastJudge);
      break;
    case 3:
      l1="Orders: "+IntegerToString(gCntOrd)+((gMode===1?"  (LIVE)":"  (SIM)"));
      l2=(gLastOrd===""?"ready to strike":gLastOrd);
      break;
    case 4:
      l1="Open "+IntegerToString(OpenCount(gMode))+"/"+IntegerToString(gMaxOpen)+"   safe "+IntegerToString(SafeCount(gMode));
      l2=(gLastGuard===""?"BE + trailing on duty":gLastGuard);
      break;
    default:
      l1="Balance "+Money(Balance());
      l2=(closed>0?"win "+IntegerToString(Math.trunc(MathRound(100.0*wins/closed)))+"% of "+IntegerToString(closed)+"   float "+Money(Floating(gMode)):"float "+Money(Floating(gMode)));
      break;
  }
  _R=[l1,l2];
}
function DrawAgent(i,t){
  let bx=AX[i],by=AY[i],cw=AW[i],ch=AH[i];
  let c=((AGC[i])>>>0);
  let a=gAct[i]>0;
  if(!InCache(bx,by,cw,ch)) PanelBody(bx,by,bx+cw,by+ch,c,1);
  if(a) {
    cv.RoundFill(bx,by,bx+cw,by+ch,10,c,20);
    cv.RoundBorder(bx,by,bx+cw,by+ch,10,c,230,2.0);
  }
  let compact=(ch<100);
  let tx=0;
  if(!compact) {
    let L=Math.trunc(MathMin(cw*0.30,ch*0.95));
    let rs=MathMin(L*0.92,ch*0.56);
    let rcx=bx+10+Math.trunc(L/2),rcy=by+8+Math.trunc((rs/2));
    DrawBot(rcx,rcy,rs,c,t+i*333,a,i);
    let ir=Math.trunc(MathMax(6,MathMin(L*0.16,ch*0.13)));
    let icy=by+ch-ir-9;
    let ay1=rcy+Math.trunc((rs/2))+3,ay2=icy-ir-6;
    if(ay2-ay1>=6) {
      cv.LineT(rcx,ay1,rcx,ay2-3,1.2,c,150);
      cv.FillTriangle(rcx-3,ay2-4,rcx+3,ay2-4,rcx,ay2,c);
    }
    cv.CircleA(rcx,icy,ir+5,CL_DARK,220);
    cv.ArcA(rcx,icy,ir+5,0,2*M_PI,1.4,c,(a?255:170));
    AgentIcon(i,rcx,icy,Math.trunc(MathMax(4,ir*0.78)),c,t,a);
    tx=bx+L+20;
  }
  else {
    let rs=ch-16;
    let rcx=bx+8+Math.trunc((rs*0.45)),rcy=by+Math.trunc(ch/2);
    DrawBot(rcx,rcy,rs,c,t+i*333,a,i);
    let ir=Math.trunc(MathMax(5,ch*0.13));
    let icx=bx+8+Math.trunc((rs*0.95))+ir+6,icy=by+Math.trunc(ch/2);
    cv.CircleA(icx,icy,ir+4,CL_DARK,220);
    cv.ArcA(icx,icy,ir+4,0,2*M_PI,1.3,c,(a?255:170));
    AgentIcon(i,icx,icy,Math.trunc(MathMax(4,ir*0.78)),c,t,a);
    tx=icx+ir+12;
  }
  let fsN=(ch>=140?12:((ch>=95?11:10))),fsJ=(ch>=140?9:8),fs1=(ch>=140?10:((ch>=95?9:8))),fs2=(ch>=140?9:8);
  let tw=bx+cw-tx-10;
  let nb=0,nbx=bx+cw-4;
  let yy=by+((compact?6:8));
  let l1="",l2="";
  (_t87=AgentStatus(i,l1,l2),l1=_R[0],l2=_R[1],_t87);
  if(compact) {
    Txt(tx,yy,Fit(AGN[i],fsN,true,tw-2*nb-8),c,fsN,true);
    let nw=TW(AGN[i],fsN,true);
    if(tx+nw+10<nbx-nb-6) Txt(tx+nw+8,yy+2,Fit(AGJOB[i],7,false,nbx-nb-6-(tx+nw+8)),CL_MU,7);
    yy+=fsN+8;
    Txt(tx,yy,Fit((a&&gAtx[i]!==""?gAtx[i]:l1),fs1,true,tw),(a?CL_TX:Lerp(c,CL_TX,0.55)),fs1,true);
    yy+=fs1+6;
    if(yy+fs2<by+ch-10) Txt(tx,yy,Fit(l2,fs2,false,tw),CL_MU,fs2);
  }
  else {
    Txt(tx,yy,Fit(AGN[i],fsN,true,tw-2*nb-8),c,fsN,true);
    yy+=fsN+9;
    if(yy+fsJ+4<by+ch-14) {
      Txt(tx,yy,Fit(AGJOB[i],fsJ,false,tw),CL_MU,fsJ);
      yy+=fsJ+8;
    }
    if(yy<by+ch-20) {
      cv.RectA(tx,yy,bx+cw-12,yy,c,90);
      yy+=6;
    }
    if(yy+fs1+4<by+ch-10) {
      Txt(tx,yy,Fit((a&&gAtx[i]!==""?gAtx[i]:l1),fs1,true,tw),(a?CL_TX:Lerp(c,CL_TX,0.55)),fs1,true);
      yy+=fs1+7;
    }
    if(yy+fs2+4<by+ch-12) Txt(tx,yy,Fit(l2,fs2,false,tw),CL_MU,fs2);
  }
  let bx1b=tx,bx2b=bx+cw-12,byb=by+ch-9;
  cv.RoundFill(bx1b,byb,bx2b,byb+3,2,CL_LN,150);
  let k=(a?MathMin(1.0,gAct[i]/45.0):0.12+0.06*MathSin(t/700.0+i));
  if(!gLowAnim&&a) k=MathMin(1.0,k*0.6+0.4*(0.5+0.5*MathSin(t/90.0+i)));
  cv.RoundFill(bx1b,byb,bx1b+Math.trunc(((bx2b-bx1b)*k)),byb+3,2,c,240);
}
function DrawEdges(from,to,t){
  let ec=_A(NEDGE,()=>0);
  ec[0]=((CL_VI)>>>0);
  ec[1]=((CL_MG)>>>0);
  ec[2]=((CL_BL)>>>0);
  ec[3]=((CL_UP)>>>0);
  ec[4]=((CL_AU)>>>0);
  ec[5]=((CL_AU)>>>0);
  ec[6]=((CL_CY)>>>0);
  ec[7]=((CL_UP)>>>0);
  ec[8]=((CL_VI)>>>0);
  for(let e=from;e<=to;e++) {
    let n=EPN[e];
    if(n<2) continue;
    let al=60+IMin(150,gLinkF[e]*4);
    for(let i=1;i<n;i++) {
      if(e===6) {
        let dx=EPX[e][i]-EPX[e][i-1],dy=EPY[e][i]-EPY[e][i-1],L=MathSqrt(dx*dx+dy*dy);
        for(let d=0;d<L;d+=10) {
          let k1=d/L,k2=MathMin(1.0,(d+5)/L);
          cv.LineT(EPX[e][i-1]+dx*k1,EPY[e][i-1]+dy*k1,EPX[e][i-1]+dx*k2,EPY[e][i-1]+dy*k2,1.2,ec[e],al);
        }
      }
      else cv.LineT(EPX[e][i-1],EPY[e][i-1],EPX[e][i],EPY[e][i],(gLinkF[e]>0?1.8:1.2),ec[e],al);
    }
    let x2=EPX[e][n-1],y2=EPY[e][n-1],x1=EPX[e][n-2],y1=EPY[e][n-2];
    let an=MathArctan2(y2-y1,x2-x1);
    let ax=Math.trunc(x2),ay=Math.trunc(y2);
    cv.FillTriangle(ax,ay,Math.trunc((x2-8*MathCos(an-0.45))),Math.trunc((y2-8*MathSin(an-0.45))),Math.trunc((x2-8*MathCos(an+0.45))),Math.trunc((y2-8*MathSin(an+0.45))),ec[e]);
  }
  for(let p=0;p<pkN;p++) {
    let e=pkE[p];
    if(e<from||e>to) continue;
    for(let k=0;k<7;k++) {
      let x=0,y=0;
      (_t88=PathAt(e,MathMax(0,pkT[p]-k*0.025),x,y),x=_R[0],y=_R[1],_t88);
      cv.DotA(x,y,4.2-k*0.5,pkC[p],255-k*32);
    }
    let hx=0,hy=0;
    (_t89=PathAt(e,pkT[p],hx,hy),hx=_R[0],hy=_R[1],_t89);
    if(!gLowAnim) cv.Glow(Math.trunc(hx),Math.trunc(hy),12,pkC[p],120);
  }
}
function DrawJarvisCore(cx,cy,r,t){
  let mix=Clamp(gCoreMix,0,1);
  let cA=((Lerp(C(50,175,255),C(255,70,100),mix))>>>0);
  let cB=((Lerp(C(20,80,190),C(190,30,70),mix))>>>0);
  let cE=((Lerp(CL_CY,C(255,150,60),mix))>>>0);
  cv.Glow(cx,cy,Math.trunc(MathMin(r*1.18,r+40)),cB,Math.trunc((70+50*mix)));
  if(gCelebF>0) cv.Glow(cx,cy,Math.trunc((r*1.35)),CL_AU,Math.trunc((130.0*gCelebF/CELEBF)));
  if(gRedF>0) cv.Glow(cx,cy,Math.trunc((r*1.25)),CL_DN,Math.trunc((110.0*gRedF/REDF)));
  let eq=Equity(),st=(gMode===1?((gLiveStart>0?gLiveStart:eq)):gSimStart);
  let p=Clamp(0.5+(eq-st)/MathMax(1,st)*5,0,1);
  cv.ArcA(cx,cy,r,0,2*M_PI,2,CL_LN,200);
  let seg=60;
  for(let i=0;i<seg;i++) {
    let k=(+i)/seg;
    if(k>p) break;
    let c=(((k<0.5?Lerp(cA,CL_MG,k*2):Lerp(CL_MG,CL_AU,(k-0.5)*2)))>>>0);
    cv.ArcA(cx,cy,r,-M_PI/2+k*2*M_PI,-M_PI/2+(k+1.0/seg)*2*M_PI,4.5,c,255);
  }
  let sp=(gLowAnim?0:(0.35+mix*1.4));
  let rot=t/1000.0*sp;
  for(let k=0;k<72;k++) {
    let an=k*2*M_PI/72+rot*0.25;
    let r1=r*0.90,r2=r1-(((k%6)===0?r*0.07:r*0.035));
    cv.LineT(cx+r1*MathCos(an),cy+r1*MathSin(an),cx+r2*MathCos(an),cy+r2*MathSin(an),1.1,cA,((k%6)===0?220:120));
  }
  for(let d=0;d<3;d++) cv.ArcA(cx,cy,r*0.78,rot+d*2.094,rot+d*2.094+1.1,2.6,cA,230);
  for(let d=0;d<12;d++) cv.ArcA(cx,cy,r*0.68,-rot*1.5+d*0.5236,-rot*1.5+d*0.5236+0.22,1.4,cE,170);
  if(mix>0.03) {
    let nb=64;
    for(let k=0;k<nb;k++) {
      let an=k*2*M_PI/nb;
      let nz=MathAbs(MathSin(t/85.0+k*1.7)*MathSin(t/131.0+k*0.63));
      let L=r*0.20*(0.25+0.75*nz)*mix;
      let r1=r*0.45;
      cv.LineT(cx+r1*MathCos(an),cy+r1*MathSin(an),cx+(r1+L)*MathCos(an),cy+(r1+L)*MathSin(an),1.6,cE,Math.trunc((230*mix)));
    }
  }
  let rs=Math.trunc((r*0.42));
  cv.CircleA(cx,cy,rs,C(4,10,28),255);
  cv.Glow(cx,cy,rs,cA,Math.trunc((150+60*mix)));
  cv.ArcA(cx,cy,rs,0,2*M_PI,1.6,cA,255);
  let fs=IMax(8,IMin(14,Math.trunc(r/8)));
  Txt(cx,cy-((rs>40?8:0)),Fit(InpAIName,fs,true,rs*2-8),CL_TX,fs,true,TA_CENTER|TA_VCENTER);
  if(rs>40) {
    let st2=(mix>0.3&&gCoreTx!==""?gCoreTx:((gRun?"ONLINE":"PAUSED")));
    Txt(cx,cy+fs,Fit(st2,8,true,rs*2-10),(mix>0.3?C(255,200,170):CL_CY),8,true,TA_CENTER|TA_VCENTER);
  }
  if(rs>56) Txt(cx,cy+fs+15,"EQ "+Money(eq),CL_MU,8,false,TA_CENTER|TA_VCENTER);
}
function DrawFloor(t){
  let x=RX[1],y=RY[1],w=RW[1],h=RH[1];
  Panel(x,y,w,h,"AI AGENT TEAM  -  "+InpAIName+" CORE  -  WORK FLOW",CL_MG);
  let mode=((gMode===1?"LIVE":"SIMULATOR"));
  mode+=((gRun?"  -  RUNNING":"  -  PAUSED"));
  Txt(x+w-14,y+8,mode,(gMode===1?CL_DN:CL_UP),8,true,TA_RIGHT);
  DrawEdges(0,6,t);
  DrawJarvisCore(CoreX,CoreY,CoreR,t);
  for(let i=0;i<NAG;i++) DrawAgent(i,t);
}
function DrawNeural(x,y,w,h){
  Panel(x,y,w,h,"NEURAL FLOW - MARKET FEATURES  >  AI  >  YOUR SYMBOLS",CL_VI);
  let t=gFrame*InpFrameMs;
  let pal=_A(5,()=>0);
  pal[0]=((CL_CY)>>>0);
  pal[1]=((CL_MG)>>>0);
  pal[2]=((CL_AU)>>>0);
  pal[3]=((CL_UP)>>>0);
  pal[4]=((CL_VI)>>>0);
  let top=y+30,bot=y+h-10,ih=bot-top;
  let fw=Math.trunc(MathMin(150,w*0.24));
  let fs=(Math.trunc(ih/6)>26?9:8);
  for(let i=0;i<6;i++) {
    let fy=top+(i+0.5)*ih/6.0,fx=x+fw;
    let v=Clamp(gFeat[i],0,1);
    Txt(x+14,Math.trunc(fy)-13,FEATN[i],CL_MU,fs);
    cv.RoundFill(x+14,Math.trunc(fy)+2,x+fw-10,Math.trunc(fy)+7,2,C(18,48,106),255);
    cv.RoundFill(x+14,Math.trunc(fy)+2,x+14+Math.trunc(((fw-24)*v)),Math.trunc(fy)+7,2,pal[(i%5)],255);
    cv.FillCircle(Math.trunc(fx),Math.trunc(fy)+4,3,pal[(i%5)]);
  }
  let rows=IMax(5,IMin(10,Math.trunc(ih/22)));
  let cols=IMax(1,Math.trunc((gNS+rows-1)/rows));
  let rx=x+Math.trunc((w*0.50)),rw=x+w-12-rx;
  let colW=Math.trunc(rw/cols);
  let hx=x+fw+(rx-x-fw)*0.42,hy=top+ih/2.0;
  for(let i=0;i<6;i++) {
    let fy=top+(i+0.5)*ih/6.0+4,v=Clamp(gFeat[i],0,1);
    Bezier(x+fw,fy,hx,hy,pal[(i%5)],Math.trunc((40+150*v)),1.3,MathMod(t*0.0005+i*0.17,1.0),!gLowAnim);
  }
  let PX=_A(NSYM,()=>0),PY2=_A(NSYM,()=>0);
  for(let si=0;si<gNS;si++) {
    let c=Math.trunc(si/rows),r=(si%rows);
    let inCol=IMin(rows,gNS-c*rows);
    PX[si]=rx+c*colW+6;
    PY2[si]=top+(r+0.5)*ih/(+inCol);
    let wv=(HasOpen(si)?0.95:((gSt[si]===2?0.75:((gSt[si]===1?0.6:0.12+0.25*gConf[si][4])))));
    if(!gAvail[si]||!gSet[si].on) wv=0.06;
    Bezier(hx,hy,PX[si],PY2[si],gCol[si],Math.trunc((255*wv)),(wv>0.5?1.8:1.2),MathMod(t*0.0005+si*0.073,1.0),!gLowAnim&&wv>0.1);
    if(!gLowAnim&&wv>0.5) Bezier(hx,hy,PX[si],PY2[si],gCol[si],0,1,MathMod(t*0.0005+si*0.073+0.5,1.0),true);
  }
  let hr=Math.trunc((MathMin(ih,w)*0.06+((gLowAnim?0:MathSin(t/300.0)*1.5))));
  hr=IMax(9,hr);
  cv.Glow(Math.trunc(hx),Math.trunc(hy),hr*3,CL_AU,120);
  for(let k=0;k<3;k++) cv.ArcA(Math.trunc(hx),Math.trunc(hy),hr+5+k*5,((gLowAnim?0:t/800.0))*(((k%2)===0?1:-1))+k,((gLowAnim?0:t/800.0))*(((k%2)===0?1:-1))+k+1.6,1.4,(k===1?CL_MG:CL_CY),180);
  cv.FillCircle(Math.trunc(hx),Math.trunc(hy),hr,CL_AU);
  Txt(Math.trunc(hx),Math.trunc(hy),"AI",CL_DARK,(hr>14?11:9),true,TA_CENTER|TA_VCENTER);
  let nfs=(colW>110?9:8);
  for(let si=0;si<gNS;si++) {
    let o=HasOpen(si);
    if(o) cv.Glow(Math.trunc(PX[si]),Math.trunc(PY2[si]),14,gCol[si],130);
    cv.FillCircle(Math.trunc(PX[si]),Math.trunc(PY2[si]),(o?6:4),(gAvail[si]&&gSet[si].on?gCol[si]:CL_LN));
    let nm=Fit(gShort[si]+((o?" *":((gPend[si]!==0?" ..":"")))),nfs,o,colW-16);
    Txt(Math.trunc(PX[si])+10,Math.trunc(PY2[si]),nm,(gAvail[si]&&gSet[si].on?CL_TX:CL_MU),nfs,o,TA_LEFT|TA_VCENTER);
  }
}
function DrawHeat(x,y,w,h){
  Panel(x,y,w,h,"CONFIDENCE HEATMAP",CL_AU);
  let hd=_AFILL(["M1","M5","M15","H1","AI"],5,"");
  let nameW=Math.trunc(MathMin(110,w*0.30));
  let cw=Math.trunc((w-30-nameW)/5);
  let y0=y+30;
  for(let k=0;k<5;k++) Txt(x+12+nameW+k*cw+Math.trunc(cw/2),y0,hd[k],CL_MU,8,true,TA_CENTER);
  y0+=16;
  let avail=y+h-8-y0;
  let rh=(gNS>0?Math.trunc(MathMin(26,Math.trunc(avail/gNS))):22);
  if(rh<18) rh=20;
  let nvis=IMax(1,Math.trunc(avail/rh));
  gHeatOff=ClampI(gHeatOff,0,IMax(0,gNS-nvis));
  for(let r=0;r<nvis;r++) {
    let si=gHeatOff+r;
    if(si>=gNS) break;
    let ry=y0+r*rh;
    let mark=(HasOpen(si)?" *":((gPend[si]!==0?" ..":((gSt[si]===1?" ?":"")))));
    let nm=gShort[si]+mark;
    if(!gAvail[si]) nm=gShort[si]+" n/a";
    else if(!gSet[si].on) nm=gShort[si]+" off";
    Txt(x+12,ry+Math.trunc(rh/2),Fit(nm,8,true,nameW-4),(gAvail[si]&&gSet[si].on?gCol[si]:CL_MU),8,true,TA_LEFT|TA_VCENTER);
    for(let k=0;k<5;k++) {
      let v=gConf[si][k];
      let cx1=x+12+nameW+k*cw+1;
      cv.RoundFill(cx1,ry+1,cx1+cw-3,ry+rh-2,4,Heat(v),235);
      Txt(cx1+Math.trunc((cw-3)/2),ry+Math.trunc(rh/2),IntegerToString(Math.trunc(MathRound(v*100))),CL_TX,8,false,TA_CENTER|TA_VCENTER);
    }
    if(gBias[si]!==0) Txt(x+w-12,ry+Math.trunc(rh/2),(gBias[si]>0?"^":"v"),(gBias[si]>0?CL_UP:CL_DN),8,true,TA_RIGHT|TA_VCENTER);
  }
  ScrollBar(x+w-6,y0,avail,gNS,nvis,gHeatOff,CL_AU);
  if(gNS>nvis) Txt(x+w-14,y+8,IntegerToString(gHeatOff+1)+"-"+IntegerToString(IMin(gNS,gHeatOff+nvis))+" of "+IntegerToString(gNS)+"  (wheel)",CL_MU,8,false,TA_RIGHT);
}
function DrawBalance(x,y,w,h){
  Panel(x,y,w,h,"BALANCE HISTORY",CL_UP);
  let closed=0,wins=0;
  (_t90=WinStats(closed,wins),closed=_R[0],wins=_R[1],_t90);
  let inner=h-40;
  let sw=Math.trunc(MathMin(214,w*0.40));
  let sx=x+12,sy=y+30;
  let grid=(inner>=150);
  let sh=(grid?Math.trunc((inner*0.52)):36);
  cv.RoundFill(sx,sy,sx+sw,sy+sh,8,CL_DARK,190);
  cv.RoundBorder(sx,sy,sx+sw,sy+sh,8,CL_LN,200,1.0);
  let lb=_AFILL(["BALANCE","EQUITY","OPEN","WIN"],4,"");
  let vl=_A(4,()=>"");
  vl[0]="$"+DoubleToString(Balance(),0);
  vl[1]="$"+DoubleToString(Equity(),0);
  vl[2]=IntegerToString(OpenCount(gMode))+"/"+IntegerToString(gMaxOpen);
  vl[3]=(closed>0?IntegerToString(Math.trunc(MathRound(100.0*wins/closed)))+"%":"-");
  let vc=_A(4,()=>0);
  vc[0]=((CL_CY)>>>0);
  vc[1]=(((Equity()>=Balance()?CL_UP:CL_DN))>>>0);
  vc[2]=((CL_AU)>>>0);
  vc[3]=((CL_UP)>>>0);
  if(grid) {
    cv.RectA(sx+Math.trunc(sw/2),sy+6,sx+Math.trunc(sw/2),sy+sh-6,CL_LN,200);
    cv.RectA(sx+6,sy+Math.trunc(sh/2),sx+sw-6,sy+Math.trunc(sh/2),CL_LN,200);
    let vf=(sh>=80?11:9);
    for(let i=0;i<4;i++) {
      let cx=sx+((i%2))*(Math.trunc(sw/2))+Math.trunc(sw/4),cy=sy+(Math.trunc(i/2))*(Math.trunc(sh/2));
      Txt(cx,cy+Math.trunc(((Math.trunc(sh/2))*0.30)),lb[i],CL_MU,7,true,TA_CENTER|TA_VCENTER);
      Txt(cx,cy+Math.trunc(((Math.trunc(sh/2))*0.66)),Fit(vl[i],vf,true,Math.trunc(sw/2)-6),vc[i],vf,true,TA_CENTER|TA_VCENTER);
    }
  }
  else for(let i=0;i<4;i++) {
    let cx=sx+i*(Math.trunc(sw/4))+Math.trunc(sw/8);
    if(i>0) cv.RectA(sx+i*(Math.trunc(sw/4)),sy+5,sx+i*(Math.trunc(sw/4)),sy+sh-5,CL_LN,200);
    Txt(cx,sy+10,lb[i],CL_MU,7,true,TA_CENTER|TA_VCENTER);
    Txt(cx,sy+25,Fit(vl[i],9,true,Math.trunc(sw/4)-4),vc[i],9,true,TA_CENTER|TA_VCENTER);
  }
  let aiAll=0,aiToday=0;
  let aiN=0;
  (_t91=AIProfit(aiAll,aiN,aiToday),aiAll=_R[0],aiN=_R[1],aiToday=_R[2],_t91);
  let py0=sy+sh+6,ph0=y+h-10-py0;
  if(ph0>=34) {
    let pc=(((aiAll>=0?CL_UP:CL_DN))>>>0);
    cv.RoundFill(sx,py0,sx+sw,py0+ph0,8,pc,28);
    cv.RoundBorder(sx,py0,sx+sw,py0+ph0,8,pc,170,1.2);
    Txt(sx+10,py0+6,Fit(InpAIName+" PROFIT - ALL SYMBOLS",7,true,sw-20),CL_MU,7,true);
    let fs=(ph0>=70?18:((ph0>=50?14:11)));
    Txt(sx+Math.trunc(sw/2),py0+((ph0>=50?Math.trunc(ph0/2)+3:Math.trunc(ph0/2)+6)),((aiAll>=0?"+":""))+Money(aiAll),pc,fs,true,TA_CENTER|TA_VCENTER);
    if(ph0>=50) Txt(sx+Math.trunc(sw/2),py0+ph0-9,IntegerToString(aiN)+" trades   today "+((aiToday>=0?"+":""))+Money(aiToday),CL_MU,7,false,TA_CENTER|TA_VCENTER);
  }
  let n=ArraySize(gHist);
  let px=sx+sw+14,py=y+30,pw=x+w-12-px,ph=h-42;
  if(n<2||pw<40) {
    Txt(px,py+Math.trunc(ph/2),"collecting...",CL_MU,9);
    return;
  }
  let show=((gBalN<=0)?n:IMin(n,IMax(10,gBalN)));
  let s0=n-show;
  let mn=gHist[s0],mx=gHist[s0];
  for(let i=s0+1;i<n;i++) {
    mn=MathMin(mn,gHist[i]);
    mx=MathMax(mx,gHist[i]);
  }
  if(mx-mn<1) {
    mx+=0.5;
    mn-=0.5;
  }
  let ox=0,oy=0;
  for(let i=s0;i<n;i++) {
    let k=(+(i-s0))/MathMax(1,show-1);
    let X=px+k*pw,Y=py+ph-(gHist[i]-mn)/(mx-mn)*ph;
    let c=(((k<0.5?Lerp(CL_CY,CL_MG,k*2):Lerp(CL_MG,CL_AU,(k-0.5)*2)))>>>0);
    if(((i-s0)%2)===0||show<120) cv.RectA(Math.trunc(X),Math.trunc(Y),Math.trunc(X),py+ph,c,20);
    if(i>s0) cv.LineT(ox,oy,X,Y,2.0,c,255);
    ox=X;
    oy=Y;
  }
  cv.DotA(ox,oy,3.5,CL_AU,255);
  let secs=show*2;
  let span=(secs<120?IntegerToString(secs)+" s":((secs<7200?IntegerToString(Math.trunc(secs/60))+" min":DoubleToString(secs/3600.0,1)+" h")));
  Txt(x+w-12,y+8,"last "+span+"  (wheel = zoom)   "+Money(gHist[n-1]),CL_MU,8,false,TA_RIGHT);
}
var spX=-1,spY=-1,spTX=0,spTY=0,spGait=0,spAng=0;
var spMode=0,spSub=0,spRead=-1,spPause=0,spHl=-1;
var spReadEnd=0;
const MAXHL=12;
var hlId=_A(MAXHL,()=>0),hlLife=_A(MAXHL,()=>0);
var hlX1=_A(MAXHL,()=>0),hlX2=_A(MAXHL,()=>0);
var hlC=_A(MAXHL,()=>0);
var hlN=0;
var wpX=_A(5,()=>0),wpY=_A(5,()=>0);
var wpN=0;
var wpT=((0)>>>0);
function AddHl(id,x1,x2,life){
  if(hlN>=MAXHL) {
    for(let i=0;i<hlN-1;i++) {
      hlId[i]=hlId[i+1];
      hlLife[i]=hlLife[i+1];
      hlX1[i]=hlX1[i+1];
      hlX2[i]=hlX2[i+1];
      hlC[i]=((hlC[i+1])>>>0);
    }
    hlN--;
    if(spHl>=0) spHl--;
  }
  let pal=_A(5,()=>0);
  pal[0]=((CL_CY)>>>0);
  pal[1]=((CL_MG)>>>0);
  pal[2]=((CL_AU)>>>0);
  pal[3]=((CL_UP)>>>0);
  pal[4]=((CL_BL)>>>0);
  hlId[hlN]=id;
  hlX1[hlN]=x1;
  hlX2[hlN]=x2;
  hlLife[hlN]=life;
  hlC[hlN]=((pal[(MathRand()%5)])>>>0);
  hlN++;
  return hlN-1;
}
function DrawSpider(x,y,ang,gait,t){
  let metal=((C(165,188,222))>>>0),dark=((C(28,40,70))>>>0),joint=((C(90,230,255))>>>0);
  let ca=MathCos(ang),sa=MathSin(ang);
  for(let sd=-1;sd<=1;sd+=2) for(let k=0;k<4;k++) {
    let sw=MathSin(gait+k*1.6+((sd>0?M_PI:0)))*0.30;
    let a0=ang+sd*(0.55+k*0.60)+sw;
    let L=21.0-MathAbs(k-1.5)*1.6;
    let hx=x+5.0*MathCos(a0),hy=y+5.0*MathSin(a0);
    let kx=x+L*0.50*MathCos(a0-sw*0.4),ky=y+L*0.50*MathSin(a0-sw*0.4)-6.5;
    let fx=x+L*MathCos(a0),fy=y+L*MathSin(a0);
    let mx=(kx+fx)/2.0+1.5*MathCos(a0),my=(ky+fy)/2.0-1.0;
    cv.LineT(hx,hy,kx,ky,2.2,metal,240);
    cv.LineT(kx,ky,mx,my,1.8,metal,230);
    cv.LineT(mx,my,fx,fy,1.4,C(120,150,195),230);
    cv.DotA(kx,ky,1.9,joint,255);
    cv.DotA(mx,my,1.3,joint,220);
    cv.DotA(fx,fy,1.4,CL_TX,200);
  }
  if(!gLowAnim) cv.Glow(Math.trunc(x),Math.trunc(y),22,CL_MG,90);
  let bx=x-6.5*ca,by=y-6.5*sa,hx=x+5.5*ca,hy=y+5.5*sa;
  cv.DotA(bx,by,8.0,metal,255);
  cv.DotA(bx,by,5.6,dark,255);
  cv.DotA(bx-1.5*ca,by-1.5*sa,2.6,CL_MG,Math.trunc((170+85*MathSin(t/180.0))));
  cv.DotA(x,y,4.6,metal,255);
  cv.DotA(hx,hy,5.6,metal,255);
  cv.DotA(hx+1.2*ca,hy+1.2*sa,3.6,dark,255);
  let px=-sa,py=ca;
  cv.DotA(hx+2.2*ca+1.7*px,hy+2.2*sa+1.7*py,1.4,CL_CY,255);
  cv.DotA(hx+2.2*ca-1.7*px,hy+2.2*sa-1.7*py,1.4,CL_CY,255);
  cv.Glow(Math.trunc((hx+2.2*ca)),Math.trunc((hy+2.2*sa)),6,CL_CY,120);
  cv.LineT(hx,hy,hx+7*ca+3*px,hy+7*sa+3*py-3,1.0,metal,220);
  cv.DotA(hx+7*ca+3*px,hy+7*sa+3*py-3,1.4,CL_AU,Math.trunc((150+100*MathSin(t/140.0))));
}
function DrawLog(x,y,w,h){
  Panel(x,y,w,h,"ACTIVITY LOG",CL_VI);
  if(gLogFlash>0) cv.RoundBorder(x,y,x+w,y+h,14,CL_VI,IMin(255,gLogFlash*10),2.0);
  let lh=17,ty=y+30,by=y+h-10,tx=x+14,tw=w-34;
  let nvis=IMax(1,Math.trunc((by-ty)/lh));
  gLogOff=ClampI(gLogOff,0,IMax(0,gLogN-nvis));
  let nrow=IMin(nvis,gLogN-gLogOff);
  let rs=[];
  let rw=[];
  let rid=[];
  let rc=[];
  ArrayResize(rs,IMax(1,nrow),()=>"");
  ArrayResize(rw,IMax(1,nrow),()=>0);
  ArrayResize(rid,IMax(1,nrow),()=>0);
  ArrayResize(rc,IMax(1,nrow),()=>0);
  for(let i=0;i<nrow;i++) {
    let j=gLogOff+i;
    rs[i]=Fit(gLog[j],9,false,tw);
    rw[i]=TW(rs[i],9);
    rid[i]=gLogId[j];
    rc[i]=((gLogC[j])>>>0);
  }
  for(let hI=0;hI<hlN;hI++) for(let i=0;i<nrow;i++) if(rid[i]===hlId[hI]) {
    let yc=by-Math.trunc(lh/2)-i*lh;
    let a=IMin(95,hlLife[hI]*4);
    let x1=MathMax(0,hlX1[hI]),x2=MathMin(rw[i]+4,hlX2[hI]);
    if(x2>x1+2) cv.RoundFill(tx+Math.trunc(x1)-2,yc-8,tx+Math.trunc(x2)+2,yc+8,4,hlC[hI],a);
  }
  for(let i=0;i<nrow;i++) {
    let yc=by-Math.trunc(lh/2)-i*lh;
    let s=rs[i];
    if(StringLen(s)>10) {
      let tm=StringSubstr(s,0,10);
      Txt(tx,yc,tm,CL_MU,9,false,TA_LEFT|TA_VCENTER);
      Txt(tx+TW(tm,9),yc,StringSubstr(s,10),rc[i],9,false,TA_LEFT|TA_VCENTER);
    }
    else Txt(tx,yc,s,rc[i],9,false,TA_LEFT|TA_VCENTER);
  }
  ScrollBar(x+w-8,ty,by-ty,gLogN,nvis,IMax(0,gLogN-nvis-gLogOff),CL_VI);
  if(gLogOff>0) Btn(x+w-120,y+6,104,20,"v NEWEST",CL_VI,false,"logend",8);
  if(nrow===0||gLowAnim) return;
  let t=gFrame*InpFrameMs;
  if(spX<0||spX<x||spX>x+w||spY<y||spY>y+h) {
    spX=tx+30;
    spY=by-Math.trunc(lh/2);
    spTX=spX;
    spTY=spY;
    spMode=0;
  }
  if(gSpNew>0&&gLogOff===0&&rid[0]===gSpNew) {
    spMode=1;
    spSub=0;
    spRead=gSpNew;
    gSpNew=0;
    spTX=tx;
    spTY=by-Math.trunc(lh/2);
    spReadEnd=rw[0];
    spHl=AddHl(spRead,0,0,70);
  }
  if(spMode===1) {
    let ri=-1;
    for(let i=0;i<nrow;i++) if(rid[i]===spRead) ri=i;
    if(ri<0) spMode=0;
    else {
      spTY=by-Math.trunc(lh/2)-ri*lh;
      if(spSub===0&&MathAbs(spX-spTX)<3&&MathAbs(spY-spTY)<3) spSub=1;
      if(spSub===1) {
        spTX=MathMin(tx+spReadEnd,spX+6);
        if(spHl>=0&&spHl<hlN&&hlId[spHl]===spRead) {
          hlX2[spHl]=spX-tx;
          hlLife[spHl]=70;
        }
        if(spX>=tx+spReadEnd-1) {
          spMode=0;
          spPause=18;
          spHl=-1;
        }
      }
    }
  }
  else if(spPause>0) spPause--;
  else if(MathAbs(spX-spTX)<2&&MathAbs(spY-spTY)<2) {
    if((MathRand()%10)<4) {
      let ri=0;
      let best=1e9;
      for(let i=0;i<nrow;i++) {
        let d=MathAbs(by-Math.trunc(lh/2)-i*lh-spY);
        if(d<best) {
          best=d;
          ri=i;
        }
      }
      let x1=MathMax(0,spX-tx-((MathRand()%30))),ww=25+(MathRand()%70);
      AddHl(rid[ri],x1,MathMin(rw[ri],x1+ww),45);
    }
    spPause=8+(MathRand()%26);
    if((MathRand()%3)>0) {
      let ri=(MathRand()%IMax(1,nrow));
      spTY=by-Math.trunc(lh/2)-ri*lh+((MathRand()%5)-2);
      spTX=tx+(MathRand()%IMax(10,rw[ri]));
    }
    else {
      spTY=ty+10+(MathRand()%IMax(10,by-ty-20));
      spTX=tx+(MathRand()%IMax(10,tw-20));
    }
  }
  let dx=spTX-spX,dy=spTY-spY,d=MathSqrt(dx*dx+dy*dy);
  let spd=((spMode===1)?((spSub===0?7.0:3.2)):2.3);
  if(d>spd) {
    spX+=dx/d*spd;
    spY+=dy/d*spd;
    spAng=MathArctan2(dy,dx);
    spGait+=spd*0.45;
  }
  else if(d>0) {
    spX=spTX;
    spY=spTY;
    spGait+=d*0.45;
  }
  if(Now()-wpT>700||wpN===0) {
    wpT=((Now())>>>0);
    wpN=0;
    for(let k=0;k<4;k++) {
      let ri=ClampI(Math.trunc(MathRound((by-Math.trunc(lh/2)-spY)/lh))+((MathRand()%5)-2),0,nrow-1);
      let px=spX+((MathRand()%180)-90);
      px=Clamp(px,tx,tx+MathMax(10,rw[ri]));
      wpX[wpN]=px;
      wpY[wpN]=by-Math.trunc(lh/2)-ri*lh+((MathRand()%7)-3);
      wpN++;
    }
  }
  for(let k=0;k<wpN;k++) {
    let wc=((((k%2)===0?CL_MG:CL_CY))>>>0);
    cv.LineT(spX,spY,wpX[k],wpY[k],1.5,CL_VI,130);
    if(!gLowAnim) cv.Glow(Math.trunc(wpX[k]),Math.trunc(wpY[k]),9,wc,110);
    cv.DotA(wpX[k],wpY[k],3.2,wc,255);
    cv.ArcA(Math.trunc(wpX[k]),Math.trunc(wpY[k]),5.5,0,2*M_PI,1.0,wc,150);
  }
  DrawSpider(spX,spY,spAng,spGait,t);
}
function TradeProgress(t){
  if(t.si<0||t.si>=gNS) return 0;
  let px=(t.open?((t.dir>0?PBid(t.si):PAsk(t.si))):t.exitP);
  let a=t.sl0,b=t.tp;
  if(MathAbs(b-a)<1e-12) return 0;
  return Clamp((px-a)/(b-a),0,1);
}
function ModeTrades(list,openOnly){
  ArrayResize(list,0,()=>0);
  let n=0;
  for(let k=0;k<gTN;k++) {
    if(gT[k].live!==(gMode===1)) continue;
    if(openOnly&&!gT[k].open) continue;
    if(gT[k].si<0||gT[k].si>=gNS) continue;
    ArrayResize(list,n+1,()=>0);
    list[n]=k;
    n++;
  }
  return n;
}
function DrawBoxes(x,y,w,h){
  Panel(x,y,w,h,"OPEN TRADES - CLICK ONE TO WATCH IT LIVE",CL_UP);
  if(gBoxFlash>0) cv.RoundBorder(x,y,x+w,y+h,14,CL_UP,IMin(255,gBoxFlash*10),2.2);
  let list=[];
  let n=ModeTrades(list,true);
  let cols=3;
  let bw=Math.trunc((w-24-(cols-1)*8)/cols);
  let bh=Math.trunc(Clamp(Math.trunc((h-44)/2)-8,58,92));
  let rowsVis=IMax(1,Math.trunc((h-40)/(bh+8)));
  let rowsAll=Math.trunc((n+cols-1)/cols);
  gBoxOff=ClampI(gBoxOff,0,IMax(0,rowsAll-rowsVis));
  for(let q=0;q<n;q++) {
    let row=Math.trunc(q/cols)-gBoxOff,col=(q%cols);
    if(row<0||row>=rowsVis) continue;
    let k=list[q];
    let bx=x+12+col*(bw+8),by=y+30+row*(bh+8);
    let si=gT[k].si;
    let c=((gCol[si])>>>0);
    let f=(k===gFocus);
    cv.RoundFill(bx,by,bx+bw,by+bh,9,(f?c:CL_DARK),(f?45:165));
    cv.RoundBorder(bx,by,bx+bw,by+bh,9,c,(f?255:170),(f?1.8:1.1));
    Txt(bx+9,by+7,Fit(gShort[si],9,true,bw-60),c,9,true);
    Txt(bx+bw-9,by+7,(gT[k].dir>0?"BUY":"SELL"),(gT[k].dir>0?CL_UP:CL_DN),9,true,TA_RIGHT);
    Txt(bx+9,by+23,Money(gT[k].pl),(gT[k].pl>=0?CL_UP:CL_DN),(bh>=70?13:11),true);
    let tag=(gT[k].trailOn?"TRAIL":((gT[k].beDone?"BE":"risk")));
    if(bh>=70) Txt(bx+bw-9,by+bh-24,tag,(gT[k].safe?CL_AU:CL_MU),7,true,TA_RIGHT);
    let pc=TradeProgress(gT[k]);
    let pbw=bw-18;
    cv.RoundFill(bx+9,by+bh-12,bx+9+pbw,by+bh-8,2,CL_LN,200);
    for(let i=0;i<Math.trunc((pbw*pc));i++) {
      let kk=(+i)/pbw;
      let cc=(((kk<0.5?Lerp(CL_DN,CL_AU,kk*2):Lerp(CL_AU,CL_UP,(kk-0.5)*2)))>>>0);
      cv.Line(bx+9+i,by+bh-12,bx+9+i,by+bh-8,cc);
    }
    AddBtn(bx,by,bx+bw,by+bh,"tb:"+IntegerToString(k));
  }
  if(rowsAll>rowsVis) {
    ScrollBar(x+w-7,y+30,h-40,rowsAll,rowsVis,gBoxOff,CL_UP);
    Txt(x+w-14,y+8,IntegerToString(n)+" open (wheel)",CL_MU,8,false,TA_RIGHT);
  }
  if(n===0) {
    Txt(x+14,y+40,(gRun?"No open trades. Waiting for a confirmed entry...":"Paused - press RUN to look for entries."),CL_MU,10);
    let yy=y+66;
    for(let si=0;si<gNS&&yy<y+h-16;si++) {
      if(gNote[si]==="") continue;
      Txt(x+14,yy,Fit(gShort[si]+": "+gNote[si],8,false,w-28),(gPend[si]!==0?CL_VI:CL_MU),8);
      yy+=15;
    }
  }
}
function DrawDashboard(){
  let t=gFrame*InpFrameMs;
  DrawFloor(t);
  DrawNeural(RX[2],RY[2],RW[2],RH[2]);
  DrawLog(RX[3],RY[3],RW[3],RH[3]);
  DrawHeat(RX[4],RY[4],RW[4],RH[4]);
  DrawBalance(RX[5],RY[5],RW[5],RH[5]);
  DrawBoxes(RX[6],RY[6],RW[6],RH[6]);
  DrawEdges(7,8,t);
}
var gRp=[];
var gRpId=-1,gRpTf=-1,gRpCnt=0;
var gRpT=((0)>>>0);
function PYp(p,y,h,lo,hi){
  return y+h-Math.trunc(((p-lo)/MathMax(1e-12,hi-lo)*h));
}
function LoadBars(k,tfi,liveView){
  if(k<0||k>=gTN) return;
  let cnt=(liveView?gZoom:1000+gHistZoom);
  let same=(gRpId===gT[k].id&&gRpTf===tfi&&gRpCnt===cnt);
  if(same&&(!(gT[k].open||liveView)||Now()-gRpT<700)) return;
  let si=gT[k].si;
  if(si<0||si>=gNS) return;
  let tf=TFV[ClampI(tfi,0,NTF-1)];
  let r=[];
  let n=0;
  if(liveView) n=CopyRates(gSym[si],tf,0,IMax(10,gZoom),r);
  else {
    let ps=PeriodSeconds(tf);
    let from=gT[k].t0-gHistZoom*ps;
    let to=(gT[k].open?TimeCurrent():gT[k].t1+IMax(6,Math.trunc(gHistZoom/4))*ps);
    n=CopyRates(gSym[si],tf,from,to,r);
  }
  if(n<=0) return;
  let keep=(liveView?n:IMin(n,gHistZoom+600));
  let st=(liveView?n-keep:0);
  ArrayResize(gRp,keep,()=>new MqlRates());
  for(let i=0;i<keep;i++) gRp[i]=r[st+i];
  gRpId=gT[k].id;
  gRpTf=tfi;
  gRpCnt=cnt;
  gRpT=((Now())>>>0);
}
var gOvInd=true;
var gOvSmc=0;
const OVS=6;
var ovSN=0,ovN=0;
var ovV=[];
var ovPane=_A(OVS,()=>0);
var ovDot=_A(OVS,()=>false);
var ovCol=_A(OVS,()=>0);
var ovLab=_A(OVS,()=>"");
var ovLv=_A(3,()=>0);
var ovLvN=0;
var ovKey1=-1,ovKey2=-1;
var ovKeyT=((0)>>>0),ovTryT=((0)>>>0);
var ovKeyN=0;
var ovReady=false;
var ovKeyS="";
var ovTitle="";
var ovXI=-1,ovXS=0;
var ovH1=INVALID_HANDLE,ovH2=INVALID_HANDLE,ovHT=INVALID_HANDLE;
var ovHKey="";
const OVM=60;
var omN=0;
var omT=_A(OVM,()=>0);
var omI1=_A(OVM,()=>0),omI2=_A(OVM,()=>0);
var omP1=_A(OVM,()=>0),omP2=_A(OVM,()=>0);
var omLive=_A(OVM,()=>false);
var omC=_A(OVM,()=>0);
var ovSmcOn=false;
function OvRelease(){
  (_t92=Release(ovH1),ovH1=_R[0],_t92);
  (_t93=Release(ovH2),ovH2=_R[0],_t93);
  (_t94=Release(ovHT),ovHT=_R[0],_t94);
  ovHKey="";
}
function OvAddSeries(pane,c,lab,dot=false){
  if(ovSN>=OVS) return;
  ovPane[ovSN]=pane;
  ovCol[ovSN]=((c)>>>0);
  ovLab[ovSN]=lab;
  ovDot[ovSN]=dot;
  for(let i=0;i<ovN;i++) ovV[ovSN*ovN+i]=EMPTY_VALUE;
  ovSN++;
}
function OvFill(s,h,buf,sym,tf){
  if(s<0||s>=ovSN) return true;
  if(h===INVALID_HANDLE) return true;
  if(BarsCalculated(h)<=0) return false;
  let last=iBarShift(sym,tf,gRp[ovN-1].time,false);
  if(last<0) return false;
  let x=[];
  let c=CopyBuffer(h,buf,last,ovN,x);
  if(c<=0) return false;
  let off=ovN-c;
  for(let i=0;i<c;i++) ovV[s*ovN+off+i]=((x[i]===EMPTY_VALUE||(x[i]===0.0&&ovPane[s]===0))?EMPTY_VALUE:x[i]);
  return true;
}
function OvLevel(v){
  if(ovLvN<3) {
    ovLv[ovLvN]=v;
    ovLvN++;
  }
}
function OvIsPriceF(f){
  return f===RF_EMA||f===RF_SMA||f===RF_SMMA||f===RF_LWMA||f===RF_BBUP||f===RF_BBMID||f===RF_BBLOW||f===RF_SAR||f===RF_HIGHEST||f===RF_LOWEST;
}
function OvIsOscF(f){
  return f===RF_RSI||f===RF_CCI||f===RF_WPR||f===RF_MOM||f===RF_MACD||f===RF_MACDSIG||f===RF_STOCHK||f===RF_STOCHD||f===RF_ADX||f===RF_PDI||f===RF_MDI||f===RF_ATR;
}
function OvIsSmcF(f){
  return f===RF_BOS||f===RF_CHOCH||f===RF_STRUCT||f===RF_OB||f===RF_FVG||f===RF_SWEEP;
}
function OvFam(f){
  if(f===RF_MACDSIG) return RF_MACD;
  if(f===RF_STOCHD) return RF_STOCHK;
  if(f===RF_PDI||f===RF_MDI) return RF_ADX;
  return f;
}
function OvBufOf(f){
  if(f===RF_MACDSIG||f===RF_BBUP||f===RF_STOCHD||f===RF_PDI) return 1;
  if(f===RF_BBLOW||f===RF_MDI) return 2;
  return 0;
}
function OvTermName(t){
  let f=rtF[t];
  let n=RFN[f];
  if(f===RF_EMA||f===RF_SMA||f===RF_SMMA||f===RF_LWMA||f===RF_RSI||f===RF_CCI||f===RF_ATR||f===RF_ADX||f===RF_HIGHEST||f===RF_LOWEST||f===RF_WPR||f===RF_MOM) n+=" "+IntegerToString(Math.trunc(RArg(t,0,(f<=RF_LWMA?20:14))));
  return n;
}
function OvBreakout(p){
  let sH=ovSN;
  OvAddSeries(0,CL_UP,IntegerToString(p)+"-candle high");
  let sL=ovSN;
  OvAddSeries(0,CL_DN,IntegerToString(p)+"-candle low");
  for(let i=p;i<ovN;i++) {
    let hh=-DBL_MAX,ll=DBL_MAX;
    for(let j=i-p;j<i;j++) {
      hh=MathMax(hh,gRp[j].high);
      ll=MathMin(ll,gRp[j].low);
    }
    ovV[sH*ovN+i]=hh;
    ovV[sL*ovN+i]=ll;
  }
}
function OmAdd(t,i1,i2,p1,p2,live,born){
  if(omN>=OVM) {
    for(let j=0;j<OVM-1;j++) {
      omT[j]=omT[j+1];
      omI1[j]=omI1[j+1];
      omI2[j]=omI2[j+1];
      omP1[j]=omP1[j+1];
      omP2[j]=omP2[j+1];
      omLive[j]=omLive[j+1];
      omC[j]=omC[j+1];
    }
    omN--;
  }
  omT[omN]=t;
  omI1[omN]=i1;
  omI2[omN]=i2;
  omP1[omN]=p1;
  omP2[omN]=p2;
  omLive[omN]=live;
  omC[omN]=born;
  omN++;
}
function OvSmcScan(k){
  omN=0;
  let n=ovN;
  k=ClampI(k,1,10);
  if(n<4*k+6) return;
  let shP=0,slP=0;
  let shOk=false,slOk=false,shSw=false,slSw=false;
  let shI=-1,slI=-1;
  let tr=0;
  for(let t=2;t<n;t++) {
    let p=t-k;
    if(p>=k) {
      let isH=true,isL=true;
      for(let q=1;q<=k;q++) {
        if(gRp[p].high<=gRp[p-q].high||gRp[p].high<gRp[p+q].high) isH=false;
        if(gRp[p].low>=gRp[p-q].low||gRp[p].low>gRp[p+q].low) isL=false;
      }
      if(isH) {
        shP=gRp[p].high;
        shOk=true;
        shI=p;
        shSw=false;
      }
      if(isL) {
        slP=gRp[p].low;
        slOk=true;
        slI=p;
        slSw=false;
      }
    }
    for(let z=0;z<omN;z++) {
      if(!omLive[z]||omI1[z]>=t-1) continue;
      if(omT[z]===1&&gRp[t].low<omP2[z]) {
        omLive[z]=false;
        omI2[z]=t;
      }
      if(omT[z]===2&&gRp[t].high>omP1[z]) {
        omLive[z]=false;
        omI2[z]=t;
      }
      if(omT[z]===3&&gRp[t].close<omP2[z]) {
        omLive[z]=false;
        omI2[z]=t;
      }
      if(omT[z]===4&&gRp[t].close>omP1[z]) {
        omLive[z]=false;
        omI2[z]=t;
      }
    }
    if(gRp[t].low>gRp[t-2].high) OmAdd(1,t-1,n-1,gRp[t].low,gRp[t-2].high,true,t);
    if(gRp[t].high<gRp[t-2].low) OmAdd(2,t-1,n-1,gRp[t-2].low,gRp[t].high,true,t);
    if(shOk&&!shSw&&gRp[t].high>shP&&gRp[t].close<shP) {
      OmAdd(9,t,t,gRp[t].high,shP,false,t);
      shSw=true;
    }
    if(slOk&&!slSw&&gRp[t].low<slP&&gRp[t].close>slP) {
      OmAdd(10,t,t,gRp[t].low,slP,false,t);
      slSw=true;
    }
    if(shOk&&gRp[t].close>shP) {
      OmAdd((tr<0?7:5),shI,t,shP,shP,false,t);
      tr=1;
      shOk=false;
      for(let j=t-1;j>=IMax(0,slI);j--) if(gRp[j].close<gRp[j].open) {
        OmAdd(3,j,n-1,gRp[j].high,gRp[j].low,true,t);
        break;
      }
    }
    else if(slOk&&gRp[t].close<slP) {
      OmAdd((tr>0?8:6),slI,t,slP,slP,false,t);
      tr=-1;
      slOk=false;
      for(let j=t-1;j>=IMax(0,shI);j--) if(gRp[j].close>gRp[j].open) {
        OmAdd(4,j,n-1,gRp[j].high,gRp[j].low,true,t);
        break;
      }
    }
  }
}
function OvBuild(k,tfi){
  let n=ArraySize(gRp);
  if(k<0||k>=gTN||n<5) {
    ovSN=0;
    omN=0;
    ovXI=-1;
    ovLvN=0;
    ovSmcOn=false;
    ovTitle="";
    ovReady=false;
    return;
  }
  let id=gT[k].id;
  let si=gT[k].si;
  if(si<0||si>=gNS) {
    ovSN=0;
    omN=0;
    ovXI=-1;
    ovLvN=0;
    ovSmcOn=false;
    ovTitle="";
    ovReady=false;
    return;
  }
  let s=_cp(gSet[si]);
  let sig=IntegerToString(s.entry)+"|"+IntegerToString(s.p1)+"|"+IntegerToString(s.p2)+"|"+IntegerToString(s.p3)+"|"+DoubleToString(s.lv1,3)+"|"+DoubleToString(s.lv2,3)+"|"+IntegerToString(s.ma)+"|"+((s.trend?IntegerToString(s.trendP):"-"))+"|"+gRuleB[si]+"|"+gRuleS[si]+"|"+IntegerToString(gOvSmc)+((gOvInd?"1":"0"));
  let sameKey=(ovKey1===id&&ovKey2===tfi&&ovKeyT===gRpT&&ovKeyN===n&&ovKeyS===sig);
  if(sameKey&&(ovReady||Now()-ovTryT<500)) return;
  ovTryT=((Now())>>>0);
  let sym=gSym[si];
  let tf=TFV[ClampI(tfi,0,NTF-1)];
  ovN=n;
  ovSN=0;
  ovLvN=0;
  ovXI=-1;
  omN=0;
  ovSmcOn=false;
  ArrayResize(ovV,OVS*n,()=>0);
  let ok=true;
  ovTitle=ENAME[ClampI(s.entry,0,NENTRY-1)];
  if(s.entry!==E_RULE) {
    let hk=sym+"|"+IntegerToString(tfi)+"|"+IntegerToString(s.entry)+"|"+IntegerToString(s.p1)+"|"+IntegerToString(s.p2)+"|"+IntegerToString(s.p3)+"|"+DoubleToString(s.lv1,3)+"|"+DoubleToString(s.lv2,3)+"|"+IntegerToString(s.ma)+"|"+((s.trend?IntegerToString(s.trendP):"-"));
    if(hk!==ovHKey) {
      OvRelease();
      ovHKey=hk;
      switch(s.entry) {
        case E_MA:
          ovH1=iMA(sym,tf,IMax(1,s.p1),0,s.ma,PRICE_CLOSE);
          ovH2=iMA(sym,tf,IMax(1,s.p2),0,s.ma,PRICE_CLOSE);
          break;
        case E_WSM:
          ovH1=iMA(sym,tf,IMax(1,s.p1),0,ClampI(s.ma,0,3),PRICE_CLOSE);
          ovH2=iMA(sym,tf,IMax(1,s.p2),0,ClampI(Math.trunc(MathRound(s.lv2)),0,3),PRICE_CLOSE);
          break;
        case E_RSI:
          ovH1=iRSI(sym,tf,IMax(2,s.p1),PRICE_CLOSE);
          break;
        case E_MACD:
          ovH1=iMACD(sym,tf,IMax(1,s.p1),IMax(2,s.p2),IMax(1,s.p3),PRICE_CLOSE);
          break;
        case E_BBB:
        case E_BBX:
          ovH1=iBands(sym,tf,IMax(2,s.p1),0,MathMax(0.1,s.lv1),PRICE_CLOSE);
          break;
        case E_STO:
          ovH1=iStochastic(sym,tf,IMax(1,s.p1),IMax(1,s.p2),IMax(1,s.p3),MODE_SMA,STO_LOWHIGH);
          break;
        case E_CCI:
          ovH1=iCCI(sym,tf,IMax(2,s.p1),PRICE_TYPICAL);
          break;
        case E_SAR:
          ovH1=iSAR(sym,tf,MathMax(0.001,s.lv1),MathMax(0.01,s.lv2));
          break;
        case E_ADX:
          ovH1=iADX(sym,tf,IMax(2,s.p1));
          break;
      }
      if(s.trend) ovHT=iMA(sym,tf,IMax(2,s.trendP),0,MODE_EMA,PRICE_CLOSE);
    }
    switch(s.entry) {
      case E_MA:
        OvAddSeries(0,CL_CY,MAN[ClampI(s.ma,0,3)]+" "+IntegerToString(s.p1));
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        OvAddSeries(0,CL_MG,MAN[ClampI(s.ma,0,3)]+" "+IntegerToString(s.p2));
        ok=OvFill(1,ovH2,0,sym,tf)&&ok;
        break;
      case E_WSM:
        OvAddSeries(0,CL_CY,MAN[ClampI(s.ma,0,3)]+" "+IntegerToString(s.p1));
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        OvAddSeries(0,CL_MG,MAN[ClampI(Math.trunc(MathRound(s.lv2)),0,3)]+" "+IntegerToString(s.p2));
        ok=OvFill(1,ovH2,0,sym,tf)&&ok;
        break;
      case E_RSI:
        OvAddSeries(1,CL_VI,"RSI "+IntegerToString(s.p1));
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        OvLevel(s.lv1);
        OvLevel(s.lv2);
        break;
      case E_MACD:
        OvAddSeries(1,CL_CY,"MACD");
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        OvAddSeries(1,CL_AU,"signal");
        ok=OvFill(1,ovH1,1,sym,tf)&&ok;
        OvLevel(0);
        break;
      case E_BBB:
      case E_BBX:
        OvAddSeries(0,CL_VI,"BB upper");
        ok=OvFill(0,ovH1,1,sym,tf)&&ok;
        OvAddSeries(0,CL_MU,"BB mid");
        ok=OvFill(1,ovH1,0,sym,tf)&&ok;
        OvAddSeries(0,CL_VI,"BB lower");
        ok=OvFill(2,ovH1,2,sym,tf)&&ok;
        break;
      case E_STO:
        OvAddSeries(1,CL_CY,"%K");
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        OvAddSeries(1,CL_AU,"%D");
        ok=OvFill(1,ovH1,1,sym,tf)&&ok;
        OvLevel(s.lv1);
        OvLevel(s.lv2);
        break;
      case E_CCI:
        OvAddSeries(1,CL_VI,"CCI "+IntegerToString(s.p1));
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        OvLevel(-s.lv1);
        OvLevel(0);
        OvLevel(s.lv1);
        break;
      case E_SAR:
        OvAddSeries(0,CL_AU,"SAR",true);
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        break;
      case E_ADX:
        OvAddSeries(1,CL_AU,"ADX");
        ok=OvFill(0,ovH1,0,sym,tf)&&ok;
        OvAddSeries(1,CL_UP,"+DI");
        ok=OvFill(1,ovH1,1,sym,tf)&&ok;
        OvAddSeries(1,CL_DN,"-DI");
        ok=OvFill(2,ovH1,2,sym,tf)&&ok;
        OvLevel(s.lv1);
        break;
      case E_BRK:
        OvBreakout(IMax(2,s.p1));
        break;
    }
    if(s.trend) {
      let st=ovSN;
      OvAddSeries(0,CL_AU,"trend EMA "+IntegerToString(s.trendP));
      ok=OvFill(st,ovHT,0,sym,tf)&&ok;
    }
  }
  else {
    let smK=3;
    let smc=false;
    let oscF=-1;
    for(let sd=0;sd<2;sd++) {
      let cn=ruleCnt[si][sd],f0=ruleFirst[si][sd];
      for(let c=f0;c<f0+cn;c++) {
        let tt=_A(2,()=>0);
        tt[0]=rcL[c];
        tt[1]=rcR[c];
        for(let q=0;q<2;q++) {
          let t=tt[q];
          if(t<0) continue;
          let f=rtF[t];
          if(OvIsSmcF(f)) {
            smc=true;
            if(rtNA[t]>0) smK=Math.trunc(RArg(t,0,3));
            continue;
          }
          if(rtTF[t]>=0&&rtTF[t]!==tfi) continue;
          let dup=false;
          for(let z=0;z<ovSN;z++) if(ovLab[z]===OvTermName(t)) dup=true;
          if(dup) continue;
          if(OvIsPriceF(f)&&f!==RF_HIGHEST&&f!==RF_LOWEST) {
            let pal=_A(4,()=>0);
            pal[0]=((CL_CY)>>>0);
            pal[1]=((CL_MG)>>>0);
            pal[2]=((CL_AU)>>>0);
            pal[3]=((CL_VI)>>>0);
            let st=ovSN;
            OvAddSeries(0,pal[(st%4)],OvTermName(t),f===RF_SAR);
            ok=OvFill(st,RIndHandle(t,sym,tf),OvBufOf(f),sym,tf)&&ok;
          }
          else if(OvIsOscF(f)&&(oscF<0||OvFam(f)===OvFam(oscF))) {
            if(oscF<0) oscF=f;
            let st=ovSN;
            OvAddSeries(1,((st%2)===0?CL_VI:CL_AU),OvTermName(t));
            ok=OvFill(st,RIndHandle(t,sym,tf),OvBufOf(f),sym,tf)&&ok;
            let o=tt[1-q];
            if(o>=0&&rtF[o]===0) OvLevel(rtV[o]);
          }
        }
      }
    }
    if(smc) {
      ovSmcOn=true;
      OvSmcScan(smK);
    }
    ovTitle="AI rule"+((smc?" + SMC":""));
  }
  if(gOvSmc===1&&!ovSmcOn) {
    ovSmcOn=true;
    OvSmcScan(3);
  }
  if(gOvSmc===2) {
    ovSmcOn=false;
    omN=0;
  }
  let ei=-1;
  for(let i=0;i<n;i++) if(gRp[i].time<=gT[k].t0) ei=i;
  let sa=0,sb=1;
  if(s.entry===E_ADX) {
    sa=1;
    sb=2;
  }
  ovXS=sa;
  if(ei>=1&&ovSN>sb&&ovPane[sa]===ovPane[sb]&&!ovDot[sa]&&s.entry!==E_BBB&&s.entry!==E_BBX&&s.entry!==E_BRK) for(let i=ei;i>=IMax(1,ei-8);i--) {
    let a1=ovV[sa*ovN+i],a0=ovV[sa*ovN+i-1],b1=ovV[sb*ovN+i],b0=ovV[sb*ovN+i-1];
    if(a1===EMPTY_VALUE||a0===EMPTY_VALUE||b1===EMPTY_VALUE||b0===EMPTY_VALUE) continue;
    if((a1-b1)*(a0-b0)<=0) {
      ovXI=i;
      break;
    }
  }
  ovKey1=id;
  ovKey2=tfi;
  ovKeyT=((gRpT)>>>0);
  ovKeyN=n;
  ovKeyS=sig;
  ovReady=ok;
}
function OvHasPane(){
  if(!gOvInd) return false;
  for(let s=0;s<ovSN;s++) if(ovPane[s]===1) return true;
  return false;
}
function OvDrawZones(x,y,h,lo,hi,cw,vis,pw){
  if(!ovSmcOn||omN===0) return;
  let cF=0,cO=0;
  for(let z=omN-1;z>=0;z--) {
    let t=omT[z];
    if(t>4) continue;
    if(omC[z]>=vis) continue;
    let alive=(omLive[z]||omI2[z]>=vis);
    let fvg=(t<=2);
    if(fvg) {
      if(cF>=6||(!alive&&cF>=3)) continue;
      cF++;
    }
    else {
      if(cO>=4) continue;
      cO++;
    }
    let x1=x+Math.trunc((omI1[z]*cw)),x2=x+Math.trunc(((IMin(omI2[z],vis-1)+1)*cw));
    if(alive) x2=((vis>=ovN)?x+pw:x+Math.trunc((vis*cw)));
    let y1=PYp(omP1[z],y,h,lo,hi),y2=PYp(omP2[z],y,h,lo,hi);
    if(MathAbs(y2-y1)<2) y2=y1+2;
    let up=(t===1||t===3);
    let c=(((fvg?((up?CL_CY:CL_MG)):((up?CL_UP:CL_DN))))>>>0);
    cv.RectA(x1,IMin(y1,y2),x2,IMax(y1,y2),c,(alive?((fvg?38:46)):18));
    cv.RectA(x1,IMin(y1,y2),x2,IMin(y1,y2),c,(alive?150:60));
    cv.RectA(x1,IMax(y1,y2),x2,IMax(y1,y2),c,(alive?150:60));
    if(x2-x1>34&&MathAbs(y2-y1)>=9) Txt(x1+4,Math.trunc((y1+y2)/2),(fvg?"FVG":"OB"),c,7,true,TA_LEFT|TA_VCENTER);
  }
}
function OvDrawOver(x,y,h,lo,hi,cw,vis,pw,py,ph){
  if(gOvInd) for(let s=0;s<ovSN;s++) {
    if(ovPane[s]!==0) continue;
    let px=-1,pyv=0;
    for(let i=0;i<vis&&i<ovN;i++) {
      let v=ovV[s*ovN+i];
      if(v===EMPTY_VALUE||v<=lo-(hi-lo)||v>=hi+(hi-lo)) {
        px=-1;
        continue;
      }
      let cx=x+Math.trunc(((i+0.5)*cw)),cy=ClampI(PYp(v,y,h,lo,hi),y,y+h);
      if(ovDot[s]) {
        cv.FillCircle(cx,cy,IMax(1,Math.trunc(MathMin(3,cw*0.25))),ovCol[s]);
        continue;
      }
      if(px>=0) cv.LineT(px,pyv,cx,cy,1.6,ovCol[s],220);
      px=cx;
      pyv=cy;
    }
  }
  if(ovSmcOn) {
    let cB=0,cS=0;
    for(let z=omN-1;z>=0;z--) {
      let t=omT[z];
      if(t<5||omC[z]>=vis) continue;
      if(t<=8) {
        if(cB>=6) continue;
        cB++;
        let up=(t===5||t===7);
        let c=(((up?CL_UP:CL_DN))>>>0);
        let x1=x+Math.trunc(((omI1[z]+0.5)*cw)),x2=x+Math.trunc(((omI2[z]+0.5)*cw)),yy=PYp(omP1[z],y,h,lo,hi);
        if(yy<y||yy>y+h) continue;
        for(let xx=x1;xx<x2;xx+=7) cv.LineT(xx,yy,IMin(xx+4,x2),yy,1.2,c,210);
        let lb=((t<=6)?"BOS":"CHoCH");
        Txt(Math.trunc((x1+x2)/2),yy+((up?-7:7)),lb,c,7,true,TA_CENTER|TA_VCENTER);
      }
      else {
        if(cS>=5) continue;
        cS++;
        let hiS=(t===9);
        let cx=x+Math.trunc(((omI1[z]+0.5)*cw)),yy=PYp(omP1[z],y,h,lo,hi);
        if(yy<y||yy>y+h) continue;
        let d=(hiS?-1:1);
        cv.FillTriangle(cx,yy+d*3,cx-5,yy+d*12,cx+5,yy+d*12,CL_AU);
        Txt(cx,yy+d*20,"$ sweep",CL_AU,7,true,TA_CENTER|TA_VCENTER);
      }
    }
  }
  if(gOvInd&&ovXI>=0&&ovXI<vis) {
    let cx=x+Math.trunc(((ovXI+0.5)*cw));
    let v=ovV[ovXS*ovN+ovXI];
    if(ovPane[ovXS]===0&&v!==EMPTY_VALUE) {
      let cy=PYp(v,y,h,lo,hi);
      cv.Glow(cx,cy,14,CL_AU,120);
      cv.ArcA(cx,cy,7,0,2*M_PI,1.6,CL_AU,255);
      Txt(cx,cy-16,"cross",CL_AU,7,true,TA_CENTER|TA_VCENTER);
    }
    else cv.RectA(cx,y,cx,y+h,CL_AU,70);
  }
  if(OvHasPane()&&ph>20) {
    cv.RoundFill(x,py,x+pw,py+ph,6,CL_DARK,140);
    let mn=DBL_MAX,mx=-DBL_MAX;
    for(let s=0;s<ovSN;s++) if(ovPane[s]===1) for(let i=0;i<vis&&i<ovN;i++) {
      let v=ovV[s*ovN+i];
      if(v===EMPTY_VALUE) continue;
      mn=MathMin(mn,v);
      mx=MathMax(mx,v);
    }
    for(let l=0;l<ovLvN;l++) {
      mn=MathMin(mn,ovLv[l]);
      mx=MathMax(mx,ovLv[l]);
    }
    if(mx>mn) {
      let pd=(mx-mn)*0.08;
      mn-=pd;
      mx+=pd;
      for(let l=0;l<ovLvN;l++) {
        let ly=PYp(ovLv[l],py,ph,mn,mx);
        for(let xx=x;xx<x+pw;xx+=8) cv.RectA(xx,ly,IMin(xx+4,x+pw),ly,CL_MU,170);
        Txt(x+pw+6,ly,DoubleToString(ovLv[l],(MathAbs(ovLv[l])<10?1:0)),CL_MU,7,false,TA_LEFT|TA_VCENTER);
      }
      for(let s=0;s<ovSN;s++) {
        if(ovPane[s]!==1) continue;
        let px=-1,pyv=0;
        for(let i=0;i<vis&&i<ovN;i++) {
          let v=ovV[s*ovN+i];
          if(v===EMPTY_VALUE) {
            px=-1;
            continue;
          }
          let cx=x+Math.trunc(((i+0.5)*cw)),cy=PYp(v,py,ph,mn,mx);
          if(px>=0) cv.LineT(px,pyv,cx,cy,1.4,ovCol[s],230);
          px=cx;
          pyv=cy;
        }
      }
      if(ovXI>=0&&ovXI<vis) {
        let cx=x+Math.trunc(((ovXI+0.5)*cw));
        let v=ovV[ovXS*ovN+ovXI];
        if(ovPane[ovXS]===1&&v!==EMPTY_VALUE) {
          let cy=PYp(v,py,ph,mn,mx);
          cv.Glow(cx,cy,12,CL_AU,120);
          cv.ArcA(cx,cy,6,0,2*M_PI,1.6,CL_AU,255);
        }
      }
    }
  }
  let lx=x+8,ly=y+10;
  Txt(lx,ly,"ENTRY: "+ovTitle,CL_VI,7,true,TA_LEFT|TA_VCENTER);
  lx+=TW("ENTRY: "+ovTitle,7,true)+12;
  if(gOvInd) for(let s=0;s<ovSN;s++) {
    if(lx>x+pw-80) break;
    cv.RoundFill(lx,ly-2,lx+10,ly+2,2,ovCol[s],255);
    Txt(lx+14,ly,ovLab[s],CL_TX,7,false,TA_LEFT|TA_VCENTER);
    lx+=TW(ovLab[s],7,false)+26;
  }
  if(ovSmcOn&&lx<x+pw-150) Txt(lx,ly,"SMC: FVG  OB  BOS/CHoCH  sweep",CL_MU,7,false,TA_LEFT|TA_VCENTER);
  if(!ovReady&&gOvInd&&ovSN>0) Txt(x+8,ly+14,"indicators loading...",CL_MU,7,false,TA_LEFT|TA_VCENTER);
}
function DrawTradeChart(x,y,w,hIn,k,prog,liveView){
  if(liveView) gChK=-1;
  if(k<0||k>=gTN) {
    Txt(x+Math.trunc(w/2),y+Math.trunc(hIn/2),"Pick a trade",CL_MU,11,false,TA_CENTER|TA_VCENTER);
    return;
  }
  let t=_cp(gT[k]);
  let si=t.si;
  if(si<0||si>=gNS) return;
  let tfi=(liveView?((gLiveTf>=0?gLiveTf:t.tf)):((gHistTf>=0?gHistTf:t.tf)));
  LoadBars(k,tfi,liveView);
  let n=((gRpId===t.id&&gRpTf===tfi)?ArraySize(gRp):0);
  if(n<2) {
    Txt(x+Math.trunc(w/2),y+Math.trunc(hIn/2),"loading candles...",CL_MU,11,false,TA_CENTER|TA_VCENTER);
    return;
  }
  OvBuild(k,tfi);
  let ph=((OvHasPane()&&hIn>200)?Math.trunc((hIn*0.24)):0);
  let h=hIn-((ph>0?ph+8:0));
  let dg=Dg(si);
  let ei=-1,xi=n-1;
  for(let i=0;i<n;i++) if(gRp[i].time<=t.t0) ei=i;
  if(!t.open) {
    xi=-1;
    for(let i=0;i<n;i++) if(gRp[i].time<=t.t1) xi=i;
  }
  let vis=n;
  if(!liveView&&!t.open&&prog<1.0) vis=IMax(IMax(ei,0)+1,Math.trunc((IMax(ei,0)+1+(n-IMax(ei,0)-1)*prog)));
  vis=ClampI(vis,1,n);
  let dragging=(liveView&&gDrag>0&&gDragK===k);
  let hi=t.entry,lo=t.entry;
  for(let i=0;i<vis;i++) {
    hi=MathMax(hi,gRp[i].high);
    lo=MathMin(lo,gRp[i].low);
  }
  let spn=MathMax(hi-lo,Pt(si)*20),ext=spn*0.4;
  let c0=lo,c1=hi;
  if(t.tp>0) {
    hi=MathMax(hi,MathMin(t.tp,c1+ext));
    lo=MathMin(lo,MathMax(t.tp,c0-ext));
  }
  if(t.sl0>0) {
    hi=MathMax(hi,MathMin(t.sl0,c1+ext));
    lo=MathMin(lo,MathMax(t.sl0,c0-ext));
  }
  if(t.sl>0) {
    hi=MathMax(hi,MathMin(t.sl,c1+ext));
    lo=MathMin(lo,MathMax(t.sl,c0-ext));
  }
  if(dragging) {
    hi=MathMax(hi,gChHi);
    lo=MathMin(lo,gChLo);
  }
  let pad=(hi-lo)*0.06;
  if(pad<=0) pad=Pt(si)*10;
  if(!dragging) {
    hi+=pad;
    lo-=pad;
  }
  let axisW=84,pw=w-axisW;
  let cw=(+pw)/n;
  if(liveView) {
    gChX=x;
    gChY=y;
    gChW=w;
    gChH=h;
    gChLo=lo;
    gChHi=hi;
    gChK=k;
  }
  for(let g=1;g<5;g++) {
    let gy=y+Math.trunc(h*g/5);
    cv.RectA(x,gy,x+pw,gy,CL_LN,90);
    Txt(x+pw+6,gy,DoubleToString(hi-(hi-lo)*g/5,dg),CL_MU,7,false,TA_LEFT|TA_VCENTER);
  }
  let zx1=x+((ei>=0?Math.trunc((ei*cw)):0));
  let zx2=x+Math.trunc(((((!t.open&&xi>=0&&vis>xi)?xi+1:vis))*cw));
  if(zx2<=zx1) zx2=zx1+2;
  let yTP=ClampI(PYp(t.tp,y,h,lo,hi),y+3,y+h-3),yEN=ClampI(PYp(t.entry,y,h,lo,hi),y+3,y+h-3),ySL0=ClampI(PYp(t.sl0,y,h,lo,hi),y+3,y+h-3),ySL=ClampI(PYp(t.sl,y,h,lo,hi),y+3,y+h-3);
  let hTP=(t.tp>0),hS0=(t.sl0>0),hSL=(t.sl>0);
  if(hTP) cv.RectA(zx1,IMin(yTP,yEN),zx2,IMax(yTP,yEN),CL_UP,40);
  if(hS0) cv.RectA(zx1,IMin(ySL0,yEN),zx2,IMax(ySL0,yEN),CL_DN,40);
  OvDrawZones(x,y,h,lo,hi,cw,vis,pw);
  let bw=Math.trunc(MathMax(1,cw*0.62));
  for(let i=0;i<vis;i++) {
    let cx=x+Math.trunc(((i+0.5)*cw));
    let c=(((gRp[i].close>=gRp[i].open?CL_UP:CL_DN))>>>0);
    cv.Line(cx,PYp(gRp[i].high,y,h,lo,hi),cx,PYp(gRp[i].low,y,h,lo,hi),c);
    let a=PYp(gRp[i].open,y,h,lo,hi),b=PYp(gRp[i].close,y,h,lo,hi);
    cv.FillRectangle(cx-Math.trunc(bw/2),IMin(a,b),cx-Math.trunc(bw/2)+bw,IMax(IMax(a,b),IMin(a,b)+1),c);
  }
  OvDrawOver(x,y,h,lo,hi,cw,vis,pw,y+h+8,ph);
  let hovSL=false,hovTP=false;
  if(liveView&&t.open&&gDrag===0&&gMX>=x&&gMX<=x+w) {
    if(hSL&&MathAbs(gMY-ySL)<=6) hovSL=true;
    else if(hTP&&MathAbs(gMY-yTP)<=6) hovTP=true;
  }
  DashH(zx1,x+pw,yEN,CL_CY);
  if(liveView&&t.open) {
    if(hTP) cv.LineT(x,yTP,x+pw,yTP,(hovTP||(dragging&&gDrag===2)?2.6:1.4),CL_UP,(dragging&&gDrag===2?90:230));
    if(hSL) cv.LineT(x,ySL,x+pw,ySL,(hovSL||(dragging&&gDrag===1)?2.6:1.4),CL_DN,(dragging&&gDrag===1?90:230));
  }
  else {
    if(hTP) DashH(zx1,x+pw,yTP,CL_UP);
    if(hS0) DashH(zx1,x+pw,ySL0,CL_DN);
    if(t.sl>0&&MathAbs(t.sl-t.sl0)>Pt(si)) DashH(zx1,x+pw,ySL,CL_AU);
  }
  if(ei>=0) {
    let ex=x+Math.trunc(((ei+0.5)*cw));
    if(t.dir>0) cv.FillTriangle(ex,yEN+4,ex-6,yEN+14,ex+6,yEN+14,CL_CY);
    else cv.FillTriangle(ex,yEN-4,ex-6,yEN-14,ex+6,yEN-14,CL_CY);
  }
  if(!t.open&&xi>=0&&vis>xi) {
    let xx=x+Math.trunc(((xi+0.5)*cw)),yy=PYp(t.exitP,y,h,lo,hi);
    cv.Glow(xx,yy,16,(t.win?CL_UP:CL_DN),140);
    cv.FillCircle(xx,yy,6,(t.win?CL_UP:CL_DN));
  }
  if(t.open) {
    let px=(t.dir>0?PBid(si):PAsk(si));
    if(px>0) {
      let yy=PYp(px,y,h,lo,hi);
      cv.Line(x,yy,x+pw,yy,CL_TX);
      Txt(x+pw+6,yy,DoubleToString(px,dg),CL_TX,8,true,TA_LEFT|TA_VCENTER);
    }
  }
  let hint=((liveView&&t.open)?"  drag":"");
  if(hTP) {
    cv.RoundFill(x+pw+2,yTP-8,x+w,yTP+8,4,CL_UP,(hovTP?120:60));
    Txt(x+pw+6,yTP,"TP "+DoubleToString(t.tp,dg)+((t.tp>hi?" ^":((t.tp<lo?" v":""))))+hint,CL_TX,8,true,TA_LEFT|TA_VCENTER);
  }
  let ys=((liveView&&t.open)?ySL:ySL0);
  if(((liveView&&t.open)?hSL:hS0)) {
    cv.RoundFill(x+pw+2,ys-8,x+w,ys+8,4,CL_DN,(hovSL?120:60));
    let slv=((liveView&&t.open)?t.sl:t.sl0);
    Txt(x+pw+6,ys,"SL "+DoubleToString(slv,dg)+((slv>hi?" ^":((slv<lo?" v":""))))+hint,CL_TX,8,true,TA_LEFT|TA_VCENTER);
  }
  Txt(x+pw+6,yEN,"IN "+DoubleToString(t.entry,dg),CL_CY,8,true,TA_LEFT|TA_VCENTER);
  if(!liveView&&t.sl>0&&MathAbs(t.sl-t.sl0)>Pt(si)) Txt(x+pw+6,ySL,"SL moved",CL_AU,8,true,TA_LEFT|TA_VCENTER);
  if(dragging) {
    let yd=PYp(gDragPx,y,h,lo,hi);
    let dc=(((gDrag===1?CL_DN:CL_UP))>>>0);
    cv.LineT(x,yd,x+pw,yd,2.4,dc,255);
    let usd=(gDragPx-t.entry)*t.dir*ValPerPrice(si,t.lot);
    let lab=((gDrag===1?"NEW SL ":"NEW TP "))+DoubleToString(gDragPx,dg)+"   ("+((usd>=0?"+":""))+Money(usd)+")";
    let lw2=TW(lab,9,true)+20;
    cv.RoundFill(x+pw-lw2-6,yd-22,x+pw-6,yd-4,6,dc,220);
    Txt(x+pw-6-Math.trunc(lw2/2),yd-13,lab,CL_TX,9,true,TA_CENTER|TA_VCENTER);
  }
}
function TradeTitle(k){
  if(k<0||k>=gTN) return "TRADE REPLAY";
  let si=gT[k].si;
  let sn=((si>=0&&si<gNS)?gShort[si]:"?");
  let tf=TFN[ClampI(gT[k].tf,0,NTF-1)];
  return sn+"  "+tf+"  "+((gT[k].dir>0?"BUY":"SELL"))+"  lot "+DoubleToString(gT[k].lot,3)+((gT[k].live?"  LIVE #"+IntegerToString(gT[k].ticket):"  SIM"));
}
function FirstOpen(){
  for(let k=0;k<gTN;k++) if(gT[k].open&&gT[k].live===(gMode===1)) return k;
  return -1;
}
function StepFocus(d){
  let list=[];
  let n=ModeTrades(list,true);
  if(n===0) {
    gFocus=-1;
    return;
  }
  let pos=0;
  for(let i=0;i<n;i++) if(list[i]===gFocus) pos=i;
  pos=((pos+d+n)%n);
  gFocus=list[pos];
}
function DrawLive(){
  let lx=RX[1],top=RY[1],lw=RW[1],H=RH[1];
  Panel(lx,top,lw,H,"OPEN TRADES ("+((gMode===1?"LIVE":"SIMULATOR"))+")",CL_UP);
  if(gFocus<0||gFocus>=gTN||!gT[gFocus].open||gT[gFocus].live!==(gMode===1)) gFocus=FirstOpen();
  let list=[];
  let n=ModeTrades(list,true);
  let ih=50,nvis=IMax(1,Math.trunc((H-30-50)/ih));
  gListOff=ClampI(gListOff,0,IMax(0,n-nvis));
  for(let q=gListOff;q<n&&q<gListOff+nvis;q++) {
    let k=list[q],si=gT[k].si;
    let yy=top+30+(q-gListOff)*ih;
    let f=(k===gFocus);
    cv.RoundFill(lx+8,yy,lx+lw-10,yy+ih-6,8,(f?gCol[si]:CL_DARK),(f?55:150));
    cv.RoundBorder(lx+8,yy,lx+lw-10,yy+ih-6,8,gCol[si],(f?255:150),1.1);
    Txt(lx+18,yy+6,gShort[si]+"  "+((gT[k].dir>0?"BUY":"SELL")),gCol[si],9,true);
    Txt(lx+lw-20,yy+6,TFN[ClampI(gT[k].tf,0,NTF-1)],CL_MU,8,true,TA_RIGHT);
    Txt(lx+18,yy+23,Money(gT[k].pl),(gT[k].pl>=0?CL_UP:CL_DN),11,true);
    Txt(lx+lw-20,yy+25,(gT[k].trailOn?"TRAILING":((gT[k].beDone?"BREAK-EVEN":"risk on"))),(gT[k].safe?CL_AU:CL_MU),8,true,TA_RIGHT);
    AddBtn(lx+8,yy,lx+lw-10,yy+ih-6,"tb:"+IntegerToString(k));
  }
  ScrollBar(lx+lw-6,top+30,nvis*ih,n,nvis,gListOff,CL_UP);
  if(n===0) Txt(lx+14,top+40,"No open trades right now.",CL_MU,10);
  let bwid=Math.trunc((lw-32)/3);
  Btn(lx+8,top+H-38,bwid,28,"< PREV",CL_CY,false,"live:prev");
  Btn(lx+16+bwid,top+H-38,bwid,28,(gAuto?"AUTO ON":"AUTO OFF"),CL_AU,gAuto,"live:auto");
  Btn(lx+24+2*bwid,top+H-38,bwid,28,"NEXT >",CL_CY,false,"live:next");
  let rx=RX[2],rw=RW[2];
  Panel(rx,top,rw,H,TradeTitle(gFocus),(gFocus>=0?gCol[ClampI(gT[gFocus].si,0,NSYM-1)]:CL_CY));
  if(gFocus<0) {
    gChK=-1;
    Txt(rx+Math.trunc(rw/2),top+Math.trunc(H/2),"When a trade opens it plays here live.",CL_MU,12,false,TA_CENTER|TA_VCENTER);
    return;
  }
  let t=_cp(gT[gFocus]);
  let si=ClampI(t.si,0,NSYM-1),dg=Dg(si);
  let sy=top+30;
  let info=_A(6,()=>"");
  let ic=_A(6,()=>0);
  info[0]="P/L "+Money(t.pl);
  ic[0]=(((t.pl>=0?CL_UP:CL_DN))>>>0);
  info[1]="Entry "+DoubleToString(t.entry,dg);
  ic[1]=((CL_CY)>>>0);
  info[2]="TP "+DoubleToString(t.tp,dg);
  ic[2]=((CL_UP)>>>0);
  info[3]="SL "+DoubleToString(t.sl,dg)+((MathAbs(t.sl-t.sl0)>Pt(si)?" (moved)":""));
  ic[3]=(((MathAbs(t.sl-t.sl0)>Pt(si)?CL_AU:CL_DN))>>>0);
  info[4]="Open "+TimeToString(t.t0,TIME_MINUTES|TIME_SECONDS);
  ic[4]=((CL_MU)>>>0);
  info[5]=ENAME[ClampI(gSet[si].entry,0,NENTRY-1)];
  ic[5]=((CL_VI)>>>0);
  let ix=rx+16;
  for(let i=0;i<6;i++) {
    if(ix+TW(info[i],10,true)>rx+rw-10) break;
    Txt(ix,sy,info[i],ic[i],10,true);
    ix+=TW(info[i],10,true)+22;
  }
  let ty=sy+24,bx=rx+16;
  Txt(bx,ty+12,"TF",CL_MU,8,true,TA_LEFT|TA_VCENTER);
  bx+=24;
  Btn(bx,ty,62,24,"TRADE",CL_VI,gLiveTf<0,"ltf:-1",8);
  bx+=66;
  for(let i=0;i<NTF;i++) {
    Btn(bx,ty,42,24,TFN[i],CL_CY,gLiveTf===i,"ltf:"+IntegerToString(i),8);
    bx+=46;
  }
  bx+=10;
  Btn(bx,ty,28,24,"-",CL_CY,false,"zoom:1",10);
  bx+=32;
  Txt(bx+30,ty+12,IntegerToString(gZoom)+" bars",CL_MU,8,true,TA_CENTER|TA_VCENTER);
  bx+=60;
  Btn(bx,ty,28,24,"+",CL_CY,false,"zoom:-1",10);
  bx+=38;
  if(bx+136<rx+rw-16-246-10) {
    Btn(bx,ty,50,24,"IND",CL_VI,gOvInd,"ovind",8);
    bx+=56;
    Btn(bx,ty,80,24,(gOvSmc===0?"SMC AUTO":((gOvSmc===1?"SMC ON":"SMC OFF"))),CL_AU,gOvSmc===1,"ovsmc",8);
  }
  let cx2=rx+rw-16;
  let armed=(gCloseArm===t.id&&Now()-gCloseT<4000);
  let cwid=(armed?150:120);
  cx2-=cwid;
  Btn(cx2,ty,cwid,24,(armed?"CLICK AGAIN: CLOSE":"CLOSE TRADE"),CL_DN,armed,"closetr",8);
  cx2-=96;
  Btn(cx2,ty,90,24,"SL TO BE",CL_AU,false,"tobe",8);
  let pc=TradeProgress(t);
  let pby=ty+32,pbw=rw-32;
  cv.RoundFill(rx+16,pby,rx+16+pbw,pby+5,3,CL_LN,220);
  cv.RoundFill(rx+16,pby,rx+16+Math.trunc((pbw*pc)),pby+5,3,(pc>0.5?CL_UP:((pc>0.25?CL_AU:CL_DN))),255);
  let chy=pby+16,chh=top+H-chy-30;
  DrawTradeChart(rx+16,chy,rw-32,chh,gFocus,1.0,true);
  Txt(rx+16,top+H-15,"Drag the red SL line or the green TP line to change it.  Mouse wheel over the chart = zoom.",CL_MU,8,false,TA_LEFT|TA_VCENTER);
}
function DrawHistory(){
  let lx=RX[1],top=RY[1],lw=RW[1],H=RH[1];
  Panel(lx,top,lw,H,"CLOSED TRADES ("+((gMode===1?"LIVE":"SIMULATOR"))+")",CL_VI);
  let closed=0,wins=0;
  let net=0,best=0,worst=0;
  let list=[];
  let nl=0;
  ArrayResize(list,0,()=>0);
  for(let k=gTN-1;k>=0;k--) if(!gT[k].open&&gT[k].live===(gMode===1)&&gT[k].si>=0&&gT[k].si<gNS) {
    closed++;
    if(gT[k].win) wins++;
    net+=gT[k].pl;
    best=MathMax(best,gT[k].pl);
    worst=MathMin(worst,gT[k].pl);
    ArrayResize(list,nl+1,()=>0);
    list[nl]=k;
    nl++;
  }
  Txt(lx+14,top+30,IntegerToString(closed)+" trades   wins "+IntegerToString(wins)+((closed>0?" ("+IntegerToString(Math.trunc(MathRound(100.0*wins/closed)))+"%)":"")),CL_TX,9,true);
  Txt(lx+14,top+48,"net "+Money(net)+"   best "+Money(best)+"   worst "+Money(worst),(net>=0?CL_UP:CL_DN),9,true);
  let ih=27,y0=top+72,nvis=IMax(1,Math.trunc((top+H-8-y0)/ih));
  gHistOff=ClampI(gHistOff,0,IMax(0,nl-nvis));
  for(let q=gHistOff;q<nl&&q<gHistOff+nvis;q++) {
    let k=list[q],si=gT[k].si;
    let yy=y0+(q-gHistOff)*ih;
    let f=(k===gHistSel);
    cv.RoundFill(lx+8,yy,lx+lw-12,yy+ih-3,6,(f?CL_VI:CL_DARK),(f?70:130));
    Txt(lx+16,yy+12,TimeToString(gT[k].t1,TIME_MINUTES),CL_MU,8,false,TA_LEFT|TA_VCENTER);
    Txt(lx+66,yy+12,Fit(gShort[si],9,true,84),gCol[si],9,true,TA_LEFT|TA_VCENTER);
    Txt(lx+154,yy+12,(gT[k].dir>0?"BUY":"SELL"),(gT[k].dir>0?CL_UP:CL_DN),9,true,TA_LEFT|TA_VCENTER);
    Txt(lx+lw-18,yy+12,((gT[k].pl>0?"+":""))+Money(gT[k].pl),(gT[k].win?CL_UP:CL_DN),9,true,TA_RIGHT|TA_VCENTER);
    AddBtn(lx+8,yy,lx+lw-12,yy+ih-3,"hist:"+IntegerToString(k));
  }
  ScrollBar(lx+lw-6,y0,nvis*ih,nl,nvis,gHistOff,CL_VI);
  if(closed===0) Txt(lx+14,top+90,"No closed trades yet.",CL_MU,10);
  let rx=RX[2],rw=RW[2];
  let hv=(gHistSel>=0&&gHistSel<gTN&&!gT[gHistSel].open&&gT[gHistSel].live===(gMode===1));
  Panel(rx,top,rw,H,(hv?TradeTitle(gHistSel)+"  -  "+((gT[gHistSel].win?"WIN ":"LOSS "))+Money(gT[gHistSel].pl):"TRADE REPLAY"),CL_VI);
  if(hv) {
    Btn(rx+rw-120,top+6,108,22,"> REPLAY",CL_AU,false,"replay",8);
    let ty=top+34,bx=rx+16;
    Txt(bx,ty+12,"TF",CL_MU,8,true,TA_LEFT|TA_VCENTER);
    bx+=24;
    Btn(bx,ty,62,24,"TRADE",CL_VI,gHistTf<0,"htf:-1",8);
    bx+=66;
    for(let i=0;i<NTF;i++) {
      Btn(bx,ty,42,24,TFN[i],CL_CY,gHistTf===i,"htf:"+IntegerToString(i),8);
      bx+=46;
    }
    bx+=10;
    Btn(bx,ty,28,24,"-",CL_CY,false,"hzoom:1",10);
    bx+=32;
    Txt(bx+38,ty+12,IntegerToString(gHistZoom)+" before",CL_MU,8,true,TA_CENTER|TA_VCENTER);
    bx+=78;
    Btn(bx,ty,28,24,"+",CL_CY,false,"hzoom:-1",10);
    bx+=38;
    if(bx+136<rx+rw-16) {
      Btn(bx,ty,50,24,"IND",CL_VI,gOvInd,"ovind",8);
      bx+=56;
      Btn(bx,ty,80,24,(gOvSmc===0?"SMC AUTO":((gOvSmc===1?"SMC ON":"SMC OFF"))),CL_AU,gOvSmc===1,"ovsmc",8);
    }
    gHcX=rx+16;
    gHcY=ty+34;
    gHcW=rw-32;
    gHcH=top+H-gHcY-24;
    DrawTradeChart(gHcX,gHcY,gHcW,gHcH,gHistSel,gReplayProg,false);
    Txt(rx+16,top+H-12,"Mouse wheel over the chart = zoom.  Pick a TF to see the trade on another timeframe.",CL_MU,8,false,TA_LEFT|TA_VCENTER);
  }
  else Txt(rx+Math.trunc(rw/2),top+Math.trunc(H/2),"Click a closed trade to watch how it played out.",CL_MU,12,false,TA_CENTER|TA_VCENTER);
}
function InitSymbol(i,name){
  if(i<0||i>=NSYM) return;
  let pal=_A(5,()=>0);
  pal[0]=((CL_CY)>>>0);
  pal[1]=((CL_MG)>>>0);
  pal[2]=((CL_AU)>>>0);
  pal[3]=((CL_UP)>>>0);
  pal[4]=((CL_VI)>>>0);
  gSym[i]=name;
  gShort[i]=ShortName(name);
  gAvail[i]=!!(SymbolSelect(name,true));
  gCol[i]=((pal[(i%5)])>>>0);
  gH1[i]=INVALID_HANDLE;
  gH2[i]=INVALID_HANDLE;
  gHT[i]=INVALID_HANDLE;
  gHA[i]=INVALID_HANDLE;
  gHH1[i]=INVALID_HANDLE;
  gHH2[i]=INVALID_HANDLE;
  gNote[i]="";
  gSt[i]=0;
  gStT[i]=((0)>>>0);
  gBias[i]=0;
  gLastBar[i]=0;
  gPend[i]=0;
  gPendPx[i]=0;
  gPendT[i]=0;
  gPendWhy[i]="";
  gRuleB[i]="";
  gRuleS[i]="";
  gsLoss[i]=0;
  gsProf[i]=0;
  gsMax[i]=0;
  gsLock[i]=false;
  gsLockWhy[i]="";
  gsLastLoss[i]=0;
  for(let k=0;k<5;k++) gConf[i][k]=0;
  DefaultSetup(gSet[i]);
  if(gAvail[i]) gSet[i].lot=MinLot(i);
}
function FindSym(name){
  for(let i=0;i<gNS;i++) if(gSym[i]===name) return i;
  return -1;
}
function AddSymbol(name){
  if(FindSym(name)>=0) return true;
  if(gNS>=NSYM) {
    Log("Up to "+IntegerToString(NSYM)+" symbols - remove one first",CL_AU);
    return false;
  }
  InitSymbol(gNS,name);
  if(!gAvail[gNS]) {
    Log(name+" cannot be selected in this account",CL_DN);
    return false;
  }
  gNS++;
  MakeHandles(gNS-1);
  RuleCompileAll();
  SaveAll();
  Log("Added "+ShortName(name)+" - set its entry setup on the left",CL_UP);
  return true;
}
function RemoveSymbol(si){
  if(si<0||si>=gNS) return false;
  if(HasOpenAny(si)) {
    Log(gShort[si]+" has an open trade - remove it after the trade closes",CL_AU);
    return false;
  }
  (_t95=Release(gH1[si]),gH1[si]=_R[0],_t95);
  (_t96=Release(gH2[si]),gH2[si]=_R[0],_t96);
  (_t97=Release(gHT[si]),gHT[si]=_R[0],_t97);
  (_t98=Release(gHA[si]),gHA[si]=_R[0],_t98);
  (_t99=Release(gHH1[si]),gHH1[si]=_R[0],_t99);
  (_t100=Release(gHH2[si]),gHH2[si]=_R[0],_t100);
  let nm=gShort[si];
  for(let j=si;j<gNS-1;j++) {
    gSym[j]=gSym[j+1];
    gShort[j]=gShort[j+1];
    gAvail[j]=gAvail[j+1];
    gSet[j]=_cp(gSet[j+1]);
    gH1[j]=gH1[j+1];
    gH2[j]=gH2[j+1];
    gHT[j]=gHT[j+1];
    gHA[j]=gHA[j+1];
    gHH1[j]=gHH1[j+1];
    gHH2[j]=gHH2[j+1];
    gLastBar[j]=gLastBar[j+1];
    gBias[j]=gBias[j+1];
    gSt[j]=gSt[j+1];
    gStT[j]=((gStT[j+1])>>>0);
    gNote[j]=gNote[j+1];
    gPend[j]=gPend[j+1];
    gPendPx[j]=gPendPx[j+1];
    gPendT[j]=gPendT[j+1];
    gPendWhy[j]=gPendWhy[j+1];
    gRuleB[j]=gRuleB[j+1];
    gRuleS[j]=gRuleS[j+1];
    gsLoss[j]=gsLoss[j+1];
    gsProf[j]=gsProf[j+1];
    gsMax[j]=gsMax[j+1];
    gsLock[j]=gsLock[j+1];
    gsLockWhy[j]=gsLockWhy[j+1];
    gsLastLoss[j]=gsLastLoss[j+1];
    for(let k=0;k<5;k++) gConf[j][k]=gConf[j+1][k];
  }
  gNS--;
  let last=gNS;
  gH1[last]=INVALID_HANDLE;
  gH2[last]=INVALID_HANDLE;
  gHT[last]=INVALID_HANDLE;
  gHA[last]=INVALID_HANDLE;
  gHH1[last]=INVALID_HANDLE;
  gHH2[last]=INVALID_HANDLE;
  let pal=_A(5,()=>0);
  pal[0]=((CL_CY)>>>0);
  pal[1]=((CL_MG)>>>0);
  pal[2]=((CL_AU)>>>0);
  pal[3]=((CL_UP)>>>0);
  pal[4]=((CL_VI)>>>0);
  for(let j=0;j<gNS;j++) gCol[j]=((pal[(j%5)])>>>0);
  for(let k=0;k<gTN;k++) {
    if(gT[k].si===si) gT[k].si=-1;
    else if(gT[k].si>si) gT[k].si--;
  }
  if(gSelSym>si) gSelSym--;
  gSelSym=ClampI(gSelSym,0,IMax(0,gNS-1));
  gEdit=_cp(gSet[gSelSym]);
  gEditRB=gRuleB[gSelSym];
  gEditRS=gRuleS[gSelSym];
  gDirty=false;
  gRpId=-1;
  RuleCompileAll();
  SaveAll();
  Log("Removed "+nm,CL_AU);
  return true;
}
function LoadSymbolList(out){
  ArrayResize(out,0,()=>"");
  let fn=SetRead();
  if(fn==="") return 0;
  let h=FileOpen(fn,FILE_READ|FILE_TXT|FILE_ANSI);
  if(h===INVALID_HANDLE) return 0;
  let n=0;
  while(!FileIsEnding(h)) {
    let line=FileReadString(h);
    if(StringSubstr(line,0,2)!=="S;") continue;
    let p=[];
    let k=StringSplit(line,59,p);
    for(let i=1;i<k&&n<NSYM;i++) {
      if(p[i]==="") continue;
      ArrayResize(out,n+1,()=>"");
      out[n]=p[i];
      n++;
    }
    break;
  }
  FileClose(h);
  return n;
}
function BuildCatalog(){
  let tot=IMin(SymbolsTotal(false),5000);
  ArrayResize(gAll,tot,()=>"");
  ArrayResize(gAllG,tot,()=>0);
  ArrayResize(gGrp,0,()=>"");
  let ng=0;
  for(let i=0;i<tot;i++) {
    let nm=SymbolName(i,false);
    let path=SymbolInfoString(nm,SYMBOL_PATH);
    let cut=-1,pos=StringFind(path,"\\");
    while(pos>=0) {
      cut=pos;
      pos=StringFind(path,"\\",pos+1);
    }
    let g=(cut>0?StringSubstr(path,0,cut):"Other");
    let gi=-1;
    for(let k=0;k<ng;k++) if(gGrp[k]===g) {
      gi=k;
      break;
    }
    if(gi<0) {
      ArrayResize(gGrp,ng+1,()=>"");
      gGrp[ng]=g;
      gi=ng;
      ng++;
    }
    gAll[i]=nm;
    gAllG[i]=gi;
  }
  if(gGrpSel>=ng) gGrpSel=-1;
}
var gPkIdx=[];
var gPkKey="";
var gPkT=((0)>>>0);
function PickList(idx){
  let key=gFind+"|"+IntegerToString(gGrpSel)+"|"+IntegerToString(gNS)+"|"+IntegerToString(ArraySize(gAll));
  if(key===gPkKey&&(gGrpSel!==-3||Now()-gPkT<1000)) {
    ArrayCopy(idx,gPkIdx);
    ArrayResize(idx,ArraySize(gPkIdx),()=>0);
    return ArraySize(idx);
  }
  let r=PickListBuild(idx);
  ArrayResize(gPkIdx,0,()=>0);
  ArrayCopy(gPkIdx,idx);
  gPkKey=key;
  gPkT=((Now())>>>0);
  return r;
}
function PickListBuild(idx){
  ArrayResize(idx,0,()=>0);
  let n=0,tot=ArraySize(gAll);
  let f=gFind;
  (_t101=StringToUpper(f),f=_R[0],_t101);
  for(let i=0;i<tot;i++) {
    if(gGrpSel>=0&&gAllG[i]!==gGrpSel) continue;
    if(gGrpSel===-2&&FindSym(gAll[i])<0) continue;
    if(gGrpSel===-3&&!SymbolInfoInteger(gAll[i],SYMBOL_SELECT)) continue;
    if(f!=="") {
      let u=gAll[i];
      (_t102=StringToUpper(u),u=_R[0],_t102);
      let d=SymbolInfoString(gAll[i],SYMBOL_DESCRIPTION);
      (_t103=StringToUpper(d),d=_R[0],_t103);
      if(StringFind(u,f)<0&&StringFind(d,f)<0) continue;
    }
    ArrayResize(idx,n+1,()=>0);
    idx[n]=i;
    n++;
  }
  return n;
}
function OpenPicker(){
  gPick=true;
  gPage=0;
  BuildCatalog();
  Log("Symbol picker: "+IntegerToString(ArraySize(gAll))+" symbols in this account",CL_CY);
}
function ClosePicker(){
  gPick=false;
  ObjectDelete(0,EDNAME);
}
function FindBox(x,y,w,h){
  if(ObjectFind(0,EDNAME)<0) {
    ObjectCreate(0,EDNAME,OBJ_EDIT,0,0,0);
    ObjectSetInteger(0,EDNAME,OBJPROP_BGCOLOR,(Math.trunc(1839108)>>>0));
    ObjectSetInteger(0,EDNAME,OBJPROP_COLOR,(Math.trunc(16774116)>>>0));
    ObjectSetInteger(0,EDNAME,OBJPROP_BORDER_COLOR,(Math.trunc(16769087)>>>0));
    ObjectSetInteger(0,EDNAME,OBJPROP_FONTSIZE,10);
    ObjectSetString(0,EDNAME,OBJPROP_FONT,UiFont());
    ObjectSetInteger(0,EDNAME,OBJPROP_SELECTABLE,false);
    ObjectSetInteger(0,EDNAME,OBJPROP_HIDDEN,true);
    ObjectSetInteger(0,EDNAME,OBJPROP_ZORDER,10);
    ObjectSetString(0,EDNAME,OBJPROP_TEXT,gFind);
  }
  ObjectSetInteger(0,EDNAME,OBJPROP_XDISTANCE,x);
  ObjectSetInteger(0,EDNAME,OBJPROP_YDISTANCE,y);
  ObjectSetInteger(0,EDNAME,OBJPROP_XSIZE,w);
  ObjectSetInteger(0,EDNAME,OBJPROP_YSIZE,h);
}
function DrawPicker(x,y,w,h){
  Panel(x,y,w,h,"ADD SYMBOLS FROM YOUR ACCOUNT  -  "+IntegerToString(gNS)+" / "+IntegerToString(NSYM)+" chosen",CL_CY);
  Btn(x+w-100,y+6,88,24,"DONE",CL_UP,true,"pickdone",9);
  let gw=Math.trunc(MathMin(260,w*0.28)),gy=y+38,rh=24;
  let ng=ArraySize(gGrp);
  Btn(x+10,gy,gw-10,rh-3,"All symbols ("+IntegerToString(ArraySize(gAll))+")",CL_CY,gGrpSel===-1,"pg:-1",8);
  gy+=rh;
  Btn(x+10,gy,gw-10,rh-3,"Chosen ("+IntegerToString(gNS)+")",CL_UP,gGrpSel===-2,"pg:-2",8);
  gy+=rh;
  Btn(x+10,gy,gw-10,rh-3,"Market Watch",CL_AU,gGrpSel===-3,"pg:-3",8);
  gy+=rh+6;
  for(let g=0;g<ng;g++) {
    if(gy+rh>y+h-8) break;
    let nm=gGrp[g];
    let p=StringFind(nm,"\\");
    let last=-1;
    while(p>=0) {
      last=p;
      p=StringFind(nm,"\\",p+1);
    }
    let sh=(last>=0?StringSubstr(nm,last+1):nm);
    Btn(x+10,gy,gw-10,rh-3,Fit(sh,8,true,gw-24),CL_VI,gGrpSel===g,"pg:"+IntegerToString(g),8);
    gy+=rh;
  }
  let sx=x+gw+14,sw=x+w-12-sx;
  Txt(sx,y+44,"Search (type, then press Enter):",CL_MU,9);
  FindBox(sx+TW("Search (type, then press Enter):",9)+10,y+38,Math.trunc(MathMin(260,sw*0.5)),24);
  let idx=[];
  let n=PickList(idx);
  let gx=sx,gyy=y+72,gw2=sw,gh=y+h-44-gyy;
  let cw=170,ch=28;
  let cols=IMax(1,Math.trunc(gw2/cw)),rows=IMax(1,Math.trunc(gh/ch)),per=cols*rows;
  let room=MAXB-bN-6;
  if(per>room) {
    rows=IMax(1,Math.trunc(room/cols));
    per=cols*rows;
  }
  let pages=IMax(1,Math.trunc((n+per-1)/per));
  gPage=ClampI(gPage,0,pages-1);
  cw=Math.trunc(gw2/cols);
  for(let i=0;i<per;i++) {
    let j=gPage*per+i;
    if(j>=n) break;
    let ai=idx[j];
    let cx=gx+((i%cols))*cw,cy=gyy+(Math.trunc(i/cols))*ch;
    let on=FindSym(gAll[ai])>=0;
    cv.RectA(cx,cy,cx+cw-6,cy+ch-4,(on?CL_UP:CL_DARK),(on?45:140));
    cv.Rectangle(cx,cy,cx+cw-6,cy+ch-4,(on?CL_UP:CL_LN));
    cv.Rectangle(cx+6,cy+6,cx+18,cy+18,(on?CL_UP:CL_MU));
    if(on) cv.FillRectangle(cx+9,cy+9,cx+15,cy+15,CL_UP);
    Txt(cx+24,cy+Math.trunc((ch-4)/2),Fit(gAll[ai],9,on,cw-34),(on?CL_TX:CL_MU),9,on,TA_LEFT|TA_VCENTER);
    AddBtn(cx,cy,cx+cw-6,cy+ch-4,"pk:"+IntegerToString(ai));
  }
  if(n===0) Txt(gx,gyy+10,"No symbols here.",CL_MU,10);
  Btn(gx,y+h-36,90,26,"< PREV",CL_CY,false,"pp:-1",9);
  Txt(gx+100,y+h-23,"Page "+IntegerToString(gPage+1)+" / "+IntegerToString(pages)+"   ("+IntegerToString(n)+" symbols)",CL_MU,9,false,TA_LEFT|TA_VCENTER);
  Btn(gx+gw2-90,y+h-36,90,26,"NEXT >",CL_CY,false,"pp:1",9);
}
var EdKey=_A(40,()=>""),EdLab=_A(40,()=>""),EdVal=_A(40,()=>"");
var EdKind=_A(40,()=>0);
var EdN=0;
function EdAdd(key,lab,val,kind){
  if(EdN>=40) return;
  EdKey[EdN]=key;
  EdLab[EdN]=lab;
  EdVal[EdN]=val;
  EdKind[EdN]=kind;
  EdN++;
}
function SlUnit(s){
  return (s.slMode===0?"$":((s.slMode===1?" pts":" x ATR")));
}
function BuildRows(){
  EdN=0;
  let s=_cp(gEdit);
  EdAdd("on","Trading on this symbol",(s.on?"ON":"OFF"),2);
  EdAdd("tf","Entry timeframe",TFN[ClampI(s.tf,0,NTF-1)],1);
  EdAdd("entry","Entry trigger",ENAME[ClampI(s.entry,0,NENTRY-1)],1);
  EdAdd("dir","Direction",DIRN[ClampI(s.dir,0,2)],1);
  if(s.entry===E_RULE) {
    let eb=RuleCheck(gEditRB),es=RuleCheck(gEditRS);
    EdAdd("rb","  BUY rule"+((eb!==""?"  ! "+eb:"")),(gEditRB===""?"(empty)":gEditRB),3);
    EdAdd("rs","  SELL rule"+((es!==""?"  ! "+es:"")),(gEditRS===""?"(empty)":gEditRS),3);
  }
  let lab="";
  let st=0,mn=0,mx=0;
  let dg=0;
  for(let k=0;k<5;k++) if((_t104=ParamInfo(s.entry,k,lab,st,mn,mx,dg),lab=_R[0],st=_R[1],mn=_R[2],mx=_R[3],dg=_R[4],_t104)) {
    let v="";
    if(k===0) v=IntegerToString(s.p1);
    if(k===1) v=IntegerToString(s.p2);
    if(k===2) v=IntegerToString(s.p3);
    if(k===3) v=DoubleToString(s.lv1,dg);
    if(k===4) v=DoubleToString(s.lv2,dg);
    EdAdd("p"+IntegerToString(k),lab,v,0);
  }
  if(s.entry===E_MA) EdAdd("ma","MA type",MAN[ClampI(s.ma,0,3)],1);
  if(s.entry===E_WSM) {
    EdAdd("ma","Fast MA type",MAN[ClampI(s.ma,0,3)],1);
    EdAdd("ma2","Slow MA type",MAN[ClampI(Math.trunc(MathRound(s.lv2)),0,3)],1);
  }
  EdAdd("trend","Trend filter (EMA)",(s.trend?"ON":"OFF"),2);
  if(s.trend) EdAdd("trendP","Trend EMA period",IntegerToString(s.trendP),0);
  EdAdd("htfOn","Higher TF confirmation (2-TF model)",(s.htfOn?"ON":"OFF"),2);
  if(s.htfOn) {
    EdAdd("htf","  Confirm on timeframe",TFN[ClampI(s.htf,0,NTF-1)],1);
    EdAdd("htfType","  Confirm with",HTN[ClampI(s.htfType,0,NHT-1)],1);
    if(s.htfType===0) {
      EdAdd("hp1","  Fast MA",IntegerToString(s.hp1),0);
      EdAdd("hp2","  Slow MA",IntegerToString(s.hp2),0);
      EdAdd("hma","  MA type",MAN[ClampI(s.hma,0,3)],1);
    }
    if(s.htfType===1) EdAdd("hp1","  EMA period",IntegerToString(s.hp1),0);
    if(s.htfType===2) {
      EdAdd("hp1","  MACD fast",IntegerToString(s.hp1),0);
      EdAdd("hp2","  MACD slow",IntegerToString(s.hp2),0);
    }
    if(s.htfType===3) EdAdd("hp1","  RSI period",IntegerToString(s.hp1),0);
    if(s.htfType===5) EdAdd("hp1","  ADX period",IntegerToString(s.hp1),0);
  }
  EdAdd("cwMode","Wait after the signal",CWN[ClampI(s.cwMode,0,3)],1);
  if(s.cwMode===1) EdAdd("cwN","  Candles to wait",IntegerToString(s.cwN),0);
  if(s.cwMode===2) EdAdd("cwN","  Minutes to wait",IntegerToString(s.cwN),0);
  if(s.cwMode===3) {
    EdAdd("cwPull","  Pullback depth",DoubleToString(s.cwPull,0)+" % of SL",0);
    EdAdd("cwN","  Cancel after",IntegerToString(s.cwN)+" candles",0);
  }
  let dollarSL=(s.entry!==E_WSM&&s.slMode===0);
  if(s.entry!==E_WSM) {
    EdAdd("slMode","SL / TP in",SLN[ClampI(s.slMode,0,2)],1);
    EdAdd("sl","Stop loss",((s.slMode===0?"$":""))+DoubleToString(s.sl,(s.slMode===1?0:2))+((s.slMode===0?"":SlUnit(s))),0);
    EdAdd("tp","Take profit",((s.slMode===0?"$":""))+DoubleToString(s.tp,(s.slMode===1?0:2))+((s.slMode===0?"":SlUnit(s))),0);
  }
  if(!dollarSL) EdAdd("lotMode","Lot size",(s.lotMode===0?"Fixed lot":"Risk % of balance"),1);
  if(dollarSL||s.lotMode===0) EdAdd("lot","Lot (broker min "+DoubleToString(MinLot(ClampI(gSelSym,0,NSYM-1)),3)+")",DoubleToString(s.lot,3),0);
  else EdAdd("risk","Risk per trade",DoubleToString(s.risk,1)+" %",0);
  EdAdd("be","Move SL to break-even",(s.be?"ON":"OFF"),2);
  if(s.be) EdAdd("beAt","  ... when price reaches",DoubleToString(s.beAt,0)+" % of TP",0);
  EdAdd("trail","Trailing stop",(s.trail?"ON":"OFF"),2);
  if(s.trail) {
    EdAdd("trStart","  ... starts at",DoubleToString(s.trStart,0)+" % of TP",0);
    EdAdd("trDist","  ... trails behind by",DoubleToString(s.trDist,0)+" % of SL",0);
  }
}
function SetupSummary(si,s){
  let e="";
  switch(s.entry) {
    case E_MA:
      e=MAN[s.ma]+" "+IntegerToString(s.p1)+" crosses "+IntegerToString(s.p2);
      break;
    case E_RSI:
      e="RSI("+IntegerToString(s.p1)+") crosses "+DoubleToString(s.lv1,0)+" up / "+DoubleToString(s.lv2,0)+" down";
      break;
    case E_MACD:
      e="MACD("+IntegerToString(s.p1)+","+IntegerToString(s.p2)+","+IntegerToString(s.p3)+") crosses its signal";
      break;
    case E_BRK:
      e="close breaks the last "+IntegerToString(s.p1)+" candles";
      break;
    case E_BBB:
      e="price comes back inside Bands("+IntegerToString(s.p1)+")";
      break;
    case E_BBX:
      e="price breaks out of Bands("+IntegerToString(s.p1)+")";
      break;
    case E_STO:
      e="Stochastic cross in "+DoubleToString(s.lv1,0)+"/"+DoubleToString(s.lv2,0)+" zones";
      break;
    case E_CCI:
      e="CCI("+IntegerToString(s.p1)+") crosses back from +/-"+DoubleToString(s.lv1,0);
      break;
    case E_SAR:
      e="Parabolic SAR flips";
      break;
    case E_ADX:
      e="+DI/-DI cross with ADX >= "+DoubleToString(s.lv1,0);
      break;
    case E_WSM:
      e=MAN[ClampI(s.ma,0,3)]+" "+IntegerToString(s.p1)+" crosses "+MAN[ClampI(Math.trunc(MathRound(s.lv2)),0,3)]+" "+IntegerToString(s.p2)+" (trade the way it crosses)";
      break;
    case E_RULE:
      e="your rule says so (BUY: "+((gEditRB===""?"-":gEditRB))+" | SELL: "+((gEditRS===""?"-":gEditRS))+")";
      break;
  }
  let sl=(s.entry===E_WSM?("SL at the "+((s.dir===2?"highest":"lowest"))+" candle body of the last "+IntegerToString(s.p3)+" candles / TP = SL x "+DoubleToString(s.lv1,1)):((s.slMode===0?("SL $"+DoubleToString(s.sl,2)+" / TP $"+DoubleToString(s.tp,2)):((s.slMode===1?("SL "+DoubleToString(s.sl,0)+" / TP "+DoubleToString(s.tp,0)+" points"):("SL "+DoubleToString(s.sl,1)+" / TP "+DoubleToString(s.tp,1)+" x ATR"))))));
  let lot=(((s.entry===E_WSM||s.slMode!==0)&&s.lotMode===1)?("risk "+DoubleToString(s.risk,1)+"%"):("lot "+DoubleToString(s.lot,3)));
  let hf="";
  if(s.cwMode===1) hf+=", wait "+IntegerToString(s.cwN)+" candles after the signal";
  if(s.cwMode===2) hf+=", wait "+IntegerToString(s.cwN)+" min after the signal";
  if(s.cwMode===3) hf+=", enter on a "+DoubleToString(s.cwPull,0)+"% pullback (max "+IntegerToString(s.cwN)+" candles)";
  if(s.htfOn) hf+=", only when "+TFN[ClampI(s.htf,0,NTF-1)]+" agrees ("+HTN[ClampI(s.htfType,0,NHT-1)]+")";
  return gShort[si]+": "+DIRN[s.dir]+" on "+TFN[ClampI(s.tf,0,NTF-1)]+" when "+e+hf+((s.trend?", with the EMA "+IntegerToString(s.trendP)+" trend":""))+". "+sl+", "+lot+((s.be?". BE at "+DoubleToString(s.beAt,0)+"% of TP":""))+((s.trail?". Trail from "+DoubleToString(s.trStart,0)+"%":""))+".";
}
function EditValue(key,d){
  let s=_cp(gEdit);
  let si=ClampI(gSelSym,0,NSYM-1);
  let vs=(gAvail[si]?SymbolInfoDouble(gSym[si],SYMBOL_VOLUME_STEP):0.01);
  if(vs<=0) vs=0.01;
  let lab="";
  let st=0,mn=0,mx=0;
  let dg=0;
  if(key==="rb"||key==="rs") {
    gChatDraft=((key==="rb"?"/buy ":"/sell "))+((key==="rb"?gEditRB:gEditRS));
    gTab=5;
    return;
  }
  if(key==="on") s.on=!s.on;
  else if(key==="tf") s.tf=((s.tf+d+NTF)%NTF);
  else if(key==="entry") {
    s.entry=((s.entry+d+NENTRY)%NENTRY);
    DefaultParams(s);
  }
  else if(key==="dir") s.dir=((s.dir+d+3)%3);
  else if(StringSubstr(key,0,1)==="p"&&StringLen(key)===2) {
    let k=StringToInteger(StringSubstr(key,1,1));
    if((_t105=ParamInfo(s.entry,k,lab,st,mn,mx,dg),lab=_R[0],st=_R[1],mn=_R[2],mx=_R[3],dg=_R[4],_t105)) {
      if(k===0) s.p1=Math.trunc(Clamp(s.p1+d*st,mn,mx));
      if(k===1) s.p2=Math.trunc(Clamp(s.p2+d*st,mn,mx));
      if(k===2) s.p3=Math.trunc(Clamp(s.p3+d*st,mn,mx));
      if(k===3) s.lv1=NormalizeDouble(Clamp(s.lv1+d*st,mn,mx),dg);
      if(k===4) s.lv2=NormalizeDouble(Clamp(s.lv2+d*st,mn,mx),dg);
    }
  }
  else if(key==="ma") s.ma=((s.ma+d+4)%4);
  else if(key==="ma2") s.lv2=(+((((Math.trunc(MathRound(s.lv2)))+d+4)%4)));
  else if(key==="trend") s.trend=!s.trend;
  else if(key==="trendP") s.trendP=ClampI(s.trendP+d*5,5,500);
  else if(key==="slMode") {
    s.slMode=((s.slMode+d+3)%3);
    if(s.slMode===0) {
      s.sl=6;
      s.tp=10;
    }
    if(s.slMode===1) {
      s.sl=500;
      s.tp=800;
    }
    if(s.slMode===2) {
      s.sl=1.5;
      s.tp=2.5;
    }
  }
  else if(key==="sl"||key==="tp") {
    let step=(s.slMode===0?1.0:((s.slMode===1?50.0:0.1)));
    let mnv=(s.slMode===0?0.5:((s.slMode===1?10.0:0.1)));
    if(key==="sl") s.sl=NormalizeDouble(MathMax(mnv,s.sl+d*step),2);
    else s.tp=NormalizeDouble(MathMax(mnv,s.tp+d*step),2);
  }
  else if(key==="htfOn") {
    s.htfOn=!s.htfOn;
    if(s.htfOn&&s.htf<=s.tf) s.htf=ClampI(s.tf+2,0,NTF-1);
  }
  else if(key==="htf") s.htf=((s.htf+d+NTF)%NTF);
  else if(key==="htfType") {
    s.htfType=((s.htfType+d+NHT)%NHT);
    if(s.htfType===0) {
      s.hp1=9;
      s.hp2=21;
    }
    if(s.htfType===1) s.hp1=50;
    if(s.htfType===2) {
      s.hp1=12;
      s.hp2=26;
    }
    if(s.htfType===3||s.htfType===5) s.hp1=14;
  }
  else if(key==="hp1") s.hp1=ClampI(s.hp1+d,2,500);
  else if(key==="hp2") s.hp2=ClampI(s.hp2+d,2,500);
  else if(key==="hma") s.hma=((s.hma+d+4)%4);
  else if(key==="lotMode") s.lotMode=1-s.lotMode;
  else if(key==="lot") s.lot=NormalizeDouble(MathMax((gAvail[si]?MinLot(si):vs),s.lot+d*vs*((s.lot>=1?10:1))),5);
  else if(key==="cwMode") {
    s.cwMode=((s.cwMode+d+4)%4);
    if(s.cwMode===1) s.cwN=2;
    if(s.cwMode===2) s.cwN=3;
    if(s.cwMode===3) s.cwN=5;
  }
  else if(key==="cwN") s.cwN=ClampI(s.cwN+d,1,100);
  else if(key==="cwPull") s.cwPull=Clamp(s.cwPull+d*5,5,100);
  else if(key==="risk") s.risk=NormalizeDouble(Clamp(s.risk+d*0.1,0.1,20),1);
  else if(key==="be") s.be=!s.be;
  else if(key==="beAt") s.beAt=Clamp(s.beAt+d*5,5,100);
  else if(key==="trail") s.trail=!s.trail;
  else if(key==="trStart") s.trStart=Clamp(s.trStart+d*5,5,100);
  else if(key==="trDist") s.trDist=Clamp(s.trDist+d*5,5,200);
  ClampSetup(s);
  gEdit=_cp(s);
  gDirty=true;
}
function SelectSymbol(si){
  if(si<0||si>=gNS) return;
  if(gDirty) Log("Unsaved changes of "+gShort[gSelSym]+" were dropped",CL_AU);
  gSelSym=si;
  gEdit=_cp(gSet[si]);
  gEditRB=gRuleB[si];
  gEditRS=gRuleS[si];
  gDirty=false;
}
function SaveSetup(toAll){
  if(toAll) {
    for(let i=0;i<gNS;i++) {
      gSet[i]=_cp(gEdit);
      gRuleB[i]=gEditRB;
      gRuleS[i]=gEditRS;
      if(gAvail[i]&&gSet[i].lot<MinLot(i)) gSet[i].lot=MinLot(i);
      gPend[i]=0;
      gSt[i]=0;
      MakeHandles(i);
    }
    Log("Setup copied to all "+IntegerToString(gNS)+" symbols and saved",CL_UP);
  }
  else {
    gSet[gSelSym]=_cp(gEdit);
    gRuleB[gSelSym]=gEditRB;
    gRuleS[gSelSym]=gEditRS;
    gPend[gSelSym]=0;
    gSt[gSelSym]=0;
    MakeHandles(gSelSym);
    Log("Setup of "+gShort[gSelSym]+" saved",CL_UP);
  }
  gDirty=false;
  RuleCompileAll();
  SaveAll();
}
function DrawSettings(){
  let lx=RX[1],top=RY[1],H=RH[1],lw=RW[1];
  Panel(lx,top,lw,H,"MY SYMBOLS ("+IntegerToString(gNS)+")",CL_CY);
  let svn=_AFILL(["SETUPS","GUARD","AI"],3,"");
  let svw=Math.trunc((lw-16-8)/3);
  for(let v=0;v<3;v++) Btn(lx+8+v*(svw+4),top+28,svw,26,svn[v],(v===1?((gdLock?CL_DN:CL_AU)):((v===2?CL_VI:CL_UP))),gSetView===v,"sv:"+IntegerToString(v),8);
  Btn(lx+8,top+60,lw-16,28,(gPick?"CLOSE THE PICKER":"+ ADD / REMOVE SYMBOLS"),CL_AU,gPick,"picker",9);
  let rh=Math.trunc(MathMin(48,(H-108)/MathMax(1,gNS)));
  for(let si=0;si<gNS;si++) {
    let yy=top+96+si*rh;
    let f=(si===gSelSym);
    cv.RoundFill(lx+8,yy,lx+lw-8,yy+rh-4,IMin(8,Math.trunc((rh-4)/2)),(f?gCol[si]:CL_DARK),(f?60:130));
    let dc=(((!gAvail[si]?CL_DN:((gSet[si].on?CL_UP:CL_MU))))>>>0);
    cv.FillCircle(lx+18,yy+Math.trunc((rh-4)/2),4,dc);
    Txt(lx+30,yy+((rh>=34?4:Math.trunc((rh-4)/2)-7)),Fit(gShort[si],(rh>=34?10:8),true,lw-46),(gAvail[si]?gCol[si]:CL_MU),(rh>=34?10:8),true);
    if(rh>=34) Txt(lx+30,yy+rh-20,(gAvail[si]?(ESHORT[gSet[si].entry]+"  "+TFN[gSet[si].tf]+((gSet[si].htfOn?" + "+TFN[gSet[si].htf]:""))+((gSet[si].on?"":"  off"))):"not in this account"),CL_MU,8);
    AddBtn(lx+8,yy,lx+lw-8,yy+rh-4,"sym:"+IntegerToString(si));
  }
  if(gPick) {
    DrawPicker(RX[2],RY[2],RW[2],RH[2]);
    return;
  }
  if(gSetView===1) {
    DrawGuardView(RX[2],RY[2],RW[2],RH[2]);
    return;
  }
  if(gSetView===2) {
    DrawAiView(RX[2],RY[2],RW[2],RH[2]);
    return;
  }
  if(gNS===0) {
    Panel(RX[2],RY[2],RW[2],RH[2],"",CL_AU);
    Txt(RX[2]+Math.trunc(RW[2]/2),top+Math.trunc(H/2),"Press  + ADD / REMOVE SYMBOLS  and pick the markets you want to trade.",CL_TX,12,true,TA_CENTER|TA_VCENTER);
    return;
  }
  gSelSym=ClampI(gSelSym,0,gNS-1);
  let ex=RX[2],ew=RW[2];
  Panel(ex,top,ew,H,"ENTRY SETUP - "+gSym[gSelSym]+((gDirty?"   (not saved)":"")),(gDirty?CL_AU:CL_UP));
  BuildRows();
  let ry=top+34,avail=H-150-34;
  let rowH=Math.trunc(MathMin(30,MathMax(26,avail/MathMax(1,EdN))));
  let nvis=IMax(1,Math.trunc(avail/rowH));
  gEdOff=ClampI(gEdOff,0,IMax(0,EdN-nvis));
  let vx=ex+Math.trunc((ew*0.52));
  for(let r=0;r<nvis;r++) {
    let i=gEdOff+r;
    if(i>=EdN) break;
    let yy=ry+r*rowH;
    if((i%2)===0) cv.RoundFill(ex+8,yy,ex+ew-14,yy+rowH-2,6,CL_DARK,100);
    Txt(ex+16,yy+Math.trunc(rowH/2),Fit(EdLab[i],9,false,vx-ex-24),(StringSubstr(EdLab[i],0,2)==="  "?CL_MU:Lerp(CL_MU,CL_TX,0.4)),9,false,TA_LEFT|TA_VCENTER);
    let bh=rowH-8;
    let a=(EdKind[i]===1?"<":"-"),b=(EdKind[i]===1?">":"+");
    if(EdKind[i]===2) {
      let on=(EdVal[i]==="ON");
      Btn(vx,yy+4,70,bh,EdVal[i],(on?CL_UP:CL_DN),on,"ed:"+EdKey[i]+":1",8);
    }
    else if(EdKind[i]===3) {
      let bx=ex+ew-24-70;
      gNoTr=true;
      Txt(vx,yy+Math.trunc(rowH/2),Fit(EdVal[i],8,true,bx-vx-8),(StringFind(EdLab[i],"!")>=0?CL_DN:CL_CY),8,true,TA_LEFT|TA_VCENTER);
      gNoTr=false;
      Btn(bx,yy+4,70,bh,"EDIT",CL_VI,false,"ed:"+EdKey[i]+":0",8);
    }
    else {
      Btn(vx,yy+4,bh+6,bh,a,CL_CY,false,"ed:"+EdKey[i]+":-1",9);
      let bx=ex+ew-24-bh-6;
      Txt(vx+bh+16,yy+Math.trunc(rowH/2),Fit(EdVal[i],10,true,bx-vx-bh-24),CL_TX,10,true,TA_LEFT|TA_VCENTER);
      Btn(bx,yy+4,bh+6,bh,b,CL_CY,false,"ed:"+EdKey[i]+":1",9);
    }
  }
  ScrollBar(ex+ew-8,ry,nvis*rowH,EdN,nvis,gEdOff,CL_UP);
  if(EdN>nvis) Txt(ex+ew-110-14,top+17,"more rows: mouse wheel",CL_MU,8,false,TA_RIGHT|TA_VCENTER);
  let sy=top+H-110;
  let sum=SetupSummary(gSelSym,gEdit);
  let lines=0;
  let rest=sum;
  let oNT=gNoTr;
  gNoTr=true;
  while(rest!==""&&lines<3) {
    let cut=StringLen(rest);
    if(TWr(rest,9)>ew-30) {
      let lo2=10,hi2=StringLen(rest);
      while(lo2<hi2) {
        let md=Math.trunc((lo2+hi2+1)/2);
        if(TWr(StringSubstr(rest,0,md),9)<=ew-30) lo2=md;
        else hi2=md-1;
      }
      cut=lo2;
    }
    if(cut<StringLen(rest)) {
      let sp=cut;
      while(sp>10&&StringGetCharacter(rest,sp)!==32) sp--;
      if(sp>10) cut=sp;
    }
    Txt(ex+16,sy+lines*16,StringSubstr(rest,0,cut),CL_VI,9);
    rest=StringSubstr(rest,cut);
    (_t106=StringTrimLeft(rest),rest=_R[0],_t106);
    lines++;
  }
  gNoTr=oNT;
  let bw=Math.trunc((ew-50)/4);
  Btn(ex+12,top+H-44,bw,32,"SAVE SETUP",CL_UP,gDirty,"save");
  Btn(ex+22+bw,top+H-44,bw,32,"COPY TO ALL",CL_CY,false,"copyall");
  Btn(ex+32+2*bw,top+H-44,bw,32,"DEFAULTS",CL_AU,false,"defaults");
  Btn(ex+42+3*bw,top+H-44,bw,32,"UNDO",CL_MU,false,"undo");
  Btn(ex+ew-110,top+6,98,22,"REMOVE",CL_DN,false,"remsym",8);
  let gx=RX[3],gw=RW[3];
  Panel(gx,top,gw,H,"ACCOUNT & SAFETY",CL_AU);
  let yy=top+34;
  Txt(gx+14,yy,"Mode",CL_MU,9);
  yy+=18;
  Btn(gx+14,yy,Math.trunc((gw-38)/2),30,"SIMULATOR",CL_UP,gMode===0,"setmode:0");
  Btn(gx+24+Math.trunc((gw-38)/2),yy,Math.trunc((gw-38)/2),30,"LIVE",CL_DN,gMode===1,"setmode:1");
  yy+=38;
  Txt(gx+14,yy,(InpAllowLive?"LIVE asks you to confirm first.":"LIVE is off in the EA inputs (F7)."),CL_MU,8);
  yy+=14;
  let algo=!!(TerminalInfoInteger(TERMINAL_TRADE_ALLOWED));
  Txt(gx+14,yy,"Algo Trading: "+((algo?"ON":"OFF - turn it on in MT5")),(algo?CL_UP:CL_AU),8);
  yy+=22;
  let gl=_AFILL(["Max open trades","Guard starts at","Simulator balance","TP celebration","Light animation","Voice"],6,"");
  let gv=_A(6,()=>"");
  gv[0]=IntegerToString(gMaxOpen);
  gv[1]=IntegerToString(gGuardAfter)+" open";
  gv[2]="$"+DoubleToString(gSimStart,0);
  gv[3]=(gCeleb?"ON":"OFF");
  gv[4]=(gLowAnim?"ON":"OFF");
  gv[5]=(gVoice?"ON":"OFF");
  for(let i=0;i<6;i++) {
    Txt(gx+14,yy+12,gl[i],CL_MU,9,false,TA_LEFT|TA_VCENTER);
    if(i>=3) Btn(gx+gw-84,yy,70,24,gv[i],(gv[i]==="ON"?CL_UP:CL_DN),gv[i]==="ON","gl:"+IntegerToString(i)+":1",8);
    else {
      Btn(gx+gw-152,yy,28,24,"-",CL_CY,false,"gl:"+IntegerToString(i)+":-1");
      Txt(gx+gw-83,yy+12,gv[i],CL_TX,9,true,TA_CENTER|TA_VCENTER);
      Btn(gx+gw-42,yy,28,24,"+",CL_CY,false,"gl:"+IntegerToString(i)+":1");
    }
    yy+=32;
  }
  Btn(gx+14,yy,gw-28,24,"TEST THE VOICE",CL_VI,false,"gl:6:1",8);
  yy+=34;
  Txt(gx+14,yy,"When "+IntegerToString(gGuardAfter)+" or more trades are open,",CL_VI,8);
  Txt(gx+14,yy+14,"a new trade opens only if at least one",CL_VI,8);
  Txt(gx+14,yy+28,"open trade is safe (BE or trailing).",CL_VI,8);
  yy+=52;
  Btn(gx+14,yy,gw-28,28,"RESET SIMULATOR",CL_AU,false,"simreset");
  yy+=40;
  Txt(gx+14,yy,"Magic "+IntegerToString(InpMagic),CL_MU,8);
  Txt(gx+14,yy+14,"file: MQL5\\Files\\"+SETFILE,CL_MU,8);
}
var gAnView=0;
var gAnPer=1;
var gAnD=0;
var gAnListOff=0;
var MONN=_AFILL(["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"],12,"");
var DOWN=_AFILL(["MON","TUE","WED","THU","FRI","SAT","SUN"],7,"");
function DayStart(t){
  return t-((t%86400));
}
function MakeDate(y,m,d){
  let s=new MqlDateTime();
  ZeroMemory(s);
  s.year=y;
  s.mon=m;
  s.day=d;
  return StructToTime(s);
}
function DaysInMonth(y,m){
  let dm=_AFILL([31,28,31,30,31,30,31,31,30,31,30,31],12,0);
  if(m===2&&(((y%4)===0&&(y%100)!==0)||(y%400)===0)) return 29;
  return dm[ClampI(m,1,12)-1];
}
function AnFix(){
  if(gAnD<=0) gAnD=DayStart(TimeCurrent());
}
function AnShift(u,d){
  AnFix();
  if(u===0) {
    gAnD+=d*86400;
    return;
  }
  let s=new MqlDateTime();
  TimeToStruct(gAnD,s);
  if(u===1) {
    s.mon+=d;
    while(s.mon<1) {
      s.mon+=12;
      s.year--;
    }
    while(s.mon>12) {
      s.mon-=12;
      s.year++;
    }
  }
  else s.year=ClampI(s.year+d,1971,2100);
  s.day=IMin(s.day,DaysInMonth(s.year,s.mon));
  gAnD=MakeDate(s.year,s.mon,s.day);
}
function AnRange(per,a,b){
  AnFix();
  let s=new MqlDateTime();
  TimeToStruct(gAnD,s);
  if(per===0) {
    a=gAnD;
    b=a+86400;
  }
  else if(per===1) {
    a=MakeDate(s.year,s.mon,1);
    b=a+DaysInMonth(s.year,s.mon)*86400;
  }
  else if(per===2) {
    a=MakeDate(s.year,1,1);
    b=MakeDate(s.year+1,1,1);
  }
  else {
    a=0;
    b=4102444800;
  }
  _R=[a,b];
}
function AnSelect(a,b,idx){
  ArrayResize(idx,0,()=>0);
  let n=0;
  let lv=((gMode===1?1:0));
  for(let i=0;i<jN;i++) {
    if(jLive[i]!==lv||jT1[i]<a||jT1[i]>=b) continue;
    ArrayResize(idx,n+1,()=>0);
    idx[n]=i;
    n++;
  }
  return n;
}
function JKind(i){
  if(jTag[i]==="BE"||MathAbs(jPL[i])<=0.005) return 0;
  return (jPL[i]>0?1:-1);
}
function AnCompute(idx,st){
  st._zm();
  let ws=0,ls=0;
  for(let q=0;q<ArraySize(idx);q++) {
    let i=idx[q];
    let pl=jPL[i];
    let kd=JKind(i);
    st.n++;
    st.net+=pl;
    st.lots+=jLot[i];
    if(st.n===1) {
      st.best=pl;
      st.worst=pl;
    }
    st.best=MathMax(st.best,pl);
    st.worst=MathMin(st.worst,pl);
    if(pl>0) st.gp+=pl;
    else st.gl-=pl;
    if(kd>0) {
      st.wins++;
      ws++;
      ls=0;
    }
    else if(kd<0) {
      st.losses++;
      ls++;
      ws=0;
    }
    else st.be++;
    st.maxWs=IMax(st.maxWs,ws);
    st.maxLs=IMax(st.maxLs,ls);
    let tg=jTag[i];
    if(tg==="TP") st.tpN++;
    else if(tg==="SL") st.slN++;
    else if(tg==="BE") st.beN++;
    else if(tg==="TSL") st.tslN++;
    else if(tg==="MAN") st.manN++;
    if(jDir[i]>0) {
      st.buys++;
      st.bNet+=pl;
      if(kd>0) st.bWins++;
    }
    else {
      st.sells++;
      st.sNet+=pl;
      if(kd>0) st.sWins++;
    }
  }
}
function PF(st){
  return (st.gl>0?DoubleToString(st.gp/st.gl,2):((st.gp>0?"max":"-")));
}
function WR(w,n){
  return (n>0?IntegerToString(Math.trunc(MathRound(100.0*w/n)))+"%":"-");
}
function SMoney(v){
  return ((v>0?"+":""))+Money(v);
}
function PLC(v){
  return (((v>0?CL_UP:((v<0?CL_DN:CL_MU))))>>>0);
}
function Kpi(x,y,w,h,lab,val,vc,sub){
  cv.RoundFill(x,y,x+w,y+h,10,CL_PN,205);
  cv.RoundBorder(x,y,x+w,y+h,10,vc,120,1.1);
  Txt(x+12,y+9,Fit(lab,7,true,w-20),CL_MU,7,true);
  Txt(x+12,y+Math.trunc(h/2)+4,Fit(val,(h>=60?15:12),true,w-20),vc,(h>=60?15:12),true,TA_LEFT|TA_VCENTER);
  if(sub!==""&&h>=54) Txt(x+12,y+h-11,Fit(sub,7,false,w-20),CL_MU,7,false,TA_LEFT|TA_VCENTER);
}
function LayoutAn(){
  let m=10,top=58,H=gH-top-m,W=gW-2*m;
  RX[1]=m;
  RY[1]=top;
  RW[1]=W;
  RH[1]=44;
  RegPanel(RX[1],RY[1],RW[1],RH[1],CL_VI,0);
  let y0=top+44+m,h0=top+H-y0;
  if(gAnView===0) {
    let rw=Math.trunc(MathMin(340,W*0.28));
    RX[2]=m;
    RY[2]=y0;
    RW[2]=W-rw-m;
    RH[2]=h0;
    RX[3]=m+RW[2]+m;
    RY[3]=y0;
    RW[3]=rw;
    RH[3]=h0;
    RegPanel(RX[2],RY[2],RW[2],RH[2],CL_CY,0);
    RegPanel(RX[3],RY[3],RW[3],RH[3],CL_AU,0);
    return;
  }
  let kpiH=62,y1=y0+kpiH+m;
  let botH=Math.trunc(((top+H-y1)*0.45)),midH=top+H-y1-botH-m;
  let rw=Math.trunc(MathMin(320,W*0.27));
  RX[2]=m;
  RY[2]=y1;
  RW[2]=W-rw-m;
  RH[2]=midH;
  RX[3]=m+RW[2]+m;
  RY[3]=y1;
  RW[3]=rw;
  RH[3]=midH;
  let yb=y1+midH+m;
  let w4=Math.trunc(((W-2*m)*0.40)),w5=Math.trunc(((W-2*m)*0.22)),w6=W-2*m-w4-w5;
  RX[4]=m;
  RY[4]=yb;
  RW[4]=w4;
  RH[4]=botH;
  RX[5]=m+w4+m;
  RY[5]=yb;
  RW[5]=w5;
  RH[5]=botH;
  RX[6]=RX[5]+w5+m;
  RY[6]=yb;
  RW[6]=w6;
  RH[6]=botH;
  RX[7]=y0;
  RH[7]=kpiH;
  RegPanel(RX[2],RY[2],RW[2],RH[2],CL_CY,0);
  RegPanel(RX[3],RY[3],RW[3],RH[3],CL_AU,0);
  RegPanel(RX[4],RY[4],RW[4],RH[4],CL_VI,0);
  RegPanel(RX[5],RY[5],RW[5],RH[5],CL_MG,0);
  RegPanel(RX[6],RY[6],RW[6],RH[6],CL_UP,0);
}
function AnHeader(){
  let x=RX[1],y=RY[1],w=RW[1];
  Panel(x,y,w,RH[1],"",CL_VI);
  let cy=y+8,bh=28,bx=x+14;
  Btn(bx,cy,104,bh,"CALENDAR",CL_CY,gAnView===0,"anv:0",9);
  bx+=110;
  Btn(bx,cy,110,bh,"DASHBOARD",CL_CY,gAnView===1,"anv:1",9);
  bx+=124;
  let s=new MqlDateTime();
  TimeToStruct(gAnD,s);
  Txt(bx,cy+Math.trunc(bh/2),"DATE",CL_MU,8,true,TA_LEFT|TA_VCENTER);
  bx+=40;
  let dd=((s.day<10?"0":""))+IntegerToString(s.day),mm=((s.mon<10?"0":""))+IntegerToString(s.mon),yy=IntegerToString(s.year);
  Btn(bx,cy+2,22,bh-4,"<",CL_AU,false,"and:-1",9);
  bx+=24;
  Txt(bx+14,cy+Math.trunc(bh/2),dd,CL_TX,11,true,TA_CENTER|TA_VCENTER);
  bx+=28;
  Btn(bx,cy+2,22,bh-4,">",CL_AU,false,"and:1",9);
  bx+=26;
  Txt(bx+4,cy+Math.trunc(bh/2),"/",CL_MU,11,true,TA_CENTER|TA_VCENTER);
  bx+=12;
  Btn(bx,cy+2,22,bh-4,"<",CL_AU,false,"anm:-1",9);
  bx+=24;
  Txt(bx+14,cy+Math.trunc(bh/2),mm,CL_TX,11,true,TA_CENTER|TA_VCENTER);
  bx+=28;
  Btn(bx,cy+2,22,bh-4,">",CL_AU,false,"anm:1",9);
  bx+=26;
  Txt(bx+4,cy+Math.trunc(bh/2),"/",CL_MU,11,true,TA_CENTER|TA_VCENTER);
  bx+=12;
  Btn(bx,cy+2,22,bh-4,"<",CL_AU,false,"any:-1",9);
  bx+=24;
  Txt(bx+24,cy+Math.trunc(bh/2),yy,CL_TX,11,true,TA_CENTER|TA_VCENTER);
  bx+=48;
  Btn(bx,cy+2,22,bh-4,">",CL_AU,false,"any:1",9);
  bx+=30;
  Btn(bx,cy,70,bh,"TODAY",CL_VI,false,"antoday",8);
  bx+=84;
  if(gAnView===1) {
    let pn=_AFILL(["DAY","MONTH","YEAR","ALL"],4,"");
    for(let i=0;i<4;i++) {
      Btn(bx,cy,58,bh,pn[i],CL_UP,gAnPer===i,"anp:"+IntegerToString(i),8);
      bx+=62;
    }
  }
  let all=0;
  for(let i=0;i<jN;i++) if(jLive[i]===((gMode===1?1:0))) all++;
  if(x+w-14-bx>150) Txt(x+w-14,cy+Math.trunc(bh/2),((gMode===1?"LIVE":"SIMULATOR"))+" trades: "+IntegerToString(all),CL_MU,8,true,TA_RIGHT|TA_VCENTER);
}
function AnCalendar(){
  let x=RX[2],y=RY[2],w=RW[2],h=RH[2];
  let s=new MqlDateTime();
  TimeToStruct(gAnD,s);
  Panel(x,y,w,h,"",CL_CY);
  Txt(x+18,y+12,MONN[ClampI(s.mon,1,12)-1]+"  "+IntegerToString(s.year),CL_TX,13,true);
  let a=0,b=0;
  (_t107=AnRange(1,a,b),a=_R[0],b=_R[1],_t107);
  let idx=[];
  let n=AnSelect(a,b,idx);
  let ms=new AnStat();
  AnCompute(idx,ms);
  Txt(x+w-16,y+20,"month: "+SMoney(ms.net)+"   "+IntegerToString(ms.n)+" trades   win "+WR(ms.wins,ms.wins+ms.losses),PLC(ms.net),9,true,TA_RIGHT|TA_VCENTER);
  let gx=x+14,gy=y+46,gw=w-28;
  let weekW=74,colW=Math.trunc((gw-weekW)/7),hdrH=20;
  for(let c=0;c<7;c++) Txt(gx+colW*c+Math.trunc(colW/2),gy,DOWN[c],CL_MU,7,true,TA_CENTER);
  Txt(gx+colW*7+Math.trunc(weekW/2),gy,"WEEK",CL_MU,7,true,TA_CENTER);
  let dim=DaysInMonth(s.year,s.mon);
  let dNet=_A(32,()=>0);
  let dN=_A(32,()=>0),dW=_A(32,()=>0),dB=_A(32,()=>0);
  for(let d=0;d<32;d++) {
    dNet[d]=0;
    dN[d]=0;
    dW[d]=0;
    dB[d]=0;
  }
  for(let q=0;q<n;q++) {
    let i=idx[q];
    let d=(Math.trunc((DayStart(jT1[i])-a)/86400))+1;
    if(d<1||d>dim) continue;
    dNet[d]+=jPL[i];
    dN[d]++;
    if(JKind(i)>0) dW[d]++;
    if(JKind(i)===0) dB[d]++;
  }
  let f=new MqlDateTime();
  TimeToStruct(a,f);
  let lead=((f.day_of_week+6)%7);
  let rows=Math.trunc((lead+dim+6)/7);
  let cellH=Math.trunc((h-(gy-y)-hdrH-10)/IMax(1,rows));
  let today=DayStart(TimeCurrent());
  for(let r=0;r<rows;r++) {
    let wNet=0;
    let wN=0;
    for(let c=0;c<7;c++) {
      let dn=r*7+c-lead+1;
      let cx=gx+colW*c,cyy=gy+hdrH+r*cellH,cw=colW-5,ch=cellH-5;
      if(dn<1||dn>dim) {
        cv.RoundFill(cx,cyy,cx+cw,cyy+ch,7,CL_DARK,70);
        continue;
      }
      wNet+=dNet[dn];
      wN+=dN[dn];
      let dd=a+(dn-1)*86400;
      let sel=(dd===gAnD),isT=(dd===today);
      let hov=InRect(gMX,gMY,cx,cyy,cw,ch);
      let fc=(((dN[dn]>0?((dNet[dn]>=0?CL_UP:CL_DN)):CL_DARK))>>>0);
      cv.RoundFill(cx,cyy,cx+cw,cyy+ch,7,fc,(dN[dn]>0?((hov?70:45)):((hov?210:160))));
      cv.RoundBorder(cx,cyy,cx+cw,cyy+ch,7,(sel?CL_AU:((dN[dn]>0?fc:CL_LN))),(sel?255:150),(sel?2.0:1.0));
      Txt(cx+8,cyy+6,IntegerToString(dn),(isT?CL_AU:CL_MU),8,isT);
      if(dN[dn]>0) {
        Txt(cx+Math.trunc(cw/2),cyy+Math.trunc(ch/2)+2,Fit(SMoney(dNet[dn]),(ch>=50?10:8),true,cw-8),PLC(dNet[dn]),(ch>=50?10:8),true,TA_CENTER|TA_VCENTER);
        if(ch>=46) Txt(cx+Math.trunc(cw/2),cyy+ch-10,IntegerToString(dN[dn])+" tr - "+WR(dW[dn],dN[dn]-dB[dn]),CL_MU,7,false,TA_CENTER|TA_VCENTER);
      }
      AddBtn(cx,cyy,cx+cw,cyy+ch,"anday:"+IntegerToString(dn));
    }
    let wx=gx+colW*7,wy=gy+hdrH+r*cellH;
    cv.RoundFill(wx,wy,wx+weekW-5,wy+cellH-5,7,CL_VI,30);
    Txt(wx+8,wy+6,"W"+IntegerToString(r+1),CL_MU,7,true);
    if(wN>0) {
      Txt(wx+Math.trunc((weekW-5)/2),wy+Math.trunc(cellH/2),Fit(SMoney(wNet),9,true,weekW-12),PLC(wNet),9,true,TA_CENTER|TA_VCENTER);
      if(cellH>=50) Txt(wx+Math.trunc((weekW-5)/2),wy+cellH-14,IntegerToString(wN)+" trades",CL_MU,7,false,TA_CENTER|TA_VCENTER);
    }
  }
  let px=RX[3],pw=RW[3];
  Panel(px,y,pw,h,"SELECTED DAY",CL_AU);
  Txt(px+pw-16,y+8,TimeToString(gAnD,TIME_DATE),CL_TX,9,true,TA_RIGHT);
  let d0=gAnD;
  let di=[];
  AnSelect(d0,d0+86400,di);
  let ds=new AnStat();
  AnCompute(di,ds);
  let kw=Math.trunc((pw-36)/2),ky=y+32,kh=58;
  Kpi(px+12,ky,kw,kh,"NET P/L",SMoney(ds.net),PLC(ds.net),IntegerToString(ds.wins)+"W / "+IntegerToString(ds.losses)+"L"+((ds.be>0?" / "+IntegerToString(ds.be)+"BE":"")));
  Kpi(px+24+kw,ky,kw,kh,"TRADES",IntegerToString(ds.n),CL_TX,"win "+WR(ds.wins,ds.wins+ds.losses)+((ds.be>0?"  BE "+IntegerToString(ds.be):"")));
  ky+=kh+8;
  Kpi(px+12,ky,kw,kh,"PROFIT FACTOR",PF(ds),(ds.gp>=ds.gl?CL_UP:CL_DN),"");
  Kpi(px+24+kw,ky,kw,kh,"BEST / WORST",(ds.n>0?SMoney(ds.best):"-"),CL_UP,(ds.n>0?"worst "+SMoney(ds.worst):""));
  ky+=kh+10;
  Btn(px+12,ky,pw-24,26,"OPEN THIS DAY IN THE DASHBOARD",CL_UP,false,"andash",8);
  ky+=36;
  Txt(px+14,ky,"Trades on this day",CL_TX,8,true);
  ky+=20;
  let rowH=24,nvis=IMax(1,Math.trunc((y+h-10-ky)/rowH));
  let nd=ArraySize(di);
  gAnListOff=ClampI(gAnListOff,0,IMax(0,nd-nvis));
  for(let r=0;r<nvis;r++) {
    let q=nd-1-gAnListOff-r;
    if(q<0) break;
    let i=di[q];
    let ry=ky+r*rowH;
    if((r%2)===0) cv.RoundFill(px+8,ry,px+pw-12,ry+rowH-3,5,CL_DARK,120);
    Txt(px+14,ry+Math.trunc((rowH-3)/2),TimeToString(jT1[i],TIME_MINUTES),CL_MU,8,false,TA_LEFT|TA_VCENTER);
    Txt(px+62,ry+Math.trunc((rowH-3)/2),Fit(ShortName(jSym[i]),8,true,pw-200),CL_TX,8,true,TA_LEFT|TA_VCENTER);
    Txt(px+pw-100,ry+Math.trunc((rowH-3)/2),(jDir[i]>0?"BUY":"SELL"),(jDir[i]>0?CL_UP:CL_DN),8,true,TA_LEFT|TA_VCENTER);
    Txt(px+pw-18,ry+Math.trunc((rowH-3)/2),SMoney(jPL[i]),PLC(jPL[i]),8,true,TA_RIGHT|TA_VCENTER);
  }
  ScrollBar(px+pw-7,ky,nvis*rowH,nd,nvis,gAnListOff,CL_AU);
  if(nd===0) Txt(px+Math.trunc(pw/2),ky+20,"No trades closed on this day",CL_MU,8,false,TA_CENTER|TA_VCENTER);
}
function AnDashboard(){
  let a=0,b=0;
  (_t108=AnRange(gAnPer,a,b),a=_R[0],b=_R[1],_t108);
  let idx=[];
  let n=AnSelect(a,b,idx);
  let st=new AnStat();
  AnCompute(idx,st);
  let s=new MqlDateTime();
  TimeToStruct(gAnD,s);
  let per=(gAnPer===0?TimeToString(gAnD,TIME_DATE):((gAnPer===1?MONN[ClampI(s.mon,1,12)-1]+" "+IntegerToString(s.year):((gAnPer===2?"YEAR "+IntegerToString(s.year):"ALL TIME")))));
  let m=10,kx=RX[2],kw=Math.trunc((RW[2]+m+RW[3]-5*m)/6),ky=RX[7],kh=RH[7];
  Kpi(kx,ky,kw,kh,"NET P/L",SMoney(st.net),PLC(st.net),per);
  kx+=kw+m;
  Kpi(kx,ky,kw,kh,"TRADES",IntegerToString(st.n),CL_TX,IntegerToString(st.wins)+"W / "+IntegerToString(st.losses)+"L"+((st.be>0?" / "+IntegerToString(st.be)+"BE":"")));
  kx+=kw+m;
  Kpi(kx,ky,kw,kh,"WIN RATE",WR(st.wins,st.wins+st.losses),((st.wins+st.losses)>0&&st.wins*2>=(st.wins+st.losses)?CL_UP:CL_AU),"BE not counted");
  kx+=kw+m;
  Kpi(kx,ky,kw,kh,"PROFIT FACTOR",PF(st),(st.gp>=st.gl?CL_UP:CL_DN),"GP "+Money(st.gp)+"  GL "+Money(st.gl));
  kx+=kw+m;
  Kpi(kx,ky,kw,kh,"AVG TRADE",(st.n>0?SMoney(st.net/st.n):"-"),PLC(st.net),"lots "+DoubleToString(st.lots,2));
  kx+=kw+m;
  Kpi(kx,ky,kw,kh,"BEST / WORST",(st.n>0?SMoney(st.best):"-"),CL_UP,(st.n>0?"worst "+SMoney(st.worst):""));
  let x=RX[2],y=RY[2],w=RW[2],h=RH[2];
  Panel(x,y,w,h,"PROFIT CURVE - "+per+"  ("+IntegerToString(n)+" trades)",CL_CY);
  let gx=x+64,gy=y+34,gw=w-80,gh=h-50;
  if(n>=1&&gw>40&&gh>20) {
    let cum=0,mn=0,mx=0;
    for(let q=0;q<n;q++) {
      cum+=jPL[idx[q]];
      mn=MathMin(mn,cum);
      mx=MathMax(mx,cum);
    }
    if(mx-mn<0.01) {
      mx+=1;
      mn-=1;
    }
    for(let g=0;g<=4;g++) {
      let ly=gy+Math.trunc(gh*g/4);
      cv.RectA(gx,ly,gx+gw,ly,CL_LN,90);
      Txt(gx-8,ly,Money(mx-(mx-mn)*g/4),CL_MU,7,false,TA_RIGHT|TA_VCENTER);
    }
    let zy=gy+Math.trunc(((mx-0)/(mx-mn)*gh));
    DashH(gx,gx+gw,zy,CL_MU);
    let ox=gx,oy=zy;
    cum=0;
    for(let q=0;q<n;q++) {
      cum+=jPL[idx[q]];
      let X=gx+(+(q+1))/n*gw,Y=gy+(mx-cum)/(mx-mn)*gh;
      let c=(((cum>=0?CL_UP:CL_DN))>>>0);
      cv.RectA(Math.trunc(X),Math.trunc(MathMin(Y,zy)),Math.trunc(X),Math.trunc(MathMax(Y,zy)),c,30);
      cv.LineT(ox,oy,X,Y,2.0,c,255);
      ox=X;
      oy=Y;
    }
    cv.DotA(ox,oy,4,CL_AU,255);
    if(InRect(gMX,gMY,gx,gy,gw,gh)) {
      let q=ClampI(Math.trunc(MathRound((+(gMX-gx))/gw*n))-1,0,n-1);
      let i=idx[q];
      let c2=0;
      for(let k=0;k<=q;k++) c2+=jPL[idx[k]];
      let hx=gx+Math.trunc(((+(q+1))/n*gw)),hy=gy+Math.trunc(((mx-c2)/(mx-mn)*gh));
      cv.RectA(hx,gy,hx,gy+gh,CL_MU,120);
      cv.DotA(hx,hy,4,CL_AU,255);
      let t1=TimeToString(jT1[i],TIME_DATE|TIME_MINUTES)+"  "+ShortName(jSym[i])+((jDir[i]>0?" BUY":" SELL"));
      let t2="trade "+SMoney(jPL[i])+"    total "+SMoney(c2);
      let tw=IMax(TW(t1,8,true),TW(t2,8,true))+24;
      let bx=hx+12;
      if(bx+tw>gx+gw) bx=hx-12-tw;
      let by=IMax(gy,IMin(gy+gh-46,hy-23));
      cv.RoundFill(bx,by,bx+tw,by+46,8,CL_PN,245);
      cv.RoundBorder(bx,by,bx+tw,by+46,8,CL_AU,200,1.0);
      Txt(bx+12,by+14,t1,CL_TX,8,true,TA_LEFT|TA_VCENTER);
      Txt(bx+12,by+32,t2,PLC(jPL[i]),8,true,TA_LEFT|TA_VCENTER);
    }
  }
  else Txt(x+Math.trunc(w/2),y+Math.trunc(h/2),"No closed trades in this period",CL_MU,11,false,TA_CENTER|TA_VCENTER);
  let sx=RX[3],sw=RW[3];
  Panel(sx,y,sw,h,"SUMMARY",CL_AU);
  let sl=_A(12,()=>""),sv=_A(12,()=>"");
  let sc=_A(12,()=>0);
  let gpW=0,glL=0;
  for(let q=0;q<n;q++) {
    let i=idx[q],kd=JKind(i);
    if(kd>0) gpW+=jPL[i];
    else if(kd<0) glL-=jPL[i];
  }
  sl[0]="Gross profit";
  sv[0]=Money(st.gp);
  sc[0]=((CL_UP)>>>0);
  sl[1]="Gross loss";
  sv[1]=Money(st.gl);
  sc[1]=((CL_DN)>>>0);
  sl[2]="Average win";
  sv[2]=(st.wins>0?Money(gpW/st.wins):"-");
  sc[2]=((CL_UP)>>>0);
  sl[3]="Average loss";
  sv[3]=(st.losses>0?Money(glL/st.losses):"-");
  sc[3]=((CL_DN)>>>0);
  sl[4]="Closed by TP / trailing";
  sv[4]=IntegerToString(st.tpN)+" / "+IntegerToString(st.tslN);
  sc[4]=((CL_UP)>>>0);
  sl[5]="Closed by SL / break-even";
  sv[5]=IntegerToString(st.slN)+" / "+IntegerToString(st.beN);
  sc[5]=((CL_DN)>>>0);
  sl[6]="Closed by you";
  sv[6]=IntegerToString(st.manN);
  sc[6]=((CL_TX)>>>0);
  sl[7]="Best win streak";
  sv[7]=IntegerToString(st.maxWs);
  sc[7]=((CL_UP)>>>0);
  sl[8]="Worst loss streak";
  sv[8]=IntegerToString(st.maxLs);
  sc[8]=((CL_DN)>>>0);
  sl[9]="Lots traded";
  sv[9]=DoubleToString(st.lots,2);
  sc[9]=((CL_TX)>>>0);
  sl[10]="Trades per day";
  let days=1;
  if(gAnPer>0&&n>0) {
    let e1=((b<TimeCurrent()?b:TimeCurrent()));
    let s1=((gAnPer===3)?DayStart(jT1[idx[0]]):a);
    days=MathMax(1.0,(+(e1-s1))/86400.0);
  }
  sv[10]=(n>0?DoubleToString(n/days,1):"-");
  sc[10]=((CL_TX)>>>0);
  sl[11]="Break-even trades";
  sv[11]=IntegerToString(st.be);
  sc[11]=((CL_AU)>>>0);
  let ry=y+34,rh=IMax(15,IMin(26,Math.trunc((h-44)/12)));
  for(let i=0;i<12;i++) {
    if(ry+rh>y+h-4) break;
    if((i%2)===0) cv.RoundFill(sx+8,ry,sx+sw-8,ry+rh-2,5,CL_DARK,110);
    Txt(sx+16,ry+Math.trunc((rh-2)/2),sl[i],CL_MU,8,false,TA_LEFT|TA_VCENTER);
    Txt(sx+sw-16,ry+Math.trunc((rh-2)/2),sv[i],sc[i],9,true,TA_RIGHT|TA_VCENTER);
    ry+=rh;
  }
  let bx=RX[4],by=RY[4],bw=RW[4],bh=RH[4];
  Panel(bx,by,bw,bh,"BY SYMBOL - ALL SYMBOLS",CL_VI);
  let us=[];
  let un=[];
  let uc=[],uw=[];
  let nu=0;
  for(let q=0;q<n;q++) {
    let i=idx[q],f=-1;
    for(let k=0;k<nu;k++) if(us[k]===jSym[i]) {
      f=k;
      break;
    }
    if(f<0) {
      nu++;
      ArrayResize(us,nu,()=>"");
      ArrayResize(un,nu,()=>0);
      ArrayResize(uc,nu,()=>0);
      ArrayResize(uw,nu,()=>0);
      f=nu-1;
      us[f]=jSym[i];
      un[f]=0;
      uc[f]=0;
      uw[f]=0;
    }
    un[f]+=jPL[i];
    if(JKind(i)!==0) uc[f]++;
    if(JKind(i)>0) uw[f]++;
  }
  for(let a1=0;a1<nu;a1++) for(let b1=a1+1;b1<nu;b1++) if(un[b1]>un[a1]) {
    let ts=us[a1];
    us[a1]=us[b1];
    us[b1]=ts;
    let tn=un[a1];
    un[a1]=un[b1];
    un[b1]=tn;
    let tc=uc[a1];
    uc[a1]=uc[b1];
    uc[b1]=tc;
    let tw2=uw[a1];
    uw[a1]=uw[b1];
    uw[b1]=tw2;
  }
  let big=0.01;
  for(let k=0;k<nu;k++) big=MathMax(big,MathAbs(un[k]));
  let rr=by+32,rrh=IMax(16,IMin(24,Math.trunc((bh-40)/IMax(1,nu))));
  for(let k=0;k<nu;k++) {
    if(rr+rrh>by+bh-6) {
      Txt(bx+bw-14,by+8,"+"+IntegerToString(nu-k)+" more",CL_MU,8,false,TA_RIGHT);
      break;
    }
    let cy=rr+Math.trunc(rrh/2);
    Txt(bx+14,cy,Fit(ShortName(us[k]),8,true,100),CL_TX,8,true,TA_LEFT|TA_VCENTER);
    Txt(bx+120,cy,IntegerToString(uc[k])+" tr  "+WR(uw[k],uc[k]),CL_MU,7,false,TA_LEFT|TA_VCENTER);
    let barX=bx+200,barW=bw-200-90;
    if(barW>20) {
      cv.RoundFill(barX,cy-3,barX+barW,cy+3,3,CL_DARK,200);
      cv.RoundFill(barX,cy-3,barX+Math.trunc((barW*MathAbs(un[k])/big)),cy+3,3,PLC(un[k]),230);
    }
    Txt(bx+bw-14,cy,SMoney(un[k]),PLC(un[k]),8,true,TA_RIGHT|TA_VCENTER);
    rr+=rrh;
  }
  if(nu===0) Txt(bx+Math.trunc(bw/2),by+Math.trunc(bh/2),"-",CL_MU,10,false,TA_CENTER|TA_VCENTER);
  let vx=RX[5],vw=RW[5];
  Panel(vx,by,vw,bh,"BUY vs SELL",CL_MG);
  let hh=Math.trunc((bh-44)/2);
  for(let k=0;k<2;k++) {
    let yy=by+32+k*(hh+4);
    let c=(k===0?st.buys:st.sells),wv=(k===0?st.bWins:st.sWins);
    let nv=(k===0?st.bNet:st.sNet);
    let col=(((k===0?CL_UP:CL_DN))>>>0);
    cv.RoundFill(vx+10,yy,vx+vw-10,yy+hh,8,col,26);
    cv.RoundBorder(vx+10,yy,vx+vw-10,yy+hh,8,col,140,1.0);
    Txt(vx+20,yy+Math.trunc(hh/2)-((hh>=44?8:0)),(k===0?"BUY":"SELL"),col,10,true,TA_LEFT|TA_VCENTER);
    if(hh>=44) Txt(vx+20,yy+Math.trunc(hh/2)+10,IntegerToString(c)+" tr  win "+WR(wv,c),CL_MU,7,false,TA_LEFT|TA_VCENTER);
    Txt(vx+vw-20,yy+Math.trunc(hh/2),SMoney(nv),PLC(nv),10,true,TA_RIGHT|TA_VCENTER);
  }
  let hx=RX[6],hw=RW[6];
  Panel(hx,by,hw,bh,"BY HOUR OF THE DAY",CL_UP);
  let hn=_A(24,()=>0);
  for(let k=0;k<24;k++) hn[k]=0;
  for(let q=0;q<n;q++) {
    let t=new MqlDateTime();
    TimeToStruct(jT1[idx[q]],t);
    hn[t.hour]+=jPL[idx[q]];
  }
  let hb=0.01;
  for(let k=0;k<24;k++) hb=MathMax(hb,MathAbs(hn[k]));
  let ax=hx+14,aw=hw-28,ay=by+34,ah=bh-58,mid=ay+Math.trunc(ah/2);
  cv.RectA(ax,mid,ax+aw,mid,CL_LN,200);
  let cwid=(+aw)/24;
  for(let k=0;k<24;k++) {
    if(hn[k]===0) continue;
    let x1=ax+Math.trunc((k*cwid))+1,x2=ax+Math.trunc(((k+1)*cwid))-2;
    let hgt=Math.trunc(((Math.trunc(ah/2)-4)*MathAbs(hn[k])/hb));
    if(hn[k]>0) cv.RoundFill(x1,mid-hgt,x2,mid,2,CL_UP,230);
    else cv.RoundFill(x1,mid,x2,mid+hgt,2,CL_DN,230);
  }
  for(let k=0;k<24;k+=3) Txt(ax+Math.trunc(((k+0.5)*cwid)),by+bh-14,IntegerToString(k),CL_MU,7,false,TA_CENTER|TA_VCENTER);
}
function DrawAnalyzer(){
  AnFix();
  AnHeader();
  if(gAnView===0) AnCalendar();
  else AnDashboard();
}
function ChatAdd(who,tx){
  if(tx==="") return;
  if(chN>=MAXCHAT) {
    for(let i=0;i<MAXCHAT-1;i++) {
      chTx[i]=chTx[i+1];
      chWho[i]=chWho[i+1];
      chT[i]=chT[i+1];
    }
    chN--;
  }
  chTx[chN]=tx;
  chWho[chN]=who;
  chT[chN]=TimeLocal();
  chN++;
  if(gChatOff>0) gChatOff++;
}
function NormName(s){
  let r=s;
  (_t109=StringToUpper(r),r=_R[0],_t109);
  let o="";
  for(let i=0;i<StringLen(r);i++) {
    let c=StringGetCharacter(r,i);
    if((c>=65&&c<=90)||(c>=48&&c<=57)) o+=ShortToString(c);
  }
  (_t110=StringReplace(o,"VOLATILITY","V"),o=_R[0],_t110);
  (_t111=StringReplace(o,"INDEX",""),o=_R[0],_t111);
  return o;
}
function SymFind(q){
  let u=q;
  (_t112=StringToLower(u),u=_R[0],_t112);
  (_t113=StringTrimLeft(u),u=_R[0],_t113);
  (_t114=StringTrimRight(u),u=_R[0],_t114);
  if(u===""||u==="all"||u==="*"||u==="every"||u==="all symbols") return -2;
  let n=NormName(q);
  if(n==="") return -1;
  for(let i=0;i<gNS;i++) if(NormName(gSym[i])===n||NormName(gShort[i])===n) return i;
  for(let i=0;i<gNS;i++) if(StringFind(NormName(gSym[i]),n)===0) return i;
  for(let i=0;i<gNS;i++) if(StringFind(NormName(gSym[i]),n)>=0) return i;
  return -1;
}
function SymTargets(node,out){
  ArrayResize(out,0,()=>0);
  let n=0;
  if(node<0) return 0;
  if(jsT[node]===JS_ARR) {
    for(let k=0;k<JLen(node);k++) {
      let si=SymFind(JStr(JAt(node,k)));
      if(si===-2) {
        ArrayResize(out,gNS,()=>0);
        for(let i=0;i<gNS;i++) out[i]=i;
        return gNS;
      }
      if(si>=0) {
        let dup=false;
        for(let j=0;j<n;j++) if(out[j]===si) dup=true;
        if(!dup) {
          ArrayResize(out,n+1,()=>0);
          out[n]=si;
          n++;
        }
      }
    }
    return n;
  }
  let q=JStr(node);
  if(StringFind(q,",")>0) {
    let parts=[];
    let pn=StringSplit(q,44,parts);
    for(let k=0;k<pn;k++) {
      let si=SymFind(parts[k]);
      if(si>=0) {
        ArrayResize(out,n+1,()=>0);
        out[n]=si;
        n++;
      }
    }
    return n;
  }
  let si=SymFind(q);
  if(si===-2) {
    ArrayResize(out,gNS,()=>0);
    for(let i=0;i<gNS;i++) out[i]=i;
    return gNS;
  }
  if(si>=0) {
    ArrayResize(out,1,()=>0);
    out[0]=si;
    return 1;
  }
  return 0;
}
function TfFrom(v,def){
  let u=v;
  (_t115=StringToUpper(u),u=_R[0],_t115);
  for(let i=0;i<NTF;i++) if(TFN[i]===u) return i;
  return def;
}
function EntryFrom(v,def){
  let u=v;
  (_t116=StringToLower(u),u=_R[0],_t116);
  if(u==="ma"||u==="ma cross"||u==="macross") return E_MA;
  if(u==="rsi") return E_RSI;
  if(u==="macd") return E_MACD;
  if(u==="breakout"||u==="brk") return E_BRK;
  if(u==="bb_bounce"||u==="bollinger bounce") return E_BBB;
  if(u==="bb_break"||u==="bollinger break") return E_BBX;
  if(u==="stoch"||u==="stochastic") return E_STO;
  if(u==="cci") return E_CCI;
  if(u==="sar") return E_SAR;
  if(u==="adx"||u==="dmi") return E_ADX;
  if(u==="rule"||u==="ai rule"||u==="custom") return E_RULE;
  if(u==="wma_smma"||u==="wma smma"||u==="wma x smma"||u==="ma_sl"||u==="ma candle sl") return E_WSM;
  return def;
}
function MaFrom(v,def){
  let u=v;
  (_t117=StringToUpper(u),u=_R[0],_t117);
  if(u==="LWMA") return 3;
  for(let i=0;i<4;i++) if(MAN[i]===u) return i;
  return def;
}
function EntryKey(e){
  let k=_AFILL(["ma","rsi","macd","breakout","bb_bounce","bb_break","stoch","cci","sar","adx","rule","wma_smma"],NENTRY,"");
  return k[ClampI(e,0,NENTRY-1)];
}
function ApplySetupChanges(s,rb,rs,ch){
  let d="";
  for(let c=jsFirst[ch];c>=0;c=jsNext[c]) {
    let k=jsK[c],v=JStr(c);
    if(k==="on") s.on=JBool(c,s.on);
    else if(k==="tf") s.tf=TfFrom(v,s.tf);
    else if(k==="entry") {
      let e=EntryFrom(v,s.entry);
      if(e!==s.entry) {
        s.entry=e;
        DefaultParams(s);
      }
    }
    else if(k==="dir") {
      let u=v;
      (_t118=StringToLower(u),u=_R[0],_t118);
      s.dir=((u==="buy"||u==="buy only")?1:(((u==="sell"||u==="sell only")?2:0)));
    }
    else if(k==="p1") s.p1=Math.trunc(JNum(c,s.p1));
    else if(k==="p2") s.p2=Math.trunc(JNum(c,s.p2));
    else if(k==="p3") s.p3=Math.trunc(JNum(c,s.p3));
    else if(k==="lv1") s.lv1=JNum(c,s.lv1);
    else if(k==="lv2") s.lv2=JNum(c,s.lv2);
    else if(k==="ma") s.ma=MaFrom(v,s.ma);
    else if(k==="ma2") s.lv2=(+MaFrom(v,Math.trunc(MathRound(s.lv2))));
    else if(k==="trend") s.trend=JBool(c,s.trend);
    else if(k==="trendP") s.trendP=Math.trunc(JNum(c,s.trendP));
    else if(k==="slMode") {
      let u=v;
      (_t119=StringToLower(u),u=_R[0],_t119);
      s.slMode=((u==="usd"||u==="$"||u==="money")?0:(((u==="points"||u==="pts")?1:(((u==="atr")?2:s.slMode)))));
    }
    else if(k==="sl") s.sl=JNum(c,s.sl);
    else if(k==="tp") s.tp=JNum(c,s.tp);
    else if(k==="lotMode") {
      let u=v;
      (_t120=StringToLower(u),u=_R[0],_t120);
      s.lotMode=((u==="risk"||u==="risk%")?1:0);
    }
    else if(k==="lot") s.lot=JNum(c,s.lot);
    else if(k==="risk") s.risk=JNum(c,s.risk);
    else if(k==="be") s.be=JBool(c,s.be);
    else if(k==="beAt") s.beAt=JNum(c,s.beAt);
    else if(k==="trail") s.trail=JBool(c,s.trail);
    else if(k==="trStart") s.trStart=JNum(c,s.trStart);
    else if(k==="trDist") s.trDist=JNum(c,s.trDist);
    else if(k==="htfOn") s.htfOn=JBool(c,s.htfOn);
    else if(k==="htf") s.htf=TfFrom(v,s.htf);
    else if(k==="htfType") {
      let u=v;
      (_t121=StringToLower(u),u=_R[0],_t121);
      let hk=_AFILL(["ma","ema","macd","rsi","sar","dmi"],NHT,"");
      for(let i=0;i<NHT;i++) if(hk[i]===u) s.htfType=i;
    }
    else if(k==="hp1") s.hp1=Math.trunc(JNum(c,s.hp1));
    else if(k==="hp2") s.hp2=Math.trunc(JNum(c,s.hp2));
    else if(k==="hma") s.hma=MaFrom(v,s.hma);
    else if(k==="cwMode") {
      let u=v;
      (_t122=StringToLower(u),u=_R[0],_t122);
      s.cwMode=((u==="candles")?1:(((u==="minutes")?2:(((u==="pullback")?3:0)))));
    }
    else if(k==="cwN") s.cwN=Math.trunc(JNum(c,s.cwN));
    else if(k==="cwPull") s.cwPull=JNum(c,s.cwPull);
    else if(k==="buyRule") rb=v;
    else if(k==="sellRule") rs=v;
    else continue;
    d+=((d===""?"":", "))+k+"="+((StringLen(v)>40?StringSubstr(v,0,40)+"..":v));
  }
  ClampSetup(s);
  { const _rv=d; _R=[rb,rs]; return _rv; }
  _R=[rb,rs];
}
function ActType(a){
  let t=JGS(a,"type");
  (_t123=StringToLower(t),t=_R[0],_t123);
  return t;
}
function NeedApproval(a,src){
  let t=ActType(a);
  if(t==="show_tab"||t==="replay"||t==="watch"||t==="report"||t==="test"||t==="language"||t==="screenshot"||t==="chart_image") return false;
  if(gAskAll) return true;
  if(t==="open"||t==="setup"||t==="run") return true;
  if(t==="mode") {
    let to=JGS(a,"to");
    (_t124=StringToLower(to),to=_R[0],_t124);
    return to==="live";
  }
  if(t==="set_sl") {
    let sn=JGet(a,"symbol");
    let sd=JGS(a,"side","all");
    (_t125=StringToLower(sd),sd=_R[0],_t125);
    for(let k=0;k<gTN;k++) if(TradeMatches(k,sn,sd,"any")) {
      let ns=TargetSL(k,a);
      if(ns>0&&(gT[k].sl===0||((gT[k].dir>0?ns<gT[k].sl:ns>gT[k].sl)))) return true;
    }
    return false;
  }
  if(t==="risk") {
    if(JGB(a,"unlock",false)) return true;
    if(JHas(a,"dayLossOn")&&!JGB(a,"dayLossOn")&&gdLossOn) return true;
    if(JHas(a,"dayLoss")&&JGN(a,"dayLoss")>gdLoss&&gdLossOn) return true;
    if(JHas(a,"ddOn")&&!JGB(a,"ddOn")&&gdDdOn) return true;
    if(JHas(a,"ddPct")&&JGN(a,"ddPct")>gdDd) return true;
    if(JHas(a,"coolOn")&&!JGB(a,"coolOn")&&gdCoolOn) return true;
    if(JHas(a,"smartOn")&&!JGB(a,"smartOn")&&gdSmartOn) return true;
    if(JHas(a,"maxDayOn")&&!JGB(a,"maxDayOn")&&gdMaxOn) return true;
    if(JHas(a,"maxDay")&&JGN(a,"maxDay")>gdMax&&gdMaxOn) return true;
    if(JHas(a,"dayLossUnit")) return true;
    if(JHas(a,"smartCut")&&JGN(a,"smartCut")>gdSmartCut&&gdSmartOn) return true;
    if(JHas(a,"smartAfter")&&JGN(a,"smartAfter")>gdSmartN&&gdSmartOn) return true;
    if(JHas(a,"coolMin")&&JGN(a,"coolMin")<gdCoolMin&&gdCoolOn) return true;
    let tg=[];
    let n=SymTargets(JGet(a,"scope"),tg);
    for(let q=0;q<n;q++) {
      let si=tg[q];
      if(JHas(a,"symLoss")&&gsLoss[si]>0&&(JGN(a,"symLoss")<=0||JGN(a,"symLoss")>gsLoss[si])) return true;
      if(JHas(a,"symMax")&&gsMax[si]>0&&(JGN(a,"symMax")<=0||JGN(a,"symMax")>gsMax[si])) return true;
    }
    return false;
  }
  return false;
}
function DistFrom(k,a){
  let si=gT[k].si;
  if(JHas(a,"points")) return JGN(a,"points")*Pt(si);
  if(JHas(a,"usd")) {
    let v=ValPerPrice(si,gT[k].lot);
    return (v>0?JGN(a,"usd")/v:0);
  }
  return 0;
}
function TargetSL(k,a){
  if(JHas(a,"price")) return JGN(a,"price");
  let d=DistFrom(k,a);
  if(d<=0) return 0;
  return gT[k].entry-gT[k].dir*d;
}
function TargetTP(k,a){
  if(JHas(a,"price")) return JGN(a,"price");
  let d=DistFrom(k,a);
  if(d<=0) return 0;
  return gT[k].entry+gT[k].dir*d;
}
function TradeMatches(k,symNode,side,only){
  if(!gT[k].open||gT[k].live!==(gMode===1)||gT[k].si<0) return false;
  let tg=[];
  let n=SymTargets(symNode,tg);
  if(symNode>=0&&n===0) return false;
  if(n>0) {
    let f=false;
    for(let q=0;q<n;q++) if(tg[q]===gT[k].si) f=true;
    if(!f) return false;
  }
  if(side==="buy"&&gT[k].dir<0) return false;
  if(side==="sell"&&gT[k].dir>0) return false;
  if(only==="profit"&&gT[k].pl<=0) return false;
  if(only==="loss"&&gT[k].pl>=0) return false;
  return true;
}
function ActDescribe(a){
  let t=ActType(a);
  if(t==="setup") {
    let tmp=new Setup();
    tmp._zm();
    DefaultSetup(tmp);
    let rb="",rs="";
    let tg=[];
    let n=SymTargets(JGet(a,"symbols"),tg);
    if(n===0) n=SymTargets(JGet(a,"symbol"),tg);
    let names="";
    for(let q=0;q<n&&q<6;q++) names+=((q?", ":""))+gShort[tg[q]];
    if(n>6) names+=" +"+IntegerToString(n-6);
    if(n>0) {
      tmp=_cp(gSet[tg[0]]);
      rb=gRuleB[tg[0]];
      rs=gRuleS[tg[0]];
    }
    let ch=JGet(a,"changes");
    let d=((ch>=0)?(_t126=ApplySetupChanges(tmp,rb,rs,ch),rb=_R[0],rs=_R[1],_t126):"");
    return "SETUP "+((names===""?"(no symbol)":names))+": "+d;
  }
  if(t==="open") return "OPEN "+StringSubstr(JGS(a,"side"),0,4)+" "+JGS(a,"symbol")+((JHas(a,"lot")?" lot "+JGS(a,"lot"):""));
  if(t==="mode") return "SWITCH TO "+JGS(a,"to");
  if(t==="risk") return "ACCOUNT GUARD "+JGS(a,"scope","global")+": "+StringSubstr(JDump(a),0,120);
  if(t==="set_sl") return "MOVE SL "+JGS(a,"symbol")+" further away";
  return StringSubstr(JDump(a),0,120);
}
function ExecAction(a,src){
  let t=ActType(a);
  if(t==="show_tab") {
    let tab=JGS(a,"tab");
    (_t127=StringToLower(tab),tab=_R[0],_t127);
    if(tab==="dashboard") gTab=0;
    else if(tab==="live"||tab==="live trades") gTab=1;
    else if(tab==="history") gTab=2;
    else if(tab==="analyzer"||tab==="data analyzer"||tab==="calendar") {
      gTab=4;
      if(tab==="calendar") gAnView=0;
    }
    else if(tab==="chat"||tab==="ai chat") gTab=5;
    else if(tab==="settings") {
      gTab=3;
      gSetView=0;
    }
    else if(tab==="guard"||tab==="account guard") {
      gTab=3;
      gSetView=1;
    }
    else if(tab==="ai"||tab==="telegram") {
      gTab=3;
      gSetView=2;
    }
    let vw=JGS(a,"view");
    (_t128=StringToLower(vw),vw=_R[0],_t128);
    if(vw==="calendar") gAnView=0;
    if(vw==="dashboard") gAnView=1;
    let pr=JGS(a,"period");
    (_t129=StringToLower(pr),pr=_R[0],_t129);
    if(pr==="day") gAnPer=0;
    if(pr==="month") gAnPer=1;
    if(pr==="year") gAnPer=2;
    if(pr==="all") gAnPer=3;
    let dt=JGS(a,"date");
    if(dt!=="") {
      (_t130=StringReplace(dt,"-","."),dt=_R[0],_t130);
      let d=StringToTime(dt);
      if(d>0) gAnD=DayStart(d);
    }
    if(gTab!==3) ClosePicker();
    return "showing "+tab;
  }
  if(t==="replay"||t==="watch") {
    let si=SymFind(JGS(a,"symbol"));
    if(t==="watch"||si<0) {
      for(let k=gTN-1;k>=0;k--) if(gT[k].open&&gT[k].live===(gMode===1)&&(si<0||gT[k].si===si)) {
        gFocus=k;
        gTab=1;
        gAuto=false;
        return "watching "+gShort[gT[k].si]+" live";
      }
      if(t==="watch") return "no open trade"+((si>=0?" on "+gShort[si]:""));
    }
    for(let k=gTN-1;k>=0;k--) if(!gT[k].open&&gT[k].live===(gMode===1)&&gT[k].si>=0&&(si<0||gT[k].si===si)) {
      gHistSel=k;
      gTab=2;
      gReplayProg=0;
      return "replaying the last "+gShort[gT[k].si]+" trade";
    }
    return "no closed trade"+((si>=0?" on "+gShort[si]:""))+" to replay";
  }
  if(t==="language") {
    let c=JGS(a,"lang"),nm=JGS(a,"name");
    if(c==="") return "which language?";
    LangSet(c,nm);
    return "panel language: "+((nm!==""?nm:c));
  }
  if(t==="screenshot") {
    let tab=JGS(a,"tab");
    (_t131=StringToLower(tab),tab=_R[0],_t131);
    if(src!=="telegram") return "";
    MenuCmd("shot:"+tab);
    return "";
  }
  if(t==="chart_image") {
    let si=SymFind(JGS(a,"symbol"));
    let k=-1;
    for(let i=gTN-1;i>=0&&k<0;i--) if(gT[i].open&&gT[i].live===(gMode===1)&&(si<0||gT[i].si===si)) k=i;
    for(let i=gTN-1;i>=0&&k<0;i--) if(!gT[i].open&&gT[i].live===(gMode===1)&&gT[i].si>=0&&(si<0||gT[i].si===si)) k=i;
    if(k<0) return "no trade to show";
    if(src==="telegram") {
      TradeShot(k,TradeTitle(k)+"  P/L "+Money(gT[k].pl));
      return "chart picture sent";
    }
    if(gT[k].open) {
      gFocus=k;
      gTab=1;
      gAuto=false;
    }
    else {
      gHistSel=k;
      gTab=2;
      gReplayProg=0;
    }
    return "showing the chart";
  }
  if(t==="pause") {
    gRun=false;
    Log("Paused by "+src,CL_AU);
    return "paused - open trades are still managed";
  }
  if(t==="run") {
    gRun=true;
    Log("Running ("+src+")",CL_AU);
    return "running - looking for entries";
  }
  if(t==="mode") {
    let to=JGS(a,"to");
    (_t132=StringToLower(to),to=_R[0],_t132);
    if(to==="live") {
      if(gMode===1) return "already LIVE";
      GoLive();
      return (gMode===1?"LIVE mode on":"LIVE is off in the EA inputs");
    }
    if(gMode===0) return "already SIMULATOR";
    SwitchMode(0);
    return "SIMULATOR mode on";
  }
  if(t==="close") {
    let side=JGS(a,"side","all"),only=JGS(a,"only","any");
    (_t133=StringToLower(side),side=_R[0],_t133);
    (_t134=StringToLower(only),only=_R[0],_t134);
    let sn=JGet(a,"symbol");
    if(sn>=0&&jsT[sn]===JS_STR&&SymFind(JStr(sn))===-2) sn=-1;
    let n=0;
    let sum=0;
    for(let k=gTN-1;k>=0;k--) if(TradeMatches(k,sn,side,only)) {
      sum+=gT[k].pl;
      if(CloseTrade(k)) n++;
    }
    return (n>0?"closed "+IntegerToString(n)+" trade(s), about "+Money(sum):"no matching open trade");
  }
  if(t==="breakeven") {
    let sn=JGet(a,"symbol");
    if(sn>=0&&jsT[sn]===JS_STR&&SymFind(JStr(sn))===-2) sn=-1;
    let n=0,skip=0;
    for(let k=0;k<gTN;k++) {
      if(!TradeMatches(k,sn,"all","any")) continue;
      let si=gT[k].si;
      let off=(JHas(a,"offset_points")?JGN(a,"offset_points")*Pt(si):((JHas(a,"offset_usd")?JGN(a,"offset_usd")/MathMax(1e-12,ValPerPrice(si,gT[k].lot)):2*Pt(si))));
      let ns=gT[k].entry+gT[k].dir*off;
      if(gT[k].sl!==0&&((gT[k].dir>0?ns<=gT[k].sl:ns>=gT[k].sl))) {
        skip++;
        continue;
      }
      if(ModifyTrade(k,ns,gT[k].tp)) n++;
      else skip++;
    }
    return "break-even on "+IntegerToString(n)+" trade(s)"+((skip>0?", "+IntegerToString(skip)+" not possible yet (price too close or SL already better)":""));
  }
  if(t==="trailing") {
    let tg=[];
    let n=SymTargets(JGet(a,"symbol"),tg);
    if(n===0) n=SymTargets(JGet(a,"symbols"),tg);
    let on=JGB(a,"on",true);
    for(let q=0;q<n;q++) {
      let si=tg[q];
      gSet[si].trail=on;
      if(JHas(a,"start_pct")) gSet[si].trStart=Clamp(JGN(a,"start_pct"),5,100);
      if(JHas(a,"dist_pct")) gSet[si].trDist=Clamp(JGN(a,"dist_pct"),5,200);
    }
    if(n>0) {
      SaveAll();
      if(gSelSym<gNS) {
        gEdit=_cp(gSet[gSelSym]);
        gDirty=false;
      }
    }
    return "trailing "+((on?"ON":"OFF"))+" on "+IntegerToString(n)+" symbol(s)";
  }
  if(t==="set_sl"||t==="set_tp") {
    let sn=JGet(a,"symbol");
    if(sn>=0&&jsT[sn]===JS_STR&&SymFind(JStr(sn))===-2) sn=-1;
    let n=0;
    for(let k=0;k<gTN;k++) {
      let sdx=JGS(a,"side","all");
      (_t135=StringToLower(sdx),sdx=_R[0],_t135);
      if(!TradeMatches(k,sn,sdx,"any")) continue;
      let v=((t==="set_sl")?TargetSL(k,a):TargetTP(k,a));
      if(v<=0) continue;
      if((t==="set_sl"?ModifyTrade(k,v,gT[k].tp):ModifyTrade(k,gT[k].sl,v))) n++;
    }
    return ((t==="set_sl"?"SL":"TP"))+" changed on "+IntegerToString(n)+" trade(s)";
  }
  if(t==="setup") {
    let tg=[];
    let n=SymTargets(JGet(a,"symbols"),tg);
    if(n===0) n=SymTargets(JGet(a,"symbol"),tg);
    let ch=JGet(a,"changes");
    if(n===0||ch<0) return "setup: no symbol or no changes";
    let d="",err="";
    for(let q=0;q<n;q++) {
      let si=tg[q];
      let s=_cp(gSet[si]);
      let rb=gRuleB[si],rs=gRuleS[si];
      d=(_t136=ApplySetupChanges(s,rb,rs,ch),rb=_R[0],rs=_R[1],_t136);
      let e1=RuleCheck(rb),e2=RuleCheck(rs);
      if(e1!==""||e2!=="") {
        err=gShort[si]+" rule error: "+((e1!==""?e1:e2));
        continue;
      }
      if(gAvail[si]&&s.lot<MinLot(si)) s.lot=MinLot(si);
      gSet[si]=_cp(s);
      gRuleB[si]=rb;
      gRuleS[si]=rs;
      gPend[si]=0;
      gSt[si]=0;
    }
    RuleCompileAll();
    for(let q=0;q<n;q++) MakeHandles(tg[q]);
    SaveAll();
    if(gSelSym<gNS) {
      gEdit=_cp(gSet[gSelSym]);
      gEditRB=gRuleB[gSelSym];
      gEditRS=gRuleS[gSelSym];
      gDirty=false;
    }
    Log("AI setup applied to "+IntegerToString(n)+" symbol(s): "+d,CL_UP);
    return ((err!==""?err+". ":""))+"setup saved on "+IntegerToString(n)+" symbol(s)";
  }
  if(t==="risk") {
    let scn=JGet(a,"scope");
    let scl=((scn>=0&&jsT[scn]===JS_STR)?JStr(scn):"");
    (_t137=StringToLower(scl),scl=_R[0],_t137);
    let global=(scn<0||(jsT[scn]===JS_STR&&(scl==="global"||scl==="account"||scl==="")));
    {
      if(JHas(a,"dayLossOn")) gdLossOn=JGB(a,"dayLossOn");
      if(JHas(a,"dayLoss")) {
        gdLoss=Clamp(JGN(a,"dayLoss"),0.1,100000);
        gdLossOn=true;
      }
      if(JHas(a,"dayLossUnit")) {
        let u=JGS(a,"dayLossUnit");
        (_t138=StringToLower(u),u=_R[0],_t138);
        gdLossPct=(u==="pct"||u==="%"||u==="percent");
      }
      if(JHas(a,"dayProfitOn")) gdProfOn=JGB(a,"dayProfitOn");
      if(JHas(a,"dayProfit")) {
        gdProf=Clamp(JGN(a,"dayProfit"),0.1,100000);
        gdProfOn=true;
      }
      if(JHas(a,"dayProfitUnit")) {
        let u=JGS(a,"dayProfitUnit");
        (_t139=StringToLower(u),u=_R[0],_t139);
        gdProfPct=(u==="pct"||u==="%"||u==="percent");
      }
      if(JHas(a,"ddOn")) gdDdOn=JGB(a,"ddOn");
      if(JHas(a,"ddPct")) {
        gdDd=Clamp(JGN(a,"ddPct"),1,95);
        gdDdOn=true;
      }
      if(JHas(a,"smartOn")) gdSmartOn=JGB(a,"smartOn");
      if(JHas(a,"smartAfter")) gdSmartN=ClampI(Math.trunc(JGN(a,"smartAfter")),1,20);
      if(JHas(a,"smartCut")) gdSmartCut=Clamp(JGN(a,"smartCut"),5,100);
      if(JHas(a,"coolOn")) gdCoolOn=JGB(a,"coolOn");
      if(JHas(a,"coolMin")) {
        gdCoolMin=ClampI(Math.trunc(JGN(a,"coolMin")),1,1440);
        gdCoolOn=true;
      }
      if(JHas(a,"maxDayOn")) gdMaxOn=JGB(a,"maxDayOn");
      if(JHas(a,"maxDay")) {
        gdMax=ClampI(Math.trunc(JGN(a,"maxDay")),1,500);
        gdMaxOn=true;
      }
      if(global&&JGB(a,"unlock",false)) {
        gdLock=false;
        gdLockWhy="";
        for(let i=0;i<NSYM;i++) {
          gsLock[i]=false;
          gsLockWhy[i]="";
        }
        gdPeak=Equity();
      }
    }
    let tg=[];
    let n=(global?0:SymTargets(JGet(a,"scope"),tg));
    for(let q=0;q<n;q++) {
      let si=tg[q];
      if(JHas(a,"symLoss")) gsLoss[si]=MathMax(0,JGN(a,"symLoss"));
      if(JHas(a,"symProfit")) gsProf[si]=MathMax(0,JGN(a,"symProfit"));
      if(JHas(a,"symMax")) gsMax[si]=Math.trunc(MathMax(0,JGN(a,"symMax")));
      if(JGB(a,"unlock",false)) {
        gsLock[si]=false;
        gsLockWhy[si]="";
      }
    }
    GuardSave();
    return "account guard updated"+((global?"":" for "+IntegerToString(n)+" symbol(s)"));
  }
  if(t==="open") {
    let si=SymFind(JGS(a,"symbol"));
    if(si<0) return "open: symbol not found";
    let side=JGS(a,"side");
    (_t140=StringToLower(side),side=_R[0],_t140);
    let dir=((side==="sell")?-1:1);
    let no=GuardCheck(si);
    if(no!=="") return "not opened: "+no;
    gLotOverride=(JHas(a,"lot")?JGN(a,"lot"):0);
    let ok=OpenTrade(si,dir,"opened on your command ("+src+")");
    gLotOverride=0;
    return (ok?((side==="sell"?"SELL ":"BUY "))+gShort[si]+" opened":"order was not opened (see the log)");
  }
  if(t==="add_symbol") {
    let q=JGS(a,"symbol");
    if(ArraySize(gAll)===0) BuildCatalog();
    let nq=NormName(q);
    let best=-1;
    if(nq==="") return "which symbol?";
    for(let i=0;i<ArraySize(gAll);i++) if(NormName(gAll[i])===nq) {
      best=i;
      break;
    }
    if(best<0) for(let i=0;i<ArraySize(gAll);i++) if(StringFind(NormName(gAll[i]),nq)>=0) {
      best=i;
      break;
    }
    if(best<0) return "no symbol like "+q+" in this account";
    if(!AddSymbol(gAll[best])) return "could not add "+gAll[best];
    gSet[gNS-1].on=false;
    SaveAll();
    return "added "+gAll[best]+" (switched off until you give it a setup)";
  }
  if(t==="remove_symbol") {
    let si=SymFind(JGS(a,"symbol"));
    if(si<0) return "symbol not found";
    let nm=gShort[si];
    return (RemoveSymbol(si)?"removed "+nm:"not removed (open trade?)");
  }
  if(t==="test") {
    let tg=[];
    let n=SymTargets(JGet(a,"symbols"),tg);
    if(n===0) n=SymTargets(JGet(a,"symbol"),tg);
    let bars=ClampI(Math.trunc(JGN(a,"bars",1000)),100,5000);
    let r="";
    for(let q=0;q<n&&q<8;q++) {
      let net=0;
      let tr=0;
      let wr=0;
      r+=((r===""?"":"\n"))+(_t141=BacktestNow(tg[q],bars,net,tr,wr),net=_R[0],tr=_R[1],wr=_R[2],_t141);
    }
    return (r===""?"test: no symbol":"TEST "+r);
  }
  if(t==="report") return ReportText(JGS(a,"kind","today"));
  if(t==="indicator_code") {
    let nm=JGS(a,"name","GTM_AI_Indicator"),code=JGS(a,"code");
    if(code==="") return "no code";
    let fn="GTM_AI\\indicators\\"+nm+".mq5";
    FWriteUtf8(fn,code);
    return "indicator code saved: MQL5\\Files\\"+fn+" - copy it to MQL5\\Indicators, compile with F7, then use CUSTOM(\""+nm+"\",0) in a rule";
  }
  return "";
}
function ReportText(kind){
  let k=kind;
  (_t142=StringToLower(k),k=_R[0],_t142);
  let lv=((gMode===1?1:0));
  if(k==="open") {
    let r="";
    let n=0;
    let f=0;
    for(let i=0;i<gTN;i++) if(gT[i].open&&gT[i].live===(gMode===1)&&gT[i].si>=0) {
      n++;
      f+=gT[i].pl;
      r+="\n"+gShort[gT[i].si]+" "+((gT[i].dir>0?"BUY":"SELL"))+" "+Money(gT[i].pl)+((gT[i].safe?" (safe)":""));
    }
    return IntegerToString(n)+" open trade(s), floating "+Money(f)+r;
  }
  if(k==="guard") return GuardSummary();
  let from=DayStart(TimeCurrent());
  if(k==="week") from-=6*86400;
  if(k==="month") from-=29*86400;
  let n=0,w=0;
  let net=0,best=0,worst=0;
  for(let i=0;i<jN;i++) if(jLive[i]===lv&&jT1[i]>=from) {
    if(JKind(i)!==0) n++;
    if(JKind(i)>0) w++;
    net+=jPL[i];
    best=MathMax(best,jPL[i]);
    worst=MathMin(worst,jPL[i]);
  }
  return ((k==="week"?"Last 7 days":((k==="month"?"Last 30 days":"Today"))))+": "+IntegerToString(n)+" trades, win "+((n>0?IntegerToString(Math.trunc(MathRound(100.0*w/n)))+"%":"-"))+", net "+Money(net)+", best "+Money(best)+", worst "+Money(worst)+". Balance "+Money(Balance())+", equity "+Money(Equity())+".";
}
function ApAdd(title,text,acts,src,test){
  if(apN>=MAXAPP) {
    for(let i=0;i<MAXAPP-1;i++) {
      apId[i]=apId[i+1];
      apTitle[i]=apTitle[i+1];
      apText[i]=apText[i+1];
      apActs[i]=apActs[i+1];
      apSrc[i]=apSrc[i+1];
      apT[i]=((apT[i+1])>>>0);
      apTest[i]=apTest[i+1];
    }
    apN--;
  }
  apId[apN]=gApSeq++;
  apTitle[apN]=title;
  apText[apN]=text;
  apActs[apN]=acts;
  apSrc[apN]=src;
  apT[apN]=((Now())>>>0);
  apTest[apN]=test;
  apN++;
  return apId[apN-1];
}
function ApFind(id){
  for(let i=0;i<apN;i++) if(apId[i]===id) return i;
  return -1;
}
function ApRemove(i){
  if(i<0||i>=apN) return;
  for(let j=i;j<apN-1;j++) {
    apId[j]=apId[j+1];
    apTitle[j]=apTitle[j+1];
    apText[j]=apText[j+1];
    apActs[j]=apActs[j+1];
    apSrc[j]=apSrc[j+1];
    apT[j]=((apT[j+1])>>>0);
    apTest[j]=apTest[j+1];
  }
  apN--;
}
function ApDecide(id,ok,via){
  let i=ApFind(id);
  if(i<0) {
    if(via==="telegram") MailSend("p2b_","{\"kind\":\"tg_send\",\"text\":\"That request is no longer waiting.\"}");
    return;
  }
  let acts=apActs[i],src=apSrc[i],title=apTitle[i];
  ApRemove(i);
  if(!ok) {
    ChatAdd(2,"Cancelled: "+title);
    if(src==="telegram"||via==="telegram") MailSend("p2b_","{\"kind\":\"tg_send\",\"text\":"+JQ("✖ Cancelled: "+title)+"}");
    return;
  }
  let list=[];
  let n=0;
  let root=JParse(acts);
  for(let k=0;k<JLen(root);k++) {
    ArrayResize(list,n+1,()=>"");
    list[n]=JDump(JAt(root,k));
    n++;
  }
  let res="";
  for(let k=0;k<n;k++) {
    let a=JParse(list[k]);
    let r=ExecAction(a,src);
    if(r!=="") res+=((res===""?"":"\n"))+r;
  }
  ChatAdd(2,"Applied: "+res);
  Say(V_DONE);
  if(src==="telegram"||via==="telegram") MailSend("p2b_","{\"kind\":\"tg_send\",\"text\":"+JQ("✅ Done:\n"+res)+"}");
}
function HandleAi(src,json,heard){
  gAiWait=false;
  let root=JParse(json);
  if(root<0) {
    ChatAdd(2,"The AI answer could not be read.");
    return;
  }
  let reply=JGS(root,"reply"),replyEn=JGS(root,"reply_en");
  if(replyEn==="") replyEn=reply;
  let list=[];
  let n=0;
  let acts=JGet(root,"actions");
  for(let k=0;k<JLen(acts);k++) {
    ArrayResize(list,n+1,()=>"");
    list[n]=JDump(JAt(acts,k));
    n++;
  }
  if(src==="telegram"&&heard!=="") ChatAdd(0,"[Telegram] "+heard);
  let shown=((gLang!=="en"&&reply!=="")?reply:replyEn);
  ChatAdd(1,((src==="telegram"?"[Telegram] ":""))+shown);
  if(src==="panel"&&InpSpeakReplies&&gBrTts) {
    let lc=JGS(root,"lang");
    if(lc==="") lc=gLang;
    let nat=(gLang!=="en"&&reply!=="");
    VSpeak((nat?reply:replyEn),false,(nat?lc:"en"));
  }
  let done="",pend="[",pendTx="",testTx="";
  let pendN=0;
  let tested=false;
  for(let k=0;k<n;k++) {
    let a=JParse(list[k]);
    if(ActType(a)==="test") {
      let used=tested;
      if(!tested) for(let q=0;q<n;q++) {
        let b=JParse(list[q]);
        if(ActType(b)!=="setup") continue;
        let tg=[];
        let tn=SymTargets(JGet(b,"symbols"),tg);
        if(tn===0) tn=SymTargets(JGet(b,"symbol"),tg);
        let ch=JGet(b,"changes");
        if(tn===0||ch<0) continue;
        for(let z=0;z<tn&&z<6;z++) {
          let bsi=tg[z];
          let bb=JParse(list[q]);
          let ch2=JGet(bb,"changes");
          let p=_cp(gSet[bsi]);
          let rb=gRuleB[bsi],rs=gRuleS[bsi];
          (_t143=ApplySetupChanges(p,rb,rs,ch2),rb=_R[0],rs=_R[1],_t143);
          let net=0;
          let tr=0;
          let wr=0;
          testTx+=((testTx===""?"":"\n"))+"TEST (new setup) "+(_t144=BacktestProposal(bsi,p,rb,rs,1000,net,tr,wr),net=_R[0],tr=_R[1],wr=_R[2],_t144);
        }
        used=true;
      }
      a=JParse(list[k]);
      if(used) {
        tested=true;
        continue;
      }
    }
    if(NeedApproval(a,src)) {
      pend+=((pendN>0?",":""))+list[k];
      pendN++;
      pendTx+=((pendTx===""?"":"\n"))+ActDescribe(a);
      continue;
    }
    a=JParse(list[k]);
    let r=ExecAction(a,src);
    if(r!=="") done+=((done===""?"":"\n"))+r;
  }
  pend+="]";
  if(done!=="") ChatAdd(2,done);
  if(testTx!=="") ChatAdd(2,testTx);
  let apid=0;
  if(pendN>0) {
    apid=ApAdd((pendN===1?"1 change waits for you":IntegerToString(pendN)+" changes wait for you"),pendTx,pend,src,testTx);
    ChatAdd(2,"Waiting for your APPLY: "+pendTx);
    Say(V_APPROVE);
  }
  if(src==="telegram") {
    let msg=reply;
    if(done!=="") msg+="\n\n✔ "+done;
    if(testTx!=="") msg+="\n\n📊 "+testTx;
    if(pendN>0) msg+="\n\n⏳ Needs your approval:\n"+pendTx;
    MailSend("p2b_","{\"kind\":\"tg_send\",\"text\":"+JQ(msg)+((apid>0?",\"approve\":"+IntegerToString(apid):""))+"}");
  }
}
function PanelState(){
  let s="{\"time\":"+JQ(TimeToString(TimeCurrent(),TIME_DATE|TIME_MINUTES))+",\"mode\":"+JQ((gMode===1?"LIVE":"SIM"))+",\"running\":"+((gRun?"true":"false"));
  let tabs=_AFILL(["dashboard","live","history","settings","analyzer","chat"],6,"");
  s+=",\"panel_language\":"+JQ(gLangName)+",\"panel_language_code\":"+JQ(gLang);
  s+=",\"tab\":"+JQ(tabs[ClampI(gTab,0,5)])+",\"balance\":"+JNumS(Balance())+",\"equity\":"+JNumS(Equity())+",\"day_pl\":"+JNumS(DayPL());
  s+=",\"guard\":{\"locked\":"+((gdLock?"true":"false"))+",\"why\":"+JQ(gdLockWhy)+",\"dayLossOn\":"+((gdLossOn?"true":"false"))+",\"dayLoss\":"+JNumS(gdLoss)+",\"dayLossUnit\":"+JQ((gdLossPct?"pct":"usd"))+",\"dayProfitOn\":"+((gdProfOn?"true":"false"))+",\"dayProfit\":"+JNumS(gdProf)+",\"dayProfitUnit\":"+JQ((gdProfPct?"pct":"usd"))+",\"ddOn\":"+((gdDdOn?"true":"false"))+",\"ddPct\":"+JNumS(gdDd,0)+",\"smartOn\":"+((gdSmartOn?"true":"false"))+",\"smartAfter\":"+IntegerToString(gdSmartN)+",\"smartCut\":"+JNumS(gdSmartCut,0)+",\"coolOn\":"+((gdCoolOn?"true":"false"))+",\"coolMin\":"+IntegerToString(gdCoolMin)+",\"maxDayOn\":"+((gdMaxOn?"true":"false"))+",\"maxDay\":"+IntegerToString(gdMax)+",\"lossStreak\":"+IntegerToString(gdConsLoss)+"}";
  s+=",\"symbols\":[";
  for(let i=0;i<gNS;i++) {
    let t=_cp(gSet[i]);
    let sl=(t.slMode===0?"$"+DoubleToString(t.sl,2):((t.slMode===1?DoubleToString(t.sl,0)+"pts":DoubleToString(t.sl,1)+"xATR")));
    let tp=(t.slMode===0?"$"+DoubleToString(t.tp,2):((t.slMode===1?DoubleToString(t.tp,0)+"pts":DoubleToString(t.tp,1)+"xATR")));
    s+=((i?",":""))+"{\"name\":"+JQ(gSym[i])+",\"short\":"+JQ(gShort[i])+",\"ok\":"+((gAvail[i]?"true":"false"))+",\"on\":"+((t.on?"true":"false"))+",\"tf\":"+JQ(TFN[t.tf])+",\"entry\":"+JQ(EntryKey(t.entry))+",\"p\":"+JQ(IntegerToString(t.p1)+"/"+IntegerToString(t.p2)+"/"+IntegerToString(t.p3)+" lv "+DoubleToString(t.lv1,2)+"/"+DoubleToString(t.lv2,2)+" "+MAN[t.ma])+",\"dir\":"+JQ(DIRN[t.dir])+",\"sl\":"+JQ(sl)+",\"tp\":"+JQ(tp)+",\"lot\":"+DoubleToString(t.lot,3)+",\"lotMode\":"+JQ((t.lotMode===1?"risk "+DoubleToString(t.risk,1)+"%":"fixed"))+",\"be\":"+((t.be?JQ(DoubleToString(t.beAt,0)+"%"):"false"))+",\"trail\":"+((t.trail?JQ(DoubleToString(t.trStart,0)+"/"+DoubleToString(t.trDist,0)+"%"):"false"))+",\"htf\":"+((t.htfOn?JQ(TFN[t.htf]+" "+HTN[t.htfType]+" "+IntegerToString(t.hp1)+"/"+IntegerToString(t.hp2)):"false"))+",\"trendEMA\":"+((t.trend?IntegerToString(t.trendP):"false"))+",\"wait\":"+JQ(CWN[t.cwMode])+((t.entry===E_RULE?",\"buyRule\":"+JQ(gRuleB[i])+",\"sellRule\":"+JQ(gRuleS[i]):""))+",\"open\":"+((HasOpen(i)?"true":"false"))+",\"bias\":"+IntegerToString(gBias[i])+",\"conf\":"+DoubleToString(gConf[i][4],2)+",\"todayPL\":"+JNumS(TodayRealized(i)+SymFloating(i))+",\"lossStop\":"+JNumS(gsLoss[i])+",\"profitStop\":"+JNumS(gsProf[i])+",\"maxTrades\":"+IntegerToString(gsMax[i])+((gsLock[i]?",\"stopped\":"+JQ(gsLockWhy[i]):""))+"}";
  }
  s+="],\"open_trades\":[";
  let o=0;
  for(let k=0;k<gTN;k++) if(gT[k].open&&gT[k].live===(gMode===1)&&gT[k].si>=0) {
    let dg=Dg(gT[k].si);
    s+=((o?",":""))+"{\"symbol\":"+JQ(gShort[gT[k].si])+",\"side\":"+JQ((gT[k].dir>0?"BUY":"SELL"))+",\"lot\":"+DoubleToString(gT[k].lot,3)+",\"entry\":"+DoubleToString(gT[k].entry,dg)+",\"sl\":"+DoubleToString(gT[k].sl,dg)+",\"tp\":"+DoubleToString(gT[k].tp,dg)+",\"pl\":"+JNumS(gT[k].pl)+",\"safe\":"+((gT[k].safe?"true":"false"))+",\"why\":"+JQ(WhyOf(gT[k].id))+"}";
    o++;
  }
  s+="],\"last_closed\":[";
  let c=0;
  for(let k=gTN-1;k>=0&&c<10;k--) if(!gT[k].open&&gT[k].live===(gMode===1)&&gT[k].si>=0) {
    s+=((c?",":""))+"{\"symbol\":"+JQ(gShort[gT[k].si])+",\"side\":"+JQ((gT[k].dir>0?"BUY":"SELL"))+",\"pl\":"+JNumS(gT[k].pl)+",\"time\":"+JQ(TimeToString(gT[k].t1,TIME_DATE|TIME_MINUTES))+",\"held_min\":"+IntegerToString((Math.trunc((gT[k].t1-gT[k].t0)/60)))+",\"why\":"+JQ(WhyOf(gT[k].id))+"}";
    c++;
  }
  let lv=((gMode===1?1:0));
  let from=TimeCurrent()-30*86400;
  let us=[];
  let un=[];
  let uc=[],uw=[];
  let nu=0;
  let hn=_A(24,()=>0);
  let hc=_A(24,()=>0);
  for(let h=0;h<24;h++) {
    hn[h]=0;
    hc[h]=0;
  }
  for(let i=0;i<jN;i++) {
    if(jLive[i]!==lv||jT1[i]<from) continue;
    let f=-1;
    for(let q=0;q<nu;q++) if(us[q]===jSym[i]) {
      f=q;
      break;
    }
    if(f<0) {
      nu++;
      ArrayResize(us,nu,()=>"");
      ArrayResize(un,nu,()=>0);
      ArrayResize(uc,nu,()=>0);
      ArrayResize(uw,nu,()=>0);
      f=nu-1;
      us[f]=jSym[i];
      un[f]=0;
      uc[f]=0;
      uw[f]=0;
    }
    un[f]+=jPL[i];
    if(JKind(i)!==0) uc[f]++;
    if(JKind(i)>0) uw[f]++;
    let t=new MqlDateTime();
    TimeToStruct(jT1[i],t);
    hn[t.hour]+=jPL[i];
    hc[t.hour]++;
  }
  s+="],\"by_symbol_30d\":[";
  for(let q=0;q<nu;q++) s+=((q?",":""))+"{\"s\":"+JQ(ShortName(us[q]))+",\"n\":"+IntegerToString(uc[q])+",\"net\":"+JNumS(un[q])+",\"win\":"+IntegerToString((uc[q]>0?Math.trunc(MathRound(100.0*uw[q]/uc[q])):0))+"}";
  s+="],\"by_hour_30d\":[";
  for(let h=0;h<24;h++) s+=((h?",":""))+JNumS(hn[h],1);
  s+="],\"today\":"+JQ(ReportText("today"))+",\"week\":"+JQ(ReportText("week"))+"}";
  return s;
}
function ChatSend(text){
  (_t145=StringTrimLeft(text),text=_R[0],_t145);
  (_t146=StringTrimRight(text),text=_R[0],_t146);
  if(text==="") return;
  ChatAdd(0,text);
  let low=text;
  (_t147=StringToLower(low),low=_R[0],_t147);
  if(StringSubstr(low,0,5)==="/buy "||StringSubstr(low,0,6)==="/sell ") {
    let b=StringSubstr(low,0,5)==="/buy ";
    let rule=StringSubstr(text,(b?5:6));
    (_t148=StringTrimLeft(rule),rule=_R[0],_t148);
    let e=RuleCheck(rule);
    if(e!=="") {
      ChatAdd(2,"Rule error: "+e);
      return;
    }
    let si=ClampI(gSelSym,0,IMax(0,gNS-1));
    if(gNS===0) {
      ChatAdd(2,"Add a symbol first.");
      return;
    }
    if(gDirty) ChatAdd(2,"Note: your unsaved SETTINGS changes on "+gShort[si]+" were dropped.");
    if(b) gRuleB[si]=rule;
    else gRuleS[si]=rule;
    gSet[si].entry=E_RULE;
    RuleCompileAll();
    MakeHandles(si);
    SaveAll();
    gEdit=_cp(gSet[si]);
    gEditRB=gRuleB[si];
    gEditRS=gRuleS[si];
    gDirty=false;
    ChatAdd(2,((b?"BUY":"SELL"))+" rule of "+gShort[si]+" saved (entry type = AI rule).");
    return;
  }
  if(low==="/test") {
    let net=0;
    let tr=0;
    let wr=0;
    ChatAdd(2,(_t149=BacktestNow(ClampI(gSelSym,0,IMax(0,gNS-1)),1000,net,tr,wr),net=_R[0],tr=_R[1],wr=_R[2],_t149));
    return;
  }
  if(low==="/help") {
    ChatAdd(2,"Ask anything in your own words. Quick commands: /buy <rule>  /sell <rule> (for the symbol picked on SETTINGS), /test, /report, /open, /guard. "+"Rule words: EMA SMA RSI MACD MACDSIG BBUP BBLOW STOCHK ADX PDI MDI SAR ATR HIGHEST LOWEST CLOSE OPEN HIGH LOW BOS CHOCH STRUCT OB FVG SWEEP CUSTOM(\"name\",buffer) with > < CROSSUP CROSSDOWN AND OR, e.g. EMA(50,H1) > EMA(200,H1) AND RSI(14) CROSSUP 30");
    return;
  }
  if(low==="/report") {
    ChatAdd(2,ReportText("today"));
    return;
  }
  if(low==="/open") {
    ChatAdd(2,ReportText("open"));
    return;
  }
  if(low==="/guard") {
    ChatAdd(2,GuardSummary());
    return;
  }
  if(!gBrOnline) {
    ChatAdd(2,"The AI bridge is not running. Put GTM AI on a second chart with 'Role' = BRIDGE and your AI API key (see SETTINGS > AI & TELEGRAM).");
    return;
  }
  FWriteAtomic(BRDIR+"state.json",PanelState());
  MailSend("p2b_","{\"kind\":\"chat\",\"source\":\"panel\",\"text\":"+JQ(text)+"}");
  gAiWait=true;
  gAiWaitT=((Now())>>>0);
}
function PanelPoll(){
  let now=((Now())>>>0);
  if(now-gBrCheckT>=2000) {
    gBrCheckT=((now)>>>0);
    let b=FReadUtf8(BRDIR+"bridge.json");
    let was=gBrOnline;
    gBrOnline=false;
    if(b!=="") {
      let r=JParse(b);
      let t=Math.trunc(JGN(r,"t",0));
      gBrOnline=(TimeLocal()-t<((JGB(r,"busy",false)?400:75)));
      gBrGemini=JGB(r,"gemini");
      gBrTg=JGB(r,"tg");
      gBrErr=JGS(r,"err");
      gBrReq=Math.trunc(JGN(r,"req"));
      gBrReqMax=Math.trunc(JGN(r,"max"));
      gBrModel=JGS(r,"model");
      gBrProv=JGS(r,"prov");
      gBrTts=JGB(r,"tts");
    }
    if(gBrOnline&&!was) {
      Log("AI bridge online"+((gBrTg?" - Telegram connected":"")),CL_CY);
      if(Now()-gBrSaidT>600000||gBrSaidT===0) {
        gBrSaidT=((Now())>>>0);
        Say(V_AIOK);
      }
    }
  }
  if(!gBrOnline) return;
  if(now-gStateT>=3000) {
    gStateT=((now)>>>0);
    FWriteAtomic(BRDIR+"state.json",PanelState());
  }
  let msgs=[];
  let n=MailRead("b2p_",msgs,6);
  for(let i=0;i<n;i++) {
    let r=JParse(msgs[i]);
    let kind=JGS(r,"kind");
    if(kind==="ai") {
      let src=JGS(r,"source","panel"),js=JGS(r,"json"),heard=JGS(r,"heard");
      if(src==="telegram") Say(V_TGMSG);
      HandleAi(src,js,heard);
    }
    else if(kind==="approve") {
      let id=Math.trunc(JGN(r,"id"));
      let ok=JGB(r,"ok");
      ApDecide(id,ok,"telegram");
    }
    else if(kind==="info") {
      gAiWait=false;
      ChatAdd(2,JGS(r,"text"));
    }
    else if(kind==="lang") LangGot(r);
    else if(kind==="tts") {
      if(JGB(r,"ok")) {
        if(JGB(r,"play",false)) {
          VPushF(JGS(r,"file"),Math.trunc(JGN(r,"ms")));
          VEnd();
        }
      }
      else {
        gVoiceBackoff=((Now()+((JGS(r,"err")==="translation failed"?120000:1800000)))>>>0);
        if(!gSndWarn) {
          gSndWarn=true;
          Log("AI voice: "+JGS(r,"err"),CL_AU);
        }
      }
    }
    else if(kind==="menu") MenuCmd(JGS(r,"cmd"));
  }
  if(gAiWait&&now-gAiWaitT>150000) {
    gAiWait=false;
    ChatAdd(2,"No answer from the AI in 150 s - is the BRIDGE chart running?");
  }
}
var CHATED="GTM_CHAT_IN";
function WrapText(src,pt,width,out){
  ArrayResize(out,0,()=>"");
  let n=0;
  let paras=[];
  let np=StringSplit(src,10,paras);
  if(np<=0) {
    np=1;
    ArrayResize(paras,1,()=>"");
    paras[0]=src;
  }
  for(let p=0;p<np;p++) {
    let words=[];
    let nw=StringSplit(paras[p],32,words);
    let line="";
    for(let w=0;w<nw;w++) {
      let cand=((line===""?words[w]:line+" "+words[w]));
      if(TWr(cand,pt)<=width||line==="") {
        line=cand;
        while(TWr(line,pt)>width&&StringLen(line)>4) {
          let cut=StringLen(line)-1;
          while(cut>1&&TWr(StringSubstr(line,0,cut),pt)>width) cut--;
          ArrayResize(out,n+1,()=>"");
          out[n]=StringSubstr(line,0,cut);
          n++;
          line=StringSubstr(line,cut);
        }
      }
      else {
        ArrayResize(out,n+1,()=>"");
        out[n]=line;
        n++;
        line=words[w];
      }
    }
    ArrayResize(out,n+1,()=>"");
    out[n]=line;
    n++;
    if(n>400) break;
  }
  return n;
}
function ChatBox(x,y,w,h){
  if(ObjectFind(0,CHATED)<0) {
    ObjectCreate(0,CHATED,OBJ_EDIT,0,0,0);
    ObjectSetInteger(0,CHATED,OBJPROP_BGCOLOR,(Math.trunc(1839108)>>>0));
    ObjectSetInteger(0,CHATED,OBJPROP_COLOR,(Math.trunc(16774116)>>>0));
    ObjectSetInteger(0,CHATED,OBJPROP_BORDER_COLOR,(Math.trunc(16747431)>>>0));
    ObjectSetInteger(0,CHATED,OBJPROP_FONTSIZE,10);
    ObjectSetString(0,CHATED,OBJPROP_FONT,UiFont());
    ObjectSetInteger(0,CHATED,OBJPROP_SELECTABLE,false);
    ObjectSetInteger(0,CHATED,OBJPROP_HIDDEN,true);
    ObjectSetInteger(0,CHATED,OBJPROP_ZORDER,10);
    ObjectSetString(0,CHATED,OBJPROP_TEXT,"");
  }
  ObjectSetInteger(0,CHATED,OBJPROP_XDISTANCE,x);
  ObjectSetInteger(0,CHATED,OBJPROP_YDISTANCE,y);
  ObjectSetInteger(0,CHATED,OBJPROP_XSIZE,w);
  ObjectSetInteger(0,CHATED,OBJPROP_YSIZE,h);
}
function ChatBoxClose(){
  ObjectDelete(0,CHATED);
}
function ChatBoxTake(){
  if(ObjectFind(0,CHATED)<0) return "";
  let t=ObjectGetString(0,CHATED,OBJPROP_TEXT);
  ObjectSetString(0,CHATED,OBJPROP_TEXT,"");
  (_t150=StringTrimLeft(t),t=_R[0],_t150);
  (_t151=StringTrimRight(t),t=_R[0],_t151);
  return t;
}
function ChatAddPart(){
  let t=ChatBoxTake();
  if(t==="") return;
  gChatDraft+=((gChatDraft===""?"":" "))+t;
}
function ChatSendDraft(){
  ChatAddPart();
  let t=gChatDraft;
  gChatDraft="";
  gChatOff=0;
  ChatSend(t);
}
function LayoutChat(){
  let m=10,top=58,H=gH-top-m,W=gW-2*m;
  let rw=Math.trunc(MathMin(380,W*0.32));
  RX[1]=m;
  RY[1]=top;
  RW[1]=W-rw-m;
  RH[1]=H;
  let h2=Math.trunc(MathMin(300,H*0.48));
  RX[2]=m+RW[1]+m;
  RY[2]=top;
  RW[2]=rw;
  RH[2]=h2;
  RX[3]=RX[2];
  RY[3]=top+h2+m;
  RW[3]=rw;
  RH[3]=H-h2-m;
  RegPanel(RX[1],RY[1],RW[1],RH[1],CL_VI,0);
  RegPanel(RX[2],RY[2],RW[2],RH[2],CL_CY,0);
  RegPanel(RX[3],RY[3],RW[3],RH[3],CL_AU,0);
}
function DrawChat(){
  let x=RX[1],y=RY[1],w=RW[1],h=RH[1];
  Panel(x,y,w,h,"AI CHAT  -  talk to "+InpAIName+" (or use Telegram)",CL_VI);
  Txt(x+w-14,y+8,(gBrOnline?"AI ONLINE":"AI OFFLINE"),(gBrOnline?CL_UP:CL_DN),8,true,TA_RIGHT);
  let iy=y+h-44;
  let bw=74;
  ChatBox(x+14,iy,w-28-3*(bw+6),30);
  Btn(x+w-14-3*bw-12,iy,bw,30,"ADD",CL_CY,false,"chat:add",9);
  Btn(x+w-14-2*bw-6,iy,bw,30,"SEND",CL_UP,true,"chat:send",9);
  Btn(x+w-14-bw,iy,bw,30,"CLEAR",CL_MU,false,"chat:clear",9);
  let dy=iy-8;
  if(gChatDraft!=="") {
    let dl=[];
    let nd=WrapText("Draft: "+gChatDraft,9,w-40,dl);
    let show=IMin(nd,3);
    dy=iy-8-show*16;
    cv.RoundFill(x+12,dy-4,x+w-12,iy-6,8,CL_VI,30);
    for(let i=0;i<show;i++) Txt(x+20,dy+i*16,dl[nd-show+i],CL_TX,9);
    dy-=10;
  }
  else Txt(x+16,iy-18,"Type, press Enter to add a part (a box takes about 60 letters), then SEND.  /help for quick commands.",CL_MU,8);
  if(gChatDraft==="") dy=iy-26;
  gNoTr=true;
  let top=y+32,bot=dy-4;
  let lh=17,maxW=Math.trunc((w*0.74));
  let L=[];
  let LW=[];
  let LC=[];
  let nL=0;
  if(gAiWait) {
    ArrayResize(L,1,()=>"");
    ArrayResize(LW,1,()=>0);
    ArrayResize(LC,1,()=>0);
    let dots="thinking";
    let k=(((Math.trunc(gFrame/6))%4));
    for(let d=0;d<k;d++) dots+=".";
    L[0]=dots;
    LW[0]=1;
    LC[0]=((CL_VI)>>>0);
    nL=1;
  }
  let vis0=IMax(1,Math.trunc((bot-top)/lh));
  for(let m=chN-1;m>=0&&nL<500&&nL<gChatOff+vis0+2;m--) {
    let wl=[];
    let pt=(chWho[m]===2?8:9);
    let nw=WrapText(chTx[m],pt,maxW-24,wl);
    ArrayResize(L,nL+nw+1,()=>"");
    ArrayResize(LW,nL+nw+1,()=>0);
    ArrayResize(LC,nL+nw+1,()=>0);
    L[nL]="";
    LW[nL]=-1;
    LC[nL]=((0)>>>0);
    nL++;
    for(let i=nw-1;i>=0;i--) {
      L[nL]=wl[i];
      LW[nL]=chWho[m];
      LC[nL]=((((i===0)?(Math.trunc(m)>>>0)+1:0))>>>0);
      nL++;
    }
  }
  let vis=IMax(1,Math.trunc((bot-top)/lh));
  gChatOff=ClampI(gChatOff,0,IMax(0,nL-vis));
  for(let r=0;r<vis;r++) {
    let li=gChatOff+r;
    if(li>=nL) break;
    let ly=bot-(r+1)*lh;
    if(LW[li]<0) continue;
    let t=L[li];
    let who=LW[li];
    let tw=TW(t,(who===2?8:9));
    if(gAiWait&&li===0&&LC[li]===CL_VI&&r===0&&gChatOff===0) {
      Txt(x+24,ly+Math.trunc(lh/2),t,CL_VI,9,true,TA_LEFT|TA_VCENTER);
      continue;
    }
    if(who===0) {
      let ux2=x+w-20,ux1=ux2-tw-20;
      cv.RoundFill(ux1,ly,ux2,ly+lh,6,CL_CY,40);
      Txt(ux2-10,ly+Math.trunc(lh/2),t,CL_TX,9,false,TA_RIGHT|TA_VCENTER);
    }
    else if(who===1) {
      cv.RoundFill(x+18,ly,x+38+tw,ly+lh,6,CL_VI,45);
      Txt(x+28,ly+Math.trunc(lh/2),t,CL_TX,9,false,TA_LEFT|TA_VCENTER);
    }
    else {
      cv.RoundFill(x+18,ly,x+38+tw,ly+lh,6,CL_AU,22);
      Txt(x+28,ly+Math.trunc(lh/2),t,Lerp(CL_AU,CL_TX,0.4),8,false,TA_LEFT|TA_VCENTER);
    }
  }
  ScrollBar(x+w-8,top,bot-top,nL,vis,IMax(0,nL-vis-gChatOff),CL_VI);
  gNoTr=false;
  if(chN===0&&!gAiWait) Txt(x+Math.trunc(w/2),Math.trunc((top+bot)/2),"Ask anything: \"set V25 to H1 EMA 50/200 trend with M5 RSI entry and test it\", \"why did my last trade lose?\", \"close V75 in profit\"",CL_MU,9,false,TA_CENTER|TA_VCENTER);
  let sx=RX[2],sy=RY[2],sw=RW[2],sh=RH[2];
  Panel(sx,sy,sw,sh,"CONNECTION & QUICK ASK",CL_CY);
  let yy=sy+32;
  Txt(sx+14,yy,"AI bridge",CL_MU,8,true);
  Txt(sx+sw-14,yy,(gBrOnline?"ONLINE":"OFFLINE - start it (SETTINGS > AI)"),(gBrOnline?CL_UP:CL_DN),8,true,TA_RIGHT);
  yy+=18;
  if(gBrOnline) {
    Txt(sx+14,yy,(gBrProv!==""?gBrProv:"AI"),CL_MU,8,true);
    Txt(sx+sw-14,yy,Fit(((gBrGemini?"ready ":"check key "))+gBrModel,8,false,sw-90),(gBrGemini?CL_TX:CL_AU),8,false,TA_RIGHT);
    yy+=16;
    Txt(sx+14,yy,"Requests today",CL_MU,8,true);
    Txt(sx+sw-14,yy,IntegerToString(gBrReq)+" / "+IntegerToString(gBrReqMax),CL_TX,8,false,TA_RIGHT);
    yy+=16;
    Txt(sx+14,yy,"Telegram",CL_MU,8,true);
    Txt(sx+sw-14,yy,(gBrTg?"connected":"off"),(gBrTg?CL_UP:CL_MU),8,false,TA_RIGHT);
    yy+=16;
    if(gBrErr!=="") {
      Txt(sx+14,yy,Fit(gBrErr,8,false,sw-28),CL_AU,8);
      yy+=16;
    }
  }
  yy+=6;
  let q=_AFILL(["Today's report","Open trades","Explain last trade","Market brief","Coach me","Guard status"],6,"");
  let qw=Math.trunc((sw-34)/2),qh=IMin(28,Math.trunc((sy+sh-10-yy)/3)-6);
  if(qh>=18) for(let i=0;i<6;i++) Btn(sx+12+((i%2))*(qw+10),yy+(Math.trunc(i/2))*(qh+6),qw,qh,q[i],(i===2||i===3||i===4?CL_VI:CL_CY),false,"q:"+IntegerToString(i),8);
  let ax=RX[3],ay=RY[3],aw=RW[3],ah=RH[3];
  Panel(ax,ay,aw,ah,"WAITING FOR YOUR APPLY ("+IntegerToString(apN)+")",(apN>0?CL_AU:CL_LN));
  let cy=ay+32;
  if(apN===0) Txt(ax+14,cy+6,"Nothing waiting. New setups, opening trades,",CL_MU,8);
  if(apN===0) Txt(ax+14,cy+22,"LIVE mode and looser risk rules show up here.",CL_MU,8);
  for(let i=apN-1;i>=0&&cy<ay+ah-60;i--) {
    let lines=[];
    let nl=WrapText(apText[i]+((apTest[i]!==""?"\n"+apTest[i]:"")),8,aw-40,lines);
    let show=IMin(nl,IMax(1,Math.trunc((ay+ah-cy-56)/14)));
    let chh=24+show*14+34;
    cv.RoundFill(ax+10,cy,ax+aw-10,cy+chh,8,CL_AU,26);
    cv.RoundBorder(ax+10,cy,ax+aw-10,cy+chh,8,CL_AU,160,1.0);
    Txt(ax+20,cy+8,Fit(apTitle[i]+((apSrc[i]==="telegram"?"  (Telegram)":"")),9,true,aw-40),CL_AU,9,true);
    gNoTr=true;
    for(let k=0;k<show;k++) Txt(ax+20,cy+26+k*14,lines[k],(StringFind(lines[k],"TEST")===0?CL_CY:CL_TX),8);
    gNoTr=false;
    let by=cy+chh-30;
    Btn(ax+20,by,Math.trunc((aw-50)/2),24,"APPLY",CL_UP,true,"ap:"+IntegerToString(apId[i]),9);
    Btn(ax+30+Math.trunc((aw-50)/2),by,Math.trunc((aw-50)/2),24,"CANCEL",CL_DN,false,"dc:"+IntegerToString(apId[i]),9);
    cy+=chh+8;
  }
}
function QuickAsk(i){
  switch(i) {
    case 0:
      ChatSend("/report");
      break;
    case 1:
      ChatSend("/open");
      break;
    case 2:
      ChatSend("Explain my last closed trade: why it was taken and why it won or lost.");
      break;
    case 3:
      ChatSend("Give me a short market brief of my symbols (trend and strength).");
      break;
    case 4:
      ChatSend("Look at my 30-day results by symbol and by hour and coach me: what should I change?");
      break;
    default:
      ChatSend("/guard");
      break;
  }
}
function GuardEdit(key,d){
  if(key==="lossOn") gdLossOn=!gdLossOn;
  else if(key==="loss") gdLoss=Clamp(gdLoss+d*((gdLossPct?0.5:1)),0.5,100000);
  else if(key==="lossU") gdLossPct=!gdLossPct;
  else if(key==="profOn") gdProfOn=!gdProfOn;
  else if(key==="prof") gdProf=Clamp(gdProf+d*((gdProfPct?0.5:1)),0.5,100000);
  else if(key==="profU") gdProfPct=!gdProfPct;
  else if(key==="ddOn") gdDdOn=!gdDdOn;
  else if(key==="dd") gdDd=Clamp(gdDd+d,1,95);
  else if(key==="smOn") gdSmartOn=!gdSmartOn;
  else if(key==="smN") gdSmartN=ClampI(gdSmartN+d,1,20);
  else if(key==="smC") gdSmartCut=Clamp(gdSmartCut+d*5,5,100);
  else if(key==="coOn") gdCoolOn=!gdCoolOn;
  else if(key==="co") gdCoolMin=ClampI(gdCoolMin+d*((gdCoolMin>=30?5:1)),1,1440);
  else if(key==="mxOn") gdMaxOn=!gdMaxOn;
  else if(key==="mx") gdMax=ClampI(gdMax+d,1,500);
  else if(key==="ask") gAskAll=!gAskAll;
  else if(key==="unlock") {
    gdLock=false;
    gdLockWhy="";
    for(let i=0;i<NSYM;i++) {
      gsLock[i]=false;
      gsLockWhy[i]="";
    }
    gdPeak=Equity();
    Log("Account guard unlocked by you",CL_AU);
  }
  GuardSave();
}
function GuardSymEdit(f,si,d){
  if(si<0||si>=gNS) return;
  if(f==="l") gsLoss[si]=MathMax(0,gsLoss[si]+d*((gsLoss[si]>=50?5:1)));
  if(f==="p") gsProf[si]=MathMax(0,gsProf[si]+d*((gsProf[si]>=50?5:1)));
  if(f==="m") gsMax[si]=IMax(0,gsMax[si]+d);
  if(f==="u") {
    gsLock[si]=false;
    gsLockWhy[si]="";
  }
  GuardSave();
}
function GRow(x,y,w,lab,on,onKey,val,key,unit,unitKey){
  Txt(x,y+12,lab,(on?Lerp(CL_MU,CL_TX,0.4):CL_MU),9,false,TA_LEFT|TA_VCENTER);
  let vx=x+Math.trunc((w*0.50));
  if(onKey!=="") Btn(vx,y,58,24,(on?"ON":"OFF"),(on?CL_UP:CL_DN),on,"gd:"+onKey+":1",8);
  if(key!=="") {
    let bx=vx+66;
    Btn(bx,y,26,24,"-",CL_CY,false,"gd:"+key+":-1",9);
    Txt(bx+60,y+12,val,(on?CL_TX:CL_MU),9,true,TA_CENTER|TA_VCENTER);
    Btn(bx+94,y,26,24,"+",CL_CY,false,"gd:"+key+":1",9);
    if(unitKey!=="") Btn(bx+126,y,40,24,unit,CL_VI,false,"gd:"+unitKey+":1",8);
    else if(unit!=="") Txt(bx+128,y+12,unit,CL_MU,8,false,TA_LEFT|TA_VCENTER);
  }
}
function DrawGuardView(x,y,w,h){
  Panel(x,y,w,h,"ACCOUNT GUARD  -  protects the whole account and each symbol (each rule can be switched off)",(gdLock?CL_DN:CL_AU));
  let lw=Math.trunc((w*0.47)),lx=x+16,yy=y+36,rh=32;
  GRow(lx,yy,lw,"Daily loss limit",gdLossOn,"lossOn",(gdLossPct?DoubleToString(gdLoss,1)+" %":Money(gdLoss)),"loss",(gdLossPct?"%":"$"),"lossU");
  yy+=rh;
  GRow(lx,yy,lw,"Daily profit target",gdProfOn,"profOn",(gdProfPct?DoubleToString(gdProf,1)+" %":Money(gdProf)),"prof",(gdProfPct?"%":"$"),"profU");
  yy+=rh;
  GRow(lx,yy,lw,"Max drawdown from the top",gdDdOn,"ddOn",DoubleToString(gdDd,0)+" %","dd","","");
  yy+=rh;
  GRow(lx,yy,lw,"Smart lot after losses in a row",gdSmartOn,"smOn",IntegerToString(gdSmartN),"smN","losses","");
  yy+=rh;
  GRow(lx,yy,lw,"   ... the lot becomes",gdSmartOn,"",DoubleToString(gdSmartCut,0)+" %","smC","of normal","");
  yy+=rh;
  GRow(lx,yy,lw,"Cool-down after a loss",gdCoolOn,"coOn",IntegerToString(gdCoolMin)+" min","co","","");
  yy+=rh;
  GRow(lx,yy,lw,"Max trades a day (all symbols)",gdMaxOn,"mxOn",IntegerToString(gdMax),"mx","","");
  yy+=rh;
  GRow(lx,yy,lw,"Ask before EVERY AI action",gAskAll,"ask","","","","");
  yy+=rh+6;
  let pl=DayPL(),base=DayBase();
  cv.RoundFill(lx-4,yy,lx+lw-10,yy+92,10,(gdLock?CL_DN:CL_DARK),(gdLock?40:170));
  cv.RoundBorder(lx-4,yy,lx+lw-10,yy+92,10,(gdLock?CL_DN:CL_LN),200,1.0);
  Txt(lx+8,yy+10,"TODAY ("+((gMode===1?"LIVE":"SIM"))+")",CL_MU,8,true);
  Txt(lx+8,yy+30,"P/L "+((pl>=0?"+":""))+Money(pl)+"   start "+Money(base),(pl>=0?CL_UP:CL_DN),11,true);
  Txt(lx+8,yy+52,"losses in a row "+IntegerToString(gdConsLoss)+"   top equity "+Money(gdPeak),CL_MU,8);
  Txt(lx+8,yy+70,(gdLock?Fit("LOCKED: "+gdLockWhy,8,true,lw-130):"trading allowed"),(gdLock?CL_DN:CL_UP),8,true);
  if(gdLock) Btn(lx+lw-110,yy+62,92,24,"UNLOCK",CL_AU,false,"gd:unlock:1",8);
  let tx=x+lw+30,tw=x+w-16-tx;
  Txt(tx,y+36,"EACH SYMBOL (today)  -  0 = off",CL_MU,8,true);
  let cy=y+56,colN=tx,colP=tx+Math.trunc((tw*0.22)),colL=tx+Math.trunc((tw*0.36)),colF=tx+Math.trunc((tw*0.58)),colM=tx+Math.trunc((tw*0.80));
  Txt(colP,cy,"P/L",CL_MU,7,true);
  Txt(colL,cy,"stop at loss $",CL_MU,7,true);
  Txt(colF,cy,"stop at profit $",CL_MU,7,true);
  Txt(colM,cy,"max trades",CL_MU,7,true);
  cy+=16;
  let rh2=28,nvis=IMax(1,Math.trunc((y+h-10-cy)/rh2));
  gGuardOff=ClampI(gGuardOff,0,IMax(0,gNS-nvis));
  for(let r=0;r<nvis;r++) {
    let si=gGuardOff+r;
    if(si>=gNS) break;
    let ry=cy+r*rh2;
    if((r%2)===0) cv.RoundFill(tx-6,ry,x+w-14,ry+rh2-3,6,CL_DARK,110);
    let spl=TodayRealized(si)+SymFloating(si);
    Txt(colN,ry+12,Fit(gShort[si],9,true,colP-colN-6),(gsLock[si]?CL_DN:gCol[si]),9,true,TA_LEFT|TA_VCENTER);
    Txt(colP,ry+12,((spl>=0?"+":""))+DoubleToString(spl,2),(spl>=0?CL_UP:CL_DN),8,true,TA_LEFT|TA_VCENTER);
    let si_=IntegerToString(si);
    Btn(colL,ry+2,20,20,"-",CL_CY,false,"gs:l:"+si_+":-1",8);
    Txt(colL+46,ry+12,(gsLoss[si]>0?DoubleToString(gsLoss[si],0):"off"),CL_TX,8,true,TA_CENTER|TA_VCENTER);
    Btn(colL+72,ry+2,20,20,"+",CL_CY,false,"gs:l:"+si_+":1",8);
    Btn(colF,ry+2,20,20,"-",CL_CY,false,"gs:p:"+si_+":-1",8);
    Txt(colF+46,ry+12,(gsProf[si]>0?DoubleToString(gsProf[si],0):"off"),CL_TX,8,true,TA_CENTER|TA_VCENTER);
    Btn(colF+72,ry+2,20,20,"+",CL_CY,false,"gs:p:"+si_+":1",8);
    Btn(colM,ry+2,20,20,"-",CL_CY,false,"gs:m:"+si_+":-1",8);
    Txt(colM+38,ry+12,(gsMax[si]>0?IntegerToString(gsMax[si]):"off"),CL_TX,8,true,TA_CENTER|TA_VCENTER);
    Btn(colM+56,ry+2,20,20,"+",CL_CY,false,"gs:m:"+si_+":1",8);
    if(gsLock[si]) Btn(x+w-74,ry+2,56,20,"UNLOCK",CL_AU,false,"gs:u:"+si_+":0",7);
  }
  ScrollBar(x+w-8,cy,nvis*rh2,gNS,nvis,gGuardOff,CL_AU);
}
function DrawAiView(x,y,w,h){
  Panel(x,y,w,h,"AI & TELEGRAM  -  how to switch on the AI brain and the phone remote",CL_VI);
  let cx=x+18,cw=Math.trunc((w*0.56)),yy=y+36;
  let steps="1. Any AI API key works - the robot finds the service and the best model by itself:\n"+"      Gemini (free: aistudio.google.com > Get API key), OpenAI, Claude, Groq, OpenRouter, DeepSeek, Grok.\n"+"2. MT5: Tools > Options > Expert Advisors > tick 'Allow WebRequest for listed URL' and add\n"+"      https://api.telegram.org  and the one for your key:\n"+"      https://generativelanguage.googleapis.com (Gemini)   https://api.openai.com (OpenAI)\n"+"      https://api.anthropic.com (Claude)   https://api.groq.com (Groq)   https://openrouter.ai\n"+"      https://api.deepseek.com (DeepSeek)   https://api.x.ai (Grok)\n"+"3. Open a 2nd chart (any symbol) and drop GTM AI on it again. Inputs: Role = BRIDGE,\n"+"      AI API key = paste your key over the text 'PASTE ...'. Keep that chart open.\n"+"4. Telegram (optional): @BotFather > /newbot > paste the token in 'Telegram bot token'\n"+"      on the BRIDGE. Then send /start to your bot - that chat is connected automatically.\n"+"5. Talk: AI CHAT tab, or Telegram text / voice messages (Sinhala or English).\n\n"+"What runs at once: tabs, replay, reports, close trades, break-even, trailing, tighter rules.\n"+"What asks for APPLY (panel or a Telegram button): opening a trade, LIVE mode, new setups,\n"+"looser risk rules, moving a SL further away. Every new entry model is back-tested first.\n\n"+"Free keys have limits (Gemini: about 10 questions a minute, a few hundred a day). The BRIDGE\n"+"inputs 'AI requests per minute / per day' keep you inside them. Busy / limit errors switch to a\n"+"backup model by themselves. Voice messages need a Gemini, OpenAI or Groq key.\n"+"AI answers and signals are predictions, not promises. Practise on demo first.";
  let ls=[];
  let n=WrapText(steps,9,cw,ls);
  gNoTr=true;
  for(let i=0;i<n&&yy<y+h-20;i++) {
    Txt(cx,yy,ls[i],(StringFind(ls[i],"https")>=0?CL_CY:CL_TX),9);
    yy+=17;
  }
  gNoTr=false;
  let sx=x+cw+50,sw=x+w-16-sx,sy=y+36;
  cv.RoundFill(sx,sy,sx+sw,sy+170,10,CL_DARK,180);
  cv.RoundBorder(sx,sy,sx+sw,sy+170,10,(gBrOnline?CL_UP:CL_DN),200,1.2);
  Txt(sx+14,sy+12,"STATUS",CL_MU,8,true);
  Txt(sx+14,sy+34,"AI bridge: "+((gBrOnline?"ONLINE":"OFFLINE")),(gBrOnline?CL_UP:CL_DN),11,true);
  Txt(sx+14,sy+60,((gBrProv!==""?gBrProv:"AI"))+": "+((gBrOnline?((gBrGemini?"ready":"check the key")):"-"))+"   "+gBrModel,CL_TX,9);
  Txt(sx+14,sy+80,"Telegram: "+((gBrOnline?((gBrTg?"connected":"off / not set")):"-")),CL_TX,9);
  Txt(sx+14,sy+100,"Requests today: "+IntegerToString(gBrReq)+" / "+IntegerToString(gBrReqMax),CL_TX,9);
  if(gBrErr!=="") {
    let el=[];
    let ne=WrapText(gBrErr,8,sw-28,el);
    for(let i=0;i<ne&&i<3;i++) Txt(sx+14,sy+120+i*14,el[i],CL_AU,8);
  }
  Btn(sx,sy+186,sw,30,"OPEN AI CHAT",CL_VI,true,"tab:5",9);
  Txt(sx,sy+232,"Ask before EVERY AI action",CL_MU,9);
  Btn(sx+sw-70,sy+226,70,24,(gAskAll?"ON":"OFF"),(gAskAll?CL_UP:CL_DN),gAskAll,"gd:ask:1",8);
  let ly=sy+266;
  Txt(sx,ly+6,"PANEL LANGUAGE: "+gLangName,CL_CY,9,true);
  let lbw=Math.trunc((sw-12)/3);
  Btn(sx,ly+26,lbw,26,"ENGLISH",CL_CY,gLang==="en","lang:en",8);
  Btn(sx+lbw+6,ly+26,lbw,26,"SINHALA",CL_CY,gLang==="si","lang:si",8);
  Btn(sx+2*(lbw+6),ly+26,lbw,26,"TAMIL",CL_CY,gLang==="ta","lang:ta",8);
  Txt(sx,ly+66,"Any other language: tell the AI, e.g. 'show the panel in French'.",CL_MU,8);
  Txt(sx,ly+84,"AI voice: "+((gBrOnline?((gBrTts?"ready":"needs a Gemini / OpenAI key or an Azure Speech key")):"-")),(gBrTts?CL_UP:CL_MU),8);
  if(gLang!=="en") {
    if(Now()-gVDoneT>3000) {
      gVDoneT=((Now())>>>0);
      gVDoneN=VLearnDone();
    }
    let vd=gVDoneN;
    let vs=(VPackBase(gLang)>=0?"Alerts voice: built-in "+gLangName+" (male)":((gFileBad?"Alerts voice: English (this MT5 can't play AI voice files)":"Alerts voice "+gLangName+": "+IntegerToString(vd)+" / "+IntegerToString(NVOICE)+" ready, English until done")));
    Txt(sx,ly+102,vs,(vd>=NVOICE?CL_UP:CL_AU),8);
  }
}
var brTgOffset=0;
var brTgT=((0)>>>0),brBeatT=((0)>>>0),brMailT=((0)>>>0);
var brDay=0,brReqToday=0;
var brMinT=[];
var brHR=_A(16,()=>""),brHT=_A(16,()=>"");
var brHN=0;
var brErr="",brModel="";
var brGemOk=false,brTgOk=false;
var brTgName="";
function BrMem(role,tx){
  if(brHN>=16) {
    for(let i=0;i<15;i++) {
      brHR[i]=brHR[i+1];
      brHT[i]=brHT[i+1];
    }
    brHN--;
  }
  brHR[brHN]=role;
  brHT[brHN]=StringSubstr(tx,0,1500);
  brHN++;
}
function BrReplyJson(tx){
  return "{\"reply\":"+JQ(tx)+",\"reply_en\":"+JQ(tx)+",\"actions\":[]}";
}
function BrRateOk(why){
  let d=(Math.trunc(TimeLocal()/86400));
  if(d!==brDay) {
    brDay=d;
    brReqToday=0;
  }
  if(brReqToday>=IMax(1,InpAiPerDay)) {
    why="Today's AI limit ("+IntegerToString(InpAiPerDay)+" requests) is used up. It resets tomorrow.";
    { const _rv=false; _R=[why]; return _rv; }
  }
  let now=((GetTickCount())>>>0);
  let n=ArraySize(brMinT),k=0;
  for(let i=0;i<n;i++) if(now-brMinT[i]<60000) {
    brMinT[k]=((brMinT[i])>>>0);
    k++;
  }
  ArrayResize(brMinT,k,()=>0);
  if(k>=IMax(1,InpAiPerMin)) {
    why="Too many questions in one minute (limit "+IntegerToString(InpAiPerMin)+"). Try again in a few seconds.";
    { const _rv=false; _R=[why]; return _rv; }
  }
  ArrayResize(brMinT,k+1,()=>0);
  brMinT[k]=((now)>>>0);
  brReqToday++;
  { const _rv=true; _R=[why]; return _rv; }
  _R=[why];
}
function BrPost(url,headers,body,resp,timeout){
  let data=[],res=[];
  let rh="";
  let n=StringToCharArray(body,data,0,WHOLE_ARRAY,CP_UTF8);
  if(n>0) ArrayResize(data,n-1,()=>0);
  ResetLastError();
  let code=WebRequest("POST",url,headers,timeout,data,res,rh);
  resp=CharArrayToString(res,0,WHOLE_ARRAY,CP_UTF8);
  if(code===-1) code=-1000-GetLastError();
  { const _rv=code; _R=[resp]; return _rv; }
  _R=[resp];
}
function BrGet(url,res,timeout){
  let data=[],tmp=[];
  let rh="";
  ResetLastError();
  let code=WebRequest("GET",url,"",timeout,data,tmp,rh);
  if(code===-1) code=-1000-GetLastError();
  let tn=ArraySize(tmp);
  ArrayResize(res,tn,()=>0);
  for(let i=0;i<tn;i++) res[i]=(Math.trunc(tmp[i])&255);
  return code;
}
const PV_NONE=0;
const PV_GEMINI=1;
const PV_OPENAI=2;
const PV_CLAUDE=3;
const PV_GROQ=4;
const PV_OPENROUTER=5;
const PV_DEEPSEEK=6;
const PV_XAI=7;
var PVNAME=_AFILL(["-","Gemini","OpenAI","Claude","Groq","OpenRouter","DeepSeek","Grok (xAI)"],8,"");
var PVBASE=_AFILL(["","https://generativelanguage.googleapis.com","https://api.openai.com/v1","https://api.anthropic.com/v1","https://api.groq.com/openai/v1","https://openrouter.ai/api/v1","https://api.deepseek.com","https://api.x.ai/v1"],8,"");
var PVHOST=_AFILL(["","https://generativelanguage.googleapis.com","https://api.openai.com","https://api.anthropic.com","https://api.groq.com","https://openrouter.ai","https://api.deepseek.com","https://api.x.ai"],8,"");
var brProv=PV_NONE;
var brDetected=false;
var brDetectT=((0)>>>0);
var brCand=[];
var brCandN=0;
var brOwner=0;
var brBusy=false;
var brTtsModel="";
var TGOWNFILE="GTM_AI\\bridge\\tg_owner.txt";
function IsPlaceholder(v){
  let u=v;
  (_t152=StringTrimLeft(u),u=_R[0],_t152);
  (_t153=StringTrimRight(u),u=_R[0],_t153);
  (_t154=StringToUpper(u),u=_R[0],_t154);
  return (u===""||StringFind(u,"PASTE")>=0||StringFind(u,"YOUR ")>=0||StringLen(u)<12);
}
function BrKey(){
  let k=InpAiKey;
  (_t155=StringTrimLeft(k),k=_R[0],_t155);
  (_t156=StringTrimRight(k),k=_R[0],_t156);
  return (IsPlaceholder(k)?"":k);
}
function BrTok(){
  let k=InpTgToken;
  (_t157=StringTrimLeft(k),k=_R[0],_t157);
  (_t158=StringTrimRight(k),k=_R[0],_t158);
  return (IsPlaceholder(k)?"":k);
}
function ProvOfKey(k){
  if(k==="") return PV_NONE;
  if(StringSubstr(k,0,4)==="AIza") return PV_GEMINI;
  if(StringSubstr(k,0,7)==="sk-ant-") return PV_CLAUDE;
  if(StringSubstr(k,0,6)==="sk-or-") return PV_OPENROUTER;
  if(StringSubstr(k,0,4)==="gsk_") return PV_GROQ;
  if(StringSubstr(k,0,4)==="xai-") return PV_XAI;
  if(StringSubstr(k,0,3)==="sk-") return PV_OPENAI;
  return PV_GEMINI;
}
function ProvHeaders(p,key){
  if(p===PV_GEMINI) return "Content-Type: application/json\r\nx-goog-api-key: "+key+"\r\n";
  if(p===PV_CLAUDE) return "Content-Type: application/json\r\nx-api-key: "+key+"\r\nanthropic-version: 2023-06-01\r\n";
  let h="Content-Type: application/json\r\nAuthorization: Bearer "+key+"\r\n";
  if(p===PV_OPENROUTER) h+="X-Title: GTM AI Trade Core\r\n";
  return h;
}
function BrGetH(url,headers,resp,timeout){
  let data=[],res=[];
  let rh="";
  ResetLastError();
  let code=WebRequest("GET",url,headers,timeout,data,res,rh);
  resp=CharArrayToString(res,0,WHOLE_ARRAY,CP_UTF8);
  if(code===-1) code=-1000-GetLastError();
  { const _rv=code; _R=[resp]; return _rv; }
  _R=[resp];
}
function WebReqHelp(p,e){
  if(e===4014) return "Add "+PVHOST[p]+" to Tools > Options > Expert Advisors > Allow WebRequest";
  return PVNAME[p]+" not reachable (error "+IntegerToString(e)+")";
}
function CandAdd(m){
  if(m==="") return;
  for(let i=0;i<brCandN;i++) if(brCand[i]===m) return;
  ArrayResize(brCand,brCandN+1,()=>"");
  brCand[brCandN]=m;
  brCandN++;
}
function BrDetect(err){
  err="";
  let key=BrKey();
  brProv=ProvOfKey(key);
  brCandN=0;
  ArrayResize(brCand,0,()=>"");
  if(brProv===PV_NONE) {
    err="No AI key yet: paste it in the BRIDGE input 'AI API key'.";
    { const _rv=false; _R=[err]; return _rv; }
  }
  let mine=InpAiModel;
  (_t159=StringTrimLeft(mine),mine=_R[0],_t159);
  (_t160=StringTrimRight(mine),mine=_R[0],_t160);
  let autoM=(mine===""||StringCompare(mine,"auto",false)===0);
  if(!autoM) CandAdd(mine);
  let bp=[];
  let bn=StringSplit(InpAiBackup,44,bp);
  for(let i=0;i<bn;i++) {
    let m=bp[i];
    (_t161=StringTrimLeft(m),m=_R[0],_t161);
    (_t162=StringTrimRight(m),m=_R[0],_t162);
    CandAdd(m);
  }
  let url=((brProv===PV_GEMINI)?PVBASE[brProv]+"/v1beta/models?pageSize=1000":PVBASE[brProv]+"/models");
  let resp="";
  let code=((brProv===PV_OPENROUTER)?200:(_t163=BrGetH(url,ProvHeaders(brProv,key),resp,20000),resp=_R[0],_t163));
  if(code<=-1000&&brProv===PV_OPENAI) {
    let r2="";
    let c2=(_t164=BrGetH(PVBASE[PV_DEEPSEEK]+"/models",ProvHeaders(PV_DEEPSEEK,key),r2,20000),r2=_R[0],_t164);
    if(c2===200) {
      brProv=PV_DEEPSEEK;
      code=200;
      resp=r2;
    }
  }
  if(code<=-1000) {
    err=WebReqHelp(brProv,-(code+1000));
    { const _rv=false; _R=[err]; return _rv; }
  }
  if((code===401||code===403)&&brProv===PV_OPENAI) {
    let r2="";
    let c2=(_t165=BrGetH(PVBASE[PV_DEEPSEEK]+"/models",ProvHeaders(PV_DEEPSEEK,key),r2,20000),r2=_R[0],_t165);
    if(c2===200) {
      brProv=PV_DEEPSEEK;
      code=200;
      resp=r2;
    }
    else if(c2<=-1000&&-(c2+1000)===4014) {
      err="OpenAI refused the key. If it is a DeepSeek key: "+WebReqHelp(PV_DEEPSEEK,4014);
      { const _rv=false; _R=[err]; return _rv; }
    }
  }
  if(code===400||code===401||code===403) {
    let m=JGS(JGet(JParse(resp),"error"),"message");
    err=PVNAME[brProv]+" refused the key ("+IntegerToString(code)+"): "+StringSubstr(m,0,120);
    { const _rv=false; _R=[err]; return _rv; }
  }
  let have=[];
  let hn=0;
  if(code===200&&brProv!==PV_OPENROUTER) {
    let root=JParse(resp);
    let arr=((brProv===PV_GEMINI)?JGet(root,"models"):JGet(root,"data"));
    for(let i=0;i<JLen(arr);i++) {
      let it=JAt(arr,i);
      let id=((brProv===PV_GEMINI)?JGS(it,"name"):JGS(it,"id"));
      if(StringSubstr(id,0,7)==="models/") id=StringSubstr(id,7);
      if(brProv===PV_GEMINI) {
        let sm=JGet(it,"supportedGenerationMethods");
        let gen=false;
        for(let q=0;q<JLen(sm);q++) if(JStr(JAt(sm,q))==="generateContent") gen=true;
        if(!gen) continue;
      }
      ArrayResize(have,hn+1,()=>"");
      have[hn]=id;
      hn++;
    }
  }
  let pref=[];
  switch(brProv) {
    case PV_GEMINI:
      {
        let p=["gemini-flash-latest","gemini-2.5-flash","gemini-flash-lite-latest","gemini-2.5-flash-lite","gemini-2.0-flash"];
        ArrayCopy(pref,p);
        break;
      }
    case PV_OPENAI:
      {
        let p=["gpt-5-mini","gpt-4.1-mini","gpt-4o-mini","gpt-5","gpt-4.1","gpt-4o"];
        ArrayCopy(pref,p);
        break;
      }
    case PV_GROQ:
      {
        let p=["llama-3.3-70b-versatile","openai/gpt-oss-120b","openai/gpt-oss-20b","llama-3.1-8b-instant"];
        ArrayCopy(pref,p);
        break;
      }
    case PV_OPENROUTER:
      {
        let p=["openrouter/auto"];
        ArrayCopy(pref,p);
        break;
      }
    case PV_DEEPSEEK:
      {
        let p=["deepseek-chat"];
        ArrayCopy(pref,p);
        break;
      }
    case PV_XAI:
      {
        let p=["grok-4-fast-non-reasoning","grok-3-mini","grok-4"];
        ArrayCopy(pref,p);
        break;
      }
    case PV_CLAUDE:
      break;
  }
  if(autoM||brCandN<2) {
    if(brProv===PV_CLAUDE) {
      for(let i=0;i<hn;i++) if(StringFind(have[i],"sonnet")>=0) {
        CandAdd(have[i]);
        break;
      }
      for(let i=0;i<hn;i++) if(StringFind(have[i],"haiku")>=0) {
        CandAdd(have[i]);
        break;
      }
      if(hn===0) {
        CandAdd("claude-sonnet-4-5");
        CandAdd("claude-haiku-4-5");
      }
    }
    for(let i=0;i<ArraySize(pref);i++) {
      let ok=(hn===0);
      for(let j=0;j<hn&&!ok;j++) if(have[j]===pref[i]) ok=true;
      if(ok) CandAdd(pref[i]);
    }
    if(brCandN===0) for(let j=0;j<hn&&brCandN<3;j++) {
      let l=have[j];
      (_t166=StringToLower(l),l=_R[0],_t166);
      if(StringFind(l,"embed")>=0||StringFind(l,"tts")>=0||StringFind(l,"whisper")>=0||StringFind(l,"image")>=0||StringFind(l,"audio")>=0||StringFind(l,"realtime")>=0||StringFind(l,"moderation")>=0||StringFind(l,"dall")>=0||StringFind(l,"guard")>=0||StringFind(l,"transcribe")>=0||StringFind(l,"search")>=0||StringFind(l,"live")>=0) continue;
      CandAdd(have[j]);
    }
  }
  if(brCandN===0) {
    err="No usable chat model found for this "+PVNAME[brProv]+" key.";
    { const _rv=false; _R=[err]; return _rv; }
  }
  brModel=brCand[0];
  brDetected=true;
  brTtsModel="";
  if(brProv===PV_GEMINI) for(let j=0;j<hn;j++) if(StringFind(have[j],"tts")>=0&&StringFind(have[j],"flash")>=0) {
    brTtsModel=have[j];
    break;
  }
  Print(InpAIName," bridge: ",PVNAME[brProv]," key - models ",(brCandN>0?brCand[0]:""),(brCandN>1?", "+brCand[1]:""),(brCandN>2?", "+brCand[2]:""));
  { const _rv=true; _R=[err]; return _rv; }
  _R=[err];
}
function VoiceName(mime){
  if(StringFind(mime,"mpeg")>=0||StringFind(mime,"mp3")>=0) return "voice.mp3";
  if(StringFind(mime,"mp4")>=0||StringFind(mime,"m4a")>=0) return "voice.m4a";
  if(StringFind(mime,"wav")>=0) return "voice.wav";
  return "voice.ogg";
}
function BrTranscribe(audio,mime,text,err){
  text="";
  err="";
  let key=BrKey();
  let model=((brProv===PV_GROQ)?"whisper-large-v3-turbo":"whisper-1");
  let bd="GTMAIb0undary7MA9";
  let head="--"+bd+"\r\nContent-Disposition: form-data; name=\"model\"\r\n\r\n"+model+"\r\n"+"--"+bd+"\r\nContent-Disposition: form-data; name=\"file\"; filename=\""+VoiceName(mime)+"\"\r\nContent-Type: "+((mime===""?"audio/ogg":mime))+"\r\n\r\n";
  let tail="\r\n--"+bd+"--\r\n";
  let a=[],b=[];
  let na=StringToCharArray(head,a,0,WHOLE_ARRAY,CP_UTF8)-1;
  let nb=StringToCharArray(tail,b,0,WHOLE_ARRAY,CP_UTF8)-1;
  let nv=ArraySize(audio);
  let data=[];
  ArrayResize(data,na+nv+nb,()=>0);
  for(let i=0;i<na;i++) data[i]=a[i];
  for(let i=0;i<nv;i++) data[na+i]=audio[i];
  for(let i=0;i<nb;i++) data[na+nv+i]=b[i];
  let res=[];
  let rh="";
  ResetLastError();
  let code=WebRequest("POST",PVBASE[brProv]+"/audio/transcriptions","Authorization: Bearer "+key+"\r\nContent-Type: multipart/form-data; boundary="+bd+"\r\n",60000,data,res,rh);
  if(code===-1) {
    err=WebReqHelp(brProv,GetLastError());
    { const _rv=false; _R=[text,err]; return _rv; }
  }
  let resp=CharArrayToString(res,0,WHOLE_ARRAY,CP_UTF8);
  let r=JParse(resp);
  if(code!==200) {
    err=PVNAME[brProv]+" voice "+IntegerToString(code)+": "+StringSubstr(JGS(JGet(r,"error"),"message"),0,120);
    { const _rv=false; _R=[text,err]; return _rv; }
  }
  text=JGS(r,"text");
  { const _rv=text!==""; _R=[text,err]; return _rv; }
  _R=[text,err];
}
function CleanJson(s){
  let a=StringFind(s,"{");
  if(a<0) return s;
  let b=-1,p=a;
  while(true) {
    let q=StringFind(s,"}",p);
    if(q<0) break;
    b=q;
    p=q+1;
  }
  if(b<a) return s;
  return StringSubstr(s,a,b-a+1);
}
function AiAsk(src,userText0,audio,mime,heard){
  heard="";
  let key=BrKey();
  if(key==="") { const _rv=BrReplyJson("No AI key yet. Paste any AI API key (Gemini, OpenAI, Claude, Groq, OpenRouter, DeepSeek or Grok) in the BRIDGE input 'AI API key'. A free one: aistudio.google.com > Get API key."); _R=[heard]; return _rv; }
  let why="";
  if(!brDetected) {
    if(!(_t167=BrDetect(why),why=_R[0],_t167)) {
      brGemOk=false;
      brErr=why;
      { const _rv=BrReplyJson(why); _R=[heard]; return _rv; }
    }
  }
  if(!(_t168=BrRateOk(why),why=_R[0],_t168)) { const _rv=BrReplyJson(why); _R=[heard]; return _rv; }
  let userText=userText0;
  let voice=(ArraySize(audio)>0);
  if(voice&&brProv!==PV_GEMINI) {
    if(brProv===PV_OPENAI||brProv===PV_GROQ) {
      let tx="",er="";
      if(!(_t169=BrTranscribe(audio,mime,tx,er),tx=_R[0],er=_R[1],_t169)) { const _rv=BrReplyJson("I could not hear the voice message. "+er); _R=[heard]; return _rv; }
      heard=tx;
      userText=tx;
      voice=false;
    }
    else if(AzureOn()) {
      let tx="",er="";
      if(!(_t170=AzureStt(audio,tx,er),tx=_R[0],er=_R[1],_t170)) { const _rv=BrReplyJson("I could not hear the voice message. "+er); _R=[heard]; return _rv; }
      heard=tx;
      userText=tx;
      voice=false;
    }
    else { const _rv=BrReplyJson("Voice messages need a Gemini, OpenAI or Groq key (or an Azure Speech key). Please write it as text."); _R=[heard]; return _rv; }
  }
  let state=FReadUtf8(BRDIR+"state.json");
  let ctx="SOURCE: "+src+"\nSTATE: "+state;
  let sys=BridgePrompt();
  let body0="";
  if(brProv===PV_GEMINI) {
    let contents="[";
    let first=true;
    for(let i=0;i<brHN;i++) {
      contents+=((first?"":","))+"{\"role\":"+JQ(brHR[i])+",\"parts\":[{\"text\":"+JQ(brHT[i])+"}]}";
      first=false;
    }
    let parts="{\"text\":"+JQ(ctx)+"}";
    if(voice) {
      let k0=[],b64=[];
      CryptEncode(CRYPT_BASE64,audio,k0,b64);
      let s64=CharArrayToString(b64);
      (_t171=StringReplace(s64,"\r",""),s64=_R[0],_t171);
      (_t172=StringReplace(s64,"\n",""),s64=_R[0],_t172);
      parts+=",{\"text\":\"USER sent a voice message. Put what you heard in 'heard'.\"},{\"inline_data\":{\"mime_type\":"+JQ((mime===""?"audio/ogg":mime))+",\"data\":\""+s64+"\"}}";
    }
    else parts+=",{\"text\":"+JQ("USER: "+userText)+"}";
    contents+=((first?"":","))+"{\"role\":\"user\",\"parts\":["+parts+"]}]";
    body0="{\"system_instruction\":{\"parts\":[{\"text\":"+JQ(sys)+"}]},\"contents\":"+contents+",\"generationConfig\":{\"responseMimeType\":\"application/json\",\"temperature\":0.3,\"maxOutputTokens\":8192}}";
  }
  else {
    let msgs="";
    let lastRole="";
    let cnt=0;
    for(let i=0;i<brHN;i++) {
      let role=((brHR[i]==="model")?"assistant":"user");
      if(cnt===0&&role!=="user") continue;
      if(role===lastRole) continue;
      msgs+=((cnt>0?",":""))+"{\"role\":\""+role+"\",\"content\":"+JQ(brHT[i])+"}";
      lastRole=role;
      cnt++;
    }
    let cur=ctx+"\nUSER: "+userText+"\nAnswer with ONE JSON object only.";
    if(lastRole==="user") {
      msgs+=",{\"role\":\"assistant\",\"content\":\"{\\\"reply\\\":\\\"ok\\\",\\\"reply_en\\\":\\\"ok\\\",\\\"actions\\\":[]}\"}";
    }
    msgs+=((msgs===""?"":","))+"{\"role\":\"user\",\"content\":"+JQ(cur)+"}";
    if(brProv===PV_CLAUDE) body0="\"max_tokens\":4096,\"temperature\":0.3,\"system\":"+JQ(sys)+",\"messages\":["+msgs+"]}";
    else {
      let sm="{\"role\":\"system\",\"content\":"+JQ(sys)+"}";
      body0="\"messages\":["+sm+","+msgs+"]";
      if(brProv===PV_OPENAI) body0+=",\"max_completion_tokens\":6000";
      else body0+=",\"max_tokens\":4096,\"temperature\":0.3";
      if(brProv!==PV_OPENROUTER) body0+=",\"response_format\":{\"type\":\"json_object\"}";
      body0+="}";
    }
  }
  let hd=ProvHeaders(brProv,key);
  let resp="";
  let code=0,root=-1;
  let lastErr="";
  let busy=false,limit=false;
  let tries=IMin(brCandN,4);
  let aiT0=((GetTickCount())>>>0);
  for(let mi=0;mi<tries;mi++) {
    if(mi>0&&GetTickCount()-aiT0>70000) break;
    let m=brCand[mi],url="",body="";
    if(brProv===PV_GEMINI) {
      url=PVBASE[brProv]+"/v1beta/models/"+m+":generateContent";
      body=body0;
    }
    else if(brProv===PV_CLAUDE) {
      url=PVBASE[brProv]+"/messages";
      body="{\"model\":"+JQ(m)+","+body0;
    }
    else {
      url=PVBASE[brProv]+"/chat/completions";
      body="{\"model\":"+JQ(m)+","+body0;
      if(brProv===PV_OPENAI&&StringFind(m,"gpt-5")===0) body="{\"model\":"+JQ(m)+",\"reasoning_effort\":\"low\","+body0;
    }
    for(let tryN=0;tryN<2;tryN++) {
      if(tryN>0&&GetTickCount()-aiT0>70000) break;
      code=(_t173=BrPost(url,hd,body,resp,45000),resp=_R[0],_t173);
      if(code===-1000-5203) {
        busy=true;
        lastErr=PVNAME[brProv]+" timeout ("+m+")";
        break;
      }
      if(code<=-1000) {
        brGemOk=false;
        brErr=WebReqHelp(brProv,-(code+1000));
        { const _rv=BrReplyJson(brErr); _R=[heard]; return _rv; }
      }
      if(code===200) break;
      root=JParse(resp);
      let em=JGS(JGet(root,"error"),"message");
      if(em==="") em=JGS(root,"message");
      lastErr=PVNAME[brProv]+" "+IntegerToString(code)+" ("+m+"): "+StringSubstr(em,0,140);
      Print(InpAIName," bridge: ",lastErr);
      if(code===503||code===500||code===502||code===504||code===529) {
        busy=true;
        if(tryN===0) Sleep(2000);
        continue;
      }
      if(code===429) limit=true;
      break;
    }
    if(code===200) {
      brModel=m;
      break;
    }
    if(code===401||code===403) break;
    if(code===400) {
      let l=lastErr;
      (_t174=StringToLower(l),l=_R[0],_t174);
      if(StringFind(l,"api key")>=0||StringFind(l,"api_key")>=0||StringFind(l,"credit")>=0||StringFind(l,"billing")>=0) break;
    }
  }
  if(code!==200) {
    brGemOk=false;
    brErr=lastErr;
    let l=lastErr;
    (_t175=StringToLower(l),l=_R[0],_t175);
    if(code===401||code===403||StringFind(l,"api key")>=0) {
      brDetected=false;
      { const _rv=BrReplyJson(lastErr+"  - check the 'AI API key' in the BRIDGE inputs."); _R=[heard]; return _rv; }
    }
    if(StringFind(l,"credit")>=0||StringFind(l,"billing")>=0||(StringFind(l,"quota")>=0&&brProv!==PV_GEMINI)) { const _rv=BrReplyJson(lastErr+"  - this key has no credit / quota left."); _R=[heard]; return _rv; }
    if(busy) { const _rv=BrReplyJson(PVNAME[brProv]+" servers are busy right now - I tried "+IntegerToString(tries)+" model(s). Please ask again in a minute."); _R=[heard]; return _rv; }
    if(limit) { const _rv=BrReplyJson(PVNAME[brProv]+" limit is reached for now on all models - try again in a minute (or tomorrow if the daily limit is used up)."); _R=[heard]; return _rv; }
    brDetected=false;
    { const _rv=BrReplyJson(lastErr); _R=[heard]; return _rv; }
  }
  root=JParse(resp);
  brGemOk=true;
  brErr="";
  let out="";
  if(brProv===PV_GEMINI) {
    let cand=JAt(JGet(root,"candidates"),0);
    let prts=JGet(JGet(cand,"content"),"parts");
    for(let i=0;i<JLen(prts);i++) {
      let p=JAt(prts,i);
      if(JGB(p,"thought",false)) continue;
      out+=JGS(p,"text");
    }
    if(out==="") { const _rv=BrReplyJson("The AI gave an empty answer ("+JGS(cand,"finishReason")+")."); _R=[heard]; return _rv; }
  }
  else if(brProv===PV_CLAUDE) {
    let cn=JGet(root,"content");
    for(let i=0;i<JLen(cn);i++) {
      let p=JAt(cn,i);
      if(JGS(p,"type")==="text") out+=JGS(p,"text");
    }
    if(out==="") { const _rv=BrReplyJson("The AI gave an empty answer ("+JGS(root,"stop_reason")+")."); _R=[heard]; return _rv; }
  }
  else {
    let ch=JAt(JGet(root,"choices"),0);
    out=JGS(JGet(ch,"message"),"content");
    if(out==="") { const _rv=BrReplyJson("The AI gave an empty answer ("+JGS(ch,"finish_reason")+")."); _R=[heard]; return _rv; }
  }
  out=CleanJson(out);
  let r2=JParse(out);
  if(r2<0) { const _rv=BrReplyJson(out); _R=[heard]; return _rv; }
  if(heard==="") heard=JGS(r2,"heard");
  BrMem("user",(voice?((heard!==""?heard:"(voice message)")):userText));
  BrMem("model",JGS(r2,"reply_en")+" | actions: "+StringSubstr(JDump(JGet(r2,"actions")),0,600));
  if(heard!==""&&JGS(r2,"heard")==="") { const _rv=StringSubstr(out,0,StringLen(out)-1)+",\"heard\":"+JQ(heard)+"}"; _R=[heard]; return _rv; }
  { const _rv=out; _R=[heard]; return _rv; }
  _R=[heard];
}
function TgOwnerLoad(){
  brOwner=InpTgChat;
  if(brOwner!==0) return;
  let s=FReadUtf8(TGOWNFILE);
  (_t176=StringTrimLeft(s),s=_R[0],_t176);
  (_t177=StringTrimRight(s),s=_R[0],_t177);
  if(s!=="") brOwner=StringToInteger(s);
}
function TgOwnerSave(id){
  brOwner=id;
  FWriteAtomic(TGOWNFILE,IntegerToString(id));
}
var brVoiceMode=-1;
var VOICEDIR="GTM_AI\\voice\\";
function AzureOn(){
  return !IsPlaceholder(InpTtsKey);
}
function BrCanSpeak(){
  return AzureOn()||brProv===PV_OPENAI||brProv===PV_GEMINI;
}
function SsmlEsc(s){
  (_t178=StringReplace(s,"&","&amp;"),s=_R[0],_t178);
  (_t179=StringReplace(s,"<","&lt;"),s=_R[0],_t179);
  (_t180=StringReplace(s,">","&gt;"),s=_R[0],_t180);
  (_t181=StringReplace(s,"\"","&quot;"),s=_R[0],_t181);
  (_t182=StringReplace(s,"'","&apos;"),s=_R[0],_t182);
  return s;
}
function LocaleOf(code){
  let c=code;
  (_t183=StringToLower(c),c=_R[0],_t183);
  if(StringLen(c)>2&&StringFind(c,"-")===2) return c;
  let k=["si","en","ta","hi","bn","ml","te","kn","mr","gu","ur","ar","fr","de","es","it","pt","ru","zh","ja","ko","id","ms","th","vi","tr","nl","pl","uk","fa","ne","fil"];
  let v=["si-LK","en-GB","ta-LK","hi-IN","bn-IN","ml-IN","te-IN","kn-IN","mr-IN","gu-IN","ur-PK","ar-SA","fr-FR","de-DE","es-ES","it-IT","pt-BR","ru-RU","zh-CN","ja-JP","ko-KR","id-ID","ms-MY","th-TH","vi-VN","tr-TR","nl-NL","pl-PL","uk-UA","fa-IR","ne-NP","fil-PH"];
  for(let i=0;i<ArraySize(k)&&i<ArraySize(v);i++) if(k[i]===c) return v[i];
  return "en-US";
}
function AzureVoice(loc){
  if(loc==="si-LK") return "si-LK-SameeraNeural";
  if(loc==="ta-LK") return "ta-LK-KumarNeural";
  if(loc==="en-GB") return "en-GB-RyanNeural";
  if(loc==="hi-IN") return "hi-IN-MadhurNeural";
  if(loc==="ur-PK") return "ur-PK-AsadNeural";
  if(loc==="ar-SA") return "ar-SA-HamedNeural";
  if(loc==="bn-IN") return "bn-IN-BashkarNeural";
  if(loc==="ml-IN") return "ml-IN-MidhunNeural";
  if(loc==="te-IN") return "te-IN-MohanNeural";
  if(loc==="kn-IN") return "kn-IN-GaganNeural";
  if(loc==="mr-IN") return "mr-IN-ManoharNeural";
  if(loc==="gu-IN") return "gu-IN-NiranjanNeural";
  if(loc==="ne-NP") return "ne-NP-SagarNeural";
  return "en-US-AndrewMultilingualNeural";
}
function BrPostRaw(url,headers,data,out,txt,timeout){
  let res=[];
  let rh="";
  ResetLastError();
  let code=WebRequest("POST",url,headers,timeout,data,res,rh);
  if(code===-1) { const _rv=-1000-GetLastError(); _R=[txt]; return _rv; }
  let n=ArraySize(res);
  ArrayResize(out,n,()=>0);
  for(let i=0;i<n;i++) out[i]=(Math.trunc(res[i])&255);
  txt=((code===200)?"":CharArrayToString(res,0,WHOLE_ARRAY,CP_UTF8));
  { const _rv=code; _R=[txt]; return _rv; }
  _R=[txt];
}
function StrBytes(s,d){
  let n=StringToCharArray(s,d,0,WHOLE_ARRAY,CP_UTF8);
  if(n>0) ArrayResize(d,n-1,()=>0);
  return ArraySize(d);
}
function WavFromPcm(pcm,rate,out){
  let n=ArraySize(pcm);
  ArrayResize(out,44+n,()=>0);
  let h=_AFILL([82,73,70,70,0,0,0,0,87,65,86,69,102,109,116,32,16,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,2,0,16,0,100,97,116,97,0,0,0,0],44,0);
  let riff=36+n,br=rate*2;
  h[4]=(Math.trunc((riff&255))&255);
  h[5]=(Math.trunc(((riff>>8)&255))&255);
  h[6]=(Math.trunc(((riff>>16)&255))&255);
  h[7]=(Math.trunc(((riff>>24)&255))&255);
  h[24]=(Math.trunc((rate&255))&255);
  h[25]=(Math.trunc(((rate>>8)&255))&255);
  h[26]=(Math.trunc(((rate>>16)&255))&255);
  h[27]=(Math.trunc(((rate>>24)&255))&255);
  h[28]=(Math.trunc((br&255))&255);
  h[29]=(Math.trunc(((br>>8)&255))&255);
  h[30]=(Math.trunc(((br>>16)&255))&255);
  h[31]=(Math.trunc(((br>>24)&255))&255);
  h[40]=(Math.trunc((n&255))&255);
  h[41]=(Math.trunc(((n>>8)&255))&255);
  h[42]=(Math.trunc(((n>>16)&255))&255);
  h[43]=(Math.trunc(((n>>24)&255))&255);
  for(let i=0;i<44;i++) out[i]=h[i];
  for(let i=0;i<n;i++) out[44+i]=pcm[i];
}
function B64Field(resp,out){
  let p=StringFind(resp,"\"data\"");
  if(p<0) return false;
  p=StringFind(resp,"\"",p+6);
  if(p<0) return false;
  let q=StringFind(resp,"\"",p+1);
  if(q<0) return false;
  let b=StringSubstr(resp,p+1,q-p-1);
  let src=[],key=[];
  let n=StringToCharArray(b,src,0,WHOLE_ARRAY,CP_ACP);
  if(n>0) ArrayResize(src,n-1,()=>0);
  return CryptDecode(CRYPT_BASE64,src,key,out)>0;
}
function TtsMake(text,code,ogg,out,ext,err){
  err="";
  ext="wav";
  ArrayResize(out,0,()=>0);
  if(StringLen(text)>2500) text=StringSubstr(text,0,2500);
  let loc=LocaleOf(code);
  if(AzureOn()) {
    let v=AzureVoice(loc);
    let ssml="<speak version='1.0' xml:lang='"+loc+"'><voice name='"+v+"'>"+((StringFind(v,"Multilingual")>0?"<lang xml:lang='"+loc+"'>"+SsmlEsc(text)+"</lang>":SsmlEsc(text)))+"</voice></speak>";
    let d=[];
    StrBytes(ssml,d);
    let hd="Ocp-Apim-Subscription-Key: "+InpTtsKey+"\r\nContent-Type: application/ssml+xml\r\nX-Microsoft-OutputFormat: "+((ogg?"ogg-24khz-16bit-mono-opus":"riff-24khz-16bit-mono-pcm"))+"\r\nUser-Agent: GTMAI\r\n";
    let tx="";
    let c=(_t184=BrPostRaw("https://"+InpTtsRegion+".tts.speech.microsoft.com/cognitiveservices/v1",hd,d,out,tx,60000),tx=_R[0],_t184);
    if(c===200&&ArraySize(out)>100) {
      ext=(ogg?"ogg":"wav");
      { const _rv=true; _R=[ext,err]; return _rv; }
    }
    err=((c<=-1000)?("Add https://"+InpTtsRegion+".tts.speech.microsoft.com to Allow WebRequest"):("Azure speech "+IntegerToString(c)+" "+StringSubstr(tx,0,100)));
    if(brProv!==PV_OPENAI&&brProv!==PV_GEMINI) { const _rv=false; _R=[ext,err]; return _rv; }
  }
  let key=BrKey();
  if(brProv===PV_OPENAI) {
    let body="{\"model\":\"gpt-4o-mini-tts\",\"voice\":\"onyx\",\"input\":"+JQ(text)+",\"response_format\":\""+((ogg?"opus":"wav"))+"\"}";
    let d=[];
    StrBytes(body,d);
    let tx="";
    let c=(_t185=BrPostRaw(PVBASE[PV_OPENAI]+"/audio/speech",ProvHeaders(PV_OPENAI,key),d,out,tx,90000),tx=_R[0],_t185);
    if(c!==200) {
      body="{\"model\":\"tts-1\",\"voice\":\"onyx\",\"input\":"+JQ(text)+",\"response_format\":\""+((ogg?"opus":"wav"))+"\"}";
      StrBytes(body,d);
      c=(_t186=BrPostRaw(PVBASE[PV_OPENAI]+"/audio/speech",ProvHeaders(PV_OPENAI,key),d,out,tx,90000),tx=_R[0],_t186);
    }
    if(c===200&&ArraySize(out)>100) {
      ext=(ogg?"ogg":"wav");
      { const _rv=true; _R=[ext,err]; return _rv; }
    }
    err=((c<=-1000)?WebReqHelp(PV_OPENAI,-(c+1000)):("OpenAI speech "+IntegerToString(c)+" "+StringSubstr(JGS(JGet(JParse(tx),"error"),"message"),0,100)));
    { const _rv=false; _R=[ext,err]; return _rv; }
  }
  if(brProv===PV_GEMINI) {
    let m=((brTtsModel!=="")?brTtsModel:"gemini-2.5-flash-preview-tts");
    let body="{\"contents\":[{\"parts\":[{\"text\":"+JQ("Read this aloud in a calm, friendly voice, in its own language:\n"+text)+"}]}],"+"\"generationConfig\":{\"responseModalities\":[\"AUDIO\"],\"speechConfig\":{\"voiceConfig\":{\"prebuiltVoiceConfig\":{\"voiceName\":\"Charon\"}}}}}";
    let resp="";
    let c=(_t187=BrPost(PVBASE[PV_GEMINI]+"/v1beta/models/"+m+":generateContent",ProvHeaders(PV_GEMINI,key),body,resp,120000),resp=_R[0],_t187);
    if(c===200) {
      let pcm=[];
      if(B64Field(resp,pcm)&&ArraySize(pcm)>100) {
        let rate=24000;
        let rp=StringFind(resp,"rate=");
        if(rp>0) {
          let r=StringToInteger(StringSubstr(resp,rp+5,6));
          if(r>=8000&&r<=48000) rate=r;
        }
        WavFromPcm(pcm,rate,out);
        ext="wav";
        { const _rv=true; _R=[ext,err]; return _rv; }
      }
      err="Gemini voice gave no audio for this language (Gemini voice does not speak every language - for Sinhala use an Azure Speech key)";
      { const _rv=false; _R=[ext,err]; return _rv; }
    }
    err=((c<=-1000)?WebReqHelp(PV_GEMINI,-(c+1000)):("Gemini speech "+IntegerToString(c)+" ("+m+"): "+StringSubstr(JGS(JGet(JParse(resp),"error"),"message"),0,100)));
    { const _rv=false; _R=[ext,err]; return _rv; }
  }
  if(err==="") err="Voice replies need a Gemini or OpenAI key, or an Azure Speech key (best for Sinhala).";
  { const _rv=false; _R=[ext,err]; return _rv; }
  _R=[ext,err];
}
function AzureStt(audio,text,err){
  text="";
  err="";
  if(!AzureOn()) {
    err="no Azure key";
    { const _rv=false; _R=[text,err]; return _rv; }
  }
  let loc=InpSpeechLang;
  (_t188=StringTrimLeft(loc),loc=_R[0],_t188);
  (_t189=StringTrimRight(loc),loc=_R[0],_t189);
  if(loc==="") loc="si-LK";
  let d=[];
  let n=ArraySize(audio);
  ArrayResize(d,n,()=>0);
  for(let i=0;i<n;i++) d[i]=audio[i];
  let out=[];
  let tx="";
  let c=(_t190=BrPostRaw("https://"+InpTtsRegion+".stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language="+loc+"&format=simple","Ocp-Apim-Subscription-Key: "+InpTtsKey+"\r\nContent-Type: audio/ogg; codecs=opus\r\nAccept: application/json\r\n",d,out,tx,60000),tx=_R[0],_t190);
  if(c<=-1000) {
    err="Add https://"+InpTtsRegion+".stt.speech.microsoft.com to Allow WebRequest";
    { const _rv=false; _R=[text,err]; return _rv; }
  }
  let resp=CharArrayToString(out,0,WHOLE_ARRAY,CP_UTF8);
  if(c!==200) {
    err="Azure listening "+IntegerToString(c);
    { const _rv=false; _R=[text,err]; return _rv; }
  }
  let r=JParse(resp);
  text=JGS(r,"DisplayText");
  if(text==="") {
    err="Azure heard nothing ("+JGS(r,"RecognitionStatus")+")";
    { const _rv=false; _R=[text,err]; return _rv; }
  }
  { const _rv=true; _R=[text,err]; return _rv; }
  _R=[text,err];
}
function AiSimple(sys,user,out,err){
  out="";
  err="";
  let key=BrKey();
  if(key==="") {
    err="no AI key";
    { const _rv=false; _R=[out,err]; return _rv; }
  }
  if(!brDetected&&!(_t191=BrDetect(err),err=_R[0],_t191)) { const _rv=false; _R=[out,err]; return _rv; }
  let why="";
  if(!(_t192=BrRateOk(why),why=_R[0],_t192)) {
    err=why;
    { const _rv=false; _R=[out,err]; return _rv; }
  }
  let hd=ProvHeaders(brProv,key);
  for(let mi=0;mi<IMin(brCandN,3);mi++) {
    let m=brCand[mi],url="",body="";
    if(brProv===PV_GEMINI) {
      url=PVBASE[brProv]+"/v1beta/models/"+m+":generateContent";
      body="{\"system_instruction\":{\"parts\":[{\"text\":"+JQ(sys)+"}]},\"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":"+JQ(user)+"}]}],\"generationConfig\":{\"responseMimeType\":\"application/json\",\"temperature\":0.2,\"maxOutputTokens\":8192}}";
    }
    else if(brProv===PV_CLAUDE) {
      url=PVBASE[brProv]+"/messages";
      body="{\"model\":"+JQ(m)+",\"max_tokens\":4096,\"system\":"+JQ(sys)+",\"messages\":[{\"role\":\"user\",\"content\":"+JQ(user)+"}]}";
    }
    else {
      url=PVBASE[brProv]+"/chat/completions";
      body="{\"model\":"+JQ(m)+","+((brProv===PV_OPENAI&&StringFind(m,"gpt-5")===0?"\"reasoning_effort\":\"low\",":""))+"\"messages\":[{\"role\":\"system\",\"content\":"+JQ(sys)+"},{\"role\":\"user\",\"content\":"+JQ(user)+"}]"+((brProv===PV_OPENAI?",\"max_completion_tokens\":6000":",\"max_tokens\":4096"))+((brProv!==PV_OPENROUTER?",\"response_format\":{\"type\":\"json_object\"}":""))+"}";
    }
    let resp="";
    let code=(_t193=BrPost(url,hd,body,resp,90000),resp=_R[0],_t193);
    if(code===503||code===500||code===529) {
      Sleep(1500);
      code=(_t194=BrPost(url,hd,body,resp,90000),resp=_R[0],_t194);
    }
    if(code<=-1000) {
      err=WebReqHelp(brProv,-(code+1000));
      { const _rv=false; _R=[out,err]; return _rv; }
    }
    if(code!==200) {
      err=PVNAME[brProv]+" "+IntegerToString(code);
      continue;
    }
    let root=JParse(resp);
    if(brProv===PV_GEMINI) {
      let prts=JGet(JGet(JAt(JGet(root,"candidates"),0),"content"),"parts");
      for(let i=0;i<JLen(prts);i++) {
        let p=JAt(prts,i);
        if(!JGB(p,"thought",false)) out+=JGS(p,"text");
      }
    }
    else if(brProv===PV_CLAUDE) {
      let cn=JGet(root,"content");
      for(let i=0;i<JLen(cn);i++) {
        let p=JAt(cn,i);
        if(JGS(p,"type")==="text") out+=JGS(p,"text");
      }
    }
    else out=JGS(JGet(JAt(JGet(root,"choices"),0),"message"),"content");
    out=CleanJson(out);
    if(out!=="") { const _rv=true; _R=[out,err]; return _rv; }
  }
  if(err==="") err="no answer";
  { const _rv=false; _R=[out,err]; return _rv; }
  _R=[out,err];
}
function BrTranslate(r){
  let code=JGS(r,"code"),lang=JGS(r,"lang");
  let it=JGet(r,"items");
  let list="[";
  for(let i=0;i<JLen(it);i++) list+=((i>0?",":""))+JQ(JStr(JAt(it,i)));
  list+="]";
  let sys="You translate the user interface of a MetaTrader 5 trading robot from English to "+lang+" ("+code+"). "+"Return ONE JSON object: {\"map\":{\"<English text exactly as given>\":\"<translation>\", ...}} with every item. "+"Keep translations short (similar length, they are buttons and labels). Keep trading words people use as they are when that is normal in "+lang+" (BUY, SELL, SL, TP, P/L, LIVE, SIM, MA, RSI, SMC...). Never translate symbol names, codes or abbreviations. Use the native script of the language.";
  let out="",err="";
  brBusy=true;
  BridgeBeat();
  let okT=(_t195=AiSimple(sys,list,out,err),out=_R[0],err=_R[1],_t195);
  brBusy=false;
  if(!okT) {
    Print(InpAIName," bridge: translate failed - ",err);
    MailSend("b2p_","{\"kind\":\"lang\",\"code\":"+JQ(code)+",\"map\":{},\"fail\":true}");
    return;
  }
  let root=JParse(out);
  let m=JGet(root,"map");
  if(m<0) {
    MailSend("b2p_","{\"kind\":\"lang\",\"code\":"+JQ(code)+",\"map\":{},\"fail\":true}");
    return;
  }
  MailSend("b2p_","{\"kind\":\"lang\",\"code\":"+JQ(code)+",\"map\":"+JDump(m)+"}");
}
function BrTtsJob(r){
  let key=JGS(r,"key"),text=JGS(r,"text"),code=JGS(r,"code","en"),lang=JGS(r,"lang");
  let tr=JGB(r,"translate",false),play=JGB(r,"play",true);
  if(key===""||text==="") return;
  if(tr&&code!=="en") {
    let out="",err="";
    let sys="Translate the user's sentence from English to "+lang+" ("+code+") for a voice that reads it aloud. Write money as words if that sounds natural. Keep trading words (buy, sell, stop loss, take profit) the way traders say them in "+lang+". Symbol names stay as they are, said naturally. Return ONE JSON object: {\"t\":\"<translation>\"}";
    let t="";
    brBusy=true;
    BridgeBeat();
    if((_t196=AiSimple(sys,text,out,err),out=_R[0],err=_R[1],_t196)) t=JGS(JParse(out),"t");
    brBusy=false;
    if(t==="") {
      MailSend("b2p_","{\"kind\":\"tts\",\"key\":"+JQ(key)+",\"ok\":false,\"err\":\"translation failed\"}");
      return;
    }
    text=t;
  }
  let wav=[];
  let ext="",err="";
  brBusy=true;
  BridgeBeat();
  let okS=(_t197=TtsMake(text,code,false,wav,ext,err),ext=_R[0],err=_R[1],_t197);
  brBusy=false;
  if(!okS) {
    brErr=err;
    Print(InpAIName," bridge: speech failed - ",err);
    MailSend("b2p_","{\"kind\":\"tts\",\"key\":"+JQ(key)+",\"ok\":false,\"err\":"+JQ(err)+"}");
    return;
  }
  let rel=VOICEDIR+key+".wav";
  FolderCreate("GTM_AI\\voice");
  let f=FileOpen(rel,FILE_WRITE|FILE_BIN);
  if(f===INVALID_HANDLE) {
    MailSend("b2p_","{\"kind\":\"tts\",\"key\":"+JQ(key)+",\"ok\":false,\"err\":\"could not save the voice file\"}");
    return;
  }
  FileWriteArray(f,wav);
  FileClose(f);
  let rate=wav[28]|(wav[29]<<8)|(wav[30]<<16)|(wav[31]<<24);
  let ms=((rate>0)?Math.trunc(((ArraySize(wav)-44)*1000.0/rate)):0);
  MailSend("b2p_","{\"kind\":\"tts\",\"key\":"+JQ(key)+",\"ok\":true,\"play\":"+((play?"true":"false"))+",\"file\":"+JQ(rel)+",\"ms\":"+IntegerToString(ms)+"}");
}
function TgUpload(method,field,fname,mime,bytes,caption,extra=""){
  let tok=BrTok();
  if(tok===""||brOwner===0) return -1;
  let bd="GTMAIform7x9Q";
  let head="--"+bd+"\r\nContent-Disposition: form-data; name=\"chat_id\"\r\n\r\n"+IntegerToString(brOwner)+"\r\n";
  if(caption!=="") head+="--"+bd+"\r\nContent-Disposition: form-data; name=\"caption\"\r\n\r\n"+StringSubstr(caption,0,1000)+"\r\n";
  if(extra!=="") head+="--"+bd+"\r\nContent-Disposition: form-data; name=\"reply_markup\"\r\n\r\n"+extra+"\r\n";
  head+="--"+bd+"\r\nContent-Disposition: form-data; name=\""+field+"\"; filename=\""+fname+"\"\r\nContent-Type: "+mime+"\r\n\r\n";
  let tail="\r\n--"+bd+"--\r\n";
  let a=[],b=[];
  StrBytes(head,a);
  StrBytes(tail,b);
  let na=ArraySize(a),nv=ArraySize(bytes),nb=ArraySize(b);
  let data=[];
  ArrayResize(data,na+nv+nb,()=>0);
  for(let i=0;i<na;i++) data[i]=a[i];
  for(let i=0;i<nv;i++) data[na+i]=bytes[i];
  for(let i=0;i<nb;i++) data[na+nv+i]=b[i];
  let out=[];
  let tx="";
  let c=(_t198=BrPostRaw("https://api.telegram.org/bot"+tok+"/"+method,"Content-Type: multipart/form-data; boundary="+bd+"\r\n",data,out,tx,60000),tx=_R[0],_t198);
  if(c!==200) {
    brErr="Telegram "+method+" "+IntegerToString(c)+" "+StringSubstr(JGS(JParse(tx),"description"),0,80);
    Print(InpAIName," bridge: ",brErr);
  }
  return c;
}
function ReadBin(rel,bytes){
  let f=FileOpen(rel,FILE_READ|FILE_BIN);
  if(f===INVALID_HANDLE) return false;
  ArrayResize(bytes,0,()=>0);
  FileReadArray(f,bytes);
  FileClose(f);
  return ArraySize(bytes)>0;
}
function TgSendPhoto(rel,cap){
  let b=[];
  if(!ReadBin(rel,b)) {
    TgSend(brOwner,"(picture not found)");
    return;
  }
  TgUpload("sendPhoto","photo","panel.png","image/png",b,cap);
  FileDelete(rel);
}
function TgVoiceReply(text,code){
  if(text===""||brOwner===0) return;
  let r="";
  (_t199=TgCall("sendChatAction","{\"chat_id\":"+IntegerToString(brOwner)+",\"action\":\"record_voice\"}",r),r=_R[0],_t199);
  let au=[];
  let ext="",err="";
  if(!(_t200=TtsMake(text,code,true,au,ext,err),ext=_R[0],err=_R[1],_t200)) {
    TgSend(brOwner,"🔇 Voice reply failed: "+err);
    return;
  }
  if(ext==="ogg") {
    TgUpload("sendVoice","voice","reply.ogg","audio/ogg",au,"");
    return;
  }
  if(TgUpload("sendAudio","audio","reply.wav","audio/wav",au,"🔊")!==200) TgUpload("sendDocument","document","reply.wav","audio/wav",au,"🔊");
}
function VoiceMode(){
  return (brVoiceMode>=0?brVoiceMode:Math.trunc(InpTgVoice));
}
function TgMenuKb(){
  return "{\"inline_keyboard\":["+"[{\"text\":\"📊 Status\",\"callback_data\":\"m:status\"},{\"text\":\"📈 Open trades\",\"callback_data\":\"m:open\"},{\"text\":\"📅 Report\",\"callback_data\":\"m:report\"}],"+"[{\"text\":\"🖼 Trade chart\",\"callback_data\":\"m:chart\"},{\"text\":\"🖥 Dashboard\",\"callback_data\":\"m:shot:dashboard\"},{\"text\":\"📉 Live tab\",\"callback_data\":\"m:shot:live\"}],"+"[{\"text\":\"🛡 BE all\",\"callback_data\":\"m:beall\"},{\"text\":\"〰 Trailing all\",\"callback_data\":\"m:trailall\"},{\"text\":\"💰 Close profit\",\"callback_data\":\"m:closeprofit\"}],"+"[{\"text\":\"⏸ Pause\",\"callback_data\":\"m:pause\"},{\"text\":\"▶ Run\",\"callback_data\":\"m:run\"},{\"text\":\"🛡 Guard\",\"callback_data\":\"m:guard\"}],"+"[{\"text\":\"❌ Close ALL\",\"callback_data\":\"m:closeall\"},{\"text\":\"🚨 EMERGENCY STOP\",\"callback_data\":\"m:emergency\"}],"+"[{\"text\":\""+((VoiceMode()===2?"🔊 Voice replies: always":((VoiceMode()===1?"🔉 Voice replies: to voice":"🔇 Voice replies: off"))))+"\",\"callback_data\":\"m:voice\"}]]}";
}
function TgMenu(){
  let resp="";
  (_t201=TgCall("sendMessage","{\"chat_id\":"+IntegerToString(brOwner)+",\"text\":"+JQ("🎛 "+InpAIName+" remote control")+",\"reply_markup\":"+TgMenuKb()+"}",resp),resp=_R[0],_t201);
}
function TgConfirm(what,cb){
  let resp="";
  (_t202=TgCall("sendMessage","{\"chat_id\":"+IntegerToString(brOwner)+",\"text\":"+JQ("⚠ "+what+" - are you sure?")+",\"reply_markup\":{\"inline_keyboard\":[[{\"text\":\"✅ YES\",\"callback_data\":\"m:"+cb+"!"+IntegerToString(TimeLocal())+"\"},{\"text\":\"✖ NO\",\"callback_data\":\"m:none\"}]]}}",resp),resp=_R[0],_t202);
}
function TgMenuPress(cmd){
  if(cmd==="none") return;
  let bang=StringFind(cmd,"!");
  if(bang>0) {
    let ts=StringToInteger(StringSubstr(cmd,bang+1));
    if(ts<=0||TimeLocal()-ts>120) {
      TgSend(brOwner,"⌛ That confirmation is too old. Press the button again.");
      return;
    }
    cmd=StringSubstr(cmd,0,bang+1);
  }
  if(cmd==="voice") {
    brVoiceMode=((VoiceMode()+1)%3);
    TgSend(brOwner,(VoiceMode()===2?"🔊 I answer with a voice note every time.":((VoiceMode()===1?"🔉 I answer with voice when you send voice.":"🔇 Voice replies are off."))));
    return;
  }
  if(cmd==="closeall") {
    TgConfirm("Close ALL open trades","closeall");
    return;
  }
  if(cmd==="emergency") {
    TgConfirm("EMERGENCY STOP: pause and close ALL trades","emergency");
    return;
  }
  if(cmd==="menu") {
    TgMenu();
    return;
  }
  MailSend("b2p_","{\"kind\":\"menu\",\"cmd\":"+JQ(cmd)+"}");
}
function TgSetCommands(){
  let resp="";
  (_t203=TgCall("setMyCommands","{\"commands\":["+"{\"command\":\"menu\",\"description\":\"Remote control buttons\"},"+"{\"command\":\"status\",\"description\":\"Account and trades now\"},"+"{\"command\":\"chart\",\"description\":\"Picture of the trade chart\"},"+"{\"command\":\"shot\",\"description\":\"Picture of the panel\"},"+"{\"command\":\"report\",\"description\":\"Today / week / month\"},"+"{\"command\":\"voice\",\"description\":\"Voice replies on / off\"},"+"{\"command\":\"help\",\"description\":\"What you can say\"}]}",resp),resp=_R[0],_t203);
}
function TgUrl(method){
  return "https://api.telegram.org/bot"+BrTok()+"/"+method;
}
function TgCall(method,json,resp){
  let code=(_t204=BrPost(TgUrl(method),"Content-Type: application/json\r\n",json,resp,15000),resp=_R[0],_t204);
  if(code<=-1000) {
    let e=-(code+1000);
    brTgOk=false;
    brErr=((e===4014)?"Add https://api.telegram.org to Tools > Options > Expert Advisors > Allow WebRequest":"Telegram not reachable (error "+IntegerToString(e)+")");
  }
  else if(code===200) brTgOk=true;
  else {
    brTgOk=false;
    let r=JParse(resp);
    brErr="Telegram "+IntegerToString(code)+": "+JGS(r,"description");
  }
  { const _rv=code; _R=[resp]; return _rv; }
  _R=[resp];
}
function TgSend(chat,text,approveId=0){
  if(BrTok()===""||chat===0) return;
  if(StringLen(text)>3900) text=StringSubstr(text,0,3900)+"...";
  let js="{\"chat_id\":"+IntegerToString(chat)+",\"text\":"+JQ(text);
  if(approveId>0) js+=",\"reply_markup\":{\"inline_keyboard\":[[{\"text\":\"✅ APPLY\",\"callback_data\":\"ok:"+IntegerToString(approveId)+"\"},{\"text\":\"✖ CANCEL\",\"callback_data\":\"no:"+IntegerToString(approveId)+"\"}]]}";
  js+="}";
  let resp="";
  (_t205=TgCall("sendMessage",js,resp),resp=_R[0],_t205);
}
function TgDownload(fileId,bytes){
  let resp="";
  brBusy=true;
  BridgeBeat();
  let dlOk=((_t206=TgCall("getFile","{\"file_id\":"+JQ(fileId)+"}",resp),resp=_R[0],_t206)===200);
  if(!dlOk) {
    brBusy=false;
    return false;
  }
  let path=JGS(JGet(JParse(resp),"result"),"file_path");
  if(path==="") {
    brBusy=false;
    return false;
  }
  let code=BrGet("https://api.telegram.org/file/bot"+BrTok()+"/"+path,bytes,30000);
  brBusy=false;
  return code===200&&ArraySize(bytes)>0;
}
function BrHandleUser(src,chat,text,audio,mime){
  if(src==="telegram") {
    let r="";
    (_t207=TgCall("sendChatAction","{\"chat_id\":"+IntegerToString(chat)+",\"action\":\"typing\"}",r),r=_R[0],_t207);
  }
  let heard="";
  brBusy=true;
  BridgeBeat();
  let js=(_t208=AiAsk(src,text,audio,mime,heard),heard=_R[0],_t208);
  brBusy=false;
  MailSend("b2p_","{\"kind\":\"ai\",\"source\":"+JQ(src)+",\"heard\":"+JQ(heard)+",\"json\":"+JQ(js)+"}");
  let vm=VoiceMode();
  if(src==="telegram"&&(vm===2||(vm===1&&ArraySize(audio)>0))&&BrCanSpeak()) {
    let r=JParse(js);
    let rp=JGS(r,"reply"),lc=JGS(r,"lang");
    if(rp==="") rp=JGS(r,"reply_en");
    if(lc==="") lc=((ArraySize(audio)>0)?StringSubstr(InpSpeechLang,0,2):"en");
    brBusy=true;
    BridgeBeat();
    TgVoiceReply(rp,lc);
    brBusy=false;
  }
  BridgeBeat();
}
function TgPoll(){
  if(BrTok()==="") return;
  let resp="";
  let js="{\"offset\":"+IntegerToString(brTgOffset)+",\"timeout\":0,\"limit\":5,\"allowed_updates\":[\"message\",\"callback_query\"]}";
  if((_t209=TgCall("getUpdates",js,resp),resp=_R[0],_t209)!==200) return;
  let root=JParse(resp),res=JGet(root,"result");
  let n=JLen(res);
  let chats=[];
  let texts=[],files=[],mimes=[],cbIds=[],cbData=[];
  let kinds=[];
  ArrayResize(chats,n,()=>0);
  ArrayResize(texts,n,()=>"");
  ArrayResize(files,n,()=>"");
  ArrayResize(mimes,n,()=>"");
  ArrayResize(cbIds,n,()=>"");
  ArrayResize(cbData,n,()=>"");
  ArrayResize(kinds,n,()=>0);
  for(let i=0;i<n;i++) {
    let u=JAt(res,i);
    let uid=Math.trunc(JGN(u,"update_id"));
    if(uid>=brTgOffset) brTgOffset=uid+1;
    kinds[i]=0;
    texts[i]="";
    files[i]="";
    mimes[i]="";
    cbIds[i]="";
    cbData[i]="";
    chats[i]=0;
    let cq=JGet(u,"callback_query");
    if(cq>=0) {
      kinds[i]=3;
      cbIds[i]=JGS(cq,"id");
      cbData[i]=JGS(cq,"data");
      chats[i]=Math.trunc(JGN(JGet(JGet(cq,"message"),"chat"),"id"));
      continue;
    }
    let m=JGet(u,"message");
    if(m<0) continue;
    chats[i]=Math.trunc(JGN(JGet(m,"chat"),"id"));
    let v=JGet(m,"voice");
    if(v<0) v=JGet(m,"audio");
    if(v>=0) {
      kinds[i]=2;
      files[i]=JGS(v,"file_id");
      mimes[i]=JGS(v,"mime_type","audio/ogg");
      continue;
    }
    texts[i]=JGS(m,"text");
    if(texts[i]!=="") kinds[i]=1;
  }
  for(let i=0;i<n;i++) {
    if(kinds[i]===0) continue;
    if(brOwner===0) {
      if(kinds[i]===1&&StringSubstr(texts[i],0,6)==="/start") {
        TgOwnerSave(chats[i]);
        TgSend(chats[i],"✅ Connected! This chat (id "+IntegerToString(chats[i])+") is now the only one "+InpAIName+" listens to.\nWrite or send a voice message. Send /help for examples.");
        BridgeBeat();
      }
      else TgSend(chats[i],"Send /start to connect this chat to "+InpAIName+".");
      continue;
    }
    if(chats[i]!==brOwner) continue;
    if(kinds[i]===3) {
      let r="";
      (_t210=TgCall("answerCallbackQuery","{\"callback_query_id\":"+JQ(cbIds[i])+"}",r),r=_R[0],_t210);
      let d=cbData[i];
      if(StringSubstr(d,0,3)==="ok:"||StringSubstr(d,0,3)==="no:") MailSend("b2p_","{\"kind\":\"approve\",\"id\":"+StringSubstr(d,3)+",\"ok\":"+((StringSubstr(d,0,3)==="ok:"?"true":"false"))+"}");
      else if(StringSubstr(d,0,2)==="m:") TgMenuPress(StringSubstr(d,2));
      continue;
    }
    if(kinds[i]===1) {
      let t=texts[i];
      let tl=t;
      (_t211=StringToLower(tl),tl=_R[0],_t211);
      let at=StringFind(tl,"@");
      if(at>0&&StringSubstr(tl,0,1)==="/") tl=StringSubstr(tl,0,at);
      if(tl==="/menu") {
        TgMenu();
        continue;
      }
      if(tl==="/status") {
        TgMenuPress("status");
        continue;
      }
      if(tl==="/chart") {
        TgMenuPress("chart");
        continue;
      }
      if(tl==="/shot") {
        TgMenuPress("shot");
        continue;
      }
      if(tl==="/report") {
        TgMenuPress("report");
        continue;
      }
      if(tl==="/voice") {
        TgMenuPress("voice");
        continue;
      }
      {
        let w=tl;
        (_t212=StringTrimLeft(w),w=_R[0],_t212);
        (_t213=StringTrimRight(w),w=_R[0],_t213);
        if(w==="menu"||w==="buttons") {
          TgMenu();
          continue;
        }
        if(w==="status"||w==="balance") {
          TgMenuPress("status");
          continue;
        }
        if(w==="report") {
          TgMenuPress("report");
          continue;
        }
        if(w==="open"||w==="trades"||w==="open trades") {
          TgMenuPress("open");
          continue;
        }
        if(w==="pause") {
          TgMenuPress("pause");
          continue;
        }
        if(w==="run"||w==="resume"||w==="start") {
          TgMenuPress("run");
          continue;
        }
        if(w==="guard") {
          TgMenuPress("guard");
          continue;
        }
        if(w==="chart") {
          TgMenuPress("chart");
          continue;
        }
        if(w==="be all"||w==="breakeven") {
          TgMenuPress("beall");
          continue;
        }
        if(w==="trailing all") {
          TgMenuPress("trailall");
          continue;
        }
        if(w==="close all") {
          TgMenuPress("closeall");
          continue;
        }
      }
      if(StringSubstr(t,0,6)==="/start"||StringSubstr(t,0,5)==="/help") {
        TgSend(chats[i],InpAIName+" is connected.\nWrite or send a voice message, for example:\n- how much did we make today?\n- close all V25 trades in profit\n- move V75 SL to break even\n- show the history / replay V25\n- set V10 1s: H1 EMA 50/200 trend, M5 RSI 30/70 entry, then test it\nTrades, LIVE mode, new setups and looser risk rules ask for your APPLY.\nSignals are predictions, not promises.");
        continue;
      }
      let none=[];
      BrHandleUser("telegram",chats[i],t,none,"");
      continue;
    }
    if(kinds[i]===2) {
      let bytes=[];
      if(!TgDownload(files[i],bytes)) {
        TgSend(chats[i],"🎤 I could not download that voice message. "+brErr);
        continue;
      }
      {
        let r0="";
        (_t214=TgCall("sendChatAction","{\"chat_id\":"+IntegerToString(chats[i])+",\"action\":\"typing\"}",r0),r0=_R[0],_t214);
      }
      Print(InpAIName," bridge: voice message ",ArraySize(bytes)," bytes");
      let mm=mimes[i];
      if(StringFind(mm,"ogg")>=0||mm==="") mm="audio/ogg";
      BrHandleUser("telegram",chats[i],"",bytes,mm);
    }
  }
}
function BridgeBeat(){
  let s="{\"t\":"+IntegerToString(TimeLocal())+",\"gemini\":"+((BrKey()!==""&&(brGemOk||brErr==="")?"true":"false"))+",\"tg\":"+((BrTok()!==""&&brOwner!==0&&brTgOk?"true":"false"))+",\"prov\":"+JQ(PVNAME[(brDetected?brProv:ProvOfKey(BrKey()))])+",\"tts\":"+((BrCanSpeak()?"true":"false"))+",\"req\":"+IntegerToString(brReqToday)+",\"max\":"+IntegerToString(InpAiPerDay)+",\"model\":"+JQ((brModel!==""?brModel:InpAiModel))+",\"err\":"+JQ(brErr)+",\"busy\":"+((brBusy?"true":"false"))+"}";
  FWriteAtomic(BRDIR+"bridge.json",s);
  Comment(InpAIName+" BRIDGE\n","AI: ",((BrKey()===""?"no key - paste it in 'AI API key'":PVNAME[(brDetected?brProv:ProvOfKey(BrKey()))]+" "+((brGemOk?"OK":((brErr===""?"ready":"error")))))),"  (",((brModel!==""?brModel:InpAiModel)),")  requests today ",brReqToday,"/",InpAiPerDay,"\n","Telegram: ",((BrTok()===""?"off":((brOwner===0?"send /start to your bot "+brTgName+" to connect":((brTgOk?"connected "+brTgName:"error")))))),"\n",((brErr!==""?"Last error: "+brErr:"Keep this chart open. The panel runs on another chart.")));
}
function BridgeInit(){
  ChartSetInteger(0,CHART_SHOW,true);
  if(MQLInfoInteger(MQL_TESTER)) return INIT_SUCCEEDED;
  let old=[];
  MailRead("p2b_",old,64);
  TgOwnerLoad();
  if(BrKey()!=="") {
    let er="";
    if(!(_t215=BrDetect(er),er=_R[0],_t215)) brErr=er;
  }
  if(BrTok()!=="") {
    let resp="";
    if((_t216=TgCall("getMe","{}",resp),resp=_R[0],_t216)===200) brTgName="@"+JGS(JGet(JParse(resp),"result"),"username");
    if(brOwner!==0&&(_t217=TgCall("getUpdates","{\"offset\":-1,\"timeout\":0}",resp),resp=_R[0],_t217)===200) {
      let r=JParse(resp),res=JGet(r,"result");
      if(JLen(res)>0) brTgOffset=Math.trunc(JGN(JAt(res,JLen(res)-1),"update_id"))+1;
    }
    TgSetCommands();
    if(brOwner!==0&&brTgOk) TgSend(brOwner,"🤖 "+InpAIName+" bridge is online. Write or send a voice message.");
  }
  BridgeBeat();
  EventSetMillisecondTimer(300);
  return INIT_SUCCEEDED;
}
function BridgeTimer(){
  if(MQLInfoInteger(MQL_TESTER)) return;
  let now=((GetTickCount())>>>0);
  if(now-brMailT>=400) {
    brMailT=((now)>>>0);
    let msgs=[];
    let n=MailRead("p2b_",msgs,12);
    for(let pass=0;pass<2;pass++) for(let i=0;i<n;i++) {
      let r=JParse(msgs[i]);
      let kind=JGS(r,"kind");
      if(pass===0) {
        if(kind==="tg_send") TgSend(brOwner,JGS(r,"text"),Math.trunc(JGN(r,"approve",0)));
        else if(kind==="tg_photo") {
          brBusy=true;
          BridgeBeat();
          TgSendPhoto(JGS(r,"file"),JGS(r,"caption"));
          brBusy=false;
        }
      }
      else {
        if(kind==="chat") {
          let tx=JGS(r,"text"),src=JGS(r,"source","panel");
          let none=[];
          BrHandleUser(src,brOwner,tx,none,"");
        }
        else if(kind==="translate") BrTranslate(r);
        else if(kind==="tts") BrTtsJob(r);
      }
    }
  }
  if(now-brTgT>=1000) {
    brTgT=((now)>>>0);
    TgPoll();
  }
  if(now-brBeatT>=2000) {
    brBeatT=((now)>>>0);
    BridgeBeat();
  }
}
function BridgePrompt(){
  let p="";
  p+="You are {NAME}, the AI inside a MetaTrader 5 trading robot (GTM AI Trade Core by G TRADERS). You talk with the owner of the account through the panel's AI CHAT tab or Telegram (text or voice). You explain, analyse and control the robot by returning ACTIONS. Signals and AI opinions are predictions, never promises: never promise profit, remind about risk when it matters.\n";
  p+="\n";
  p+="ALWAYS answer with ONE JSON object and nothing else:\n";
  p+="{\"heard\":\"<only for a voice message: what the user said, in their language>\",\"reply\":\"<answer in the user's language - any language: Sinhala (in Sinhala script unless the user writes Singlish), Tamil, English, Hindi... - short, friendly, written to sound good read aloud: no tables, no markdown>\",\"lang\":\"<ISO 639-1 code of the reply language, e.g. si, en, ta>\",\"reply_en\":\"<the same answer in simple English, at most 3 sentences>\",\"actions\":[ ... ]}\n";
  p+="Use \"actions\":[] when nothing should change. Do only what the user asked. If something important is unclear (which symbol, buy or sell, how much), ask in \"reply\" and return no action.\n";
  p+="\n";
  p+="STATE (sent with every message) is the live account: mode SIM or LIVE, balance, equity, day P/L, the symbols with their setups, open trades, the last closed trades with the reason they were taken, the account guard and 30-day statistics. Use it for reports, explanations (\"why did V75 lose?\" -> last_closed.why plus the setup), coaching (by_symbol_30d, by_hour_30d) and market briefs (bias +1 up / -1 down, conf 0..1). Never invent symbols, trades or numbers that are not in STATE.\n";
  p+="\n";
  p+="ACTIONS (for symbols use \"short\" or \"name\" from STATE, or \"all\"):\n";
  p+="{\"type\":\"show_tab\",\"tab\":\"dashboard|live|history|analyzer|calendar|chat|settings|guard|ai\",\"view\":\"calendar|dashboard\",\"period\":\"day|month|year|all\",\"date\":\"YYYY-MM-DD\"}\n";
  p+="{\"type\":\"replay\",\"symbol\":\"V25\"}  = replay the last closed trade of that symbol on the HISTORY tab\n";
  p+="{\"type\":\"watch\",\"symbol\":\"V25\"}  = show its open trade on the LIVE TRADES tab\n";
  p+="{\"type\":\"pause\"}  {\"type\":\"run\"}  {\"type\":\"mode\",\"to\":\"sim|live\"}\n";
  p+="{\"type\":\"close\",\"symbol\":\"V25|all\",\"side\":\"buy|sell|all\",\"only\":\"profit|loss|any\"}\n";
  p+="{\"type\":\"breakeven\",\"symbol\":\"V25|all\",\"offset_points\":20}  (or \"offset_usd\":0.5) = SL to entry plus a little\n";
  p+="{\"type\":\"trailing\",\"symbol\":\"V25|all\",\"on\":true,\"start_pct\":60,\"dist_pct\":50}  (start at % of the TP distance, trail at % of the SL distance)\n";
  p+="{\"type\":\"set_sl\",\"symbol\":\"V25\",\"price\":123.4}  or \"points\":300 or \"usd\":5 (distance from the entry); the same keys for \"set_tp\"\n";
  p+="{\"type\":\"setup\",\"symbols\":[\"V25\"] or \"all\",\"changes\":{...}}  = change the entry model and exits\n";
  p+="{\"type\":\"risk\",\"scope\":\"global\" or \"V25\" or \"all\", ...}  = account guard\n";
  p+="{\"type\":\"open\",\"symbol\":\"V25\",\"side\":\"buy|sell\",\"lot\":0.01}  = only when the user clearly asks to open a trade now\n";
  p+="{\"type\":\"add_symbol\",\"symbol\":\"Volatility 75 Index\"}  {\"type\":\"remove_symbol\",\"symbol\":\"V25\"}\n";
  p+="{\"type\":\"test\",\"symbols\":[\"V25\"],\"bars\":1000}  = backtest. Put it in the same answer as a \"setup\" action to test the NEW setup before the user applies it; do this every time you propose a new entry model.\n";
  p+="{\"type\":\"report\",\"kind\":\"today|week|month|open|guard\"}\n";
  p+="{\"type\":\"language\",\"lang\":\"si\",\"name\":\"Sinhala\"}  = show the whole panel (labels, AI answers, spoken alerts) in that language (any language; \"en\" = English)\n";
  p+="{\"type\":\"screenshot\",\"tab\":\"dashboard|live|history|analyzer|chat|settings\"}  = send a picture of the panel to Telegram (when the user asks on Telegram to see / show something)\n";
  p+="{\"type\":\"chart_image\",\"symbol\":\"V25\"}  = send a picture of that trade's chart (entry, SL, TP, indicators, SMC zones) to Telegram\n";
  p+="{\"type\":\"indicator_code\",\"name\":\"MyIndicator\",\"code\":\"<complete MQL5 indicator source that compiles>\"}  = when the user wants a new indicator\n";
  p+="\n";
  p+="SETUP \"changes\" keys:\n";
  p+="on (bool); tf \"M1\",\"M5\",\"M15\",\"M30\",\"H1\",\"H4\"; entry \"ma\",\"rsi\",\"macd\",\"breakout\",\"bb_bounce\",\"bb_break\",\"stoch\",\"cci\",\"sar\",\"adx\",\"rule\",\"wma_smma\"; dir \"both\",\"buy\",\"sell\"\n";
  p+="p1 p2 p3 lv1 lv2 = entry parameters. ma: p1 fast, p2 slow, ma \"SMA\",\"EMA\",\"SMMA\",\"WMA\". wma_smma (the default entry): p1 fast MA period (7), p2 slow MA period (39), ma = fast MA type (WMA), ma2 = slow MA type (SMMA), p3 = stop loss looks back this many candles (10; SL = lowest candle body for BUY / highest for SELL, wicks ignored), lv1 = take profit as a multiple of the SL (1 = 1:1, 3 = 1:3); it trades in the direction of the cross and ignores slMode / sl / tp. rsi: p1 period, lv1 buy level, lv2 sell level. macd: p1 fast, p2 slow, p3 signal. breakout: p1 candles. bb_bounce / bb_break: p1 period, lv1 deviation. stoch: p1 %K, p2 %D, p3 slowing, lv1 oversold, lv2 overbought. cci: p1 period, lv1 level. sar: lv1 step, lv2 maximum. adx: p1 period, lv1 minimum ADX.\n";
  p+="trend (bool) + trendP = EMA trend filter on the same timeframe\n";
  p+="htfOn (bool), htf (timeframe), htfType \"ma\",\"ema\",\"macd\",\"rsi\",\"sar\",\"dmi\", hp1, hp2, hma = trade only when the higher timeframe agrees (the 2-timeframe model)\n";
  p+="cwMode \"none\",\"candles\",\"minutes\",\"pullback\", cwN, cwPull (% of SL) = wait after the signal\n";
  p+="slMode \"usd\",\"points\",\"atr\"; sl; tp; lotMode \"fixed\",\"risk\"; lot; risk (% of balance)\n";
  p+="be (bool), beAt (% of TP); trail (bool), trStart (% of TP), trDist (% of SL)\n";
  p+="buyRule, sellRule (text) = for entry \"rule\"\n";
  p+="\n";
  p+="RULE language (entry \"rule\"; read on the closed candle of the setup timeframe):\n";
  p+="VALUE OP VALUE, joined with AND / OR (AND is checked first). OP: > < >= <= == != CROSSUP CROSSDOWN\n";
  p+="VALUE: a number, OPEN HIGH LOW CLOSE BODY RANGE, EMA(n) SMA(n) SMMA(n) LWMA(n) RSI(n) ATR(n) CCI(n) WPR(n) MOM(n) MACD(f,s,sig) MACDSIG(f,s,sig) MACDHIST(f,s,sig) BBUP(n,dev) BBMID(n,dev) BBLOW(n,dev) STOCHK(k,d,slow) STOCHD(k,d,slow) ADX(n) PDI(n) MDI(n) SAR(step,max) HIGHEST(n) LOWEST(n) (highest / lowest of the n candles before)\n";
  p+="SMC values (k = swing size, 3 is normal): BOS(k) and CHOCH(k) = +1 bullish break / -1 bearish break on that candle, 0 none; STRUCT(k) = +1 up trend / -1 down trend; OB(k) = +1 retest of a bullish order block / -1 bearish; FVG(k) = +1 price inside a bullish fair value gap / -1 bearish; SWEEP(k) = +1 sweep below a swing low that closes back above / -1 the opposite\n";
  p+="CUSTOM(\"Indicator name\",buffer,input1,input2,...) = a custom indicator the user compiled\n";
  p+="A timeframe can be the last argument: EMA(50,H1), CHOCH(3,H1), CLOSE(H4). [n] = n candles earlier: CLOSE[1].\n";
  p+="Examples: buyRule \"EMA(50,H1) > EMA(200,H1) AND RSI(14) CROSSUP 30\", sellRule \"EMA(50,H1) < EMA(200,H1) AND RSI(14) CROSSDOWN 70\". SMC: buyRule \"STRUCT(3,H1) == 1 AND OB(3) == 1\", sellRule \"STRUCT(3,H1) == -1 AND OB(3) == -1\". The SELL rule is usually the mirror of the BUY rule.\n";
  p+="\n";
  p+="RISK keys. scope \"global\": dayLossOn, dayLoss, dayLossUnit \"pct\" or \"usd\", dayProfitOn, dayProfit, dayProfitUnit, ddOn, ddPct, smartOn, smartAfter (losses in a row), smartCut (% of the lot), coolOn, coolMin, maxDayOn, maxDay, unlock (bool).\n";
  p+="scope = a symbol or \"all\": symLoss ($ loss that stops this symbol for the day, 0 = off), symProfit ($), symMax (trades a day, 0 = off), unlock.\n";
  p+="Example: \"stop V10 1s for the day when it loses 10 dollars\" -> {\"type\":\"risk\",\"scope\":\"V10.1s\",\"symLoss\":10}\n";
  p+="\n";
  p+="The robot itself asks the user to approve opening trades, LIVE mode, new setups and looser risk rules; you still return those actions and it shows them for approval. Navigation, replay, closing, break-even, trailing and reports run at once. Keep replies short.\n";
  (_t218=StringReplace(p,"{NAME}",InpAIName),p=_R[0],_t218);
  return p;
}
function LangFont(code){
  let c=StringSubstr(code,0,2);
  if(c==="si"||c==="ta"||c==="hi"||c==="bn"||c==="ml"||c==="te"||c==="kn"||c==="mr"||c==="gu"||c==="pa"||c==="ne"||c==="or") return "Nirmala UI";
  if(c==="zh") return "Microsoft YaHei";
  if(c==="ja") return "Yu Gothic UI";
  if(c==="ko") return "Malgun Gothic";
  if(c==="th") return "Leelawadee UI";
  if(c==="ar"||c==="fa"||c==="ur"||c==="he") return "Segoe UI";
  if(c==="my") return "Myanmar Text";
  if(c==="km"||c==="lo") return "Leelawadee UI";
  if(c==="am") return "Ebrima";
  if(c==="ru"||c==="uk"||c==="el"||c==="vi") return "Segoe UI";
  return "";
}
function UiFont(){
  return (gLangFont!==""?gLangFont:InpFont);
}
function LangWant(s){
  let n=StringLen(s);
  if(n<2||n>90) return false;
  if(StringSubstr(s,n-2)==="..") return false;
  let letter=false;
  for(let i=0;i<n;i++) {
    let c=StringGetCharacter(s,i);
    if(c>126) return false;
    if(c>=48&&c<=57) return false;
    if((c>=65&&c<=90)||(c>=97&&c<=122)) letter=true;
  }
  return letter;
}
function Lng(s){
  if(gLang==="en"||s===""||gNoTr) return s;
  let v="";
  if((_t219=gTr.TryGetValue(s,v),v=_R[0],_t219)) return v;
  let z=false;
  if((_t220=gTrV.TryGetValue(s,z),z=_R[0],_t220)) return s;
  if(gMiss.Count()<3000&&LangWant(s)) {
    let q=0;
    if(!(_t221=gMiss.TryGetValue(s,q),q=_R[0],_t221)) {
      gMiss.Add(s,0);
      gMissN++;
    }
  }
  return s;
}
function LangSave(){
  if(gLang==="en") return;
  let k=[],v=[];
  let n=gTr.CopyTo(k,v);
  let out="";
  for(let i=0;i<n;i++) {
    let a=k[i],b=v[i];
    (_t222=StringReplace(a,"\t"," "),a=_R[0],_t222);
    (_t223=StringReplace(a,"\n"," "),a=_R[0],_t223);
    (_t224=StringReplace(b,"\t"," "),b=_R[0],_t224);
    (_t225=StringReplace(b,"\n"," "),b=_R[0],_t225);
    out+=a+"\t"+b+"\n";
  }
  FWriteAtomic("GTM_AI\\lang_"+gLang+".txt",out);
}
function LangLoad(){
  gTr.Clear();
  gTrV.Clear();
  if(gLang==="en") return;
  let s=FReadUtf8("GTM_AI\\lang_"+gLang+".txt");
  let ln=[];
  let n=StringSplit(s,10,ln);
  for(let i=0;i<n;i++) {
    let p=StringFind(ln[i],"\t");
    if(p<=0) continue;
    let a=StringSubstr(ln[i],0,p),b=StringSubstr(ln[i],p+1);
    (_t226=StringReplace(b,"\r",""),b=_R[0],_t226);
    if(b!=="") {
      gTr.TrySetValue(a,b);
      gTrV.TrySetValue(b,true);
    }
  }
}
function LangSet(code,name){
  (_t227=StringTrimLeft(code),code=_R[0],_t227);
  (_t228=StringTrimRight(code),code=_R[0],_t228);
  (_t229=StringToLower(code),code=_R[0],_t229);
  if(StringLen(code)>3&&StringFind(code,"-")!==2) code=StringSubstr(code,0,2);
  if(code==="") return;
  if(name==="") name=code;
  gLang=code;
  gLangName=name;
  gLangFont=((code==="en")?"":LangFont(code));
  gMiss.Clear();
  gMissN=0;
  gLangT=((0)>>>0);
  gLangAskT=((0)>>>0);
  gLangWait=((6000)>>>0);
  LangLoad();
  FWriteAtomic(LANGFILE,code+"\t"+name);
  if(ObjectFind(0,EDNAME)>=0) ObjectSetString(0,EDNAME,OBJPROP_FONT,UiFont());
  if(ObjectFind(0,CHATED)>=0) ObjectSetString(0,CHATED,OBJPROP_FONT,UiFont());
  gBgOk=false;
  Log("Panel language: "+name+((code==="en"?"":" (labels are translated by the AI a few at a time)")),CL_CY);
}
function LangInit(){
  let s=FReadUtf8(LANGFILE);
  let p=StringFind(s,"\t");
  if(p>0) {
    let c=StringSubstr(s,0,p),nm=StringSubstr(s,p+1);
    (_t230=StringReplace(nm,"\r",""),nm=_R[0],_t230);
    (_t231=StringReplace(nm,"\n",""),nm=_R[0],_t231);
    gLang=c;
    gLangName=nm;
    gLangFont=((c==="en")?"":LangFont(c));
    LangLoad();
  }
}
function LangTick(){
  if(gLang==="en"||!gBrOnline) return;
  let now=((Now())>>>0);
  if(gLangAskT>0&&now-gLangAskT>120000) {
    gLangWait=(((Math.trunc(MathMin(gLangWait*2.0,1800000.0))>>>0))>>>0);
    let k=[];
    let q=[];
    let n=gMiss.CopyTo(k,q);
    for(let i=0;i<n;i++) if(q[i]===1) gMiss.TrySetValue(k[i],0);
    gLangAskT=((0)>>>0);
  }
  if(gLangAskT>0||now-gLangT<gLangWait) return;
  gLangT=((now)>>>0);
  let k=[];
  let q=[];
  let n=gMiss.CopyTo(k,q);
  let items="";
  let c=0;
  for(let i=0;i<n&&c<60;i++) {
    if(q[i]!==0) continue;
    items+=((c>0?",":""))+JQ(k[i]);
    c++;
    gMiss.TrySetValue(k[i],1);
  }
  if(c===0) return;
  MailSend("p2b_","{\"kind\":\"translate\",\"code\":"+JQ(gLang)+",\"lang\":"+JQ(gLangName)+",\"items\":["+items+"]}");
  gLangAskT=((now)>>>0);
}
function LangGot(r){
  if(JGS(r,"code")!==gLang) return;
  if(JGB(r,"fail",false)) {
    let k0=[];
    let q0=[];
    let n0=gMiss.CopyTo(k0,q0);
    for(let i=0;i<n0;i++) if(q0[i]===1) gMiss.TrySetValue(k0[i],0);
    gLangWait=(((Math.trunc(MathMin(gLangWait*2.0,1800000.0))>>>0))>>>0);
    gLangAskT=((0)>>>0);
    gLangT=((Now())>>>0);
    return;
  }
  gLangWait=((6000)>>>0);
  let m=JGet(r,"map");
  let n=JLen(m);
  for(let i=0;i<n;i++) {
    let c=JAt(m,i);
    let en=jsK[c],tr=JStr(c);
    if(en===""||tr==="") continue;
    gTr.TrySetValue(en,tr);
    gTrV.TrySetValue(tr,true);
    gMiss.Remove(en);
  }
  let k=[];
  let q=[];
  let nk=gMiss.CopyTo(k,q);
  for(let i=0;i<nk;i++) if(q[i]===1) gMiss.TrySetValue(k[i],2);
  gLangAskT=((0)>>>0);
  gLangT=((Now())>>>0);
  LangSave();
}
var VPHR=_AFILL(["All systems online. Ready to trade.","Scanning the markets.","Trading paused. Open trades are still managed.","Signal found. Waiting for confirmation.","Signal held. Risk rules are active.","Buy order placed.","Sell order placed.","Order refused by the broker.","Stop loss moved to break even.","Trailing stop engaged.","Take profit hit. Well done, sir.","Trailing stop closed in profit.","Stop loss hit.","Closed at break even.","Closed in profit.","Closed at a loss.","Please confirm live trading.","Live mode activated. Real money is now at work, sir.","Simulator mode.","Algo trading is switched off in MetaTrader.","Levels updated.","Signal cancelled.","Daily loss limit reached. Trading is stopped for today.","Daily profit target reached. Trading is stopped for today. Well done, sir.","Drawdown guard triggered. All trades are closed.","Daily limit reached on this symbol.","Your approval is needed.","Done, sir.","New message from Telegram.","The AI bridge is online."],NVOICE,"");
function VKey(s){
  let h=((2166136261)>>>0);
  let n=StringLen(s);
  for(let i=0;i<n;i++) {
    h=((h^((Math.trunc(StringGetCharacter(s,i))>>>0)))>>>0);
    h=((h*(16777619))>>>0);
  }
  let h2=((5381)>>>0);
  for(let i=0;i<n;i++) h2=((h2*33+(Math.trunc(StringGetCharacter(s,i))>>>0))>>>0);
  return StringFormat("%08x%08x",h,h2);
}
function WavMs(rel){
  let f=FileOpen(rel,FILE_READ|FILE_BIN);
  if(f===INVALID_HANDLE) return 0;
  let hd=[];
  let n=FileReadArray(f,hd,0,44);
  let sz=FileSize(f);
  FileClose(f);
  if(n<44) return 0;
  let rate=hd[28]|(hd[29]<<8)|(hd[30]<<16)|(hd[31]<<24);
  if(rate<=0) return 0;
  return (Math.trunc((sz-44)*1000/rate));
}
function VPackBase(code0){
  let code=StringSubstr(code0,0,2);
  if(code==="hi") return 143;
  if(code==="es") return 173;
  if(code==="pt") return 203;
  if(code==="it") return 233;
  return -1;
}
function VFile(key){
  return "GTM_AI\\voice\\"+key+".wav";
}
function VBudgetLoad(){
  let d=DayKey(TimeLocal());
  if(gVDay===d) return;
  gVDay=d;
  gVUsed=0;
  let s=FReadUtf8("GTM_AI\\voice\\today.txt");
  let p=StringFind(s,";");
  if(p>0&&StringToInteger(StringSubstr(s,0,p))===d) gVUsed=StringToInteger(StringSubstr(s,p+1));
}
function VBudgetTake(){
  VBudgetLoad();
  if(InpVoicePerDay<=0||gVUsed>=InpVoicePerDay) return false;
  gVUsed++;
  FWriteAtomic("GTM_AI\\voice\\today.txt",IntegerToString(gVDay)+";"+IntegerToString(gVUsed));
  return true;
}
function VPending(key){
  let now=((Now())>>>0);
  for(let i=0;i<ArraySize(vPendK);i++) if(vPendK[i]===key&&now-vPendT[i]<600000) return true;
  return false;
}
function VPendAdd(key){
  let n=ArraySize(vPendK);
  if(n>=40) {
    for(let i=0;i<n-1;i++) {
      vPendK[i]=vPendK[i+1];
      vPendT[i]=((vPendT[i+1])>>>0);
    }
    n--;
  }
  ArrayResize(vPendK,n+1,()=>"");
  ArrayResize(vPendT,n+1,()=>0);
  vPendK[n]=key;
  vPendT[n]=((Now())>>>0);
}
function VAiAsk(key,text,code,play,translate){
  if(!gBrOnline||!gBrTts||gFileBad) return false;
  if(Now()<gVoiceBackoff) return false;
  if(VPending(key)) return false;
  if(!VBudgetTake()) return false;
  VPendAdd(key);
  MailSend("p2b_","{\"kind\":\"tts\",\"key\":"+JQ(key)+",\"text\":"+JQ(text)+",\"code\":"+JQ(code)+",\"lang\":"+JQ(gLangName)+",\"translate\":"+((translate?"true":"false"))+",\"play\":"+((play?"true":"false"))+"}");
  return true;
}
function VAiFile(type,rel,ms){
  if(gLang==="en"||gFileBad||type<0||type>=NVOICE) { const _rv=false; _R=[rel,ms]; return _rv; }
  let key=VKey(gLang+"|"+VPHR[type]);
  rel=VFile(key);
  if(FileIsExist(rel)) {
    ms=WavMs(rel);
    if(ms>0) { const _rv=true; _R=[rel,ms]; return _rv; }
  }
  { const _rv=false; _R=[rel,ms]; return _rv; }
  _R=[rel,ms];
}
function VPushF(rel,ms){
  if(vQN>=MAXVQ) return;
  vQ[vQN]=-2;
  vQF[vQN]=rel;
  vQM[vQN]=ms;
  vQL[vQN]=vCurType;
  vQT[vQN]=((Now())>>>0);
  vCurType=-1;
  vQN++;
}
function VPhrase(type){
  if(gLang==="en") return false;
  let rel="";
  let ms=0;
  if((_t232=VAiFile(type,rel,ms),rel=_R[0],ms=_R[1],_t232)) {
    VPushF(rel,ms);
    return true;
  }
  let b=VPackBase(gLang);
  if(b>=0&&b+type<NCLIP) {
    VPush(b+type);
    return true;
  }
  return false;
}
function VLearnTick(){
  if(gLang==="en"||VPackBase(gLang)>=0||gFileBad||!gBrOnline||!gBrTts) return;
  let now=((Now())>>>0);
  if(now-gVLearnT<45000) return;
  gVLearnT=((now)>>>0);
  for(let t=0;t<NVOICE;t++) {
    let rel="";
    let ms=0;
    if((_t233=VAiFile(t,rel,ms),rel=_R[0],ms=_R[1],_t233)) continue;
    VAiAsk(VKey(gLang+"|"+VPHR[t]),VPHR[t],gLang,false,true);
    return;
  }
}
function VLearnDone(){
  if(gLang==="en") return NVOICE;
  if(VPackBase(gLang)>=0) return NVOICE;
  let c=0;
  let rel="";
  let ms=0;
  for(let t=0;t<NVOICE;t++) if((_t234=VAiFile(t,rel,ms),rel=_R[0],ms=_R[1],_t234)) c++;
  return c;
}
function VSpeak(text,translate,code){
  if(!gVoice||text==="") return;
  let key=VKey(code+"|"+text);
  let rel=VFile(key);
  if(!gFileBad&&FileIsExist(rel)) {
    let ms=WavMs(rel);
    if(ms>0) {
      VPushF(rel,ms);
      VEnd();
    }
    return;
  }
  VAiAsk(key,text,code,true,translate);
}
function VPlayFile(rel){
  let full=TerminalInfoString(TERMINAL_DATA_PATH)+"\\MQL5\\Files\\"+rel;
  if(PlaySound(full)) return true;
  if(PlaySound("..\\MQL5\\Files\\"+rel)) return true;
  if(!gFileBad) {
    gFileBad=true;
    Log("This MT5 can't play the AI voice files - the built-in voice is used. (Telegram voice replies still work.)",CL_AU);
  }
  return false;
}
function TgPhoto(file,cap){
  MailSend("p2b_","{\"kind\":\"tg_photo\",\"file\":"+JQ(file)+",\"caption\":"+JQ(cap)+"}");
}
function PanelShot(tab,focus,hist,cap){
  if(!gBrOnline) return false;
  let oTab=gTab,oF=gFocus,oH=gHistSel,oSv=gSetView;
  let oA=gAuto;
  let oR=gReplayProg;
  let oP=gPick;
  let ct=((ObjectFind(0,CHATED)>=0)?ObjectGetString(0,CHATED,OBJPROP_TEXT):"");
  if(tab>=0) gTab=tab;
  if(focus>=0) {
    gFocus=focus;
    gAuto=false;
  }
  if(hist>=0) {
    gHistSel=hist;
    gReplayProg=1.0;
  }
  gPick=false;
  Draw();
  ChartRedraw();
  let file="GTM_AI\\bridge\\shot_"+IntegerToString(GetTickCount())+".png";
  let ok=!!(ChartScreenShot(0,file,gW,gH,ALIGN_LEFT));
  gTab=oTab;
  gFocus=oF;
  gHistSel=oH;
  gAuto=oA;
  gReplayProg=oR;
  gSetView=oSv;
  gPick=oP;
  Draw();
  if(gTab===5&&ct!==""&&ObjectFind(0,CHATED)>=0) ObjectSetString(0,CHATED,OBJPROP_TEXT,ct);
  if(ok) TgPhoto(file,cap);
  return ok;
}
function TradeShot(k,cap){
  if(k<0||k>=gTN) return false;
  if(gT[k].open) return PanelShot(1,k,-1,cap);
  return PanelShot(2,-1,k,cap);
}
function ShotLater(k,cap){
  if(!InpTgNotify||!InpTgChartAlerts||!gBrOnline||!gBrTg) return;
  gShotK=k;
  gShotT=((Now()+1500)>>>0);
  gShotCap=cap;
}
function ShotTick(){
  if(gShotK<0||Now()<gShotT) return;
  let k=gShotK;
  gShotK=-1;
  TradeShot(k,gShotCap);
}
function TgText(tx){
  MailSend("p2b_","{\"kind\":\"tg_send\",\"text\":"+JQ(tx)+"}");
}
function MenuCmd(cmd){
  let c=cmd;
  if(c==="status") {
    TgText("📊 "+ReportText("today")+"\n"+ReportText("open")+"\n🛡 "+GuardSummary()+"\nMode: "+((gMode===1?"LIVE":"SIMULATOR"))+((gRun?", running":", paused")));
    return;
  }
  if(c==="open") {
    TgText("📈 "+ReportText("open"));
    return;
  }
  if(c==="report") {
    TgText("📅 "+ReportText("today")+"\n"+ReportText("week")+"\n"+ReportText("month"));
    return;
  }
  if(c==="guard") {
    TgText("🛡 "+GuardSummary());
    return;
  }
  if(c==="chart") {
    let k=-1;
    for(let i=gTN-1;i>=0;i--) if(gT[i].open&&gT[i].live===(gMode===1)) {
      k=i;
      break;
    }
    if(k<0) for(let i=gTN-1;i>=0;i--) if(!gT[i].open&&gT[i].live===(gMode===1)&&gT[i].si>=0) {
      k=i;
      break;
    }
    if(k<0) {
      TgText("No trade to show yet.");
      return;
    }
    if(!TradeShot(k,TradeTitle(k)+"  P/L "+Money(gT[k].pl))) TgText("Could not take the picture.");
    return;
  }
  if(StringSubstr(c,0,4)==="shot") {
    let tab=gTab;
    let w=StringSubstr(c,5);
    if(w==="dashboard") tab=0;
    else if(w==="live") tab=1;
    else if(w==="history") tab=2;
    else if(w==="analyzer") tab=4;
    else if(w==="chat") tab=5;
    else if(w==="settings") tab=3;
    if(!PanelShot(tab,-1,-1,InpAIName+" panel")) TgText("Could not take the picture.");
    return;
  }
  let act="";
  if(c==="beall") act="{\"type\":\"breakeven\",\"symbol\":\"all\",\"offset_points\":20}";
  if(c==="trailall") act="{\"type\":\"trailing\",\"symbol\":\"all\",\"on\":true}";
  if(c==="closeprofit") act="{\"type\":\"close\",\"symbol\":\"all\",\"side\":\"all\",\"only\":\"profit\"}";
  if(c==="closeall!") act="{\"type\":\"close\",\"symbol\":\"all\",\"side\":\"all\",\"only\":\"any\"}";
  if(c==="emergency!") act="{\"type\":\"pause\"},{\"type\":\"close\",\"symbol\":\"all\",\"side\":\"all\",\"only\":\"any\"}";
  if(c==="pause") act="{\"type\":\"pause\"}";
  if(c==="run") act="{\"type\":\"run\"}";
  if(c==="sim") act="{\"type\":\"mode\",\"to\":\"sim\"}";
  if(act==="") {
    TgText("Unknown button.");
    return;
  }
  if(c==="run") {
    HandleAi("telegram","{\"reply\":\"OK\",\"reply_en\":\"OK\",\"actions\":["+act+"]}","");
    return;
  }
  let wasWait=gAiWait;
  let res="";
  let parts=[];
  let np=0;
  if(c==="emergency!") {
    ArrayResize(parts,2,()=>"");
    parts[0]="{\"type\":\"pause\"}";
    parts[1]="{\"type\":\"close\",\"symbol\":\"all\",\"side\":\"all\",\"only\":\"any\"}";
    np=2;
  }
  else {
    ArrayResize(parts,1,()=>"");
    parts[0]=act;
    np=1;
  }
  for(let i=0;i<np;i++) {
    let r=ExecAction(JParse(parts[i]),"telegram");
    if(r!=="") res+=((res===""?"":"\n"))+r;
  }
  gAiWait=wasWait;
  if(c==="emergency!") Log("EMERGENCY STOP from Telegram: paused and all trades closed",CL_DN);
  TgText("✅ "+((res===""?"done":res)));
}
function DrawStar(cx,cy,R,r,c,rot){
  for(let k=0;k<5;k++) {
    let ao=rot+k*2*M_PI/5-M_PI/2;
    let a1=ao-M_PI/5,a2=ao+M_PI/5;
    let ox=Math.trunc((cx+R*MathCos(ao))),oy=Math.trunc((cy+R*MathSin(ao)));
    cv.FillTriangle(Math.trunc(cx),Math.trunc(cy),ox,oy,Math.trunc((cx+r*MathCos(a1))),Math.trunc((cy+r*MathSin(a1))),c);
    cv.FillTriangle(Math.trunc(cx),Math.trunc(cy),ox,oy,Math.trunc((cx+r*MathCos(a2))),Math.trunc((cy+r*MathSin(a2))),c);
  }
}
function DrawCelebrate(){
  let f=CELEBF-gCelebF;
  let kin=MathMin(1.0,f/9.0);
  let back=1+2.2*MathPow(kin-1,3)+1.2*MathPow(kin-1,2);
  let sc=0.55+0.45*back;
  let kout=MathMin(1.0,gCelebF/14.0);
  let cx=Math.trunc(gW/2),cy=Math.trunc((gH*0.42));
  let bw=Math.trunc((MathMin(580,gW*0.52)*sc)),bh=Math.trunc((156*sc));
  for(let j=0;j<3;j++) {
    let rr=(f-j*9)*16;
    if(rr<=10) continue;
    let al=Math.trunc((210*(1-rr/(gW*0.7))));
    if(al>0) cv.ArcA(cx,cy,rr,0,2*M_PI,3,(j===1?CL_UP:CL_AU),al);
  }
  if(!gLowAnim) for(let k=0;k<24;k++) {
    let an=k*2*M_PI/24+f*0.018;
    let r0=bh*0.62,r1=r0+bw*0.62*(((k%2)===0?1.0:0.7));
    cv.LineT(cx+r0*MathCos(an),cy+r0*MathSin(an),cx+r1*MathCos(an),cy+r1*MathSin(an),2.0,CL_AU,Math.trunc((70*kout)));
  }
  cv.Glow(cx,cy,Math.trunc(bw/2)+50,CL_AU,Math.trunc((120*kout)));
  for(let i=0;i<NCONF;i++) {
    if(cfY[i]<0||cfY[i]>=gH||cfX[i]<0||cfX[i]>=gW) continue;
    let wv=1+Math.trunc((4*MathAbs(MathSin(f*0.3+i))));
    cv.FillRectangle(Math.trunc(cfX[i]),Math.trunc(cfY[i]),Math.trunc(cfX[i])+wv,Math.trunc(cfY[i])+6,cfC[i]);
  }
  let x1=cx-Math.trunc(bw/2),y1=cy-Math.trunc(bh/2),x2=cx+Math.trunc(bw/2),y2=cy+Math.trunc(bh/2);
  cv.RoundBorder(x1-5,y1-5,x2+5,y2+5,24,CL_AU,Math.trunc((90*kout)),1.6);
  cv.RoundFill(x1,y1,x2,y2,20,C(12,20,46),Math.trunc((245*kout)));
  cv.RoundFill(x1+2,y1+2,x2-2,y1+Math.trunc(bh/2),20,CL_AU,Math.trunc((22*kout)));
  cv.RoundBorder(x1,y1,x2,y2,20,CL_AU,Math.trunc((255*kout)),2.6);
  if(kout<0.35||bw<120) return;
  let sr=bh*0.24;
  DrawStar(x1+bh*0.45,cy,sr,sr*0.42,CL_AU,f*0.06);
  DrawStar(x2-bh*0.45,cy,sr,sr*0.42,CL_AU,-f*0.06);
  let fT=IMax(9,Math.trunc((13*sc))),fA=IMax(14,Math.trunc((32*sc)));
  Txt(cx,y1+Math.trunc((bh*0.19)),"T A K E    P R O F I T",CL_AU,fT,true,TA_CENTER|TA_VCENTER);
  Txt(cx,cy+3,gCelebTx,CL_UP,fA,true,TA_CENTER|TA_VCENTER);
  Txt(cx,y2-Math.trunc((bh*0.16)),gCelebSym+"   -   target reached",CL_TX,IMax(8,Math.trunc((9*sc))),true,TA_CENTER|TA_VCENTER);
  for(let k=0;k<12;k++) {
    let px=cx+MathCos(k*2.4)*(bw*0.55+((k%3))*18),py=cy+MathSin(k*2.4)*(bh*0.85+((k%4))*10);
    let tw=0.5+0.5*MathSin(f*0.35+k*1.3);
    cv.DotA(px,py,1.5+2.5*tw,CL_TX,Math.trunc((230*tw*kout)));
    cv.LineT(px-6*tw,py,px+6*tw,py,1,CL_AU,Math.trunc((200*tw*kout)));
    cv.LineT(px,py-6*tw,px,py+6*tw,1,CL_AU,Math.trunc((200*tw*kout)));
  }
}
function DrawStopAlert(){
  let f=REDF-gRedF;
  let kin=MathMin(1.0,f/6.0),kout=MathMin(1.0,gRedF/12.0);
  let shake=(f<16?MathSin(f*2.3)*8*(1-f/16.0):0);
  let cx=Math.trunc(gW/2)+Math.trunc(shake),cy=Math.trunc((gH*0.42));
  let bw=Math.trunc((MathMin(480,gW*0.44)*(0.82+0.18*kin))),bh=Math.trunc((128*(0.82+0.18*kin)));
  let pul=Math.trunc(((55+45*MathSin(f*0.35))*kout));
  for(let d=0;d<36;d+=2) {
    let a=Math.trunc((pul*(1-d/36.0)));
    cv.RectA(0,d,gW-1,d+1,CL_DN,a);
    cv.RectA(0,gH-2-d,gW-1,gH-1-d,CL_DN,a);
    cv.RectA(d,0,d+1,gH-1,CL_DN,a);
    cv.RectA(gW-2-d,0,gW-1-d,gH-1,CL_DN,a);
  }
  cv.Glow(cx,cy,Math.trunc(bw/2)+30,CL_DN,Math.trunc((100*kout)));
  let x1=cx-Math.trunc(bw/2),y1=cy-Math.trunc(bh/2),x2=cx+Math.trunc(bw/2),y2=cy+Math.trunc(bh/2);
  cv.RoundFill(x1,y1,x2,y2,18,C(42,8,20),Math.trunc((245*kout)));
  cv.RoundBorder(x1,y1,x2,y2,18,CL_DN,Math.trunc((255*kout)),2.6);
  cv.RoundBorder(x1-4,y1-4,x2+4,y2+4,22,CL_DN,Math.trunc((80*kout)),1.4);
  for(let sx=x1+22;sx<x2-34;sx+=16) {
    cv.FillTriangle(sx,y1+16,sx+8,y1+8,sx+16,y1+8,CL_AU);
    cv.FillTriangle(sx,y1+16,sx+8,y1+16,sx+16,y1+8,CL_AU);
  }
  if(kout<0.35) return;
  let ix=x1+Math.trunc((bh*0.48)),iy=cy+6,R=Math.trunc((bh*0.26));
  let bl=0.6+0.4*MathSin(f*0.5);
  cv.Glow(ix,iy,R+10,CL_AU,Math.trunc((90*bl)));
  cv.FillTriangle(ix,iy-R,ix-Math.trunc((R*1.0)),iy+Math.trunc((R*0.75)),ix+Math.trunc((R*1.0)),iy+Math.trunc((R*0.75)),CL_AU);
  Txt(ix,iy+Math.trunc((R*0.12)),"!",C(42,8,20),IMax(10,R),true,TA_CENTER|TA_VCENTER);
  let tx=cx+Math.trunc((bh*0.22));
  Txt(tx,y1+Math.trunc((bh*0.32)),"STOP LOSS HIT",CL_DN,12,true,TA_CENTER|TA_VCENTER);
  Txt(tx,cy+10,gRedTx,C(255,130,150),24,true,TA_CENTER|TA_VCENTER);
  Txt(tx,y2-Math.trunc((bh*0.17)),gRedSym+"   -   GUARD closed the trade",CL_TX,9,true,TA_CENTER|TA_VCENTER);
}
function DrawOverlays(){
  if(gCelebF>0) DrawCelebrate();
  if(gRedF>0) DrawStopAlert();
  if(gBeF>0) {
    let w=TW(gBeTx,10,true)+30;
    cv.RoundFill(gW-w-14,60,gW-14,90,12,CL_AU,120);
    cv.RoundBorder(gW-w-14,60,gW-14,90,12,CL_AU,255,1.2);
    Txt(gW-14-Math.trunc(w/2),75,gBeTx,CL_TX,10,true,TA_CENTER|TA_VCENTER);
  }
}
function DrawModal(){
  cv.RectA(0,0,gW-1,gH-1,C(0,0,0),150);
  let w=IMin(580,gW-40),h=300,x=Math.trunc((gW-w)/2),y=Math.trunc((gH-h)/2);
  cv.Glow(Math.trunc(gW/2),Math.trunc(gH/2),Math.trunc(w/2),CL_DN,60);
  cv.RoundFill(x,y,x+w,y+h,16,CL_PN,252);
  cv.RoundBorder(x,y,x+w,y+h,16,CL_DN,255,2.0);
  Txt(x+Math.trunc(w/2),y+30,"SWITCH TO LIVE TRADING?",CL_DN,14,true,TA_CENTER|TA_VCENTER);
  let tm=AccountInfoInteger(ACCOUNT_TRADE_MODE);
  let am=(tm===ACCOUNT_TRADE_MODE_DEMO?"DEMO account":((tm===ACCOUNT_TRADE_MODE_CONTEST?"CONTEST account":"REAL MONEY account")));
  let algo=!!(TerminalInfoInteger(TERMINAL_TRADE_ALLOWED));
  let ln=_A(5,()=>"");
  let lc=_A(5,()=>0);
  ln[0]="Account #"+IntegerToString(AccountInfoInteger(ACCOUNT_LOGIN))+"  -  "+am+"  -  "+AccountInfoString(ACCOUNT_SERVER);
  lc[0]=(((tm===ACCOUNT_TRADE_MODE_REAL?CL_AU:CL_TX))>>>0);
  ln[1]="New trades will be REAL orders on this account.";
  lc[1]=((CL_TX)>>>0);
  ln[2]="Open SIMULATOR trades will be closed and hidden.";
  lc[2]=((CL_MU)>>>0);
  ln[3]="Algo Trading in MT5: "+((algo?"ON":"OFF - press the Algo Trading button in the toolbar"));
  lc[3]=(((algo?CL_UP:CL_AU))>>>0);
  ln[4]=(InpAllowLive?"Signals are predictions, not promises. Practise on demo first.":"LIVE is turned off in the EA inputs (F7 > Allow LIVE mode).");
  lc[4]=(((InpAllowLive?CL_MU:CL_DN))>>>0);
  for(let i=0;i<5;i++) Txt(x+30,y+70+i*28,Fit(ln[i],10,i===1,w-60),lc[i],10,i===1);
  let bw=Math.trunc((w-80)/2);
  if(InpAllowLive) Btn(x+30,y+h-56,bw,36,"YES, GO LIVE",CL_DN,true,"modal:1",10);
  Btn(x+50+bw,y+h-56,bw,36,"CANCEL",CL_CY,false,"modal:0",10);
}
function Draw(){
  if(gNoDraw||gW<300||gH<200) return;
  gNoTr=false;
  crN=0;
  RegPanel(0,0,gW-1,48,CL_CY,2);
  if(gTab===0) LayoutDash();
  else if(gTab===1) LayoutTwo(320,0.24);
  else if(gTab===2) LayoutTwo(380,0.30);
  else if(gTab===4) LayoutAn();
  else if(gTab===5) LayoutChat();
  else LayoutSet();
  if(!gBgOk||!CacheSame()) BuildBg();
  if(!cv.LoadFrom(gBg)) BuildBg();
  bN=0;
  TopBar();
  if(gTab===0) DrawDashboard();
  else if(gTab===1) DrawLive();
  else if(gTab===2) DrawHistory();
  else if(gTab===4) DrawAnalyzer();
  else if(gTab===5) DrawChat();
  else DrawSettings();
  gNoTr=false;
  if(gTab!==5) ChatBoxClose();
  DrawOverlays();
  if(gModal>0) DrawModal();
  cv.Update(true);
}
function ClearPending(){
  for(let i=0;i<NSYM;i++) gPend[i]=0;
}
function SwitchMode(to){
  if(to===gMode) return;
  if(to===1) {
    gModal=1;
    Say(V_CONFIRM,true);
    return;
  }
  gMode=0;
  ClearPending();
  ArrayResize(gHist,0,()=>0);
  gFocus=-1;
  gHistSel=-1;
  gRpId=-1;
  gDrag=0;
  gdPeak=Equity();
  GuardSave();
  Log("SIMULATOR mode - new trades are paper trades",CL_UP);
  Say(V_SIM,true);
}
function GoLive(){
  gModal=0;
  if(!InpAllowLive) {
    Log("LIVE is turned off in the EA inputs",CL_DN);
    return;
  }
  let nc=0;
  for(let k=0;k<gTN;k++) {
    if(!gT[k].open||gT[k].live) continue;
    let si=gT[k].si;
    let px=gT[k].entry,pl=gT[k].pl;
    if(si>=0&&si<gNS) {
      px=(gT[k].dir>0?PBid(si):PAsk(si));
      pl=(px-gT[k].entry)*gT[k].dir*ValPerPrice(si,gT[k].lot);
    }
    Finish(k,px,pl,"closed - switched to LIVE",true);
    nc++;
  }
  ClearPending();
  gMode=1;
  ArrayResize(gHist,0,()=>0);
  gLiveStart=AccountInfoDouble(ACCOUNT_EQUITY);
  gFocus=-1;
  gHistSel=-1;
  gRpId=-1;
  gDrag=0;
  AdoptLive();
  gdPeak=Equity();
  GuardSave();
  Log("LIVE mode - new trades are REAL orders",CL_DN);
  Say(V_LIVE,true);
  if(nc>0) Log(IntegerToString(nc)+" simulator trade(s) closed",CL_MU);
  if(!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED)) {
    Log("Algo Trading is OFF in MT5 - turn it on or orders will be refused",CL_AU);
    Say(V_ALGO);
  }
}
function OnButton(id){
  let p=[];
  let n=StringSplit(id,58,p);
  if(n<1) return;
  let a=p[0];
  let v=((n>1)?StringToInteger(p[1]):0);
  if(a==="modal") {
    if(v===1) GoLive();
    else {
      gModal=0;
      Log("Stayed in SIMULATOR mode",CL_MU);
    }
    return;
  }
  if(a==="tab") {
    gTab=ClampI(v,0,5);
    gDrag=0;
    if(gTab===3) {
      gEdit=_cp(gSet[gSelSym]);
      gEditRB=gRuleB[gSelSym];
      gEditRS=gRuleS[gSelSym];
      gDirty=false;
    }
    else ClosePicker();
  }
  else if(a==="run") {
    gRun=!gRun;
    Say((gRun?V_SCAN:V_PAUSE),true);
    Log((gRun?InpAIName+" running - looking for entries":"Paused - no new trades (open trades are still managed)"),CL_AU);
  }
  else if(a==="mode") SwitchMode((gMode===0?1:0));
  else if(a==="setmode") SwitchMode(v);
  else if(a==="tb") {
    if(v>=0&&v<gTN) {
      gFocus=v;
      gTab=1;
      gAuto=false;
    }
  }
  else if(a==="hist") {
    if(v>=0&&v<gTN) {
      gHistSel=v;
      gReplayProg=0;
    }
  }
  else if(a==="replay") gReplayProg=0;
  else if(a==="logend") gLogOff=0;
  else if(a==="anv") {
    gAnView=ClampI(v,0,1);
  }
  else if(a==="anp") {
    gAnPer=ClampI(v,0,3);
  }
  else if(a==="and") {
    AnShift(0,v);
    gAnListOff=0;
  }
  else if(a==="anm") {
    AnShift(1,v);
    gAnListOff=0;
  }
  else if(a==="any") {
    AnShift(2,v);
    gAnListOff=0;
  }
  else if(a==="antoday") {
    gAnD=DayStart(TimeCurrent());
    gAnListOff=0;
  }
  else if(a==="anday") {
    let sd=new MqlDateTime();
    TimeToStruct(gAnD,sd);
    gAnD=MakeDate(sd.year,sd.mon,ClampI(v,1,DaysInMonth(sd.year,sd.mon)));
    gAnListOff=0;
  }
  else if(a==="andash") {
    gAnView=1;
    gAnPer=0;
  }
  else if(a==="ltf") {
    gLiveTf=ClampI(v,-1,NTF-1);
    gRpId=-1;
    gAuto=false;
  }
  else if(a==="zoom") {
    gZoom=ClampI(gZoom+v*IMax(10,Math.trunc(gZoom/4)),20,400);
    gRpId=-1;
  }
  else if(a==="htf") {
    gHistTf=ClampI(v,-1,NTF-1);
    gRpId=-1;
  }
  else if(a==="hzoom") {
    gHistZoom=ClampI(gHistZoom+v*IMax(5,Math.trunc(gHistZoom/4)),5,300);
    gRpId=-1;
  }
  else if(a==="tobe") {
    if(gFocus>=0&&gFocus<gTN&&gT[gFocus].open) {
      let si=gT[gFocus].si;
      if(si>=0&&si<gNS) ModifyTrade(gFocus,gT[gFocus].entry+gT[gFocus].dir*2*Pt(si),gT[gFocus].tp);
    }
  }
  else if(a==="closetr") {
    if(gFocus>=0&&gFocus<gTN&&gT[gFocus].open) {
      if(gCloseArm===gT[gFocus].id&&Now()-gCloseT<4000) {
        gCloseArm=-1;
        CloseTrade(gFocus);
      }
      else {
        gCloseArm=gT[gFocus].id;
        gCloseT=((Now())>>>0);
        gAuto=false;
      }
    }
  }
  else if(a==="live") {
    if(n>1&&p[1]==="prev") {
      StepFocus(-1);
      gAuto=false;
    }
    if(n>1&&p[1]==="next") {
      StepFocus(1);
      gAuto=false;
    }
    if(n>1&&p[1]==="auto") gAuto=!gAuto;
  }
  else if(a==="sym") {
    SelectSymbol(v);
    gEdOff=0;
    gSetView=0;
  }
  else if(a==="picker") {
    if(gPick) ClosePicker();
    else {
      gSetView=0;
      OpenPicker();
    }
  }
  else if(a==="sv") {
    gSetView=ClampI(v,0,2);
    gGuardOff=0;
    if(gPick) ClosePicker();
  }
  else if(a==="gd"&&n>=3) GuardEdit(p[1],StringToInteger(p[2]));
  else if(a==="gs"&&n>=4) GuardSymEdit(p[1],StringToInteger(p[2]),StringToInteger(p[3]));
  else if(a==="chat") {
    if(n>1&&p[1]==="add") ChatAddPart();
    else if(n>1&&p[1]==="send") ChatSendDraft();
    else if(n>1&&p[1]==="clear") {
      chN=0;
      gChatDraft="";
      gChatOff=0;
      ObjectSetString(0,CHATED,OBJPROP_TEXT,"");
    }
  }
  else if(a==="q") QuickAsk(v);
  else if(a==="ovind") {
    gOvInd=!gOvInd;
    ovReady=false;
  }
  else if(a==="lang"&&n>1) LangSet(p[1],(p[1]==="si"?"Sinhala":((p[1]==="ta"?"Tamil":"English"))));
  else if(a==="ovsmc") {
    gOvSmc=((gOvSmc+1)%3);
    ovReady=false;
  }
  else if(a==="ap") ApDecide(v,true,"panel");
  else if(a==="dc") ApDecide(v,false,"panel");
  else if(a==="pickdone") ClosePicker();
  else if(a==="pg") {
    gGrpSel=v;
    gPage=0;
  }
  else if(a==="pp") gPage+=v;
  else if(a==="pk") {
    if(v>=0&&v<ArraySize(gAll)) {
      let f=FindSym(gAll[v]);
      if(f>=0) RemoveSymbol(f);
      else AddSymbol(gAll[v]);
    }
  }
  else if(a==="remsym") RemoveSymbol(gSelSym);
  else if(a==="ed"&&n>=3) EditValue(p[1],StringToInteger(p[2]));
  else if(a==="save") SaveSetup(false);
  else if(a==="copyall") SaveSetup(true);
  else if(a==="defaults") {
    DefaultSetup(gEdit);
    if(gSelSym<gNS&&gAvail[gSelSym]) gEdit.lot=MinLot(gSelSym);
    gDirty=true;
  }
  else if(a==="undo") {
    gEdit=_cp(gSet[gSelSym]);
    gEditRB=gRuleB[gSelSym];
    gEditRS=gRuleS[gSelSym];
    gDirty=false;
  }
  else if(a==="gl"&&n>=3) {
    let d=StringToInteger(p[2]);
    if(v===0) gMaxOpen=ClampI(gMaxOpen+d,1,10);
    if(v===1) gGuardAfter=ClampI(gGuardAfter+d,1,10);
    if(v===2) gSimStart=Clamp(gSimStart+d*((gSimStart>=1000?100:10)),10,10000000);
    if(v===3) gCeleb=!gCeleb;
    if(v===4) gLowAnim=!gLowAnim;
    if(v===5) {
      gVoice=!gVoice;
      if(!gVoice) {
        vQN=0;
        PlaySound(null);
      }
      else Say(V_ONLINE,true);
    }
    if(v===6&&gVoice) {
      let k=-1;
      for(let q=0;q<gNS;q++) if(gAvail[q]) {
        k=q;
        break;
      }
      if(k>=0) SayTrade(V_TP,gSym[k],12.40);
    }
    SaveAll();
  }
  else if(a==="simreset") {
    if(OpenCount(0)>0) {
      Log("Close / wait for the open simulator trades before a reset",CL_AU);
      return;
    }
    gSimBal=gSimStart;
    for(let k=gTN-1;k>=0;k--) if(!gT[k].live) {
      for(let j=k;j<gTN-1;j++) gT[j]=_cp(gT[j+1]);
      gTN--;
    }
    gFocus=-1;
    gHistSel=-1;
    gRpId=-1;
    ArrayResize(gHist,0,()=>0);
    Log("Simulator reset to "+Money(gSimBal),CL_AU);
  }
}
function PriceAtY(y){
  let k=(+(gChY+gChH-y))/MathMax(1,gChH);
  return gChLo+Clamp(k,0,1)*(gChHi-gChLo);
}
function StartDrag(x,y){
  if(gModal>0||gTab!==1||gChK<0||gChK>=gTN||!gT[gChK].open) return;
  if(x<gChX||x>gChX+gChW||y<gChY-8||y>gChY+gChH+8) return;
  let ySL=PYp(gT[gChK].sl,gChY,gChH,gChLo,gChHi),yTP=PYp(gT[gChK].tp,gChY,gChH,gChLo,gChHi);
  if(MathAbs(y-ySL)<=7) {
    gDrag=1;
    gDragK=gChK;
    gDragPx=gT[gChK].sl;
    gAuto=false;
  }
  else if(MathAbs(y-yTP)<=7) {
    gDrag=2;
    gDragK=gChK;
    gDragPx=gT[gChK].tp;
    gAuto=false;
  }
}
function EndDrag(){
  let k=gDragK,d=gDrag;
  gDrag=0;
  gDragK=-1;
  if(k<0||k>=gTN||!gT[k].open) return;
  if(d===1) ModifyTrade(k,gDragPx,gT[k].tp);
  else ModifyTrade(k,gT[k].sl,gDragPx);
}
function OnWheel(x,y,d){
  if(gModal>0) return;
  if(gTab===0) {
    if(InRect(x,y,RX[3],RY[3],RW[3],RH[3])) gLogOff=IMax(0,gLogOff-d*3);
    else if(InRect(x,y,RX[4],RY[4],RW[4],RH[4])) gHeatOff=IMax(0,gHeatOff+d);
    else if(InRect(x,y,RX[6],RY[6],RW[6],RH[6])) gBoxOff=IMax(0,gBoxOff+d);
    else if(InRect(x,y,RX[5],RY[5],RW[5],RH[5])) {
      let n=ArraySize(gHist);
      let cur=((gBalN<=0)?n:gBalN);
      cur=((d<0)?cur*0.75:cur*1.33);
      gBalN=((cur>=n)?0:IMax(20,Math.trunc(cur)));
    }
  }
  else if(gTab===1) {
    if(gChK>=0&&InRect(x,y,gChX,gChY,gChW,gChH)) {
      gZoom=ClampI(gZoom+d*IMax(5,Math.trunc(gZoom/5)),20,400);
      gRpId=-1;
    }
    else if(InRect(x,y,RX[1],RY[1],RW[1],RH[1])) gListOff=IMax(0,gListOff+d);
  }
  else if(gTab===2) {
    if(InRect(x,y,RX[1],RY[1],RW[1],RH[1])) gHistOff=IMax(0,gHistOff+d);
    else if(gHistSel>=0&&InRect(x,y,gHcX,gHcY,gHcW,gHcH)) {
      gHistZoom=ClampI(gHistZoom+d*IMax(5,Math.trunc(gHistZoom/5)),5,300);
      gRpId=-1;
    }
  }
  else if(gTab===4&&gAnView===0) {
    if(InRect(x,y,RX[3],RY[3],RW[3],RH[3])) gAnListOff=IMax(0,gAnListOff+d);
  }
  else if(gTab===3&&!gPick&&gSetView===0) {
    if(InRect(x,y,RX[2],RY[2],RW[2],RH[2])) gEdOff=IMax(0,gEdOff+d);
  }
  else if(gTab===3&&!gPick&&gSetView===1) {
    if(InRect(x,y,RX[2],RY[2],RW[2],RH[2])) gGuardOff=IMax(0,gGuardOff+d);
  }
  else if(gTab===5) {
    if(InRect(x,y,RX[1],RY[1],RW[1],RH[1])) gChatOff=IMax(0,gChatOff-d*2);
  }
}
function OnChartEvent(id,lparam,dparam,sparam){
  if(InpRole===ROLE_BRIDGE) { _R=[lparam,dparam,sparam]; return; }
  if(id===CHARTEVENT_OBJECT_ENDEDIT&&sparam===CHATED) {
    ChatAddPart();
    Draw();
    { _R=[lparam,dparam,sparam]; return; }
  }
  if(id===CHARTEVENT_CLICK) {
    let x=lparam,y=Math.trunc(dparam);
    for(let i=bN-1;i>=0;i--) if(x>=bx1[i]&&x<=bx2[i]&&y>=by1[i]&&y<=by2[i]) {
      if(gModal>0&&StringSubstr(bId[i],0,5)!=="modal") continue;
      OnButton(bId[i]);
      Draw();
      { _R=[lparam,dparam,sparam]; return; }
    }
    { _R=[lparam,dparam,sparam]; return; }
  }
  if(id===CHARTEVENT_MOUSE_MOVE) {
    let x=lparam,y=Math.trunc(dparam);
    let st=StringToInteger(sparam);
    let left=((st&1)===1);
    gMX=x;
    gMY=y;
    if(left&&!gPrevLeft) StartDrag(x,y);
    if(left&&gDrag>0) gDragPx=PriceAtY(y);
    if(!left&&gPrevLeft&&gDrag>0) {
      EndDrag();
      Draw();
    }
    gPrevLeft=left;
    { _R=[lparam,dparam,sparam]; return; }
  }
  if(id===CHARTEVENT_MOUSE_WHEEL) {
    let x=((Math.trunc(lparam)<<16)>>16),y=((Math.trunc((lparam>>16))<<16)>>16);
    let d=((dparam>0)?-1:1);
    OnWheel(x,y,d);
    Draw();
    { _R=[lparam,dparam,sparam]; return; }
  }
  if(id===CHARTEVENT_OBJECT_ENDEDIT&&sparam===EDNAME) {
    gFind=ObjectGetString(0,EDNAME,OBJPROP_TEXT);
    (_t235=StringTrimLeft(gFind),gFind=_R[0],_t235);
    (_t236=StringTrimRight(gFind),gFind=_R[0],_t236);
    gPage=0;
    Draw();
    { _R=[lparam,dparam,sparam]; return; }
  }
  if(id===CHARTEVENT_CHART_CHANGE) {
    let w=ChartGetInteger(0,CHART_WIDTH_IN_PIXELS),h=ChartGetInteger(0,CHART_HEIGHT_IN_PIXELS,0);
    if(w!==gW||h!==gH) {
      gW=w;
      gH=h;
      if(gW>=300&&gH>=200) {
        cv.Resize(gW,gH);
        gBgOk=false;
        Draw();
      }
    }
  }
  _R=[lparam,dparam,sparam];
}
function AnimTick(){
  for(let i=0;i<NAG;i++) {
    if(gAct[i]>0) gAct[i]--;
    if(gDelay[i]>0) {
      gDelay[i]--;
      if(gDelay[i]===0) Pulse(i,gDelayTx[i]);
    }
  }
  let arr=[];
  let na=0;
  for(let p=pkN-1;p>=0;p--) {
    let e=pkE[p];
    let sp=((e>=0&&e<NEDGE&&ELen[e]>1)?Clamp(16.0/ELen[e],0.02,0.12):0.05);
    pkT[p]+=sp;
    if(pkT[p]>=1) {
      ArrayResize(arr,na+1,()=>0);
      arr[na]=e;
      na++;
      for(let j=p;j<pkN-1;j++) {
        pkE[j]=pkE[j+1];
        pkT[j]=pkT[j+1];
        pkC[j]=((pkC[j+1])>>>0);
      }
      pkN--;
    }
  }
  for(let i=0;i<na;i++) {
    if(arr[i]===4) {
      SendPacket(5);
      SendPacket(8);
    }
    if(arr[i]===5) {
      gCoreF=IMax(gCoreF,60);
      SendPacket(7);
    }
    if(arr[i]===7) gBoxFlash=25;
    if(arr[i]===8) gLogFlash=25;
  }
  for(let e=0;e<NEDGE;e++) if(gLinkF[e]>0) gLinkF[e]--;
  if(gCoreF>0) gCoreF--;
  gCoreMix+=(((gCoreF>0?1.0:0.0))-gCoreMix)*0.08;
  if(gBoxFlash>0) gBoxFlash--;
  if(gLogFlash>0) gLogFlash--;
  for(let i=hlN-1;i>=0;i--) {
    hlLife[i]--;
    if(hlLife[i]<=0) {
      for(let j=i;j<hlN-1;j++) {
        hlId[j]=hlId[j+1];
        hlLife[j]=hlLife[j+1];
        hlX1[j]=hlX1[j+1];
        hlX2[j]=hlX2[j+1];
        hlC[j]=((hlC[j+1])>>>0);
      }
      hlN--;
      if(spHl===i) spHl=-1;
      else if(spHl>i) spHl--;
    }
  }
  if(gCelebF>0) {
    gCelebF--;
    for(let i=0;i<NCONF;i++) {
      cfX[i]+=cfVX[i];
      cfY[i]+=cfVY[i];
      cfVY[i]+=0.28;
      cfVX[i]*=0.985;
    }
  }
  if(gRedF>0) gRedF--;
  if(gBeF>0) gBeF--;
  if(gReplayProg<1.0) gReplayProg=MathMin(1.0,gReplayProg+0.01);
}
var gAccChkT=((0)>>>0);
function AccountWatch(){
  let nw=((Now())>>>0);
  if(nw-gAccChkT<5000) return;
  gAccChkT=((nw)>>>0);
  let k=AccountKeyNow();
  if(k===""||k===gAccKey) return;
  gAccKey=k;
  for(let i=0;i<gNS;i++) {
    gAvail[i]=!!(SymbolSelect(gSym[i],true));
    gVppC[i]=0;
  }
  let nl=LotsToBroker();
  for(let i=0;i<gNS;i++) MakeHandles(i);
  SaveAll();
  Log("New account "+k+": lot sizes set to this broker's smallest lot on "+IntegerToString(nl)+" symbol(s).",CL_AU);
}
function OnTimer(){
  if(InpRole===ROLE_BRIDGE) {
    BridgeTimer();
    return;
  }
  if(gTester) {
    if(!gNoDraw) {
      gFrame++;
      AnimTick();
      Draw();
    }
    return;
  }
  let now=((Now())>>>0);
  gFrame++;
  if(now-gPollT>=300) {
    gPollT=((now)>>>0);
    PanelPoll();
  }
  if(now-gLockT>=2000) {
    gLockT=((now)>>>0);
    FWriteAtomic(BRDIR+"panel.lock",IntegerToString(ChartID())+";"+IntegerToString(TimeLocal()));
  }
  if(now-gGuardT>=1000) {
    gGuardT=((now)>>>0);
    GuardMonitor();
    LangTick();
    VLearnTick();
    AccountWatch();
  }
  ShotTick();
  if(now-gLastManage>=250) {
    gLastManage=((now)>>>0);
    for(let k=0;k<gTN;k++) if(gT[k].open) ManageOne(k);
    if(now-gLastAdopt>=5000) {
      gLastAdopt=((now)>>>0);
      AdoptLive();
    }
  }
  if(gRun&&now-gLastScan>=500) {
    gLastScan=((now)>>>0);
    Scan();
  }
  VoiceTick();
  if(now-gLastHeat>=3000) {
    gLastHeat=((now)>>>0);
    CalcHeat();
  }
  if(now-gHistT>=2000) {
    gHistT=((now)>>>0);
    let n=ArraySize(gHist);
    if(n>=MAXHIST) {
      for(let i=0;i<n-1;i++) gHist[i]=gHist[i+1];
      gHist[n-1]=Equity();
    }
    else {
      ArrayResize(gHist,n+1,()=>0);
      gHist[n]=Equity();
    }
  }
  if(gTab===1&&gAuto&&gDrag===0&&now-gAutoT>5000) {
    gAutoT=((now)>>>0);
    StepFocus(1);
  }
  AnimTick();
  for(let si=0;si<gNS;si++) if(gSt[si]>0&&gSt[si]<3&&gPend[si]===0&&now-gStT[si]>4000) gSt[si]=(HasOpen(si)?3:0);
  if(gLowAnim&&(gFrame%2)===1) return;
  Draw();
  VoiceTick();
}
function OnTick(){
  if(!gTester||InpRole===ROLE_BRIDGE) return;
  for(let k=0;k<gTN;k++) if(gT[k].open) ManageOne(k);
  let t=TimeCurrent();
  if(t!==gTestSec) {
    gTestSec=t;
    GuardMonitor();
    AdoptLive();
  }
  if(gRun) Scan();
}
function OnInit(){
  InitColours();
  MathSrand(GetTickCount());
  gTester=!!(MQLInfoInteger(MQL_TESTER));
  gNoDraw=gTester&&!!!(MQLInfoInteger(MQL_VISUAL_MODE));
  if(InpRole===ROLE_BRIDGE) return BridgeInit();
  if(!gTester) {
    let lk=FReadUtf8(BRDIR+"panel.lock");
    let pz=StringFind(lk,";");
    if(pz>0&&StringToInteger(StringSubstr(lk,0,pz))!==ChartID()&&TimeLocal()-StringToInteger(StringSubstr(lk,pz+1))>=0&&TimeLocal()-StringToInteger(StringSubstr(lk,pz+1))<8) {
      Alert(InpAIName+": another PANEL chart is already running in this terminal. Remove one of them (the second chart must use Role = BRIDGE).");
      gDupe=true;
      return INIT_FAILED;
    }
    FWriteAtomic(BRDIR+"panel.lock",IntegerToString(ChartID())+";"+IntegerToString(TimeLocal()));
  }
  let parts=[];
  let n=(gTester?0:LoadSymbolList(parts));
  let fromFile=(n>0);
  if(gTester) {
    ArrayResize(parts,1,()=>"");
    parts[0]=_Symbol;
    n=1;
  }
  else if(!fromFile) n=StringSplit(InpSymbols,44,parts);
  gNS=0;
  for(let i=0;i<n&&gNS<NSYM;i++) {
    let sy=parts[i];
    (_t237=StringTrimLeft(sy),sy=_R[0],_t237);
    (_t238=StringTrimRight(sy),sy=_R[0],_t238);
    if(sy==="") continue;
    InitSymbol(gNS,sy);
    if(!fromFile&&!gAvail[gNS]) continue;
    gNS++;
  }
  if(gNS===0) {
    gTab=3;
    OpenPicker();
  }
  for(let i=0;i<6;i++) gFeat[i]=0.5;
  for(let i=0;i<NAG;i++) {
    gAct[i]=0;
    gAtx[i]="";
    gDelay[i]=0;
    gDelayTx[i]="";
  }
  for(let e=0;e<NEDGE;e++) {
    gLinkF[e]=0;
    EPN[e]=0;
    ELen[e]=0;
  }
  gSimStart=MathMax(10,InpSimBalance);
  if(!gTester) {
    LoadAll();
    LangInit();
    GuardLoad();
  }
  gAccKey=AccountKeyNow();
  if(!gTester&&gAccKey!==""&&gSavedAcc!==gAccKey) {
    let nl=LotsToBroker();
    SaveAll();
    Log("Account "+gAccKey+": lot sizes set to this broker's smallest lot on "+IntegerToString(nl)+" symbol(s). Raise them per symbol on SETTINGS if you want more.",CL_AU);
  }
  if(gdPeak<=0) gdPeak=Equity();
  if(!gTester) {
    let old=[];
    MailRead("b2p_",old,64);
    JLoad();
  }
  gSimBal=gSimStart;
  RuleCompileAll();
  for(let i=0;i<gNS;i++) MakeHandles(i);
  gSelSym=0;
  gEdit=_cp(gSet[0]);
  gEditRB=gRuleB[0];
  gEditRS=gRuleS[0];
  gTrade.SetExpertMagicNumber(InpMagic);
  gTrade.SetDeviationInPoints(100);
  if(gTester) {
    gMode=1;
    gRun=true;
    AdoptLive();
    if(gNoDraw) {
      EventSetMillisecondTimer(1000);
      return INIT_SUCCEEDED;
    }
  }
  gChartShowWas=!!(ChartGetInteger(0,CHART_SHOW));
  gChartScrollWas=!!(ChartGetInteger(0,CHART_MOUSE_SCROLL));
  ChartSetInteger(0,CHART_SHOW,false);
  ChartSetInteger(0,CHART_MOUSE_SCROLL,false);
  ChartSetInteger(0,CHART_EVENT_MOUSE_MOVE,true);
  ChartSetInteger(0,CHART_EVENT_MOUSE_WHEEL,true);
  gW=ChartGetInteger(0,CHART_WIDTH_IN_PIXELS);
  gH=ChartGetInteger(0,CHART_HEIGHT_IN_PIXELS,0);
  if(gW<300) gW=300;
  if(gH<200) gH=200;
  if(!cv.CreateBitmapLabel(CVNAME,0,0,gW,gH,COLOR_FORMAT_XRGB_NOALPHA)) {
    ChartSetInteger(0,CHART_SHOW,gChartShowWas);
    ChartSetInteger(0,CHART_MOUSE_SCROLL,gChartScrollWas);
    Alert(InpAIName+": could not create the panel");
    return INIT_FAILED;
  }
  ObjectSetInteger(0,CVNAME,OBJPROP_SELECTABLE,false);
  ObjectSetInteger(0,CVNAME,OBJPROP_HIDDEN,true);
  gBgOk=false;
  AdoptLive();
  CalcHeat();
  let miss=0;
  for(let i=0;i<gNS;i++) if(!gAvail[i]) miss++;
  Log(InpAIName+" online - "+IntegerToString(gNS-miss)+" of "+IntegerToString(gNS)+" symbols ready. "+((gMode===1?"LIVE":"SIMULATOR"))+" mode.",CL_CY);
  if(miss>0) Log(IntegerToString(miss)+" symbol(s) not in this account - remove them on SETTINGS",CL_DN);
  if(gNS===0) Log("Pick your symbols: SETTINGS > + ADD / REMOVE SYMBOLS",CL_AU);
  EventSetMillisecondTimer((gTester?250:ClampI(InpFrameMs,40,200)));
  Say(V_ONLINE);
  Draw();
  return INIT_SUCCEEDED;
}
function OnDeinit(reason){
  EventKillTimer();
  if(gDupe) return;
  if(InpRole===ROLE_BRIDGE) {
    Comment("");
    return;
  }
  if(gNoDraw) {
    for(let i=0;i<gNS;i++) {
      (_t239=Release(gH1[i]),gH1[i]=_R[0],_t239);
      (_t240=Release(gH2[i]),gH2[i]=_R[0],_t240);
      (_t241=Release(gHT[i]),gHT[i]=_R[0],_t241);
      (_t242=Release(gHA[i]),gHA[i]=_R[0],_t242);
      (_t243=Release(gHH1[i]),gHH1[i]=_R[0],_t243);
      (_t244=Release(gHH2[i]),gHH2[i]=_R[0],_t244);
    }
    RHandlesRelease();
    OvRelease();
    return;
  }
  {
    let lk=FReadUtf8(BRDIR+"panel.lock");
    let pz=StringFind(lk,";");
    if(pz>0&&StringToInteger(StringSubstr(lk,0,pz))===ChartID()) FileDelete(BRDIR+"panel.lock");
  }
  GuardSave();
  OvRelease();
  ChatBoxClose();
  RHandlesRelease();
  PlaySound(null);
  for(let i=0;i<gNS;i++) {
    (_t245=Release(gH1[i]),gH1[i]=_R[0],_t245);
    (_t246=Release(gH2[i]),gH2[i]=_R[0],_t246);
    (_t247=Release(gHT[i]),gHT[i]=_R[0],_t247);
    (_t248=Release(gHA[i]),gHA[i]=_R[0],_t248);
    (_t249=Release(gHH1[i]),gHH1[i]=_R[0],_t249);
    (_t250=Release(gHH2[i]),gHH2[i]=_R[0],_t250);
  }
  ObjectDelete(0,EDNAME);
  cv.Destroy();
  ChartSetInteger(0,CHART_SHOW,gChartShowWas);
  ChartSetInteger(0,CHART_MOUSE_SCROLL,gChartScrollWas);
  ChartRedraw();
}

return {OnInit:OnInit,OnDeinit:OnDeinit,OnTimer:OnTimer,OnTick:OnTick,OnChartEvent:OnChartEvent,get:function(n){return eval(n);},call:function(n,a){return eval(n).apply(null,a||[]);}};
}
