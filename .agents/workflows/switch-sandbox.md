# Workflow: Beralih ke Mode Sandbox Duitku (/switch-sandbox)

Setiap kali workflow `/switch-sandbox` dipanggil, kamu wajib menjalankan perintah untuk menyetel variabel lingkungan Cloudflare Pages proyek `intisari-clips-landing` ke konfigurasi pengujian Duitku Sandbox menggunakan langkah-langkah berikut:

---

## 1. BULK UPLOAD VARIABEL SANDBOX
Jalankan perintah terminal berikut di root direktori untuk mengunggah konfigurasi dari berkas `.sandbox.vars` ke Cloudflare Pages secara langsung:
```bash
npx wrangler pages secret bulk .sandbox.vars --project-name=intisari-clips-landing
```

---

## 2. VERIFIKASI PENGATURAN REMOTE
Jalankan perintah berikut untuk memastikan daftar rahasia (secrets) Sandbox berhasil terdaftar di Cloudflare Pages:
```bash
npx wrangler pages secret list --project-name=intisari-clips-landing
```

---

## 3. PENCATATAN HASIL & INFORMASI KE PENGGUNA
* Laporkan kepada pengguna bahwa saklar proyek berhasil dialihkan ke mode **Sandbox**.
* Ingatkan pengguna bahwa setelah melakukan pengalihan variabel, ia harus memicu pendeployan ulang (redeploy) agar nilai baru tersebut aktif di runtime.
