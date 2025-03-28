
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PricingCard from '@/components/PricingCard';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import BackToTop from '@/components/BackToTop';
import { useAuthDialogContext } from '@/contexts/AuthDialogProvider';
import { assetPaths } from '@/utils/assetPaths';

const SummerTech = () => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { checkAuthAndProceed, resetAuthDialogState } = useAuthDialogContext();
  
  // Reset auth dialog state when the component mounts
  useEffect(() => {
    resetAuthDialogState();
  }, [resetAuthDialogState]);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (pricingRef.current) observer.observe(pricingRef.current);
    if (paymentRef.current) observer.observe(paymentRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const handleBookNow = () => {
    checkAuthAndProceed('/enroll?package=summer-tech', () => {
      navigate('/enroll?package=summer-tech');
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-forest">
        <div className="absolute inset-0">
          <img 
            src={assetPaths.images.backgrounds.package} 
            alt="Summer Tech Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 md:px-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-4 text-center animate-fade-in">Summer Tech</h1>
          <p className="text-center text-sm sm:text-base md:text-lg max-w-3xl animate-fade-in opacity-0" style={{ animationDelay: '200ms' }}>
            Engage with industry leaders and innovators from across the continent during Africa's biggest open source conference.
          </p>
          <div className="mt-4 md:mt-6 text-center animate-fade-in opacity-0" style={{ animationDelay: '400ms' }}>
            <p className="text-lg md:text-xl lg:text-2xl font-light">JUNE 19TH - 21ST, 2025</p>
          </div>
        </div>
      </section>

      {/* Package Description */}
      <section ref={descriptionRef} className="py-8 md:py-12 bg-black text-white text-center opacity-0 translate-y-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">Choose the package that best fits your needs and leave the rest to us.</h2>
          <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-10">
            Hotel, transport, activities, and a week full of activities— it's all covered. You get your flight, we get everything else.
          </p>
          <Button 
            className="bg-[#f8b13f] hover:bg-[#f8b13f]/90 text-black font-medium px-6 md:px-8 py-4 md:py-6 h-auto text-sm md:text-base rounded-full w-full sm:w-auto group"
            onClick={handleBookNow}
          >
            BOOK NOW
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section ref={pricingRef} className="py-8 md:py-12 bg-black opacity-0 translate-y-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Double Occupancy Card */}
            <PricingCard
              title="SUMMER TECH"
              occupancy="Double Occupancy"
              price="1,900"
              packageId="summer-tech"
              features={[
                "Conference Access",
                "2-Night Hotel Stay",
                "Personal Car & Driver",
                "Meals & Activities",
                "Introductions"
              ]}
              onBookNow={handleBookNow}
            />

            {/* Single Occupancy Card */}
            <PricingCard
              title="SUMMER TECH"
              occupancy="Single Occupancy"
              price="2,400"
              packageId="summer-tech"
              features={[
                "Conference Access",
                "2-Night Hotel Stay",
                "Personal Car & Driver",
                "Meals & Activities",
                "Introductions"
              ]}
              onBookNow={handleBookNow}
            />
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section ref={paymentRef} className="py-8 md:py-12 bg-black text-white opacity-0 translate-y-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-center mb-6 md:mb-10 font-serif">Flexible payment options for your convenience:</h2>
          
          <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 md:gap-4 hover:bg-white/5 p-4 rounded-lg transition-colors duration-300">
              <div className="bg-[#f8b13f] rounded-full p-1 mt-1 flex-shrink-0">
                <Check size={16} className="text-black" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-medium">One-time Payment:</h3>
                <p className="text-sm md:text-base">Pay in full and enjoy a hassle-free countdown to your journey</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4 hover:bg-white/5 p-4 rounded-lg transition-colors duration-300">
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

      <BackToTop />
      
      {/* Footer */}
      <ResponsiveFooter />
    </div>
  );
};

export default SummerTech;
