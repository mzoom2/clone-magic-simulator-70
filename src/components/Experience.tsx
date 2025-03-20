
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { PlayCircle, Volume2 } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Cultural Immersion",
    thumbnail: "https://images.unsplash.com/photo-1571144411928-22a1363be0f6?q=80&w=1000",
    video: "#"
  },
  {
    id: 2,
    title: "Business Connect",
    thumbnail: "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?q=80&w=1000",
    video: "#"
  },
  {
    id: 3,
    title: "Heritage Exploration",
    thumbnail: "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=1000",
    video: "#"
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 px-6 bg-sand/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={cn(
            "font-serif text-3xl md:text-5xl mb-4 opacity-0 transform translate-y-4 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}>
            Past Experiences
          </h2>
          <p className={cn(
            "max-w-2xl mx-auto text-muted-foreground opacity-0 transform translate-y-4 transition-all duration-700 delay-100",
            isVisible && "opacity-100 translate-y-0"
          )}>
            Discover the transformative journeys our guests have experienced with Kàábọ̀
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              className={cn(
                "video-card group opacity-0 transform translate-y-4 transition-all duration-700",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <img 
                src={exp.thumbnail} 
                alt={exp.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <PlayCircle className="w-14 h-14 text-white opacity-90 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white text-lg font-medium">{exp.title}</h3>
              </div>
              
              <div className="absolute bottom-4 right-4">
                <Volume2 className="w-5 h-5 text-white opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom hook for intersection observer (same as in About.tsx)
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

export default Experience;
