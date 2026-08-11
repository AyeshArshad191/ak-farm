import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  onShopClick: () => void;
  onProcessClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onProcessClick }) => {
  return (
    <section className="relative bg-[#f7f5ef] overflow-hidden py-12 lg:py-16 border-b border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#d97706] text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
              FROM OUR FARM TO YOUR HOME
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#1b4d2e] leading-[1.12] tracking-tight">
              Pure, Natural &<br />
              Trusted Goodness
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience the authentic taste of nature. 100% pure, high quality & traditionally made for your family.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="group flex items-center gap-2.5 px-7 py-3 bg-[#1b4d2e] hover:bg-[#12361f] text-white text-sm font-semibold rounded-full shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onProcessClick}
                className="px-7 py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-sm font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
              >
                Our Process
              </button>
            </div>

          </div>

          {/* Right Banner Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white group">
              <img
                src="/assets/images/ak_farm_hero_1786299288820.jpg"
                alt="AK FARM Pure Natural Products"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] lg:h-[450px] object-cover group-hover:scale-102 transition-transform duration-700"
              />
              {/* Overlay Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-stone-100 flex items-center gap-3">
                <div className="p-2 bg-amber-100/90 rounded-lg">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-[9px] font-bold tracking-wider text-stone-400 uppercase">AK FARM QUALITY</div>
                  <div className="text-xs font-bold text-[#1b4d2e]">100% Guaranteed Pure</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
