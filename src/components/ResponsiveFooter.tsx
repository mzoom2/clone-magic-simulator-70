
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const ResponsiveFooter = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-[#3a4d28] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo + Tagline */}
          <div>
            <img 
              src="/lovable-uploads/5105021d-b044-4cfc-8833-37ce9098c033.png" 
              alt="Kàábọ̀ Logo" 
              className="h-12 md:h-16 mb-4" 
            />
            <p className="font-serif text-lg md:text-xl">Experience, Explore, Elevate:</p>
            <p>Nigeria like you have never seen it</p>
          </div>
          
          {/* Contact Info */}
          <div className={isMobile ? "" : "md:text-center"}>
            <h3 className="text-xl mb-4">Contact Info</h3>
            <p className="font-bold">KAABO INC</p>
            <p>info@experiencekaabo.com</p>
          </div>
          
          {/* Newsletter */}
          <div className={isMobile ? "" : "md:text-right"}>
            <h3 className="text-xl mb-4">Subscribe To Our Newsletter</h3>
            <div className="flex flex-col md:flex-row items-center gap-2 md:justify-end">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white rounded-full px-4 py-2 text-black w-full md:w-auto"
              />
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-forest rounded-full whitespace-nowrap w-full md:w-auto mt-2 md:mt-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Kaabo. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/cookie-policy" className="hover:underline">
              Cookie Policy (EU)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
