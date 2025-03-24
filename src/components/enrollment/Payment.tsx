
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  if (!selectedPackage || !occupancyType) {
    navigate('/enroll');
    return null;
  }

  const handleBack = () => {
    navigate('/enroll/summary');
  };

  const handlePaymentSuccess = () => {
    // Reset enrollment data after successful payment
    resetEnrollment();
    
    // Navigate to home page or confirmation page
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <StripeProvider>
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-serif text-forest text-center mb-8">
          Complete Payment
        </h2>
        
        <Card className="border-2 border-gray-200 mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-xl font-medium">{selectedPackage.title}</h3>
              <span className="text-xl font-bold text-forest">${calculateTotalPrice()}</span>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Enter your card details to complete your purchase. Your information is secure and encrypted.
              </p>
              
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
