# Standar Kepatuhan & Integrasi Duitku pada Sales Landing Page


Dokumen spesifikasi ini menetapkan persyaratan wajib (*mandatory requirements*) untuk arsitektur, antarmuka, dan integrasi backend pembayaran Duitku pada semua proyek *Sales Landing Page* di bawah ekosistem Intisari Apps.

## 1. Persyaratan Antarmuka (Frontend Requirements)

Setiap sales landing page baru wajib mengimplementasikan struktur visual berikut untuk memenuhi kriteria kepatuhan *compliance* Duitku:

### 1.1 Penayangan Detail Produk (Product Description Card)
* **Kriteria:** Menampilkan item detail yang dibeli di area form pembayaran.
* **Elemen UI:** Box atau kartu visual (*product summary card*) dengan batas yang jelas di dekat tombol submit checkout. Harus menjelaskan:
  - Bentuk fisik/digital produk (misal: "Aplikasi Desktop Installer").
  - Durasi akses (misal: "Lifetime Access / Lisensi Sekali Bayar").
  - Cakupan fitur utama (misal: "Proses Offline, Auto-Clipper AI").
  - Keberadaan bonus & garansi (misal: "Garansi 1x24 Jam").

### 1.2 Informasi Kontak Resmi (Footer Support)
* **Kriteria:** Kontak bisnis harus konsisten dan seragam di semua halaman.
* **Elemen UI:** Panel khusus (*Contact Support Panel*) di footer pada halaman:
  1. Halaman Utama (`index.html`)
  2. Halaman Sukses (`success.html`)
  3. Halaman Syarat & Ketentuan (`syarat-ketentuan.html`)
  4. Halaman Kebijakan Privasi (`kebijakan-privasi.html`)
* **Data Kontak Wajib:** Alamat Email aktif, Alamat Fisik Usaha yang valid, dan Nomor WhatsApp Support (Chat Only).

### 1.3 Halaman Sukses Dinamis (`success.html`)
* **Kriteria:** Mencegah pemalsuan/bypass halaman sukses.
* **Elemen UI:** Skrip Javascript wajib mengevaluasi parameter `resultCode` pada URL:
  - `resultCode !== "00"`: Tampilkan status transaksi Gagal/Dibatalkan, ubah ikon menjadi tanda silang merah, sembunyikan instruksi pengiriman produk, dan ubah tombol CTA mengarah kembali ke beranda.
  - `resultCode === "00"`: Tampilkan pesan Sukses, instruksi pemeriksaan inbox email untuk lisensi, dan tombol CTA ke Portal Member Area.

---

## 2. Persyaratan Logika Backend (Backend Requirements)

Setiap endpoint checkout (`POST /api/checkout` atau sejenisnya) wajib mematuhi arsitektur logika berikut:

### 2.1 Formula Unik Order ID (`merchantOrderId`)
Untuk menghindari tabrakan data log transaksi (*overlapping transaction log*) di akun Duitku Sandbox (`DS32033`), pengidentifikasi pesanan wajib mengikuti pola:
$$\text{merchantOrderId} = \text{[PRODUCT\_PREFIX]} - \text{[TIMESTAMP]}$$
* Prefix harus unik untuk setiap produk berbeda. Khusus untuk produk **Intisari AutoCut**, wajib menggunakan prefix **`INTISARI-AUTOCUT`** agar dikenali dengan benar oleh sistem pemetaan produk (*app_id mapping*) pada central backend API.
* Timestamp harus menggunakan format epoch milidetik (`Date.now()`) untuk menjamin keunikan mutlak di sisi database Duitku.

### 2.2 Callback & Return URL Dinamis
* **`returnUrl`**: Alamat pengalihan pasca-pembayaran harus dibuat dinamis berdasarkan asal origin request:
  ```javascript
  returnUrl: `${new URL(context.request.url).origin}/success.html`
  ```
* **`callbackUrl`**: URL penerima webhook Duitku harus mengarah ke backend validasi pusat (misal: `https://api.intisariapps.com/v1/webhook/duitku`) yang dapat mengolah notifikasi secara real-time.

### 2.3 Keamanan Kredensial & Pemisahan Konfigurasi (Environment Variables)

Untuk menjamin keamanan kredensial pembayaran dan menyederhanakan peluncuran *Sales Landing Page* di berbagai domain secara global, semua proyek **dilarang keras melakukan hardcode kredensial** (seperti Merchant Code, API Key, atau URL Callback) langsung di dalam file JavaScript. Proyek wajib memisahkan logika program dari data konfigurasi menggunakan mekanisme variabel lingkungan (*Environment Variables*).

