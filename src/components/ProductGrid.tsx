import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

interface ProductGridProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  targetCategory?: string;
  limit?: number;
  columns?: 2 | 3 | 4;
  showViewAll?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  id,
  title,
  subtitle,
  badge,
  products,
  targetCategory,
  limit,
  columns = 4,
  showViewAll = true
}) => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const displayedProducts = limit ? products.slice(0, limit) : products;

  const handleViewAll = () => {
    setCurrentView('shop');
    setSelectedCategory(targetCategory || 'All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <section id={id} className="py-16 sm:py-20 bg-[#F7F7FB] text-[#171923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            {badge && (
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#315CFF]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#315CFF]">
                  {badge}
                </span>
              </div>
            )}
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#111C3A]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {showViewAll && (
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#315CFF] hover:text-[#111C3A] transition-colors group cursor-pointer"
            >
              <span>View Full Selection</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className={`grid ${colClasses} gap-6`}>
          {displayedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
};
