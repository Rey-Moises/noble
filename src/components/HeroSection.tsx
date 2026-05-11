import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import ScrambleHeading from './ScrambleHeading';
import MagneticButton from './MagneticButton';

const EASE = [0.76, 0, 0.24, 1] as const;

interface HeroSectionProps {
  loaded: boolean;
  scrollToSection: (id: string) => void;
}

export default function HeroSection({ loaded, scrollToSection }: HeroSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative" aria-label="Hero">
      <motion.div style={{ y: textY, opacity: textOpacity }}>

        <ScrambleHeading
          as="h1"
          trigger={loaded}
          className="text-[12vw] md:text-[10vw] font-display leading-[0.85] mb-6 tracking-tighter justify-center"
        >
          BEYOND THE HAIRCUT
        </ScrambleHeading>

        {/* Subtitle */}
        <div className="overflow-hidden mb-12">
          <motion.p
            className="font-sans text-base md:text-lg text-text-muted uppercase tracking-[0.3em] font-light"
            initial={{ y: '100%', opacity: 0 }}
            animate={loaded ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          >
            Premium Grooming. Traditional Craft. Master Barbers.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.6 }}
        >
          <MagneticButton>
            <button
              onClick={() => scrollToSection('services')}
              className="relative bg-accent-primary hover:bg-accent-hover text-white px-14 py-5 font-label tracking-[0.2em] text-sm transition-all overflow-hidden group"
            >
              <span className="relative z-10">EXPLORE SERVICES</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <div className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="font-label text-[11px] tracking-wider">4.9 GOOGLE RATED</span>
            </div>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.2 }}
      >
        <span className="font-label text-[9px] tracking-[0.4em] text-text-muted/50">SCROLL</span>
        <motion.div
          className="w-[1px] h-8 bg-white/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
