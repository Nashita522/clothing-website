export type ProductCategory = 
  | "All"
  | "Women's Clothing"
  | "Men's Clothing"
  | "Dresses"
  | "Tops"
  | "T-Shirts"
  | "Shirts"
  | "Hoodies & Sweatshirts"
  | "Jeans"
  | "Trousers"
  | "Jackets"
  | "Streetwear"
  | "Accessories";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  mainCategory: 'Women' | 'Men' | 'Streetwear' | 'Accessories';
  description: string;
  price: number; // in BDT (৳)
  originalPrice?: number; // for sale badge
  images: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: ColorOption[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewCount: number;
  fabricDetails: string;
  fit: string;
}

export interface CartItem {
  id: string; // unique cart entry id (productId + size + color)
  product: Product;
  size: string;
  color: ColorOption;
  quantity: number;
}

export interface OrderItem {
  productName: string;
  size: string;
  colorName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
}

export interface FilterOptions {
  category: string;
  mainCategory: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';
  onSaleOnly: boolean;
}
