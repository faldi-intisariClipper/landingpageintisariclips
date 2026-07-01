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
  - `paymentMethod`: Dipilih secara dinamis oleh pengguna di antarmuka formulir pembelian (seperti `"M1"` Mandiri VA, `"B1"` BNI VA, `"BR"` BRI VA, `"BT"` Permata VA, `"BC"` CIMB VA, atau `"AL"` Alfamart). Jika kosong atau tidak ditentukan, backend menggunakan fallback default `"M1"`.
  - `returnUrl`: Dialihkan secara dinamis ke `${url.origin}/success.html` menggunakan `context.request.url` di Cloudflare Pages.
- **Kredensial & Environment**:
  - Mengadopsi mekanisme **Dynamic Multi-Merchant Mapping dengan Fallback**:
    - Mode Lingkungan ditentukan oleh variabel lingkungan `DUITKU_ENV` (`production` atau `sandbox`).
    - Jika `DUITKU_ENV` adalah `production`, kredensial yang digunakan dipetakan secara dinamis: prioritaskan kredensial khusus produk CLIPS (`DUITKU_MERCHANT_CLIPS` & `DUITKU_API_KEY_CLIPS`), dengan fallback ke kredensial global (`DUITKU_MERCHANT_CODE` & `DUITKU_API_KEY`).
    - Jika `DUITKU_ENV` adalah `sandbox` (atau tidak didefinisikan), sistem otomatis memaksa penggunaan kredensial Sandbox resmi (`DS32033` & `83afbae747ea45b155427183097d9492`) untuk kemudahan peninjauan oleh tim compliance Duitku.
- **Halaman Sukses**: Memandu pengguna dengan 3 langkah (Cek Email, Salin Lisensi, Login Member Area).

## 4. Alur Pembayaran Transfer Manual SeaBank & QRIS GoPay (Non-Gateway)
Sebagai metode alternatif yang meminimalkan gesekan (friction) pembayaran e-payment gateway, sistem menyediakan opsi Transfer Manual via Dropbox (Dropdown Select):
- **Redirection**: Jika pembeli memilih metode `'MANUAL_SEABANK'` atau `'MANUAL_QRIS'`, JavaScript di frontend mengabaikan pemanggilan `/api/checkout` dan langsung mengalihkan pembeli ke:
  - `/manual-transfer.html?method=seabank&name=[Nama]&email=[Email]&phone=[WhatsApp]`
  - `/manual-transfer.html?method=qris&name=[Nama]&email=[Email]&phone=[WhatsApp]`
- **Halaman Instruksi Dinamis**: Halaman `/manual-transfer.html` membaca parameter `method` untuk menyajikan instruksi:
  - **SeaBank**: Rekening **SeaBank (901470004292 a/n RIFALDI RAMADHON)** sebesar Rp190.000 dengan fitur tombol Salin Rekening.
  - **QRIS GoPay**: Scan QR Code statis (`assets/img/qris_intisariapps.jpg`) merchant Intisari Apps sebesar Rp190.000.
- **Konfirmasi**: Tombol konfirmasi di halaman tersebut otomatis membuka WhatsApp menuju admin dengan pesan berisi detail nama, email, WhatsApp, serta jenis metode pembayaran manual yang digunakan pembeli agar admin dapat melakukan verifikasi manual dan mengirimkan lisensi.

