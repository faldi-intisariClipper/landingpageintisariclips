---
name: cloudflare-pages-deploy
description: Panduan deployment Cloudflare Pages & Pages Functions serta penanganan server lokal.
---

# Cloudflare Pages & Functions Deployer

Skill ini memandu AI dalam menguji, mengonfigurasi, dan mendeploy landing page beserta API backend (`functions/`) ke Cloudflare Pages.

## 🛠️ Pengujian Lokal (Local Development)
1. **Wrangler CLI:** Gunakan perintah `npx wrangler pages dev public` untuk menjalankan server simulasi Cloudflare Pages lokal.
2. **Environment Variables:** Konfigurasi kredensial lokal di file `.dev.vars` (JANGAN dimasukkan ke Git repositori).
3. **Fungsi API:** Akses endpoint lokal di `http://localhost:8788/api/checkout` untuk memverifikasi request-response.

## 📦 Deployment ke Cloudflare
1. **Konfigurasi Output:** File output statis harus berada di folder `public` sesuai pengaturan `pages_build_output_dir = "public"` di `wrangler.toml`.
2. **Routing:** Pastikan fallback route berfungsi dengan baik untuk file HTML statik.
3. **Environment Production:** Kredensial production Duitku disetup langsung di dashboard admin Cloudflare Pages -> Settings -> Environment Variables.
