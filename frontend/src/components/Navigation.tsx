import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Plus, Heart, Leaf } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/hooks/useFavorites";

interface NavigationProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Navigation = ({ searchQuery = "", onSearchChange }: NavigationProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { favoriteCount } = useFavorites();

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value);
    onSearchChange?.(value);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-eco-primary to-eco-accent">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-eco-primary">EcoFinds</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search sustainable finds..."
                value={localSearchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-eco-sage/30 border-eco-secondary focus:ring-eco-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="h-5 w-5 mr-2" />
              Favorites
              {favoriteCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-eco-accent text-xs">
                  {favoriteCount}
                </Badge>
              )}
            </Button>
            
            <Link to="/add-product">
              <Button variant="ghost" size="sm">
                <Plus className="h-5 w-5 mr-2" />
                Sell Item
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-eco-accent text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5 mr-2" />
                    {user?.firstName}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-eco-primary to-eco-primary-light">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;