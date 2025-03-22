
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

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

export type UserInfo = {
  id: number;
  username: string;
  is_admin: boolean;
} | null;

type EnrollmentContextType = {
  packages: PackageInfo[];
  selectedPackage: PackageInfo | null;
  occupancyType: OccupancyType;
  visitorCount: number;
  contactInfo: ContactInfo;
  isLoading: boolean;
  user: UserInfo;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setSelectedPackage: (pkg: PackageInfo | null) => void;
  setOccupancyType: (type: OccupancyType) => void;
  setVisitorCount: (count: number) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  resetEnrollment: () => void;
  calculateTotalPrice: () => string;
  updatePackagePrices: (id: string, singlePrice: string, doublePrice: string) => Promise<boolean>;
};

const defaultContactInfo: ContactInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

// Base API URL
const API_URL = 'http://localhost:5000/api';

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
  const [occupancyType, setOccupancyType] = useState<OccupancyType>(null);
  const [visitorCount, setVisitorCount] = useState(1);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_URL}/packages`);
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to load packages. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/check-auth`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.authenticated) {
            setUser(data.user);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

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
  
  // Function to update package prices via API
  const updatePackagePrices = async (id: string, singlePrice: string, doublePrice: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ singlePrice, doublePrice }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to update package');
      }
      
      // Update local state
      setPackages(prevPackages => 
        prevPackages.map(pkg => 
          pkg.id === id ? {...pkg, singlePrice, doublePrice} : pkg
        )
      );
      
      // If the currently selected package is being updated, also update it
      if (selectedPackage && selectedPackage.id === id) {
        setSelectedPackage({
          ...selectedPackage,
          singlePrice,
          doublePrice
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error updating package:', error);
      return false;
    }
  };

  return (
    <EnrollmentContext.Provider
      value={{
        packages,
        selectedPackage,
        occupancyType,
        visitorCount,
        contactInfo,
        isLoading,
        user,
        isAuthenticated,
        login,
        logout,
        setSelectedPackage,
        setOccupancyType,
        setVisitorCount,
        updateContactInfo,
        resetEnrollment,
        calculateTotalPrice,
        updatePackagePrices,
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
