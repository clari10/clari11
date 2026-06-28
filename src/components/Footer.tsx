import { useState, FormEvent } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { ThemeSettings } from '../types';

interface FooterProps {
  theme: ThemeSettings;
}

export default function Footer({ theme }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const getFontFamilyClass = () => {
    switch (theme.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'sans': return 'font-sans';
      default: return 'font-sans';
    }
  };

  return (
    <footer
      style={{ backgroundColor: '#ffffff', color: '#000000' }}
      className={`px-8 py-16 md:py-24 border-t border-neutral-200 ${getFontFamilyClass()}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm leading-relaxed">
        {/* Brand statement */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-lg uppercase tracking-[0.2em] font-bold text-neutral-900">CLARIMENTO</h3>
          <p className="text-neutral-600 text-xs max-w-xs font-light">
            We source specialty coffee beans directly from carbon-conscious micro-lots. Our light, sustainable roasting profile highlights native geographic sugars, floral volatiles, and clean acids.
          </p>
          <div className="text-[10px] text-neutral-400">
            © 2026 CLARIMENTO COFFEE INC.<br />
            Powered by Shopify Dawn Engine.
          </div>
        </div>

        {/* Navigation columns */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400">STORES & COFFEEBARS</h4>
          <ul className="space-y-2 text-xs text-neutral-600 font-light">
            <li>
              <span className="font-semibold block text-neutral-800">Hannam Showroom</span>
              <span className="opacity-75">79 Yongsan-gu, Seoul</span>
            </li>
            <li>
              <span className="font-semibold block text-neutral-800">Copenhagen Roastery</span>
              <span className="opacity-75">Nordhavn 21, Denmark</span>
            </li>
            <li>
              <span className="font-semibold block text-neutral-800">Tokyo Laboratory</span>
              <span className="opacity-75">Shibuya 3-Chome, Tokyo</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400">INFORMATION</h4>
          <ul className="space-y-2 text-xs text-neutral-600 font-light">
            <li><a href="#" className="hover:underline transition-all hover:text-neutral-900">Roasting Schedule</a></li>
            <li><a href="#" className="hover:underline transition-all hover:text-neutral-900">Sustainability Metrics</a></li>
            <li><a href="#" className="hover:underline transition-all hover:text-neutral-900">Careers</a></li>
            <li><a href="#" className="hover:underline transition-all hover:text-neutral-900">Wholesale Partnerships</a></li>
            <li><a href="#" className="hover:underline transition-all hover:text-neutral-900">Shipping & Refund Policies</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400">DISCOVER OUR RELEASES</h4>
          <p className="text-xs text-neutral-600 font-light">
            Subscribe to receive priority allocations, single-origin drops, and private cupping event invitations.
          </p>
          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium py-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Priority subscription activated! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderColor: '#8B5CF6', backgroundColor: '#ffffff' }}
                className="w-full text-xs px-4 py-3 pr-10 border text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-purple-600 transition-all rounded-none"
              />
              <button
                type="submit"
                className="absolute right-3 text-neutral-400 hover:text-purple-600 transition-colors"
                aria-label="Submit email"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
          <div className="flex gap-4 pt-2">
            {/* Social icons labels representation */}
            <a href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Instagram</a>
            <a href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Spotify</a>
            <a href="#" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
