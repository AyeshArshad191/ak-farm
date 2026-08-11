import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Star, Check, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[0] || { name: product.weight, price: product.price }
  );
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const badgeStyles: Record<string, string> = {
    'BEST SELLER': 'bg-[#1b4d2e] text-white',
    'NEW ARRIVAL': 'bg-[#065f46] text-white',
    '100% NATURAL': 'bg-[#d97706] text-white',
    'HOT': 'bg-red-700 text-white',
    'FRESH HARVEST': 'bg-emerald-800 text-amber-200',
    'HEALTH CHOICE': 'bg-amber-600 text-white'
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Product Image Frame */}
        <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span
                className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-xs ${
                  badgeStyles[product.badge] || 'bg-stone-800 text-white'
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist Heart Icon */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-2.5 right-2.5 z-10 p-1.5 bg-white/90 backdrop-blur-xs rounded-full shadow-xs text-stone-600 hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-3.5 space-y-1">
          <h3 className="font-serif font-bold text-stone-900 text-sm group-hover:text-[#1b4d2e] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[11px] text-stone-500 line-clamp-1 font-medium">
            {product.weight}
          </p>

          {/* Price */}
          <div className="pt-1 flex items-baseline justify-between">
            <span className="text-sm font-bold text-[#b8382c]">
              Rs. {selectedSize.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-3.5 pt-0">
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
            added
              ? 'bg-[#1b4d2e] text-white'
              : 'bg-[#eae7df] hover:bg-[#1b4d2e] text-stone-800 hover:text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5 text-amber-300" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
