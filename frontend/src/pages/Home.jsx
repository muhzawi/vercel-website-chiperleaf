import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import Footer from '../components/Footer';
import { Lock, Unlock, Table2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Lock,
    title: 'Enkripsi',
    desc: 'Caesar, XOR, Vigenère, Affine — semua dengan visualisasi proses step-by-step.',
    color: 'bg-forest/8 text-forest',
    to: '/encrypt',
  },
  {
    icon: Unlock,
    title: 'Dekripsi',
    desc: 'Otomatis mendeteksi mode dekripsi. Masukkan ciphertext dan kunci, hasilkan plaintext.',
    color: 'bg-moss/8 text-moss',
    to: '/encrypt',
  },
  {
    icon: Table2,
    title: 'ASCII Reference',
    desc: 'Tabel 256 karakter ASCII Extended lengkap dengan filter, Hex/Dec/Bin toggle.',
    color: 'bg-parchment text-deep-forest',
    to: '/ascii',
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Feature Cards */}
      <section className="py-8">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                >
                  <Link to={f.to} className="card-hover block group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-semibold text-deep-forest text-lg mb-2 group-hover:text-forest transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-moss text-sm leading-relaxed">{f.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <InfoSection />
      <Footer />
    </main>
  );
}
