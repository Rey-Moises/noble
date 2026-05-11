import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

// Pivot point in the 24×24 viewBox where the two blades cross
const PIVOT = { x: 14, y: 12 };
// Rendered size (3× the 24px viewBox)
const SIZE = 72;
// Pivot in rendered px — used for CSS transformOrigin
const ORIGIN = `${(PIVOT.x / 24) * SIZE}px ${(PIVOT.y / 24) * SIZE}px`;

const EASE = [0.76, 0, 0.24, 1] as const;

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springX = useSpring(cursorX, { stiffness: 380, damping: 30, mass: 0.45 });
  const springY = useSpring(cursorY, { stiffness: 380, damping: 30, mass: 0.45 });

  const onMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!visible) setVisible(true);
  }, [cursorX, cursorY, visible]);

  useEffect(() => {
    if (!isFinePointer) return;

    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor-hover], input, textarea, select'))
        setIsHovering(true);
    };
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor-hover], input, textarea, select'))
        setIsHovering(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseout', out, { passive: true });
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [onMove]);

  if (!isFinePointer) return null;

  return (
    <div aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: springX,
          y: springY,
          // Keep the pivot (blade crossing) at the cursor hotspot
          translateX: `${-(PIVOT.x / 24) * SIZE}px`,
          translateY: `${-(PIVOT.y / 24) * SIZE}px`,
          rotate: -20,
        }}
        animate={{ opacity: visible ? 1 : 0, scale: isHovering ? 1.15 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="sc-sh" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor="#000" floodOpacity="0.75" />
            </filter>
          </defs>

          <g filter="url(#sc-sh)">
            {/*
              Upper arm — upper ring (5.5, 6.5) + blade that runs
              from upper-left to lower-right: M22 17.9705 L8.65 7.98
              Opens by rotating CW around pivot
            */}
            <motion.g
              style={{ transformOrigin: ORIGIN }}
              animate={{ rotate: isHovering ? 14 : 5 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <path
                d="M5.5 10C7.433 10 9 8.433 9 6.5C9 4.567 7.433 3 5.5 3C3.567 3 2 4.567 2 6.5C2 8.433 3.567 10 5.5 10Z"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 17.9705L8.65002 7.98047"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>

            {/*
              Lower arm — lower ring (5.5, 17.5) + blade that runs
              from upper-right to lower-left: M22 6 L8.65 15.98
              Opens by rotating CCW around pivot
            */}
            <motion.g
              style={{ transformOrigin: ORIGIN }}
              animate={{ rotate: isHovering ? -14 : -5 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <path
                d="M5.5 21C7.433 21 9 19.433 9 17.5C9 15.567 7.433 14 5.5 14C3.567 14 2 15.567 2 17.5C2 19.433 3.567 21 5.5 21Z"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 6L8.65002 15.98"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Pivot screw — gold accent on top of both blades */}
            <circle cx={PIVOT.x} cy={PIVOT.y} r="2.2" fill="#8B5A2B" />
            <circle cx={PIVOT.x} cy={PIVOT.y} r="1.1" fill="#C17A3A" />
            <circle cx={PIVOT.x - 0.4} cy={PIVOT.y - 0.45} r="0.4" fill="rgba(255,255,255,0.5)" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
