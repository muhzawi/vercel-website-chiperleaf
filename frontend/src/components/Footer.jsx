import { Leaf, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-deep-forest text-white/80 mt-20">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-forest rounded-lg flex items-center justify-center">
                <Leaf size={14} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">CipherLeaf</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Website enkripsi & dekripsi teks berbasis ASCII Extended. 
              Belajar kriptografi dengan cara yang mudah dan visual.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/encrypt" className="text-white/60 hover:text-white transition-colors">Enkripsi / Dekripsi</Link></li>
              <li><Link to="/ascii" className="text-white/60 hover:text-white transition-colors">Tabel ASCII</Link></li>
            </ul>
          </div>

          {/* Algorithms */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Algoritma</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Caesar Cipher</li>
              <li>XOR Cipher</li>
              <li>Vigenère Cipher</li>
              <li>Affine Cipher</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} CipherLeaf v1.0 — Dibuat dengan ❤️
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            Open Source
          </a>
        </div>
      </div>
    </footer>
  );
}
