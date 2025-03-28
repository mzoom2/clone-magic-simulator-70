
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Testimonial from '@/components/Testimonial';
import Contact from '@/components/Contact';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { useAuthDialogContext } from '@/contexts/AuthDialogProvider';

const Index = () => {
  const { resetAuthDialogState } = useAuthDialogContext();

  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a[href^="#"]');
      
      if (anchorLink) {
        e.preventDefault();
        const targetId = anchorLink.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Adjust for header height
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Reset auth dialog state when landing on home page
  useEffect(() => {
    // This will ensure that the auth dialog can be triggered again after navigation
    resetAuthDialogState();
  }, [resetAuthDialogState]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Testimonial />
      <Contact />
      <ResponsiveFooter />
    </div>
  );
};

export default Index;
