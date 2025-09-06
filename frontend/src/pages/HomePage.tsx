import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Recycle, Heart, Star } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  seller_id: string;
  created_at: string;
}

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  
  const api = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock products for demonstration
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      description: 'Classic brown leather jacket in excellent condition. Perfect for eco-conscious fashion lovers.',
      price: 85.00,
      category: 'Clothing',
      image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      seller_id: 'user1',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Sustainable Bamboo Bookshelf',
      description: 'Beautiful handcrafted bamboo bookshelf. Eco-friendly and durable.',
      price: 120.00,
      category: 'Furniture',
      image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      seller_id: 'user2',
      created_at: '2024-01-14T15:30:00Z'
    },
    {
      id: '3',
      title: 'Organic Cotton Throw Pillows',
      description: 'Set of 2 organic cotton throw pillows in earth tones. Perfect for sustainable living.',
      price: 35.00,
      category: 'Home & Garden',
      image_url: 'https://images.unsplash.com/photo-1586076931301-7492feef2d78?w=400',
      seller_id: 'user3',
      created_at: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      title: 'Refurbished iPhone 12',
      description: 'Fully refurbished iPhone 12 in mint condition. Sustainable tech choice.',
      price: 450.00,
      category: 'Electronics',
      image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      seller_id: 'user4',
      created_at: '2024-01-12T14:45:00Z'
    },
    {
      id: '5',
      title: 'Collection of Classic Books',
      description: 'Curated collection of 25 classic literature books. Great for book lovers.',
      price: 60.00,
      category: 'Books',
      image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      seller_id: 'user5',
      created_at: '2024-01-11T11:20:00Z'
    },
    {
      id: '6',
      title: 'Yoga Mat & Props Set',
      description: 'Complete yoga set including mat, blocks, and strap. Gently used.',
      price: 45.00,
      category: 'Sports',
      image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      seller_id: 'user6',
      created_at: '2024-01-10T16:00:00Z'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // For demo purposes, using mock data
      // In real app: const data = await api.get(`/products?limit=${limit}&offset=${offset}&category=${selectedCategory !== 'All Categories' ? selectedCategory : ''}&search=${searchQuery}`);
      
      let filteredProducts = mockProducts;
      
      if (selectedCategory !== 'All Categories') {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
      }
      
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setProducts(filteredProducts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setOffset(0);
    fetchProducts();
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      // In real app: await api.post('/cart/', { product_id: productId });
      toast({
        title: "Added to Cart",
        description: "Product added to your cart successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive"
      });
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={handleSearch}
      />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-eco-green to-eco-light overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-5xl font-bold mb-6">
              Discover Sustainable Treasures
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Join the circular economy. Buy and sell pre-loved items that deserve a second life.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" asChild>
                <span>Start Shopping</span>
              </Button>
              <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-eco-green">
                Sell Your Items
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EcoFinds?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-eco-green to-eco-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-muted-foreground">Reduce waste by giving items a second life</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-eco-green to-eco-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Circular Economy</h3>
              <p className="text-muted-foreground">Support sustainable commerce practices</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-eco-green to-eco-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">Connect with like-minded individuals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>Curated for sustainability</span>
            </div>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>
          )}
          
          {products.length === 0 && !loading && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};