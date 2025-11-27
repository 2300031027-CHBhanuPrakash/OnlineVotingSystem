import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCandidates } from '../context/CandidatesContext';

const MyVote = () => {
  const { user } = useAuth();
  const { userVoteStatus } = useCandidates();

  // For now, since voting is not fully implemented, show a placeholder
  // In a real implementation, this would fetch the user's vote from backend

  return (
    <div className="my-vote-container">
      <div className="container-content">
        <h2>My Selection</h2>
        {userVoteStatus ? (
          <div className="vote-info">
            <p>Your selection has been recorded successfully.</p>
            <p><strong>Note:</strong> For privacy reasons, your specific choice is not shown.</p>
            <p>Thank you for your participation!</p>
          </div>
        ) : (
          <div className="no-vote">
            <p>You have not made a selection yet.</p>
            <p>Please visit the Selection page to participate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVote;