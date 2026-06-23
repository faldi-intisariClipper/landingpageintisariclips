# SRS 04: Spesifikasi Landing Page & Checkout Duitku

Dokumen ini mencatat pembaruan arsitektur antarmuka dan integrasi *Payment Gateway* pada *Landing Page* IntisariClips.

## 1. Arsitektur Antarmuka (UI/UX)
- **Framework**: HTML5, Vanilla JS, Tailwind CSS (via CDN).
- **Desain Inti**: *Premium Dark Mode* dipadukan dengan efek *Glassmorphism* dan aksen warna hijau emerald/brand blue.
- **Komponen Kunci**:
  - **Copywriting**: Menekankan *pain points* kreator, mengubah fitur teknis (Hardware Acceleration, WhisperX, LLM God Mode) menjadi bahasa manfaat marketing.
  - **FAQ Accordion**: 5 Pertanyaan utama menggunakan animasi *toggle* panah berbasis Javascript Vanilla.
  - **Checkout Form**: Menggunakan Layout 2 Kolom (kiri ringkasan harga, kanan formulir data) agar konversi lebih efisien ketimbang sistem modal/popup lama.

## 2. Kepatuhan Payment Gateway (Duitku)
Untuk memenuhi persyaratan ketat dari tim penilai (*compliance*) Duitku, beberapa penyesuaian telah diterapkan:
1. `syarat-ketentuan.html` & `kebijakan-privasi.html`: Mencakup Garansi Uang Kembali 1x24 Jam, batasan tanggung jawab, serta penegasan operasional berbasis 100% *Offline First*. Kedua halaman ini telah dilengkapi dengan panel **Contact Support** yang memuat email, alamat usaha, dan nomor telepon yang jelas.
2. **Deskripsi Produk Rinci**: Pada [index.html](file:///d:/INTISARI-LANDINGPAGE/intisari-clips-landing/public/index.html) tepat di atas formulir checkout, ditambahkan kotak informasi "Detail Produk yang Anda Dapatkan" untuk transparansi item digital yang dibeli pelanggan.
3. **Kontak Support Footer**: Panel Contact Support diletakkan secara terperinci di footer [index.html](file:///d:/INTISARI-LANDINGPAGE/intisari-clips-landing/public/index.html) yang mencakup alamat surat usaha fisik, email resmi, dan nomor kontak WhatsApp aktif.

## 3. Spesifikasi Endpoint Checkout Edge Functions
File pengelola API berada di `functions/api/checkout.js`.

### `POST /api/checkout`
- **Fungsi**: Membuat URL tagihan pembayaran (*Invoice*) via Duitku Web API v2.
- **Payload Duitku**:
  - `itemDetails`: Rincian spesifik barang (Nama, Harga, Kuantitas).
  - `paymentMethod`: Ditetapkan secara *default* ke `"VC"` (Credit Card/VA) untuk memenuhi kebijakan ketat Sandbox Inquiry v2 yang menolak *empty string*.
  - `returnUrl`: Dialihkan secara dinamis ke `${url.origin}/success.html` menggunakan `context.request.url` di Cloudflare Pages.
- **Kredensial & Environment**:
  - Mengambil kunci `DUITKU_MERCHANT_CODE` dan `DUITKU_API_KEY` dari Cloudflare Pages Environment Variables.
  - **Mode Sandbox Paksa (Temporary)**: Properti `isProduction` dipaksa bernilai `false` (Sandbox Duitku) selama masa review. Hal ini menjamin tim compliance Duitku dapat menguji alur checkout menggunakan merchant code sandbox `DS32033` secara langsung di domain produksi tanpa memicu error "Merchant Tidak Aktif".
- **Halaman Sukses**: Memandu pengguna dengan 3 langkah (Cek Email, Salin Lisensi, Login Member Area).
