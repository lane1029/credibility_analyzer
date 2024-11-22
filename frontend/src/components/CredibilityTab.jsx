import React from 'react';

function CredibilityTab({ credibility }) {
  if (!credibility) {
    return <p>No credibility analysis available.</p>;
  }
  const parsedCredibility = typeof credibility === 'string' ? JSON.parse(credibility) : credibility;
  return (
    <div style={credibilityTabStyle}>
      {/* Credibility Evaluation and Confidence Score Section */}
      <div style={credibilityEvaluationStyle}>
        <h3>Credibility Evaluation</h3>
        <p><strong>Score:</strong> {parsedCredibility.credibility_score}</p>
        <p><strong>Summary:</strong> {parsedCredibility.credibility_summary}</p>
      </div>
    </div>
  );
}

const credibilityTabStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const credibilityEvaluationStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fafafa',
  fontFamily: 'Shippori Antique B1, sans-serif',
};

export default CredibilityTab;
