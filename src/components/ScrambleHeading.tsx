import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&?';
const EASE = [0.76, 0, 0.24, 1] as const;

interface Props {
  children: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** If provided, entry animation waits for this to be true instead of inView */
  trigger?: boolean;
  delay?: number;
}

export default function ScrambleHeading({
  children,
  as: Tag = 'h2',
  className = '',
  trigger,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' });
  const visible = trigger !== undefined ? trigger : inView;

  const text = children;
  // display mirrors text.split('') — spaces stay spaces, other chars scramble
  const [display, setDisplay] = useState<string[]>(() => text.split(''));
  // indices of chars that just settled (briefly rendered gold)
  const [gold, setGold] = useState<Set<number>>(new Set());
  const raf = useRef<number>(0);

  const scramble = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const chars = text.split('');
    let progress = 0;

    // Flash all non-space chars to random instantly
    setDisplay(chars.map(c => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])));

    const tick = () => {
      progress += 0.5;
      const floor = Math.floor(progress);

      const next = chars.map((c, i) => {
        if (c === ' ') return ' ';
        if (i < floor) return c;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      // Gold sweep: the last 2 chars that just settled
      const g = new Set<number>();
      chars.forEach((c, i) => {
        if (c !== ' ' && i >= floor - 2 && i < floor) g.add(i);
      });

      setDisplay(next);
      setGold(g);

      if (progress <= chars.length + 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(chars);
        setGold(new Set());
      }
    };

    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
      onMouseEnter={scramble}
    >
      {text.split('').map((char, i) =>
        char === ' ' ? (
          // Space: always visible, not scrambled
          <span key={i} className="inline-block w-[0.28em]" />
        ) : (
          // Non-space: entry slide-up + scramble
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              style={{
                color: gold.has(i) ? '#C17A3A' : 'inherit',
                transition: 'color 0.12s ease-out',
              }}
              initial={{ y: '110%', opacity: 0 }}
              animate={visible ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: delay + i * 0.022 }}
            >
              {display[i] ?? char}
            </motion.span>
          </span>
        )
      )}
    </Tag>
  );
}
