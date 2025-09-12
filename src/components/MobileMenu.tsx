import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  popular?: boolean;
}

interface MobileMenuProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const menuItems: MenuItem[] = [
  // Appetizers
  { id: 1, name: "Truffle Arancini", price: 18, description: "Crispy risotto balls with truffle oil", image: "🍚", category: "appetizers", popular: true },
  { id: 2, name: "Tuna Tartare", price: 22, description: "Fresh tuna with avocado and citrus", image: "🍣", category: "appetizers" },
  { id: 3, name: "Burrata Caprese", price: 16, description: "Creamy burrata with heirloom tomatoes", image: "🧀", category: "appetizers" },
  
  // Main Courses
  { id: 4, name: "Wagyu Ribeye", price: 65, description: "Premium wagyu with roasted vegetables", image: "🥩", category: "mains", popular: true },
  { id: 5, name: "Lobster Thermidor", price: 48, description: "Classic French lobster preparation", image: "🦞", category: "mains" },
  { id: 6, name: "Duck Confit", price: 38, description: "Slow-cooked duck leg with cherry sauce", image: "🦆", category: "mains" },
  
  // Desserts
  { id: 7, name: "Chocolate Soufflé", price: 14, description: "Dark chocolate with vanilla ice cream", image: "🍫", category: "desserts", popular: true },
  { id: 8, name: "Tiramisu", price: 12, description: "Classic Italian coffee-flavored dessert", image: "🍰", category: "desserts" },
];

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'mains', name: 'Mains', icon: '🍖' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

const MobileMenu = ({ onAddToCart }: MobileMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { toast } = useToast();

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const addToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    onAddToCart(item, quantity);
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} added to your order`,
    });
  };

  return (
    <div className="pb-20">
      {/* Category Tabs */}
      <div className="sticky top-16 bg-background/95 backdrop-blur z-40 border-b">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 space-x-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4 space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-base leading-tight">{item.name}</h3>
                    {item.popular && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${item.price}</span>
                    <div className="flex items-center space-x-2">
                      {quantities[item.id] > 0 && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {quantities[item.id]}
                          </span>
                        </>
                      )}
                      <Button
                        size="sm"
                        onClick={() => quantities[item.id] > 0 ? addToCart(item) : updateQuantity(item.id, 1)}
                        className="h-8"
                      >
                        {quantities[item.id] > 0 ? (
                          "Add to Cart"
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20 m-4 bg-muted rounded-lg flex items-center justify-center text-2xl">
                  {item.image}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;