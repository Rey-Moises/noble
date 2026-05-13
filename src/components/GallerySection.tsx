import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ScrambleHeading from './ScrambleHeading';
import CursorFollower from './CursorFollower';

const EASE = [0.76, 0, 0.24, 1] as const;

const GALLERY_IMAGES = [
  { url: '/cut-1.jpg', label: 'Classic Slickback' },
  { url: '/cut-2.jpg', label: 'Hard Part Fade' },
  { url: '/cut-3.jpg', label: 'Pompadour Quiff' },
  { url: '/cut-4.jpg', label: 'Textured Fringe' },
  { url: '/cut-5.jpg', label: 'Side Sweep' },
];

function RevealImage({ src, alt, label, index, className }: {
  src: string; alt: string; label: string; index: number; className?: string;
}) {
  // Touch-tap toggle: replaces CSS :hover for touch devices
  const [active, setActive] = useState(false);

  return (
    <motion.div
      className={`overflow-hidden bg-bg-surface relative group cursor-pointer ${className ?? ''}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      // Positive margin = start animating before element enters viewport
      // so images never appear stuck/invisible on mobile
      viewport={{ once: true, margin: '120px' }}
      transition={{ duration: 1.2, ease: EASE, delay: index * 0.08 }}
      onClick={() => setActive(a => !a)}
    >
      <img
        src={src}
        className={`w-full h-full object-cover transition-all duration-700 ease-out
          ${active
            ? 'grayscale-0 brightness-100 scale-105'
            : 'grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105'
          }`}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={400}
        height={280}
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent transition-opacity duration-500
        ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      />

      {/* Label */}
      <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500
        ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}
      >
        <span className="font-label text-[10px] tracking-[0.2em] text-white/80">{label}</span>
      </div>

      {/* Tap hint on mobile (shown when NOT active) */}
      <div className={`absolute top-3 right-3 md:hidden transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-60'}`}>
        <span className="font-label text-[8px] tracking-widest text-white/50 bg-black/40 px-2 py-1">TAP</span>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const heroImgRef = useRef(null);
  const [featureActive, setFeatureActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroImgRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 mb-40" aria-label="Gallery">
      <div className="text-center mb-20">
        <motion.span
          className="font-label text-accent-primary text-[10px] tracking-[0.4em] mb-4 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Portfolio
        </motion.span>
        <ScrambleHeading as="h2" className="text-7xl md:text-8xl font-display tracking-tight justify-center">
          THE CRAFT
        </ScrambleHeading>
        <motion.p
          className="text-text-muted/40 uppercase tracking-[0.4em] text-[9px] mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A Visual Signature of Excellence
        </motion.p>
      </div>

      <CursorFollower images={GALLERY_IMAGES}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[280px]">

        {/* Feature image:
            Mobile  → col-span-2, 1 row tall  (keeps grid compact, all 5 images fit)
            Desktop → col-span-2, row-span-2  (2×2 masonry tile) */}
        <div
          ref={heroImgRef}
          className="col-span-2 md:row-span-2 overflow-hidden relative group border border-white/[0.04] cursor-pointer"
          onClick={() => setFeatureActive(a => !a)}
        >
          <motion.img
            src={GALLERY_IMAGES[1].url}
            className={`w-full h-[120%] object-cover transition-all duration-1000
              ${featureActive
                ? 'grayscale-0 brightness-100'
                : 'grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100'
              }`}
            alt={GALLERY_IMAGES[1].label}
            loading="lazy"
            decoding="async"
            width={800}
            height={560}
            style={{ y: parallaxY }}
          />
          <div className={`absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-bg-base via-bg-base/60 to-transparent transition-opacity duration-700
            ${featureActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <span className="font-display text-4xl md:text-5xl text-accent-primary leading-none">
              {GALLERY_IMAGES[1].label}
            </span>
          </div>
          {/* Tap hint on mobile */}
          <div className={`absolute top-3 right-3 md:hidden transition-opacity duration-300 ${featureActive ? 'opacity-0' : 'opacity-60'}`}>
            <span className="font-label text-[8px] tracking-widest text-white/50 bg-black/40 px-2 py-1">TAP</span>
          </div>
        </div>

        {/* Smaller tiles */}
        {[0, 2, 3, 4].map((idx, i) => (
          <RevealImage
            key={idx}
            src={GALLERY_IMAGES[idx].url}
            alt={GALLERY_IMAGES[idx].label}
            label={GALLERY_IMAGES[idx].label}
            index={i}
            className="border border-white/[0.04]"
          />
        ))}
      </div>
      </CursorFollower>
    </section>
  );
}
