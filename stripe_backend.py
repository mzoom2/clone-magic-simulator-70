
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import stripe
import os
import datetime
import logging
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import jwt
from datetime import datetime, timedelta
from functools import wraps

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Define SQLAlchemy base class
class Base(DeclarativeBase):
    pass

# Initialize Flask app and database
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the database
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///stripe_payments.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize SQLAlchemy with app
db = SQLAlchemy(model_class=Base)
db.init_app(app)

# Initialize Stripe with your secret key
# In production, use environment variables for sensitive keys
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "sk_test_51R6BpH2LoLNtSym8uXZMIpXl0CJZN1S8QSoSRx0P6fZxQmxpDg87SBr3uo3BgT06YEvSycwUpHMNxow95XnjC5PJ00cuKyqMI7")

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    role = db.Column(db.String(20), default='customer')  # 'customer' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    transactions = db.relationship('PaymentTransaction', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role,
            'created_at': self.created_at.isoformat()
        }

# Define Package model
class Package(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    package_id = db.Column(db.String(50), unique=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.String(100))
    single_price = db.Column(db.Integer, nullable=False)  # in cents
    double_price = db.Column(db.Integer, nullable=False)  # in cents
    currency = db.Column(db.String(10), default='usd')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'package_id': self.package_id,
            'title': self.title,
            'description': self.description,
            'date': self.date,
            'single_price': self.single_price,
            'double_price': self.double_price,
            'currency': self.currency,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Define Payment Transaction model
class PaymentTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stripe_session_id = db.Column(db.String(255), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    package_title = db.Column(db.String(255), nullable=False)
    amount_cents = db.Column(db.Integer, nullable=False)
    currency = db.Column(db.String(10), default='usd')
    status = db.Column(db.String(50), default='pending')
    attended = db.Column(db.Boolean, default=False)
    email = db.Column(db.String(120))  # For guest checkouts
    first_name = db.Column(db.String(100))  # For guest checkouts
    last_name = db.Column(db.String(100))  # For guest checkouts
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<PaymentTransaction {self.id}: {self.package_title} - {self.amount_cents / 100} {self.currency}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'stripe_session_id': self.stripe_session_id,
            'user_id': self.user_id,
            'package_title': self.package_title,
            'amount_cents': self.amount_cents,
            'currency': self.currency,
            'status': self.status,
            'attended': self.attended,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Create database tables
with app.app_context():
    db.create_all()
    logger.info("Database tables created")
    
    # Seed initial admin user if none exists
    admin = User.query.filter_by(role='admin').first()
    if not admin:
        hashed_password = generate_password_hash('admin123')
        admin_user = User(
            email='admin@kaabo.com',
            password=hashed_password,
            first_name='Admin',
            last_name='User',
            role='admin'
        )
        db.session.add(admin_user)
        
        # Seed initial packages if none exist
        if Package.query.count() == 0:
            packages = [
                {
                    'package_id': 'summer-tech',
                    'title': 'Summer Tech',
                    'description': 'Immerse in Lagos tech scene',
                    'date': 'July 15-22, 2023',
                    'single_price': 190000,  # $1,900 in cents
                    'double_price': 150000   # $1,500 in cents
                },
                {
                    'package_id': 'october-tech',
                    'title': 'October Tech',
                    'description': 'Experience October tech events',
                    'date': 'October 10-17, 2023',
                    'single_price': 195000,  # $1,950 in cents
                    'double_price': 155000   # $1,550 in cents
                },
                {
                    'package_id': 'fashion-week',
                    'title': 'Fashion Week',
                    'description': 'Lagos Fashion Week experience',
                    'date': 'November 1-8, 2023',
                    'single_price': 210000,  # $2,100 in cents
                    'double_price': 170000   # $1,700 in cents
                }
            ]
            
            for pkg_data in packages:
                pkg = Package(**pkg_data)
                db.session.add(pkg)
        
        db.session.commit()
        logger.info("Admin user and initial packages created")

# JWT Authentication helper functions
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, app.secret_key, algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'error': 'User not found'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin privileges required'}), 403
        return f(current_user, *args, **kwargs)
    
    return decorated

# Routes for user authentication
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    
    if not all([data.get('email'), data.get('password')]):
        return jsonify({'error': 'Email and password are required'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409
    
    hashed_password = generate_password_hash(data['password'])
    
    user = User(
        email=data['email'],
        password=hashed_password,
        first_name=data.get('firstName', ''),
        last_name=data.get('lastName', '')
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Generate JWT token
    token_expiration = datetime.utcnow() + timedelta(days=1)
    token = jwt.encode(
        {
            'user_id': user.id,
            'email': user.email,
            'role': user.role,
            'exp': token_expiration
        },
        app.secret_key,
        algorithm="HS256"
    )
    
    return jsonify({
        'message': 'User registered successfully',
        'token': token,
        'user': user.to_dict()
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    
    if not all([data.get('email'), data.get('password')]):
        return jsonify({'error': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Generate JWT token
    token_expiration = datetime.utcnow() + timedelta(days=1)
    token = jwt.encode(
        {
            'user_id': user.id,
            'email': user.email,
            'role': user.role,
            'exp': token_expiration
        },
        app.secret_key,
        algorithm="HS256"
    )
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': user.to_dict()
    })

@app.route('/me', methods=['GET'])
@token_required
def get_user(current_user):
    return jsonify({
        'user': current_user.to_dict()
    })

# Package routes
@app.route('/packages', methods=['GET'])
def get_packages():
    packages = Package.query.all()
    return jsonify({
        'packages': [pkg.to_dict() for pkg in packages]
    })

@app.route('/packages/<string:package_id>', methods=['GET'])
def get_package(package_id):
    package = Package.query.filter_by(package_id=package_id).first()
    if not package:
        return jsonify({'error': 'Package not found'}), 404
    return jsonify(package.to_dict())

@app.route('/packages', methods=['POST'])
@token_required
@admin_required
def create_package(current_user):
    data = request.json
    
    required_fields = ['package_id', 'title', 'single_price', 'double_price']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    package = Package(
        package_id=data['package_id'],
        title=data['title'],
        description=data.get('description', ''),
        date=data.get('date', ''),
        single_price=data['single_price'],
        double_price=data['double_price'],
        currency=data.get('currency', 'usd')
    )
    
    db.session.add(package)
    db.session.commit()
    
    return jsonify({
        'message': 'Package created successfully',
        'package': package.to_dict()
    }), 201

@app.route('/packages/<string:package_id>', methods=['PUT'])
@token_required
@admin_required
def update_package(current_user, package_id):
    package = Package.query.filter_by(package_id=package_id).first()
    if not package:
        return jsonify({'error': 'Package not found'}), 404
    
    data = request.json
    
    if 'title' in data:
        package.title = data['title']
    if 'description' in data:
        package.description = data['description']
    if 'date' in data:
        package.date = data['date']
    if 'single_price' in data:
        package.single_price = data['single_price']
    if 'double_price' in data:
        package.double_price = data['double_price']
    if 'currency' in data:
        package.currency = data['currency']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Package updated successfully',
        'package': package.to_dict()
    })

@app.route('/packages/<string:package_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_package(current_user, package_id):
    package = Package.query.filter_by(package_id=package_id).first()
    if not package:
        return jsonify({'error': 'Package not found'}), 404
    
    db.session.delete(package)
    db.session.commit()
    
    return jsonify({
        'message': 'Package deleted successfully'
    })

# Checkout and transaction routes
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        
        # Extract data from request
        package_title = data.get('package_title')
        amount_cents = data.get('amount_cents')
        success_url = data.get('success_url')
        cancel_url = data.get('cancel_url')
        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        user_id = data.get('user_id')
        
        # Validate required fields
        if not all([package_title, amount_cents, success_url, cancel_url]):
            return jsonify({'error': 'Missing required parameters'}), 400
        
        # Create a Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            customer_email=email,
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
        
        # Store transaction record in database
        try:
            transaction = PaymentTransaction(
                stripe_session_id=checkout_session.id,
                user_id=user_id,
                package_title=package_title,
                amount_cents=amount_cents,
                currency='usd',
                status='pending',
                email=email,
                first_name=first_name,
                last_name=last_name
            )
            db.session.add(transaction)
            db.session.commit()
            logger.debug(f"Transaction recorded: {transaction}")
        except Exception as db_error:
            logger.error(f"Database error: {str(db_error)}")
            # Continue even if database operation fails
        
        # Return the checkout URL to the client
        return jsonify({
            'checkout_url': checkout_session.url,
            'session_id': checkout_session.id
        })
    
    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/transactions', methods=['GET'])
@token_required
def get_transactions(current_user):
    """Return a list of all transactions"""
    try:
        if current_user.role == 'admin':
            transactions = PaymentTransaction.query.all()
        else:
            transactions = PaymentTransaction.query.filter_by(user_id=current_user.id).all()
            
        return jsonify({
            'transactions': [transaction.to_dict() for transaction in transactions]
        })
    except Exception as e:
        logger.error(f"Error fetching transactions: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/transactions/<string:session_id>', methods=['GET'])
def get_transaction_by_session(session_id):
    """Get transaction details by Stripe session ID"""
    try:
        transaction = PaymentTransaction.query.filter_by(stripe_session_id=session_id).first()
        if not transaction:
            return jsonify({'error': 'Transaction not found'}), 404
        return jsonify(transaction.to_dict())
    except Exception as e:
        logger.error(f"Error fetching transaction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/transactions/<int:transaction_id>/attended', methods=['PUT'])
@token_required
@admin_required
def mark_transaction_attended(current_user, transaction_id):
    """Mark a transaction as attended or not attended"""
    try:
        transaction = PaymentTransaction.query.get(transaction_id)
        if not transaction:
            return jsonify({'error': 'Transaction not found'}), 404
        
        data = request.json
        transaction.attended = data.get('attended', True)
        db.session.commit()
        
        return jsonify({
            'message': 'Transaction updated successfully',
            'transaction': transaction.to_dict()
        })
    except Exception as e:
        logger.error(f"Error updating transaction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    """Handle Stripe webhook events to update transaction statuses"""
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    
    try:
        # You would normally verify the webhook signature here
        # For simplicity, we're skipping that step
        event = stripe.Event.construct_from(
            request.json, stripe.api_key
        )
        
        # Handle the checkout.session.completed event
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            
            # Update transaction status in database
            transaction = PaymentTransaction.query.filter_by(stripe_session_id=session.id).first()
            if transaction:
                transaction.status = 'completed'
                db.session.commit()
                logger.info(f"Transaction {session.id} marked as completed")
            
        return jsonify(success=True)
    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}")
        return jsonify(error=str(e)), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
