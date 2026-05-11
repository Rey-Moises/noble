/**
 * Footer - Site footer with navigation and social links
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Mail } from 'lucide-react';
import BarberPole from './BarberPole';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

const FOOTER_LINKS = ['Home', 'Services', 'Crew', 'Locations'];

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="w-full bg-bg-surface py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-10">
          <BarberPole />
          <span className="font-display text-4xl font-bold tracking-widest">NOBLE</span>
        </div>
        
        <div className="flex gap-10 mb-12">
          {FOOTER_LINKS.map((link) => (
            <button 
              key={link}
              onClick={() => scrollToSection(link.toLowerCase())}
              className="font-label text-xs text-text-muted hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex gap-8 mb-12">
          <a 
            href="https://facebook.com/NobleBarbersCavite" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-accent-primary transition-colors rounded-full"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="mailto:noblecavite@gmail.com" 
            className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-accent-primary transition-colors rounded-full"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p className="text-text-muted/40 font-label text-[10px] tracking-[0.5em]">
          STAY SHARP. LOOK BOLD. BE NOBLE.
        </p>
      </div>
    </footer>
  );
}