# Medingen Backend API

## Overview
This document provides instructions for setting up and running the Flask backend API for the Medingen application. The API serves as the backend for the React frontend, providing dynamic data loading and user authentication.

## Project Structure
- **app.py**: Main entry point for the Flask API. Initializes the app and sets up routes.
- **models.py**: Defines the database models using SQLAlchemy, including tables for product content, salt content, reviews, and descriptions.
- **requirements.txt**: Lists the dependencies required for the Flask API.
- **config.py**: Contains configuration settings for the Flask application, including database connection details and JWT secret keys.
- **utils/auth.py**: Utility functions for handling JWT authentication.
- **static/**: Directory for static files served by the Flask app.

## Setup Instructions

### Prerequisites
- Python 3.x
- MySQL Server
- Virtual Environment (recommended)

### Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your_username/medingen-your_full_name.git
   cd medingen-app/backend
   ```

2. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Database**
   - Update the database connection details in `config.py` to match your MySQL setup.

5. **Run Database Migrations**
   - Ensure your database is set up according to the SQL export provided in the `database` directory.

6. **Run the Flask Application**
   ```bash
   python app.py
   ```

### API Endpoints
- **/api/products**: Fetches a list of products.
- **/api/salt-content**: Fetches salt content related to products.
- **/api/reviews**: Fetches reviews for products.
- **/api/descriptions**: Fetches product descriptions.
- **/api/login**: Authenticates users and returns a JWT token.

## Authentication
The API uses JWT for authentication. A dummy login system is implemented, where users can log in with a username and password.

## Running the Application
Once the Flask application is running, you can access the API at `http://localhost:5000`. Ensure the frontend is configured to point to this API endpoint for data fetching.

## Additional Notes
- Ensure to handle any CORS issues if the frontend and backend are served from different origins.
- For production, consider using a WSGI server like Gunicorn to serve the Flask app.

## License
This project is licensed under the MIT License.