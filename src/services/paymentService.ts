
/**
 * Payment service for handling Stripe payment processing
 */

/**
 * Initiates a payment session with the backend
 * @param packageTitle Package title
 * @param amount Payment amount as string (e.g. "199.99")
 * @param visitorCount Number of visitors
 * @param contactInfo Customer contact information
 * @returns The Stripe checkout URL
 */
export const initiatePayment = async (
  packageTitle: string,
  amount: string,
  visitorCount: number,
  contactInfo: { firstName: string; lastName: string; email: string; phone: string }
): Promise<string> => {
  try {
    // Remove commas and convert to cents for Stripe
    const amountInCents = Math.round(parseFloat(amount.replace(/,/g, '')) * 100);
    
    const response = await fetch('http://localhost:5000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        packageTitle,
        amountInCents,
        visitorCount,
        customerName: `${contactInfo.firstName} ${contactInfo.lastName}`,
        customerEmail: contactInfo.email,
        customerPhone: contactInfo.phone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create payment session');
    }

    const data = await response.json();
    return data.checkoutUrl;
  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
};

/**
 * Verifies payment status with the backend
 * @param sessionId Stripe session ID
 * @returns Payment verification result
 */
export const verifyPayment = async (sessionId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`http://localhost:5000/api/verify-payment/${sessionId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify payment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};
