import React from 'react';

function BiasTab({ bias }) {
  if (!bias) {
    return <p>No bias data available.</p>;
  }
  const parsedBias = typeof bias === 'string' ? JSON.parse(bias) : bias;
  return (
    <div style={biasTabStyle}>
      {/* Bias Evaluation and Confidence Score Section */}
      <div style={biasEvaluationStyle}>
        <h3>Bias Evaluation</h3>
        <p><strong>Evaluation:</strong> {parsedBias.evaluation}</p>
        <p><strong>Confidence Score:</strong> {parsedBias.confidence_score}</p>
      </div>

      {/* Evidence Section */}
      <div style={biasEvidenceStyle}>
        <h3>Evidence</h3>
        <p>{parsedBias.evidence}</p>
      </div>
    </div>
  );
}

const biasTabStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const biasEvaluationStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f1f9ff',
};

const biasEvidenceStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fff3e0',
};

export default BiasTab;
