// API configuration for MongoDB backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  
  // User endpoints
  profile: '/users/profile',
  updateProfile: '/users/profile',
  
  // Product endpoints
  products: '/products',
  productById: (id: string) => `/products/${id}`,
  myListings: '/products/my-listings',
  
  // Cart endpoints
  cart: '/cart',
  addToCart: '/cart/add',
  removeFromCart: '/cart/remove',
  updateCartItem: '/cart/update',
  
  // Purchase endpoints
  purchases: '/purchases',
  createPurchase: '/purchases',
  
  // Search endpoints
  search: '/products/search',
  categories: '/categories'
};

// HTTP client setup
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>(
      API_ENDPOINTS.login,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const response = await this.request<{ token: string; user: any }>(
      API_ENDPOINTS.register,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  }

  async logout() {
    localStorage.removeItem('token');
    return this.request(API_ENDPOINTS.logout, { method: 'POST' });
  }

  // Product methods
  async getProducts(params?: {
    category?: string;
    search?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `${API_ENDPOINTS.products}?${queryParams.toString()}`;
    return this.request<{ products: any[]; total: number; page: number }>(endpoint);
  }

  async getProductById(id: string) {
    return this.request<any>(API_ENDPOINTS.productById(id));
  }

  async createProduct(productData: {
    title: string;
    description: string;
    category: string;
    condition: string;
    price: number;
    location: string;
    images: string[];
  }) {
    return this.request<any>(API_ENDPOINTS.products, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  // Cart methods
  async getCart() {
    return this.request<{ items: any[]; total: number }>(API_ENDPOINTS.cart);
  }

  async addToCart(productId: string, quantity: number = 1) {
    return this.request<any>(API_ENDPOINTS.addToCart, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(productId: string) {
    return this.request<any>(API_ENDPOINTS.removeFromCart, {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
    });
  }

  async updateCartItem(productId: string, quantity: number) {
    return this.request<any>(API_ENDPOINTS.updateCartItem, {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  // Purchase methods
  async getPurchases() {
    return this.request<{ purchases: any[] }>(API_ENDPOINTS.purchases);
  }

  async createPurchase(cartItems: any[]) {
    return this.request<any>(API_ENDPOINTS.createPurchase, {
      method: 'POST',
      body: JSON.stringify({ items: cartItems }),
    });
  }
}

export const apiClient = new ApiClient();