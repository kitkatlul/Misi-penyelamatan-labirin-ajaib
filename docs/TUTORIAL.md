# Tutorial Deployment (GitHub + Vercel), tanpa terminal

## Tahap 1 - Persiapan file
1. Unduh `Misi-Penyelamatan-Labirin-Ajaib.zip`.
2. Klik kanan ZIP -> **Extract All / Ekstrak** (di HP: buka dengan aplikasi File lalu ekstrak).
3. Buka hasilnya sampai terlihat file `index.html`, `style.css`, `README.md`, `vercel.json` dan folder `src` serta `docs`. Itulah **isi** yang diunggah (bukan folder luarnya).
4. Uji cepat: klik dua kali `index.html`; game terbuka di browser.

## Tahap 2 - Upload ke GitHub
1. Buka github.com, daftar/masuk.
2. Klik **+** (kanan atas) -> **New repository**.
3. Isi nama, misalnya `labirin-ajaib`. Pilih **Public**. Klik **Create repository**.
4. Klik link **uploading an existing file**.
5. Dari folder hasil ekstrak, pilih semua isi (`index.html`, `style.css`, `README.md`, `vercel.json`, `.gitignore`, folder `src` dan `docs`) lalu seret ke halaman GitHub. Folder ikut terunggah jika diseret; tunggu sampai semua selesai.
6. Klik **Commit changes** (hijau).
7. Cek: di halaman utama repository harus terlihat `index.html` dan folder `src` langsung di tampilan awal (bukan di dalam folder lain).

## Tahap 3 - Deploy ke Vercel
1. Buka vercel.com -> **Sign Up** -> **Continue with GitHub** dan izinkan.
2. Klik **Add New... -> Project**.
3. Pada daftar repository, klik **Import** di `labirin-ajaib`.
4. **Framework Preset: Other**. **Build Command** dan **Output Directory**: biarkan kosong. **Root Directory**: `./`.
5. Klik **Deploy**. Tunggu sekitar 1 menit.
6. Alamat situs (`https://....vercel.app`) tampil di layar sukses; klik gambarnya untuk membuka.

## Tahap 4 - Verifikasi
1. Buka alamat tadi di HP dan laptop, tekan **MAIN**.
2. Level 1: gerakkan monyet ke pintu di pojok kanan bawah, jawab kuis, masuk ke kelinci.
3. Level 2: cari pintu di pojok kanan bawah, jawab 3 soal, masuk ke bulatan emas.
4. Level 3: ketuk gelembung berisi jawaban benar sampai 4 hati habis.
5. Suara: naikkan volume. Jika tidak ada suara bahasa Indonesia di perangkat, narasi bisa kosong; efek suara tetap ada.
**Masalah umum:** layar putih/404 -> `index.html` berada di dalam folder lain di GitHub; unggah ulang isinya langsung. Gambar kosong -> folder `src` belum terunggah. Tidak ada suara -> cek tombol suara di pojok kanan atas dan volume HP (mode senyap).

## Tahap 5 - Update game
1. Buka repository di GitHub, klik file yang ingin diganti (mis. `src/questions.js`).
2. Klik ikon pensil (**Edit**), ubah isinya, klik **Commit changes**. (Atau **Add file -> Upload files** untuk menimpa file.)
3. Vercel otomatis memperbarui situs dalam 1-2 menit. Cek di tab **Deployments** hingga berstatus *Ready*, lalu muat ulang situs.
