import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Table2, ArrowRight, ShieldCheck } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-forest/6 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-parchment/80 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="section-container relative"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <span className="badge-forest px-4 py-1.5 text-sm font-medium">
            <ShieldCheck size={14} />
            ASCII Extended 0–255
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-display text-4xl md:text-6xl font-bold text-center text-deep-forest leading-tight mb-4"
        >
          Enkripsi Teks,{' '}
          <br />
          <span className="text-gradient">Sederhana &amp; Aman</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-center text-moss text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Pelajari kriptografi klasik dengan visualisasi proses karakter per karakter.
          Caesar, XOR, Vigenère, dan Affine Cipher — semua dalam satu tempat.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/encrypt" className="btn-primary flex items-center justify-center gap-2 text-base">
            <Lock size={18} />
            Mulai Enkripsi
            <ArrowRight size={16} />
          </Link>
          <Link to="/ascii" className="btn-secondary flex items-center justify-center gap-2 text-base">
            <Table2 size={18} />
            Lihat Tabel ASCII
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto text-center"
        >
          {[
            { value: '256', label: 'Karakter ASCII' },
            { value: '4', label: 'Algoritma Cipher' },
            { value: '∞', label: 'Panjang Teks' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-display text-2xl font-bold text-forest">{value}</div>
              <div className="text-xs text-moss mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
