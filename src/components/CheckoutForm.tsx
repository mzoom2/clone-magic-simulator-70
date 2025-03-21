
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  confirmEmail: z.string(),
  paymentMethod: z.enum(["full", "installment"]),
  arrivalDate: z.date().optional(),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Email addresses do not match",
  path: ["confirmEmail"],
});

type FormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  onBack: () => void;
  onClose: () => void;
}

const CheckoutForm = ({ onBack, onClose }: CheckoutFormProps) => {
  const { selectedExperience, guestCount, totalPrice, resetBooking } = useBooking();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      paymentMethod: "full",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Here you would implement Stripe integration
    console.log("Form data:", data);
    console.log("Booking:", { experience: selectedExperience, guests: guestCount, total: totalPrice });
    
    // Simulate payment processing
    toast({
      title: "Processing payment...",
      description: "Your booking is being processed",
    });
    
    // Simulate successful booking
    setTimeout(() => {
      toast({
        title: "Booking successful!",
        description: "Check your email for booking confirmation",
      });
      resetBooking();
      onClose();
    }, 2000);
  };

  if (!selectedExperience) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arrivalDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preferred Arrival Date</FormLabel>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <Tabs
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="full">Full Payment</TabsTrigger>
                    <TabsTrigger value="installment">Installment Plan</TabsTrigger>
                  </TabsList>
                  <TabsContent value="full" className="p-4 border rounded-md mt-2">
                    <div className="flex items-start gap-2">
                      <CreditCard className="mt-1 h-4 w-4 text-forest" />
                      <div>
                        <p className="font-medium">Pay in full: ${totalPrice.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Complete your payment now and secure your booking
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="installment" className="p-4 border rounded-md mt-2">
                    <div className="flex items-start gap-2">
                      <CreditCard className="mt-1 h-4 w-4 text-forest" />
                      <div>
                        <p className="font-medium">30% Deposit: ${(totalPrice * 0.3).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Pay 30% now and the rest in equal installments
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border-t pt-4">
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {form.watch("paymentMethod") === "installment" 
              ? `Initial payment: $${(totalPrice * 0.3).toLocaleString()}`
              : "Full payment"}
          </p>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button 
            type="submit"
            className="bg-forest hover:bg-forest/90 text-white rounded-full px-6"
          >
            Complete Booking
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
