'use client';

import { Candidate } from '@/data/candidates';

interface PartyChartProps {
  candidates: Candidate[];
}

export default function PartyChart({ candidates }: PartyChartProps) {
  // Calculate candidates per party
  const partyStats = candidates.reduce((acc, candidate) => {
    acc[candidate.politicalParty] = (acc[candidate.politicalParty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const parties = Object.keys(partyStats);
  const maxCount = Math.max(...Object.values(partyStats));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Candidates per Party</h3>
      
      <div className="space-y-4">
        {parties.map((party) => {
          const count = partyStats[party];
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
          
          return (
            <div key={party} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-gray-700 truncate">
                {party}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                  className="bg-blue-600 h-6 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-900">
                    {count} candidate{count !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        Total Candidates: {candidates.length}
      </div>
    </div>
  );
} 