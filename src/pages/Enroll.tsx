
import React, { useEffect } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import PackageSelection from '@/components/enrollment/PackageSelection';
import VisitorSelection from '@/components/enrollment/VisitorSelection';
import ContactDetails from '@/components/enrollment/ContactDetails';
import OrderSummary from '@/components/enrollment/OrderSummary';
import { EnrollmentProvider, useEnrollment, packages } from '@/contexts/EnrollmentContext';

// Create a wrapper component to access the enrollment context
const EnrollmentManager = () => {
  const { step } = useParams<{ step?: string }>();
  const location = useLocation();
  const { setSelectedPackage, setOccupancyType } = useEnrollment();
  
  useEffect(() => {
    // Parse package ID from URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const packageId = searchParams.get('package');
    
    if (packageId) {
      const selectedPkg = packages.find(pkg => pkg.id === packageId);
      if (selectedPkg) {
        // Pre-select the package and navigate to visitors step
        setSelectedPackage(selectedPkg);
        // By default, set to double occupancy (user can change on next step if needed)
        setOccupancyType('double');
        // Redirect to visitors selection step
        window.location.href = '/enroll/visitors';
      }
    }
  }, [location.search, setSelectedPackage, setOccupancyType]);
  
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

  return renderStep();
};

const Enroll = () => {
  return (
    <EnrollmentProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto">
            <EnrollmentManager />
          </div>
        </main>
        
        <ResponsiveFooter />
      </div>
    </EnrollmentProvider>
  );
};

export default Enroll;
