import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Search, 
  RotateCcw, 
  SlidersHorizontal,
  Home,
  Check
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const ShopCatalog: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setCurrentView 
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest' | 'rating'>('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(11000);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Women',
    'Men',
    'Streetwear',
    'Accessories',
    'Dresses',
    'Tops',
    'T-Shirts',
    'Shirts',
    'Hoodies & Sweatshirts',
    'Jeans',
    'Trousers',
    'Jackets'
  ];

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedSizes([]);
    setMaxPrice(11000);
    setOnSaleOnly(false);
    setSortBy('featured');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Women' && p.mainCategory !== 'Women') return false;
        if (selectedCategory === 'Men' && p.mainCategory !== 'Men') return false;
        if (selectedCategory === 'Streetwear' && p.mainCategory !== 'Streetwear') return false;
        if (selectedCategory === 'Accessories' && p.mainCategory !== 'Accessories') return false;
        if (selectedCategory === 'New Arrivals' && !p.isNewArrival) return false;
        if (selectedCategory === 'Sale' && !p.originalPrice) return false;
        if (
          !['Women', 'Men', 'Streetwear', 'Accessories', 'New Arrivals', 'Sale'].includes(selectedCategory) &&
          p.category !== selectedCategory
        ) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.mainCategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (p.price > maxPrice) return false;

      // On Sale only
      if (onSaleOnly && !p.originalPrice) return false;

      // Sizes filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some((s) => (p.sizes as string[]).includes(s));
        if (!hasMatchingSize) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' retains curated sequence
    });
  }, [selectedCategory, searchQuery, maxPrice, onSaleOnly, selectedSizes, sortBy]);

  return (
    <div className="min-h-screen bg-[#F7F7FB] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1 hover:text-[#315CFF] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold">Catalog</span>
          {selectedCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-[#315CFF] font-semibold">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Page Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#111C3A] tracking-tight">
              {selectedCategory === 'All' ? 'ALL COLLECTIONS' : selectedCategory.toUpperCase()}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Showing {filteredProducts.length} of {PRODUCTS.length} curated fashion items
            </p>
          </div>

          {/* Top Sort & Filter Trigger for Mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 shadow-sm cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#315CFF]" />
              <span>Filters ({selectedSizes.length + (onSaleOnly ? 1 : 0) + (selectedCategory !== 'All' ? 1 : 0)})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <span className="hidden sm:inline text-xs text-gray-400 mr-2 font-mono">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-800 shadow-sm focus:outline-none focus:border-[#315CFF] cursor-pointer appearance-none pr-8"
              >
                <option value="featured">Featured Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Releases</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-gray-150 shadow-sm sticky top-28">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#111C3A] flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#315CFF]" />
                <span>Filters</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-gray-400 hover:text-[#315CFF] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search within catalog */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Search Catalog
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#315CFF]"
                />
              </div>
            </div>

            {/* Categories List */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#315CFF] text-white font-bold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="uppercase tracking-wider text-gray-700">Max Price</span>
                <span className="text-[#315CFF] font-mono">৳ {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1500"
                max="11000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#315CFF] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>৳ 1,500</span>
                <span>৳ 11,000</span>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Available Sizes
              </label>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedSizes.includes(s)
                        ? 'bg-[#111C3A] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Sale Only Toggle */}
            <div className="pt-2 border-t border-gray-150">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="rounded text-[#315CFF] focus:ring-[#315CFF]"
                />
                <span>Sale Items Only (-% Discount)</span>
              </label>
            </div>

          </aside>

          {/* Right Product Grid Column */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Active Filters Pill Bar */}
            {(selectedCategory !== 'All' || selectedSizes.length > 0 || onSaleOnly || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 text-xs">
                <span className="text-gray-400 font-mono text-[11px] mr-1">ACTIVE FILTERS:</span>
                
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#315CFF]/10 text-[#315CFF] font-semibold">
                    Category: {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                    Keyword: "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}

                {selectedSizes.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                    Size: {s}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSize(s)} />
                  </span>
                ))}

                {onSaleOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F43F5E]/10 text-[#F43F5E] font-semibold">
                    Sale Only
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setOnSaleOnly(false)} />
                  </span>
                )}

                <button
                  onClick={resetFilters}
                  className="ml-auto text-[11px] font-bold text-gray-500 hover:text-black underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-150 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#111C3A]">No styles matched your criteria</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Try broadening your search, resetting the price range, or clearing size selections.
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#315CFF] text-white text-xs font-bold hover:bg-[#2548DB] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h3 className="text-base font-black text-[#111C3A]">Filters &amp; Sort</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase mb-2">Category</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                      selectedCategory === c ? 'bg-[#315CFF] text-white font-bold' : 'text-gray-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sizes */}
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase mb-2">Size</p>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={`py-2 rounded-lg text-xs font-bold ${
                      selectedSizes.includes(s) ? 'bg-[#111C3A] text-white' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-[#315CFF] text-white text-xs font-bold"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
