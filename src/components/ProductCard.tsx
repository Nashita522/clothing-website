import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  showSaleBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Format currency in BDT
  const formatBDT = (val: number) => {
    return `৳ ${val.toLocaleString('en-US')}`;
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-150 hover:border-[#315CFF]/30 shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 4:5 portrait ratio */}
      <div 
        className="relative w-full aspect-[4/5] bg-[#F1EDFF]/40 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.originalPrice && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#F43F5E] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && !product.originalPrice && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#111C3A] text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
              NEW DROP
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#315CFF] text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer ${
            inWishlist
              ? 'bg-[#8B5CF6] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-[#8B5CF6] shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/95 hover:bg-white text-[#111C3A] text-xs font-bold shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, selectedSize, selectedColor, 1);
            }}
            className="py-2.5 px-3.5 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white text-xs font-bold shadow-lg flex items-center justify-center transition-all hover:scale-[1.02] cursor-pointer"
            title="Quick add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details info */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#8B5CF6]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-gray-700">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="text-sm sm:text-base font-bold text-[#171923] hover:text-[#315CFF] cursor-pointer transition-colors line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 py-1">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                aria-label={`Select ${c.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-[#315CFF] ring-offset-1 scale-110'
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[11px] text-gray-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'tone' : 'tones'}
            </span>
          </div>
        )}

        {/* Price & Mobile Add to Bag */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-[#111C3A]">
              {formatBDT(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatBDT(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Direct Add Button for Mobile */}
          <button
            onClick={() => addToCart(product, selectedSize, selectedColor, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="sm:hidden p-2 rounded-lg bg-[#315CFF] text-white hover:bg-[#2548DB] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
