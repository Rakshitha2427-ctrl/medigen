#!/usr/bin/env python3
"""
Setup script for MediGen backend
"""

import os
import sys
import subprocess

def install_requirements():
    """Install required packages"""
    print("Installing requirements...")
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])

def setup_environment():
    """Set up environment variables"""
    os.environ.setdefault('FLASK_APP', 'app.py')
    os.environ.setdefault('FLASK_ENV', 'development')

def main():
    print("Setting up MediGen Backend...")
    
    # Change to backend directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Install requirements
    install_requirements()
    
    # Setup environment
    setup_environment()
    
    print("Setup complete!")
    print("To run the backend server:")
    print("python app.py")

if __name__ == '__main__':
    main()
