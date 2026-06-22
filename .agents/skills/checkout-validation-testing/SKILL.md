---
name: checkout-validation-testing
description: Panduan pengujian lapis validasi backend API checkout dan simulasi request payload bermasalah.
---

# Checkout Validation & Integration Testing

Skill ini memandu AI dalam melakukan pengujian fungsional dan pengujian keamanan pada modul checkout (`functions/api/checkout.js`) yang berinteraksi dengan API Duitku.

## 🛡️ Aturan Validasi Input Backend
Sebelum request diteruskan ke Duitku, backend API wajib memvalidasi input sebagai berikut:
1. **Nama Lengkap (`custName`):** Wajib ada, bertipe string, minimal 3 karakter.
2. **Email (`custEmail`):** Wajib ada, format email valid menggunakan ekspresi reguler (regex).
3. **Telepon (`custPhone`):** Wajib ada, minimal 9 digit angka.
4. **Paket/Harga (`amount`):** Harus berupa angka bulat positif dan sesuai dengan daftar paket harga resmi.

## 🧪 Metode Pengujian Payload Lokal
Gunakan perintah `curl` atau skrip pengujian untuk memverifikasi fungsionalitas penolakan payload:
1. **Test Case 1: Payload Valid (Mengharapkan 200 OK dengan Payment URL):**
   ```bash
   curl -X POST http://localhost:8788/api/checkout \
     -H "Content-Type: application/json" \
     -d '{"custName": "Budi Santoso", "custEmail": "budi@example.com", "custPhone": "081234567890", "amount": 250000}'
   ```
2. **Test Case 2: Nama Terlalu Pendek (Mengharapkan 400 Bad Request):**
   ```bash
   curl -X POST http://localhost:8788/api/checkout \
     -H "Content-Type: application/json" \
     -d '{"custName": "Al", "custEmail": "al@example.com", "custPhone": "081234567890", "amount": 250000}'
   ```
3. **Test Case 3: Email Tidak Valid (Mengharapkan 400 Bad Request):**
   ```bash
   curl -X POST http://localhost:8788/api/checkout \
     -H "Content-Type: application/json" \
     -d '{"custName": "Budi Santoso", "custEmail": "budi-bukan-email", "custPhone": "081234567890", "amount": 250000}'
   ```
4. **Test Case 5: Telepon Kurang dari 9 Digit (Mengharapkan 400 Bad Request):**
   ```bash
   curl -X POST http://localhost:8788/api/checkout \
     -H "Content-Type: application/json" \
     -d '{"custName": "Budi Santoso", "custEmail": "budi@example.com", "custPhone": "0812", "amount": 250000}'
   ```
