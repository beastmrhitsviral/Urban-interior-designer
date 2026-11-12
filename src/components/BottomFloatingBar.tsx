import React from 'react';
import { Phone, MessageCircle, Search, Home, Layers, ArrowLeft } from 'lucide-react';
import { BUSINESS_DATA } from '../data/businessData';
import { ViewId } from '../utils/stackNavigation';

interface BottomFloatingBarProps {
  currentView: ViewId;
  canGoBack: boolean;
  onBack: () => void;
  onNavigateToView: (view: ViewId) => void;
}

export const BottomFloatingBar: React.FC<BottomFloatingBarProps> = ({
  currentView,
  canGoBack,
  onBack,
  onNavigateToView
}) => {
  return (
    <nav aria-label="Bottom Navigation" className="sticky bottom-0 left-0 right-0 z-40 shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1.5">
        {/* Home / Back Action */}
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-1.5 px-1 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 flex flex-col items-center justify-center transition-all active:scale-95"
            aria-label="Back to previous screen"
          >
            <ArrowLeft className="w-5 h-5 mb-0.5 text-slate-800" />
            <span className="text-[10px] font-bold leading-none text-slate-800">Back</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onNavigateToView(1)}
            className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95 ${
              currentView === 1 ? 'text-amber-800 font-extrabold bg-amber-50' : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Home Shell"
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-none">Home</span>
          </button>
        )}

        {/* Dedicated Search Screen (View 2) */}
        <button
          type="button"
          onClick={() => onNavigateToView(2)}
          className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95 ${
            currentView === 2 ? 'text-amber-800 font-extrabold bg-amber-50' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Search Catalog"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-none">Search</span>
        </button>

        {/* WhatsApp Click-to-Chat (href="https://wa.me/...") */}
        <a
          href={BUSINESS_DATA.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-1.5 px-1 rounded-xl bg-[#25D366] text-white flex flex-col items-center justify-center transition-all active:scale-95 shadow-xs"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 fill-current" />
          <span className="text-[10px] font-bold leading-none">WhatsApp</span>
        </a>

        {/* System Dialer */}
        <a
          href={BUSINESS_DATA.callHref}
          className="flex-1 py-1.5 px-1 rounded-xl bg-slate-900 text-white font-bold flex flex-col items-center justify-center transition-all active:scale-95 shadow-xs"
          aria-label="Call Urban Axis & DPH"
        >
          <Phone className="w-5 h-5 mb-0.5 fill-current" />
          <span className="text-[10px] leading-none">Call Now</span>
        </a>

        {/* Materials & BOQ Matrix (View 8) */}
        <button
          type="button"
          onClick={() => onNavigateToView(8)}
          className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95 ${
            currentView === 8 ? 'text-amber-800 font-extrabold bg-amber-50' : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Materials and BOQ Gallery"
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-none">Materials</span>
        </button>
      </div>
    </nav>
  );
};
