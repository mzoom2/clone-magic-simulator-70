import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CheckoutFormProps {
  amount: string;
  packageTitle: string;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, packageTitle, onSuccess }) => {
  const stripe = useStripe();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert price string like "1,900" to number in cents (190000)
  const getAmountInCents = (): number => {
    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    return numericAmount * 100; // Convert to cents
  };

  const handleCheckout = async () => {
    if (!stripe) {
      toast({
        title: "Stripe Not Loaded",
        description: "Please wait a moment and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get the current origin for the success and cancel URLs
      const origin = window.location.origin;
      const successUrl = `${origin}/enroll/payment?payment_status=success`;
      const cancelUrl = `${origin}/enroll/payment?payment_status=canceled`;
      
      // Make request to Python backend to create checkout session
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_title: packageTitle,
          amount_cents: getAmountInCents(),
          success_url: successUrl,
          cancel_url: cancelUrl
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { checkout_url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = checkout_url;
    } catch (err) {
      console.error('Error initiating checkout:', err);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: "Checkout Error",
        description: "There was a problem initiating the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-2 border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Secure Checkout</CardTitle>
        <CardDescription>
          You'll be redirected to Stripe's secure payment platform
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between text-sm px-1">
            <span className="text-gray-500">Package</span>
            <span className="font-medium">{packageTitle}</span>
          </div>
          
          <div className="flex justify-between text-sm px-1">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-medium">${amount}</span>
          </div>
          
          <div className="flex items-center mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
            <CheckCircle2 className="h-4 w-4 mr-2 text-forest" />
            <span>Your information is processed securely through Stripe</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          onClick={handleCheckout} 
          disabled={!stripe || isLoading}
          className="bg-[#f8b13f] hover:bg-[#f8b13f]/90 text-black rounded-full px-8 py-6 h-auto text-base font-medium w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing Checkout...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Pay ${amount} Securely
            </>
          )}
        </Button>
        
        {error && (
          <div className="text-destructive text-sm mt-4 w-full text-center">
            {error}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CheckoutForm;
