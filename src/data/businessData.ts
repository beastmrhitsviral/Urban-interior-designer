import { BusinessProfile, ReviewItem, MaterialSample } from '../types';

export const BUSINESS_DATA: BusinessProfile = {
  name: 'Urban Axis Design | DPH – Deoghar Panel Hub',
  shortName: 'Urban Axis & DPH',
  tagline: 'Interiors | Architecture | Construction • Style Your Space, Define Your Lifestyle',
  brand1: 'Urban Axis Design',
  tagline1: 'Interiors | Architecture | Construction',
  brand2: 'DPH – Deoghar Panel Hub',
  tagline2: 'Style Your Space, Define Your Lifestyle',
  motto: 'Premium Panels for Premium Spaces (Best Quality, Best Price)',
  slogan: 'Building Dreams, Designing Spaces',
  address: 'Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar, Jharkhand 814112',
  addressLine1: 'Mahavir Akhada, Near New Nagar Nigam',
  addressLine2: 'Jalshar Road',
  cityPincode: 'Deoghar, Jharkhand 814112',
  phoneRaw: '9304311336',
  phoneDisplay: '+91 9304311336',
  callHref: 'tel:+919304311336',
  whatsappHref: 'https://wa.me/919304311336?text=Hello%20Urban%20Axis%20Design%20%26%20Deoghar%20Panel%20Hub%20(DPH)%2C%20I%20would%20like%20to%20inquire%20about%20your%20interior%20panels%2C%20architecture%2C%20and%20construction%20services.',
  gpsNavigationHref: 'https://www.google.com/maps/search/?api=1&query=Mahavir+Akhada+Near+New+Nagar+Nigam+Jalshar+Road+Deoghar+Jharkhand+814112',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Mahavir+Akhada+Near+New+Nagar+Nigam+Jalshar+Road+Deoghar+Jharkhand+814112&t=&z=15&ie=UTF8&iwloc=&output=embed',
  googleRating: 4.9,
  totalReviews: 68
};

export const KEY_GUARANTEES = [
  { title: 'Premium Quality Material', desc: 'Highest grade architectural panels, UV marble sheets & precision joinery.' },
  { title: 'Durable & Long Lasting', desc: 'Moisture resistant, termite-proof, fire-retardant structural durability.' },
  { title: 'Best Quality for Interior Decor', desc: 'Curated modern aesthetics, luxury fluted textures, moulding bits & elegant finishes.' },
  { title: 'Best Price Guarantee', desc: 'Direct hub pricing with guaranteed competitive rates on all panels and decor.' }
];

export const ARCHITECTURE_SERVICES = [
  'House Plan',
  'Elevation Design',
  'Interior Design',
  '3D Visualization',
  'Construction Guidance',
  'Renovation & Remodeling',
  'Site Supervision',
  'Turnkey Solutions'
];

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rajesh Kumar',
    rating: 5,
    date: '2 weeks ago',
    quote: 'Excellent TV unit with UV marble sheet and fluted panels. Best price and quality in Deoghar!',
    location: 'Near New Nagar Nigam, Deoghar',
    verified: true,
    projectType: 'TV Unit & PVC Ceiling'
  },
  {
    id: 'rev-2',
    author: 'Pooja Sharma',
    rating: 5,
    date: '1 month ago',
    quote: 'Urban Axis designed our entire house plan and elevation. Handover was punctual and execution was flawless.',
    location: 'Castairs Town, Deoghar',
    verified: true,
    projectType: 'Turnkey House Plan & Elevation'
  },
  {
    id: 'rev-3',
    author: 'Amit Aggarwal',
    rating: 5,
    date: '3 months ago',
    quote: 'Best rates on WPC and PVC panels at Deoghar Panel Hub. Genuine premium quality material.',
    location: 'VIP Chowk, Deoghar',
    verified: true,
    projectType: 'Wall Design Panel & Moulding Bit'
  },
  {
    id: 'rev-4',
    author: 'Dr. Meenakshi Sundaram',
    rating: 5,
    date: '4 months ago',
    quote: 'Extremely professional 3D visualization and site supervision. Transformed our bedroom into a 5-star suite.',
    location: 'Bilasi Town, Deoghar',
    verified: true,
    projectType: 'Fluted Panel Master Suite'
  },
  {
    id: 'rev-5',
    author: 'Siddharth Mehra',
    rating: 4.9,
    date: '5 months ago',
    quote: 'Building Dreams, Designing Spaces — they truly deliver on their motto. Premium panels for premium spaces.',
    location: 'Jasidih, Deoghar',
    verified: true,
    projectType: 'Full Interior Renovation'
  }
];

