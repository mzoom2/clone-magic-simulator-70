
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    } else if (location.pathname.includes('enroll')) {
      setActivePage('Enroll');
    } else if (location.pathname.includes('dashboard')) {
      setActivePage('Dashboard');
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
    // Initial check to set state correctly on page load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = ['Home', 'The Kàábọ̀ Experience', 'Our Vision'];
  
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
      case 'Enroll':
        return '/enroll';
      case 'Dashboard':
        return '/dashboard';
      default:
        return '/';
    }
  };

  const catalogueItems = [
    { name: 'Summer Tech', path: '/catalogue/summer-tech' },
    { name: 'October Tech', path: '/catalogue/october-tech' },
    { name: 'Fashion Week', path: '/catalogue/fashion-week' },
    { name: 'Lagos Artventure', path: '/catalogue/lagos-artventure' },
    { name: 'Behind The Scenes', path: '/catalogue/behind-the-scenes' },
    { name: 'Detty December', path: '/catalogue/detty-december' },
  ];

  // Determine if the current page has a hero section with a transparent navbar
  const hasHeroSection = !location.pathname.includes('enroll') && !location.pathname.includes('dashboard');
  
  // Determine the appropriate background based on scrolled state and current page
  const navbarBackground = scrolled || !hasHeroSection
    ? "bg-white/80 shadow-sm backdrop-blur-md"
    : "bg-black/30 backdrop-blur-sm";

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        navbarBackground
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/"
          className="font-serif text-2xl md:text-3xl font-medium transition-opacity duration-300"
          style={{ 
            color: scrolled || !hasHeroSection ? '#235c35' : 'white',
            opacity: 1 
          }}
        >
          kàábọ̀
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Regular nav items */}
          {navItems.map((item) => (
            <Link 
              key={item} 
              to={getNavItemPath(item)}
              className={cn(
                scrolled || !hasHeroSection ? "text-foreground hover:text-forest transition-colors" : "text-white hover:text-white/80 transition-colors",
                item === activePage && "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-forest"
              )}
            >
              {item}
            </Link>
          ))}
          
          {/* Catalogue dropdown - modified to have separate link and dropdown */}
          <div className="flex items-center gap-1 relative">
            <Link 
              to="/catalogue"
              className={cn(
                scrolled || !hasHeroSection ? "text-foreground hover:text-forest transition-colors" : "text-white hover:text-white/80 transition-colors",
                activePage === 'Catalogue' && "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-forest"
              )}
            >
              Catalogue
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={cn(
                    "flex items-center",
                    scrolled || !hasHeroSection ? "text-foreground hover:text-forest transition-colors" : "text-white hover:text-white/80 transition-colors"
                  )}
                >
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-[#FEF7CD] border-none rounded-none p-0 shadow-md" 
                align="center"
              >
                {catalogueItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild className="p-0">
                    <Link 
                      to={item.path} 
                      className="w-full py-4 px-6 text-forest hover:bg-[#FEF7CD]/80 text-base font-medium border-b border-[#235c35]/10 last:border-0"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
                  color={scrolled || !hasHeroSection ? '#235c35' : 'white'} 
                />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6 w-[80vw] max-w-[300px]">
              <div className="flex justify-end mb-6">
                <SheetClose className="rounded-full hover:bg-gray-100 p-1">
                  <X size={24} className="text-forest" />
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-6 pt-2">
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
                
                {/* Mobile Catalogue link and dropdown */}
                <div className="space-y-4">
                  <Link
                    to="/catalogue"
                    className={cn(
                      "block text-lg font-medium hover:text-forest transition-colors",
                      location.pathname.includes('catalogue') && "text-forest border-b border-forest pb-1"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Catalogue
                  </Link>
                  <div className="pl-4 flex flex-col space-y-3">
                    {catalogueItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="text-base hover:text-forest transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard"
                      className="flex items-center gap-2 text-lg font-medium hover:text-forest transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-lg font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/enroll"
                    className="bg-forest text-white py-3 px-6 rounded-full text-sm font-medium hover:bg-opacity-90 mt-4 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ENROLL NOW
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        )}
        
        {/* Desktop action buttons */}
        <div className={cn("flex items-center gap-4", isMobile ? "hidden" : "flex")}>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 hover:text-forest"
                asChild
              >
                <Link to="/dashboard">
                  <User size={18} />
                  Dashboard
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          ) : (
            <Link 
              to="/enroll"
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 text-center",
                scrolled || !hasHeroSection 
                  ? "bg-forest text-white hover:bg-opacity-90" 
                  : "bg-white text-forest hover:bg-opacity-90"
              )}
            >
              ENROLL NOW
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
