// Efek suara = Web Audio (tanpa file). Narasi = Text-to-Speech browser (id-ID). Jika suara Indonesia tidak ada, game tetap jalan tanpa narasi.
const Snd=(()=>{let ctx,on=true,voice=null;
 const loadVoice=()=>{if('speechSynthesis' in window)voice=speechSynthesis.getVoices().find(v=>/^id/i.test(v.lang))||null;};
 if('speechSynthesis' in window)speechSynthesis.onvoiceschanged=loadVoice;
 function init(){try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();ctx.resume();}catch(e){}loadVoice();}
 function tone(f,d,type='sine',v=.15,at=0,to){if(!ctx||!on)return;const t=ctx.currentTime+at,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
  if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+d+.05);}
 const seq=(fs,d,type,v,gap)=>fs.forEach((f,i)=>tone(f,d,type,v,i*gap));
 const fx={correct:()=>seq([660,880,1320],.18,'triangle',.18,.1),wrong:()=>tone(300,.25,'sine',.15,0,200),door:()=>seq([262,330,392,523],.22,'square',.07,.1),
  pop:()=>tone(500,.12,'sine',.2,0,1200),hit:()=>{tone(400,.35,'sawtooth',.08,0,100);tone(200,.2,'square',.08,.1,400);},win:()=>seq([523,659,784,1047,784,1047],.25,'triangle',.16,.13),star:i=>tone(600+i*200,.25,'triangle',.18)};
 function say(t){if(!on||!('speechSynthesis' in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='id-ID';if(voice)u.voice=voice;u.rate=.85;u.pitch=1.2;speechSynthesis.speak(u);}catch(e){}}
 return{init,say,sfx:(n,a)=>fx[n]&&fx[n](a),toggle(){on=!on;if(!on&&'speechSynthesis' in window)speechSynthesis.cancel();return on;}};})();
