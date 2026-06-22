---
name: optimize-assets
description: Petunjuk langkah demi langkah untuk mengoptimasi gambar statis pada proyek landing page menggunakan format WebP.
---

# Workflow: Optimize Assets (/optimize-assets)

Petunjuk langkah demi langkah untuk mengoptimasi gambar statis pada proyek landing page agar memiliki performa pemuatan yang cepat dan efisien menggunakan WebP.

## Langkah 1: Siapkan Modul Node
- Pastikan library `sharp` sudah terpasang. Jika belum, jalankan:
  `npm install sharp --save-dev`

## Langkah 2: Jalankan Skrip Optimasi Gambar
- Jalankan skrip optimasi gambar yang ada di folder scripts:
  `node scripts/optimize-images.js`
- Skrip ini akan secara otomatis membaca semua file `.png`, `.jpg`, dan `.jpeg` di dalam `public/assets/img/`, mengubahnya menjadi format `.webp` dengan kualitas 80%, lalu menyimpannya di folder yang sama.

## Langkah 3: Verifikasi dan Perbarui Referensi HTML
- Periksa apakah file `.webp` yang baru telah dihasilkan di `public/assets/img/`.
- Jalankan skrip untuk memperbarui referensi ekstensi gambar di HTML (jika ada):
  `node scripts/update-html.js`
- Buka dan periksa kembali `public/index.html` untuk memastikan semua tag `<img>` menggunakan aset `.webp` yang telah dioptimalkan.
