/**
 * GallerySection - Image collage gallery
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const GALLERY_IMAGES = [
  { url: "https://lh3.googleusercontent.com/aida/ADBb0uiyXvPfTjB1-F4j-0LTmCwMrx4UVLb6M5kLCbIz6l_Ucrt6u3oWUhX7kYF3rL8gIld5UX5n_g4AmGi6oWySQ6tIcabat6E4xR3y94ESw0BAIs6Fno6rQi9x3BrN-thmIFGXaS1mdCe67tt1W0pdT27HAgmLFkLOxwG_6Qxmf4levFVctmD2Q3GHjhpGSys2qBp8qjt0mxK5IXET3WHLTxcwGLZiCd-up--R5d5TGpDB626NaOGpkY-kg1boVPJqyi3fcnqwWbjeJQ", label: "Precision Fade" },
  { url: "https://lh3.googleusercontent.com/aida/ADBb0uirqhk85KgWHwdyltLGkS1WO-J71RVrvqlVKs9G3alKNCAPy10r7Iyug-EeJKU4ktaNIS-C2iyZ_RJNWDtOhGZwhkgH8Dl_aszkEPQOHYgU0SiwKzCx0KNqSGWwpZZY2eUWBaQnCP4dwxghqVmjgO0oiUtrl8IYxGtp-5xDjwlJAqBF4HsEr6Qfdzj666ZIYlWML7PaVjyywiKjGrgIRaw0FR5zHFkRmaciih0dv48_vA5Y6r98bagZ8pPszlUPzvEKtlChMQDI", label: "Master Silhouette" },
  { url: "https://lh3.googleusercontent.com/aida/ADBb0uhkFx1Mxaj1U3odqzibHL7ohb-ARnERx9rc86frH7DN5rnQGA3KdvgOxpd-VyxrTqiQnDh3MK4Cjq-Emb24yyl3IzefMoM3o5OaCS5zPAnj9AdJtGv37u8hUS7yroTd193pfbZE_aoXWnvpvF9DDeh6b4vbk181dzYisNNwwbPiAyzoLPR880exiS76cDUKEcyMJbuRQdW6pkjcU6lhwVUsVmalL_LHwSoG5qcagO2oEOt0QqccskIrvBPRiwpX-Ta7MoVWPuV0WA", label: "Textured Crop" },
  { url: "https://lh3.googleusercontent.com/aida/ADBb0uipBrcnmD-v_DurUgF6d63AKZmPjh-lzF6jVMq62VaYcwmFeAOYQAx42-GkivN0WxeNjTX_qmdJHzrVkt8AsvI01qGxniPUKHovItq7PVtgrKV0MID1xWAiDTb30-51Dy1Qzsf0NSfO3FPWMHAEO-IJ3oiFTJPzTyzv4XslzU5Q4FsW_9KcDuVobTS4WrX_nxYngsC7biz5o8PMip_hdTtd99cm77XV9fLdTY8FEtcPnjjcGIh9Pg2MDpqobSsQQwPVIR1xKwrxUA", label: "Sharp Contour" },
  { url: "https://lh3.googleusercontent.com/aida/ADBb0ugzmTOHKH8YDMN6XaQ4ZXaCe61q-1EBV0cquUcPK_hzgOLHA4bF4l5O_ZwxHGyFl4R-NHimsP-wugPVdQUvBTcxrdcBfhB_JBrzdJ474k9rVNgH1g6AG41QUEIgIqokDzQ5mA_Y9bSCJYQGXOyXThZ_voVrSPoWEGBi271YmZ7iMmBtP80vBnO8OxHRXGgau-xUcAjRcrxZuUd8_16YazmPO7faZ2OOFwH7Ydq3fPAfD_3mclJTDxp1df6s_ePrNP8_gvUYpyhe", label: "Signature Texture" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-6 mb-40">
      <div className="text-center mb-16">
        <span className="font-label text-accent-primary text-xs mb-4 block">Portfolio</span>
        <h2 className="text-6xl font-display mb-4">THE CRAFT</h2>
        <p className="text-text-muted uppercase tracking-[0.3em] text-[10px]">A Visual Signature of Excellence</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[1200px] md:h-[600px]">
        {/* Feature Image */}
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          viewport={{ once: true }}
          className="col-span-2 row-span-2 overflow-hidden relative group border border-white/5"
        >
          <img 
            src={GALLERY_IMAGES[1].url} 
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
            alt={GALLERY_IMAGES[1].label}
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-bg-base to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-display text-4xl leading-none text-accent-primary">{GALLERY_IMAGES[1].label}</span>
          </div>
        </motion.div>

        {/* Smaller Tiles */}
        {[0, 2, 3, 4].map((idx) => (
          <motion.div 
            key={idx}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="overflow-hidden bg-bg-surface border border-white/5 relative group"
          >
            <img 
              src={GALLERY_IMAGES[idx].url} 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
              alt={GALLERY_IMAGES[idx].label}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <span className="font-label text-[10px] text-white border border-white/30 px-3 py-1 text-center">{GALLERY_IMAGES[idx].label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}