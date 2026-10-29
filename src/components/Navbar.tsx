import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    setSelectedCategory, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    setIsAccountOpen,
    user
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: 'home' | 'shop', category = 'All') => {
    setCurrentView(view);
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', action: () => navigateTo('home') },
    { label: 'Shop', action: () => navigateTo('shop', 'All') },
    { label: 'Women', action: () => navigateTo('shop', 'Women') },
    { label: 'Men', action: () => navigateTo('shop', 'Men') },
    { label: 'New Arrivals', action: () => navigateTo('shop', 'New Arrivals') },
    { label: 'Streetwear', action: () => navigateTo('shop', 'Streetwear') },
    { label: 'Sale', action: () => navigateTo('shop', 'Sale'), isSale: true }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B12]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Mobile hamburger & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="lg:hidden p-2 text-white hover:text-[#315CFF] rounded-lg focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#315CFF] to-[#8B5CF6] flex items-center justify-center font-black text-white text-base shadow-md shadow-[#315CFF]/30 group-hover:scale-105 transition-transform">
                TC
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white group-hover:text-[#A5B4FC] transition-colors leading-none">
                  TRENDY<span className="text-[#315CFF]">.</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#A5B4FC] font-semibold uppercase leading-tight">
                  COLLECTION
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className={`text-sm font-semibold tracking-wide transition-colors relative py-1 cursor-pointer ${
                  link.isSale 
                    ? 'text-[#F43F5E] hover:text-[#FB7185]' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.isSale && (
                  <span className="absolute -top-2.5 -right-3 text-[9px] font-extrabold bg-[#F43F5E] text-white px-1 rounded-sm uppercase tracking-tighter">
                    Hot
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Search, Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search clothing"
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Button */}
            <button
              onClick={() => setIsAccountOpen(true)}
              aria-label="Customer account"
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer relative"
              title={user ? `Signed in as ${user.name}` : 'Sign In / Account'}
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10B981] border border-[#0B0B12]" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist items"
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8B5CF6] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#315CFF] hover:bg-[#2548DB] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#315CFF]/30 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-white text-[#111C3A] text-xs font-black rounded-full px-1.5 py-0.2 min-w-4 text-center">
                {cartCount}
              </span>
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-[#0B0B12] border-r border-white/10 h-full p-6 flex flex-col justify-between overflow-y-auto text-white shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#315CFF] to-[#8B5CF6] flex items-center justify-center font-black text-white text-sm">
                    TC
                  </div>
                  <span className="text-base font-black tracking-wider text-white">
                    TRENDY COLLECTION
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="py-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left font-semibold text-base hover:bg-white/5 transition-colors"
                  >
                    <span className={link.isSale ? 'text-[#F43F5E]' : 'text-white'}>
                      {link.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                  </button>
                ))}
              </div>

              {/* Special Promotion Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#111C3A] to-[#0B0B12] border border-[#315CFF]/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#A5B4FC]">
                  <Sparkles className="w-3.5 h-3.5 text-[#315CFF]" />
                  <span>VIP PRIVILEGE</span>
                </div>
                <p className="text-xs text-gray-300">
                  Use coupon <span className="text-white font-mono font-bold">TRENDY20</span> to save 20% on all new drops today.
                </p>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
