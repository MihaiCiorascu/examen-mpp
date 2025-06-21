'use client';

import { Candidate } from '@/data/candidates';
import Link from 'next/link';
import Image from 'next/image';

interface CandidateCardProps {
  candidate: Candidate;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={candidate.picture}
          alt={`${candidate.name} - ${candidate.politicalParty}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {candidate.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {candidate.politicalParty}
        </p>
        <Link
          href={`/candidate/${candidate.id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
} 