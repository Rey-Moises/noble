import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Header from './components/Header';
import HeroVideo from './components/HeroVideo';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import GallerySection from './components/GallerySection';
import CrewSection from './components/CrewSection';
import LocationsSection from './components/LocationsSection';
import Footer from './components/Footer';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent-primary z-[100] origin-left"
        style={{ scaleX: progressScaleX }}
      />

      {/* Film grain — lightweight CSS background, not GPU-heavy SVG filter */}
      <div className="grain-overlay" aria-hidden="true" />

      <HeroVideo />
      <Header isScrolled={isScrolled} scrollToSection={scrollToSection} />

      <main id="main-content" className="relative z-10 w-full" role="main">
        <HeroSection loaded={loaded} scrollToSection={scrollToSection} />

        <div className="w-full bg-bg-base relative z-20 pt-20 pb-40">
          <ServicesSection />
          <StatsSection />
          <GallerySection />
          <CrewSection />
          <LocationsSection />
        </div>

        <Footer scrollToSection={scrollToSection} />
      </main>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-6 w-full z-40 md:hidden px-6">
        <a
          href="https://noblebarberscc.setmore.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-accent-primary text-white py-5 flex items-center justify-center gap-3 font-display text-2xl tracking-[0.2em] shadow-2xl"
        >
          BOOK NOW
        </a>
      </div>
    </div>
  );
}
