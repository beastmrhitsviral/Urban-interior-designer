import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, Check, ChevronRight } from 'lucide-react';
import { BUSINESS_DATA, IMAGES } from '../../data/businessData';
import { formatINR } from '../../utils/calculator';


interface View3KitchenProps {
  onBack: () => void;
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

interface KitchenLayout {
  id: string;
  name: string;
  suitability: string;
  startingPrice: number;
  dimensions: string;
  features: string[];
}

const KITCHEN_LAYOUTS: KitchenLayout[] = [
  {
    id: 'island',
    name: 'Island Gourmet Layout',
    suitability: 'For open-plan luxury apartments & villas',
    startingPrice: 225000,
    dimensions: '14 ft × 12 ft + 7 ft Island',
    features: [
      'Central waterfall quartz dining island with bar seating',
      'Integrated induction hob with downdraft smoke extractor',
      'Dual Blum Aventos bi-fold lift systems for overhead cabinetry',
      'Smoked bronze fluted glass display unit with sensor LEDs'
    ]
  },
  {
    id: 'l-shape',
    name: 'L-Shaped Ergonomic Triangle',
    suitability: 'Best for 2BHK / 3BHK Delhi builder floors',
    startingPrice: 120000,
    dimensions: '10 ft × 8 ft corner layout',
    features: [
      'Golden work triangle between sink, hob, and refrigerator',
      'Hafele 360° carousel pull-out corner optimization',
      'Calibrated BWP Marine Ply (IS:710) 18mm carcase',
      'Anti-fingerprint matte acrylic shutters with J-pull profile'
    ]
  },
  {
    id: 'parallel',
    name: 'Parallel Galley Chef Layout',
    suitability: 'High-efficiency dual counters for serious cooking',
    startingPrice: 165000,
    dimensions: '12 ft × 7 ft parallel alleys',
    features: [
      'Separation of wet washing zone and dry culinary prep zone',
      'Floor-to-ceiling pantry pull-out unit with 6 wire baskets',
      'Concealed under-cabinet 3000K warm architectural task lighting',
      'Granite / quartz anti-stain composite splashback'
    ]
  },
  {
    id: 'u-shape',
    name: 'U-Shaped Maximum Storage',
    suitability: 'Enclosed dedicated kitchen spaces',
    startingPrice: 195000,
    dimensions: '11 ft × 10 ft continuous runs',
    features: [
      'Three continuous walls of base and wall storage cabinets',
      'Dual blind corner magic units with soft-glide damping',
      'Bespoke spice and bottle pullouts adjacent to culinary range',
      'Heavy-duty stainless steel 304 sink with pull-out spray tap'
    ]
  }
];

const FINISHES = [
  { id: 'acrylic', name: 'German Matte PU Acrylic', premium: 0, tag: 'Included' },
  { id: 'veneer', name: 'Natural Fluted Teak Veneer', premium: 35000, tag: '+₹35,000' },
  { id: 'ceramic', name: 'Ultra-Slim Porcelain Ceramic', premium: 55000, tag: '+₹55,000' }
];

export const View3Kitchen: React.FC<View3KitchenProps> = ({
  onBack,
  onNavigateToView
}) => {
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('island');
  const [selectedFinishId, setSelectedFinishId] = useState<string>('acrylic');
  const [includeBuiltInAppliances, setIncludeBuiltInAppliances] = useState<boolean>(true);

  const selectedLayout = KITCHEN_LAYOUTS.find((l) => l.id === selectedLayoutId) || KITCHEN_LAYOUTS[0];
  const selectedFinish = FINISHES.find((f) => f.id === selectedFinishId) || FINISHES[0];

  const appliancesAddon = includeBuiltInAppliances ? 48000 : 0;
  const totalPackageCost = selectedLayout.startingPrice + selectedFinish.premium + appliancesAddon;

  const whatsappInquiry = encodeURIComponent(
    `Hello Urban Axis Design & Deoghar Panel Hub, I am interested in your Kitchen & Modular Studio design:\n• Layout: ${selectedLayout.name}\n• Finish: ${selectedFinish.name}\n• Appliances Setup: ${includeBuiltInAppliances ? 'Yes' : 'No'}\n• Estimated Package: ${formatINR(totalPackageCost)}\n\nPlease arrange a consultation at your Mahavir Akhada studio.`
  );

  return (
    <div className="min-h-full bg-[#F8F9FA] text-slate-900 pb-24 select-none">
      {/* Top Mobile Stack Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/90 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 flex items-center justify-center text-slate-800 active:scale-95 transition-transform"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
              VIEW 3 &bull; SPECIALIZED STUDIO
            </span>
            <h2 className="text-sm font-bold text-slate-900 leading-none">Modular Kitchen Studio</h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={BUSINESS_DATA.callHref}
            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:text-amber-700 transition-colors"
            aria-label="Call AG Architects"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={BUSINESS_DATA.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs"
            aria-label="WhatsApp AG Architects"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hero Showcase Photo */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={IMAGES.luxuryKitchen}
          alt="German-Finish Modular Kitchen by AG Architects Delhi"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4 flex flex-col justify-end">
          <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded w-fit border border-amber-400/40 mb-1">
            DELHI COMMERCIAL MATRIX: FROM ₹1,20,000 ONWARDS
          </span>
          <h1 className="text-lg font-extrabold text-white">
            German Precision Kitchen Architecture
          </h1>
          <p className="text-xs text-white/80">
            Engineered Marine Ply Carcase &bull; Blum Soft-Close &bull; Calacatta Quartz Countertops
          </p>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-5">


        {/* Layout Plans Selector with full words */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Architectural Layout Plan
            </h3>
            <span className="text-[10px] text-amber-700 font-bold">4 Standard Delhi Blueprints</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {KITCHEN_LAYOUTS.map((layout) => {
              const isSelected = selectedLayoutId === layout.id;
              return (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() => setSelectedLayoutId(layout.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500 shadow-xs'
                      : 'bg-white border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {layout.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />}
                  </div>
                  <span className="text-[11px] font-extrabold text-amber-800 mt-1.5 block">
                    From {formatINR(layout.startingPrice)}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
                    {layout.dimensions}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Layout Plan Blueprint Details */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-3 shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase">
                Active Specification &bull; {selectedLayout.name}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">{selectedLayout.suitability}</h4>
              <p className="text-xs text-slate-500">Spatial footprint: {selectedLayout.dimensions}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block font-medium">Base BOQ:</span>
              <span className="text-sm font-extrabold text-amber-700">
                {formatINR(selectedLayout.startingPrice)}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            {selectedLayout.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shutter Finish Multipliers */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            Cabinetry Shutter Material &amp; Finish
          </label>
          <div className="space-y-2">
            {FINISHES.map((f) => {
              const isSelected = selectedFinishId === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFinishId(f.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-600 bg-amber-600' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{f.name}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-800">{f.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Appliances Package Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="appliances-addon"
              checked={includeBuiltInAppliances}
              onChange={(e) => setIncludeBuiltInAppliances(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 accent-amber-600"
            />
            <label htmlFor="appliances-addon" className="text-xs text-slate-800 cursor-pointer">
              <span className="font-bold block">Integrated Chimney &amp; Hob Package</span>
              <span className="text-slate-500 text-[11px]">Hafele / Faber 90cm high-suction pack (+₹48,000)</span>
            </label>
          </div>
          <span className="text-xs font-bold text-amber-800">₹48,000</span>
        </div>

        {/* Live Customized BOQ Total Box */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-semibold">Custom Kitchen Investment Estimate</span>
            <span className="text-[11px] text-amber-800 font-medium">AG Architects Standard</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-extrabold text-slate-900">
              {formatINR(totalPackageCost)}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">10-Yr Warranty On Ply</span>
          </div>

          <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-700">
            <span>Consultation &amp; 3D Render Booking:</span>
            <span className="font-bold text-slate-900">Fixed ₹1,500</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href={`https://wa.me/919304311336?text=${whatsappInquiry}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Book Kitchen on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_DATA.callHref}
            className="h-11 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xs"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call 093108 02258</span>
          </a>
        </div>

        {/* Deep stack link to Materials Gallery (View 8) */}
        <button
          type="button"
          onClick={() => onNavigateToView(8)}
          className="w-full py-2.5 text-center text-xs text-amber-800 hover:underline font-bold flex items-center justify-center gap-1 border-t border-slate-200 mt-2"
        >
          <span>Examine Hardware &amp; Material Specs in Gallery (View 8)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
