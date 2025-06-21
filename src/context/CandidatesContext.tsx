'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Candidate } from '@/data/candidates';
import { WebSocketService } from '@/services/websocketService';

interface CandidatesContextType {
  candidates: Candidate[];
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  addCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  startGenerator: () => void;
  stopGenerator: () => void;
  isConnected: boolean;
  isGenerating: boolean;
}

const CandidatesContext = createContext<CandidatesContextType | undefined>(undefined);

export function CandidatesProvider({ children }: { children: ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [wsService] = useState(() => new WebSocketService());

  useEffect(() => {
    // Connect to WebSocket
    wsService.connect().then(() => {
      setIsConnected(true);
      wsService.getCandidates();
    }).catch(console.error);

    // Set up event listeners
    wsService.on('INIT_CANDIDATES', (data: Candidate[]) => {
      setCandidates(data);
    });

    wsService.on('CANDIDATES_UPDATE', (data: Candidate[]) => {
      setCandidates(data);
    });

    wsService.on('CANDIDATE_ADDED', (data: Candidate) => {
      setCandidates(prev => [...prev, data]);
    });

    wsService.on('CANDIDATE_UPDATED', (data: Candidate) => {
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === data.id ? data : candidate
        )
      );
    });

    wsService.on('CANDIDATE_DELETED', (data: { id: string }) => {
      setCandidates(prev => prev.filter(candidate => candidate.id !== data.id));
    });

    wsService.on('CANDIDATE_GENERATED', (data: Candidate) => {
      setCandidates(prev => [...prev, data]);
    });

    wsService.on('GENERATOR_STARTED', () => {
      setIsGenerating(true);
    });

    wsService.on('GENERATOR_STOPPED', () => {
      setIsGenerating(false);
    });

    // Cleanup on unmount
    return () => {
      wsService.disconnect();
    };
  }, [wsService]);

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      wsService.updateCandidate({ ...candidate, ...updates });
    }
  };

  const deleteCandidate = (id: string) => {
    wsService.deleteCandidate(id);
  };

  const addCandidate = (candidate: Omit<Candidate, 'id'>) => {
    wsService.addCandidate(candidate);
  };

  const startGenerator = () => {
    wsService.startGenerator();
  };

  const stopGenerator = () => {
    wsService.stopGenerator();
  };

  return (
    <CandidatesContext.Provider value={{ 
      candidates, 
      updateCandidate, 
      deleteCandidate, 
      addCandidate,
      startGenerator,
      stopGenerator,
      isConnected,
      isGenerating
    }}>
      {children}
    </CandidatesContext.Provider>
  );
}

export function useCandidates() {
  const context = useContext(CandidatesContext);
  if (context === undefined) {
    throw new Error('useCandidates must be used within a CandidatesProvider');
  }
  return context;
} 