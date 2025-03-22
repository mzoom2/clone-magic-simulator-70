
import React, { createContext, useState, useContext, useEffect } from 'react';

// Package type definition
export type Package = {
  id: string;
  title: string;
  description: string;
  date: string;
  singlePrice: string;
  doublePrice: string;
  image: string;
  route?: string; // Add route property for navigation
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
  
  // Add missing properties and methods
  occupancyType: 'single' | 'double' | null;
  setOccupancyType: React.Dispatch<React.SetStateAction<'single' | 'double' | null>>;
  visitorCount: number;
  setVisitorCount: React.Dispatch<React.SetStateAction<number>>;
  calculateTotalPrice: () => string;
  updateContactInfo: (info: typeof initialContactInfo) => void;
  resetEnrollment: () => void;
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
  
  // Add missing default values
  occupancyType: null,
  setOccupancyType: () => {},
  visitorCount: 1,
  setVisitorCount: () => {},
  calculateTotalPrice: () => "0.00",
  updateContactInfo: () => {},
  resetEnrollment: () => {},
});

// Provider component
export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [visitorInfo, setVisitorInfo] = useState(initialVisitorInfo);
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  const [packages, setPackages] = useState<Package[]>([]);
  
  // Add new state variables
  const [occupancyType, setOccupancyType] = useState<'single' | 'double' | null>(null);
  const [visitorCount, setVisitorCount] = useState<number>(1);

  useEffect(() => {
    // Fetch packages from the API
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        
        // Add route property to each package
        const packagesWithRoutes = data.map((pkg: Package) => {
          let route = '';
          if (pkg.id === '1') route = '/catalogue/lagos-experience';
          else if (pkg.id === '2') route = '/catalogue/abuja-adventure';
          else if (pkg.id === '3') route = '/catalogue/cultural-immersion';
          return { ...pkg, route };
        });
        
        setPackages(packagesWithRoutes);
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
            route: '/catalogue/lagos-experience',
          },
          {
            id: '2',
            title: 'Abuja Adventure',
            description: 'Explore the beautiful capital city',
            date: 'January 2024',
            singlePrice: '1,799.00',
            doublePrice: '3,299.00',
            image: '/lovable-uploads/5617c3ad-1f1f-4878-ae9a-40862d14df7b.png',
            route: '/catalogue/abuja-adventure',
          },
          {
            id: '3',
            title: 'Cultural Immersion',
            description: 'Deep dive into Nigerian traditions',
            date: 'February 2024',
            singlePrice: '2,099.00',
            doublePrice: '3,899.00',
            image: '/lovable-uploads/99d1a1e9-33f0-48d1-884c-3aa027ee3443.png',
            route: '/catalogue/cultural-immersion',
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
  
  // Function to calculate total price based on occupancy type and visitor count
  const calculateTotalPrice = (): string => {
    if (!selectedPackage || !occupancyType) return "0.00";
    
    // Get the base price without any formatting
    const basePrice = occupancyType === 'single' 
      ? selectedPackage.singlePrice 
      : selectedPackage.doublePrice;
    
    // Remove commas and convert to number
    const numericPrice = parseFloat(basePrice.replace(/,/g, ''));
    
    // Calculate total price
    const total = numericPrice * visitorCount;
    
    // Format the result
    return total.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };
  
  // Function to update contact information
  const updateContactInfo = (info: typeof initialContactInfo) => {
    setContactInfo(info);
  };
  
  // Function to reset enrollment
  const resetEnrollment = () => {
    setCurrentStep(1);
    setSelectedPackage(null);
    setVisitorInfo(initialVisitorInfo);
    setContactInfo(initialContactInfo);
    setOccupancyType(null);
    setVisitorCount(1);
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
        occupancyType,
        setOccupancyType,
        visitorCount,
        setVisitorCount,
        calculateTotalPrice,
        updateContactInfo,
        resetEnrollment,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

// Custom hook to use the enrollment context
export const useEnrollment = () => useContext(EnrollmentContext);
