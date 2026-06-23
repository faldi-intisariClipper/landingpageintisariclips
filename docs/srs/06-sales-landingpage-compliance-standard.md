# SRS 06: Standar Kepatuhan & Integrasi Duitku pada Sales Landing Page

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
* Prefix harus unik untuk setiap produk berbeda (misal: `INTISARI-`, `SMARTPOST-`, `AUTOPOST-`).
* Timestamp harus menggunakan format epoch milidetik (`Date.now()`) untuk menjamin keunikan mutlak di sisi database Duitku.

### 2.2 Callback & Return URL Dinamis
* **`returnUrl`**: Alamat pengalihan pasca-pembayaran harus dibuat dinamis berdasarkan asal origin request:
  ```javascript
  returnUrl: `${new URL(context.request.url).origin}/success.html`
  ```
* **`callbackUrl`**: URL penerima webhook Duitku harus mengarah ke backend validasi pusat (misal: `https://api.intisariapps.com/v1/webhook/duitku`) yang dapat mengolah notifikasi secara real-time.

---

## 3. Persyaratan Pengujian (Verification & Testing Requirements)

Semua proses verifikasi dan uji coba checkout wajib diintegrasikan dengan Duitku Sandbox:
* **Merchant Code Sandbox:** `DS32033`
* **API Key Sandbox:** `83afbae747ea45b155427183097d9492`
* **Endpoint API Sandbox:** `https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry`
* **Uji Coba Wajib:** Melakukan simulasi pengisian formulir data pembeli dan memverifikasi pengalihan sukses menuju ke URL checkout Duitku Sandbox sebelum kode dideploy ke produksi.
