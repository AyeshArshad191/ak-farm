import React from 'react';
import { Logo } from './Logo';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sliders, Code2, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'home' | 'shop' | 'about' | 'process' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const { siteSettings, setIsAdminOpen, setIsVsCodeGuideOpen } = useStore();

  return (
    <footer className="bg-[#12361f] text-stone-200 pt-12 pb-6 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-emerald-900/80">
          
          {/* Col 1: Brand & Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/95 p-3 rounded-2xl inline-block shadow-sm">
              <Logo size="md" />
            </div>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              AK FARM produces 100% pure, natural & traditional farm delicacies — from homemade mango murabba to Bilona Desi Ghee, wildflower honey, cold-pressed oils, and pickles.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified 100% Pure & Chemical Free</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider border-b border-emerald-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-amber-300 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('shop')} className="hover:text-amber-300 transition-colors">
                  Shop Farm Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('process')} className="hover:text-amber-300 transition-colors">
                  Our Traditional Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('about')} className="hover:text-amber-300 transition-colors">
                  About AK Farm
                </button>
              </li>
              <li>
                <button onClick={() => setIsAdminOpen(true)} className="hover:text-amber-300 transition-colors font-bold text-amber-300 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" /> Client Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider border-b border-emerald-800 pb-2">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>Homemade Murabba</li>
              <li>Pure Bilona Ghee</li>
              <li>Cold-Pressed Oils</li>
              <li>Desi Brown Sugar</li>
              <li>Raw Organic Honey</li>
              <li>Spicy Mango Pickle</li>
            </ul>
          </div>

          {/* Col 4: Contact & Order (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider border-b border-emerald-800 pb-2">
              Contact & Support
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="hover:text-amber-300">
                  {siteSettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-amber-300">
                  {siteSettings.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-stone-400 block mb-1">
                Accepted Payment Methods:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-stone-200">
                <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                  Cash On Delivery
                </span>
                <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                  Bank Transfer
                </span>
                <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                  EasyPaisa / JazzCash
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3 pt-2">
          <p>© {new Date().getFullYear()} AK FARM - PURE BY NATURE. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline" />
            <span>for authentic taste and pure health.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
