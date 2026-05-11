import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import ScrambleHeading from './ScrambleHeading';

const EASE = [0.76, 0, 0.24, 1] as const;

const SERVICES = [
  { name: 'Haircut',          price: '₱200', duration: '1 hr',          image: '/cut-1.jpg' },
  { name: 'Shave / Beard Trim', price: '₱100', duration: '30 mins',     image: '/cut-3.jpg' },
  { name: 'Haircut & Shave',  price: '₱300', duration: '1 hr 30 mins',  image: '/cut-5.jpg' },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="max-w-5xl mx-auto px-6 mb-40" ref={ref} aria-label="Our services">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
        <ScrambleHeading as="h2" className="text-6xl md:text-7xl font-display tracking-tight">
          Services
        </ScrambleHeading>
        <motion.p
          className="text-text-muted font-label text-[10px] tracking-[0.3em]"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        >
          Master Craft x Precision
        </motion.p>
      </div>

      <div className="section-divider mb-12" />

      <div className="flex flex-col gap-3">
        {SERVICES.map((service, index) => (
          <motion.a
            key={index}
            href="https://noblebarberscc.setmore.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.8, ease: EASE }}
            className="group relative flex items-center justify-between bg-bg-surface/50 border border-white/[0.04] p-5 md:p-6 cursor-pointer hover:bg-bg-elevated/80 transition-all duration-500"
            data-cursor-hover
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden shrink-0 relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width={96}
                  height={96}
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-display text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                  {service.name}
                </h3>
                <div className="text-sm text-text-muted flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-accent-primary/60" /> {service.duration}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-semibold text-text-primary">{service.price}</span>
                </div>
              </div>
            </div>

            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent-primary group-hover:border-accent-primary transition-all duration-500 shrink-0">
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-white transition-colors group-hover:translate-x-0.5 transform duration-300" />
            </div>

            {/* Hover accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
