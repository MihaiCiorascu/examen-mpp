import { Candidate } from '@/data/candidates';

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

export class ThreadGenerator {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;
  private onNewCandidate: ((candidate: Candidate) => void) | null = null;

  constructor(onNewCandidate?: (candidate: Candidate) => void) {
    this.onNewCandidate = onNewCandidate || null;
  }

  private generateRandomCandidate(): Candidate {
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomParty = sampleParties[Math.floor(Math.random() * sampleParties.length)];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    const randomId = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    return {
      id: randomId,
      name: randomName,
      politicalParty: randomParty,
      picture: randomImage
    };
  }

  start(intervalMs: number = 1000) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      // Generate exactly one candidate every interval
      const newCandidate = this.generateRandomCandidate();
      if (this.onNewCandidate) {
        this.onNewCandidate(newCandidate);
      }
    }, intervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  isActive(): boolean {
    return this.isRunning;
  }
} 