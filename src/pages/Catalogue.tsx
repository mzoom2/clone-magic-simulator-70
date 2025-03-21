
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Catalogue = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-forest">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/5a1a7347-c9ea-4ff3-ade9-175d26811709.png" 
            alt="Catalogue Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        <div className="absolute bottom-16 left-16 md:left-24 text-white z-10">
          <h2 className="text-3xl md:text-4xl font-light text-white">our catalogue,</h2>
        </div>
      </section>

      {/* Catalogue Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest text-center mb-8 md:mb-12">Catalogue Overview</h2>
          
          <p className="text-center text-foreground text-lg md:text-xl leading-relaxed mb-12">
            Explore our diverse range of Nigerian cultural experiences, from tech events to fashion shows and artistic adventures.
            Each category offers unique opportunities to immerse yourself in the vibrant culture and innovation of Nigeria.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Will be populated with actual content when specific catalogue pages are implemented */}
            <div className="bg-[#FEF7CD]/30 p-8 rounded-lg">
              <h3 className="text-xl font-medium text-forest mb-4">Summer Tech</h3>
              <p>Coming soon</p>
            </div>
            <div className="bg-[#FEF7CD]/30 p-8 rounded-lg">
              <h3 className="text-xl font-medium text-forest mb-4">October Tech</h3>
              <p>Coming soon</p>
            </div>
            <div className="bg-[#FEF7CD]/30 p-8 rounded-lg">
              <h3 className="text-xl font-medium text-forest mb-4">Fashion Week</h3>
              <p>Coming soon</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Catalogue;
