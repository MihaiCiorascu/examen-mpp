# Political Candidates Backend

A Node.js backend with WebSocket support for real-time political candidate management.

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easy & Free)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize and Deploy:**
   ```bash
   cd server
   railway init
   railway up
   ```

4. **Get your deployment URL:**
   ```bash
   railway domain
   ```

### Option 2: Render (Free tier available)

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`

### Option 3: Heroku (Paid)

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login and Deploy:**
   ```bash
   cd server
   heroku login
   heroku create your-app-name
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Option 4: Vercel (Free tier)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd server
   vercel
   ```

## 🔧 Environment Variables

The server uses these environment variables:

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## 📡 API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `WebSocket /` - Real-time communication

## 🔌 WebSocket Events

### Client → Server:
- `CREATE_CANDIDATE` - Create new candidate
- `UPDATE_CANDIDATE` - Update existing candidate
- `DELETE_CANDIDATE` - Delete candidate
- `START_GENERATOR` - Start candidate generator
- `STOP_GENERATOR` - Stop candidate generator

### Server → Client:
- `CANDIDATES_LOADED` - Initial candidates data
- `CANDIDATE_CREATED` - New candidate created
- `CANDIDATE_UPDATED` - Candidate updated
- `CANDIDATE_DELETED` - Candidate deleted
- `GENERATOR_STARTED` - Generator started
- `GENERATOR_STOPPED` - Generator stopped

## 🧪 Testing Your Deployment

1. **Health Check:**
   ```bash
   curl https://your-app-url.railway.app/health
   ```

2. **WebSocket Test:**
   ```javascript
   const ws = new WebSocket('wss://your-app-url.railway.app');
   ws.onopen = () => console.log('Connected!');
   ws.onmessage = (event) => console.log('Received:', JSON.parse(event.data));
   ```

## 🔄 Update Frontend Configuration

After deployment, update your frontend WebSocket URL:

```typescript
// In src/services/websocketService.ts
const SOCKET_URL = 'wss://your-app-url.railway.app';
```

## 📊 Monitoring

- **Railway:** Built-in monitoring dashboard
- **Render:** Built-in logs and metrics
- **Heroku:** `heroku logs --tail`
- **Vercel:** Built-in analytics

## 🛠️ Local Development

```bash
cd server
npm install
npm run dev
```

Server will run on `http://localhost:3001` 