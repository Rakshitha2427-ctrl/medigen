#!/bin/bash
echo "Starting MediGen Full Stack Application..."

# Start backend in background
echo "Starting Backend Server..."
cd Backend
gnome-terminal -- bash -c "./start_backend.sh; exec bash" &
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "Starting Frontend Server..."
cd Frontend
gnome-terminal -- bash -c "./start_frontend.sh; exec bash" &
cd ..

echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173 (or http://localhost:3000)"
echo ""
echo "Press Ctrl+C to stop this script (servers will continue running)"

# Keep script running
while true; do
    sleep 1
done
