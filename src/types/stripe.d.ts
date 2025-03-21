
declare namespace Stripe {
  interface PaymentIntent {
    id: string;
    amount: number;
    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
    client_secret: string;
  }

  interface BookingPayment {
    paymentIntentId: string;
    amount: number;
    currency: string;
    status: string;
    customerEmail: string;
  }
}
