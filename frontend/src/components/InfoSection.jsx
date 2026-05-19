import { motion } from 'framer-motion';
import { Lock, Zap, Key, Hash, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALGORITHMS_INFO = [
  {
    id: 'caesar',
    icon: Lock,
    name: 'Caesar Cipher',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconBg: 'bg-emerald-100',
    description: 'Algoritma klasik yang menggeser nilai ASCII setiap karakter sebesar kunci (shift). Mudah dipahami dan cocok untuk pemula.',
    formula: '(ASCII(c) + key) mod 256',
    difficulty: 'Pemula',
    keyExample: 'key = 3',
  },
  {
    id: 'xor',
    icon: Zap,
    name: 'XOR Cipher',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    iconBg: 'bg-blue-100',
    description: 'Operasi bitwise XOR antara nilai ASCII dan kunci. Keistimewaannya: proses enkripsi sama dengan dekripsi jika kunci sama.',
    formula: 'ASCII(c) XOR key',
    difficulty: 'Pemula',
    keyExample: 'key = 42',
  },
  {
    id: 'vigenere',
    icon: Key,
    name: 'Vigenère Cipher',
    color: 'bg-amber-50 text-amber-700 border-amber-100',
    iconBg: 'bg-amber-100',
    description: 'Menggunakan kata kunci string yang diulang untuk menggeser tiap karakter. Lebih kuat dari Caesar karena polialfabetik.',
    formula: '(ASCII(c) + ASCII(key[i % len])) mod 256',
    difficulty: 'Menengah',
    keyExample: 'key = "kunci"',
  },
  {
    id: 'affine',
    icon: Hash,
    name: 'Affine Cipher',
    color: 'bg-rose-50 text-rose-700 border-rose-100',
    iconBg: 'bg-rose-100',
    description: 'Transformasi linear menggunakan dua parameter a dan b. Kunci a harus coprime dengan 256 agar bisa didekripsi.',
    formula: '(a × ASCII(c) + b) mod 256',
    difficulty: 'Lanjutan',
    keyExample: 'a = 5, b = 8',
  },
];

export default function InfoSection() {
  return (
    <section className="py-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-forest mb-3">
            Algoritma yang Didukung
          </h2>
          <p className="text-moss max-w-xl mx-auto">
            Semua algoritma menggunakan ASCII Extended (0–255) dengan operasi mod 256,
            sehingga mendukung seluruh karakter dalam satu byte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ALGORITHMS_INFO.map((algo, i) => {
            const Icon = algo.icon;
            return (
              <motion.div
                key={algo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`card-hover border ${algo.color}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${algo.iconBg}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">{algo.name}</h3>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/60">
                        {algo.difficulty}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed mb-3">{algo.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs font-mono bg-white/60 px-2 py-1 rounded-lg border border-current/10">
                        {algo.formula}
                      </code>
                    </div>
                    <p className="text-xs opacity-60 mt-2 font-mono">Contoh: {algo.keyExample}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link to="/encrypt" className="btn-primary inline-flex items-center gap-2">
            Coba Semua Algoritma <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
