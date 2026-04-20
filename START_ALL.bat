@echo off
REM 🚀 Skaviyo Admin Panel - All-in-One Starter

cls

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║         🎉 SKAVIYO ADMIN PANEL - LAUNCHING ALL SERVICES 🎉            ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.

echo 📊 Starting Services...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

echo 1️⃣  Starting Backend API Server (Port 4000)...
start "Skaviyo Backend" cmd /k "cd /d C:\Users\subak\Desktop\skaviyo\Skaviyo\backend && npm run dev"

timeout /t 3

echo 2️⃣  Starting Frontend Dashboard (Port 5173)...
start "Skaviyo Frontend" cmd /k "cd /d C:\Users\subak\Desktop\skaviyo\Skaviyo\frontend && npm run dev"

echo.
echo ✅ All services are launching...
echo.
echo 📋 What's Running:
echo   ├─ Backend API:     http://localhost:4000
echo   ├─ Frontend:        http://localhost:5173
echo   └─ Health Check:    http://localhost:4000/health
echo.
echo ℹ️  You should see two new terminal windows opening...
echo.
timeout /t 2

echo 🌐 Opening Dashboard in Browser...
start "" "http://localhost:5173"

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║              ✨ ADMIN PANEL IS READY! ✨                               ║
echo ║                                                                        ║
echo ║  🚀 Backend:  http://localhost:4000                                    ║
echo ║  🎨 Frontend: http://localhost:5173                                    ║
echo ║                                                                        ║
echo ║  Both terminal windows should now be visible.                          ║
echo ║  Keep them running while using the admin panel.                        ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.

pause
