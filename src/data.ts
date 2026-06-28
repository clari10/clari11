import { Product, ThemeSettings } from './types';

// Let's use our generated images properly in the products.
// Product 1 will use the generated coffee product beans image!
// Other products can use standard beautiful visual fallback seeds or the barista pour over.
export const PRODUCTS: Product[] = [
  {
    id: 'clarimento-thermal-shock-gesha',
    name: 'El Paraiso Thermal Shock Gesha',
    subtitle: 'Colombia • Diego Bermudez • El Paraiso',
    price: 36.00,
    weight: '250g',
    origin: 'Colombia, Cauca, Piendamó',
    producer: 'Diego Bermudez',
    altitude: '1,930m',
    variety: 'Gesha',
    process: 'Thermal Shock Anaerobic',
    roastLevel: 1, // Light Roast
    acidity: 5,
    body: 4,
    sweetness: 5,
    tastingNotes: ['Lychee Fruit', 'Pink Raspberry', 'Passionfruit Curd', 'White Chocolate'],
    description: 'Diego Bermudez is legendary for his meticulous, scientific control over coffee fermentation. This rare Gesha lot undergoes anaerobic fermentation with active dry yeast, followed by a thermal-shock process (hot water flush then ice water bath) to lock in volatile esters. Expect an explosion of ripe lychee, raspberry sorbet, and a creamy, white chocolate mouthfeel.',
    brewGuide: {
      ratio: '1:15.5 (16g coffee to 248g water)',
      grind: 'Medium (resembling table salt)',
      waterTemp: '92°C (198°F)',
      time: '2:45 minutes',
      instructions: [
        'Bloom with 50g of water for 40 seconds.',
        'Perform a rapid circular pour up to 150g by 1:15.',
        'Allow the bed to drain slightly, then pour remaining water to 248g in center circles by 2:00.',
        'A single gentle stir of the slurry to encourage even extraction.'
      ]
    },
    image: '/src/assets/images/clarimento_barista_drip_1782623538953.jpg',
    isAvailable: true,
    category: 'best'
  },
  {
    id: 'clarimento-nordic-espresso',
    name: 'Nordic Roast Espresso Blend',
    subtitle: 'Ethiopia Sidama & El Salvador Pacas',
    price: 19.50,
    weight: '250g',
    origin: '50% Ethiopia Sidama Natural / 50% El Salvador Pacas Washed',
    producer: 'Various Smallholder Cooperatives',
    altitude: '1,500m - 2,100m',
    variety: 'Heirloom & Pacas',
    process: 'Blended Natural & Washed',
    roastLevel: 3, // Medium-Light (Sweet Espresso)
    acidity: 3,
    body: 4,
    sweetness: 4,
    tastingNotes: ['Milk Chocolate', 'Orange Zest', 'Toasted Hazelnut', 'Red Currant'],
    description: 'Designed for those who crave natural sweetness and elegant structure in their daily espresso. We combine high-grown natural Ethiopia for delicate fruit aromatics and washed El Salvador for chocolatey structure and deep sweetness. Roasted to an precise degree where acidity is balanced, producing a thick, syrupy espresso that sings both black and in milk.',
    brewGuide: {
      ratio: '1:2.2 (18g dry dose to 40g wet espresso yield)',
      grind: 'Fine (Espresso grind)',
      waterTemp: '93°C (199°F)',
      time: '26 - 30 seconds',
      instructions: [
        'Distribute 18.0 grams of finely ground coffee evenly in an 18g basket.',
        'Tamp level and firmly to avoid channeling.',
        'Extract 40.0 grams of liquid espresso in 27 seconds.',
        'Stir the espresso thoroughly before sipping to homogenize the crema and body.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    isAvailable: true,
    category: 'blend'
  },
  {
    id: 'clarimento-pink-bourbon',
    name: 'Sustainable Pink Bourbon',
    subtitle: 'Colombia • Rodrigo Sanchez • Monteblanco',
    price: 24.00,
    weight: '250g',
    origin: 'Colombia, Huila, San Adolfo',
    producer: 'Rodrigo Sanchez',
    altitude: '1,730m - 1,850m',
    variety: 'Pink Bourbon',
    process: 'Double Anaerobic Honey',
    roastLevel: 1, // Light Roast
    acidity: 4,
    body: 3,
    sweetness: 5,
    tastingNotes: ['White Peach', 'Bergamot Orange', 'Earl Grey Tea', 'Wild Honey'],
    description: 'A stellar showcase of the Pink Bourbon variety under innovative processing. Rodrigo Sanchez utilizes cold fermentation and double-anaerobic seals to lock in bright, floral aromatics. The cup is incredibly clean, reminiscent of elegant Earl Grey tea sweetened with honey, ending with a lingering fresh peach notes. Perfectly roasted for filter brewing with high clarity and sweetness.',
    brewGuide: {
      ratio: '1:16 (15g coffee to 240g water)',
      grind: 'Medium-Coarse (resembling sea salt)',
      waterTemp: '94°C (201°F)',
      time: '3:00 minutes',
      instructions: [
        'Pour 40g of water to bloom the coffee bed for 45 seconds, gently swirling the vessel.',
        'At 0:45, pour continuously up to 140g in circular motions to agitate the ground.',
        'At 1:30, pour gently in the center up to 240g, maintaining a stable stream.',
        'Let the water draw down completely. Aim for total brew completion by 3:00.'
      ]
    },
    image: '/src/assets/images/clarimento_product_beans_1782623519511.jpg',
    isAvailable: true,
    category: 'single'
  },
  {
    id: 'clarimento-decaf-guatemala',
    name: 'Guatemala CO2 Organic Decaf',
    subtitle: 'Guatemala • Huehuetenango Organic Lot',
    price: 22.00,
    weight: '250g',
    origin: 'Guatemala, Huehuetenango',
    producer: 'Asociación Todos Santerita',
    altitude: '1,650m',
    variety: 'Caturra & Bourbon',
    process: 'Liquid CO2 Decaffeination',
    roastLevel: 2,
    acidity: 2,
    body: 4,
    sweetness: 4,
    tastingNotes: ['Maple Syrup', 'Red Apple', 'Roasted Almond', 'Milk Chocolate'],
    description: 'A premium decaffeinated coffee processed with natural liquid carbon dioxide. This gentle method selectively targets caffeine while preserving the delicate origin lipids and proteins, yielding an incredibly rich, sweet, and complex cup without any chemical aftertaste. Perfect for evening filter brews.',
    brewGuide: {
      ratio: '1:15 (16g coffee to 240g water)',
      grind: 'Medium',
      waterTemp: '93°C (199°F)',
      time: '2:50 minutes',
      instructions: [
        'Bloom with 45g of water for 45 seconds.',
        'At 0:45, pour up to 140g.',
        'At 1:25, pour up to 240g with a slow, centered stream.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop',
    isAvailable: true,
    category: 'decaf'
  },
  {
    id: 'clarimento-easy-drip',
    name: 'Easy Filter Drip Bag (10-Pack)',
    subtitle: 'Pre-ground Specialty Drip Packets',
    price: 18.00,
    weight: '10 Bags',
    origin: 'Ethiopia & Colombia Blend',
    producer: 'Clarimento Labs',
    altitude: '1,700m+',
    variety: 'Mixed Heirloom Varieties',
    process: 'Mixed Process',
    roastLevel: 1,
    acidity: 4,
    body: 3,
    sweetness: 4,
    tastingNotes: ['Jasmine Tea', 'Lemon Zest', 'Stone Fruit', 'Brown Sugar'],
    description: 'Specially designed filter bags pre-packed with freshly ground Clarimento coffee, flushed with nitrogen to keep individual packets perfectly fresh. Ideal for traveling, office setups, or effortless mornings. Simply open, hang over your cup, and pour hot water.',
    brewGuide: {
      ratio: '150g - 180g of hot water',
      grind: 'Pre-ground Medium-Fine',
      waterTemp: '92°C - 95°C',
      time: '2:00 minutes',
      instructions: [
        'Tear open the drip bag along the indicated line.',
        'Stretch the paper hangers and secure them firmly onto your cup rim.',
        'Slowly pour 30g of hot water to wet the grinds, wait 20 seconds.',
        'Pour remaining water in 2-3 slow stages up to the cup limit.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
    isAvailable: true,
    category: 'easy'
  },
  {
    id: 'clarimento-mug',
    name: 'Clarimento Minimalist Logo Mug',
    subtitle: 'Handcrafted Ceramic Matte Cup',
    price: 28.00,
    weight: '320ml',
    origin: 'Copenhagen Studio',
    producer: 'Studio Nordhavn Ceramics',
    altitude: 'N/A',
    variety: 'Matte Glazed Clay',
    process: 'Kiln Fired (1,250°C)',
    roastLevel: 1,
    acidity: 1,
    body: 5,
    sweetness: 1,
    tastingNotes: ['Elegant Hold', 'Thermal Retention', 'Minimal Aesthetics'],
    description: 'An elegant, ergonomic ceramic cup custom-designed for the ultimate tactile sensory experience. Hand-thrown by local artisans in Copenhagen. Features a subtle matte sand texture on the exterior with a signature light lavender glazed interior to celebrate the coffee spectrum in style.',
    brewGuide: {
      ratio: 'N/A',
      grind: 'N/A',
      waterTemp: 'Dishwasher Safe',
      time: 'Durable Build',
      instructions: [
        'Pre-warm the mug with hot water before pouring your brewed coffee.',
        'Enjoy the unique thermal retention and tactile feel of handcrafted clay.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=1000&auto=format&fit=crop',
    isAvailable: true,
    category: 'goods'
  },
  {
    id: 'clarimento-dripper',
    name: 'Clarimento Precision Dripper V1',
    subtitle: 'Flat-Bottom Glass Extraction Dripper',
    price: 45.00,
    weight: '1-2 Cups',
    origin: 'Tokyo design lab',
    producer: 'Clarimento Equipment Lab',
    altitude: 'N/A',
    variety: 'Borosilicate Glass & Brass',
    process: 'Bespoke Hand-Blown',
    roastLevel: 1,
    acidity: 1,
    body: 1,
    sweetness: 1,
    tastingNotes: ['Even Extraction', 'Zero Bypass', 'Thermal Stability'],
    description: 'A scientific flat-bottom dripper featuring a unique internal geometry designed to optimize water contact and ensure extremely uniform extraction rates. Ideal for bringing out the highly complex, delicate fruity acid structures of light-roasted geishas.',
    brewGuide: {
      ratio: 'Use with Clarimento wave filters',
      grind: 'N/A',
      waterTemp: 'High Heat Resistance',
      time: 'Optimal Flow Rate',
      instructions: [
        'Place on your server and insert a flat-bottom paper filter.',
        'Rinse the paper thoroughly with hot water to wash away paper residue.',
        'Add ground coffee and proceed with your favorite brewing sequence.'
      ]
    },
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1000&auto=format&fit=crop',
    isAvailable: true,
    category: 'equipment'
  }
];

export const THEME_PRESETS: { name: string; settings: ThemeSettings }[] = [
  {
    name: 'Clarimento White & Violet (Default)',
    settings: {
      fontFamily: 'sans',
      headingFont: 'Assistant',
      bodyFont: 'Assistant',
      primaryColor: '#1F1235', // Rich deep violet-black
      backgroundColor: '#FFFFFF', // Clean elegant white
      accentColor: '#7C3AED', // Chic vibrant purple / royal violet
      textColor: '#2D2240', // Soft deep plum-charcoal
      cardBackgroundColor: '#FAF8FF', // Soft lavender-white tint
      announcementBarColor: '#E6E0FA', // Pastel light purple
      announcementBarTextColor: '#1F1235', // Deep violet-black for readable contrast
      announcementText: 'We ship out orders every Tuesday & Wednesday. With the deadline for ordering on Sundays at 18:00 (CET).',
      showAnnouncementBar: true,
      buttonBorderRadius: 'none', // Ultra-minimalist square border look
      headerStyle: 'minimal',
      enableAnimations: true
    }
  },
  {
    name: 'One Half Warm Editorial',
    settings: {
      fontFamily: 'sans',
      headingFont: 'Assistant',
      bodyFont: 'Assistant',
      primaryColor: '#262522', // Deep charcoal-brown
      backgroundColor: '#F5EFE6', // Warm sand / cream
      accentColor: '#9A7B56', // Warm bronze/gold
      textColor: '#3A3834', // Soft dark charcoal
      cardBackgroundColor: '#FBF9F6', // Lighter warm cream
      announcementBarColor: '#9A7B56', // Warm bronze/gold
      announcementBarTextColor: '#FFFFFF',
      announcementText: 'We ship out orders every Tuesday & Wednesday. With the deadline for ordering on Sundays at 18:00 (CET).',
      showAnnouncementBar: true,
      buttonBorderRadius: 'none', // Strictly minimalist / square
      headerStyle: 'minimal',
      enableAnimations: true
    }
  },
  {
    name: 'Nordic Geometric (Futura Inspired)',
    settings: {
      fontFamily: 'sans',
      headingFont: 'Assistant',
      bodyFont: 'Assistant',
      primaryColor: '#1A1D20', // Jet black
      backgroundColor: '#FAFAFA', // Ultra-clean white
      accentColor: '#7C3AED', // Royal violet
      textColor: '#2D3748', // Charcoal
      cardBackgroundColor: '#FFFFFF',
      announcementBarColor: '#1A1D20', // Clean black
      announcementBarTextColor: '#FFFFFF',
      announcementText: 'We ship out orders every Tuesday & Wednesday. With the deadline for ordering on Sundays at 18:00 (CET).',
      showAnnouncementBar: true,
      buttonBorderRadius: 'sm',
      headerStyle: 'classic',
      enableAnimations: true
    }
  }
];

export const DEFAULT_THEME_SETTINGS: ThemeSettings = THEME_PRESETS[0].settings;
