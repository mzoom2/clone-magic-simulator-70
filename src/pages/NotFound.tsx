
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Check if this is a failed Stripe redirect
    const isStripeRedirect = location.pathname.includes('payment') || 
                             location.search.includes('payment_status') ||
                             location.search.includes('session_id');
    
    if (isStripeRedirect) {
      console.error("Possible Stripe redirect failure. Search params:", location.search);
    }
  }, [location.pathname, location.search]);

  // Check if this might be a Stripe redirect
  const isStripeRedirect = location.pathname.includes('payment') || 
                           location.search.includes('payment_status') ||
                           location.search.includes('session_id');

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
