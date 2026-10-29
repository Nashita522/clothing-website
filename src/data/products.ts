import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. Women's Elegant Long Dress
  {
    id: 'tc-w-001',
    name: 'Midnight Silk Slip Evening Dress',
    category: 'Dresses',
    mainCategory: 'Women',
    description: 'Sculpted bias-cut fluid evening dress crafted from mulberry silk-blend satin with an alluring cowl neckline and delicate micro-straps.',
    price: 6850,
    originalPrice: 8200,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Black', hex: '#0B0B12' },
      { name: 'Electric Blue', hex: '#315CFF' },
      { name: 'Champagne', hex: '#E6D7C3' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 38,
    fabricDetails: '88% Mulberry Silk, 12% Spandex blend for fluid silhouette drape.',
    fit: 'Slim tailored fit with natural body drape.'
  },
  // 2. Women's Summer Linen Dress
  {
    id: 'tc-w-002',
    name: 'Azure Breeze Tiered Summer Dress',
    category: 'Dresses',
    mainCategory: 'Women',
    description: 'Breathable organic European flax linen midi dress with a sun-drenched tiered skirt and an open tie-back detail.',
    price: 4950,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sky Cerulean', hex: '#4A90E2' },
      { name: 'Soft Lavender', hex: '#E2DBF8' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    isNewArrival: true,
    isTrending: true,
    rating: 4.8,
    reviewCount: 24,
    fabricDetails: '100% Certified Organic Pre-washed Linen.',
    fit: 'Relaxed A-line silhouette with smocked elastic back.'
  },
  // 3. Women's Floral Dress
  {
    id: 'tc-w-003',
    name: 'Botanical Noir Midi Wrap Dress',
    category: 'Dresses',
    mainCategory: 'Women',
    description: 'Chic wrap dress infused with hand-painted micro botanical motifs, flutter sleeves, and an asymmetrical flowing hem.',
    price: 5200,
    originalPrice: 6500,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525450824786-227cbef70703?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Botanical Black', hex: '#1C1917' },
      { name: 'Deep Sage', hex: '#4A5D4E' }
    ],
    isTrending: true,
    rating: 4.7,
    reviewCount: 42,
    fabricDetails: 'Eco-rayon viscose crepe with matte finish.',
    fit: 'True to size with adjustable waist belt.'
  },
  // 4. Women's Casual Minimalist Dress
  {
    id: 'tc-w-004',
    name: 'Neo Minimalist Sculpted Tank Dress',
    category: 'Dresses',
    mainCategory: 'Women',
    description: 'High-density ribbed knit tank dress that hugs contours comfortably while maintaining pristine modern minimalism.',
    price: 3650,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Noir', hex: '#18181B' },
      { name: 'Electric Royal', hex: '#315CFF' },
      { name: 'Oatmeal Heather', hex: '#D6D3D1' }
    ],
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 65,
    fabricDetails: '95% Modal Cotton, 5% Elastane heavy knit rib.',
    fit: 'Form-fitting second-skin silhouette.'
  },
  // 5. Women's Co-Ord Set
  {
    id: 'tc-w-005',
    name: 'Metropolis Tailored Vest & Trouser Set',
    category: 'Tops',
    mainCategory: 'Women',
    description: 'Modern two-piece power set featuring a sculpted cropped vest and wide-leg double-pleated tailored trousers.',
    price: 7400,
    originalPrice: 8900,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Graphite Grey', hex: '#374151' },
      { name: 'Onyx Black', hex: '#111827' },
      { name: 'Chalk Beige', hex: '#E5E0D8' }
    ],
    isNewArrival: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 29,
    fabricDetails: 'Structured wool-blend suiting with satin inner lining.',
    fit: 'Vest is tailored; trousers have an effortless high-rise wide leg.'
  },
  // 6. Women's Asymmetric Draped Top
  {
    id: 'tc-w-006',
    name: 'Vanguard Asymmetrical One-Shoulder Top',
    category: 'Tops',
    mainCategory: 'Women',
    description: 'Avant-garde architectural silhouette with dynamic gathered shoulder draping and double-layered contour stretch fabric.',
    price: 2850,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Neon Violet', hex: '#8B5CF6' },
      { name: 'Jet Black', hex: '#000000' },
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    isTrending: true,
    rating: 4.6,
    reviewCount: 19,
    fabricDetails: '92% Micro-polyamide, 8% Elastane high-recovery weave.',
    fit: 'Fitted stretch body.'
  },
  // 7. Men's Oversized Heavyweight T-Shirt
  {
    id: 'tc-m-001',
    name: 'Apex 280GSM Heavy Boxy Tee',
    category: 'T-Shirts',
    mainCategory: 'Men',
    description: 'Substantial 280GSM combed ring-spun cotton tee with dropped shoulders, reinforced ribbed thick collar, and clean boxy drape.',
    price: 2150,
    originalPrice: 2600,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Vintage Acid Wash', hex: '#374151' },
      { name: 'Midnight Navy', hex: '#111C3A' },
      { name: 'Optical White', hex: '#F9FAFB' }
    ],
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 94,
    fabricDetails: '100% Organic Heavy Combed Cotton 280 GSM.',
    fit: 'Relaxed oversized boxy cut with drop shoulders.'
  },
  // 8. Men's Relaxed Cuban Collar Shirt
  {
    id: 'tc-m-002',
    name: 'Riviera Textured Camp Collar Shirt',
    category: 'Shirts',
    mainCategory: 'Men',
    description: 'Airy waffle-textured camp collar summer shirt with clean mother-of-pearl tonal buttons and side split hem.',
    price: 3450,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta Rust', hex: '#9A3412' },
      { name: 'Warm Cream', hex: '#F5F5F4' },
      { name: 'Deep Indigo', hex: '#1E3A8A' }
    ],
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 31,
    fabricDetails: '70% Breathable Cotton, 30% Linen waffle weave.',
    fit: 'Casual resort drape with open notched lapel.'
  },
  // 9. Men's Minimal Knit Polo Shirt
  {
    id: 'tc-m-003',
    name: 'Milano Fine-Gauge Knit Johnny Polo',
    category: 'Shirts',
    mainCategory: 'Men',
    description: 'Elevated buttonless Johnny collar knit polo crafted from silky combed cotton with ribbed hems for a tailored modern look.',
    price: 3800,
    originalPrice: 4500,
    images: [
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sage Moss', hex: '#3F4E4F' },
      { name: 'Obsidian Black', hex: '#18181B' },
      { name: 'Bone White', hex: '#F4F4F5' }
    ],
    isTrending: true,
    rating: 4.7,
    reviewCount: 26,
    fabricDetails: '100% Mercerized Pima Cotton fine-gauge 14GG knit.',
    fit: 'Athletic regular fit.'
  },
  // 10. Men's Relaxed Denim Jacket
  {
    id: 'tc-m-004',
    name: 'Raw Horizon Selvedge Denim Trucker',
    category: 'Jackets',
    mainCategory: 'Men',
    description: 'Heritage Japanese-inspired 14oz redline selvedge trucker jacket with antiqued silver shank buttons and clean box pleats.',
    price: 6950,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Faded Stonewash', hex: '#60A5FA' },
      { name: 'Deep Indigo Raw', hex: '#1E293B' },
      { name: 'Washed Black', hex: '#27272A' }
    ],
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 58,
    fabricDetails: '14oz 100% Rigid Ring-Spun Cotton Denim.',
    fit: 'Relaxed drop-shoulder trucker silhouette.'
  },
  // 11. Men's Relaxed Pleated Trousers
  {
    id: 'tc-m-005',
    name: 'Atelier Wide-Leg Double Pleated Trousers',
    category: 'Trousers',
    mainCategory: 'Men',
    description: 'Dramatic architectural front pleats creating volume through the thigh that tapers gracefully at the ankle, finished with side adjusters.',
    price: 4600,
    originalPrice: 5500,
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Brown', hex: '#3E2723' },
      { name: 'Charcoal Wool', hex: '#374151' },
      { name: 'Stone Sand', hex: '#D6D3D1' }
    ],
    isTrending: true,
    rating: 4.8,
    reviewCount: 37,
    fabricDetails: 'Durable poly-viscose gabardine with natural crease resistance.',
    fit: 'High-waisted relaxed balloon drape.'
  },
  // 12. Men's Daily Pullover Hoodie
  {
    id: 'tc-m-006',
    name: 'Core Heavy French Terry Hoodie',
    category: 'Hoodies & Sweatshirts',
    mainCategory: 'Men',
    description: 'Heavyweight 450GSM loopback French terry hoodie engineered with double-layered hood, seamless kangaroo pocket, and rib gussets.',
    price: 4350,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Heather Smoke', hex: '#6B7280' },
      { name: 'Electric Cobalt', hex: '#315CFF' },
      { name: 'Deep Midnight', hex: '#111C3A' }
    ],
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 82,
    fabricDetails: '100% Heavy Combed Cotton French Terry 450 GSM.',
    fit: 'Comfortable oversized slouch.'
  },
  // 13. Streetwear Acid Wash Graphic Tee
  {
    id: 'tc-st-001',
    name: 'Cybernetic Genesis Acid-Wash Tee',
    category: 'Streetwear',
    mainCategory: 'Streetwear',
    description: 'Futuristic high-density puff print cyberpunk graphic across back with subtle front chest typographic branding on mineral acid wash.',
    price: 2450,
    originalPrice: 3100,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Acid Washed Charcoal', hex: '#27272A' },
      { name: 'Electric Purple Wash', hex: '#581C87' }
    ],
    isNewArrival: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 47,
    fabricDetails: '260GSM Mineral enzyme-washed 100% cotton jersey.',
    fit: 'Exaggerated streetwear boxy drop-shoulder.'
  },
  // 14. Streetwear Oversized Zip Hoodie
  {
    id: 'tc-st-002',
    name: 'Sub-Zero Two-Way Zip Street Hoodie',
    category: 'Streetwear',
    mainCategory: 'Streetwear',
    description: 'Heavyweight oversized hoodie featuring industrial double chrome zippers, exaggerated cuffs, and thumbhole detail.',
    price: 5200,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#0B0B12' },
      { name: 'Ghost Grey', hex: '#9CA3AF' }
    ],
    isBestSeller: true,
    isTrending: true,
    rating: 4.8,
    reviewCount: 63,
    fabricDetails: '480GSM Diagonal French Terry with brushed backing.',
    fit: 'Ultra-relaxed silhouette.'
  },
  // 15. Streetwear Multi-Pocket Cargo Pants
  {
    id: 'tc-st-003',
    name: 'Sector 09 Modular Parachute Cargoes',
    category: 'Streetwear',
    mainCategory: 'Streetwear',
    description: 'Ripstop tactical parachute cargo pants with 8 multi-utility 3D bellows pockets, bungee ankle cinch cords, and articulated knee pleats.',
    price: 4900,
    originalPrice: 6200,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Tactical Black', hex: '#18181B' },
      { name: 'Olive Drab', hex: '#3F4E4F' },
      { name: 'Desert Khaki', hex: '#A8A29E' }
    ],
    isTrending: true,
    rating: 4.9,
    reviewCount: 71,
    fabricDetails: 'High-tensile diamond nylon-cotton ripstop with DWR coating.',
    fit: 'Voluminous wide leg with customizable drawstring ankles.'
  },
  // 16. Streetwear Baggy Skate Denim
  {
    id: 'tc-st-004',
    name: 'Rebel Y2K Stacking Baggy Denim',
    category: 'Jeans',
    mainCategory: 'Streetwear',
    description: 'Extreme wide-leg 90s-inspired skater jeans designed for puddle stacking over sneakers, with light fading and contrast tobacco stitching.',
    price: 4450,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vintage Dirty Wash', hex: '#6B7280' },
      { name: 'Electric Tint Indigo', hex: '#2563EB' },
      { name: 'Washed Ash', hex: '#374151' }
    ],
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 39,
    fabricDetails: '13.5oz 100% Open-End Cotton Denim.',
    fit: 'Ultra-wide loose cut through leg with extra inseam length.'
  },
  // 17. Streetwear Tech Bomber Jacket
  {
    id: 'tc-st-005',
    name: 'Orbit Padded MA-1 Flight Jacket',
    category: 'Jackets',
    mainCategory: 'Streetwear',
    description: 'Futuristic cropped MA-1 bomber crafted in metallic flight nylon with high-loft thermal insulation and emergency orange inner lining.',
    price: 7950,
    originalPrice: 9800,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Cyber Blue Sheen', hex: '#1E3A8A' },
      { name: 'Stealth Black', hex: '#000000' }
    ],
    isTrending: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 52,
    fabricDetails: 'Water-repellent Flight Nylon shell with 120g recycled poly insulation.',
    fit: 'Cropped waist with exaggerated rounded sleeves.'
  },
  // 18. Streetwear Graphic Crewneck Sweatshirt
  {
    id: 'tc-st-006',
    name: 'Neo-Tokyo Distortion Crewneck',
    category: 'Hoodies & Sweatshirts',
    mainCategory: 'Streetwear',
    description: 'Premium brushed fleece crewneck sporting subtle high-density typographic embroidery on the chest and split side seams.',
    price: 3850,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Neon Purple Orchid', hex: '#8B5CF6' },
      { name: 'Off-White Ivory', hex: '#F3F4F6' },
      { name: 'Washed Black', hex: '#1F2937' }
    ],
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 28,
    fabricDetails: '400GSM Organic Cotton Fleece with ultra-soft carbon brushed interior.',
    fit: 'Slightly cropped body with dropped armholes.'
  },
  // 19. Accessories - Crossbody Messenger
  {
    id: 'tc-acc-001',
    name: 'Prism Waterproof Sling Bag',
    category: 'Accessories',
    mainCategory: 'Accessories',
    description: 'Weatherproof technical sling featuring Fidlock magnetic quick-release buckle, waterproof aquaguard zippers, and padded tech sleeve.',
    price: 3200,
    originalPrice: 3900,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M'],
    colors: [
      { name: 'Matte Obsidian', hex: '#111827' },
      { name: 'Electric Blue Trim', hex: '#315CFF' }
    ],
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 44,
    fabricDetails: 'Cordura 500D Nylon ballistic fabric.',
    fit: 'Adjustable ergonomic cross-body strap.'
  },
  // 20. Accessories - Structured Canvas Tote
  {
    id: 'tc-acc-002',
    name: 'Atelier Heavyweight Structured Tote',
    category: 'Accessories',
    mainCategory: 'Accessories',
    description: 'Durable 20oz raw duck canvas shopper with genuine leather reinforced handles, brass interior key leash, and dedicated laptop slot.',
    price: 2600,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['L'],
    colors: [
      { name: 'Natural Ecru', hex: '#F5F5F0' },
      { name: 'Midnight Black', hex: '#0B0B12' }
    ],
    isTrending: true,
    rating: 4.8,
    reviewCount: 35,
    fabricDetails: '100% Unbleached Heavy Cotton Duck Canvas with full-grain leather trims.',
    fit: 'Spacious 24-liter carryall capacity.'
  },
  // 21. Accessories - Distressed Dad Cap
  {
    id: 'tc-acc-003',
    name: 'Vintage Washed TC Crest Cap',
    category: 'Accessories',
    mainCategory: 'Accessories',
    description: 'Unstructured low-profile 6-panel dad cap with subtle distressed brim wear and tonal high-density embroidered monogram.',
    price: 1350,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M'],
    colors: [
      { name: 'Washed Charcoal', hex: '#374151' },
      { name: 'Faded Navy', hex: '#1E3A8A' },
      { name: 'Vintage Olive', hex: '#4B5563' }
    ],
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 88,
    fabricDetails: '100% Chino Cotton Twill with antique brass slider strap.',
    fit: 'Adjustable one-size strap with tuck-in slot.'
  },
  // 22. Accessories - Futuristic Shield Sunglasses
  {
    id: 'tc-acc-004',
    name: 'Eclipse Y2K Polarized Shield Sunglasses',
    category: 'Accessories',
    mainCategory: 'Accessories',
    description: 'Futuristic wraparound rimless sunglasses with UV400 iridescent mirrored polarized lenses and ultra-lightweight titanium hinges.',
    price: 2900,
    originalPrice: 3800,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M'],
    colors: [
      { name: 'Silver Mirror Chrome', hex: '#E2E8F0' },
      { name: 'Cyber Violet Flash', hex: '#8B5CF6' },
      { name: 'Smoked Jet', hex: '#18181B' }
    ],
    isNewArrival: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 31,
    fabricDetails: 'Polycarbonate shatterproof lens, grade-5 titanium temple arms.',
    fit: 'Ergonomic face-contoured aerodynamic wrap.'
  },
  // 23. Women's Minimal Knit Crop Cardigan
  {
    id: 'tc-w-007',
    name: 'Cloud Soft Ribbed Crop Cardigan',
    category: 'Tops',
    mainCategory: 'Women',
    description: 'Feather-light brushed mohair-blend cropped cardigan with horn buttons and extra-long slouchy sleeves.',
    price: 3950,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Lilac Cloud', hex: '#DDD6FE' },
      { name: 'Vanilla Butter', hex: '#FEF3C7' },
      { name: 'Midnight Navy', hex: '#111C3A' }
    ],
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 46,
    fabricDetails: '60% Superfine Merino Wool, 25% Mohair, 15% Nylon.',
    fit: 'Cropped waistline with balloon sleeve cuffs.'
  },
  // 24. Women's High-Waisted Flare Trousers
  {
    id: 'tc-w-008',
    name: 'Siren Split-Hem Tailored Flares',
    category: 'Trousers',
    mainCategory: 'Women',
    description: 'Sculpting high-rise flare pants designed with subtle inner ankle splits to drape effortlessly over designer platform shoes.',
    price: 4200,
    originalPrice: 5100,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Noir Black', hex: '#0B0B12' },
      { name: 'Chocolate Ganache', hex: '#3E2723' }
    ],
    isTrending: true,
    rating: 4.7,
    reviewCount: 22,
    fabricDetails: 'Ponte di Roma heavy double knit with 4-way smoothing stretch.',
    fit: 'Fitted through hip and thigh, flared from knee down.'
  },
  // 25. Men's Minimal Essential Linen Trousers
  {
    id: 'tc-m-007',
    name: 'Kyoto Easy Linen Drawstring Trousers',
    category: 'Trousers',
    mainCategory: 'Men',
    description: 'Relaxed pull-on linen trousers with internal cotton twill drawstring, deep slanted pockets, and clean rear welt pockets.',
    price: 3900,
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Raw Sand', hex: '#E7E5E4' },
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'Washed Olive', hex: '#4B5563' }
    ],
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 33,
    fabricDetails: '55% Pure European Linen, 45% Organic Cotton.',
    fit: 'Straight leg cut with relaxed elasticated waistband.'
  },
  // 26. Men's Oversized Graphic Tee
  {
    id: 'tc-m-008',
    name: 'Neo Kinetic Motion Tee',
    category: 'T-Shirts',
    mainCategory: 'Men',
    description: 'Minimalist typography and geometric 3D wireframe artwork screenprinted with eco-friendly soft-hand inks on dense jersey.',
    price: 2250,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Electric Blue', hex: '#315CFF' },
      { name: 'Off-Black', hex: '#18181B' },
      { name: 'Chalk White', hex: '#FAFAFA' }
    ],
    isTrending: true,
    rating: 4.8,
    reviewCount: 51,
    fabricDetails: '100% Single Jersey Cotton 240 GSM.',
    fit: 'Oversized boxy streetwear silhouette.'
  },
  // 27. Streetwear Vintage Leather Racing Jacket
  {
    id: 'tc-st-007',
    name: 'Velocity Distressed Faux-Leather Moto Jacket',
    category: 'Jackets',
    mainCategory: 'Streetwear',
    description: 'Vintage 90s racing silhouette with contrast leather panelling, banded mandarin collar, heavy brass hardware, and embroidered patches.',
    price: 8900,
    originalPrice: 10500,
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Racer White & Black', hex: '#18181B' },
      { name: 'Vintage Oxblood', hex: '#450A0A' }
    ],
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 68,
    fabricDetails: 'Heavyweight vegan PU leather with hand-distressed vintage patina finish.',
    fit: 'Structured boxy racer cut.'
  },
  // 28. Streetwear Graphic Thermal Long-Sleeve
  {
    id: 'tc-st-008',
    name: 'Glitch Waffle Thermal Long-Sleeve',
    category: 'T-Shirts',
    mainCategory: 'Streetwear',
    description: 'Distressed waffle knit thermal tee with exposed contrast flatlock stitching, raw edges, and arm typography prints.',
    price: 2950,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Ash Grey', hex: '#4B5563' },
      { name: 'Bleached Bone', hex: '#E7E5E4' }
    ],
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 19,
    fabricDetails: '100% Cotton heavy waffle thermal weave.',
    fit: 'Slightly elongated layered fit.'
  },
  // 29. Women's Trench Coat
  {
    id: 'tc-w-009',
    name: 'Sovereign Storm-Flap Draped Trench',
    category: 'Jackets',
    mainCategory: 'Women',
    description: 'Contemporary oversized trench coat featuring exaggerated storm flaps, tortoiseshell resin buckles, and water-repellent cotton twill.',
    price: 8400,
    originalPrice: 9900,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Classic Camel', hex: '#C29B38' },
      { name: 'Onyx Black', hex: '#000000' }
    ],
    isTrending: true,
    rating: 4.9,
    reviewCount: 41,
    fabricDetails: 'Heavyweight weather-resistant bonded cotton gabardine.',
    fit: 'Oversized maxi length with self-fabric waist tie.'
  },
  // 30. Men's Utility Overshirt
  {
    id: 'tc-m-009',
    name: 'Tactile Heavy Twill Chore Overshirt',
    category: 'Shirts',
    mainCategory: 'Men',
    description: 'Workwear-inspired overshirt with dual reinforced chest patch pockets, hidden pen slot, and reinforced elbow patches.',
    price: 4100,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Forest Spruce', hex: '#1C3F3A' },
      { name: 'Khaki Stone', hex: '#A8A29E' },
      { name: 'Washed Black', hex: '#27272A' }
    ],
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 36,
    fabricDetails: '100% Compact Cotton Herringbone Twill 320 GSM.',
    fit: 'Layering regular fit meant to be worn over tees.'
  },
  // 31. Accessories - Minimalist Leather Belt
  {
    id: 'tc-acc-005',
    name: 'Monolith Brushed Metal Buckle Belt',
    category: 'Accessories',
    mainCategory: 'Accessories',
    description: 'Clean vegetable-tanned Italian bridle leather belt with custom geometric brushed nickel buckle and bevelled painted edges.',
    price: 1850,
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Saddle Tan', hex: '#78350F' },
      { name: 'Pitch Black', hex: '#000000' }
    ],
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 55,
    fabricDetails: '100% Full-grain vegetable tanned Italian leather, 35mm width.',
    fit: 'Standard unisex belt sizing.'
  },
  // 32. Accessories - Retro Street Sneakers
  {
    id: 'tc-acc-006',
    name: 'Kinetic 01 Chunky Retro Low Runners',
    category: 'Accessories',
    mainCategory: 'Accessories',
    description: 'Chunky 90s silhouette runner constructed from paneled mesh, hairy suede, and high-rebound sculpted EVA midsole cushions.',
    price: 7600,
    originalPrice: 8900,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Silver & Electric Blue', hex: '#315CFF' },
      { name: 'Triple Phantom Black', hex: '#0B0B12' }
    ],
    isTrending: true,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 48,
    fabricDetails: 'Suede leather overlays, breathable ballistic mesh, Vibram-style rubber lug outsole.',
    fit: 'True to size with ergonomic arch support.'
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'women',
    title: "Women's Collection",
    subtitle: 'Sculpted Silhouettes & Modern Drapes',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    itemCount: '120+ Styles',
    targetCategory: 'Women'
  },
  {
    id: 'men',
    title: "Men's Collection",
    subtitle: 'Clean Essentials & Structured Tailoring',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    itemCount: '95+ Styles',
    targetCategory: 'Men'
  },
  {
    id: 'streetwear',
    title: 'Streetwear & Drops',
    subtitle: 'Oversized Fits, Heavyweight Fleeces & Parachute Cargos',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=80',
    itemCount: '80+ Limited Drops',
    targetCategory: 'Streetwear'
  },
  {
    id: 'accessories',
    title: 'Accessories & Kicks',
    subtitle: 'Tactical Slings, Chunky Runners & Cyber Shades',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    itemCount: '60+ Objects',
    targetCategory: 'Accessories'
  }
];

export const CAMPAIGN_EDITORIAL = {
  headline: 'THE EVERYDAY EDIT',
  subheading: 'Versatile essentials. Effortless outfits. Your signature style.',
  description: 'Designed in our contemporary studio for the fluid rhythm of metropolitan living. Tailored from premium natural fibers with a bold architectural silhouette that balances futuristic aesthetics with timeless comfort.',
  image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85',
  buttonText: 'EXPLORE THE COLLECTION'
};

export const PROMO_BANNER = {
  headline: 'FIND YOUR NEXT FAVORITE FIT',
  subheading: 'Fresh styles for everyday confidence.',
  description: 'Join over 40,000+ tastemakers across the globe. Use promo code TRENDY20 at checkout for an instant 20% privilege off your premier order.',
  image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85',
  buttonText: 'SHOP THE COLLECTION'
};

export const HERO_EDITORIAL_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85';
