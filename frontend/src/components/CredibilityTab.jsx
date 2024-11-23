// Desc: CredibilityTab component displays the credibility evaluation and confidence score of the article.

import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info'; // Material-UI Info Icon

function CredibilityTab({ credibility }) {
  if (!credibility) {
    return <p>No credibility analysis available.</p>;
  }
  // Parse the credibility data if it is a string
  const parsedCredibility = typeof credibility === 'string' ? JSON.parse(credibility) : credibility;
  return (
    <div style={credibilityTabStyle}>
      {/* Credibility Evaluation and Confidence Score tab */}
      <div style={credibilityEvaluationStyle}>
        {/* Tooltip Icon in Top Right */}
        <div style={tooltipIconWrapperStyle}>
          <Tooltip
            title="The credibility evaluation combined the output from the bias evaluation and fact check to generate an overall summary and score. For more information on how this is done, please visit the Learn More page."
            arrow
          >
            <InfoIcon fontSize="small" style={tooltipIconStyle} />
          </Tooltip>
        </div>
        {/* Credibility evaluation section */}
        <h3>Credibility Evaluation</h3>
        <p><strong>Score:</strong> {parsedCredibility.credibility_score}</p>
        <p><strong>Summary:</strong> {parsedCredibility.credibility_summary}</p>
      </div>
    </div>
  );
}

// Inline Styles
const credibilityTabStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const credibilityEvaluationStyle = {
  position: 'relative', // Add position relative to the parent container
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fafafa',
  fontFamily: 'Shippori Antique B1, sans-serif',
};

const tooltipIconWrapperStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: 1, // Ensure the tooltip icon is above other elements
};

const tooltipIconStyle = {
  color: '#b77b82', // Customize the icon color
  cursor: 'pointer', // Indicate the icon is interactive
};

export default CredibilityTab;
