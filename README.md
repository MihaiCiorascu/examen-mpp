# Political Candidates App with WebSocket Backend

A real-time political candidates application with WebSocket support for live updates and candidate generation.

## Features

- ✅ **Real-time CRUD Operations** - Create, Read, Update, Delete candidates
- ✅ **Live Statistics** - Dynamic charts showing candidates per party
- ✅ **WebSocket Communication** - Real-time updates across all clients
- ✅ **Candidate Generator** - Automated candidate generation every second
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Modern UI** - Clean, professional interface with Tailwind CSS

## Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express and WebSocket (ws)
- **Communication**: WebSocket for real-time updates
- **State Management**: React Context with WebSocket integration

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3001`

### Frontend Setup

1. **Navigate to the main project directory:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
```bash
npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## Usage

### Viewing Candidates
- The main page displays all candidates in a responsive grid
- Click "View Profile" to see detailed candidate information

### Adding Candidates
- Scroll to the bottom of the page
- Click "Add Candidate" to expand the form
- Enter candidate name and political party
- Click "Add Candidate" to submit

### Editing Candidates
- Navigate to any candidate's profile page
- Click "Edit" to modify the political party
- Click "Save" to confirm changes or "Cancel" to discard

### Deleting Candidates
- Navigate to any candidate's profile page
- Click "Delete" to remove the candidate
- Confirm deletion in the modal

### Real-time Generation
- Go to the "Real-time Statistics" section
- Click "Start Generator" to begin automated candidate generation
- Candidates will be added every second automatically
- Click "Stop Generator" to halt the process

### Live Statistics
- The party chart updates in real-time as candidates are added/removed
- Shows the distribution of candidates across political parties
- Displays total candidate count

## WebSocket Events

### Client to Server
- `GET_CANDIDATES` - Request all candidates
- `ADD_CANDIDATE` - Add a new candidate
- `UPDATE_CANDIDATE` - Update an existing candidate
- `DELETE_CANDIDATE` - Delete a candidate
- `START_GENERATOR` - Start automated generation
- `STOP_GENERATOR` - Stop automated generation

### Server to Client
- `INIT_CANDIDATES` - Initial candidates data
- `CANDIDATES_UPDATE` - Updated candidates list
- `CANDIDATE_ADDED` - New candidate added
- `CANDIDATE_UPDATED` - Candidate updated
- `CANDIDATE_DELETED` - Candidate deleted
- `CANDIDATE_GENERATED` - New candidate generated
- `GENERATOR_STARTED` - Generator started
- `GENERATOR_STOPPED` - Generator stopped

## API Endpoints

- `GET /api/candidates` - Get all candidates
- `POST /api/candidates` - Add a new candidate
- `PUT /api/candidates/:id` - Update a candidate
- `DELETE /api/candidates/:id` - Delete a candidate

## File Structure

```
political-candidates/
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   ├── context/               # React context
│   ├── services/              # WebSocket service
│   └── data/                  # Data types
├── server/                    # Backend server
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
├── public/                   # Static assets
└── package.json             # Frontend dependencies
```

## Technologies Used

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- React Context
- WebSocket API

### Backend
- Node.js
- Express.js
- WebSocket (ws)
- CORS
- UUID

## Development

### Running in Development Mode
1. Start the backend: `cd server && npm run dev`
2. Start the frontend: `npm run dev`
3. Open `http://localhost:3000` in your browser

### Production Build
1. Build the frontend: `npm run build`
2. Start the backend: `cd server && npm start`
3. Serve the frontend build files

## Real-time Features

- **Live Updates**: All changes are reflected immediately across all connected clients
- **Automatic Reconnection**: WebSocket automatically reconnects if connection is lost
- **Generator Control**: Start/stop candidate generation with real-time feedback
- **Statistics**: Live chart updates showing party distribution
- **Multi-client Support**: Multiple users can connect and see updates simultaneously

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
