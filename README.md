# Frontend Digital Copyright System

Frontend ini digunakan untuk:

- Upload gambar karya.
- Melihat hasil cek kemiripan.
- Melakukan review manual jika diperlukan.
- Mendaftarkan metadata karya jika hasil pengecekan aman.
- Melihat, mengubah, dan menghapus metadata karya.

## API

Base URL dibaca dari `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Frontend hanya berkomunikasi dengan API Gateway.

## Alur Plagiarisme

1. User upload gambar.
2. User memilih preset/manual threshold.
3. Frontend memanggil `POST /upload`.
4. Backend mengembalikan `check_id`, status registrasi, skor kemiripan, dan daftar kandidat internal/eksternal.
5. Jika `allowed`, tombol verifikasi aktif.
6. Jika `review_required`, reviewer dapat `Approve` atau `Reject`.
7. Jika disetujui, form metadata dapat dikirim memakai `check_id`.

## Form Metadata

Form registrasi metadata tidak menampilkan `KI ID` dan `KI UUID`.

Alasannya:

- Field tersebut berasal dari database KI eksternal.
- Saat ini belum dipakai sebagai sumber utama.
- Sistem menggunakan `check_id` sebagai bukti hasil pengecekan dan anti-duplikasi registrasi.

## Validasi Upload

Validasi frontend:

- Format: JPG, PNG, WEBP.
- Ukuran maksimal: 10 MB.

Validasi backend tetap menjadi validasi utama.

## Responsiveness

Beberapa bagian UI sudah disesuaikan agar tetap nyaman dipakai pada ukuran layar berbeda dan saat browser di-zoom:

- Navbar menyesuaikan layar kecil.
- Halaman upload memakai tinggi minimum agar konten tetap dapat discroll di viewport kecil.
- Dropzone upload lebih pendek di mobile dan tetap lebih luas di desktop.
- Grid metadata memakai jumlah kolom adaptif.
- Jumlah item metadata per halaman mengikuti jumlah kolom agar daftar tidak memanjang terlalu jauh.
- Card metadata memakai `object-contain` agar gambar karya tidak terpotong.
- Pagination metadata mengikuti tinggi konten, bukan terdorong ke bawah viewport.

## Error Handling

Jika backend mengembalikan error `5xx`, frontend menampilkan pesan umum:

```text
Layanan sedang bermasalah. Silakan coba beberapa saat lagi.
```

Error validasi seperti `400`, `409`, dan `422` tetap menampilkan pesan yang berguna untuk user.

## Development

Install dependency:

```bash
npm install
```

Jalankan frontend:

```bash
npm run dev
```

Build production:

```bash
npm.cmd run build
```

Jika memakai PowerShell dan `npm` terkena execution policy, gunakan `npm.cmd`.

## Quality Check

Sebelum commit atau demo, jalankan:

```bash
npm.cmd run lint
npm.cmd run build
```

`lint` memastikan tidak ada error static analysis seperti variable tidak terpakai. `build` memastikan aplikasi dapat dibuat untuk production.

## Catatan Improvement

Beberapa validasi frontend masih memakai `alert()`. Secara fungsi sudah berjalan, tetapi untuk tampilan yang lebih konsisten dapat diganti menjadi modal atau toast error.

