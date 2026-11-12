import React from 'react';
import { Search, Star, Phone, MessageCircle, MapPin, Navigation, Compass, ChevronRight } from 'lucide-react';
import { BUSINESS_DATA, IMAGES } from '../../data/businessData';
import { InteriorCalculator } from '../InteriorCalculator';
import { Service3DTransformShowcase } from '../Service3DTransformShowcase';

interface View1HomeProps {
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

export const View1Home: React.FC<View1HomeProps> = ({ onNavigateToView }) => {
  return (
    <div className="min-h-full bg-[#F8F9FA] text-slate-900 pb-24 select-none">
      {/* 1. Moving 3D Transition Background Video behind AG ARCHITECTS DELHI typography */}
      <div className="w-full">
        <Service3DTransformShowcase onNavigateToView={onNavigateToView} asBackground>
          <div className="pt-2.5 pb-4 px-4 text-center">
            {/* Studio Title Bar overlaid on background video */}
            <div className="relative z-10 px-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase drop-shadow-md">
                <span className="text-amber-400">URBAN AXIS</span> DESIGN | DEOGHAR PANEL HUB
              </h1>
              <p className="text-xs text-slate-200 font-medium mt-0.5 drop-shadow-sm">
                Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar, Jharkhand 814112
              </p>
            </div>

            {/* Quick Reputation & Call-to-Action Bar overlaid on background video */}
            <div className="mt-3 flex items-center justify-between max-w-sm mx-auto text-xs px-3.5 py-2 rounded-xl bg-slate-950/65 backdrop-blur-md border border-white/15 text-white shadow-sm">
              <button
                type="button"
                onClick={() => onNavigateToView(6)}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white text-xs">4.9</span>
                <span className="text-[11px] text-slate-300">(63 Google Reviews)</span>
              </button>

              <a
                href={BUSINESS_DATA.callHref}
                className="flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>093108 02258</span>
              </a>
            </div>
          </div>
        </Service3DTransformShowcase>
      </div>

      {/* 2. Search Button on Home Page directly below the borderless stretched video bottom */}
      <div className="px-4 pt-1 pb-1 max-w-md mx-auto -mt-2 relative z-20">
        <button
          type="button"
          onClick={() => onNavigateToView(2)}
          className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 flex items-center justify-between text-left transition-all active:scale-[0.99] group shadow-xs"
          aria-label="Tap to open dedicated search screen"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Search className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs font-medium text-slate-500 truncate">
              Search modular kitchens, luxury bedrooms, rates...
            </span>
          </div>
          <div className="px-2 py-0.5 rounded bg-amber-100/70 text-[10px] text-amber-900 font-bold shrink-0 border border-amber-200/80">
            SEARCH
          </div>
        </button>
      </div>



      {/* 4. Responsive Architectural Grid with Room for all words */}
      <div className="px-4 py-1 max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Specialized Interior Studios
          </h3>
          <span className="text-[10px] text-amber-700 font-semibold">Tap to slide into studio</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Tile 1: Modular Kitchens -> View 3 */}
          <button
            type="button"
            onClick={() => onNavigateToView(3)}
            className="text-left rounded-xl bg-white border border-slate-200/90 overflow-hidden hover:border-amber-400 transition-all active:scale-[0.98] group flex flex-col shadow-xs"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={IMAGES.kitchen}
                alt="Modular Kitchen Studio Delhi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300">
                FROM ₹1.2L
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                  Modular Kitchen Studio
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                  German quartz islands, matte PU acrylic &amp; Blum hardware.
                </p>
              </div>
              <div className="mt-2.5 flex items-center text-[10px] font-bold text-amber-700">
                <span>Explore Studio</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>
          </button>

          {/* Tile 2: Luxury Living & Bedroom -> View 4 */}
          <button
            type="button"
            onClick={() => onNavigateToView(4)}
            className="text-left rounded-xl bg-white border border-slate-200/90 overflow-hidden hover:border-amber-400 transition-all active:scale-[0.98] group flex flex-col shadow-xs"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={IMAGES.bedroom}
                alt="Living & Bedroom Luxury View"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300">
                FROM ₹85K
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                  Living &amp; Bedroom Luxury
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                  Acoustic fluted walnut paneling &amp; brass inlays.
                </p>
              </div>
              <div className="mt-2.5 flex items-center text-[10px] font-bold text-amber-700">
                <span>Explore Trends</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>
          </button>

          {/* Tile 3: Commercial Workspace -> View 5 */}
          <button
            type="button"
            onClick={() => onNavigateToView(5)}
            className="text-left rounded-xl bg-white border border-slate-200/90 overflow-hidden hover:border-amber-400 transition-all active:scale-[0.98] group flex flex-col shadow-xs"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={IMAGES.commercial}
                alt="Commercial Workspace Delhi NCR"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300">
                DELHI NCR
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                  Commercial Workspaces
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                  Spatial planning, meeting pods &amp; executive hubs.
                </p>
              </div>
              <div className="mt-2.5 flex items-center text-[10px] font-bold text-amber-700">
                <span>View Layouts</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>
          </button>

          {/* Tile 4: Materials & Rates -> View 8 */}
          <button
            type="button"
            onClick={() => onNavigateToView(8)}
            className="text-left rounded-xl bg-white border border-slate-200/90 overflow-hidden hover:border-amber-400 transition-all active:scale-[0.98] group flex flex-col shadow-xs"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={IMAGES.materials}
                alt="Portfolio & Materials Gallery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-300">
                PER SQ.FT
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                  Materials &amp; BOQ Matrix
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                  Burmese teak, Statuario marble &amp; hardware specs.
                </p>
              </div>
              <div className="mt-2.5 flex items-center text-[10px] font-bold text-amber-700">
                <span>See Pricing</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 5. Real Delhi Market Interior Pricing Matrix & Operational Calculator */}
      <div className="px-4 py-4 max-w-md mx-auto">
        <InteriorCalculator onNavigateToView={onNavigateToView} />
      </div>

