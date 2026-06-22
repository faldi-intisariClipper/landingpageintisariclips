# Workflow: Deploy to Production (/deploy-production)

Petunjuk langkah demi langkah untuk melakukan pendeployan landing page beserta fungsinya ke lingkungan produksi Cloudflare Pages.

## Langkah 1: Pengujian Lokal Akhir
- Jalankan pemeriksaan responsivitas untuk memastikan tidak ada kebocoran layout:
  `wrangler pages dev public`
- Lakukan simulasi checkout di localhost:8788 dan pastikan redirect pembayaran Duitku bekerja.

## Langkah 2: Konfigurasi Environment Variables Produksi
- Pastikan kredensial Duitku mode Production sudah diatur di dashboard admin Cloudflare Pages:
  - `DUITKU_MERCHANT_CODE`
  - `DUITKU_API_KEY`
- JANGAN menyimpan kredensial produksi ini di dalam file lokal `.dev.vars` atau file kode apa pun yang masuk ke Git.

## Langkah 3: Pembangunan & Kompilasi Aset
- Jalankan kompilasi CSS Tailwind:
  `npm run build:css` (jika menggunakan skrip kustom)
- Pastikan semua aset gambar telah dioptimalkan ke format `.webp`.

## Langkah 4: Commit dan Push Perubahan Akhir
- Periksa status Git dan pastikan repositori bersih:
  `git status`
- Commit semua perubahan dengan pesan commit yang deskriptif:
  `git commit -am "chore: persiapan rilis produksi"`
- Lakukan push ke branch utama/produksi:
  `git push origin dev` (atau branch target rilis)

## Langkah 5: Pemicuan Deployment Cloudflare
- Jalankan perintah deploy wrangler:
  `npm run deploy`
- Salin URL hasil deploy produksi dan periksa di browser ponsel/desktop asli untuk verifikasi live.
