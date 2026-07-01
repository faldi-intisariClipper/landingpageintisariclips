# DRAF BALASAN EMAIL KE DUITKU

Berikut adalah draf email balasan yang dapat Anda salin dan gunakan untuk membalas email dari Customer Care Duitku (Rieza Camelia / Tim Compliance). Draf ini disusun secara formal dan detail untuk mempercepat persetujuan proyek mode produksi **Project Code D22200**.

---

**Subjek:** Re: Pengajuan Project Baru - Project Code D22200 (Aktivasi Proyek & Peninjauan Ulang)

**Kepada:** Customer Care Duitku <support@duitku.com> (atau langsung balas email tiket yang Anda terima)

Selamat Pagi / Siang Tim Customer Care Duitku,

Terima kasih atas tanggapan dan arahan yang diberikan oleh Kak Rieza Camelia terkait pengajuan peninjauan website kami untuk Project Code **D22200** (Domain: https://clips.intisariapps.com/).

Sehubungan dengan catatan kepatuhan (compliance) yang diinformasikan sebelumnya, bersama email ini kami sampaikan bahwa kami telah memperbarui website kami dan melengkapi seluruh kekurangan yang ada. Berikut adalah detail perbaikan dan penjelasan lengkap yang kami lakukan:

### 1. Deskripsi Produk Lebih Detail pada Website Terdaftar
Kami telah menambahkan panel khusus berisi penjelasan detail mengenai produk yang akan diperoleh pembeli secara transparan di atas formulir checkout halaman utama. Pembeli akan mendapatkan:
* **File Installer Software:** Installer desktop IntisariClips V10 yang kompatibel dengan sistem operasi Windows 10/11 dan macOS (Intel & Apple Silicon).
* **Lisensi Lifetime Premium:** Kunci lisensi (*license key*) unik yang berlaku selamanya untuk 1 perangkat aktif tanpa ada biaya bulanan/tahunan (*Rp0 server fee*).
* **Fitur AI Auto-Clipper Offline:** Akses penuh ke fitur pemotongan klip cerdas otomatis, auto-subtitle generator, dan auto-face tracking yang semuanya berjalan 100% offline.
* **Paket Bonus & Support:** 100 template hook teks viral, bantuan instalasi jarak jauh (*remote setup* gratis via AnyDesk jika dibutuhkan), serta pembaruan gratis (*free updates*) selama 5 tahun.

### 2. Informasi Contact Support di Website
Kami telah mencantumkan informasi kontak support yang lengkap dan seragam pada bagian footer di seluruh halaman website kami (halaman utama, halaman sukses pembayaran, kebijakan privasi, serta syarat & ketentuan), yaitu:
* **Alamat Email Resmi:** support@intisariapps.com
* **Nomor Telepon / WhatsApp:** 08567870040 (Chat Only)
* **Alamat Usaha Fisik:** Perumahan Bumi Kencana Jalan Lantana B 1 No 21, Rt 002 Rw 007 Kencana, KOTA BOGOR, TANAH SEREAL, JAWA BARAT, ID, 16167

### 3. Perbaikan Fitur Checkout & Integrasi Sandbox Duitku
Sesuai rekomendasi dari tim Duitku, kami telah mengarahkan dan mengintegrasikan secara penuh fitur checkout di website resmi kami (https://clips.intisariapps.com/) menggunakan **Duitku Sandbox** dengan kode merchant **DS32033**.
* Saat ini, tim penilai Duitku dapat melakukan uji coba pengisian form pembelian di website kami dan menekan tombol **"BAYAR SEKARANG"**.
* Sistem akan langsung mengalihkan penilai ke halaman pembayaran resmi **Duitku Sandbox** secara lancar tanpa ada error. Silakan menggunakan metode pembayaran simulasi/dummy yang disediakan oleh Duitku untuk menguji sistem kami.

### 4. Penjelasan Alur Transaksi (Mulai Pembelian Hingga Pembayaran & Pengiriman)
Berikut adalah alur transaksi ujung-ke-ujung (*end-to-end user flow*) di sistem kami untuk kejelasan operasional:
1. **Pemilihan & Checkout:** Pelanggan mengunjungi website terdaftar, membaca deskripsi produk, lalu menekan tombol beli. Pelanggan mengisi Nama, Email, dan WhatsApp di formulir checkout.
2. **Pembuatan Tagihan (Inquiry):** Sistem backend kami membuat ID Order unik dan mengirimkan request pembuatan invoice ke API Duitku.
3. **Pengalihan Pembayaran (Redirect):** Pelanggan dialihkan secara aman ke halaman pembayaran resmi Duitku. Pelanggan menyelesaikan pembayaran via QRIS/VA/E-Wallet/Credit Card.
4. **Validasi Notifikasi (Webhook):** Setelah pembayaran sukses, Duitku mengirimkan notifikasi HTTP POST (Callback/Webhook) secara real-time ke backend API kami di `https://api.intisariapps.com/v1/webhook/duitku`. Sistem kami memverifikasi tanda tangan keamanan (Signature MD5) dari Duitku.
5. **Pengiriman Produk Otomatis:** Begitu webhook tervalidasi sukses, sistem kami secara otomatis memproses dua hal:
   - Membuat kode lisensi unik baru.
   - Mengirimkan email otomatis berisi detail transaksi, Kunci Lisensi (*License Key*), link unduhan aplikasi desktop, serta panduan instalasi ke alamat email aktif pelanggan.
6. **Redirect Halaman Sukses:** Pelanggan yang telah membayar di halaman Duitku akan otomatis dialihkan kembali (*returnUrl*) ke halaman sukses lokal kami (`success.html`) yang menuntun mereka untuk membuka Portal Member Area atau mengecek inbox email mereka.

Kami mohon bantuan dari tim compliance Duitku untuk dapat melakukan pemeriksaan ulang terhadap website kami. Jika seluruh data di atas dirasa sudah memenuhi standar, mohon bantuannya untuk mengaktifkan status proyek mode produksi kami (**Project Code D22200**) agar kami dapat segera melakukan transaksi live.

Terima kasih atas bantuan dan kerja samanya. Kami menunggu kabar baik selanjutnya.

Salam hangat,

**[Nama Anda/Nama Pemilik Usaha]**  
Intisari Apps Support Team  
https://clips.intisariapps.com/

---

## 2. DRAF BALASAN EMAIL UNTUK AKTIVASI QRIS (Project Code D23359)

Draf ini ditujukan untuk membalas email dari Kak Marsa Setiyani Rubiyanti guna meminta pengaktifan Nobu QRIS (NQ) dan ShopeePay QRIS (SP) yang saat ini berstatus nonaktif (OFF) di dasbor merchant.

**Subjek:** Re: Status Metode Pembayaran Aktif - Project Code D23359 (Pengajuan Aktivasi QRIS)

**Kepada:** Marsa Setiyani Rubiyanti | Customer Service Duitku <support@duitku.com>

Selamat Siang Ibu Marsa Setiyani Rubiyanti dan Tim CS Duitku,

Terima kasih banyak atas informasi dan pemeriksaan yang dilakukan mengenai status metode pembayaran aktif untuk kode proyek **D23359**.

Sehubungan dengan hal tersebut, kami ingin menginformasikan bahwa kami sangat membutuhkan metode pembayaran **QRIS** (khususnya Nobu QRIS) agar pembeli kami dapat melakukan pembayaran instan menggunakan e-wallet di website kami.

Namun, saat kami memeriksa menu Metode Pembayaran pada dasbor Duitku proyek **D23359**, tombol status untuk **Nobu QRIS (NQ)** masih berada dalam posisi **nonaktif (OFF)** dari sistem dan tidak dapat kami geser secara mandiri.

Oleh karena itu, kami mohon bantuannya untuk dapat mengaktifkan metode pembayaran berikut pada proyek **D23359** kami:
* **Nobu QRIS (NQ)**

Mohon informasikan kepada kami apabila terdapat persyaratan atau dokumen tambahan yang perlu kami kirimkan agar kanal pembayaran Nobu QRIS tersebut dapat diaktifkan.

Atas perhatian, bantuan, dan kerja samanya, kami ucapkan terima kasih banyak. Kami menantikan kabar baik selanjutnya.

Salam hangat,

**[Nama Anda/Nama Pemilik Usaha]**  
Intisari Apps Support Team  
https://intisariclips.com / https://intisari-clips-landing.pages.dev
