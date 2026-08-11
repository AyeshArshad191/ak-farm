import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const {
    products,
    isSearchOpen,
    setIsSearchOpen,
    setSelectedProduct,
    setActiveCategory
  } = useStore();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const popularTags = [
    { label: 'Pure Desi Ghee', cat: 'ghee' },
    { label: 'Sidr Honey', cat: 'honey' },
    { label: 'Mango Achar', cat: 'achar' },
    { label: 'Apple Murabba', cat: 'murabba' },
    { label: 'Sarso Oil', cat: 'oil' },
    { label: 'Desi Gur', cat: 'sugar' },
    { label: 'Organic Haldi', cat: 'spices' }
  ];

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 bg-[#1b4d2e] text-white flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search organic honey, desi ghee, murabba, pickles..."
              autoFocus
              className="w-full pl-11 pr-4 py-3 bg-white/10 text-white placeholder-emerald-100/70 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 border border-emerald-600/50"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 bg-[#fcfbf7]">
          
          {/* Quick Category Chips */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[11px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(tag.label);
                    }}
                    className="px-3.5 py-1.5 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-stone-700 hover:text-emerald-900 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500 font-medium">
                Found <strong>{filtered.length}</strong> matching products for "{query}"
              </p>

              {filtered.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
                  <p className="text-sm font-bold text-stone-700">No matching products found</p>
                  <p className="text-xs text-stone-500">
                    Try searching with another keyword like "ghee", "honey", "oil", or "spices".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filtered.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setIsSearchOpen(false);
                      }}
                      className="bg-white p-3 rounded-2xl border border-stone-200/90 hover:border-[#1b4d2e] shadow-xs hover:shadow-md transition-all flex items-center gap-3 cursor-pointer group"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover border border-stone-200 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest block">
                          {prod.categoryLabel}
                        </span>
                        <h4 className="font-bold text-xs text-stone-900 group-hover:text-[#1b4d2e] truncate">
                          {prod.name}
                        </h4>
                        <p className="text-xs font-black text-[#b45309] font-serif mt-0.5">
                          Rs. {prod.price.toLocaleString()}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#1b4d2e] transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
