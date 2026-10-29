import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ColorOption, Order } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  // Navigation & Views
  currentView: 'home' | 'shop';
  setCurrentView: (view: 'home' | 'shop') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: ColorOption, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountPercentage: number;
  applyPromoCode: (code: string) => boolean;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders (demo history)
  orders: Order[];
  placeOrder: (orderDetails: Omit<Order, 'id' | 'date' | 'status'>) => Order;

  // User Demo State
  user: { name: string; email: string; isLoggedIn: boolean } | null;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tc_trendy_cart_v1';
const WISHLIST_STORAGE_KEY = 'tc_trendy_wishlist_v1';
const ORDERS_STORAGE_KEY = 'tc_trendy_orders_v1';
const USER_STORAGE_KEY = 'tc_trendy_user_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['tc-w-001', 'tc-st-003'];
    } catch {
      return ['tc-w-001', 'tc-st-003'];
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'TC-94821',
          date: 'Oct 24, 2026',
          items: [
            {
              productName: 'Midnight Silk Slip Evening Dress',
              size: 'M',
              colorName: 'Electric Blue',
              price: 6850,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
            }
          ],
          subtotal: 6850,
          discount: 1370,
          shipping: 0,
          total: 5480,
          status: 'Delivered',
          shippingAddress: {
            fullName: 'Amina Rahman',
            phone: '+880 1712 345678',
            address: 'House 42, Road 11, Banani',
            city: 'Dhaka',
            postalCode: '1213'
          },
          paymentMethod: 'bKash Online'
        }
      ];
    } catch {
      return [];
    }
  });

  // User Profile
  const [user, setUser] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { name: 'Amina Rahman', email: 'amina.rahman@trendycollection.com', isLoggedIn: true };
    } catch {
      return null;
    }
  });

  // Promo code
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [user]);

  // Cart actions
  const addToCart = (product: Product, size?: string, color?: ColorOption, quantity = 1) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0] || { name: 'Standard', hex: '#111827' };
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            size: chosenSize,
            color: chosenColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${chosenSize}) to cart!`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TRENDY20') {
      setPromoCode('TRENDY20');
      setDiscountPercentage(20);
      showToast('Promo code applied: 20% privilege discount!');
      return true;
    } else if (clean === 'GENZ10') {
      setPromoCode('GENZ10');
      setDiscountPercentage(10);
      showToast('Promo code applied: 10% student & gen-z discount!');
      return true;
    } else {
      showToast('Invalid promo code. Try "TRENDY20" for 20% off.');
      return false;
    }
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        const p = PRODUCTS.find((item) => item.id === productId);
        showToast(`Saved "${p ? p.name : 'Item'}" to wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderDetails: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderDetails,
      id: `TC-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      status: 'Processing'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // User Auth demo
  const loginUser = (name: string, email: string) => {
    setUser({ name, email, isLoggedIn: true });
    showToast(`Welcome back, ${name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out successfully');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        promoCode,
        setPromoCode,
        discountPercentage,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        user,
        loginUser,
        logoutUser,
        toastMessage,
        showToast
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
