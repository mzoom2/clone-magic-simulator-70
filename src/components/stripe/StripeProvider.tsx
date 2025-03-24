
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace with your publishable key from the Stripe Dashboard
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface StripeProviderProps {
  children: React.ReactNode;
  options?: {
    locale?: string;
    appearance?: any;
  };
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children, options }) => {
  const defaultOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0f172a',
        colorBackground: '#ffffff',
        colorText: '#0f172a',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        spacingUnit: '4px',
        borderRadius: '4px',
      },
    },
    ...options
  };

  return (
    <Elements stripe={stripePromise} options={defaultOptions}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
