import React from 'react';
import { ArrowLeft, Phone, MessageCircle, MapPin, Navigation, Compass, Clock, Train, ShieldCheck, Share2 } from 'lucide-react';
import { BUSINESS_DATA, DELHI_METRO_STATIONS } from '../../data/businessData';

interface View7LocationProps {
  onBack: () => void;
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

export const View7Location: React.FC<View7LocationProps> = ({
  onBack
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Urban Axis Design & Deoghar Panel Hub (DPH)',
          text: 'Visit Urban Axis Design & DPH at Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar, Jharkhand 814112',
          url: window.location.href
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard?.writeText('Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar, Jharkhand 814112');
    }
  };

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
              VIEW 7 &bull; STUDIO &amp; STORE LOCATION
            </span>
            <h2 className="text-sm font-bold text-slate-900 leading-none">Live Location &amp; GPS Hub</h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:text-amber-700 transition-colors"
            aria-label="Share location"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-5">
        {/* Borderless Studio Address Hero */}
        <div className="py-2">
          <span className="text-[10px] font-bold tracking-widest text-amber-800 uppercase block mb-1">
            DEOGHAR STUDIO &amp; PANEL HUB
          </span>
          <h1 className="text-lg font-extrabold text-slate-900">
            URBAN AXIS DESIGN | DEOGHAR PANEL HUB
          </h1>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {BUSINESS_DATA.address}
          </p>

          <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Mon - Sat: 10:00 AM - 7:30 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Licensed Studio &amp; Store</span>
            </div>
          </div>
        </div>

        {/* Edge-to-Edge Embedded Google Maps Iframe */}
        <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <iframe
            title="Urban Axis Design & DPH Deoghar Interactive Map"
            src={BUSINESS_DATA.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Floating Address Overlay */}
          <div className="absolute top-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-between text-xs shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Mahavir Akhada, Jalshar Road</span>
                <span className="text-[10px] text-slate-500">Near New Nagar Nigam, Deoghar</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              OPEN NOW
            </span>
          </div>
        </div>

        {/* Primary Start GPS Navigation Button mapping directly to exact maps link */}
        <div className="space-y-2">
          <a
            href={BUSINESS_DATA.gpsNavigationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-xl bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-700 active:scale-[0.98] transition-all shadow-xs"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>View Exact Location on Google Maps</span>
          </a>

          <a
            href={BUSINESS_DATA.gpsNavigationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-10 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Open in Google Maps App</span>
          </a>
        </div>

        {/* Direct Call & WhatsApp Real Hyperlinks */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={BUSINESS_DATA.callHref}
            className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <span className="block leading-none">Call Studio</span>
              <span className="text-[10px] text-slate-300 font-normal">{BUSINESS_DATA.phoneRaw}</span>
            </div>
          </a>

          <a
            href={BUSINESS_DATA.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <div className="text-left">
              <span className="block leading-none">WhatsApp</span>
              <span className="text-[10px] text-white/80 font-normal">Instant Reply</span>
            </div>
          </a>
        </div>

        {/* Deoghar Transit Information with clean text */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-amber-700" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Deoghar Transit &amp; Landmarks
            </h4>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            {DELHI_METRO_STATIONS.map((station: { name: string; distance: string }, idx: number) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium">{station.name}</span>
                <span className="text-[11px] font-bold text-amber-800">{station.distance}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
            Convenient auto-rickshaw and e-rickshaw connectivity available from Tower Chowk and Jasidih station directly to Mahavir Akhada, Jalshar Road.
          </p>
        </div>

        {/* Fixed Booking Fee Callout */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-900 block">In-Studio Architectural Consultation</span>
            <span className="text-[11px] text-slate-600">Fixed booking fee at ₹1,500</span>
          </div>
          <a
            href={BUSINESS_DATA.callHref}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors shadow-2xs"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};
