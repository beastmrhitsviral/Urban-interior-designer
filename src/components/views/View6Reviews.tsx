import React, { useState } from 'react';
import { ArrowLeft, Star, Phone, MessageCircle, CheckCircle, Search, ThumbsUp, ShieldCheck } from 'lucide-react';
import { BUSINESS_DATA, VERIFIED_REVIEWS } from '../../data/businessData';

interface View6ReviewsProps {
  onBack: () => void;
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

export const View6Reviews: React.FC<View6ReviewsProps> = ({
  onBack
}) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({
    'rev-1': 14,
    'rev-2': 29,
    'rev-3': 18,
    'rev-4': 9,
    'rev-5': 12
  });

  const toggleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredReviews = VERIFIED_REVIEWS.filter((item) => {
    const matchesRating = filterRating === 'all' || Math.floor(item.rating) === filterRating;
    const matchesSearch =
      !searchKeyword ||
      item.quote.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.author.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.location.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesRating && matchesSearch;
  });

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
              VIEW 6 &bull; CLIENT REPUTATION
            </span>
            <h2 className="text-sm font-bold text-slate-900 leading-none">Verified Google Reviews</h2>
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

      <div className="px-4 py-5 max-w-md mx-auto space-y-6">
        {/* Organic Rating Hero (Borderless, bleeding into canvas) */}
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Authenticated Google Business Profile</span>
          </div>

          <div className="flex items-baseline justify-center gap-3">
            <span className="text-6xl font-extrabold text-amber-700 tracking-tight">4.9</span>
            <div className="text-left">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-600 block mt-0.5">
                Based on exactly <strong className="text-slate-900">68 Google Reviews</strong>
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2.5 max-w-xs mx-auto leading-relaxed">
            Urban Axis Design &amp; Deoghar Panel Hub &bull; Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar 814112
          </p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200/80">
          {[
            { stars: 5, pct: '94%', count: 59 },
            { stars: 4, pct: '6%', count: 4 },
            { stars: 3, pct: '0%', count: 0 },
            { stars: 2, pct: '0%', count: 0 },
            { stars: 1, pct: '0%', count: 0 }
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-10 text-right font-semibold">{bar.stars} ★</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: bar.pct }}
                />
              </div>
              <span className="w-8 text-right font-mono text-[10px] text-slate-400 font-medium">{bar.count}</span>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-2.5 pt-2 border-t border-slate-200/80">
          <div className="relative">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Filter reviews (e.g. kamla nagar, beautiful, rates)..."
              className="w-full h-10 bg-white border border-slate-200 focus:border-amber-600 rounded-xl pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-colors shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setFilterRating('all')}
              className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                filterRating === 'all'
                  ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All (63)
            </button>
            <button
              type="button"
              onClick={() => setFilterRating(5)}
              className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                filterRating === 5
                  ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              5 ★ Only (59)
            </button>
          </div>
        </div>

        {/* Free-Flowing Reviews List (Borderless, organic) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Verified Client Feedback</span>
            <span>{filteredReviews.length} Displayed</span>
          </div>

          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="py-3 border-b border-slate-200/70 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-800 shrink-0">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                      {rev.verified && (
                        <CheckCircle className="w-3 h-3 text-amber-600" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {rev.location} &bull; {rev.projectType}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{rev.date}</span>
                </div>
              </div>

              {/* Quote text verbatim */}
              <p className="text-xs text-slate-800 italic font-medium mt-2 leading-relaxed pl-10">
                &ldquo;{rev.quote}&rdquo;
              </p>

              {/* Helpful reaction button */}
              <div className="mt-2 pl-10 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={() => toggleHelpful(rev.id)}
                  className="flex items-center gap-1 hover:text-amber-700 transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({helpfulCounts[rev.id] || 0})</span>
                </button>
                <span className="text-[10px] text-slate-400">Verified Google Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Studio Consultation Box */}
        <div className="pt-4 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            Experience our 4.9-star architectural service first-hand.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <a
              href={BUSINESS_DATA.callHref}
              className="h-11 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call 093108 02258</span>
            </a>

            <a
              href={BUSINESS_DATA.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
