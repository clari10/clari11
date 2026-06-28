import React, { useState, useEffect, FormEvent } from 'react';
import { Check, ShoppingBag, Plus, Minus, ArrowLeft, MessageSquare, ChevronRight } from 'lucide-react';
import { Product, ThemeSettings } from '../types';

interface ProductViewProps {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string | null) => void;
  onAddToCart: (product: Product, quantity: number, grind: string, weight: string) => void;
  theme: ThemeSettings;
}

interface SensoryLog {
  id: string;
  reviewer: string;
  comment: string;
  rating: number;
  sensoryNotes: string[];
  date: string;
}

export default function ProductView({
  products,
  selectedProductId,
  onSelectProduct,
  onAddToCart,
  theme,
}: ProductViewProps) {
  const [filter, setFilter] = useState<'all' | 'best' | 'blend' | 'single' | 'decaf' | 'easy' | 'goods' | 'equipment'>('all');
  const [quantity, setQuantity] = useState(1);
  const [grindOption, setGrindOption] = useState('홀빈');
  const [weightOption, setWeightOption] = useState('250g');
  const [activeTab, setActiveTab] = useState<'profile' | 'brew' | 'origin'>('profile');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, 1, '홀빈', '250g');
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  // Sensory Log state (Local Reviews)
  const [sensoryLogs, setSensoryLogs] = useState<SensoryLog[]>([]);
  const [newReviewer, setNewReviewer] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [selectedReviewNotes, setSelectedReviewNotes] = useState<string[]>([]);

  const defaultLogsMap: Record<string, SensoryLog[]> = {
    'clarimento-pink-bourbon': [
      {
        id: '1',
        reviewer: 'Lars Nørgaard',
        comment: 'Unbelievably floral and sweet. Tastes like a clean cup of peach tea with a splash of orange juice. Roast profile is absolute perfection—no roast notes, only raw origin purity.',
        rating: 5,
        sensoryNotes: ['Floral', 'Peach', 'Sweet'],
        date: '2026-06-15'
      },
      {
        id: '2',
        reviewer: 'Eun-seo Kim',
        comment: 'Stunning extraction as filter on the V60. Pink bourbon is quickly becoming my favorite variety and Rodrigo Sanchez has crushed this processing batch.',
        rating: 5,
        sensoryNotes: ['Clean', 'Tea-like', 'Aromatic'],
        date: '2026-06-20'
      }
    ],
    'clarimento-thermal-shock-gesha': [
      {
        id: '3',
        reviewer: 'Sofia Dupont',
        comment: 'Absolutely legendary. Thermal shock creates an intense fruit bomb that smells like fresh passionfruit syrup right when you open the bag. Super rich, highly recommend.',
        rating: 5,
        sensoryNotes: ['Lychee', 'Fruit Bomb', 'Intense'],
        date: '2026-06-18'
      }
    ],
    'clarimento-nordic-espresso': [
      {
        id: '4',
        reviewer: 'Kenji Sato',
        comment: 'Finally, an espresso blend that does not taste burnt! Excellent milk integration—it taste like hazelnut chocolate shake. Perfect for sweet espresso fans.',
        rating: 4,
        sensoryNotes: ['Milk Chocolate', 'Sweet', 'Balanced'],
        date: '2026-06-25'
      }
    ]
  };

  // Resolve current active product if one is selected
  const currentProduct = products.find((p) => p.id === selectedProductId) || null;

  // Load sensory logs whenever active product changes
  useEffect(() => {
    if (currentProduct) {
      const saved = localStorage.getItem(`sensory_logs_${currentProduct.id}`);
      if (saved) {
        setSensoryLogs(JSON.parse(saved));
      } else {
        setSensoryLogs(defaultLogsMap[currentProduct.id] || []);
      }
      // Reset details config
      setQuantity(1);
      setGrindOption('홀빈');
      setWeightOption('250g');
    }
  }, [selectedProductId, currentProduct?.id]);

  const handleAddSensoryLog = (e: FormEvent) => {
    e.preventDefault();
    if (!currentProduct || !newReviewer.trim() || !newComment.trim()) return;

    const newLog: SensoryLog = {
      id: Date.now().toString(),
      reviewer: newReviewer,
      comment: newComment,
      rating: newRating,
      sensoryNotes: selectedReviewNotes.length > 0 ? selectedReviewNotes : ['Sweet'],
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newLog, ...sensoryLogs];
    setSensoryLogs(updated);
    localStorage.setItem(`sensory_logs_${currentProduct.id}`, JSON.stringify(updated));

    // Reset inputs
    setNewReviewer('');
    setNewComment('');
    setNewRating(5);
    setSelectedReviewNotes([]);
  };

  const toggleReviewNote = (note: string) => {
    if (selectedReviewNotes.includes(note)) {
      setSelectedReviewNotes(selectedReviewNotes.filter(n => n !== note));
    } else {
      setSelectedReviewNotes([...selectedReviewNotes, note]);
    }
  };

  const getRadiusClass = () => {
    switch (theme.buttonBorderRadius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'full': return 'rounded-full';
      default: return 'rounded-none';
    }
  };

  // Filter products based on selected tab
  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const grindOptions = ['홀빈', '핸드드립', '모카포트 분쇄'];
  const weightOptions = ['250g', '1kg'];

  // Detail rendering variables
  const displayedPrice = currentProduct ? currentProduct.price * (weightOption === '1kg' ? 3.5 : 1) : 0;

  const relatedProducts = currentProduct
    ? products
        .filter((p) => p.id !== currentProduct.id)
        .sort((a, b) => {
          if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1;
          if (a.category !== currentProduct.category && b.category === currentProduct.category) return 1;
          return 0;
        })
        .slice(0, 3)
    : [];

  // 1. GALLERY CATALOG VIEW (Sey Coffee Inspired Minimalist Layout)
  if (!currentProduct) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-12 md:space-y-16 animate-fade-in font-sans">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span 
            className="text-[10px] tracking-[0.4em] uppercase font-black block opacity-60"
            style={{ color: theme.accentColor }}
          >
            CURRENT SELECTIONS
          </span>
          <h1 
            style={{ 
              fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` 
            }}
            className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight"
          >
            Our Offerings
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-lg mx-auto">
            Seasonally curated fresh micro-lots, roasted with precise thermal metrics to reveal clear varietal and origin-specific flavour attributes.
          </p>
        </div>

        {/* Sey/Say Coffee-style Low-profile Navigation Filters */}
        <div className="overflow-x-auto scrollbar-none border-b border-neutral-200/40 pb-4">
          <div className="flex justify-start md:justify-center items-center gap-6 md:gap-8 min-w-max px-4 md:px-0 text-xs tracking-widest font-semibold">
            {[
              { id: 'all', label: '전체' },
              { id: 'best', label: '베스트' },
              { id: 'blend', label: '하우스블렌드' },
              { id: 'single', label: '싱글오리진' },
              { id: 'decaf', label: '디카페인' },
              { id: 'easy', label: '이지커피' },
              { id: 'goods', label: '굿즈' },
              { id: 'equipment', label: '추출용품' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`pb-2.5 transition-all duration-300 relative cursor-pointer whitespace-nowrap text-xs md:text-sm ${
                  filter === cat.id ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-700 font-medium'
                }`}
              >
                {cat.label}
                {filter === cat.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-950" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sey-inspired clean spacious grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              className="group cursor-pointer space-y-5 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div 
                style={{ backgroundColor: '#FAF9F6' }} // Warm organic ivory container background
                className="aspect-square w-full overflow-hidden border border-neutral-200/25 flex items-center justify-center transition-all duration-300 group-hover:border-neutral-300/60 relative"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
                
                {/* Micro badge indicator */}
                <div className="absolute top-4 left-4">
                  <span className="bg-neutral-900/90 text-[8px] uppercase tracking-widest font-bold text-white px-2 py-1">
                    {product.process.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Text Stack */}
              <div className="space-y-1 text-center md:text-left">
                {/* Region / Farm subtitle */}
                <span 
                  className="text-[9px] tracking-[0.3em] uppercase font-bold block"
                  style={{ color: theme.accentColor }}
                >
                  {product.origin.split(',')[0]} • {product.producer.split(' ')[0]}
                </span>

                {/* Main Product Name */}
                <h3 
                  style={{ 
                    fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` 
                  }}
                  className="text-lg md:text-xl font-normal text-neutral-900 tracking-tight transition-colors group-hover:opacity-80"
                >
                  {product.name}
                </h3>

                {/* Inherent Flavor Notes */}
                <p className="text-xs text-neutral-500 font-light leading-relaxed truncate max-w-sm">
                  {product.tastingNotes.join(' • ')}
                </p>

                {/* Low profile details row */}
                <div className="pt-2 flex items-center justify-between border-t border-neutral-200/30 text-[10px] uppercase tracking-wider text-neutral-400">
                  <span className="font-mono">${product.price.toFixed(2)} / {product.weight}</span>
                  <span className="text-neutral-900 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1 cursor-pointer">
                    Explore <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. PRODUCT DETAIL VIEW (Sleek minimalist style)
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-16 space-y-16 animate-fade-in font-sans">
      
      {/* Top action header */}
      <div className="flex items-center justify-between border-b border-neutral-200/50 pb-4">
        <button
          onClick={() => onSelectProduct(null)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-colors font-bold group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to offerings</span>
        </button>

        {/* Small quick pager links */}
        <div className="hidden sm:flex items-center gap-3 text-[10px] uppercase tracking-widest font-semibold text-neutral-400">
          <span>Shop</span>
          <span>/</span>
          <span className="text-neutral-900 font-bold">{currentProduct.name}</span>
        </div>
      </div>

      {/* Main product showcase columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Visual Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square bg-neutral-50 border border-neutral-200/40 overflow-hidden">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              style={{ borderRadius: theme.buttonBorderRadius === 'full' ? '12px' : '0px' }}
            />
            {/* Processing details card badge */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-neutral-900/90 text-[10px] text-white uppercase font-bold tracking-widest px-3 py-1">
                {currentProduct.process}
              </span>
            </div>
          </div>

          {/* Quick specs grid */}
          <div className="p-4 bg-stone-50 border border-neutral-200/40 rounded-xs grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Variety</span>
              <span className="text-xs font-semibold text-neutral-800">{currentProduct.variety}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Elevation</span>
              <span className="text-xs font-semibold text-neutral-800">{currentProduct.altitude}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Producer</span>
              <span className="text-xs font-semibold text-neutral-800 truncate block max-w-[120px] mx-auto">{currentProduct.producer}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">Origin</span>
              <span className="text-xs font-semibold text-neutral-800 truncate block max-w-[120px] mx-auto">{currentProduct.origin.split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div className="space-y-2">
            <span 
              className="text-[10px] tracking-[0.3em] uppercase font-bold block"
              style={{ color: theme.accentColor }}
            >
              Single-Origin Micro-Lot
            </span>
            <h1
              className="text-2.5xl md:text-4xl font-normal text-neutral-900 tracking-tight"
              style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
            >
              {currentProduct.name}
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">{currentProduct.subtitle}</p>
            <div className="pt-2 text-2xl font-semibold text-neutral-900 font-mono">
              ${displayedPrice.toFixed(2)}
            </div>
          </div>

          <hr className="border-neutral-200/50" />

          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans font-light">
            {currentProduct.description}
          </p>

          {/* Flavor Notes bubbles */}
          <div className="space-y-2">
            <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-wider">
              Tasting Profile Indicator
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentProduct.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  style={{
                    borderColor: theme.accentColor,
                    color: theme.primaryColor,
                    borderRadius: theme.buttonBorderRadius === 'full' ? '999px' : '0px'
                  }}
                  className="text-xs bg-white border px-3 py-1.5 font-mono tracking-tight font-semibold"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Sizing & Grind profile selectors */}
          <div className="space-y-4 pt-2">
            
            {/* Bag Packaging option */}
            <div className="space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                Select Packaging Size
              </span>
              <div className="grid grid-cols-2 gap-3">
                {weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setWeightOption(weight)}
                    className={`py-2.5 px-4 border text-xs text-center tracking-wider transition-all font-semibold ${
                      weightOption === weight
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 hover:border-neutral-400 text-neutral-700 bg-transparent'
                    }`}
                    style={{ borderRadius: '4px' }}
                  >
                    {weight === '1kg' ? 'Bulk 1.0kg Bag' : 'Standard 250g Bag'}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind profile options */}
            <div className="space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                Select Grind Profile
              </span>
              <div className="grid grid-cols-2 gap-2">
                {grindOptions.map((grind) => (
                  <button
                    key={grind}
                    onClick={() => setGrindOption(grind)}
                    className={`py-2 px-3 border text-xs text-left transition-all flex justify-between items-center ${
                      grindOption === grind
                        ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                        : 'border-neutral-200 hover:border-neutral-400 text-neutral-600 bg-transparent'
                    }`}
                    style={{ borderRadius: '4px' }}
                  >
                    <span>{grind}</span>
                    {grindOption === grind && <Check className="h-3.5 w-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add-to-bag controls section */}
          <div className="space-y-3 pt-3">
            <div className="flex gap-3">
              {/* Simple count incrementer */}
              <div className="flex items-center border border-neutral-300 rounded-xs bg-stone-50 overflow-hidden text-sm">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-3 hover:bg-neutral-200/40 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-3 font-mono font-bold text-center w-10">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-3 hover:bg-neutral-200/40 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Purchase button */}
              <button
                onClick={() => {
                  onAddToCart(currentProduct, quantity, grindOption, weightOption);
                  setQuantity(1); // reset counter
                }}
                style={{
                  backgroundColor: '#8f5ab0',
                  color: theme.backgroundColor,
                }}
                className={`flex-1 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs py-3 px-6 hover:opacity-95 shadow-xs hover:scale-[1.01] transition-transform ${getRadiusClass()}`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to bag • ${(displayedPrice * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs description panel */}
      <section className="bg-stone-50/70 border border-neutral-200/30 p-6 md:p-8 font-sans">
        <div className="flex border-b border-neutral-200 text-xs md:text-sm font-bold uppercase tracking-widest pb-3 gap-6">
          <button
            onClick={() => setActiveTab('profile')}
            style={{ color: activeTab === 'profile' ? theme.primaryColor : 'rgb(115, 115, 115)' }}
            className={`pb-1 transition-all border-b-2 ${activeTab === 'profile' ? 'border-neutral-900 font-extrabold' : 'border-transparent'}`}
          >
            Sensory Profile
          </button>
          <button
            onClick={() => setActiveTab('brew')}
            style={{ color: activeTab === 'brew' ? theme.primaryColor : 'rgb(115, 115, 115)' }}
            className={`pb-1 transition-all border-b-2 ${activeTab === 'brew' ? 'border-neutral-900 font-extrabold' : 'border-transparent'}`}
          >
            V60 Brewing Recipe
          </button>
          <button
            onClick={() => setActiveTab('origin')}
            style={{ color: activeTab === 'origin' ? theme.primaryColor : 'rgb(115, 115, 115)' }}
            className={`pb-1 transition-all border-b-2 ${activeTab === 'origin' ? 'border-neutral-900 font-extrabold' : 'border-transparent'}`}
          >
            BEHIND THE NUMBERING
          </button>
        </div>

        {/* Tab content 1: Sensory graphs/meters */}
        {activeTab === 'profile' && (
          <div className="py-6 space-y-6 max-w-2xl">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Sensory Index Indicators</h4>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Roast Profile Degree</span>
                  <span style={{ color: theme.accentColor }}>
                    {currentProduct.roastLevel === 1 ? 'Nordic Light' : currentProduct.roastLevel === 2 ? 'Filter Light-Medium' : 'Sweet Espresso'}
                  </span>
                </div>
                <div className="flex gap-1 h-1.5 w-full bg-neutral-200 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className="flex-1 transition-colors duration-300"
                      style={{
                        backgroundColor: level <= currentProduct.roastLevel ? theme.accentColor : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Bright Acidity</span>
                  <span>{currentProduct.acidity}/5 (Sparkling & Clean)</span>
                </div>
                <div className="flex gap-1 h-1.5 w-full bg-neutral-200 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className="flex-1 transition-colors"
                      style={{
                        backgroundColor: level <= currentProduct.acidity ? theme.primaryColor : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Inherent Sweetness</span>
                  <span>{currentProduct.sweetness}/5 (Very Honeyed)</span>
                </div>
                <div className="flex gap-1 h-1.5 w-full bg-neutral-200 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className="flex-1 transition-colors"
                      style={{
                        backgroundColor: level <= currentProduct.sweetness ? theme.accentColor : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Slurry Mouthfeel / Body</span>
                  <span>{currentProduct.body}/5 (Tea-like / Creamy)</span>
                </div>
                <div className="flex gap-1 h-1.5 w-full bg-neutral-200 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className="flex-1 transition-colors"
                      style={{
                        backgroundColor: level <= currentProduct.body ? theme.primaryColor : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 2: Brew steps */}
        {activeTab === 'brew' && (
          <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 md:border-r border-neutral-200/50 pr-6">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Extraction Metrics</h4>
              <ul className="space-y-2 text-xs font-mono">
                <li className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="opacity-70">Ratio</span>
                  <span className="font-bold">{currentProduct.brewGuide.ratio}</span>
                </li>
                <li className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="opacity-70">Grind Size</span>
                  <span className="font-bold">{currentProduct.brewGuide.grind}</span>
                </li>
                <li className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="opacity-70">Water Temp</span>
                  <span className="font-bold">{currentProduct.brewGuide.waterTemp}</span>
                </li>
                <li className="flex justify-between border-b border-neutral-100 pb-1.5">
                  <span className="opacity-70">Target Time</span>
                  <span className="font-bold">{currentProduct.brewGuide.time}</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Pour-over sequence</h4>
              <ol className="space-y-3.5 text-xs">
                {currentProduct.brewGuide.instructions.map((inst, index) => (
                  <li key={index} className="flex gap-3.5 items-start">
                    <span
                      style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
                      className="flex h-5 w-5 rounded-full items-center justify-center text-[10px] font-bold font-mono mt-0.5 shrink-0"
                    >
                      {index + 1}
                    </span>
                    <p className="opacity-80 leading-relaxed pt-0.5">{inst}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Tab content 3: Origin details */}
        {activeTab === 'origin' && (
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Terroir Characteristics</h4>
              <p className="opacity-80">
                The lot is harvested in <strong>{currentProduct.origin}</strong>. The unique temperature variations between warm sunny afternoons and icy mountain breezes encourage micro-cells within the cherry pulp to store exceptionally high sugar concentrations.
              </p>
              <ul className="space-y-2 font-mono text-[11px]">
                <li><span className="opacity-60 block">ELEVATION</span> {currentProduct.altitude}</li>
                <li><span className="opacity-60 block">HARVEST CYCLE</span> Hand-picked dry season</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Processing Methodology</h4>
              <p className="opacity-85">
                Processed via <strong>{currentProduct.process}</strong>. Clarimento ensures that our raw growers maintain closed anaerobic environments monitored via oxygen content and Brix meter levels, yielding high chemical consistency year on year.
              </p>
              <ul className="space-y-2 font-mono text-[11px]">
                <li><span className="opacity-60 block">PRODUCER</span> {currentProduct.producer}</li>
                <li><span className="opacity-60 block">TAXONOMY</span> {currentProduct.variety} Specialty Lot</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Related Products Section */}
      <section className="space-y-8 font-sans pt-12 border-t border-neutral-100">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span 
            className="text-[9px] tracking-[0.4em] uppercase font-black block opacity-60 text-neutral-400"
          >
            SENSORY ALIGNMENT
          </span>
          <h3 
            style={{ 
              fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` 
            }}
            className="text-xl font-light tracking-tight text-neutral-900"
          >
            Related Offerings
          </h3>
          <p className="text-xs text-neutral-400 font-light max-w-md mx-auto">
            Discover other seasonal micro-lots with similar pristine profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 pt-4">
          {relatedProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => {
                onSelectProduct(product.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer space-y-3 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div 
                style={{ backgroundColor: '#FAF9F6' }}
                className="aspect-square w-full overflow-hidden border border-neutral-200/25 flex items-center justify-center transition-all duration-300 group-hover:border-neutral-300/60 relative"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
                
                {/* Process Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-neutral-900/90 text-[8px] uppercase tracking-widest font-bold text-white px-2 py-0.5">
                    {product.process.split(' ')[0]}
                  </span>
                </div>

                {/* Hover Quick Add to Cart (One Half Style Slide-up) */}
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-full py-3 bg-neutral-950/95 hover:bg-neutral-900 text-white text-[9px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span>담김 ✔</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3 w-3" />
                        <span>장바구니 담기</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description Block */}
              <div className="text-center space-y-1.5 pt-2">
                <h4 
                  style={{ 
                    fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` 
                  }}
                  className="text-xs md:text-sm font-normal text-neutral-800 tracking-tight transition-colors group-hover:text-neutral-500"
                >
                  {product.name}
                </h4>

                <div className="text-[10px] text-neutral-500 font-mono">
                  ${product.price.toFixed(2)} USD
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
