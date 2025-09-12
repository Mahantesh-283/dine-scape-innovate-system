import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface MobileCartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
}

const MobileCart = ({ items, onRemoveItem, onUpdateQuantity, onCheckout }: MobileCartProps) => {
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center px-6">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground">Add some delicious items to get started!</p>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your Order</h2>
          <Badge variant="secondary">{totalItems} items</Badge>
        </div>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-lg">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-8 p-0 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$3.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(totalAmount + 3.99 + totalAmount * 0.1).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
        <Button 
          onClick={onCheckout} 
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          Proceed to Checkout • ${(totalAmount + 3.99 + totalAmount * 0.1).toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default MobileCart;