// Semua gambar dibuat dari kode (pixel art orisinal). Tidak ada file gambar eksternal.
const PAL={b:'#8d5a2b',t:'#f3c98b',k:'#2b1b12',w:'#ffffff',p:'#f9a8c9',r:'#e53935',y:'#fcd34d',o:'#fb923c',n:'#7a4a1e',g:'#9ca3af',m:'#8e6bd8',e:'#43a047',G:'#9bd36b',H:'#86c45a',D:'#2e7d32',L:'#4caf50',W:'#c68642',S:'#f3dfae',s:'#e8cd8e',f:'#fff6a8'};
const MAPS={
monkey:['..bbbbbbbb..','.bbbbbbbbbb.','bttbbbbbbttb','bttbttttbttb','.bbttttttbb.','..btkttktb..','..bttttttb..','..bttkkttb..','...bbbbbb...','..bbbbbbbb..','..bbbbbbbb..','..bb....bb..'],
rabbit:['..ww....ww..','..wp....pw..','..wp....pw..','..ww....ww..','..wwwwwwww..','.wwwwwwwwww.','.wwkwwwwkww.','.wwwwppwwww.','.wwwwwwwwww.','..wwwwwwww..','..wwwwwwww..','..ww....ww..'],
monster:['.mm........mm.','.mmm......mmm.','.mmmmmmmmmmmm.','mmmmmmmmmmmmmm','mwwwmmmmmmwwwm','mwkwmmmmmmwkwm','mwwwmmmmmmwwwm','mmmpmmmmmmpmmm','mmmmppppppmmmm','mmmmmmmmmmmmmm','.mmmmmmmmmmmm.','.mm..mmmm..mm.'],
kucing:['oo......oo','ooo....ooo','oooooooooo','ookooookoo','oooooooooo','ooooppoooo','oowwwwwwoo','ooowwwwooo','.oooooooo.','..oo..oo..'],
anjing:['..tttttttt','.tttttttt.','nttttttttn','nntkttkknn','nnttttttnn','nnttkkttnn','.tttttttt.','.ttttpptt.','..tttttt..','..tt..tt..'],
ayam:['....rr....','...rrrr...','..wwwwww..','.wwkwwkww.','.wwwyywww.','.wwwyywww.','wwwwrrwwww','wwwwwwwwww','.wwwwwwww.','..yy..yy..'],
sapi:['g........g','gwwwwwwwwg','wwwwwwwwww','wwkwwwwkww','wkkwwwwwww','wwppppppww','wwpkppkpww','wwppppppww','.wwwwwwww.','..ww..ww..'],
bebek:['...yyyy...','..yyyyyy..','..yyyyyy..','..ykyykyy.','..yooooyy.','...yyyyyy.','.yyyyyyyyy','yyyyyyyyyy','.yyyyyyyy.','..oo..oo..'],
apple:['....e...','....n...','.rrrrrr.','rrwrrrrr','rrrrrrrr','rrrrrrrr','.rrrrrr.','..rr.rr.'],
tGrass:['GGGGGGGG','GGHGGGGG','GGGGGGHG','GGGGGGGG','GGGHGGGG','GHGGGGGG','GGGGGGGG','GGGGGHGG'],
tFlower:['GGGGGGGG','GGHGGGGG','GGGGfGGG','GGGfyfGG','GGGGfGGG','GHGGGGGG','GGGGGGHG','GGGGGHGG'],
tWall:['DLLDDLLD','LLLLLLLL','DLLLDLLL','DDLLLLDD','DLLDDLLD','LLLLLLLL','DDLDDLDD','DDDDDDDD'],
tDoor:['nnnnnnnn','nWWWWWWn','nWnWWnWn','nWWWWWWn','nWWWyyWn','nWWWyyWn','nWnWWnWn','nnnnnnnn'],
tSand:['SSSSSSSS','SSsSSSSS','SSSSSSsS','SSSSSSSS','SSSsSSSS','SsSSSSSS','SSSSSSSS','SSSSSsSS']};
const _c={};
function sprite(n){if(_c[n])return _c[n];const m=MAPS[n],c=document.createElement('canvas');c.width=m[0].length;c.height=m.length;const x=c.getContext('2d');
 m.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch!=='.'){x.fillStyle=PAL[ch];x.fillRect(i,j,1,1);}}));return _c[n]=c;}
const imgTag=n=>`<img src="${sprite(n).toDataURL()}" alt="${n}">`;
const COLORS={merah:'#e53935',biru:'#1e88e5',kuning:'#fdd835',hijau:'#43a047'};
const svgDot=c=>`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${COLORS[c]}" stroke="#4a2c10" stroke-width="5"/></svg>`;
function svgShape(n){const c='#1e88e5',s={lingkaran:`<circle cx="50" cy="50" r="38" fill="${c}"/>`,segitiga:`<polygon points="50,12 90,86 10,86" fill="${c}"/>`,persegi:`<rect x="16" y="16" width="68" height="68" fill="${c}"/>`,'persegi panjang':`<rect x="6" y="28" width="88" height="44" fill="${c}"/>`}[n];
 return `<svg viewBox="0 0 100 100" stroke="#4a2c10" stroke-width="5" stroke-linejoin="round">${s}</svg>`;}
