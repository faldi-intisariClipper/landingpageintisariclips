---
name: responsive-pixel-check
description: Panduan mendeteksi ukuran piksel absolut dan mencegah kebocoran layout (overflow-x) pada mobile viewports.
---

# Responsive Pixel Check & Layout Overflow Preventer

Skill ini digunakan untuk mengaudit dan memastikan tidak ada elemen HTML/CSS yang merusak batas lebar layar ponsel (320px - 430px) sesuai dengan instruksi `Agent.md`.

## 🚨 Mengapa Kebocoran Layout Terjadi?
Kebocoran layout (*layout overflow*) sering disebabkan oleh:
1. Penggunaan nilai lebar absolut seperti `width: 500px` atau class Tailwind `w-[450px]` tanpa pembatas responsif.
2. Padding atau margin yang terlalu besar pada kontainer flex/grid yang tidak membungkus elemen anak secara dinamis.
3. Gambar atau video tanpa pengaturan `w-full` / `max-w-full`.

## 🛠️ Prosedur Audit Otomatis & Manual
1. **Analisis String & Regex:**
   - Cari semua kecocokan pola lebar piksel statis pada CSS atau HTML menggunakan regex di terminal:
     `grep -rn "width:\s*[0-9]\{3,\}px" public/` atau `grep -rn "w-\[[0-9]\{3,\}px\]" public/`
2. **Perbaikan Kode CSS/Tailwind:**
   - Ganti properti lebar absolut pada kontainer dengan kelas responsif:
     - Gantilah `w-[500px]` menjadi `w-full max-w-[500px]`.
     - Gantilah `min-w-[450px]` menjadi `min-w-0 md:min-w-[450px]` atau gunakan `w-full`.
3. **Verifikasi Elemen Pembungkus Utama:**
   - Pastikan tag `<body>` memiliki atribut kelas pembatas:
     `<body class="overflow-x-hidden">`
   - Bungkus semua media gambar dan video dengan tag div yang memiliki properti `aspect-video` dan `w-full`.