export const IMAGES = {
  heroModern: '/src/assets/images/hero_modern_interior_1793888353922.jpg',
  kitchen: '/src/assets/images/modular_kitchen_delhi_1793888355286.jpg',
  bedroom: '/src/assets/images/luxury_bedroom_suite_1793888355634.jpg',
  commercial: '/src/assets/images/commercial_office_space_1793888356036.jpg',
  materials: '/src/assets/images/materials_gallery_palette_1793888356855.jpg',
  emptyBedroom: '/src/assets/images/empty_bedroom_before_1793891043511.jpg',
  luxuryBedroom: '/src/assets/images/luxury_bedroom_after_1793891059003.jpg',
  emptyKitchen: '/src/assets/images/empty_kitchen_before_1793891074492.jpg',
  luxuryKitchen: '/src/assets/images/luxury_kitchen_after_1793891088876.jpg',
  emptyLiving: '/src/assets/images/empty_living_before_1793891105526.jpg',
  luxuryLiving: '/src/assets/images/luxury_living_after_1793891120677.jpg',
  emptyOffice: '/src/assets/images/empty_office_before_1793891134126.jpg',
  luxuryOffice: '/src/assets/images/luxury_office_after_1793891148496.jpg'
};

export const MATERIAL_SAMPLES: MaterialSample[] = [
  {
    id: 'mat-pvc',
    name: 'PVC Panel',
    category: 'Ceiling & Wall Panels',
    finish: 'Waterproof anti-termite seamless interlock',
    origin: 'DPH Certified Stock',
    sqftRateRange: 'Best Price Guarantee',
    description: 'Durable, moisture-proof PVC ceiling and wall cladding panels engineered for effortless maintenance and longevity.',
    accentColor: '#C5A880'
  },
  {
    id: 'mat-fluted',
    name: 'Fluted Panel',
    category: 'Decorative Wall Cladding',
    finish: 'Acoustic ribbed matte & wood-grain finish',
    origin: 'DPH Certified Stock',
    sqftRateRange: 'Best Price Guarantee',
    description: 'Sculpted linear reeded flutes with warm shadow lines, ideal for TV backdrop accents, bedheads, and feature walls.',
    accentColor: '#B89020'
  },
  {
    id: 'mat-wpc',
    name: 'WPC Panel',
    category: 'Composite Exterior & Interior',
    finish: 'Wood-Polymer composite weather-resistant',
    origin: 'DPH Certified Stock',
    sqftRateRange: 'Best Price Guarantee',
    description: 'High-density composite panels with authentic timber texture, zero rotting, and high structural resilience.',
    accentColor: '#8E5B32'
  },
  {
    id: 'mat-uv-marble',
    name: 'UV Marble Sheet',
    category: 'Luxury Feature Sheets',
    finish: 'High-gloss UV coated scratch-resistant',
    origin: 'DPH Certified Stock',
    sqftRateRange: 'Best Price Guarantee',
    description: 'Bookmatched Italian and Statuario marble patterns with brilliant high-gloss UV protection for TV units and walls.',
    accentColor: '#D8D8D8'
  },
  {
    id: 'mat-mosaic',
    name: 'Mosaic',
    category: 'Architectural Tiles & Accents',
    finish: 'Geometric artisanal textured tile',
    origin: 'DPH Certified Stock',
    sqftRateRange: 'Best Price Guarantee',
    description: 'Artisanal mosaic wall assemblies complemented with precision moulding bits for premium decorative relief.',
    accentColor: '#997514'
  },
  {
    id: 'mat-foam',
    name: 'Foam Sheet',
    category: 'Lightweight Wall Accents',
    finish: '3D embossed self-adhesive thermal foam',
    origin: 'DPH Certified Stock',
    sqftRateRange: 'Best Price Guarantee',
    description: 'Shock-absorbing, acoustic-damping 3D foam panels for rapid wall makeovers and thermal comfort.',
    accentColor: '#E8E4DA'
  },
  {
    id: 'mat-wallpaper',
    name: 'Wallpaper',
    category: 'Wall Finishes (On Order)',
    finish: 'Textured fabric, metallic & bespoke murals',
    origin: 'Available on Order',
    sqftRateRange: 'Custom Order',
    description: 'Designer non-woven and vinyl wallpapers featuring global geometric and botanical luxury motifs.',
    accentColor: '#A855F7',
    availableOnOrder: true
  },
  {
    id: 'mat-blinds',
    name: 'Blinds',
    category: 'Window Dressing (On Order)',
    finish: 'Motorized roller, zebra & Venetian slats',
    origin: 'Available on Order',
    sqftRateRange: 'Custom Order',
    description: 'Architectural window treatments with precision solar filtering, blackout options, and automated remote controls.',
    accentColor: '#06B6D4',
    availableOnOrder: true
  },
  {
    id: 'mat-3d-panel',
    name: '3D Panel',
    category: 'Geometric Wall Art (On Order)',
    finish: 'Sculptured geometric relief panels',
    origin: 'Available on Order',
    sqftRateRange: 'Custom Order',
    description: 'Striking modular 3D relief tiles creating dramatic interplay of light and shadow on statement interior walls.',
    accentColor: '#EC4899',
    availableOnOrder: true
  },
  {
    id: 'mat-pu-stone',
    name: 'PU Stone',
    category: 'Lightweight Stone Veneer (On Order)',
    finish: 'Ultra-lightweight polyurethane masonry',
    origin: 'Available on Order',
    sqftRateRange: 'Custom Order',
    description: 'Hyper-realistic rugged stone veneers without heavy structural loads, fast to install and 100% moisture-proof.',
    accentColor: '#78716C',
    availableOnOrder: true
  }
];

