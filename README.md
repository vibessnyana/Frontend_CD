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

