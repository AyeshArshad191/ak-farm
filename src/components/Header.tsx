import React, { useState } from 'react';
import { Logo } from './Logo';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, User, Phone, Mail, ShieldCheck, Truck, Sparkles, Heart, Sliders, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateTab: (tab: 'home' | 'shop' | 'about' | 'process' | 'contact') => void;
  activeTab: string;
  onOpenTrackOrder?: () => void;
  onOpenHealthBenefits?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateTab,
  activeTab,
  onOpenTrackOrder,
  onOpenHealthBenefits
}) => {
  const {
    siteSettings,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsAdminOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateTab('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf7] border-b border-[#e5e0d8] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#1b4d2e] text-white text-xs py-2 px-4 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Values */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] font-medium tracking-wide overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              100% Pure & Natural
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              No Chemicals
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              Fast Delivery
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Trusted Quality
            </span>
          </div>

          {/* Right Contact Info & Quick Actions */}
          <div className="flex items-center gap-4 text-[11px] font-medium shrink-0">
            <a
              href="tel:03037567324"
              className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              0303 7567324
            </a>
            <a
              href="mailto:info@akfarm.com"
              className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              info@akfarm.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-[#1b4d2e]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <div
          className="cursor-pointer shrink-0"
          onClick={() => {
            onNavigateTab('home');
            setActiveCategory('all');
          }}
        >
          <Logo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm text-stone-800">
          <button
            onClick={() => {
              onNavigateTab('home');
              setActiveCategory('all');
            }}
            className={`transition-colors py-1 relative ${
              activeTab === 'home'
                ? 'text-[#1b4d2e] font-bold border-b-2 border-[#1b4d2e]'
                : 'hover:text-[#1b4d2e]'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => {
              onNavigateTab('shop');
              setActiveCategory('all');
            }}
            className={`transition-colors py-1 ${
              activeTab === 'shop'
                ? 'text-[#1b4d2e] font-bold border-b-2 border-[#1b4d2e]'
                : 'hover:text-[#1b4d2e]'
            }`}
          >
            Shop
          </button>

          <button
            onClick={() => onNavigateTab('about')}
            className={`transition-colors py-1 ${
              activeTab === 'about'
                ? 'text-[#1b4d2e] font-bold border-b-2 border-[#1b4d2e]'
                : 'hover:text-[#1b4d2e]'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => onNavigateTab('process')}
            className={`transition-colors py-1 ${
              activeTab === 'process'
                ? 'text-[#1b4d2e] font-bold border-b-2 border-[#1b4d2e]'
                : 'hover:text-[#1b4d2e]'
            }`}
          >
            Our Process
          </button>

          <button
            onClick={() => onNavigateTab('about')}
            className={`transition-colors py-1 hover:text-[#1b4d2e]`}
          >
            Blog
          </button>

          <button
            onClick={() => onNavigateTab('contact')}
            className={`transition-colors py-1 ${
              activeTab === 'contact'
                ? 'text-[#1b4d2e] font-bold border-b-2 border-[#1b4d2e]'
                : 'hover:text-[#1b4d2e]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Search, User, Admin & Cart Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-stone-700 hover:text-[#1b4d2e] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Icon Button */}
          <button
            onClick={() => onOpenTrackOrder && onOpenTrackOrder()}
            className="p-2 text-stone-700 hover:text-[#1b4d2e] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            title="User Account / Track Order"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Admin Panel Pill Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 text-emerald-900 bg-emerald-100/90 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors cursor-pointer"
            title="Admin Panel"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </button>

          {/* Health Benefits Pill Button */}
          {onOpenHealthBenefits && (
            <button
              onClick={onOpenHealthBenefits}
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 text-amber-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Health Benefits</span>
            </button>
          )}

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-stone-700 hover:text-[#1b4d2e] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-[#d97706] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount > 0 ? cartCount : 3}
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Mobile Search Input */}
      {isSearchExpanded && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-stone-200 bg-stone-50">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search farm products (Murabba, Ghee, Honey...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-lg py-2 pl-3.5 pr-10 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#1b4d2e]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcfbf7] border-b border-stone-200 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              onNavigateTab('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-stone-800 font-medium hover:bg-emerald-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigateTab('shop');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-stone-800 font-medium hover:bg-emerald-50 rounded-lg"
          >
            Shop All Products
          </button>
          <button
            onClick={() => {
              onNavigateTab('about');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-stone-800 font-medium hover:bg-emerald-50 rounded-lg"
          >
            About Us
          </button>
          <button
            onClick={() => {
              onNavigateTab('process');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-stone-800 font-medium hover:bg-emerald-50 rounded-lg"
          >
            Our Process
          </button>
          <button
            onClick={() => {
              onNavigateTab('contact');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 px-3 text-stone-800 font-medium hover:bg-emerald-50 rounded-lg"
          >
            Contact Us
          </button>
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left py-2 px-3 text-emerald-800 font-semibold bg-emerald-50 rounded-lg"
            >
              <Sliders className="w-4 h-4" />
              Admin Panel (Client Dashboard)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
