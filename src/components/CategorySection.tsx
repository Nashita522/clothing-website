import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategorySection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleSelectCategory = (targetCategory: string) => {
    setCurrentView('shop');
    setSelectedCategory(targetCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#F7F7FB] text-[#171923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#315CFF]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#315CFF]">Curated Universes</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111C3A]">
              SHOP BY CATEGORY
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-gray-600 max-w-md">
            Explore our foundational wardrobe pillars — engineered from tailored evening wear to oversized street silhouettes and tactical objects.
          </p>
        </div>

        {/* 4 Large Photographic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.targetCategory)}
              className="group relative h-[480px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col justify-end p-6"
            >
              {/* Background Image with zoom on hover */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Dynamic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12]/95 via-[#0B0B12]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
              
              {/* Category Index Badge */}
              <div className="absolute top-5 left-5 z-10 flex items-center justify-between w-[calc(100%-40px)]">
                <span className="text-xs font-mono font-bold tracking-widest text-white/70 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  0{idx + 1}
                </span>
                <span className="text-xs font-semibold text-[#A5B4FC] bg-[#111C3A]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#315CFF]/30">
                  {cat.itemCount}
                </span>
              </div>

              {/* Text & Action */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-black text-white group-hover:text-[#A5B4FC] transition-colors leading-tight">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#315CFF] transition-colors flex items-center gap-1">
                    Explore Universe
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#315CFF] text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
