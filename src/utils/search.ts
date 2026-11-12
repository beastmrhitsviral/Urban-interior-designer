export interface SearchItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Modular Kitchens' | 'Materials' | 'Reviews' | 'Location';
  targetView: 3 | 4 | 5 | 6 | 7 | 8;
  description: string;
  keywords: string[];
  pricingSnippet: string;
  badge: string;
}

export const APP_CATALOG: SearchItem[] = [
  {
    id: 'modular-kitchen-german',
    title: 'German-Finish Modular Kitchen Design',
    category: 'Modular Kitchens',
    targetView: 3,
    description: 'Precision ergonomic layouts with quartz waterfall islands, matte obsidian acrylic shutters, and soft-close Blum Aventos systems.',
    keywords: ['kitchen', 'modular', 'island', 'quartz', 'acrylic', 'cabinet', 'pantry', 'delhi kitchen', '120000'],
    pricingSnippet: 'Starting from ₹1,20,000 onwards',
    badge: 'Popular Modular'
  },
  {
    id: 'luxury-master-bedroom',
    title: 'Master Bedroom Luxury Suites & Fluted Paneling',
    category: 'Residential',
    targetView: 4,
    description: 'Modern, Minimalist, and Classical Indian trends with acoustic fluted walnut paneling, brass inlays, and warm cove lighting.',
    keywords: ['bedroom', 'master', 'luxury', 'wardrobe', 'bed', 'fluted panel', 'headboard', 'walk-in closet', '85000'],
    pricingSnippet: 'Starting from ₹85,000 onwards',
    badge: 'Luxury Suite'
  },
  {
    id: 'living-room-architecture',
    title: 'Haute Architectural Living Spaces',
    category: 'Residential',
    targetView: 4,
    description: 'Double-height ceilings, bookmatched Italian Statuario marble walls, bespoke low-profile sofas, and brass architectural trims.',
    keywords: ['living', 'hall', 'drawing room', 'marble', 'statuario', 'villa', 'ceiling', 'lighting', 'modern'],
    pricingSnippet: 'Turnkey ₹4,500 - ₹6,500 / sq. ft.',
    badge: 'Bespoke Living'
  },
  {
    id: 'commercial-corporate-workspaces',
    title: 'Commercial Office & Corporate Hub Spatial Planning',
    category: 'Commercial',
    targetView: 5,
    description: 'Corporate hubs in Delhi NCR with acoustic meeting pods, executive boardrooms, biophilic planter dividers, and ergonomic pods.',
    keywords: ['commercial', 'office', 'corporate', 'workspace', 'conference', 'delhi ncr', 'reception', 'planning'],
    pricingSnippet: 'Turnkey Spatial Planning',
    badge: 'Delhi NCR Hubs'
  },
  {
    id: 'materials-finishes-gallery',
    title: 'Architectural Materials & Luxury Finishes Gallery',
    category: 'Materials',
    targetView: 8,
    description: 'Curated library of Burmese teak veneers, Calacatta gold marble, brushed champagne brass hardware, and architectural lighting.',
    keywords: ['materials', 'wood', 'teak', 'marble', 'brass', 'finishes', 'samples', 'palette', 'swatches', 'lighting'],
    pricingSnippet: 'Full Per Sq. Ft. Breakdown',
    badge: 'Material Specs'
  },
  {
    id: 'google-client-reviews',
    title: 'Verified 4.9-Star Google Client Reviews',
    category: 'Reviews',
    targetView: 6,
    description: '4.9-Star Google rating based on real verified client reviews from Mahavir Akhada, Castairs Town, VIP Chowk, and Deoghar.',
    keywords: ['reviews', 'google rating', 'rating', 'feedback', 'kamla nagar', 'deoghar', 'testimonials', '4.9 star', '68 reviews'],
    pricingSnippet: '4.9 ★ Rating (68 Reviews)',
    badge: '4.9 ★ Top Rated'
  },
  {
    id: 'location-gps-navigation',
    title: 'Mahavir Akhada Studio & Live GPS Navigation',
    category: 'Location',
    targetView: 7,
    description: 'Studio at Mahavir Akhada, Near New Nagar Nigam, Jalshar Road, Deoghar, Jharkhand 814112. Interactive map and instant directions.',
    keywords: ['location', 'address', 'deoghar', 'mahavir akhada', 'jalshar road', 'nagar nigam', 'gps', 'directions', 'map', 'delhi'],
    pricingSnippet: 'Open Mon-Sat 10 AM - 7:30 PM',
    badge: 'Deoghar Studio'
  }
];

export function filterCatalog(
  items: SearchItem[],
  query: string,
  selectedCategory: string = 'All'
): SearchItem[] {
  const cleanQuery = query.trim().toLowerCase();
  
  return items.filter(item => {
    // Category match
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;
    if (!cleanQuery) return true;

    // String match in title, description, category, pricing, or keywords
    const matchesTitle = item.title.toLowerCase().includes(cleanQuery);
    const matchesDesc = item.description.toLowerCase().includes(cleanQuery);
    const matchesCategoryName = item.category.toLowerCase().includes(cleanQuery);
    const matchesPricing = item.pricingSnippet.toLowerCase().includes(cleanQuery);
    const matchesKeywords = item.keywords.some(k => k.toLowerCase().includes(cleanQuery));

    return matchesTitle || matchesDesc || matchesCategoryName || matchesPricing || matchesKeywords;
  });
}
