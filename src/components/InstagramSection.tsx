import React from 'react';
import { Sparkles, Instagram, ExternalLink } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const galleryItems = [
    {
      title: 'A2 Desi Cow Bilona Ghee',
      subtitle: 'Pure Golden Grain Texture',
      image: '/assets/images/desi_ghee_1786299321528.jpg'
    },
    {
      title: 'Wild Natural Sidr Honey',
      subtitle: 'Unfiltered Raw Forest Honey',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Homemade Mango Pickle',
      subtitle: 'Spiced in Cold Pressed Mustard Oil',
      image: '/assets/images/mango_achar_1786299351993.jpg'
    },
    {
      title: 'Fresh Harvest Organic Gur',
      subtitle: 'Chemical Free Sugarcane Jaggery',
      image: '/assets/images/desi_gur_1786300309180.jpg'
    },
    {
      title: 'Sweet Apple Murabba',
      subtitle: 'Toned Heart & Digestive Tonic',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Cold Pressed Sarso Oil',
      subtitle: '100% Kachi Ghani Mustard Oil',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            ORGANIC LIFE AT AK FARM
          </span>
          <h2 className="text-3xl font-serif font-black text-[#1b4d2e]">
            Fresh From AK Farm
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm">
            Real photos of our authentic products, traditional harvest processes, and farm life.
          </p>
        </div>

        {/* 6 Grid Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 cursor-pointer shadow-xs"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white">
                <Instagram className="w-4 h-4 text-amber-300 mb-auto" />
                <h4 className="font-bold text-xs leading-tight">{item.title}</h4>
                <p className="text-[10px] text-stone-200 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
