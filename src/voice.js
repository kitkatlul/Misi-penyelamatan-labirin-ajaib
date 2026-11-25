// Pemutar narasi. Urutan: (1) file suara assets/voice/<ID>.mp3 -> (2) jika file belum ada, suara bawaan browser (id-ID) sebagai CADANGAN.
// Cadangan = suara dewasa bawaan perangkat, BUKAN suara anak. Suara anak berasal dari file yang Anda buat (lihat docs/PANDUAN-SUARA-ANAK.md).
const Voice=(()=>{let cur=null,tok=0,speaking=false,ttsVoice=null;const missing={};
 const loadV=()=>{if('speechSynthesis' in window)ttsVoice=speechSynthesis.getVoices().find(v=>/^id/i.test(v.lang))||null;};
 if('speechSynthesis' in window){speechSynthesis.onvoiceschanged=loadV;loadV();}
 function stop(){tok++;speaking=false;if(cur){try{cur.pause();}catch(e){}cur=null;}try{speechSynthesis.cancel();}catch(e){}Snd.duck(false);}
 function say(id,cb){stop();const my=tok,text=VOICE_LINES[id]||id,c=Snd.get();let done=false,fs;
  const fin=()=>{if(done||my!==tok)return;done=true;clearTimeout(fs);speaking=false;Snd.duck(false);if(cb)cb();};
  fs=setTimeout(fin,CONFIG.failBase+text.length*CONFIG.failPerChar);                 // cadangan agar tombol Lanjut tidak macet
  if(c.mute||c.voice===0)return;
  speaking=true;Snd.duck(true);
  const tts=()=>{if(my!==tok)return;if('speechSynthesis' in window){try{const u=new SpeechSynthesisUtterance(text);u.lang='id-ID';if(ttsVoice)u.voice=ttsVoice;u.rate=.9;u.volume=c.voice;u.onend=fin;u.onerror=fin;speechSynthesis.speak(u);}catch(e){}}};
  if(missing[id]){tts();return;}
  const a=new Audio(CONFIG.voiceDir+id+'.'+CONFIG.voiceExt);cur=a;a.volume=c.voice;a.onended=fin;
  a.onerror=()=>{missing[id]=1;tts();};
  const p=a.play();if(p&&p.catch)p.catch(()=>{});}
 function chain(ids,cb){say(ids[0],()=>ids.length>1?chain(ids.slice(1),cb):cb&&cb());}
 return{say,chain,stop,get speaking(){return speaking;}};})();
