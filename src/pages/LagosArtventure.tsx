
import React from 'react';
import Navbar from '@/components/Navbar';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const LagosArtventure = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-forest">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png" 
            alt="Lagos Artventure Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-6">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-4 text-center">Lagos Artventure</h1>
          <p className="text-center text-lg md:text-xl max-w-3xl">
            Experience the best contemporary African culture and participate in West Africa's leading international art fair.
          </p>
          <div className="mt-6 text-center">
            <p className="text-xl md:text-2xl font-light">November 4th – 10th, 2025</p>
          </div>
        </div>
      </section>

      {/* Package Description */}
      <section className="py-12 bg-black text-white text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl mb-6">Choose the package that best fits your needs and leave the rest to us.</h2>
          <p className="text-lg md:text-xl mb-10">
            Hotel, transport, activities, and a week full of activities— it's all covered. You get your flight, we get everything else.
          </p>
          <Button className="bg-[#f8b13f] hover:bg-[#f8b13f]/90 text-black font-medium px-8 py-6 h-auto rounded-full">
            ENQUIRE NOW - BOOK A CALL
          </Button>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Double Occupancy Card */}
            <Card className="overflow-hidden rounded-none border-none">
              <div className="bg-[#FEF7CD] py-6 text-center">
                <h3 className="text-2xl md:text-3xl font-medium text-forest">LAGOS ARTVENTURE</h3>
                <p className="text-forest">Double Occupancy</p>
              </div>
              <CardContent className="p-0">
                <div className="pt-8 pb-4 text-center">
                  <div className="inline-flex items-baseline">
                    <span className="text-forest text-xl align-top">$</span>
                    <span className="text-forest text-6xl font-medium">2,400</span>
                    <span className="text-forest text-lg">pp</span>
                  </div>
                </div>
                <div className="space-y-4 px-6 pb-6">
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>Curated Gallery tours</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>VIP Access to Artists & Exhibitors</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>6-Night Hotel Stay</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>Personal Car & Driver</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>Meals & Activities</span>
                  </div>
                  <div className="pt-6 pb-2 text-center">
                    <Button className="bg-[#6d2a12] hover:bg-[#6d2a12]/90 text-white rounded-full px-8 py-6 h-auto font-medium">
                      ENROLL NOW
                    </Button>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-4 px-4">
                    <p>
                      All prices exclude: International Flights,<br />
                      Personal Shopping, Meals outside<br />
                      designated activities, Travel Insurance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Single Occupancy Card */}
            <Card className="overflow-hidden rounded-none border-none">
              <div className="bg-[#FEF7CD] py-6 text-center">
                <h3 className="text-2xl md:text-3xl font-medium text-forest">LAGOS ARTVENTURE</h3>
                <p className="text-forest">Single Occupancy</p>
              </div>
              <CardContent className="p-0">
                <div className="pt-8 pb-4 text-center">
                  <div className="inline-flex items-baseline">
                    <span className="text-forest text-xl align-top">$</span>
                    <span className="text-forest text-6xl font-medium">3,000</span>
                    <span className="text-forest text-lg">pp</span>
                  </div>
                </div>
                <div className="space-y-4 px-6 pb-6">
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>Curated Gallery tours</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>VIP Access to Artists & Exhibitors</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>6-Night Hotel Stay</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>Personal Car & Driver</span>
                  </div>
                  <div className="flex items-center py-2 border-b border-gray-200">
                    <Check size={20} className="text-forest mr-3 flex-shrink-0" />
                    <span>Meals & Activities</span>
                  </div>
                  <div className="pt-6 pb-2 text-center">
                    <Button className="bg-[#6d2a12] hover:bg-[#6d2a12]/90 text-white rounded-full px-8 py-6 h-auto font-medium">
                      ENROLL NOW
                    </Button>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-4 px-4">
                    <p>
                      All prices exclude: International Flights,<br />
                      Personal Shopping, Meals outside<br />
                      designated activities, Travel Insurance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl text-center mb-10 font-serif">Flexible payment options for your convenience:</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-[#f8b13f] rounded-full p-1 mt-1">
                <Check size={20} className="text-black" />
              </div>
              <div>
                <h3 className="text-lg font-medium">One-time Payment:</h3>
                <p>Pay in full and enjoy a hassle-free countdown to your journey</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-[#f8b13f] rounded-full p-1 mt-1">
                <Check size={20} className="text-black" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Installment Plan:</h3>
                <p>Pay a 30% deposit to secure your booking, followed by equal payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section + Footer */}
      <footer className="bg-[#3a4d28] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo + Tagline */}
            <div>
              <img src="/lovable-uploads/5105021d-b044-4cfc-8833-37ce9098c033.png" alt="Kàábọ̀ Logo" className="h-16 mb-4" />
              <p className="font-serif text-xl">Experience, Explore, Elevate:</p>
              <p>Nigeria like you have never seen it</p>
            </div>
            
            {/* Contact Info */}
            <div className="md:text-center">
              <h3 className="text-xl mb-4">Contact Info</h3>
              <p className="font-bold">KAABO INC</p>
              <p>info@experiencekaabo.com</p>
            </div>
            
            {/* Newsletter */}
            <div className="md:text-right">
              <h3 className="text-xl mb-4">Subscribe To Our Newsletter</h3>
              <div className="flex flex-col md:flex-row items-center gap-2 md:justify-end">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white rounded-full px-4 py-2 text-black w-full md:w-auto"
                />
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-forest rounded-full whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Kaabo. All Rights Reserved.</p>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link to="/cookie-policy" className="hover:underline">
                Cookie Policy (EU)
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LagosArtventure;
