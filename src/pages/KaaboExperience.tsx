import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight, Check, Plus, ArrowRight } from 'lucide-react';
import { useAuthDialogContext } from '@/contexts/AuthDialogProvider';

const KaaboExperience = () => {
  const navigate = useNavigate();
  const { checkAuthAndProceed } = useAuthDialogContext();

  const handleBookNow = () => {
    checkAuthAndProceed('/enroll', () => {
      navigate('/enroll');
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0 bg-black/50">
          <img 
            src="https://images.unsplash.com/photo-1536599424071-0b215a388ba7?q=80&w=1000" 
            alt="Kaabo Experience" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">The Kàábọ̀ Experience</h1>
          <p className="max-w-2xl text-sm md:text-base">
            An immersive experience tailored for those looking to explore culture, and investment opportunities in Nigeria
          </p>
        </div>
      </section>
      
      {/* Main content */}
      <section className="bg-forest text-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-6">
            Get the full Kàábọ̀ experience with our all inclusive multi-day packages. 
            Hotel, daily transport, activities, and even optional visa facilitation — it's all covered. Pick what suits you best.
          </p>
          <Button 
            variant="outline" 
            className="bg-amber-500 hover:bg-amber-600 text-white border-amber-500 rounded-full"
            onClick={handleBookNow}
          >
            BOOK NOW
          </Button>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-12 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            {/* Weekenders Package */}
            <Card className="border-none shadow-md overflow-hidden bg-white max-w-sm w-full mx-auto">
              <CardContent className="p-0">
                <div className="bg-sand p-4 text-center">
                  <h3 className="font-serif text-xl uppercase mb-2">The Weekenders</h3>
                  <p className="text-sm text-muted-foreground">3 days • 2 nights</p>
                </div>
                
                <div className="p-6 text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-serif text-forest">
                      <sup className="text-lg relative -top-3">$</sup>
                      1,500
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>3-Night Stay & 3-Day Itinerary</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>Daily Transportation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>Hotel & Activities for the Weekend</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>Visa or e-Visa Facilitation</span>
                    </li>
                  </ul>
                  
                  <Button 
                    className="bg-forest hover:bg-forest/90 text-white"
                    onClick={handleBookNow}
                  >
                    BOOK NOW
                  </Button>
                  
                  <p className="mt-4 text-xs text-muted-foreground px-4">
                    All prices include: International flight to Lagos (not included), hotel accommodation, and guided tour with transportation. Terms and conditions apply.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Full Experience */}
            <Card className="border-none shadow-md overflow-hidden bg-white max-w-sm w-full mx-auto">
              <CardContent className="p-0">
                <div className="bg-sand p-4 text-center">
                  <h3 className="font-serif text-xl uppercase mb-2">The Full Experience</h3>
                  <p className="text-sm text-muted-foreground">7 days • 6 nights</p>
                </div>
                
                <div className="p-6 text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-serif text-forest">
                      <sup className="text-lg relative -top-3">$</sup>
                      2,700
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>6-Night Stay & 7-Day Itinerary</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>Daily Transportation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>Hotel & Activities for Full Week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={20} className="text-forest" />
                      <span>Visa or e-Visa Facilitation</span>
                    </li>
                  </ul>
                  
                  <Button 
                    className="bg-forest hover:bg-forest/90 text-white"
                    onClick={handleBookNow}
                  >
                    BOOK NOW
                  </Button>
                  
                  <p className="mt-4 text-xs text-muted-foreground px-4">
                    All prices include: International flight to Lagos (not included), hotel accommodation, and guided tour with transportation. Terms and conditions apply.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Options */}
          <div className="text-center mb-16">
            <h3 className="font-serif text-2xl mb-6">Flexible payment options for your convenience:</h3>
            <ul className="space-y-3 max-w-xl mx-auto">
              <li className="flex items-start gap-2">
                <div className="mt-1 text-amber-500"><ChevronRight size={16} /></div>
                <div className="text-left">
                  <span className="font-medium">One-time Payment:</span> Pay in full and enjoy a hassle-free countdown to your journey
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 text-amber-500"><ChevronRight size={16} /></div>
                <div className="text-left">
                  <span className="font-medium">Installment Plan:</span> Pay a 30% deposit to secure your booking, followed by 2 equal monthly payments
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 text-amber-500"><ChevronRight size={16} /></div>
                <div className="text-left">
                  <span className="font-medium">Double Occupancy:</span> Choose to save by sharing costs with a friend or partner
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Itinerary Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-4">Our Itinerary</h2>
          <p className="text-center mb-12 max-w-3xl mx-auto">
            Our itineraries are bespoke and tailored to you. Here are some examples of past itineraries.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="relative h-[400px] group overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1612888473838-df015637790b?q=80&w=1000" 
                alt="Tech & Culture Fusion" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white text-center">
                <h3 className="font-serif text-2xl mb-1">Tech &</h3>
                <h3 className="font-serif text-2xl mb-6">Culture Fusion</h3>
                <Button 
                  variant="outline" 
                  className="bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:text-white hover:border-amber-600 group transition-all duration-300 px-6 rounded-full"
                  onClick={handleBookNow}
                >
                  BOOK NOW
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="relative h-[400px] group overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1496240419284-4a1d7120fe78?q=80&w=1000" 
                alt="Wellness & Design Discovery" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white text-center">
                <h3 className="font-serif text-2xl mb-1">Wellness &</h3>
                <h3 className="font-serif text-2xl mb-6">Design Discovery</h3>
                <Button 
                  variant="outline" 
                  className="bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:text-white hover:border-amber-600 group transition-all duration-300 px-6 rounded-full"
                  onClick={handleBookNow}
                >
                  BOOK NOW
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="relative h-[400px] group overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?q=80&w=1000" 
                alt="Cultural & Business Blend" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white text-center">
                <h3 className="font-serif text-2xl mb-1">Cultural &</h3>
                <h3 className="font-serif text-2xl mb-6">Business Blend</h3>
                <Button 
                  variant="outline" 
                  className="bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:text-white hover:border-amber-600 group transition-all duration-300 px-6 rounded-full"
                  onClick={handleBookNow}
                >
                  BOOK NOW
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-6 bg-earth text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-center mb-10">FAQ</h2>
          
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">What is Kàábọ̀?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                Kàábọ̀ is a premium cultural immersion experience that connects you with Nigeria's vibrant culture, tech scene, and business opportunities through curated multi-day packages.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">What sets Kàábọ̀ apart?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                We provide authentic experiences with local guides, personalized itineraries, and connections to business opportunities that most tourists never access.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">What's included in your 7-day program?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                Accommodation, daily transportation, cultural activities, business networking events, meals at select restaurants, and a dedicated local guide.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">What's NOT included in the program?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                International flights, travel insurance, visa fees, personal expenses, and meals not specified in the itinerary.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">How is the pricing structured?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                We offer packages starting at $1,500 for a weekend experience and $2,700 for the full week experience. Prices vary based on accommodation preferences and group size.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">How do I enroll in a program?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                Click on the "Enroll Now" button, fill out our application form, and one of our team members will contact you to discuss available dates and customize your itinerary.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                We accept credit/debit cards, bank transfers, and PayPal. We also offer installment plans for your convenience.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">What is the deposit policy?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                A 30% deposit is required to secure your booking. The remaining balance is due 60 days before your arrival date.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">Is transportation provided during the program?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                Yes, all local transportation is included in your package. We arrange private vehicles with professional drivers for all activities.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">Do I need a visa for Nigeria?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                Most visitors require a visa to enter Nigeria. We provide visa facilitation services to help with the application process at no additional cost.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-11" className="border-b border-white/20">
              <AccordionTrigger className="text-left font-medium text-lg">What if I have more questions?</AccordionTrigger>
              <AccordionContent className="text-white/90">
                Please contact us at info@kaaboexperience.com or schedule a consultation call. We're happy to answer all your questions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-10 text-lg">
            Whether you're looking to reconnect with your roots, considering investment opportunities, or just looking to visit Nigeria, Kàábọ̀ provides a transformative experience that goes beyond the ordinary.
          </p>
        </div>
      </section>
      
      <ResponsiveFooter />
    </div>
  );
};

export default KaaboExperience;
