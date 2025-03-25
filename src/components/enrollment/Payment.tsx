import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CheckoutForm from '../stripe/CheckoutForm';
import StripeProvider from '../stripe/StripeProvider';
import { useAuth } from '@/contexts/AuthContext';

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
  const { isAuthenticated, token, user, refreshUserData } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'canceled' | 'error'>('idle');
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);

  // Handle return from Stripe Checkout
  useEffect(() => {
    // Check for success or cancel status from Stripe redirect
    const query = new URLSearchParams(location.search);
    const status = query.get('payment_status');
    const authToken = query.get('auth_token');
    
    console.log('Payment component loaded. URL params:', location.search);
    console.log('Payment status from URL:', status);
    console.log('Authentication status:', isAuthenticated);
    
    // If there's an auth token in the URL and we're not authenticated,
    // we should update the auth state first before proceeding
    if (authToken && !token) {
      console.log('Found auth token in URL, restoring session');
      setIsProcessingAuth(true);
      localStorage.setItem('auth_token', authToken);
      
      // Clear any auth dialog closed flag since user is being authenticated
      sessionStorage.removeItem('auth_dialog_closed');
      
      // After setting the token, refresh user data
      refreshUserData().then(() => {
        // Clear the auth token from URL
        const newUrl = window.location.pathname + 
          (location.search ? location.search.replace(/(&|\?)auth_token=[^&]+/, '') : '');
        window.history.replaceState({}, '', newUrl);
        
        setIsProcessingAuth(false);
      });
      return;
    }
    
    if (status === 'success') {
      setPaymentStatus('success');
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Thank you for choosing us!",
      });
      
      // Reset enrollment and redirect to dashboard immediately
      resetEnrollment();
      navigate('/dashboard');
    } else if (status === 'canceled') {
      setPaymentStatus('canceled');
      toast({
        title: "Payment Canceled",
        description: "Your payment was not completed. You can try again.",
        variant: "destructive",
      });
    } else if (status === 'error') {
      setPaymentStatus('error');
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  }, [location.search, toast, navigate, resetEnrollment, isAuthenticated, token, refreshUserData]);

  // Redirect to enrollment start if package is not selected
  useEffect(() => {
    // Add delay to allow auth token processing
    const redirectTimer = setTimeout(() => {
      if (!isProcessingAuth && !isAuthenticated) {
        console.log('User not authenticated after delay, redirecting to login');
        navigate('/login');
        return;
      }
      
      if (!selectedPackage || !occupancyType) {
        navigate('/enroll');
      }
    }, 800); // Slightly longer delay to allow auth processing

    return () => clearTimeout(redirectTimer);
  }, [selectedPackage, occupancyType, navigate, isAuthenticated, isProcessingAuth]);

  const handleBack = () => {
    navigate('/enroll/summary');
  };

  const handlePaymentSuccess = () => {
    // This will be triggered when we handle redirect back from Stripe
    console.log('Payment initiated');
  };

  // Prepare user info if available
  const userInfo = user ? {
    userId: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name
  } : undefined;

  // Render different content based on payment status
  const renderContent = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <Card className="border-2 border-green-200 mb-8 bg-green-50">
            <CardHeader className="p-6 pb-4">
              <div className="flex justify-center mb-4">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <CardTitle className="text-xl font-semibold text-center">Payment Successful!</CardTitle>
              <CardDescription className="text-center mt-2">
                Your booking for {selectedPackage?.title} has been confirmed.
                <br />You will be redirected to the dashboard shortly.
              </CardDescription>
            </CardHeader>
          </Card>
        );
      
      case 'canceled':
        return (
          <Card className="border-2 border-orange-200 mb-8 bg-orange-50">
            <CardHeader className="p-6 pb-4">
              <div className="flex justify-center mb-4">
                <AlertCircle size={48} className="text-orange-500" />
              </div>
              <CardTitle className="text-xl font-semibold text-center">Payment Canceled</CardTitle>
              <CardDescription className="text-center mt-2">
                Your payment was not completed. You can try again below.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CheckoutForm 
                amount={calculateTotalPrice()} 
                packageTitle={selectedPackage?.title || ''}
                onSuccess={handlePaymentSuccess}
                userInfo={userInfo}
              />
            </CardContent>
          </Card>
        );
      
      case 'error':
        return (
          <Card className="border-2 border-red-200 mb-8 bg-red-50">
            <CardHeader className="p-6 pb-4">
              <div className="flex justify-center mb-4">
                <AlertCircle size={48} className="text-red-500" />
              </div>
              <CardTitle className="text-xl font-semibold text-center">Payment Failed</CardTitle>
              <CardDescription className="text-center mt-2">
                There was an error processing your payment. Please try again.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CheckoutForm 
                amount={calculateTotalPrice()} 
                packageTitle={selectedPackage?.title || ''}
                onSuccess={handlePaymentSuccess}
                userInfo={userInfo}
              />
            </CardContent>
          </Card>
        );
      
      default:
        return (
          <Card className="border-2 border-gray-200 mb-8">
            <CardHeader className="p-6 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-forest">{selectedPackage?.title}</CardTitle>
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
                    <p className="text-sm text-gray-600">{selectedPackage?.description}</p>
                    <p className="text-sm text-gray-600 font-semibold">{selectedPackage?.date}</p>
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
                  packageTitle={selectedPackage?.title || ''}
                  onSuccess={handlePaymentSuccess}
                  userInfo={userInfo}
                />
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  if (!selectedPackage && paymentStatus === 'idle') {
    return <div className="text-center p-8">Loading payment details...</div>;
  }

  return (
    <StripeProvider>
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-serif text-forest text-center mb-8">
          Complete Payment
        </h2>
        
        {renderContent()}
        
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
