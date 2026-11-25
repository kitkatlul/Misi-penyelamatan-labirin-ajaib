// ===== PENGATURAN MUDAH DIUBAH =====
const CONFIG={
 fadeMs:450,          // lama transisi halus (milidetik)
 nextLockMs:900,      // tombol Lanjut tidak bisa ditekan dua kali dalam waktu ini (anti double-tap)
 speed:4.6,           // kecepatan monyet (kotak per detik)
 lives:4,             // jumlah soal / nyawa Monster Penjaga
 voiceDir:'assets/voice/', voiceExt:'mp3',   // lokasi & format file suara narator
 failBase:1500, failPerChar:75,              // cadangan waktu agar tombol Lanjut aktif bila suara gagal
 defaults:{music:.5,voice:1,sfx:.8}          // volume awal
};
