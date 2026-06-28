import { useState, useEffect, FormEvent } from 'react';
import { Send, FileText, CheckCircle2, ChevronRight, HelpCircle, MapPin, Building, Phone, Mail, Award, Clock } from 'lucide-react';
import { WholesaleForm, ThemeSettings } from '../types';

interface WholesaleViewProps {
  theme: ThemeSettings;
}

interface ApplicationHistory {
  id: string;
  form: WholesaleForm;
  submittedAt: string;
  ticketNumber: string;
}

export default function WholesaleView({ theme }: WholesaleViewProps) {
  const [formData, setFormData] = useState<WholesaleForm>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    businessType: 'Café',
    monthlyVolume: '15-30kg',
    message: '',
  });

  const [submittedApplication, setSubmittedApplication] = useState<ApplicationHistory | null>(null);

  useEffect(() => {
    // Check if an application is already recorded in localStorage to demonstrate persistence
    const saved = localStorage.getItem('clarimento_wholesale_app');
    if (saved) {
      setSubmittedApplication(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newApp: ApplicationHistory = {
      id: Date.now().toString(),
      form: formData,
      submittedAt: new Date().toLocaleDateString(),
      ticketNumber: `CLR-WHS-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setSubmittedApplication(newApp);
    localStorage.setItem('clarimento_wholesale_app', JSON.stringify(newApp));
  };

  const handleCancelApplication = () => {
    localStorage.removeItem('clarimento_wholesale_app');
    setSubmittedApplication(null);
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      businessType: 'Café',
      monthlyVolume: '15-30kg',
      message: '',
    });
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

  const businessTypes = ['Café', 'Restaurant', 'Hotel', 'Corporate Office', 'Retail Grocery Store', 'Other'];
  const monthlyVolumes = ['<5kg / month', '5-15kg / month', '15-30kg / month', '30-50kg / month', '50kg+ / month'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 space-y-16 font-sans">
      {/* Editorial Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-amber-700 block" style={{ color: theme.accentColor }}>
          premium partner services
        </span>
        <h1
          style={{ fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, serif' : theme.fontFamily === 'mono' ? 'JetBrains Mono, monospace' : `${theme.headingFont}, sans-serif` }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-tight"
        >
          Clarimento Coffee Wholesale Partnership
        </h1>
        <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans font-light">
          We provide high-clarity specialty beans, tailor-made espresso training regimens, and direct technical maintenance for leading cafés and luxury spaces globally. Formatted to Shopify Dawn wholesale templates.
        </p>
      </section>

      {/* Core Partnership Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-neutral-200/50 p-6 space-y-3 bg-stone-50 rounded-sm">
          <div className="bg-amber-100/80 p-2.5 rounded-full inline-block">
            <Award className="h-5 w-5 text-amber-900" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Custom Roast Specifications</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Choose from our signature light Nordic profiles, or calibrate a dedicated proprietary blend with our sensory team using colorimetry index analysis.
          </p>
        </div>

        <div className="border border-neutral-200/50 p-6 space-y-3 bg-stone-50 rounded-sm">
          <div className="bg-blue-100/80 p-2.5 rounded-full inline-block">
            <Building className="h-5 w-5 text-blue-950" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Specialist Machinery Sourcing</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Gain direct priority discounts and install servicing on world-class brewing hardware including <strong>La Marzocco</strong>, <strong>Slayer</strong>, and <strong>Mahlkönig</strong> grinders.
          </p>
        </div>

        <div className="border border-neutral-200/50 p-6 space-y-3 bg-stone-50 rounded-sm">
          <div className="bg-emerald-100/80 p-2.5 rounded-full inline-block">
            <Clock className="h-5 w-5 text-emerald-950" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Continuous Calibration</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Partners receive ongoing bi-weekly cupping audits, water filtration testing, and private advanced barista certification passes at our local showrooms.
          </p>
        </div>
      </section>

      {/* Main Form or Ticket display split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: FAQ / Requirements */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Application Requirements</h3>
            <ul className="space-y-3 text-xs leading-relaxed text-neutral-700">
              <li className="flex gap-2 items-start">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Minimum volume threshold of <strong>5kg per month</strong>.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Active business license / company registry certificate.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Commitment to maintaining clean water filtration system parameters (GH & KH checked monthly).</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Wholesale FAQ</h3>
            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <h5 className="font-bold text-neutral-800">What is your standard roasting lead time?</h5>
                <p className="opacity-75 leading-relaxed">We roast every Tuesday and Thursday. Orders finalized by Wednesday noon dispatch on Friday morning.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-neutral-800">Do you offer white-label roasting?</h5>
                <p className="opacity-75 leading-relaxed">We focus entirely on the Clarimento trademark to ensure rigorous bio-lot traceability standards.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Form or Live Application Ticket */}
        <div className="lg:col-span-8 bg-stone-50 border border-neutral-200/50 p-6 md:p-8 rounded-sm shadow-xs">
          {submittedApplication ? (
            /* Application Ticket and interactive timeline scheduler */
            <div id="wholesale-ticket-view" className="space-y-8">
              <div className="flex items-center gap-3 border-b border-neutral-200/80 pb-4 justify-between flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Partnership Application Active</h3>
                    <span className="text-xs font-mono text-neutral-400">{submittedApplication.ticketNumber}</span>
                  </div>
                </div>
                <button
                  id="cancel-wholesale-app-btn"
                  onClick={handleCancelApplication}
                  className="text-neutral-400 hover:text-red-500 font-mono text-[10px] underline hover:no-underline"
                >
                  Cancel / Re-apply
                </button>
              </div>

              {/* Receipt Summary Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-white p-4 border border-neutral-200/40">
                <div>
                  <span className="opacity-50 block uppercase text-[10px]">Company Name</span>
                  <span className="font-bold">{submittedApplication.form.companyName}</span>
                </div>
                <div>
                  <span className="opacity-50 block uppercase text-[10px]">Contact Person</span>
                  <span className="font-bold">{submittedApplication.form.contactName}</span>
                </div>
                <div>
                  <span className="opacity-50 block uppercase text-[10px]">Business Profile</span>
                  <span className="font-bold">{submittedApplication.form.businessType} • {submittedApplication.form.monthlyVolume}</span>
                </div>
                <div>
                  <span className="opacity-50 block uppercase text-[10px]">Submitted Date</span>
                  <span className="font-bold">{submittedApplication.submittedAt}</span>
                </div>
              </div>

              {/* Live interactive scheduler / onboarding milestones */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-neutral-800">Onboarding Roadmap</h4>
                <p className="text-[11px] text-neutral-500 leading-normal">
                  Your ticket is in our queue. Our local showroom sensory team will proceed with these milestones:
                </p>

                <div className="space-y-6 relative border-l border-neutral-200 pl-4 ml-2 pt-2">
                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 bg-emerald-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-[9px] font-bold font-mono">
                      ✓
                    </span>
                    <h5 className="text-xs font-bold text-neutral-900">Step 1: Automatic Territory & Credit Audit</h5>
                    <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                      Verification of company registry. Confirmed.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 bg-neutral-900 text-white rounded-full h-4 w-4 flex items-center justify-center text-[9px] font-bold font-mono">
                      2
                    </span>
                    <h5 className="text-xs font-bold text-neutral-900">Step 2: Custom Sample Kit Dispatch (Pending)</h5>
                    <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                      We dispatch an assortment of our Pink Bourbon and Nordic Espresso blends (2x 100g samples) free of charge to <strong>{submittedApplication.form.email}</strong>.
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-6 top-0.5 bg-neutral-200 text-neutral-400 rounded-full h-4 w-4 flex items-center justify-center text-[9px] font-bold font-mono">
                      3
                    </span>
                    <h5 className="text-xs font-bold text-neutral-300">Step 3: Showroom Calibration Call</h5>
                    <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                      A 30-minute sensory alignment video conference to configure water recipes and ideal grinding standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xs text-xs text-amber-900">
                💡 <strong>Barista Note:</strong> This wholesale registration has successfully verified the Shopify Dawn backend data collection. In a live store, this creates a draft client account labeled "Wholesale Tier".
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-neutral-950">Partner Inquiry Application</h2>
                <p className="text-xs text-neutral-500">Provide your enterprise specifications below. All applications are reviewed in 48 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block">Business / Company Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Modern Drip Café"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block">Contact Person Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Min-woo Park"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block">Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@business.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+82 10-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1 md:col-span-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block">Business Type</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs"
                    >
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block">Est. Monthly Volume</label>
                    <select
                      value={formData.monthlyVolume}
                      onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                      className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs"
                    >
                      {monthlyVolumes.map((vol) => (
                        <option key={vol} value={vol}>{vol}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold block">Website / Instagram (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. moderndrip.coffee"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-bold block">Business Pitch / Tell Us About Your Project</label>
                  <textarea
                    placeholder="Describe your design layout, target demographic, machinery constraints, and why you believe Clarimento fits..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full p-2.5 border border-neutral-200 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 rounded-xs leading-relaxed"
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all flex items-center justify-center gap-2 ${getRadiusClass()}`}
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Wholesale Registration</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
