import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    toast({
      title: "Payment Successful! 🎉",
      description: "Your order has been confirmed and processed.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl text-green-800 dark:text-green-200">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Thank you for your purchase! Your payment has been processed successfully.
              </p>
              {sessionId && (
                <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                  Session ID: {sessionId}
                </p>
              )}
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
                  toast({
                    title: "Receipt",
                    description: "A receipt has been sent to your email address.",
                  });
                }}
                className="w-full"
              >
                <Receipt className="h-4 w-4 mr-2" />
                View Receipt
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Questions about your order?{' '}
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

export default PaymentSuccess;