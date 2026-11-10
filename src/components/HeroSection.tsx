import React from 'react';
import { ArrowRight, Flame, Sparkles, Award, ShieldCheck, Coffee } from 'lucide-react';
import { useRoastery } from '../context/RoasteryContext';
import { ResponsiveImage } from './ResponsiveImage';
import { SINGLE_ORIGIN_LOTS } from '../data/roasteryData';

export const HeroSection: React.FC = () => {
  const { t, language, setIsDrawerOpen, formatMoney, addToCart } = useRoastery();
  const featuredLot = SINGLE_ORIGIN_LOTS[0]; // Colombia El Paraíso

  return (
    <section className="relative min-h-[92dvh] lg:min-h-[100dvh] pt-24 sm:pt-28 pb-16 flex items-center bg-stoneIvory overflow-hidden">
      {/* Subtle organic decorative background mesh */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-gradient-to-bl from-oatSurface/70 via-butterAccent/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-[-10vw] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-terracotta/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 7 cols on desktop - Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-oatSurface border border-espressoDeep/10 text-xs font-semibold uppercase tracking-wider text-espressoDeep w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              <span>{t.hero.tagline}</span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-espressoDeep leading-[1.08]">
              {t.hero.headlinePart1}{' '}
              <span className="italic font-normal text-terracotta underline decoration-butterAccent/60 decoration-wavy decoration-2">
                {t.hero.headlinePart2}
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-textLightMuted font-sans max-w-2xl leading-relaxed">
              {t.hero.description}
            </p>

            {/* CTA Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#micro-lots"
                className="group relative inline-flex items-center justify-center px-7 py-4 text-sm font-bold tracking-wide text-white bg-terracotta rounded-full overflow-hidden shadow-lg shadow-terracotta/25 hover:bg-terracottaHover active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{t.hero.ctaOrder}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Subtle liquid sheen effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              </a>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-espressoDeep bg-oatSurface hover:bg-[#dfd7c7] border border-espressoDeep/15 rounded-full shadow-tactile active:shadow-tactile-pressed transition-all duration-200"
              >
                <Coffee className="w-4 h-4 mr-2 text-terracotta" />
                <span>{t.hero.ctaPickup}</span>
              </button>
            </div>

            {/* Micro-Metrics / Credibility Strip */}
            <div className="pt-6 border-t border-espressoDeep/10 grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-espressoDeep">6 Lots</p>
                <p className="text-xs text-textLightMuted font-medium uppercase tracking-wider">{t.hero.statLots}</p>
              </div>
              <div className="border-l border-espressoDeep/10 pl-4">
                <p className="font-serif text-xl sm:text-2xl font-bold text-terracotta">91.5 pts</p>
                <p className="text-xs text-textLightMuted font-medium uppercase tracking-wider">{t.hero.statRating}</p>
              </div>
              <div className="border-l border-espressoDeep/10 pl-4">
                <p className="font-serif text-xl sm:text-2xl font-bold text-espressoDeep">+155%</p>
                <p className="text-xs text-textLightMuted font-medium uppercase tracking-wider">{t.hero.statDirect}</p>
              </div>
            </div>

          </div>

          {/* Right Column: 5 cols on desktop - Overlapping Asymmetrical Magazine Cards */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            
            {/* Primary Roastery Visual Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-oatSurface">
              <ResponsiveImage
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                alt="ATELIER Artisanal Coffee Roastery Batch Cooling"
                aspectRatio="aspect-[4/5]"
                priority={true}
                className="w-full h-full object-cover"
              />

              {/* Floating Badge: Cooling Drum Status */}
              <div className="absolute top-4 left-4 glass-panel-dark px-3 py-1.5 rounded-full text-stoneIvory text-xs font-semibold flex items-center gap-2 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-butterAccent animate-ping" />
                <Flame className="w-3.5 h-3.5 text-butterAccent" />
                <span>{t.hero.liveBadge}</span>
              </div>

              {/* Gradient Dark Scrim at base of image */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-espressoDeep/90 via-espressoDeep/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-stoneIvory">
                <p className="text-[11px] uppercase tracking-widest text-butterAccent font-semibold">Giesen W15A Roaster</p>
                <p className="font-serif text-lg font-semibold text-white">Direct-Fire Drum Thermal Profile</p>
              </div>
            </div>

            {/* Overlapping Glassmorphic Micro-Lot Highlight Card */}
            <div className="relative lg:absolute -bottom-8 lg:-bottom-6 lg:-left-12 sm:w-[92%] lg:w-[108%] glass-panel-light p-4 sm:p-5 rounded-2xl shadow-xl border border-white/60 backdrop-blur-xl mt-4 lg:mt-0">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-terracotta" />
                    <span className="text-xs font-bold text-terracotta uppercase tracking-wide">
                      {featuredLot.badge}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-butterAccent/40 font-bold text-espressoDeep">
                      {featuredLot.cuppingScore} SCA
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-espressoDeep leading-tight">
                    {featuredLot.name}
                  </h3>
                  <p className="text-xs text-textLightMuted">
                    {featuredLot.country} • {featuredLot.region} • {featuredLot.process}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif text-base sm:text-lg font-bold text-espressoDeep block">
                    {formatMoney(featuredLot.basePriceEUR)}
                  </span>
                  <span className="text-[10px] text-textLightMuted">{t.hero.bagWeightSuffix}</span>
                </div>
              </div>

              {/* Tasting Notes Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-espressoDeep/10">
                {featuredLot.tastingNotes[language].map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stoneIvory border border-espressoDeep/10 text-espressoDeep"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Quick Add Button */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-terracotta font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {featuredLot.directTradePremium}
                </span>
                <button
                  onClick={() => addToCart(featuredLot, '250g', 'whole', false)}
                  className="px-3.5 py-1.5 rounded-full bg-espressoDeep text-stoneIvory text-xs font-semibold hover:bg-terracotta transition-colors shadow-xs"
                >
                  {t.producers.addToBag}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
