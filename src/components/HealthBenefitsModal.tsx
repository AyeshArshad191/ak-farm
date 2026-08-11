import React from 'react';
import { X, Heart, ShieldCheck, Zap, Sparkles, Check } from 'lucide-react';

interface HealthBenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthBenefitsModal: React.FC<HealthBenefitsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const benefits = [
    {
      title: 'Desi Bilona Ghee',
      subtitle: 'Pure A2 Cow Milk Fat',
      badge: 'DIGESTION & IMMUNITY',
      icon: '🧈',
      points: [
        'Churned using traditional A2 curd fermentation bilona method',
        'Rich in Butyric acid which strengthens intestinal lining & gut health',
        'High smoke point (250°C) perfect for cooking without toxicity',
        'Packed with Fat-Soluble Vitamins A, D, E & K'
      ]
    },
    {
      title: 'Wild Sidr & Organic Honey',
      subtitle: 'Raw & Unfiltered Wildflower Nectar',
      badge: 'NATURAL ANTIBIOTIC',
      icon: '🍯',
      points: [
        '100% Raw & Unheated - preserves natural living enzymes and pollen',
        'Soothes throat infections, coughs, and seasonal allergies',
        'Natural antibacterial and anti-inflammatory properties',
        'Healthy natural alternative to refined white sugar'
      ]
    },
    {
      title: 'Homemade Organic Murabba',
      subtitle: 'Mango, Apple & Amla Delicacies',
      badge: 'HEART & VITALITY',
      icon: '🥭',
      points: [
        'Saeb (Apple) Murabba tones heart muscles & relieves mental stress',
        'Amla Murabba provides rich Vitamin C for hair, eyes, and skin glow',
        'Mango Murabba boosts appetite and digestive enzymes',
        'Preserved naturally without artificial acids or chemical gums'
      ]
    },
    {
      title: 'Cold-Pressed Kachi Ghani Oils',
      subtitle: 'Sarso & Sweet Almond Oils',
      badge: 'SKIN & HAIR CARE',
      icon: '🌱',
      points: [
        'Extracted at room temperature using wood-press (Kachi Ghani)',
        'Mustard oil contains Omega-3 & Omega-6 essential fatty acids',
        'Sweet Almond oil nourishes memory, glowing skin, and scalp',
        'Zero mineral oils, chemical solvents, or artificial fragrances'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-[#1b4d2e] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-400/30">
              <Heart className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AK FARM WELLNESS GUIDE
              </span>
              <h3 className="text-xl font-serif font-bold">Health Benefits of Organic Foods</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Grid */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#fcfbf7]">
          
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              At <strong>AK Farm</strong>, we adhere to 100% chemical-free traditional preparation. No preservatives, synthetic colors, or artificial essences are used in any of our items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#1b4d2e]/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-stone-500 font-medium">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.badge}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-1 text-xs text-stone-600">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1b4d2e] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Pure Quality Guaranteed by AK Farm</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1b4d2e] hover:bg-[#133921] text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Got It, Thanks!
          </button>
        </div>

      </div>
    </div>
  );
};
