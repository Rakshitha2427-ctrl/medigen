@echo off
echo Starting MediGen Full Stack Application...

REM Start backend in a new window
echo Starting Backend Server...
start "MediGen Backend" cmd /k "cd /d Backend && start_backend.bat"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new window
echo Starting Frontend Server...
start "MediGen Frontend" cmd /k "cd /d Frontend && start_frontend.bat"

echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173 (or http://localhost:3000)
echo.
echo Press any key to close this window (servers will continue running)
pause
