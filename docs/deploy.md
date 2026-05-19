# 🚀 CipherLeaf — Panduan Deployment ke Vercel

> Deploy **Frontend** dan **Backend** ke **Vercel** dalam dua project terpisah.

---

## 📐 Arsitektur Deployment

```
GitHub Repository (monorepo)
├── frontend/   → Vercel Project #1 (Static Site / CDN)
└── backend/    → Vercel Project #2 (Serverless Function)
```

| Layer    | Platform | URL Contoh                               | Tier Gratis |
|----------|----------|------------------------------------------|-------------|
| Frontend | Vercel   | `https://cipherleaf.vercel.app`          | ✅ Ya        |
| Backend  | Vercel   | `https://cipherleaf-backend.vercel.app`  | ✅ Ya        |

> [!NOTE]
> Backend Express berjalan sebagai **Serverless Function** di Vercel.
> Artinya tidak ada server permanen — setiap request menjalankan fungsi baru.
> Ini sempurna untuk API enkripsi yang ringan seperti CipherLeaf.

---

## ✅ Prasyarat

- [ ] Akun [GitHub](https://github.com)
- [ ] Akun [Vercel](https://vercel.com) — login via GitHub
- [ ] Git terinstall
- [ ] Proyek sudah berjalan normal di lokal

---

## 📦 Langkah 0 — Push ke GitHub

### 0.1 Inisialisasi Git di root project

```bash
cd d:\website-cyper
git init
git add .
git commit -m "feat: initial CipherLeaf project"
```

### 0.2 Buat Repository di GitHub

1. Buka [github.com/new](https://github.com/new)
2. Nama repo: `cipherleaf`
3. Jangan centang "Initialize this repository"
4. Klik **Create repository**

### 0.3 Push

```bash
git remote add origin https://github.com/<username>/cipherleaf.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Bagian 1 — Deploy Backend ke Vercel

> [!IMPORTANT]
> Deploy **backend dulu**, karena URL-nya dibutuhkan untuk konfigurasi frontend.

### 1.1 Buat Project Backend di Vercel

1. Buka [vercel.com/new](https://vercel.com/new) → Login
2. Klik **"Add New Project"**
3. Pilih repository **cipherleaf** → Klik **"Import"**

### 1.2 Konfigurasi Backend

Di halaman konfigurasi, isi seperti ini:

| Setting             | Nilai          |
|---------------------|----------------|
| **Project Name**    | `cipherleaf-backend` |
| **Framework Preset**| `Other`        |
| **Root Directory**  | `backend`      |
| **Build Command**   | *(kosongkan)*  |
| **Output Directory**| *(kosongkan)*  |
| **Install Command** | `npm install`  |

> [!IMPORTANT]
> Klik ikon pensil di **Root Directory** → ketik `backend` → konfirmasi.
> Framework Preset pilih **Other** (bukan Node.js atau apapun).

### 1.3 Tambahkan Environment Variables Backend

Klik **"Environment Variables"** dan tambahkan satu per satu:

| Key                    | Value                                     |
|------------------------|-------------------------------------------|
| `NODE_ENV`             | `production`                              |
| `ALLOWED_ORIGINS`      | `https://cipherleaf.vercel.app`           |
| `RATE_LIMIT_WINDOW_MS` | `60000`                                   |
| `RATE_LIMIT_MAX`       | `100`                                     |

> [!NOTE]
> `PORT` tidak perlu diisi — Vercel mengelola port sendiri pada serverless.
> `ALLOWED_ORIGINS` isi dengan URL frontend Vercel yang akan dibuat di Bagian 2.

### 1.4 Deploy Backend

Klik **"Deploy"** dan tunggu ~1–2 menit.

Setelah selesai, Vercel memberikan URL seperti:
```
https://cipherleaf-backend.vercel.app
```

**Catat URL ini!** Akan digunakan di konfigurasi frontend.

### 1.5 Verifikasi Backend

Buka URL backend + `/health`:
```
https://cipherleaf-backend.vercel.app/health
```

Harus muncul:
```json
{
  "status": "ok",
  "service": "CipherLeaf API",
  "timestamp": "2026-05-19T..."
}
```

Test enkripsi via browser atau curl:
```
https://cipherleaf-backend.vercel.app/api/cipher/algorithms
```

---

## 🌐 Bagian 2 — Deploy Frontend ke Vercel

### 2.1 Buat Project Frontend di Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Klik **"Add New Project"**
3. Pilih repository **cipherleaf** yang sama → Klik **"Import"**

### 2.2 Konfigurasi Frontend

| Setting             | Nilai                |
|---------------------|----------------------|
| **Project Name**    | `cipherleaf`         |
| **Framework Preset**| `Vite`               |
| **Root Directory**  | `frontend`           |
| **Build Command**   | `npm run build`      |
| **Output Directory**| `dist`               |
| **Install Command** | `npm install`        |

### 2.3 Tambahkan Environment Variables Frontend

| Key                  | Value                                              |
|----------------------|----------------------------------------------------|
| `VITE_API_BASE_URL`  | `https://cipherleaf-backend.vercel.app/api`        |

> [!IMPORTANT]
> Ganti `cipherleaf-backend` dengan nama project backend kamu yang sebenarnya dari Vercel.

### 2.4 Deploy Frontend

Klik **"Deploy"** dan tunggu selesai.

URL frontend:
```
https://cipherleaf.vercel.app
```

### 2.5 Verifikasi Frontend

- [ ] Halaman Home tampil
- [ ] Navigasi ke `/encrypt` dan `/ascii` berfungsi
- [ ] Refresh di halaman `/encrypt` tidak 404

---

## 🔗 Bagian 3 — Update CORS Backend

Setelah URL frontend diketahui, update environment variable backend:

1. Buka [vercel.com](https://vercel.com) → Pilih project **cipherleaf-backend**
2. Masuk ke **Settings** → **Environment Variables**
3. Edit `ALLOWED_ORIGINS` → isi dengan URL frontend sebenarnya:
   ```
   https://cipherleaf.vercel.app
   ```
4. Klik **Save**
5. **Redeploy backend:** Masuk ke tab **Deployments** → klik **"..."** → **"Redeploy"**

---

## 🔄 Auto-Deploy Setelah Setup

Setelah semua tersambung, setiap push ke GitHub akan otomatis trigger deploy:

```
Edit kode → git add . && git commit -m "..." && git push
         → Vercel frontend auto-build ✅
         → Vercel backend auto-deploy ✅
```

---

## ⚠️ Perbedaan Serverless vs Server Biasa

Karena backend berjalan sebagai **Serverless Function** di Vercel, ada beberapa hal yang perlu diketahui:

| Fitur              | Server Biasa (Railway) | Vercel Serverless       |
|--------------------|------------------------|-------------------------|
| Selalu aktif       | ✅ Ya                  | ❌ Cold start ~100-500ms |
| Rate limit in-memory| ✅ Akurat             | ⚠️ Tidak akurat (stateless) |
| Timeout per request| Tidak terbatas         | 10 detik (hobby plan)   |
| Harga              | $5/bulan               | Gratis                  |

> [!NOTE]
> Untuk CipherLeaf, serverless sangat cocok karena:
> - Enkripsi/dekripsi selesai dalam milidetik
> - Tidak butuh state permanen
> - Traffic tidak terus-menerus (cold start tidak terasa)

---

## 🐛 Troubleshooting

### ❌ Halaman `/encrypt` atau `/ascii` menampilkan 404 saat refresh

**Solusi:** Pastikan `frontend/vercel.json` ada:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

### ❌ Error "CORS policy" di browser

**Penyebab:** `ALLOWED_ORIGINS` di backend belum diupdate ke URL frontend.

**Solusi:**
1. Buka project backend di Vercel
2. Settings → Environment Variables → edit `ALLOWED_ORIGINS`
3. Isi dengan URL frontend yang benar (tanpa trailing slash)
4. Redeploy backend

---

### ❌ API tidak merespons / loading terus

**Penyebab 1:** `VITE_API_BASE_URL` salah.

**Cek:** Buka browser DevTools → Network → lihat URL request API.

**Penyebab 2:** Cold start serverless (~500ms pertama kali).

**Solusi:** Tunggu sebentar, atau akses `/health` dulu untuk "memanaskan" function.

---

### ❌ Build frontend gagal di Vercel

**Cek lokal dulu:**
```bash
cd frontend
npm run build
```

Penyebab umum: environment variable `VITE_API_BASE_URL` tidak diset di Vercel.

---

### ❌ Backend Function Timeout (10 detik)

Ini tidak akan terjadi untuk CipherLeaf karena enkripsi selesai < 100ms.
Jika terjadi, berarti ada infinite loop di kode.

---

## 📋 Checklist Lengkap

### Backend Vercel
- [ ] Project dibuat dengan Root Directory = `backend`
- [ ] Framework Preset = `Other`
- [ ] Environment variables `NODE_ENV=production` sudah diset
- [ ] `ALLOWED_ORIGINS` sudah diisi URL frontend
- [ ] File `backend/vercel.json` ada di repo
- [ ] URL `/health` merespons `{ status: "ok" }`
- [ ] URL `/api/cipher/algorithms` mengembalikan 4 algoritma

### Frontend Vercel
- [ ] Project dibuat dengan Root Directory = `frontend`
- [ ] Framework Preset = `Vite`
- [ ] `VITE_API_BASE_URL` diisi URL backend Vercel + `/api`
- [ ] File `frontend/vercel.json` ada (untuk SPA routing)
- [ ] Semua halaman dapat diakses dan di-refresh tanpa 404

### Integrasi
- [ ] Enkripsi berhasil di halaman `/encrypt`
- [ ] Step visualizer muncul
- [ ] Tabel ASCII `/ascii` tampil 256 baris

---

## 🌍 URL Akhir

| Service          | URL                                          |
|------------------|----------------------------------------------|
| Frontend         | `https://cipherleaf.vercel.app`              |
| Backend          | `https://cipherleaf-backend.vercel.app`      |
| Health Check     | `https://cipherleaf-backend.vercel.app/health` |
| API Algorithms   | `https://cipherleaf-backend.vercel.app/api/cipher/algorithms` |

---

## 🗂️ File Konfigurasi yang Diperlukan

Pastikan file-file ini ada di repository sebelum deploy:

```
website-cyper/
├── frontend/
│   ├── vercel.json          ← SPA routing (rewrites)
│   └── .env.production      ← VITE_API_BASE_URL (opsional, bisa via Vercel UI)
└── backend/
    └── vercel.json          ← Serverless function config
```

---

*CipherLeaf v1.0 — Deployment Guide (All Vercel)*
