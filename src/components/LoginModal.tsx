import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, CheckCircle2, Coffee } from 'lucide-react';
import { ThemeSettings, User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  theme: ThemeSettings;
}

export default function LoginModal({ isOpen, onClose, onLogin, theme }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = (demoName: string, demoEmail: string) => {
    setSuccess(true);
    setError('');
    setTimeout(() => {
      onLogin({ name: demoName, email: demoEmail });
      resetForm();
    }, 1200);
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
    setError('');
    setSuccess(false);
    setIsSignUp(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isSignUp && !name) {
      setError('Please enter your name.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    // Interactive successful log in
    setSuccess(true);
    setTimeout(() => {
      onLogin({
        name: isSignUp ? name : email.split('@')[0],
        email: email,
      });
      resetForm();
    }, 1200);
  };

  const getRadiusClass = () => {
    switch (theme.buttonBorderRadius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'full': return 'rounded-2xl';
      default: return 'rounded-none';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs font-sans">
      <div 
        style={{ backgroundColor: theme.cardBackgroundColor }}
        className={`relative w-full max-w-md p-6 md:p-8 shadow-2xl border border-neutral-200/10 transition-all duration-300 ${getRadiusClass()}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors p-1"
          style={{ color: theme.textColor }}
        >
          <X className="h-4.5 w-4.5 opacity-60 hover:opacity-100" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div 
              style={{ backgroundColor: `${theme.accentColor}15`, color: theme.accentColor }}
              className="h-16 w-16 rounded-full flex items-center justify-center mx-auto border border-neutral-200/5"
            >
              <CheckCircle2 className="h-9 w-9 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight" style={{ color: theme.textColor }}>
                Welcome Back!
              </h3>
              <p className="text-xs opacity-60 max-w-xs mx-auto">
                Authentication successful. Preparing your personalized coffee allocation profile.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="flex justify-center mb-2">
                <Coffee className="h-6 w-6 stroke-[1.5]" style={{ color: theme.accentColor }} />
              </div>
              <h3 className="text-lg font-black tracking-widest uppercase" style={{ color: theme.textColor }}>
                {isSignUp ? 'Create Account' : 'Member Sign In'}
              </h3>
              <p className="text-[10px] uppercase tracking-wider opacity-50">
                {isSignUp ? 'Clarimento Roasters allocation' : 'Access your exclusive fresh roast queue'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-800 text-xs px-3 py-2 border border-red-200/50 rounded-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1">
                  <label className="block text-[9px] font-bold uppercase tracking-widest opacity-60">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs bg-transparent border border-neutral-300/40 focus:border-neutral-900 focus:outline-none transition-all font-sans"
                      style={{ color: theme.textColor }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[9px] font-bold uppercase tracking-widest opacity-60">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-xs bg-transparent border border-neutral-300/40 focus:border-neutral-900 focus:outline-none transition-all font-sans"
                    style={{ color: theme.textColor }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-bold uppercase tracking-widest opacity-60">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 text-xs bg-transparent border border-neutral-300/40 focus:border-neutral-900 focus:outline-none transition-all font-sans"
                    style={{ color: theme.textColor }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all"
              >
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-[10px] uppercase tracking-wider underline opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: theme.textColor }}
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Demo Quick Logins Section */}
            <div className="border-t border-neutral-300/20 pt-4 space-y-2">
              <p className="text-center text-[9px] uppercase tracking-widest opacity-50">
                Quick Access Demo Accounts
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Clement', 'clement@clarimento.com')}
                  className="p-2 border border-neutral-300/30 hover:bg-neutral-100/10 text-left transition-colors cursor-pointer"
                  style={{ color: theme.textColor }}
                >
                  <p className="text-[10px] font-bold">Clement</p>
                  <p className="text-[8px] opacity-50">Coffee Enthusiast</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Marta (Café Copenhagen)', 'marta@coffeeco.dk')}
                  className="p-2 border border-neutral-300/30 hover:bg-neutral-100/10 text-left transition-colors cursor-pointer"
                  style={{ color: theme.textColor }}
                >
                  <p className="text-[10px] font-bold">Marta</p>
                  <p className="text-[8px] opacity-50">Wholesale Partner</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
