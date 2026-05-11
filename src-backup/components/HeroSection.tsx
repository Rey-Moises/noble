/**
 * HeroSection - Main hero with headline and CTA
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-[14vw] md:text-[10vw] font-display leading-[0.8] mb-8 tracking-tighter">
          BEYOND THE<br />HAIRCUT
        </h1>
        <p className="font-sans text-lg md:text-xl text-text-muted max-w-xl mx-auto mb-12 uppercase tracking-widest font-light">
          Premium Grooming. Traditional Craft. Master Barbers.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('services')}
            className="bg-accent-primary hover:bg-accent-hover text-white px-12 py-5 font-label tracking-widest text-lg transition-all"
          >
            EXPLORE SERVICES
          </button>
          <div className="flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 mt-4 md:mt-0">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-label text-sm">4.9 GOOGLE RATED</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}