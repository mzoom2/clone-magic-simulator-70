
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'kaabo-secret-key'  # In production, use environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kaabo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, supports_credentials=True)

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

class Package(db.Model):
    id = db.Column(db.String(80), primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    route = db.Column(db.String(120), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    single_price = db.Column(db.String(20), nullable=False)
    double_price = db.Column(db.String(20), nullable=False)
    date = db.Column(db.String(120), nullable=False)

# Authentication decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"error": "Authentication required"}), 401
        
        user = User.query.get(session['user_id'])
        if not user or not user.is_admin:
            return jsonify({"error": "Admin privileges required"}), 403
            
        return f(*args, **kwargs)
    return decorated_function

# Routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    
    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "is_admin": user.is_admin
            }
        })
    
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logout successful"})

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user:
            return jsonify({
                "authenticated": True,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "is_admin": user.is_admin
                }
            })
    
    return jsonify({"authenticated": False})

@app.route('/api/packages', methods=['GET'])
def get_packages():
    packages = Package.query.all()
    return jsonify([{
        "id": pkg.id,
        "title": pkg.title,
        "route": pkg.route,
        "image": pkg.image,
        "description": pkg.description,
        "singlePrice": pkg.single_price,
        "doublePrice": pkg.double_price,
        "date": pkg.date
    } for pkg in packages])

@app.route('/api/packages/<string:id>', methods=['PUT'])
@admin_required
def update_package(id):
    data = request.get_json()
    package = Package.query.get(id)
    
    if not package:
        return jsonify({"error": "Package not found"}), 404
    
    package.single_price = data.get('singlePrice', package.single_price)
    package.double_price = data.get('doublePrice', package.double_price)
    
    db.session.commit()
    
    return jsonify({
        "message": "Package updated successfully",
        "package": {
            "id": package.id,
            "title": package.title,
            "singlePrice": package.single_price,
            "doublePrice": package.double_price
        }
    })

# Initialize database and create admin user
@app.before_first_request
def initialize_database():
    db.create_all()
    
    # Create admin user if it doesn't exist
    admin = User.query.filter_by(username="admin").first()
    if not admin:
        admin = User(
            username="admin",
            password=generate_password_hash("admin123"),
            is_admin=True
        )
        db.session.add(admin)
    
    # Add packages if they don't exist
    if Package.query.count() == 0:
        packages_data = [
            {
                "id": "summer-tech",
                "title": "SUMMER TECH",
                "route": "/catalogue/summer-tech",
                "image": "/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png",
                "description": "Engage with industry leaders and innovators from across the continent during Africa's biggest open source conference.",
                "single_price": "2,400",
                "double_price": "1,900",
                "date": "JUNE 19TH - 21ST, 2025",
            },
            {
                "id": "october-tech",
                "title": "OCTOBER TECH",
                "route": "/catalogue/october-tech",
                "image": "/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png",
                "description": "Meet the founders, business leaders, and innovators shaping Africa's tech ecosystem.",
                "single_price": "3,000",
                "double_price": "2,400",
                "date": "OCTOBER 13TH - 19TH, 2025",
            },
            {
                "id": "fashion-week",
                "title": "FASHION WEEK",
                "route": "/catalogue/fashion-week",
                "image": "/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png",
                "description": "Experience the vibrant fashion scene in Lagos, the fashion capital of Africa.",
                "single_price": "3,500",
                "double_price": "2,800",
                "date": "APRIL 25TH - MAY 1ST, 2025",
            },
            {
                "id": "lagos-artventure",
                "title": "LAGOS ARTVENTURE",
                "route": "/catalogue/lagos-artventure",
                "image": "/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png",
                "description": "Explore Lagos' vibrant art scene with exclusive gallery access and artist meetings.",
                "single_price": "3,200",
                "double_price": "2,600",
                "date": "AUGUST 15TH - 21ST, 2025",
            },
            {
                "id": "behind-the-scenes",
                "title": "BEHIND THE SCENES",
                "route": "/catalogue/behind-the-scenes",
                "image": "/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png",
                "description": "Get exclusive access to Nigeria's influential media, entertainment, and creative spaces.",
                "single_price": "3,800",
                "double_price": "3,100",
                "date": "SEPTEMBER 10TH - 16TH, 2025",
            },
            {
                "id": "detty-december",
                "title": "DETTY DECEMBER",
                "route": "/catalogue/detty-december",
                "image": "/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png",
                "description": "Experience the full excitement of Detty December with exclusive access to Lagos' hottest events.",
                "single_price": "5,000",
                "double_price": "4,300",
                "date": "DECEMBER 2025",
            }
        ]
        
        for pkg_data in packages_data:
            package = Package(
                id=pkg_data["id"],
                title=pkg_data["title"],
                route=pkg_data["route"],
                image=pkg_data["image"],
                description=pkg_data["description"],
                single_price=pkg_data["single_price"],
                double_price=pkg_data["double_price"],
                date=pkg_data["date"]
            )
            db.session.add(package)
    
    db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
