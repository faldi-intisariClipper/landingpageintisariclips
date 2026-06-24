# Workflow: Beralih ke Mode Produksi Duitku (/switch-production)

Setiap kali workflow `/switch-production` dipanggil, kamu wajib menjalankan perintah untuk menyetel variabel lingkungan Cloudflare Pages proyek `intisari-clips-landing` ke konfigurasi Duitku Live Produksi menggunakan langkah-langkah berikut:

---

## 1. VERIFIKASI KEBERADAAN KONFIGURASI LOKAL
* Periksa apakah berkas `.production.vars` sudah ada di root direktori.
* Jika belum ada, berikan instruksi peringatan keras kepada pengguna untuk menyalin berkas `.production.vars.example` menjadi `.production.vars` dan mengisi nilai API Key Produksi asli di dalamnya terlebih dahulu sebelum melanjutkan.

---

## 2. BULK UPLOAD VARIABEL PRODUKSI
Jika berkas `.production.vars` sudah siap, jalankan perintah terminal berikut untuk melakukan bulk upload:
```bash
npx wrangler pages secret bulk .production.vars --project-name=intisari-clips-landing
```

---

## 3. VERIFIKASI PENGATURAN REMOTE
Jalankan perintah berikut untuk memverifikasi daftar rahasia (secrets) produksi telah terunggah:
```bash
npx wrangler pages secret list --project-name=intisari-clips-landing
```

---

## 4. PENCATATAN HASIL & INFORMASI KE PENGGUNA
* Laporkan bahwa saklar proyek berhasil dialihkan ke mode **Produksi**.
* Ingatkan pengguna untuk melakukan pendeployan ulang (redeploy) agar nilai-nilai rahasia produksi ini aktif di runtime.
