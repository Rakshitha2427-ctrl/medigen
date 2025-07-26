import os

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'medigen-secret-key-2025'
    DEBUG = os.environ.get('DEBUG', 'True').lower() in ['true', '1']

    # Database settings - Using SQLite for easier setup
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f'sqlite:///{os.path.join(basedir, "medigen.db")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT settings
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'medigen-jwt-secret-2025'
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour

    # CORS settings
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173']