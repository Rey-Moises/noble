import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function HeroVideo() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => setCanPlay(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-0 h-screen w-full pointer-events-none overflow-hidden" aria-hidden="true">
      {canPlay && (
        <motion.video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover will-change-transform"
          style={{
            filter: 'brightness(0.55) contrast(1.2) saturate(1.5)',
            scale,
            opacity,
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </motion.video>
      )}
      <div className="absolute inset-0 video-overlay" />
    </div>
  );
}
