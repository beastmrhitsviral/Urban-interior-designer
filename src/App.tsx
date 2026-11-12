/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Play,
  Pause,
  Camera,
  Video,
  Phone,
  MessageCircle,
  MapPin,
  Navigation,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Calendar,
  X,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Eye,
  RefreshCw,
  Clock,
  Maximize2,
  Heart
} from 'lucide-react';
import { BUSINESS_DATA, IMAGES, MATERIAL_SAMPLES } from './data/businessData';

// 6 Dedicated Pages
export type PageRoute = 'home' | 'discover' | 'search' | 'results' | 'gallery' | 'contact';

export const PAGE_ROUTES: PageRoute[] = ['home', 'discover', 'search', 'results', 'gallery', 'contact'];

export interface TransitionRoom {
  id: string;
  title: string;
  tagline: string;
  category: string;
  location: string;
  startingPrice: string;
  area: string;
  videoUrl: string;
  beforeImg: string;
  afterImg: string;
  beforeDesc: string;
  afterDesc: string;
  specs: string[];
  photos: string[];
  clientQuote?: string;
  clientName?: string;
}

export const TRANSITION_ROOMS: TransitionRoom[] = [
  {
    id: 'tv-unit',
    title: 'TV Unit (Photo Panel + UV Marble Sheet)',
    tagline: 'Raw Concrete Wall ➔ Designer UV Marble & Photo Panel TV Unit',
    category: 'Featured Design & Applications',
    location: 'Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar',
    startingPrice: 'Best Price Guarantee',
    area: 'Custom Wall Scale',
    videoUrl: '/videos/living_transition.mp4',
    beforeImg: IMAGES.emptyLiving,
    afterImg: IMAGES.luxuryLiving,
    beforeDesc: 'Bare unpainted masonry wall with hanging wiring conduits and raw floor screed.',
    afterDesc: 'High-gloss UV Marble Sheet backing, ambient LED backlight profile, custom photo panel accents, and floating console cabinetry.',
    specs: [
      'High-gloss scratch-resistant UV Marble Sheet feature backdrop',
      'Custom Photo Panel integration with concealed LED perimeter',
      'Floating console cabinetry with soft-close hardware',
      '100% moisture-proof, termite-proof & durable construction',
      'Guaranteed best quality and best price for interior decor'
    ],
    photos: [IMAGES.luxuryLiving, IMAGES.emptyLiving, IMAGES.materials],
    clientQuote: 'The TV unit with UV marble sheet and photo panel is the star of our living room in Deoghar!',
    clientName: 'Rajesh Kumar'
  },
  {
    id: 'pvc-ceiling',
    title: 'PVC Ceiling & Wall Design Panel Suite',
    tagline: 'Bare Slab ➔ Waterproof Interlocking PVC Ceiling & Wall Panels',
    category: 'PVC Ceiling & Wall Design Panels',
    location: 'Near New Nagar Nigam, Jalshar Road, Deoghar',
    startingPrice: 'Best Price Guarantee',
    area: '1,450 Sq. Ft.',
    videoUrl: '/videos/ceiling_transition.mp4',
    beforeImg: IMAGES.emptyLiving,
    afterImg: IMAGES.luxuryLiving,
    beforeDesc: 'Rough ceiling slab with uneven joints, bare conduits, and unlevelled plaster.',
    afterDesc: 'Precision interlocking PVC ceiling panels with warm indirect cove lighting and seamless wall design panels.',
    specs: [
      'Waterproof and anti-termite PVC ceiling interlocks',
      'Integrated 2700K warm architectural LED diffusers',
      'Durable wall design panel cladding with zero maintenance',
      'Premium quality material: durable and long-lasting products'
    ],
    photos: [IMAGES.luxuryLiving, IMAGES.emptyLiving, IMAGES.materials],
    clientQuote: 'DPH provided top quality PVC panels. Fast installation with best price guarantee.',
    clientName: 'Amit Aggarwal'
  },
  {
    id: 'fluted-bedroom',
    title: 'Fluted Panel & WPC Master Bedchamber',
    tagline: 'Empty Raw Room ➔ 5-Star Boutique Suite with Fluted Panels',
    category: 'Fluted & WPC Panels',
    location: 'Castairs Town, Deoghar',
    startingPrice: 'Best Price Guarantee',
    area: '2,400 Sq. Ft.',
    videoUrl: '/videos/bedroom_transition.mp4',
    beforeImg: IMAGES.emptyBedroom,
    afterImg: IMAGES.luxuryBedroom,
    beforeDesc: 'Raw unfinished cement floor, plain unpainted plastered brick walls, bare window bay ready for decor.',
    afterDesc: 'Warm fluted acoustic wall panels, indirect LED headboard coves, WPC accent borders, and matching luxury wardrobe joinery.',
    specs: [
      'Acoustic fluted panels with brass moulding accents',
      'Integrated 2700K indirect ambient headboard lighting',
      'Durable & long lasting moisture-resistant core',
      'Tagline: Style Your Space, Define Your Lifestyle'
    ],
    photos: [IMAGES.luxuryBedroom, IMAGES.emptyBedroom, IMAGES.bedroom],
    clientQuote: 'The fluted acoustic paneling and indirect cove lighting feel like a luxury resort.',
    clientName: 'Dr. Meenakshi Sundaram'
  },
  {
    id: 'mosaic-wall',
    title: 'Mosaic Wall with Moulding Bit Accent',
    tagline: 'Plain Wall ➔ Artisanal Mosaic Wall with Moulding Bit',
    category: 'Mosaic & Moulding Bit',
    location: 'Jalshar Road, Deoghar',
    startingPrice: 'Best Price Guarantee',
    area: '1,200 Sq. Ft.',
    videoUrl: '/videos/kitchen_transition.mp4',
    beforeImg: IMAGES.emptyKitchen,
    afterImg: IMAGES.luxuryKitchen,
    beforeDesc: 'Bare plain wall surface with unfinished paint and exposed brick edges.',
    afterDesc: 'Artisanal textured mosaic tiles framed with precision moulding bits, quartzite worktops, and UV marble accents.',
    specs: [
      'Artisanal mosaic wall assemblies with precision alignment',
      'Architectural moulding bit perimeter trims & shadow lines',
      'Stain-resistant and easy-wipe durable surface',
      'Matching WPC and PVC panel accents available'
    ],
    photos: [IMAGES.luxuryKitchen, IMAGES.emptyKitchen, IMAGES.kitchen],
    clientQuote: 'The moulding bit detailing around the mosaic wall gives royal luxury character to our home.',
    clientName: 'Pooja Sharma'
  },
  {
    id: 'house-plan-elevation',
    title: 'House Plan, 3D Elevation & Construction',
    tagline: 'Open Plot / Blueprint ➔ Turnkey Architectural Landmark',
    category: 'Urban Axis Architecture & Design',
    location: 'Mahavir Akhada, Jalshar Road, Deoghar, Jharkhand',
    startingPrice: 'Turnkey Architectural Solutions',
    area: 'Custom Plot Scale',
    videoUrl: '/videos/office_transition.mp4',
    beforeImg: IMAGES.emptyOffice,
    afterImg: IMAGES.luxuryOffice,
    beforeDesc: 'Raw open site or outdated structure needing comprehensive architectural planning.',
    afterDesc: 'Vastu-compliant architectural house plans, photorealistic 3D elevations, structural construction drawings, and turnkey execution.',
    specs: [
      'House plans, elevation design, interior design & 3D visualization',
      'Construction guidance, renovation & remodeling, site supervision & turnkey solutions',
      'Slogan: Building Dreams, Designing Spaces',
      'Vastu-compliant architectural layouts and turnkey engineering'
    ],
    photos: [IMAGES.luxuryOffice, IMAGES.emptyOffice, IMAGES.commercial],
    clientQuote: 'Urban Axis handled our house planning, 3D elevation, and site supervision with 100% dedication.',
    clientName: 'Siddharth Mehra'
  },
  {
    id: 'renovation-remodeling',
    title: 'Turnkey Renovation & Interior Remodeling',
    tagline: 'Outdated Space ➔ Modern Turnkey Residence with Premium Panels',
    category: 'Urban Axis Construction & Turnkey Solutions',
    location: 'Mahavir Akhada, Near New Nagar Nigam, Deoghar',
    startingPrice: 'Best Price Guarantee',
    area: '3,200 Sq. Ft.',
    videoUrl: '/videos/renovation_transition.mp4',
    beforeImg: IMAGES.emptyLiving,
    afterImg: IMAGES.luxuryLiving,
    beforeDesc: 'Outdated interiors with worn surfaces, obsolete electrical points, and peeling wall paint.',
    afterDesc: 'Complete modern transformation with PVC ceilings, UV marble sheets, WPC panels, custom blinds, and turnkey finish.',
    specs: [
      'End-to-end renovation & remodeling with turnkey project management',
      'Premium panel integration (PVC, WPC, Fluted, UV Marble, Foam Sheet)',
      'On-order custom wallpapers, blinds, 3D panels & PU stone',
      'Best price guarantee with durable, long-lasting products'
    ],
    photos: [IMAGES.luxuryLiving, IMAGES.emptyLiving, IMAGES.materials],
    clientQuote: 'Turnkey execution with no delays. Urban Axis & DPH made our dream space a reality.',
    clientName: 'Amit Aggarwal'
  },
  {
    id: 'on-order-decor',
    title: 'On-Order Decor: 3D Panels, PU Stone, Wallpaper & Blinds',
    tagline: 'Plain Wall ➔ Bespoke PU Stone, 3D Panels & Designer Wallpapers',
    category: 'Available On Order: Premium Specialty Decor',
    location: 'Deoghar Panel Hub (DPH), Mahavir Akhada, Deoghar',
    startingPrice: 'Available on Order',
    area: 'Custom Scale',
    videoUrl: '/videos/hero_transition.mp4',
    beforeImg: IMAGES.emptyLiving,
    afterImg: IMAGES.materials,
    beforeDesc: 'Bare plain wall requiring custom architectural stone relief, 3D geometry, or acoustic wallpaper cladding.',
    afterDesc: 'Available on order: ultra-lightweight PU stone veneers, geometric 3D relief panels, designer wallpapers, foam sheets, and custom motorized blinds.',
    specs: [
      'PU Stone: Ultra-lightweight polyurethane masonry veneer',
      '3D Panels: Sculptured geometric modular relief walls',
      'Wallpaper & Blinds: Bespoke international designer patterns on order',
      'Foam Sheets: 3D embossed self-adhesive thermal & acoustic panels',
      'Best quality & best price for all interior decor orders'
    ],
    photos: [IMAGES.materials, IMAGES.luxuryLiving, IMAGES.luxuryBedroom],
    clientQuote: 'We ordered PU stone and custom blinds through DPH. The finishing and look are absolutely stunning!',
    clientName: 'Sunil Verma'
  }
];

