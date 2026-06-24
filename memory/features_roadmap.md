# Peta Jalan Fitur & Backlog

Daftar fitur, peningkatan, atau perbaikan yang akan dikerjakan ke depannya.

## 🎯 Prioritas Utama (Fase 1 - Compliance & Deploy)
- [x] **Deployment ke Cloudflare Pages**: Deploy kode terbaru dengan footer support seragam dan detail produk menggunakan workflow `/deploy-production`.
- [ ] **Kirim Email Compliance**: Menyalin draf tanggapan compliance dari `draf_email_duitku.md` dan mengirimkannya ke tim penilai Duitku.

## 🚀 Migrasi ke Produksi (Fase 2 - Pasca-Persetujuan Duitku)
- [x] **Kembalikan Mode Produksi Dinamis**: Di [checkout.js](file:///d:/INTISARIAPPS_COM/LANDINGPAGE/intisari-clips-landing/functions/api/checkout.js), ubah status `isProduction` kembali menjadi dinamis (berdasarkan variabel environment `DUITKU_ENV`).
- [ ] **Set Kredensial Produksi di Cloudflare Pages Dashboard**:
  - `DUITKU_ENV` = `production`
  - `DUITKU_MERCHANT_CODE` = `D22200`
  - `DUITKU_API_KEY` = `[API KEY PRODUKSI ANDA]`
- [ ] **Live-Test Transaksi Nyata**: Melakukan pembayaran dengan nominal kecil (misalnya Rp 10.000) untuk memvalidasi alur produksi Duitku.

## ⚡ Optimasi & Pemeliharaan (Fase 3)
- [ ] **Optimasi Aset Landing Page**: Jalankan `/optimize-assets` untuk mengonversi gambar promosi statik ke format `.webp` guna meminimalkan ukuran file dan menaikkan skor LCP (Largest Contentful Paint).
- [ ] **Tambahkan Custom Skills Baru**: Implementasikan skill `seo-optimization-and-audit` serta `cloudflare-pages-headers-cors` untuk pengawasan kualitas landing page masa depan.
