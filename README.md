# Rekap Gangguan Transmisi

Aplikasi web satu halaman (`index.html`) untuk mencatat gangguan transmisi, menghitung ENS dan SRT, menampilkan rekomendasi tindak lanjut, serta dashboard dan laporan.

- ENS (MWh) = beban padam (MW) x (durasi padam (menit) / 60)
- SRT (menit) = ENS x 60 / beban padam (MW)
- Gangguan tidak padam bernilai 0

Kategori faktor:
- Eksternal: Alam/Cuaca, Binatang, Benda Lain, Tegakan (pohon), APPL (Aset Pihak Lain), Masa Garansi
- Internal: Alat, Sistem, Human Error, Sarana, Defisit
- Belum diklasifikasi: Belum diketahui

## Data contoh

File `data-contoh.js` berisi data contoh (dummy) 327 gangguan dari 2020 sampai September 2026. Data ini hanya dimuat sekali ke browser saat pertama dibuka. Untuk memulai dari kosong, hapus isi `data-contoh.js` (ganti dengan `window.SEED=[];`).

Aplikasi versi mandiri menyimpan data di localStorage browser. Hapus data situs untuk memuat ulang data contoh.

## Konfigurasi Google Sheets

ID spreadsheet sengaja tidak disimpan di repo publik. Di `index.html`, cari baris:

    SSID='GANTI_DENGAN_ID_SPREADSHEET'

lalu ganti dengan ID spreadsheet Anda (bagian di antara `/d/` dan `/edit` pada alamat Google Sheet). Tab yang dibaca bernama `Halaman 3`, kolom A sampai K.
Jangan commit ID yang sudah terisi kembali ke repo publik.

## Catatan

Aplikasi ini dibuat sebagai Claude Artifact. Penyimpanan data (db), unduhan Excel, dan koneksi Google Sheets memakai kemampuan runtime Claude (`window.claude.use('db' | 'downloads' | 'mcp')`), jadi fitur tersebut hanya berjalan saat aplikasi dibuka di Claude. Di luar Claude, halaman tetap tampil tetapi data tidak tersimpan.
