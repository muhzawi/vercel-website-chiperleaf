import { motion } from 'framer-motion';
import CipherPanel from '../components/CipherPanel';
import StepVisualizer from '../components/StepVisualizer';
import Footer from '../components/Footer';
import { useCipher } from '../hooks/useCipher';
import { ALGORITHMS } from '../components/AlgorithmSelector';

export default function Encrypt() {
  const cipher = useCipher();
  const algoInfo = ALGORITHMS.find(a => a.id === cipher.algorithm);

  return (
    <main>
      <div className="section-container py-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-deep-forest mb-2">
            Enkripsi &amp; Dekripsi
          </h1>
          <p className="text-moss max-w-lg mx-auto">
            Pilih algoritma, masukkan kunci dan teks, lalu lihat hasil beserta visualisasi proses.
          </p>
        </motion.div>

        {/* Cipher Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CipherPanel useCipherHook={cipher} />
        </motion.div>

        {/* Step Visualizer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: cipher.steps.length > 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <StepVisualizer
            steps={cipher.steps}
            algorithm={algoInfo?.fullName || cipher.algorithm}
            mode={cipher.mode}
          />
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
