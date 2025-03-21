
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import { useBooking, ExperienceType } from '@/contexts/BookingContext';

interface PackageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (experience: ExperienceType) => void;
}

const PackageSelectionModal = ({ isOpen, onClose, onSelectPackage }: PackageSelectionModalProps) => {
  const navigate = useNavigate();
  
  // Define all available packages
  const packages = [
    {
      id: 'summer-tech',
      title: 'Summer Tech',
      price: 1900,
      occupancyType: 'Standard Package',
      description: 'Conference Access, 2-Night Hotel Stay, Personal Car & Driver',
      path: '/catalogue/summer-tech'
    },
    {
      id: 'october-tech',
      title: 'October Tech',
      price: 2200,
      occupancyType: 'Standard Package',
      description: 'Conference Access, 3-Night Hotel Stay, Personal Car & Driver',
      path: '/catalogue/october-tech'
    },
    {
      id: 'fashion-week',
      title: 'Fashion Week',
      price: 2500,
      occupancyType: 'Standard Package',
      description: 'Show Access, 3-Night Hotel Stay, Personal Shopping Assistant',
      path: '/catalogue/fashion-week'
    },
    {
      id: 'lagos-artventure',
      title: 'Lagos Artventure',
      price: 3200,
      occupancyType: 'Standard Package',
      description: 'Guided Art Tours, 4-Night Hotel Stay, Cultural Experiences',
      path: '/catalogue/lagos-artventure'
    },
    {
      id: 'behind-the-scenes',
      title: 'Behind The Scenes',
      price: 3800,
      occupancyType: 'Standard Package',
      description: 'Exclusive Access, 5-Night Hotel Stay, Industry Connections',
      path: '/catalogue/behind-the-scenes'
    },
    {
      id: 'detty-december',
      title: 'Detty December',
      price: 4300,
      occupancyType: 'Standard Package',
      description: '6-Night Hotel Stay, Daily Transportation, Exclusive Events',
      path: '/catalogue/detty-december'
    }
  ];

  const handleSelectPackage = (pkg: any) => {
    const experience: ExperienceType = {
      id: pkg.id,
      title: pkg.title,
      price: pkg.price,
      occupancyType: pkg.occupancyType
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
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Select Your Experience</DialogTitle>
          <DialogDescription>
            Choose from our curated experiences below
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <CardContent className="p-0 flex flex-col md:flex-row">
                <div className="bg-[#FEF7CD] p-4 md:w-1/3 flex flex-col justify-center items-center text-center">
                  <h3 className="text-lg font-medium text-forest">{pkg.title}</h3>
                  <p className="text-forest text-lg font-bold mt-1">${pkg.price}</p>
                  <p className="text-forest text-xs">per person</p>
                </div>
                <div className="p-4 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <p className="text-sm mb-2">{pkg.description}</p>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button 
                      onClick={() => handleViewDetails(pkg.path)}
                      className="px-3 py-1 text-xs border border-forest text-forest rounded-full hover:bg-forest/10 transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleSelectPackage(pkg)}
                      className="px-3 py-1 text-xs bg-forest text-white rounded-full hover:bg-forest/90 transition-colors"
                    >
                      Select Package
                    </button>
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
