import React from 'react';
import { MapPin, ArrowRight, Heart, Sparkles, Coffee, Users, Target, Compass } from 'lucide-react';
import { ThemeSettings } from '../types';

interface AboutViewProps {
  theme: ThemeSettings;
}

export default function AboutView({ theme }: AboutViewProps) {
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
    <div className={`space-y-20 md:space-y-32 pb-24 ${getFontFamily()} animate-fade-in`}>
      
      {/* 1. Immersive Hero Banner (Inspired by Momos Coffee's grand nature-connected aesthetic) */}
      <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-neutral-900">
        <img 
          src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop" 
          alt="Lush green coffee origin canopy"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/45 to-neutral-950/30" />
        
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-6">
          <span 
            style={{ color: theme.accentColor }}
            className="text-xs md:text-sm tracking-[0.4em] uppercase font-bold block animate-pulse"
          >
            Specialty Coffee for Everyone
          </span>
          <h1 
            style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
            className="text-3xl md:text-6xl font-light tracking-tight text-white leading-tight"
          >
            모두를 위한 스페셜티 커피,<br className="hidden md:inline" /> 
            클라리멘토의 집념과 여정
          </h1>
          <p className="text-xs md:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            한 잔의 커피가 일상에 전하는 은은하고 작은 파동. 
            생두 수확부터 한 잔의 컵에 정성이 완벽하게 도달할 때까지, 
            클라리멘토의 멈추지 않는 지속 가능성과 겸손한 고찰을 소개합니다.
          </p>
        </div>
      </section>

      {/* 2. Core Philosophy Intro */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <p className="text-xs font-mono tracking-widest text-neutral-400 font-bold uppercase">
          OUR BELIEF
        </p>
        <h2 
          style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
          className="text-2xl md:text-4xl font-light tracking-tight text-neutral-900 leading-snug"
        >
          "커피 한 잔을 마시는 순간만큼은<br />
          지친 삶에 온전한 쉼표가 되기를 소망합니다."
        </h2>
        <div className="h-0.5 w-12 mx-auto" style={{ backgroundColor: theme.accentColor }} />
        <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
          클라리멘토는 스페인어로 '밝고 선명한 빛'을 뜻합니다. 커피가 가진 본연의 다채로운 테루아와 플레이버를 
          왜곡 없이 선명하게 발현하여 일상 속 가치 있는 감각적 경험과 평온한 사유의 시공간을 전달하고자 합니다.
        </p>
      </section>

      {/* 3. Alternating Story Sections (Direct inspired by Momos style layout & content) */}
      <div className="space-y-24 md:space-y-36">

        {/* Story 1: Direct Sourcing & Sincere Origin Partnerships */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <span 
              className="text-[10px] tracking-[0.35em] uppercase font-bold block"
              style={{ color: theme.accentColor }}
            >
              01. SUSTAINABLE DIRECT TRADE
            </span>
            <h3 
              style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
              className="text-2xl md:text-4.5xl font-light tracking-tight text-neutral-900 leading-tight"
            >
              상생 무역, 산지의 진심에서<br />
              시작하는 선순환
            </h3>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
              좋은 커피의 기본은 건강한 토양과 생산자의 행복에서 출발합니다. 클라리멘토는 매 수확기마다 
              콜롬비아, 에티오피아 등의 우수한 농가를 직접 방문하여 상호 지속 가능한 신뢰를 바탕으로 한 
              직거래(Direct Trade) 관계를 맺어옵니다. 
            </p>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
              생산량 유지를 위한 기술 지원은 물론, 정당한 대가 지불을 넘어서는 환경 보호 및 농가 커뮤니티 발전을 위한 
              기금을 직접 전달하여, 커피 한 잔에 깃든 가치 사슬 전체가 선하고 지속 가능한 순환을 그리도록 만듭니다.
            </p>
            <div className="border-l border-neutral-200 pl-4 py-1 text-xs text-neutral-400 italic font-mono">
              "We trade not just specialty beans, but mutual respect and shared dreams."
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden border border-neutral-200/50 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=1200&auto=format&fit=crop" 
                alt="Coffee harvesting process at farm origin"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs py-1.5 px-3 text-[9px] font-mono tracking-wider text-neutral-600 border border-neutral-150">
                Colombia Tolima Micro-Lot Harvest
              </div>
            </div>
          </div>
        </section>

        {/* Story 2: Scientific & Data-Driven Roasting */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden border border-neutral-200/50 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1200&auto=format&fit=crop" 
                alt="Scientific coffee roasting and monitoring"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs py-1.5 px-3 text-[9px] font-mono tracking-wider text-neutral-600 border border-neutral-150">
                Data Integration via Cropster ROR
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <span 
              className="text-[10px] tracking-[0.35em] uppercase font-bold block"
              style={{ color: theme.accentColor }}
            >
              02. SCIENTIFIC TASTE ARCHITECTURE
            </span>
            <h3 
              style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
              className="text-2xl md:text-4.5xl font-light tracking-tight text-neutral-900 leading-tight"
            >
              타협 없는 일관성,<br />
              소수점 단위의 정교한 로스팅
            </h3>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
              클라리멘토의 로스터들은 단순한 감각이나 직관에만 만족하지 않습니다. 생두의 수분 함량, 밀도, 로스팅 당일의 
              습도와 실내 기온 변화까지 분석 솔루션 Cropster를 활용하여 철저하게 실시간 데이터화합니다.
            </p>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
              우리가 지향하는 '라이트 로스팅(Light Roast)'은 떫은 산미가 아닌, 생두가 지닌 선명한 아로마와 풍부한 
              천연 과일 단맛을 극대화시키는 정밀 과학입니다. 매일 아침 철저한 QC 커핑 분석을 진행하여 어떠한 환경에서도 
              완벽하게 균일한 스위트니스와 클린컵을 유지하고 있습니다.
            </p>
          </div>
        </section>

        {/* Story 3: Core Team and People (Jooyeon Jeon Champion spirit representation) */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <span 
              className="text-[10px] tracking-[0.35em] uppercase font-bold block"
              style={{ color: theme.accentColor }}
            >
              03. HUMAN SINCERITY
            </span>
            <h3 
              style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
              className="text-2xl md:text-4.5xl font-light tracking-tight text-neutral-900 leading-tight"
            >
              진심을 컵에 담아내는<br />
              우리들의 얼굴과 마음가짐
            </h3>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
              세계 최고 권위의 바리스타 챔피언십에서 입증된 열정과 배움의 정신이 클라리멘토 구성원들의 핵심 DNA에 자리잡고 있습니다. 
              우리의 전문 바리스타와 트레이너들은 매 순간 한 잔의 추출을 대할 때 겸손하고 배려 깊은 자세로 마주합니다.
            </p>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed font-light">
              바(Bar)를 사이에 두고 단순히 지식을 설파하기보단, 고객 개개인이 마시는 커피의 온도가 
              얼마나 즐거운 일상으로 이어질 수 있는지 사려 깊게 귀 기울입니다. 마음을 꾹꾹 눌러 담은 손편지 한 장을 
              동봉하듯, 모든 교감 속에 깊은 온기를 전하고자 합니다.
            </p>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden border border-neutral-200/50 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop" 
                alt="Professional barista focused on extraction"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs py-1.5 px-3 text-[9px] font-mono tracking-wider text-neutral-600 border border-neutral-150">
                Sincerity in Every Single Pour-over
              </div>
            </div>
          </div>
        </section>

      </div>



      {/* 5. Spatial Aesthetics (Momos Yeongdo/Oncheonjang mood representation) */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span 
            className="text-[10px] tracking-[0.5em] uppercase font-bold block animate-pulse"
            style={{ color: theme.accentColor }}
          >
            clarimento spaces
          </span>
          <h3
            style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
            className="text-2.5xl font-light tracking-tight text-neutral-900"
          >
            연구와 교감이 숨 쉬는 공간들
          </h3>
          <p className="text-xs text-neutral-500 font-light leading-normal">
            자연 본래의 고목과 아름다운 돌, 은은한 조명이 조화롭게 가미되어 커피 맛을 깊게 고찰할 수 있는 플래그십 쇼룸입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Spatial Block 1 */}
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden border border-neutral-200/40 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop" 
                alt="Clarimento modern stone flagship showroom"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/85 text-white text-[8px] font-mono tracking-widest px-2.5 py-1 uppercase">
                LOUNGE CLARIMENTO
              </div>
            </div>
            <div className="flex justify-between items-start pt-1">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">라운지 클라리멘토 (마포)</h4>
                <p className="text-xs text-neutral-500 font-light mt-1">서울시 마포구 잔다리로7안길 18 • 매일 11:00 - 21:00</p>
              </div>
              <div className="text-right text-[10px] font-mono text-neutral-400">
                FLAGSHIP BREWING SHOWROOM
              </div>
            </div>
          </div>

          {/* Spatial Block 2 */}
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden border border-neutral-200/40 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop" 
                alt="Clarimento raw coffee packaging and lab"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/85 text-white text-[8px] font-mono tracking-widest px-2.5 py-1 uppercase">
                CLARIMENTO LAB & ROASTERY
              </div>
            </div>
            <div className="flex justify-between items-start pt-1">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">클라리멘토 로스트 랩 (고양)</h4>
                <p className="text-xs text-neutral-500 font-light mt-1">경기도 고양시 의장로 29-31 • 로스팅 분석 본진 기지</p>
              </div>
              <div className="text-right text-[10px] font-mono text-neutral-400">
                BATCH QC & SOURCING LOGISTICS
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
