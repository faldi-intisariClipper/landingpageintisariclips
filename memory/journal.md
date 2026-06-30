# Jurnal Sesi & Riwayat Aktivitas

Log kronologis aktivitas harian sesi pengembangan.

## 24 Juni 2026 - Sesi Awal Proyek & Inisialisasi
* **Aktivitas**: Inisialisasi struktur memori dan dokumen `Agent.md` menggunakan `/init-project`. Mengintegrasikan aturan desain CRO, responsiveness, dan panduan persona standar.
* **Status**: Sukses.

## 24 Juni 2026 - Penyelarasan Modul Checkout Duitku dengan SRS & Redeploy
* **Aktivitas**: Menyesuaikan `functions/api/checkout.js` agar mendukung multi-merchant dinamis dengan fallback, switches env dinamis, parameter `customerDetail`, `callbackUrl` dinamis, prefiks `merchantOrderId` ("INV-CLIPS-"), serta menetapkan metode pembayaran default menjadi Nobu QRIS (`NQ`) demi kompatibilitas QRIS Universal (seperti pada proyek Autocut). Melakukan verifikasi payload lokal menggunakan simulasi Wrangler, dilanjutkan dengan deployment ulang ke Cloudflare Pages.
* **Status**: Sukses (Ter-deploy di `https://dev.intisari-clips-landing.pages.dev`).
* **Langkah Selanjutnya**: Mengirim email tindak lanjut kepatuhan ke Duitku menggunakan draf di `draf_email_duitku.md` dan menunggu persetujuan akun produksi `D22200`.

## 24 Juni 2026 - Deploy Ulang Proyek Clips & Penyelarasan Env dengan Autocut
* **Aktivitas**: Membuat berkas konfigurasi rahasia modular (`.sandbox.vars`, `.production.vars.example`, `.dev.vars`) di root proyek `intisari-clips-landing`. Membuat berkas workflow `/switch-sandbox` dan `/switch-production` untuk penyelarasan fungsionalitas dengan proyek Autocut. Melakukan kompilasi Tailwind CSS, lalu membuat ulang proyek Cloudflare Pages `intisari-clips-landing` dan mendeploy aset statis serta backend secara sukses. Mengunggah variabel sandbox secara remote dan melakukan verifikasi status secrets.
* **Status**: Sukses (Ter-deploy di `https://intisari-clips-landing.pages.dev`).
* **Langkah Selanjutnya**: Melakukan tes transaksi live sandbox dan mengirim draf email compliance ke tim Duitku.

## 24 Juni 2026 - Rilis Produksi & Sinkronisasi Kredensial Live Duitku
* **Aktivitas**: Membuat berkas `.production.vars` lokal untuk menampung kredensial Duitku Live riil, mengecualikannya di `.gitignore` demi keamanan, lalu melakukan push ke Git. Menjalankan workflow `/switch-production` untuk melakukan bulk upload 6 secrets produksi ke Cloudflare Pages. Menjalankan workflow `/deploy-production` untuk kompilasi CSS dan redeploy proyek secara sukses.
* **Status**: Sukses (Ter-deploy live di `https://intisari-clips-landing.pages.dev` / `https://f2d7e1ef.intisari-clips-landing.pages.dev`).
* **Langkah Selanjutnya**: Melakukan pengujian transaksi nominal kecil di mode produksi, dan menindaklanjuti proses approval dengan mengirim draf email compliance ke tim Duitku.

## 24 Juni 2026 - Pengalihan Kembali ke Mode Sandbox untuk Peninjauan Compliance
* **Aktivitas**: Menjalankan workflow `/switch-sandbox` untuk mengunggah ulang variabel sandbox (`DUITKU_ENV=sandbox`) ke Cloudflare Pages, diikuti dengan pemicuan deployment ulang (`npm run deploy`) untuk mengaktifkannya di runtime.
* **Status**: Sukses (Ter-deploy di `https://intisari-clips-landing.pages.dev` / `https://a724531f.intisari-clips-landing.pages.dev`).
* **Langkah Selanjutnya**: Memverifikasi alur checkout sandbox bekerja secara live, lalu mengirim email tanggapan ke tim Duitku.

## 24 Juni 2026 - Penyelarasan Kepatuhan Duitku 100% & Dinamisasi PRODUCT_PREFIX
* **Aktivitas**: Menyelaraskan logika backend API checkout agar memproses variabel `PRODUCT_PREFIX` secara dinamis dari environment (`context.env.PRODUCT_PREFIX` dengan fallback `"INV-CLIPS"`). Menambahkan variabel `PRODUCT_PREFIX` di berkas `.production.vars`, `.sandbox.vars`, dan `.production.vars.example`. Memperbarui antarmuka `public/success.html` dengan Contact Support Panel yang seragam dan lengkap untuk mencapai status kepatuhan Duitku 100%. Melakukan pengujian visual menggunakan browser subagent.
* **Status**: Sukses (Terverifikasi secara visual pada mode sukses dan gagal).
* **Langkah Selanjutnya**: Melakukan push commit ke repositori Git dev dan menindaklanjuti proses email compliance ke tim Duitku.

## 30 Juni 2026 - Sinkronisasi Kredensial Produksi & Uji Coba Checkout Live
* **Aktivitas**: 
  1. Menambahkan variabel khusus Clips (`DUITKU_MERCHANT_CLIPS=D23359` dan `DUITKU_API_KEY_CLIPS`) ke dalam `.production.vars` lokal.
  2. Melakukan *bulk upload* 7 variabel produksi ke Cloudflare Pages `intisari-clips-landing` dan mendeploy ulang proyek.
  3. Melakukan pengujian alur checkout live menggunakan browser subagent.
* **Status**: Gagal secara fungsional. Transaksi ditolak oleh Duitku dengan kode status HTTP 400 dan pesan `"Konfigurasi merchant/API key Duitku tidak valid."`.
* **Analisis & Diagnostik**: Akun produksi Duitku (`D23359` / `D22200`) terdeteksi belum diaktifkan/disetujui secara resmi oleh tim Compliance Duitku, sehingga Duitku API memblokir permintaan inquiry live. Ada juga potensi ketidakcocokan kredensial jika di dasbor Duitku sesungguhnya terdaftar di bawah ID merchant yang berbeda.
* **Langkah Selanjutnya**: Memberikan laporan analisis kepada pengguna, menyarankan pengalihan kembali ke mode Sandbox (`DUITKU_ENV=sandbox`) agar proses audit compliance Duitku dapat berjalan sukses tanpa diblokir oleh Duitku Live.
