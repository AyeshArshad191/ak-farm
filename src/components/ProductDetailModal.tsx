import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  Award,
  Heart,
  ChevronRight,
  Leaf,
  CheckCircle2,
  Send
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateBreadcrumb?: (tab: 'home' | 'shop') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onNavigateBreadcrumb
}) => {
  if (!product) return null;

  const { addToCart, setIsCheckoutOpen, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[0] || { name: product.weight, price: product.price }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'info' | 'reviews' | 'shipping'>('desc');
  
  // Custom Review state
  const [reviewsList, setReviewsList] = useState([
    { name: 'Fatima Z.', rating: 5, date: '2 days ago', text: 'SubhanAllah! It tastes exactly like my grandmother used to make in Multan. Pure and full of flavor.' },
    { name: 'Dr. Tariq Mahmood', rating: 5, date: '1 week ago', text: 'Clean packaging, zero artificial smell. Very hygienic product. Highly recommended.' },
    { name: 'Ayesha Khan', rating: 5, date: '2 weeks ago', text: 'Fast delivery to Lahore. Will order Pure Desi Ghee next!' }
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setIsCheckoutOpen(true);
    onClose();
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) return;

    setReviewsList([
      {
        name: newReviewName,
        rating: newReviewRating,
        date: 'Just now',
        text: newReviewText
      },
      ...reviewsList
    ]);

    setNewReviewName('');
    setNewReviewText('');
    alert('Thank you for your review! It has been published.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-[#fcfbf7] border border-stone-200 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-auto relative max-h-[92vh] flex flex-col">
        
        {/* Top Header / Breadcrumb Bar */}
        <div className="p-4 sm:px-6 bg-white border-b border-stone-200 flex items-center justify-between sticky top-0 z-20">
          <nav className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                onClose();
                if (onNavigateBreadcrumb) onNavigateBreadcrumb('home');
              }}
              className="hover:text-[#1b4d2e] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <button
              onClick={() => {
                onClose();
                if (onNavigateBreadcrumb) onNavigateBreadcrumb('shop');
              }}
              className="hover:text-[#1b4d2e] transition-colors"
            >
              Shop
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="capitalize">{product.categoryLabel}</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="font-semibold text-stone-900 truncate max-w-[150px]">
              {product.name}
            </span>
          </nav>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Close Product View"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Image Gallery (4 cols on lg) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs">
                <img
                  src={selectedImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>100% Natural</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? 'border-[#1b4d2e] ring-2 ring-[#1b4d2e]/20'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Details Column (6 cols on lg) */}
            <div className="lg:col-span-6 space-y-5">
              {/* Badge & Title */}
              <div className="space-y-2">
                {product.badge && (
                  <span className="bg-[#1b4d2e] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {product.badge}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-sm font-medium text-amber-800">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-serif font-black text-[#b45309]">
                    Rs. {selectedSize.price.toLocaleString()}
                  </span>
                  <span className="bg-stone-200 text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {selectedSize.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold bg-stone-100 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({reviewsList.length} reviews)</span>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Highlights 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-100/80 rounded-2xl border border-stone-200/80">
                {product.highlights.map((high, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-[#1b4d2e]" />
                    <span>{high}</span>
                  </div>
                ))}
              </div>

              {/* Size Selectors */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Select Size / Weight
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz.name}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize.name === sz.name
                          ? 'bg-[#1b4d2e] text-white border-[#1b4d2e] shadow-xs'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {sz.name} - Rs. {sz.price.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-stone-100 text-stone-700 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-stone-100 text-stone-700 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add To Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-bold py-3 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3 border border-stone-300 bg-white hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-stone-600 hover:text-red-500"
                    title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#1b4d2e] hover:bg-[#12361f] text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {/* Delivery & Security Trust Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-stone-200 text-center">
                <div className="p-2 bg-stone-50 rounded-xl">
                  <Truck className="w-5 h-5 mx-auto text-[#1b4d2e] mb-1" />
                  <div className="text-[10px] font-bold text-stone-800">Fast Delivery</div>
                  <div className="text-[9px] text-stone-500">Across Pakistan</div>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl">
                  <ShieldCheck className="w-5 h-5 mx-auto text-[#1b4d2e] mb-1" />
                  <div className="text-[10px] font-bold text-stone-800">Secure Payment</div>
                  <div className="text-[9px] text-stone-500">100% Protected</div>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl">
                  <Award className="w-5 h-5 mx-auto text-[#1b4d2e] mb-1" />
                  <div className="text-[10px] font-bold text-stone-800">Premium Quality</div>
                  <div className="text-[9px] text-stone-500">Guaranteed</div>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl">
                  <Leaf className="w-5 h-5 mx-auto text-[#1b4d2e] mb-1" />
                  <div className="text-[10px] font-bold text-stone-800">Handpicked</div>
                  <div className="text-[9px] text-stone-500">With Care</div>
                </div>
              </div>

              {/* Why Choose AK Farm */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Why Choose AK Farm?
                </h4>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-medium text-amber-900">
                  <div className="flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#1b4d2e]" />
                    <span>100% Pure & Natural</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1b4d2e]" />
                    <span>No Chemicals</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#1b4d2e]" />
                    <span>Trusted by Thousands</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Lower Tabs Section (Description, Additional Info, Reviews, Shipping) */}
          <div className="pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab('desc')}
                className={`py-3 px-4 font-serif font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'desc'
                    ? 'border-[#1b4d2e] text-[#1b4d2e]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`py-3 px-4 font-serif font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'info'
                    ? 'border-[#1b4d2e] text-[#1b4d2e]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Additional Information
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 font-serif font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-[#1b4d2e] text-[#1b4d2e]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Reviews ({reviewsList.length})
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`py-3 px-4 font-serif font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'shipping'
                    ? 'border-[#1b4d2e] text-[#1b4d2e]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Shipping & Delivery
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'desc' && (
                <div className="prose prose-stone text-sm text-stone-700 leading-relaxed space-y-3">
                  <p>
                    Our {product.name} is prepared using handpicked, sun-ripened farm produce and traditional methods that retain the natural flavor, aroma, and essential goodness.
                  </p>
                  <p>
                    No artificial colors, no preservatives — just pure love and hygiene in every jar. Experience authentic organic farm taste delivered directly to your doorstep anywhere in Pakistan.
                  </p>
                  {product.ingredients && (
                    <div className="pt-2">
                      <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                        Ingredients:
                      </h5>
                      <ul className="list-disc pl-5 pt-1 space-y-1">
                        {product.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'info' && (
                <div className="text-sm text-stone-700 space-y-2">
                  <div className="grid grid-cols-2 gap-4 max-w-md bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <span className="font-bold text-stone-900 block">Storage:</span>
                      <span>Store in a cool, dry place. Keep airtight.</span>
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">Shelf Life:</span>
                      <span>12 Months from Manufacturing</span>
                    </div>
                    <div>
                      <span className="font-bold text-stone-[#1b4d2e] block">Origin:</span>
                      <span>Multan, Punjab, Pakistan</span>
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block">Certification:</span>
                      <span>100% Organic Verified</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Write review form */}
                  <form onSubmit={handleAddReview} className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                    <h4 className="font-bold text-stone-900 text-sm">Write a Customer Review</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="p-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
                        required
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-600 font-semibold">Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReviewRating(star)}
                              className="text-amber-400 hover:scale-110 transition-transform"
                            >
                              <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <textarea
                      placeholder="Share your experience with this AK Farm product..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full p-2.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
                      rows={2}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#1b4d2e] hover:bg-[#12361f] text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Review</span>
                    </button>
                  </form>

                  {/* Existing Reviews List */}
                  <div className="space-y-3">
                    {reviewsList.map((rev, idx) => (
                      <div key={idx} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 text-xs">{rev.name}</span>
                          <span className="text-[10px] text-stone-500">{rev.date}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-500" />
                          ))}
                        </div>
                        <p className="text-xs text-stone-700">{rev.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="text-sm text-stone-700 space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <p className="font-bold text-stone-900">🚀 Fast Nationwide Delivery in 24 - 48 Hours</p>
                  <p>We deliver fresh AK Farm products across all major cities in Pakistan (Lahore, Karachi, Islamabad, Multan, Rawalpindi, Faisalabad, Peshawar, Quetta, and all districts).</p>
                  <p className="text-xs text-stone-600">Standard Delivery Charge: Rs. 200 (FREE Shipping on orders over Rs. 3,000).</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
