# Dokumentasi Teknis: Fitur Dropbox Pilihan Pembayaran & Pembayaran Manual (SeaBank & QRIS Statis)

Dokumen ini berisi spesifikasi teknis lengkap, detail rekening, dan panduan arsitektur alur kerja pembayaran manual non-gateway serta integrasi Dropbox (Dropdown Select) pada proyek landing page Intisari. Dokumentasi ini dirancang agar dapat diduplikasi dan digunakan kembali pada proyek lain dengan mudah.

---

## 📂 1. Detail Rekening & Aset Pembayaran Manual

Metode pembayaran manual (non-gateway) dialihkan ke detail berikut:

### A. Transfer Manual Bank (SeaBank)
* **Bank Tujuan**: SeaBank (Kode Bank: 901)
* **Nomor Rekening**: `901470004292`
* **Atas Nama**: `RIFALDI RAMADHON`
* **Nominal**: `Rp190.000` (disesuaikan dengan harga promo aktif)

### B. Transfer Manual QRIS (GoPay/Universal)
* **Kanal Pembayaran**: QRIS Statis (Scan to Pay)
* **Nama Merchant Resmi**: `INTISARIAPPS SOFTWARE & COMPUTER`
* **Aset Gambar QR Code**: `public/assets/img/qris_intisariapps.jpg`
* **Fitur Tambahan**: Tombol Unduh QR Code untuk mempermudah transaksi via mobile (pembeli dapat menyimpan gambar QRIS ke galeri foto dan mengunggahnya ke aplikasi e-wallet).

---

## 🛠️ 2. Arsitektur Antarmuka (Dropbox Select)

Pada file utama `public/index.html`, elemen input pilihan pembayaran yang berupa grid radio button digantikan oleh elemen `<select>` (Dropbox) premium dark-mode untuk menghemat ruang dan meningkatkan responsivitas layout:

```html
<!-- Pemilih Metode Pembayaran Dropdown (Dropbox) -->
<div class="space-y-1.5">
    <label for="paymentMethodSelect" class="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Pilih Metode Pembayaran</label>
    <div class="relative">
        <!-- Icon Pembayaran -->
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <i class="fa-solid fa-credit-card"></i>
        </div>
        <!-- Select Box -->
        <select id="paymentMethodSelect" required class="w-full bg-neon-bg-darker border border-neon-border focus:border-neon-cyan-mid focus:ring-1 focus:ring-neon-cyan-mid text-white rounded-xl py-3.5 pl-11 pr-10 focus:outline-none transition-colors text-sm appearance-none cursor-pointer font-bold">
            <!-- Pilihan Manual diset sebagai DEFAULT (selected) -->
            <option value="MANUAL_SEABANK" selected>Transfer Manual (SeaBank) - Rekomendasi Cepat</option>
            <option value="MANUAL_QRIS">Transfer Manual (QRIS / GoPay) - Scan Statis</option>
            <!-- Pilihan Duitku Otomatis -->
            <option value="M1">Virtual Account - Mandiri VA</option>
            <option value="B1">Virtual Account - BNI VA</option>
            <option value="BR">Virtual Account - BRI VA</option>
            <option value="BT">Virtual Account - Permata VA</option>
            <option value="BC">Virtual Account - CIMB Niaga VA</option>
            <option value="AL">Kanal Ritel - Alfamart</option>
        </select>
        <!-- Custom Dropdown Arrow -->
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
            <i class="fa-solid fa-chevron-down text-xs"></i>
        </div>
    </div>
</div>
```

---

## ⚙️ 3. Logika Interseptasi Frontend (`public/assets/js/app.js`)

Saat formulir disubmit, JavaScript membaca nilai dari Dropbox. Jika nilainya adalah `MANUAL_SEABANK` atau `MANUAL_QRIS`, JavaScript akan membatalkan pemanggilan API backend `/api/checkout` Duitku dan langsung mengarahkan pembeli ke halaman instruksi dengan parameter query URL:

