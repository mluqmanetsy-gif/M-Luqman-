import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, ViewType, DepartmentId } from '../types';
import { PRODUCTS, INITIAL_ORDERS } from '../data/products';
import { fetchStorefrontProducts, createStorefrontCart, ShopifyStorefrontProduct } from '../lib/shopifyStorefront';

interface ShopContextType {
  currentView: ViewType;
  selectedDepartment: DepartmentId | 'all';
  selectedCategory: string;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  navigateTo: (
    view: ViewType,
    params?: { department?: DepartmentId | 'all'; category?: string; productId?: string }
  ) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  checkoutWithShopify: (buyer?: { email?: string; phone?: string }) => Promise<void>;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isStylistOpen: boolean;
  setIsStylistOpen: (open: boolean) => void;
  isSizeAssistantOpen: boolean;
  setIsSizeAssistantOpen: (open: boolean) => void;
  isSupportChatOpen: boolean;
  setIsSupportChatOpen: (open: boolean) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Orders & Checkout
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'courier' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  lookupOrder: (orderId: string, phone?: string) => Order | null;

  // User
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Notification Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Helpers
  formatPKR: (amount: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const formatPKR = (amount: number): string => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('veyora-cl-01');
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const mapShopifyProduct = (item: ShopifyStorefrontProduct): Product => {
    const source = `${item.productType} ${item.tags.join(' ')} ${item.title}`.toLowerCase();
    const department: DepartmentId =
      /shoe|footwear|khussa|heel|sandal/.test(source) ? 'footwear' :
      /bag|clutch|tote|handbag/.test(source) ? 'bags' :
      /jewel|necklace|ring|bracelet|earring/.test(source) ? 'jewellery' :
      /innerwear|bra|brief|lingerie/.test(source) ? 'innerwear' :
      /nightwear|lounge|pajama|robe/.test(source) ? 'nightwear-loungewear' :
      /abaya|modest|hijab/.test(source) ? 'modest-fashion' :
      /sport|activewear|legging/.test(source) ? 'sportswear' :
      /maternity|nursing/.test(source) ? 'maternity' :
      /sock|hosiery|tights/.test(source) ? 'socks-hosiery' :
      /accessor|scarf|belt|sunglass/.test(source) ? 'accessories' : 'clothing';
    const variants = item.variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      availableForSale: variant.availableForSale,
      quantityAvailable: variant.quantityAvailable,
      price: Number(variant.price.amount),
      selectedOptions: variant.selectedOptions,
    }));
    const sizes = Array.from(new Set(variants.flatMap((variant) =>
      variant.selectedOptions.filter((option) => /size/i.test(option.name)).map((option) => option.value)
    )));
    const colors = Array.from(new Set(variants.flatMap((variant) =>
      variant.selectedOptions.filter((option) => /color|colour/i.test(option.name)).map((option) => option.value)
    )));
    return {
      id: item.id,
      title: item.title,
      shopifyVariantId: variants[0]?.id,
      shopifyVariants: variants,
      isShopifyProduct: true,
      department,
      category: item.productType || department.replace(/-/g, ' '),
      price: Number(item.priceRange.minVariantPrice.amount),
      rating: 0,
      reviewCount: 0,
      images: item.images.map((image) => image.url),
      colors: colors.map((name) => ({ name, hex: '#EEE5DF' })),
      sizes: sizes.length ? sizes : ['Standard'],
      fabric: '',
      description: item.description,
      features: [],
      careInstructions: [],
      inStock: item.availableForSale,
      stockCount: variants.reduce((total, variant) => total + (variant.quantityAvailable || 0), 0),
      isNewArrival: false,
      isBestseller: false,
      isFestive: false,
    };
  };

  useEffect(() => {
    let active = true;
    fetchStorefrontProducts(100)
      .then((items) => {
        if (!active) return;
        setLiveProducts(items.map(mapShopifyProduct));
        setProductsError(null);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setProductsError(error instanceof Error ? error.message : 'Unable to load Shopify products.');
      })
      .finally(() => {
        if (active) setProductsLoading(false);
      });
    return () => { active = false; };
  }, []);

  // Load cart from localStorage if present
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veyora_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'veyora-cl-01-S-Ivory Gold-stitched',
          productId: 'veyora-cl-01',
          title: 'Zehra — Embroidered Raw Silk Festive Kurta Set',
          price: 28500,
          image: '/images/hero_luxury_couture_1794123004357.jpg',
          size: 'S',
          color: 'Ivory Gold',
          isStitched: true,
          stitchingPrice: 4500,
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veyora_wishlist');
      return saved ? JSON.parse(saved) : ['veyora-cl-02', 'veyora-jw-01'];
    } catch {
      return ['veyora-cl-02', 'veyora-jw-01'];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('veyora_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Ayesha Khan',
    email: 'ayesha.khan@gmail.com',
    phone: '03494968548',
    city: 'Karachi',
    address: 'Clifton, Karachi, Pakistan',
    province: 'Sindh',
    memberTier: 'Gold Couture',
    points: 1420
  });

  // Modals & Drawers
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isSizeAssistantOpen, setIsSizeAssistantOpen] = useState(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('veyora_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('veyora_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('veyora_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const navigateTo = (
    view: ViewType,
    params?: { department?: DepartmentId | 'all'; category?: string; productId?: string }
  ) => {
    if (params?.department !== undefined) {
      setSelectedDepartment(params.department);
    }
    if (params?.category !== undefined) {
      setSelectedCategory(params.category);
    }
    if (params?.productId !== undefined) {
      setSelectedProductId(params.productId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const itemId = `${item.shopifyVariantId || item.productId}-${item.size}-${item.color}-${item.isStitched ? 'stitched' : 'unstitched'}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, { ...item, id: itemId }];
    });
    showToast(`Added "${item.title}" to your shopping bag.`);
    setIsCartDrawerOpen(true);
  };

  const checkoutWithShopify = async (buyer: { email?: string; phone?: string } = {}) => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.', 'info');
      return;
    }
    const lines = cart.map((item) => ({
      merchandiseId: item.shopifyVariantId || '',
      quantity: item.quantity,
    }));
    if (lines.some((line) => !line.merchandiseId)) {
      showToast('Some items are still demo products. Please use Shopify-linked products for checkout.', 'error');
      return;
    }
    try {
      const result = await createStorefrontCart(lines, {
        email: userProfile.email || undefined,
        phone: userProfile.phone || undefined,
        countryCode: 'PK',
      });
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to start Shopify checkout. Please try again.', 'error');
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.price + (item.isStitched && item.stitchingPrice ? item.stitchingPrice : 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'courier' | 'trackingNumber' | 'estimatedDelivery'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `VY-${randomSuffix}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      courier: 'TCS Express Pakistan',
      trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}PK`,
      estimatedDelivery: '2 to 3 Business Days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const lookupOrder = (orderId: string, phone?: string): Order | null => {
    const rawInput = orderId.trim().toUpperCase().replace(/[\s-]/g, '');
    const cleanPhone = phone?.replace(/\D/g, '') || '';
    
    return (
      orders.find((o) => {
        const orderCleanId = o.id.toUpperCase().replace(/[\s-]/g, '');
        const matchesId =
          orderCleanId === rawInput ||
          orderCleanId.endsWith(rawInput) ||
          rawInput.endsWith(orderCleanId) ||
          orderCleanId.replace(/^VY/, '') === rawInput;
        if (!cleanPhone) return matchesId;
        const orderPhoneClean = o.phone.replace(/\D/g, '');
        return matchesId && (orderPhoneClean.includes(cleanPhone) || cleanPhone.includes(orderPhoneClean));
      }) || null
    );
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    showToast('Profile information updated.');
  };

  const products = liveProducts.length ? liveProducts : PRODUCTS;
  const selectedProduct = products.find((p) => p.id === selectedProductId) || PRODUCTS.find((p) => p.id === selectedProductId) || products[0] || PRODUCTS[0];

  return (
    <ShopContext.Provider
      value={{
        currentView,
        selectedDepartment,
        selectedCategory,
        selectedProductId,
        selectedProduct,
        products,
        productsLoading,
        productsError,
        navigateTo,

        cart,
        addToCart,
        checkoutWithShopify,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,

        wishlist,
        toggleWishlist,
        isWishlisted,

        isSearchOpen,
        setIsSearchOpen,
        isStylistOpen,
        setIsStylistOpen,
        isSizeAssistantOpen,
        setIsSizeAssistantOpen,
        isSupportChatOpen,
        setIsSupportChatOpen,
        isCopilotOpen,
        setIsCopilotOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,

        orders,
        lastPlacedOrder,
        placeOrder,
        lookupOrder,

        userProfile,
        updateUserProfile,

        toast,
        showToast,

        formatPKR
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
