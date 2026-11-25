// ===== DATA SOAL & PETA (tanpa logika) =====
const NUM=['nol','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh'];
// LEVEL 1 - hewan: nama (gambar harus ada di sprites.js) : bunyi
const ANIMAL_SOUND={kucing:'meong',anjing:'guk guk',ayam:'kukuruyuk',sapi:'moo',bebek:'kwek kwek'};
// LEVEL 1 - bentuk geometri
const SHAPES=['lingkaran','segitiga','persegi','persegi panjang'];
// LEVEL 2 - pola warna (warna: merah, biru, kuning, hijau)
const PATTERNS=[{seq:['merah','biru','merah'],answer:'biru'},{seq:['kuning','hijau','kuning'],answer:'hijau'},{seq:['biru','kuning','biru'],answer:'kuning'},{seq:['hijau','merah','hijau'],answer:'merah'},
 {seq:['merah','merah','biru','merah','merah'],answer:'biru'},{seq:['biru','biru','kuning','biru','biru'],answer:'kuning'}];
// LEVEL 3 - penjumlahan [a,b] (jumlah maksimal 10)
const ADDITIONS=[[1,1],[1,2],[2,1],[2,2],[1,3],[3,1],[2,3],[3,2],[1,4],[4,1],[3,3],[2,4]];
// PETA: # dinding, S awal, D pintu, R kelinci, E gerbang keluar
const LEVEL_MAPS=[
 ['###########','#S..#.....#','#.#.#.###.#','#.#...#...#','#.#####.###','#.....#...#','###.#.#.#D#','#...#...#R#','###########'],
 ['###############','#S....#.......#','#####.#.#####.#','#.....#.#...#.#','#.#####.#.#.#.#','#.#.....#.#...#','#.#.#####.#####','#.#.#.....#...#','#.#.#.#####.#D#','#...#.......#E#','###############']];
