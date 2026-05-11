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

/**
 * Desktop  → magnetic pull toward cursor (spring-based)
 * Mobile   → spring press-down + ripple from touch point
 */
export default function MagneticButton({ children, className = '', strength = 0.32 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  /* ── Desktop: magnetic ── */
  const mx = useSpring(0, { stiffness: 260, damping: 22, mass: 0.5 });
  const my = useSpring(0, { stiffness: 260, damping: 22, mass: 0.5 });

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  /* ── Touch: ripple ── */
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = ref.current!.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [
      ...prev,
      { id, x: touch.clientX - rect.left, y: touch.clientY - rect.top },
    ]);
    // clean up after animation
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  };

  /* ── Shared ── */
  const wrapperStyle = isFinePointer ? { x: mx, y: my } : {};

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`}
      style={wrapperStyle}
      /* Touch: spring press-down on tap */
      whileTap={!isFinePointer ? { scale: 0.93 } : undefined}
      transition={{ type: 'spring', stiffness: 420, damping: 14 }}
      onMouseMove={isFinePointer ? onMouseMove : undefined}
      onMouseLeave={isFinePointer ? onMouseLeave : undefined}
      onTouchStart={!isFinePointer ? onTouchStart : undefined}
    >
      {children}

      {/* Ripple circles — touch only */}
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
