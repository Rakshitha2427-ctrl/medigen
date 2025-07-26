from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    generic_name = db.Column(db.String(200), nullable=True)
    brand_name = db.Column(db.String(200), nullable=True)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    rating = db.Column(db.Numeric(3, 2), nullable=True, default=0.0)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    salt_contents = db.relationship('SaltContent', backref='product', lazy=True, cascade='all, delete-orphan')
    reviews = db.relationship('Review', backref='product', lazy=True, cascade='all, delete-orphan')
    uses = db.relationship('MedicineUse', backref='product', lazy=True, cascade='all, delete-orphan')
    faqs = db.relationship('FAQ', backref='product', lazy=True, cascade='all, delete-orphan')
    alternative_medicines = db.relationship('AlternativeMedicine', foreign_keys='AlternativeMedicine.product_id', backref='main_product', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'generic_name': self.generic_name,
            'brand_name': self.brand_name,
            'description': self.description,
            'price': float(self.price) if self.price else 0,
            'image_url': self.image_url,
            'rating': float(self.rating) if self.rating else 0,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'salt_contents': [salt.to_dict() for salt in self.salt_contents],
            'reviews': [review.to_dict() for review in self.reviews],
            'uses': [use.to_dict() for use in self.uses],
            'faqs': [faq.to_dict() for faq in self.faqs],
            'alternatives': [alt.to_dict() for alt in self.alternative_medicines]
        }

class SaltContent(db.Model):
    __tablename__ = 'salt_content'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    salt_name = db.Column(db.String(200), nullable=False)
    concentration = db.Column(db.String(100), nullable=False)  # e.g., "650mg", "500mg"
    
    def to_dict(self):
        return {
            'id': self.id,
            'salt_name': self.salt_name,
            'concentration': self.concentration
        }

class MedicineUse(db.Model):
    __tablename__ = 'medicine_uses'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    use_case = db.Column(db.String(200), nullable=False)  # e.g., "Fever", "Headache", "Tooth pain"
    
    def to_dict(self):
        return {
            'id': self.id,
            'use_case': self.use_case
        }

class AlternativeMedicine(db.Model):
    __tablename__ = 'alternative_medicines'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    alternative_name = db.Column(db.String(200), nullable=False)
    alternative_price = db.Column(db.Numeric(10, 2), nullable=False)
    alternative_rating = db.Column(db.Numeric(3, 2), nullable=True, default=0.0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.alternative_name,
            'price': float(self.alternative_price),
            'rating': float(self.alternative_rating) if self.alternative_rating else 0
        }

class FAQ(db.Model):
    __tablename__ = 'faqs'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user_name = db.Column(db.String(100), nullable=True, default='Anonymous')
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

