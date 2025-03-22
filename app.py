
from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Set up Stripe API key
# Important: In production, use environment variables for sensitive keys
stripe.api_key = "sk_test_your_stripe_secret_key"  # Replace with your actual test key

# Store booking data temporarily (in a real app, use a database)
bookings = []

@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        
        # Extract data from request
        package_title = data.get('packageTitle')
        amount_in_cents = data.get('amountInCents')
        visitor_count = data.get('visitorCount')
        customer_name = data.get('customerName')
        customer_email = data.get('customerEmail')
        customer_phone = data.get('customerPhone')
        
        # Create a new checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': f'{package_title} - {visitor_count} {"visitor" if visitor_count == 1 else "visitors"}',
                            'description': f'Nigerian Experience Package',
                        },
                        'unit_amount': amount_in_cents,
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url='http://localhost:5173/enroll/summary?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:5173/enroll/summary',
            customer_email=customer_email,
            metadata={
                'package_title': package_title,
                'visitor_count': str(visitor_count),
                'customer_name': customer_name,
                'customer_email': customer_email,
                'customer_phone': customer_phone
            }
        )
        
        # Store booking information
        booking = {
            'session_id': checkout_session.id,
            'package_title': package_title,
            'amount': amount_in_cents / 100,  # Convert to dollars for readability
            'visitor_count': visitor_count,
            'customer_name': customer_name,
            'customer_email': customer_email,
            'customer_phone': customer_phone,
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        bookings.append(booking)
        
        # Save bookings to a JSON file (simulate database)
        with open('bookings.json', 'w') as f:
            json.dump(bookings, f, indent=2)
        
        return jsonify({'checkoutUrl': checkout_session.url})
    
    except Exception as e:
        print(f"Error creating checkout session: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/verify-payment/<session_id>', methods=['GET'])
def verify_payment(session_id):
    try:
        # Retrieve the session from Stripe
        checkout_session = stripe.checkout.Session.retrieve(session_id)
        
        # Check payment status
        if checkout_session.payment_status == 'paid':
            # Update booking status
            for booking in bookings:
                if booking['session_id'] == session_id:
                    booking['status'] = 'confirmed'
                    # Save updated bookings to file
                    with open('bookings.json', 'w') as f:
                        json.dump(bookings, f, indent=2)
                    break
            
            return jsonify({
                'success': True,
                'message': 'Payment completed successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': f'Payment not completed. Status: {checkout_session.payment_status}'
            })
            
    except Exception as e:
        print(f"Error verifying payment: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Error verifying payment: {str(e)}'
        }), 500

@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    try:
        # Load bookings from file
        try:
            with open('bookings.json', 'r') as f:
                bookings = json.load(f)
        except FileNotFoundError:
            bookings = []
        
        return jsonify(bookings)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure bookings.json exists
    if not os.path.exists('bookings.json'):
        with open('bookings.json', 'w') as f:
            json.dump([], f)
            
    app.run(debug=True, port=5000)
