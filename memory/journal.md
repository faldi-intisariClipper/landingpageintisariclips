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

## 30 Juni 2026 - Migrasi Metode Pembayaran ke Mandiri VA & Rilis Produksi
* **Aktivitas**: 
  1. Menyelaraskan berkas `.production.vars` dengan menambahkan `DUITKU_MERCHANT_CLIPS=D23359` dan `DUITKU_API_KEY_CLIPS` produksi.
  2. Memodifikasi `functions/api/checkout.js` untuk mengganti default `paymentMethod` dari `"NQ"` (QRIS) menjadi `"M1"` (Mandiri Virtual Account - Bank Transfer) karena panel transfer bank telah aktif.
  3. Melakukan pengujian simulasi lokal menggunakan Wrangler dev dan browser subagent.
  4. Melakukan kompilasi Tailwind CSS dan mendeploy live perubahan tersebut ke Cloudflare Pages `intisari-clips-landing`.
* **Status**: Berhasil dideploy secara teknis, namun transaksi pembayaran masih ditolak oleh Duitku API.
* **Analisis & Diagnostik**: Duitku mengembalikan error `"Payment channel not available"` baik untuk channel `"NQ"` maupun `"M1"`. Ini mengonfirmasi bahwa **API Key Duitku** yang tercantum saat ini (`c0a7044e312218a9d628cd82e6544a23`) tidak valid/tidak cocok dengan Merchant ID `D23359` di sistem Duitku, atau terdapat miskonfigurasi IP Whitelist pada dasbor Duitku.
* **Langkah Selanjutnya**: Meminta pengguna untuk memverifikasi kecocokan API Key produksi di dasbor Duitku untuk proyek `D23359`.
