import React, { useState, useEffect } from 'react';
import { useRoastery } from '../context/RoasteryContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Truck,
  ArrowRight,
  ArrowLeft,
  QrCode,
  ShieldCheck,
  Coffee,
  PackageCheck,
} from 'lucide-react';
import { FulfillmentType, PickupOrderDetails } from '../types/coffee';

export const ClickAndCollectDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerStep,
    setDrawerStep,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotalEUR,
    currency,
    t,
    formatMoney,
    lastConfirmedOrder,
    setLastConfirmedOrder,
  } = useRoastery();

  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('pickup');
  
  // Checkout Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(t.drawer.pickupDates[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('14:30 – 15:00');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Germany');
  const [baristaNotes, setBaristaNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Free shipping threshold: €45
  const freeShippingThresholdEUR = 45;
  const isFreeShipping = cartTotalEUR >= freeShippingThresholdEUR;
  const shippingRemainingEUR = Math.max(0, freeShippingThresholdEUR - cartTotalEUR);
  const deliveryFeeEUR = fulfillmentType === 'delivery' && !isFreeShipping ? 4.90 : 0;
  const grandTotalEUR = cartTotalEUR + deliveryFeeEUR;

  // Sync selectedDate with active language
  useEffect(() => {
    setSelectedDate(t.drawer.pickupDates[0]);
  }, [t]);

  const pickupDates = t.drawer.pickupDates;

  // 30-min time slots
  const timeSlots = [
    '09:00 – 09:30',
    '10:30 – 11:00',
    '12:00 – 12:30',
    '14:30 – 15:00',
    '16:00 – 16:30',
    '17:30 – 18:00',
  ];

  // Close on Escape key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.name = t.drawer.errName;
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      errors.email = t.drawer.errEmail;
    }
    if (!customerPhone.trim() || customerPhone.length < 6) {
      errors.phone = t.drawer.errPhone;
    }

    if (fulfillmentType === 'delivery') {
      if (!streetAddress.trim()) errors.street = t.drawer.errAddress;
      if (!postalCode.trim()) errors.postalCode = t.drawer.errPostalCode;
      if (!city.trim()) errors.city = t.drawer.errCity;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = fulfillmentType === 'pickup' ? `#ATK-${randomId}` : `#DHL-${randomId}`;

    const order: PickupOrderDetails = {
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate: fulfillmentType === 'pickup' ? selectedDate : undefined,
      pickupTimeSlot: fulfillmentType === 'pickup' ? selectedTimeSlot : undefined,
      shippingAddress:
        fulfillmentType === 'delivery'
          ? { street: streetAddress, postalCode, city, country }
          : undefined,
      baristaNotes,
      fulfillmentType,
      items: [...cart],
      totalEUR: grandTotalEUR,
      currency,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLastConfirmedOrder(order);
    clearCart();
    setDrawerStep(3);
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-espressoDeep/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-stoneIvory shadow-2xl flex flex-col justify-between border-l border-espressoDeep/15 ease-out-expo transition-transform duration-500">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-oatSurface border-b border-espressoDeep/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-espressoDeep text-stoneIvory flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-espressoDeep">
                  {t.drawer.title}
                </h2>
                {/* 3-Step Breadcrumbs */}
                <div className="flex items-center gap-2 text-[11px] font-semibold text-textLightMuted mt-0.5">
                  <span className={drawerStep === 1 ? 'text-terracotta font-bold' : ''}>{t.drawer.step1}</span>
                  <span>•</span>
                  <span className={drawerStep === 2 ? 'text-terracotta font-bold' : ''}>{t.drawer.step2}</span>
                  <span>•</span>
                  <span className={drawerStep === 3 ? 'text-terracotta font-bold' : ''}>{t.drawer.step3}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-espressoDeep/10 text-espressoDeep transition-colors"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* ================= STEP 1: CART REVIEW ================= */}
            {drawerStep === 1 && (
              <>
                {/* Fulfillment Method Selector: Pickup vs. Delivery */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-oatSurface rounded-2xl border border-espressoDeep/10">
                  <button
                    onClick={() => setFulfillmentType('pickup')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center ${
                      fulfillmentType === 'pickup'
                        ? 'bg-espressoDeep text-stoneIvory shadow-xs font-bold'
                        : 'text-textLightMuted hover:text-espressoDeep'
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5 text-terracotta shrink-0" />
                    <span className="truncate">{t.drawer.fulfillmentTogglePickup}</span>
                  </button>

                  <button
                    onClick={() => setFulfillmentType('delivery')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center ${
                      fulfillmentType === 'delivery'
                        ? 'bg-espressoDeep text-stoneIvory shadow-xs font-bold'
                        : 'text-textLightMuted hover:text-espressoDeep'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 text-terracotta shrink-0" />
                    <span className="truncate">{t.drawer.fulfillmentToggleDelivery}</span>
                  </button>
                </div>

                {/* Free Shipping Progress Indicator (if delivery is chosen) */}
                {fulfillmentType === 'delivery' && (
                  <div className="bg-oatSurface/60 p-3.5 rounded-2xl border border-espressoDeep/10 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-espressoDeep">
                      <span>
                        {isFreeShipping
                          ? t.drawer.freeShippingUnlocked
                          : t.drawer.freeShippingProgress(formatMoney(shippingRemainingEUR))}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stoneIvory overflow-hidden">
                      <div
                        className="h-full bg-terracotta transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (cartTotalEUR / freeShippingThresholdEUR) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-espressoDeep/30" />
                    <p className="font-serif text-lg font-bold text-espressoDeep">{t.drawer.emptyText}</p>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="px-5 py-2.5 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracottaHover transition-all"
                    >
                      {t.drawer.browseLots}
                    </button>
                  </div>
                ) : (
                  /* Item List */
                  <div className="space-y-3.5">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white border border-espressoDeep/10 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <img
                          src={item.image}
                          alt={item.lotName}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="font-serif text-sm font-bold text-espressoDeep truncate">
                            {item.lotName}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-textLightMuted">
                            <span className="px-2 py-0.5 rounded-md bg-oatSurface font-semibold text-espressoDeep">
                              {item.weight}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-oatSurface font-semibold text-espressoDeep capitalize">
                              {item.grind}
                            </span>
                            {item.isSubscription && (
                              <span className="px-2 py-0.5 rounded-md bg-butterAccent/40 font-bold text-espressoDeep">
                                Sub -12%
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-espressoDeep">
                            {formatMoney(item.unitPriceEUR * item.quantity)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-oatSurface rounded-full p-1 border border-espressoDeep/10 shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-stoneIvory rounded-full text-espressoDeep transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-stoneIvory rounded-full text-espressoDeep transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-textLightMuted hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ================= STEP 2: PICKUP OR SHIPPING DETAILS ================= */}
            {drawerStep === 2 && (
              <form onSubmit={handleConfirmOrder} className="space-y-5">
                
                {fulfillmentType === 'pickup' ? (
                  <>
                    {/* Pickup Date Selection */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-espressoDeep flex items-center gap-1.5 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-terracotta" />
                        <span>{t.drawer.dateLabel}</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {pickupDates.map((date) => (
                          <button
                            type="button"
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`p-2.5 text-left rounded-xl border text-xs font-medium transition-all ${
                              selectedDate === date
                                ? 'bg-espressoDeep text-stoneIvory border-espressoDeep shadow-xs font-bold'
                                : 'bg-white text-espressoDeep border-espressoDeep/10 hover:border-terracotta'
                            }`}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pickup Time Slot Grid */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-espressoDeep flex items-center gap-1.5 mb-2">
                        <Clock className="w-3.5 h-3.5 text-terracotta" />
                        <span>{t.drawer.timeLabel}</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-1 text-center rounded-xl border text-[11px] font-semibold transition-all ${
                              selectedTimeSlot === slot
                                ? 'bg-terracotta text-white border-terracotta shadow-xs'
                                : 'bg-white text-espressoDeep border-espressoDeep/10 hover:border-terracotta'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* DHL Delivery Address Form */
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 pb-1 border-b border-espressoDeep/10 text-xs font-bold uppercase tracking-wider text-espressoDeep">
                      <Truck className="w-4 h-4 text-terracotta" />
                      <span>{t.drawer.deliveryAddressTitle}</span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-espressoDeep block mb-1">
                        {t.drawer.streetLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. Maximilianstraße 22"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                      />
                      {formErrors.street && <p className="text-[10px] text-red-600 mt-1">{formErrors.street}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-espressoDeep block mb-1">
                          {t.drawer.postalCodeLabel} *
                        </label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="80539"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                        />
                        {formErrors.postalCode && <p className="text-[10px] text-red-600 mt-1">{formErrors.postalCode}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-espressoDeep block mb-1">
                          {t.drawer.cityLabel} *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="München"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                        />
                        {formErrors.city && <p className="text-[10px] text-red-600 mt-1">{formErrors.city}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-espressoDeep block mb-1">
                        {t.drawer.countryLabel} *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                      >
                        <option value="Germany">Germany (Deutschland)</option>
                        <option value="Austria">Austria (Österreich)</option>
                        <option value="Switzerland">Switzerland (Schweiz)</option>
                        <option value="France">France</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Italy">Italy</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Common Contact Fields */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-espressoDeep block mb-1">
                      {t.drawer.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Johannes Meyer"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                    />
                    {formErrors.name && <p className="text-[10px] text-red-600 mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-espressoDeep block mb-1">
                      {t.drawer.emailLabel} *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="johannes@atelier-coffee.de"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                    />
                    {formErrors.email && <p className="text-[10px] text-red-600 mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-espressoDeep block mb-1">
                      {t.drawer.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+49 170 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none"
                    />
                    {formErrors.phone && <p className="text-[10px] text-red-600 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-espressoDeep block mb-1">
                      {t.drawer.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={baristaNotes}
                      onChange={(e) => setBaristaNotes(e.target.value)}
                      placeholder={t.drawer.notesPlaceholder}
                      className="w-full px-3.5 py-2 rounded-xl border border-espressoDeep/20 bg-white text-xs focus:ring-2 focus:ring-terracotta focus:outline-none resize-none"
                    />
                  </div>
                </div>

              </form>
            )}

            {/* ================= STEP 3: ORDER CONFIRMED PASS ================= */}
            {drawerStep === 3 && lastConfirmedOrder && (
              <div className="space-y-6 text-center animate-fadeIn">
                
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-espressoDeep">
                    {lastConfirmedOrder.fulfillmentType === 'pickup'
                      ? t.drawer.confirmationHeading
                      : t.drawer.deliveryHeading}
                  </h3>
                  <p className="text-xs text-textLightMuted">
                    {lastConfirmedOrder.fulfillmentType === 'pickup'
                      ? t.drawer.readyNotice
                      : t.drawer.deliveryNotice}
                  </p>
                </div>

                {/* Simulated Order Pass Card */}
                <div className="bg-espressoDeep text-stoneIvory p-6 rounded-3xl shadow-xl space-y-4 max-w-sm mx-auto border border-white/10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs text-butterAccent font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {lastConfirmedOrder.fulfillmentType === 'pickup' ? (
                        <>
                          <Coffee className="w-4 h-4 text-butterAccent" />
                          <span>ATELIER Pickup Pass</span>
                        </>
                      ) : (
                        <>
                          <PackageCheck className="w-4 h-4 text-butterAccent" />
                          <span>{t.drawer.trackingPassTitle}</span>
                        </>
                      )}
                    </span>
                    <span className="text-[11px] text-stoneIvory/60">{lastConfirmedOrder.placedAt}</span>
                  </div>

                  {/* QR / Barcode Container */}
                  <div className="w-36 h-36 bg-white p-3 rounded-2xl mx-auto shadow-md flex items-center justify-center">
                    <QrCode className="w-full h-full text-espressoDeep" />
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-widest text-stoneIvory/60">
                      {lastConfirmedOrder.fulfillmentType === 'pickup'
                        ? t.drawer.orderNumberLabel
                        : t.drawer.trackingNumberLabel}
                    </span>
                    <p className="font-serif text-3xl font-bold tracking-wider text-butterAccent">
                      {lastConfirmedOrder.orderNumber}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs text-stoneIvory/80 space-y-1 text-left">
                    <p><strong>{t.drawer.guestLabel}</strong> {lastConfirmedOrder.customerName}</p>
                    {lastConfirmedOrder.fulfillmentType === 'pickup' ? (
                      <p><strong>{t.drawer.slotLabel}</strong> {lastConfirmedOrder.pickupDate} ({lastConfirmedOrder.pickupTimeSlot})</p>
                    ) : (
                      <p>
                        <strong>{t.drawer.addressSummaryLabel}</strong>{' '}
                        {lastConfirmedOrder.shippingAddress?.street}, {lastConfirmedOrder.shippingAddress?.postalCode}{' '}
                        {lastConfirmedOrder.shippingAddress?.city} ({lastConfirmedOrder.shippingAddress?.country})
                      </p>
                    )}
                    <p><strong>{t.drawer.totalLabel}</strong> {formatMoney(lastConfirmedOrder.totalEUR)}</p>
                  </div>
                </div>

                <p className="text-xs text-textLightMuted max-w-xs mx-auto">
                  {lastConfirmedOrder.fulfillmentType === 'pickup'
                    ? t.drawer.showAtCounter
                    : t.drawer.deliveryNotice}
                </p>

                {/* Direct Google Maps Route Button (Pickup) or Back To Store (Delivery) */}
                <div className="space-y-2 pt-2">
                  {lastConfirmedOrder.fulfillmentType === 'pickup' && (
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Geyerstra%C3%9Fe+14+80469+M%C3%BCnchen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-full bg-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-terracottaHover transition-all shadow-md active:scale-98"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{t.drawer.openMapReceipt}</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setDrawerStep(1);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-3 rounded-full bg-oatSurface text-espressoDeep font-semibold text-xs hover:bg-[#d8d0bf] transition-colors active:scale-98"
                  >
                    {t.drawer.backToStore}
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Drawer Footer Summary & Progression Button */}
          {cart.length > 0 && drawerStep !== 3 && (
            <div className="p-5 sm:p-6 bg-white border-t border-espressoDeep/10 space-y-4">
              
              {/* Financial Totals */}
              <div className="space-y-1.5 text-xs text-espressoDeep">
                <div className="flex justify-between">
                  <span className="text-textLightMuted">{t.drawer.subtotal}</span>
                  <span className="font-semibold">{formatMoney(cartTotalEUR)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textLightMuted">{t.drawer.deliveryFee}</span>
                  <span className="font-semibold">
                    {deliveryFeeEUR === 0 ? t.drawer.free : formatMoney(deliveryFeeEUR)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-espressoDeep/10 text-sm font-bold">
                  <span>{t.drawer.total}</span>
                  <span className="font-serif text-lg text-terracotta">
                    {formatMoney(grandTotalEUR)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {drawerStep === 1 ? (
                <button
                  onClick={() => setDrawerStep(2)}
                  className="w-full py-4 rounded-full bg-espressoDeep text-stoneIvory font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-terracotta transition-colors shadow-lg active:scale-98"
                >
                  <span>{t.drawer.proceedToStep2}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDrawerStep(1)}
                    className="py-4 px-4 rounded-full bg-oatSurface text-espressoDeep font-bold text-xs hover:bg-[#d9d1c1] transition-colors active:scale-98"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 py-4 rounded-full bg-terracotta text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-terracottaHover transition-colors shadow-lg active:scale-98"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.drawer.proceedToPayment}</span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ClickAndCollectDrawer;
