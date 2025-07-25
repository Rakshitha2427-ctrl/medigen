from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    salt_content_id = db.Column(db.Integer, db.ForeignKey('salt_content.id'), nullable=False)
    reviews = db.relationship('Review', backref='product', lazy=True)

class SaltContent(db.Model):
    __tablename__ = 'salt_content'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)

class Description(db.Model):
    __tablename__ = 'descriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)