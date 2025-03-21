
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
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determine active page based on route
  const [activePage, setActivePage] = useState('Home');
  
  useEffect(() => {
    // Set the active page based on the current route
    if (location.pathname === '/') {
      setActivePage('Home');
    } else if (location.pathname === '/experience') {
      setActivePage('The Kàábọ̀ Experience');
    } else if (location.pathname.includes('vision')) {
      setActivePage('Our Vision');
    } else if (location.pathname.includes('catalogue')) {
      setActivePage('Catalogue');
    }
  }, [location]);

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
  
  // Function to get the link path for each nav item
  const getNavItemPath = (item: string) => {
    switch (item) {
      case 'Home':
        return '/';
      case 'The Kàábọ̀ Experience':
        return '/experience';
      case 'Our Vision':
        return '/vision';
      case 'Catalogue':
        return '/catalogue';
      default:
        return '/';
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/"
          className="font-serif text-2xl md:text-3xl font-medium transition-opacity duration-300"
          style={{ 
            color: scrolled ? '#235c35' : 'white',
            opacity: 1 
          }}
        >
          kàábọ̀
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item} 
              to={getNavItemPath(item)}
              className={cn(
                scrolled ? "text-foreground hover:text-forest transition-colors" : "nav-link",
                item === activePage && "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-forest"
              )}
            >
              {item}
            </Link>
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
                  <Link 
                    key={item} 
                    to={getNavItemPath(item)}
                    className={cn(
                      "text-lg font-medium hover:text-forest transition-colors",
                      item === activePage && "text-forest border-b border-forest pb-1"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
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
