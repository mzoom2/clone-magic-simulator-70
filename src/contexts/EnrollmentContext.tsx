
import React, { createContext, useContext, useState } from 'react';

export type PackageInfo = {
  id: string;
  title: string;
  route: string;
  image: string;
  description: string;
  singlePrice: string;
  doublePrice: string;
  date: string;
};

export type OccupancyType = 'single' | 'double' | null;

export type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type EnrollmentContextType = {
  packages: PackageInfo[];
  selectedPackage: PackageInfo | null;
  occupancyType: OccupancyType;
  visitorCount: number;
  contactInfo: ContactInfo;
  setSelectedPackage: (pkg: PackageInfo | null) => void;
  setOccupancyType: (type: OccupancyType) => void;
  setVisitorCount: (count: number) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  resetEnrollment: () => void;
  calculateTotalPrice: () => string;
};

const defaultContactInfo: ContactInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export const packages: PackageInfo[] = [
  {
    id: 'summer-tech',
    title: 'SUMMER TECH',
    route: '/catalogue/summer-tech',
    image: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    description: "Engage with industry leaders and innovators from across the continent during Africa's biggest open source conference.",
    singlePrice: '2,400',
    doublePrice: '1,900',
    date: 'JUNE 19TH - 21ST, 2025',
  },
  {
    id: 'october-tech',
    title: 'OCTOBER TECH',
    route: '/catalogue/october-tech',
    image: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    description: "Meet the founders, business leaders, and innovators shaping Africa's tech ecosystem.",
    singlePrice: '3,000',
    doublePrice: '2,400',
    date: 'OCTOBER 13TH - 19TH, 2025',
  },
  {
    id: 'fashion-week',
    title: 'FASHION WEEK',
    route: '/catalogue/fashion-week',
    image: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    description: "Experience the vibrant fashion scene in Lagos, the fashion capital of Africa.",
    singlePrice: '3,500',
    doublePrice: '2,800',
    date: 'APRIL 25TH - MAY 1ST, 2025',
  },
  {
    id: 'lagos-artventure',
    title: 'LAGOS ARTVENTURE',
    route: '/catalogue/lagos-artventure',
    image: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    description: "Explore Lagos' vibrant art scene with exclusive gallery access and artist meetings.",
    singlePrice: '3,200',
    doublePrice: '2,600',
    date: 'AUGUST 15TH - 21ST, 2025',
  },
  {
    id: 'behind-the-scenes',
    title: 'BEHIND THE SCENES',
    route: '/catalogue/behind-the-scenes',
    image: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    description: "Get exclusive access to Nigeria's influential media, entertainment, and creative spaces.",
    singlePrice: '3,800',
    doublePrice: '3,100',
    date: 'SEPTEMBER 10TH - 16TH, 2025',
  },
  {
    id: 'detty-december',
    title: 'DETTY DECEMBER',
    route: '/catalogue/detty-december',
    image: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    description: "Experience the full excitement of Detty December with exclusive access to Lagos' hottest events.",
    singlePrice: '5,000',
    doublePrice: '4,300',
    date: 'DECEMBER 2025',
  },
];

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
  const [occupancyType, setOccupancyType] = useState<OccupancyType>(null);
  const [visitorCount, setVisitorCount] = useState(1);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);

  const updateContactInfo = (info: Partial<ContactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...info }));
  };

  const resetEnrollment = () => {
    setSelectedPackage(null);
    setOccupancyType(null);
    setVisitorCount(1);
    setContactInfo(defaultContactInfo);
  };

  const calculateTotalPrice = (): string => {
    if (!selectedPackage || !occupancyType) return '0';
    
    const basePrice = occupancyType === 'single' 
      ? selectedPackage.singlePrice 
      : selectedPackage.doublePrice;
    
    // Convert price from string format "1,900" to number, multiply by visitor count, then back to string format
    const numericPrice = parseFloat(basePrice.replace(/,/g, ''));
    const totalPrice = numericPrice * visitorCount;
    
    return totalPrice.toLocaleString();
  };

  return (
    <EnrollmentContext.Provider
      value={{
        packages,
        selectedPackage,
        occupancyType,
        visitorCount,
        contactInfo,
        setSelectedPackage,
        setOccupancyType,
        setVisitorCount,
        updateContactInfo,
        resetEnrollment,
        calculateTotalPrice,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
};
