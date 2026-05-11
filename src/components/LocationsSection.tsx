import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import ScrambleHeading from './ScrambleHeading';

const EASE = [0.76, 0, 0.24, 1] as const;

const LOCATIONS = [
  {
    name: 'Cavite City HQ',
    address: 'P. Burgos Ave, Cavite City',
    hours: '10AM - 8PM Daily',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15454.67039757917!2d120.8906!3d14.4751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396328659d64023%3A0xe54d9a24328f411!2sNoble%20Barbers%20Cavite%20City!5e0!3m2!1sen!2sph!4v1715265000000',
    directions: 'https://maps.google.com/?q=Noble+Barbers+Cavite+City',
  },
  {
    name: 'Noveleta Branch',
    address: 'Main Highway, Noveleta',
    hours: '10AM - 8PM Daily',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15456.633852033994!2d120.89066606367332!3d14.417240003056093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396336e9215037d%3A0x6b49e6f6634c441a!2sNoble%20Barbers%20Noveleta!5e0!3m2!1sen!2sph!4v1715264380928',
    directions: 'https://maps.google.com/?q=Noble+Barbers+Noveleta',
  },
];

function LazyMap({ src, title }: { src: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '200px 0px' });

  return (
    <div ref={ref} className="h-52 w-full bg-bg-elevated mb-8 overflow-hidden">
      {inView ? (
        <iframe
          src={src}
          className="w-full h-full border-none opacity-50 group-hover:opacity-80 transition-opacity duration-700"
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <MapPin className="w-6 h-6 text-white/10" />
        </div>
      )}
    </div>
  );
}

export default function LocationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="locations" className="max-w-7xl mx-auto px-6" ref={ref} aria-label="Our locations">
      <div className="text-center mb-16">
        <motion.span
          className="font-label text-accent-primary text-[10px] tracking-[0.4em] mb-4 block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Find Us
        </motion.span>
        <ScrambleHeading as="h2" className="text-6xl md:text-7xl font-display tracking-tight justify-center">
          Locations
        </ScrambleHeading>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {LOCATIONS.map((loc, i) => (
          <motion.article
            key={i}
            className="bg-bg-surface/50 p-8 border border-white/[0.04] relative group transition-all duration-500 hover:border-accent-primary/20"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.2, duration: 0.8, ease: EASE }}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-display mb-2 group-hover:text-accent-primary transition-colors duration-300">
                  {loc.name}
                </h3>
                <p className="text-text-muted/60 text-sm">{loc.address}</p>
              </div>
              <div className="p-3 bg-accent-primary/10 text-accent-primary" aria-hidden="true">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            <LazyMap src={loc.map} title={`${loc.name} map`} />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-label text-[10px] tracking-wider text-text-muted/50">
                <Clock className="w-3.5 h-3.5 text-accent-primary/50" aria-hidden="true" />
                <span>{loc.hours}</span>
              </div>
              <a
                href={loc.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-label text-[11px] text-white/80 hover:text-accent-primary transition-colors group/dir"
                data-cursor-hover
              >
                DIRECTIONS
                <ArrowUpRight className="w-4 h-4 group-hover/dir:-translate-y-0.5 group-hover/dir:translate-x-0.5 transition-transform duration-300" aria-hidden="true" />
              </a>
            </div>

            <div className="absolute top-0 left-0 w-12 h-[2px] bg-accent-primary/0 group-hover:bg-accent-primary transition-colors duration-500" aria-hidden="true" />
            <div className="absolute top-0 left-0 w-[2px] h-12 bg-accent-primary/0 group-hover:bg-accent-primary transition-colors duration-500" aria-hidden="true" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
