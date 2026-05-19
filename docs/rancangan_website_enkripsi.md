# 🔐 CipherLeaf — Rancangan Website Enkripsi & Dekripsi Teks

> Website enkripsi/dekripsi teks berbasis ASCII Extended dengan desain modern bertema **natural-tech** menggunakan palet warna hijau organik.

---

## 🎨 Design Identity

### Nama Produk
**CipherLeaf** — perpaduan antara "Cipher" (sandi) dan "Leaf" (daun), mencerminkan keamanan yang tumbuh secara alami.

### Palet Warna (dari referensi gambar)

| Nama Token       | Hex       | Penggunaan                            |
|------------------|-----------|---------------------------------------|
| `--cream`        | `#FEFAE8` | Background utama, card surface        |
| `--parchment`    | `#DDD9B0` | Secondary background, border halus    |
| `--forest`       | `#2E7D2E` | Tombol utama, heading, aksen          |
| `--deep-forest`  | `#1A4D1A` | Footer, dark mode base, shadow tone   |
| `--moss`         | `#4A7C4A` | Hover state, secondary button         |
| `--white`        | `#FFFFFF` | Teks di atas warna gelap              |

### Tipografi

| Peran         | Font               | Style               |
|---------------|--------------------|---------------------|
| Display/Title | `Playfair Display` | Bold, serif elegan  |
| Body/UI       | `DM Sans`          | Regular/Medium      |
| Monospace     | `JetBrains Mono`   | Kode & tabel ASCII  |

### Tone & Estetika
- **Refined Natural** — bersih, elegan, tidak berlebihan
- Nuansa seperti kertas perkamen bertemu terminal modern
- Sudut membulat lembut, shadow tipis, micro-animation halus
- Tidak ada efek neon atau gradien artifisial

---

## 🏗️ Struktur Proyek

