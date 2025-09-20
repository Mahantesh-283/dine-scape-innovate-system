import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Heart, ShoppingCart, Music, Lightbulb, GamepadIcon, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MobileHeader from '@/components/MobileHeader';
import MobileMenu from '@/components/MobileMenu';
import MobileCart from '@/components/MobileCart';
import MobileMusicPlayer from '@/components/MobileMusicPlayer';
import AmbianceControl from '@/components/AmbianceControl';
import Entertainment from '@/components/Entertainment';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  popular?: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (menuItem: MenuItem, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        image: menuItem.image
      }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Add some items to your cart first",
        variant: "destructive",
      });
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: cartItems,
          total: total,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Payment",
          description: "Opening Stripe checkout in new tab...",
        });
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MobileMenu onAddToCart={addToCart} />;
      case 'cart':
        return (
          <MobileCart
            items={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={handleCheckout}
          />
        );
      case 'music':
        return <MobileMusicPlayer />;
      case 'ambiance':
        return <AmbianceControl />;
      case 'entertainment':
        return <Entertainment />;
      case 'favorites':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center px-6">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Favorites</h3>
            <p className="text-muted-foreground">Save your favorite dishes here!</p>
          </div>
        );
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center px-6 space-y-4">
            <User className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p className="text-muted-foreground mb-4">Welcome, {user?.email}</p>
            <Button onClick={handleSignOut} variant="outline" className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        );
      default:
        return <MobileMenu onAddToCart={addToCart} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader cartItems={totalCartItems} />
      
      {/* Main Content */}
      <main className="pt-16">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'menu', icon: Home, label: 'Menu' },
            { id: 'ambiance', icon: Lightbulb, label: 'Ambiance' },
            { id: 'entertainment', icon: GamepadIcon, label: 'Fun' },
            { id: 'cart', icon: ShoppingCart, label: 'Cart' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 h-auto p-2 relative ${
                  activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{tab.label}</span>
                {tab.id === 'cart' && totalCartItems > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                    {totalCartItems}
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Index;
