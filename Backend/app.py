from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Configure CORS with specific origins
CORS(app, origins=app.config['CORS_ORIGINS'])

# Import models and initialize db
from models import db, Product, SaltContent, Review, MedicineUse, AlternativeMedicine, FAQ
db.init_app(app)
jwt = JWTManager(app)

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    # Dummy authentication
    if username == 'admin' and password == 'password':
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_detail(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/search', methods=['GET'])
def search_products():
    try:
        query = request.args.get('q', '')
        if not query:
            return jsonify([]), 200
        
        products = Product.query.filter(
            db.or_(
                Product.name.ilike(f'%{query}%'),
                Product.generic_name.ilike(f'%{query}%'),
                Product.brand_name.ilike(f'%{query}%')
            )
        ).all()
        
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    try:
        data = request.json
        product = Product(
            name=data.get('name'),
            generic_name=data.get('generic_name'),
            brand_name=data.get('brand_name'),
            description=data.get('description'),
            price=data.get('price'),
            image_url=data.get('image_url'),
            rating=data.get('rating', 0.0)
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify(product.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    try:
        reviews = Review.query.filter_by(product_id=product_id).all()
        return jsonify([review.to_dict() for review in reviews]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>/reviews', methods=['POST'])
def add_product_review(product_id):
    try:
        data = request.json
        review = Review(
            product_id=product_id,
            user_name=data.get('user_name', 'Anonymous'),
            rating=data.get('rating'),
            comment=data.get('comment')
        )
        
        db.session.add(review)
        db.session.commit()
        
        # Update product rating
        product = Product.query.get(product_id)
        if product:
            reviews = Review.query.filter_by(product_id=product_id).all()
            avg_rating = sum(r.rating for r in reviews) / len(reviews)
            product.rating = round(avg_rating, 1)
            db.session.commit()
        
        return jsonify(review.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>/faqs', methods=['GET'])
def get_product_faqs(product_id):
    try:
        faqs = FAQ.query.filter_by(product_id=product_id).all()
        return jsonify([faq.to_dict() for faq in faqs]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>/alternatives', methods=['GET'])
def get_product_alternatives(product_id):
    try:
        alternatives = AlternativeMedicine.query.filter_by(product_id=product_id).all()
        return jsonify([alt.to_dict() for alt in alternatives]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Initialize database tables
def create_tables():
    with app.app_context():
        db.create_all()
        # Add sample data if tables are empty
        if Product.query.count() == 0:
            add_sample_data()

def add_sample_data():
    # Add DOLO 650MG sample data
    dolo_product = Product(
        name="DOLO 650MG TABLET",
        generic_name="Paracetamol",
        brand_name="Dolo",
        description="DOLO 650MG TABLET contains Paracetamol, a pain reliever and fever reducer...",
        price=34.00,
        rating=4.5,
        image_url="/images/dolo-650.jpg"
    )
    
    db.session.add(dolo_product)
    db.session.flush()  # Get the ID
    
    # Add salt content
    salt_content = SaltContent(
        product_id=dolo_product.id,
        salt_name="Paracetamol",
        concentration="650mg"
    )
    db.session.add(salt_content)
    
    # Add medicine uses
    uses = [
        MedicineUse(product_id=dolo_product.id, use_case="Fever"),
        MedicineUse(product_id=dolo_product.id, use_case="Headache"),
        MedicineUse(product_id=dolo_product.id, use_case="Tooth pain")
    ]
    db.session.add_all(uses)
    
    # Add FAQs
    faqs = [
        FAQ(
            product_id=dolo_product.id,
            question="What is Paracetamol used for?",
            answer="Paracetamol is used to treat pain and reduce fever. It's commonly used for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers."
        ),
        FAQ(
            product_id=dolo_product.id,
            question="Can I take Dolo 650 with food?",
            answer="Yes, Dolo 650 can be taken with or without food. However, taking it with food may help reduce stomach irritation in some people."
        )
    ]
    db.session.add_all(faqs)
    
    # Add reviews
    reviews = [
        Review(
            product_id=dolo_product.id,
            user_name="Anonymous",
            rating=5,
            comment="The medicine is good in fast action when compared with the exact generic medicine."
        ),
        Review(
            product_id=dolo_product.id,
            user_name="Anonymous",
            rating=5,
            comment="It works well for fever and body pain."
        ),
        Review(
            product_id=dolo_product.id,
            user_name="Anonymous",
            rating=5,
            comment="Affordable and reliable painkiller."
        )
    ]
    db.session.add_all(reviews)
    
    # Add alternative medicines
    alternatives = [
        AlternativeMedicine(
            product_id=dolo_product.id,
            alternative_name="Dolo 650 mg",
            alternative_price=34.00,
            alternative_rating=4.2
        ),
        AlternativeMedicine(
            product_id=dolo_product.id,
            alternative_name="Dolo 650 mg",
            alternative_price=34.00,
            alternative_rating=4.0
        ),
        AlternativeMedicine(
            product_id=dolo_product.id,
            alternative_name="Dolo 650 mg",
            alternative_price=34.00,
            alternative_rating=3.8
        )
    ]
    db.session.add_all(alternatives)
    
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        create_tables()  # Initialize database on startup
    app.run(debug=True)