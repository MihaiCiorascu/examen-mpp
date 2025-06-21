import { Candidate } from '@/data/candidates';

export interface WebSocketMessage {
  type: string;
  data: unknown;
}

type MessageHandler = (data: unknown) => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, MessageHandler[]> = new Map();

  constructor(private url: string = 'ws://localhost:3001') {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            console.log('Received WebSocket message:', message.type, message.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.handleReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect().catch(() => {
          this.handleReconnect();
        });
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleMessage(message: WebSocketMessage) {
    const listeners = this.listeners.get(message.type) || [];
    listeners.forEach(listener => listener(message.data));
  }

  on(event: string, callback: MessageHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: MessageHandler) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  send(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('Sending WebSocket message:', message.type, message.data);
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  // CRUD Operations
  getCandidates() {
    this.send({ type: 'GET_CANDIDATES', data: {} });
  }

  addCandidate(candidate: Omit<Candidate, 'id'>) {
    console.log('Adding candidate via WebSocket:', candidate);
    this.send({ type: 'ADD_CANDIDATE', data: { candidate } });
  }

  updateCandidate(candidate: Candidate) {
    console.log('Updating candidate via WebSocket:', candidate);
    this.send({ type: 'UPDATE_CANDIDATE', data: { candidate } });
  }

  deleteCandidate(candidateId: string) {
    console.log('Deleting candidate via WebSocket:', candidateId);
    this.send({ type: 'DELETE_CANDIDATE', data: { candidateId } });
  }

  // Generator Controls
  startGenerator() {
    this.send({ type: 'START_GENERATOR', data: {} });
  }

  stopGenerator() {
    this.send({ type: 'STOP_GENERATOR', data: {} });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
} 