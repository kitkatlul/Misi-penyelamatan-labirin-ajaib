// ===== BANK SOAL ===== Mudah diubah: tambah/ubah baris pada tabel di bawah ini.
const NUM=['nol','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh'];
// LEVEL 1 - hewan: nama (harus ada gambarnya di sprites.js) : bunyi
const ANIMAL_SOUND={kucing:'meong',anjing:'guk guk',ayam:'kukuruyuk',sapi:'moo',bebek:'kwek kwek'};
// LEVEL 1 - bentuk geometri (gambar ada di sprites.js, fungsi svgShape)
const SHAPES=['lingkaran','segitiga','persegi','persegi panjang'];
// LEVEL 2 - pola warna: urutan yang terlihat + jawaban untuk tanda tanya. Warna: merah, biru, kuning, hijau
const PATTERNS=[{seq:['merah','biru','merah'],answer:'biru'},{seq:['kuning','hijau','kuning'],answer:'hijau'},{seq:['biru','kuning','biru'],answer:'kuning'},{seq:['hijau','merah','hijau'],answer:'merah'},
 {seq:['merah','merah','biru','merah','merah'],answer:'biru'},{seq:['biru','biru','kuning','biru','biru'],answer:'kuning'}];
// LEVEL 3 - penjumlahan [a,b] (jumlah maksimal 10)
const ADDITIONS=[[1,1],[1,2],[2,1],[2,2],[1,3],[3,1],[2,3],[3,2],[1,4],[4,1],[3,3],[2,4]];
const apples=n=>imgTag('apple').repeat(n);
const BANK={
 level1:[...Object.keys(ANIMAL_SOUND).map(a=>({kind:'animal',text:`Hewan apa yang bersuara ${ANIMAL_SOUND[a]}?`,answer:a,pool:Object.keys(ANIMAL_SOUND)})),
  ...SHAPES.map(s=>({kind:'shape',text:`Manakah bentuk ${s}?`,answer:s,pool:SHAPES}))],
 level2:[...PATTERNS.map(p=>({kind:'color',text:'Warna apa yang melanjutkan pola ini?',say:'Lengkapi polanya. Warna apa yang selanjutnya?',answer:p.answer,pool:Object.keys(COLORS),
   visual:()=>p.seq.map(svgDot).join('')+'<b>?</b>'})),
  ...[1,2,3,4,5].map(n=>({kind:'num',text:'Ada berapa apel pada gambar?',answer:String(n),pool:['1','2','3','4','5'],visual:()=>apples(n)}))],
 level3:ADDITIONS.map(([a,b])=>({kind:'num',text:`${a} + ${b} = ?`,say:`${NUM[a]} tambah ${NUM[b]} sama dengan berapa?`,answer:String(a+b),pool:[],
   visual:()=>`${apples(a)}<b>+</b>${apples(b)}<b>=</b><b>?</b>`}))};
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
// Ambil n soal acak berbeda dari satu level
const pickQuestions=(lv,n)=>shuffle(BANK[lv]).slice(0,n);
// Pilihan jawaban: 3 pilihan, jawaban benar SELALU ada
const makeChoices=q=>shuffle([q.answer,...shuffle(q.pool.filter(x=>x!==q.answer)).slice(0,2)]);
function choiceHTML(kind,k){return kind==='animal'?imgTag(k):kind==='shape'?svgShape(k):kind==='color'?svgDot(k):`<span class="num">${k}</span>`;}
