import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Check, 
  Ruler, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const formatBDT = (val: number) => `৳ ${val.toLocaleString('en-US')}`;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.mainCategory === product.mainCategory || p.category === product.category)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-8 flex flex-col max-h-[92vh] border border-gray-150 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Gallery Column */}
            <div className="md:col-span-6 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-150">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.originalPrice && (
                    <span className="px-3 py-1 rounded-full bg-[#F43F5E] text-white text-xs font-extrabold uppercase">
                      -{discountPercent}% OFF
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="px-3 py-1 rounded-full bg-[#111C3A] text-white text-xs font-bold uppercase">
                      New Release
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#315CFF] ring-2 ring-[#315CFF]/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details & Purchase Column */}
            <div className="md:col-span-6 space-y-6">
              
              {/* Category, Rating, Breadcrumb */}
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span className="uppercase tracking-widest font-bold text-[#315CFF]">
                    {product.mainCategory} &bull; {product.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-gray-800">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[#111C3A] tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-gray-150">
                <span className="text-2xl sm:text-3xl font-black text-[#111C3A]">
                  {formatBDT(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {formatBDT(product.originalPrice)}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  In Stock &bull; Ready to Ship
                </span>
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    Color: <span className="text-[#111C3A] font-black">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor.name === c.name
                          ? 'border-[#315CFF] scale-110 shadow-md ring-2 ring-[#315CFF]/30'
                          : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <Check className={`w-4 h-4 ${['#FFFFFF', '#F5F5F0', '#FAFAFA', '#E7E5E4'].includes(c.hex) ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector + Size Guide Button */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    Size: <span className="text-[#111C3A] font-black">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8B5CF6] hover:text-[#315CFF] transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#111C3A] text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Picker & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-200 text-sm font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-gray-900 min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-200 text-sm font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-bold tracking-wide transition-all shadow-lg shadow-[#315CFF]/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag &bull; {formatBDT(product.price * quantity)}</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      inWishlist
                        ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                    }`}
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div className="border-t border-gray-150 pt-4 space-y-3">
                <div className="flex border-b border-gray-200 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-[#315CFF] text-[#315CFF]'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Product Description
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'shipping'
                        ? 'border-[#315CFF] text-[#315CFF]'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Shipping &amp; Returns
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'care'
                        ? 'border-[#315CFF] text-[#315CFF]'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Fabric &amp; Fit
                  </button>
                </div>

                <div className="text-xs text-gray-600 leading-relaxed pt-1">
                  {activeTab === 'details' && (
                    <p>{product.description}</p>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-1.5">
                      <p className="flex items-center gap-1.5 font-semibold text-gray-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Dhaka Metro: 24–48 Hours &bull; Nationwide: 2–4 Business Days</span>
                      </p>
                      <p>Hassle-free 7-day size exchange and store credit returns for unworn pieces with tags attached.</p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <div className="space-y-1">
                      <p><strong>Fabric:</strong> {product.fabricDetails}</p>
                      <p><strong>Fit:</strong> {product.fit}</p>
                      <p className="text-gray-400 mt-1">Care: Machine wash cold inside out with like colors. Do not tumble dry. Cool iron if needed.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Related Products Recommendation Footer */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-150">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111C3A]">
                  Complete The Look &bull; Pair With
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('open-product', { detail: rel }));
                      }, 100);
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl border border-gray-150 hover:border-[#315CFF] bg-[#F7F7FB] transition-colors cursor-pointer group"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-14 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate group-hover:text-[#315CFF]">
                        {rel.name}
                      </p>
                      <p className="text-xs font-extrabold text-[#111C3A] mt-0.5">
                        {formatBDT(rel.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Size Guide Modal Sub-Dialog */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h4 className="text-base font-bold text-[#111C3A] flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#315CFF]" />
                <span>Trendy Collection Universal Fit Guide (Inches)</span>
              </h4>
              <button onClick={() => setShowSizeGuide(false)} className="text-gray-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold">
                  <th className="p-2 border">Size</th>
                  <th className="p-2 border">Chest</th>
                  <th className="p-2 border">Waist</th>
                  <th className="p-2 border">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border font-bold">XS</td><td className="p-2 border">36"</td><td className="p-2 border">28–30"</td><td className="p-2 border">27"</td></tr>
                <tr><td className="p-2 border font-bold">S</td><td className="p-2 border">38"</td><td className="p-2 border">30–32"</td><td className="p-2 border">28"</td></tr>
                <tr><td className="p-2 border font-bold">M</td><td className="p-2 border">40"</td><td className="p-2 border">32–34"</td><td className="p-2 border">29"</td></tr>
                <tr><td className="p-2 border font-bold">L</td><td className="p-2 border">42"</td><td className="p-2 border">34–36"</td><td className="p-2 border">30"</td></tr>
                <tr><td className="p-2 border font-bold">XL</td><td className="p-2 border">44"</td><td className="p-2 border">36–38"</td><td className="p-2 border">31"</td></tr>
                <tr><td className="p-2 border font-bold">XXL</td><td className="p-2 border">46"</td><td className="p-2 border">38–40"</td><td className="p-2 border">32"</td></tr>
              </tbody>
            </table>
            <p className="text-[11px] text-gray-500">
              * Measurements are garment flat measurements. For relaxed/oversized drape, select your regular standard size.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
