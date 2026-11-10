import React from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { MapPin, Navigation, Clock, Wifi, Train, Phone, Flame, ExternalLink } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';

export const RoasteryVisitMapSection: React.FC = () => {
  const { t } = useRoastery();

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Geyerstra%C3%9Fe+14+80469+M%C3%BCnchen';

  return (
    <section id="roastery-visit" className="py-20 lg:py-28 bg-oatSurface/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest font-bold text-terracotta mb-2">
            {t.visit.kicker}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espressoDeep tracking-tight">
            {t.visit.title}
          </h2>
          <p className="mt-4 text-base text-textLightMuted leading-relaxed">
            {t.visit.subtitle}
          </p>
        </div>

        {/* Live Fresh Batch Roasting Banner */}
        <div className="mb-8 p-4 rounded-3xl bg-espressoDeep text-stoneIvory flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-butterAccent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-butterAccent"></span>
            </span>
            <Flame className="w-5 h-5 text-butterAccent" />
            <span className="text-xs sm:text-sm font-semibold">{t.visit.freshBatchBanner}</span>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-butterAccent hover:underline flex items-center gap-1 shrink-0"
          >
            <span>{t.visit.navigateCounter}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 12-Column Grid: Location & Hours (6 cols) + Interactive Map & Atmosphere (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hours, Transit, Remote Workspace (6 cols) */}
          <div className="lg:col-span-6 bg-stoneIvory p-6 sm:p-8 rounded-4xl border border-espressoDeep/10 shadow-tactile flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Address Block */}
              <div>
                <div className="flex items-center gap-2 mb-2 text-terracotta">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-serif text-lg font-bold text-espressoDeep">{t.visit.addressTitle}</h3>
                </div>
                <p className="text-sm font-semibold text-espressoDeep">{t.visit.addressLine1}</p>
                <p className="text-xs text-textLightMuted">{t.visit.addressLine2}</p>
                <p className="text-xs text-textLightMuted mt-2 flex items-center gap-1.5">
                  <Train className="w-4 h-4 text-terracotta shrink-0" />
                  <span>{t.visit.transit}</span>
                </p>
              </div>

              {/* Hours Grid */}
              <div className="pt-4 border-t border-espressoDeep/10">
                <div className="flex items-center gap-2 mb-3 text-terracotta">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-serif text-lg font-bold text-espressoDeep">{t.visit.hoursTitle}</h3>
                </div>
                <div className="space-y-2 text-xs text-espressoDeep font-medium">
                  <div className="py-1 border-b border-espressoDeep/5 flex items-center justify-between">
                    <span>{t.visit.weekdays}</span>
                  </div>
                  <div className="py-1 border-b border-espressoDeep/5 flex items-center justify-between">
                    <span>{t.visit.saturday}</span>
                  </div>
                  <div className="py-1 flex items-center justify-between">
                    <span>{t.visit.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Remote Worker & WiFi Card */}
              <div className="bg-oatSurface/60 p-4 rounded-2xl border border-espressoDeep/10 flex items-start gap-3">
                <Wifi className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-espressoDeep">{t.visit.digitalNomadTitle}</p>
                  <p className="text-textLightMuted mt-0.5">{t.visit.wifiSpeed}</p>
                </div>
              </div>
            </div>

            {/* CTAs: Directions + Direct Call */}
            <div className="pt-4 border-t border-espressoDeep/10 flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-full bg-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-terracottaHover transition-all shadow-md active:scale-98"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.visit.directionsCta}</span>
              </a>

              <a
                href="tel:+49894528901"
                className="py-3.5 px-5 rounded-full bg-oatSurface text-espressoDeep hover:bg-[#dcd4c3] border border-espressoDeep/10 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 text-terracotta" />
                <span>{t.visit.callBarista}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Stylized Map Card & Cafe Interior (6 cols) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Cafe & Roastery Atmosphere Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-espressoDeep/10 h-64 sm:h-72">
              <ResponsiveImage
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
                alt="ATELIER Kaffeerösterei Munich Flagship Interior"
                aspectRatio="aspect-auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espressoDeep/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-stoneIvory">
                <p className="text-[10px] uppercase font-bold tracking-widest text-butterAccent">
                  Espresso Bar & Cupping Room
                </p>
                <p className="font-serif text-lg font-bold text-white">
                  Custom Slayer Steam LP & Mahlkönig EK43S
                </p>
              </div>
            </div>

            {/* Stylized Google Map Snapshot Card with Navigation Trigger */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden p-6 bg-espressoDeep text-stoneIvory shadow-tactile border border-white/10 hover:border-terracotta transition-all flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-butterAccent text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Google Maps Pin</span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-butterAccent transition-colors">
                  ATELIER Kaffeerösterei München
                </h4>
                <p className="text-xs text-stoneIvory/70">
                  {t.visit.verifiedReviews}
                </p>
              </div>

              <div className="w-12 h-12 rounded-full bg-terracotta text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                <Navigation className="w-5 h-5" />
              </div>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
