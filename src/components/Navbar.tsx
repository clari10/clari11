import { ShoppingBag, Menu, Sliders, X, User, LogOut } from 'lucide-react';
import { ThemeSettings, CartItem, User as UserType } from '../types';

interface NavbarProps {
  currentView: 'home' | 'about' | 'shop' | 'recipes' | 'wholesale' | 'subscriptions';
  onNavigate: (view: 'home' | 'about' | 'shop' | 'recipes' | 'wholesale' | 'subscriptions') => void;
  cart: CartItem[];
  onOpenCart: () => void;
  theme: ThemeSettings;
  onOpenCustomizer: () => void;
  isCustomizerOpen: boolean;
  user: UserType | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  cart,
  onOpenCart,
  theme,
  onOpenCustomizer,
  isCustomizerOpen,
  user,
  onOpenLogin,
  onLogout,
}: NavbarProps) {
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getFontFamily = () => {
    switch (theme.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans': return 'font-sans';
      default: return 'font-sans';
    }
  };

  const getLogoStyle = () => {
    if (theme.fontFamily === 'serif') {
      return { fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, letterSpacing: '0.18em' };
    } else if (theme.fontFamily === 'mono') {
      return { fontFamily: 'JetBrains Mono, monospace', fontWeight: 400, letterSpacing: '0.08em' };
    } else {
      return { fontFamily: `${theme.headingFont}, sans-serif`, fontWeight: 500, letterSpacing: '0.24em' };
    }
  };

  const getNavLinkClass = (view: typeof currentView) => {
    const isCurrent = currentView === view;
    return `relative text-[10px] md:text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-350 pb-1 cursor-pointer select-none ${
      isCurrent ? 'opacity-100' : 'opacity-55 hover:opacity-100'
    }`;
  };

  const getNavLinkStyle = (view: typeof currentView) => {
    const isCurrent = currentView === view;
    return {
      color: isCurrent ? theme.accentColor : theme.textColor,
    };
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 shadow-xs ${getFontFamily()}`}>
      {/* Announcement Bar */}
      {theme.showAnnouncementBar && (
        <div
          id="announcement-bar"
          style={{ backgroundColor: theme.announcementBarColor, color: theme.announcementBarTextColor }}
          className="w-full text-center py-2 px-4 text-[10px] md:text-xs font-semibold tracking-widest uppercase flex items-center justify-center border-b border-neutral-200/10"
        >
          <span className="inline-block animate-pulse mr-1">●</span> {theme.announcementText}
        </div>
      )}

      {/* Sey Coffee style Header: Logo -> Home, Shop, About, Wholesale, Recipes */}
      <div
        id="navbar-main"
        style={{ backgroundColor: theme.backgroundColor }}
        className="px-4 md:px-8 py-7 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-200/10"
      >
        {/* Left / Center-Left: Brand Logo and Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 lg:gap-14 w-full md:w-auto justify-center md:justify-start">
          {/* Brand Logo */}
          <div className="flex flex-col items-center md:items-start shrink-0">
            <button
              id="nav-logo-btn"
              onClick={() => onNavigate('home')}
              style={{ ...getLogoStyle(), color: theme.primaryColor }}
              className="text-xl md:text-2xl font-medium tracking-[0.22em] uppercase scale-y-[1.12] origin-center inline-block transition-transform duration-200 hover:scale-y-[1.15] hover:scale-x-[1.01] text-center md:text-left"
            >
              CLARIMENTO
            </button>
          </div>

          {/* Navigation Links (Home, Shop, About, Wholesale, Recipes) - always visible, plain elegant text links */}
          <nav className="flex items-center justify-center gap-4 sm:gap-5 md:gap-7 flex-wrap">
            <button
              id="nav-link-home"
              onClick={() => onNavigate('home')}
              style={getNavLinkStyle('home')}
              className={getNavLinkClass('home')}
            >
              Home
              {currentView === 'home' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  style={{ backgroundColor: theme.accentColor }}
                />
              )}
            </button>
            <button
              id="nav-link-shop"
              onClick={() => onNavigate('shop')}
              style={getNavLinkStyle('shop')}
              className={getNavLinkClass('shop')}
            >
              Shop
              {currentView === 'shop' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  style={{ backgroundColor: theme.accentColor }}
                />
              )}
            </button>
            <button
              id="nav-link-about"
              onClick={() => onNavigate('about')}
              style={getNavLinkStyle('about')}
              className={getNavLinkClass('about')}
            >
              About
              {currentView === 'about' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  style={{ backgroundColor: theme.accentColor }}
                />
              )}
            </button>
            <button
              id="nav-link-wholesale"
              onClick={() => onNavigate('wholesale')}
              style={getNavLinkStyle('wholesale')}
              className={getNavLinkClass('wholesale')}
            >
              Wholesale
              {currentView === 'wholesale' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  style={{ backgroundColor: theme.accentColor }}
                />
              )}
            </button>
            <button
              id="nav-link-recipes"
              onClick={() => onNavigate('recipes')}
              style={getNavLinkStyle('recipes')}
              className={getNavLinkClass('recipes')}
            >
              Recipes
              {currentView === 'recipes' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  style={{ backgroundColor: theme.accentColor }}
                />
              )}
            </button>
            <button
              id="nav-link-subscriptions"
              onClick={() => onNavigate('subscriptions')}
              style={getNavLinkStyle('subscriptions')}
              className={getNavLinkClass('subscriptions')}
            >
              Subscriptions
              {currentView === 'subscriptions' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300"
                  style={{ backgroundColor: theme.accentColor }}
                />
              )}
            </button>
          </nav>
        </div>

        {/* Right side: Customize button, Cart, and Log In/Log Out */}
        <div className="flex items-center gap-3.5 shrink-0 justify-center w-full md:w-auto">
          <button
            id="nav-theme-customizer-trigger"
            onClick={onOpenCustomizer}
            style={{ color: theme.primaryColor }}
            className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase border px-3 py-1.5 transition-all ${
              theme.buttonBorderRadius === 'full' ? 'rounded-full' : theme.buttonBorderRadius === 'sm' ? 'rounded-sm' : 'rounded-none'
            } ${isCustomizerOpen ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 hover:bg-neutral-100'}`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Customize</span>
          </button>

          {/* Cart Icon trigger */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            style={{ color: theme.primaryColor }}
            className="relative p-1.5 transition-transform duration-200 hover:scale-105"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5 md:h-5.5 md:w-5.5 stroke-[1.8]" />
            {cartItemCount > 0 && (
              <span
                style={{ backgroundColor: theme.accentColor, color: '#FFFFFF' }}
                className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold shadow-xs border border-white"
              >
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Login or User Profile section */}
          {user ? (
            <div className="flex items-center gap-1.5 pl-1.5 border-l border-neutral-200/20">
              <span 
                className="hidden lg:inline text-[9px] font-bold tracking-wider uppercase opacity-75"
                style={{ color: theme.textColor }}
              >
                {user.name}
              </span>
              <button
                id="nav-logout-btn"
                onClick={onLogout}
                style={{ color: theme.primaryColor }}
                className="relative p-1.5 transition-transform duration-200 hover:scale-105 flex items-center justify-center"
                title="Log Out"
              >
                <LogOut className="h-5 w-5 md:h-5.5 md:w-5.5 stroke-[1.8]" />
              </button>
            </div>
          ) : (
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              style={{ color: theme.primaryColor }}
              className="relative p-1.5 transition-transform duration-200 hover:scale-105 flex items-center gap-1"
              title="Log In"
            >
              <User className="h-5 w-5 md:h-5.5 md:w-5.5 stroke-[1.8]" />
              <span className="hidden sm:inline text-[10px] font-bold tracking-widest uppercase">Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
