import React, { useState, useRef, useCallback } from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { ROAST_PROFILES, SINGLE_ORIGIN_LOTS } from '../data/roasteryData';
import { Sliders, Flame, ArrowLeftRight, Check, Droplet, Coffee } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';

export const RoastComparer: React.FC = () => {
  const { t, addToCart, openDrawer } = useRoastery();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(percent);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleAddSampleBox = () => {
    // Add both the Light Nordic Filter (Colombia) and Full City Espresso (Brazil) to cart
    addToCart(SINGLE_ORIGIN_LOTS[0], '250g', 'whole', false, 1);
    addToCart(SINGLE_ORIGIN_LOTS[4], '250g', 'espresso', false, 1);
    openDrawer(1);
  };

  return (
    <section id="roast-science" className="py-20 lg:py-28 bg-espressoDeep text-stoneIvory relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-butterAccent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest font-bold text-butterAccent mb-2">
            {t.comparer.kicker}
          </p>
          <h2 className="font-serif fluid-heading-section font-bold text-white tracking-tight">
            {t.comparer.title}
          </h2>
          <p className="mt-4 text-base text-stoneIvory/80 leading-relaxed">
            {t.comparer.subtitle}
          </p>
        </div>

        {/* Drag-to-Slide Interactive Roast Comparer Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize touch-none"
        >
          {/* Layer 1: Dark Full City Espresso Roast (Full Canvas) */}
          <div className="absolute inset-0 w-full h-full bg-[#180e0a]">
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"
              alt="Full City Dark Roasted Espresso Beans"
              aspectRatio="h-full w-full"
              className="w-full h-full pointer-events-none"
              imgClassName="filter brightness-[0.75] contrast-125 saturate-75"
            />
            {/* Dark Side Label Pill (Pinned to Right) */}
            <div className="absolute top-6 right-6 glass-panel-dark px-4 py-2 rounded-2xl border border-white/10 text-right z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-butterAccent block">
                Profile B
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-white">
                {t.comparer.darkTitle}
              </p>
              <p className="text-xs text-stoneIvory/70">214°C • 16.8% Dev</p>
            </div>
          </div>

          {/* Layer 2: Light Nordic Filter Roast (Clipped on Left by sliderPosition without squishing) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <ResponsiveImage
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e"
              alt="Light Nordic Filter Roasted Coffee Beans"
              aspectRatio="h-full w-full"
              className="w-full h-full pointer-events-none"
              imgClassName="filter brightness-110 contrast-105 saturate-125"
            />
            {/* Light Side Label Pill (Pinned to Left) */}
            <div className="absolute top-6 left-6 glass-panel-dark px-4 py-2 rounded-2xl border border-white/10 text-left z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta block">
                Profile A
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-white">
                {t.comparer.lightTitle}
              </p>
              <p className="text-xs text-stoneIvory/70">202°C • 11.5% Dev</p>
            </div>
          </div>

          {/* Divider Handle Bar */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-espressoDeep flex items-center justify-center shadow-2xl border-2 border-espressoDeep">
              <ArrowLeftRight className="w-4 h-4 text-espressoDeep" />
            </div>
          </div>

          {/* User Hint Prompt at Bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel-dark px-4 py-1.5 rounded-full text-xs font-semibold text-stoneIvory/90 pointer-events-none flex items-center gap-2 border border-white/10">
            <Sliders className="w-3.5 h-3.5 text-butterAccent" />
            <span>{t.comparer.dragPrompt} ({sliderPosition}%)</span>
          </div>
        </div>

        {/* Accessible Range Input for Mobile / Screen Readers */}
        <div className="mt-4 flex items-center gap-3 sm:hidden">
          <span className="text-xs text-stoneIvory/70">{t.comparer.lightTitle}</span>
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="w-full accent-terracotta cursor-pointer"
            aria-label="Drag to compare roast spectrum"
          />
          <span className="text-xs text-stoneIvory/70">{t.comparer.darkTitle}</span>
        </div>

        {/* Technical Side-by-Side Parameter Matrix */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Light Roast Specs Card */}
          <div className="bg-espressoWarm/70 p-6 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#B27D56]" />
              <h3 className="font-serif text-lg font-bold text-white">{t.comparer.lightTitle}</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-stoneIvory/80">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-terracotta shrink-0" />
                <span><strong>Thermal End:</strong> {t.comparer.lightSpecs.temp}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-terracotta shrink-0" />
                <span><strong>Development:</strong> {t.comparer.lightSpecs.dev}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-terracotta shrink-0" />
                <span><strong>First Crack Window:</strong> {t.comparer.lightSpecs.crack}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-terracotta shrink-0" />
                <span><strong>Body & Texture:</strong> {t.comparer.lightSpecs.body}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-terracotta shrink-0" />
                <span><strong>Extraction Method:</strong> {t.comparer.lightSpecs.extraction}</span>
              </li>
            </ul>
          </div>

          {/* Full City Espresso Specs Card */}
          <div className="bg-espressoWarm/70 p-6 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#482717]" />
              <h3 className="font-serif text-lg font-bold text-white">{t.comparer.darkTitle}</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-stoneIvory/80">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-butterAccent shrink-0" />
                <span><strong>Thermal End:</strong> {t.comparer.darkSpecs.temp}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-butterAccent shrink-0" />
                <span><strong>Development:</strong> {t.comparer.darkSpecs.dev}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-butterAccent shrink-0" />
                <span><strong>First Crack Window:</strong> {t.comparer.darkSpecs.crack}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-butterAccent shrink-0" />
                <span><strong>Body & Texture:</strong> {t.comparer.darkSpecs.body}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-butterAccent shrink-0" />
                <span><strong>Extraction Method:</strong> {t.comparer.darkSpecs.extraction}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Action Button: Taste Both Sample Box */}
        <div className="mt-8 text-center">
          <button
            onClick={handleAddSampleBox}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-terracotta text-white font-bold text-xs uppercase tracking-wider hover:bg-terracottaHover transition-all shadow-lg shadow-terracotta/25 active:scale-95"
          >
            <Coffee className="w-4 h-4" />
            <span>{t.comparer.tryBeans}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
