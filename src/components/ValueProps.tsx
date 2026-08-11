import React from 'react';
import { Leaf, UtensilsCrossed, ShieldCheck, Truck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: '100% Pure & Natural',
      description: 'No chemicals, no preservatives. Just raw, unadulterated goodness from nature.',
      bgColor: 'bg-emerald-100',
      iconColor: 'text-[#1b4d2e]'
    },
    {
      icon: UtensilsCrossed,
      title: 'Traditional Methods',
      description: 'Slow-cooked and prepared using time-honored techniques to retain authentic taste.',
      bgColor: 'bg-amber-100',
      iconColor: 'text-[#b45309]'
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Quality',
      description: 'Hygienically packed and rigorously tested to ensure the highest standards.',
      bgColor: 'bg-stone-200/70',
      iconColor: 'text-stone-800'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'We deliver freshness & trust straight to your doorstep, every time.',
      bgColor: 'bg-emerald-100/80',
      iconColor: 'text-[#1b4d2e]'
    }
  ];

  return (
    <section className="py-8 bg-[#fcfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50/80 border border-stone-200/80 rounded-xl p-5 flex items-start gap-3.5 transition-all duration-300 hover:shadow-md"
              >
                <div className={`p-3 rounded-full ${feat.bgColor} ${feat.iconColor} shrink-0`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-stone-900 text-sm">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-normal font-normal">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
