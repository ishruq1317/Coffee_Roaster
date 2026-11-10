import React from 'react';
import { useRoastery } from '../context/RoasteryContext';
import { SINGLE_ORIGIN_LOTS } from '../data/roasteryData';
import { ProducerCard } from './ProducerCard';

export const ProducerSpotlights: React.FC = () => {
  const { t } = useRoastery();

  return (
    <section id="micro-lots" className="py-20 lg:py-28 bg-stoneIvory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-widest font-bold text-terracotta mb-2">
            {t.producers.kicker}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espressoDeep tracking-tight">
            {t.producers.title}
          </h2>
          <p className="mt-4 text-base text-textLightMuted leading-relaxed">
            {t.producers.subtitle}
          </p>
        </div>

        {/* Staggered Asymmetrical Grid of 6 Micro-Lots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SINGLE_ORIGIN_LOTS.map((lot, index) => (
            <ProducerCard key={lot.id} lot={lot} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProducerSpotlights;
