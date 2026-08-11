export interface ProductSize {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'murabba' | 'ghee' | 'oil' | 'sugar' | 'honey' | 'achar' | 'spices' | 'dryfruits' | 'others' | string;
  categoryLabel: string;
  badge?: 'BEST SELLER' | 'NEW ARRIVAL' | '100% NATURAL' | 'HOT' | 'FRESH HARVEST' | 'HEALTH CHOICE' | 'ORGANIC' | string;
  price: number;
  weight: string;
  sizes: ProductSize[];
  images: string[];
  description: string;
  ingredients?: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  highlights: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: {
    productId: string;
    productName: string;
    sizeName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  deliveryFee: number;
  paymentMethod: 'cod' | 'bank';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface SiteSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  announcementText: string;
  heroHeading: string;
  heroSubheading: string;
}
