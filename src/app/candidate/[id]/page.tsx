'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCandidates } from '@/context/CandidatesContext';
import { Candidate } from '@/data/candidates';

export default function CandidatePage() {
  const params = useParams();
  const { candidates, updateCandidate, deleteCandidate } = useCandidates();
  const [isEditing, setIsEditing] = useState(false);
  const [editedParty, setEditedParty] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundCandidate = candidates.find(c => c.id === id);
    if (foundCandidate) {
      setCandidate(foundCandidate);
    }
  }, [params.id, candidates]);

  if (!candidate) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setEditedParty(candidate.politicalParty);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateCandidate(candidate.id, { politicalParty: editedParty });
    setCandidate({ ...candidate, politicalParty: editedParty });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedParty(candidate.politicalParty);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    deleteCandidate(candidate.id);
    // Redirect to home page after deletion
    window.location.href = '/';
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Candidates
          </Link>

          {/* Candidate Profile */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-1/3">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={candidate.picture}
                    alt={`${candidate.name} - ${candidate.politicalParty}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-2/3 p-8">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {candidate.name}
                  </h1>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={handleEdit}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">Political Party:</label>
                      <input
                        type="text"
                        value={editedParty}
                        onChange={(e) => setEditedParty(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ) : (
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {candidate.politicalParty}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      About the Candidate
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {candidate.name} is a dedicated public servant with a strong commitment to 
                      representing the interests of their constituents. With extensive experience 
                      in public policy and community leadership, they bring a fresh perspective 
                      to the political landscape.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Key Priorities
                    </h2>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Economic development and job creation
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Education reform and accessibility
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Healthcare accessibility and affordability
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        Environmental protection and sustainability
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h2>
                    <div className="space-y-2 text-gray-600">
                      <p>Email: {candidate.name.toLowerCase().replace(' ', '.')}@campaign.gov</p>
                      <p>Phone: (555) 123-4567</p>
                      <p>Website: www.{candidate.name.toLowerCase().replace(' ', '')}.gov</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {candidate.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 