
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('Home'); // Set default active page to Home

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = ['Home', 'The Kàábọ̀ Experience', 'Our Vision', 'Catalogue'];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#" 
          className="font-serif text-2xl md:text-3xl font-medium transition-opacity duration-300"
          style={{ 
            color: scrolled ? '#235c35' : 'white',
            opacity: 1 
          }}
        >
          kàábọ̀
        </a>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={cn(
                scrolled ? "text-foreground hover:text-forest transition-colors" : "nav-link",
                item === activePage && "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-forest"
              )}
            >
              {item}
            </a>
          ))}
        </nav>
        
        {/* Mobile hamburger menu */}
        {isMobile && (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button 
                className="md:hidden focus:outline-none p-1"
                aria-label="Toggle menu"
              >
                <Menu 
                  size={24} 
                  color={scrolled ? '#235c35' : 'white'} 
                />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <nav className="flex flex-col space-y-6 pt-8">
                {navItems.map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cn(
                      "text-lg font-medium hover:text-forest transition-colors",
                      item === activePage && "text-forest border-b border-forest pb-1"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="bg-forest text-white py-3 px-6 rounded-full text-sm font-medium hover:bg-opacity-90 mt-4">
                  ENROLL NOW
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        )}
        
        {/* Enroll button (only shown on desktop when not using the hamburger) */}
        <button className={cn(
          "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
          scrolled 
            ? "bg-forest text-white hover:bg-opacity-90" 
            : "bg-white text-forest hover:bg-opacity-90",
          isMobile ? "hidden" : "block"
        )}>
          ENROLL NOW
        </button>
      </div>
    </header>
  );
};

export default Navbar;
