'use client';

import { useCandidates } from '@/context/CandidatesContext';

export default function ThreadControls() {
  const { startGenerator, stopGenerator, isGenerating, isConnected } = useCandidates();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Data Generator</h3>
      
      <div className="flex gap-4">
        <button
          onClick={startGenerator}
          disabled={isGenerating || !isConnected}
          className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
            isGenerating || !isConnected
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isGenerating ? 'Running...' : 'Start Generator'}
        </button>
        
        <button
          onClick={stopGenerator}
          disabled={!isGenerating}
          className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
            !isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Stop Generator
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        {!isConnected ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Connecting to server...</span>
          </div>
        ) : isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Generating 1 candidate every second...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connected. Click &quot;Start Generator&quot; to begin.</span>
          </div>
        )}
      </div>
    </div>
  );
} 