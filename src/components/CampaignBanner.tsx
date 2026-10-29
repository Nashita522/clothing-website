import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CAMPAIGN_EDITORIAL } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CampaignBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleExplore = () => {
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-28 overflow-hidden bg-[#0B0B12] text-white">
      {/* Background Campaign Image with subtle parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={CAMPAIGN_EDITORIAL.image}
          alt="The Everyday Edit Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-110 scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B12] via-[#0B0B12]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0B0B12]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-[#A5B4FC]">
            <Sparkles className="w-3.5 h-3.5 text-[#315CFF]" />
            <span>Autumn / Winter Architectural Capsule</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
            {CAMPAIGN_EDITORIAL.headline}
          </h2>

          <p className="text-xl sm:text-2xl font-light text-[#F1EDFF] italic">
            "{CAMPAIGN_EDITORIAL.subheading}"
          </p>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
            {CAMPAIGN_EDITORIAL.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleExplore}
              className="px-8 py-4 rounded-xl bg-white hover:bg-[#F1EDFF] text-[#111C3A] font-extrabold tracking-wide text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{CAMPAIGN_EDITORIAL.buttonText}</span>
              <ArrowRight className="w-4 h-4 text-[#315CFF]" />
            </button>
            <span className="text-xs uppercase font-mono tracking-widest text-[#A5B4FC]">
              Limited Editorial Pressing
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
