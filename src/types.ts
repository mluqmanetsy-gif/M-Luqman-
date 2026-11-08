export type DepartmentId =
  | 'clothing'
  | 'footwear'
  | 'bags'
  | 'jewellery'
  | 'accessories'
  | 'innerwear'
  | 'nightwear-loungewear'
  | 'modest-fashion'
  | 'sportswear'
  | 'maternity'
  | 'socks-hosiery';

export interface Department {
  id: DepartmentId;
  name: string;
  tagline: string;
  featuredImage: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  title: string;
  department: DepartmentId;
  category: string;
  price: number; // in PKR
  originalPrice?: number; // for sale items
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  description: string;
  features: string[];
  careInstructions: string[];
  inStock: boolean;
  stockCount?: number;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isFestive?: boolean;
  isTrending?: boolean;
  matchingProductIds?: string[];
  stitchingAvailable?: boolean;
  stitchingPrice?: number; // additional PKR if chosen
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${selectedSize}-${selectedColor}-${stitchingOption}`
  productId: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  isStitched?: boolean;
  stitchingPrice?: number;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  fitFeedback?: string; // 'True to size' | 'Runs slightly large' etc.
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'Cash on Delivery (COD)' | 'Bank Transfer / Card';
  status: 'Confirmed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  courier: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  province: string;
  memberTier: 'Silver Privilège' | 'Gold Couture' | 'Black Diamond VIP';
  points: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Trend Report' | 'Styling Guide' | 'Craftsmanship' | 'Modest Edit';
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  featuredProducts?: string[];
}

export interface RewardVoucher {
  id: string;
  title: string;
  pointsCost: number;
  discountCode: string;
  benefit: string;
  tierRequired: 'Silver Privilège' | 'Gold Couture' | 'Black Diamond VIP';
}

export type ViewType =
  | 'home'
  | 'collection'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'account'
  | 'tracking'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'shipping-policy'
  | 'return-policy'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'size-guide'
  | 'journal'
  | 'rewards';
