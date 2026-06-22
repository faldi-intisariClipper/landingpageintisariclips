# TODO List: Optimasi Landing Page Sesuai Ketentuan Agent.md & SEO

Dokumen ini mencantumkan hasil audit kepatuhan terhadap file-file HTML di direktori `public/` berdasarkan aturan di `Agent.md` dan praktik terbaik SEO.

## 📌 Checklist Kepatuhan & Perbaikan

### 1. Tag Meta Deskripsi (SEO & Metadata)
- [x] Tambahkan `<meta name="description">` pada `public/index.html` (Meningkatkan performa SEO dan CTR pada search engine/sharing link).
- [x] Tambahkan `<meta name="description">` pada `public/success.html`.
- [x] Tambahkan `<meta name="description">` pada `public/kebijakan-privasi.html`.
- [x] Tambahkan `<meta name="description">` pada `public/syarat-ketentuan.html`.

### 2. Open Graph & Twitter Cards (Social Share Optimization)
- [ ] Tambahkan meta tag Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) pada `public/index.html` untuk mematangkan preview tautan saat dibagikan ke WhatsApp, Telegram, atau media sosial iklan.
- [ ] Tambahkan meta tag Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).

### 3. Evaluasi Responsivitas & Kebocoran Layout (Sesuai Agent.md)
- [x] Pastikan properti `overflow-x-hidden` terpasang di pembungkus luar (`<body>`).
- [x] Verifikasi grid & flexbox responsif pada breakpoint terkecil (mobile 320px - 430px).
- [x] Verifikasi media video/gambar demo menggunakan `w-full`, `h-auto`, dan pembungkus aspect ratio (`aspect-video`).
- [x] Pastikan navigasi menu dan tombol CTA disembunyikan/disesuaikan dengan aman di layar mobile agar tidak meluber.

### 4. Struktur Heading & Semantik
- [x] Pastikan hanya ada satu tag `<h1>` per halaman (sudah diverifikasi pada `public/index.html`).
- [x] Verifikasi hierarki heading lainnya (`<h2>` hingga `<h6>`).
