import { motion } from 'framer-motion';
import AsciiTable from '../components/AsciiTable';
import Footer from '../components/Footer';

export default function AsciiReference() {
  return (
    <main>
      <div className="section-container py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-deep-forest mb-2">
            Tabel ASCII Extended
          </h1>
          <p className="text-moss max-w-xl">
            256 karakter ASCII (0–255) dengan nilai Decimal, Hexadecimal, dan Binary.
            Klik baris untuk melihat detail lengkap karakter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AsciiTable />
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
