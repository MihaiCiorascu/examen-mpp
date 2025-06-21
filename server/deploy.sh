#!/bin/bash

echo "🚀 Political Candidates Backend Deployment Script"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Test the server locally
echo "🧪 Testing server locally..."
timeout 5s node server.js &
SERVER_PID=$!

sleep 2

# Test health endpoint
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Server is working correctly"
    kill $SERVER_PID 2>/dev/null
else
    echo "❌ Server test failed"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎯 Choose your deployment platform:"
echo "1. Railway (Recommended - Easy & Free)"
echo "2. Render (Free tier available)"
echo "3. Heroku (Paid)"
echo "4. Vercel (Free tier)"
echo "5. Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🚂 Deploying to Railway..."
        if ! command -v railway &> /dev/null; then
            echo "📥 Installing Railway CLI..."
            npm install -g @railway/cli
        fi
        echo "🔐 Please login to Railway..."
        railway login
        echo "🚀 Deploying..."
        railway up
        echo "🌐 Getting deployment URL..."
        railway domain
        ;;
    2)
        echo "🎨 Deploying to Render..."
        echo "📝 Please follow these steps:"
        echo "1. Go to https://render.com"
        echo "2. Connect your GitHub repository"
        echo "3. Create a new Web Service"
        echo "4. Set Build Command: npm install"
        echo "5. Set Start Command: npm start"
        echo "6. Set Health Check Path: /health"
        echo "7. Deploy!"
        ;;
    3)
        echo "🦸 Deploying to Heroku..."
        if ! command -v heroku &> /dev/null; then
            echo "📥 Installing Heroku CLI..."
            npm install -g heroku
        fi
        echo "🔐 Please login to Heroku..."
        heroku login
        read -p "Enter your Heroku app name: " app_name
        heroku create $app_name
        git add .
        git commit -m "Deploy backend"
        git push heroku main
        echo "🌐 Your app is available at: https://$app_name.herokuapp.com"
        ;;
    4)
        echo "⚡ Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "📥 Installing Vercel CLI..."
            npm install -g vercel
        fi
        echo "🚀 Deploying..."
        vercel --prod
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment completed!"
echo "📊 Don't forget to update your frontend WebSocket URL after deployment."
echo "📖 Check the README.md for more details." 