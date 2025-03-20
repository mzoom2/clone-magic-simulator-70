
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-16 text-center">
          <p className={cn(
            "text-forest font-medium mb-3 opacity-0 transform translate-y-4 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}>
            WELCOME TO KÀÁBỌ̀
          </p>
          <h2 className={cn(
            "font-serif text-3xl md:text-5xl opacity-0 transform translate-y-4 transition-all duration-700 delay-100",
            isVisible && "opacity-100 translate-y-0"
          )}>
            A premier travel consulting service
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className={cn(
              "mb-6 opacity-0 transform translate-y-4 transition-all duration-700 delay-200",
              isVisible && "opacity-100 translate-y-0"
            )}>
              <span className="font-serif italic text-xl">Kàábọ̀</span>, meaning 'you are welcome' in Yorùbá, is a premier travel consulting and concierge service that <strong>offers personalized, immersive experiences of Nigeria for travelers from all walks of life</strong>.
            </p>
            <p className={cn(
              "mb-6 opacity-0 transform translate-y-4 transition-all duration-700 delay-300",
              isVisible && "opacity-100 translate-y-0"
            )}>
              We work closely with you to understand your interests and preferences, using this insight to develop a bespoke program tailored specifically to your group. Over the course of your stay, you'll experience Nigeria's culture, industries, and heritage.
            </p>
            <p className={cn(
              "mb-6 opacity-0 transform translate-y-4 transition-all duration-700 delay-400",
              isVisible && "opacity-100 translate-y-0"
            )}>
              From accommodations, transportation, and meals to exclusive access to events and local industry leaders, <strong>every detail is handled seamlessly by the Kàábọ̀ team</strong>.
            </p>
            <p className={cn(
              "opacity-0 transform translate-y-4 transition-all duration-700 delay-500",
              isVisible && "opacity-100 translate-y-0"
            )}>
              Our all-inclusive packages ensure that by the time you leave, you'll not only have unforgettable memories but also the confidence and knowledge to navigate and explore Nigeria on your own for future visits. <strong>Kàábọ̀ opens the doors to a Nigeria you've never seen before</strong>.
            </p>
          </div>
          
          <div className={cn(
            "relative h-96 rounded-lg overflow-hidden opacity-0 transform translate-y-4 transition-all duration-700 delay-600",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <div className="absolute inset-0 bg-forest/20 z-10 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1504598318550-17eba1008a68?q=80&w=1000" 
              alt="Nigerian cultural experience" 
              className="w-full h-full object-cover object-center rounded-lg transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom hook for intersection observer
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

export default About;
