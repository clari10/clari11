import React, { useState } from 'react';
import { ArrowRight, Sparkles, MapPin, Eye, Compass, Heart, Calendar } from 'lucide-react';
import { Product, ThemeSettings } from '../types';

interface HomeViewProps {
  products: Product[];
  onNavigateToProduct: (productId: string) => void;
  onNavigateToWholesale: () => void;
  onNavigateToSubscriptions: () => void;
  theme: ThemeSettings;
  onOpenCustomizer: () => void;
}

export default function HomeView({
  products,
  onNavigateToProduct,
  onNavigateToWholesale,
  onNavigateToSubscriptions,
  theme,
  onOpenCustomizer,
}: HomeViewProps) {
  // Brand Image URLs
  const heroImage = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop"; // Rich coffee details
  const secondaryImage = "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop"; // Premium kettle pour

  const getRadiusClass = () => {
    switch (theme.buttonBorderRadius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'full': return 'rounded-full';
      default: return 'rounded-none';
    }
  };

  const getFontFamily = () => {
    switch (theme.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans': return 'font-sans';
      default: return 'font-sans';
    }
  };

  return (
    <div className={`space-y-16 md:space-y-24 pb-20 ${getFontFamily()} animate-fade-in`}>
      
      {/* 1. Hero Block (One Half Inspired Full-Width Minimalist Section) */}
      <section className="relative px-6 pt-4">
        <div 
          className="relative w-full aspect-[21/10] min-h-[460px] md:min-h-[580px] overflow-hidden flex flex-col justify-between p-8 md:p-16 text-white border"
          style={{ borderColor: `${theme.accentColor}20` }}
        >
          {/* Background image & gradient overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Clarimento Premium Roast Labs"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-[1.01]"
            />
            {/* Elegant deep purple/violet gradient overlay to map theme colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#180A2B]/85 via-[#1E0E35]/65 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Top content (small tag) */}
          <div className="relative z-10 flex justify-between items-center">
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#E9D5FF] bg-purple-950/45 px-3 py-1.5 border border-purple-800/30">
              ● Seoul Specialty Roasters
            </span>
            <span className="hidden md:inline-block text-[10px] tracking-[0.2em] font-mono opacity-80 text-white/90">
              EST. 2026 // BATCH NO. 04
            </span>
          </div>

          {/* Bottom content (Header and buttons) */}
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.35em] uppercase font-bold text-[#D8B4FE] block">
                clarimento roast science
              </span>
              <h1
                style={{ 
                  fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif`,
                  lineHeight: '1.15'
                }}
                className="text-4xl md:text-6xl font-light tracking-tight text-white"
              >
                Where Volatile Florals Bloom.
              </h1>
              <p className="text-xs md:text-sm opacity-90 font-light max-w-lg leading-relaxed">
                Clarimento captures the delicate duality of volcanic soil and meticulous anaerobic fermentation. Pure light roast, high transparency, directly sourced.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                id="hero-shop-all-btn"
                onClick={() => onNavigateToProduct('clarimento-pink-bourbon')}
                style={{ backgroundColor: theme.accentColor, color: '#ffffff' }}
                className={`px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold hover:opacity-95 transition-all shadow-md hover:translate-y-[-1px] active:translate-y-[0px] ${getRadiusClass()}`}
              >
                Shop Single Origin
              </button>
              <button
                id="hero-wholesale-btn"
                onClick={onNavigateToWholesale}
                className={`px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold border border-white/60 text-white hover:bg-white/10 transition-colors ${getRadiusClass()}`}
              >
                Wholesale Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Statement: Big Bold Minimal Typographic Card (One Half Core Style) */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6 py-8">
        <span 
          className="text-[10px] tracking-[0.5em] uppercase font-bold text-neutral-400 block"
          style={{ color: theme.accentColor }}
        >
          the dualism of craft & parameter
        </span>
        <h2
          style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
          className="text-2xl md:text-4.5xl font-extralight tracking-tight leading-[1.4] text-neutral-800"
        >
          “WE ARE DESIGNERS PURSUING THE MAXIMUM REFRACTIVE CLARITY OF A SINGLE SEED.”
        </h2>
        <div className="w-12 h-[2px] mx-auto" style={{ backgroundColor: theme.accentColor }} />
        <p className="text-xs md:text-sm max-w-xl mx-auto opacity-75 leading-relaxed font-light">
          Clarimento explores post-harvest processing as a variable, not an accident. By pairing volcanic elevations above 1,700m with precise temperature-monitored yeast fermentation, we preserve the transparent sweetness of the coffee cherry.
        </p>
      </section>

      {/* 3. Product Catalog Grid: Premium Cards with Violet Accents */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-200/50 pb-4 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-400 block">
              Direct Trade Releases
            </span>
            <h3
              style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
              className="text-2xl md:text-3.5xl font-bold tracking-tight text-neutral-900 mt-1"
            >
              Curated Origin Lots
            </h3>
          </div>
          <button
            id="curated-view-all-btn"
            onClick={() => onNavigateToProduct('clarimento-pink-bourbon')}
            style={{ color: theme.accentColor }}
            className="text-xs font-bold tracking-widest uppercase hover:opacity-80 transition-opacity flex items-center gap-2 pl-1"
          >
            <span>Browse All Coffee ({products.length})</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p) => (
            <div
              id={`product-card-${p.id}`}
              key={p.id}
              onClick={() => onNavigateToProduct(p.id)}
              className="group cursor-pointer flex flex-col justify-between border border-neutral-200/50 p-5 transition-all duration-300 hover:shadow-lg bg-white"
              style={{
                borderRadius: theme.buttonBorderRadius === 'full' ? '12px' : '0px',
              }}
            >
              {/* Image box */}
              <div className="relative aspect-square overflow-hidden bg-stone-50 border border-neutral-100 mb-5">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span
                    style={{ backgroundColor: theme.accentColor, color: '#FFFFFF' }}
                    className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1"
                  >
                    {p.process.split(' ')[0]}
                  </span>
                  <span className="bg-purple-100 text-purple-900 text-[9px] font-bold tracking-wider px-2 py-0.5 border border-purple-200">
                    {p.variety}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[10px] font-mono font-medium px-2 py-0.5 shadow-sm">
                  {p.altitude}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="text-base font-bold tracking-tight text-neutral-900 leading-snug group-hover:underline">
                    {p.name}
                  </h4>
                  <span className="text-base font-extrabold" style={{ color: theme.accentColor }}>
                    ${p.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 leading-normal font-light line-clamp-2">{p.subtitle}</p>

                {/* Tasting profile pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-purple-50 text-purple-700 px-2 py-0.5 font-mono border border-purple-100"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer details */}
              <div className="border-t border-neutral-100 mt-5 pt-3.5 flex justify-between items-center text-xs text-neutral-500">
                <span className="font-mono text-[10px]">Filter Profile</span>
                <span className="font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform" style={{ color: theme.accentColor }}>
                  View Details <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Subscriptions Section (Say/Sey Coffee Inspired) */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image with low-profile frame */}
        <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden border border-neutral-200/40">
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop"
            alt="Say/Sey style signature coffee subscription roasting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs py-1 px-2.5 text-[9px] font-mono tracking-widest text-neutral-800 uppercase border border-neutral-200/50">
            ● Say subscription
          </div>
        </div>

        {/* Right: Short content + view more button */}
        <div className="space-y-6 md:pr-6">
          <div className="space-y-2">
            <span 
              className="text-[10px] tracking-[0.4em] uppercase font-bold block"
              style={{ color: theme.accentColor }}
            >
              SAY COFFEE SUBSCRIPTION
            </span>
            <h3
              style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
              className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900 leading-tight"
            >
              정기 구독 서비스
            </h3>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed font-light">
            전 세계 마이크로 롯 싱글 오리진 생두만을 선별하여 가장 완벽한 라이트 로스트 프로파일로 매달 집 앞까지 신선하게 배송해 드립니다. 세이 커피만의 탁월하고 독창적인 컵 프로파일을 온전히 경험해 보세요.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToSubscriptions}
              style={{
                borderColor: theme.primaryColor,
                color: theme.primaryColor,
              }}
              className={`px-6 py-3 text-xs tracking-widest uppercase font-bold border hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all duration-300 flex items-center gap-2 cursor-pointer ${getRadiusClass()}`}
            >
              <span>구독 안내 더보기</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>



    </div>
  );
}
