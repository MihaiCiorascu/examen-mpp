# 🚀 Deployment Guide - Political Candidates App

This guide will help you deploy both the backend and frontend of your political candidates application.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git repository
- Account on your chosen deployment platform

## 🔧 Backend Deployment

### Quick Start (Windows)

1. **Navigate to the server directory:**
   ```bash
   cd political-candidates/server
   ```

2. **Run the deployment script:**
   ```bash
   deploy.bat
   ```

3. **Follow the prompts to choose your platform**

### Manual Deployment

#### Option 1: Railway (Recommended - Free & Easy)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   cd political-candidates/server
   railway login
   railway init
   railway up
   ```

3. **Get your URL:**
   ```bash
   railway domain
   ```

#### Option 2: Render (Free tier)

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`

#### Option 3: Heroku (Paid)

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Deploy:**
   ```bash
   cd political-candidates/server
   heroku login
   heroku create your-app-name
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd political-candidates
   vercel
   ```

3. **Follow the prompts and deploy**

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Option 3: Railway (Full Stack)

Deploy both frontend and backend on Railway:

1. **Backend:**
   ```bash
   cd political-candidates/server
   railway up
   ```

2. **Frontend:**
   ```bash
   cd political-candidates
   railway up
   ```

## 🔄 Update Configuration

After deploying the backend, update your frontend WebSocket URL:

1. **Find your backend URL** (e.g., `https://your-app.railway.app`)

2. **Update the WebSocket service:**
   ```typescript
   // src/services/websocketService.ts
   const SOCKET_URL = 'wss://your-app.railway.app';
   ```

3. **Redeploy the frontend**

## 🧪 Testing Your Deployment

### Backend Health Check
```bash
curl https://your-backend-url/health
```

### WebSocket Test
```javascript
const ws = new WebSocket('wss://your-backend-url');
ws.onopen = () => console.log('Connected!');
ws.onmessage = (event) => console.log('Received:', JSON.parse(event.data));
```

### Frontend Test
1. Open your frontend URL
2. Check browser console for WebSocket connection
3. Test CRUD operations
4. Test the candidate generator

## 📊 Environment Variables

### Backend
- `PORT` - Server port (auto-set by platform)
- `NODE_ENV` - Environment (production)

### Frontend
- `NEXT_PUBLIC_WEBSOCKET_URL` - WebSocket URL (optional)

## 🔍 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check if backend is running
   - Verify WebSocket URL is correct
   - Check CORS settings

2. **Build Errors**
   - Ensure all dependencies are installed
   - Check Node.js version compatibility
   - Review build logs

3. **Runtime Errors**
   - Check server logs
   - Verify environment variables
   - Test locally first

### Debug Commands

```bash
# Check backend logs
railway logs

# Check frontend build
npm run build

# Test locally
npm run dev
```

## 📈 Monitoring

- **Railway:** Built-in dashboard with logs and metrics
- **Vercel:** Analytics and performance monitoring
- **Render:** Built-in monitoring and alerts
- **Heroku:** `heroku logs --tail`

## 🎯 Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] WebSocket URL updated in frontend
- [ ] Health check endpoint working
- [ ] CRUD operations tested
- [ ] Candidate generator tested
- [ ] Multiple clients tested
- [ ] Error handling verified

## 📞 Support

If you encounter issues:

1. Check the platform's documentation
2. Review server logs
3. Test locally first
4. Check browser console for errors
5. Verify all URLs are correct

## 🎉 Success!

Once deployed, your app will be available at:
- **Frontend:** `https://your-frontend-url`
- **Backend:** `https://your-backend-url`
- **Health Check:** `https://your-backend-url/health`

Share your URLs and enjoy your real-time political candidates app! 🚀 