```
cipherleaf/
├── frontend/                   # React App
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── CipherPanel.jsx       # Panel enkripsi/dekripsi utama
│   │   │   ├── AlgorithmSelector.jsx # Pilih metode cipher
│   │   │   ├── KeyInput.jsx          # Input kunci enkripsi
│   │   │   ├── OutputPanel.jsx       # Tampilan hasil
│   │   │   ├── AsciiTable.jsx        # Tabel ASCII Extended
│   │   │   ├── InfoSection.jsx       # Penjelasan algoritma
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Encrypt.jsx
│   │   │   └── AsciiReference.jsx
│   │   ├── hooks/
│   │   │   └── useCipher.js          # Custom hook logika enkripsi
│   │   ├── utils/
│   │   │   └── cipherUtils.js        # Fungsi enkripsi/dekripsi
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                    # Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   │   └── cipher.routes.js
│   │   ├── controllers/
│   │   │   └── cipher.controller.js
│   │   ├── services/
│   │   │   └── cipher.service.js     # Logika enkripsi di server
│   │   ├── middleware/
│   │   │   ├── rateLimiter.js
│   │   │   └── validator.js
│   │   └── app.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🖥️ Layout & Halaman

### 1. Halaman Utama (`/`)

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: [Logo CipherLeaf]  [Enkripsi] [ASCII] [?]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HERO SECTION                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │  "Enkripsi Teks, Sederhana & Aman"          │   │
│  │  Subtitle: Berbasis ASCII Extended 256      │   │
│  │  [Mulai Enkripsi] [Lihat Tabel ASCII]       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  FITUR CARDS (3 kolom)                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ 🔐 Enkripsi│  │ 🔓 Dekripsi│  │ 📊 ASCII │          │
│  │ Caesar   │  │ Otomatis │  │ Reference│          │
│  │ XOR, dll │  │ Deteksi  │  │ 256 Char │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 2. Halaman Enkripsi/Dekripsi (`/encrypt`)

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR                                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  PILIH ALGORITMA                                    │
│  [ Caesar Cipher ] [ XOR Cipher ] [ Vigenere ] [ Affine ] │
│                                                     │
│  ┌──────────────────────┬──────────────────────┐   │
│  │   INPUT TEKS         │   OUTPUT TEKS        │   │
│  │                      │                      │   │
│  │  Plain Text ▼        │  Ciphertext          │   │
│  │  ┌────────────────┐  │  ┌────────────────┐  │   │
│  │  │ Ketik di sini  │  │  │ Hasil muncul   │  │   │
│  │  │                │  │  │ di sini...     │  │   │
│  │  └────────────────┘  │  └────────────────┘  │   │
│  │                      │                      │   │
│  │  Kunci: [_________]  │  [📋 Copy] [⬇ Save] │   │
│  │                      │                      │   │
│  │  [🔐 ENKRIPSI]       │  [🔓 DEKRIPSI]       │   │
│  └──────────────────────┴──────────────────────┘   │
│                                                     │
│  VISUALISASI PROSES (animated step-by-step)         │
│  ┌─────────────────────────────────────────────┐   │
│  │  H(72) → +3 → 75 → K                       │   │
│  │  e(101) → +3 → 104 → h                     │   │
│  │  ...                                        │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 3. Halaman Tabel ASCII (`/ascii`)

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR                                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HEADER: "Tabel ASCII Extended (0–255)"             │
│                                                     │
│  FILTER BAR                                         │
│  [🔍 Cari karakter/kode] [Semua▼] [Hex|Dec|Bin]    │
│                                                     │
│  TABEL (font monospace, scrollable)                 │
│  ┌──────┬──────┬──────┬──────┬────────────────────┐│
│  │ Dec  │ Hex  │ Bin  │ Char │ Keterangan         ││
│  ├──────┼──────┼──────┼──────┼────────────────────┤│
│  │  0   │  00  │00000000│ NUL │ Null Character    ││
│  │  1   │  01  │00000001│ SOH │ Start of Heading  ││
│  │  ...                                           ││
│  │  65  │  41  │01000001│  A  │ Uppercase A       ││
│  │  ...                                           ││
│  │  255 │  FF  │11111111│  ÿ  │ Latin Small Y     ││
│  └──────┴──────┴──────┴──────┴────────────────────┘│
│                                                     │
│  Klik baris = highlight & tampilkan detail karakter │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ⚙️ Teknologi Stack

### Frontend — React

| Teknologi        | Versi    | Kegunaan                              |
|------------------|----------|---------------------------------------|
| React            | 18+      | UI Framework                          |
| Vite             | 5+       | Build tool, dev server cepat          |
| React Router DOM | 6+       | Client-side routing                   |
| Framer Motion    | 11+      | Animasi halus & transisi              |
| Axios            | 1+       | HTTP client ke backend                |
| TailwindCSS      | 3+       | Utility-first styling (dengan custom token) |
| Lucide React     | latest   | Icon library ringan                   |

### Backend — Node.js + Express ✅ (Rekomendasi)

> **Mengapa Node.js + Express?**
> - Ekosistem JavaScript yang sama dengan frontend (mudah dipelajari)
> - Sangat ringan dan cepat untuk REST API sederhana
> - npm package melimpah
> - Mudah di-deploy ke Vercel, Railway, Render (gratis)

| Teknologi        | Versi    | Kegunaan                              |
|------------------|----------|---------------------------------------|
| Node.js          | 20+      | Runtime JavaScript server             |
| Express.js       | 4+       | Web framework minimalis               |
| express-validator| 7+       | Validasi input request                |
| express-rate-limit| 7+      | Batasi request berlebihan             |
| cors             | 2+       | Handle CORS untuk React               |
| dotenv           | 16+      | Manajemen environment variable        |
| helmet           | 7+       | Security headers HTTP                 |

> **Alternatif lain yang bisa dipertimbangkan:**
> - **FastAPI (Python)** → Jika kamu lebih familiar Python; auto-docs dengan Swagger
> - **Hono.js** → Ultra-ringan, cocok untuk edge/serverless
> - **NestJS** → Jika proyek berkembang besar, butuh struktur enterprise

---

## 🔌 API Endpoint (Backend)

### Base URL: `http://localhost:5000/api`

| Method | Endpoint              | Deskripsi                         |
|--------|-----------------------|-----------------------------------|
| `POST` | `/cipher/encrypt`     | Enkripsi teks dengan algoritma    |
| `POST` | `/cipher/decrypt`     | Dekripsi teks                     |
| `GET`  | `/cipher/algorithms`  | Daftar algoritma tersedia         |
| `GET`  | `/ascii`              | Seluruh data tabel ASCII (0-255)  |
| `GET`  | `/ascii/:code`        | Detail satu karakter ASCII        |
| `POST` | `/cipher/validate-key`| Validasi kunci sebelum proses     |

### Contoh Request & Response

**POST `/cipher/encrypt`**
```json
// Request Body
{
  "text": "Hello",
  "algorithm": "caesar",
  "key": 3
}

// Response
{
  "success": true,
  "data": {
    "original": "Hello",
    "result": "Khoor",
    "algorithm": "caesar",
    "key": 3,
    "steps": [
      { "char": "H", "ascii": 72, "processed": 75, "result": "K" },
      { "char": "e", "ascii": 101, "processed": 104, "result": "h" }
    ]
  }
}
```

---

## 🔐 Algoritma yang Didukung

### 1. Caesar Cipher
- **Kunci:** Angka integer (1–255)
- **Rumus:** `(ASCII(c) + key) mod 256`
- **Cocok untuk:** Pemula, demonstrasi

