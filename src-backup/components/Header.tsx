/**
 * Header - Navigation header with mobile menu
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import BarberPole from './BarberPole';

interface HeaderProps {
  isScrolled: boolean;
  scrollToSection: (id: string) => void;
}

const NAV_ITEMS = ['Services', 'Gallery', 'Crew', 'Locations'];

export default function Header({ isScrolled, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (item: string) => {
    scrollToSection(item.toLowerCase());
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-bg-base/80 backdrop-blur-xl py-3 border-b border-white/5" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="group-hover:scale-110 transition-transform">
              <BarberPole />
            </div>
            <span className="font-display text-4xl font-bold tracking-[0.05em] border-b-2 border-transparent group-hover:border-accent-primary transition-all">
              NOBLE
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="font-label text-sm text-text-muted hover:text-accent-primary transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
            <a 
              href="https://noblebarberscc.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-primary hover:bg-accent-hover text-white px-8 py-3 font-label text-sm transition-all shadow-lg"
            >
              BOOK NOW
            </a>
          </nav>

          <button 
            className="md:hidden text-white" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-bg-base flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display text-4xl font-bold tracking-widest">NOBLE</span>
              <button 
                className="w-12 h-12 bg-white flex items-center justify-center rounded-full"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-bg-base" />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="font-display text-6xl text-left border-b border-white/5 pb-4 hover:text-accent-primary transition-colors"
                >
                  {item}
                </button>
              ))}
              <a 
                href="https://noblebarberscc.setmore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 bg-accent-primary text-white py-6 text-center font-display text-3xl tracking-widest"
              >
                BOOK APPOINTMENT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}