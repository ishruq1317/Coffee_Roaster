import React, { useState } from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { ROAST_PROFILES, SINGLE_ORIGIN_LOTS } from '../data/roasteryData';
import { RoastLevelKey, FlavorRadarScores, BrewRecipe } from '../types/coffee';
import { Sparkles, Thermometer, Droplets, Clock, Sliders, ChevronRight } from 'lucide-react';

export const FlavorRadarSection: React.FC = () => {
  const { language, t } = useRoastery();

  const [selectedRoastKey, setSelectedRoastKey] = useState<RoastLevelKey>('light_filter');
  const [selectedLotId, setSelectedLotId] = useState<string | null>('colombia-el-paraiso');
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  // If a lot is chosen, use its custom radar & brew recipe; otherwise use the roast profile defaults
  const activeLot = selectedLotId
    ? SINGLE_ORIGIN_LOTS.find((lot) => lot.id === selectedLotId) || null
    : null;
  const activeRoast = ROAST_PROFILES.find((p) => p.id === selectedRoastKey) || ROAST_PROFILES[0];

  const currentScores: FlavorRadarScores = activeLot
    ? activeLot.radarScores
    : activeRoast.radarDefaults;

  const currentRecipe: BrewRecipe = activeLot
    ? activeLot.brewRecipe
    : {
        method: activeRoast.bestFor[language],
        doseGrams: 18,
        waterGrams: 280,
        ratio: '1:15.5',
        waterTempC: activeRoast.roastTempC > 210 ? 91 : 94,
        grindRecommendation: 'Medium-Fine',
        brewTime: '2m 45s',
        tastingTip: {
          EN: `Optimized for ${activeRoast.name.EN}. Enjoy clean flavor separation.`,
          DE: `Abgestimmt auf die ${activeRoast.name.DE}. Klare Aromenentfaltung.`,
          FR: `Optimisé pour ${activeRoast.name.FR}. Dégustation d’une clarté absolue.`,
        },
      };

  // 6 Axis configuration for SVG Radar (starting 12 o'clock / Top at 0°, clockwise every 60°)
  const axes = [
    { key: 'acidity', label: t.radarSection.axisAcidity, angle: 0 },
    { key: 'floralFruit', label: t.radarSection.axisFloralFruit, angle: 60 },
    { key: 'sweetness', label: t.radarSection.axisSweetness, angle: 120 },
    { key: 'spiceFinish', label: t.radarSection.axisSpiceFinish, angle: 180 },
    { key: 'cocoaNut', label: t.radarSection.axisCocoaNut, angle: 240 },
    { key: 'body', label: t.radarSection.axisBody, angle: 300 },
  ] as const;

  const cx = 200;
  const cy = 200;
  const radius = 112;

  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.sin(angleInRadians),
      y: centerY - r * Math.cos(angleInRadians),
    };
  };

  // Compute polygon points for the active scores
  const polygonPoints = axes
    .map((axis) => {
      const score = currentScores[axis.key];
      const r = (score / 100) * radius;
      const pt = polarToCartesian(cx, cy, r, axis.angle);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  // Concentric background grid rings at 25%, 50%, 75%, 100%
  const gridRings = [0.25, 0.5, 0.75, 1.0];

  const handleRoastSelect = (id: RoastLevelKey) => {
    setSelectedRoastKey(id);
    setSelectedLotId(null);
  };

  const handleLotSelect = (id: string) => {
    setSelectedLotId(id);
    const lot = SINGLE_ORIGIN_LOTS.find((l) => l.id === id);
    if (lot) {
      setSelectedRoastKey(lot.roastLevel);
    }
  };

  return (
    <section id="flavor-radar" className="py-20 lg:py-28 bg-oatSurface/50 relative overflow-hidden">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest font-bold text-terracotta mb-2">
            {t.radarSection.kicker}
          </p>
          <h2 className="font-serif fluid-heading-section font-bold text-espressoDeep tracking-tight">
            {t.radarSection.title}
          </h2>
          <p className="mt-4 text-base text-textLightMuted leading-relaxed">
            {t.radarSection.subtitle}
          </p>
        </div>

        {/* 12-Column Layout: Controls & Radar & Live Recipe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1 (4 cols): Tactile Roast Spectrum & Lot Selectors */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Roast Spectrum Buttons */}
            <div className="bg-stoneIvory p-5 rounded-3xl border border-espressoDeep/10 shadow-tactile">
              <h3 className="text-xs font-bold uppercase tracking-wider text-espressoDeep mb-3">
                {t.radarSection.roastSelectorHeading}
              </h3>
              <div className="space-y-2">
                {ROAST_PROFILES.map((profile) => {
                  const isSelected = selectedRoastKey === profile.id && !selectedLotId;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => handleRoastSelect(profile.id)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 border flex items-center justify-between ${
                        isSelected
                          ? 'bg-espressoDeep text-stoneIvory border-espressoDeep shadow-md'
                          : 'bg-stoneIvory text-espressoDeep border-espressoDeep/10 hover:border-terracotta hover:bg-oatSurface/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-4 h-4 rounded-full border border-white/50 shrink-0 shadow-xs"
                          style={{ backgroundColor: profile.beanColorHex }}
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold leading-tight">
                            {profile.name[language]}
                          </p>
                          <p
                            className={`text-[11px] ${
                              isSelected ? 'text-stoneIvory/70' : 'text-textLightMuted'
                            }`}
                          >
                            {profile.roastTempC}°C • {profile.developmentTimePercent}% dev
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-terracotta translate-x-1' : 'text-espressoDeep/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Micro-Lot Quick Selector Chips */}
            <div className="bg-stoneIvory p-5 rounded-3xl border border-espressoDeep/10 shadow-tactile">
              <h3 className="text-xs font-bold uppercase tracking-wider text-espressoDeep mb-3">
                {t.radarSection.lotSelectorHeading}
              </h3>
              <div className="flex flex-wrap gap-2">
                {SINGLE_ORIGIN_LOTS.map((lot) => {
                  const isSelected = selectedLotId === lot.id;
                  return (
                    <button
                      key={lot.id}
                      onClick={() => handleLotSelect(lot.id)}
                      className={`text-xs px-3 py-2 rounded-xl border transition-all duration-200 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-terracotta text-white border-terracotta shadow-xs font-semibold'
                          : 'bg-oatSurface/40 text-espressoDeep border-espressoDeep/10 hover:border-terracotta'
                      }`}
                    >
                      <span>{lot.country}</span>
                      <span className="text-[10px] opacity-80">({lot.cuppingScore})</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Column 2 (5 cols): Interactive 6-Axis SVG Radar */}
          <div className="lg:col-span-5 bg-stoneIvory p-6 sm:p-8 rounded-4xl border border-espressoDeep/10 shadow-tactile flex flex-col items-center justify-center relative">
            
            {/* Active Label Pill */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                <span className="text-xs uppercase font-bold tracking-wider text-espressoDeep">
                  {activeLot ? activeLot.name : activeRoast.name[language]}
                </span>
              </div>
              <span className="text-xs font-serif font-bold text-terracotta px-2.5 py-0.5 rounded-full bg-terracotta/10">
                {activeLot ? `${activeLot.cuppingScore} SCA Score` : `${activeRoast.roastTempC}°C`}
              </span>
            </div>

            {/* SVG Radar Container */}
            <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full overflow-visible"
                role="img"
                aria-label="6-Axis Coffee Sensory Radar Chart"
              >
                <defs>
                  <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C85A32" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#5E1926" stopOpacity="0.65" />
                  </linearGradient>
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#C85A32" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Concentric Background Grid Rings */}
                {gridRings.map((scale, idx) => {
                  const ringRadius = radius * scale;
                  const ringPoints = axes
                    .map((axis) => {
                      const pt = polarToCartesian(cx, cy, ringRadius, axis.angle);
                      return `${pt.x},${pt.y}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={idx}
                      points={ringPoints}
                      fill={idx % 2 === 0 ? 'rgba(234, 228, 215, 0.45)' : 'rgba(246, 243, 236, 0.2)'}
                      stroke="rgba(30, 20, 16, 0.12)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* 6 Radial Axes Spokes */}
                {axes.map((axis, idx) => {
                  const edgePt = polarToCartesian(cx, cy, radius, axis.angle);
                  return (
                    <line
                      key={idx}
                      x1={cx}
                      y1={cy}
                      x2={edgePt.x}
                      y2={edgePt.y}
                      stroke="rgba(30, 20, 16, 0.15)"
                      strokeDasharray="2,2"
                      strokeWidth="1.2"
                    />
                  );
                })}

                {/* Animated Data Polygon */}
                <polygon
                  points={polygonPoints}
                  fill="url(#radarFillGrad)"
                  stroke="#C85A32"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  filter="url(#softGlow)"
                  className="transition-all duration-700 ease-out-expo"
                />

                {/* Data Points on vertices with score value badge */}
                {axes.map((axis, idx) => {
                  const score = currentScores[axis.key];
                  const r = (score / 100) * radius;
                  const pt = polarToCartesian(cx, cy, r, axis.angle);
                  const labelPt = polarToCartesian(cx, cy, radius + 28, axis.angle);
                  // Position score value slightly inward from the vertex so it never overlaps the outer axis label
                  const scoreR = Math.max(22, r - 16);
                  const scorePt = polarToCartesian(cx, cy, scoreR, axis.angle);

                  return (
                    <g
                      key={idx}
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredAxis(axis.key)}
                      onMouseLeave={() => setHoveredAxis(null)}
                      onClick={() => setHoveredAxis(hoveredAxis === axis.key ? null : axis.key)}
                    >
                      {/* Vertex Dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredAxis === axis.key ? '7' : '5'}
                        fill={hoveredAxis === axis.key ? '#C85A32' : '#1E1410'}
                        stroke="#F6F3EC"
                        strokeWidth="2"
                        className="transition-all duration-200 shadow-sm"
                      />

                      {/* Label Text */}
                      <text
                        x={labelPt.x}
                        y={labelPt.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={`text-[11px] font-sans transition-colors select-none ${
                          hoveredAxis === axis.key ? 'font-bold fill-terracotta' : 'font-semibold fill-espressoDeep'
                        }`}
                      >
                        {axis.label}
                      </text>
                      
                      {/* Inward Score Badge */}
                      <text
                        x={scorePt.x}
                        y={scorePt.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={`text-[10px] select-none ${
                          hoveredAxis === axis.key ? 'font-extrabold fill-terracotta' : 'font-bold fill-espressoDeep'
                        }`}
                      >
                        {score}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Tasting Note Pills underneath radar */}
            <div className="mt-5 w-full pt-4 border-t border-espressoDeep/10 flex flex-wrap gap-1.5 justify-center">
              {activeLot ? (
                activeLot.tastingNotes[language].map((note, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full bg-oatSurface text-espressoDeep font-medium border border-espressoDeep/10"
                  >
                    ✨ {note}
                  </span>
                ))
              ) : (
                <p className="text-xs text-textLightMuted text-center italic">
                  {activeRoast.description[language]}
                </p>
              )}
            </div>
          </div>

          {/* Column 3 (3 cols): Live Tailored Barista Brew Recipe */}
          <div className="lg:col-span-3 bg-espressoDeep text-stoneIvory p-6 rounded-4xl shadow-xl space-y-5">
            
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Sliders className="w-4 h-4 text-butterAccent" />
              <h3 className="font-serif text-base font-bold text-white">
                {t.radarSection.liveRecipeTitle}
              </h3>
            </div>

            <p className="text-xs text-butterAccent font-semibold uppercase tracking-wider">
              {currentRecipe.method}
            </p>

            <div className="space-y-3 text-xs">
              
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-stoneIvory/70">{t.radarSection.dose}</span>
                <span className="font-bold text-white">{currentRecipe.doseGrams}g</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-stoneIvory/70">{t.radarSection.water}</span>
                <span className="font-bold text-white">{currentRecipe.waterGrams}g</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-stoneIvory/70">{t.radarSection.ratio}</span>
                <span className="font-bold text-white">{currentRecipe.ratio}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-stoneIvory/70 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-terracotta" />
                  {t.radarSection.temp}
                </span>
                <span className="font-bold text-white">{currentRecipe.waterTempC}°C</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-stoneIvory/70 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-terracotta" />
                  {t.radarSection.brewTime}
                </span>
                <span className="font-bold text-white">{currentRecipe.brewTime}</span>
              </div>

              <div className="pt-1">
                <span className="text-stoneIvory/70 block mb-1">{t.radarSection.grind}</span>
                <span className="font-medium text-butterAccent text-[11px] block bg-white/5 p-2 rounded-xl border border-white/10">
                  {currentRecipe.grindRecommendation}
                </span>
              </div>

            </div>

            {/* Roaster Pro-Tip Box */}
            <div className="pt-2">
              <p className="text-[10px] uppercase font-bold tracking-wider text-terracotta mb-1">
                {t.radarSection.proTip}
              </p>
              <p className="text-xs text-stoneIvory/85 leading-relaxed italic bg-espressoWarm p-3 rounded-2xl border border-white/10">
                "{currentRecipe.tastingTip[language]}"
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
