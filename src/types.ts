export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  weight: string; // e.g. "250g", "1kg"
  origin: string; // e.g. "Colombia, Huila"
  producer: string; // e.g. "Rodrigo Sanchez"
  altitude: string; // e.g. "1,750m - 1,800m"
  variety: string; // e.g. "Pink Bourbon"
  process: string; // e.g. "Double Anaerobic Honey"
  roastLevel: number; // 1 to 5 (light to medium-dark)
  acidity: number; // 1 to 5
  body: number; // 1 to 5
  sweetness: number; // 1 to 5
  tastingNotes: string[]; // e.g. ["Peach", "Bergamot", "Honey", "Earl Grey"]
  description: string;
  brewGuide: {
    ratio: string;
    grind: string;
    waterTemp: string;
    time: string;
    instructions: string[];
  };
  image: string;
  isAvailable: boolean;
  category: 'best' | 'blend' | 'single' | 'decaf' | 'easy' | 'goods' | 'equipment';
}

export interface CartItem {
  product: Product;
  quantity: number;
  grindOption: string; // e.g., "Whole Bean", "Espresso", "Filter", "French Press"
  weightOption: string; // e.g., "250g", "1kg"
}

export interface WholesaleForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  businessType: string; // Café, Restaurant, Hotel, Office, Retailer, Other
  monthlyVolume: string; // <5kg, 5-15kg, 15-30kg, 30-50kg, 50kg+
  message: string;
}

export interface User {
  email: string;
  name: string;
}

export interface ThemeSettings {
  // Typography
  fontFamily: 'serif' | 'sans' | 'mono';
  headingFont: string;
  bodyFont: string;

  // Colors
  primaryColor: string; // e.g., "#121212"
  backgroundColor: string; // e.g., "#F9F6F0" (warm sand / bone)
  accentColor: string; // e.g., "#D4AF37" or "#9A7B56" (warm gold / brass)
  textColor: string; // e.g., "#2A2725"
  cardBackgroundColor: string; // e.g., "#FFFFFF"
  announcementBarColor: string; // e.g., "#EFEAE2"
  announcementBarTextColor: string; // e.g., "#4E4B42"

  // Layout & Styling
  announcementText: string;
  showAnnouncementBar: boolean;
  buttonBorderRadius: 'none' | 'sm' | 'md' | 'full';
  headerStyle: 'classic' | 'minimal' | 'bold';
  enableAnimations: boolean;
}
