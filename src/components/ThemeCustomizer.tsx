import { useState } from 'react';
import { Sliders, Check, RotateCcw, Sparkles, X, ChevronRight, Menu } from 'lucide-react';
import { ThemeSettings } from '../types';
import { THEME_PRESETS } from '../data';

interface ThemeCustomizerProps {
  settings: ThemeSettings;
  onSettingsChange: (settings: ThemeSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ThemeCustomizer({
  settings,
  onSettingsChange,
  isOpen,
  onToggle,
}: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'preset' | 'typography' | 'colors' | 'layout'>('preset');

  const handlePresetSelect = (presetSettings: ThemeSettings) => {
    onSettingsChange({ ...presetSettings });
  };

  const updateField = (key: keyof ThemeSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const handleReset = () => {
    onSettingsChange({ ...THEME_PRESETS[0].settings });
  };

  return (
    <>
      {/* Floating Toggle button */}
      <button
        id="shopify-customizer-toggle"
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-neutral-900 text-white px-4 py-3 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-neutral-800 border border-neutral-800"
      >
        <Sliders className="h-4 w-4 animate-pulse text-amber-400" />
        <span className="text-xs font-medium font-sans">Shopify Theme Editor</span>
      </button>

      {/* Slide-out Customizer Panel (Left Hand Side) */}
      <div
        id="shopify-customizer-panel"
        className={`fixed inset-y-0 left-0 z-50 w-80 md:w-96 border-r border-neutral-200/60 bg-white text-neutral-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 px-5 py-4 bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full">
                Dawn Theme 12.0
              </span>
              <span className="text-neutral-400 text-xs">Live Preview</span>
            </div>
            <h2 className="text-sm font-bold tracking-tight text-neutral-900 flex items-center gap-1.5 mt-0.5">
              Clarimento Customizer
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              id="reset-theme-btn"
              onClick={handleReset}
              title="Reset to default"
              className="text-neutral-400 hover:text-neutral-900 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              id="close-customizer-btn"
              onClick={onToggle}
              className="text-neutral-400 hover:text-neutral-900 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Customizer Tabs Navigation */}
        <div className="flex border-b border-neutral-200 text-xs text-neutral-500 font-medium bg-neutral-50 overflow-x-auto scrollbar-none">
          <button
            id="tab-preset"
            onClick={() => setActiveTab('preset')}
            className={`flex-1 py-3 text-center border-b-2 transition-all min-w-[70px] ${
              activeTab === 'preset'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent hover:text-neutral-800'
            }`}
          >
            Presets
          </button>
          <button
            id="tab-typography"
            onClick={() => setActiveTab('typography')}
            className={`flex-1 py-3 text-center border-b-2 transition-all min-w-[75px] ${
              activeTab === 'typography'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent hover:text-neutral-800'
            }`}
          >
            Fonts
          </button>
          <button
            id="tab-colors"
            onClick={() => setActiveTab('colors')}
            className={`flex-1 py-3 text-center border-b-2 transition-all min-w-[70px] ${
              activeTab === 'colors'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent hover:text-neutral-800'
            }`}
          >
            Colors
          </button>
          <button
            id="tab-layout"
            onClick={() => setActiveTab('layout')}
            className={`flex-1 py-3 text-center border-b-2 transition-all min-w-[70px] ${
              activeTab === 'layout'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent hover:text-neutral-800'
            }`}
          >
            Section
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {activeTab === 'preset' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200/60 p-3 rounded-md text-xs text-amber-900 leading-relaxed">
                <strong>💡 Shopify Theme Tip:</strong> Theme presets swap the entire brand look in one click, perfectly mirroring standard Shopify configuration structures.
              </div>

              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Select Design Preset
                </label>
                {THEME_PRESETS.map((p) => {
                  const isSelected =
                    settings.backgroundColor === p.settings.backgroundColor &&
                    settings.fontFamily === p.settings.fontFamily;

                  return (
                    <button
                      id={`preset-btn-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
                      key={p.name}
                      onClick={() => handlePresetSelect(p.settings)}
                      className={`w-full text-left p-3.5 border transition-all duration-200 flex flex-col justify-between hover:border-neutral-400 hover:shadow-xs relative ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-900/5 ring-1 ring-neutral-900'
                          : 'border-neutral-200 bg-white'
                      }`}
                      style={{ borderRadius: '4px' }}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xs font-semibold text-neutral-900">{p.name}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        {/* Swatches representation */}
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: p.settings.backgroundColor }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: p.settings.primaryColor }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: p.settings.accentColor }}
                        />
                        <span className="text-[9px] text-neutral-400 ml-1">
                          Font: {p.settings.headingFont}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Typography Family
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['serif', 'sans', 'mono'] as const).map((font) => (
                    <button
                      id={`font-family-btn-${font}`}
                      key={font}
                      onClick={() => {
                        const hFont = font === 'serif' ? 'Playfair Display' : font === 'sans' ? 'Jost' : 'JetBrains Mono';
                        onSettingsChange({
                          ...settings,
                          fontFamily: font,
                          headingFont: hFont,
                          bodyFont: font === 'sans' ? 'Jost' : settings.bodyFont
                        });
                      }}
                      className={`py-2 px-3 border text-xs capitalize text-center ${
                        settings.fontFamily === font
                          ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
                      }`}
                      style={{ borderRadius: '4px' }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-neutral-100 rounded-md border border-neutral-200/50 space-y-1">
                <span className="text-[10px] text-neutral-400 block uppercase font-bold">Font Pairing Preview</span>
                <p
                  className="text-lg font-semibold tracking-tight"
                  style={{ fontFamily: settings.fontFamily === 'serif' ? 'Playfair Display, Georgia, serif' : settings.fontFamily === 'mono' ? 'JetBrains Mono, monospace' : 'Jost, sans-serif' }}
                >
                  Clarimento Roasters
                </p>
                <p className="text-xs text-neutral-600 leading-normal font-sans">
                  Slow-living roasting philosophy since 2026. Custom light roast profiles.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Custom Button Styling
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['none', 'sm', 'md', 'full'] as const).map((rad) => (
                    <button
                      id={`radius-btn-${rad}`}
                      key={rad}
                      onClick={() => updateField('buttonBorderRadius', rad)}
                      className={`py-1.5 border text-[10px] capitalize text-center ${
                        settings.buttonBorderRadius === rad
                          ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                      }`}
                      style={{ borderRadius: '4px' }}
                    >
                      {rad}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Brand Palette Configurator
              </label>

              {/* Color selectors list */}
              <div className="space-y-3.5">
                {/* Background color */}
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-2.5">
                  <div>
                    <span className="text-xs font-medium text-neutral-900 block">Theme Canvas</span>
                    <span className="text-[10px] text-neutral-400">Primary background color</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => updateField('backgroundColor', e.target.value)}
                      className="w-8 h-8 rounded-full border border-neutral-300 cursor-pointer overflow-hidden"
                    />
                    <span className="text-xs font-mono w-16 text-neutral-600 uppercase">{settings.backgroundColor}</span>
                  </div>
                </div>

                {/* Primary theme color */}
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-2.5">
                  <div>
                    <span className="text-xs font-medium text-neutral-900 block">Brand Core</span>
                    <span className="text-[10px] text-neutral-400">Buttons & strong borders</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => updateField('primaryColor', e.target.value)}
                      className="w-8 h-8 rounded-full border border-neutral-300 cursor-pointer overflow-hidden"
                    />
                    <span className="text-xs font-mono w-16 text-neutral-600 uppercase">{settings.primaryColor}</span>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-2.5">
                  <div>
                    <span className="text-xs font-medium text-neutral-900 block">Warm Accent</span>
                    <span className="text-[10px] text-neutral-400">Coffee notes, highlights</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => updateField('accentColor', e.target.value)}
                      className="w-8 h-8 rounded-full border border-neutral-300 cursor-pointer overflow-hidden"
                    />
                    <span className="text-xs font-mono w-16 text-neutral-600 uppercase">{settings.accentColor}</span>
                  </div>
                </div>

                {/* Text Color */}
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-2.5">
                  <div>
                    <span className="text-xs font-medium text-neutral-900 block">Body Text</span>
                    <span className="text-[10px] text-neutral-400">Paragraphs and secondary links</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={settings.textColor}
                      onChange={(e) => updateField('textColor', e.target.value)}
                      className="w-8 h-8 rounded-full border border-neutral-300 cursor-pointer overflow-hidden"
                    />
                    <span className="text-xs font-mono w-16 text-neutral-600 uppercase">{settings.textColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Announcement Bar
              </label>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-800">Show Announcement</span>
                  <input
                    type="checkbox"
                    checked={settings.showAnnouncementBar}
                    onChange={(e) => updateField('showAnnouncementBar', e.target.checked)}
                    className="w-4 h-4 rounded-sm border-neutral-300 text-neutral-950 focus:ring-neutral-950 cursor-pointer"
                  />
                </div>

                {settings.showAnnouncementBar && (
                  <div className="space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Promo Text</span>
                    <textarea
                      value={settings.announcementText}
                      onChange={(e) => updateField('announcementText', e.target.value)}
                      rows={2}
                      className="w-full text-xs p-2 border border-neutral-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-neutral-50"
                    />
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-100 pt-4 space-y-3">
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Header Style
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['minimal', 'classic', 'bold'] as const).map((style) => (
                    <button
                      id={`header-style-btn-${style}`}
                      key={style}
                      onClick={() => updateField('headerStyle', style)}
                      className={`py-1.5 border text-[10px] capitalize text-center ${
                        settings.headerStyle === style
                          ? 'border-neutral-900 bg-neutral-900 text-white font-semibold'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                      }`}
                      style={{ borderRadius: '4px' }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-neutral-800 block">Smooth Animations</span>
                    <span className="text-[10px] text-neutral-400">Enable transitions & motion</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableAnimations}
                    onChange={(e) => updateField('enableAnimations', e.target.checked)}
                    className="w-4 h-4 rounded-sm border-neutral-300 text-neutral-950 focus:ring-neutral-950 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-neutral-200 p-4 bg-neutral-50 text-center">
          <p className="text-[10px] text-neutral-400 leading-normal">
            Clarimento custom build. Modifications directly update the inline styling tokens. Easy to maintain & scale.
          </p>
        </div>
      </div>
    </>
  );
}
