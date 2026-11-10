import React from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { ResponsiveImage } from './ResponsiveImage';
import { HeartHandshake, Flame, Leaf, GraduationCap, Quote, Compass, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useRoastery();

  const pillarIcons = [
    <HeartHandshake className="w-5 h-5 text-terracotta" />,
    <Flame className="w-5 h-5 text-terracotta" />,
    <Leaf className="w-5 h-5 text-terracotta" />,
    <GraduationCap className="w-5 h-5 text-terracotta" />,
  ];

  return (
    <section id="about-story" className="py-20 lg:py-28 bg-oatSurface/40 relative overflow-hidden border-y border-espressoDeep/5">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-butterAccent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-bold tracking-widest uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.about.kicker}</span>
          </div>
          <h2 className="fluid-heading-section font-serif font-bold text-espressoDeep tracking-tight">
            {t.about.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-textLightMuted leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* 12-Column Editorial Grid: Story Narrative (7 cols) + Imagery & Founder Quote (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (7 cols): Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-stoneIvory p-6 sm:p-8 rounded-3xl border border-espressoDeep/10 shadow-tactile space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta block">
                {t.about.tagline}
              </span>
              <p className="text-sm sm:text-base text-espressoDeep/90 leading-relaxed">
                {t.about.storyParagraph1}
              </p>
              <p className="text-sm sm:text-base text-textLightMuted leading-relaxed">
                {t.about.storyParagraph2}
              </p>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.about.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-stoneIvory p-5 rounded-2xl border border-espressoDeep/10 hover:border-terracotta/40 transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-oatSurface flex items-center justify-center group-hover:scale-105 transition-transform">
                      {pillarIcons[idx]}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-espressoDeep/5 text-espressoDeep">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-espressoDeep mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-textLightMuted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Visual Craftsmanship & Founder Quote */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Mosaic: Roasting Hall & Sensory Cupping */}
            <div className="relative rounded-3xl overflow-hidden shadow-tactile border border-espressoDeep/10 group">
              <ResponsiveImage
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
                alt="Giesen W15A specialty coffee drum roaster in ATELIER Munich"
                aspectRatio="aspect-[4/3]"
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espressoDeep/90 via-espressoDeep/30 to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-butterAccent block mb-1">
                    Munich Roastery & Sensory Lab
                  </span>
                  <p className="font-serif text-lg font-bold text-white">
                    Giesen W15A Cast-Iron Drum Roaster
                  </p>
                  <p className="text-xs text-stoneIvory/80 mt-1">
                    Precision roast profiles managed through Artisan & Cropster telemetry.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Quote Card */}
            <div className="bg-espressoDeep text-stoneIvory p-6 sm:p-7 rounded-3xl border border-white/10 shadow-tactile relative overflow-hidden">
              <Quote className="w-12 h-12 text-terracotta/20 absolute -top-2 -right-2 pointer-events-none" />
              
              <p className="font-serif italic text-sm sm:text-base text-stoneIvory/90 leading-relaxed mb-4 relative z-10">
                "{t.about.quote}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center font-serif font-bold text-stoneIvory text-sm">
                  L&E
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white leading-tight">
                    {t.about.quoteAuthor}
                  </h4>
                  <p className="text-[11px] text-stoneIvory/70">
                    {t.about.quoteRole}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
