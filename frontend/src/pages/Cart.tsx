import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Minus, Plus, X, ShoppingBag, Truck, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, total } = useCart();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalShipping = items.reduce((sum, item) => sum + item.shipping, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-eco-primary hover:text-eco-primary-light">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-eco-primary" />
              <h1 className="text-2xl font-bold">Shopping Cart ({items.length} items)</h1>
            </div>

            {items.length === 0 ? (
              <Card className="border-eco-secondary/50">
                <CardContent className="p-8 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover amazing second-hand finds and add them to your cart
                  </p>
                  <Link to="/">
                    <Button className="bg-gradient-to-r from-eco-primary to-eco-primary-light">
                      Start Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="border-eco-secondary/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Link to={`/product/${item.id}`}>
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="h-24 w-24 rounded-lg object-cover hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        
                        <div className="flex-1">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-semibold text-foreground hover:text-eco-primary transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">
                            Sold by {item.seller} • {item.location}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-md">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <p className="text-lg font-bold text-eco-primary min-w-[60px] text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-eco-secondary/50 sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${totalShipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-eco-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-eco-primary to-eco-primary-light hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-lg py-6"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;