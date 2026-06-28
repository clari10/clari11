import React, { useState, useEffect } from 'react';
import { Calendar, Truck, Coffee, CheckCircle2, CreditCard, Sparkles, Package, Settings, ShieldCheck, RefreshCw, X, ChevronRight, Edit2 } from 'lucide-react';
import { ThemeSettings } from '../types';

interface SubscriptionsViewProps {
  theme: ThemeSettings;
}

interface ActiveSubscription {
  id: string;
  profile: 'filter' | 'espresso' | 'decaf';
  bags: number;
  frequency: '2weeks' | '4weeks';
  grind: string;
  recipientName: string;
  phone: string;
  address: string;
  paymentCard: string;
  status: 'active' | 'paused';
  nextShipmentDate: string;
}

export default function SubscriptionsView({ theme }: SubscriptionsViewProps) {
  const [activeSub, setActiveSub] = useState<ActiveSubscription | null>(null);
  
  // Form Configuration State
  const [profile, setProfile] = useState<'filter' | 'espresso' | 'decaf'>('filter');
  const [bags, setBags] = useState<number>(2);
  const [frequency, setFrequency] = useState<'2weeks' | '4weeks'>('4weeks');
  const [grind, setGrind] = useState<string>('Whole Bean');
  
  // Checkout Form State
  const [step, setStep] = useState<1 | 2>(1);
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing subscription from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('clarimento_subscription');
    if (saved) {
      try {
        setActiveSub(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading subscription', e);
      }
    }
  }, []);

  const saveSubscription = (sub: ActiveSubscription | null) => {
    setActiveSub(sub);
    if (sub) {
      localStorage.setItem('clarimento_subscription', JSON.stringify(sub));
    } else {
      localStorage.removeItem('clarimento_subscription');
    }
  };

  const calculatePrice = (bagCount: number) => {
    if (bagCount === 1) return 22.00;
    if (bagCount === 2) return 40.00;
    if (bagCount === 3) return 58.00;
    return 74.00;
  };

  const getProfileLabel = (p: 'filter' | 'espresso' | 'decaf') => {
    switch (p) {
      case 'filter': return '필터 싱글오리진 (Filter Single Origin)';
      case 'espresso': return '하우스 에스프레소 (House Espresso)';
      case 'decaf': return '디카페인 셀렉션 (Decaf Selection)';
    }
  };

  const handleCreateSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !phone || !address || !cardNumber) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const nextMon = new Date();
      nextMon.setDate(nextMon.getDate() + ((1 + 7 - nextMon.getDay()) % 7 || 7)); // Next Monday
      
      const newSub: ActiveSubscription = {
        id: 'SUB-' + Math.floor(Math.random() * 90000 + 10000),
        profile,
        bags,
        frequency,
        grind,
        recipientName,
        phone,
        address,
        paymentCard: '•••• •••• •••• ' + cardNumber.slice(-4),
        status: 'active',
        nextShipmentDate: nextMon.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
      };

      saveSubscription(newSub);
      setIsSubmitting(false);
      setStep(1);
    }, 1000);
  };

  const handleToggleStatus = () => {
    if (!activeSub) return;
    const updated: ActiveSubscription = {
      ...activeSub,
      status: activeSub.status === 'active' ? 'paused' : 'active'
    };
    saveSubscription(updated);
  };

  const handleShipNow = () => {
    if (!activeSub) return;
    alert('이번 주 정기 배송이 즉시 준비 중으로 변경되었습니다. 화요일 아침에 안전하게 발송됩니다!');
  };

  const handleCancel = () => {
    if (window.confirm('정말로 정기 구독을 취소하시겠습니까? 언제든지 다시 가입하실 수 있습니다.')) {
      saveSubscription(null);
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

  const getFontFamily = () => {
    switch (theme.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans': return 'font-sans';
      default: return 'font-sans';
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 ${getFontFamily()}`}>
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span 
          className="text-[10px] tracking-[0.4em] uppercase font-bold block animate-pulse"
          style={{ color: theme.accentColor }}
        >
          SAY COFFEE SUBSCRIPTION
        </span>
        <h1 
          className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight"
          style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
        >
          정기 구독 서비스
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 leading-relaxed max-w-xl mx-auto font-light">
          세이 커피의 시그니처 라이트 로스트 싱글 오리진부터 완벽하게 밸런스 잡힌 에스프레소까지, 매주 신선한 상태로 정기 배송 받아보세요.
        </p>
      </div>

      {/* DASHBOARD MODE: Show if there is an active subscription */}
      {activeSub ? (
        <div className="max-w-4xl mx-auto bg-white border border-neutral-200/55 p-6 md:p-10 shadow-xs space-y-8 animate-fade-in">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/40 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] tracking-wider font-mono px-2 py-0.5 border border-neutral-200 text-neutral-500 bg-neutral-50 rounded-sm">
                  ID: {activeSub.id}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm ${
                  activeSub.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  {activeSub.status === 'active' ? '● 구독 활성' : '○ 일시 정지됨'}
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                {getProfileLabel(activeSub.profile)}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-sm font-mono text-neutral-500">정기 결제금액</span>
              <p className="text-2xl font-bold font-mono text-neutral-900">${calculatePrice(activeSub.bags).toFixed(2)}</p>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">구독 구성</span>
              <p className="text-xs font-semibold text-neutral-800">{activeSub.bags} Bags ({activeSub.bags * 250}g) / {activeSub.grind}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">배송 주기</span>
              <p className="text-xs font-semibold text-neutral-800">매 {activeSub.frequency === '2weeks' ? '2주' : '4주'} 마다 자동 배송</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">다음 예정 발송일</span>
              <p className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-neutral-400" />
                {activeSub.status === 'active' ? activeSub.nextShipmentDate : '구독 일시정지 중'}
              </p>
            </div>
          </div>

          <hr className="border-neutral-200/40" />

          {/* Delivery & Billing Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
            <div className="space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">배송 주소지</span>
              <div className="bg-neutral-50 p-4 border border-neutral-150 rounded-sm space-y-1 text-xs">
                <p className="font-bold text-neutral-800">{activeSub.recipientName} <span className="font-normal text-neutral-500 font-mono">({activeSub.phone})</span></p>
                <p className="text-neutral-600 leading-relaxed">{activeSub.address}</p>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">결제 수단 정보</span>
              <div className="bg-neutral-50 p-4 border border-neutral-150 rounded-sm flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-neutral-200 text-neutral-700 rounded-sm">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-800">{activeSub.paymentCard}</p>
                    <p className="text-[10px] text-neutral-400">배송 주기마다 자동 승인 결제</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-200/40">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleStatus}
                className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border border-neutral-200 hover:border-neutral-800 text-neutral-700 hover:text-neutral-900 transition-all cursor-pointer rounded-sm"
              >
                {activeSub.status === 'active' ? '구독 일시정지' : '구독 다시 시작'}
              </button>
              {activeSub.status === 'active' && (
                <button
                  onClick={handleShipNow}
                  className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border border-neutral-200 hover:border-neutral-800 text-neutral-700 hover:text-neutral-900 transition-all cursor-pointer rounded-sm"
                >
                  이번 주 원두 즉시 발송
                </button>
              )}
            </div>

            <button
              onClick={handleCancel}
              className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-rose-500 hover:text-rose-700 transition-all cursor-pointer"
            >
              구독 해지하기
            </button>
          </div>

        </div>
      ) : (
        /* SUBSCRIPTION CONFIGURATOR WIZARD */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* LEFT: Configurator Controls (7 Columns) */}
          <div className="lg:col-span-7 space-y-10">
            
            {step === 1 ? (
              <div className="space-y-8">
                
                {/* 1. Coffee Profile selection */}
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]">Step 01. 원두 프로파일 선택</span>
                    <span className="text-xs text-neutral-500 font-mono">가장 고유하고 선명한 스타일</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        id: 'filter',
                        title: '필터 싱글오리진 (Filter Roast Lot)',
                        desc: 'Say Coffee 시그니처 라이트 로스트. 화려한 에티오피아 무산소 발효부터 극도의 클린컵을 주는 콜롬비아 핑크버번 등, 매주 수확기에 마스터가 엄선한 최고의 컵을 담아 배송합니다.',
                        badge: 'BEST'
                      },
                      {
                        id: 'espresso',
                        title: '하우스 에스프레소 블렌드 (House Espresso)',
                        desc: '풍부하고 고소한 단맛, 실키한 마우스필에 과일의 뉘앙스를 세련되게 담아낸 스위트 블렌드입니다. 에스프레소 머신 및 자동 브루잉 머신 전용으로 설계되었습니다.',
                        badge: 'CLASSIC'
                      },
                      {
                        id: 'decaf',
                        title: '스페셜티 디카페인 (Specialty Decaf)',
                        desc: '천연 CO2 공법을 사용해 화학 물질 없이 안전하고 완벽하게 카페인만 분리했습니다. 스페셜티 고유의 단맛과 사과, 아몬드의 향미를 디카페인에서도 깊게 전합니다.',
                        badge: 'SAFE'
                      }
                    ].map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setProfile(p.id as any)}
                        className={`p-5 border transition-all cursor-pointer relative ${
                          profile === p.id 
                            ? 'border-neutral-900 bg-neutral-950/2' 
                            : 'border-neutral-200 hover:border-neutral-400 bg-white'
                        }`}
                        style={{ borderRadius: '6px' }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xs md:text-sm font-bold text-neutral-950">{p.title}</h3>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 tracking-wider bg-neutral-100 text-neutral-600 rounded-sm">
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed font-light">{p.desc}</p>
                        {profile === p.id && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-[3px]"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Bags Size selection */}
                <div className="space-y-4">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] block">Step 02. 수량 설정 (용량)</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { count: 1, label: '1 Bag', weight: '250g', discount: '기본가' },
                      { count: 2, label: '2 Bags', weight: '500g', discount: 'Save $4.00' },
                      { count: 3, label: '3 Bags', weight: '750g', discount: 'Save $8.00' },
                      { count: 4, label: '4 Bags', weight: '1,000g', discount: 'Save $14.00' }
                    ].map((b) => (
                      <div
                        key={b.count}
                        onClick={() => setBags(b.count)}
                        className={`p-4 border text-center transition-all cursor-pointer relative ${
                          bags === b.count
                            ? 'border-neutral-900 bg-neutral-950/2'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white'
                        }`}
                        style={{ borderRadius: '6px' }}
                      >
                        <p className="text-sm font-bold text-neutral-900">{b.label}</p>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{b.weight}</p>
                        <span className="text-[9px] font-semibold text-neutral-500 block mt-2 px-1.5 py-0.5 bg-neutral-50 rounded-sm border border-neutral-100">
                          {b.discount}
                        </span>
                        {bags === b.count && (
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-[3px]"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Frequency selection */}
                <div className="space-y-4">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] block">Step 03. 배송 주기 선택</span>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: '2weeks', title: '매 2주 마다 발송', desc: '항상 신선하고 다채로운 원두 회전율을 희망할 경우 추천' },
                      { id: '4weeks', title: '매 4주 마다 (매월)', desc: '하루 1-2잔 가볍게 드시는 싱글 브루잉 가구에 추천' }
                    ].map((f) => (
                      <div
                        key={f.id}
                        onClick={() => setFrequency(f.id as any)}
                        className={`p-4 border transition-all cursor-pointer relative text-left ${
                          frequency === f.id
                            ? 'border-neutral-900 bg-neutral-950/2'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white'
                        }`}
                        style={{ borderRadius: '6px' }}
                      >
                        <h3 className="text-xs font-bold text-neutral-950 mb-1">{f.title}</h3>
                        <p className="text-[10px] text-neutral-500 leading-normal font-light">{f.desc}</p>
                        {frequency === f.id && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-[3px]"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Grind option */}
                <div className="space-y-4">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] block">Step 04. 분쇄도 옵션 선택</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Whole Bean', 'Espresso', 'Filter', 'French Press'].map((g) => (
                      <div
                        key={g}
                        onClick={() => setGrind(g)}
                        className={`p-3 border text-center transition-all cursor-pointer text-xs font-semibold ${
                          grind === g
                            ? 'border-neutral-900 bg-neutral-950/2 text-neutral-950'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-500'
                        }`}
                        style={{ borderRadius: '6px' }}
                      >
                        {g === 'Whole Bean' ? '홀빈 (분쇄 안함)' : g}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* STEP 2: SHIPPING AND BILLING DETAILS */
              <form onSubmit={handleCreateSubscription} className="space-y-8 bg-white p-6 md:p-8 border border-neutral-200/60 rounded-md">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Step 02.</span>
                    <h3 className="text-sm font-bold text-neutral-800">배송 및 결제정보 입력</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setStep(1)} 
                    className="text-xs text-neutral-400 hover:text-neutral-700 flex items-center gap-1 font-semibold"
                  >
                    이전 단계로
                  </button>
                </div>

                {/* Shipping Details */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 border-b border-neutral-100 pb-2">배송지 정보</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">수령인 성명 *</label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="홍길동"
                        className="w-full px-3.5 py-2.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white"
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">연락처 *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-1234-5678"
                        className="w-full px-3.5 py-2.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white"
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">배송 주소 *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="서울특별시 강남구 테헤란로 123, 4층"
                      className="w-full px-3.5 py-2.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 border-b border-neutral-100 pb-2">정기 결제 수단 (신용/체크카드)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">카드 번호 *</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 - 5678 - 1234 - 5678"
                        className="w-full px-3.5 py-2.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white font-mono"
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">소유자 성명 *</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="GILDONG HONG"
                        className="w-full px-3.5 py-2.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white"
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">유효 기한 *</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full px-3.5 py-2.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white font-mono"
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">보안 코드 (CVC) *</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="3자리"
                        className="w-full px-3.5 py-2.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white font-mono"
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Guarantee */}
                <div className="flex gap-2.5 items-start p-3 bg-neutral-50 border border-neutral-100 rounded-sm text-[11px] text-neutral-500 leading-normal">
                  <ShieldCheck className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Clarimento 정기구독은 암호화된 자동결제 방식을 채택하고 있어 금융 정보 유출 위험이 전혀 없으며, 매 주기 발송 전에만 결제가 승인됩니다. 일시정지 및 언제든지 해지가 자유롭습니다.</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 border border-neutral-200 text-neutral-500 font-bold uppercase tracking-widest text-[10px] hover:border-neutral-400 transition-all cursor-pointer text-center"
                    style={{ borderRadius: '4px' }}
                  >
                    이전 단계
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
                    className={`w-2/3 py-3 font-bold uppercase tracking-widest text-[10px] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${getRadiusClass()}`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>구독 신청 처리 중...</span>
                      </>
                    ) : (
                      <span>구독 안전 결제 완료하기</span>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* RIGHT: Live Plan summary card (5 Columns) */}
          <div className="lg:col-span-5 sticky top-28 bg-white border border-neutral-200/50 p-6 md:p-8 space-y-6 shadow-xs">
            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400">나의 정기구독 설계서</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start py-3 border-b border-neutral-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">프로파일</span>
                  <span className="text-xs font-bold text-neutral-900">{getProfileLabel(profile).split('(')[0]}</span>
                </div>
                <Coffee className="h-5 w-5 text-neutral-400" />
              </div>

              <div className="flex justify-between items-start py-3 border-b border-neutral-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">수량 (용량)</span>
                  <span className="text-xs font-bold text-neutral-900">{bags} Bag ({bags * 250}g)</span>
                </div>
                <span className="text-xs font-mono text-neutral-500">${calculatePrice(bags).toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-start py-3 border-b border-neutral-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">배송 주기</span>
                  <span className="text-xs font-bold text-neutral-900">매 {frequency === '2weeks' ? '2주' : '4주'} 마다</span>
                </div>
                <Calendar className="h-5 w-5 text-neutral-400" />
              </div>

              <div className="flex justify-between items-start py-3 border-b border-neutral-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">선택된 분쇄도</span>
                  <span className="text-xs font-bold text-neutral-900">{grind}</span>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-neutral-50 p-4 rounded-sm space-y-2">
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>기본 정기 발송 요금</span>
                <span className="font-mono">${(bags * 22).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-600 font-semibold">
                <span>구독 전용 상시 특별 할인</span>
                <span className="font-mono">-${((bags * 22) - calculatePrice(bags)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>스페셜티 직배송비</span>
                <span className="text-emerald-600 font-bold uppercase tracking-wider font-mono">FREE</span>
              </div>
              <hr className="border-neutral-200/50 my-1" />
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs font-bold text-neutral-800">예상 결제 금액</span>
                <span className="text-xl font-bold font-mono text-neutral-950">${calculatePrice(bags).toFixed(2)}</span>
              </div>
            </div>

            {/* Action trigger button inside card */}
            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
                className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer ${getRadiusClass()}`}
              >
                <span>배송 정보 입력하기</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Sourcing Promise tag */}
            <div className="border border-neutral-100 p-4 text-[10px] text-neutral-400 leading-relaxed text-center space-y-1">
              <span className="font-bold text-neutral-600 block uppercase tracking-wider">● CLARIMENTO SOURCING PROMISE</span>
              우리는 오직 생두 평가 점수 86점 이상의 싱글 오리진만을 선별하여 직접 거래 및 공정 무역 기준을 뛰어넘는 상생 무역으로 수입하고 있습니다.
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
