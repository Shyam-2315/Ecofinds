import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, Share2, MapPin, Clock, Shield, Truck } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";

// Import product images
import leatherJacketImg from "@/assets/products/leather-jacket.jpg";
import iphoneImg from "@/assets/products/iphone-12-pro.jpg";
import coffeeTableImg from "@/assets/products/coffee-table.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data with real images
  const product = {
    id: "1",
    title: "Vintage Leather Jacket - Premium Quality",
    price: 89,
    originalPrice: 250,
    images: [
      leatherJacketImg,
      iphoneImg, 
      coffeeTableImg
    ],
    category: "Fashion",
    condition: "Like New" as const,
    location: "San Francisco, CA",
    seller: {
      name: "Sarah M.",
      rating: 4.8,
      totalSales: 42
    },
    description: "Beautiful vintage leather jacket in excellent condition. Barely worn, stored in smoke-free home. Perfect for sustainable fashion lovers looking for quality pieces. This jacket has a timeless design that never goes out of style.",
    features: [
      "100% Genuine Leather",
      "Size: Medium (fits like modern M/L)", 
      "No stains or damage",
      "All zippers working perfectly",
      "Includes original care instructions"
    ],
    postedDate: "2 days ago",
    views: 23
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-eco-primary hover:text-eco-primary-light">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-eco-secondary/50">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square w-20 overflow-hidden rounded-md border-2 ${
                      selectedImage === index ? 'border-eco-primary' : 'border-eco-secondary/50'
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-eco-accent text-white">
                  {product.condition}
                </Badge>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center text-muted-foreground text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {product.location} • Posted {product.postedDate}
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-eco-primary">
                  ${product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge variant="outline" className="text-eco-primary border-eco-primary">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off retail
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-eco-primary to-eco-primary-light hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-lg py-6">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full border-eco-primary text-eco-primary hover:bg-eco-sage/20">
                Message Seller
              </Button>
            </div>

            {/* Seller Info */}
            <Card className="border-eco-secondary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Seller Information</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.seller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ⭐ {product.seller.rating} • {product.seller.totalSales} sales
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Info */}
            <Card className="border-eco-accent/50 bg-eco-sage/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-eco-accent flex items-center justify-center">
                    <Shield className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="font-semibold text-eco-primary">Sustainable Choice</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  By buying second-hand, you're preventing waste and reducing environmental impact. 
                  This item saves approximately 15kg of CO2 compared to buying new.
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              
              <h4 className="font-medium mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Shipping & Returns */}
            <Card className="border-eco-secondary/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-eco-primary" />
                  <span className="text-sm">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-eco-primary" />
                  <span className="text-sm">7-day return policy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;