export const DEOGHAR_LANDMARKS = [
  { name: 'Near New Nagar Nigam', distance: '1 min walk from studio' },
  { name: 'Mahavir Akhada', distance: 'Prime Central Landmark' },
  { name: 'Deoghar Tower Chowk', distance: '1.2 km (5 mins by vehicle)' },
  { name: 'Jasidih Junction Railway Station', distance: '6.5 km (15 mins)' }
];

export const DEOGHAR_TRANSIT_POINTS = [
  { name: 'Near New Nagar Nigam (Jalshar Road)', distance: '1 min walk from studio' },
  { name: 'Mahavir Akhada Chowk', distance: 'Prime Central Landmark' },
  { name: 'Tower Chowk, Deoghar', distance: '1.2 km (5 mins by auto/e-rickshaw)' },
  { name: 'Jasidih Railway Station', distance: '6.5 km (15 mins drive)' }
];

// Backward-compatible alias for any legacy imports
export const DELHI_METRO_STATIONS = DEOGHAR_TRANSIT_POINTS;

export interface ServiceTransformation {
  id: string;
  title: string;
  tagline: string;
  beforeImg: string;
  afterImg: string;
}

export const TRANSFORMATION_SERVICES: Record<'bedroom' | 'kitchen' | 'living' | 'office', ServiceTransformation> = {
  bedroom: {
    id: 'bedroom',
    title: 'Luxury Bedroom Suite Transformation',
    tagline: 'Raw Empty Room ➔ 5-Star Boutique Suite',
    beforeImg: IMAGES.emptyBedroom,
    afterImg: IMAGES.luxuryBedroom
  },
  kitchen: {
    id: 'kitchen',
    title: 'Modern Modular Kitchen Architecture',
    tagline: 'Bare Brick Wall ➔ Designer Quartz Kitchen',
    beforeImg: IMAGES.emptyKitchen,
    afterImg: IMAGES.luxuryKitchen
  },
  living: {
    id: 'living',
    title: 'Designer Living & TV Unit Lounge',
    tagline: 'Raw Concrete Wall ➔ UV Marble & Fluted TV Unit',
    beforeImg: IMAGES.emptyLiving,
    afterImg: IMAGES.luxuryLiving
  },
  office: {
    id: 'office',
    title: 'Commercial Office Suite',
    tagline: 'Bare Commercial Shell ➔ Turnkey Corporate Landmark',
    beforeImg: IMAGES.emptyOffice,
    afterImg: IMAGES.luxuryOffice
  }
};

