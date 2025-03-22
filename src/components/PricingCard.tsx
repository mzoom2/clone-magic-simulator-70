
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  occupancy: string;
  price: string;
  features: string[];
}

const PricingCard = ({ title, occupancy, price, features }: PricingCardProps) => {
  return (
    <Card className="overflow-hidden rounded-none border-none w-full">
      <div className="bg-[#FEF7CD] py-4 md:py-6 text-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-forest">
          {title}
        </h3>
        <p className="text-forest">{occupancy}</p>
      </div>
      <CardContent className="p-0">
        <div className="pt-6 md:pt-8 pb-3 md:pb-4 text-center">
          <div className="inline-flex items-baseline">
            <span className="text-forest text-xl align-top">$</span>
            <span className="text-forest text-4xl md:text-6xl font-medium">
              {price}
            </span>
            <span className="text-forest text-lg">pp</span>
          </div>
        </div>
        <div className="space-y-3 md:space-y-4 px-4 md:px-6 pb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center py-2 border-b border-gray-200">
              <Check size={18} className="text-forest mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">{feature}</span>
            </div>
          ))}
          <div className="pt-4 md:pt-6 pb-2 text-center">
            <Button asChild className="bg-[#6d2a12] hover:bg-[#6d2a12]/90 text-white rounded-full px-6 md:px-8 py-4 md:py-6 h-auto text-sm md:text-base font-medium w-full md:w-auto">
              <Link to="/enroll">ENROLL NOW</Link>
            </Button>
          </div>
          <div className="text-center text-xs md:text-sm text-gray-600 mt-3 md:mt-4 px-2 md:px-4">
            <p>
              All prices exclude: International Flights,<br />
              Personal Shopping, Meals outside<br />
              designated activities, Travel Insurance
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
