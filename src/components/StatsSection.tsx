import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import MarqueeText from './MarqueeText';

const EASE = [0.76, 0, 0.24, 1] as const;

const STATS = [
  { label: 'Founded', value: 2018, prefix: '', suffix: '' },
  { label: 'Services', value: 10, prefix: '', suffix: 'K+' },
  { label: 'Master Barbers', value: 8, prefix: '', suffix: '' },
  { label: 'Locations', value: 2, prefix: '', suffix: '' },
];

function Counter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, value, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return controls.stop;
    }
  }, [inView, motionVal, value]);

  useEffect(() => {
    return rounded.on('change', (v) => setDisplay(String(v)));
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="mb-40" ref={ref}>
      {/* Marquee divider */}
      <div className="border-y border-white/5 py-4 mb-20 overflow-hidden">
        <MarqueeText
          text="STAY SHARP • LOOK BOLD • BE NOBLE"
          className="font-display text-xl md:text-2xl text-white/[0.04] tracking-[0.3em]"
          speed={25}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: EASE }}
            >
              <div className="text-5xl md:text-7xl font-display text-accent-primary mb-3 tabular-nums">
                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="font-label text-[10px] tracking-[0.3em] text-text-muted/60">{stat.label}</div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/[0.06]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
