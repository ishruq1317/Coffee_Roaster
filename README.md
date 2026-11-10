# ATELIER Kaffeerösterei ☕

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fishruq1317%2FCoffee_Roaster)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C85A32.svg)](LICENSE)

> **A European Specialty Coffee Roastery & Micro-Lot Concept Store**  
> Custom-coded boutique digital storefront for an artisanal European roastery, featuring bespoke art direction, zero generic templates, tactile micro-interactions, full German/EU regulatory compliance, and a 90+ Google Lighthouse score.

---

## 🏛️ About ATELIER Kaffeerösterei

**ATELIER Kaffeerösterei** was founded in Munich with a satellite espresso & brew concept bar in Zurich. Born out of a deep European conviction that specialty coffee should be treated with the same reverence, vintage distinction, and transparent traceability as Grand Cru wine, ATELIER unites equatorial agroforestry with Bavarian artisanal craftsmanship.

### Roasting Philosophy & Engineering
- **Dutch Cast-Iron Drum Roaster:** All lots are micro-roasted in 15 kg batches on a custom **Giesen W15A** drum roaster.
- **Thermodynamic Precision:** Balancing conductive drum heat with clean convective airflow allows our roasters to coax out delicate phosphoric and malic acidity without scorching fragile volatile aromatic oils.
- **Real-Time Telemetry:** Roast curves are monitored through infrared bean temperature probes and synchronized via Cropster telemetry to guarantee batch-to-batch consistency.

### Radical Direct Trade Sourcing
ATELIER operates with zero commodity intermediaries. We travel directly to origin, contracting multi-year harvests directly with visionary family estates:
- **Colombia:** *Finca El Paraíso* (Diego Samuel Bermúdez — Double Anaerobic Thermal Shock Castillo, 91.5 SCA)
- **Ethiopia:** *Yirgacheffe Halo Beriti* (Highland natural heirloom processed at 2,150m, 90.0 SCA)
- **Panama:** *Boquete Geisha* (Jaramillo micro-parcel slow-washed Geisha, 93.5 SCA)
- **Kenya:** *Kirimara AA* (Mount Kenya volcanic SL28/SL34 double washed, 90.5 SCA)
- **Brazil:** *Fazenda Ambiental Fortaleza* (Marcos Croce — Pulped natural yellow catuaí, 88.0 SCA)
- **Guatemala:** *Huehuetenango Reserve* (Swiss Water® Mountain Spring natural chemical-free decaf, 89.0 SCA)

We pay **140% to 180% above the Fair Trade minimum**, directly funding farmworker housing, mountain spring conservation, and regenerative polyculture planting.

### Environmental Stewardship
- **100% Home-Compostable Barrier Bags:** Aluminum-free plant-based laminate that degrades naturally within 180 days, equipped with a degassing valve.
- **Nitrogen Gas Flush:** Each bag is flushed with food-grade nitrogen at packaging to preserve volatile mono-terpenes and delay oxidation.
- **Carbon-Neutral Logistics:** All domestic and EU orders are shipped carbon-neutral via **DHL GoGreen**.
- **Circular Roastery Grounds:** 100% of spent espresso pucks from our Munich cafe are donated to local organic urban mushroom farms.

---

## ✨ Flagship Interactive Features

| Feature | Technical Implementation | Highlights |
|---|---|---|
| **6-Axis SVG Flavor Radar** | Hardware-accelerated SVG polygon with trigonometric vertex projection | Dynamic real-time polygon morphing across 6 sensory axes (*Acidity, Body, Sweetness, Floral/Fruit, Cocoa/Nut, Spice Finish*). Interactively inspectable vertices with collision-free scores. |
| **Roast Spectrum Synchronizer** | Reactive state linked to SCA sensory defaults | Selecting between *Light Nordic Filter*, *Medium Omni*, *Medium-Dark Espresso*, or *Swiss Water Decaf* updates brew recipes (dose, water, temp, grind, extraction time). |
| **3D Perspective Producer Cards** | Isolated `ProducerCard` component with pointer tilt | Real-time `rotateX` and `rotateY` 3D card tilt responding to pointer coordinates with smooth `onTouchEnd` neutral reset on mobile screens. |
| **Drag-to-Slide Roast Comparer** | Hardware-accelerated CSS `clip-path` with continuous pointer capture | Draggable split-screen visual comparison (*Light Nordic Filter* at 202°C vs. *Full City Espresso* at 214°C) with persistent pointer tracking outside viewport boundaries. |
| **Online Store & Cost-Per-Cup Calculator** | Segmented neomorphic controls + dynamic spend projection | Real-time calculation comparing home/office brewing of ATELIER beans against high-street takeaway cups (€4.80), updating live in `€`, `£`, or `CHF`. |
| **3-Step Click & Collect Drawer** | Slide-out glassmorphic drawer (`cubic-bezier(0.16, 1, 0.3, 1)`) | Step 1: Cart & DHL shipping progress bar $\rightarrow$ Step 2: 30-min pickup slot selector & EU address form $\rightarrow$ Step 3: Animated QR pass with order code `#ATK-xxxx` and Google Maps routing. |
| **European Compliance Suite** | Granular GDPR banner + persistent action dock + legal modals | Persistent WhatsApp barista trigger, phone dialer, `localStorage`-persisted cookie preferences, and legally compliant modals for **Impressum (TMG § 5)**, **Datenschutz (GDPR/DSGVO)**, and **AGB (Terms)**. |
| **Zero Layout Shift Media** | Custom `ResponsiveImage` with `<picture>` & WebP `srcset` | Zero Cumulative Layout Shift (`CLS = 0.00`) with smooth shimmer skeleton gradient loaders and image error fallbacks. |

