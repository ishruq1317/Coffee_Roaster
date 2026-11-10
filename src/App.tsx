import React from 'react';
import { RoasteryProvider } from './context/RoasteryContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlavorRadarSection } from './components/FlavorRadarSection';
import { ProducerSpotlights } from './components/ProducerSpotlights';
import { AboutSection } from './components/AboutSection';
import { RoastComparer } from './components/RoastComparer';
import { BeanMiniStoreAndCalculator } from './components/BeanMiniStoreAndCalculator';
import { RoasteryVisitMapSection } from './components/RoasteryVisitMapSection';
import { ClickAndCollectDrawer } from './components/ClickAndCollectDrawer';
import { EuropeanCompliance } from './components/EuropeanCompliance';

export const App: React.FC = () => {
  return (
    <RoasteryProvider>
      <div className="min-h-screen bg-stoneIvory text-espressoDeep flex flex-col font-sans selection:bg-terracotta selection:text-white">
        
        {/* Sticky Glassmorphic Header */}
        <Navbar />

        {/* Primary Page Flow */}
        <main className="flex-1">
          {/* 1. Asymmetrical Magazine Hero */}
          <HeroSection />

          {/* 2. Interactive 6-Axis SVG Flavor Radar & Roast Spectrum */}
          <FlavorRadarSection />

          {/* 3. 3D Tilt Single-Origin Producer Spotlights */}
          <ProducerSpotlights />

          {/* 4. Our Story & Roasting Philosophy */}
          <AboutSection />

          {/* 5. Drag-to-Slide Roast Comparer */}
          <RoastComparer />

          {/* 6. Online Store Configurator & Cost-Per-Cup Savings Estimator */}
          <BeanMiniStoreAndCalculator />

          {/* 7. Roastery Visit, Live Batch Indicator & Google Maps Directions */}
          <RoasteryVisitMapSection />
        </main>

        {/* Floating Dock, GDPR Banner, Legal Modals & EU Footer */}
        <EuropeanCompliance />

        {/* Slide-Out 3-Step Click & Collect Drawer */}
        <ClickAndCollectDrawer />

      </div>
    </RoasteryProvider>
  );
};

export default App;
