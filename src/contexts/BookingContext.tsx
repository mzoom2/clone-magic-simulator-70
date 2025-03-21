
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ExperienceType = {
  id: string;
  title: string;
  price: number;
  occupancyType: string;
};

type BookingContextType = {
  selectedExperience: ExperienceType | null;
  guestCount: number;
  setSelectedExperience: (experience: ExperienceType | null) => void;
  setGuestCount: (count: number) => void;
  incrementGuests: () => void;
  decrementGuests: () => void;
  totalPrice: number;
  resetBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);

  const incrementGuests = () => {
    setGuestCount((prev) => prev + 1);
  };

  const decrementGuests = () => {
    setGuestCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = selectedExperience ? selectedExperience.price * guestCount : 0;

  const resetBooking = () => {
    setSelectedExperience(null);
    setGuestCount(1);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedExperience,
        guestCount,
        setSelectedExperience,
        setGuestCount,
        incrementGuests,
        decrementGuests,
        totalPrice,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
