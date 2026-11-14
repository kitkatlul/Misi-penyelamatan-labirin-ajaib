(()=>{
const $=s=>document.querySelector(s),T=32,cv=$('#cv'),ctx=cv.getContext('2d');
const LEVELS=[
{title:'Level 1: Labirin Sahabat Hewan',intro:'Ayo bantu Monyet menyelamatkan Kelinci! Cari pintu yang terkunci.',bank:'level1',n:1,
 map:['###########','#S..#.....#','#.#.#.###.#','#.#...#...#','#.#####.###','#.....#...#','###.#.#.#D#','#...#...#R#','###########']},
{title:'Level 2: Labirin Tantangan Logika',intro:'Labirinnya lebih besar! Cari pintu berikutnya dan jawab soalnya.',bank:'level2',n:3,
 map:['###############','#S....#.......#','#####.#.#####.#','#.....#.#...#.#','#.#####.#.#.#.#','#.#.....#.#...#','#.#.#####.#####','#.#.#.....#...#','#.#.#.#####.#D#','#...#.......#E#','###############']},
{title:'Level 3: Gelembung Angka',intro:'Ayo kalahkan Monster Penjaga! Ketuk gelembung yang berisi jawaban yang benar.',boss:true,lives:4}];
const PRAISE=['Hebat sekali!','Jawabanmu benar!','Pintar sekali!','Bagus sekali!'],praise=()=>PRAISE[Math.floor(Math.random()*4)];
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.5 5.8 21l1.4-7L2 9.3l7-.8z"/></svg>';
const HEART='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.500-8 11-8 11z"/></svg>';
let lvl=0,grid=null,state='none',mistakes=0,locked=false,curSay='',boss=null,P={},last=0;
if(navigator.maxTouchPoints>0||'ontouchstart' in window)document.body.classList.add('touch');
document.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
document.addEventListener('contextmenu',e=>e.preventDefault());
$('#cast').innerHTML=imgTag('monkey')+imgTag('rabbit')+imgTag('monster');
// ---- kontrol ----
const held=[],DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
const press=d=>{if(!held.includes(d))held.push(d);},release=d=>{const i=held.indexOf(d);if(i>=0)held.splice(i,1);};
const KEYS={ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'};
addEventListener('keydown',e=>{const d=KEYS[e.key];if(d){e.preventDefault();press(d);}});
addEventListener('keyup',e=>{const d=KEYS[e.key];if(d)release(d);});
addEventListener('blur',()=>held.length=0);
document.querySelectorAll('#dpad button').forEach(b=>{const d=b.dataset.d;
 b.addEventListener('pointerdown',e=>{e.preventDefault();press(d);b.classList.add('on');});
 ['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>{release(d);b.classList.remove('on');}));});
$('#snd').onclick=()=>$('#snd').classList.toggle('off',!Snd.toggle());
$('#qsay').onclick=()=>Snd.say(curSay);
$('#play').onclick=()=>{Snd.init();$('#start').classList.add('hidden');startLevel(0);};
// ---- level ----
function startLevel(i){lvl=i;mistakes=0;held.length=0;const L=LEVELS[i];$('#ltitle').textContent=L.title;
 ['#quiz','#reward'].forEach(s=>$(s).classList.add('hidden'));
 document.body.classList.toggle('boss',!!L.boss);$('#boss').classList.toggle('hidden',!L.boss);cv.classList.toggle('hidden',!!L.boss);
 if(L.boss){grid=null;state='boss';startBoss();return;}
 grid=L.map.map(r=>[...r]);grid.forEach((r,y)=>r.forEach((c,x)=>{if(c==='S'){P={x,y,tx:x,ty:y,t:0,moving:false,face:1};r[x]='.';}}));
 cv.width=grid[0].length*T;cv.height=grid.length*T;state='play';fit();Snd.say(L.intro);}
function fit(){if(!grid)return;const r=$('#view').getBoundingClientRect(),w=cv.width,h=cv.height,s=Math.min(r.width/w,r.height/h);cv.style.width=w*s+'px';cv.style.height=h*s+'px';}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,200));
const walk=(x,y)=>grid[y]&&grid[y][x]&&grid[y][x]!=='#'&&grid[y][x]!=='D';
function doorNear(){for(const[dx,dy]of[[0,-1],[0,1],[-1,0],[1,0]])if(grid[P.y+dy]&&grid[P.y+dy][P.x+dx]==='D')return[P.x+dx,P.y+dy];}
function update(dt){
 if(state!=='play')return;
 if(!P.moving){const d=doorNear();
  if(d){state='quiz';held.length=0;runQuiz(LEVELS[lvl].bank,LEVELS[lvl].n,()=>{grid[d[1]][d[0]]='o';Snd.sfx('door');Snd.say('Pintunya terbuka!');state='play';});return;}
  const k=held[held.length-1];if(k){const[dx,dy]=DIRS[k];if(dx)P.face=dx;if(walk(P.x+dx,P.y+dy)){P.tx=P.x+dx;P.ty=P.y+dy;P.moving=true;P.t=0;}}}
 if(P.moving){P.t+=dt*5.5;if(P.t>=1){P.x=P.tx;P.y=P.ty;P.moving=false;arrive();}}}
function arrive(){const c=grid[P.y][P.x];
 if(c==='R'){state='done';held.length=0;setTimeout(()=>reward('Kelinci selamat!','Kamu berhasil menyelamatkan kelinci!','Lanjut ke Level 2',()=>startLevel(1),'Kamu berhasil menyelamatkan kelinci!'),900);}
 if(c==='E'){state='done';held.length=0;setTimeout(()=>reward('Jalan terbuka!','Jalan menuju Monster Penjaga sudah terbuka!','Lanjut ke Level 3',()=>startLevel(2),'Hebat! Jalan menuju Monster Penjaga sudah terbuka!'),600);}}
function render(t){ctx.imageSmoothingEnabled=false;
 grid.forEach((row,y)=>row.forEach((c,x)=>{let k=c==='#'?'tWall':c==='D'?'tDoor':'RoE'.includes(c)?'tSand':'tGrass';
  if(k==='tGrass'&&(x*7+y*13)%11===0)k='tFlower';ctx.drawImage(sprite(k),x*T,y*T,T,T);
  if(c==='E'){ctx.fillStyle='#fdd835';ctx.beginPath();ctx.arc(x*T+16,y*T+16,9+Math.sin(t*5)*2,0,7);ctx.fill();ctx.fillStyle='#fff6a8';ctx.beginPath();ctx.arc(x*T+16,y*T+16,4,0,7);ctx.fill();}
  if(c==='R')ctx.drawImage(sprite('rabbit'),x*T+3,y*T+3-Math.abs(Math.sin(t*4))*3,26,26);}));
 const f=P.moving?P.t:0,px=(P.x+(P.tx-P.x)*f)*T,py=(P.y+(P.ty-P.y)*f)*T,bob=P.moving?Math.abs(Math.sin(t*18))*3:0;
 ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(px+16,py+28,9,3,0,0,7);ctx.fill();
 ctx.save();ctx.translate(px+16,py+16-bob);ctx.scale(P.face,1);ctx.drawImage(sprite('monkey'),-14,-14,28,28);ctx.restore();}
function loop(ts){requestAnimationFrame(loop);const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(!grid)return;update(dt);render(ts/1000);}
requestAnimationFrame(loop);
// ---- kuis ----
function runQuiz(bank,n,done){const qs=pickQuestions(bank,n);let i=0;
 function show(){const q=qs[i];curSay=q.say||q.text;$('#qtext').textContent=q.text;$('#qvis').innerHTML=q.visual?q.visual():'';
  $('#qdots').innerHTML=qs.length>1?qs.map((_,k)=>`<i class="${k<i?'done':k===i?'cur':''}"></i>`).join(''):'';
  const box=$('#qch');box.innerHTML='';makeChoices(q).forEach(key=>{const b=document.createElement('button');b.className='choice';
   b.innerHTML=choiceHTML(q.kind,key)+(q.kind==='num'?'':`<small>${key}</small>`);b.onclick=()=>pick(b,key===q.answer);box.appendChild(b);});
  $('#quiz').classList.remove('hidden');Snd.say(curSay);}
 function pick(b,ok){if(locked)return;
  if(!ok){mistakes++;b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),500);Snd.sfx('wrong');Snd.say('Coba lagi ya!');return;}
  locked=true;b.classList.add('right');Snd.sfx('correct');Snd.say(praise());
  setTimeout(()=>{locked=false;i++;if(i<qs.length)show();else{$('#quiz').classList.add('hidden');done();}},1400);}
 show();}
// ---- reward ----
function reward(title,sub,btn,next,voice){const s=mistakes===0?3:mistakes<=2?2:1;
 $('#rt').textContent=title;$('#rs').textContent=sub;$('#rb').textContent=btn;const st=$('#stars');st.innerHTML=STAR+STAR+STAR;
 $('#reward').classList.remove('hidden');Snd.sfx('win');Snd.say(voice);
 for(let i=0;i<s;i++)setTimeout(()=>{st.children[i].classList.add('on');Snd.sfx('star',i);},700+i*700);
 $('#rb').onclick=()=>{$('#reward').classList.add('hidden');next();};}
// ---- boss: gelembung angka ----
function hearts(){$('#bh').innerHTML=Array.from({length:boss.max},(_,i)=>HEART.replace('<svg',`<svg class="${i<boss.lives?'':'lost'}"`)).join('');}
function startBoss(){const L=LEVELS[2];boss={lives:L.lives,max:L.lives,qs:pickQuestions('level3',L.lives),i:0,busy:false};
 const m=$('#bmon');m.className='';m.querySelector('img').src=sprite('monster').toDataURL();void m.offsetWidth;m.classList.add('enter');hearts();bossQ();}
function bossQ(){const q=boss.qs[boss.i];boss.busy=false;$('#bt').textContent=q.text;$('#bq').innerHTML=q.visual();Snd.say(q.say);
 const ans=+q.answer;let nums=[ans];while(nums.length<5){const r=1+Math.floor(Math.random()*10);if(!nums.includes(r))nums.push(r);}
 const f=$('#bf');f.innerHTML='';shuffle(nums).forEach((n,i)=>{const o=document.createElement('div');o.className='bub';o.style.left=(2+i*19.5)+'%';o.style.top=(i%2?48:6)+'%';
  const b=document.createElement('div');b.className='bi';b.textContent=n;b.style.animationDelay=-Math.random()*2+'s';o.appendChild(b);o.onclick=()=>bubble(o,n===ans);f.appendChild(o);});}
function bubble(o,ok){if(boss.busy)return;
 if(!ok){mistakes++;Snd.sfx('wrong');Snd.say('Coba lagi ya!');o.classList.remove('shake');void o.offsetWidth;o.classList.add('shake');return;}
 boss.busy=true;Snd.sfx('pop');Snd.say(praise());
 const a=o.getBoundingClientRect(),m=$('#bmon img').getBoundingClientRect();
 o.style.zIndex=5;o.style.transition='transform .6s ease-in';o.style.transform=`translate(${m.left+m.width/2-a.left-a.width/2}px,${m.top+m.height/2-a.top-a.height/2}px) scale(.3)`;
 setTimeout(()=>{o.remove();Snd.sfx('hit');const mon=$('#bmon');mon.classList.remove('enter','hit');void mon.offsetWidth;mon.classList.add('hit');boss.lives--;hearts();
  if(boss.lives>0)setTimeout(()=>{boss.i++;bossQ();},1100);
  else setTimeout(()=>{mon.classList.remove('hit');mon.classList.add('vanish');Snd.sfx('win');
   setTimeout(()=>reward('Monster pergi! Hebat!','Kamu berhasil keluar dari labirin!','Main Lagi',()=>startLevel(0),'Selamat! Kamu berhasil menyelesaikan permainan!'),1300);},800);},650);}
window.Game={startLevel};
})();
