import React, { useState } from 'react';

// components/FactAssessment.jsx
function FactAssessment({ facts }) {
    const [selectedFact, setSelectedFact] = useState(
      {
        claim: "Select a claim to view details", 
        truth_value: "", 
        confidence_score: 0, 
        facts : "",
        sources : []
      });
  
    return (
      <div>
        <h4>Select a Claim:</h4>
        <ul style={factListStyle}>
          {facts.map((fact, index) => (
            <li
              key={index}
              onClick={() => setSelectedFact(fact)}
              style={factItemStyle}
            >
              {fact.claim}
            </li>
          ))}
        </ul>
  
        {selectedFact && (
          <div style={factDetailStyle}>
            <h4>Fact Details</h4>
            <p><strong>Claim:</strong> {selectedFact.claim}</p>
            <p><strong>Evaluation:</strong> {selectedFact.truth_value}</p>
            <p><strong>Confidence Score:</strong> {selectedFact.confidence_score}</p>
            <p><strong>Facts:</strong> {selectedFact.facts}</p>
            <p><strong>Sources:</strong></p>
            <ul>
              {selectedFact.sources.map((source, index) => (
                <li key={index}>
                  <a href={source} target="_blank" rel="noopener noreferrer">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  const factListStyle = {
    listStyleType: 'none',
    padding: 0,
  };
  
  const factItemStyle = {
    padding: '5px 0',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
  };
  
  const factDetailStyle = {
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };
  
  export default FactAssessment;
  