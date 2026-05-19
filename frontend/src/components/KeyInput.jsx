import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { isCoprime256 } from '../utils/cipherUtils';

export default function KeyInput({ algorithm, value, onChange }) {
  if (algorithm === 'caesar' || algorithm === 'xor') {
    const num = parseInt(value, 10);
    const isValid = !isNaN(num) && num >= 1 && num <= 255;
    return (
      <div>
        <label className="block text-xs font-semibold text-moss uppercase tracking-wider mb-2">
          {algorithm === 'caesar' ? 'Shift Key (1–255)' : 'XOR Key (1–255)'}
        </label>
        <div className="relative">
          <input
            type="number"
            min={1}
            max={255}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`cipher-input w-full pr-9 ${!isValid && value !== '' ? 'border-red-300 focus:border-red-400' : ''}`}
            placeholder="Masukkan angka 1–255"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {value !== '' && (
              isValid
                ? <CheckCircle2 size={16} className="text-forest" />
                : <AlertCircle size={16} className="text-red-400" />
            )}
          </div>
        </div>
        {!isValid && value !== '' && (
          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <AlertCircle size={12} /> Kunci harus antara 1–255
          </p>
        )}
      </div>
    );
  }

  if (algorithm === 'vigenere') {
    const isValid = value && value.trim().length > 0;
    return (
      <div>
        <label className="block text-xs font-semibold text-moss uppercase tracking-wider mb-2">
          Kata Kunci (string)
        </label>
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`cipher-input w-full pr-9 ${!isValid && value !== '' ? 'border-red-300' : ''}`}
            placeholder="Contoh: kunci123"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {value !== '' && (
              isValid
                ? <CheckCircle2 size={16} className="text-forest" />
                : <AlertCircle size={16} className="text-red-400" />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (algorithm === 'affine') {
    const affineVal = typeof value === 'object' ? value : { a: 5, b: 8 };
    const aNum = parseInt(affineVal.a, 10);
    const bNum = parseInt(affineVal.b, 10);
    const aValid = !isNaN(aNum) && isCoprime256(aNum);
    const bValid = !isNaN(bNum) && bNum >= 0 && bNum <= 255;

    return (
      <div>
        <label className="block text-xs font-semibold text-moss uppercase tracking-wider mb-2">
          Kunci Affine (a, b)
        </label>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <input
                type="number"
                value={affineVal.a}
                onChange={(e) => onChange({ ...affineVal, a: e.target.value })}
                className={`cipher-input w-full pr-9 ${!aValid ? 'border-red-300' : ''}`}
                placeholder="a (coprime 256)"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {aValid ? <CheckCircle2 size={16} className="text-forest" /> : <AlertCircle size={16} className="text-red-400" />}
              </div>
            </div>
            {!aValid && (
              <p className="text-[11px] text-red-500 mt-1">a harus coprime dgn 256 (mis: 3,5,7,9,11...)</p>
            )}
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="number"
                min={0}
                max={255}
                value={affineVal.b}
                onChange={(e) => onChange({ ...affineVal, b: e.target.value })}
                className={`cipher-input w-full pr-9 ${!bValid ? 'border-red-300' : ''}`}
                placeholder="b (0–255)"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {bValid ? <CheckCircle2 size={16} className="text-forest" /> : <AlertCircle size={16} className="text-red-400" />}
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-moss/70 mt-2">
          Rumus enkripsi: <span className="font-mono text-deep-forest">(a × ASCII + b) mod 256</span>
        </p>
      </div>
    );
  }

  return null;
}
