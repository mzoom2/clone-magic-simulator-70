
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import PackageSelection from '@/components/enrollment/PackageSelection';
import VisitorSelection from '@/components/enrollment/VisitorSelection';
import ContactDetails from '@/components/enrollment/ContactDetails';
import OrderSummary from '@/components/enrollment/OrderSummary';
import { EnrollmentProvider } from '@/contexts/EnrollmentContext';

const Enroll = () => {
  const { step } = useParams<{ step?: string }>();
  
  const renderStep = () => {
    switch (step) {
      case 'visitors':
        return <VisitorSelection />;
      case 'contact':
        return <ContactDetails />;
      case 'summary':
        return <OrderSummary />;
      default:
        return <PackageSelection />;
    }
  };

  return (
    <EnrollmentProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto">
            {renderStep()}
          </div>
        </main>
        
        <ResponsiveFooter />
      </div>
    </EnrollmentProvider>
  );
};

export default Enroll;
