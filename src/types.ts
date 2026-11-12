export interface BusinessProfile {
  name: string;
  shortName: string;
  tagline: string;
  brand1?: string;
  tagline1?: string;
  brand2?: string;
  tagline2?: string;
  motto?: string;
  slogan?: string;
  address: string;
  addressLine1: string;
  addressLine2: string;
  cityPincode: string;
  phoneRaw: string;
  phoneDisplay: string;
  callHref: string;
  whatsappHref: string;
  gpsNavigationHref: string;
  mapsEmbedUrl: string;
  googleRating: number;
  totalReviews: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  quote: string;
  location: string;
  verified: boolean;
  projectType: string;
}

export interface MaterialSample {
  id: string;
  name: string;
  category: string;
  finish: string;
  origin: string;
  sqftRateRange: string;
  description: string;
  accentColor: string;
  availableOnOrder?: boolean;
}

export interface ServiceTransformation {
  id: string;
  title: string;
  tagline: string;
  beforeImg: string;
  afterImg: string;
}

export interface MetroStation {
  name: string;
  distance: string;
}