### 2. XOR Cipher
- **Kunci:** Angka integer (1–255) atau string
- **Rumus:** `ASCII(c) XOR key`
- **Keistimewaan:** Reversible (enkripsi = dekripsi dengan kunci sama)

### 3. Vigenère Cipher (Extended ASCII)
- **Kunci:** String kata (misal: "kunci")
- **Rumus:** `(ASCII(c) + ASCII(key[i % len(key)])) mod 256`
- **Keamanan:** Lebih kuat dari Caesar

### 4. Affine Cipher
- **Kunci:** Dua angka `a` dan `b`; `a` harus coprime dengan 256
- **Rumus:** `(a * ASCII(c) + b) mod 256`
- **Dekripsi:** `a_inv * (ASCII(c) - b) mod 256`

---

## 🎭 Komponen UI Utama

### `<CipherPanel />`
Komponen inti dengan dua textarea (input & output), selector algoritma, dan tombol aksi. Menggunakan state lokal React + custom hook `useCipher`.

### `<AlgorithmSelector />`
Tabs horizontal dengan ikon untuk setiap algoritma. Animasi slide saat berganti mode.

### `<StepVisualizer />`
Menampilkan proses karakter per karakter dengan animasi staggered. Setiap langkah menunjukkan: **Karakter → Nilai ASCII → Operasi → Hasil**.

### `<AsciiTable />`
Tabel dengan 256 baris, fitur:
- Filter real-time berdasarkan karakter, decimal, atau hex
- Toggle tampilan: Decimal / Hex / Binary
- Highlight baris saat diklik
- Warna berbeda untuk kelompok karakter (control chars, printable, extended)

### `<KeyInput />`
Input adaptif: angka untuk Caesar/XOR/Affine, string untuk Vigenère. Dilengkapi validator real-time.

---

## 🎬 Animasi & Interaksi

| Elemen              | Animasi                                          |
|---------------------|--------------------------------------------------|
| Halaman load        | Fade-in staggered (hero → cards → footer)        |
| Tombol Enkripsi     | Scale bounce + warna berubah saat hover          |
| Output teks         | Karakter muncul satu per satu (typewriter effect)|
| Step visualizer     | Slide-in dari kiri, delay bertahap              |
| Tabel ASCII row     | Highlight pulse saat klik                        |
| Copy to clipboard   | Tombol berubah menjadi ✓ selama 2 detik          |
| Mode switch         | Smooth slide antara Enkripsi ↔ Dekripsi          |

---

## 🔒 Keamanan & Validasi

- **Rate Limiting:** Maks 100 request/menit per IP (express-rate-limit)
- **Input Sanitization:** Strip karakter berbahaya sebelum diproses
- **Max Length:** Teks input dibatasi 10.000 karakter
- **CORS:** Hanya izinkan origin frontend yang terdaftar
- **Helmet.js:** Set security headers (X-XSS-Protection, dll)
- **Validasi Kunci:** Cek range kunci sesuai algoritma yang dipilih

---

## 📱 Responsivitas

| Breakpoint | Layout                                       |
|------------|----------------------------------------------|
| Mobile (<768px)  | Panel input/output stack vertikal, tabel ASCII scroll horizontal |
| Tablet (768–1024px) | Side-by-side dengan proporsi 50/50        |
| Desktop (>1024px)   | Layout penuh dengan step visualizer di bawah |

---

## 🗂️ Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (`.env`)
```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

---

## 🚀 Deployment

| Layer    | Platform Rekomendasi | Tier Gratis |
|----------|----------------------|-------------|
| Frontend | **Vercel**           | ✅ Ya        |
| Backend  | **Railway** / Render | ✅ Ya        |
| Domain   | Custom domain        | Opsional     |

---

## 📋 Urutan Pengembangan (Development Roadmap)

### Phase 1 — Foundation (Week 1–2)
- [x] Setup proyek React + Vite + TailwindCSS
- [x] Setup backend Express.js
- [x] Implementasi Caesar Cipher (Frontend + Backend)
- [x] Layout dasar CipherPanel

### Phase 2 — Core Features (Week 3–4)
- [ ] Implementasi XOR, Vigenère, Affine Cipher
- [ ] Tabel ASCII Extended lengkap dengan filter
- [ ] Step Visualizer animasi
- [ ] Responsive design

### Phase 3 — Polish (Week 5)
- [ ] Micro-animations dengan Framer Motion
- [ ] Copy to clipboard, export hasil
- [ ] Loading states & error handling
- [ ] Optimasi performa

### Phase 4 — Launch (Week 6)
- [ ] Deploy ke Vercel + Railway
- [ ] Testing cross-browser
- [ ] Dokumentasi

---

*Dibuat dengan ❤️ — CipherLeaf v1.0 Design Spec*
