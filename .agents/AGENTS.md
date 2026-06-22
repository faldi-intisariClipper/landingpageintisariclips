# Project-Scoped Rules: IntisariClips Landing Page

Dokumen ini berisi pedoman lokal untuk AI dalam mengembangkan, menguji, dan memelihara repositori landing page IntisariClips V10.

## 🎨 Aturan Desain & CRO (Conversion Rate Optimization)
1. **Desain Asimetris & Premium:** Hindari layout grid 50:50 yang kaku. Gunakan overlap elemen dan hard-shadow ala neo-brutalism.
2. **Kesesuaian AIDA/PAS:** Struktur halaman harus menuntun psikologi pembeli dari Hook -> Masalah -> Solusi (Bento Grid) -> Social Proof (WhatsApp/Telegram mockups) -> Penawaran Harga/Garansi -> Form Checkout.
3. **Mobile-First Scroll Stopper:** Impresi visual di mobile harus berubah secara dinamis setiap kali digulir (scroll) untuk meminimalkan bounce rate.

## 🚀 Prosedur Sebelum Coding
1. **Draf Konsep:** AI harus menyajikan ide tertulis mengenai Core Hook dan Layout Blueprint secara visual sebelum mulai menulis baris kode.
2. **Penamaan ID:** Pastikan semua element interaktif (button, input, form) menggunakan ID yang unik dan deskriptif.

## 🛡️ HTML & Responsiveness Deep-Check Rules
1. **Layout Overflow:** Tag `<body>` wajib memiliki class `overflow-x-hidden`. Elemen lebar tidak boleh melebihi batas layar mobile 320px - 430px.
2. **Responsivitas Media:** Elemen video dan gambar demo harus menggunakan `w-full` dan `h-auto` dengan pembungkus aspek rasio (`aspect-video`).
3. **Navbar Mobile:** Links navigasi dan tombol CTA navbar harus disembunyikan pada ukuran layar kecil.
