import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, Grid3X3, List, Search, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-marketplace.jpg";
import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";

// Import product images
import leatherJacketImg from "@/assets/products/leather-jacket.jpg";
import iphoneImg from "@/assets/products/iphone-12-pro.jpg";
import coffeeTableImg from "@/assets/products/coffee-table.jpg";
import harryPotterImg from "@/assets/products/harry-potter-books.jpg";
import nikeSneakersImg from "@/assets/products/nike-sneakers.jpg";
import macbookImg from "@/assets/products/macbook-air.jpg";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Mock product data with real images
  const allProducts = [
    {
      id: "1",
      title: "Vintage Leather Jacket - Like New Condition",
      price: 89,
      image: leatherJacketImg,
      category: "Fashion",
      location: "San Francisco, CA",
      condition: "Like New" as const,
      seller: "Sarah M."
    },
    {
      id: "2", 
      title: "iPhone 12 Pro - Unlocked, Excellent Condition",
      price: 450,
      image: iphoneImg, 
      category: "Electronics",
      location: "Los Angeles, CA",
      condition: "Good" as const,
      seller: "Mike R."
    },
    {
      id: "3",
      title: "Mid-Century Modern Coffee Table",
      price: 125,
      image: coffeeTableImg,
      category: "Home & Garden", 
      location: "Portland, OR",
      condition: "Good" as const,
      seller: "Jenny K."
    },
    {
      id: "4",
      title: "Harry Potter Book Collection - Complete Set",
      price: 35,
      image: harryPotterImg,
      category: "Books",
      location: "Austin, TX", 
      condition: "Like New" as const,
      seller: "David L."
    },
    {
      id: "5",
      title: "Nike Air Max Sneakers - Size 10",
      price: 65,
      image: nikeSneakersImg,
      category: "Fashion",
      location: "Miami, FL",
      condition: "Good" as const,
      seller: "Alex P."
    },
    {
      id: "6",
      title: "Macbook Air M1 - Perfect for Students",
      price: 750,
      image: macbookImg,
      category: "Electronics", 
      location: "Seattle, WA",
      condition: "Like New" as const,
      seller: "Lisa T."
    }
  ];

  const {
    filters,
    filteredProducts,
    updateFilter,
    clearFilters,
    resultCount
  } = useSearch({ products: allProducts });

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Home & Garden", value: "home-garden" },
    { label: "Books", value: "books" },
    { label: "Sports & Outdoors", value: "sports-outdoors" },
    { label: "Toys & Games", value: "toys-games" }
  ];

  const conditions = [
    { label: "Like New", value: "like-new" },
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        searchQuery={filters.query}
        onSearchChange={(query) => updateFilter('query', query)}
      />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Sustainable marketplace hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">
                Find Your Next
                <span className="text-eco-accent"> Sustainable </span>
                Treasure
              </h1>
              <p className="text-xl mb-6 opacity-90">
                Shop second-hand, reduce waste, and discover unique finds from your community.
                Every purchase makes a positive impact on our planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-eco-primary hover:bg-eco-primary-light">
                  Start Shopping
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Sell Your Items
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="border-b border-eco-secondary/50 bg-eco-sage/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.value}
                  variant={filters.category === category.value ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    filters.category === category.value
                      ? 'bg-eco-primary text-white'
                      : 'hover:bg-eco-sage/30'
                  }`}
                  onClick={() => updateFilter('category', category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select 
                  value={filters.sortBy} 
                  onValueChange={(value) => updateFilter('sortBy', value)}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-background rounded-lg border border-eco-secondary/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter('priceRange', value)}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>

                {/* Condition */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Condition</label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div key={condition.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition.value}
                          checked={filters.condition.includes(condition.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFilter('condition', [...filters.condition, condition.value]);
                            } else {
                              updateFilter('condition', filters.condition.filter(c => c !== condition.value));
                            }
                          }}
                        />
                        <label htmlFor={condition.value} className="text-sm">
                          {condition.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {filters.query ? `Search results for "${filters.query}"` : 'Latest Finds'} ({resultCount} items)
            </h2>
          </div>

          {resultCount === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="border-eco-primary text-eco-primary hover:bg-eco-sage/20">
                  Load More Items
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
