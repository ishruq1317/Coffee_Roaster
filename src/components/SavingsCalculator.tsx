import React, { useState } from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { Calculator, PiggyBank, Sparkles } from 'lucide-react';
import { SINGLE_ORIGIN_LOTS } from '../data/roasteryData';

interface SavingsCalculatorProps {
  onQuickOrder1kg?: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onQuickOrder1kg }) => {
  const { t, formatMoney, addToCart, setIsDrawerOpen } = useRoastery();

  const [cupsPerDay, setCupsPerDay] = useState(3);
  const [cafeCupPriceEUR, setCafeCupPriceEUR] = useState(4.80);

  // Atelier cost per double shot is ~€0.62 (18g dose of €34/kg specialty coffee)
  const atelierCupCostEUR = 0.62;
  const daysInMonth = 30.5;
  const monthlyCafeSpendEUR = cupsPerDay * cafeCupPriceEUR * daysInMonth;
  const monthlyAtelierSpendEUR = cupsPerDay * atelierCupCostEUR * daysInMonth;
  const monthlySavingsEUR = Math.max(0, monthlyCafeSpendEUR - monthlyAtelierSpendEUR);
  const yearlySavingsEUR = monthlySavingsEUR * 12;

  const handleOrder1kg = () => {
    if (onQuickOrder1kg) {
      onQuickOrder1kg();
    } else {
      addToCart(SINGLE_ORIGIN_LOTS[0], '1kg', 'whole', false, 1);
      setIsDrawerOpen(true);
    }
  };

  return (
    <div className="bg-espressoDeep text-stoneIvory p-6 sm:p-8 rounded-4xl shadow-xl space-y-6 border border-white/10">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <Calculator className="w-5 h-5 text-butterAccent" />
        <div>
          <h3 className="font-serif text-lg font-bold text-white leading-tight">
            {t.store.savingCalculatorTitle}
          </h3>
        </div>
      </div>

      <p className="text-xs text-stoneIvory/80 leading-relaxed">
        {t.store.savingCalculatorDesc}
      </p>

      {/* Slider 1: Cups per Day */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>{t.store.cupsPerDay}</span>
          <span className="text-butterAccent font-bold font-serif text-base">
            {cupsPerDay} {t.store.cupsPerDayUnit}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={cupsPerDay}
          onChange={(e) => setCupsPerDay(Number(e.target.value))}
          className="w-full accent-terracotta cursor-pointer"
          aria-label={t.store.cupsPerDay}
        />
        <div className="flex justify-between text-[10px] text-stoneIvory/50">
          <span>{t.store.soloTier}</span>
          <span>{t.store.coupleTier}</span>
          <span>{t.store.studioTier}</span>
        </div>
      </div>

      {/* Slider 2: Cafe Takeaway Price */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>{t.store.cafeCupPrice}</span>
          <span className="text-butterAccent font-bold font-serif text-base">
            {formatMoney(cafeCupPriceEUR)}
          </span>
        </div>
        <input
          type="range"
          min="2.50"
          max="7.50"
          step="0.25"
          value={cafeCupPriceEUR}
          onChange={(e) => setCafeCupPriceEUR(Number(e.target.value))}
          className="w-full accent-terracotta cursor-pointer"
          aria-label={t.store.cafeCupPrice}
        />
        <div className="flex justify-between text-[10px] text-stoneIvory/50">
          <span>{formatMoney(2.50)} (Filter)</span>
          <span>{formatMoney(4.80)} (Flat White)</span>
          <span>{formatMoney(7.50)} (Zurich/London)</span>
        </div>
      </div>

      {/* Live Savings Outputs */}
      <div className="bg-espressoWarm p-5 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-stoneIvory/80">{t.store.monthlySavings}</span>
          <span className="font-serif text-2xl font-bold text-butterAccent">
            {formatMoney(monthlySavingsEUR)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-xs text-stoneIvory/80 font-bold">{t.store.yearlySavings}</span>
          <span className="font-serif text-xl font-bold text-white">
            {formatMoney(yearlySavingsEUR)} / yr
          </span>
        </div>

        <div className="pt-2 text-[11px] text-stoneIvory/60 flex items-center gap-1.5">
          <PiggyBank className="w-3.5 h-3.5 text-terracotta" />
          <span>{t.store.atelierCupCost} {formatMoney(atelierCupCostEUR)}</span>
        </div>
      </div>

      {/* Direct 1kg Roaster Bag CTA */}
      <button
        onClick={handleOrder1kg}
        className="w-full py-3.5 px-4 rounded-full bg-butterAccent text-espressoDeep font-bold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-espressoDeep" />
        <span>{t.store.order1kgCta}</span>
      </button>
    </div>
  );
};

export default SavingsCalculator;
