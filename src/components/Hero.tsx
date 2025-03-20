
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/lovable-uploads/1bfbcad9-04e3-445e-8d19-840a15a1642a.png" 
          alt="Aerial view of Nigeria" 
          className="w-full h-full object-cover"
          style={{
            opacity: isLoaded ? 1 : 0.3,
            transition: 'opacity 1.5s ease-in-out'
          }}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <h1 
            className={cn(
              "font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 opacity-0",
              isLoaded && "animate-fade-up opacity-100"
            )}
            style={{ animationDelay: '0.3s' }}
          >
            Nigeria like you have never seen it
          </h1>
          <div 
            className={cn(
              "max-w-3xl opacity-0",
              isLoaded && "animate-fade-up opacity-100" 
            )}
            style={{ animationDelay: '0.6s' }}
          >
            <a href="#about" className="btn-primary inline-block mt-6">
              Discover More
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0",
          isLoaded && "animate-fade-in opacity-100"
        )}
        style={{ animationDelay: '1.2s' }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
