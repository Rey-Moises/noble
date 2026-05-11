/**
 * LocationsSection - Location cards with maps
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

const LOCATIONS = [
  { 
    name: "Cavite City HQ", 
    address: "P. Burgos Ave, Cavite City", 
    hours: "10AM - 8PM Daily",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15454.67039757917!2d120.8906!3d14.4751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396328659d64023%3A0xe54d9a24328f411!2sNoble%20Barbers%20Cavite%20City!5e0!3m2!1sen!2sph!4v1715265000000",
    directions: "https://maps.google.com/?q=Noble+Barbers+Cavite+City"
  },
  { 
    name: "Noveleta Branch", 
    address: "Main Highway, Noveleta", 
    hours: "10AM - 8PM Daily",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15456.633852033994!2d120.89066606367332!3d14.417240003056093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396336e9215037d%3A0x6b49e6f6634c441a!2sNoble%20Barbers%20Noveleta!5e0!3m2!1sen!2sph!4v1715264380928",
    directions: "https://maps.google.com/?q=Noble+Barbers+Noveleta"
  }
];

export default function LocationsSection() {
  return (
    <section id="locations" className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-8">
        {LOCATIONS.map((loc, i) => (
          <div key={i} className="bg-bg-surface p-8 border border-white/5 relative group transition-all hover:bg-bg-elevated">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-4xl font-display mb-2">{loc.name}</h3>
                <p className="text-text-muted text-sm">{loc.address}</p>
              </div>
              <div className="p-3 bg-accent-primary/10 text-accent-primary">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            
            <div className="h-60 w-full bg-black/20 mb-8 overflow-hidden grayscale brightness-75">
              <iframe 
                src={loc.map} 
                className="w-full h-full border-none opacity-60 group-hover:opacity-100 transition-opacity" 
                title={`${loc.name} map`}
                loading="lazy"
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-label text-xs text-text-muted">
                <Clock className="w-4 h-4 text-accent-primary" /> {loc.hours}
              </div>
              <a 
                href={loc.directions} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-label text-sm text-white hover:text-accent-primary group"
              >
                DIRECTIONS <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}