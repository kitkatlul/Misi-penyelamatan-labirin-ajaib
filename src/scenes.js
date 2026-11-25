// Adegan cerita animasi (prolog, penyelamatan kelinci, akhir) digambar di canvas 320x192. Karakter bergerak mengikuti narasi (Voice.speaking).
const Story=(()=>{const cv=Q('#scv'),c=cv.getContext('2d');let scene=null,raf=0,t0=0,cfg=null,speaking=false;
 const tile=(k,x,y)=>c.drawImage(sprite(k),x,y,16,16);
 const spr=(n,x,y,s=4,fl=1)=>{const im=sprite(n),w=im.width*s,h=im.height*s;c.save();c.translate(Math.round(x+w/2),Math.round(y));c.scale(fl,1);c.drawImage(im,-w/2,0,w,h);c.restore();};
 const shadow=(x,y,w)=>{c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(x,y,w,w/3.5,0,0,7);c.fill();};
 const ground=sand=>{for(let y=0;y<12;y++)for(let x=0;x<20;x++)tile(sand?'tSand':((x*7+y*13)%11?'tGrass':'tFlower'),x*16,y*16);};
 const hedge=(t,y,a,b)=>{for(let x=0;x<20;x++){if(x>=a&&x<b)continue;tile('tWall',x*16,y*16+Math.sin(t*1.6+x*.7)*.8);}};
 const leaves=t=>{c.fillStyle='#7bc043';for(let i=0;i<9;i++)c.fillRect((i*53+t*10)%320,(i*37+t*16)%192,3,2);};
 const sun=()=>{const g=c.createRadialGradient(290,10,5,290,10,150);g.addColorStop(0,'rgba(255,240,170,.55)');g.addColorStop(1,'rgba(255,240,170,0)');c.fillStyle=g;c.fillRect(0,0,320,192);};
 const gate=()=>{c.fillStyle='#e9d49a';c.fillRect(140,28,40,64);c.fillStyle='#7a4a1e';c.fillRect(128,22,12,70);c.fillRect(180,22,12,70);c.fillRect(124,16,72,12);
  c.fillStyle='#c68642';c.fillRect(130,24,8,66);c.fillRect(182,24,8,66);c.fillRect(126,18,68,8);c.fillStyle='#fff8e6';c.fillRect(134,2,52,14);c.fillStyle='#7a4a1e';c.font='bold 7px sans-serif';c.textAlign='center';c.fillText('LABIRIN AJAIB',160,12);};
 const HEART=['.xx.xx.','xxxxxxx','xxxxxxx','.xxxxx.','..xxx..','...x...'];
 const heart=(x,y,s,a)=>{c.fillStyle=`rgba(255,90,122,${a})`;HEART.forEach((r,j)=>[...r].forEach((ch,i)=>{if(ch==='x')c.fillRect(x+i*s,y+j*s,s,s);}));};
 const bubble=(x,y,txt)=>{c.fillStyle='#fff';c.strokeStyle='#7a4a1e';c.lineWidth=1.5;c.beginPath();c.roundRect(x-26,y-14,52,18,6);c.fill();c.stroke();c.beginPath();c.moveTo(x-4,y+4);c.lineTo(x,y+10);c.lineTo(x+4,y+4);c.fill();c.fillStyle='#4a2c10';c.font='bold 9px sans-serif';c.textAlign='center';c.fillText(txt,x,y-1);};
 const star=(x,y,a)=>{c.fillStyle=`rgba(255,226,90,${a})`;c.fillRect(x-1,y-3,2,6);c.fillRect(x-3,y-1,6,2);};
 const PATH=[[1,1],[3,1],[3,3],[5,3],[5,1],[9,1],[9,3],[7,3],[7,5],[9,5]];
 const SC={
  s1(t){ground();hedge(t,0,7,13);hedge(t,1,7,13);gate();sun();leaves(t);shadow(160,148,22);spr(speaking?(Math.floor(t*2.2)%2?'monkeyWave':'monkeyWave2'):'monkey',136,100+Math.sin(t*3)*1.2);},
  s2(t){ground();for(let y=1;y<9;y++)for(let x=6;x<14;x++)tile(x===6||x===13||y===1||y===8?'tWall':'tSand',x*16,y*16);
   c.drawImage(sprite('tDoor'),144,128,32,32);const p=.25+.2*Math.sin(t*3);c.fillStyle=`rgba(255,215,60,${p})`;c.beginPath();c.arc(160,144,18,0,7);c.fill();
   c.fillStyle='#f5b800';c.fillRect(154,144,12,10);c.strokeStyle='#f5b800';c.lineWidth=2.5;c.beginPath();c.arc(160,144,4.5,Math.PI,0);c.stroke();
   shadow(160,112,20);spr(speaking&&Math.floor(t*1.6)%2?'rabbitSad2':'rabbitSad',136+(speaking?Math.sin(t*18)*.8:0),64,4);if(speaking)bubble(160,56,'Tolong!');leaves(t);},
  s3(t){const ox=72,oy=24;ground();LEVEL_MAPS[0].forEach((r,y)=>[...r].forEach((ch,x)=>tile(ch==='#'?'tWall':ch==='D'?'tDoor':ch==='R'?'tSand':'tGrass',ox+x*16,oy+y*16)));
   spr('rabbitSad',ox+9*16-1,oy+7*16-1,1.4);const q=.5+.5*Math.sin(t*3);c.fillStyle='#fff';c.beginPath();c.arc(ox+9*16+8,oy+6*16-10,9,0,7);c.fill();c.fillStyle='#e8870e';c.font=`bold ${10+q}px sans-serif`;c.textAlign='center';c.fillText('?',ox+9*16+8,oy+6*16-6);
   const L=[];for(let i=0;i<PATH.length-1;i++)L.push(Math.abs(PATH[i+1][0]-PATH[i][0])+Math.abs(PATH[i+1][1]-PATH[i][1]));const tot=L.reduce((a,b)=>a+b),d=(t*2.2)%(tot+2);let k=0,r=Math.min(d,tot);while(r>L[k]){r-=L[k];k++;}
   const a=PATH[k],b=PATH[k+1],f=r/L[k],dx=Math.sign(b[0]-a[0]),dy=Math.sign(b[1]-a[1]),x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f;
   const base=dy<0?'monkeyBack':dy>0?'monkey':'monkeySide';spr(base+(Math.floor(t*8)%2?'_w':''),ox+x*16+2,oy+y*16-2+Math.abs(Math.sin(t*9))*-1.5,1.2,dx<0?-1:1);},
  s4(t){ground();hedge(t,0,7,13);hedge(t,1,7,13);gate();sun();for(let i=0;i<7;i++)star(30+i*43,30+(i*37)%90,.4+.4*Math.sin(t*1.5+i*2));shadow(160,148,22);
   spr(Math.floor(t*1.8)%2?'monkeyWave':'monkeyWave2',136,100+Math.abs(Math.sin(t*3))*-2);},
  rescue(t){ground(1);hedge(t,0,99,99);c.fillStyle='#3a2410';c.fillRect(136,18,48,52);c.fillStyle='#7a4a1e';c.fillRect(130,14,60,6);
   const j=Math.abs(Math.sin(t*4))*18;shadow(210,150,18);spr('rabbitHappy',186,100-j,4);const m=Math.abs(Math.sin(t*3+1))*10;shadow(110,150,20);spr('monkeyCheer',86,100-m,4);
   for(let i=0;i<5;i++){const u=(t*.5+i*.2)%1;heart(196+(i%3)*12-10,100-u*70,2,1-u);}},
  final(t){ground();hedge(t,0,7,13);gate();sun();const cl=['#e53935','#1e88e5','#fdd835','#43a047','#f9a8c9'];for(let i=0;i<34;i++){c.fillStyle=cl[i%5];c.fillRect((i*37)%320,(i*23+t*24)%192,4,3);}
   shadow(110,150,20);spr('monkeyCheer',86,100-Math.abs(Math.sin(t*3))*12,4);shadow(210,150,18);spr('rabbitHappy',186,100-Math.abs(Math.sin(t*3+1.2))*14,4);
   spr(Math.floor(t*1.5)%2?'monster':'monsterHit',262,118+Math.sin(t*2)*2,2);bubble(276,106,'Dadah!');}};
 function loop(ts){raf=requestAnimationFrame(loop);speaking=Voice.speaking;c.imageSmoothingEnabled=false;c.clearRect(0,0,320,192);SC[scene]((ts-t0)/1000);}
 function play(){setReady(Q('#snext'),false);Voice.chain([].concat(cfg.line),()=>setReady(Q('#snext'),true));}
 function show(name,o){cfg=o;scene=name;Q('#story').classList.remove('hidden');Q('#scap').textContent=o.cap;
  Q('#sdots').innerHTML=o.dots?Array.from({length:o.dots[1]},(_,i)=>`<i class="${i<o.dots[0]?'done':i===o.dots[0]?'cur':''}"></i>`).join(''):'';
  btnSet(Q('#snext'),o.btn);cancelAnimationFrame(raf);t0=performance.now();raf=requestAnimationFrame(loop);play();}
 function hide(){cancelAnimationFrame(raf);Q('#story').classList.add('hidden');}
 Q('#sspk').onclick=()=>{Snd.sfx('click');play();};
 Q('#snext').onclick=()=>{if(Q('#snext').disabled||!Nav.ok())return;Snd.sfx('click');Voice.stop();cfg.next();};
 return{show,hide};})();
