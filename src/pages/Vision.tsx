
import React from 'react';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { Button } from '@/components/ui/button';

const Vision = () => {
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
          <h2 className="text-3xl md:text-4xl font-light text-white">small scale projects,</h2>
        </div>
      </section>

      {/* Our Founder Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest text-center mb-8 md:mb-12">Our Founder</h2>
          
          <p className="text-center text-foreground text-lg md:text-xl leading-relaxed">
            Digital entrepreneur Motyat 'Tia Taylor' Olatunmbi established Kàábọ̀ in 2023: a platform that not only welcomes the diaspora but also 
            empowers them to contribute to Nigeria's progress. It's part of an ambition to make a greater Nigeria.
          </p>
          
          <div className="flex justify-center mt-8">
            <h3 className="text-xl font-medium text-forest">Motyat Olatunmbi</h3>
          </div>
        </div>
      </section>
      
      {/* The Kàábọ̀ Vision Section */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest text-center mb-8 md:mb-12">The Kàábọ̀ Vision</h2>
          
          <p className="text-center text-foreground text-lg md:text-xl leading-relaxed">
            At Kàábọ̀, we envision a Nigeria that stands as a beacon for its youth and the global community, redefining Africa's role on the world stage.
            Our mission is to ensure a seamless transition for those exploring Nigeria, providing them with the essential tools to fully engage with and
            contribute to the country's development. This initiative goes beyond mere experience; it's about empowering participants to play a
            significant role in Nigeria's progress and, consequently, in shaping the future of Africa. Our approach is more than a welcome; it's a
            catalyst for involvement in a transformative movement that will redefine Nigeria's and Africa's destiny.
          </p>
        </div>
      </section>

      {/* Footer */}
      <ResponsiveFooter />
    </div>
  );
};

export default Vision;
