import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const EASE = [0.76, 0, 0.24, 1] as const;

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px 0px' });
  const words = children.split(' ');

  return (
    <Tag ref={ref} className={`${className}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 3 }}
            animate={inView ? { y: 0, rotate: 0 } : { y: '110%', rotate: 3 }}
            transition={{
              duration: 0.8,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
