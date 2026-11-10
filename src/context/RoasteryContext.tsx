import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  Currency,
  BagWeight,
  GrindOption,
  CartItem,
  SingleOriginLot,
  LegalModalType,
  CookieConsentState,
  PickupOrderDetails,
} from '../types/coffee';
import { UI_TRANSLATIONS, formatPrice } from '../data/roasteryData';

interface RoasteryContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  cart: CartItem[];
  addToCart: (
    lot: SingleOriginLot,
    weight: BagWeight,
    grind: GrindOption,
    isSubscription?: boolean,
    quantity?: number
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotalEUR: number;
  cartItemCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  drawerStep: 1 | 2 | 3;
  setDrawerStep: (step: 1 | 2 | 3) => void;
  openDrawer: (step?: 1 | 2 | 3) => void;
  activeLegalModal: LegalModalType;
  setActiveLegalModal: (modal: LegalModalType) => void;
  cookieConsent: CookieConsentState;
  saveCookieConsent: (consent: Partial<CookieConsentState>) => void;
  lastConfirmedOrder: PickupOrderDetails | null;
  setLastConfirmedOrder: (order: PickupOrderDetails | null) => void;
  quickConfigLot: SingleOriginLot | null;
  setQuickConfigLot: (lot: SingleOriginLot | null) => void;
  t: (typeof UI_TRANSLATIONS)['EN'];
  formatMoney: (priceEUR: number) => string;
}

const RoasteryContext = createContext<RoasteryContextType | undefined>(undefined);

const COOKIE_STORAGE_KEY = 'atelier_cookie_consent_v1';
const CART_STORAGE_KEY = 'atelier_cart_v1';

// Defensive localStorage wrapper for iOS Safari Private Browsing & sandboxes
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore in restricted environments
    }
  },
};

export const RoasteryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = safeStorage.getItem('atelier_lang');
    return saved === 'DE' || saved === 'FR' || saved === 'EN' ? saved : 'EN';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = safeStorage.getItem('atelier_currency');
    return saved === 'GBP' || saved === 'CHF' || saved === 'EUR' ? saved : 'EUR';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = safeStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState<1 | 2 | 3>(1);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<PickupOrderDetails | null>(null);
  const [quickConfigLot, setQuickConfigLot] = useState<SingleOriginLot | null>(null);

  const [cookieConsent, setCookieConsent] = useState<CookieConsentState>(() => {
    try {
      const saved = safeStorage.getItem(COOKIE_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : { consented: false, necessary: true, analytics: false, marketing: false };
    } catch {
      return { consented: false, necessary: true, analytics: false, marketing: false };
    }
  });

  useEffect(() => {
    safeStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    safeStorage.setItem('atelier_lang', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    safeStorage.setItem('atelier_currency', curr);
  };

  const openDrawer = (step: 1 | 2 | 3 = 1) => {
    setDrawerStep(step);
    setIsDrawerOpen(true);
  };

  const saveCookieConsent = (consent: Partial<CookieConsentState>) => {
    const updated: CookieConsentState = {
      ...cookieConsent,
      ...consent,
      consented: true,
      necessary: true,
    };
    setCookieConsent(updated);
    safeStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(updated));
  };

  const calculateItemPrice = (
    basePriceEUR: number,
    weight: BagWeight,
    isSubscription: boolean
  ): number => {
    let multiplier = 1;
    if (weight === '500g') multiplier = 1.84; // 8% discount vs 2x250g
    if (weight === '1kg') multiplier = 3.4;   // 15% discount vs 4x250g

    let total = basePriceEUR * multiplier;
    if (isSubscription) {
      total = total * 0.88; // 12% subscription discount
    }
    return Math.round(total * 100) / 100;
  };

  const addToCart = (
    lot: SingleOriginLot,
    weight: BagWeight,
    grind: GrindOption,
    isSubscription = false,
    quantity = 1
  ) => {
    const itemId = `${lot.id}-${weight}-${grind}-${isSubscription ? 'sub' : 'one'}`;
    const unitPriceEUR = calculateItemPrice(lot.basePriceEUR, weight, isSubscription);

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          lotId: lot.id,
          lotName: lot.name,
          country: lot.country,
          weight,
          grind,
          isSubscription,
          unitPriceEUR,
          quantity,
          image: lot.image,
        },
      ];
    });

    setIsDrawerOpen(true);
    setDrawerStep(1);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalEUR = cart.reduce(
    (sum, item) => sum + item.unitPriceEUR * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const t = UI_TRANSLATIONS[language];

  const formatMoney = (priceEUR: number) => {
    return formatPrice(priceEUR, currency);
  };

  return (
    <RoasteryContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotalEUR,
        cartItemCount,
        isDrawerOpen,
        setIsDrawerOpen,
        drawerStep,
        setDrawerStep,
        openDrawer,
        activeLegalModal,
        setActiveLegalModal,
        cookieConsent,
        saveCookieConsent,
        lastConfirmedOrder,
        setLastConfirmedOrder,
        quickConfigLot,
        setQuickConfigLot,
        t,
        formatMoney,
      }}
    >
      {children}
    </RoasteryContext.Provider>
  );
};

export const useRoastery = () => {
  const context = useContext(RoasteryContext);
  if (!context) {
    throw new Error('useRoastery must be used within a RoasteryProvider');
  }
  return context;
};
