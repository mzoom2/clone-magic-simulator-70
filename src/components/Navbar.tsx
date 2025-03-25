
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, LogOut, User, Home, Compass } from "lucide-react";
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
    
    // Remove any "dialog closed" flags from session storage when logging out
    sessionStorage.removeItem('auth_dialog_closed');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-4",
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
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
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
        
        {/* Mobile hamburger menu - improved version */}
        {isMobile && (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button 
                className="md:hidden focus:outline-none p-1.5 rounded-md hover:bg-black/5"
                aria-label="Toggle menu"
              >
                <Menu 
                  size={24} 
                  color={scrolled || !hasHeroSection ? '#235c35' : 'white'} 
                />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-[80vw] max-w-[300px] border-l border-forest/20">
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="p-4 border-b border-forest/10 flex items-center justify-between">
                  <span className="font-serif text-xl text-forest">kàábọ̀</span>
                  <SheetClose className="rounded-full p-1.5 hover:bg-gray-100">
                    <X size={20} className="text-forest" />
                  </SheetClose>
                </div>
                
                {/* User section if logged in */}
                {isAuthenticated && user && (
                  <div className="px-4 py-3 border-b border-forest/10 bg-forest/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-forest/20 flex items-center justify-center">
                        <User size={18} className="text-forest" />
                      </div>
                      <div>
                        <p className="font-medium text-forest">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-forest/70">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Mobile navigation menu */}
                <div className="flex-1 overflow-auto py-2">
                  <nav className="flex flex-col">
                    {/* Dashboard link for logged in users */}
                    {isAuthenticated && (
                      <Link 
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-3 text-forest hover:bg-forest/5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Home size={18} />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    
                    {/* Explore link only for authenticated users */}
                    {isAuthenticated && (
                      <Link 
                        to="/enroll"
                        className="flex items-center gap-2 px-4 py-3 text-forest hover:bg-forest/5"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Compass size={18} />
                        <span>Explore</span>
                      </Link>
                    )}
                    
                    {/* Main navigation items */}
                    {navItems.map((item) => (
                      <Link 
                        key={item} 
                        to={getNavItemPath(item)}
                        className={cn(
                          "px-4 py-3 hover:bg-forest/5",
                          item === activePage ? "text-forest font-medium" : "text-gray-700"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                    
                    {/* Catalogue section */}
                    <div className="px-4 py-3 hover:bg-forest/5">
                      <Link
                        to="/catalogue"
                        className={cn(
                          "block",
                          location.pathname.includes('catalogue') ? "text-forest font-medium" : "text-gray-700"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Catalogue
                      </Link>
                    </div>
                    
                    {/* Catalogue items with indentation */}
                    <div className="pl-8 pr-4 pb-2 space-y-1">
                      {catalogueItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block py-2 text-sm text-gray-600 hover:text-forest"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
                
                {/* Mobile menu footer with auth actions */}
                <div className="mt-auto p-4 border-t border-forest/10">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <Link 
                      to="/enroll"
                      className="block w-full text-center bg-forest text-white py-2.5 px-6 rounded-md font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ENROLL NOW
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        {/* Desktop action buttons */}
        <div className={cn("flex items-center gap-4", isMobile ? "hidden" : "flex")}>
          {/* Explore button only for authenticated users */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2",
                scrolled || !hasHeroSection ? "text-forest hover:bg-forest/10" : "text-white hover:bg-white/10"
              )}
              asChild
            >
              <Link to="/enroll">
                <Compass size={18} />
                <span>Explore</span>
              </Link>
            </Button>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 hover:text-forest"
                  >
                    <User size={18} />
                    <span className="hidden xl:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <Home size={16} />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600 cursor-pointer">
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
