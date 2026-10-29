import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setCurrentView,
    setSelectedCategory
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const formatBDT = (val: number) => `৳ ${val.toLocaleString('en-US')}`;

  const handleExplore = () => {
    setIsWishlistOpen(false);
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsWishlistOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-[#F7F7FB]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-sm">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <h2 className="text-lg font-black text-[#111C3A]">
                SAVED ITEMS ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#F1EDFF] text-[#8B5CF6] flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#111C3A]">Your wishlist is clear</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Tap the heart icon on any product to save pieces for your next session.
                  </p>
                </div>
                <button
                  onClick={handleExplore}
                  className="px-6 py-3 rounded-xl bg-[#315CFF] text-white text-xs font-bold tracking-wide hover:bg-[#2548DB] transition-all shadow-md cursor-pointer"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-4 p-3 rounded-2xl bg-[#F7F7FB] border border-gray-150 transition-all hover:border-[#8B5CF6]/40"
                >
                  {/* Thumbnail */}
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-20 h-24 object-cover rounded-xl shrink-0 bg-white"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                          {p.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-gray-400 hover:text-[#F43F5E] p-1 transition-colors cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wider mt-0.5">
                        {p.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-extrabold text-[#111C3A]">
                        {formatBDT(p.price)}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(p, p.sizes[0], p.colors[0], 1);
                          toggleWishlist(p.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#111C3A] hover:bg-[#315CFF] text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-gray-150 bg-[#F7F7FB]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => {
                    addToCart(p, p.sizes[0], p.colors[0], 1);
                  });
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Move All to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
