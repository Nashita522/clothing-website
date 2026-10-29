import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ShieldCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    promoCode,
    discountPercentage,
    applyPromoCode,
    setIsCheckoutOpen,
    setCurrentView,
    setSelectedCategory
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const discountAmount = Math.round(cartSubtotal * (discountPercentage / 100));
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const formatBDT = (val: number) => `৳ ${val.toLocaleString('en-US')}`;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleExploreShop = () => {
    setIsCartOpen(false);
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-[#F7F7FB]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#315CFF] text-white flex items-center justify-center font-bold text-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-black text-[#111C3A]">
                YOUR BAG ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#111C3A] text-white p-4 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold">
              <span>{remainingForFreeShipping === 0 ? '✨ You unlocked FREE Nationwide Express Shipping!' : `Add ${formatBDT(remainingForFreeShipping)} more for FREE Delivery`}</span>
              <span className="font-mono text-[#A5B4FC]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#315CFF] to-[#8B5CF6] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#F1EDFF] text-[#8B5CF6] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#111C3A]">Your bag is empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Discover new architectural silhouettes, bold essentials, and limited drops.
                  </p>
                </div>
                <button
                  onClick={handleExploreShop}
                  className="px-6 py-3 rounded-xl bg-[#315CFF] text-white text-xs font-bold tracking-wide hover:bg-[#2548DB] transition-all shadow-md cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-[#F7F7FB] border border-gray-150 transition-all hover:border-[#315CFF]/30"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl shrink-0 bg-white"
                  />

                  {/* Item Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-[#F43F5E] p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                        <span className="font-semibold bg-white px-2 py-0.5 rounded border border-gray-200">
                          Size: {item.size}
                        </span>
                        <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span>{item.color.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 font-bold text-gray-900 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-xs font-extrabold text-[#111C3A]">
                        {formatBDT(item.product.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-150 bg-[#F7F7FB] space-y-4">
              
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. TRENDY20)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-mono uppercase focus:outline-none focus:border-[#315CFF]"
                    />
                  </div>
                  <button
                    onClick={() => {
                      applyPromoCode(inputCode);
                      setInputCode('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#111C3A] text-white text-xs font-bold hover:bg-[#315CFF] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoCode && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Coupon '{promoCode}' active (-{discountPercentage}%)</span>
                  </p>
                )}
              </div>

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#111C3A]">{formatBDT(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8B5CF6] font-bold">
                    <span>Discount ({discountPercentage}%)</span>
                    <span>-{formatBDT(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-700">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-600 uppercase font-bold">Free</span>
                    ) : (
                      formatBDT(120)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#111C3A] border-t border-gray-200 pt-2">
                  <span>Estimated Total</span>
                  <span>
                    {formatBDT(
                      cartSubtotal - discountAmount + (cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 120)
                    )}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-black text-sm tracking-wide transition-all shadow-lg shadow-[#315CFF]/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-Bit SSL Demo Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