```javascript
// Membaca input
const paymentMethodSelect = document.getElementById('paymentMethodSelect');
const paymentMethod = paymentMethodSelect ? paymentMethodSelect.value : 'MANUAL_SEABANK';

// Redirect jika metode pembayaran manual dipilih
if (paymentMethod === 'MANUAL_SEABANK') {
    window.location.href = `/manual-transfer.html?method=seabank&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
    return;
}
if (paymentMethod === 'MANUAL_QRIS') {
    window.location.href = `/manual-transfer.html?method=qris&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
    return;
}
```

---

## 🖥️ 4. Halaman Dinamis Instruksi (`public/manual-transfer.html`)

Halaman `manual-transfer.html` dirancang menggunakan **Tailwind CSS & Neo-Brutalism Premium** (dilengkapi hard shadow 3D solid dan active-button press animation). Tampilannya diatur secara dinamis melalui parameter query `method` dari URL:

### A. Logika Switch Tampilan (JavaScript di manual-transfer.html)
```javascript
(function() {
    const params = new URLSearchParams(window.location.search);
    const method = params.get('method') || 'seabank';
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';

    const isQris = method === 'qris';
    const seabankSection = document.getElementById('seabankSection');
    const qrisSection = document.getElementById('qrisSection');
    const titleEl = document.querySelector('h2.font-heading');
    const descEl = document.querySelector('h2.font-heading + p');

    let paymentMethodName = '';

    if (isQris) {
        // Tampilkan QRIS, Sembunyikan SeaBank
        if (seabankSection) seabankSection.classList.add('hidden');
        if (qrisSection) qrisSection.classList.remove('hidden');
        if (titleEl) titleEl.textContent = "Transfer Manual QRIS GoPay";
        if (descEl) descEl.textContent = "Silakan scan kode QRIS resmi kami di bawah ini.";
        paymentMethodName = "Transfer Manual QRIS GoPay";
    } else {
        // Tampilkan SeaBank, Sembunyikan QRIS
        if (seabankSection) seabankSection.classList.remove('hidden');
        if (qrisSection) qrisSection.classList.add('hidden');
        if (titleEl) titleEl.textContent = "Transfer Manual SeaBank";
        if (descEl) descEl.textContent = "Silakan selesaikan pembayaran Anda dengan mentransfer ke rekening SeaBank.";
        paymentMethodName = "Transfer Manual SeaBank";
    }

    // Tautkan Teks Pesan Konfirmasi WhatsApp Dinamis
    const baseWAText = `Halo Admin, saya ingin konfirmasi pembayaran lisensi IntisariClips secara ${paymentMethodName}.\n\nDetail Pembeli:\n- Nama: ${name}\n- Email: ${email}\n- WhatsApp: ${phone}\n\nSaya telah mentransfer sebesar Rp190.000. Berikut bukti transfer terlampir.`;
    
    const adminPhone = "628567870040"; // Nomor WhatsApp Ripal
    const waLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(baseWAText)}`;
    
    document.getElementById('btnConfirmWA').href = waLink;
})();
```

### B. Fitur Unggulan Antarmuka (UI Features):
1.  **Tombol Salin (SeaBank View)**:
    Menyalin nomor rekening SeaBank secara instan ke clipboard pengguna menggunakan Clipboard API. Menyediakan feedback teks berupa perubahan tulisan *"Salin Rekening"* menjadi *"Berhasil Tersalin!"* (berwarna hijau) selama 2 detik.
2.  **Tombol Unduh QR Code (QRIS View)**:
    Menggunakan tag `<a>` dengan atribut `download="QRIS_IntisariApps.jpg"` untuk mengunduh berkas gambar secara otomatis ke perangkat pengguna tanpa memicu pembukaan tab baru.
3.  **Animasi Active (Press Effect)**:
    Menggunakan kelas custom CSS `.neo-shadow-orange` / `.neo-shadow-green` dan transisi `active:translate-x-0.5 active:translate-y-0.5 active:shadow-none` untuk mensimulasikan efek penekanan tombol fisik yang kokoh.

---

## 🚀 5. Cara Penggunaan Ulang di Proyek Lain (Reusable Guide)

Untuk menggunakan kembali modul pembayaran ini pada proyek baru:
1.  **Salin File**:
    * Salin berkas `public/manual-transfer.html` ke direktori proyek baru.
    * Pastikan gambar QRIS diletakkan di `public/assets/img/qris_intisariapps.jpg`.
2.  **Modifikasi Identitas & Rekening**:
    * Cari ID `accountNumber` di `manual-transfer.html`, ganti nomor rekeningnya.
    * Ganti nama penerima rekening (`Rifaldi Ramadhon`) dan nama toko di QRIS (`INTISARIAPPS SOFTWARE & COMPUTER`).
    * Ganti variabel `adminPhone` di bagian script dengan nomor WhatsApp admin tujuan.
3.  **Integrasi HTML & JS Utama**:
    * Salin struktur `<select>` ke form checkout di proyek baru.
    * Tambahkan logika interseptasi submit `'MANUAL_SEABANK'` dan `'MANUAL_QRIS'` pada script JS checkout proyek baru untuk memicu redirect ke `/manual-transfer.html`.
4.  **Kompilasi CSS**:
    * Pastikan menjalankan Tailwind CSS compiler (`npx tailwindcss ...`) untuk mengemas kelas-kelas utilitas yang terdaftar pada file `manual-transfer.html`.
