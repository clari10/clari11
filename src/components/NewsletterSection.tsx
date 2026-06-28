import React, { useState, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ThemeSettings } from '../types';

interface NewsletterSectionProps {
  theme: ThemeSettings;
}

export default function NewsletterSection({ theme }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
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
    <section 
      style={{ backgroundColor: '#F9F8F6' }} // Classic warm minimalist paper/sand background (typical of April Coffee)
      className="border-t border-neutral-200/40 py-20 md:py-28 px-6 text-center font-sans"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Subtle Accent Label */}
        <span 
          className="text-[10px] tracking-[0.4em] uppercase font-bold block opacity-70"
          style={{ color: theme.accentColor }}
        >
          NEWSLETTER
        </span>

        {/* Large Aesthetic Heading */}
        <h2 
          style={{ 
            fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : `${theme.headingFont}, sans-serif` 
          }}
          className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900 leading-tight"
        >
          Stay Updated on New Releases & Events
        </h2>

        {/* Minimal Descriptive Text */}
        <p className="text-xs md:text-sm text-neutral-500 font-light max-w-lg mx-auto leading-relaxed">
          Sign up to receive priority access to our single-origin micro-lot releases, custom roast schedules, and invitation-only cupping sessions in Copenhagen, Seoul, and Tokyo.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-neutral-950 text-white text-xs tracking-widest uppercase px-6 py-4 border border-neutral-900/10 animate-fade-in">
            <Check className="h-4.5 w-4.5 text-emerald-400 stroke-[2]" />
            <span>Thank you for subscribing.</span>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-3 pt-4"
          >
            {/* Elegant Minimalist Input - bottom border only, transparent background */}
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow bg-transparent border-b border-neutral-300 focus:border-neutral-900 py-3 px-1 text-xs tracking-wide focus:outline-none transition-colors text-neutral-900 placeholder-neutral-400 font-sans"
            />
            
            {/* Elegant text-button with arrow */}
            <button
              type="submit"
              style={{ 
                backgroundColor: theme.primaryColor,
                color: theme.backgroundColor
              }}
              className={`px-7 py-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${getRadiusClass()}`}
            >
              <span>Subscribe</span>
              <ArrowRight className="h-3 w-3 stroke-[2.5]" />
            </button>
          </form>
        )}

        <p className="text-[9px] text-neutral-400 uppercase tracking-wider">
          You can unsubscribe at any time. Read our <a href="#" className="underline hover:text-neutral-900">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}
