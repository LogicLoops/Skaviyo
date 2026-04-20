@echo off
REM 🚀 Skaviyo Admin Panel - Backend Starter for Windows

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║        🚀 SKAVIYO BACKEND SERVER - STARTING 🚀                         ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.

cd /d "C:\Users\subak\Desktop\skaviyo\Skaviyo\backend"

echo 📦 Installing dependencies...
call npm install

echo.
echo ✨ Starting Backend Server...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🌐 Backend API will start on: http://localhost:4000
echo 🏥 Health check: http://localhost:4000/health
echo.
echo ℹ️  Keep this window open while using the admin panel
echo ℹ️  Open a new terminal window to start the frontend
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

call npm run dev

pause
