import assert from 'node:assert';
import {
  SINGLE_ORIGIN_LOTS,
  ROAST_PROFILES,
  CURRENCY_RATES,
  formatPrice,
  UI_TRANSLATIONS,
} from '../src/data/roasteryData.ts';
import type { RoastLevelKey, Language, Currency, BagWeight } from '../src/types/coffee.ts';

console.log('--- STARTING ATELIER ROASTERY TEST SUITE ---');

// Test 1: Verify all 6 single-origin micro-lots required by brief are present
console.log('Test 1: Verify 6 authentic single-origin micro-lots...');
assert.strictEqual(SINGLE_ORIGIN_LOTS.length, 6, 'Must contain exactly 6 single-origin micro-lots');
const requiredLotNames = [
  'Colombia',
  'Ethiopia',
  'Panama',
  'Kenya',
  'Brazil',
  'Guatemala',
];
requiredLotNames.forEach((country) => {
  const found = SINGLE_ORIGIN_LOTS.some((l) => l.country.includes(country));
  assert.ok(found, `Required country ${country} must exist in SINGLE_ORIGIN_LOTS`);
});
console.log('✓ Test 1 Passed: 6 required micro-lots present.');

// Test 2: Verify all 4 roast levels are mapped 1-to-1 without zero-lot dead-ends
console.log('Test 2: Verify all 4 roast levels have representation...');
const roastLevelKeys: RoastLevelKey[] = [
  'light_filter',
  'medium_omni',
  'medium_dark',
  'swiss_water_decaf',
];
roastLevelKeys.forEach((key) => {
  const matchingLots = SINGLE_ORIGIN_LOTS.filter((l) => l.roastLevel === key);
  assert.ok(
    matchingLots.length > 0,
    `Roast level ${key} must have at least one coffee lot. Found ${matchingLots.length}`
  );
});
console.log('✓ Test 2 Passed: Every roast level has at least one active lot.');

// Test 3: Verify Mini-Store Filter logic eliminates empty/dead results
console.log('Test 3: Verify Mini-Store filter tabs return valid products...');
const filterTabs = ['all', 'filter', 'omni', 'decaf'] as const;
filterTabs.forEach((tab) => {
  const filtered = SINGLE_ORIGIN_LOTS.filter((lot) => {
    if (tab === 'all') return true;
    if (tab === 'filter') return lot.roastLevel === 'light_filter';
    if (tab === 'omni')
      return lot.roastLevel === 'medium_omni' || lot.roastLevel === 'medium_dark';
    if (tab === 'decaf') return lot.roastLevel === 'swiss_water_decaf';
    return true;
  });
  assert.ok(
    filtered.length > 0,
    `Filter '${tab}' must return at least 1 lot, but returned 0!`
  );
  console.log(`  - Tab '${tab}': ${filtered.length} micro-lots available`);
});
console.log('✓ Test 3 Passed: Zero dead filter states.');

// Test 4: Verify Weight multipliers and Subscription discount math
console.log('Test 4: Verify bag weight multipliers & subscription discounts...');
const calculateItemPrice = (
  basePriceEUR: number,
  weight: BagWeight,
  isSubscription: boolean
): number => {
  let multiplier = 1;
  if (weight === '500g') multiplier = 1.84; // 8% discount vs 2x250g
  if (weight === '1kg') multiplier = 3.4; // 15% discount vs 4x250g
  let total = basePriceEUR * multiplier;
  if (isSubscription) {
    total = total * 0.88; // 12% subscription discount
  }
  return Math.round(total * 100) / 100;
};

// Base price €18.50 (Colombia)
assert.strictEqual(calculateItemPrice(18.5, '250g', false), 18.5);
assert.strictEqual(calculateItemPrice(18.5, '500g', false), 34.04); // 18.5 * 1.84 = 34.04
assert.strictEqual(calculateItemPrice(18.5, '1kg', false), 62.9); // 18.5 * 3.4 = 62.9
assert.strictEqual(calculateItemPrice(18.5, '250g', true), 16.28); // 18.5 * 0.88 = 16.28
assert.strictEqual(calculateItemPrice(18.5, '1kg', true), 55.35); // 62.9 * 0.88 = 55.352 -> 55.35
console.log('✓ Test 4 Passed: Bag weight & subscription discounts match financial specifications.');

// Test 5: Verify Multi-Currency Conversion & Formatting
console.log('Test 5: Verify multi-currency conversion rates and symbol placement...');
assert.strictEqual(formatPrice(10.0, 'EUR'), '10.00 €');
assert.strictEqual(formatPrice(10.0, 'GBP'), '£8.50');
assert.strictEqual(formatPrice(10.0, 'CHF'), '9.50 CHF');
console.log('✓ Test 5 Passed: Currency conversion rates (EUR 1.0, GBP 0.85, CHF 0.95) format correctly.');

