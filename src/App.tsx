/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { CategoriesGrid } from './components/CategoriesGrid';
import { SpecialOffersBanner } from './components/SpecialOffersBanner';
import { ProductCard } from './components/ProductCard';
import { CustomerReviews } from './components/CustomerReviews';
import { ShopPage } from './components/ShopPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { VsCodeGuideModal } from './components/VsCodeGuideModal';
import { AboutProcess } from './components/AboutProcess';
import { Footer } from './components/Footer';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { TrackOrderModal } from './components/TrackOrderModal';
import { HealthBenefitsModal } from './components/HealthBenefitsModal';
import { Product } from './types';
import { ArrowRight, Sparkles } from 'lucide-react';

function StoreContent() {
  const { products, selectedProduct, setSelectedProduct, setActiveCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'about' | 'process' | 'contact'>('home');
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isHealthBenefitsOpen, setIsHealthBenefitsOpen] = useState(false);

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] font-sans text-stone-900 selection:bg-[#1b4d2e] selection:text-white relative">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenHealthBenefits={() => setIsHealthBenefitsOpen(true)}
      />

      {/* Main Body depending on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onShopClick={() => {
                setActiveTab('shop');
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onProcessClick={() => {
                setActiveTab('process');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4 Feature Value Props */}
            <ValueProps />

            {/* Farm Categories Grid */}
            <CategoriesGrid onCategorySelect={handleSelectCategory} />

            {/* Best Sellers / Signature Section */}
            <section className="py-10 bg-[#fcfbf7]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
                
                {/* Section Title */}
                <div className="flex items-end justify-between border-b border-stone-200/80 pb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block">
                      OUR SIGNATURE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#1b4d2e] mt-0.5">
                      Best Sellers
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('shop');
                      setActiveCategory('all');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group flex items-center gap-1 text-xs font-semibold text-stone-800 hover:text-[#1b4d2e] transition-colors cursor-pointer"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Products Grid (6 Best Sellers) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {products.slice(0, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetail={handleOpenDetail}
                    />
                  ))}
                </div>

              </div>
            </section>

            {/* Special Family Offer Bundle Banner */}
            <SpecialOffersBanner
              onShopClick={() => {
                setActiveTab('shop');
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Customer Testimonials & Reviews */}
            <CustomerReviews />

            {/* Traditional Process teaser on homepage */}
            <AboutProcess activeSection="process" />
          </>
        )}

        {/* SHOP TAB */}
        {activeTab === 'shop' && (
          <ShopPage onOpenDetail={handleOpenDetail} />
        )}

        {/* ABOUT / PROCESS / CONTACT TABS */}
        {(activeTab === 'about' || activeTab === 'process' || activeTab === 'contact') && (
          <AboutProcess activeSection={activeTab} />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onNavigateBreadcrumb={(tab) => setActiveTab(tab)}
      />

      <CartDrawer />
      <CheckoutModal />
      <AdminPanel />
      <VsCodeGuideModal />
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />
      <HealthBenefitsModal
        isOpen={isHealthBenefitsOpen}
        onClose={() => setIsHealthBenefitsOpen(false)}
      />
      <FloatingWhatsapp />

      {/* Footer */}
      <Footer onNavigateTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}


export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
