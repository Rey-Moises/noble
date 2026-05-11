import { motion } from 'motion/react';
import { Facebook, Mail, ArrowUpRight } from 'lucide-react';
import BarberPole from './BarberPole';
import MarqueeText from './MarqueeText';
import ScrambleHeading from './ScrambleHeading';
import MagneticButton from './MagneticButton';

const EASE = [0.76, 0, 0.24, 1] as const;
const FOOTER_LINKS = ['Home', 'Services', 'Crew', 'Locations'];

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="w-full bg-bg-base relative z-20" role="contentinfo">
      {/* Big CTA section */}
      <div className="border-t border-white/5 py-32 md:py-40 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.span
            className="font-label text-[10px] tracking-[0.4em] text-accent-primary block mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            READY?
          </motion.span>
          <ScrambleHeading as="h2" className="text-6xl md:text-[10vw] font-display tracking-tighter leading-[0.85] justify-center mb-12">
            BOOK YOUR SEAT
          </ScrambleHeading>
          <MagneticButton>
            <motion.a
              href="https://noblebarberscc.setmore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent-primary hover:bg-accent-hover text-white px-16 py-6 font-label tracking-[0.2em] text-sm transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            >
              BOOK APPOINTMENT
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </MagneticButton>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-y border-white/5 py-6 overflow-hidden">
        <MarqueeText
          text="STAY SHARP • LOOK BOLD • BE NOBLE"
          className="font-display text-3xl md:text-5xl text-white/[0.03] tracking-[0.2em]"
          speed={35}
        />
      </div>

      {/* Footer content */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 mb-10">
            <BarberPole />
            <span className="font-display text-3xl font-bold tracking-[0.1em]">NOBLE</span>
          </div>

          <div className="flex gap-10 mb-10">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                className="font-label text-[10px] text-text-muted/40 hover:text-text-primary transition-colors duration-300"
                data-cursor-hover
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mb-12">
            <a
              href="https://facebook.com/NobleBarbersCavite"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 border border-white/[0.06] flex items-center justify-center hover:bg-accent-primary hover:border-accent-primary transition-all duration-300 rounded-full"
              aria-label="Facebook"
              data-cursor-hover
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="mailto:noblecavite@gmail.com"
              className="w-11 h-11 border border-white/[0.06] flex items-center justify-center hover:bg-accent-primary hover:border-accent-primary transition-all duration-300 rounded-full"
              aria-label="Email"
              data-cursor-hover
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="section-divider w-24 mb-8" />

          <p className="text-text-muted/20 font-label text-[9px] tracking-[0.5em]">
            STAY SHARP. LOOK BOLD. BE NOBLE.
          </p>
        </div>
      </div>
    </footer>
  );
}