      {/* 6. THE CLEAN UNBOUNDED BOTTOM DOCK (ROUGH & BORDERLESS) */}
      <div className="mt-4 pt-6 px-4 max-w-md mx-auto border-t border-slate-200/80">
        <div className="text-center mb-5">
          <span className="text-[10px] font-bold tracking-widest text-amber-800 uppercase">
            AUTHENTICATED REPUTATION &amp; STUDIO DOCK
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Urban Axis Design | DPH – Deoghar Panel Hub
          </h3>
          <p className="text-xs text-slate-500">
            Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar
          </p>
        </div>

        {/* Free-Flowing Google Rating Header */}
        <div className="py-2 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-amber-700">4.9</span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-700 mt-1">
            Official Google Rating &bull; Exactly 68 Real Client Reviews
          </p>
          <button
            type="button"
            onClick={() => onNavigateToView(6)}
            className="text-xs text-amber-800 hover:underline mt-1 font-bold flex items-center gap-1"
          >
            <span>Open Dedicated Reviews Dashboard (View 6)</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Free-Flowing Verbatim Reviews List (Borderless, bleeding into canvas) */}
        <div className="mt-4 space-y-3.5">
          {/* Quote 1 */}
          <div className="py-2 border-b border-slate-200/60">
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
              <span className="text-[11px] text-slate-500 ml-1.5 font-medium">Rajesh Kumar &bull; Near New Nagar Nigam</span>
            </div>
            <p className="text-xs text-slate-800 italic font-medium leading-relaxed">
              &ldquo;Excellent TV unit with UV marble sheet and fluted panels. Best price and quality in Deoghar!&rdquo;
            </p>
          </div>

          {/* Quote 2 */}
          <div className="py-2 border-b border-slate-200/60">
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
              <span className="text-[11px] text-slate-500 ml-1.5 font-medium">Pooja Sharma &bull; Castairs Town, Deoghar</span>
            </div>
            <p className="text-xs text-slate-800 italic font-medium leading-relaxed">
              &ldquo;Urban Axis designed our entire house plan and elevation. Flawless execution and premium quality!&rdquo;
            </p>
          </div>

          {/* Quote 3 */}
          <div className="py-2 border-b border-slate-200/60">
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
              <span className="text-[11px] text-slate-500 ml-1.5 font-medium">Amit Aggarwal &bull; VIP Chowk, Deoghar</span>
            </div>
            <p className="text-xs text-slate-800 italic font-medium leading-relaxed">
              &ldquo;Best rates on WPC and PVC panels at Deoghar Panel Hub. Genuine premium quality material.&rdquo;
            </p>
          </div>
        </div>

        {/* Borderless Edge-to-Edge Live Google Maps Iframe */}
        <div className="mt-6 pt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>Mahavir Akhada Studio &amp; Store Location</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToView(7)}
              className="text-[11px] text-amber-800 font-bold hover:underline flex items-center gap-1"
            >
              <span>Full Location Hub (View 7)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3">
            Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar, Jharkhand 814112
          </p>

          {/* Edge-to-edge interactive Google Maps iframe */}
          <div className="w-full h-52 rounded-xl overflow-hidden border border-slate-200 relative shadow-xs">
            <iframe
              title="Urban Axis Design and Deoghar Panel Hub Google Map"
              src={BUSINESS_DATA.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Primary GPS Navigation & Communication Actions */}
          <div className="mt-3 space-y-2">
            {/* Primary Start GPS Navigation button mapping directly to https://google.com */}
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-700 active:scale-[0.98] transition-all shadow-xs"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>Start GPS Navigation</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={BUSINESS_DATA.callHref}
                className="h-10 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call 093108 02258</span>
              </a>

              <a
                href={BUSINESS_DATA.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#20ba59] transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Studio Consultation Notice */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 text-center text-[11px] text-slate-500 pb-2">
          <p className="font-semibold text-slate-700">URBAN AXIS DESIGN &amp; DEOGHAR PANEL HUB &bull; DEOGHAR</p>
          <p className="mt-0.5">Fixed ₹1,500 Professional Architectural Consultation &bull; Mahavir Akhada, Jalshar Road</p>
        </div>
      </div>
    </div>
  );
};
