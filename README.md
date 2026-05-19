# 🔐 CipherLeaf

> **Website enkripsi & dekripsi teks berbasis ASCII Extended (0–255)**
> Desain modern bertema _natural-tech_ dengan palet warna hijau organik.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)](https://nodejs.org/)

---

## ✨ Fitur Utama

- 🔐 **4 Algoritma Cipher** — Caesar, XOR, Vigenère, Affine (berbasis ASCII Extended mod 256)
- 🔓 **Enkripsi & Dekripsi** — Panel interaktif dengan mode switch yang mulus
- 📊 **Step Visualizer** — Visualisasi proses per karakter: `H(72) → +3 → 75 → K`
- 📋 **Tabel ASCII Extended** — 256 karakter dengan filter, toggle Hex/Dec/Bin, dan highlight
- 📋 **Copy to Clipboard** — Salin hasil dengan animasi konfirmasi ✓
- 📱 **Fully Responsive** — Mobile, tablet, dan desktop

---

## 🏗️ Struktur Proyek

```
website-cyper/
├── frontend/                    # React + Vite + TailwindCSS
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigasi sticky dengan logo
│   │   │   ├── HeroSection.jsx      # Hero dengan CTA buttons
│   │   │   ├── CipherPanel.jsx      # Panel enkripsi/dekripsi utama
│   │   │   ├── AlgorithmSelector.jsx # Tabs pilih metode cipher
│   │   │   ├── KeyInput.jsx         # Input kunci adaptif per algoritma
│   │   │   ├── OutputPanel.jsx      # Hasil dengan typewriter effect
│   │   │   ├── StepVisualizer.jsx   # Animasi proses per karakter
│   │   │   ├── AsciiTable.jsx       # Tabel ASCII 256 baris interaktif
│   │   │   ├── InfoSection.jsx      # Penjelasan algoritma
│   │   │   └── Footer.jsx           # Footer dark
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Halaman utama (/)
│   │   │   ├── Encrypt.jsx          # Halaman enkripsi (/encrypt)
│   │   │   └── AsciiReference.jsx   # Tabel ASCII (/ascii)
│   │   ├── hooks/
│   │   │   └── useCipher.js         # Custom hook logika enkripsi
│   │   ├── utils/
│   │   │   └── cipherUtils.js       # Fungsi cipher (Caesar/XOR/Vigenère/Affine)
│   │   ├── styles/
│   │   │   └── global.css           # Base styles & Google Fonts
│   │   └── App.jsx                  # Router + layout utama
│   ├── tailwind.config.js           # Custom design tokens CipherLeaf
│   ├── vite.config.js
│   └── package.json
│
├── backend/                     # Node.js + Express REST API
│   ├── src/
│   │   ├── routes/
│   │   │   └── cipher.routes.js     # Definisi endpoint API
│   │   ├── controllers/
│   │   │   └── cipher.controller.js # Handler request/response
│   │   ├── services/
│   │   │   └── cipher.service.js    # Logika cipher di server
│   │   ├── middleware/
│   │   │   ├── rateLimiter.js       # Rate limiting 100 req/menit
│   │   │   └── validator.js         # Validasi input request
│   │   └── app.js                   # Entry point Express
│   ├── .env                         # Environment variables
│   └── package.json
│
├── docs/
│   └── rancangan_website_enkripsi.md  # Dokumen desain lengkap
└── README.md                    # Dokumentasi ini
```

---

## ⚙️ Tech Stack

### Frontend
| Teknologi        | Versi  | Kegunaan                          |
|------------------|--------|-----------------------------------|
| React            | 18+    | UI Framework                      |
| Vite             | 5+     | Build tool & dev server           |
| React Router DOM | 6+     | Client-side routing               |
| Framer Motion    | 11+    | Animasi & transisi halus          |
| Axios            | 1+     | HTTP client ke backend            |
| TailwindCSS      | 3+     | Styling dengan custom design token|
| Lucide React     | latest | Icon library                      |

### Backend
| Teknologi          | Versi  | Kegunaan                          |
|--------------------|--------|-----------------------------------|
| Node.js            | 20+    | JavaScript runtime                |
| Express.js         | 4+     | Web framework REST API            |
| express-validator  | 7+     | Validasi input                    |
| express-rate-limit | 7+     | Rate limiting per IP              |
| cors               | 2+     | Cross-Origin Resource Sharing     |
| helmet             | 7+     | HTTP security headers             |
| dotenv             | 16+    | Environment variables             |

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint               | Deskripsi                          |
|--------|------------------------|------------------------------------|
| `POST` | `/cipher/encrypt`      | Enkripsi teks + steps per karakter |
| `POST` | `/cipher/decrypt`      | Dekripsi teks + steps per karakter |
| `GET`  | `/cipher/algorithms`   | Daftar algoritma tersedia          |
| `GET`  | `/ascii`               | Data lengkap ASCII 0–255           |
| `GET`  | `/ascii/:code`         | Detail satu karakter ASCII         |
| `POST` | `/cipher/validate-key` | Validasi kunci sebelum proses      |

### Contoh Request

```bash
curl -X POST http://localhost:5000/api/cipher/encrypt \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "algorithm": "caesar", "key": 3}'
```

```json
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

## 🚀 Cara Menjalankan Project

### Prerequisites
- **Node.js** v20+ ([download](https://nodejs.org/))
- **npm** v9+ (sudah termasuk dengan Node.js)
- **Git** ([download](https://git-scm.com/))

### 1. Clone / Buka Project

```bash
# Jika dari Git
git clone <repository-url>
cd website-cyper

# Atau langsung masuk ke folder project
cd d:\website-cyper
```

### 2. Setup & Jalankan Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Salin file environment
cp .env.example .env
# Edit .env sesuai kebutuhan (PORT, ALLOWED_ORIGINS)

# Jalankan server (development)
npm run dev

# Server berjalan di: http://localhost:5000
```

### 3. Setup & Jalankan Frontend

Buka terminal baru:

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Buka browser di: http://localhost:5173
```

### 4. Akses Aplikasi

| URL                              | Halaman               |
|----------------------------------|-----------------------|
| http://localhost:5173            | Home                  |
| http://localhost:5173/encrypt    | Enkripsi/Dekripsi     |
| http://localhost:5173/ascii      | Tabel ASCII Reference |
| http://localhost:5000/api/...    | Backend API           |

---

## 🔐 Algoritma yang Didukung

| Algoritma     | Kunci            | Rumus Enkripsi                              | Catatan                    |
|---------------|------------------|---------------------------------------------|----------------------------|
| Caesar        | int (1–255)      | `(ASCII(c) + key) mod 256`                  | Paling sederhana           |
| XOR           | int (1–255)      | `ASCII(c) XOR key`                          | Enkripsi = Dekripsi        |
| Vigenère      | string kata      | `(ASCII(c) + ASCII(key[i % len])) mod 256`  | Lebih kuat dari Caesar     |
| Affine        | int a, b         | `(a × ASCII(c) + b) mod 256`               | `a` harus coprime dgn 256  |

---

## 🎨 Design System

| Token            | Hex       | Penggunaan                          |
|------------------|-----------|-------------------------------------|
| `--cream`        | `#FEFAE8` | Background utama, card surface      |
| `--parchment`    | `#DDD9B0` | Secondary background, border        |
| `--forest`       | `#2E7D2E` | Tombol utama, heading, aksen        |
| `--deep-forest`  | `#1A4D1A` | Footer, shadow                      |
| `--moss`         | `#4A7C4A` | Hover state, secondary button       |

**Fonts:** Playfair Display (display) · DM Sans (body) · JetBrains Mono (code/table)

---

## 📦 Build untuk Production

```bash
# Frontend
cd frontend
npm run build
# Output: frontend/dist/

# Backend (langsung deploy source, tidak perlu build)
# Deploy ke Railway / Render / Vercel (serverless)
```

---

## 🚢 Deployment

| Layer    | Platform       | Tier Gratis |
|----------|----------------|-------------|
| Frontend | Vercel         | ✅ Ya       |
| Backend  | Railway/Render | ✅ Ya       |

---

## 📄 Lisensi

MIT License — bebas digunakan untuk proyek pendidikan dan portofolio.

---

*Dibuat dengan ❤️ — CipherLeaf v1.0*
