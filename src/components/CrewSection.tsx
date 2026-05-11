import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import ScrambleHeading from './ScrambleHeading';
import BarberPole from './BarberPole';

const EASE = [0.76, 0, 0.24, 1] as const;

const CREW_IMAGES = [
  'https://lh3.googleusercontent.com/aida/ADBb0ughMXiCaQq7GNpi-TpbX-B3O0S4244B_loykgY9xyFn5eBdTk1UTc1kj9HhEZG-tJhSydtDGTerEGxW-0ehrwn_4-4uNb6wz0iN-XAzmnyBsFyiut6mkSeG2tMAYrVr1Umuz2VIOvEOz0lbTdjCcbwam57Lz3zVI6eWrp6-u7o_5ZISDrUkD7X0N0ubAPx4htoOSIQ2qHgTIoYvNMFRfJsbEMCAXNFohLm4OvGX0S0ou0Au2NcvAqJvZkgsP2aM4qTdJFPGKjHFMQ',
  'https://lh3.googleusercontent.com/aida/ADBb0uiQSSk0v9mWEOj0VBAN6ujPCDSyiMiFs1KwdPmFzMz_lPJE6kvvxizsg7ehzKoSdUUIqF_Hj1fpEv_y0D1el5ifuotXvcGXeOfMnsU6QnuXgQTNvcyOq_ASn0VvEvhklLrWi6ILY67DNJ0TxDlCHiYD_rprZ8LJL42Ay9NVbBKx0wdGRRJpSZyf0EZcE3vfIlB4Iqp9S3CrPlRa9rFp6x52qly3K55XgHPYmWG7J1bMjDxRoCRYkBGpeUjJnzBxCIjAMflVqWxT',
  'https://lh3.googleusercontent.com/aida/ADBb0uhOXEh5UZwsYB6gzRE2vS57SZLAwYRnB4SHANrVPcpRMZPRKpJLhXfuCYLJHIYwHs3zVS5_YWkW6kfXPZ1ms6WzcfEZXTaekKHGtPVQHuwS1XVXgOIB632p8_bzJ1w1IBbcyyAYFzDfr2mcIl77eRBuRSvKTj7avlrcQJ-8x-p5gxjdDd669sgMT4PSWOp57bAUCFZg_f91UBUrUB1v_onS81RPEwVuOkr6Go7B6Eau38sH8oH78XlKimU-WVcW2UANk6DBvLSnYg',
  'https://lh3.googleusercontent.com/aida/ADBb0uiY8ecdMdJfYQ4DiGJB1K2Th1CZse3V9rVyW7O13xL3FbX7C0jpsAfut-5D9dCzd1ibBp_5rkBFPGUsKOsfvgDdQbLZ_rB70C1Z5077IiuVsRKJYpVbdN8yPp_JzPzEhcYy3AdnvIZ3xn4DzR6uyIIQLi0n6-BhlDNBXmXH1ElTLY1rdqDWKpZc1KkxwzewKWMQZcCQQRTy9o5oSGFt9vOxMm0yuV6zpyzUGPWZMv_YjPhDwGieszoAqV5SlaKR47D2LzCOOLTXjw',
];

export default function CrewSection() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="crew" className="max-w-7xl mx-auto px-6 mb-40" aria-label="Our crew">
      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <motion.span
            className="font-label text-accent-primary text-[10px] tracking-[0.4em] mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            THE BROTHERHOOD
          </motion.span>
          <ScrambleHeading as="h2" className="text-7xl md:text-8xl font-display tracking-tight mb-6">
            MEET THE CREW
          </ScrambleHeading>
          <motion.p
            className="text-text-muted text-lg font-light leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          >
            United by the craft, driven by excellence. Our barbers are more than just professionals; they are a family dedicated to welcoming every client into the fold.
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-4 text-accent-primary opacity-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <BarberPole />
          <div className="w-24 h-[1px] bg-white/20" />
        </motion.div>
      </div>

      {/* Main crew image with parallax */}
      <motion.div
        ref={heroRef}
        className="w-full aspect-[21/9] overflow-hidden border border-white/[0.04] bg-bg-surface group relative rounded-[1.5rem] shadow-2xl mb-8"
        initial={{ clipPath: 'inset(15% 5% 15% 5%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <motion.img
          src={CREW_IMAGES[0]}
          className="w-full h-[120%] object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
          alt="Noble Barbers Crew"
          loading="lazy"
          decoding="async"
          width={1400}
          height={600}
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          >
            <h3 className="font-display text-4xl md:text-7xl mb-2 tracking-tight">UNITED BY THE BLADE</h3>
            <p className="font-label text-[10px] tracking-[0.4em] text-accent-primary">The Noble Collective Core</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CREW_IMAGES.slice(1).map((img, idx) => (
          <motion.div
            key={idx}
            className="aspect-[4/3] overflow-hidden border border-white/[0.04] bg-bg-surface group relative rounded-[1.5rem]"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={gridInView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
            transition={{ duration: 1, ease: EASE, delay: idx * 0.15 }}
          >
            <img
              src={img}
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              alt={`Noble Barbers crew ${idx + 2}`}
              loading="lazy"
              decoding="async"
              width={600}
              height={450}
            />
            <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <BarberPole className="scale-75" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-text-muted/30 font-label text-[9px] tracking-[0.8em] uppercase">
          Built on Respect • Driven by Passion • Noble Family
        </p>
      </motion.div>
    </section>
  );
}
