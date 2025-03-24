
import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import PackageSelection from '@/components/enrollment/PackageSelection';
import VisitorSelection from '@/components/enrollment/VisitorSelection';
import ContactDetails from '@/components/enrollment/ContactDetails';
import OrderSummary from '@/components/enrollment/OrderSummary';
import Payment from '@/components/enrollment/Payment';
import { EnrollmentProvider, useEnrollment, packages } from '@/contexts/EnrollmentContext';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Step indicator component
const StepIndicator = ({ currentStep }: { currentStep: string }) => {
  const steps = [
    { id: 'package', label: 'Package' },
    { id: 'visitors', label: 'Visitors' },
    { id: 'contact', label: 'Contact' },
    { id: 'summary', label: 'Summary' },
    { id: 'payment', label: 'Payment' }
  ];
  
  const getCurrentStepIndex = () => {
    switch (currentStep) {
      case 'visitors': return 1;
      case 'contact': return 2;
      case 'summary': return 3;
      case 'payment': return 4;
      default: return 0;
    }
  };
  
  const currentStepIndex = getCurrentStepIndex();
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step item */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                index <= currentStepIndex ? "bg-forest border-forest text-white" : "bg-white border-gray-300 text-gray-400"
              )}>
                {index < currentStepIndex ? <Check size={18} /> : index + 1}
              </div>
              <span className={cn(
                "mt-2 text-sm transition-colors",
                index <= currentStepIndex ? "text-forest font-medium" : "text-gray-500"
              )}>
                {step.label}
              </span>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="w-full max-w-[100px] h-[2px] bg-gray-200 flex-grow mx-2">
                <div 
                  className="h-full bg-forest transition-all" 
                  style={{ 
                    width: index < currentStepIndex ? '100%' : '0%',
                    transition: 'width 0.5s ease-in-out'
                  }}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile step indicator */}
      <div className="md:hidden text-center">
        <p className="text-forest font-medium">
          Step {currentStepIndex + 1} of {steps.length}: <span className="font-bold">{steps[currentStepIndex].label}</span>
        </p>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-forest h-full rounded-full transition-all" 
            style={{ width: `${(currentStepIndex + 1) / steps.length * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Create a wrapper component to access the enrollment context
const EnrollmentManager = () => {
  const { step } = useParams<{ step?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
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
        // Redirect to visitors selection step using navigate instead of window.location
        navigate('/enroll/visitors');
      }
    }
  }, [location.search, setSelectedPackage, setOccupancyType, navigate]);
  
  const renderStep = () => {
    switch (step) {
      case 'visitors':
        return <VisitorSelection />;
      case 'contact':
        return <ContactDetails />;
      case 'summary':
        return <OrderSummary />;
      case 'payment':
        return <Payment />;
      default:
        return <PackageSelection />;
    }
  };

  return (
    <>
      <StepIndicator currentStep={step || 'package'} />
      {renderStep()}
    </>
  );
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
