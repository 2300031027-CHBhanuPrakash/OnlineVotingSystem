import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCandidates } from '../context/CandidatesContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { electionStatus, userVoteStatus, checkUserVoteStatus, candidates } = useCandidates();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (user && user.role !== 'admin' && user.aadhaar) {
      checkUserVoteStatus(user.aadhaar);
    }
  }, [user, checkUserVoteStatus]);


  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to remove ALL candidates and votes? This action cannot be undone.')) {
      try {
        const response = await fetch('http://localhost:4000/api/candidates', {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('All candidates and votes cleared successfully!');
          window.location.reload();
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to clear candidates: ${response.status} ${response.statusText} - ${errorText}`);
        }
      } catch (error) {
        console.error('Error clearing candidates:', error);
        alert('Error clearing candidates: ' + error.message);
      }
    }
  };

  const renderSidebar = () => {
    if (user?.role === 'admin') {
      return (
        <div className="dashboard-sidebar">
          <h3>System Admin</h3>
          <button
            className={activeSection === 'overview' ? 'active' : ''}
            onClick={() => setActiveSection('overview')}
          >
            Dashboard
          </button>
          <button
            className={activeSection === 'candidates' ? 'active' : ''}
            onClick={() => setActiveSection('candidates')}
          >
            Options
          </button>
          <button onClick={() => navigate('/results')}>
            Reports
          </button>
        </div>
      );
    } else {
      return (
        <div className="dashboard-sidebar">
          <h3>User Portal</h3>
          <button
            className={activeSection === 'overview' ? 'active' : ''}
            onClick={() => setActiveSection('overview')}
          >
            Dashboard
          </button>
          <button onClick={() => navigate('/voting')} disabled={userVoteStatus}>
            {userVoteStatus ? 'Completed' : 'Submit'}
          </button>
          <button onClick={() => navigate('/my-vote')}>
            My Record
          </button>
          <button onClick={() => navigate('/results')}>
            Reports
          </button>
        </div>
      );
    }
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="dashboard-main">
            <h1>System Control Panel</h1>
            <div className="user-info">
              <h2>Welcome, {user?.name}!</h2>
              <p>Access Level: {user?.role === 'admin' ? 'System Administrator' : 'User'}</p>
            </div>
            <div className="quick-stats">
              <h3>System Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Registered Users</h4>
                  <p>1,250</p>
                </div>
                <div className="stat-card">
                  <h4>Submissions Made</h4>
                  <p>892</p>
                </div>
                <div className="stat-card">
                  <h4>Available Options</h4>
                  <p>{candidates.length}</p>
                </div>
                <div className="stat-card">
                  <h4>Process Status</h4>
                  <p className={`status-${electionStatus}`}>
                    {electionStatus === 'active' ? 'Running' : 'Completed'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'candidates':
        return (
          <div className="dashboard-main">
            <h1>Options Configuration</h1>
            <div className="candidates-section">
              <div className="candidates-header">
                <h4>Configured Options ({candidates.length})</h4>
                {candidates.length > 0 && (
                  <button onClick={handleClearAll} className="btn-danger">
                    Clear All Data
                  </button>
                )}
              </div>
              {candidates.length === 0 ? (
                <p>No candidates added yet.</p>
              ) : (
                <div className="candidates-grid-admin">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-admin-card-small">
                     <img src={candidate.symbol ? `http://localhost:4000${candidate.symbol}` : '/vite.svg'} alt={candidate.name} className="small-image" />
                      <div className="candidate-info-small">
                        <h5>{candidate.name}</h5>
                        <p className="small-text">{candidate.partyName}</p>
                        <p className="small-text">Age: {candidate.age}</p>
                        <p className="small-text">Votes: {candidate.votes || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        {renderSidebar()}
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Dashboard;