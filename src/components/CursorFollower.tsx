import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';

// Only activate on devices with a real pointer (not touch)
const isFinePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

interface Image {
  url: string;
  label: string;
}

interface Props {
  images: Image[];
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a section and shows a floating image that follows the cursor.
 * Cycles through the provided images while the mouse is inside.
 * Only renders on desktop (pointer: fine).
 */
export default function CursorFollower({ images, children, className = '' }: Props) {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);
  const lastX = useRef(0);

  const springX = useSpring(rawX, { stiffness: 130, damping: 20, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 130, damping: 20, mass: 0.8 });

  // Tilt based on horizontal velocity — snaps back when mouse slows
  const rotate = useSpring(0, { stiffness: 160, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const dx = e.clientX - lastX.current;
    rotate.set(dx * 0.6);
    lastX.current = e.clientX;
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  // Cycle image every 800ms while visible
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 800);
    return () => clearInterval(t);
  }, [visible, images.length]);

  if (!isFinePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => { setVisible(false); rotate.set(0); }}
      onMouseMove={onMove}
    >
      {children}

      {/* Floating image — fixed so it lives in the viewport layer */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed pointer-events-none z-[9000] overflow-hidden shadow-2xl"
            style={{
              x: springX,
              y: springY,
              translateX: '-50%',
              translateY: '-105%',
              rotate,
              width: 210,
              height: 270,
            }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Image crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={images[idx].url}
                alt={images[idx].label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>

            {/* Label strip */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="font-label text-[9px] tracking-[0.25em] text-white/80 uppercase">
                {images[idx].label}
              </span>
            </div>

            {/* Frame border */}
            <div className="absolute inset-0 border border-white/20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