interface PrecisionSlide {
  image: string;
  area: string;
  sqft: string;
  title: string;
  subtitle: string;
  desc: string;
  location: string;
  priceNote: string;
}

const PRECISION_SLIDES: PrecisionSlide[] = [
  {
    image: IMAGES.luxuryLiving,
    area: '350 M²',
    sqft: '3,800 SQ. FT.',
    title: 'TV Unit - Photo Panel & UV Marble Sheet',
    subtitle: 'DPH – Deoghar Panel Hub',
    desc: 'Premium Panels for Premium Spaces (Best Quality, Best Price). High-gloss UV marble sheets combined with illuminated photo panels and custom floating cabinetry.',
    location: 'Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar',
    priceNote: 'Best Price Guarantee'
  },
  {
    image: IMAGES.luxuryKitchen,
    area: '160 M²',
    sqft: '1,720 SQ. FT.',
    title: 'PVC Ceiling & Wall Design Panels',
    subtitle: 'Style Your Space, Define Your Lifestyle',
    desc: 'Moisture-resistant, durable PVC ceilings engineered with 2700K ambient LED coves and precision interlocking joints for timeless interiors.',
    location: 'Near New Nagar Nigam, Jalshar Road, Deoghar',
    priceNote: 'Best Price Guarantee'
  },
  {
    image: IMAGES.luxuryBedroom,
    area: '240 M²',
    sqft: '2,580 SQ. FT.',
    title: 'Fluted Panel & WPC Master Bedchamber',
    subtitle: 'Urban Axis Design & DPH',
    desc: 'Acoustic fluted wall cladding integrated with warm indirect illumination and termite-proof WPC composite profiles for 5-star comfort.',
    location: 'Castairs Town, Deoghar',
    priceNote: 'Best Price Guarantee'
  },
  {
    image: IMAGES.luxuryOffice,
    area: '420 M²',
    sqft: '4,520 SQ. FT.',
    title: 'House Plan, Elevation & 3D Visualization',
    subtitle: 'Building Dreams, Designing Spaces',
    desc: 'Turnkey architecture and construction solutions: house plans, 3D elevations, construction guidance, site supervision, and turnkey execution.',
    location: 'Mahavir Akhada, Deoghar, Jharkhand 814112',
    priceNote: 'Turnkey Architectural Solutions'
  }
];

// Point-wise page buttons (not numbered, not gallery)
const POINT_WISE_PAGES = [
  { id: 'contact', label: '• Contact Us (Deoghar)', action: 'contact' },
  { id: 'consultation', label: '• Book Design Consultation', action: 'consultation' },
  { id: 'calculator', label: '• Turnkey Budget Estimator', action: 'calculator' },
  { id: 'tv-units', label: '• TV Units (UV Marble + Photo Panel)', action: 'tv-units' },
  { id: 'pvc-panels', label: '• PVC, Fluted & WPC Panels', action: 'pvc-panels' },
  { id: 'ceilings', label: '• PVC Ceiling & Walls', action: 'ceilings' },
  { id: 'mosaic-walls', label: '• Mosaic & Moulding Bit', action: 'mosaic-walls' },
  { id: 'on-order', label: '• 3D Panels & PU Stone (On Order)', action: 'on-order' },
  { id: 'house-plans', label: '• House Plans & 3D Elevation', action: 'house-plans' },
  { id: 'studio', label: '• Mahavir Akhada Hub Location', action: 'studio' }
];

// Realistic initial engagement counts for rooms
const INITIAL_ROOM_LIKES: Record<string, number> = {
  'tv-unit': 48,
  'pvc-ceiling': 42,
  'fluted-bedroom': 57,
  'mosaic-wall': 39,
  'house-plan-elevation': 64,
  'renovation-remodeling': 51,
  'on-order-decor': 33
};

/* =============================================================================
   HEART / LIKE ENGAGEMENT BUTTON COMPONENT
   ============================================================================= */
