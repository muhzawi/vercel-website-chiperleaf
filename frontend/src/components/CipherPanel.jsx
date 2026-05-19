import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Trash2, AlertCircle } from 'lucide-react';
import AlgorithmSelector from './AlgorithmSelector';
import KeyInput from './KeyInput';
import OutputPanel from './OutputPanel';

export default function CipherPanel({ useCipherHook }) {
  const {
    text, setText,
    algorithm, setAlgorithm,
    key, setKey,
    mode, setMode,
    result, steps,
    error, isProcessing,
    keyValidation,
    runProcess, clear,
  } = useCipherHook;

  return (
    <div className="space-y-6">
      {/* Algorithm Selector */}
      <AlgorithmSelector selected={algorithm} onSelect={setAlgorithm} />

      {/* Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex bg-parchment/60 rounded-2xl p-1 gap-1">
          {['encrypt', 'decrypt'].map((m) => (
            <motion.button
              key={m}
              onClick={() => setMode(m)}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-200
                ${mode === m
                  ? 'bg-forest text-white shadow-leaf'
                  : 'text-moss hover:text-deep-forest'
                }`}
            >
              {m === 'encrypt' ? <Lock size={15} /> : <Unlock size={15} />}
              {m === 'encrypt' ? 'Enkripsi' : 'Dekripsi'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Key Input */}
      <div className="card">
        <KeyInput algorithm={algorithm} value={key} onChange={setKey} />
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm"
          >
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input / Output Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-moss uppercase tracking-wider">
              {mode === 'encrypt' ? '📝 Teks Asli (Plaintext)' : '🔒 Ciphertext'}
            </label>
            <div className="flex items-center gap-2">
              {text && (
                <span className="text-xs font-mono text-moss/60">{text.length} / 10.000</span>
              )}
              {text && (
                <button onClick={clear} className="btn-ghost p-1 text-red-400 hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={10000}
            rows={8}
            className="cipher-textarea flex-1 min-h-[200px]"
            placeholder={mode === 'encrypt'
              ? 'Ketik atau tempel teks yang ingin dienkripsi...'
              : 'Tempel ciphertext yang ingin didekripsi...'
            }
          />
          {/* Process Button */}
          <motion.button
            onClick={runProcess}
            disabled={!text || !keyValidation.valid || isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`btn-primary w-full flex items-center justify-center gap-2
              ${(!text || !keyValidation.valid) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {mode === 'encrypt'
              ? <><Lock size={16} /> Enkripsi</>
              : <><Unlock size={16} /> Dekripsi</>
            }
          </motion.button>
        </div>

        {/* Output */}
        <div className="card">
          <OutputPanel result={result} algorithm={algorithm} mode={mode} />
        </div>
      </div>
    </div>
  );
}
