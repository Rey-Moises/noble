/**
 * Noble Barbers - Main Application
 * 
 * A premium barbershop landing page with Facebook video background.
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import HeroVideo from './components/HeroVideo';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import GallerySection from './components/GallerySection';
import CrewSection from './components/CrewSection';
import LocationsSection from './components/LocationsSection';
import Footer from './components/Footer';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col items-center">
      {/* Background Video (Sticky Hero) */}
      <HeroVideo />

      {/* Header */}
      <Header isScrolled={isScrolled} scrollToSection={scrollToSection} />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* Floating Hero Section */}
        <HeroSection scrollToSection={scrollToSection} />

        {/* Content Container */}
        <div className="w-full bg-bg-base pt-20 pb-40">
          
          {/* Services Section */}
          <ServicesSection />

          {/* Social Proof / Stats */}
          <StatsSection />

          {/* Gallery Section */}
          <GallerySection />

          {/* Crew Section */}
          <CrewSection />

          {/* Location Cards */}
          <LocationsSection />
        </div>

        {/* Footer */}
        <Footer scrollToSection={scrollToSection} />
      </main>

      {/* Floating CTA for Mobile */}
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