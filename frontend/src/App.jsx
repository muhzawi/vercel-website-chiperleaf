import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Encrypt from './pages/Encrypt';
import AsciiReference from './pages/AsciiReference';
import './styles/global.css';

function NotFound() {
  return (
    <div className="section-container py-32 text-center">
      <div className="font-display text-8xl font-bold text-parchment mb-4">404</div>
      <h1 className="font-display text-2xl text-deep-forest mb-3">Halaman tidak ditemukan</h1>
      <p className="text-moss mb-8">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
      <a href="/" className="btn-primary inline-flex">Kembali ke Beranda</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encrypt" element={<Encrypt />} />
          <Route path="/ascii" element={<AsciiReference />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
