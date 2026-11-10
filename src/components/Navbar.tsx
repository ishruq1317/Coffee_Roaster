import React, { useState, useEffect } from 'react';
import { ShoppingBag, Globe, Coins, Flame, Menu, X, Clock, MapPin } from 'lucide-react';
import { useRoastery } from '../context/RoasteryContext';
import { Language, Currency } from '../types/coffee';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    cartItemCount,
    openDrawer,
    t,
  } = useRoastery();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.flavorRadar, href: '#flavor-radar' },
    { label: t.nav.microLots, href: '#micro-lots' },
    { label: t.nav.about, href: '#about-story' },
    { label: t.nav.roastComparer, href: '#roast-science' },
    { label: t.nav.beanStore, href: '#order-beans' },
    { label: t.nav.visit, href: '#roastery-visit' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out-expo ${
        isScrolled
          ? 'py-2.5 glass-panel-light shadow-sm border-b border-espressoDeep/10 backdrop-blur-md'
          : 'py-4 bg-stoneIvory/90 backdrop-blur-sm border-b border-espressoDeep/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg"
          >
            <div className="w-9 h-9 rounded-full bg-espressoDeep text-stoneIvory flex items-center justify-center font-serif text-lg font-bold shadow-tactile group-hover:bg-terracotta transition-colors duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-espressoDeep leading-none group-hover:text-terracotta transition-colors">
                ATELIER
              </span>
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-textLightMuted">
                Kaffeerösterei
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-wider font-semibold text-espressoDeep/85">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-terracotta transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-terracotta"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Live Status, Currency, Language, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Roastery Batch Pill (Desktop Only) */}
            <div className="hidden xl:flex items-center gap-2 bg-oatSurface/70 px-3 py-1.5 rounded-full border border-espressoDeep/10 text-[11px] font-medium text-espressoDeep">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta"></span>
              </span>
              <Flame className="w-3.5 h-3.5 text-terracotta" />
              <span>{t.nav.roasteryStatus}</span>
            </div>

            {/* Currency Switcher */}
            <div className="relative inline-flex bg-oatSurface/70 p-0.5 rounded-full border border-espressoDeep/10 text-xs font-semibold">
              {(['EUR', 'GBP', 'CHF'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  aria-label={`Switch currency to ${curr}`}
                  className={`px-2 py-0.5 rounded-full transition-all duration-200 text-[11px] ${
                    currency === curr
                      ? 'bg-espressoDeep text-stoneIvory shadow-xs font-bold'
                      : 'text-textLightMuted hover:text-espressoDeep'
                  }`}
                >
                  {curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : 'CHF'}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="relative inline-flex bg-oatSurface/70 p-0.5 rounded-full border border-espressoDeep/10 text-xs font-semibold">
              {(['EN', 'DE', 'FR'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  aria-label={`Switch language to ${lang}`}
                  className={`px-2 py-0.5 rounded-full transition-all duration-200 text-[11px] ${
                    language === lang
                      ? 'bg-terracotta text-white shadow-xs font-bold'
                      : 'text-textLightMuted hover:text-espressoDeep'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={() => openDrawer(1)}
              aria-label="Open Cart and Click-and-Collect Drawer"
              className="relative flex items-center justify-center p-2.5 bg-espressoDeep text-stoneIvory rounded-full hover:bg-terracotta hover:scale-105 active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white font-sans text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stoneIvory animate-pulse-subtle">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-espressoDeep hover:text-terracotta focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-espressoDeep/10 bg-stoneIvory/98 backdrop-blur-xl px-4 pt-4 pb-6 mt-2 shadow-xl animate-fadeIn">
          {/* Mobile Roastery Status */}
          <div className="flex items-center gap-2 mb-4 bg-oatSurface px-3 py-2 rounded-xl text-xs font-medium text-espressoDeep">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta"></span>
            </span>
            <Flame className="w-4 h-4 text-terracotta" />
            <span>{t.nav.roasteryStatus}</span>
          </div>

          <div className="flex flex-col space-y-3 font-serif text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-oatSurface hover:text-terracotta transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-textLightMuted font-sans">→</span>
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-espressoDeep/10 flex items-center justify-between text-xs text-textLightMuted">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-terracotta" />
              <span>{t.nav.openHours}</span>
            </div>
            <a
              href="#roastery-visit"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1 font-semibold text-terracotta"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Munich & Zurich</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
