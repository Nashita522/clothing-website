import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { PROMO_BANNER } from '../data/products';
import { useShop } from '../context/ShopContext';

export const PromoBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory, applyPromoCode } = useShop();

  const handleShop = () => {
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#F7F7FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#111C3A] text-white">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 relative z-10">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#315CFF]/30 border border-[#315CFF]/50 text-xs font-bold text-[#A5B4FC] tracking-wider uppercase">
                <Tag className="w-3.5 h-3.5 text-[#315CFF]" />
                <span>Special Privilege Voucher</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {PROMO_BANNER.headline}
              </h2>

              <p className="text-lg font-medium text-[#A5B4FC]">
                {PROMO_BANNER.subheading}
              </p>

              <p className="text-sm text-gray-300 max-w-lg leading-relaxed">
                {PROMO_BANNER.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleShop}
                  className="px-8 py-3.5 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-bold tracking-wide transition-all shadow-lg shadow-[#315CFF]/30 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{PROMO_BANNER.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => applyPromoCode('TRENDY20')}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
                  title="Click to apply promo code"
                >
                  CLAIM: <span className="text-[#A5B4FC] underline">TRENDY20</span>
                </button>
              </div>

            </div>

            {/* Right Fashion Photograph */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[380px] overflow-hidden">
              <img
                src={PROMO_BANNER.image}
                alt="Find Your Next Favorite Fit"
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111C3A] via-transparent to-transparent opacity-80" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
