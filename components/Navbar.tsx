
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
    { name: 'Dashboard', href: '#admin', special: true },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string, special?: boolean) => {
    e.preventDefault();
    setIsOpen(false);

    if (special && id === '#admin') {
      onAdminClick();
      return;
    }

    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[160] transition-all duration-500 ${scrolled ? (isDark ? 'glass-dark py-3 md:py-4 shadow-2xl' : 'bg-white/80 backdrop-blur-md py-3 md:py-4 shadow-lg') : 'bg-transparent py-5 md:py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex items-center group cursor-pointer z-[170] pointer-events-auto"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mr-3 md:mr-4 shadow-2xl shadow-blue-600/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex items-center justify-center font-black text-white text-lg md:text-xl">A</div>
          <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter">
            AMI.DEV
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 z-[170]">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href, link.special)}
              whileHover={{ y: -3, scale: 1.05 }}
              className={`text-xs font-black tracking-[0.2em] uppercase transition-all cursor-pointer pointer-events-auto ${link.special
                ? 'text-emerald-600 dark:text-emerald-500 hover:text-emerald-700'
                : 'text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3.5 rounded-2xl glass hover:bg-blue-600/20 text-blue-600 dark:text-blue-500 transition-all shadow-lg border border-blue-500/10 pointer-events-auto"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4 z-[170]">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl glass text-blue-600 dark:text-blue-500 pointer-events-auto"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-800 dark:text-white pointer-events-auto"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 top-[70px] md:hidden border-t border-white/5 overflow-y-auto z-[150] ${isDark ? 'glass-dark bg-slate-950/95' : 'bg-white/95 backdrop-blur-lg'}`}
          >
            <div className="flex flex-col p-8 space-y-6 h-full pb-20">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href, link.special)}
                  className={`text-3xl font-black tracking-tight transition-colors pointer-events-auto ${link.special
                    ? 'text-emerald-600 dark:text-emerald-500 hover:text-emerald-700'
                    : 'text-slate-900 dark:text-white hover:text-blue-600'
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
