import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductSize, Order } from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  Package,
  ShoppingBag,
  Layers,
  Settings,
  Code2,
  RotateCcw,
  Lock,
  Check,
  CheckCircle,
  Clock,
  Truck,
  Image as ImageIcon,
  Save,
  Search,
  ChevronRight,
  Terminal,
  ExternalLink,
  Copy,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Megaphone
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    products,
    orders,
    siteSettings,
    isAdminOpen,
    setIsAdminOpen,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateSiteSettings,
    resetToDefaultData
  } = useStore();

  type AdminTab = 'dashboard' | 'products' | 'orders' | 'categories' | 'settings' | 'vscode';
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');

  // Products Search & Filter State
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // New/Edit Product Form
  const [prodName, setProdName] = useState('');
  const [prodSubtitle, setProdSubtitle] = useState('');
  const [prodCategory, setProdCategory] = useState<Product['category']>('murabba');
  const [prodCategoryLabel, setProdCategoryLabel] = useState('Murabba');
  const [prodBadge, setProdBadge] = useState<string>('BEST SELLER');
  const [prodPrice, setProdPrice] = useState<number>(590);
  const [prodWeight, setProdWeight] = useState('500 Gram');
  const [prodImage, setProdImage] = useState('/assets/images/mango_murabba_1786299305761.jpg');
  const [prodDescription, setProdDescription] = useState('');
  const [prodStock, setProdStock] = useState<number>(50);
  const [prodHighlights, setProdHighlights] = useState<string>('No Preservatives, 100% Organic, Traditional Recipe');

  // Site Settings Form
  const [settingPhone, setSettingPhone] = useState(siteSettings.phone);
  const [settingWhatsapp, setSettingWhatsapp] = useState(siteSettings.whatsapp);
  const [settingEmail, setSettingEmail] = useState(siteSettings.email);
  const [settingAddress, setSettingAddress] = useState(siteSettings.address);
  const [settingAnnouncement, setSettingAnnouncement] = useState(siteSettings.announcementText);
  const [settingHeroHeading, setSettingHeroHeading] = useState(siteSettings.heroHeading);
  const [settingHeroSubheading, setSettingHeroSubheading] = useState(siteSettings.heroSubheading);

  // VS Code guide copy state
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isAdminOpen) return null;

  // Revenue & Order Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length;

  // Categories Count Calculation
  const categoriesList = [
    { id: 'murabba', label: 'Murabba', count: products.filter(p => p.category === 'murabba').length, image: '/assets/images/mango_murabba_1786299305761.jpg' },
    { id: 'ghee', label: 'Desi Ghee', count: products.filter(p => p.category === 'ghee').length, image: '/assets/images/desi_ghee_1786299321528.jpg' },
    { id: 'honey', label: 'Wild Honey', count: products.filter(p => p.category === 'honey').length, image: '/assets/images/pure_honey_1786299335264.jpg' },
    { id: 'achar', label: 'Pickles / Achar', count: products.filter(p => p.category === 'achar').length, image: '/assets/images/mango_achar_1786299351993.jpg' },
    { id: 'sugar', label: 'Desi Sugar & Gur', count: products.filter(p => p.category === 'sugar').length, image: '/assets/images/desi_gur_1786300309180.jpg' },
    { id: 'oil', label: 'Kachi Ghani Oils', count: products.filter(p => p.category === 'oil').length, image: '/assets/images/almond_oil_1786300753837.jpg' }
  ];

  const handleStartAddProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdSubtitle('');
    setProdCategory('murabba');
    setProdCategoryLabel('Murabba');
    setProdBadge('NEW ARRIVAL');
    setProdPrice(500);
    setProdWeight('500 Gram');
    setProdImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800');
    setProdDescription('Organic farm fresh product processed cleanly without artificial chemicals.');
    setProdStock(50);
    setProdHighlights('No Preservatives, 100% Organic, Pure & Natural');
    setIsAddingProduct(true);
  };

  const handleStartEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdSubtitle(prod.subtitle || '');
    setProdCategory(prod.category);
    setProdCategoryLabel(prod.categoryLabel);
    setProdBadge(prod.badge || '');
    setProdPrice(prod.price);
    setProdWeight(prod.weight);
    setProdImage(prod.images[0] || '');
    setProdDescription(prod.description);
    setProdStock(prod.stock);
    setProdHighlights(prod.highlights.join(', '));
    setIsAddingProduct(true);
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArr = prodHighlights.split(',').map((s) => s.trim()).filter(Boolean);
    const defaultSizes: ProductSize[] = [
      { name: prodWeight, price: Number(prodPrice) },
      { name: '1 KG', price: Math.round(Number(prodPrice) * 1.8) }
    ];

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        subtitle: prodSubtitle,
        category: prodCategory,
        categoryLabel: prodCategoryLabel,
        badge: prodBadge ? (prodBadge as any) : undefined,
        price: Number(prodPrice),
        weight: prodWeight,
        images: [prodImage, ...editingProduct.images.slice(1)],
        description: prodDescription,
        stock: Number(prodStock),
        highlights: highlightsArr.length > 0 ? highlightsArr : editingProduct.highlights,
        sizes: editingProduct.sizes.length ? editingProduct.sizes : defaultSizes
      });
      alert('Product updated successfully!');
    } else {
      addProduct({
        name: prodName,
        subtitle: prodSubtitle,
        category: prodCategory,
        categoryLabel: prodCategoryLabel,
        badge: prodBadge ? (prodBadge as any) : undefined,
        price: Number(prodPrice),
        weight: prodWeight,
        images: [prodImage],
        description: prodDescription,
        stock: Number(prodStock),
        rating: 5.0,
        reviewsCount: 1,
        highlights: highlightsArr.length > 0 ? highlightsArr : ['100% Natural', 'No Preservatives'],
        sizes: defaultSizes
      });
      alert('New product added to store catalog!');
    }

    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      storeName: 'AK FARM',
      tagline: 'PURE BY NATURE',
      phone: settingPhone,
      whatsapp: settingWhatsapp,
      email: settingEmail,
      address: settingAddress,
      announcementText: settingAnnouncement,
      heroHeading: settingHeroHeading,
      heroSubheading: settingHeroSubheading
    });
    alert('Site settings updated successfully!');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCmd(code);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white border border-stone-200 w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden my-auto relative max-h-[95vh] flex flex-col text-stone-800">
        
        {/* TOP BAR - CLEAN WHITE & EMERALD HEADER */}
        <div className="p-4 sm:px-6 bg-[#1b4d2e] border-b border-emerald-950 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 text-white">
          <div className="flex items-center gap-3.5">
            {/* Lock Badge Icon */}
            <div className="w-11 h-11 bg-amber-400/20 border border-amber-400/40 rounded-xl flex items-center justify-center text-amber-300 shadow-inner">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>

            <div>
              <h3 className="font-serif font-black text-lg sm:text-2xl text-amber-300 tracking-wide flex items-center gap-2">
                <span>AK FARM — Client Management Panel</span>
              </h3>
              <p className="text-xs text-emerald-100/90 font-medium">
                Manage products, orders, categories, site text, and VS Code setup
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Reset Sample Data Button */}
            <button
              onClick={() => {
                if (confirm('Reset all store products, orders, and settings to original defaults?')) {
                  resetToDefaultData();
                  alert('Store reset to clean sample data!');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-stone-950 border border-amber-500/50 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-950" />
              <span>Reset Sample Data</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-stone-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Management Panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* MAIN BODY - SIDEBAR + WHITE CONTENT AREA */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-white">
          
          {/* LEFT SIDEBAR NAVIGATION - LIGHT WARM GREY */}
          <div className="w-full md:w-64 bg-[#f8f6f0] border-r border-stone-200 p-3 sm:p-4 space-y-1.5 flex-shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
            
            <button
              onClick={() => {
                setActiveAdminTab('dashboard');
                setIsAddingProduct(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                activeAdminTab === 'dashboard'
                  ? 'bg-[#1b4d2e] text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
            >
              <TrendingUp className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Dashboard Stats</span>
            </button>

            <button
              onClick={() => {
                setActiveAdminTab('products');
                setIsAddingProduct(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between gap-3 transition-all cursor-pointer ${
                activeAdminTab === 'products'
                  ? 'bg-[#1b4d2e] text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Products ({products.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveAdminTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-between gap-3 transition-all cursor-pointer ${
                activeAdminTab === 'orders'
                  ? 'bg-[#1b4d2e] text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Orders ({orders.length})</span>
              </div>
              {pendingOrdersCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-500 text-stone-950 rounded-full">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveAdminTab('categories')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                activeAdminTab === 'categories'
                  ? 'bg-[#1b4d2e] text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
            >
              <Layers className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Categories (6)</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('settings')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                activeAdminTab === 'settings'
                  ? 'bg-[#1b4d2e] text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">Store Settings</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('vscode')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-3 transition-all cursor-pointer ${
                activeAdminTab === 'vscode'
                  ? 'bg-[#1b4d2e] text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/70'
              }`}
            >
              <Code2 className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">VS Code & Laravel Guide</span>
            </button>
          </div>

          {/* RIGHT MAIN CONTENT AREA - PURE WHITE CANVAS */}
          <div className="flex-1 bg-[#faf8f5] p-4 sm:p-6 overflow-y-auto space-y-6">

            {/* TAB 1: DASHBOARD STATS */}
            {activeAdminTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* 4 Metric Cards Grid - WHITE CLEAN CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Revenue */}
                  <div className="bg-white border border-emerald-200 p-5 rounded-2xl shadow-sm space-y-1">
                    <span className="text-stone-500 font-semibold text-xs block">
                      Total Store Revenue
                    </span>
                    <h3 className="text-3xl font-serif font-black text-[#1b4d2e]">
                      Rs. {totalRevenue.toLocaleString()}
                    </h3>
                  </div>

                  {/* Card 2: Customer Orders */}
                  <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-sm space-y-1">
                    <span className="text-stone-500 font-semibold text-xs block">
                      Total Customer Orders
                    </span>
                    <h3 className="text-3xl font-serif font-black text-[#d97706]">
                      {orders.length}
                    </h3>
                  </div>

                  {/* Card 3: Active Products */}
                  <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-1">
                    <span className="text-stone-500 font-semibold text-xs block">
                      Active Products
                    </span>
                    <h3 className="text-3xl font-serif font-black text-sky-700">
                      {products.length}
                    </h3>
                  </div>

                  {/* Card 4: Pending Dispatch */}
                  <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-sm space-y-1">
                    <span className="text-stone-500 font-semibold text-xs block">
                      Pending Dispatch
                    </span>
                    <h3 className="text-3xl font-serif font-black text-amber-600">
                      {pendingOrdersCount}
                    </h3>
                  </div>
                </div>

                {/* Recent Orders Table */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-2xl font-serif font-black text-stone-900">
                    Recent Orders
                  </h3>

                  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#f4f1ea] text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                          <tr>
                            <th className="py-3.5 px-4">ORDER #</th>
                            <th className="py-3.5 px-4">CUSTOMER</th>
                            <th className="py-3.5 px-4">CITY</th>
                            <th className="py-3.5 px-4">AMOUNT</th>
                            <th className="py-3.5 px-4">PAYMENT</th>
                            <th className="py-3.5 px-4 text-center">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                              <td className="py-4 px-4 font-bold text-[#1b4d2e]">
                                {order.id}
                              </td>
                              <td className="py-4 px-4 text-stone-900 font-semibold">
                                {order.customer.fullName}
                              </td>
                              <td className="py-4 px-4 text-stone-600">
                                {order.customer.city}
                              </td>
                              <td className="py-4 px-4 text-[#1b4d2e] font-bold">
                                Rs. {order.totalAmount.toLocaleString()}
                              </td>
                              <td className="py-4 px-4 text-stone-600 font-mono text-[11px] uppercase">
                                {order.paymentMethod === 'cod' ? 'COD' : 'BANK_TRANSFER'}
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border inline-block ${
                                  order.status === 'Processing' || order.status === 'Pending'
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : order.status === 'Shipped' || order.status === 'Delivered'
                                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                    : 'bg-red-100 text-red-900 border-red-300'
                                }`}>
                                  {order.status.toLowerCase()}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: PRODUCTS MANAGEMENT */}
            {activeAdminTab === 'products' && (
              <div className="space-y-6">
                
                {/* Products Top Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search store products..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1b4d2e]"
                    />
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  </div>

                  <button
                    onClick={handleStartAddProduct}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#1b4d2e] hover:bg-[#153e24] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-transform transform active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Add / Edit Form Modal inside admin */}
                {isAddingProduct && (
                  <form onSubmit={handleSaveProductForm} className="bg-white border border-amber-300 p-5 rounded-2xl space-y-4 shadow-lg">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <h4 className="font-serif font-bold text-[#1b4d2e] text-sm">
                        {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingProduct(false)}
                        className="text-stone-500 hover:text-stone-900 text-xs"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold block">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          placeholder="e.g. Saeb Ka Murabba"
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold block">Subtitle Tagline</label>
                        <input
                          type="text"
                          value={prodSubtitle}
                          onChange={(e) => setProdSubtitle(e.target.value)}
                          placeholder="e.g. Healthy Heart & Vitality Tonic"
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold block">Category *</label>
                        <select
                          value={prodCategory}
                          onChange={(e) => {
                            const val = e.target.value as Product['category'];
                            setProdCategory(val);
                            const map: Record<string, string> = {
                              murabba: 'Murabba',
                              ghee: 'Desi Ghee',
                              honey: 'Wild Honey',
                              achar: 'Pickles',
                              sugar: 'Desi Sugar',
                              oil: 'Pure Oils'
                            };
                            setProdCategoryLabel(map[val] || 'Organic');
                          }}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                        >
                          <option value="murabba">Homemade Murabba</option>
                          <option value="ghee">Pure Desi Ghee</option>
                          <option value="honey">Wildflower Honey</option>
                          <option value="achar">Farm Pickles (Achar)</option>
                          <option value="sugar">Desi Sugar & Gur</option>
                          <option value="oil">Kachi Ghani Oils</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold block">Badge Label</label>
                        <input
                          type="text"
                          value={prodBadge}
                          onChange={(e) => setProdBadge(e.target.value)}
                          placeholder="BEST SELLER / NEW ARRIVAL / ORGANIC"
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold block">Base Price (Rs.) *</label>
                        <input
                          type="number"
                          required
                          value={prodPrice}
                          onChange={(e) => setProdPrice(Number(e.target.value))}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold block">Default Weight *</label>
                        <input
                          type="text"
                          required
                          value={prodWeight}
                          onChange={(e) => setProdWeight(e.target.value)}
                          placeholder="e.g. 500 Gram or 1KG"
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                        />
                      </div>

                      <div className="col-span-1 sm:col-span-2 space-y-1">
                        <label className="text-stone-700 font-semibold block">Main Image Path / URL *</label>
                        <input
                          type="text"
                          required
                          value={prodImage}
                          onChange={(e) => setProdImage(e.target.value)}
                          placeholder="/assets/images/... or https://..."
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 font-mono text-xs"
                        />
                      </div>

                      <div className="col-span-1 sm:col-span-2 space-y-1">
                        <label className="text-stone-700 font-semibold block">Description</label>
                        <textarea
                          rows={3}
                          value={prodDescription}
                          onChange={(e) => setProdDescription(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingProduct(false)}
                        className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#1b4d2e] hover:bg-[#153e24] text-white font-bold rounded-lg text-xs"
                      >
                        {editingProduct ? 'Save Changes' : 'Add Product'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Products Table */}
                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f4f1ea] text-stone-700 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                        <tr>
                          <th className="py-3 px-4">PRODUCT</th>
                          <th className="py-3 px-4">CATEGORY</th>
                          <th className="py-3 px-4">PRICE</th>
                          <th className="py-3 px-4">STOCK</th>
                          <th className="py-3 px-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-800">
                        {filteredProducts.map((prod) => (
                          <tr key={prod.id} className="hover:bg-amber-50/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                                />
                                <div>
                                  <h4 className="font-serif font-bold text-stone-900">{prod.name}</h4>
                                  <span className="text-[10px] text-stone-500 block">{prod.weight}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-stone-700">
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-[10px] font-semibold">
                                {prod.categoryLabel}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-[#1b4d2e]">
                              Rs. {prod.price}
                            </td>
                            <td className="py-3 px-4 text-stone-700">
                              <span className={`font-bold ${prod.stock < 10 ? 'text-red-600' : 'text-stone-700'}`}>
                                {prod.stock} units
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleStartEditProduct(prod)}
                                  className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Product"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                      deleteProduct(prod.id);
                                    }
                                  }}
                                  className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: ORDERS MANAGEMENT */}
            {activeAdminTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-black text-stone-900">
                  Customer Orders ({orders.length})
                </h3>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                        <div>
                          <span className="text-[#1b4d2e] font-bold text-sm">
                            {order.id}
                          </span>
                          <span className="text-stone-500 text-xs ml-3">
                            Placed: {new Date(order.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-stone-600">Order Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="bg-stone-50 border border-stone-300 text-[#1b4d2e] font-bold text-xs rounded-lg px-3 py-1 focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Customer Info */}
                        <div className="space-y-1 bg-[#faf8f5] p-3 rounded-xl border border-stone-200">
                          <h5 className="font-bold text-[#1b4d2e] text-xs uppercase tracking-wider mb-1">
                            Customer Details
                          </h5>
                          <p className="text-stone-800"><strong>Name:</strong> {order.customer.fullName}</p>
                          <p className="text-stone-800"><strong>Phone:</strong> {order.customer.phone}</p>
                          <p className="text-stone-800"><strong>City:</strong> {order.customer.city}</p>
                          <p className="text-stone-800"><strong>Address:</strong> {order.customer.address}</p>
                          {order.customer.notes && <p className="text-stone-800"><strong>Notes:</strong> {order.customer.notes}</p>}
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 bg-[#faf8f5] p-3 rounded-xl border border-stone-200">
                          <h5 className="font-bold text-[#1b4d2e] text-xs uppercase tracking-wider mb-1">
                            Ordered Items & Payment
                          </h5>
                          {order.items.map((it, i) => (
                            <div key={i} className="flex items-center justify-between text-xs text-stone-700">
                              <span>{it.productName} ({it.sizeName}) x {it.quantity}</span>
                              <span className="font-bold text-stone-900">Rs. {it.price * it.quantity}</span>
                            </div>
                          ))}
                          <div className="border-t border-stone-200 pt-2 flex items-center justify-between font-bold text-sm text-[#1b4d2e]">
                            <span>Total Amount ({order.paymentMethod.toUpperCase()})</span>
                            <span>Rs. {order.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CATEGORIES MANAGER */}
            {activeAdminTab === 'categories' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-black text-stone-900">
                    Store Categories Management
                  </h3>
                  <p className="text-xs text-stone-600">
                    Active farm food product categories displayed on homepage grid
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoriesList.map((cat) => (
                    <div key={cat.id} className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl border border-stone-200"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-sm">{cat.label}</h4>
                        <span className="text-xs text-[#d97706] font-semibold block">{cat.count} Active Items</span>
                        <span className="text-[10px] text-emerald-700 mt-1 block uppercase tracking-wider">
                          Ready in Catalog
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: STORE SETTINGS */}
            {activeAdminTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-6 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-serif font-black text-stone-900 border-b border-stone-100 pb-3">
                  Store Contact & Banner Settings
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-stone-700 font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#1b4d2e]" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={settingPhone}
                      onChange={(e) => setSettingPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-700 font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      WhatsApp Order Number (International format e.g. 923037567324)
                    </label>
                    <input
                      type="text"
                      value={settingWhatsapp}
                      onChange={(e) => setSettingWhatsapp(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-700 font-semibold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#1b4d2e]" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settingEmail}
                      onChange={(e) => setSettingEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-700 font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1b4d2e]" />
                      Farm Address
                    </label>
                    <input
                      type="text"
                      value={settingAddress}
                      onChange={(e) => setSettingAddress(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900"
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-2 space-y-1">
                    <label className="text-stone-700 font-semibold flex items-center gap-1.5">
                      <Megaphone className="w-3.5 h-3.5 text-[#d97706]" />
                      Top Announcement Bar Text
                    </label>
                    <input
                      type="text"
                      value={settingAnnouncement}
                      onChange={(e) => setSettingAnnouncement(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1b4d2e] hover:bg-[#153e24] text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Site Settings</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 6: VS CODE & LARAVEL GUIDE */}
            {activeAdminTab === 'vscode' && (
              <div className="space-y-6 bg-white border border-stone-200 p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <Code2 className="w-6 h-6 text-[#1b4d2e]" />
                  <div>
                    <h3 className="text-xl font-serif font-black text-stone-900">
                      VS Code & Local Development Setup Guide
                    </h3>
                    <p className="text-xs text-stone-600">
                      VS Code Par Complete Code Chalane Ka Tareeqa (Roman Urdu & English)
                    </p>
                  </div>
                </div>

                {/* Commands */}
                <div className="space-y-3">
                  <h4 className="font-bold text-[#1b4d2e] text-xs uppercase tracking-wider">
                    Terminal Commands for VS Code
                  </h4>

                  <div className="space-y-2">
                    {[
                      { label: 'Step 1: Install Dependencies', cmd: 'npm install' },
                      { label: 'Step 2: Run Development Server', cmd: 'npm run dev' },
                      { label: 'Step 3: Build Production Output', cmd: 'npm run build' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-[#121814] p-3 rounded-xl border border-stone-800 flex items-center justify-between font-mono text-xs text-white">
                        <div>
                          <span className="text-stone-400 text-[10px] block uppercase font-sans font-bold">{item.label}</span>
                          <span className="text-emerald-400 font-bold">$ {item.cmd}</span>
                        </div>
                        <button
                          onClick={() => copyCode(item.cmd)}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedCmd === item.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCmd === item.cmd ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roman Urdu Instructions */}
                <div className="bg-[#faf8f5] p-4 rounded-xl border border-stone-200 space-y-2 text-xs text-stone-700 leading-relaxed">
                  <h4 className="font-bold text-[#1b4d2e]">Important Instructions for Local Machine:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pehle computer par <strong>Node.js (LTS version)</strong> install kar lein.</li>
                    <li>VS Code mein folder open karein aur terminal (`Ctrl + ~`) kholein.</li>
                    <li><code>npm install</code> chalayein taake tamoom libraries install ho jayein.</li>
                    <li>Phir <code>npm run dev</code> chalayein, aur browser mein <code>http://localhost:3000</code> kholein.</li>
                  </ul>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
