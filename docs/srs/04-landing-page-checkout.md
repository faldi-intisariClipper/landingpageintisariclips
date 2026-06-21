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
Dua halaman statis telah dibuat untuk memenuhi persayaratan legal Duitku:
1. `syarat-ketentuan.html`: Mencakup Garansi Uang Kembali 1x24 Jam dan batasan tanggung jawab penyalahgunaan *software*.
2. `kebijakan-privasi.html`: Menegaskan operasional sistem berbasis 100% *Offline First* (tidak ada pengunggahan video user ke *cloud*).

## 3. Spesifikasi Endpoint Checkout Edge Functions
File pengelola API berada di `functions/api/checkout.js`.

### `POST /api/checkout`
- **Fungsi**: Membuat URL tagihan pembayaran (*Invoice*) via Duitku Web API v2.
- **Payload Duitku**:
  - `itemDetails`: Rincian spesifik barang (Nama, Harga, Kuantitas).
  - `paymentMethod`: Ditetapkan secara *default* ke `"VC"` (Credit Card/VA) untuk memenuhi kebijakan ketat Sandbox Inquiry v2 yang menolak *empty string*.
  - `returnUrl`: Dialihkan secara dinamis ke `${url.origin}/success.html` menggunakan `context.request.url` di Cloudflare Pages.
- **Kredensial**: Mengambil kunci `DUITKU_MERCHANT_CODE` dan `DUITKU_API_KEY` dari Cloudflare Pages Environment Variables (`.dev.vars` untuk *localhost*).
- **Halaman Sukses**: Memandu pengguna dengan 3 langkah (Cek Email, Salin Lisensi, Login Member Area).
