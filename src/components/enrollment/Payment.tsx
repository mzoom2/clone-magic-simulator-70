
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CheckoutForm from '../stripe/CheckoutForm';
import StripeProvider from '../stripe/StripeProvider';

const Payment = () => {
  const { 
    selectedPackage, 
    occupancyType, 
    calculateTotalPrice,
    resetEnrollment
  } = useEnrollment();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Handle return from Stripe Checkout
  useEffect(() => {
    // Check for success or cancel status from Stripe redirect
    const query = new URLSearchParams(location.search);
    const paymentStatus = query.get('payment_status');
    
    if (paymentStatus === 'success') {
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Thank you for choosing us!",
      });
      
      // Reset enrollment and redirect
      resetEnrollment();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else if (paymentStatus === 'canceled') {
      toast({
        title: "Payment Canceled",
        description: "Your payment was not completed. You can try again.",
        variant: "destructive",
      });
    }
  }, [location, toast, navigate, resetEnrollment]);

  if (!selectedPackage || !occupancyType) {
    navigate('/enroll');
    return null;
  }

  const handleBack = () => {
    navigate('/enroll/summary');
  };

  const handlePaymentSuccess = () => {
    // This will be triggered when we handle redirect back from Stripe
    // The actual success is handled in the useEffect above
    console.log('Payment initiated');
  };

  return (
    <StripeProvider>
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-serif text-forest text-center mb-8">
          Complete Payment
        </h2>
        
        <Card className="border-2 border-gray-200 mb-8">
          <CardHeader className="p-6 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold text-forest">{selectedPackage.title}</CardTitle>
              <span className="text-xl font-bold text-forest">${calculateTotalPrice()}</span>
            </div>
            <CardDescription className="text-gray-600 mt-2">
              Secure payment powered by Stripe
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Package Details</h4>
                  <p className="text-sm text-gray-600">{selectedPackage.description}</p>
                  <p className="text-sm text-gray-600 font-semibold">{selectedPackage.date}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Payment Methods</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-100 p-2 rounded">
                      <CreditCard size={18} className="text-gray-700" />
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded text-xs flex items-center">
                      Visa
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded text-xs flex items-center">
                      Mastercard
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded text-xs flex items-center">
                      AMEX
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded text-xs flex items-center">
                      And more
                    </div>
                  </div>
                </div>
              </div>
              
              <CheckoutForm 
                amount={calculateTotalPrice()} 
                packageTitle={selectedPackage.title}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <Button 
            onClick={handleBack}
            variant="outline"
            className="rounded-full px-6"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Summary
          </Button>
        </div>
      </div>
    </StripeProvider>
  );
};

export default Payment;
