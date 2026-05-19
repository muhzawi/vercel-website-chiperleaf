import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Table2, HelpCircle, Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/encrypt', label: 'Enkripsi', icon: Lock },
    { to: '/ascii', label: 'ASCII', icon: Table2 },
    { to: '/about', label: 'Tentang', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/90 glass border-b border-parchment shadow-parchment">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center shadow-leaf transition-transform duration-200 group-hover:scale-110">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-deep-forest tracking-tight">
              Cipher<span className="text-forest">Leaf</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? 'algo-tab-active' : 'algo-tab'
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden btn-ghost p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden pb-4 flex flex-col gap-1"
          >
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'algo-tab-active' : 'algo-tab'
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}
