import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import BarberPole from './BarberPole';

const EASE = [0.76, 0, 0.24, 1] as const;
const NAV_ITEMS = ['Services', 'Gallery', 'Crew', 'Locations'];

interface HeaderProps {
  isScrolled: boolean;
  scrollToSection: (id: string) => void;
}

export default function Header({ isScrolled, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (item: string) => {
    scrollToSection(item.toLowerCase());
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-bg-base/70 backdrop-blur-2xl py-3 border-b border-white/5'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="group-hover:scale-110 transition-transform duration-500">
              <BarberPole />
            </div>

            {/* Logo: "Noble Barbershop" at top → "NOBLE" once scrolled */}
            <div className="relative overflow-hidden flex items-center" style={{ minWidth: '5rem' }}>
              <AnimatePresence mode="wait" initial={false}>
                {!isScrolled ? (
                  <motion.span
                    key="full"
                    className="block font-sans text-[11px] tracking-[0.35em] font-light uppercase whitespace-nowrap"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    Noble Barbershop
                  </motion.span>
                ) : (
                  <motion.span
                    key="short"
                    className="block font-display text-3xl tracking-[0.08em]"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    NOBLE
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Accent underline */}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="font-label text-[11px] text-text-muted hover:text-text-primary transition-colors duration-300 relative group/nav"
                data-cursor-hover
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent-primary scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
            <a
              href="https://noblebarberscc.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-accent-primary text-white px-8 py-3 font-label text-[11px] transition-all overflow-hidden group/cta"
              data-cursor-hover
            >
              <span className="relative z-10">BOOK NOW</span>
              <div className="absolute inset-0 bg-accent-hover translate-y-full group-hover/cta:translate-y-0 transition-transform duration-400" />
            </a>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-[100] bg-bg-base flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-display text-3xl font-bold tracking-widest">NOBLE</span>
              <button
                className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-6 flex-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="font-display text-6xl text-left pb-4 hover:text-accent-primary transition-colors border-b border-white/5"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, ease: EASE }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            <a
              href="https://noblebarberscc.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-primary text-white py-6 text-center font-display text-2xl tracking-widest"
            >
              BOOK APPOINTMENT
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
