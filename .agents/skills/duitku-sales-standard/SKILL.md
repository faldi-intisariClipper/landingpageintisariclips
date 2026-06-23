---
name: duitku-sales-standard
description: Standar kepatuhan payment gateway Duitku dan panduan testing Sandbox untuk sales landing page baru.
---

# STANDAR KEPATUHAN SALES LANDING PAGE & INTEGRASI DUITKU

Dokumen ini adalah pedoman operasional **wajib** bagi AI untuk merancang, membangun, menguji, dan memelihara proyek *sales landing page* baru di lingkungan Intisari Apps yang menggunakan Duitku Payment Gateway.

---

## 1. STRUKTUR HALAMAN & DOKUMEN LEGAL (WAJIB ADA)

Setiap landing page penjualan baru wajib memiliki 4 file HTML utama dengan ketentuan konten sebagai berikut:

### A. Halaman Utama (`index.html`)
* **Footer Kontak Support (Detail Usaha):** Wajib mencantumkan informasi kontak yang mudah diakses (biasanya di dalam panel khusus di footer) berupa:
  1. Alamat email bisnis resmi (misal: `support@domain.com`).
  2. Nomor telepon / WhatsApp aktif (misal: `08xxxxxxxxxx`).
  3. Alamat fisik tempat usaha lengkap hingga kode pos.
* **Deskripsi Detail Produk pada Form Checkout:** Sebelum tombol bayar/submit data, wajib mencantumkan rincian item digital apa saja yang akan didapatkan pembeli secara transparan (contoh: lisensi seumur hidup, bonus modul, jenis installer).

### B. Halaman Kebijakan Privasi (`kebijakan-privasi.html`)
* Menjelaskan jenis data pribadi yang dikumpulkan (Nama, Email, WhatsApp) hanya digunakan untuk distribusi lisensi dan support.
* Menegaskan bahwa data sensitif pembayaran diproses langsung secara aman oleh Duitku (diawasi Bank Indonesia) dan tidak direkam di server internal.
* Wajib memuat footer kontak support yang sama persis dengan halaman utama.

### C. Halaman Syarat & Ketentuan (`syarat-ketentuan.html`)
* Menjelaskan kebijakan lisensi sekali bayar (*Lifetime Access*), pembatasan perangkat (*device limit*), dan hak pembaruan software.
* Menjelaskan klausul **Garansi Uang Kembali / Refund** secara eksplisit (misal: garansi 1x24 jam jika software crash sistemik setelah dibantu instalasi remote).
* Wajib memuat footer kontak support yang sama persis dengan halaman utama.

### D. Halaman Sukses Pembayaran (`success.html`)
* Wajib menyertakan skrip pendeteksi parameter `resultCode` dari callback Duitku secara dinamis.
* Jika `resultCode` bukan `"00"` atau `"01"` (misal: `"02"` untuk batal atau `"01"` untuk gagal), ubah konten secara dinamis untuk menyajikan pesan kegagalan transaksi dan arahkan pengguna kembali ke landing page utama.
* Jika transaksi sukses (`resultCode === "00"`), tampilkan 3 langkah setelah pembelian:
  1. Periksa kotak masuk/spam email.
  2. Salin kode lisensi (*License Key*) yang dikirimkan.
  3. Klik tombol redirect menuju member area atau panduan instalasi.

---

## 2. STANDARD PENULISAN KODE BACKEND & TRANSAKSI

Pengelola API checkout (Pages Functions / Workers) wajib mematuhi aturan penulisan kode berikut:

### A. Penamaan `merchantOrderId` (Formula Unik)
Untuk mencegah log transaksi yang bertumpuk atau tumpang tindih di akun Sandbox yang sama, format penamaan order ID wajib mengikuti aturan:
$$\text{merchantOrderId} = \text{[PRODUCT\_PREFIX]} - \text{[TIMESTAMP]}$$
* Contoh untuk IntisariClips: `INTISARI-1782181658`
* Contoh untuk Produk Lain (misal: SmartPost): `SMARTPOST-1782181658`

### B. Pengalihan URL Dinamis
* `returnUrl` (alamat kembali setelah transaksi sukses di gerbang Duitku) harus diset secara dinamis mengikuti origin request asal:
  ```javascript
  returnUrl: `${new URL(context.request.url).origin}/success.html`
  ```
* Ini memastikan checkout yang diuji di localhost akan kembali ke localhost, dan yang diuji di domain staging/produksi akan kembali ke domain tersebut.

---

## 3. PANDUAN PENGUJIAN SANDBOX DUITKU (MERCHANT DS32033)

Setiap pengujian checkout pada landing page baru wajib dilakukan menggunakan environment Sandbox dengan data berikut:

### A. Kredensial Sandbox Sah
* **Merchant Code:** `DS32033`
* **API Key:** `83afbae747ea45b155427183097d9492`
* **Endpoint API Inquiry:** `https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry`

### B. Prosedur Uji Coba (Testing Flow)
1. **Inisiasi Checkout:** Isi formulir pembelian di landing page lokal (`http://localhost:8788`) atau domain live staging. Tekan **Bayar Sekarang**.
2. **Verifikasi Redirection:** Pastikan browser dialihkan secara otomatis ke alamat Duitku Sandbox (`https://sandbox.duitku.com/topup/v2/...`).
3. **Uji Simulasi Pembayaran:**
   * Gunakan metode pembayaran Virtual Account (VA) atau Kartu Kredit simulasi yang disediakan oleh Duitku.
   * Lakukan pembayaran dummy melalui simulator perbankan Duitku.
4. **Verifikasi Webhook (Callback):**
   * Pastikan notifikasi webhook Duitku Sandbox diterima oleh server backend Anda (`callbackUrl`).
   * Verifikasi formula `signature` MD5 pada backend:
     $$\text{Signature} = \text{MD5}(\text{merchantCode} + \text{amount} + \text{merchantOrderId} + \text{apiKey})$$
   * Webhook harus mengembalikan respons HTTP `200 OK` (atau `{"status":"success"}` sesuai endpoint Anda) ke Duitku.
5. **Verifikasi Distribusi Produk:** Pastikan sistem mengirimkan email kode lisensi secara otomatis ke kotak masuk email yang diinput pada langkah 1.

---

## 4. DRAFT DOKUMEN ALUR TRANSAKSI (UNTUK TIM DUITKU)

Saat mendaftarkan domain baru ke mode produksi Duitku, tim compliance mereka akan meminta penjelasan alur transaksi. Gunakan format template berikut untuk membalas email mereka:

```markdown
1. PEMILIHAN & CHECKOUT: Pelanggan mengunjungi website [DOMAIN], memilih produk, dan menginput Nama, Email, serta No. WhatsApp di form checkout.
2. INQUIRY INVOICE: Backend kami mengirim data transaksi ke API Duitku dan menerima paymentUrl.
3. PEMBAYARAN: Pelanggan dialihkan ke paymentUrl Duitku dan menyelesaikan pembayaran sesuai metode pilihan.
4. CALLBACK/WEBHOOK: Duitku mengirim notifikasi HTTP POST sukses secara real-time ke API webhook kami. Backend kami memvalidasi signature MD5.
5. PENGIRIMAN PRODUK: Begitu webhook tervalidasi sukses, backend secara otomatis men-generate lisensi produk unik dan mengirimkannya via email otomatis ke pelanggan.
6. ALUR SUKSES: Pelanggan dialihkan kembali ke success.html yang mengarahkan mereka ke member area untuk login dan mengaktifkan lisensi.
```
