if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/cipher.routes');

// Rate limiter - optional, skip jika gagal di serverless
let limiter;
try {
  limiter = require('./middleware/rateLimiter').limiter;
} catch (e) {
  console.warn('[WARN] Rate limiter tidak tersedia:', e.message);
  limiter = (req, res, next) => next(); // fallback: no-op
}

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security (skip helmet di serverless untuk menghindari konflik header) ────
// app.use(helmet()); // dinonaktifkan sementara untuk troubleshooting Vercel

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} tidak diizinkan oleh CORS`));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
app.use('/api', limiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', routes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CipherLeaf API', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} tidak ditemukan` });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Terjadi kesalahan server' : err.message,
  });
});

// ─── Start (development only) ─────────────────────────────────────────────────
// Di Vercel serverless, app.listen() tidak dipanggil.
// Vercel menggunakan `module.exports = app` sebagai handler.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🔐 CipherLeaf API running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Allowed origins: ${allowedOrigins.join(', ')}\n`);
  });
}

module.exports = app;
