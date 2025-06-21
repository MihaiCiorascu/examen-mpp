const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for candidates
let candidates = [
  {
    id: "1",
    name: "Lionel Messi",
    politicalParty: "Democratic Party",
    picture: "/candidates/messi.jpg"
  },
  {
    id: "2", 
    name: "Robert Lewandowski",
    politicalParty: "Republican Party",
    picture: "/candidates/lewa.jpg"
  },
  {
    id: "3",
    name: "Pedri González",
    politicalParty: "Independent",
    picture: "/candidates/pedri.jpg"
  },
  {
    id: "4",
    name: "Raphinha",
    politicalParty: "Green Party",
    picture: "/candidates/raphina.jpg"
  },
  {
    id: "5",
    name: "Ferran Torres",
    politicalParty: "Libertarian Party",
    picture: "/candidates/ferran.jpg"
  },
  {
    id: "6",
    name: "Lamine Yamal",
    politicalParty: "Democratic Party",
    picture: "/candidates/yamal.jpeg"
  },
  {
    id: "7",
    name: "Gavi",
    politicalParty: "Progressive Party",
    picture: "/candidates/gavi.jpg"
  },
  {
    id: "8",
    name: "Ronald Araujo",
    politicalParty: "Conservative Party",
    picture: "/candidates/araujo.jpg"
  },
  {
    id: "9",
    name: "Johan Cruyff",
    politicalParty: "Reform Party",
    picture: "/candidates/cruyff.jpg"
  },
  {
    id: "10",
    name: "Hans-Dieter Flick",
    politicalParty: "Unity Party",
    picture: "/candidates/flick.png"
  }
];

// Sample data for random generation
const sampleNames = [
  'Alex Johnson', 'Maria Garcia', 'David Chen', 'Sarah Williams', 'Michael Brown',
  'Emma Davis', 'James Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez',
  'Christopher Lee', 'Amanda Rodriguez', 'Daniel Thompson', 'Jessica White', 'Matthew Harris',
  'Nicole Clark', 'Andrew Lewis', 'Stephanie Hall', 'Joshua Young', 'Rachel Allen'
];

const sampleParties = [
  'Democratic Party', 'Republican Party', 'Independent', 'Green Party', 'Libertarian Party',
  'Progressive Party', 'Conservative Party', 'Reform Party', 'Unity Party', 'People\'s Party'
];

const sampleImages = [
  '/candidates/messi.jpg', '/candidates/lewa.jpg', '/candidates/pedri.jpg',
  '/candidates/raphina.jpg', '/candidates/ferran.jpg', '/candidates/yamal.jpeg',
  '/candidates/gavi.jpg', '/candidates/araujo.jpg', '/candidates/cruyff.jpg', '/candidates/flick.png'
];

