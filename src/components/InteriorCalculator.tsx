import React, { useState, useId } from 'react';
import {
  DELHI_INTERIOR_TIERS,
  calculateProjectCost,
  formatINR
} from '../utils/calculator';
import { Calculator, Check, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_DATA } from '../data/businessData';

interface InteriorCalculatorProps {
  onNavigateToView?: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
  compact?: boolean;
}

export const InteriorCalculator: React.FC<InteriorCalculatorProps> = () => {
  const sqftInputId = useId();
  const [sqft, setSqft] = useState<number>(1200);
  const [selectedTier, setSelectedTier] = useState<'essential' | 'signature' | 'bespoke'>('signature');
  const [includeKitchen, setIncludeKitchen] = useState<boolean>(true);
  const [kitchenCount, setKitchenCount] = useState<number>(1);
  const [includeBedroom, setIncludeBedroom] = useState<boolean>(true);
  const [bedroomCount, setBedroomCount] = useState<number>(2);
  const [consultationBooked, setConsultationBooked] = useState<boolean>(true);

  const estimate = calculateProjectCost({
    sqft,
    tierId: selectedTier,
    includeKitchen,
    kitchenCount,
    includeBedroom,
    bedroomCount,
    consultationBooked
  });

  const whatsappMessage = encodeURIComponent(
    `Hello AG Architects, I generated an interior estimate for my property:\n• Area: ${estimate.sanitizedSqft} Sq. Ft.\n• Package: ${estimate.tierName} (@ ₹${estimate.ratePerSqFt}/sq.ft)\n• Modular Kitchens: ${includeKitchen ? kitchenCount : 0}\n• Luxury Bedrooms: ${includeBedroom ? bedroomCount : 0}\n• Total Estimated: ${estimate.formattedTotal}\n\nPlease share detailed BOQ and site visit schedule.`
  );

  const quickSqftPresets = [
    { label: '850 sq.ft (1BHK)', val: 850 },
    { label: '1,200 sq.ft (2BHK)', val: 1200 },
    { label: '1,800 sq.ft (3BHK)', val: 1800 },
    { label: '2,600 sq.ft (Floor)', val: 2600 }
  ];

  return (
    <div className="w-full bg-white text-slate-900 p-5 rounded-2xl border border-slate-200/80 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Turnkey Interior Pricing Calculator</h3>
            <p className="text-xs text-slate-500">Commercial Turnkey Rates (₹4,500 – ₹6,500 / sq.ft)</p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-amber-800 uppercase bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shrink-0">
          Live BOQ
        </span>
      </div>

      {/* Sq Ft Input & Presets */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <label htmlFor={sqftInputId} className="text-xs font-semibold text-slate-700">
            Total Carpet Area (Sq. Ft.)
          </label>
          <span className="text-xs font-bold text-amber-700">
            {estimate.sanitizedSqft.toLocaleString('en-IN')} SQ. FT.
          </span>
        </div>

        <div className="relative">
          <input
            id={sqftInputId}
            type="number"
            min={100}
            max={20000}
            step={50}
            value={sqft || ''}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setSqft(isNaN(val) ? 0 : val);
            }}
            className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-900 text-base font-bold focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
            placeholder="Enter square footage (e.g. 1200)"
          />
          <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-medium pointer-events-none">
            sq.ft
          </span>
        </div>

        {/* Quick presets with clean wrapping */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
          {quickSqftPresets.map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => setSqft(preset.val)}
              className={`text-xs py-2 px-2 rounded-lg border text-center font-medium transition-all ${
                sqft === preset.val
                  ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Select Tier Matrix with clear un-cramped cards */}
      <div className="mt-5 space-y-2.5">
        <label className="text-xs font-semibold text-slate-700 block">Select Interior Finish Multiplier</label>
        <div className="space-y-2">
          {(['essential', 'signature', 'bespoke'] as const).map((tierKey) => {
            const tier = DELHI_INTERIOR_TIERS[tierKey];
            const isSelected = selectedTier === tierKey;
            return (
              <button
                key={tierKey}
                type="button"
                onClick={() => setSelectedTier(tierKey)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected ? 'border-amber-600 bg-amber-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 block leading-tight">
                        {tier.name}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {tier.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-amber-700">
                      ₹{tier.ratePerSqFt.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">/ sq. ft.</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add-ons & Fixed Rates */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
        <label className="text-xs font-semibold text-slate-700 block">Delhi Commercial Add-ons &amp; Inclusions</label>

        {/* Modular Kitchen Row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="addon-kitchen"
              checked={includeKitchen}
              onChange={(e) => setIncludeKitchen(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 accent-amber-600"
            />
            <label htmlFor="addon-kitchen" className="text-xs text-slate-800 cursor-pointer">
              <span className="font-bold block">Modular Kitchen Setup</span>
              <span className="text-slate-500 text-[11px]">From ₹1,20,000 / kitchen</span>
            </label>
          </div>
          {includeKitchen && (
            <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setKitchenCount(Math.max(1, kitchenCount - 1))}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                aria-label="Decrease kitchen count"
              >
                -
              </button>
              <span className="text-xs font-bold text-slate-900 px-1">{kitchenCount}</span>
              <button
                type="button"
                onClick={() => setKitchenCount(kitchenCount + 1)}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                aria-label="Increase kitchen count"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Luxury Bedroom Row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="addon-bedroom"
              checked={includeBedroom}
              onChange={(e) => setIncludeBedroom(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 accent-amber-600"
            />
            <label htmlFor="addon-bedroom" className="text-xs text-slate-800 cursor-pointer">
              <span className="font-bold block">Luxury Bedroom Suites</span>
              <span className="text-slate-500 text-[11px]">From ₹85,000 / bedroom</span>
            </label>
          </div>
          {includeBedroom && (
            <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setBedroomCount(Math.max(1, bedroomCount - 1))}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                aria-label="Decrease bedroom count"
              >
                -
              </button>
              <span className="text-xs font-bold text-slate-900 px-1">{bedroomCount}</span>
              <button
                type="button"
                onClick={() => setBedroomCount(bedroomCount + 1)}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold"
                aria-label="Increase bedroom count"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Consultation Fee Row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="addon-consult"
              checked={consultationBooked}
              onChange={(e) => setConsultationBooked(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 accent-amber-600"
            />
            <label htmlFor="addon-consult" className="text-xs text-slate-800 cursor-pointer">
              <span className="font-bold block">Professional Consultation Fee</span>
              <span className="text-slate-500 text-[11px]">Fixed booking at ₹1,500</span>
            </label>
          </div>
          <span className="text-xs font-bold text-amber-700">₹1,500</span>
        </div>
      </div>

      {/* Live Calculation Display Box */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-amber-50/90 to-amber-100/40 border border-amber-200">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 mb-1.5">
          <span className="font-bold text-slate-800">Estimated Total Turnkey Investment</span>
          <span className="text-[11px] text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded font-semibold">
            Delhi NCR Rate
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {estimate.formattedTotal}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Incl. GST &amp; MEP</span>
        </div>

        {/* Breakdown items */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-amber-200/60 text-[11px] text-slate-700">
          <div>
            <span className="text-slate-500 block">Civil &amp; Finishes ({estimate.sanitizedSqft} sqft):</span>
            <span className="font-bold text-slate-900">{formatINR(estimate.baseSqftCost)}</span>
          </div>
          {includeKitchen && (
            <div>
              <span className="text-slate-500 block">Modular Kitchen ({kitchenCount}):</span>
              <span className="font-bold text-slate-900">{formatINR(estimate.kitchenCost)}</span>
            </div>
          )}
          {includeBedroom && (
            <div>
              <span className="text-slate-500 block">Bedrooms ({bedroomCount}):</span>
              <span className="font-bold text-slate-900">{formatINR(estimate.bedroomCost)}</span>
            </div>
          )}
          {consultationBooked && (
            <div>
              <span className="text-slate-500 block">Booking Fee:</span>
              <span className="font-bold text-slate-900">₹1,500</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <a
          href={`https://wa.me/919304311336?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba59] active:scale-[0.98] transition-all shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
          <span>Lock Estimate on WhatsApp</span>
        </a>

        <a
          href={BUSINESS_DATA.callHref}
          className="h-11 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>Book Consultation (₹1,500)</span>
        </a>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
        <span>Price guarantee backed by AG Architects certified BOQ milestone contracts</span>
      </div>
    </div>
  );
};
