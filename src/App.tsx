/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { ProductCarousel } from './components/ProductCarousel';
import { CampaignBanner } from './components/CampaignBanner';
import { PromoBanner } from './components/PromoBanner';
import { CustomerBenefits } from './components/CustomerBenefits';
import { NewsletterForm } from './components/NewsletterForm';
import { Footer } from './components/Footer';
import { ShopCatalog } from './components/ShopCatalog';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { PRODUCTS } from './data/products';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    selectedProduct,
    setSelectedProduct,
    toastMessage
  } = useShop();

  // Listen for open-product events from subcomponents
  useEffect(() => {
    const handleOpenProduct = (e: any) => {
      if (e.detail) {
        setSelectedProduct(e.detail);
      }
    };
    window.addEventListener('open-product', handleOpenProduct);
    return () => window.removeEventListener('open-product', handleOpenProduct);
  }, [setSelectedProduct]);

  // Curated datasets for the 15 homepage sections
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 8);
  const womensProducts = PRODUCTS.filter((p) => p.mainCategory === 'Women').slice(0, 6);
  const mensProducts = PRODUCTS.filter((p) => p.mainCategory === 'Men').slice(0, 6);
  const streetwearProducts = PRODUCTS.filter((p) => p.mainCategory === 'Streetwear').slice(0, 6);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F7F7FB] text-[#171923] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0B0B12] text-white text-xs font-semibold shadow-2xl border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: Announcement Bar */}
      <AnnouncementBar />

      {/* SECTION 2: Navigation Bar */}
      <Navbar />

      {/* Primary Page Content Router */}
      {currentView === 'home' ? (
        <main className="flex-1">
          {/* SECTION 3: 3D Animated Hero ("WEAR YOUR FUTURE.") */}
          <Hero3D />

          {/* SECTION 4: Shop By Category (4 Large Photographic Cards) */}
          <CategorySection />

          {/* SECTION 5: Trending Now (At least 8 product cards with real photos & BDT prices) */}
          <ProductGrid
            id="trending-section"
            title="TRENDING NOW"
            subtitle="The definitive season highlights. Sculptural lines, breathable drape, and everyday confidence."
            badge="HOT CURATIONS"
            products={trendingProducts}
            targetCategory="All"
            columns={4}
          />

          {/* SECTION 6: Women's Collection (At least 6 visually distinct products: dresses, co-ords, tops) */}
          <ProductGrid
            id="womens-collection"
            title="WOMEN'S EDIT"
            subtitle="Sculpted silhouettes, fluid silk slips, and architectural evening wear designed for contemporary motion."
            badge="ELEVATED WARDROBE"
            products={womensProducts}
            targetCategory="Women"
            columns={3}
          />

          {/* SECTION 7: Men's Collection (At least 6 distinct products: boxy tees, linen shirts, denim truckers, trousers) */}
          <ProductGrid
            id="mens-collection"
            title="MEN'S ESSENTIALS"
            subtitle="Heavyweight combed cottons, camp collar resort shirts, and double-pleated tailored trousers."
            badge="MODERN TAILORING"
            products={mensProducts}
            targetCategory="Men"
            columns={3}
          />

          {/* SECTION 8: Streetwear Collection (At least 6 products: acid tees, zip hoodies, parachute cargos, skate denim) */}
          <ProductGrid
            id="streetwear-collection"
            title="STREETWEAR &amp; DROPS"
            subtitle="Heavyweight 450GSM loopback fleeces, tactical ripstop cargo trousers, and distressed racing outerwear."
            badge="GEN-Z VANGUARD"
            products={streetwearProducts}
            targetCategory="Streetwear"
            columns={3}
          />

          {/* SECTION 9: New Arrivals Carousel (Horizontal carousel with swipe & controls) */}
          <ProductCarousel
            title="NEW ARRIVALS / DROP 04"
            subtitle="Swipe through this week's freshly unboxed garments and limited-run tactile objects."
            badge="FRESH SILHOUETTES"
            products={newArrivals}
          />

          {/* SECTION 10: Featured Fashion Campaign ("THE EVERYDAY EDIT") */}
          <CampaignBanner />

          {/* SECTION 11: Best Sellers (Top rated products) */}
          <ProductGrid
            id="bestsellers"
            title="BEST SELLERS"
            subtitle="The iconic silhouettes and staples continually favored by our tastemaker community."
            badge="COMMUNITY FAVORITES"
            products={bestSellers}
            targetCategory="All"
            columns={4}
            showViewAll={true}
          />

          {/* SECTION 12: Promotional Banner ("FIND YOUR NEXT FAVORITE FIT") */}
          <PromoBanner />

          {/* SECTION 13: Customer Benefits (4 clean cards) */}
          <CustomerBenefits />

          {/* SECTION 14: Newsletter ("STAY IN THE LOOP") */}
          <NewsletterForm />
        </main>
      ) : (
        /* Full Shop Catalog View with Filters, Search, and Sorting */
        <main className="flex-1">
          <ShopCatalog />
        </main>
      )}

      {/* SECTION 15: Footer */}
      <Footer />

      {/* Interactive Global Drawers & Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <AccountModal />
      <QuickSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
