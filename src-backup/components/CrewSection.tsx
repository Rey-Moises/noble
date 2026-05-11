/**
 * CrewSection - Meet the crew / team showcase
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import BarberPole from './BarberPole';

const CREW_IMAGES = [
  "https://lh3.googleusercontent.com/aida/ADBb0ughMXiCaQq7GNpi-TpbX-B3O0S4244B_loykgY9xyFn5eBdTk1UTc1kj9HhEZG-tJhSydtDGTerEGxW-0ehrwn_4-4uNb6wz0iN-XAzmnyBsFyiut6mkSeG2tMAYrVr1Umuz2VIOvEOz0lbTdjCcbwam57Lz3zVI6eWrp6-u7o_5ZISDrUkD7X0N0ubAPx4htoOSIQ2qHgTIoYvNMFRfJsbEMCAXNFohLm4OvGX0S0ou0Au2NcvAqJvZkgsP2aM4qTdJFPGKjHFMQ",
  "https://lh3.googleusercontent.com/aida/ADBb0uiQSSk0v9mWEOj0VBAN6ujPCDSyiMiFs1KwdPmFzMz_lPJE6kvvxizsg7ehzKoSdUUIqF_Hj1fpEv_y0D1el5ifuotXvcGXeOfMnsU6QnuXgQTNvcyOq_ASn0VvEvhklLrWi6ILY67DNJ0TxDlCHiYD_rprZ8LJL42Ay9NVbBKx0wdGRRJpSZyf0EZcE3vfIlB4Iqp9S3CrPlRa9rFp6x52qly3K55XgHPYmWG7J1bMjDxRoCRYkBGpeUjJnzBxCIjAMflVqWxT",
  "https://lh3.googleusercontent.com/aida/ADBb0uhOXEh5UZwsYB6gzRE2vS57SZLAwYRnB4SHANrVPcpRMZPRKpJLhXfuCYLJHIYwHs3zVS5_YWkW6kfXPZ1ms6WzcfEZXTaekKHGtPVQHuwS1XVXgOIB632p8_bzJ1w1IBbcyyAYFzDfr2mcIl77eRBuRSvKTj7avlrcQJ-8x-p5gxjdDd669sgMT4PSWOp57bAUCFZg_f91UBUrUB1v_onS81RPEwVuOkr6Go7B6Eau38sH8oH78XlKimU-WVcW2UANk6DBvLSnYg",
  "https://lh3.googleusercontent.com/aida/ADBb0uiY8ecdMdJfYQ4DiGJB1K2Th1CZse3V9rVyW7O13xL3FbX7C0jpsAfut-5D9dCzd1ibBp_5rkBFPGUsKOsfvgDdQbLZ_rB70C1Z5077IiuVsRKJYpVbdN8yPp_JzPzEhcYy3AdnvIZ3xn4DzR6uyIIQLi0n6-BhlDNBXmXH1ElTLY1rdqDWKpZc1KkxwzewKWMQZcCQQRTy9o5oSGFt9vOxMm0yuV6zpyzUGPWZMv_YjPhDwGieszoAqV5SlaKR47D2LzCOOLTXjw"
];

export default function CrewSection() {
  return (
    <section id="crew" className="max-w-7xl mx-auto px-6 mb-40">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="font-label text-accent-primary text-xs mb-4 block uppercase tracking-widest">THE BROTHERHOOD</span>
          <h2 className="text-7xl font-display mb-6 tracking-tight">MEET THE CREW</h2>
          <p className="text-text-muted text-xl font-light leading-relaxed max-w-xl">
            United by the craft, driven by excellence. Our barbers are more than just professionals; they are a family dedicated to welcoming every client into the fold.
          </p>
        </div>
        <div className="flex items-center gap-4 text-accent-primary opacity-40">
          <BarberPole />
          <div className="w-24 h-[1px] bg-white/20" />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Main Unity Shot */}
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full aspect-[21/9] overflow-hidden border border-white/5 bg-bg-surface group relative rounded-[2rem] shadow-2xl"
        >
          <img 
            src={CREW_IMAGES[0]} 
            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-1000 ease-out" 
            alt="Noble Barbers Crew"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent flex flex-col justify-end p-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-display text-5xl md:text-7xl mb-2">UNITED BY THE BLADe</h3>
              <p className="font-label text-sm tracking-[0.4em] text-accent-primary">The Noble Collective Core</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Grid of Landscapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CREW_IMAGES.slice(1).map((img, idx) => (
            <motion.div 
              key={idx}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="aspect-[4/3] overflow-hidden border border-white/5 bg-bg-surface group relative rounded-[2rem] shadow-xl"
            >
              <img 
                src={img} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                alt={`Noble Barbers crew member ${idx + 2}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <BarberPole className="scale-75" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <p className="text-text-muted/60 font-label text-[10px] tracking-[0.8em] uppercase">Built on Respect • Driven by Passion • Noble Family</p>
        </div>
      </div>
    </section>
  );
}