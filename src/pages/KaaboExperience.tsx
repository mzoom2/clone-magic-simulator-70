
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, ChevronRight } from 'lucide-react';

const KaaboExperience = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px]">
        <div className="absolute inset-0 bg-black/50">
          <img 
            src="https://images.unsplash.com/photo-1536599424071-0b215a388ba7?q=80&w=1000" 
            alt="Kaabo Experience" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">The Kàábọ̀ Experience</h1>
          <p className="max-w-2xl text-lg md:text-xl">
            Your immersive journey through the heart of Nigeria
          </p>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="bg-forest text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Experience the Richness of Nigerian Culture</h2>
          <p className="mb-8 text-lg leading-relaxed">
            Get the full Kàábọ̀ experience with our all-inclusive multi-day packages. 
            Hotel, daily transport, activities, and even optional visa facilitation — we've thought of everything so you don't have to.
          </p>
          <Button variant="outline" className="bg-amber-500 hover:bg-amber-600 text-white border-amber-500 rounded-full text-lg px-8 py-6">
            BOOK YOUR JOURNEY
          </Button>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">Choose Your Experience</h2>
          
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Weekenders Package */}
            <Card className="border-none shadow-lg overflow-hidden bg-white transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="bg-sand p-6 text-center">
                  <h3 className="font-serif text-2xl uppercase mb-2">The Weekenders</h3>
                  <p className="text-lg text-forest/80">3 days • 2 nights</p>
                </div>
                
                <div className="p-8 text-center">
                  <div className="mb-8">
                    <span className="text-5xl font-serif text-forest">
                      <sup className="text-xl relative -top-4">$</sup>
                      1,500
                    </span>
                    <span className="block text-sm text-muted-foreground mt-2">per person</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10 text-left max-w-md mx-auto">
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">3-Night Stay & 3-Day Curated Itinerary</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Premium Hotel Accommodation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Daily Transportation & Local Guide</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Cultural & Business Activities</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Visa or e-Visa Facilitation Support</span>
                    </li>
                  </ul>
                  
                  <Button className="bg-forest hover:bg-forest/90 text-white px-8 py-6 text-lg rounded-full">
                    SELECT PACKAGE
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Full Experience */}
            <Card className="border-none shadow-lg overflow-hidden bg-white transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="bg-amber-500 p-6 text-center text-white">
                  <h3 className="font-serif text-2xl uppercase mb-2">The Full Experience</h3>
                  <p className="text-lg">7 days • 6 nights</p>
                </div>
                
                <div className="p-8 text-center">
                  <div className="mb-8">
                    <span className="text-5xl font-serif text-forest">
                      <sup className="text-xl relative -top-4">$</sup>
                      2,700
                    </span>
                    <span className="block text-sm text-muted-foreground mt-2">per person</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10 text-left max-w-md mx-auto">
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">7-Day Comprehensive Cultural Immersion</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Luxury Hotel Accommodation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Private Transportation & Personal Guide</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Exclusive Access to Business Networks</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={22} className="text-forest flex-shrink-0" />
                      <span className="text-base">Complete Visa Processing Assistance</span>
                    </li>
                  </ul>
                  
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg rounded-full">
                    SELECT PACKAGE
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Options */}
          <div className="text-center mb-16 bg-white p-8 rounded-xl shadow-md">
            <h3 className="font-serif text-2xl mb-8">Flexible Payment Options</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-sand/50 p-6 rounded-lg">
                <h4 className="font-medium text-xl mb-3 text-forest">One-time Payment</h4>
                <p className="text-sm">Pay in full and enjoy a hassle-free countdown to your journey</p>
              </div>
              <div className="bg-sand/50 p-6 rounded-lg">
                <h4 className="font-medium text-xl mb-3 text-forest">Installment Plan</h4>
                <p className="text-sm">30% deposit to secure your booking, followed by 2 equal monthly payments</p>
              </div>
              <div className="bg-sand/50 p-6 rounded-lg">
                <h4 className="font-medium text-xl mb-3 text-forest">Group Discounts</h4>
                <p className="text-sm">Special rates available for groups of 4 or more travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Itinerary Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-6">Curated Itineraries</h2>
          <p className="text-center mb-16 max-w-3xl mx-auto text-lg text-muted-foreground">
            Every Kàábọ̀ experience is tailored to your interests. Here are some of our sample itineraries:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative h-[450px] group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1612888473838-df015637790b?q=80&w=1000" 
                alt="Tech & Culture Fusion" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white text-center">
                <h3 className="font-serif text-3xl mb-4">Tech & Culture Fusion</h3>
                <p className="mb-6 text-white/90">
                  Connect with Nigeria's thriving tech ecosystem while exploring rich cultural traditions
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-forest rounded-full px-6">
                  VIEW DETAILS
                </Button>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="relative h-[450px] group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1496240419284-4a1d7120fe78?q=80&w=1000" 
                alt="Wellness & Design Discovery" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white text-center">
                <h3 className="font-serif text-3xl mb-4">Wellness & Design</h3>
                <p className="mb-6 text-white/90">
                  Experience traditional healing practices and discover Nigeria's vibrant design scene
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-forest rounded-full px-6">
                  VIEW DETAILS
                </Button>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="relative h-[450px] group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?q=80&w=1000" 
                alt="Cultural & Business Blend" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white text-center">
                <h3 className="font-serif text-3xl mb-4">Heritage & Business</h3>
                <p className="mb-6 text-white/90">
                  Explore investment opportunities while immersing yourself in Nigeria's rich heritage
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-forest rounded-full px-6">
                  VIEW DETAILS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* What's Included Section */}
      <section className="py-20 px-6 bg-forest text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-16">What's Included</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Premium Accommodation</h3>
              <p className="text-white/80">Luxury hotels carefully selected for comfort and authentic character</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5z"/>
                  <path d="M15 1c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V3c0-1.1-.9-2-2-2zm-3.5 10H6.75c-.41 0-.75.34-.75.75v2.5c0 .41.34.75.75.75H9c0 1.24 1.01 2.25 2.25 2.25S13.5 16.24 13.5 15h2.75c.41 0 .75-.34.75-.75v-2.5c0-.41-.34-.75-.75-.75H12.5V9.5h5v3c0 .55.45 1 1 1s1-.45 1-1v-3c0-1.1-.9-2-2-2h-5V6c0-.55-.45-1-1-1s-1 .45-1 1v1.5h-0.5C7.45 7.5 5 9.95 5 13s2.45 5.5 5.5 5.5c1.03 0 2-.28 2.8-.77l.7.7c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-.94-.95c.47-.76.74-1.65.74-2.57C15.21 12.23 13.73 11 11.5 11z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Personal Guide</h3>
              <p className="text-white/80">Knowledgeable local guides who provide authentic insights</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM17.5 10.78c-1.23-.37-2.22-1.17-2.8-2.18l-1-1.6c-.41-.65-1.11-1-1.84-1-.78 0-1.59.5-1.78 1.44S7 23 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1 1.15 2.41 2.01 4 2.34V23H19V9h-1.5v1.78zM7.43 13.13l-2.12-.41c-.54-.11-.9-.63-.79-1.17l.76-3.93c.21-1.08 1.26-1.79 2.34-1.58l1.16.23-1.35 6.86z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Activities & Experiences</h3>
              <p className="text-white/80">Carefully curated cultural and business activities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Business Networking</h3>
              <p className="text-white/80">Connections with local entrepreneurs and industry leaders</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg overflow-hidden shadow-sm">
              <AccordionTrigger className="text-left font-medium text-lg px-6">What is Kàábọ̀?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Kàábọ̀ is a premium cultural immersion experience that connects you with Nigeria's vibrant culture, tech scene, and business opportunities through curated multi-day packages.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white rounded-lg overflow-hidden shadow-sm">
              <AccordionTrigger className="text-left font-medium text-lg px-6">What sets Kàábọ̀ apart?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                We provide authentic experiences with local guides, personalized itineraries, and connections to business opportunities that most tourists never access.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-white rounded-lg overflow-hidden shadow-sm">
              <AccordionTrigger className="text-left font-medium text-lg px-6">What's included in your packages?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Accommodation, daily transportation, cultural activities, business networking events, meals at select restaurants, and a dedicated local guide.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-white rounded-lg overflow-hidden shadow-sm">
              <AccordionTrigger className="text-left font-medium text-lg px-6">What's NOT included in the program?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                International flights, travel insurance, visa fees (though we assist with the process), personal expenses, and meals not specified in the itinerary.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="bg-white rounded-lg overflow-hidden shadow-sm">
              <AccordionTrigger className="text-left font-medium text-lg px-6">How do I enroll in a program?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Click on the "Book Your Journey" button, fill out our application form, and one of our team members will contact you to discuss available dates and customize your itinerary.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-earth text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-6">Ready to Experience Nigeria?</h2>
          <p className="mb-10 text-xl leading-relaxed">
            Whether you're looking to reconnect with your roots, exploring investment opportunities, or simply curious about Nigeria, Kàábọ̀ provides a transformative experience beyond the ordinary.
          </p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white border-none rounded-full text-lg px-8 py-6">
            BEGIN YOUR JOURNEY
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default KaaboExperience;
