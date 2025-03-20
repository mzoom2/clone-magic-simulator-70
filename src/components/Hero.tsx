
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

      {/* Content - removed heading and button */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Heading and button removed */}
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
