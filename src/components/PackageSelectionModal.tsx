
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBooking, ExperienceType } from '@/contexts/BookingContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface PackageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (experience: ExperienceType) => void;
}

const PackageSelectionModal = ({ isOpen, onClose, onSelectPackage }: PackageSelectionModalProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Define all available packages with occupancy options
  const packages = [
    {
      id: 'summer-tech',
      title: 'Summer Tech',
      occupancyOptions: [
        { type: 'Single Occupancy', price: 1900 },
        { type: 'Double Occupancy', price: 1600 }
      ],
      description: 'Conference Access, 2-Night Hotel Stay, Personal Car & Driver',
      path: '/catalogue/summer-tech',
      image: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png'
    },
    {
      id: 'october-tech',
      title: 'October Tech',
      occupancyOptions: [
        { type: 'Single Occupancy', price: 2200 },
        { type: 'Double Occupancy', price: 1850 }
      ],
      description: 'Conference Access, 3-Night Hotel Stay, Personal Car & Driver',
      path: '/catalogue/october-tech',
      image: '/lovable-uploads/5617c3ad-1f1f-4878-ae9a-40862d14df7b.png'
    },
    {
      id: 'fashion-week',
      title: 'Fashion Week',
      occupancyOptions: [
        { type: 'Single Occupancy', price: 2500 },
        { type: 'Double Occupancy', price: 2100 }
      ],
      description: 'Show Access, 3-Night Hotel Stay, Personal Shopping Assistant',
      path: '/catalogue/fashion-week',
      image: '/lovable-uploads/1bfbcad9-04e3-445e-8d19-840a15a1642a.png'
    },
    {
      id: 'lagos-artventure',
      title: 'Lagos Artventure',
      occupancyOptions: [
        { type: 'Single Occupancy', price: 3200 },
        { type: 'Double Occupancy', price: 2700 }
      ],
      description: 'Guided Art Tours, 4-Night Hotel Stay, Cultural Experiences',
      path: '/catalogue/lagos-artventure',
      image: '/lovable-uploads/5105021d-b044-4cfc-8833-37ce9098c033.png'
    },
    {
      id: 'behind-the-scenes',
      title: 'Behind The Scenes',
      occupancyOptions: [
        { type: 'Single Occupancy', price: 3800 },
        { type: 'Double Occupancy', price: 3200 }
      ],
      description: 'Exclusive Access, 5-Night Hotel Stay, Industry Connections',
      path: '/catalogue/behind-the-scenes',
      image: '/lovable-uploads/98c065bb-d219-401e-90c2-6c8db78dbb40.png'
    },
    {
      id: 'detty-december',
      title: 'Detty December',
      occupancyOptions: [
        { type: 'Single Occupancy', price: 4300 },
        { type: 'Double Occupancy', price: 3600 }
      ],
      description: '6-Night Hotel Stay, Daily Transportation, Exclusive Events',
      path: '/catalogue/detty-december',
      image: '/lovable-uploads/99d1a1e9-33f0-48d1-884c-3aa027ee3443.png'
    }
  ];

  const handleSelectPackage = (pkg: any, occupancyOption: { type: string, price: number }) => {
    const experience: ExperienceType = {
      id: pkg.id,
      title: pkg.title,
      price: occupancyOption.price,
      occupancyType: occupancyOption.type
    };
    
    onSelectPackage(experience);
    onClose();
  };

  const handleViewDetails = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 bg-forest text-white">
          <DialogTitle className="text-2xl font-serif">Select Your Experience</DialogTitle>
          <DialogDescription className="text-white/80">
            Choose from our curated experiences below
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 p-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden border border-border hover:shadow-md transition-all duration-300">
              <CardContent className="p-0">
                <div className={`flex flex-col ${!isMobile ? 'md:flex-row' : ''}`}>
                  <div className="bg-[#FEF7CD] md:w-1/3 relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover aspect-video md:aspect-auto min-h-[150px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-xl font-serif font-medium text-white">{pkg.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-5 md:w-2/3 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-sm md:text-base mb-4">{pkg.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-forest">Choose an option:</h4>
                        <RadioGroup defaultValue={pkg.occupancyOptions[0].type} className="space-y-3">
                          {pkg.occupancyOptions.map((option, idx) => (
                            <div key={idx} className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-forest transition-colors">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value={option.type} id={`${pkg.id}-${option.type}`} className="text-forest" />
                                <label htmlFor={`${pkg.id}-${option.type}`} className="text-sm font-medium">
                                  {option.type}
                                </label>
                              </div>
                              <span className="font-medium text-forest">${option.price}</span>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-end gap-3 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(pkg.path)}
                        className="text-xs border-forest text-forest hover:bg-forest/10"
                      >
                        View Details
                      </Button>
                      {pkg.occupancyOptions.map((option, idx) => (
                        <Button 
                          key={idx}
                          variant="forest" 
                          size="sm"
                          onClick={() => handleSelectPackage(pkg, option)}
                          className="text-xs"
                        >
                          Select {option.type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageSelectionModal;
