import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3000;
  const deliveryFee = cartTotal >= freeShippingThreshold ? 0 : 200;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfbf7] border-l border-stone-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1b4d2e]" />
              <h2 className="font-serif font-bold text-lg text-stone-900">Your Shopping Cart</h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Banner */}
          <div className="bg-amber-50 p-3.5 border-b border-amber-200/80 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-amber-900">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                {cartTotal >= freeShippingThreshold
                  ? '🎉 You qualify for FREE Delivery!'
                  : `Add Rs. ${(freeShippingThreshold - cartTotal).toLocaleString()} more for FREE Delivery!`}
              </span>
            </div>
            <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1b4d2e] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize.name}`}
                  className="bg-white p-3.5 rounded-2xl border border-stone-200 flex items-center gap-3 shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border border-stone-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] font-medium text-stone-500">
                      Size: {item.selectedSize.name}
                    </p>
                    <div className="text-xs font-black font-serif text-[#b45309]">
                      Rs. {item.selectedSize.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize.name)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.selectedSize.name,
                            item.quantity - 1
                          )
                        }
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.selectedSize.name,
                            item.quantity + 1
                          )
                        }
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-sm font-bold text-stone-800">Your cart is waiting for something delicious 🌿</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our farm fresh mango murabba, pure bilona ghee, wildflower honey & homemade pickles!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-[#1b4d2e] hover:bg-[#12361f] text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Cart Footer / Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-stone-900">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span className="font-bold text-stone-900">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                  <span>Total Amount:</span>
                  <span className="font-serif text-[#1b4d2e] text-base font-black">
                    Rs. {(cartTotal + deliveryFee).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#1b4d2e] hover:bg-[#12361f] text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Cash on Delivery & Bank Transfer Available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
