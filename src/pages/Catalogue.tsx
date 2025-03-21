
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Catalogue = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-forest">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/5a1a7347-c9ea-4ff3-ade9-175d26811709.png" 
            alt="Catalogue Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-4">Our Catalogue</h1>
          <p className="text-center text-lg md:text-xl max-w-3xl px-6">
            Explore Our Available Travel Experiences Tailored to Every Taste and Budget
          </p>
        </div>
      </section>

      {/* Catalogue Content */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          {/* Weekenders Section */}
          <Accordion type="single" collapsible className="mb-4 border-t">
            <AccordionItem value="weekenders" className="border-b-0">
              <AccordionTrigger className="py-5 text-lg md:text-xl font-medium hover:no-underline">
                WEEKENDERS
              </AccordionTrigger>
              <AccordionContent className="pt-0">
                {/* Nested Accordion for Weekending Options */}
                <Accordion type="single" collapsible className="border-t-0">
                  
                  {/* Weekending on a Budget */}
                  <AccordionItem value="budget" className="border-t border-b">
                    <h3 className="flex items-center py-5">
                      <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline">
                        Weekending on a Budget <span className="text-forest ml-2">($1,500)</span>
                      </AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <div className="pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <p className="text-foreground">
                              This 3-day package is perfect for travelers looking for a memorable Nigerian experience without the high price tag. 
                              Stay in a centrally located, newly renovated Airbnb, and explore Lagos with access to a sedan and a 12 hour 
                              private driver each day. Meals and breakfast are not included, allowing you the freedom to choose your own dining 
                              experiences. Your itinerary will be thoughtfully curated based on your interests, with one draft provided for you to 
                              review.
                            </p>
                          </div>
                          <div className="md:col-span-1 space-y-2">
                            <div className="flex items-center">
                              <Check size={16} className="text-forest mr-2" />
                              <span>Visa On Arrival</span>
                            </div>
                            <div className="flex items-center">
                              <Check size={16} className="text-forest mr-2" />
                              <span>Boutique Hotel Stay</span>
                            </div>
                            <div className="flex items-center">
                              <Check size={16} className="text-forest mr-2" />
                              <span>Daily Trans</span>
                            </div>
                            <div className="flex items-center">
                              <Check size={16} className="text-forest mr-2" />
                              <span>Select Meals</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* The Weekend Experience */}
                  <AccordionItem value="weekend-experience" className="border-b">
                    <h3 className="flex items-center">
                      <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline py-5">
                        <div className="flex items-center">
                          <Plus size={16} className="mr-2" />
                          The Weekend Experience <span className="text-forest ml-2">($2,000)</span>
                        </div>
                      </AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <div className="pb-6">
                        <p>Experience details coming soon.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Weekend Lux */}
                  <AccordionItem value="weekend-lux" className="border-b">
                    <h3 className="flex items-center">
                      <AccordionTrigger className="text-base md:text-lg font-medium hover:no-underline py-5">
                        <div className="flex items-center">
                          <Plus size={16} className="mr-2" />
                          Weekend Lux <span className="text-forest ml-2">($6,000)</span>
                        </div>
                      </AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <div className="pb-6">
                        <p>Experience details coming soon.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* THE FULL EXPERIENCE */}
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="full-experience" className="border-b">
              <h3 className="flex items-center">
                <AccordionTrigger className="py-5 text-lg md:text-xl font-medium hover:no-underline">
                  <div className="flex items-center">
                    <Plus size={16} className="mr-2" />
                    THE FULL EXPERIENCE
                  </div>
                </AccordionTrigger>
              </h3>
              <AccordionContent>
                <div className="pb-6">
                  <p>Experience details coming soon.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* SPECIAL PACKAGES */}
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="special-packages" className="border-b">
              <h3 className="flex items-center">
                <AccordionTrigger className="py-5 text-lg md:text-xl font-medium hover:no-underline">
                  <div className="flex items-center">
                    <Plus size={16} className="mr-2" />
                    SPECIAL PACKAGES
                  </div>
                </AccordionTrigger>
              </h3>
              <AccordionContent>
                <div className="pb-6">
                  <p>Experience details coming soon.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-earth text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-10">Faq</h2>
          
          <Accordion type="single" collapsible className="text-white">
            <AccordionItem value="what-is-kaabo" className="border-t border-white/30 border-b-0">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                What is Kàábọ̀?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  Kàábọ̀ is a premium travel experience company focused on providing authentic and immersive 
                  Nigerian cultural experiences for tourists and diaspora visitors.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="what-sets-kaabo-apart" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                What sets Kàábọ̀ apart?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  Our deeply personalized itineraries, exclusive access to cultural events and figures, 
                  and comprehensive concierge services create a seamless experience that showcases the best of Nigeria.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="whats-included" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                What's included in your 7-day program?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  Our standard 7-day program includes accommodation, daily transportation, curated cultural 
                  activities, selected meals at premier restaurants, and personalized concierge services throughout your stay.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="not-included" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                What's NOT included in the program?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  International flights, visa fees, travel insurance, personal expenses, and any activities or meals 
                  not explicitly mentioned in your itinerary are not included in the program fee.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="pricing" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                How is the pricing structured?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  We offer tiered pricing based on accommodation type, experiences included, and level of exclusivity. 
                  Pricing starts at $1,500 for weekend experiences and $3,500 for our full 7-day programs.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="enroll" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                How do I enroll in a program?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  You can enroll by clicking the "ENROLL NOW" button, which will guide you through our application process 
                  and allow you to select your preferred dates and experience package.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="payment-methods" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  We accept all major credit cards, wire transfers, and selected cryptocurrency payments. 
                  All transactions are secured with industry-standard encryption.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="deposit" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                What is the deposit policy?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  We require a 30% non-refundable deposit to secure your booking, with the remaining balance 
                  due 60 days before your arrival date.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="transportation" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                Is transportation provided during the program?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  Yes, all transportation within Nigeria during your program is included, with a dedicated 
                  driver and vehicle available for your group throughout your stay.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="visa" className="border-t border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                Do I need a visa for Nigeria?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  Most visitors require a visa to enter Nigeria. We provide visa assistance to all our clients, 
                  including guidance on the application process and required documentation.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="more-questions" className="border-t border-white/30 border-b border-white/30">
              <AccordionTrigger className="py-5 text-lg font-medium hover:no-underline text-white">
                What if I have more questions?
              </AccordionTrigger>
              <AccordionContent className="text-white/90">
                <p className="pb-4">
                  Our concierge team is available to answer any additional questions you may have. 
                  You can reach us at info@experiencekaabo.com or through the contact form on our website.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Catalogue;
