// ===== BANK SOAL (logika). Isi soal ada di data.js; kalimat suara ada di voice-lines.js =====
const apples=n=>`<span class="ap">${imgTag('apple').repeat(n)}</span>`;   // tiap apel terpisah, tidak bertumpuk
const BANK={
 level1:[...Object.keys(ANIMAL_SOUND).map(a=>({kind:'animal',vid:'q-animal-'+a,answer:a,pool:Object.keys(ANIMAL_SOUND)})),
  ...SHAPES.map(s=>({kind:'shape',vid:'q-shape-'+s.replace(' ','-'),answer:s,pool:SHAPES}))],
 level2:[...PATTERNS.map(p=>({kind:'color',vid:'q-pattern',answer:p.answer,pool:Object.keys(COLORS),visual:()=>p.seq.map(svgDot).join('')+'<b>?</b>'})),
  ...[1,2,3,4,5].map(n=>({kind:'num',vid:'q-count',answer:String(n),pool:['1','2','3','4','5'],visual:()=>apples(n)}))],
 level3:ADDITIONS.map(([a,b])=>({kind:'num',vid:`q-add-${a}-${b}`,text:`${a} + ${b} = ?`,answer:String(a+b),pool:[],visual:()=>`${apples(a)}<b>+</b>${apples(b)}<b>=</b><b>?</b>`}))};
BANK.level1.forEach(q=>q.text=VOICE_LINES[q.vid]);BANK.level2.forEach(q=>q.text=q.kind==='color'?'Warna apa yang melanjutkan pola ini?':'Ada berapa apel pada gambar?');
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const pickQuestions=(lv,n)=>shuffle(BANK[lv]).slice(0,n);                       // soal acak, tanpa pengulangan
const makeChoices=q=>shuffle([q.answer,...shuffle(q.pool.filter(x=>x!==q.answer)).slice(0,2)]);  // jawaban benar SELALU ada
function choiceHTML(kind,k){return kind==='animal'?imgTag(k):kind==='shape'?svgShape(k):kind==='color'?svgDot(k):`<span class="num">${k}</span>`;}
