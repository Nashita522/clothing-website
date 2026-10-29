import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { setCurrentView, setSelectedCategory } = useShop();

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative z-50 bg-gradient-to-r from-[#0B0B12] via-[#111C3A] to-[#0B0B12] border-b border-[#315CFF]/30 text-white text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left spacer for balance */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[#A5B4FC] font-mono">
          <span className="w-2 h-2 rounded-full bg-[#315CFF] inline-block" />
          <span>DHAKA &amp; WORLDWIDE SHIPPING</span>
        </div>

        {/* Center message */}
        <div className="flex-1 flex items-center justify-center gap-2 font-medium tracking-wide text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#315CFF] shrink-0" />
          <span className="font-bold tracking-wider uppercase text-white">
            NEW SEASON DROP — DISCOVER YOUR NEXT LOOK
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline text-[#A5B4FC]">
            Use code <span className="font-mono font-bold text-white bg-[#315CFF]/30 px-1.5 py-0.5 rounded border border-[#315CFF]/50">TRENDY20</span> for 20% off
          </span>
          <button
            onClick={() => {
              setCurrentView('shop');
              setSelectedCategory('All');
            }}
            className="hidden lg:inline-flex items-center gap-1 font-semibold text-[#8B5CF6] hover:text-white transition-colors ml-2 underline decoration-[#8B5CF6]/50 underline-offset-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right close button */}
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
};
