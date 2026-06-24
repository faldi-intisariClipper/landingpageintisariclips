# Panduan Integrasi Pembayaran Duitku untuk Landing Page Penjualan

Dokumen ini mendefinisikan standar integrasi dan konfigurasi teknis pembayaran Duitku pada landing page penjualan produk Intisari Apps (`CLIPS`, `AUTOCUT`, `MUROTTAL`). Panduan ini wajib diikuti oleh pengembang landing page untuk memastikan sistem pembuatan lisensi otomatis berjalan lancar.

---

## 1. Konfigurasi Variabel Lingkungan (Environment Variables)

Landing page yang di-deploy ke Cloudflare Workers / Pages harus mengonfigurasi variabel berikut pada bagian **Variables and secrets**:

| Nama Variabel | Jenis | Deskripsi | Contoh Uji (Sandbox) |
|---|---|---|---|
| `DUITKU_MERCHANT_CODE` | Secret | ID Merchant Duitku (unik per-produk) | `DS32033` |
| `DUITKU_API_KEY` | Secret | API Key Duitku (unik per-produk) | `83afbae747ea45b155427183097d9492` |
| `DUITKU_ENV` | Secret | Mode lingkungan (`sandbox` atau `production`) | `sandbox` |
| `LICENSE_BACKEND_CALLBACK_URL` | Variable | URL webhook backend lisensi Intisari | `https://api.intisariapps.com/v1/webhook/duitku` |

---

## 2. Aturan Emas Pembuatan Order ID (`merchantOrderId`)

Untuk membedakan jenis lisensi aplikasi yang dibeli oleh pelanggan, penulisan Order ID / Invoice ID (`merchantOrderId`) yang dikirim ke Duitku **WAJIB** mengandung substring kode aplikasi secara case-insensitive.

### Standar Format Penulisan:
*   **Landing Page CLIPS**: Harus mengandung kata `CLIPS`.
    *   *Contoh*: `INV-CLIPS-20260624-1002`
*   **Landing Page AUTOCUT**: Harus mengandung kata `AUTOCUT`.
    *   *Contoh*: `INV-AUTOCUT-20260624-5049`
*   **Landing Page MUROTTAL**: Harus mengandung kata `MUROTTAL`.
    *   *Contoh*: `INV-MUROTTAL-20260624-9021`

> [!WARNING]
> Kegagalan menyertakan kode aplikasi ini pada `merchantOrderId` akan menyebabkan backend lisensi secara default men-generate lisensi untuk **CLIPS**.

---

## 3. Parameter Pemanggilan API Duitku (Request Payment)

Saat landing page menginisiasi pembayaran (membuat payment link) ke API Duitku, pastikan parameter berikut dikirimkan dengan benar:

1.  **`merchantCode`**: Diisi dari `DUITKU_MERCHANT_CODE`.
2.  **`paymentAmount`**: Nominal pembayaran.
3.  **`merchantOrderId`**: Invoice ID yang memenuhi aturan Seksi 2.
4.  **`callbackUrl`**: **WAJIB** diisi dengan alamat webhook backend lisensi (`LICENSE_BACKEND_CALLBACK_URL`). Jangan diisi ke alamat landing page Anda sendiri.
5.  **`customerDetail`**: Kirimkan detail objek `email` dan `firstName` (nama pembeli) secara lengkap agar backend lisensi dapat mengirimkan email berisi kunci lisensi via Brevo.

---

## 4. Keamanan Signature Inisiasi

Di sisi backend landing page (saat inisiasi), signature Duitku dibentuk dengan formula MD5:
$$\text{Signature} = \text{MD5}(\text{merchantCode} + \text{merchantOrderId} + \text{paymentAmount} + \text{API Key})$$

Gunakan `API Key` dan `merchantCode` sandbox (`DS32033`) jika `DUITKU_ENV` bernilai `sandbox`, atau kredensial live produksi jika `DUITKU_ENV` bernilai `production`.
