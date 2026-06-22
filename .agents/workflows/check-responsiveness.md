# Workflow: Check Responsiveness (/check-responsiveness)

Petunjuk langkah demi langkah untuk memeriksa responsivitas layout HTML dan mendeteksi kebocoran layout (*overflow*) pada breakpoint terkecil (mobile 320px - 430px).

## Langkah 1: Audit Kode CSS & Layout
- Jalankan pemindaian file HTML di `public/` untuk melacak elemen dengan lebar absolut (`width:` atau class Tailwind seperti `w-[Xpx]` atau `min-w-[Xpx]`).
- Ganti dengan elemen fleksibel atau `max-w-*` jika ditemukan elemen yang membocorkan lebar layar.

## Langkah 2: Audit Tag Pembungkus
- Pastikan tag `<body>` memiliki class `overflow-x-hidden`.
- Pastikan kontainer utama (`.container` atau sejenisnya) menggunakan pembatas responsif (misal: `width: min(100%, 1280px)` atau margin horizontal yang fleksibel).

## Langkah 3: Evaluasi Navigasi & Media
- Pastikan semua iframe video/gambar memiliki pembungkus aspect ratio (`aspect-video`) dan kelas `w-full`.
- Pastikan link navbar disembunyikan di layar mobile dan digantikan dengan sticky bottom bar jika diperlukan.
