'use client';

import CandidateCard from '@/components/CandidateCard';
import PartyChart from '@/components/PartyChart';
import ThreadControls from '@/components/ThreadControls';
import { useCandidates } from '@/context/CandidatesContext';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const { candidates, addCandidate } = useCandidates();
  const [newCandidateName, setNewCandidateName] = useState('');
  const [newCandidateParty, setNewCandidateParty] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCandidateName.trim() && newCandidateParty.trim()) {
      addCandidate({
        name: newCandidateName.trim(),
        politicalParty: newCandidateParty.trim(),
        picture: '/candidates/flick.png'
      });
      setNewCandidateName('');
      setNewCandidateParty('');
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Political Candidates
          </h1>
          <p className="text-xl text-gray-600">
            Meet the candidates running for office
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real-time Statistics
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PartyChart candidates={candidates} />
            <ThreadControls />
          </div>
        </div>

        {/* Add New Candidate Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Candidate
              </h2>
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {isAdding ? 'Cancel' : 'Add Candidate'}
              </button>
            </div>

            {isAdding && (
              <form onSubmit={handleAddCandidate} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newCandidateName}
                    onChange={(e) => setNewCandidateName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter candidate name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="party" className="block text-sm font-medium text-gray-700 mb-2">
                    Political Party
                  </label>
                  <input
                    type="text"
                    id="party"
                    value={newCandidateParty}
                    onChange={(e) => setNewCandidateParty(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter political party"
                    required
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16">
                      <Image
                        src="/candidates/flick.png"
                        alt="Default candidate image"
                        fill
                        className="rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Default Image</p>
                    <p>Using flick.png as the default candidate photo</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    Add Candidate
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
