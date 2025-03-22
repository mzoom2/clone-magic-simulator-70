
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { initiatePayment, verifyPayment } from '@/services/paymentService';

const OrderSummary = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const { 
    selectedPackage, 
    occupancyType, 
    visitorCount, 
    contactInfo,
    calculateTotalPrice,
    resetEnrollment
  } = useEnrollment();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for payment verification on component mount if session_id is present
  React.useEffect(() => {
    if (sessionId) {
      verifyPaymentStatus(sessionId);
    }
  }, [sessionId]);

  const verifyPaymentStatus = async (sid: string) => {
    try {
      setIsProcessing(true);
      const result = await verifyPayment(sid);
      
      if (result.success) {
        toast({
          title: "Payment Successful!",
          description: "Your booking has been confirmed. Check your email for details.",
        });
        resetEnrollment();
        navigate('/');
      } else {
        toast({
          title: "Payment Verification Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast({
        title: "Payment Verification Error",
        description: "There was a problem verifying your payment. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPackage || !occupancyType) {
    navigate('/enroll');
    return null;
  }

  const handleBack = () => {
    navigate('/enroll/contact');
  };

  const handlePayment = async () => {
    if (!selectedPackage || !contactInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields before proceeding to payment.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      toast({
        title: "Processing Payment",
        description: "Please wait while we redirect you to our secure payment page...",
      });

      // Call the payment service to initiate payment
      const checkoutUrl = await initiatePayment(
        selectedPackage.title,
        calculateTotalPrice(),
        visitorCount,
        contactInfo
      );
      
      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Payment initiation error:', error);
      setIsProcessing(false);
      toast({
        title: "Payment Error",
        description: "There was a problem initiating your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-serif text-forest text-center mb-8">
        Order Summary
      </h2>
      
      <Card className="border-2 border-gray-200 mb-8">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Package Details</h3>
              <div className="space-y-2 pl-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{selectedPackage.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{selectedPackage.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy:</span>
                  <span className="capitalize">{occupancyType} Occupancy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visitors:</span>
                  <span>{visitorCount}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="space-y-2 pl-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>{contactInfo.firstName} {contactInfo.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{contactInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span>{contactInfo.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-4">What's Included</h3>
              <div className="space-y-3 pl-2">
                {selectedPackage.id.includes('tech') && (
                  <>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-forest mt-0.5 flex-shrink-0" />
                      <span>Conference Access</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-forest mt-0.5 flex-shrink-0" />
                      <span>Personal Car & Driver</span>
                    </div>
                  </>
                )}
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-forest mt-0.5 flex-shrink-0" />
                  <span>Hotel Accommodation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-forest mt-0.5 flex-shrink-0" />
                  <span>Daily Transportation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={18} className="text-forest mt-0.5 flex-shrink-0" />
                  <span>Scheduled Meals & Activities</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Total Price:</h3>
                <span className="text-xl font-bold text-forest">${calculateTotalPrice()}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                All prices exclude: International Flights, Personal Shopping, Meals outside designated activities, Travel Insurance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button 
          onClick={handleBack}
          variant="outline"
          className="rounded-full px-6"
          disabled={isProcessing}
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        
        <Button 
          onClick={handlePayment}
          className="bg-[#f8b13f] hover:bg-[#f8b13f]/90 text-black rounded-full px-8 py-6 h-auto text-base font-medium"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
