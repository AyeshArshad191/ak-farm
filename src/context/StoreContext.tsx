import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, SiteSettings, ProductSize } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SITE_SETTINGS, INITIAL_ORDERS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  wishlist: string[];
  toast: { message: string; type?: 'success' | 'info' } | null;
  activeCategory: string;
  searchQuery: string;
  selectedProduct: Product | null;
  isAdminOpen: boolean;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isVsCodeGuideOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  siteSettings: SiteSettings;
  
  // Actions
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsVsCodeGuideOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  
  toggleWishlist: (productId: string) => void;
  showToast: (message: string, type?: 'success' | 'info') => void;

  addToCart: (product: Product, size?: ProductSize, quantity?: number) => void;
  removeFromCart: (productId: string, sizeName: string) => void;
  updateCartQuantity: (productId: string, sizeName: string, quantity: number) => void;
  clearCart: () => void;
  
  placeOrder: (customer: Order['customer'], paymentMethod: 'cod' | 'bank') => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  resetToDefaultData: () => void;
  
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ak_farm_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        // Merge any new products from INITIAL_PRODUCTS that are not in parsed local storage
        const existingIds = new Set(parsed.map((p) => p.id));
        const missing = INITIAL_PRODUCTS.filter((ip) => !existingIds.has(ip.id));
        if (missing.length > 0) {
          return [...parsed, ...missing];
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse products from storage', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ak_farm_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  // Orders persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ak_farm_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
    return INITIAL_ORDERS;
  });

  // Settings persistence
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('ak_farm_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return INITIAL_SITE_SETTINGS;
  });

  // Wishlist persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ak_farm_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
    return [];
  });

  // Toast state
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' } | null>(null);

  // UI state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isVsCodeGuideOpen, setIsVsCodeGuideOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ak_farm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ak_farm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ak_farm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ak_farm_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('ak_farm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Toggle Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added item to Wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  // Cart calculations
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart operations
  const addToCart = (product: Product, size?: ProductSize, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || { name: product.weight, price: product.price };
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize.name === chosenSize.name
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize: chosenSize, quantity }];
      }
    });

    setIsCartOpen(true);
    showToast(`${product.name} added to cart! 🛒`, 'success');
  };

  const removeFromCart = (productId: string, sizeName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize.name === sizeName)
      )
    );
  };

  const updateCartQuantity = (productId: string, sizeName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, sizeName);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize.name === sizeName) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Placement
  const placeOrder = (customer: Order['customer'], paymentMethod: 'cod' | 'bank'): Order => {
    const deliveryFee = cartTotal >= 3000 ? 0 : 200;
    const newOrder: Order = {
      id: 'AKF-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      customer,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        sizeName: item.selectedSize.name,
        price: item.selectedSize.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      totalAmount: cartTotal + deliveryFee,
      deliveryFee,
      paymentMethod,
      status: 'Pending'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Product CRUD
  const addProduct = (newProductData: Omit<Product, 'id'>) => {
    const id = newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const newProduct: Product = { ...newProductData, id };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== productId));
  };

  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setSiteSettings(INITIAL_SITE_SETTINGS);
    localStorage.removeItem('ak_farm_products');
    localStorage.removeItem('ak_farm_orders');
    localStorage.removeItem('ak_farm_settings');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        wishlist,
        toast,
        activeCategory,
        searchQuery,
        selectedProduct,
        isAdminOpen,
        isCartOpen,
        isCheckoutOpen,
        isVsCodeGuideOpen,
        isWishlistOpen,
        isSearchOpen,
        siteSettings,
        setActiveCategory,
        setSearchQuery,
        setSelectedProduct,
        setIsAdminOpen,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsVsCodeGuideOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        toggleWishlist,
        showToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSiteSettings,
        resetToDefaultData,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
