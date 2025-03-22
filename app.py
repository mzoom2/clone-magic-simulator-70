
from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os
import json
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash
import uuid
from functools import wraps

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Set up Stripe API key
# Important: In production, use environment variables for sensitive keys
stripe.api_key = "sk_test_your_stripe_secret_key"  # Replace with your actual test key

# Store booking data temporarily (in a real app, use a database)
bookings = []

# Initial packages data
if not os.path.exists('packages.json'):
    initial_packages = [
        {
            "id": str(uuid.uuid4()),
            "title": "Lagos Experience",
            "date": "December 2023",
            "description": "Experience the vibrant culture of Lagos",
            "singlePrice": "1,999.00",
            "doublePrice": "3,499.00",
            "image": "/lovable-uploads/1bfbcad9-04e3-445e-8d19-840a15a1642a.png"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Abuja Adventure",
            "date": "January 2024",
            "description": "Explore the beautiful capital city",
            "singlePrice": "1,799.00",
            "doublePrice": "3,299.00",
            "image": "/lovable-uploads/5617c3ad-1f1f-4878-ae9a-40862d14df7b.png"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Cultural Immersion",
            "date": "February 2024",
            "description": "Deep dive into Nigerian traditions",
            "singlePrice": "2,099.00",
            "doublePrice": "3,899.00",
            "image": "/lovable-uploads/99d1a1e9-33f0-48d1-884c-3aa027ee3443.png"
        }
    ]
    with open('packages.json', 'w') as f:
        json.dump(initial_packages, f, indent=2)

# Admin credentials (in a real app, use a database and proper authentication)
# Default username: admin, password: admin123
admin_credentials = {
    "username": "admin",
    "password_hash": generate_password_hash("admin123")
}

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth = request.authorization
        if not auth or not auth.username or not auth.password:
            return jsonify({"error": "Authentication required"}), 401
        
        if auth.username != admin_credentials["username"] or not check_password_hash(admin_credentials["password_hash"], auth.password):
            return jsonify({"error": "Invalid credentials"}), 401
        
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username == admin_credentials["username"] and check_password_hash(admin_credentials["password_hash"], password):
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route('/api/packages', methods=['GET'])
def get_packages():
    try:
        with open('packages.json', 'r') as f:
            packages = json.load(f)
        return jsonify(packages)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/packages', methods=['GET'])
@admin_required
def admin_get_packages():
    try:
        with open('packages.json', 'r') as f:
            packages = json.load(f)
        return jsonify(packages)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/packages/<package_id>', methods=['PUT'])
@admin_required
def update_package(package_id):
    try:
        data = request.json
        with open('packages.json', 'r') as f:
            packages = json.load(f)
        
        for i, package in enumerate(packages):
            if package["id"] == package_id:
                # Only update prices for now
                if "singlePrice" in data:
                    packages[i]["singlePrice"] = data["singlePrice"]
                if "doublePrice" in data:
                    packages[i]["doublePrice"] = data["doublePrice"]
                
                with open('packages.json', 'w') as f:
                    json.dump(packages, f, indent=2)
                
                return jsonify({"success": True, "message": "Package updated successfully"})
        
        return jsonify({"error": "Package not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
@admin_required
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
