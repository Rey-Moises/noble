import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import ScrambleHeading from './ScrambleHeading';

const EASE = [0.76, 0, 0.24, 1] as const;

const GALLERY_IMAGES = [
  { url: 'https://lh3.googleusercontent.com/aida/ADBb0uiyXvPfTjB1-F4j-0LTmCwMrx4UVLb6M5kLCbIz6l_Ucrt6u3oWUhX7kYF3rL8gIld5UX5n_g4AmGi6oWySQ6tIcabat6E4xR3y94ESw0BAIs6Fno6rQi9x3BrN-thmIFGXaS1mdCe67tt1W0pdT27HAgmLFkLOxwG_6Qxmf4levFVctmD2Q3GHjhpGSys2qBp8qjt0mxK5IXET3WHLTxcwGLZiCd-up--R5d5TGpDB626NaOGpkY-kg1boVPJqyi3fcnqwWbjeJQ', label: 'Precision Fade' },
  { url: 'https://lh3.googleusercontent.com/aida/ADBb0uirqhk85KgWHwdyltLGkS1WO-J71RVrvqlVKs9G3alKNCAPy10r7Iyug-EeJKU4ktaNIS-C2iyZ_RJNWDtOhGZwhkgH8Dl_aszkEPQOHYgU0SiwKzCx0KNqSGWwpZZY2eUWBaQnCP4dwxghqVmjgO0oiUtrl8IYxGtp-5xDjwlJAqBF4HsEr6Qfdzj666ZIYlWML7PaVjyywiKjGrgIRaw0FR5zHFkRmaciih0dv48_vA5Y6r98bagZ8pPszlUPzvEKtlChMQDI', label: 'Master Silhouette' },
  { url: 'https://lh3.googleusercontent.com/aida/ADBb0uhkFx1Mxaj1U3odqzibHL7ohb-ARnERx9rc86frH7DN5rnQGA3KdvgOxpd-VyxrTqiQnDh3MK4Cjq-Emb24yyl3IzefMoM3o5OaCS5zPAnj9AdJtGv37u8hUS7yroTd193pfbZE_aoXWnvpvF9DDeh6b4vbk181dzYisNNwwbPiAyzoLPR880exiS76cDUKEcyMJbuRQdW6pkjcU6lhwVUsVmalL_LHwSoG5qcagO2oEOt0QqccskIrvBPRiwpX-Ta7MoVWPuV0WA', label: 'Textured Crop' },
  { url: 'https://lh3.googleusercontent.com/aida/ADBb0uipBrcnmD-v_DurUgF6d63AKZmPjh-lzF6jVMq62VaYcwmFeAOYQAx42-GkivN0WxeNjTX_qmdJHzrVkt8AsvI01qGxniPUKHovItq7PVtgrKV0MID1xWAiDTb30-51Dy1Qzsf0NSfO3FPWMHAEO-IJ3oiFTJPzTyzv4XslzU5Q4FsW_9KcDuVobTS4WrX_nxYngsC7biz5o8PMip_hdTtd99cm77XV9fLdTY8FEtcPnjjcGIh9Pg2MDpqobSsQQwPVIR1xKwrxUA', label: 'Sharp Contour' },
  { url: 'https://lh3.googleusercontent.com/aida/ADBb0ugzmTOHKH8YDMN6XaQ4ZXaCe61q-1EBV0cquUcPK_hzgOLHA4bF4l5O_ZwxHGyFl4R-NHimsP-wugPVdQUvBTcxrdcBfhB_JBrzdJ474k9rVNgH1g6AG41QUEIgIqokDzQ5mA_Y9bSCJYQGXOyXThZ_voVrSPoWEGBi271YmZ7iMmBtP80vBnO8OxHRXGgau-xUcAjRcrxZuUd8_16YazmPO7faZ2OOFwH7Ydq3fPAfD_3mclJTDxp1df6s_ePrNP8_gvUYpyhe', label: 'Signature Texture' },
];

function RevealImage({ src, alt, label, index, className, ...rest }: {
  src: string; alt: string; label: string; index: number; className?: string;
} & Record<string, unknown>) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden bg-bg-surface relative group ${className ?? ''}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
      transition={{ duration: 1.2, ease: EASE, delay: index * 0.1 }}
    >
      <img
        src={src}
        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-out"
        alt={alt}
        loading="lazy"
        decoding="async"
        width={400}
        height={280}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <span className="font-label text-[10px] tracking-[0.2em] text-white/80">{label}</span>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const sectionRef = useRef(null);
  const heroImgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroImgRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 mb-40" ref={sectionRef} aria-label="Gallery">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[280px]">
        {/* Feature image — 2x2 with parallax */}
        <div ref={heroImgRef} className="col-span-2 row-span-2 overflow-hidden relative group border border-white/[0.04]">
          <motion.img
            src={GALLERY_IMAGES[1].url}
            className="w-full h-[120%] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            alt={GALLERY_IMAGES[1].label}
            loading="lazy"
            decoding="async"
            width={800}
            height={560}
            style={{ y: parallaxY }}
          />
          <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-bg-base via-bg-base/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="font-display text-4xl md:text-5xl text-accent-primary leading-none">{GALLERY_IMAGES[1].label}</span>
          </div>
        </div>

        {/* Smaller tiles with clip-path reveal */}
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
    </section>
  );
}
