
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuthDialogContext } from '@/contexts/AuthDialogProvider';

interface PricingCardProps {
  title: string;
  occupancy: string;
  price: string;
  packageId: string;
  features: string[];
  onBookNow?: () => void;
}

const PricingCard = ({ 
  title, 
  occupancy, 
  price, 
  packageId, 
  features,
  onBookNow 
}: PricingCardProps) => {
  const { checkAuthAndProceed, resetAuthDialogState } = useAuthDialogContext();
  
  const handleBookNow = () => {
    // Always reset dialog state before checking auth
    resetAuthDialogState();
    
    if (onBookNow) {
      onBookNow();
    } else {
      checkAuthAndProceed(`/enroll?package=${packageId}`, () => {
        window.location.href = `/enroll?package=${packageId}`;
      });
    }
  };
  
  return (
    <div className="bg-black border border-gray-800 rounded-lg overflow-hidden text-white transition-all hover:border-white/30 flex flex-col">
      <div className="bg-white/10 p-6 text-center">
        <h3 className="text-lg md:text-xl font-medium text-amber-400 mb-1">{title}</h3>
        <p className="opacity-80 text-sm mb-4">{occupancy}</p>
        <div className="text-center">
          <span className="text-3xl md:text-4xl font-serif">
            <sup className="text-lg relative -top-3">$</sup>
            {price}
          </span>
          <span className="text-sm opacity-70 ml-1">USD</span>
        </div>
      </div>
      
      <div className="flex-grow p-6">
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1 text-amber-400">
                <Check size={16} />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium group py-2 h-auto"
          onClick={handleBookNow}
        >
          BOOK NOW
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
