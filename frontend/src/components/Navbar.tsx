import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ShoppingCart,
  User,
  Plus,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onSearch: () => void;
}

const categories = [
  "All Categories",
  "Electronics",
  "Clothing",
  "Books",
  "Furniture",
  "Sports",
  "Home & Garden",
  "Toys",
  "Other",
];

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSearch,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-[var(--shadow-card)]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-eco-green to-eco-light rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-foreground">EcoFinds</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for sustainable treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSearch()}
                className="pl-10"
                aria-label="Search products"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" aria-label="Select category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="eco" onClick={onSearch} aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/add-product">
                    <Plus className="h-4 w-4 mr-1" />
                    Sell
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/cart">
                    <ShoppingCart className="h-4 w-4" />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="User menu">
                      <User className="h-4 w-4 mr-1" />
                      {user.username || user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-background border border-border"
                  >
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-listings">My Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/purchases">Purchase History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="eco" size="sm" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
