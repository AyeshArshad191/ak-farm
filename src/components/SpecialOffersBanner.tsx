import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface SpecialOffersBannerProps {
  onShopClick: () => void;
}

export const SpecialOffersBanner: React.FC<SpecialOffersBannerProps> = ({ onShopClick }) => {
  const { addToCart, products } = useStore();

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddBundleToCart = () => {
    const ghee = products.find((p) => p.id.includes('ghee'));
    const murabba = products.find((p) => p.id.includes('murabba'));
    const honey = products.find((p) => p.id.includes('honey'));

    if (ghee) addToCart(ghee);
    if (murabba) addToCart(murabba);
    if (honey) addToCart(honey);
  };

  return (
    <section className="py-10 bg-gradient-to-r from-[#12361f] via-[#1b4d2e] to-[#0f2e1a] text-white relative overflow-hidden my-8 rounded-3xl mx-4 sm:mx-8 lg:mx-auto max-w-7xl shadow-xl border border-emerald-800">
      
      {/* Glow background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="p-6 sm:p-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              UP TO 25% OFF • LIMITED TIME BUNDLE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black text-amber-100 leading-tight">
            Pure Goodness. Special Prices.
          </h2>

          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Get Pakistan’s favorite pure farm essentials together in one healthy family package: <strong>Desi A2 Ghee (1KG)</strong>, <strong>Homemade Mango Murabba</strong>, and <strong>Wildflower Honey</strong>.
          </p>

          {/* Countdown Timer */}
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
              <Clock className="w-4 h-4 text-amber-400" /> Ends In:
            </span>
            <div className="flex items-center gap-2 text-xs font-mono font-black">
              <div className="bg-amber-400 text-stone-900 px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.hours).padStart(2, '0')}h
              </div>
              <span>:</span>
              <div className="bg-amber-400 text-stone-900 px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </div>
              <span>:</span>
              <div className="bg-amber-400 text-stone-900 px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              onClick={handleAddBundleToCart}
              className="flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Special Bundle (Rs. 6,090)</span>
            </button>

            <button
              onClick={onShopClick}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              Shop All Offers
            </button>
          </div>
        </div>

        {/* Right Column: Visual Combo Images */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-md w-full">
            <div className="space-y-1 text-center">
              <img
                src="/assets/images/desi_ghee_1786299321528.jpg"
                alt="Desi Ghee"
                referrerPolicy="no-referrer"
                className="w-full h-24 sm:h-28 object-cover rounded-xl border border-white/30"
              />
              <span className="text-[10px] font-bold text-amber-200 block truncate">A2 Desi Ghee</span>
            </div>

            <div className="space-y-1 text-center">
              <img
                src="/assets/images/mango_murabba_1786299305761.jpg"
                alt="Mango Murabba"
                referrerPolicy="no-referrer"
                className="w-full h-24 sm:h-28 object-cover rounded-xl border border-white/30"
              />
              <span className="text-[10px] font-bold text-amber-200 block truncate">Mango Murabba</span>
            </div>

            <div className="space-y-1 text-center">
              <img
                src="/assets/images/pure_honey_1786299335264.jpg"
                alt="Organic Honey"
                referrerPolicy="no-referrer"
                className="w-full h-24 sm:h-28 object-cover rounded-xl border border-white/30"
              />
              <span className="text-[10px] font-bold text-amber-200 block truncate">Wild Honey</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
