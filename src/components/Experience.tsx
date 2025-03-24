
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { PlayCircle, Volume2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    title: "Nigerian Art Exhibition",
    image: "/lovable-uploads/96279a5f-6291-4c07-9ed1-946fbc4ae3dc.png",
  },
  {
    id: 2,
    title: "Olumo Rock Experience",
    image: "/lovable-uploads/99d1a1e9-33f0-48d1-884c-3aa027ee3443.png",
  },
  {
    id: 3,
    title: "Scenic View of Abeokuta",
    image: "/lovable-uploads/98c065bb-d219-401e-90c2-6c8db78dbb40.png",
  },
  {
    id: 4,
    title: "National Theatre Lagos",
    image: "/lovable-uploads/5617c3ad-1f1f-4878-ae9a-40862d14df7b.png",
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const bookNowRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const arePhotosVisible = useIntersectionObserver(photosRef, { threshold: 0.1 });
  const isBookNowVisible = useIntersectionObserver(bookNowRef, { threshold: 0.1 });

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 px-6 bg-gradient-to-b from-sand/30 to-sand/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-cream/50 animate-pulse opacity-30"></div>
          <div className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full bg-forest/10 animate-pulse opacity-40 delay-700"></div>
          
          <h2 className={cn(
            "font-serif text-3xl md:text-5xl mb-4 opacity-0 transform translate-y-4 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}>
            Past Experiences
          </h2>
          <div className={cn(
            "w-20 h-1 bg-amber-500 mx-auto mb-6 opacity-0 scale-x-0 transition-all duration-500 delay-300", 
            isVisible && "opacity-100 scale-x-100"
          )}></div>
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
                "video-card group opacity-0 transform translate-y-4 transition-all duration-700 relative overflow-hidden rounded-lg h-60 md:h-80 cursor-pointer shadow-lg hover:shadow-xl",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <img 
                src={exp.thumbnail} 
                alt={exp.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white opacity-90 mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
                <h3 className="text-white text-xl font-medium font-serif">{exp.title}</h3>
                <div className={cn(
                  "w-10 h-0.5 bg-white/70 mt-3 scale-x-0 transition-transform duration-300 delay-75",
                  "group-hover:scale-x-100"
                )}></div>
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
                  "overflow-hidden opacity-0 transform translate-y-4 transition-all duration-700 hover:shadow-lg border-transparent hover:border-amber-200/50",
                  arePhotosVisible && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
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
                      <h4 className="text-white font-medium transform translate-y-0 transition-transform duration-300 hover:translate-y-[-3px]">{photo.title}</h4>
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div ref={bookNowRef} className="mt-20 text-center">
          <div className={cn(
            "p-8 bg-forest/5 rounded-xl border border-forest/10 opacity-0 transform translate-y-4 transition-all duration-700",
            isBookNowVisible && "opacity-100 translate-y-0"
          )}>
            <h3 className="font-serif text-2xl md:text-3xl mb-4">Ready to Experience Nigeria?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join us for a transformative journey that will connect you with the vibrant culture, 
              business opportunities, and unforgettable experiences of Nigeria.
            </p>
            <Button 
              asChild
              className="bg-forest hover:bg-forest/90 text-white group px-6 py-6 h-auto text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/enroll">
                BOOK NOW
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
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
