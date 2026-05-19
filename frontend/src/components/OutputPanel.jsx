import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, Check } from 'lucide-react';

export default function OutputPanel({ result, algorithm, mode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = result;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  const handleSave = useCallback(() => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cipherleaf_${mode}_${algorithm}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, algorithm, mode]);

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-moss uppercase tracking-wider">
          {mode === 'encrypt' ? '🔒 Hasil Enkripsi' : '🔓 Hasil Dekripsi'}
        </label>
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <motion.button
            onClick={handleCopy}
            disabled={!result}
            whileTap={{ scale: 0.93 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200
              ${result
                ? 'bg-forest/10 text-forest hover:bg-forest hover:text-white'
                : 'text-parchment cursor-not-allowed'
              }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check size={13} /> Tersalin!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Copy size={13} /> Salin
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Save Button */}
          <motion.button
            onClick={handleSave}
            disabled={!result}
            whileTap={{ scale: 0.93 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200
              ${result
                ? 'bg-forest/10 text-forest hover:bg-forest hover:text-white'
                : 'text-parchment cursor-not-allowed'
              }`}
          >
            <Download size={13} /> Simpan
          </motion.button>
        </div>
      </div>

      {/* Output Textarea */}
      <div className="relative flex-1">
        <textarea
          readOnly
          value={result}
          rows={8}
          className="cipher-textarea w-full h-full min-h-[200px] resize-none bg-white/60"
          placeholder={result ? '' : 'Hasil akan muncul di sini...'}
        />
        {!result && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-moss/40 text-sm font-mono text-center">
              {mode === 'encrypt'
                ? '← Ketik teks dan masukkan kunci'
                : '← Tempel ciphertext untuk dekripsi'}
            </p>
          </div>
        )}
      </div>

      {/* Char count */}
      {result && (
        <div className="text-right text-xs text-moss/60 font-mono">
          {result.length} karakter
        </div>
      )}
    </div>
  );
}
