
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { useEnrollment, Package } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PackageSelection = () => {
  const { packages, setSelectedPackage, setOccupancyType } = useEnrollment();
  const navigate = useNavigate();
  
  // Track selected occupancy type for each package
  const [selectedOccupancies, setSelectedOccupancies] = useState<Record<string, 'single' | 'double' | null>>({});

  const handleViewDetails = (route: string | undefined) => {
    if (route) {
      window.open(route, '_blank');
    }
  };

  const handleSelectOccupancy = (packageId: string, type: 'single' | 'double') => {
    setSelectedOccupancies(prev => ({
      ...prev,
      [packageId]: type
    }));
  };

  const handleContinue = (pkg: Package) => {
    const selectedType = selectedOccupancies[pkg.id];
    
    if (!selectedType) {
      toast.error("Please select an occupancy type first");
      return;
    }
    
    setSelectedPackage(pkg);
    setOccupancyType(selectedType);
    navigate('/enroll/visitors');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-serif text-forest text-center mb-8">
        Choose Your Experience
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className="overflow-hidden transition-all duration-300 border-2 border-gray-200 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white text-forest rounded-full"
                  onClick={() => handleViewDetails(pkg.route)}
                >
                  <Info size={18} />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-forest">{pkg.title}</h3>
                  <p className="text-sm text-gray-500">{pkg.date}</p>
                </div>
                
                <p className="text-sm line-clamp-2">{pkg.description}</p>
                
                <div className="space-y-3">
                  <div className="border rounded-md p-3 bg-gray-50">
                    <p className="text-sm font-medium mb-2 text-forest">Please select an occupancy type:</p>
                    
                    <RadioGroup 
                      value={selectedOccupancies[pkg.id] || ""}
                      onValueChange={(value) => handleSelectOccupancy(pkg.id, value as 'single' | 'double')}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="double" id={`double-${pkg.id}`} />
                          <Label htmlFor={`double-${pkg.id}`} className="cursor-pointer">Double Occupancy</Label>
                        </div>
                        <span className="font-medium">${pkg.doublePrice}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="single" id={`single-${pkg.id}`} />
                          <Label htmlFor={`single-${pkg.id}`} className="cursor-pointer">Single Occupancy</Label>
                        </div>
                        <span className="font-medium">${pkg.singlePrice}</span>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      onClick={() => handleContinue(pkg)}
                      className="bg-forest hover:bg-forest/90 text-white rounded-full w-full mt-2 py-2 h-auto text-sm font-medium"
                    >
                      Continue <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageSelection;
