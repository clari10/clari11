import React, { useState, useEffect } from 'react';
import { Coffee, Clock, Compass, BookOpen, Star, Plus, Search, Filter, X, Calendar, Droplet, Flame, Grid, List, Trash2, CheckCircle2 } from 'lucide-react';
import { ThemeSettings } from '../types';

interface RecipesViewProps {
  theme: ThemeSettings;
}

interface Recipe {
  id: string;
  name: string;
  bean: string;
  method: 'Hario V60' | 'Kalita Wave' | 'Aeropress' | 'Espresso Machine' | 'Other';
  ratio: string;
  coffeeGrams: number;
  waterGrams: number;
  temp: string;
  time: string;
  grind: string;
  notes: string[];
  description: string;
  steps: string[];
  date: string;
  imageUrl?: string;
  isCustom?: boolean;
}

const DEFAULT_RECIPES: Recipe[] = [
  {
    id: 'v60-clarity',
    name: 'Signature Clarity Pour-over',
    bean: 'Colombia El Paraiso Pink Bourbon (Double Anaerobic)',
    method: 'Hario V60',
    ratio: '1:16',
    coffeeGrams: 15,
    waterGrams: 240,
    temp: '94°C',
    time: '2:50 mins',
    grind: 'Medium-Coarse',
    notes: ['Peach', 'Jasmine', 'Strawberry Yogurt', 'Honey'],
    description: '무산소 발효 생두 고유의 화려한 복합미와 복숭아 요거트 같은 독창적인 단맛을 온전히 컵으로 이끌어내기 위한 세이 스타일 표준 레시피.',
    steps: [
      '종이 필터를 뜨거운 물로 린싱하여 미분을 씻어내고 서버를 예열한 뒤 물을 버려줍니다.',
      '분쇄 원두 15g을 고르게 담은 후, 저울의 영점을 세팅합니다.',
      '뜸들이기(Bloom): 94°C의 뜨거운 물 45g을 부어 전체 원두를 고루 적셔줍니다. 스푼이나 스틱으로 가볍게 저어준 뒤 45초 동안 기다려 가스를 방출합니다.',
      '1차 추출: 45초에 시작하여 원을 그리며 나선형으로 빠르게 100g까지 부어줍니다 (누적 145g). 원두 베드를 가볍게 교반시킵니다.',
      '2차 추출: 1분 30초에 정중앙에 수직 수류로 일정하게 나머지 95g의 물을 누적 240g이 될 때까지 안정적으로 주입합니다.',
      '원두가 완전히 가라앉을 때 드리퍼를 가볍게 한 번 돌려 수평을 맞춰준 뒤, 2분 50초 내외로 추출을 완전히 마칩니다.'
    ],
    date: '2026.06.28',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kalita-sweetness',
    name: 'Balanced Sweetness Extraction',
    bean: 'Ethiopia Yirgacheffe Chelbesa (Washed)',
    method: 'Kalita Wave',
    ratio: '1:15',
    coffeeGrams: 16,
    waterGrams: 240,
    temp: '93°C',
    time: '3:10 mins',
    grind: 'Medium',
    notes: ['Bergamot', 'Earl Grey', 'Lemon Peel', 'Nectarine'],
    description: '칼리타 웨이브의 평평한 3홀 추출 특성을 결합하여 싱글오리진 고유의 차(Tea) 같은 편안한 질감과 풍부한 단맛의 밸런스를 높인 데일리 레시피.',
    steps: [
      '웨이브 필터를 드리퍼에 끼우고 뜨거운 물로 가볍게 전체 리브를 예열해줍니다.',
      '중간 굵기로 분쇄된 원두 16g을 수평이 되게 담아줍니다.',
      '뜸들이기: 40g의 물을 약 40초 동안 고루 침출시켜 커피 베드를 충분히 부풀립니다.',
      '1차 주입: 40초에 외곽선을 따라 80g을 부드럽게 주입합니다 (누적 120g).',
      '2차 주입: 1분 20초에 정중앙을 중심으로 원을 넓혀가며 60g을 부어줍니다 (누적 180g).',
      '3차 주입: 2분 정각에 안정적인 푸어로 마지막 60g을 천천히 부어 최종 240g을 완성합니다.',
      '추출 완료 타겟은 3분 10초입니다. 온도가 적당히 내려간 뒤 마시면 Earl Grey 티와 같은 향미가 살아납니다.'
    ],
    date: '2026.06.22',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'aeropress-nordic',
    name: 'High extraction Nordic Press',
    bean: 'Kenya Nyeri Ichamara (Washed AA)',
    method: 'Aeropress',
    ratio: '1:14.5',
    coffeeGrams: 15.5,
    waterGrams: 225,
    temp: '92°C',
    time: '2:20 mins',
    grind: 'Medium-Fine',
    notes: ['Blackcurrant', 'Rhubarb', 'Grapefruit', 'Brown Sugar'],
    description: '케냐 원두의 자몽이나 리바브 같은 단단한 과일 산미를 에어로프레스만의 밀폐력과 압력을 활용해 둥글고 시럽 같은 바디감으로 이끌어냅니다.',
    steps: [
      '에어로프레스 캡에 미세 메탈 필터 혹은 이중 종이 필터를 넣고 뜨거운 물로 적셔 결합합니다.',
      '에어로프레스를 표준 방향(정방향)으로 서버 위에 올린 후 원두 15.5g을 넣어줍니다.',
      '뜸들이기 없이 92°C의 물 225g을 15초 내에 골고루 아주 빠르게 부어줍니다.',
      '스패출러나 스푼을 이용해 앞뒤로 가볍게 5회 저어주어 원두와 물을 밀착 교반합니다.',
      '플런저를 1cm 정도 가볍게 끼워 진공(Vacuum) 상태로 만들고 1분 30초 동안 그대로 둡니다.',
      '1분 30초에 플런저를 조심스럽게 분리하고 전체적으로 가볍게 3회 스터해 준 뒤 다시 결합합니다.',
      '1분 45초부터 2분 20초까지 약 35초에 걸쳐 고르고 일정하게 플런저를 아래로 지긋이 눌러 추출을 마칩니다.'
    ],
    date: '2026.06.18',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'espresso-sweet-shot',
    name: 'Modern 1:2.5 Sweet Ratio',
    bean: 'Clarimento Signature Blend "AURA"',
    method: 'Espresso Machine',
    ratio: '1:2.5',
    coffeeGrams: 18,
    waterGrams: 45,
    temp: '93.5°C',
    time: '28 secs',
    grind: 'Extremely Fine',
    notes: ['Orange Peel', 'Roasted Hazelnut', 'Milk Chocolate', 'Toffee'],
    description: '기존의 투박한 다크 로스팅이 아닌 에스프레소 고유의 오렌지 필과 같은 화사한 뉘앙스를 간직한 채 토피와 넛티한 고소함을 밸런싱한 샷.',
    steps: [
      '정밀 바스켓(VST 18g 등)에 정확히 18.0g의 신선한 원두가루를 담아줍니다.',
      'WDT 툴 등을 이용해 바스켓 내부 원두 가루의 뭉침을 제거하고 수평을 정돈합니다.',
      '가장자리에 채널링이 나지 않도록 수평 마카롱 탬퍼 등으로 가볍고 단단히 레벨링 탬핑합니다.',
      '포타필터를 그룹헤드에 결합한 뒤, 추출 버튼과 타이머를 동시에 작동시킵니다.',
      '4초가량의 프리인퓨전(뜸들이기) 후 고르게 본 추출이 퍼져 나오며 총 45g의 추출 에스프레소 액체를 확보합니다.',
      '추출이 완료되면 스푼으로 크레마 층과 시럽 층이 완벽히 혼합되도록 가볍게 5회 이상 저은 뒤 맛을 봅니다.'
    ],
    date: '2026.06.12',
    imageUrl: 'https://images.unsplash.com/photo-151097252790b-af4f982c9f63?q=80&w=600&auto=format&fit=crop'
  }
];

