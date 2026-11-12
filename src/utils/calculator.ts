export interface CostParams {
  sqft: number;
  tierId: 'essential' | 'signature' | 'bespoke';
  includeKitchen?: boolean;
  kitchenCount?: number;
  includeBedroom?: boolean;
  bedroomCount?: number;
  consultationBooked?: boolean;
}

export interface CostTier {
  id: 'essential' | 'signature' | 'bespoke';
  name: string;
  tagline: string;
  ratePerSqFt: number; // ₹4,500 to ₹6,500
  specifications: string[];
}

export const DELHI_INTERIOR_TIERS: Record<'essential' | 'signature' | 'bespoke', CostTier> = {
  essential: {
    id: 'essential',
    name: 'Turnkey Essential (2BHK / 3BHK)',
    tagline: 'Standard Commercial Grade Interior',
    ratePerSqFt: 4500,
    specifications: [
      'Commercial grade BWP plywood framework',
      'Matte laminate finishes & concealed LED cove',
      'Standard modular hardware (Hettich/Hafele)',
      'Turnkey electrical, civil & paint finishing'
    ]
  },
  signature: {
    id: 'signature',
    name: 'Signature Luxury (2BHK / 3BHK)',
    tagline: 'Premium Delhi Market Standard',
    ratePerSqFt: 5500,
    specifications: [
      'Marine ply BWP 710 with fluted veneer accents',
      'PU matte finish & anti-fingerprint acrylic',
      'German soft-close systems (Blum Aventos)',
      'Quartz stone counters & profile lighting'
    ]
  },
  bespoke: {
    id: 'bespoke',
    name: 'Ultra-Bespoke Architectural (2BHK / 3BHK / Villa)',
    tagline: 'Luxury Turnkey Haute Architecture',
    ratePerSqFt: 6500,
    specifications: [
      'Italian Statuario / Calacatta bookmatched marble',
      'Acoustic fluted walnut paneling & brass inlays',
      'Automated smart architectural magnetic track lighting',
      'Comprehensive turnkey MEP, HVAC & structural styling'
    ]
  }
};

export const BASE_PRICING = {
  CONSULTATION_FEE: 1500,
  MODULAR_KITCHEN_START: 120000,
  LUXURY_BEDROOM_START: 85000,
  MIN_SQFT: 100,
  MAX_SQFT: 20000
};

export interface CostEstimate {
  sanitizedSqft: number;
  ratePerSqFt: number;
  tierName: string;
  baseSqftCost: number;
  kitchenCost: number;
  bedroomCost: number;
  consultationFee: number;
  totalCost: number;
  formattedTotal: string;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateProjectCost(params: CostParams): CostEstimate {
  // Validate and sanitize square footage
  const rawSqft = Number(params.sqft);
  const sanitizedSqft = isNaN(rawSqft) || rawSqft <= 0 ? 0 : Math.min(rawSqft, BASE_PRICING.MAX_SQFT);

  const tier = DELHI_INTERIOR_TIERS[params.tierId] || DELHI_INTERIOR_TIERS.essential;
  const ratePerSqFt = tier.ratePerSqFt;

  const baseSqftCost = sanitizedSqft * ratePerSqFt;

  const kitchenQty = params.includeKitchen ? Math.max(1, params.kitchenCount || 1) : 0;
  const kitchenCost = kitchenQty * BASE_PRICING.MODULAR_KITCHEN_START;

  const bedroomQty = params.includeBedroom ? Math.max(1, params.bedroomCount || 1) : 0;
  const bedroomCost = bedroomQty * BASE_PRICING.LUXURY_BEDROOM_START;

  const consultationFee = params.consultationBooked ? BASE_PRICING.CONSULTATION_FEE : 0;

  const totalCost = baseSqftCost + kitchenCost + bedroomCost + consultationFee;

  return {
    sanitizedSqft,
    ratePerSqFt,
    tierName: tier.name,
    baseSqftCost,
    kitchenCost,
    bedroomCost,
    consultationFee,
    totalCost,
    formattedTotal: formatINR(totalCost)
  };
}
