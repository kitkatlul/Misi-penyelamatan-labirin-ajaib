# Misi Penyelamatan di Labirin Ajaib - V2 Final
Game edukatif 2D top-down (TK A, 4-5 tahun). HTML + CSS + JavaScript murni (Canvas). Tanpa build, npm, atau backend; langsung jalan di Vercel sebagai situs statis.

## Isi V2
Prolog 4 adegan animasi, adegan penyelamatan kelinci, halaman akhir, musik latar (4 suasana), efek suara, pengaturan volume, tombol Lanjut di semua transisi, apel semi-realistis, animasi monyet 4 arah, ekspresi kelinci/monster. Level 1-3 dan bank soal tetap seperti V1.

## Struktur
- `index.html`, `style.css`, `cek-suara.html` (cek file suara mana yang sudah ada)
- `src/config.js` kecepatan, durasi transisi, volume | `src/data.js` **bank soal & peta** | `src/voice-lines.js` **naskah suara**
- `src/sprites.js` gambar pixel art | `src/questions.js` logika soal | `src/audio.js` musik & efek | `src/voice.js` narasi | `src/scenes.js` adegan cerita | `src/game.js` gameplay
- `assets/voice/` tempat file suara narator (.mp3)
- `docs/` tutorial, naskah suara, panduan suara anak, catatan perubahan, laporan pengujian

## Suara narator
Game memutar `assets/voice/<ID>.mp3`. Jika file belum ada, memakai suara bawaan browser (id-ID) sebagai cadangan; itu suara dewasa, bukan suara anak. Lihat `docs/PANDUAN-SUARA-ANAK.md`.
