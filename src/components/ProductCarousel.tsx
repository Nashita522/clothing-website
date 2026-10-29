import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  badge = 'NEW RELEASES',
  products
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-white text-[#171923] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5CF6]">
                {badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111C3A]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-[#315CFF] hover:bg-[#315CFF] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-gray-700 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-[#315CFF] hover:bg-[#315CFF] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer text-gray-700 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
