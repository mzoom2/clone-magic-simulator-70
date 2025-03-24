
import React from 'react';
import Navbar from '@/components/Navbar';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PricingCard from '@/components/PricingCard';
import ResponsiveFooter from '@/components/ResponsiveFooter';

const DettyDecember = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-forest">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png" 
            alt="Detty December Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 md:px-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-4 text-center">Detty December</h1>
          <p className="text-center text-sm sm:text-base md:text-lg max-w-3xl">
            Experience the full excitement of Detty December with exclusive access to Lagos' hottest events, shows, after-parties, and more
          </p>
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-lg md:text-xl lg:text-2xl font-light">December 2025</p>
          </div>
        </div>
      </section>

      {/* Package Description */}
      <section className="py-8 md:py-12 bg-black text-white text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">Choose the package that best fits your needs and leave the rest to us.</h2>
          <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-10">
            Hotel, transport, activities, and a week full of activities— it's all covered. You get your flight, we get everything else.
          </p>
          <Button 
            className="bg-[#f8b13f] hover:bg-[#f8b13f]/90 text-black font-medium px-6 md:px-8 py-4 md:py-6 h-auto text-sm md:text-base rounded-full w-full sm:w-auto"
            onClick={() => window.location.href = '/enroll'}
          >
            BOOK NOW
          </Button>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-8 md:py-12 bg-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Double Occupancy Card */}
            <PricingCard
              title="DETTY DECEMBER"
              occupancy="Double Occupancy"
              price="4,300"
              packageId="detty-december"
              features={[
                "6-Night Hotel Stay",
                "Daily Transportation",
                "Meals & Activities"
              ]}
            />

            {/* Single Occupancy Card */}
            <PricingCard
              title="DETTY DECEMBER"
              occupancy="Single Occupancy"
              price="5,000"
              packageId="detty-december"
              features={[
                "6-Night Hotel Stay",
                "Daily Transportation",
                "Meals & Activities"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-8 md:py-12 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-6 md:mb-10 font-serif">Flexible payment options for your convenience:</h2>
          
          <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-[#f8b13f] rounded-full p-1 mt-1 flex-shrink-0">
                <Check size={16} className="text-black" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-medium">One-time Payment:</h3>
                <p className="text-sm md:text-base">Pay in full and enjoy a hassle-free countdown to your journey</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-[#f8b13f] rounded-full p-1 mt-1 flex-shrink-0">
                <Check size={16} className="text-black" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-medium">Installment Plan:</h3>
                <p className="text-sm md:text-base">Pay a 30% deposit to secure your booking, followed by equal payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ResponsiveFooter />
    </div>
  );
};

export default DettyDecember;
