/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sliders, Sparkles, CheckCircle2, ShoppingBag, X, Coffee, Truck, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductView from './components/ProductView';
import WholesaleView from './components/WholesaleView';
import AboutView from './components/AboutView';
import RecipesView from './components/RecipesView';
import SubscriptionsView from './components/SubscriptionsView';
import CartDrawer from './components/CartDrawer';
import ThemeCustomizer from './components/ThemeCustomizer';
import { PRODUCTS, DEFAULT_THEME_SETTINGS } from './data';
import { Product, CartItem, ThemeSettings, User } from './types';
import LoginModal from './components/LoginModal';
import NewsletterSection from './components/NewsletterSection';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'shop' | 'recipes' | 'wholesale' | 'subscriptions'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(DEFAULT_THEME_SETTINGS);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  // User Authentication States
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Checkout Modal State
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [checkoutSummary, setCheckoutSummary] = useState<{
    itemsCount: number;
    totalPrice: number;
    orderNumber: string;
    deliveryDate: string;
  } | null>(null);

  // Load user, cart and theme from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('clarimento_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error loading user state', e);
      }
    }

    const savedCart = localStorage.getItem('clarimento_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }

    const savedTheme = localStorage.getItem('clarimento_theme_settings');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        parsed.announcementText = "We ship out orders every Tuesday & Wednesday. With the deadline for ordering on Sundays at 18:00 (CET).";
        parsed.announcementBarColor = "#E6E0FA";
        parsed.announcementBarTextColor = "#1F1235";
        parsed.fontFamily = "sans";
        parsed.headingFont = "Assistant";
        parsed.bodyFont = "Assistant";
        setThemeSettings(parsed);
        localStorage.setItem('clarimento_theme_settings', JSON.stringify(parsed));
      } catch (e) {
        console.error('Error loading theme settings', e);
      }
    } else {
      const updatedDefault = {
        ...DEFAULT_THEME_SETTINGS,
        fontFamily: "sans" as const,
        headingFont: "Assistant",
        bodyFont: "Assistant",
        announcementText: "We ship out orders every Tuesday & Wednesday. With the deadline for ordering on Sundays at 18:00 (CET).",
        announcementBarColor: "#E6E0FA",
        announcementBarTextColor: "#1F1235"
      };
      setThemeSettings(updatedDefault);
    }
  }, []);

  // Save Cart to LocalStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('clarimento_cart', JSON.stringify(newCart));
  };

  // Save Theme to LocalStorage
  const saveThemeSettings = (newTheme: ThemeSettings) => {
    setThemeSettings(newTheme);
    localStorage.setItem('clarimento_theme_settings', JSON.stringify(newTheme));
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('clarimento_user', JSON.stringify(loggedInUser));
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('clarimento_user');
  };

  const handleNavigate = (view: 'home' | 'about' | 'shop' | 'recipes' | 'wholesale' | 'subscriptions') => {
    setCurrentView(view);
    if (view === 'shop') {
      setSelectedProductId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductFromHome = (productId: string) => {
    setSelectedProductId(productId);
    handleNavigate('shop');
  };

  const handleAddToCart = (product: Product, quantity: number, grind: string, weight: string) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.grindOption === grind &&
        item.weightOption === weight
    );

    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { product, quantity, grindOption: grind, weightOption: weight }];
    }

    saveCart(updatedCart);
    setIsCartOpen(true); // Open cart immediately for beautiful Shopify UX feedback
  };

  const handleUpdateCartQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    const updated = [...cart];
    updated[index].quantity = newQuantity;
    saveCart(updated);
  };

  const handleRemoveCartItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    saveCart(updated);
  };

  const handleCheckout = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity * (item.weightOption === '1kg' ? 3.5 : 1),
      0
    );
    
    const randomOrderNumber = `CL-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const deliveryEst = new Date();
    deliveryEst.setDate(deliveryEst.getDate() + (deliveryEst.getDay() === 2 || deliveryEst.getDay() === 4 ? 2 : 3));

    setCheckoutSummary({
      itemsCount: totalItems,
      totalPrice: totalPrice,
      orderNumber: randomOrderNumber,
      deliveryDate: deliveryEst.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    });

    setIsCartOpen(false);
    setIsCheckoutSuccessOpen(true);
    
    // Reset/Clear Cart
    saveCart([]);
  };

  const getFontFamily = () => {
    switch (themeSettings.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans': return 'font-sans';
      default: return 'font-sans';
    }
  };

  const getRadiusClass = () => {
    switch (themeSettings.buttonBorderRadius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'full': return 'rounded-full';
      default: return 'rounded-none';
    }
  };

  return (
    <div
      style={{
        backgroundColor: themeSettings.backgroundColor,
        color: themeSettings.textColor,
        transitionProperty: 'background-color, color',
        transitionDuration: '300ms',
      }}
      className={`min-h-screen flex flex-col ${getFontFamily()}`}
    >
      {/* Central Navigation header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        theme={themeSettings}
        onOpenCustomizer={() => setIsCustomizerOpen(!isCustomizerOpen)}
        isCustomizerOpen={isCustomizerOpen}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main viewport */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            products={PRODUCTS}
            onNavigateToProduct={handleSelectProductFromHome}
            onNavigateToWholesale={() => handleNavigate('wholesale')}
            onNavigateToSubscriptions={() => handleNavigate('subscriptions')}
            theme={themeSettings}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        )}
        {currentView === 'about' && (
          <AboutView theme={themeSettings} />
        )}
        {currentView === 'shop' && (
          <ProductView
            products={PRODUCTS}
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
            onAddToCart={handleAddToCart}
            theme={themeSettings}
          />
        )}
        {currentView === 'recipes' && (
          <RecipesView theme={themeSettings} />
        )}
        {currentView === 'subscriptions' && (
          <SubscriptionsView theme={themeSettings} />
        )}
        {currentView === 'wholesale' && (
          <WholesaleView theme={themeSettings} />
        )}
      </main>

      {/* Elegant Newsletter Sign-up Section */}
      <NewsletterSection theme={themeSettings} />

      {/* Minimal Footer */}
      <Footer theme={themeSettings} />

      {/* Slide-out Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        theme={themeSettings}
        onCheckout={handleCheckout}
      />

      {/* Shopify Dawn Live Customizer */}
      <ThemeCustomizer
        settings={themeSettings}
        onSettingsChange={saveThemeSettings}
        isOpen={isCustomizerOpen}
        onToggle={() => setIsCustomizerOpen(!isCustomizerOpen)}
      />

      {/* Interactive Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        theme={themeSettings}
      />

      {/* Checkout Success Modal overlay */}
      {isCheckoutSuccessOpen && checkoutSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
          <div className="relative w-full max-w-md bg-white text-neutral-800 p-6 md:p-8 shadow-2xl border border-neutral-100 rounded-sm space-y-6">
            <button
              onClick={() => setIsCheckoutSuccessOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors p-1"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="text-center space-y-3">
              <div className="bg-emerald-50 text-emerald-800 h-12 w-12 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-neutral-900">Allocation Order Secured!</h3>
              <p className="text-xs text-neutral-500 leading-normal">
                Your payment was authenticated securely. Our Copenhagen Roastery is scheduling your beans batch allocation.
              </p>
            </div>

            <div className="bg-neutral-50 p-4 border border-neutral-200/50 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="opacity-60">Order ID:</span>
                <span className="font-bold">{checkoutSummary.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Total Paid:</span>
                <span className="font-bold text-emerald-700">${checkoutSummary.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200/40 pt-2">
                <span className="opacity-60">Est. Dispatch:</span>
                <span className="font-bold">{checkoutSummary.deliveryDate}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs leading-normal">
                <Truck className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Carbon-Neutral Shipping:</strong> Expect a tracking link in your email once roasting completes on the next schedule batch day (Tues / Thurs).
                </p>
              </div>
              <div className="flex items-start gap-3 text-xs leading-normal">
                <Coffee className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Bio-Lot Authenticity:</strong> You will find a printable QR code inside the bean box detailing the farm soil pH, fermentation humidity, and roasted light specs.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutSuccessOpen(false)}
              className="w-full bg-neutral-900 text-white font-bold text-xs py-3 uppercase tracking-widest hover:bg-neutral-800 transition-all text-center"
              style={{ borderRadius: themeSettings.buttonBorderRadius === 'full' ? '999px' : '0px' }}
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

