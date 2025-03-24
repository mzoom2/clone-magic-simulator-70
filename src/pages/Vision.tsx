
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BackToTop from '@/components/BackToTop';

const Vision = () => {
  const founderRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  
  // Simple animation on scroll
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
    
    if (founderRef.current) observer.observe(founderRef.current);
    if (visionRef.current) observer.observe(visionRef.current);
    
    return () => {
      if (founderRef.current) observer.unobserve(founderRef.current);
      if (visionRef.current) observer.unobserve(visionRef.current);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-forest">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/5105021d-b044-4cfc-8833-37ce9098c033.png" 
            alt="Kàábọ̀ Founder" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        <div className="absolute bottom-16 left-16 md:left-24 text-white z-10">
          <h2 className="text-3xl md:text-4xl font-light text-white animate-fade-in">small scale projects,</h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mt-2 animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>BIG IMPACT</h1>
        </div>
      </section>

      {/* Our Founder Section */}
      <section ref={founderRef} className="py-16 md:py-24 bg-white opacity-0 translate-y-8 transition-all duration-700">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest text-center mb-8 md:mb-12">Our Founder</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-forest/10 rounded-lg transform rotate-3"></div>
                <img 
                  src="/lovable-uploads/5105021d-b044-4cfc-8833-37ce9098c033.png"
                  alt="Motyat Olatunmbi" 
                  className="relative rounded-lg shadow-lg w-full h-auto z-10"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6">
                Digital entrepreneur Motyat 'Tia Taylor' Olatunmbi established Kàábọ̀ in 2023: a platform that not only welcomes the diaspora but also 
                empowers them to contribute to Nigeria's progress. It's part of an ambition to make a greater Nigeria.
              </p>
              
              <div className="flex justify-start">
                <h3 className="text-xl font-medium text-forest">Motyat Olatunmbi</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Kàábọ̀ Vision Section */}
      <section ref={visionRef} className="py-16 md:py-24 bg-sand opacity-0 translate-y-8 transition-all duration-700">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest text-center mb-8 md:mb-12">The Kàábọ̀ Vision</h2>
          
          <div className="bg-white rounded-lg p-8 shadow-md">
            <p className="text-center text-foreground text-lg md:text-xl leading-relaxed mb-8">
              At Kàábọ̀, we envision a Nigeria that stands as a beacon for its youth and the global community, redefining Africa's role on the world stage.
              Our mission is to ensure a seamless transition for those exploring Nigeria, providing them with the essential tools to fully engage with and
              contribute to the country's development. This initiative goes beyond mere experience; it's about empowering participants to play a
              significant role in Nigeria's progress and, consequently, in shaping the future of Africa. Our approach is more than a welcome; it's a
              catalyst for involvement in a transformative movement that will redefine Nigeria's and Africa's destiny.
            </p>
            
            <div className="flex justify-center mt-6">
              <Button 
                asChild
                className="bg-forest hover:bg-forest/90 text-white group px-6 py-3 h-auto text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link to="/enroll">
                  JOIN OUR VISION
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
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

export default Vision;
