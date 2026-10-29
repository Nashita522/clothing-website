import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const QuickSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setSelectedProduct,
    setCurrentView,
    setSearchQuery: setGlobalSearch
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.mainCategory.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularTags = ['Oversized', 'Dresses', 'Hoodie', 'Cargo', 'Denim', 'Sneakers', 'Silk'];

  const handleSelectProduct = (product: typeof PRODUCTS[0]) => {
    setIsSearchOpen(false);
    setSelectedProduct(product);
  };

  const handleSearchAll = (term: string) => {
    setIsSearchOpen(false);
    setGlobalSearch(term);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-10 overflow-hidden border border-gray-150 animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-gray-150 flex items-center gap-3 bg-[#F7F7FB]">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, hoodies, oversized tees, streetwear, bags..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider ml-2"
          >
            Esc
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <Tag className="w-3.5 h-3.5 text-[#315CFF]" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-[#315CFF] hover:text-white text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                <span>FOUND {results.length} STYLES</span>
                <button
                  onClick={() => handleSearchAll(query)}
                  className="text-[#315CFF] font-bold hover:underline flex items-center gap-1"
                >
                  <span>View All in Catalog</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2">
                {results.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F7F7FB] transition-colors cursor-pointer group"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-12 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 group-hover:text-[#315CFF] truncate">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {p.mainCategory} &bull; {p.category}
                      </p>
                    </div>
                    <span className="text-xs font-black text-[#111C3A]">
                      ৳ {p.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm font-bold text-gray-700">No styles found for "{query}"</p>
              <p className="text-xs text-gray-400">
                Try searching for broader terms like "tees", "jacket", "cargo", or "silk".
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
