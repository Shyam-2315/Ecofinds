// MongoDB ObjectId type
export type ObjectId = string;

// User types
export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  location?: string;
  rating: number;
  totalSales: number;
  totalPurchases: number;
  joinDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends Omit<User, '_id'> {
  id: string;
}

// Product types
export interface Product {
  _id: ObjectId;
  title: string;
  description: string;
  category: string;
  condition: 'like-new' | 'good' | 'fair';
  price: number;
  originalPrice?: number;
  images: string[];
  location: string;
  seller: ObjectId | User;
  status: 'active' | 'sold' | 'pending' | 'inactive';
  views: number;
  likes: ObjectId[];
  features: string[];
  shipping: {
    cost: number;
    freeShippingThreshold?: number;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCard {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
  condition: 'Like New' | 'Good' | 'Fair';
  seller: string;
  liked?: boolean;
}

// Cart types
export interface CartItem {
  _id: ObjectId;
  product: ObjectId | Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  _id: ObjectId;
  user: ObjectId | User;
  items: CartItem[];
  total: number;
  updatedAt: Date;
}

// Purchase types
export interface PurchaseItem {
  product: ObjectId | Product;
  quantity: number;
  price: number; // Price at time of purchase
}

export interface Purchase {
  _id: ObjectId;
  buyer: ObjectId | User;
  items: PurchaseItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

// Search and Filter types
export interface ProductFilters {
  category?: string;
  condition?: string[];
  priceMin?: number;
  priceMax?: number;
  location?: string;
  search?: string;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'distance' | 'popularity';
}

export interface SearchParams extends ProductFilters {
  page?: number;
  limit?: number;
}

// Category types
export interface Category {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  isActive: boolean;
}