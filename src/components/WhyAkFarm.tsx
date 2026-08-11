import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf, Sparkles, Award, CheckCircle2 } from 'lucide-react';

export const WhyAkFarm: React.FC = () => {
  const points = [
    {
      title: '100% Natural Ingredients',
      desc: 'Zero chemical pesticides, synthetic preservatives, or artificial additives in any product.'
    },
    {
      title: 'Traditional Bilona & Hand Crafts',
      desc: 'Made using age-old village recipes, wood-pressed cold extraction, and clay pot fermentation.'
    },
    {
      title: 'No Unnecessary Additives',
      desc: 'Pure unadulterated honey, unbleached grains, and unrefined oils straight from nature.'
    },
    {
      title: 'Rigorous Quality Checks',
      desc: 'Every jar and packet undergoes hygienic batch testing for purity, aroma, and moisture.'
    },
    {
      title: 'Farm-to-Home Freshness',
      desc: 'Directly sourced from trusted local Pakistani farms to eliminate long warehouse storage.'
    },
    {
      title: 'Trusted by 10,000+ Families',
      desc: 'Loved across Pakistan for authentic, nostalgic taste and healthy organic quality.'
    }
  ];

  return (
    <section className="py-16 bg-[#f7f5ef] border-t border-b border-[#e6e1d5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Benefits Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                THE AK FARM PROMISE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1b4d2e] leading-tight">
                Why Choose AK Farm?
              </h2>
              <p className="text-stone-600 text-sm mt-2 max-w-xl">
                We believe your family deserves pure, unadulterated food just like our ancestors enjoyed. Here is how we guarantee unmatched organic purity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-3 hover:border-emerald-600/40 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1b4d2e] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <img
                src="/assets/images/desi_ghee_1786299321528.jpg"
                alt="AK Farm Traditional Quality"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-amber-300 font-serif text-sm font-bold flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-300" /> Guaranteed Pure
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  Handcrafted Pure Desi Delicacies
                </h3>
                <p className="text-xs text-stone-200 mt-1">
                  From traditional A2 cow ghee churns to raw forest honey extractions.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
