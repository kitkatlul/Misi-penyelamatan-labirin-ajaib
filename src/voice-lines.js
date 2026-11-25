// ===== NASKAH SUARA: ID -> kalimat. Nama file audio = ID + ".mp3" di folder assets/voice/ =====
const VOICE_LINES={
 'p1':'Halo, teman-teman! Hari ini kita akan berpetualang ke sebuah tempat yang sangat ajaib. Namanya adalah Labirin Ajaib!',
 'p2':'Di dalam labirin ini, ada seekor kelinci kecil yang sedang terjebak. Kelinci itu ingin sekali keluar, tetapi jalannya tertutup oleh pintu yang terkunci.',
 'p3':'Untungnya, ada seekor monyet pemberani yang siap membantu! Tapi, untuk menyelamatkan kelinci, kita harus melewati labirin dan menjawab beberapa pertanyaan.',
 'p4':'Nah, teman-teman, mau ikut membantu monyet menyelamatkan kelinci? Yuk, kita mulai petualangannya! Ayo, cari jalan yang benar dan selesaikan semua tantangannya!',
 'l1':'Yuk, bantu monyet mencari kelinci! Ikuti jalan di dalam labirin. Kalau menemukan pintu yang terkunci, jawab pertanyaannya dengan benar, ya!',
 'ctl':'Tekan tombol panah untuk menggerakkan monyet. Di laptop, kamu bisa pakai tombol panah atau W A S D.',
 'l2':'Hebat! Kelinci sudah berhasil diselamatkan. Sekarang, ayo kita cari jalan keluar! Ada tantangan pola warna dan menghitung benda yang harus kita selesaikan.',
 'l3':'Wah, ada Monster Penjaga di depan kita! Jangan takut, ya! Kita bisa melewatinya dengan menjawab soal penjumlahan. Pilih gelembung yang berisi angka yang benar!',
 'search':'Ayo, kita cari jalan yang benar!',
 'quiz-ins':'Ketuk gambar jawaban yang benar, ya!',
 'door-open':'Pintunya terbuka!',
 'pr1':'Hebat sekali!','pr2':'Jawabanmu benar!','pr3':'Wah, kamu pintar!','pr4':'Bagus sekali!',
 'r1':'Coba lagi ya!','r2':'Sedikit lagi! Kamu pasti bisa!',
 'rescue-n':'Kamu berhasil menyelamatkan kelinci!',
 'rescue-r':'Terima kasih, Monyet! Kamu baik sekali!',
 'w1':'Hore! Kamu mendapat bintang! Yuk, lanjut ke Level dua!',
 'w2':'Keren! Jalan menuju Monster Penjaga sudah terbuka!',
 'w3':'Monster Penjaga sudah pergi! Kamu hebat sekali!',
 'm-hi':'Halo! Aku Monster Penjaga. Ayo kita main tebak angka!',
 'm-bye':'Aku pergi dulu, ya! Sampai jumpa!',
 'final':'Selamat! Kamu berhasil menyelesaikan permainan!',
 'q-pattern':'Lengkapi polanya. Warna apa yang selanjutnya?',
 'q-count':'Ada berapa apel pada gambar?'};
Object.keys(ANIMAL_SOUND).forEach(a=>VOICE_LINES['q-animal-'+a]=`Hewan apa yang bersuara ${ANIMAL_SOUND[a]}?`);
SHAPES.forEach(s=>VOICE_LINES['q-shape-'+s.replace(' ','-')]=`Manakah bentuk ${s}?`);
ADDITIONS.forEach(([a,b])=>VOICE_LINES[`q-add-${a}-${b}`]=`${NUM[a]} tambah ${NUM[b]} sama dengan berapa?`);
