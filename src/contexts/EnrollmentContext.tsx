
import React, { createContext, useState, useContext, useEffect } from 'react';

// Package type definition
type Package = {
  id: string;
  title: string;
  description: string;
  date: string;
  singlePrice: string;
  doublePrice: string;
  image: string;
};

// Initial state for visitor and contact information
const initialVisitorInfo = {
  count: 1,
  pricePerVisitor: '',
  totalPrice: '',
};

const initialContactInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

// Context type definition
type EnrollmentContextType = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedPackage: Package | null;
  setSelectedPackage: React.Dispatch<React.SetStateAction<Package | null>>;
  visitorInfo: typeof initialVisitorInfo;
  setVisitorInfo: React.Dispatch<React.SetStateAction<typeof initialVisitorInfo>>;
  contactInfo: typeof initialContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<typeof initialContactInfo>>;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  updatePackagePrices?: (id: string, singlePrice: string, doublePrice: string) => void;
};

// Create context with default values
const EnrollmentContext = createContext<EnrollmentContextType>({
  currentStep: 1,
  setCurrentStep: () => {},
  selectedPackage: null,
  setSelectedPackage: () => {},
  visitorInfo: initialVisitorInfo,
  setVisitorInfo: () => {},
  contactInfo: initialContactInfo,
  setContactInfo: () => {},
  packages: [],
  setPackages: () => {},
});

// Provider component
export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [visitorInfo, setVisitorInfo] = useState(initialVisitorInfo);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    // Fetch packages from the API
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Fallback to sample data if API fails
        setPackages([
          {
            id: '1',
            title: 'Lagos Experience',
            description: 'Experience the vibrant culture of Lagos',
            date: 'December 2023',
            singlePrice: '1,999.00',
            doublePrice: '3,499.00',
            image: '/lovable-uploads/1bfbcad9-04e3-445e-8d19-840a15a1642a.png',
          },
          {
            id: '2',
            title: 'Abuja Adventure',
            description: 'Explore the beautiful capital city',
            date: 'January 2024',
            singlePrice: '1,799.00',
            doublePrice: '3,299.00',
            image: '/lovable-uploads/5617c3ad-1f1f-4878-ae9a-40862d14df7b.png',
          },
          {
            id: '3',
            title: 'Cultural Immersion',
            description: 'Deep dive into Nigerian traditions',
            date: 'February 2024',
            singlePrice: '2,099.00',
            doublePrice: '3,899.00',
            image: '/lovable-uploads/99d1a1e9-33f0-48d1-884c-3aa027ee3443.png',
          },
        ]);
      }
    };

    fetchPackages();
  }, []);

  // Function to update package prices
  const updatePackagePrices = (id: string, singlePrice: string, doublePrice: string) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === id ? { ...pkg, singlePrice, doublePrice } : pkg
      )
    );
  };

  return (
    <EnrollmentContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedPackage,
        setSelectedPackage,
        visitorInfo,
        setVisitorInfo,
        contactInfo,
        setContactInfo,
        packages,
        setPackages,
        updatePackagePrices,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

// Custom hook to use the enrollment context
export const useEnrollment = () => useContext(EnrollmentContext);
