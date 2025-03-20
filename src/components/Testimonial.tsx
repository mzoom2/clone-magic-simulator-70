
import React, { useRef, useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    quote: "My experience with Kàábọ̀ was transformative to say the least. Every day was a new adventure - we met the most inspiring entrepreneurs, I learned about so many different sectors, and of course I can't leave out how much amazing Nigerian food we ate. Kàábọ̀ bridges the gap between business and cultural exploration, making it a must for anyone serious about understanding Nigeria.",
    author: "Lizzie Loves",
    title: "Co-Founder Of Kionji",
    date: "Dec. 2023"
  },
  {
    id: 2,
    quote: "Kàábọ̀ provided an experience that went beyond typical tourism. Their deep local connections gave us access to places and people we never would have encountered otherwise. Our custom itinerary perfectly matched our interests in tech and arts.",
    author: "Michael Chen",
    title: "CEO, Global Ventures",
    date: "Nov. 2023"
  },
  {
    id: 3,
    quote: "After three previous trips to Lagos that barely scratched the surface, Kàábọ̀ finally showed me the real Nigeria. The team's attention to detail and personal connections transformed what could have been just another business trip into a life-changing journey.",
    author: "Sarah Johnson",
    title: "Investment Director",
    date: "Jan. 2024"
  },
  {
    id: 4,
    quote: "Kàábọ̀ truly exceeded my expectations. As a first-time visitor to Nigeria, I was unsure what to expect, but the program opened my eyes to so much potential. The blend of cultural immersion and business insights was perfect. I left feeling not just informed, but truly connected to Nigeria's spirit and possibilities.",
    author: "Charles",
    title: "Entrepreneur",
    date: "Oct. 2023"
  },
  {
    id: 5,
    quote: "Kàábọ̀ is a phenomenal introduction to Nigeria. My partner and I came to Lagos to get a better understanding of the types of opportunities for us to jump into a new venture and we were completely blown away by the experience. From tech, to art, to culture Kaabo offers a 360 degree experience for entrepreneurs and tourists.",
    author: "Emily",
    title: "Business Consultant",
    date: "Oct. 2023"
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [autoplay, setAutoplay] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000); // Change testimonial every 8 seconds
    
    return () => clearInterval(interval);
  }, [autoplay]);

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 px-6 bg-cream relative overflow-hidden"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Decorative elements with animation */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-forest/5 z-0 animate-pulse"></div>
      <div className="absolute top-20 -right-20 w-40 h-40 rounded-full bg-forest/5 z-0 animate-pulse"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className={cn(
              "font-serif text-3xl md:text-5xl mb-2 opacity-0 transform translate-y-4 transition-all duration-700",
              isVisible && "opacity-100 translate-y-0"
            )}>
              Client Stories
            </h2>
            <p className={cn(
              "text-muted-foreground opacity-0 transform translate-y-4 transition-all duration-700 delay-100",
              isVisible && "opacity-100 translate-y-0"
            )}>
              Hear what our guests have to say
            </p>
          </div>
          
          <button 
            onClick={handleNext}
            className="p-3 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div 
          className="relative overflow-hidden rounded-xl bg-white p-8 md:p-12 shadow-sm transition-all duration-500"
          style={{ 
            minHeight: '350px', 
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0 
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={cn(
                "transition-all duration-700 ease-in-out absolute inset-0 p-8 md:p-12 flex flex-col",
                index === currentIndex 
                  ? "opacity-100 translate-x-0 scale-100" 
                  : index < currentIndex 
                    ? "opacity-0 -translate-x-full scale-95" 
                    : "opacity-0 translate-x-full scale-95"
              )}
              style={{
                zIndex: index === currentIndex ? 1 : 0
              }}
            >
              <div className="mb-6 text-2xl font-serif animate-bounce">"</div>
              <p className="text-lg md:text-xl font-serif italic mb-8 text-balance">
                {testimonial.quote}
              </p>
              <div className="mt-auto">
                <p className="font-medium text-forest">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}, {testimonial.date}</p>
              </div>
            </div>
          ))}
          
          {/* Current testimonial for non-absolute layout */}
          <div className="opacity-0 p-8 md:p-12 flex flex-col pointer-events-none">
            <div className="mb-6 text-2xl font-serif">"</div>
            <p className="text-lg md:text-xl font-serif italic mb-8">
              {testimonials[currentIndex].quote}
            </p>
            <div className="mt-auto">
              <p className="font-medium text-forest">{testimonials[currentIndex].author}</p>
              <p className="text-sm text-muted-foreground">
                {testimonials[currentIndex].title}, {testimonials[currentIndex].date}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 transition-all duration-300">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full mx-1.5 transition-all duration-300",
                index === currentIndex 
                  ? "bg-forest scale-125 animate-pulse" 
                  : "bg-forest/30 hover:bg-forest/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom hook for intersection observer (same as in About.tsx and Experience.tsx)
function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%' }
) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, root, rootMargin]);

  return isVisible;
}

export default Testimonial;
