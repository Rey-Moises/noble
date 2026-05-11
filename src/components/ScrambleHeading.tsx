import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

const CHARS = 'NOBLEBARBERSHOP';
const EASE = [0.76, 0, 0.24, 1] as const;

interface Props {
  children: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
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
  const [display, setDisplay] = useState<string[]>(() => text.split(''));
  const [gold, setGold] = useState<Set<number>>(new Set());
  const raf = useRef<number>(0);

  const scramble = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const chars = text.split('');
    let progress = 0;

    setDisplay(chars.map(c => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])));

    const tick = () => {
      progress += 0.5;
      const floor = Math.floor(progress);

      const next = chars.map((c, i) => {
        if (c === ' ') return ' ';
        if (i < floor) return c;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

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

  // Split into words so flex-wrap never breaks mid-word
  const words = text.split(' ');

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
      onMouseEnter={scramble}
    >
      {words.map((word, wi) => {
        // flat index of first char of this word inside text.split('')
        const flatStart = words.slice(0, wi).reduce((acc, w) => acc + w.length + 1, 0);

        return (
          <span key={wi} style={{ display: 'inline-flex' }}>
            {word.split('').map((char, ci) => {
              const fi = flatStart + ci; // flat index into display[]
              return (
                <span key={ci} className="overflow-hidden inline-block">
                  <motion.span
                    className="inline-block"
                    style={{
                      color: gold.has(fi) ? '#C17A3A' : 'inherit',
                      transition: 'color 0.12s ease-out',
                    }}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={visible ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                    transition={{ duration: 0.75, ease: EASE, delay: delay + fi * 0.022 }}
                  >
                    {display[fi] ?? char}
                  </motion.span>
                </span>
              );
            })}

            {/* Space between words */}
            {wi < words.length - 1 && (
              <span className="inline-block w-[0.28em]" aria-hidden="true" />
            )}
          </span>
        );
      })}
    </Tag>
  );
}
