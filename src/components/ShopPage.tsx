import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { Search, ArrowUpDown, RefreshCw, Filter, CheckCircle2 } from 'lucide-react';

interface ShopPageProps {
  onOpenDetail: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onOpenDetail }) => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating' | 'popular'>('default');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'ghee', label: 'Desi Ghee' },
    { id: 'honey', label: 'Pure Honey' },
    { id: 'achar', label: 'Pickles / Achar' },
    { id: 'murabba', label: 'Murabba' },
    { id: 'oil', label: 'Natural Oils' },
    { id: 'sugar', label: 'Desi Gur' },
    { id: 'spices', label: 'Traditional Foods' },
    { id: 'dryfruits', label: 'Gift Boxes' }
  ];

  // Filter products
  let filtered = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesStock = !onlyInStock || p.inStock;
    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'popular') {
    filtered = [...filtered].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  }

  return (
    <div className="py-10 bg-[#fcfbf7] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#d97706]">
              100% PURE ORGANIC CATALOG
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#1b4d2e] mt-1">
              Shop Farm Fresh Products
            </h1>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="popular">Sort: Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#1b4d2e]" />
              <span className="text-xs font-bold uppercase text-stone-800 tracking-wider">
                Filter Catalog
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-600 font-medium">
              {/* Max Price Slider */}
              <div className="flex items-center gap-2">
                <span>Max Price: <strong className="text-[#1b4d2e]">Rs. {maxPrice.toLocaleString()}</strong></span>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-[#1b4d2e] cursor-pointer"
                />
              </div>

              {/* In Stock Toggle */}
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#1b4d2e] focus:ring-[#1b4d2e] accent-[#1b4d2e]"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const count = cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'bg-[#1b4d2e] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Showing <strong>{filtered.length}</strong> organic farm products</span>
          {(searchQuery || activeCategory !== 'all' || maxPrice < 10000 || onlyInStock) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setMaxPrice(10000);
                setOnlyInStock(false);
              }}
              className="text-[#1b4d2e] font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto">
            <Search className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-serif font-bold text-stone-800 text-lg">No matching products</h3>
            <p className="text-xs text-stone-500">
              Try adjusting your search or resetting price range and category filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setMaxPrice(10000);
                setOnlyInStock(false);
              }}
              className="px-5 py-2.5 bg-[#1b4d2e] text-white text-xs font-bold rounded-xl mt-2 cursor-pointer shadow"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
