export type Language = 'EN' | 'DE' | 'FR';
export type Currency = 'EUR' | 'GBP' | 'CHF';

export type BagWeight = '250g' | '500g' | '1kg';
export type GrindOption = 'whole' | 'espresso' | 'v60' | 'french_press' | 'aeropress';

export type RoastLevelKey = 'light_filter' | 'medium_omni' | 'medium_dark' | 'swiss_water_decaf';

export interface FlavorRadarScores {
  acidity: number;       // 0 to 100
  body: number;          // 0 to 100
  sweetness: number;     // 0 to 100
  floralFruit: number;   // 0 to 100
  cocoaNut: number;      // 0 to 100
  spiceFinish: number;   // 0 to 100
}

export interface BrewRecipe {
  method: string;
  doseGrams: number;
  waterGrams: number;
  ratio: string;
  waterTempC: number;
  grindRecommendation: string;
  brewTime: string;
  tastingTip: Record<Language, string>;
}

export interface SingleOriginLot {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  farmProducer: string;
  elevationMeters: number;
  process: string;
  varietal: string;
  cuppingScore: number;
  harvestYear: string;
  tastingNotes: Record<Language, string[]>;
  basePriceEUR: number; // Base price for 250g
  roastLevel: RoastLevelKey;
  radarScores: FlavorRadarScores;
  brewRecipe: BrewRecipe;
  image: string;
  badge?: string;
  directTradePremium: string;
  storySnippet: Record<Language, string>;
}

export interface RoastProfile {
  id: RoastLevelKey;
  name: Record<Language, string>;
  roastTempC: number;
  developmentTimePercent: number;
  beanColorHex: string;
  bestFor: Record<Language, string>;
  description: Record<Language, string>;
  radarDefaults: FlavorRadarScores;
}

export interface CartItem {
  id: string; // unique item id: `${lotId}-${weight}-${grind}-${isSubscription}`
  lotId: string;
  lotName: string;
  country: string;
  weight: BagWeight;
  grind: GrindOption;
  isSubscription: boolean;
  unitPriceEUR: number;
  quantity: number;
  image: string;
}

export type FulfillmentType = 'pickup' | 'delivery';

export interface ShippingAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface PickupOrderDetails {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate?: string;
  pickupTimeSlot?: string;
  shippingAddress?: ShippingAddress;
  baristaNotes: string;
  fulfillmentType: FulfillmentType;
  items: CartItem[];
  totalEUR: number;
  currency: Currency;
  placedAt: string;
}

export type LegalModalType = 'impressum' | 'privacy' | 'terms' | null;

export interface CookieConsentState {
  consented: boolean;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}