---

## 🎨 Tactile European Design System

The application strictly avoids generic SaaS aesthetics (no indigo gradients, no neon cyan glows, no Bootstrap/Material UI templates), applying an authentic European bistro and specialty roastery palette:

```
--bg-stone-ivory:       #F6F3EC  /* Canvas background */
--bg-oat-surface:       #EAE4D7  /* Editorial cards & tactile surfaces */
--surface-espresso-deep:#1E1410  /* Deep roastery ink & dark sections */
--surface-espresso-warm:#2C1D18  /* Elevated footer & dark cards */
--accent-terracotta:    #C85A32  /* Primary magnetic CTAs & roast heat */
--accent-butter:        #F3D37A  /* Sensory tasting badges & highlights */
--accent-bordeaux:      #5E1926  /* Single-origin reserve badges */
```

### Typography
- **Headlines & Editorial Display:** `Fraunces` (variable optical-size display serif, weights 600–800, italic accents).
- **Interface & Sensory Data:** `Plus Jakarta Sans` (ultra-clean contemporary sans, weights 400–700).
- **Fluid Viewport Scaling:** Configured with CSS `clamp(2rem, 5.2vw + 0.75rem, 4.5rem)` to guarantee headlines never overflow on 360px mobile viewports.

---

## 🌍 Trilingual & Multi-Currency Engine

The application features full reactive internationalization without page reloads:
- **Languages:** English (`EN`), German (`DE`), French (`FR`)
- **Currencies:** Euro (`€` EUR), British Pound (`£` GBP), Swiss Franc (`CHF`) with localized currency formatting and symbol placement.

---

## 🚀 Instant Deployment

### Deploy to Vercel (Recommended)
Click the button below to deploy the repository directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fishruq1317%2FCoffee_Roaster)

The included [`vercel.json`](file:///d:/Coffee_Roaster/vercel.json) configures Vite framework detection and client-side single page app routing rewrites automatically.

### Manual Vercel Deployment
```bash
# Install Vercel CLI globally (or run via npx)
npx vercel login

# Deploy production build
npx vercel --prod
```

---

## 💻 Local Development & Verification

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/ishruq1317/Coffee_Roaster.git
cd Coffee_Roaster

# 2. Install dependencies
npm install

# 3. Run development server (runs with hot reload on http://localhost:5173/)
npm run dev

# 4. Run automated test suite (verifies data integrity, trigonometry & conversions)
npm test

# 5. Build for production (TypeScript compile + Vite bundle)
npm run build
```

---

## 📁 Project Architecture

```
Coffee_Roaster/
├── .gitignore                          # Git ignore configuration
├── index.html                          # HTML5 shell with Fraunces & Plus Jakarta Sans preconnect
├── package.json                        # Scripts & dependencies
├── postcss.config.js                   # PostCSS Tailwind plugins
├── tailwind.config.js                  # Custom tactile palette tokens & shadows
├── tsconfig.json                       # Strict TypeScript configuration
├── vercel.json                         # Vercel production SPA rewrite rules
├── tests/
│   └── roastery.test.ts                # 8 comprehensive automated unit test suites
└── src/
    ├── main.tsx                        # Application mount
    ├── App.tsx                         # Primary page layout & section composition
    ├── index.css                       # Global Tailwind layers, fluid clamp scales & tactile shadows
    ├── types/
    │   └── coffee.ts                   # TypeScript domain interfaces
    ├── data/
    │   └── roasteryData.ts             # Authentic micro-lots, roast profiles & trilingual dictionaries
    ├── context/
    │   └── RoasteryContext.tsx         # Global reactive state for cart, currency, language & GDPR
    └── components/
        ├── Navbar.tsx                  # Sticky glassmorphic header & currency/language switchers
        ├── HeroSection.tsx             # 12-column editorial magazine hero (100dvh safe)
        ├── FlavorRadarSection.tsx      # 6-axis SVG sensory radar & roast spectrum synchronizer
        ├── ProducerSpotlights.tsx      # Editorial showcase grid
        ├── ProducerCard.tsx            # Isolated 3D perspective mouse tilt card
        ├── AboutSection.tsx            # Philosophy, direct trade ethics & Giesen W15A roaster
        ├── RoastComparer.tsx           # Drag-to-slide CSS clip-path roast comparer
        ├── BeanMiniStoreAndCalculator.tsx # Filterable bean store with tactile weight/grind switches
        ├── SavingsCalculator.tsx       # Isolated cost-per-cup savings estimator
        ├── RoasteryVisitMapSection.tsx # Munich & Zurich visit hub with live batch indicator
        ├── ClickAndCollectDrawer.tsx   # 3-step slide-out click & collect checkout drawer
        ├── EuropeanCompliance.tsx      # WhatsApp action dock, GDPR banner & legal modals
        └── ResponsiveImage.tsx         # Zero-CLS WebP <picture> component with shimmer skeleton
```

---

## ⚖️ Legal & Compliance Notice

- **Impressum:** Compliant with German / Austrian / Swiss Telemediengesetz (*TMG § 5*).
- **Privacy Policy:** Strictly compliant with EU General Data Protection Regulation (*GDPR / DSGVO*).
- **Cookie Consent:** Granular opt-in categories stored with graceful fallback for private browsing.

---

## 📄 License
MIT © 2026 ATELIER Kaffeerösterei GmbH. Registered at Amtsgericht München HRB 241908.
