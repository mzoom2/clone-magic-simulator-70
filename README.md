
# Nigerian Experience Payment Backend

This is a Flask backend for handling payments through Stripe for the Nigerian Experience website.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Configure your Stripe API key:
   - Create a `.env` file in the root directory
   - Add your Stripe secret key: `STRIPE_SECRET_KEY=sk_test_your_key`

3. Run the application:
   ```
   python app.py
   ```

The server will start on port 5000.

## API Endpoints

### Create Checkout Session
- **URL**: `/api/create-checkout-session`
- **Method**: POST
- **Description**: Creates a Stripe checkout session and returns the checkout URL
- **Request Body**:
  ```json
  {
    "packageTitle": "Lagos Experience",
    "amountInCents": 199900,
    "visitorCount": 2,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1234567890"
  }
  ```
- **Response**:
  ```json
  {
    "checkoutUrl": "https://checkout.stripe.com/..."
  }
  ```

### Verify Payment
- **URL**: `/api/verify-payment/<session_id>`
- **Method**: GET
- **Description**: Verifies the payment status of a completed Stripe checkout session
- **Response**:
  ```json
  {
    "success": true,
    "message": "Payment completed successfully"
  }
  ```

### Get Bookings
- **URL**: `/api/bookings`
- **Method**: GET
- **Description**: Returns all bookings stored in the system
- **Response**: Array of booking objects

## Stripe Webhook (For Production)

For a production environment, you should also implement a Stripe webhook to reliably handle payment events.
This would be added to receive events directly from Stripe rather than relying on the client to verify payment.
