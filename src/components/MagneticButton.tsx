import { useRef, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const isFinePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

export default function MagneticButton({ children, className = '', strength = 0.28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* ── Desktop: slow slewed magnetic pull ── */
  // High damping + low stiffness = lazy, buttery follow — not snappy/messy
  const config = { stiffness: 120, damping: 28, mass: 1.2 };
  const mx = useSpring(0, config);
  const my = useSpring(0, config);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  /* ── Touch: spring press + ripple ── */
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = ref.current!.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [
      ...prev,
      { id, x: touch.clientX - rect.left, y: touch.clientY - rect.top },
    ]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  };

  const wrapperStyle = isFinePointer ? { x: mx, y: my } : {};

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        ...wrapperStyle,
        // Drop shadow — lifts on hover
        filter: hovered
          ? 'drop-shadow(0 12px 32px rgba(0,0,0,0.55)) drop-shadow(0 4px 12px rgba(139,90,43,0.25))'
          : 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))',
        transition: 'filter 0.5s ease',
      }}
      whileTap={!isFinePointer ? { scale: 0.93 } : undefined}
      transition={{ type: 'spring', stiffness: 420, damping: 14 }}
      onMouseMove={isFinePointer ? onMouseMove : undefined}
      onMouseEnter={isFinePointer ? onMouseEnter : undefined}
      onMouseLeave={isFinePointer ? onMouseLeave : undefined}
      onTouchStart={!isFinePointer ? onTouchStart : undefined}
    >
      {children}

      {/* Ripple — touch only */}
      {!isFinePointer && (
        <AnimatePresence>
          {ripples.map(r => (
            <motion.span
              key={r.id}
              className="pointer-events-none absolute rounded-full bg-white/25"
              style={{
                left: r.x,
                top: r.y,
                width: 10,
                height: 10,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 14, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
