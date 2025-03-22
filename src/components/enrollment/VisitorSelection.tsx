
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const VisitorSelection = () => {
  const { 
    selectedPackage, 
    occupancyType, 
    visitorCount, 
    setVisitorCount,
    calculateTotalPrice
  } = useEnrollment();
  const navigate = useNavigate();

  const handleIncrement = () => {
    setVisitorCount(prev => Math.min(prev + 1, 10)); // Set a reasonable max
  };

  const handleDecrement = () => {
    setVisitorCount(prev => Math.max(prev - 1, 1)); // Minimum 1 visitor
  };

  const handleBack = () => {
    navigate('/enroll');
  };

  const handleContinue = () => {
    navigate('/enroll/contact');
  };

  if (!selectedPackage || !occupancyType) {
    navigate('/enroll');
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-serif text-forest text-center mb-8">
        How many visitors?
      </h2>
      
      <Card className="border-2 border-gray-200 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Selected Package:</h3>
              <span className="text-forest font-medium">{selectedPackage.title}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Occupancy Type:</h3>
              <span className="capitalize">{occupancyType} Occupancy</span>
            </div>
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Base Price:</h3>
              <span>${occupancyType === 'single' ? selectedPackage.singlePrice : selectedPackage.doublePrice}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Number of Visitors:</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecrement}
                    disabled={visitorCount <= 1}
                    className="h-8 w-8 rounded-full"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-xl font-medium w-8 text-center">{visitorCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncrement}
                    disabled={visitorCount >= 10}
                    className="h-8 w-8 rounded-full"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Total Price:</h3>
                <span className="text-xl font-bold text-forest">${calculateTotalPrice()}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                All prices exclude: International Flights, Personal Shopping, Meals outside designated activities, Travel Insurance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button 
          onClick={handleBack}
          variant="outline"
          className="rounded-full px-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        
        <Button 
          onClick={handleContinue}
          className="bg-forest hover:bg-forest/90 text-white rounded-full px-8 py-6 h-auto text-base font-medium"
        >
          Continue <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default VisitorSelection;
