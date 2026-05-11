import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ScrambleHeading from './ScrambleHeading';
import BarberPole from './BarberPole';
import CursorFollower from './CursorFollower';

const EASE = [0.76, 0, 0.24, 1] as const;

const CREW_IMAGES = [
  '/crewimage-1.jpg',
  '/crewimage-1.jpg',
  '/crewimage-2.jpg',
  '/crewimage-3.jpg',
];

export default function CrewSection() {
  const heroRef = useRef(null);
  const [heroActive, setHeroActive] = useState(false);
  const [activeCards, setActiveCards] = useState<Set<number>>(new Set());

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const toggleCard = (idx: number) =>
    setActiveCards(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });

  return (
    <section id="crew" className="max-w-7xl mx-auto px-6 mb-40" aria-label="Our crew">

      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <motion.span
            className="font-label text-accent-primary text-[10px] tracking-[0.4em] mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            THE BROTHERHOOD
          </motion.span>
          <ScrambleHeading as="h2" className="text-7xl md:text-8xl font-display tracking-tight mb-6">
            MEET THE CREW
          </ScrambleHeading>
          <motion.p
            className="text-text-muted text-lg font-light leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          >
            United by the craft, driven by excellence. Our barbers are more than just professionals; they are a family dedicated to welcoming every client into the fold.
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-4 text-accent-primary opacity-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <BarberPole />
          <div className="w-24 h-[1px] bg-white/20" />
        </motion.div>
      </div>

      {/* Main hero image — tap-to-reveal on touch */}
      <motion.div
        ref={heroRef}
        className="w-full aspect-[21/9] overflow-hidden border border-white/[0.04] bg-bg-surface group relative rounded-[1.5rem] shadow-2xl mb-8 cursor-pointer"
        initial={{ clipPath: 'inset(15% 5% 15% 5%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        onClick={() => setHeroActive(a => !a)}
      >
        <motion.img
          src={CREW_IMAGES[0]}
          className={`w-full h-[120%] object-cover transition-all duration-1000 ease-out
            ${heroActive
              ? 'grayscale-0 brightness-100'
              : 'grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100'
            }`}
          alt="Noble Barbers Crew"
          loading="lazy"
          decoding="async"
          width={1400}
          height={600}
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          >
            <h3 className="font-display text-4xl md:text-7xl mb-2 tracking-tight">UNITED BY THE BLADE</h3>
            <p className="font-label text-[10px] tracking-[0.4em] text-accent-primary">The Noble Collective Core</p>
          </motion.div>
        </div>
        {/* Tap hint */}
        <div className={`absolute top-4 right-4 md:hidden transition-opacity duration-300 ${heroActive ? 'opacity-0' : 'opacity-60'}`}>
          <span className="font-label text-[8px] tracking-widest text-white/50 bg-black/40 px-2 py-1">TAP</span>
        </div>
      </motion.div>

      {/* Grid — image follower on desktop, whileInView per card */}
      <CursorFollower
        images={CREW_IMAGES.slice(1).map((url, i) => ({ url, label: `Noble Crew #${i + 2}` }))}
      >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CREW_IMAGES.slice(1).map((img, idx) => {
          const active = activeCards.has(idx);
          return (
            <motion.div
              key={idx}
              className="aspect-[4/3] overflow-hidden border border-white/[0.04] bg-bg-surface group relative rounded-[1.5rem] cursor-pointer"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '120px' }}
              transition={{ duration: 1, ease: EASE, delay: idx * 0.12 }}
              onClick={() => toggleCard(idx)}
            >
              <img
                src={img}
                className={`w-full h-full object-cover transition-all duration-700
                  ${active
                    ? 'grayscale-0 brightness-100 scale-105'
                    : 'grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105'
                  }`}
                alt={`Noble Barbers crew ${idx + 2}`}
                loading="lazy"
                decoding="async"
                width={600}
                height={450}
              />
              {/* Accent overlay */}
              <div className={`absolute inset-0 bg-accent-primary/10 transition-opacity pointer-events-none
                ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              />
              {/* BarberPole badge */}
              <div className={`absolute bottom-6 right-6 transition-all duration-500
                ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}
              >
                <BarberPole className="scale-75" />
              </div>
              {/* Tap hint */}
              <div className={`absolute top-3 right-3 md:hidden transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-60'}`}>
                <span className="font-label text-[8px] tracking-widest text-white/50 bg-black/40 px-2 py-1">TAP</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      </CursorFollower>

      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-text-muted/30 font-label text-[9px] tracking-[0.8em] uppercase">
          Built on Respect • Driven by Passion • Noble Family
        </p>
      </motion.div>
    </section>
  );
}
