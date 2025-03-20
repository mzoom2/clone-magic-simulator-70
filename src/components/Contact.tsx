
import React, { useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={cn(
              "font-serif text-3xl md:text-5xl mb-6 opacity-0 transform translate-y-4 transition-all duration-700",
              isVisible && "opacity-100 translate-y-0"
            )}>
              Start Your Journey
            </h2>
            <p className={cn(
              "text-gray-300 mb-8 opacity-0 transform translate-y-4 transition-all duration-700 delay-100",
              isVisible && "opacity-100 translate-y-0"
            )}>
              We don't just take you home, we get you up and running.
            </p>
            
            <div className={cn(
              "mb-12 opacity-0 transform translate-y-4 transition-all duration-700 delay-200",
              isVisible && "opacity-100 translate-y-0"
            )}>
              <h3 className="text-xl font-serif mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-300">
                <p>KÀÁBỌ̀ INC</p>
                <p>info@experiencekaabo.com</p>
              </div>
            </div>
            
            <div className={cn(
              "opacity-0 transform translate-y-4 transition-all duration-700 delay-300",
              isVisible && "opacity-100 translate-y-0"
            )}>
              <h3 className="text-xl font-serif mb-4">Subscribe to Our Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-gray-800 border-0 rounded-l-md py-3 px-4 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-forest focus:outline-none w-full"
                />
                <button className="bg-forest text-white py-3 px-5 rounded-r-md hover:bg-opacity-90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "opacity-0 transform translate-y-4 transition-all duration-700 delay-400",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl">
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium">Full Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-0 rounded-md py-3 px-4 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-forest focus:outline-none w-full"
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-0 rounded-md py-3 px-4 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-forest focus:outline-none w-full"
                  placeholder="Your email"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-gray-700 border-0 rounded-md py-3 px-4 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-forest focus:outline-none w-full resize-none"
                  placeholder="Your message"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-forest hover:bg-opacity-90 text-white font-medium py-3 rounded-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom hook for intersection observer (same as in previous components)
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

export default Contact;
