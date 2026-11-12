import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, Check, Calculator, ChevronRight } from 'lucide-react';
import { BUSINESS_DATA, MATERIAL_SAMPLES, IMAGES } from '../../data/businessData';
import { MaterialSample } from '../../types';


interface View8PortfolioMaterialsProps {
  onBack: () => void;
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

const BOQ_BREAKDOWN_MATRIX = [
  {
    category: 'Modular Woodwork & Carcase',
    range: '₹1,800 – ₹2,600 / sq. ft.',
    pct: '40%',
    specs: 'Century / Greenply BWP 710 marine plywood, soft-close Blum / Hafele tandem boxes, anti-scratch acrylic / PU finish'
  },
  {
    category: 'Civil, Italian Marble & Tiling',
    range: '₹1,100 – ₹1,800 / sq. ft.',
    pct: '25%',
    specs: 'Sub-floor leveling, epoxy grouting, Italian Statuario / Bottochino slab lay with mirror diamond polishing'
  },
  {
    category: 'False Ceiling & Electrical MEP',
    range: '₹650 – ₹950 / sq. ft.',
    pct: '15%',
    specs: 'Saint-Gobain gypsum channel framework, Polycab FR wires, Schneider modular switches, 3000K magnetic track lighting'
  },
  {
    category: 'Wall Finishes, Veneers & PU Polish',
    range: '₹550 – ₹850 / sq. ft.',
    pct: '12%',
    specs: 'Asian Paints Royale Luxury Emulsion, fluted acoustic wooden paneling, PU matte clearcoat over Burmese teak veneer'
  },
  {
    category: 'Hardware, Glazing & Brass Trims',
    range: '₹400 – ₹600 / sq. ft.',
    pct: '8%',
    specs: 'PVD brushed champagne brass transition trims, Saint-Gobain 10mm fluted glass partitions, architectural handles'
  }
];

export const View8PortfolioMaterials: React.FC<View8PortfolioMaterialsProps> = ({
  onBack,
  onNavigateToView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSample, setActiveSample] = useState<MaterialSample>(MATERIAL_SAMPLES[0]);

  const categories = ['All', 'Wood & Veneers', 'Marble & Stone', 'Hardware & Metals', 'Fabrics & Glass'];

  const filteredSamples = MATERIAL_SAMPLES.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  const whatsappInquiry = encodeURIComponent(
    `Hello AG Architects, I am reviewing your Materials & Finishes Gallery for a Delhi property. I would like to inspect physical samples of ${activeSample.name} and discuss the ₹4,500 - ₹6,500/sq.ft turnkey BOQ.`
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
              VIEW 8 &bull; ULTIMATE STACK LAYER
            </span>
            <h2 className="text-sm font-bold text-slate-900 leading-none">Portfolio &amp; Materials Gallery</h2>
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

      {/* Hero Showcase Moodboard Photo */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={IMAGES.materials}
          alt="Architectural Materials & Finishes Moodboard by AG Architects Delhi"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4 flex flex-col justify-end">
          <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded w-fit border border-amber-400/40 mb-1">
            DELHI TURNKEY MATRIX: ₹4,500 – ₹6,500 / SQ. FT.
          </span>
          <h1 className="text-lg font-extrabold text-white">
            Curated Architectural Finishes &amp; BOQ Breakdown
          </h1>
          <p className="text-xs text-white/80">
            Natural Teak Veneers &bull; Italian Marbles &bull; German Architectural Profiles
          </p>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-6">
        {/* Real Per-Square-Foot Cost Breakdown Matrix with clean layout */}
        <div className="space-y-3">

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Turnkey BOQ Per-Sq.Ft Matrix
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">Comprehensive 2BHK / 3BHK Delhi Interior Scope</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToView(1)}
              className="text-xs text-amber-800 font-bold hover:underline flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculator</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {BOQ_BREAKDOWN_MATRIX.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 leading-tight">{item.category}</span>
                  <span className="text-xs font-bold text-amber-800 shrink-0">{item.range}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: item.pct }}
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">{item.specs}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-slate-800">
            <span className="font-bold">Aggregate Turnkey Range:</span>
            <span className="text-sm font-extrabold text-amber-800">₹4,500 – ₹6,500 / sq. ft.</span>
          </div>
        </div>

        {/* Material Samples Category Filter */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Interactive Materials Palette
            </h3>
            <span className="text-[10px] text-amber-800 font-bold">Physical Swatches Available</span>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sample Swatches Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {filteredSamples.map((sample) => {
              const isSelected = activeSample.id === sample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setActiveSample(sample)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl border border-slate-300 shrink-0 shadow-inner flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: sample.accentColor }}
                      >
                        {isSelected && <Check className="w-5 h-5 text-white stroke-[3] drop-shadow" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block leading-tight">{sample.name}</span>
                        <span className="text-[10px] text-slate-500 block font-medium mt-0.5">{sample.category} &bull; {sample.origin}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-amber-800 shrink-0">
                      {sample.sqftRateRange}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {sample.description}
                  </p>

                  <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-100 pt-1.5 flex items-center justify-between">
                    <span>Finish: {sample.finish}</span>
                    <span className="text-amber-700 font-bold">Tap to select sample</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Sample Spec Sheet */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Selected Material Specification
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">{activeSample.name}</h4>
              <p className="text-xs text-slate-500">{activeSample.finish}</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 shrink-0">
              {activeSample.sqftRateRange}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Country of Origin:</span>
              <span className="font-bold text-slate-800">{activeSample.origin}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Studio Sample Box:</span>
              <span className="font-bold text-amber-800">Available at Mahavir Akhada, Deoghar</span>
            </div>
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
            <span>Request Swatch Box on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_DATA.callHref}
            className="h-11 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xs"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call 093108 02258</span>
          </a>
        </div>
      </div>
    </div>
  );
};
