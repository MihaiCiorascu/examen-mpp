@echo off
echo 🚀 Political Candidates Backend Deployment Script
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

echo.
echo 🎯 Choose your deployment platform:
echo 1. Railway (Recommended - Easy ^& Free)
echo 2. Render (Free tier available)
echo 3. Heroku (Paid)
echo 4. Vercel (Free tier)
echo 5. Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto railway
if "%choice%"=="2" goto render
if "%choice%"=="3" goto heroku
if "%choice%"=="4" goto vercel
if "%choice%"=="5" goto exit
echo ❌ Invalid choice. Please run the script again.
pause
exit /b 1

:railway
echo 🚂 Deploying to Railway...
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 Installing Railway CLI...
    npm install -g @railway/cli
)
echo 🔐 Please login to Railway...
railway login
echo 🚀 Deploying...
railway up
echo 🌐 Getting deployment URL...
railway domain
goto end

:render
echo 🎨 Deploying to Render...
echo 📝 Please follow these steps:
echo 1. Go to https://render.com
echo 2. Connect your GitHub repository
echo 3. Create a new Web Service
echo 4. Set Build Command: npm install
echo 5. Set Start Command: npm start
echo 6. Set Health Check Path: /health
echo 7. Deploy!
goto end

:heroku
echo 🦸 Deploying to Heroku...
heroku --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 Installing Heroku CLI...
    npm install -g heroku
)
echo 🔐 Please login to Heroku...
heroku login
set /p app_name="Enter your Heroku app name: "
heroku create %app_name%
git add .
git commit -m "Deploy backend"
git push heroku main
echo 🌐 Your app is available at: https://%app_name%.herokuapp.com
goto end

:vercel
echo ⚡ Deploying to Vercel...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 Installing Vercel CLI...
    npm install -g vercel
)
echo 🚀 Deploying...
vercel --prod
goto end

:exit
echo 👋 Goodbye!
pause
exit /b 0

:end
echo.
echo 🎉 Deployment completed!
echo 📊 Don't forget to update your frontend WebSocket URL after deployment.
echo 📖 Check the README.md for more details.
pause 