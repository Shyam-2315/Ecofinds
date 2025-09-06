import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, Camera, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    location: ""
  });

  const [images, setImages] = useState<string[]>([]);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden", 
    "Books",
    "Sports & Outdoors",
    "Toys & Games",
    "Art & Collectibles",
    "Music & Instruments"
  ];

  const conditions = [
    { value: "like-new", label: "Like New", description: "Barely used, no visible wear" },
    { value: "good", label: "Good", description: "Minor signs of use, fully functional" },
    { value: "fair", label: "Fair", description: "Noticeable wear but works well" }
  ];

  const addImage = () => {
    // In real app, this would open file picker
    setImages([...images, "/placeholder.svg"]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would submit to your backend
    console.log("Product submitted:", { ...formData, images });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-6 text-eco-primary hover:text-eco-primary-light">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="border-eco-secondary/50">
          <CardHeader>
            <CardTitle className="text-2xl text-eco-primary">List Your Item</CardTitle>
            <p className="text-muted-foreground">
              Give your item a new life and help create a more sustainable future
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Images */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Product Photos</Label>
                <p className="text-sm text-muted-foreground">
                  Add up to 5 photos. The first photo will be your main image.
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img 
                        src={image} 
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover rounded-lg border border-eco-secondary/50"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-1 left-1 bg-eco-primary text-white text-xs">
                          Main
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="aspect-square border-dashed border-eco-secondary hover:bg-eco-sage/20"
                      onClick={addImage}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="h-6 w-6 text-eco-primary" />
                        <span className="text-xs">Add Photo</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>

              {/* Product Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Vintage Leather Jacket - Size Medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="border-eco-secondary focus:ring-eco-primary"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Be descriptive and include key details like brand, size, or model
                </p>
              </div>

              {/* Category & Condition */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="border-eco-secondary">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                    <SelectTrigger className="border-eco-secondary">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          <div>
                            <div className="font-medium">{condition.label}</div>
                            <div className="text-sm text-muted-foreground">{condition.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="pl-10 border-eco-secondary focus:ring-eco-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="border-eco-secondary focus:ring-eco-primary"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item's condition, features, and any flaws. Be honest to build trust with buyers."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="min-h-[120px] border-eco-secondary focus:ring-eco-primary"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Mention any defects, wear, or missing parts. Honest descriptions lead to happy buyers!
                </p>
              </div>

              {/* Sustainable Impact Card */}
              <Card className="border-eco-accent/50 bg-eco-sage/10">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-eco-primary mb-2">🌱 Your Sustainable Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    By selling second-hand, you're helping prevent waste and giving items a second life. 
                    Every item sold can save up to 10kg of CO2 compared to manufacturing new products.
                  </p>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-eco-primary to-eco-primary-light hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                >
                  List Item
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-eco-primary text-eco-primary"
                >
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;