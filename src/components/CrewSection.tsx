import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ScrambleHeading from './ScrambleHeading';
import BarberPole from './BarberPole';
import CursorFollower from './CursorFollower';

const EASE = [0.76, 0, 0.24, 1] as const;

// Hero + grid — no duplicates
const HERO_IMG   = '/crewimage-1.jpg';
const GRID_IMGS  = ['/crewimage-2.jpg', '/crewimage-3.jpg'];

// Individual barbers — re-drop kew/xap/jun/em.webp into /public/ to show portraits
const BARBERS = [
  { name: 'Barber Kew', role: 'Master Barber', img: '/kew.webp' },
  { name: 'Barber Xap', role: 'Master Barber', img: '/xap.webp' },
  { name: 'Barber Jun', role: 'Master Barber', img: '/jun.webp' },
  { name: 'Barber Em',  role: 'Master Barber', img: '/em.webp'  },
];

export default function CrewSection() {
  const heroRef = useRef(null);
  const [heroActive, setHeroActive]   = useState(false);
  const [activeGrid, setActiveGrid]   = useState<Set<number>>(new Set());
  const [activeBarber, setActiveBarber] = useState<Set<number>>(new Set());

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const toggleGrid = (i: number) =>
    setActiveGrid(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const toggleBarber = (i: number) =>
    setActiveBarber(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <section id="crew" className="max-w-7xl mx-auto px-6 mb-40" aria-label="Our crew">

      {/* ── Header ── */}
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
            United by the craft, driven by excellence. Our barbers are more than
            just professionals — they are a family dedicated to welcoming every
            client into the fold.
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

      {/* ── Hero group shot ── */}
      <motion.div
        ref={heroRef}
        className="w-full aspect-[21/9] overflow-hidden border border-white/[0.04] bg-bg-surface group relative rounded-[1.5rem] shadow-2xl mb-4 cursor-pointer"
        initial={{ clipPath: 'inset(15% 5% 15% 5%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        onClick={() => setHeroActive(a => !a)}
      >
        <motion.img
          src={HERO_IMG}
          className={`w-full h-[120%] object-cover transition-all duration-1000 ease-out
            ${heroActive ? 'grayscale-0 brightness-100' : 'grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100'}`}
          alt="Noble Barbers Crew"
          loading="lazy" decoding="async" width={1400} height={600}
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8, ease: EASE }}>
            <h3 className="font-display text-4xl md:text-7xl mb-2 tracking-tight">UNITED BY THE BLADE</h3>
            <p className="font-label text-[10px] tracking-[0.4em] text-accent-primary">The Noble Collective Core</p>
          </motion.div>
        </div>
        <div className={`absolute top-4 right-4 md:hidden transition-opacity duration-300 ${heroActive ? 'opacity-0' : 'opacity-60'}`}>
          <span className="font-label text-[8px] tracking-widest text-white/50 bg-black/40 px-2 py-1">TAP</span>
        </div>
      </motion.div>

      {/* ── 2-photo crew grid ── */}
      <CursorFollower images={GRID_IMGS.map((url, i) => ({ url, label: `Noble Crew #${i + 2}` }))}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {GRID_IMGS.map((img, idx) => {
            const active = activeGrid.has(idx);
            return (
              <motion.div
                key={idx}
                className="aspect-[4/3] overflow-hidden border border-white/[0.04] bg-bg-surface group relative rounded-[1.5rem] cursor-pointer"
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, margin: '120px' }}
                transition={{ duration: 1, ease: EASE, delay: idx * 0.12 }}
                onClick={() => toggleGrid(idx)}
              >
                <img
                  src={img}
                  className={`w-full h-full object-cover transition-all duration-700
                    ${active ? 'grayscale-0 brightness-100 scale-105' : 'grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105'}`}
                  alt={`Noble Barbers crew ${idx + 2}`}
                  loading="lazy" decoding="async" width={600} height={450}
                />
                <div className={`absolute inset-0 bg-accent-primary/10 transition-opacity pointer-events-none ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                <div className={`absolute bottom-6 right-6 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  <BarberPole className="scale-75" />
                </div>
                <div className={`absolute top-3 right-3 md:hidden transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-60'}`}>
                  <span className="font-label text-[8px] tracking-widest text-white/50 bg-black/40 px-2 py-1">TAP</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CursorFollower>

      {/* ── Master Barbers ── */}
      <div className="mb-12">
        <motion.div
          className="flex items-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <span className="font-label text-accent-primary text-[10px] tracking-[0.4em] block mb-1">THE BLADES BEHIND THE CRAFT</span>
            <h3 className="font-display text-4xl md:text-5xl tracking-tight">MASTER BARBERS</h3>
          </div>
          <div className="flex-1 h-[1px] bg-white/5" />
        </motion.div>

        <CursorFollower images={BARBERS.map(b => ({ url: b.img, label: b.name }))}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BARBERS.map((barber, idx) => {
              const active = activeBarber.has(idx);
              return (
                <motion.a
                  key={barber.name}
                  href="https://noblebarberscc.setmore.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-[3/4] overflow-hidden border border-white/[0.04] bg-bg-surface group relative rounded-[1.5rem] cursor-pointer block"
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: '120px' }}
                  transition={{ duration: 1, ease: EASE, delay: idx * 0.1 }}
                >
                  <img
                    src={barber.img}
                    className={`w-full h-full object-cover object-top transition-all duration-700
                      ${active ? 'grayscale-0 brightness-100 scale-105' : 'grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105'}`}
                    alt={barber.name}
                    loading="lazy" decoding="async" width={400} height={533}
                  />

                  {/* Always-visible name strip */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent pt-12 pb-5 px-5">
                    <p className="font-display text-xl md:text-2xl tracking-wide leading-none">{barber.name}</p>
                    <p className={`font-label text-[9px] tracking-[0.3em] mt-1 transition-colors duration-300
                      ${active ? 'text-accent-primary' : 'text-text-muted/50 group-hover:text-accent-primary'}`}>
                      {barber.role}
                    </p>
                  </div>

                  {/* Accent overlay */}
                  <div className={`absolute inset-0 bg-accent-primary/10 transition-opacity pointer-events-none ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                  {/* BarberPole badge */}
                  <div className={`absolute top-4 right-4 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    <BarberPole className="scale-75" />
                  </div>

                  {/* Book hint */}
                  <div className="absolute top-3 left-3 md:hidden opacity-60">
                    <span className="font-label text-[8px] tracking-widest text-white/50 bg-black/40 px-2 py-1">BOOK</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </CursorFollower>
      </div>

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
