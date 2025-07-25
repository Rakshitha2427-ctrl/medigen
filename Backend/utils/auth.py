from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta, datetime
import os

# Initialize JWT Manager
jwt = JWTManager()

# Function to create a new JWT token
def generate_token(identity):
    # Set token expiration time
    expires = datetime.utcnow() + timedelta(days=1)  # Token valid for 1 day
    token = create_access_token(identity=identity, expires_delta=expires)
    return token

# Function to verify the token
@jwt_required()
def verify_token():
    current_user = get_jwt_identity()
    return current_user

# Function to configure JWT
def configure_jwt(app):
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret_key')  # Change this to a secure key
    jwt.init_app(app)