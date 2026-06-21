# SRS 05: Spesifikasi Funnel Hacking Landing Page

Dokumen ini mencatat spesifikasi teknis dan fungsional untuk perombakan total tata letak (*layout*) Landing Page IntisariClips dengan mengadopsi alur konversi dari kompetitor (`provi.orderhero.id/page/clipprovit`), yang dimodifikasi sesuai dengan *branding* dan aset media IntisariClips.

## 1. Arsitektur Visual & Branding
- **Warna & Tema**: Mempertahankan **Premium Dark Mode** (`bg-dark-950` / `#020617`) dengan aksen warna brand biru (`#3b82f6`) dan hijau emerald (`#10b981`). Layout yang bersih dan tertata milik kompetitor disesuaikan menjadi mode gelap yang mewah.
- **Tipografi**: Judul menggunakan kombinasi font *Outfit* (Sans-Serif geometris) dan *Playfair Display* (Serif elegan untuk aksen italic), memberikan kesan kontras yang premium.
- **Interaksi**: Efek hover interaktif, animasi ring SVG berputar, dan penggambaran doodle coretan tangan melingkar (SVG path) saat elemen masuk ke viewport.

## 2. Struktur Seksi Halaman (Sequential Funnel)
Halaman `index.html` disusun secara sekuensial dengan urutan sebagai berikut:

### A. Navigation Bar (Header)
- Logo brand, nama aplikasi, menu link penunjuk seksi (`Bukti Pasar`, `Kenapa Sekarang`, `Alur`, `Hitung Cuan`, `Fitur`, `Harga`, `FAQ`).
- Tombol CTA cepat "Ambil Akses" dengan info harga Batch aktif saat ini.

### B. The Hook (Hero Section)
- **Layout**: 2 Kolom (Desktop), 1 Kolom (Mobile).
- **Kolom Kiri**: 
  - Eyebrow badge: "Selalu di-maintain · update gratis".
  - Headline Masif: Menggunakan coretan doodle (pencil circle) pada kata-kata penting.
  - Deskripsi/Lead: Copywriting IntisariClips yang menekankan proses offline-first tanpa API key.
  - Price Card: Menampilkan badge Batch 3 aktif, info harga diskon sekali bayar (Rp 190.000 dari Rp 400.000), dan kenaikan harga di batch berikutnya.
  - Tombol CTA utama menuju checkout + Tombol sekunder "Hitung Cuan".
- **Kolom Rist/Kanan**:
  - Panel "100% Unlimited": Animasi teks melingkar SVG "TANPA TOKEN · TANPA CREDIT · TANPA LIMIT".
  - Video Dashboard Wrapper: Menampilkan video `demo_intisariClips.webm` dalam frame melayang.
  - Alur 3 Langkah Singkat (Step 1, 2, 3).
  - Tanda Kepercayaan (OS Support, Lifetime License, Active Maintenance).

### C. Jawaban Cepat (FAQ Ringkas)
- Grid 5 kolom (1 kolom di mobile) berisi FAQ super cepat untuk memotong keraguan awal pembeli mengenai: API Key, Token/Credit, Bayar Berapa Kali, Lisensi/Update, dan Jenis Konten.

### D. OS Support & Platform
- Kartu informasi dukungan sistem operasi Windows (10/11 64-bit) dan macOS (Intel & Apple Silicon M1/M2/M3) dengan logo SVG responsif.

### E. Bukti Pasar (Social Proof)
- **Marquee Slider**: Deretan gambar `Testimoni-(1).PNG` hingga `Testimoni-(10).PNG` yang meluncur horizontal secara otomatis tanpa henti (infinity loop), berhenti ketika kursor mouse didekatkan (hover).
- Info tarif rata-rata clipper per 1.000 views di pasar (Rp 1.500 - Rp 5.000) dan budget tertinggi untuk memotivasi calon clipper.

### F. Kenapa Sekarang (Urgent Needs)
- 3 kolom kartu asimetris yang memvalidasi peluang industri video pendek: ledakan video panjang, pentingnya 3 detik pertama (hook), dan konsistensi upload.

### G. Cocok Buat (Use Cases)
- Kumpulan tag/chips kategori video: Bola & Olahraga, Podcast, Ceramah, Gaming, Berita, Kelas Online, Komedi, Interview.

### H. Hitung Cuan (ROI Calculator)
- Fitur interaktif tempat pengguna memasukkan angka: Jumlah klip per bulan, Rata-rata views per klip, Bayaran per 1.000 views, dan Jumlah bulan.
- Logika kalkulasi interaktif menggunakan JavaScript Vanilla memperbarui hasil proyeksi pendapatan kotor secara real-time.

### I. Fitur Utama (Bento to Cards)
- Restrukturisasi Bento Grid sebelumnya menjadi daftar kartu fitur sederhana dengan visualisasi video demonstrasi yang diintegrasikan kembali:
  - Subtitle Animasi MrBeast (`Subtitle_Animasi_Dinamis.webm`).
  - Auto Face Tracking 9:16 (`Auto_Face_Tracking.webm` & `Face_Tracking_Original.webm`).
  - Auto Hook Generator / Teks Cover (`Auto_Teks_Cover.webm`).
  - Pemotongan Pintar & Zero API Cost.

### J. Alur Kerja 3 Langkah (SVG Interactive Diagram)
- Diagram SVG interaktif animasi yang menggambarkan 3 fase: Tempel Link -> Pilih Jumlah -> Jadi Klip Pendek.

### K. Checkout & Pricing Section
- **Formulir Langsung**: Integrasi langsung dengan API Duitku di `functions/api/checkout.js`.
- **Tabel Batch**: Memperlihatkan urgensi batch (Batch 1 & 2 Terjual Habis, Batch 3 Aktif Rp 190.000, Batch 4 Terkunci Rp 400.000).
- Input formulir (Nama, Email, WhatsApp) yang langsung memproses checkout tanpa popup/modal.

## 3. Verifikasi & Kepatuhan Responsif
- **Overflow-X Protection**: Penerapan `overflow-x-hidden` di tingkat `html` dan `body`.
- **Responsive Breakpoints**: Menggunakan Tailwind CSS (`md:`, `lg:`) untuk menyesuaikan susunan grid dan flexbox, memastikan lebar layar 320px - 430px (HP) dan desktop di atas 1024px tampil sempurna dan seimbang tanpa bocor (*layout leak*).
