---
name: verify-build
description: Petunjuk langkah demi langkah untuk menjalankan server lokal simulasi Cloudflare Pages dan memverifikasi backend API serta file frontend statik.
---

# Workflow: Verify Dev Build (/verify-build)

Petunjuk langkah demi langkah untuk menjalankan server lokal simulasi Cloudflare Pages dan memverifikasi integrasi fungsi backend API serta file frontend statik.

## Langkah 1: Siapkan Environment
- Pastikan modul node (`node_modules/`) sudah terinstal lengkap.
- Pastikan file `.dev.vars` (kredensial API lokal) dikonfigurasi dengan benar.

## Langkah 2: Jalankan Local Dev Server
- Jalankan perintah terminal:
  `npx wrangler pages dev public`
- Tunggu hingga server local menyala di port `8788`.

## Langkah 3: Verifikasi API & Aset
- Buka browser atau lakukan request untuk memverifikasi API checkout.
- Pastikan tidak ada error kompilasi Javascript pada browser console.
