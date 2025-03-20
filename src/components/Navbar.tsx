
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'The Kàábọ̀ Experience', 'Our Vision', 'Catalogue'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={scrolled ? "text-foreground hover:text-forest transition-colors" : "nav-link"}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <button className={cn(
          "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
          scrolled 
            ? "bg-forest text-white hover:bg-opacity-90" 
            : "bg-white text-forest hover:bg-opacity-90"
        )}>
          ENROLL NOW
        </button>
      </div>
    </header>
  );
};

export default Navbar;
