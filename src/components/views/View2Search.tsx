import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft, ChevronRight, Sparkles, Building2, UtensilsCrossed, BedDouble, Layers, Star, MapPin } from 'lucide-react';
import { APP_CATALOG, filterCatalog, SearchItem } from '../../utils/search';

interface View2SearchProps {
  onBack: () => void;
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

const CATEGORY_TAGS = [
  'All',
  'Residential',
  'Commercial',
  'Modular Kitchens',
  'Materials',
  'Reviews',
  'Location'
];

export const View2Search: React.FC<View2SearchProps> = ({
  onBack,
  onNavigateToView
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = filterCatalog(APP_CATALOG, query, selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Modular Kitchens':
        return <UtensilsCrossed className="w-4 h-4 text-amber-700" />;
      case 'Residential':
        return <BedDouble className="w-4 h-4 text-amber-700" />;
      case 'Commercial':
        return <Building2 className="w-4 h-4 text-amber-700" />;
      case 'Materials':
        return <Layers className="w-4 h-4 text-amber-700" />;
      case 'Reviews':
        return <Star className="w-4 h-4 text-amber-500 fill-amber-500" />;
      case 'Location':
        return <MapPin className="w-4 h-4 text-amber-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-700" />;
    }
  };

  return (
    <div className="min-h-full bg-[#F8F9FA] text-slate-900 pb-24 select-none">
      {/* Sticky Clean Search Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 pt-3 pb-3 border-b border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 flex items-center justify-center text-slate-800 active:scale-95 transition-transform shrink-0"
            aria-label="Back to previous screen"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Search Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Delhi interior catalog, rates..."
              className="w-full h-11 bg-slate-100 border border-slate-200 focus:border-amber-600 focus:bg-white rounded-xl pl-10 pr-9 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center absolute right-3 top-2.5"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Pill-Shaped Quick Filter Tags (Horizontal Scrollable) */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-md mx-auto py-1">
          {CATEGORY_TAGS.map((tag) => {
            const isSelected = selectedCategory === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedCategory(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Results Feed */}
      <div className="px-4 py-4 max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>{results.length} Catalog Matches Found</span>
          {selectedCategory !== 'All' && <span>Category: {selectedCategory}</span>}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-800">No Matching Catalog Items</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Try searching for &quot;kitchen&quot;, &quot;bedroom&quot;, &quot;commercial&quot;, &quot;materials&quot;, or &quot;rates&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-3.5 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-amber-700 hover:bg-slate-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          results.map((item: SearchItem) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateToView(item.targetView)}
              className="w-full text-left p-4 rounded-xl bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-amber-400 transition-all active:scale-[0.98] group flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      {item.badge}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </div>

              <p className="text-xs text-slate-600 mt-2.5 pl-12 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-3 pl-12 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">{item.category}</span>
                <span className="font-bold text-amber-800">{item.pricingSnippet}</span>
              </div>
            </button>
          ))
        )}

        {/* Quick Search Suggestions */}
        <div className="pt-4 border-t border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-500 block mb-2">
            Trending Interior &amp; Panel Queries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'Modular Kitchens', view: 3 as const },
              { label: 'Fluted Panels & Bedrooms', view: 4 as const },
              { label: 'House Plans & 3D Elevations', view: 5 as const },
              { label: '4.9 ★ Google Reviews', view: 6 as const },
              { label: 'Mahavir Akhada Studio Map', view: 7 as const },
              { label: 'Panels & UV Marble Gallery', view: 8 as const }
            ].map((suggest) => (
              <button
                key={suggest.label}
                type="button"
                onClick={() => onNavigateToView(suggest.view)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs font-medium"
              >
                {suggest.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
