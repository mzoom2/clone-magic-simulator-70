
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

      {/* Info Section (Footer Alternative) */}
      <section className="bg-forest text-white py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Column 1: Logo and slogan */}
            <div className="flex flex-col space-y-4">
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120Z" fill="#3A5A40" fillOpacity="0.2"/>
                  <path d="M30.5 53.5V67.5M30.5 67.5V95.5M30.5 67.5H48M84.5 40.5V67.5M84.5 67.5V95.5M84.5 67.5H66.5" stroke="white" strokeWidth="4"/>
                </svg>
              </div>
              <p className="font-medium">Experience, Explore, Elevate:</p>
              <p>Nigeria like you have never seen it</p>
            </div>
            
            {/* Column 2: Contact Info */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-medium mb-4">Contact Info</h3>
              <p className="font-medium">KAABO INC</p>
              <p>info@experiencekaabo.com</p>
            </div>
            
            {/* Column 3: Newsletter */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-medium mb-4">Subscribe To Our Newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/10 border border-white/30 rounded px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="bg-white text-forest hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom bar with copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-white/20">
            <p>© 2025 Kaabo, All Rights Reserved.</p>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex space-x-4 mr-8">
                <a href="#" className="text-white hover:text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              
              <a href="#" className="text-white hover:underline">Cookie Policy (EU)</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