export default function RecipesView({ theme }: RecipesViewProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Form State
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeBean, setNewRecipeBean] = useState('');
  const [newRecipeMethod, setNewRecipeMethod] = useState<'Hario V60' | 'Kalita Wave' | 'Aeropress' | 'Espresso Machine' | 'Other'>('Hario V60');
  const [newRecipeRatio, setNewRecipeRatio] = useState('1:16');
  const [newRecipeCoffee, setNewRecipeCoffee] = useState<number>(15);
  const [newRecipeWater, setNewRecipeWater] = useState<number>(240);
  const [newRecipeTemp, setNewRecipeTemp] = useState('94°C');
  const [newRecipeTime, setNewRecipeTime] = useState('3:00 mins');
  const [newRecipeGrind, setNewRecipeGrind] = useState('Medium-Coarse');
  const [newRecipeNotes, setNewRecipeNotes] = useState('');
  const [newRecipeDesc, setNewRecipeDesc] = useState('');
  const [newRecipeSteps, setNewRecipeSteps] = useState('');

  // Load recipes on Mount
  useEffect(() => {
    const saved = localStorage.getItem('clarimento_recipes_list');
    if (saved) {
      try {
        setRecipes(JSON.parse(saved));
      } catch (e) {
        setRecipes(DEFAULT_RECIPES);
      }
    } else {
      setRecipes(DEFAULT_RECIPES);
      localStorage.setItem('clarimento_recipes_list', JSON.stringify(DEFAULT_RECIPES));
    }
  }, []);

  const saveRecipesToStorage = (updatedList: Recipe[]) => {
    setRecipes(updatedList);
    localStorage.setItem('clarimento_recipes_list', JSON.stringify(updatedList));
  };

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipeName || !newRecipeBean) {
      alert('레시피 이름과 원두 명을 입력해주세요.');
      return;
    }

    const stepsArray = newRecipeSteps
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const notesArray = newRecipeNotes
      .split(',')
      .map(n => n.trim())
      .filter(n => n.length > 0);

    const imagesPlaceholder = [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-151097252790b-af4f982c9f63?q=80&w=600&auto=format&fit=crop'
    ];
    const randomImage = imagesPlaceholder[Math.floor(Math.random() * imagesPlaceholder.length)];

    const newRecipe: Recipe = {
      id: 'RECIPE-' + Date.now(),
      name: newRecipeName,
      bean: newRecipeBean,
      method: newRecipeMethod,
      ratio: newRecipeRatio,
      coffeeGrams: Number(newRecipeCoffee),
      waterGrams: Number(newRecipeWater),
      temp: newRecipeTemp,
      time: newRecipeTime,
      grind: newRecipeGrind,
      notes: notesArray.length > 0 ? notesArray : ['Specialty Coffee'],
      description: newRecipeDesc || '추출 데이터 기록을 위한 소중한 나만의 커스텀 가이드 레시피.',
      steps: stepsArray.length > 0 ? stepsArray : ['필터를 린싱하고 커피 가루를 담아 추출을 준비합니다.', '저울 영점을 맞추고 기호에 맞춰 적절히 주입하여 완료합니다.'],
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\s/g, '').slice(0, -1),
      imageUrl: randomImage,
      isCustom: true
    };

    const updated = [newRecipe, ...recipes];
    saveRecipesToStorage(updated);

    // Reset Form
    setNewRecipeName('');
    setNewRecipeBean('');
    setNewRecipeRatio('1:16');
    setNewRecipeCoffee(15);
    setNewRecipeWater(240);
    setNewRecipeTemp('94°C');
    setNewRecipeTime('3:00 mins');
    setNewRecipeGrind('Medium-Coarse');
    setNewRecipeNotes('');
    setNewRecipeDesc('');
    setNewRecipeSteps('');
    setIsFormOpen(false);
  };

  const handleDeleteRecipe = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 레시피 기록을 보드에서 삭제하시겠습니까?')) {
      const updated = recipes.filter(r => r.id !== id);
      saveRecipesToStorage(updated);
      if (selectedRecipe && selectedRecipe.id === id) {
        setSelectedRecipe(null);
      }
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesMethod = selectedMethod === 'All' || recipe.method === selectedMethod;
    const matchesSearch = 
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.bean.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMethod && matchesSearch;
  });

  const getFontFamily = () => {
    switch (theme.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans': return 'font-sans';
      default: return 'font-sans';
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

  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 ${getFontFamily()} animate-fade-in`}>
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span 
          className="text-[10px] tracking-[0.4em] uppercase font-bold block"
          style={{ color: theme.accentColor }}
        >
          CLARIMENTO EXTRACTION LOG
        </span>
        <h1 
          className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight"
          style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` }}
        >
          레시피 아카이브 보드
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 leading-relaxed max-w-xl mx-auto font-light">
          세이 커피의 엄격한 라이트 로스트 가이드라인부터 바리스타가 일상적으로 연구하고 축적해온 다양한 추출 레시피를 하나의 통합 보드 형태로 기록하고 확인합니다.
        </p>
      </div>

      {/* 3. Recipes Gallery Board Grid (Heaps Coffee Gallery Layout) */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-200 bg-neutral-50 rounded-sm">
          <Coffee className="h-8 w-8 text-neutral-300 mx-auto mb-3" />
          <p className="text-xs text-neutral-500 font-light">등록된 추출 레시피가 없거나 검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="group bg-white border border-neutral-200/50 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-neutral-300"
              style={{ borderRadius: '6px' }}
            >
              <div>
                {/* Thumbnail Frame */}
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden border-b border-neutral-100">
                  {recipe.imageUrl ? (
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <Coffee className="h-8 w-8" />
                    </div>
                  )}
                  {/* Method Tag */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs py-0.5 px-2 text-[9px] font-mono font-bold tracking-wider text-neutral-800 uppercase border border-neutral-200/40 shadow-2xs">
                    {recipe.method}
                  </span>
                  
                  {recipe.isCustom && (
                    <span className="absolute top-3 right-3 bg-purple-500 text-white py-0.5 px-2 text-[9px] font-mono tracking-wider font-bold uppercase shadow-2xs rounded-sm">
                      CUSTOM LOG
                    </span>
                  )}
                </div>

                {/* Info and Content */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">{recipe.date}</span>
                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1 truncate" title={recipe.name}>
                      {recipe.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 truncate font-light" title={recipe.bean}>
                      {recipe.bean}
                    </p>
                  </div>

                  {/* Cups Taste Notes Tags */}
                  <div className="flex flex-wrap gap-1">
                    {recipe.notes.slice(0, 3).map((note, index) => (
                      <span 
                        key={index} 
                        className="text-[9px] px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded-sm"
                      >
                        {note}
                      </span>
                    ))}
                    {recipe.notes.length > 3 && (
                      <span className="text-[9px] px-1 bg-neutral-50 text-neutral-400 font-mono">+ {recipe.notes.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Extraction Parameter Bottom Ribbon */}
              <div className="px-4 py-3 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <div className="flex items-center gap-1">
                  <Droplet className="h-3 w-3 text-neutral-400" />
                  <span>{recipe.ratio} ({recipe.coffeeGrams}g)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-300">|</span>
                  <span>{recipe.time}</span>
                  {recipe.isCustom && (
                    <button
                      onClick={(e) => handleDeleteRecipe(recipe.id, e)}
                      className="ml-2 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="레시피 삭제"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 4. Recipe Details Modal (Expandable View) */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-2xl overflow-y-auto max-h-[90vh] border border-neutral-200 relative shadow-2xl">
            
            {/* Close trigger */}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 bg-white border border-neutral-150 rounded-full transition-all cursor-pointer z-10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Immersive Modal Image */}
            {selectedRecipe.imageUrl && (
              <div className="relative h-48 md:h-64 w-full bg-neutral-100">
                <img 
                  src={selectedRecipe.imageUrl} 
                  alt={selectedRecipe.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-sm font-mono uppercase tracking-widest">
                      {selectedRecipe.method}
                    </span>
                    <span className="text-[10px] text-neutral-300 font-mono">{selectedRecipe.date}</span>
                  </div>
                  <h2 className="text-lg md:text-2xl font-bold tracking-tight">
                    {selectedRecipe.name}
                  </h2>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8 space-y-6">
              
              {/* Bean description & Flavor profile */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">대상 커피 원두</span>
                <p className="text-xs md:text-sm font-bold text-neutral-800">{selectedRecipe.bean}</p>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">{selectedRecipe.description}</p>
              </div>

              {/* Param Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-neutral-100 font-mono text-center">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 block uppercase font-bold">Coffee Dose</span>
                  <span className="text-xs font-bold text-neutral-800">{selectedRecipe.coffeeGrams}g</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 block uppercase font-bold">Water Yield</span>
                  <span className="text-xs font-bold text-neutral-800">{selectedRecipe.waterGrams}g ({selectedRecipe.ratio})</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 block uppercase font-bold">Temperature</span>
                  <span className="text-xs font-bold text-neutral-800 flex items-center justify-center gap-1">
                    <Flame className="h-3 w-3 text-rose-400 shrink-0" />
                    {selectedRecipe.temp}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 block uppercase font-bold">Grind Setting</span>
                  <span className="text-xs font-bold text-neutral-800">{selectedRecipe.grind}</span>
                </div>
              </div>

              {/* Cup notes tags inside modal */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">추출 타겟 향미 (Tasting Profile)</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRecipe.notes.map((note, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2.5 py-0.5 bg-neutral-50 text-neutral-700 border border-neutral-150 rounded-sm font-light"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">추출 가이드 타임라인 ({selectedRecipe.time})</span>
                <div className="space-y-4">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="flex gap-3 items-start text-xs leading-relaxed text-neutral-700">
                      <span 
                        style={{ color: theme.accentColor, borderColor: theme.accentColor }}
                        className="flex-shrink-0 h-5 w-5 rounded-full border text-[10px] font-bold flex items-center justify-center font-mono mt-0.5"
                      >
                        {index + 1}
                      </span>
                      <p className="font-light">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Water Chemistry Tip */}
              <div className="p-4 bg-purple-50/50 border border-purple-100/40 rounded-sm space-y-1.5">
                <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5" style={{ color: theme.accentColor }} />
                  물 화학(Water Chemistry) 및 권장 사항
                </span>
                <p className="text-[11px] text-purple-950/80 leading-relaxed font-light">
                  Clarimento의 모든 라이트 로스트 싱글 오리진은 물의 총 경도 50-70 ppm GH, 알칼리도 20-30 ppm KH를 추천합니다. 추출 완료 후 음료의 온도가 점진적으로 내려가면서 핵과류 고유의 깨끗한 과일 단맛이 극적으로 열리기 시작하므로 서두르지 말고 느긋하게 음미하세요.
                </p>
              </div>

              {/* Modal footer control */}
              <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-[11px] text-neutral-400 font-mono">
                <span>Total Target: {selectedRecipe.time}</span>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="px-4 py-2 text-xs border border-neutral-200 text-neutral-600 hover:border-neutral-800 transition-all cursor-pointer font-bold uppercase tracking-wider"
                >
                  창 닫기
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 5. Create Recipe Form Overlay Drawer / Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-xl overflow-y-auto max-h-[90vh] border border-neutral-200 relative shadow-2xl p-6 md:p-8">
            
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-900 bg-white border border-neutral-150 rounded-full cursor-pointer transition-all z-10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1 mb-6">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">EXTRACT LOG WRITER</span>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900">추출 레시피 기록서 작성</h2>
              <p className="text-xs text-neutral-500 font-light leading-normal">
                커피를 내리면서 기록하고 싶은 추출 정보 및 변수를 빠짐없이 기입해 보세요.
              </p>
            </div>

            <form onSubmit={handleCreateRecipe} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">레시피 이름 *</label>
                  <input
                    type="text"
                    required
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                    placeholder="예: 아이스 하리오 플로럴 드립"
                    className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-light"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">원두 종류 & 가공방식 *</label>
                  <input
                    type="text"
                    required
                    value={newRecipeBean}
                    onChange={(e) => setNewRecipeBean(e.target.value)}
                    placeholder="예: 에티오피아 시다마 내추럴"
                    className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">추출 도구 (Method)</label>
                  <select
                    value={newRecipeMethod}
                    onChange={(e) => setNewRecipeMethod(e.target.value as any)}
                    className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-medium"
                  >
                    <option value="Hario V60">Hario V60</option>
                    <option value="Kalita Wave">Kalita Wave</option>
                    <option value="Aeropress">Aeropress</option>
                    <option value="Espresso Machine">Espresso Machine</option>
                    <option value="Other">Other (기타 우려내기)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">추출 비율 (Ratio)</label>
                  <input
                    type="text"
                    value={newRecipeRatio}
                    onChange={(e) => setNewRecipeRatio(e.target.value)}
                    placeholder="예: 1:16"
                    className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider block">원두 양 (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRecipeCoffee}
                    onChange={(e) => setNewRecipeCoffee(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider block">물 주입량 (g)</label>
                  <input
                    type="number"
                    value={newRecipeWater}
                    onChange={(e) => setNewRecipeWater(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider block">추출 온도</label>
                  <input
                    type="text"
                    value={newRecipeTemp}
                    onChange={(e) => setNewRecipeTemp(e.target.value)}
                    placeholder="94°C"
                    className="w-full px-2.5 py-1.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider block">총 시간</label>
                  <input
                    type="text"
                    value={newRecipeTime}
                    onChange={(e) => setNewRecipeTime(e.target.value)}
                    placeholder="2:50"
                    className="w-full px-2.5 py-1.5 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">분쇄도 세팅 (Grind size)</label>
                  <input
                    type="text"
                    value={newRecipeGrind}
                    onChange={(e) => setNewRecipeGrind(e.target.value)}
                    placeholder="예: 코만단테 25클릭, 미디엄 피코"
                    className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-light"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">컵 향미 노트 (콤마로 구분)</label>
                  <input
                    type="text"
                    value={newRecipeNotes}
                    onChange={(e) => setNewRecipeNotes(e.target.value)}
                    placeholder="자스민, 사과, 메이플시럽"
                    className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-light"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">레시피 한 줄 소개</label>
                <input
                  type="text"
                  value={newRecipeDesc}
                  onChange={(e) => setNewRecipeDesc(e.target.value)}
                  placeholder="예: 첫 모금에 화사한 베리 향을 풍부하게 가미한 산뜻한 아침 브루잉 가이드."
                  className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-light"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">상세 추출 가이드 단계 (엔터로 줄 구분)</label>
                <textarea
                  rows={4}
                  value={newRecipeSteps}
                  onChange={(e) => setNewRecipeSteps(e.target.value)}
                  placeholder={`예:\n1. 40g의 물을 부어 약 40초간 뜸을 들이며 가스를 배출시킵니다.\n2. 나선형으로 부드럽게 100g까지 채워줍니다.\n3. 드로우다운 후 남은 물을 지긋이 채워 추출을 마칩니다.`}
                  className="w-full px-3 py-2 border border-neutral-200 text-xs focus:border-neutral-950 focus:outline-none bg-white rounded-sm font-light leading-relaxed"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="w-1/3 py-3 border border-neutral-200 text-neutral-500 font-bold uppercase tracking-widest text-[10px] hover:border-neutral-400 transition-all cursor-pointer text-center"
                  style={{ borderRadius: '4px' }}
                >
                  작성 취소
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
                  className={`w-2/3 py-3 font-bold uppercase tracking-widest text-[10px] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${getRadiusClass()}`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>레시피 보드 등록하기</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
