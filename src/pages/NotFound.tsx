
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Check if this is a failed Stripe redirect
    const isStripeRedirect = location.pathname.includes('payment') || 
                             location.search.includes('payment_status') ||
                             location.search.includes('session_id');
    
    // Check if this is an auth-related error
    const isAuthError = location.pathname.includes('login') || 
                        location.pathname.includes('register') ||
                        location.pathname.includes('dashboard') ||
                        location.pathname.includes('admin');
    
    if (isStripeRedirect) {
      console.error("Possible Stripe redirect failure. Search params:", location.search);
    }
    
    if (isAuthError) {
      console.error("Possible authentication error. User authenticated:", isAuthenticated);
    }
  }, [location.pathname, location.search, isAuthenticated]);

  // Check if this might be a Stripe redirect
  const isStripeRedirect = location.pathname.includes('payment') || 
                           location.search.includes('payment_status') ||
                           location.search.includes('session_id');
  
  // Check if this might be an auth error
  const isAuthError = location.pathname.includes('dashboard') &&
                      !isAuthenticated;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        
        {isStripeRedirect ? (
          <>
            <p className="text-lg text-gray-600 mb-4">
              There was an issue processing your payment. This could be due to:
            </p>
            <ul className="text-left text-gray-600 mb-6 space-y-2">
              <li>• An expired checkout session</li>
              <li>• An incorrect redirect URL</li>
              <li>• A cancelled payment process</li>
              <li>• Python backend server not running</li>
            </ul>
            <div className="space-y-4">
              <Link 
                to="/enroll/payment" 
                className="bg-forest text-white px-6 py-3 rounded-full inline-block hover:bg-forest/90 transition-colors"
              >
                Return to Payment
              </Link>
              <div>
                <Link to="/" className="text-forest hover:text-forest/80 underline mt-4 inline-block">
                  Return to Home
                </Link>
              </div>
            </div>
          </>
        ) : isAuthError ? (
          <>
            <p className="text-xl text-gray-600 mb-6">
              You need to be logged in to access this page.
            </p>
            <Link 
              to="/login" 
              className="bg-forest text-white px-6 py-3 rounded-full inline-block hover:bg-forest/90 transition-colors"
            >
              Sign In
            </Link>
            <div>
              <Link to="/" className="text-forest hover:text-forest/80 underline mt-4 inline-block">
                Return to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-gray-600 mb-6">
              The page you were looking for could not be found.
            </p>
            <Link 
              to="/" 
              className="bg-forest text-white px-6 py-3 rounded-full inline-block hover:bg-forest/90 transition-colors"
            >
              Return to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFound;
