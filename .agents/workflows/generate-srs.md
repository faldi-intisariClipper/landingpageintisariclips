---
name: generate-srs
description: Petunjuk langkah demi langkah untuk membuat atau memperbarui file SRS di direktori docs/srs/ sebelum menyentuh/mengubah kode aplikasi.
---

# Workflow: Generate Software Requirements Specification (/generate-srs)

Petunjuk langkah demi langkah untuk membuat atau memperbarui file SRS di direktori `docs/srs/` secara terstruktur sebelum AI menyentuh/mengubah kode aplikasinya.

## Langkah 1: Kumpulkan Persyaratan Fitur
- Tanyakan detail fungsionalitas, integrasi API, atau perubahan desain kepada pengguna.
- Petakan kebutuhan tersebut ke dalam arsitektur sistem yang ada.

## Langkah 2: Buat Dokumen SRS
- Buat file markdown baru di direktori `docs/srs/` dengan format:
  `docs/srs/[nomor_urut]-[nama_fitur].md`
- Dokumen harus mencakup:
  - Deskripsi Umum Fitur
  - Alur Kerja / Flowchart (menggunakan Mermaid diagram)
  - Detail Endpoint API (jika ada)
  - Desain & Tampilan UI/UX
  - Rencana Pengujian

## Langkah 3: Git Add & Commit
- Segera jalankan perintah terminal:
  `git add docs/srs/`
- Lakukan commit sebelum implementasi kode:
  `git commit -m "docs(srs): perbarui spesifikasi [nama fitur]"`
