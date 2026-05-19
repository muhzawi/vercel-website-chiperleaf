import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function StepVisualizer({ steps, algorithm, mode }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? steps : steps.slice(0, 5);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="card mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-deep-forest text-sm">Visualisasi Proses</h3>
          <p className="text-xs text-moss mt-0.5">
            {steps.length} karakter · {mode === 'encrypt' ? 'Enkripsi' : 'Dekripsi'} · {algorithm}
          </p>
        </div>
        {steps.length > 5 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn-ghost text-xs flex items-center gap-1"
          >
            {expanded ? <><ChevronUp size={14} /> Ringkas</> : <><ChevronDown size={14} /> Tampilkan semua ({steps.length})</>}
          </button>
        )}
      </div>

      {/* Header */}
      <div className="grid grid-cols-5 text-[11px] font-semibold text-moss uppercase tracking-wider mb-2 px-3">
        <span>#</span>
        <span>Karakter</span>
        <span>ASCII (Dec)</span>
        <span>Operasi</span>
        <span>Hasil</span>
      </div>

      <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {visible.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i, 5) * 0.05 }}
              className="grid grid-cols-5 items-center gap-2 px-3 py-2 rounded-lg
                bg-cream hover:bg-parchment/60 transition-colors duration-100
                font-mono text-xs text-deep-forest"
            >
              <span className="text-moss/60">{i + 1}</span>
              <span className="font-semibold text-forest">
                {step.char === ' ' ? <span className="text-moss/40">SPC</span> : `'${step.char}'`}
              </span>
              <span>{step.ascii}</span>
              <span className="flex items-center gap-1 text-moss">
                <ArrowRight size={10} />
                {step.operation}
                <ArrowRight size={10} />
                {step.processed}
              </span>
              <span className="font-semibold text-forest">
                {step.result === ' ' ? <span className="text-moss/40">SPC</span> : `'${step.result}'`}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!expanded && steps.length > 5 && (
        <p className="text-center text-xs text-moss/50 mt-3 font-mono">
          ... dan {steps.length - 5} karakter lainnya
        </p>
      )}
    </div>
  );
}
