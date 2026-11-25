// Semua gambar dibuat dari kode (pixel art orisinal). Tidak ada file gambar eksternal.
const Q=s=>document.querySelector(s);
const PAL={b:'#8d5a2b',t:'#f3c98b',k:'#2b1b12',w:'#ffffff',p:'#f9a8c9',r:'#e53935',R:'#a8161a',q:'#ff8a7e',z:'rgba(0,0,0,.22)',y:'#fcd34d',o:'#fb923c',n:'#6b3e1b',g:'#9ca3af',m:'#8e6bd8',e:'#5cb85c',E:'#2e7d32',c:'#8fd3ff',G:'#9bd36b',H:'#86c45a',D:'#2e7d32',L:'#4caf50',W:'#c68642',S:'#f3dfae',s:'#e8cd8e',f:'#fff6a8'};
const MAPS={
monkey:['..bbbbbbbb..','.bbbbbbbbbb.','bttbbbbbbttb','bttbttttbttb','.bbttttttbb.','..btkttktb..','..bttttttb..','..bttkkttb..','...bbbbbb...','..bbbbbbbb..','..bbbbbbbb..','..bb....bb..'],
monkeyBack:['..bbbbbbbb..','.bbbbbbbbbb.','bttbbbbbbttb','bttbbbbbbttb','.bbbbbbbbbb.','..bbbbbbbb..','..bbbbbbbb..','..bbbbbbbb..','...bbbbbb...','..bbbbbbbb..','..bbbbbbbb..','..bb....bb..'],
monkeySide:['...bbbbbb...','..bbbbbbbb..','.bttbbbbbbb.','.bttbbtttkb.','..bbbtttttb.','..bbbtttkkb.','...bbtttttb.','...bbbbbbb..','..bbbbbbbb..','.bbbbbbbbbb.','..bbbbbbbb..','..bb....bb..'],
rabbit:['..ww....ww..','..wp....pw..','..wp....pw..','..ww....ww..','..wwwwwwww..','.wwwwwwwwww.','.wwkwwwwkww.','.wwwwppwwww.','.wwwwwwwwww.','..wwwwwwww..','..wwwwwwww..','..ww....ww..'],
monster:['.mm........mm.','.mmm......mmm.','.mmmmmmmmmmmm.','mmmmmmmmmmmmmm','mwwwmmmmmmwwwm','mwkwmmmmmmwkwm','mwwwmmmmmmwwwm','mmmpmmmmmmpmmm','mmmmppppppmmmm','mmmmmmmmmmmmmm','.mmmmmmmmmmmm.','.mm..mmmm..mm.'],
kucing:['oo......oo','ooo....ooo','oooooooooo','ookooookoo','oooooooooo','ooooppoooo','oowwwwwwoo','ooowwwwooo','.oooooooo.','..oo..oo..'],
anjing:['..tttttttt','.tttttttt.','nttttttttn','nntkttkknn','nnttttttnn','nnttkkttnn','.tttttttt.','.ttttpptt.','..tttttt..','..tt..tt..'],
ayam:['....rr....','...rrrr...','..wwwwww..','.wwkwwkww.','.wwwyywww.','.wwwyywww.','wwwwrrwwww','wwwwwwwwww','.wwwwwwww.','..yy..yy..'],
sapi:['g........g','gwwwwwwwwg','wwwwwwwwww','wwkwwwwkww','wkkwwwwwww','wwppppppww','wwpkppkpww','wwppppppww','.wwwwwwww.','..ww..ww..'],
bebek:['...yyyy...','..yyyyyy..','..yyyyyy..','..ykyykyy.','..yooooyy.','...yyyyyy.','.yyyyyyyyy','yyyyyyyyyy','.yyyyyyyy.','..oo..oo..'],
// apel semi-realistis: tangkai, daun, gradasi merah, sorotan cahaya, lekukan atas, bayangan
apple:['.....nn.eee.','..rrrnnrrrr.','.rqqrrrrrrrR','.rqwrrrrrrRR','.rqrrrrrrrRR','.rrrrrrrrrRR','.rrrrrrrrrRR','..rrrrrrrrR.','..rrrrrrrRR.','...rrrrrrR..','....rRRRR...','..zzzzzzzz..'],
tGrass:['GGGGGGGG','GGHGGGGG','GGGGGGHG','GGGGGGGG','GGGHGGGG','GHGGGGGG','GGGGGGGG','GGGGGHGG'],
tFlower:['GGGGGGGG','GGHGGGGG','GGGGfGGG','GGGfyfGG','GGGGfGGG','GHGGGGGG','GGGGGGHG','GGGGGHGG'],
tWall:['DLLDDLLD','LLLLLLLL','DLLLDLLL','DDLLLLDD','DLLDDLLD','LLLLLLLL','DDLDDLDD','DDDDDDDD'],
tDoor:['nnnnnnnn','nWWWWWWn','nWnWWnWn','nWWWWWWn','nWWWyyWn','nWWWyyWn','nWnWWnWn','nnnnnnnn'],
tSand:['SSSSSSSS','SSsSSSSS','SSSSSSsS','SSSSSSSS','SSSsSSSS','SsSSSSSS','SSSSSSSS','SSSSSsSS']};
// varian = gambar dasar + perubahan piksel [x,y,warna]  (ekspresi & animasi)
const LEG=[[2,11,'.'],[9,11,'.'],[4,11,'b'],[7,11,'b']];
const VARS={
 monkey_w:['monkey',LEG],monkeyBack_w:['monkeyBack',LEG],monkeySide_w:['monkeySide',LEG],
 monkeyHappy:['monkey',[[4,5,'t'],[7,5,'t'],[4,4,'k'],[7,4,'k'],[4,7,'k'],[7,7,'k']]],
 monkeyWave:['monkeyHappy',[[11,10,'b'],[11,9,'b'],[11,8,'b'],[11,7,'b'],[11,6,'b'],[11,5,'t'],[11,4,'t']]],
 monkeyWave2:['monkeyHappy',[[11,10,'b'],[11,9,'b'],[11,8,'b'],[11,7,'t'],[10,6,'t']]],
 monkeyCheer:['monkeyHappy',[[0,10,'b'],[0,9,'b'],[0,8,'b'],[0,7,'b'],[0,6,'b'],[0,5,'t'],[0,4,'t'],[11,10,'b'],[11,9,'b'],[11,8,'b'],[11,7,'b'],[11,6,'b'],[11,5,'t'],[11,4,'t']]],
 rabbitSad:['rabbit',[[3,7,'c'],[8,7,'c'],[5,8,'k'],[6,8,'k']]],
 rabbitSad2:['rabbit',[[3,8,'c'],[8,8,'c'],[5,8,'k'],[6,8,'k']]],
 rabbitHappy:['rabbit',[[3,5,'k'],[8,5,'k'],[3,6,'w'],[8,6,'w'],[2,7,'p'],[9,7,'p'],[4,8,'k'],[7,8,'k']]],
 monsterHit:['monster',[[1,4,'m'],[2,4,'m'],[3,4,'m'],[1,6,'m'],[2,6,'m'],[3,6,'m'],[1,5,'k'],[2,5,'k'],[3,5,'k'],[10,4,'m'],[11,4,'m'],[12,4,'m'],[10,6,'m'],[11,6,'m'],[12,6,'m'],[10,5,'k'],[11,5,'k'],[12,5,'k'],[5,8,'k'],[6,8,'k'],[7,8,'k'],[8,8,'k']]]};