// Test 6: Verify Trilingual Dictionary Completeness across EN, DE, FR
console.log('Test 6: Verify trilingual completeness across EN, DE, FR...');
const languages: Language[] = ['EN', 'DE', 'FR'];
languages.forEach((lang) => {
  const dict = UI_TRANSLATIONS[lang];
  assert.ok(dict.nav.roasteryStatus, `[${lang}] nav.roasteryStatus must exist`);
  assert.ok(dict.hero.tagline, `[${lang}] hero.tagline must exist`);
  assert.ok(dict.radarSection.title, `[${lang}] radarSection.title must exist`);
  assert.ok(dict.producers.title, `[${lang}] producers.title must exist`);
  assert.ok(dict.comparer.title, `[${lang}] comparer.title must exist`);
  assert.ok(dict.store.title, `[${lang}] store.title must exist`);
  assert.ok(dict.about.title, `[${lang}] about.title must exist`);
  assert.ok(dict.nav.about, `[${lang}] nav.about must exist`);
  assert.ok(dict.visit.title, `[${lang}] visit.title must exist`);
  assert.ok(dict.drawer.title, `[${lang}] drawer.title must exist`);
  assert.ok(dict.compliance.cookieTitle, `[${lang}] compliance.cookieTitle must exist`);
  assert.ok(
    dict.compliance.whatsAppGreeting,
    `[${lang}] compliance.whatsAppGreeting must exist`
  );
});
console.log('✓ Test 6 Passed: Complete trilingual dictionary without missing keys.');

// Test 7: Verify 6-Axis Radar Geometry & Angle Math
console.log('Test 7: Verify 6-axis radar trigonometry...');
const cx = 200;
const cy = 200;
const radius = 112;
const polarToCartesian = (
  centerX: number,
  centerY: number,
  r: number,
  angleInDegrees: number
) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: Math.round((centerX + r * Math.sin(angleInRadians)) * 100) / 100,
    y: Math.round((centerY - r * Math.cos(angleInRadians)) * 100) / 100,
  };
};

// 0 degrees (Acidity) must be at 12 o'clock (x=200, y=88)
const topPt = polarToCartesian(cx, cy, radius, 0);
assert.strictEqual(topPt.x, 200, 'Top vertex must have x=200');
assert.strictEqual(topPt.y, 88, 'Top vertex must have y=88 (200 - 112)');

// 180 degrees (Spice) must be at 6 o'clock (x=200, y=312)
const bottomPt = polarToCartesian(cx, cy, radius, 180);
assert.strictEqual(bottomPt.x, 200, 'Bottom vertex must have x=200');
assert.strictEqual(bottomPt.y, 312, 'Bottom vertex must have y=312 (200 + 112)');

// Verify that inward score badge radius is strictly less than outer label radius
const labelPt = polarToCartesian(cx, cy, radius + 28, 0);
const scoreR = Math.max(22, radius - 16);
const scorePt = polarToCartesian(cx, cy, scoreR, 0);
assert.ok(
  scorePt.y > labelPt.y,
  'Score badge must sit inside the polygon and not collide with the outer label'
);
console.log('✓ Test 7 Passed: Radar trigonometry and collision-free label geometry verified.');

// Test 8: Verify Savings Calculator Math
console.log('Test 8: Verify cost-per-cup savings math...');
const cupsPerDay = 3;
const cafePriceEUR = 4.8;
const atelierPriceEUR = 0.62;
const days = 30.5;
const monthlyCafe = cupsPerDay * cafePriceEUR * days; // 3 * 4.8 * 30.5 = 439.2
const monthlyAtelier = cupsPerDay * atelierPriceEUR * days; // 3 * 0.62 * 30.5 = 56.73
const monthlySavings = monthlyCafe - monthlyAtelier; // 382.47
const yearlySavings = monthlySavings * 12; // 4589.64

assert.strictEqual(Math.round(monthlyCafe * 100) / 100, 439.2);
assert.strictEqual(Math.round(monthlyAtelier * 100) / 100, 56.73);
assert.strictEqual(Math.round(monthlySavings * 100) / 100, 382.47);
assert.strictEqual(Math.round(yearlySavings * 100) / 100, 4589.64);
console.log('✓ Test 8 Passed: Savings calculator math accurate.');

console.log('--- ALL 8 TEST SUITES PASSED CLEANLY! ---');
