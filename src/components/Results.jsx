import React from 'react';
import { useCandidates } from '../context/CandidatesContext';

const Results = () => {
  const { results, loading, fetchResults } = useCandidates();

  React.useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const colors = ['#6b7280', '#4b5563', '#9ca3af', '#6b7280', '#4b5563'];
  const chartData = results.map((result, index) => ({
    candidate: result.name,
    party: result.party,
    votes: result.votes,
    color: colors[index % colors.length]
  }));

  const totalVotes = chartData.reduce((sum, result) => sum + result.votes, 0);
  const maxVotes = chartData.length > 0 ? Math.max(...chartData.map(r => r.votes)) : 1;

  if (loading) {
    return <div className="results-container"><div className="container-content"><h2>Loading...</h2></div></div>;
  }

  return (
    <div className="results-container">
      <div className="container-content">
        <h2>Selection Outcomes</h2>
      <div className="chart-container">
        {chartData.map((result, index) => (
          <div key={index} className="chart-bar">
            <div className="bar-label">{result.candidate} ({result.party})</div>
            <div className="bar" style={{
              width: `${(result.votes / maxVotes) * 100}%`,
              backgroundColor: result.color
            }}>
              <span className="bar-value">{result.votes} selections ({totalVotes > 0 ? ((result.votes / totalVotes) * 100).toFixed(1) : 0}%)</span>
            </div>
          </div>
        ))}
      </div>
      <div className="total-votes">Total Selections: {totalVotes}</div>
      </div>
    </div>
  );
};

export default Results;