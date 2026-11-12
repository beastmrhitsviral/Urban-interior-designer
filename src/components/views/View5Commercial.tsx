import React, { useState, useId } from 'react';
import { ArrowLeft, Phone, MessageCircle, Briefcase } from 'lucide-react';
import { BUSINESS_DATA, IMAGES } from '../../data/businessData';
import { formatINR } from '../../utils/calculator';


interface View5CommercialProps {
  onBack: () => void;
  onNavigateToView: (viewNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
}

const DELHI_COMMERCIAL_HUBS = [
  {
    name: 'Barakhamba Road & Connaught Place',
    type: 'Executive Chambers',
    spec: 'Soundproof fluted glass partitions, solid teak director desks, formal boardrooms'
  },
  {
    name: 'Aerocity Worldmark & Hospitality Hub',
    type: 'Global MNC Headquarters',
    spec: 'Biophilic acoustic lounges, townhall audio-visual suites, European reception lounges'
  },
  {
    name: 'Netaji Subhash Place (NSP) Towers',
    type: 'Trading & FinTech',
    spec: 'High-density modular desking, server room HVAC, electronic biometric zoning'
  },
  {
    name: 'Gurugram & Okhla Commercial Centers',
    type: 'Agile Tech Workspaces',
    spec: 'Hot-desking benches, acoustic phone booths, breakout barista bars & gaming corners'
  }
];

export const View5Commercial: React.FC<View5CommercialProps> = ({
  onBack,
  onNavigateToView
}) => {
  const commAreaInputId = useId();
  const [officeSqft, setOfficeSqft] = useState<number>(2500);
  const [workstationType, setWorkstationType] = useState<'standard' | 'executive'>('standard');
  const [includeBoardroom, setIncludeBoardroom] = useState<boolean>(true);

  const estimatedWorkstations = Math.max(5, Math.floor(officeSqft / 75));
  const ratePerSqft = workstationType === 'executive' ? 5200 : 4200;
  const boardroomAddon = includeBoardroom ? 180000 : 0;
  const totalCommercialEstimate = officeSqft * ratePerSqft + boardroomAddon;

  const whatsappInquiry = encodeURIComponent(
    `Hello AG Architects, I need commercial office spatial planning in Delhi NCR:\n• Office Carpet Area: ${officeSqft} Sq. Ft.\n• Headcount Capacity: ~${estimatedWorkstations} Workstations\n• Grade: ${workstationType === 'executive' ? 'Executive Director Suite' : 'Modern Open-Plan Agile'}\n• Boardroom Included: ${includeBoardroom ? 'Yes' : 'No'}\n• Estimated BOQ: ${formatINR(totalCommercialEstimate)}\n\nPlease schedule an on-site commercial spatial survey.`
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
              VIEW 5 &bull; CORPORATE SPATIAL
            </span>
            <h2 className="text-sm font-bold text-slate-900 leading-none">Commercial Workspaces</h2>
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

      {/* Hero Commercial Photo */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={IMAGES.luxuryOffice}
          alt="Commercial Corporate Workspace Spatial Design Delhi by AG Architects"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4 flex flex-col justify-end">
          <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded w-fit border border-amber-400/40 mb-1">
            DELHI NCR COMMERCIAL HUBS
          </span>
          <h1 className="text-lg font-extrabold text-white">
            High-Performance Corporate Spatial Planning
          </h1>
          <p className="text-xs text-white/80">
            Acoustic Pods &bull; Biophilic Zoning &bull; Ergonomic Workstation Layouts
          </p>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-5">


        {/* Commercial Hubs in Delhi NCR */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Delhi NCR Commercial Hub Expertise
            </h3>
            <span className="text-[10px] text-amber-800 font-bold">Active Projects</span>
          </div>

          <div className="space-y-2.5">
            {DELHI_COMMERCIAL_HUBS.map((hub, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 leading-tight">{hub.name}</span>
                  <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold shrink-0">
                    {hub.type}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{hub.spec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Commercial Estimator with clean text and breathing room */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-3.5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Commercial Area &amp; Headcount Planner</h4>
              <p className="text-[11px] text-slate-500 font-medium">Instant turn-around spatial layout sizing</p>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5">
              <label htmlFor={commAreaInputId} className="font-semibold">
                Office Carpet Area (Sq. Ft.)
              </label>
              <span className="font-bold text-amber-700">{officeSqft.toLocaleString('en-IN')} SQ. FT.</span>
            </div>
            <input
              id={commAreaInputId}
              type="range"
              min={500}
              max={15000}
              step={250}
              value={officeSqft}
              onChange={(e) => setOfficeSqft(parseInt(e.target.value, 10))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>500 sq.ft (Boutique)</span>
              <span>5,000 sq.ft (MNC)</span>
              <span>15,000+ sq.ft (Campus)</span>
            </div>
          </div>

          {/* Spatial Capacity Metrics */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Headcount Capacity</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                ~{estimatedWorkstations} Desks
              </span>
              <span className="text-[10px] text-amber-700 font-medium">75 sqft / person metric</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Spatial Modules</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {Math.max(1, Math.floor(officeSqft / 1200))} Pods + 1 Board
              </span>
              <span className="text-[10px] text-amber-700 font-medium">Acoustic rating STC 42</span>
            </div>
          </div>

          {/* Fitout Grade Selection */}
          <div className="pt-1 space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">Corporate Fitout Grade</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setWorkstationType('standard')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  workstationType === 'standard'
                    ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">Standard Agile</span>
                <span className="text-[11px] font-bold text-amber-800">₹4,200 / sq. ft.</span>
              </button>
              <button
                type="button"
                onClick={() => setWorkstationType('executive')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  workstationType === 'executive'
                    ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 block">Executive Grade</span>
                <span className="text-[11px] font-bold text-amber-800">₹5,200 / sq. ft.</span>
              </button>
            </div>
          </div>

          {/* Boardroom add-on */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="comm-boardroom"
                checked={includeBoardroom}
                onChange={(e) => setIncludeBoardroom(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 accent-amber-600"
              />
              <label htmlFor="comm-boardroom" className="text-xs text-slate-800 cursor-pointer">
                <span className="font-bold block">16-Seater Acoustic AV Boardroom</span>
                <span className="text-slate-500 text-[11px]">Conference mics &amp; 85&quot; 4K screen wall</span>
              </label>
            </div>
            <span className="text-xs font-bold text-amber-800">₹1,80,000</span>
          </div>

          {/* Commercial Cost Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-600 mb-0.5">
              <span className="font-semibold">Turnkey Commercial Fitout Estimate</span>
              <span className="text-amber-800 font-medium">Delhi NCR Rate</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {formatINR(totalCommercialEstimate)}
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">
              Includes MEP, HVAC ducting, civil glass partitions, access control &amp; paint.
            </span>
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
            <span>Inquire on WhatsApp</span>
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
