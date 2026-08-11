import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfbf7] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 bg-[#1b4d2e] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 fill-amber-300 text-amber-300" />
              <h3 className="font-serif font-bold text-lg">My Saved Items ({wishlist.length})</h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h4 className="font-bold text-stone-700 text-sm">Your Wishlist is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any product to save it here for later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 px-5 py-2 bg-[#1b4d2e] text-white text-xs font-bold rounded-xl shadow cursor-pointer"
                >
                  Explore Farm Products
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-xs flex gap-3.5 items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsWishlistOpen(false);
                      }}
                    />
                    <div>
                      <h4
                        className="font-bold text-xs text-stone-900 hover:text-[#1b4d2e] cursor-pointer line-clamp-1"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-medium">{product.weight}</p>
                      <p className="text-sm font-black text-[#b45309] font-serif mt-0.5">
                        Rs. {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                      }}
                      className="p-2 bg-[#1b4d2e] hover:bg-[#133921] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Move to Cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 text-stone-400 hover:text-red-600 bg-stone-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 bg-white border-t border-stone-200">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#1b4d2e] hover:bg-[#133921] text-white font-bold text-xs rounded-2xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add All Items to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
