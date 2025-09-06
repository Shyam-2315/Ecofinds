import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Leaf, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-sage via-background to-eco-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/">
          <Button variant="ghost" className="mb-4 text-eco-primary hover:text-eco-primary-light">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to EcoFinds
          </Button>
        </Link>

        {/* Login Card */}
        <Card className="border-eco-secondary/50 shadow-[var(--shadow-card)]">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-eco-primary to-eco-accent">
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-eco-primary">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your EcoFinds account to continue shopping sustainably
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-eco-secondary focus:ring-eco-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-eco-secondary focus:ring-eco-primary"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-eco-primary to-eco-primary-light hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" className="text-eco-primary">
                Forgot your password?
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-eco-primary hover:underline font-medium">
                Sign up for free
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;