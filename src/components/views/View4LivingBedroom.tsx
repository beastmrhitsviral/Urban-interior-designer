import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, Check, ChevronRight } from 'lucide-react';
import { BUSINESS_DATA, IMAGES } from '../../data/businessData';
import { formatINR } from '../../utils/calculator';


interface View4LivingBedroomProps {
  onBack: () => void;
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

type TrendType = 'modern' | 'minimalist' | 'classical';

interface TrendDetail {
  id: TrendType;
  title: string;
  tagline: string;
  highlights: string[];
  materials: string[];
  idealFor: string;
  startingPrice: number;
}

const TREND_DATA: Record<TrendType, TrendDetail> = {
  modern: {
    id: 'modern',
    title: 'Modern Architectural Luxury',
    tagline: 'Bookmatched marble, titanium champagne brass & fluted wood',
    startingPrice: 110000,
    idealFor: 'Delhi luxury villas, duplexes & penthouses in Civil Lines / Greater Kailash',
    highlights: [
      'Bookmatched Italian Statuario marble TV accent wall with integrated soundbar recess',
      'Fluted American walnut acoustic paneling with concealed warm 3000K LED glow',
      'Floating platform bed frame with integrated bedside cantilever marble nightstands',
      'Floor-to-ceiling smoked glass wardrobe with champagne anodized aluminum frames'
    ],
    materials: ['Statuario Marble', 'American Walnut', 'Champagne Brass', 'Smoked Glass']
  },
  minimalist: {
    id: 'minimalist',
    title: 'Warm Japandi & Delhi Minimalist',
    tagline: 'Subtle microcement, natural oak & serene decluttered geometry',
    startingPrice: 85000,
    idealFor: 'Contemporary 2BHK / 3BHK builder floors seeking tranquil spatial harmony',
    highlights: [
      'Artisanal lime plaster / microcement textured wall finish with soft organic curve',
      'Low-slung solid white oak platform bed with concealed underbed storage drawers',
      'Concealed track-guided sliding panels and acoustic fabric headboard in beige bouclé',
      'Glare-free deep-recessed anti-dazzle architectural ceiling spots (CRI > 95)'
    ],
    materials: ['Natural White Oak', 'Lime Plaster', 'Belgian Bouclé', 'Concealed LED']
  },
  classical: {
    id: 'classical',
    title: 'Classical Indian Heritage Fusion',
    tagline: 'Handcrafted teak carvings, brass jali filigree & raw tussar silk',
    startingPrice: 135000,
    idealFor: 'Traditional Delhi family estates celebrating indigenous craftsmanship',
    highlights: [
      'Handcrafted seasoned Burmese teak wood carvings and traditional fluted moldings',
      'Laser-cut warm brass jali partition screens creating geometric shadow patterns',
      'Bespoke cane webbing (rattan) wardrobe inserts with antique brushed brass handles',
      'Heritage wooden coffered false ceiling with dimmable chandelier focal point'
    ],
    materials: ['Burmese Teak', 'Cane Webbing', 'Antiqued Brass', 'Raw Tussar Silk']
  }
};

export const View4LivingBedroom: React.FC<View4LivingBedroomProps> = ({
  onBack,
  onNavigateToView
}) => {
  const [activeTrend, setActiveTrend] = useState<TrendType>('modern');
  const [roomType, setRoomType] = useState<'bedroom' | 'living'>('bedroom');

  const currentTrend = TREND_DATA[activeTrend];

  const whatsappInquiry = encodeURIComponent(
    `Hello AG Architects, I am interested in your ${currentTrend.title} design trend for my ${roomType === 'bedroom' ? 'Luxury Bedroom Suite' : 'Living Room Architecture'}. Please share Delhi site visit availability.`
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
              VIEW 4 &bull; RESIDENTIAL SUITES
            </span>
            <h2 className="text-sm font-bold text-slate-900 leading-none">Living &amp; Bedroom Luxury</h2>
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

      {/* Hero Suite Showcase Photo */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={roomType === 'bedroom' ? IMAGES.luxuryBedroom : IMAGES.luxuryLiving}
          alt="Luxury Suite Architecture by AG Architects Delhi"
          className="w-full h-full object-cover transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4 flex flex-col justify-end">
          <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded w-fit border border-amber-400/40 mb-1">
            DELHI MATRIX: BEDROOMS FROM ₹85,000 ONWARDS
          </span>
          <h1 className="text-lg font-extrabold text-white">
            {roomType === 'bedroom' ? 'Master Bedroom Luxury Suites' : 'Grand Architectural Living Rooms'}
          </h1>
          <p className="text-xs text-white/80">
            Acoustic Fluted Paneling &bull; Italian Statuario &bull; Concealed Brass Trims
          </p>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-5">


        {/* Room Type Switcher with clean labels */}
        <div className="p-1 rounded-xl bg-slate-200/70 border border-slate-300/60 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setRoomType('bedroom')}
            className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold transition-all text-center ${
              roomType === 'bedroom'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bedrooms (From ₹85K)
          </button>
          <button
            type="button"
            onClick={() => setRoomType('living')}
            className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold transition-all text-center ${
              roomType === 'living'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Living Architecture
          </button>
        </div>

        {/* 3 Indian & Contemporary Design Trends Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Curated Architectural Design Trends
            </h3>
            <span className="text-[10px] text-amber-800 font-bold">Delhi Design School</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['modern', 'minimalist', 'classical'] as const).map((tKey) => {
              const trend = TREND_DATA[tKey];
              const isSelected = activeTrend === tKey;
              return (
                <button
                  key={tKey}
                  type="button"
                  onClick={() => setActiveTrend(tKey)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-xs font-bold block ${isSelected ? 'text-amber-800' : 'text-slate-800'}`}>
                    {tKey.charAt(0).toUpperCase() + tKey.slice(1)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    {formatINR(trend.startingPrice)}+
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Trend Specifications Showcase */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-3 shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase">
                Active Philosophy &bull; {currentTrend.title}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">{currentTrend.tagline}</h4>
              <p className="text-[11px] text-slate-500 mt-1 italic leading-snug">{currentTrend.idealFor}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block font-medium">Starting:</span>
              <span className="text-sm font-extrabold text-amber-700">
                {formatINR(currentTrend.startingPrice)}
              </span>
            </div>
          </div>

          {/* Key Architectural Highlights */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-700 block">Standard Suite Inclusions:</span>
            {currentTrend.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{h}</span>
              </div>
            ))}
          </div>

          {/* Materials Tagged */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 mr-1">Primary Finishes:</span>
            {currentTrend.materials.map((m) => (
              <span
                key={m}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Turnkey Consultation Booking Matrix */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-semibold">Consultation &amp; Architectural Planning</span>
            <span className="text-[11px] text-amber-800 font-medium">Fixed Delhi Booking</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-extrabold text-slate-900">
              ₹1,500
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Credited to Full Project BOQ</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
            Includes on-site laser dimension survey, architectural 2D zoning layouts, and 3D moodboard presentation.
          </p>
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
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_DATA.callHref}
            className="h-11 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xs"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call 093108 02258</span>
          </a>
        </div>

        {/* Link to Materials & Finishes Gallery (View 8) */}
        <button
          type="button"
          onClick={() => onNavigateToView(8)}
          className="w-full py-2.5 text-center text-xs text-amber-800 hover:underline font-bold flex items-center justify-center gap-1 border-t border-slate-200 mt-2"
        >
          <span>View Teak, Walnut &amp; Statuario Samples in Gallery (View 8)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
