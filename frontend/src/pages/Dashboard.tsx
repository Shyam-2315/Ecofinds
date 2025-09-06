import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Plus, Settings, Star, Package, ShoppingBag, Eye, Edit, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

// Import images
import sarahAvatar from "@/assets/avatars/sarah-avatar.jpg";
import leatherJacketImg from "@/assets/products/leather-jacket.jpg";
import iphoneImg from "@/assets/products/iphone-12-pro.jpg";
import coffeeTableImg from "@/assets/products/coffee-table.jpg";
import cameraLensImg from "@/assets/products/camera-lens.jpg";
import cottonDressImg from "@/assets/products/cotton-dress.jpg";

const Dashboard = () => {
  // Mock user data with real images
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: sarahAvatar,
    joinDate: "March 2024",
    rating: 4.8,
    totalSales: 24,
    totalPurchases: 18
  };

  const myListings = [
    {
      id: "1",
      title: "Vintage Leather Jacket",
      price: 89,
      image: leatherJacketImg,
      status: "active",
      views: 23,
      likes: 5,
      category: "Fashion"
    },
    {
      id: "2", 
      title: "iPhone 12 Pro - Excellent Condition",
      price: 450,
      image: iphoneImg,
      status: "sold",
      views: 67,
      likes: 12,
      category: "Electronics"
    },
    {
      id: "3",
      title: "Coffee Table - Mid Century Modern", 
      price: 125,
      image: coffeeTableImg,
      status: "pending",
      views: 15,
      likes: 3,
      category: "Home & Garden"
    }
  ];

  const purchases = [
    {
      id: "p1",
      title: "Vintage Camera Lens",
      price: 65,
      image: cameraLensImg,
      purchaseDate: "2024-01-15",
      seller: "Mike R.",
      status: "delivered"
    },
    {
      id: "p2",
      title: "Organic Cotton Dress",
      price: 32,
      image: cottonDressImg, 
      purchaseDate: "2024-01-10",
      seller: "Emma L.",
      status: "delivered"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-eco-accent text-white";
      case "sold": return "bg-eco-primary text-white";
      case "pending": return "bg-eco-earth text-white";
      case "delivered": return "bg-eco-primary text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-eco-secondary/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-eco-primary text-white text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
                  <p className="text-muted-foreground mb-3">{user.email}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{user.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-eco-primary" />
                      <span>{user.totalSales} items sold</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-eco-accent" />
                      <span>{user.totalPurchases} purchases</span>
                    </div>
                    <span className="text-muted-foreground">Member since {user.joinDate}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="border-eco-primary text-eco-primary">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Listings ({myListings.length})</h2>
              <Link to="/add-product">
                <Button className="bg-gradient-to-r from-eco-primary to-eco-primary-light">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {myListings.map((item) => (
                <Card key={item.id} className="border-eco-secondary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {item.views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {item.likes} likes
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-eco-primary mb-2">${item.price}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Purchase History Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <h2 className="text-xl font-semibold">Purchase History ({purchases.length})</h2>
            
            <div className="grid gap-4">
              {purchases.map((item) => (
                <Card key={item.id} className="border-eco-secondary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Sold by {item.seller} • {new Date(item.purchaseDate).toLocaleDateString()}
                        </p>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-eco-primary mb-2">${item.price}</p>
                        <Button variant="outline" size="sm">
                          View Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <h2 className="text-xl font-semibold">Your Favorites</h2>
            <Card className="border-eco-secondary/50">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No favorites yet. Start browsing to add items to your favorites!</p>
                <Link to="/">
                  <Button className="mt-4 bg-gradient-to-r from-eco-primary to-eco-primary-light">
                    Browse Items
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;