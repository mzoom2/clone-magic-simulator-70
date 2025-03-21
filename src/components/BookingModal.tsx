
import React, { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import CheckoutForm from "./CheckoutForm";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<"selection" | "checkout">("selection");
  const { selectedExperience, guestCount, incrementGuests, decrementGuests, totalPrice } = useBooking();
  const { toast } = useToast();

  const handleProceedToCheckout = () => {
    if (!selectedExperience) {
      toast({
        title: "No experience selected",
        description: "Please select an experience to continue",
        variant: "destructive",
      });
      return;
    }
    setStep("checkout");
  };

  const handleBackToSelection = () => {
    setStep("selection");
  };

  if (!selectedExperience) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setStep("selection");
      }
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {step === "selection" ? "Book Your Experience" : "Complete Your Booking"}
          </DialogTitle>
          <DialogDescription>
            {step === "selection" 
              ? "Customize your booking details below" 
              : "Please provide your personal information"}
          </DialogDescription>
        </DialogHeader>

        {step === "selection" ? (
          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium text-lg">{selectedExperience.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedExperience.occupancyType}</p>
              <div className="mt-2 text-xl font-medium">${selectedExperience.price} <span className="text-sm font-normal">per person</span></div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Number of Guests</label>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementGuests}
                    disabled={guestCount <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{guestCount}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementGuests}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                International flights, personal shopping, and travel insurance are not included
              </p>
            </div>

            <div className="flex justify-end">
              <Button 
                className="bg-forest hover:bg-forest/90 text-white rounded-full px-6"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <CheckoutForm onBack={handleBackToSelection} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