let isGenerating = false;
let generationInterval = null;

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  // Send initial candidates data
  ws.send(JSON.stringify({
    type: 'INIT_CANDIDATES',
    data: candidates
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received WebSocket message:', data.type, JSON.stringify(data, null, 2));
      
      switch (data.type) {
        case 'GET_CANDIDATES':
          console.log('Sending candidates update');
          ws.send(JSON.stringify({
            type: 'CANDIDATES_UPDATE',
            data: candidates
          }));
          break;

        case 'ADD_CANDIDATE':
          console.log('Adding new candidate:', data.data.candidate);
          if (!data.data.candidate || !data.data.candidate.name || !data.data.candidate.politicalParty) {
            console.error('Invalid candidate data:', data);
            return;
          }
          const newCandidate = {
            id: uuidv4(),
            name: data.data.candidate.name,
            politicalParty: data.data.candidate.politicalParty,
            picture: data.data.candidate.picture || '/candidates/flick.png'
          };
          candidates.push(newCandidate);
          console.log('Broadcasting candidate added:', newCandidate);
          broadcastToAll({
            type: 'CANDIDATE_ADDED',
            data: newCandidate
          });
          break;

        case 'UPDATE_CANDIDATE':
          console.log('Updating candidate:', data.data.candidate);
          if (!data.data.candidate || !data.data.candidate.id) {
            console.error('Invalid candidate data for update:', data);
            return;
          }
          const candidateIndex = candidates.findIndex(c => c.id === data.data.candidate.id);
          if (candidateIndex !== -1) {
            candidates[candidateIndex] = { ...candidates[candidateIndex], ...data.data.candidate };
            console.log('Broadcasting candidate updated:', candidates[candidateIndex]);
            broadcastToAll({
              type: 'CANDIDATE_UPDATED',
              data: candidates[candidateIndex]
            });
          } else {
            console.log('Candidate not found for update:', data.data.candidate.id);
          }
          break;

        case 'DELETE_CANDIDATE':
          console.log('Deleting candidate:', data.data.candidateId);
          if (!data.data.candidateId) {
            console.error('Invalid candidate ID for deletion:', data);
            return;
          }
          const deleteIndex = candidates.findIndex(c => c.id === data.data.candidateId);
          if (deleteIndex !== -1) {
            const deletedCandidate = candidates.splice(deleteIndex, 1)[0];
            console.log('Broadcasting candidate deleted:', data.data.candidateId);
            broadcastToAll({
              type: 'CANDIDATE_DELETED',
              data: { id: data.data.candidateId }
            });
          } else {
            console.log('Candidate not found for deletion:', data.data.candidateId);
          }
          break;

        case 'START_GENERATOR':
          if (!isGenerating) {
            isGenerating = true;
            generationInterval = setInterval(() => {
              const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
              const randomParty = sampleParties[Math.floor(Math.random() * sampleParties.length)];
              const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];

              const newCandidate = {
                id: uuidv4(),
                name: randomName,
                politicalParty: randomParty,
                picture: randomImage
              };
              candidates.push(newCandidate);
              
              broadcastToAll({
                type: 'CANDIDATE_GENERATED',
                data: newCandidate
              });
            }, 1000);
            
            ws.send(JSON.stringify({
              type: 'GENERATOR_STARTED',
              data: { message: 'Generator started' }
            }));
          }
          break;

        case 'STOP_GENERATOR':
          if (isGenerating) {
            isGenerating = false;
            if (generationInterval) {
              clearInterval(generationInterval);
              generationInterval = null;
            }
            
            ws.send(JSON.stringify({
              type: 'GENERATOR_STOPPED',
              data: { message: 'Generator stopped' }
            }));
          }
          break;

        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      console.error('Raw message:', message.toString());
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    if (isGenerating) {
      clearInterval(generationInterval);
    }
  });
});

// Broadcast to all connected clients
function broadcastToAll(message) {
  console.log('Broadcasting to', wss.clients.size, 'clients:', message.type);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// REST API endpoints
app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

app.post('/api/candidates', (req, res) => {
  const newCandidate = {
    id: uuidv4(),
    name: req.body.name,
    politicalParty: req.body.politicalParty,
    picture: req.body.picture || '/candidates/flick.png'
  };
  candidates.push(newCandidate);
  
  broadcastToAll({
    type: 'CANDIDATE_ADDED',
    data: newCandidate
  });
  
  res.json(newCandidate);
});

app.put('/api/candidates/:id', (req, res) => {
  const candidateIndex = candidates.findIndex(c => c.id === req.params.id);
  if (candidateIndex !== -1) {
    candidates[candidateIndex] = { ...candidates[candidateIndex], ...req.body };
    
    broadcastToAll({
      type: 'CANDIDATE_UPDATED',
      data: candidates[candidateIndex]
    });
    
    res.json(candidates[candidateIndex]);
  } else {
    res.status(404).json({ error: 'Candidate not found' });
  }
});

app.delete('/api/candidates/:id', (req, res) => {
  const candidateIndex = candidates.findIndex(c => c.id === req.params.id);
  if (candidateIndex !== -1) {
    const deletedCandidate = candidates.splice(candidateIndex, 1)[0];
    
    broadcastToAll({
      type: 'CANDIDATE_DELETED',
      data: { id: req.params.id }
    });
    
    res.json(deletedCandidate);
  } else {
    res.status(404).json({ error: 'Candidate not found' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    connections: wss.clients.size,
    candidatesCount: candidates.length,
    isGenerating: isGenerating
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Political Candidates Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      websocket: 'ws://' + req.get('host') + '/'
    }
  });
});

// Use environment variable for port or default to 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
}); 