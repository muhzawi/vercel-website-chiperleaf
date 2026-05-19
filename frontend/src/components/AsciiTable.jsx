import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { generateAsciiTable } from '../utils/cipherUtils';

const ASCII_DATA = generateAsciiTable();

const GROUP_STYLES = {
  control: 'bg-red-50/60 text-red-700',
  printable: 'bg-emerald-50/60 text-emerald-700',
  extended: 'bg-amber-50/40 text-amber-700',
};

const DISPLAY_MODES = ['DEC', 'HEX', 'BIN'];

export default function AsciiTable() {
  const [query, setQuery] = useState('');
  const [displayMode, setDisplayMode] = useState('DEC');
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterGroup, setFilterGroup] = useState('all');

  const filtered = useMemo(() => {
    let data = ASCII_DATA;
    if (filterGroup !== 'all') data = data.filter(r => r.group === filterGroup);
    if (!query.trim()) return data;
    const q = query.toLowerCase().trim();
    return data.filter(r =>
      r.decimal.toString().includes(q) ||
      r.hex.toLowerCase().includes(q) ||
      r.binary.includes(q) ||
      r.char.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  }, [query, filterGroup]);

  const handleRowClick = useCallback((row) => {
    setSelectedRow(prev => prev?.decimal === row.decimal ? null : row);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-moss/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="cipher-input w-full pl-9 pr-9"
              placeholder="Cari karakter, kode dec, hex, atau nama..."
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-moss/60 hover:text-forest"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Group Filter */}
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            className="cipher-input"
          >
            <option value="all">Semua Kelompok</option>
            <option value="control">Control (0–31, 127)</option>
            <option value="printable">Printable (32–126)</option>
            <option value="extended">Extended (128–255)</option>
          </select>

          {/* Display Mode Toggle */}
          <div className="flex rounded-lg border border-parchment overflow-hidden">
            {DISPLAY_MODES.map((m) => (
              <button
                key={m}
                onClick={() => setDisplayMode(m)}
                className={`px-3 py-2 text-xs font-semibold font-mono transition-colors duration-150
                  ${displayMode === m
                    ? 'bg-forest text-white'
                    : 'bg-cream text-moss hover:bg-parchment'
                  }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {['control','printable','extended'].map(g => (
            <span key={g} className={`badge text-xs ${GROUP_STYLES[g]}`}>
              {g.charAt(0).toUpperCase() + g.slice(1)}: {ASCII_DATA.filter(r => r.group === g).length}
            </span>
          ))}
          <span className="text-xs text-moss ml-auto">{filtered.length} hasil</span>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedRow && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-forest/30 border-2 bg-forest/5"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-forest">Detail Karakter</h3>
            <button onClick={() => setSelectedRow(null)} className="btn-ghost p-1">
              <X size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-sm">
            <div><span className="text-xs text-moss block mb-1">Karakter</span>
              <span className="font-bold text-deep-forest text-2xl">{selectedRow.char}</span></div>
            <div><span className="text-xs text-moss block mb-1">Decimal</span>
              <span className="font-bold text-deep-forest">{selectedRow.decimal}</span></div>
            <div><span className="text-xs text-moss block mb-1">Hexadecimal</span>
              <span className="font-bold text-deep-forest">0x{selectedRow.hex}</span></div>
            <div><span className="text-xs text-moss block mb-1">Binary</span>
              <span className="font-bold text-deep-forest text-xs">{selectedRow.binary}</span></div>
          </div>
          <p className="text-sm text-moss mt-3">{selectedRow.description}</p>
        </motion.div>
      )}

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead className="bg-parchment/60 border-b border-parchment sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-moss uppercase tracking-wider">Dec</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-moss uppercase tracking-wider">Hex</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-moss uppercase tracking-wider">
                  {displayMode === 'BIN' ? 'Binary' : displayMode === 'HEX' ? 'Hex' : 'Dec'}
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-moss uppercase tracking-wider">Char</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-moss uppercase tracking-wider">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.decimal}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i, 10) * 0.02 }}
                  onClick={() => handleRowClick(row)}
                  className={`border-b border-parchment/40 cursor-pointer transition-colors duration-100
                    ${selectedRow?.decimal === row.decimal
                      ? 'bg-forest/10 border-forest/20'
                      : 'hover:bg-parchment/40'
                    }`}
                >
                  <td className="px-4 py-2.5 text-deep-forest font-semibold">{row.decimal}</td>
                  <td className="px-4 py-2.5 text-moss">{row.hex}</td>
                  <td className="px-4 py-2.5 text-moss">
                    {displayMode === 'BIN' ? row.binary
                      : displayMode === 'HEX' ? row.hex
                      : row.decimal}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`badge text-xs ${GROUP_STYLES[row.group]}`}>
                      {row.char}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-moss/80 text-xs font-sans">{row.description}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-moss">
              <Search size={32} className="mx-auto mb-3 opacity-30" />
              <p>Tidak ada karakter yang cocok dengan pencarian "<strong>{query}</strong>"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
