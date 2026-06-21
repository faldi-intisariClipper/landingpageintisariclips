# Alur Transaksi Pembelian - IntisariClips V10

Dokumen ini disusun untuk menjelaskan prosedur (user flow) dari proses pembelian produk digital "IntisariClips V10" oleh pelanggan hingga aktivasi lisensi. Dokumen ini dapat dilampirkan kepada Tim Compliance Duitku.

## 1. Proses Pemilihan Produk & Checkout
1. Pelanggan mengunjungi website resmi produk kami: `https://clips.intisariapps.com/`.
2. Pelanggan membaca detail informasi produk, manfaat (lisensi seumur hidup, full akses, fitur AI auto-cutting), harga (Rp 190.000), serta kebijakan garansi.
3. Pelanggan menekan tombol aksi **"YA! SAYA MAU AKSES SEKARANG"**.
4. Website akan menampilkan **Modal Formulir Pembelian** yang meminta pelanggan mengisikan data dasar berupa:
   - Nama Lengkap
   - Email Aktif (Tujuan pengiriman produk/lisensi)
   - Nomor WhatsApp Aktif

## 2. Pengalihan ke Payment Gateway (Duitku)
1. Setelah mengisi data yang valid dan menekan tombol **"Bayar Sekarang"**, sistem backend kami (`/api/checkout`) akan membuat *Invoice* unik (Merchant Order ID) dan memanggil API `createInvoice` dari **Duitku**.
2. Jika pembuatan tagihan sukses, pelanggan akan langsung dialihkan (*redirect*) secara aman menuju ke **Halaman Pembayaran Resmi Duitku** (paymentUrl).
3. Di halaman Duitku, pelanggan dapat memilih metode pembayaran yang tersedia (Transfer Bank / Virtual Account, E-Wallet, QRIS, Retail, dsb).
4. Pelanggan menyelesaikan instruksi pembayaran di sisi Bank atau E-Wallet yang mereka pilih.

## 3. Verifikasi & Notifikasi Sukses
1. Segera setelah pelanggan mentransfer dana, sistem **Duitku** akan mendeteksi status pembayaran berubah menjadi "Sukses".
2. Duitku secara otomatis mengirimkan notifikasi HTTP POST secara *real-time* (Callback/Webhook) ke server Backend kami (`https://api.intisariapps.com/v1/webhook/duitku`).
3. Server kami memvalidasi `signature` dan status dari Duitku untuk memastikan transaksi tersebut asli dan valid.

## 4. Pengiriman Produk & Alur Pasca-Pembayaran
1. Pelanggan yang telah berhasil membayar di halaman Duitku akan otomatis dialihkan kembali (*redirect*) ke **Portal Member Area** kami: `https://member-area.intisariapps.com/`.
2. Pada saat yang bersamaan dengan datangnya Webhook Duitku, sistem kami secara otomatis:
   - Men-generate **Lisensi Premium / License Key** yang bersifat unik.
   - Mengirimkan **Email Otomatis** (melalui provider Brevo) ke alamat email pelanggan. Email ini berisi invoice pelunasan, Kode Lisensi, tautan untuk mengunduh (*download*) aplikasi desktop IntisariClips, dan panduan instalasi/login.
3. Pelanggan login menggunakan email mereka di *Member Area* atau *Aplikasi Desktop*, memasukkan kode lisensi yang diterima, dan aplikasi seketika siap digunakan secara penuh.
4. Transaksi selesai. Dukungan purna jual tetap tersedia melalui kontak support yang tertera di website.
