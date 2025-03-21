
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { PlayCircle, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

const experiencePhotos = [
  {
    id: 1,
    title: "Lagos Market Tour",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=1200",
  },
  {
    id: 2,
    title: "Traditional Ceremonies",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
  },
  {
    id: 3,
    title: "Culinary Workshops",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200",
  },
  {
    id: 4,
    title: "Tech Meetups",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1200",
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const arePhotosVisible = useIntersectionObserver(photosRef, { threshold: 0.1 });

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
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
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
        
        {/* Photo Gallery Section */}
        <div ref={photosRef} className="mt-16">
          <h3 className={cn(
            "font-serif text-2xl md:text-3xl mb-8 text-center opacity-0 transform translate-y-4 transition-all duration-700",
            arePhotosVisible && "opacity-100 translate-y-0"
          )}>
            Photo Gallery
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiencePhotos.map((photo, index) => (
              <Card 
                key={photo.id}
                className={cn(
                  "overflow-hidden opacity-0 transform translate-y-4 transition-all duration-700",
                  arePhotosVisible && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <AspectRatio ratio={4/3} className="bg-muted">
                    <img 
                      src={photo.image} 
                      alt={photo.title} 
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-white font-medium">{photo.title}</h4>
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>
            ))}
          </div>
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
