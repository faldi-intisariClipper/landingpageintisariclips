# Panduan Proyek: IntisariClips Landing Page

Dokumen ini berfungsi sebagai panduan utama persona, arsitektur, dan aturan pengembangan untuk AI dan pengembang di proyek ini.

---

## 1. Panduan Persona AI & Aturan CRO (Conversion Rate Optimization)
* **Bahasa**: Selalu gunakan Bahasa Indonesia yang profesional, santun, dan formal.
* **Keamanan Kredensial**: JANGAN PERNAH melakukan *hardcode* terhadap informasi sensitif seperti API Key atau token ke dalam kode sumber. Gunakan mekanisme variabel lingkungan (`.env` / Cloudflare Secrets).
* **Kualitas Desain (Rich Aesthetics)**: Setiap pembaruan tampilan harus mengikuti standar desain modern, premium (warna harmonis, efek transisi halus, mikro-animasi), dan responsif.
* **Pemeliharaan Komentar**: Jangan menghapus komentar asli, docstring, atau kode lama tanpa persetujuan eksplisit.
* **Tata Letak Asimetris & Premium:** Hindari layout grid 50:50 yang kaku. Gunakan overlap elemen dan hard-shadow ala neo-brutalism. Jangan pernah gunakan struktur template AI generik.
* **Struktur Naratif (AIDA/PAS):** Hook -> Villain (Masalah) -> Epiphany (Solusi Bento Grid) -> Social Proof (WhatsApp/Telegram mockups) -> Penawaran Harga/Garansi -> Form Checkout.
* **Mobile-First Scroll Stopper:** Impresi visual di mobile harus berubah secara dinamis setiap kali digulir (scroll) untuk meminimalkan bounce rate.

---

## 2. Arsitektur Proyek
* **Teknologi Utama**: HTML, CSS, TailwindCSS, JavaScript (ES6).
* **Backend / API**: Cloudflare Pages Functions (Wrangler).
* **Integrasi Payment Gateway**: Duitku (Sandbox / Production).
* **Struktur Direktori**:
  * `public/` - File statik frontend (HTML, CSS, gambar/video).
  * `functions/api/` - Endpoint backend serverless untuk checkout & proses pembayaran.
  * `docs/srs/` - Dokumentasi System Requirement Specification (SRS).
  * `memory/` - Jurnal sesi dan status progres pengembangan.
  * `scripts/` - Skrip pembantu/otomatisasi (misal optimasi asset).

---

## 3. Sistem Operasi & Lingkungan
* **Sistem Operasi**: Windows (PowerShell)
* **Direktori Workspace**: d:\INTISARIAPPS_COM\LANDINGPAGE\intisari-clips-landing
* **Manajemen Sesi**:
  * **Mulai Sesi (`/session-start`)**: AI memverifikasi status Git secara proaktif, membaca folder `memory/` untuk memulihkan konteks kerja.
  * **Tutup Sesi (`/session-end`)**: AI memperbarui `memory/journal.md`, `memory/features_existing.md`, dan `memory/features_roadmap.md`, lalu melakukan commit & push ke branch `dev`.

---

## 4. Protokol Pengembangan & Dokumentasi
1. **Auto-SRS & Auto-Commit**:
   * Setiap kali ada kesepakatan perubahan arsitektur atau fitur baru, AI wajib membuat/memperbarui file spesifikasi di folder `docs/srs/` secara otomatis.
   * Lakukan commit git awal untuk file SRS tersebut sebelum mulai menulis kode implementasi:
     ```bash
     git add docs/srs/
     git commit -m "docs(srs): perbarui spesifikasi [nama fitur]"
     ```
2. **Mentalitas TDD (Test-First)**:
   * Buat *test suite* atau skenario uji terlebih dahulu sebelum membangun integrasi API yang kompleks.
   * Lakukan *mocking* untuk semua operasi eksternal agar aman.

---

## 5. HTML & Responsiveness Deep-Check Rules
1. **Pengecekan Kebocoran Layout (Layout Overflow)**
   * Setiap komponen halaman harus muat di dalam viewport layar ponsel (mulai dari lebar 320px hingga 430px untuk mobile standar).
   * Periksa apakah ada penggunaan ukuran absolut seperti `width: [X]px` (misal `width: 500px` or `min-w-[450px]`) pada elemen utama seperti kontainer, navbar, tombol, atau video wrapper. Ganti dengan `w-full`, `max-w-screen-xl`, atau persen/rem.
   * Pastikan tag pembungkus paling luar (`<body>` / `<html>`) dikonfigurasi dengan aman menggunakan properti `overflow-x-hidden`.
2. **Inspeksi Komponen Navbar & Header**
   * Komponen navigasi tidak boleh mendorong elemen keluar dari layar kanan pada mode mobile.
   * Jika menggunakan Flexbox (`flex justify-between`), pastikan terdapat padding kiri-kanan yang aman (`px-4` atau `px-6`) dan elemen anak tidak dipaksa melebar melampaui lebar layar.
3. **Evaluasi Media & Video Wrapper**
   * Pemutar video atau gambar demo harus bersifat responsif sepenuhnya.
   * Pastikan elemen video, iframe, atau gambar memiliki kelas `w-full` dan `h-auto`, serta dibungkus oleh div penahan aspek rasio (seperti `aspect-video`).
4. **Langkah Verifikasi Wajib Sebelum Selesai Tugas**
   * Apakah ada elemen yang berpotensi merusak lebar kontainer utama?
   * Apakah kode sudah diuji secara simulasi pada breakpoint terkecil (`sm:` atau tanpa prefix di Tailwind)?
   * Jika ditemukan potensi kebocoran, perbaiki struktur grid/flex-nya sebelum menyerahkan kode ke pengguna.
