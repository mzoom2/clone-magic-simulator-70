
from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Stripe with your secret key
# In production, use environment variables for sensitive keys
stripe.api_key = "sk_test_your_stripe_secret_key"

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        
        # Extract data from request
        package_title = data.get('package_title')
        amount_cents = data.get('amount_cents')
        success_url = data.get('success_url')
        cancel_url = data.get('cancel_url')
        
        # Validate required fields
        if not all([package_title, amount_cents, success_url, cancel_url]):
            return jsonify({'error': 'Missing required parameters'}), 400
        
        # Create a Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': package_title,
                        },
                        'unit_amount': amount_cents,
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=success_url,
            cancel_url=cancel_url,
        )
        
        # Return the checkout URL to the client
        return jsonify({'checkout_url': checkout_session.url})
    
    except Exception as e:
        print(f"Error creating checkout session: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
