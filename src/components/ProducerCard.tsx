import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { SingleOriginLot, BagWeight, GrindOption } from '../types/coffee';
import { ResponsiveImage } from './ResponsiveImage';
import { Mountain, Award, ShieldCheck, Check, ShoppingBag, SlidersHorizontal } from 'lucide-react';

export interface ProducerCardProps {
  lot: SingleOriginLot;
  index: number;
}

export const ProducerCard: React.FC<ProducerCardProps> = ({ lot, index }) => {
  const { language, t, addToCart, formatMoney } = useRoastery();
  const cardRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [selectedWeight, setSelectedWeight] = useState<BagWeight>('250g');
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('whole');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // 3D Perspective Tilt calculation (smooth mouse pointer reaction)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleTouchEnd = () => {
    setTilt({ x: 0, y: 0 });
  };

  const calculateEffectivePrice = (weight: BagWeight): number => {
    let multiplier = 1;
    if (weight === '500g') multiplier = 1.84;
    if (weight === '1kg') multiplier = 3.4;
    return lot.basePriceEUR * multiplier;
  };

  const currentPrice = calculateEffectivePrice(selectedWeight);

  const handleAdd = () => {
    addToCart(lot, selectedWeight, selectedGrind, false, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const weights: BagWeight[] = ['250g', '500g', '1kg'];
  const grinds: { id: GrindOption; key: GrindOption }[] = [
    { id: 'whole', key: 'whole' },
    { id: 'v60', key: 'v60' },
    { id: 'espresso', key: 'espresso' },
    { id: 'aeropress', key: 'aeropress' },
    { id: 'french_press', key: 'french_press' },
  ];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
      className={`group bg-stoneIvory rounded-3xl overflow-hidden border border-espressoDeep/10 shadow-tactile hover:shadow-2xl flex flex-col justify-between ${
        index % 3 === 1 ? 'lg:translate-y-6' : ''
      }`}
    >
      {/* Top Media & Badges */}
      <div>
        <div className="relative overflow-hidden">
          <ResponsiveImage
            src={lot.image}
            alt={lot.name}
            aspectRatio="aspect-[16/11]"
            className="group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Badge: Cupping score & origin tag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <span className="glass-panel-dark text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
              <Award className="w-3.5 h-3.5 text-butterAccent" />
              {lot.cuppingScore} SCA
            </span>
            {lot.badge && (
              <span className="bg-terracotta text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {lot.badge}
              </span>
            )}
          </div>

          {/* Farm Elevation Tag */}
          <div className="absolute bottom-3 right-3 glass-panel-light text-espressoDeep px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 shadow-sm">
            <Mountain className="w-3.5 h-3.5 text-terracotta" />
            <span>{lot.elevationMeters}m MASL</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
                {lot.country} • {lot.region}
              </span>
              <span className="font-serif text-lg font-bold text-espressoDeep">
                {formatMoney(currentPrice)}
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-espressoDeep mt-1 group-hover:text-terracotta transition-colors leading-snug">
              {lot.name}
            </h3>
            <p className="text-xs text-textLightMuted mt-1 font-medium">
              {t.producers.producerLabel} <span className="text-espressoDeep font-semibold">{lot.farmProducer}</span>
            </p>
          </div>

          {/* Process & Varietal Spec Strip */}
          <div className="bg-oatSurface/50 p-3 rounded-2xl border border-espressoDeep/5 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-textLightMuted uppercase block">{t.producers.process}</span>
              <span className="font-semibold text-espressoDeep truncate block">{lot.process}</span>
            </div>
            <div>
              <span className="text-[10px] text-textLightMuted uppercase block">{t.producers.varietal}</span>
              <span className="font-semibold text-espressoDeep truncate block">{lot.varietal}</span>
            </div>
          </div>

          {/* Tasting Note Badges */}
          <div className="flex flex-wrap gap-1.5">
            {lot.tastingNotes[language].map((note, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white text-espressoDeep border border-espressoDeep/10"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Direct Trade Premium Banner */}
          <div className="flex items-center gap-1.5 text-xs text-terracotta font-medium pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lot.directTradePremium}</span>
          </div>

          {/* Expandable In-Card Tactile Configurator */}
          {isConfigOpen && (
            <div className="pt-3 border-t border-espressoDeep/10 space-y-3 animate-fadeIn">
              {/* Weight Selector */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espressoDeep block mb-1.5">
                  {t.producers.size}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {weights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`py-1.5 text-xs font-semibold rounded-xl border transition-all relative ${
                        selectedWeight === w
                          ? 'bg-espressoDeep text-stoneIvory border-espressoDeep shadow-xs'
                          : 'bg-stoneIvory text-espressoDeep border-espressoDeep/10 hover:border-terracotta'
                      }`}
                    >
                      <span>{w}</span>
                      {w === '500g' && (
                        <span className="text-[8px] block text-butterAccent leading-none">-8%</span>
                      )}
                      {w === '1kg' && (
                        <span className="text-[8px] block text-butterAccent leading-none">-15%</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-espressoDeep block mb-1.5">
                  {t.producers.grind}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {grinds.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGrind(g.id)}
                      className={`py-1.5 px-2 text-left text-[11px] font-medium rounded-xl border truncate transition-all ${
                        selectedGrind === g.id
                          ? 'bg-terracotta text-white border-terracotta shadow-xs'
                          : 'bg-stoneIvory text-espressoDeep border-espressoDeep/10 hover:border-terracotta'
                      }`}
                    >
                      {t.store.grindLabels[g.key]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 sm:p-6 pt-0 flex items-center gap-2">
        <button
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          aria-label="Toggle grind and weight options"
          className="p-3 rounded-2xl bg-oatSurface border border-espressoDeep/10 hover:bg-[#ded5c4] text-espressoDeep transition-colors"
          title="Configure Grind & Weight"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        <button
          onClick={handleAdd}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
            justAdded
              ? 'bg-green-700 text-white'
              : 'bg-espressoDeep text-stoneIvory hover:bg-terracotta active:scale-98'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>{t.producers.addedToBag}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{t.producers.addToBag}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
