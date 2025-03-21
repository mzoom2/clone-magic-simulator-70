
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ResponsiveFooter = () => {
  return (
    <footer className="bg-[#3a4d28] text-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Logo and Tagline */}
          <div>
            <img 
              src="/lovable-uploads/3f0dd4b3-98f9-401c-beb6-ec25972e659d.png" 
              alt="Kàábọ̀ Logo" 
              className="h-16 mb-6" 
            />
            <div className="space-y-1">
              <p className="font-medium text-lg">Experience, Explore, Elevate:</p>
              <p className="text-base">Nigeria like you have never seen it</p>
            </div>
          </div>
          
          {/* Column 2: Contact Info */}
          <div className="flex flex-col justify-center md:items-center">
            <h3 className="text-2xl font-serif mb-6">Contact Info</h3>
            <p className="text-xl font-bold mb-2">KAABO INC</p>
            <p className="text-base">info@experiencekaabo.com</p>
          </div>
          
          {/* Column 3: Newsletter */}
          <div className="flex flex-col justify-center md:items-end">
            <h3 className="text-2xl font-serif mb-6">Subscribe To Our Newsletter</h3>
            <div className="flex flex-col gap-4 w-full md:max-w-xs">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white rounded-md px-4 py-2 text-black border-white"
              />
              <Button 
                variant="outline" 
                className="bg-[#e6d7c3] hover:bg-[#e6d7c3]/90 text-forest border-none text-base font-medium rounded-md"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-16 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Kaabo. All Rights Reserved.</p>
          
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6 md:mt-0">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-white hover:text-white/80">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-white/80">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-white/80">
                <Linkedin size={24} />
              </a>
            </div>
            
            <Link to="/cookie-policy" className="text-white hover:underline">
              Cookie Policy (EU)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
