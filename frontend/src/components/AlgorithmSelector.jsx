import { motion } from 'framer-motion';
import { Lock, Zap, Key, Hash } from 'lucide-react';

const ALGORITHMS = [
  {
    id: 'caesar',
    name: 'Caesar',
    fullName: 'Caesar Cipher',
    icon: Lock,
    description: 'Geser ASCII +key',
    difficulty: 'Pemula',
    difficultyColor: 'text-green-600 bg-green-50',
  },
  {
    id: 'xor',
    name: 'XOR',
    fullName: 'XOR Cipher',
    icon: Zap,
    description: 'Operasi bitwise XOR',
    difficulty: 'Pemula',
    difficultyColor: 'text-green-600 bg-green-50',
  },
  {
    id: 'vigenere',
    name: 'Vigenère',
    fullName: 'Vigenère Cipher',
    icon: Key,
    description: 'Kunci string berulang',
    difficulty: 'Menengah',
    difficultyColor: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'affine',
    name: 'Affine',
    fullName: 'Affine Cipher',
    icon: Hash,
    description: 'Transformasi linear a,b',
    difficulty: 'Lanjutan',
    difficultyColor: 'text-red-600 bg-red-50',
  },
];

export { ALGORITHMS };

export default function AlgorithmSelector({ selected, onSelect }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ALGORITHMS.map((algo) => {
          const Icon = algo.icon;
          const isActive = selected === algo.id;
          return (
            <motion.button
              key={algo.id}
              onClick={() => onSelect(algo.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center
                transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'border-forest bg-forest text-white shadow-leaf-lg'
                  : 'border-parchment bg-white text-deep-forest hover:border-moss hover:shadow-leaf'
                }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${isActive ? 'bg-white/20' : 'bg-forest/8'}`}>
                <Icon size={20} className={isActive ? 'text-white' : 'text-forest'} />
              </div>
              <div>
                <div className="font-semibold text-sm">{algo.name}</div>
                <div className={`text-xs mt-0.5 ${isActive ? 'text-white/70' : 'text-moss'}`}>
                  {algo.description}
                </div>
              </div>
              {/* Difficulty badge */}
              <span className={`absolute top-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full
                ${isActive ? 'bg-white/20 text-white' : algo.difficultyColor}`}>
                {algo.difficulty}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
