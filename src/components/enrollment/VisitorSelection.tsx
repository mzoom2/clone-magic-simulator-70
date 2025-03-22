
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const VisitorSelection = () => {
  const { selectedPackage, occupancyType, visitorCount, setVisitorCount, calculateTotalPrice } = useEnrollment();
  const navigate = useNavigate();

  const handleIncrease = () => {
    setVisitorCount(visitorCount + 1);
  };

  const handleDecrease = () => {
    if (visitorCount > 1) {
      setVisitorCount(visitorCount - 1);
    }
  };

  useEffect(() => {
    if (!selectedPackage || !occupancyType) {
      navigate('/enroll');
    }
  }, [selectedPackage, occupancyType, navigate]);

  if (!selectedPackage || !occupancyType) {
    return null;
  }

  // Get the base price per person
  const basePrice = occupancyType === 'single' 
    ? selectedPackage.singlePrice 
    : selectedPackage.doublePrice;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-serif text-forest text-center mb-8">
        How many visitors?
      </h2>
      
      <Card className="border-2 border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-forest">{selectedPackage.title}</h3>
              <p className="text-sm text-gray-500">{occupancyType === 'single' ? 'Single' : 'Double'} Occupancy</p>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p className="text-sm text-gray-500">Price per person</p>
              <p className="text-lg font-medium">
                ${basePrice}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-4 py-6 border-y border-gray-200">
            <p className="text-sm text-gray-600">Select the number of visitors</p>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
                onClick={handleDecrease}
                disabled={visitorCount <= 1}
              >
                <Minus size={18} />
              </Button>
              <div className="mx-8 text-3xl font-medium">{visitorCount}</div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
                onClick={handleIncrease}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
          
          <div className="mt-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Price:</span>
              <span className="text-xl font-bold text-forest">${calculateTotalPrice()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">
              Price for {visitorCount} {visitorCount === 1 ? 'visitor' : 'visitors'}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between mt-6 space-y-3 md:space-y-0">
            <Button
              variant="outline"
              onClick={() => navigate('/enroll')}
              className="rounded-full px-6"
            >
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
            <Button
              onClick={() => navigate('/enroll/contact')}
              className="bg-forest hover:bg-forest/90 text-white rounded-full px-6"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorSelection;
