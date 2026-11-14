# Misi Penyelamatan di Labirin Ajaib
Game edukatif 2D top-down untuk anak TK A (4-5 tahun). 3 level: Labirin Sahabat Hewan, Labirin Tantangan Logika, Boss Gelembung Angka.
Teknologi: HTML + CSS + JavaScript murni (Canvas). **Tanpa build, tanpa npm, tanpa backend.** Cukup unggah ke GitHub lalu Vercel.

## Struktur
- `index.html`, `style.css` : halaman dan tampilan
- `src/sprites.js` : semua gambar pixel art (dibuat dari kode, orisinal)
- `src/questions.js` : **BANK SOAL** (tempat menambah/mengubah soal)
- `src/audio.js` : efek suara dan narasi bahasa Indonesia
- `src/game.js` : labirin, kontrol, kuis, boss, reward
- `docs/TUTORIAL.md` : panduan GitHub + Vercel
- `vercel.json` : pengaturan Vercel

## Kontrol
HP/tablet: D-pad di layar. Laptop/PC: tombol panah atau WASD. Jawaban: ketuk/klik gambar.

## Narasi suara
Memakai Text-to-Speech bawaan browser (bahasa id-ID). Keterbatasan: kualitas suara tergantung perangkat; jika suara Indonesia tidak tersedia, narasi mungkin diam atau memakai suara lain, tetapi game tetap bisa dimainkan lewat tulisan, gambar, dan efek suara. Tombol "Dengar lagi" mengulang pertanyaan. Opsi lain (belum dipakai): rekaman suara sendiri, lebih konsisten tetapi harus direkam dan ditambah sebagai file.

## Mengubah soal
Buka `src/questions.js`. Tiap tabel diberi komentar. Contoh: tambah hewan -> tambahkan di `ANIMAL_SOUND` (gambar hewan harus ada di `sprites.js`); tambah pola -> tambah baris di `PATTERNS`; tambah penjumlahan -> tambah `[a,b]` di `ADDITIONS`.

## Aturan yang dipakai (sesuai persetujuan)
Level 1: 1 soal acak. Level 2: 1 pintu, 3 soal berurutan. Level 3: 4 soal (nyawa monster 4). Bintang: 0 salah = 3, 1-2 salah = 2, 3+ salah = 1. Tidak ada game over.