function getMap(n){if(MAPS[n])return MAPS[n];const[b,ed]=VARS[n],m=getMap(b).map(r=>[...r]);ed.forEach(([x,y,ch])=>m[y][x]=ch);return MAPS[n]=m.map(r=>r.join(''));}
const _c={};
function sprite(n){if(_c[n])return _c[n];const m=getMap(n),c=document.createElement('canvas');c.width=m[0].length;c.height=m.length;const x=c.getContext('2d');
 m.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch!=='.'){x.fillStyle=PAL[ch];x.fillRect(i,j,1,1);}}));return _c[n]=c;}
const imgTag=n=>`<img src="${sprite(n).toDataURL()}" alt="${n}">`;
const COLORS={merah:'#e53935',biru:'#1e88e5',kuning:'#fdd835',hijau:'#43a047'};
const svgDot=c=>`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${COLORS[c]}" stroke="#4a2c10" stroke-width="5"/></svg>`;
function svgShape(n){const c='#1e88e5',s={lingkaran:`<circle cx="50" cy="50" r="38" fill="${c}"/>`,segitiga:`<polygon points="50,12 90,86 10,86" fill="${c}"/>`,persegi:`<rect x="16" y="16" width="68" height="68" fill="${c}"/>`,'persegi panjang':`<rect x="6" y="28" width="88" height="44" fill="${c}"/>`}[n];
 return `<svg viewBox="0 0 100 100" stroke="#4a2c10" stroke-width="5" stroke-linejoin="round">${s}</svg>`;}
// ---- pembantu UI bersama ----
const ARROW='<svg class="ar" viewBox="0 0 24 24"><path d="M4 12h13M12 5l7 7-7 7" stroke="#4a2c10" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const btnSet=(b,t)=>{b.innerHTML=`<span>${t}</span>${ARROW}`;};
const setReady=(b,on)=>{b.disabled=!on;b.classList.toggle('ready',on);};
const Nav={until:0,ok(){if(Date.now()<this.until)return false;this.until=Date.now()+CONFIG.nextLockMs;return true;}};  // anti double-tap
const rand=a=>a[Math.floor(Math.random()*a.length)];
