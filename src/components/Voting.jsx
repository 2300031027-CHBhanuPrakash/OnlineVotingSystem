import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCandidates } from '../context/CandidatesContext';
import { useNavigate } from 'react-router-dom';
import VoteConfirmationModal from './VoteConfirmationModal';

const Voting = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { candidates, electionStatus, userVoteStatus, castVote: recordVote } = useCandidates();
  const navigate = useNavigate();

  const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);

  const handleVoteClick = () => {
    if (userVoteStatus) {
      alert('You have already cast your vote.');
      return;
    }
    if (!selectedCandidate) {
      alert('Please select a candidate');
      return;
    }
    setShowModal(true);
  };

  const confirmVote = async () => {
    try {
      await recordVote(selectedCandidate, user.aadhaar);
      alert('Vote submitted successfully!');
      setShowModal(false);
      navigate('/dashboard');
    } catch (error) {
      alert('Error submitting vote: ' + error.message);
    }
  };

  if (electionStatus === 'ended') {
    return (
      <div className="voting-container">
        <h2>Process Terminated</h2>
        <p>The selection process has concluded. Submissions are no longer accepted.</p>
        <div className="election-status ended">
          <p>Status: Process Completed</p>
        </div>
      </div>
    );
  }

  if (userVoteStatus) {
    return (
      <div className="voting-container">
        <h2>Submission Confirmed</h2>
        <p>Your selection has been recorded in the system.</p>
        <div className="election-status active">
          <p>Status: Process Active</p>
        </div>
      </div>
    );
  }

  return (
    <div className="voting-container">
      <div className="container-content">
        <h2>Submit Your Selection</h2>
        <p>Choose your preferred option from the available choices. Your selection is confidential.</p>

      <div className="candidates-grid">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <img src={candidate.symbol ? `http://localhost:4000${candidate.symbol}` : '/vite.svg'} alt={candidate.name} />
            <h3>{candidate.name}</h3>
            <p>{candidate.partyName} (Age: {candidate.age})</p>
            <div className="candidate-select">
              <input
                type="radio"
                id={candidate.id}
                name="candidate"
                value={candidate.id}
                checked={selectedCandidate == candidate.id}
                onChange={(e) => setSelectedCandidate(e.target.value)}
              />
              <label htmlFor={candidate.id}>Select {candidate.name}</label>
            </div>
          </div>
        ))}
      </div>

      <div className="voting-actions">
        <button onClick={handleVoteClick} className="vote-button" disabled={!selectedCandidate}>
          Confirm Selection
        </button>
        {selectedCandidate && (
          <p className="selected-info">Chosen: {selectedCandidateData?.name}</p>
        )}
      </div>

      <VoteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        candidate={selectedCandidateData}
        onConfirm={confirmVote}
      />
      </div>
    </div>
  );
};

export default Voting;