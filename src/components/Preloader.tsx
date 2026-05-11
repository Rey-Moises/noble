import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BarberPole from './BarberPole';

const EASE = [0.76, 0, 0.24, 1] as const;

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const alreadyRan = sessionStorage.getItem('noble-loaded') === '1';
  const [phase, setPhase] = useState<'reveal' | 'hold' | 'exit' | 'done'>(alreadyRan ? 'done' : 'reveal');
  const finish = useCallback(() => {
    setPhase('done');
    sessionStorage.setItem('noble-loaded', '1');
    document.body.style.overflow = '';
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (alreadyRan) {
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 1000);
    const t3 = setTimeout(finish, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [finish, alreadyRan, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[200] bg-bg-base flex flex-col items-center justify-center"
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Barber pole accent */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
          >
            <BarberPole className="scale-150" />
          </motion.div>

          {/* Brand name */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[18vw] md:text-[12vw] leading-none tracking-tighter"
              initial={{ y: '120%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              NOBLE
            </motion.h1>
          </div>

          {/* Tagline */}
          <div className="overflow-hidden mt-4">
            <motion.p
              className="font-label text-[10px] md:text-xs tracking-[0.5em] text-text-muted"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
            >
              PREMIUM GROOMING STUDIO
            </motion.p>
          </div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-16 w-24 h-[1px] bg-white/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full bg-accent-primary"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
