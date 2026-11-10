import React, { useState } from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { SINGLE_ORIGIN_LOTS } from '../data/roasteryData';
import { SingleOriginLot, BagWeight, GrindOption } from '../types/coffee';
import { Check, ShoppingBag, Repeat } from 'lucide-react';
import { SavingsCalculator } from './SavingsCalculator';

export const BeanMiniStoreAndCalculator: React.FC = () => {
  const { t, addToCart, formatMoney } = useRoastery();

  // Mini-store state
  const [activeFilter, setActiveFilter] = useState<'all' | 'filter' | 'omni' | 'decaf'>('all');
  const [selectedLot, setSelectedLot] = useState<SingleOriginLot>(SINGLE_ORIGIN_LOTS[0]);
  const [selectedWeight, setSelectedWeight] = useState<BagWeight>('250g');
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('whole');
  const [isSubscription, setIsSubscription] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Filter lots
  const filteredLots = SINGLE_ORIGIN_LOTS.filter((lot) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'filter') return lot.roastLevel === 'light_filter';
    if (activeFilter === 'omni') return lot.roastLevel === 'medium_omni' || lot.roastLevel === 'medium_dark';
    if (activeFilter === 'decaf') return lot.roastLevel === 'swiss_water_decaf';
    return true;
  });

  // Calculate price for selected lot & config
  const calculateConfiguredPrice = (): number => {
    let multiplier = 1;
    if (selectedWeight === '500g') multiplier = 1.84;
    if (selectedWeight === '1kg') multiplier = 3.4;

    let total = selectedLot.basePriceEUR * multiplier;
    if (isSubscription) {
      total = total * 0.88;
    }
    return total;
  };

  const handleAddConfigured = () => {
    addToCart(selectedLot, selectedWeight, selectedGrind, isSubscription, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const weights: { key: BagWeight; badge?: string }[] = [
    { key: '250g' },
    { key: '500g', badge: '-8%' },
    { key: '1kg', badge: '-15%' },
  ];

  const grinds: { key: GrindOption }[] = [
    { key: 'whole' },
    { key: 'v60' },
    { key: 'espresso' },
    { key: 'aeropress' },
    { key: 'french_press' },
  ];

  return (
    <section id="order-beans" className="py-20 lg:py-28 bg-stoneIvory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-terracotta mb-2">
            {t.store.kicker}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espressoDeep tracking-tight">
            {t.store.title}
          </h2>
          <p className="mt-4 text-base text-textLightMuted leading-relaxed">
            {t.store.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: t.store.filterAll },
            { id: 'filter', label: t.store.filterFilter },
            { id: 'omni', label: t.store.filterOmni },
            { id: 'decaf', label: t.store.filterDecaf },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === tab.id
                  ? 'bg-espressoDeep text-stoneIvory shadow-sm'
                  : 'bg-oatSurface/70 text-espressoDeep hover:bg-oatSurface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 12-Column Grid: Configurator on Left (7 cols), Interactive Savings Calculator on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bean Configurator Card (7 Cols) */}
          <div className="lg:col-span-7 bg-oatSurface/30 p-6 sm:p-8 rounded-4xl border border-espressoDeep/10 shadow-tactile space-y-6">
            
            {/* Bean Selector Dropdown / Grid */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-espressoDeep block mb-2.5">
                {t.store.chooseLot}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredLots.map((lot) => {
                  const isSelected = selectedLot.id === lot.id;
                  return (
                    <button
                      key={lot.id}
                      onClick={() => setSelectedLot(lot)}
                      className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-stoneIvory border-terracotta shadow-md ring-1 ring-terracotta'
                          : 'bg-stoneIvory/60 border-espressoDeep/10 hover:border-espressoDeep/30'
                      }`}
                    >
                      <img
                        src={lot.image}
                        alt={lot.name}
                        className="w-11 h-11 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-espressoDeep truncate">{lot.name}</p>
                        <p className="text-[10px] text-textLightMuted">{lot.country} • {lot.cuppingScore} SCA</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bag Weight Tactile Segmented Switch */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-espressoDeep block mb-2.5">
                {t.store.weightLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {weights.map((w) => (
                  <button
                    key={w.key}
                    onClick={() => setSelectedWeight(w.key)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold text-center border transition-all relative ${
                      selectedWeight === w.key
                        ? 'bg-espressoDeep text-stoneIvory border-espressoDeep shadow-md'
                        : 'bg-stoneIvory text-espressoDeep border-espressoDeep/10 hover:border-terracotta'
                    }`}
                  >
                    <span>{t.store.weightLabels[w.key]}</span>
                    {w.badge && (
                      <span className="absolute -top-2 -right-1 bg-terracotta text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                        {w.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Precision Grind Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-espressoDeep block mb-2.5">
                {t.store.grindLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {grinds.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setSelectedGrind(g.key)}
                    className={`p-3 rounded-2xl text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                      selectedGrind === g.key
                        ? 'bg-terracotta text-white border-terracotta shadow-xs'
                        : 'bg-stoneIvory text-espressoDeep border-espressoDeep/10 hover:border-terracotta'
                    }`}
                  >
                    <span>{t.store.grindLabels[g.key]}</span>
                    {selectedGrind === g.key && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription Toggle */}
            <div
              onClick={() => setIsSubscription(!isSubscription)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                isSubscription
                  ? 'bg-butterAccent/25 border-butterAccent/80 shadow-xs'
                  : 'bg-stoneIvory border-espressoDeep/10 hover:border-espressoDeep/25'
              }`}
            >
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  checked={isSubscription}
                  onChange={() => {}}
                  className="rounded text-terracotta focus:ring-terracotta h-4 w-4 pointer-events-none"
                />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-espressoDeep flex items-center gap-1.5">
                  <Repeat className="w-3.5 h-3.5 text-terracotta" />
                  <span>{t.store.subscriptionLabel}</span>
                </p>
                <p className="text-[11px] text-textLightMuted">
                  {t.store.subscriptionDesc}
                </p>
              </div>
            </div>

            {/* Summary & Add Button */}
            <div className="pt-4 border-t border-espressoDeep/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-textLightMuted block">
                  {t.store.configuredPrice}
                </span>
                <span className="font-serif text-2xl font-bold text-espressoDeep">
                  {formatMoney(calculateConfiguredPrice())}
                </span>
                {isSubscription && (
                  <span className="ml-2 text-xs text-terracotta font-semibold">
                    {t.store.subDiscountApplied}
                  </span>
                )}
              </div>

              <button
                onClick={handleAddConfigured}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  justAdded
                    ? 'bg-green-700 text-white'
                    : 'bg-espressoDeep text-stoneIvory hover:bg-terracotta active:scale-98'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.store.addedToBag}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.store.addBagButton}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Interactive Cost-Per-Cup Savings Estimator (5 Cols - Modular Component) */}
          <div className="lg:col-span-5">
            <SavingsCalculator
              onQuickOrder1kg={() => {
                setSelectedWeight('1kg');
                addToCart(selectedLot, '1kg', selectedGrind, isSubscription, 1);
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default BeanMiniStoreAndCalculator;