#### 2.3.1 Alasan Keamanan & Operasional (Mengapa Menggunakan Variabel Lingkungan?)
1. **Keamanan Kredensial (Credential Security):** API Key Duitku Live (produksi) bersifat rahasia. Melakukan hardcode nilai ini di dalam repositori Git publik maupun privat berisiko tinggi memicu kebocoran data. Variabel lingkungan memungkinkan API Key disimpan di server Cloudflare secara terenkripsi.
2. **Pemisahan Lingkungan Tanpa Mengubah Kode (Zero-Code Switch):** Dengan menggunakan variabel lingkungan, file JavaScript (`checkout.js`) tetap bersifat generik. Perpindahan dari lingkungan pengujian (Sandbox) ke lingkungan nyata (Production/Live) dilakukan cukup dengan mengubah nilai variabel lingkungan (menggunakan file konfigurasi `.sandbox.vars` atau `.production.vars`), tanpa perlu memodifikasi baris kode JavaScript apa pun.
3. **Portabilitas Skala Global (Reusability):** Logika backend checkout dapat disalin dan digunakan langsung pada landing page produk lain di bawah naungan Intisari Apps (misal: Clipper, Android Tools, dll.). Pengembang hanya perlu memperbarui file variabel lingkungan untuk menyesuaikan Merchant Code, API Key, dan Prefix Produk baru.
4. **Efisiensi Rilis (Fast Deploy):** Pembaruan nilai variabel lingkungan dapat dilakukan secara bulk melalui Cloudflare Pages API/Wrangler CLI tanpa perlu memicu proses *build* ulang repositori frontend.

#### 2.3.2 Kerangka Variabel yang Wajib Disediakan
Setiap proyek wajib menyediakan file templat berikut di root direktori (dan didaftarkan pada `.gitignore` untuk mencegah ter-upload ke Git):
* **`.sandbox.vars`:** Berisi variabel lingkungan untuk pengujian Duitku Sandbox.
* **`.production.vars`:** Berisi kredensial Duitku Live untuk deployment produksi (tidak boleh di-commit ke Git).
* **`.env.example`:** Berisi daftar nama variabel kosong sebagai panduan bagi pengembang lain.

Daftar variabel wajib yang harus dikonfigurasi:
* `DUITKU_ENV`: Menyatakan mode lingkungan (`sandbox` atau `production`).
* `DUITKU_MERCHANT_CODE`: Kode merchant dari Duitku.
* `DUITKU_API_KEY`: API Key / Passcode dari merchant Duitku.
* `PRODUCT_PREFIX`: Kode awalan unik untuk identitas pesanan (contoh: `INTISARI-AUTOCUT`).
* `LICENSE_BACKEND_CALLBACK_URL`: URL API backend pusat yang akan memproses webhook notifikasi pembayaran Duitku.

#### 2.3.3 Pola Implementasi pada Backend Cloudflare Pages
Pembacaan variabel lingkungan wajib menggunakan parameter konteks (`context.env`) yang disuntikkan secara dinamis oleh platform hosting:
```javascript
// Membaca mode lingkungan secara dinamis
const isProd = context.env.DUITKU_ENV === "production";

// Membaca Merchant Code & API Key dari variabel lingkungan
const merchantCode = context.env.DUITKU_MERCHANT_CODE || (isProd ? "" : "DS32033");
const apiKey = context.env.DUITKU_API_KEY || (isProd ? "" : "83afbae747ea45b155427183097d9492");

// Menghitung ID pesanan dengan prefix dinamis
const productPrefix = context.env.PRODUCT_PREFIX || "INTISARI-AUTOCUT";
const merchantOrderId = `${productPrefix}-${Date.now()}`;
```

---



## 3. Persyaratan Pengujian (Verification & Testing Requirements)

Semua proses verifikasi dan uji coba checkout wajib diintegrasikan dengan Duitku Sandbox:
* **Merchant Code Sandbox:** `DS32033`
* **API Key Sandbox:** `83afbae747ea45b155427183097d9492`
* **Endpoint API Sandbox:** `https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry`

### 3.1 Mandat Pengujian QRIS Sandbox
Untuk menyelaraskan dengan metode pembayaran yang paling umum digunakan oleh pelanggan serta memastikan kesiapan produksi, pengujian wajib dilakukan dengan standar berikut:
1. **Metode Pembayaran Utama**: Alur pengujian wajib memprioritaskan metode **QRIS (BNC QRIS / kode `NQ`)**.
2. **Karakteristik Tampilan Sandbox**:
   * Nilai **`NMID: -`** (strip) pada halaman pembayaran QRIS Duitku Sandbox adalah **normal** karena akun pengujian tidak terdaftar secara resmi di Bank Indonesia.
   * Kode QR yang terbentuk adalah kode QR pengujian dan tidak bisa dipindai menggunakan aplikasi e-wallet asli di dunia nyata.
3. **Prosedur Simulasi Pembayaran Sukses**:
   * Salin kode `merchantOrderId` (format: `INTISARI-[TIMESTAMP]`) dari transaksi yang baru dibuat.
   * Buka simulator transaksi Duitku Sandbox (Demo Transaction Area).
   * Pada pilihan dropdown metode pembayaran, pilih **BNC QRIS** (bukan ShopeePay QRIS atau lainnya).
   * Input `merchantOrderId` Anda, lalu klik **Check** dan tekan tombol simulasi **Pay** untuk mengubah status transaksi menjadi berhasil.
   * Kembali ke halaman QRIS Duitku, lalu klik tombol **CHECK TRANSACTION** (atau tunggu hingga callback selesai memproses) untuk memicu pengalihan otomatis kembali ke `success.html?resultCode=00`.
4. **Validasi Akhir**: Pastikan sistem berhasil membaca parameter `resultCode === "00"` dan menampilkan halaman sukses transaksi dinamis tanpa *bypass* manual.
