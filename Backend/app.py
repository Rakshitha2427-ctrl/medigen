from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Models import
from models import Product, SaltContent, Review, Description

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
@jwt_required()
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@app.route('/api/salt-content', methods=['GET'])
@jwt_required()
def get_salt_content():
    salt_content = SaltContent.query.all()
    return jsonify([salt.to_dict() for salt in salt_content]), 200

@app.route('/api/reviews', methods=['GET'])
@jwt_required()
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200

@app.route('/api/descriptions', methods=['GET'])
@jwt_required()
def get_descriptions():
    descriptions = Description.query.all()
    return jsonify([description.to_dict() for description in descriptions]), 200

if __name__ == '__main__':
    app.run(debug=True)