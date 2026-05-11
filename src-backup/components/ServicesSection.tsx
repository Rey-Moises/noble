/**
 * ServicesSection - Service cards with pricing
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Clock, ChevronRight } from 'lucide-react';

const SERVICES = [
  { 
    name: "Haircut", 
    price: "₱200", 
    duration: "1 hr", 
    image: "https://lh3.googleusercontent.com/aida/ADBb0uiyXvPfTjB1-F4j-0LTmCwMrx4UVLb6M5kLCbIz6l_Ucrt6u3oWUhX7kYF3rL8gIld5UX5n_g4AmGi6oWySQ6tIcabat6E4xR3y94ESw0BAIs6Fno6rQi9x3BrN-thmIFGXaS1mdCe67tt1W0pdT27HAgmLFkLOxwG_6Qxmf4levFVctmD2Q3GHjhpGSys2qBp8qjt0mxK5IXET3WHLTxcwGLZiCd-up--R5d5TGpDB626NaOGpkY-kg1boVPJqyi3fcnqwWbjeJQ" 
  },
  { 
    name: "Shave / Beard Trim", 
    price: "₱100", 
    duration: "30 mins", 
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhOXEh5UZwsYB6gzRE2vS57SZLAwYRnB4SHANrVPcpRMZPRKpJLhXfuCYLJHIYwHs3zVS5_YWkW6kfXPZ1ms6WzcfEZXTaekKHGtPVQHuwS1XVXgOIB632p8_bzJ1w1IBbcyyAYFzDfr2mcIl77eRBuRSvKTj7avlrcQJ-8x-p5gxjdDd669sgMT4PSWOp57bAUCFZg_f91UBUrUB1v_onS81RPEwVuOkr6Go7B6Eau38sH8oH78XlKimU-WVcW2UANk6DBvLSnYg" 
  },
  { 
    name: "Haircut & Shave", 
    price: "₱300", 
    duration: "1 hr 30 mins", 
    image: "https://lh3.googleusercontent.com/aida/ADBb0uiQSSk0v9mWEOj0VBAN6ujPCDSyiMiFs1KwdPmFzMz_lPJE6kvvxizsg7ehzKoSdUUIqF_Hj1fpEv_y0D1el5ifuotXvcGXeOfMnsU6QnuXgQTNvcyOq_ASn0VvEvhklLrWi6ILY67DNJ0TxDlCHiYD_rprZ8LJL42Ay9NVbBKx0wdGRRJpSZyf0EZcE3vfIlB4Iqp9S3CrPlRa9rFp6x52qly3K55XgHPYmWG7J1bMjDxRoCRYkBGpeUjJnzBxCIjAMflVqWxT" 
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="max-w-4xl mx-auto px-6 mb-40">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
        <h2 className="text-5xl font-display">Services</h2>
        <p className="text-text-muted font-sans text-sm uppercase tracking-widest">Master Craft x Precision</p>
      </div>

      <div className="flex flex-col gap-5">
        {SERVICES.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => window.open('https://noblebarberscc.setmore.com', '_blank')}
            className="group relative flex items-center justify-between bg-bg-surface border border-white/5 p-5 rounded-3xl cursor-pointer hover:bg-bg-elevated transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10 relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-2">
                   <span className="font-display text-[12px] text-white/90 font-bold border border-white/30 px-2 py-0.5">NOBLE</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-display text-text-primary group-hover:text-accent-primary transition-colors">{service.name}</h3>
                <div className="text-base text-text-muted flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary"></span>
                  <span className="font-bold text-text-primary">{service.price}</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-primary transition-colors">
              <ChevronRight className="w-6 h-6 text-text-muted group-hover:text-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}