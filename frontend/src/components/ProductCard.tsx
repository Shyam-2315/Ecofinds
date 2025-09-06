import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
  condition: "Like New" | "Good" | "Fair";
  seller: string;
  liked?: boolean;
}

const ProductCard = ({ 
  id, 
  title, 
  price, 
  image, 
  category, 
  location, 
  condition, 
  seller, 
}: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const conditionColors = {
    "Like New": "bg-eco-accent text-white",
    "Good": "bg-eco-secondary text-eco-primary", 
    "Fair": "bg-eco-earth text-white"
  };

  const handleAddToCart = async () => {
    if (isInCart(id)) {
      toast.info('Item already in cart');
      return;
    }

    setIsLoading(true);
    try {
      addItem({
        id,
        title,
        price,
        image,
        seller,
        location,
        shipping: price > 50 ? 0 : 5 // Free shipping over $50
      });
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-eco)] hover:-translate-y-1 border-eco-secondary/50">
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 h-8 w-8 rounded-full p-0 ${
            isFavorite(id) ? 'bg-red-100 text-red-500' : 'bg-white/80 text-gray-600'
          }`}
          onClick={() => toggleFavorite(id)}
        >
          <Heart className={`h-4 w-4 ${isFavorite(id) ? 'fill-current' : ''}`} />
        </Button>
        <Badge className={`absolute top-2 left-2 ${conditionColors[condition]}`}>
          {condition}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs text-eco-primary border-eco-primary">
            {category}
          </Badge>
        </div>
        
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 hover:text-eco-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          {location} • by {seller}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-eco-primary">
            ${price}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className={`w-full transition-all duration-300 ${
            isInCart(id) 
              ? 'bg-eco-secondary text-eco-primary hover:bg-eco-secondary/80' 
              : 'bg-gradient-to-r from-eco-primary to-eco-primary-light hover:shadow-[var(--shadow-glow)]'
          }`}
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : isInCart(id) ? 'In Cart' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;