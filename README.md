# Medingen Project

## Overview
The Medingen project consists of a React frontend and a Flask backend, designed to dynamically load and display product information, salt content, reviews, and descriptions from a MySQL database. This README provides an overview of the project structure and setup instructions.

## Project Structure
```
medingen-app
├── backend                # Flask API
│   ├── app.py            # Main entry point for the Flask API
│   ├── models.py         # Database models using SQLAlchemy
│   ├── requirements.txt   # Dependencies for the Flask API
│   ├── config.py         # Configuration settings for the Flask app
│   ├── utils              # Utility functions for authentication
│   │   └── auth.py       # JWT authentication utilities
│   ├── static             # Static files served by the Flask app
│   └── README.md         # Documentation for the backend
├── frontend               # React application
│   ├── public             # Public assets
│   │   ├── index.html     # Main HTML file for the React app
│   │   └── favicon.ico    # Favicon for the React app
│   ├── src                # Source files for the React app
│   │   ├── components      # Reusable components
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ReviewSection.jsx
│   │   │   ├── SaltContent.jsx
│   │   │   ├── Description.jsx
│   │   │   └── Login.jsx
│   │   ├── context        # Context for state management
│   │   │   └── AppContext.js
│   │   ├── App.jsx        # Main component rendering the application
│   │   ├── index.js       # Entry point for the React application
│   │   ├── api            # API call functions
│   │   │   └── api.js
│   │   ├── assets         # Asset files (e.g., images)
│   │   │   └── logo.png
│   │   └── styles         # CSS styles
│   │       └── main.css
│   ├── package.json       # Dependencies and scripts for the React app
│   └── README.md          # Documentation for the frontend
├── database               # Database export
│   ├── medingen_db_export.sql # SQL export of the MySQL database
│   └── README.md          # Documentation for the database
└── README.md              # Overall project documentation
```

## Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set up the MySQL database using the provided SQL export file (`medingen_db_export.sql`).
4. Run the Flask API:
   ```
   python app.py
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

### Database Setup
1. Import the `medingen_db_export.sql` file into your local MySQL database to create the necessary tables and sample data.

## Conclusion
This project demonstrates a full-stack application using React and Flask, with a focus on modular design, dynamic data loading, and best practices in both frontend and backend development.