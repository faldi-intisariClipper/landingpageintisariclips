---
name: duitku-integration
description: Panduan dan bantuan teknis untuk mengintegrasikan payment gateway Duitku serta memvalidasi alur checkout.
---

# Duitku Payment Integration Skill

Skill ini membantu AI memahami, menguji, dan memelihara modul pembayaran menggunakan Payment Gateway Duitku pada sistem Cloudflare Pages.

## 📌 Alur Transaksi Duitku (Checkout.js & Functions)
1. **Pengumpulan Data:** Form checkout mengumpulkan data pembeli (`custName`, `custEmail`, `custPhone`).
2. **Panggilan API lokal:** Form mengirimkan request POST ke API local `/api/checkout`.
3. **Komunikasi Duitku:** API `/api/checkout` memproses request, membuat signature, dan mengirim request transaksi ke API Duitku untuk membuat invoice.
4. **Redireksi Pembayaran:** Duitku membalas dengan tautan pembayaran (`paymentUrl`).
5. **Redireksi Pembeli:** Endpoint local mengarahkan pembeli ke `paymentUrl` untuk menyelesaikan pembayaran.
6. **Halaman Sukses:** Setelah sukses, pembeli diarahkan kembali ke halaman `success.html`.

## 🛡️ Kebijakan Keamanan Kredensial
- **JANGAN PERNAH** menulis secara langsung (hardcode) Merchant Code atau API Key Duitku di file frontend maupun backend.
- Gunakan Environment Variables Cloudflare Pages (tersedia di `.dev.vars` pada lokal dan di dashboard Cloudflare untuk production).

## 🛠️ Langkah Validasi Alur
- Pastikan signature Duitku dihitung menggunakan formula:
  `SHA256(merchantCode + merchantOrderId + paymentAmount + apiKey)`
- Selalu tangani error API dengan menampilkan pesan yang bersahabat kepada pengguna via `#checkoutAlert`.
