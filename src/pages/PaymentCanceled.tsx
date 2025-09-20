import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Home, ShoppingCart } from 'lucide-react';

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl text-red-800 dark:text-red-200">
              Payment Canceled
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Your payment was canceled. No charges have been made to your account.
              </p>
              <p className="text-sm text-muted-foreground">
                Your items are still in your cart and ready for checkout whenever you're ready.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')} 
                className="w-full"
                size="lg"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to App
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/');
                  // You could add logic here to switch to the cart tab
                }}
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Need help with checkout?{' '}
                <a href="mailto:support@smartenvironment.com" className="text-primary hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCanceled;