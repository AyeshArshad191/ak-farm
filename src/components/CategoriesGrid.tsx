import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CategoriesGridProps {
  onCategorySelect: (catId: string) => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'ghee',
      title: 'Desi Ghee',
      desc: 'Bilona churned A2 cow & buffalo ghee',
      image: '/assets/images/desi_ghee_1786299321528.jpg',
      badge: 'TOP SELLER'
    },
    {
      id: 'honey',
      title: 'Honey',
      desc: 'Pure wild Sidr & forest floral honey',
      image: '/assets/images/pure_honey_1786299335264.jpg',
      badge: '100% RAW'
    },
    {
      id: 'achar',
      title: 'Pickles',
      desc: 'Sun-matured Mango, Mix & Lemon Achar',
      image: '/assets/images/mango_achar_1786299351993.jpg',
      badge: 'HOMEMADE'
    },
    {
      id: 'murabba',
      title: 'Murabba',
      desc: 'Sweet Apple, Mango & Amla preserves',
      image: '/assets/images/mango_murabba_1786299305761.jpg',
      badge: 'HEALTH'
    },
    {
      id: 'oil',
      title: 'Natural Oils',
      desc: 'Cold pressed Sarso & Almond oils',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
      badge: 'COLD PRESSED'
    },
    {
      id: 'sugar',
      title: 'Desi Gur',
      desc: 'Chemical-free Shakkar & Gur blocks',
      image: '/assets/images/desi_gur_1786300309180.jpg',
      badge: 'UNREFINED'
    },
    {
      id: 'spices',
      title: 'Traditional Foods',
      desc: 'Hand ground Haldi, spices & grains',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
      badge: 'PURE GROUND'
    },
    {
      id: 'dryfruits',
      title: 'Gift Boxes',
      desc: 'Royal hampers of honey, ghee & nuts',
      image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800',
      badge: 'SPECIAL GIFT'
    }
  ];

  return (
    <section className="py-14 bg-[#fbf9f4] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            PURE & AUTHENTIC CATEGORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1b4d2e]">
            Explore Our Natural Collection
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            From golden A2 ghee to raw forest honey and sun-matured pickles, explore farm-fresh products crafted for complete family wellness.
          </p>
        </div>

        {/* 8 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-[#1b4d2e] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-wider text-[#1b4d2e] shadow-xs">
                    {cat.badge}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-[#1b4d2e] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 flex items-center text-xs font-bold text-[#1b4d2e] group-hover:text-[#b45309] transition-colors gap-1.5">
                <span>Explore {cat.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
