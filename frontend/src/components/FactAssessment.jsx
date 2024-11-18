import React, { useState } from 'react';

function FactAssessment({ facts }) {
  const [selectedFact, setSelectedFact] = useState({
    claim: "Select a claim to view details", 
    truth_value: "", 
    confidence_score: 0, 
    facts: "",
    sources: []
  });

  let parsedFacts = [];

  try {
    parsedFacts = typeof facts === 'string' ? JSON.parse(facts) : facts;
  } catch (error) {
    console.error('Failed to parse facts:', error);
  }

  if (!Array.isArray(parsedFacts)) {
    return <p>No facts available.</p>;
  }

  return (
    <div>
      <h4>Select a Claim:</h4>
      {/* Dropdown for selecting a fact */}
      <select
        style={dropdownStyle}
        onChange={(e) => {
          const factIndex = e.target.value;
          if (factIndex !== "") {
            setSelectedFact(parsedFacts[factIndex]);
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Select a claim
        </option>
        {parsedFacts.map((fact, index) => (
          <option key={index} value={index}>
            {fact.claim}
          </option>
        ))}
      </select>

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

const dropdownStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  marginBottom: '20px',
};

const factDetailStyle = {
  marginTop: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

export default FactAssessment;
