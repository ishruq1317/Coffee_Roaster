import React, { useState } from 'react';
import { useRoastery } from '../context/RoasteryContext';
import {
  MessageCircle,
  Phone,
  Navigation,
  Shield,
  X,
  Check,
  ExternalLink,
  ChevronRight,
  Cookie,
} from 'lucide-react';
import { LegalModalType } from '../types/coffee';

export const EuropeanCompliance: React.FC = () => {
  const {
    t,
    cookieConsent,
    saveCookieConsent,
    activeLegalModal,
    setActiveLegalModal,
  } = useRoastery();

  const [showSettings, setShowSettings] = useState(false);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Geyerstra%C3%9Fe+14+80469+M%C3%BCnchen';
  const whatsappUrl =
    'https://wa.me/49894528901?text=Hello%20ATELIER%20Roastery%2C%20I%20have%20a%20question%20about%20your%20beans%20and%20roasting%20schedule!';

  return (
    <>
      {/* 1. PERSISTENT FLOATING QUICK-ACTION DOCK (Mobile & Desktop) */}
      <aside
        aria-label="Quick Actions Dock"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end gap-2.5 safe-bottom"
      >
        <div className="flex items-center gap-2 bg-espressoDeep/95 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-2xl">
          {/* WhatsApp Direct Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Barista on WhatsApp"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-110 active:scale-95 transition-all shadow-md group relative"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="sr-only">WhatsApp</span>
            {/* Tooltip on hover */}
            <span className="hidden sm:group-hover:block absolute right-12 bg-espressoDeep text-stoneIvory text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap border border-white/10">
              {t.compliance.quickWhatsApp}
            </span>
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:+49894528901"
            aria-label="Direct Call to the Roastery"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-oatSurface text-espressoDeep hover:bg-butterAccent hover:scale-110 active:scale-95 transition-all shadow-md group relative"
          >
            <Phone className="w-4 h-4 text-espressoDeep" />
            <span className="sr-only">Call Roastery</span>
            <span className="hidden sm:group-hover:block absolute right-12 bg-espressoDeep text-stoneIvory text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap border border-white/10">
              {t.compliance.quickCall}
            </span>
          </a>

          {/* Directions / Google Maps */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Roastery Directions in Google Maps"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-terracotta text-white hover:scale-110 active:scale-95 transition-all shadow-md group relative"
          >
            <Navigation className="w-4 h-4" />
            <span className="sr-only">Google Maps Directions</span>
            <span className="hidden sm:group-hover:block absolute right-12 bg-espressoDeep text-stoneIvory text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap border border-white/10">
              {t.compliance.quickMaps}
            </span>
          </a>
        </div>
      </aside>

      {/* 2. REALISTIC GDPR COOKIE CONSENT BANNER */}
      {!cookieConsent.consented && (
        <aside
          aria-label="Cookie Consent Banner"
          role="region"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-stoneIvory/98 border border-espressoDeep/15 rounded-3xl p-5 shadow-2xl backdrop-blur-xl animate-fadeIn safe-bottom"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-oatSurface text-terracotta shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-serif text-sm font-bold text-espressoDeep">
                {t.compliance.cookieTitle}
              </h3>
              <p className="text-[11px] text-textLightMuted leading-relaxed">
                {t.compliance.cookieText}
              </p>
            </div>
          </div>

          {/* Expandable Privacy Settings toggles */}
          {showSettings && (
            <div className="mt-3 pt-3 border-t border-espressoDeep/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-espressoDeep block text-[11px]">{t.compliance.strictlyNecessary}</span>
                  <span className="text-[10px] text-textLightMuted">{t.compliance.strictlyNecessaryDesc}</span>
                </div>
                <span className="text-[10px] font-bold text-terracotta">{t.compliance.alwaysActive}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-espressoDeep block text-[11px]">{t.compliance.analyticsTitle}</span>
                  <span className="text-[10px] text-textLightMuted">{t.compliance.analyticsDesc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsOptIn}
                  onChange={(e) => setAnalyticsOptIn(e.target.checked)}
                  className="rounded text-terracotta focus:ring-terracotta h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-espressoDeep block text-[11px]">{t.compliance.marketingTitle}</span>
                  <span className="text-[10px] text-textLightMuted">{t.compliance.marketingDesc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="rounded text-terracotta focus:ring-terracotta h-4 w-4"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 pt-3 border-t border-espressoDeep/10 flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => saveCookieConsent({ necessary: true, analytics: false, marketing: false })}
                className="flex-1 py-2 px-3 rounded-full bg-oatSurface hover:bg-[#ded6c5] text-espressoDeep font-bold text-[11px] transition-colors"
              >
                {t.compliance.acceptNecessary}
              </button>
              <button
                onClick={() => saveCookieConsent({ necessary: true, analytics: true, marketing: true })}
                className="flex-1 py-2 px-3 rounded-full bg-terracotta hover:bg-terracottaHover text-white font-bold text-[11px] transition-colors shadow-xs"
              >
                {t.compliance.acceptAll}
              </button>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-[10px] text-textLightMuted hover:text-espressoDeep font-medium underline text-center"
            >
              {showSettings ? t.compliance.hideDetails : t.compliance.cookieSettings}
            </button>
          </div>
        </aside>
      )}

      {/* 3. WORKING EU COMPLIANCE MODALS (Impressum, Privacy, Terms) */}
      {activeLegalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            onClick={() => setActiveLegalModal(null)}
            className="fixed inset-0 bg-espressoDeep/70 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative bg-stoneIvory rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-espressoDeep/10 z-10 max-h-[85vh] overflow-y-auto space-y-5 animate-fadeIn">
            
            <div className="flex items-center justify-between pb-3 border-b border-espressoDeep/10">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-terracotta" />
                <h3 className="font-serif text-xl font-bold text-espressoDeep">
                  {activeLegalModal === 'impressum' && t.compliance.impressum}
                  {activeLegalModal === 'privacy' && t.compliance.privacy}
                  {activeLegalModal === 'terms' && t.compliance.terms}
                </h3>
              </div>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="p-1.5 rounded-full hover:bg-espressoDeep/10 text-espressoDeep transition-colors"
                aria-label="Close legal modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Impressum Content (German / European TMG § 5 / DDG Compliant) */}
            {activeLegalModal === 'impressum' && (
              <div className="space-y-4 text-xs text-textLightMuted leading-relaxed">
                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">Angaben gemäß § 5 DDG (ehemals TMG):</h4>
                  <p className="mt-1">
                    <strong>ATELIER Kaffeerösterei GmbH</strong><br />
                    Geyerstraße 14<br />
                    80469 München, Deutschland
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">Vertreten durch:</h4>
                  <p className="mt-1">Geschäftsführer: Hasin Ishruq Nabil &amp; Team</p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">Kontakt &amp; Kundenservice:</h4>
                  <p className="mt-1">
                    Telefon: +49 (0) 89 452 8901<br />
                    E-Mail: bonjour@atelier-coffee.de<br />
                    Webseite: www.atelier-kaffeeroesterei.de
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">Registereintrag:</h4>
                  <p className="mt-1">
                    Eintragung im Handelsregister.<br />
                    Registergericht: Amtsgericht München<br />
                    Registernummer: HRB 241908
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">Umsatzsteuer-Identifikationsnummer:</h4>
                  <p className="mt-1">
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    <strong>DE 318 942 105</strong>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">EU-Streitschlichtung:</h4>
                  <p className="mt-1">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-terracotta underline ml-1">
                      https://ec.europa.eu/consumers/odr
                    </a>. Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Policy Content (GDPR / DSGVO Compliant) */}
            {activeLegalModal === 'privacy' && (
              <div className="space-y-4 text-xs text-textLightMuted leading-relaxed">
                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">1. Datenschutz auf einen Blick (Art. 13 DSGVO)</h4>
                  <p className="mt-1">
                    Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften der DSGVO sowie dieser Datenschutzerklärung.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">2. Datenerfassung bei Click &amp; Collect Bestellungen</h4>
                  <p className="mt-1">
                    Wenn Sie über unsere Website Bohnen zur Abholung vorbestellen, erfassen wir ausschließlich Ihren Namen, Ihre E-Mail-Adresse und Mobilfunknummer zur Generierung des Abholcodes und Zusendung der Bereitstellungs-SMS. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">3. Speicherung im Browser (LocalStorage)</h4>
                  <p className="mt-1">
                    Zur Sicherstellung des reibungslosen Bestellablaufs speichern wir Ihre Warenkorbauswahl sowie Ihre bevorzugte Währung und Sprache im lokalen Speicher Ihres Browsers. Es findet kein websiteübergreifendes Tracking statt.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">4. Ihre Rechte (Auskunft, Löschung, Berichtigung)</h4>
                  <p className="mt-1">
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten (Art. 15–20 DSGVO). Wenden Sie sich hierzu an: datenschutz@atelier-coffee.de.
                  </p>
                </div>
              </div>
            )}

            {/* Terms of Service (AGB) */}
            {activeLegalModal === 'terms' && (
              <div className="space-y-4 text-xs text-textLightMuted leading-relaxed">
                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">1. Geltungsbereich</h4>
                  <p className="mt-1">
                    Für alle Lieferungen und Vorbestellungen von Kaffeebohnen und Zubehör durch die ATELIER Kaffeerösterei GmbH an Verbraucher (§ 13 BGB) gelten diese Allgemeinen Geschäftsbedingungen.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">2. Frische-Garantie &amp; Röstzeitpunkt</h4>
                  <p className="mt-1">
                    Unsere Kaffees werden maximal 48 Stunden vor Abholung bzw. Versand schonend trommelgeröstet und in aromaschützende Beutel mit Einweg-Entgasungsventil verpackt.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">3. Abholung vor Ort (Click &amp; Collect)</h4>
                  <p className="mt-1">
                    Zur Abholung bereitgestellte Bestellungen werden im ATELIER Flagship Store (Geyerstraße 14, München) für 5 Werktage nach gewähltem Abholzeitfenster aufbewahrt.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-espressoDeep text-sm">4. Widerrufsrecht bei Lebensmitteln</h4>
                  <p className="mt-1">
                    Gemäß § 312g Abs. 2 Nr. 2 BGB besteht das Widerrufsrecht nicht bei Verträgen zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde, sowie bei geöffneten Kaffeebohnenpackungen aus Gründen des Gesundheitsschutzes und der Hygiene.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-espressoDeep/10 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="py-2 px-5 rounded-full bg-espressoDeep text-stoneIvory font-semibold text-xs hover:bg-terracotta transition-colors"
              >
                {t.compliance.closeModal}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. EU LEGAL FOOTER */}
      <footer className="bg-espressoWarm text-stoneIvory pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Brand column (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-terracotta text-white flex items-center justify-center font-serif text-lg font-bold">
                  A
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-tight text-white block leading-none">
                    ATELIER
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-butterAccent font-bold">
                    Kaffeerösterei
                  </span>
                </div>
              </div>

              <p className="text-xs text-stoneIvory/75 max-w-sm leading-relaxed">
                {t.footer.bio}
              </p>

              <p className="text-xs font-semibold text-butterAccent">
                {t.footer.locations}
              </p>
            </div>

            {/* Quick Links (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                {t.compliance.footerExperience}
              </h4>
              <ul className="space-y-2 text-xs text-stoneIvory/70">
                <li><a href="#flavor-radar" className="hover:text-butterAccent transition-colors">6-Axis Flavor Radar</a></li>
                <li><a href="#micro-lots" className="hover:text-butterAccent transition-colors">Direct-Trade Micro-Lots</a></li>
                <li><a href="#roast-science" className="hover:text-butterAccent transition-colors">Thermal Roast Science</a></li>
                <li><a href="#order-beans" className="hover:text-butterAccent transition-colors">Order Fresh Beans Online</a></li>
                <li><a href="#roastery-visit" className="hover:text-butterAccent transition-colors">Visit Munich &amp; Zurich</a></li>
              </ul>
            </div>

            {/* Legal Links (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                {t.compliance.footerCompliance}
              </h4>
              <ul className="space-y-2 text-xs text-stoneIvory/70">
                <li>
                  <button
                    onClick={() => setActiveLegalModal('impressum')}
                    className="hover:text-butterAccent transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{t.compliance.impressum}</span>
                    <ChevronRight className="w-3 h-3 text-terracotta" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveLegalModal('privacy')}
                    className="hover:text-butterAccent transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{t.compliance.privacy}</span>
                    <ChevronRight className="w-3 h-3 text-terracotta" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveLegalModal('terms')}
                    className="hover:text-butterAccent transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{t.compliance.terms}</span>
                    <ChevronRight className="w-3 h-3 text-terracotta" />
                  </button>
                </li>
              </ul>

              <div className="pt-2 text-[11px] text-stoneIvory/50">
                Umsatzsteuer-ID: DE 318 942 105 • Bio-Zertifiziert DE-ÖKO-006
              </div>
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stoneIvory/60">
            <p>{t.footer.rights}</p>
            <div className="flex items-center gap-3">
              <span>{t.compliance.footerCraft}</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};
