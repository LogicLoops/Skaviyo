@echo off
REM 🚀 Skaviyo Admin Panel - Frontend Starter for Windows

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║        🎨 SKAVIYO FRONTEND DASHBOARD - STARTING 🎨                    ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.

cd /d "C:\Users\subak\Desktop\skaviyo\Skaviyo\frontend"

echo 📦 Installing dependencies...
call npm install

echo.
echo ✨ Starting Frontend Server...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🌐 Frontend Dashboard will start on: http://localhost:5173
echo.
echo ✓ Header with navigation
echo ✓ Search bar
echo ✓ Announcement banner
echo ✓ Hero section
echo ✓ Category grid (8 categories)
echo ✓ Responsive design
echo.
echo ℹ️  Make sure the backend is running on port 4000
echo ℹ️  Keep this window open while using the admin panel
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

call npm run dev

pause
