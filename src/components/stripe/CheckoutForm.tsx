
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  amount: string;
  packageTitle: string;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, packageTitle, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert price string like "1,900" to number in cents (190000)
  const getAmountInCents = (): number => {
    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    return numericAmount * 100; // Convert to cents
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, you would create a payment intent on your server
      // and return the client secret to use here
      // This is just a mock implementation for demonstration

      // Simulate API call to create payment intent
      const mockCreatePaymentIntent = async () => {
        return new Promise<{ clientSecret: string }>((resolve) => {
          setTimeout(() => {
            // This is a fake client secret
            resolve({ clientSecret: 'pi_mock_secret_' + Math.random().toString(36).substr(2, 9) });
          }, 1000);
        });
      };

      const { clientSecret } = await mockCreatePaymentIntent();

      // Confirm the payment with the card element
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Test User',
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'An error occurred during payment processing');
        toast({
          title: "Payment Failed",
          description: result.error.message || 'Something went wrong with your payment',
          variant: "destructive",
        });
      } else {
        // The payment has been processed!
        toast({
          title: "Payment Successful!",
          description: `Your booking for ${packageTitle} has been confirmed.`,
        });
        onSuccess();
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: "Payment Error",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-md bg-white">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-destructive text-sm mt-2">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={!stripe || isLoading}
        className="bg-[#f8b13f] hover:bg-[#f8b13f]/90 text-black rounded-full px-8 py-6 h-auto text-base font-medium w-full sm:w-auto"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${amount}`
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;
