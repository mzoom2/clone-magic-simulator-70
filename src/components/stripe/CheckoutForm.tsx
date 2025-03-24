
import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CheckoutFormProps {
  amount: string;
  packageTitle: string;
  onSuccess: () => void;
  userInfo?: {
    userId?: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, packageTitle, onSuccess, userInfo }) => {
  const stripe = useStripe();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Use authenticated user info if available
  const [email, setEmail] = useState(userInfo?.email || user?.email || '');
  const [firstName, setFirstName] = useState(userInfo?.firstName || user?.first_name || '');
  const [lastName, setLastName] = useState(userInfo?.lastName || user?.last_name || '');
  const [isStripeReady, setIsStripeReady] = useState(false);
  
  // Check if Stripe is loaded
  useEffect(() => {
    if (stripe) {
      setIsStripeReady(true);
    }
  }, [stripe]);

  // Convert price string like "1,900" to number in cents (190000)
  const getAmountInCents = (): number => {
    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    return numericAmount * 100; // Convert to cents
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!stripe) {
      toast({
        title: "Stripe Not Loaded",
        description: "Please wait a moment and try again.",
        variant: "destructive",
      });
      return;
    }

    if (!email || !firstName || !lastName) {
      toast({
        title: "Missing Information",
        description: "Please fill out all the required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get the current origin for the success and cancel URLs
      const origin = window.location.origin;
      
      // Include auth token in the URL to preserve authentication state
      const authToken = localStorage.getItem('auth_token');
      const successUrl = `${origin}/enroll/payment?payment_status=success&session_id={CHECKOUT_SESSION_ID}&auth_token=${authToken || ''}`;
      const cancelUrl = `${origin}/enroll/payment?payment_status=canceled&auth_token=${authToken || ''}`;
      
      // Make request to Python backend to create checkout session
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken || ''}`
        },
        body: JSON.stringify({
          package_title: packageTitle,
          amount_cents: getAmountInCents(),
          success_url: successUrl,
          cancel_url: cancelUrl,
          email: email,
          first_name: firstName,
          last_name: lastName,
          user_id: userInfo?.userId || user?.id
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      
      const { checkout_url, session_id } = await response.json();
      
      // Save session ID in localStorage for reference
      localStorage.setItem('current_checkout_session', session_id);
      
      // Redirect to Stripe Checkout
      window.location.href = checkout_url;
    } catch (err) {
      console.error('Error initiating checkout:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      toast({
        title: "Checkout Error",
        description: "There was a problem initiating the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Determine what's preventing the form submission
  const getButtonDisabledReason = () => {
    if (!isStripeReady) return "Waiting for payment system to load...";
    if (!email) return "Email is required";
    if (!firstName) return "First name is required";
    if (!lastName) return "Last name is required";
    return null;
  };

  const buttonDisabledReason = getButtonDisabledReason();
  const isButtonDisabled = !isStripeReady || isLoading || !email || !firstName || !lastName;

  return (
    <Card className="border-2 border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Secure Checkout</CardTitle>
        <CardDescription>
          You'll be redirected to Stripe's secure payment platform
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
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
            
            <div className="space-y-3 pt-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!!userInfo?.email}
                  placeholder="Your email address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={!!userInfo?.firstName}
                    placeholder="Your first name"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={!!userInfo?.lastName}
                    placeholder="Your last name"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
              <CheckCircle2 className="h-4 w-4 mr-2 text-forest" />
              <span>Your information is processed securely through Stripe</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 flex flex-col">
          <Button 
            type="submit"
            disabled={isButtonDisabled}
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
          
          {isButtonDisabled && buttonDisabledReason && !isLoading && (
            <div className="flex items-center justify-center mt-3 text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {buttonDisabledReason}
            </div>
          )}
          
          {error && (
            <div className="text-destructive text-sm mt-3 w-full text-center flex items-center justify-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default CheckoutForm;
