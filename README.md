# MediGen - Medicine Information System

A full-stack web application for managing and viewing medicine information, including details, alternatives, reviews, and FAQs.

## Features

- 🔍 **Medicine Search** - Search for medicines by name
- 📊 **Medicine Details** - View comprehensive information including active ingredients and uses
- 🔄 **Compare Alternatives** - Compare different medicine options
- ⭐ **Reviews & Ratings** - Read and submit medicine reviews
- ❓ **FAQs** - Frequently asked questions about medicines
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Backend

- **Flask** - Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (can be easily switched to MySQL/PostgreSQL)
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-JWT-Extended** - JWT authentication

### Frontend

- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Option 1: Automatic Setup (Windows)

1. Clone the repository
2. Double-click `start_medigen.bat` to start both servers automatically

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the Backend directory:

   ```bash
   cd Backend
   ```

2. Create and activate virtual environment:

   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   python app.py
   ```

The backend server will start at `http://localhost:5000`

#### Frontend Setup

1. Navigate to the Frontend directory:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or `http://localhost:3000`)

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
