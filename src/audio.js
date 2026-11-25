// Musik latar & efek suara dibuat langsung oleh browser (Web Audio) - orisinal, tanpa file. Narasi ada di voice.js.
const Snd=(()=>{let ctx,mg,sg,tg=null,cur=null,duck=false,sus=false,idx=0,next=0;
 const S={mute:false,music:CONFIG.defaults.music,voice:CONFIG.defaults.voice,sfx:CONFIG.defaults.sfx};
 try{Object.assign(S,JSON.parse(localStorage.getItem('labirin-audio')||'{}'));}catch(e){}
 const save=()=>{try{localStorage.setItem('labirin-audio',JSON.stringify(S));}catch(e){}};
 const SC=[261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99];   // tangga nada pentatonik (ceria & lembut)
 const TR={
  story:{bpm:68,wave:'triangle',bass:[0,3,2,3],mel:[4,null,2,null,3,null,1,null,2,null,0,null,1,null,null,null,4,null,5,null,4,null,2,null,3,null,1,null,0,null,null,null]},
  explore:{bpm:84,wave:'sine',bass:[0,4,3,4],mel:[0,2,4,2,5,4,2,null,3,2,1,2,4,null,null,null,0,2,4,5,6,5,4,null,2,3,2,1,0,null,null,null]},
  boss:{bpm:96,wave:'triangle',bass:[0,2,3,2],mel:[4,null,5,4,2,null,3,2,0,null,2,3,4,null,2,null,5,null,6,5,4,null,3,4,2,null,1,2,0,null,null,null]},
  win:{bpm:78,wave:'sine',bass:[0,3,4,0],mel:[0,2,4,5,6,5,4,null,5,4,2,0,2,null,null,null,4,5,6,7,6,5,4,null,2,4,5,4,2,null,0,null]}};
 const level=()=>{if(!mg)return;mg.gain.setTargetAtTime(S.mute?0:S.music*.2*(duck?.3:1),ctx.currentTime,.25);sg.gain.value=S.mute?0:S.sfx;};
 function init(){if(!ctx){try{ctx=new(window.AudioContext||window.webkitAudioContext)();mg=ctx.createGain();sg=ctx.createGain();mg.connect(ctx.destination);sg.connect(ctx.destination);setInterval(sched,100);}catch(e){return;}}
  if(ctx.resume)ctx.resume();level();if(cur){const n=cur;cur=null;music(n);}}
 function note(f,d,type,v,at){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(v,at+.04);g.gain.exponentialRampToValueAtTime(.001,at+d);o.connect(g);g.connect(tg);o.start(at);o.stop(at+d+.05);}
 function sched(){if(!ctx||!cur||!tg||sus)return;const tr=TR[cur],st=60/tr.bpm/2;if(next<ctx.currentTime)next=ctx.currentTime+.05;
  while(next<ctx.currentTime+.4){const n=tr.mel[idx%tr.mel.length];if(n!=null)note(SC[n],st*1.8,tr.wave,.5,next);
   if(idx%4===0)note(SC[tr.bass[(idx/4|0)%tr.bass.length]]/2,st*3.6,'sine',.6,next);idx++;next+=st;}}
 function music(n){if(cur===n)return;cur=n;if(!ctx)return;if(tg)tg.gain.setTargetAtTime(0,ctx.currentTime,.3);tg=ctx.createGain();tg.gain.value=0;tg.connect(mg);tg.gain.setTargetAtTime(1,ctx.currentTime,.4);idx=0;next=ctx.currentTime+.1;}
 function tone(f,d,type='sine',v=.15,at=0,to){if(!ctx)return;const t=ctx.currentTime+at,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
  if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(sg);o.start(t);o.stop(t+d+.05);}
 const seq=(fs,d,type,v,gap)=>fs.forEach((f,i)=>tone(f,d,type,v,i*gap));
 const FX={click:()=>tone(700,.07,'sine',.12,0,500),step:()=>tone(150,.05,'triangle',.05,0,110),correct:()=>seq([660,880,1320],.18,'triangle',.16,.1),
  wrong:()=>{tone(392,.18,'sine',.1);tone(330,.25,'sine',.09,.16);},door:()=>seq([262,330,392,523],.22,'triangle',.12,.1),rescue:()=>seq([523,659,784,1047,1319],.3,'triangle',.14,.1),
  pop:()=>tone(500,.12,'sine',.2,0,1200),appear:()=>tone(400,.2,'sine',.12,0,800),hit:()=>{tone(400,.3,'triangle',.12,0,150);tone(220,.2,'triangle',.1,.1,440);},
  star:i=>tone(600+i*200,.3,'triangle',.16),win:()=>seq([523,659,784,1047,784,1047],.28,'triangle',.14,.13)};
 const last={};
 function sfx(n,a){if(!ctx||S.mute)return;const t=performance.now();if(last[n]&&t-last[n]<80)return;last[n]=t;FX[n]&&FX[n](a);}   // anti-tumpuk
 return{init,music,sfx,get:()=>S,set(k,v){S[k]=v;save();level();},toggleMute(){S.mute=!S.mute;save();level();if(S.mute)Voice.stop();return S.mute;},duck(b){duck=b;level();},
  suspend(b){sus=b;if(ctx)b?ctx.suspend():ctx.resume();}};})();