function HeartLikeButton({
  roomId,
  isLiked,
  likeCount,
  isAnimating,
  onToggle,
  size = 'md',
  showCount = true
}: {
  roomId: string;
  isLiked: boolean;
  likeCount: number;
  isAnimating: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer select-none border group/heart active:scale-90 ${
        isLiked
          ? 'bg-rose-950/75 border-rose-500/50 text-rose-400 hover:bg-rose-900/80 shadow-[0_0_14px_rgba(244,63,94,0.35)]'
          : 'bg-black/75 border-white/20 text-neutral-300 hover:text-rose-400 hover:border-rose-400/50 hover:bg-black/90 shadow-md'
      } ${size === 'sm' ? 'text-[11px] py-1 px-2' : 'text-xs'}`}
      title={isLiked ? 'Unlike room' : 'Like room'}
      aria-label={`${likeCount} likes for this room`}
    >
      {/* Floating subtle +1 / -1 particle on click */}
      {isAnimating && (
        <span className="absolute -top-3 left-1/2 pointer-events-none text-[11px] font-extrabold text-rose-400 animate-like-float flex items-center gap-0.5">
          <span>{isLiked ? '+1' : '-1'}</span>
        </span>
      )}

      <Heart
        className={`${
          size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
        } transition-transform duration-300 ${
          isAnimating ? 'animate-heart-pop' : 'group-hover/heart:scale-115'
        } ${isLiked ? 'fill-rose-500 text-rose-500' : 'fill-transparent'}`}
      />

      {showCount && (
        <span
          className={`font-mono font-bold text-[11px] tabular-nums transition-colors ${
            isLiked ? 'text-rose-200' : 'text-neutral-300 group-hover/heart:text-white'
          }`}
        >
          {likeCount}
        </span>
      )}
    </button>
  );
}

/* =============================================================================
   REAL VIDEO TRANSITION CARD COMPONENT (Plays continuous HTML5 Video)
   ============================================================================= */
function RealVideoTransitionCard({
  item,
  onOpenVideo,
  isLiked,
  likeCount,
  isAnimating,
  onToggleLike
}: {
  item: TransitionRoom;
  onOpenVideo: (room: TransitionRoom) => void;
  isLiked: boolean;
  likeCount: number;
  isAnimating: boolean;
  onToggleLike: (e: React.MouseEvent) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const instantPlay = () => {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    instantPlay();
    video.addEventListener('loadeddata', instantPlay, { once: true });
    video.addEventListener('canplay', instantPlay, { once: true });
    video.addEventListener('canplaythrough', instantPlay, { once: true });

    return () => {
      video.removeEventListener('loadeddata', instantPlay);
      video.removeEventListener('canplay', instantPlay);
      video.removeEventListener('canplaythrough', instantPlay);
    };
  }, [item.videoUrl]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={() => onOpenVideo(item)}
      className="group relative rounded-2xl overflow-hidden bg-neutral-950/80 backdrop-blur-md border border-white/15 hover:border-[#C5A880] transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between hover:-translate-y-1"
    >
      {/* Video Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden select-none bg-black">
        <video
          ref={videoRef}
          key={item.videoUrl}
          src={item.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          onCanPlay={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Live Running Badge */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Transition Video Running</span>
        </div>

        {/* Top Right Controls: Like / Heart engagement + Play/Pause */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <HeartLikeButton
            roomId={item.id}
            isLiked={isLiked}
            likeCount={likeCount}
            isAnimating={isAnimating}
            onToggle={onToggleLike}
            size="sm"
          />
          <button
            type="button"
            onClick={togglePlay}
            className="p-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-[#C5A880] transition-colors shadow-md"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-[#C5A880] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Open Full Transition Video</span>
          </div>
        </div>
      </div>

      {/* Meta Specs & Starting Price */}
      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
            {item.category}
          </span>
          <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
            {item.startingPrice}
          </span>
        </div>
        <h3 className="text-base font-bold font-playfair text-white group-hover:text-[#C5A880] transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-neutral-400 line-clamp-2 font-light">
          {item.tagline} &bull; {item.afterDesc}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   MAIN APPLICATION (Zero Blank Page Architecture)
   ============================================================================= */
export default function App() {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isSlideFading, setIsSlideFading] = useState<boolean>(false);

  // Search Flow State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchingAnim, setIsSearchingAnim] = useState<boolean>(false);
  const [filteredRooms, setFilteredRooms] = useState<TransitionRoom[]>(TRANSITION_ROOMS);
  const [selectedRoomForGallery, setSelectedRoomForGallery] = useState<TransitionRoom>(TRANSITION_ROOMS[0]);
  const [activeGalleryPhotoIndex, setActiveGalleryPhotoIndex] = useState<number>(0);
  const [galleryDisplayMode, setGalleryDisplayMode] = useState<'photo' | 'video'>('photo');

  // Modals State
  const [transitionVideoRoom, setTransitionVideoRoom] = useState<TransitionRoom | null>(null);
  const [photoModalSrc, setPhotoModalSrc] = useState<string | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);

  // Ball Drag State for Home Oval Slider
  const [ballDragX, setBallDragX] = useState<number>(0);
  const [isDraggingBall, setIsDraggingBall] = useState<boolean>(false);
  const ballStartClientX = useRef<number>(0);

  // Booking Form State
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingArea, setBookingArea] = useState<string>('1800');
  const [bookingScope, setBookingScope] = useState<string>('Turnkey 3BHK Residence');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [calcSqFt, setCalcSqFt] = useState<number>(1850);
  const [calcPackage, setCalcPackage] = useState<'standard' | 'luxury'>('luxury');

  // Cinematic 3D Opening Effect on Home Page:
  // Phase 1: 'zoomin' - background photo shown clearly from zoomed-in perspective
  // Phase 2: 'zoomout' - background photo smoothly zooms out to standard scale while remaining clear
  // Phase 3: 'words' - overlays blend in and all typography / words smoothly move into place
  // Phase 4: 'ready' - effect cleanly quits, leaving website 100% interactive and silky smooth
  const [home3DPhase, setHome3DPhase] = useState<'zoomin' | 'zoomout' | 'words' | 'ready'>('zoomin');

  useEffect(() => {
    // Phase 1 -> 2: Begin smooth zoom-out of clear background photo
    const timerZoomOut = setTimeout(() => {
      setHome3DPhase('zoomout');
    }, 120);

    // Phase 2 -> 3: When zoom-out completes, words start moving into place
    const timerWords = setTimeout(() => {
      setHome3DPhase('words');
    }, 1400);

    // Phase 3 -> 4: 3D intro effect quits cleanly, web ready and smoother
    const timerReady = setTimeout(() => {
      setHome3DPhase('ready');
    }, 2700);

    return () => {
      clearTimeout(timerZoomOut);
      clearTimeout(timerWords);
      clearTimeout(timerReady);
    };
  }, []);

  const skip3DIntro = () => {
    setHome3DPhase('ready');
  };

  // User Engagement: Liked Rooms State with Persistence & Feedback
  const [likedRoomIds, setLikedRoomIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('urban_axis_liked_rooms');
      return saved ? new Set(JSON.parse(saved)) : new Set(['fluted-bedroom']);
    } catch {
      return new Set(['fluted-bedroom']);
    }
  });

  const [roomLikes, setRoomLikes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('urban_axis_room_likes');
      return saved ? JSON.parse(saved) : INITIAL_ROOM_LIKES;
    } catch {
      return INITIAL_ROOM_LIKES;
    }
  });

  const [animatingHeartId, setAnimatingHeartId] = useState<string | null>(null);

  const handleToggleLike = (roomId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    setAnimatingHeartId(roomId);
    setTimeout(() => {
      setAnimatingHeartId((curr) => (curr === roomId ? null : curr));
    }, 650);

    setLikedRoomIds((prev) => {
      const next = new Set(prev);
      const wasLiked = next.has(roomId);
      if (wasLiked) {
        next.delete(roomId);
        setRoomLikes((prevLikes) => {
          const updated = {
            ...prevLikes,
            [roomId]: Math.max((INITIAL_ROOM_LIKES[roomId] || 10) - 1, (prevLikes[roomId] || 10) - 1)
          };
          try {
            localStorage.setItem('urban_axis_room_likes', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      } else {
        next.add(roomId);
        setRoomLikes((prevLikes) => {
          const updated = {
            ...prevLikes,
            [roomId]: (prevLikes[roomId] || INITIAL_ROOM_LIKES[roomId] || 10) + 1
          };
          try {
            localStorage.setItem('urban_axis_room_likes', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
      try {
        localStorage.setItem('urban_axis_liked_rooms', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Navigate to Page: Always immediately resets scroll to top to prevent blank black screen bugs!
  const goToPage = (index: number) => {
    const clamped = Math.max(0, Math.min(PAGE_ROUTES.length - 1, index));
    setActivePageIndex(clamped);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const goToNextPage = () => {
    goToPage((activePageIndex + 1) % PAGE_ROUTES.length);
  };

  const goToPrevPage = () => {
    goToPage((activePageIndex - 1 + PAGE_ROUTES.length) % PAGE_ROUTES.length);
  };

  // Ball drag handlers for Home oval slider
  const handleBallTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDraggingBall(true);
    ballStartClientX.current = e.touches[0].clientX;
  };

  const handleBallTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingBall) return;
    e.stopPropagation();
    const delta = Math.max(0, Math.min(110, e.touches[0].clientX - ballStartClientX.current));
    setBallDragX(delta);
  };

  const handleBallTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingBall) return;
    e.stopPropagation();
    setIsDraggingBall(false);
    if (ballDragX > 40) {
      goToPage(1); // Swipe opens Discover page
    }
    setBallDragX(0);
  };

  const handleBallMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingBall(true);
    ballStartClientX.current = e.clientX;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = Math.max(0, Math.min(110, moveEvent.clientX - ballStartClientX.current));
      setBallDragX(delta);
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      setIsDraggingBall(false);
      const finalDelta = upEvent.clientX - ballStartClientX.current;
      if (finalDelta > 40) {
        goToPage(1);
      }
      setBallDragX(0);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Screen horizontal swipe gestures on Home page
  const screenTouchStartX = useRef<number>(0);
  const screenTouchStartY = useRef<number>(0);

  const handleScreenTouchStart = (e: React.TouchEvent) => {
    screenTouchStartX.current = e.touches[0].clientX;
    screenTouchStartY.current = e.touches[0].clientY;
  };

  const handleScreenTouchEnd = (e: React.TouchEvent) => {
    const deltaX = screenTouchStartX.current - e.changedTouches[0].clientX;
    const deltaY = screenTouchStartY.current - e.changedTouches[0].clientY;
    // Strict horizontal angle checking so vertical scrolling never triggers accidental page turns
    if (Math.abs(deltaX) > 75 && Math.abs(deltaX) > 2.2 * Math.abs(deltaY)) {
      if (deltaX > 0) {
        if (activePageIndex === 0) goToPage(1);
      } else {
        if (activePageIndex === 1) goToPage(0);
      }
    }
  };

  // Tap Search Button with smooth animation
  const handleTapSearchButton = () => {
    setIsSearchingAnim(true);
    setTimeout(() => {
      setIsSearchingAnim(false);
      goToPage(2); // Page 2: Search Console
    }, 320);
  };

  // Execute Search
  const handleExecuteSearch = (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFilteredRooms(TRANSITION_ROOMS);
    } else {
      const results = TRANSITION_ROOMS.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.tagline.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.afterDesc.toLowerCase().includes(q) ||
          r.specs.some((s) => s.toLowerCase().includes(q))
      );
      setFilteredRooms(results.length > 0 ? results : TRANSITION_ROOMS);
    }
    goToPage(3); // Page 3: Search Results
  };

  // Room Result ➔ Open Gallery
  const handleOpenRoomGallery = (room: TransitionRoom, defaultMode: 'photo' | 'video' = 'video') => {
    setSelectedRoomForGallery(room);
    setActiveGalleryPhotoIndex(0);
    setGalleryDisplayMode(defaultMode);
    goToPage(4); // Page 4: Room Gallery
  };

  // Open Transition Video Modal
  const handleOpenTransitionVideo = (room: TransitionRoom) => {
    setTransitionVideoRoom(room);
  };

  // Open Full Photo Modal
  const handleOpenPhotoModal = (photoUrl: string) => {
    setPhotoModalSrc(photoUrl);
  };

  // Point-wise page action handler
  const handlePointWiseAction = (action: string) => {
    if (action === 'contact') {
      goToPage(5);
    } else if (action === 'consultation') {
      setIsConsultationModalOpen(true);
    } else if (action === 'calculator') {
      setIsCalculatorModalOpen(true);
    } else if (action === 'tv-units') {
      handleExecuteSearch('TV Unit');
    } else if (action === 'pvc-panels') {
      handleExecuteSearch('Fluted Panel');
    } else if (action === 'ceilings') {
      handleExecuteSearch('PVC Ceiling');
    } else if (action === 'mosaic-walls') {
      handleExecuteSearch('Mosaic');
    } else if (action === 'on-order') {
      handleExecuteSearch('PU Stone');
    } else if (action === 'house-plans') {
      handleExecuteSearch('House Plan');
    } else if (action === 'studio') {
      goToPage(5);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      const msg = encodeURIComponent(
        `Hello Urban Axis Design & Deoghar Panel Hub,\nMy Name: ${bookingName || 'Client'}\nPhone: ${bookingPhone || '+91 9304311336'}\nRequirement: ${bookingScope} (${bookingArea} sq.ft)\nI would like to schedule an interior / architectural consultation at your Mahavir Akhada, Deoghar studio.`
      );
      window.open(`https://wa.me/919304311336?text=${msg}`, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  const changeSlide = (newIndex: number) => {
    setIsSlideFading(true);
    setTimeout(() => {
      setCurrentSlideIndex(newIndex);
      setIsSlideFading(false);
    }, 200);
  };

  const nextSlide = () => {
    const next = (currentSlideIndex + 1) % PRECISION_SLIDES.length;
    changeSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlideIndex - 1 + PRECISION_SLIDES.length) % PRECISION_SLIDES.length;
    changeSlide(prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && activePageIndex === 0) {
        goToPage(1);
      } else if (e.key === 'ArrowLeft' && activePageIndex === 1) {
        goToPage(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePageIndex]);

  return (
    <div
      className="min-h-screen bg-[#0B0B0B] text-[#E8E6E3] font-inter flex flex-col justify-between selection:bg-[#C5A880]/30 selection:text-[#F3F2EE] overflow-x-hidden relative"
      onTouchStart={handleScreenTouchStart}
      onTouchEnd={handleScreenTouchEnd}
    >
      {/* =======================================================================
          TOP BAR WITH ALL PAGE NAMES AND BALL IS REMOVED
          ======================================================================= */}

      {/* =======================================================================
          PRIMARY CONTENT AREA (CLEAN ACTIVE PAGE RENDERING - NO BLANK PAGES)
          ======================================================================= */}
      <main className="w-full flex-1">
        {/* =====================================================================
            PAGE 0: HOME PAGE
            ===================================================================== */}
        {activePageIndex === 0 && (
          <div
            onClick={home3DPhase !== 'ready' ? skip3DIntro : undefined}
            className="w-full animate-page-smooth min-h-screen flex flex-col justify-between"
          >
            {/* FULLSCREEN IMMERSIVE ARCHITECTURAL HERO WITH 3D DEPTH PERSPECTIVE */}
            <div className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-16 select-none border-b border-white/[0.08] perspective-[1400px]">
              {/* Background Engine with 3D Depth Zoom-In to Zoom-Out */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={PRECISION_SLIDES[currentSlideIndex].image}
                  alt={PRECISION_SLIDES[currentSlideIndex].title}
                  style={{
                    transform:
                      home3DPhase === 'zoomin'
                        ? 'scale(1.42) translateZ(60px)'
                        : home3DPhase === 'zoomout'
                        ? 'scale(1.02) translateZ(0px)'
                        : 'scale(1) translateZ(0px)',
                    transition:
                      home3DPhase === 'ready'
                        ? 'opacity 0.5s ease'
                        : 'transform 1.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease'
                  }}
                  className={`w-full h-full object-cover will-change-transform ${
                    isSlideFading ? 'opacity-30' : 'opacity-100'
                  }`}
                />
                {/* Background Overlays: Hidden during initial zoomin/zoomout so photo is clearly visible, then smoothly fades in as words start moving */}
                <div
                  style={{
                    opacity:
                      home3DPhase === 'zoomin'
                        ? 0.05
                        : home3DPhase === 'zoomout'
                        ? 0.3
                        : 1,
                    transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/20 to-neutral-950/45" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/55" />
                </div>
              </div>

              {/* During 3D Intro, subtle indicator */}
              {home3DPhase !== 'ready' && (
                <div className="absolute top-4 left-6 z-30 pointer-events-none flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A880]/30 animate-pulse">
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>3D Architectural View &bull; Loading Space</span>
                </div>
              )}

              {/* TOP ACTION ROW: SHORTER OVAL BOX WITH 3D BALL + "Swipe now for more results !" ON TOP */}
              <div
                style={{
                  transform:
                    home3DPhase === 'zoomin' || home3DPhase === 'zoomout'
                      ? 'translateY(-28px)'
                      : 'translateY(0)',
                  opacity:
                    home3DPhase === 'zoomin' || home3DPhase === 'zoomout' ? 0 : 1,
                  transition:
                    home3DPhase === 'ready'
                      ? 'none'
                      : 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                }}
                className="relative z-10 w-full flex justify-end items-center"
              >
                <div className="flex flex-col items-end">
                  {/* WRITTEN "Swipe now for more results !" ON THE UP OF THE SWIPE BOX */}
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#C5A880] mb-1.5 flex items-center justify-end gap-1.5 select-none drop-shadow-md">
                    <span>Swipe now for more results !</span>
                    <ArrowRight className="w-3.5 h-3.5 animate-pulse text-[#C5A880]" />
                  </div>

                  {/* SHORTER OVAL BOX WITH 3D SPHERE (NO WRITTEN TEXT INSIDE) */}
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => goToPage(1)}
                      onTouchStart={handleBallTouchStart}
                      onTouchMove={handleBallTouchMove}
                      onTouchEnd={handleBallTouchEnd}
                      onMouseDown={handleBallMouseDown}
                      className="relative w-48 sm:w-56 h-12 sm:h-13 rounded-full border border-white/25 bg-neutral-950/85 backdrop-blur-xl p-1.5 flex items-center overflow-hidden cursor-pointer select-none group shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#C5A880]/70 transition-all"
                      title="Swipe or drag 3D ball for more results"
                    >
                      {/* The 3D Animated Sphere moving smoothly left and right (No text inside) */}
                      <div
                        className={`w-9 sm:w-10 h-9 sm:h-10 rounded-full sphere-3d flex items-center justify-center shrink-0 z-10 transition-transform ${
                          isDraggingBall ? '' : 'animate-sphere-glider-short'
                        }`}
                        style={isDraggingBall ? { transform: `translateX(${ballDragX}px)` } : undefined}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-white/80 blur-[1px]"></div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsConsultationModalOpen(true)}
                      className="hidden sm:inline-block px-4 py-2.5 border border-white/20 bg-neutral-950/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                    >
                      ₹1,500
                    </button>
                  </div>
                </div>
              </div>

              {/* MIDDLE OVERSIZE HERO TEXT GRID (ALL WORDS START MOVING SMOOTHLY ON ZOOM OUT) */}
              <div
                style={{
                  transform:
                    home3DPhase === 'zoomin' || home3DPhase === 'zoomout'
                      ? 'translateY(40px) scale(0.97)'
                      : 'translateY(0) scale(1)',
                  opacity:
                    home3DPhase === 'zoomin' || home3DPhase === 'zoomout' ? 0 : 1,
                  transition:
                    home3DPhase === 'ready'
                      ? 'none'
                      : 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="relative z-10 w-full max-w-5xl my-auto py-8 lg:py-12"
              >
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">
                  Interiors | Architecture | Construction &bull; Deoghar
                </span>
                <h1 className="font-condensed text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] tracking-tighter max-w-4xl text-white">
                  BUILDING DREAMS,<br />
                  DESIGNING<br />
                  <span className="text-[#C5A880]">SPACES</span>
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-neutral-300 max-w-xl font-light tracking-wide leading-relaxed">
                  Urban Axis Design &amp; DPH – Deoghar Panel Hub: Style Your Space, Define Your Lifestyle. Premium panels for premium spaces with guaranteed best quality and best price.
                </p>

                {/* ===================================================================
                    REQUESTED: VIDEO ON HOME PAGE ON JUST DOWN OF THE WRITTEN WORDS OF FIRST
                    (STARTS AUTOMATICALLY & FASTER WITHOUT TOUCHING)
                    =================================================================== */}
                <div className="mt-6 max-w-2xl rounded-2xl overflow-hidden border border-[#C5A880]/60 bg-neutral-950/95 shadow-[0_15px_45px_rgba(0,0,0,0.85)]">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <video
                      src="/videos/hero_transition.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      ref={(el) => {
                        if (el) {
                          el.muted = true;
                          el.defaultMuted = true;
                          el.playsInline = true;
                          el.play().catch(() => {});
                        }
                      }}
                      onLoadedMetadata={(e) => {
                        e.currentTarget.muted = true;
                        e.currentTarget.play().catch(() => {});
                      }}
                      onCanPlay={(e) => {
                        e.currentTarget.muted = true;
                        e.currentTarget.play().catch(() => {});
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A880]/70 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Transition Video &bull; Empty Room ➔ Designer Suite</span>
                    </div>
                    <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#C5A880]">
                      Deoghar Suite
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-white/10">
                    <div>
                      <span className="text-white font-semibold block">Live Transition Streaming</span>
                      <span className="text-stone-400 text-[11px]">Raw room transformed with UV marble sheets, PVC ceilings &amp; fluted panels</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenRoomGallery(TRANSITION_ROOMS[0])}
                      className="px-4 py-2 rounded-full bg-[#C5A880] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <span>Explore Room Gallery &amp; All Videos &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* BOTTOM CONTROL MODULES ROW */}
              <div
                style={{
                  transform:
                    home3DPhase === 'zoomin' || home3DPhase === 'zoomout'
                      ? 'translateY(32px)'
                      : 'translateY(0)',
                  opacity:
                    home3DPhase === 'zoomin' || home3DPhase === 'zoomout' ? 0 : 1,
                  transition:
                    home3DPhase === 'ready'
                      ? 'none'
                      : 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
                className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 pt-4"
              >
                {/* Data Spec Box */}
                <div className="w-full md:w-[380px] bg-neutral-950/95 border border-neutral-800 p-6 rounded-lg backdrop-blur-lg flex flex-col justify-between gap-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-medium">
                          House Area:
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-mono">
                          {PRECISION_SLIDES[currentSlideIndex].priceNote}
                        </span>
                      </div>
                      <div
                        className={`text-3xl font-bold font-mono tracking-tight fade-transition text-white ${
                          isSlideFading ? 'opacity-30' : 'opacity-100'
                        }`}
                      >
                        {PRECISION_SLIDES[currentSlideIndex].area}
                        <span className="text-xs text-neutral-400 font-sans ml-2">
                          ({PRECISION_SLIDES[currentSlideIndex].sqft})
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-xs uppercase tracking-wider text-neutral-200 font-medium fade-transition ${
                        isSlideFading ? 'opacity-30' : 'opacity-100'
                      }`}
                    >
                      {PRECISION_SLIDES[currentSlideIndex].title}
                    </div>
                    <div className="text-[11px] text-[#C5A880] font-mono">
                      {PRECISION_SLIDES[currentSlideIndex].location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-900 pt-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-white hover:text-neutral-950 text-white transition-all duration-300 cursor-pointer"
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-white hover:text-neutral-950 text-white transition-all duration-300 cursor-pointer"
                      >
                        &gt;
                      </button>
                    </div>

                    <span className="text-[11px] font-mono tracking-widest text-neutral-400">
                      0{currentSlideIndex + 1} / 0{PRECISION_SLIDES.length}
                    </span>
                  </div>
                </div>

                {/* Right narrative */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 max-w-lg text-right md:text-left self-stretch justify-end">
                  <p
                    className={`text-neutral-300 text-xs font-light leading-relaxed hidden md:block max-w-xs fade-transition ${
                      isSlideFading ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    {PRECISION_SLIDES[currentSlideIndex].desc}
                  </p>

                  <div className="flex gap-2 items-center shrink-0">
                    {PRECISION_SLIDES.map((slide, idx) => (
                      <div
                        key={idx}
                        onClick={() => changeSlide(idx)}
                        className={`w-12 h-12 rounded overflow-hidden cursor-pointer transition-all duration-300 ${
                          currentSlideIndex === idx
                            ? 'border-2 border-white opacity-100 scale-105 shadow-lg'
                            : 'border border-transparent opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STUDIO METRICS STRIP */}
            <div className="border-b border-white/[0.08] bg-neutral-950/70 backdrop-blur-md py-8">
              <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <span className="block text-2xl sm:text-3xl font-playfair font-bold text-[#C5A880]">10+</span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Premium Materials</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-playfair font-bold text-[#C5A880]">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Best Price Guarantee</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-playfair font-bold text-[#C5A880]">4.9★</span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Deoghar Verified Reviews</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-playfair font-bold text-[#C5A880]">Turnkey</span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">Architecture &amp; Panels</span>
                </div>
              </div>
            </div>

            {/* QUICK LINK TO DISCOVER PAGE */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">Continuous Flow</span>
                <h4 className="text-lg font-playfair text-white mt-0.5">Explore Live Transition Videos &amp; Search Rooms</h4>
              </div>
              <button
                type="button"
                onClick={() => handleOpenRoomGallery(TRANSITION_ROOMS[0])}
                className="px-6 py-3 rounded-full bg-[#C5A880] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Explore Room Gallery &amp; All Videos &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            PAGE 1: DISCOVER PAGE (SEARCH BUTTON ON TOP AND ON BOTTOM + VIDEOS)
            ===================================================================== */}
        {activePageIndex === 1 && (
          <div className="w-full animate-page-smooth min-h-screen py-10 lg:py-14 relative">
            {/* SECTION BACKGROUND ENGINE (PERFECT FULL-BLEED ARCHITECTURAL DESIGN STUDIOS) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
              <img
                src={IMAGES.heroModern}
                alt="Architectural Design Studios"
                className="w-full h-full object-cover animate-subtle-breathe opacity-90 sm:opacity-95 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/20 to-neutral-950/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/55" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 space-y-8">
              {/* TOP NAVIGATION: ONLY BACK BUTTON IN ANIMATED BOX (ALL OTHER WRITTEN TEXT REMOVED) */}
              <div className="w-full flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => goToPage(0)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/20 hover:border-[#C5A880] text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-2.5 shadow-lg active:scale-90 transition-all cursor-pointer group"
                  title="Back to Home"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-black group-hover:-translate-x-0.5 transition-all" />
                  </div>
                  <span>Back to Home</span>
                </button>
              </div>

              {/* ===============================================================
                  REQUESTED: SEARCH BUTTON ON TOP
                  =============================================================== */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={handleTapSearchButton}
                  className={`w-full relative group rounded-2xl bg-neutral-900/95 border-2 border-white/20 hover:border-[#C5A880] p-5 sm:p-6 flex items-center justify-between text-left transition-all duration-300 shadow-xl cursor-pointer ${
                    isSearchingAnim ? 'scale-105 border-[#C5A880] bg-[#C5A880]/15' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] group-hover:scale-110 transition-transform shrink-0 shadow-md">
                      <Search className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors">
                        Search Luxury Rooms, Kitchens &amp; Turnkey Suites
                      </span>
                      <span className="text-xs text-neutral-400">
                        Tap to open architectural search &bull; Filter by materials, pricing, and room types
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-neutral-200 group-hover:bg-[#C5A880] group-hover:text-black transition-all shrink-0">
                    <span>Open Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

              {/* POINT-WISE BUTTONS OF PAGES (CLEAN LUXURY BUTTONS - NO GLOWING SEQUENCE) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                    <span>Quick Studio Navigation &bull; Instant Access</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline-block">
                    Direct Touch Controls
                  </span>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
                  {POINT_WISE_PAGES.map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => handlePointWiseAction(btn.action)}
                      className="px-4 py-2.5 rounded-xl sm:rounded-full bg-neutral-900/90 hover:bg-[#C5A880]/20 border border-white/20 hover:border-[#C5A880] text-xs sm:text-xs font-semibold text-neutral-100 hover:text-white transition-all duration-200 flex items-center gap-2.5 group shadow-md cursor-pointer active:scale-95"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#C5A880] group-hover:scale-125 transition-transform shrink-0" />
                      <span className="truncate">{btn.label.replace(/^•\s*/, '')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ===============================================================
                  REQUESTED: MANY TRANSITION VIDEOS (ACTUAL RUNNING MP4 VIDEOS)
                  =============================================================== */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Transition Video Streams</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                      Empty Concrete Space ➔ Haute Turnkey Suites
                    </h2>
                    <p className="text-xs text-stone-400 mt-1 font-light">
                      Continuous architectural transition videos across all studio services. Tap any video to inspect the transformation.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenRoomGallery(TRANSITION_ROOMS[0])}
                    className="px-4 py-2 rounded-full bg-[#C5A880]/15 border border-[#C5A880] text-xs font-bold text-[#C5A880] hover:bg-[#C5A880] hover:text-black flex items-center gap-1.5 self-start sm:self-auto shrink-0 cursor-pointer transition-all shadow-md"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Explore Room Gallery &amp; All Videos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Grid of Real Video Transition Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {TRANSITION_ROOMS.map((room) => (
                    <RealVideoTransitionCard
                      key={room.id}
                      item={room}
                      onOpenVideo={handleOpenRoomGallery}
                      isLiked={likedRoomIds.has(room.id)}
                      likeCount={roomLikes[room.id] ?? INITIAL_ROOM_LIKES[room.id] ?? 40}
                      isAnimating={animatingHeartId === room.id}
                      onToggleLike={(e) => handleToggleLike(room.id, e)}
                    />
                  ))}
                </div>
              </div>

              {/* ===============================================================
                  REQUESTED: SEARCH BUTTON ON BOTTOM (EXACTLY AS SPECIFIED)
                  =============================================================== */}
              <div className="w-full pt-8 pb-4 border-t border-white/[0.08]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
                  Ready to search architectural suites?
                </span>
                <button
                  type="button"
                  onClick={handleTapSearchButton}
                  className={`w-full relative group rounded-2xl bg-neutral-900/95 border-2 border-white/20 hover:border-[#C5A880] p-5 sm:p-6 flex items-center justify-between text-left transition-all duration-300 shadow-xl cursor-pointer ${
                    isSearchingAnim ? 'scale-105 border-[#C5A880] bg-[#C5A880]/15' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] group-hover:scale-110 transition-transform shrink-0 shadow-md">
                      <Search className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors">
                        Search Panels, TV Units, Ceilings &amp; Architectural Solutions
                      </span>
                      <span className="text-xs text-neutral-400">
                        Explore PVC, fluted &amp; WPC panels, UV marble sheets, mosaic, house plans &amp; turnkey interior execution
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A880] text-black text-xs font-extrabold uppercase tracking-wider group-hover:bg-white transition-all shrink-0">
                    <span>Search Spaces</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PAGE 2: SEARCH INPUT PAGE (DEDICATED SEARCH CONSOLE)
            ===================================================================== */}
        {activePageIndex === 2 && (
          <div className="w-full animate-page-smooth min-h-screen py-12 lg:py-16 relative">
            {/* SECTION BACKGROUND ENGINE (PERFECT FULL-BLEED ARCHITECTURAL INTERIOR) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
              <img
                src={IMAGES.luxuryKitchen}
                alt="Architectural Luxury Interior"
                className="w-full h-full object-cover animate-subtle-breathe opacity-90 sm:opacity-95 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/20 to-neutral-950/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/55" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 space-y-10">
              {/* TOP NAVIGATION: ONLY BACK BUTTON IN ANIMATED BOX */}
              <div className="w-full flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => goToPage(1)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/20 hover:border-[#C5A880] text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-2.5 shadow-lg active:scale-90 transition-all cursor-pointer group"
                  title="Back to Discover & Videos"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-black group-hover:-translate-x-0.5 transition-all" />
                  </div>
                  <span>Back to Discover &amp; Videos</span>
                </button>
              </div>

              {/* Search Header */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
                  Studio Directory Search
                </span>
                <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                  Find Your Ideal Interior Panel or Architectural Service
                </h2>
                <p className="mt-2 text-sm text-neutral-400 font-light">
                  Search PVC panels, fluted panels, WPC, UV marble sheets, mosaic, TV units, PVC ceilings, wall design panels, house plans, 3D elevation, or Deoghar location.
                </p>
              </div>

              {/* Search Bar Input Container */}
              <div className="space-y-4">
                <div className="relative rounded-2xl animate-search-pulse">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleExecuteSearch(searchQuery);
                    }}
                    autoFocus
                    placeholder="e.g. UV marble TV unit, PVC ceiling, fluted panel, mosaic wall, house plan, Mahavir Akhada..."
                    className="w-full h-16 sm:h-20 pl-14 pr-36 rounded-2xl bg-neutral-950/95 border-2 border-white/20 focus:border-[#C5A880] text-base sm:text-lg text-white placeholder-neutral-500 outline-none transition-all shadow-2xl"
                  />
                  <Search className="w-6 h-6 text-[#C5A880] absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

                  <button
                    type="button"
                    onClick={() => handleExecuteSearch(searchQuery)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-3 rounded-xl bg-[#C5A880] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Popular Query Chips */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Popular Architectural Queries
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'TV Unit (Photo Panel + UV Marble)',
                      'PVC Ceiling & Wall Panels',
                      'Fluted & WPC Panels',
                      'Mosaic Wall with Moulding Bit',
                      'House Plan & 3D Elevation',
                      '3D Panels & PU Stone (On Order)',
                      'Wallpaper & Blinds (On Order)',
                      'Turnkey Renovation & Remodeling',
                      'Deoghar Panel Hub (DPH)'
                    ].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => {
                          setSearchQuery(chip);
                          handleExecuteSearch(chip);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880] text-xs text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>🔍</span>
                        <span>{chip}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Preview Transition Video Highlights */}
              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                  Live Video Highlights
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {TRANSITION_ROOMS.slice(0, 3).map((room) => (
                    <div
                      key={room.id}
                      onClick={() => handleOpenRoomGallery(room)}
                      className="p-3 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-[#C5A880] cursor-pointer transition-all group"
                    >
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-black mb-2">
                        <video
                          src={room.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          ref={(el) => {
                            if (el) {
                              el.muted = true;
                              el.defaultMuted = true;
                              el.playsInline = true;
                              el.play().catch(() => {});
                            }
                          }}
                          onLoadedMetadata={(e) => {
                            e.currentTarget.muted = true;
                            e.currentTarget.play().catch(() => {});
                          }}
                          onCanPlay={(e) => {
                            e.currentTarget.muted = true;
                            e.currentTarget.play().catch(() => {});
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="block text-xs font-bold text-white group-hover:text-[#C5A880] truncate">
                        {room.title}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {room.startingPrice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PAGE 3: SEARCH RESULTS PAGE (OPENED WHEN SEARCHED)
            ===================================================================== */}
        {activePageIndex === 3 && (
          <div className="w-full animate-page-smooth min-h-screen py-10 lg:py-14 relative">
            {/* SECTION BACKGROUND ENGINE (PERFECT FULL-BLEED LUXURY FINISHED SUITES) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
              <img
                src={IMAGES.luxuryLiving}
                alt="Luxury Turnkey Residences"
                className="w-full h-full object-cover animate-subtle-breathe opacity-90 sm:opacity-95 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/20 to-neutral-950/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/55" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 space-y-8">
              {/* TOP NAVIGATION: ONLY BACK BUTTON IN ANIMATED BOX */}
              <div className="w-full flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => goToPage(2)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/20 hover:border-[#C5A880] text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-2.5 shadow-lg active:scale-90 transition-all cursor-pointer group"
                  title="Back to Search"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-black group-hover:-translate-x-0.5 transition-all" />
                  </div>
                  <span>Back to Search</span>
                </button>

                <div className="px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 text-xs text-[#C5A880] font-mono">
                  {filteredRooms.length} Match{filteredRooms.length === 1 ? '' : 'es'}
                </div>
              </div>

              {/* Search Button on Top of Results as well */}
              <button
                type="button"
                onClick={() => goToPage(2)}
                className="w-full p-4 rounded-xl bg-neutral-900 border border-white/10 hover:border-[#C5A880] text-xs text-neutral-300 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#C5A880]" />
                  <span>{searchQuery ? `Searching: "${searchQuery}"` : 'Tap to modify search query...'}</span>
                </div>
                <span className="text-[#C5A880] font-bold uppercase tracking-wider">Change Search &rarr;</span>
              </button>

              {/* Results Title */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
                  Search Results
                </span>
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white mt-1">
                  {searchQuery ? `Spaces Matching "${searchQuery}"` : 'All Architectural Rooms &amp; Suites'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  Tap on any room card below to open its dedicated architectural photo gallery.
                </p>
              </div>

              {/* Room Results Grid (Each card has video preview) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleOpenRoomGallery(room)}
                    className="group rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/15 hover:border-[#C5A880] p-5 flex flex-col justify-between transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      {/* Visual Video Preview */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black">
                        <video
                          src={room.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          ref={(el) => {
                            if (el) {
                              el.muted = true;
                              el.defaultMuted = true;
                              el.playsInline = true;
                              el.play().catch(() => {});
                            }
                          }}
                          onLoadedMetadata={(e) => {
                            e.currentTarget.muted = true;
                            e.currentTarget.play().catch(() => {});
                          }}
                          onCanPlay={(e) => {
                            e.currentTarget.muted = true;
                            e.currentTarget.play().catch(() => {});
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                          <HeartLikeButton
                            roomId={room.id}
                            isLiked={likedRoomIds.has(room.id)}
                            likeCount={roomLikes[room.id] ?? INITIAL_ROOM_LIKES[room.id] ?? 40}
                            isAnimating={animatingHeartId === room.id}
                            onToggle={(e) => handleToggleLike(room.id, e)}
                            size="sm"
                          />
                        </div>

                        <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A880]/50 text-[11px] font-bold text-[#C5A880]">
                          {room.startingPrice}
                        </div>

                        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-medium text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{room.area}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                          {room.category} &bull; {room.location}
                        </span>
                        <h3 className="text-lg font-bold font-playfair text-white mt-1 group-hover:text-[#C5A880] transition-colors">
                          {room.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2 font-light">
                          {room.afterDesc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="text-stone-400">Tap to open gallery</span>
                      <div className="flex items-center gap-1 text-[#C5A880] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        <span>View Gallery</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Search Button on Results Page */}
              <div className="pt-6 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => goToPage(2)}
                  className="w-full py-4 rounded-xl bg-neutral-900 border border-white/20 hover:border-[#C5A880] text-xs font-bold uppercase tracking-wider text-white hover:text-[#C5A880] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <Search className="w-4 h-4 text-[#C5A880]" />
                  <span>Search More Rooms &amp; Packages</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PAGE 4: GALLERY PAGE (OPENED WHEN ROOM RESULT IS TAPPED)
            ===================================================================== */}
        {activePageIndex === 4 && (
          <div className="w-full animate-page-smooth min-h-screen py-10 lg:py-14 relative">
            {/* SECTION BACKGROUND ENGINE (PERFECT FULL-BLEED ROOM-SPECIFIC ARCHITECTURE) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
              <img
                src={selectedRoomForGallery.afterImg || IMAGES.luxuryLiving}
                alt={selectedRoomForGallery.title}
                className="w-full h-full object-cover animate-subtle-breathe opacity-90 sm:opacity-95 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/20 to-neutral-950/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/55" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 space-y-8">
              {/* TOP NAVIGATION: BACK BUTTON IN ANIMATED BOX */}
              <div className="w-full flex items-center justify-between flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goToPage(1)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/20 hover:border-[#C5A880] text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-2.5 shadow-lg active:scale-90 transition-all cursor-pointer group"
                  title="Back to All Rooms & Videos"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-black group-hover:-translate-x-0.5 transition-all" />
                  </div>
                  <span>Back to Rooms &amp; Videos</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(0)}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 hover:border-[#C5A880] text-[11px] font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage(2)}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900/70 border border-white/10 hover:border-[#C5A880] text-[11px] font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* ROOM SWITCHER STRIP: Quick selector for all room suites */}
              <div className="w-full space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
                  Select Room To View Images &amp; Transition Video:
                </span>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {TRANSITION_ROOMS.map((room) => {
                    const isSelected = selectedRoomForGallery.id === room.id;
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => {
                          setSelectedRoomForGallery(room);
                          setActiveGalleryPhotoIndex(0);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-md ${
                          isSelected
                            ? 'bg-[#C5A880] text-black ring-2 ring-white/40'
                            : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/15'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-black' : 'bg-emerald-400 animate-pulse'}`} />
                        <span>{room.title.split('(')[0].trim()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Room Title & Specs with Engagement Heart */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
                    Architectural Room Gallery &bull; {selectedRoomForGallery.location}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mt-1">
                    {selectedRoomForGallery.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light max-w-2xl">
                    {selectedRoomForGallery.tagline} &bull; {selectedRoomForGallery.area} &bull; {selectedRoomForGallery.startingPrice}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <HeartLikeButton
                    roomId={selectedRoomForGallery.id}
                    isLiked={likedRoomIds.has(selectedRoomForGallery.id)}
                    likeCount={roomLikes[selectedRoomForGallery.id] ?? INITIAL_ROOM_LIKES[selectedRoomForGallery.id] ?? 40}
                    isAnimating={animatingHeartId === selectedRoomForGallery.id}
                    onToggle={(e) => handleToggleLike(selectedRoomForGallery.id, e)}
                    size="md"
                  />
                </div>
              </div>

              {/* MAIN MEDIA DISPLAY (100% FULL ASPECT VIDEO / PHOTO - NO CROPPING / NO THIN LINE) */}
              <div className="space-y-5">
                {/* 1. Unobstructed Full View Media Container (Zero Overlay Covering the View) */}
                <div className="relative aspect-16-9-box w-full rounded-2xl overflow-hidden bg-black border border-white/20 shadow-2xl">
                  {/* Top-Right Heart Like Floating Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <HeartLikeButton
                      roomId={selectedRoomForGallery.id}
                      isLiked={likedRoomIds.has(selectedRoomForGallery.id)}
                      likeCount={roomLikes[selectedRoomForGallery.id] ?? INITIAL_ROOM_LIKES[selectedRoomForGallery.id] ?? 40}
                      isAnimating={animatingHeartId === selectedRoomForGallery.id}
                      onToggle={(e) => handleToggleLike(selectedRoomForGallery.id, e)}
                      size="sm"
                    />
                  </div>

                  {galleryDisplayMode === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      <video
                        key={selectedRoomForGallery.videoUrl}
                        src={selectedRoomForGallery.videoUrl}
                        autoPlay
                        loop
                        controls
                        playsInline
                        className="aspect-16-9-video"
                      />
                      <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A880]/70 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Full Transition Video (100% Uncropped)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      <img
                        src={selectedRoomForGallery.photos[activeGalleryPhotoIndex] || selectedRoomForGallery.afterImg}
                        alt={selectedRoomForGallery.title}
                        className="w-full h-full object-contain sm:object-cover bg-black"
                      />
                      <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-300 shadow-lg pointer-events-none">
                        <Camera className="w-3 h-3 text-[#C5A880]" />
                        <span>Photo {activeGalleryPhotoIndex + 1} of {selectedRoomForGallery.photos.length}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. REQUESTED: OVAL BOX MOVED DOWN OF THE VIDEO TO SEE FULL */}
                <div className="w-full flex justify-center py-1">
                  <div className="px-5 py-2.5 rounded-full bg-neutral-900/95 backdrop-blur-xl border border-[#C5A880]/70 shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex items-center gap-3 sm:gap-4 select-none">
                    {/* First Option: See Video */}
                    <button
                      type="button"
                      onClick={() => setGalleryDisplayMode('video')}
                      className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                        galleryDisplayMode === 'video'
                          ? 'bg-[#C5A880] text-black shadow-[0_0_20px_rgba(197,168,128,0.8)] ring-2 ring-white/50'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <Play className={`w-3.5 h-3.5 ${galleryDisplayMode === 'video' ? 'fill-black' : 'fill-[#C5A880]'}`} />
                      <span>See Video</span>
                    </button>

                    <div className="w-[1px] h-6 bg-white/20" />

                    {/* Second Option: See Photo */}
                    <button
                      type="button"
                      onClick={() => setGalleryDisplayMode('photo')}
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                        galleryDisplayMode === 'photo'
                          ? 'bg-[#C5A880] text-black shadow-[0_0_20px_rgba(197,168,128,0.8)] ring-2 ring-white/50'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <Camera className={`w-3.5 h-3.5 ${galleryDisplayMode === 'photo' ? 'text-black' : 'text-[#C5A880]'}`} />
                      <span>See Photo</span>
                    </button>
                  </div>
                </div>

                {/* 3. Photo Thumbnails Strip */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                    Room Photos (Before / After / Details):
                  </span>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {selectedRoomForGallery.photos.map((photo, pIdx) => {
                      const label = pIdx === 0 ? 'Luxury After' : pIdx === 1 ? 'Raw Before' : 'Details';
                      return (
                        <div
                          key={pIdx}
                          onClick={() => {
                            setActiveGalleryPhotoIndex(pIdx);
                            setGalleryDisplayMode('photo');
                          }}
                          className={`group relative w-28 h-18 sm:w-36 sm:h-22 rounded-xl overflow-hidden cursor-pointer transition-all shrink-0 ${
                            galleryDisplayMode === 'photo' && activeGalleryPhotoIndex === pIdx
                              ? 'border-2 border-[#C5A880] scale-105 shadow-lg'
                              : 'border border-white/10 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={photo} alt={`View ${pIdx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute bottom-1 left-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-bold text-center uppercase tracking-wider text-[#C5A880]">
                            {label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Room Specifications & Material Inclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
                <div className="p-6 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/15 space-y-3 shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                    Architectural Specifications
                  </span>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {selectedRoomForGallery.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/15 flex flex-col justify-between gap-4 shadow-xl">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                      Verified Client Review
                    </span>
                    <p className="text-sm text-stone-200 italic mt-2 font-light">
                      &ldquo;{selectedRoomForGallery.clientQuote || 'Exceptional craftsmanship and milestone lock.'}&rdquo;
                    </p>
                    <span className="text-xs text-stone-400 block mt-2">
                      &mdash; {selectedRoomForGallery.clientName || 'Verified Deoghar Client'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="tel:+919304311336"
                      className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#C5A880]" />
                      <span>Call Studio</span>
                    </a>
                    <a
                      href={`https://wa.me/919304311336?text=Hello%20Urban%20Axis%20Design%20%26%20Deoghar%20Panel%20Hub%20(DPH)%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(
                        selectedRoomForGallery.title
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* All Room Suites Gallery Cards Grid with Heart / Like Engagement */}
              <div className="space-y-4 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] block">
                      Full Gallery Collection
                    </span>
                    <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white mt-0.5">
                      Explore All Rooms &amp; Turnkey Suites
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {TRANSITION_ROOMS.length} Architectural Suites
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {TRANSITION_ROOMS.map((room) => {
                    const isCurrent = room.id === selectedRoomForGallery.id;
                    const isLiked = likedRoomIds.has(room.id);
                    const count = roomLikes[room.id] ?? INITIAL_ROOM_LIKES[room.id] ?? 40;
                    const isAnimating = animatingHeartId === room.id;

                    return (
                      <div
                        key={room.id}
                        onClick={() => {
                          setSelectedRoomForGallery(room);
                          setActiveGalleryPhotoIndex(0);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className={`group relative rounded-2xl overflow-hidden bg-neutral-950/85 backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between hover:-translate-y-1 ${
                          isCurrent ? 'border-[#C5A880] ring-1 ring-[#C5A880]/50' : 'border-white/15 hover:border-[#C5A880]'
                        }`}
                      >
                        {/* Image Preview with Heart Like Icon */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black select-none">
                          <img
                            src={room.afterImg}
                            alt={room.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                          {/* Status Badge */}
                          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                            {isCurrent ? 'Viewing Now' : room.area}
                          </div>

                          {/* Heart / Like Icon Trigger with Subtle Engagement Animation */}
                          <div className="absolute top-3 right-3 z-20">
                            <HeartLikeButton
                              roomId={room.id}
                              isLiked={isLiked}
                              likeCount={count}
                              isAnimating={isAnimating}
                              onToggle={(e) => handleToggleLike(room.id, e)}
                              size="sm"
                            />
                          </div>

                          {/* Starting Price Pill */}
                          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A880]/50 text-[10px] font-mono text-[#C5A880]">
                            {room.startingPrice}
                          </div>
                        </div>

                        {/* Room Info */}
                        <div className="p-4 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] block">
                            {room.category}
                          </span>
                          <h4 className="text-sm font-bold font-playfair text-white group-hover:text-[#C5A880] transition-colors truncate">
                            {room.title}
                          </h4>
                          <p className="text-xs text-neutral-400 line-clamp-2 font-light">
                            {room.tagline}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PAGE 5: CONTACT PAGE
            ===================================================================== */}
        {activePageIndex === 5 && (
          <div className="w-full animate-page-smooth min-h-screen py-10 lg:py-14 relative">
            {/* SECTION BACKGROUND ENGINE (PERFECT FULL-BLEED DEOGHAR STUDIO HEADQUARTERS) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
              <img
                src={IMAGES.commercial}
                alt="Mahavir Akhada Studio & Store Headquarters"
                className="w-full h-full object-cover animate-subtle-breathe opacity-90 sm:opacity-95 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/20 to-neutral-950/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/55" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 space-y-8">
              {/* TOP NAVIGATION: ONLY BACK BUTTON IN ANIMATED BOX */}
              <div className="w-full flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => goToPage(1)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/20 hover:border-[#C5A880] text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-2.5 shadow-lg active:scale-90 transition-all cursor-pointer group"
                  title="Back to Discover & Videos"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-black group-hover:-translate-x-0.5 transition-all" />
                  </div>
                  <span>Back to Discover &amp; Videos</span>
                </button>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880]">
                  Mahavir Akhada, Deoghar &bull; Jharkhand
                </span>
                <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mt-1">
                  Contact &amp; Site Evaluation
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
                  Consult with Urban Axis Design &amp; Deoghar Panel Hub (DPH) at our Mahavir Akhada studio, or chat on WhatsApp for best price quotes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Studio Coordinates & Actions */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="p-6 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/15 space-y-4 shadow-xl">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                        Studio &amp; Store Address
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1 font-playfair">
                        Urban Axis Design | Deoghar Panel Hub (DPH)
                      </h4>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                        Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar, Jharkhand 814112
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Direct Telephone</span>
                      <a href="tel:+919304311336" className="font-bold text-[#C5A880] hover:underline">
                        +91 9304311336
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="tel:+919304311336"
                      className="p-4 rounded-xl bg-black border border-white/15 hover:border-[#C5A880] text-white flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-[#C5A880] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#C5A880]" />
                      <span>Call +91 9304311336</span>
                    </a>

                    <a
                      href="https://wa.me/919304311336?text=Hello%20Urban%20Axis%20Design%20%26%20Deoghar%20Panel%20Hub%20(DPH)%2C%20I%20would%20like%20to%20inquire%20about%20your%20interior%20panels%2C%20architecture%2C%20and%20construction%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-[#25D366]/90 hover:bg-[#25D366] text-white flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  {/* Embedded Map Widget */}
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/[0.08] bg-black">
                    <iframe
                      title="Urban Axis Design and Deoghar Panel Hub Google Map"
                      src="https://maps.google.com/maps?q=Mahavir+Akhada+Near+New+Nagar+Nigam+Jalshar+Road+Deoghar+Jharkhand+814112&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A880]/50 text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">
                      Mahavir Akhada, Jalshar Road Coordinates
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mahavir+Akhada+Near+New+Nagar+Nigam+Jalshar+Road+Deoghar+Jharkhand+814112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl border border-white/20 text-white font-extrabold text-xs uppercase tracking-wider hover:border-[#C5A880] hover:text-[#C5A880] transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>View Exact Location on Google Maps</span>
                  </a>
                </div>

                {/* Consultation Booking Card */}
                <div className="lg:col-span-6 p-8 rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-[#C5A880]/50 space-y-6 shadow-2xl">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A880] mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Fixed ₹1,500 Professional Booking</span>
                    </div>
                    <h3 className="text-2xl font-bold font-playfair text-white">
                      Request Consultation
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 font-light">
                      Direct architectural and panel review with Urban Axis Design &amp; DPH team at Mahavir Akhada studio or on-site.
                    </p>
                  </div>

                  {bookingConfirmed ? (
                    <div className="py-10 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] flex items-center justify-center mx-auto text-xl font-bold">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <h4 className="text-lg font-bold font-playfair text-white">
                        Booking Initialized
                      </h4>
                      <p className="text-xs text-stone-400 max-w-sm mx-auto">
                        Connecting with Urban Axis &amp; Deoghar Panel Hub WhatsApp (+91 9304311336) to confirm your consultation slot...
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                          Client Name
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="e.g. Vikram Malhotra"
                          className="w-full h-11 px-3.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-sm text-white placeholder-stone-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="e.g. +91 98110 XXXXX"
                          className="w-full h-11 px-3.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-sm text-white placeholder-stone-500 outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                            Carpet Area (Sq.Ft.)
                          </label>
                          <input
                            type="number"
                            required
                            value={bookingArea}
                            onChange={(e) => setBookingArea(e.target.value)}
                            placeholder="1800"
                            className="w-full h-11 px-3.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-sm text-white outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                            Scope
                          </label>
                          <select
                            value={bookingScope}
                            onChange={(e) => setBookingScope(e.target.value)}
                            className="w-full h-11 px-2.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-xs text-white outline-none transition-colors"
                          >
                            <option value="Turnkey 2BHK Residence" className="bg-[#121212]">Turnkey 2BHK</option>
                            <option value="Turnkey 3BHK Residence" className="bg-[#121212]">Turnkey 3BHK</option>
                            <option value="Luxury Penthouse / Villa" className="bg-[#121212]">Penthouse / Villa</option>
                            <option value="Modular Kitchen Studio" className="bg-[#121212]">Modular Kitchen</option>
                            <option value="Corporate Workspace" className="bg-[#121212]">Corporate Office</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                        <span className="text-stone-400">Fixed Consultation Fee</span>
                        <span className="font-extrabold text-[#C5A880]">₹1,500</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-[#C5A880] text-black hover:bg-[#d5bc97] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Request Consultation &amp; Open WhatsApp
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =======================================================================
          SIMPLE DIRECT ACTION FOOTER
          ======================================================================= */}
      <footer className="w-full bg-[#0E0E0E] border-t border-white/[0.08] py-8 px-6 sm:px-10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="font-playfair font-bold text-white text-sm">
              Urban Axis Design | DPH – Deoghar Panel Hub
            </span>
            <span className="text-stone-600">&bull;</span>
            <span>Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar 814112</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <button
              type="button"
              onClick={() => goToPage(0)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => goToPage(1)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Discover &amp; Videos
            </button>
            <button
              type="button"
              onClick={() => handleOpenRoomGallery(TRANSITION_ROOMS[0])}
              className="text-[#C5A880] hover:text-white font-semibold transition-colors cursor-pointer"
            >
              Gallery &amp; Videos
            </button>
            <button
              type="button"
              onClick={() => goToPage(2)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => goToPage(5)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <a href="tel:+919304311336" className="text-[#C5A880] font-bold hover:underline">
              +91 9304311336
            </a>
          </div>
        </div>
      </footer>

      {/* =======================================================================
          TRANSITION VIDEO FULL-SCREEN MODAL (PLAYS ACTUAL MP4 TRANSITION VIDEO)
          ======================================================================= */}
      {transitionVideoRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-2xl bg-[#121212] border border-[#C5A880]/60 p-6 overflow-hidden shadow-2xl flex flex-col gap-6 text-left max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C5A880] mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Transition Video Stream</span>
                </div>
                <h3 className="text-2xl font-bold font-playfair text-white">
                  {transitionVideoRoom.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {transitionVideoRoom.tagline} &bull; {transitionVideoRoom.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setTransitionVideoRoom(null)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Box - 100% Full Uncropped Video (Guaranteed 16:9 Aspect, Zero Thin-Line Bug) */}
            <div className="relative aspect-16-9-box w-full rounded-xl overflow-hidden bg-black border border-white/20 shadow-2xl shrink-0">
              <video
                src={transitionVideoRoom.videoUrl}
                autoPlay
                loop
                controls
                playsInline
                className="aspect-16-9-video"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A880]/60 text-[10px] font-mono text-[#C5A880] pointer-events-none">
                EMPTY RAW SHELL ➔ LUXURY FITOUT
              </div>
            </div>

            {/* Room Descriptions Before vs After */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Original Site State
                </span>
                <p className="text-neutral-300 font-light leading-relaxed">
                  {transitionVideoRoom.beforeDesc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-[#C5A880]/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880] block">
                  Turnkey Architectural Fitout
                </span>
                <p className="text-neutral-300 font-light leading-relaxed">
                  {transitionVideoRoom.afterDesc}
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 font-mono">
                Starting Rate: <strong className="text-white">{transitionVideoRoom.startingPrice}</strong>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:+919304311336"
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:border-[#C5A880] hover:text-[#C5A880] flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call Studio</span>
                </a>

                <a
                  href={`https://wa.me/919304311336?text=Hello%20Urban%20Axis%20Design%20%26%20Deoghar%20Panel%20Hub%2C%20I%20just%20watched%20the%20transition%20video%20for%20${encodeURIComponent(
                    transitionVideoRoom.title
                  )}%20and%20would%20like%20to%20schedule%20a%20site%20meeting.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#25D366] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#20ba59] flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          PHOTO VIEWER MODAL (OPENED WHEN "SEE PHOTO" IS TAPPED)
          ======================================================================= */}
      {photoModalSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-5xl rounded-2xl bg-neutral-950 border border-[#C5A880]/50 p-6 overflow-hidden shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                  High-Resolution Architectural View
                </span>
                <h4 className="text-xl font-bold font-playfair text-white">
                  {selectedRoomForGallery.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setPhotoModalSrc(null)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16-9-box w-full rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
              <img src={photoModalSrc} alt="High Res Architectural View" className="w-full h-full object-contain bg-black" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-neutral-400 font-mono">
                {selectedRoomForGallery.location} &bull; {selectedRoomForGallery.area}
              </span>

              <button
                type="button"
                onClick={() => {
                  setPhotoModalSrc(null);
                  setGalleryDisplayMode('video');
                  goToPage(4);
                }}
                className="px-5 py-2 rounded-full bg-[#C5A880] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Switch to Transition Video</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          TURNKEY BUDGET CALCULATOR MODAL
          ======================================================================= */}
      {isCalculatorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#141414] border border-[#C5A880]/60 p-6 overflow-hidden shadow-2xl text-left space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                  Best Price &amp; Quality Guarantee &bull; Deoghar
                </span>
                <h3 className="text-xl font-bold font-playfair text-white">
                  Turnkey Budget Estimator
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCalculatorModalOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-300 font-bold uppercase tracking-wider">Carpet Area</span>
                  <span className="font-mono text-[#C5A880] font-bold">{calcSqFt} Sq. Ft.</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="5500"
                  step="50"
                  value={calcSqFt}
                  onChange={(e) => setCalcSqFt(Number(e.target.value))}
                  className="w-full accent-[#C5A880] h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCalcPackage('standard')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    calcPackage === 'standard'
                      ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                      : 'border-white/10 bg-black/40 text-stone-400'
                  }`}
                >
                  <span className="block text-xs font-bold uppercase">Classic Suite</span>
                  <span className="text-[11px] font-mono text-[#C5A880]">₹4,500 / sq. ft.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcPackage('luxury')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    calcPackage === 'luxury'
                      ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                      : 'border-white/10 bg-black/40 text-stone-400'
                  }`}
                >
                  <span className="block text-xs font-bold uppercase">Haute Luxury</span>
                  <span className="text-[11px] font-mono text-[#C5A880]">₹6,500 / sq. ft.</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black/80 border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                    Estimated Turnkey Contract
                  </span>
                  <span className="text-2xl font-bold font-mono text-[#C5A880]">
                    ₹{((calcSqFt * (calcPackage === 'standard' ? 4500 : 6500)) / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-mono">100% BOQ Lock</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsCalculatorModalOpen(false);
                  setIsConsultationModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-[#C5A880] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                Proceed to Book Site Consultation (₹1,500)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          CONSULTATION MODAL POPUP
          ======================================================================= */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-[#141414] border border-[#C5A880]/50 p-6 overflow-hidden shadow-2xl text-left">
            <button
              type="button"
              onClick={() => {
                setIsConsultationModalOpen(false);
                setBookingConfirmed(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] flex items-center justify-center mx-auto text-xl font-bold">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-lg font-bold font-playfair text-white">
                  Consultation Initialized
                </h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Opening WhatsApp to connect with Urban Axis &amp; Deoghar Panel Hub (+91 9304311336)...
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                    Fixed ₹1,500 Professional Booking
                  </span>
                  <h3 className="text-xl font-bold font-playfair text-white mt-1">
                    Book Architectural Review
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Mahavir Akhada, Deoghar &bull; Jharkhand 814112
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full h-11 px-3.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-sm text-white placeholder-stone-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="e.g. +91 98110 XXXXX"
                    className="w-full h-11 px-3.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-sm text-white placeholder-stone-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                      Carpet Area (Sq.Ft.)
                    </label>
                    <input
                      type="number"
                      required
                      value={bookingArea}
                      onChange={(e) => setBookingArea(e.target.value)}
                      placeholder="1800"
                      className="w-full h-11 px-3.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-stone-300 tracking-wider mb-1">
                      Scope
                    </label>
                    <select
                      value={bookingScope}
                      onChange={(e) => setBookingScope(e.target.value)}
                      className="w-full h-11 px-2.5 rounded-xl bg-black/70 border border-white/20 focus:border-[#C5A880] text-xs text-white outline-none"
                    >
                      <option value="Turnkey 2BHK Residence" className="bg-[#141414]">Turnkey 2BHK</option>
                      <option value="Turnkey 3BHK Residence" className="bg-[#141414]">Turnkey 3BHK</option>
                      <option value="Luxury Penthouse / Villa" className="bg-[#141414]">Penthouse / Villa</option>
                      <option value="Modular Kitchen Studio" className="bg-[#141414]">Modular Kitchen</option>
                      <option value="Corporate Workspace" className="bg-[#141414]">Corporate Office</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Consultation Fee</span>
                  <span className="font-extrabold text-[#C5A880]">₹1,500</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C5A880] text-black hover:bg-[#d5bc97] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Confirm &amp; Open WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
