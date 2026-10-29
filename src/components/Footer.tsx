import React from 'react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setIsAccountOpen } = useShop();

  const handleNav = (cat: string) => {
    setCurrentView('shop');
    setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B12] text-gray-400 text-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#315CFF] to-[#8B5CF6] flex items-center justify-center font-black text-white text-sm">
                TC
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                TRENDY COLLECTION
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Premium fashion and streetwear brand engineered for Gen Z and modern tastemakers. 
              Wear Your Future with bold silhouettes, authentic textiles, and architectural everyday essentials.
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p>📍 Studio: Gulshan Fashion District, Dhaka 1212</p>
              <p>✉️ Concierge: concierge@trendycollection.demo</p>
              <p>📞 Phone: +880 (2) 988-TRENDY</p>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs">
              {["Women's Clothing", "Men's Clothing", 'Streetwear', 'Accessories', 'Dresses', 'Jackets'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleNav(cat)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-white transition-colors">
                  My Profile &amp; Orders
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Size Guide &amp; Fit Advisor
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Shipping &amp; Delivery Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Returns &amp; Exchanges (7-Day)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Payment Verification
                </span>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Instagram', 'TikTok', 'Twitter / X', 'Discord'].map((platform) => (
                <span
                  key={platform}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {platform}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A5B4FC] block mb-1">
                Supported Payments:
              </span>
              <p className="text-xs text-gray-400">
                bKash • Nagad • Visa • Mastercard • Cash on Delivery
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 Trendy Collection. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms &amp; Conditions</span>
            <span className="text-white/30">•</span>
            <span className="text-[#A5B4FC]">Demo E-Commerce Store</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
