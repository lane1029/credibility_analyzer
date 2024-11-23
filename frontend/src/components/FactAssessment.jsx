// Description: A component that displays a dropdown of fact claims and their details.

import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info'; // Material-UI Info Icon

// parses the facts and displays them in a dropdown
function FactAssessment({ facts }) {
  // State to store the selected fact
  const [selectedFact, setSelectedFact] = useState({
    claim: "Select a claim to view details", 
    truth_value: "", 
    confidence_score: "", 
    facts: "",
    sources: []
  });

  let parsedFacts = [];

  // Parse the facts if it is a string
  try {
    parsedFacts = typeof facts === 'string' ? JSON.parse(facts) : facts;
  } catch (error) {
    console.error('Failed to parse facts:', error);
  }

  // If the facts are not an array, return a message
  if (!Array.isArray(parsedFacts)) {
    return <p>No facts available.</p>;
  }

  return (
    <div style={factAssessmentStyle}>
      {/* Tooltip Icon in the Top Right */}
      <div style={tooltipIconWrapperStyle}>
        <Tooltip
          title="This evaluation uses an OpenAI assistant to extract claims from the text and compares them to a database of facts obtained from usafacts.org. For more information on how this is done, please visit the Learn More page."
          arrow
        >
          <InfoIcon fontSize="small" style={tooltipIconStyle} />
        </Tooltip>
      </div>

      <h4 style={{ fontFamily: 'Shippori Antique B1, sans-serif' }}>Select a Claim:</h4>
      {/* Dropdown for selecting a fact */}
      <select
        style={{ ...dropdownStyle, fontFamily: 'Shippori Antique B1, sans-serif' }}
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
      
      {/* Fact display section */}
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


// Inline styles
const factAssessmentStyle = {
  position: 'relative', // Required for positioning the tooltip icon
  padding: '10px',
};

const tooltipIconWrapperStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: 1, // Ensure the tooltip appears above other elements
};

const tooltipIconStyle = {
  color: '#b77b82',
  cursor: 'pointer', // Indicates interactivity
};

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
  backgroundColor: '#fafafa',
  fontFamily: 'Shippori Antique B1, sans-serif',
};

export default FactAssessment;
