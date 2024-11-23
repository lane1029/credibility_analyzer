// Desc: BiasTab component displays the bias evaluation and confidence score, as well as the evidence used to determine the bias.

import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info'; // Material-UI Info Icon

function BiasTab({ bias }) {
  if (!bias) {
    return <p>No bias data available.</p>;
  }
  // Parse the bias data if it is a string
  const parsedBias = typeof bias === 'string' ? JSON.parse(bias) : bias;

  return (
    <div style={biasTabStyle}>
      {/* Tooltip Icon in Top Right */}
      <div style={tooltipIconWrapperStyle}>
        <Tooltip
          title="The bias evaluation utilizes OpenAI and natural language processing to identify and evaluate bias in the text. For more information on how this is done, please visit the Learn More page."
          arrow
        >
          <InfoIcon fontSize="small" style={tooltipIconStyle} />
        </Tooltip>
      </div>

      {/* Bias Evaluation and Confidence Score Section */}
      <div style={biasEvaluationStyle}>
        <h3>Bias Evaluation</h3>
        <p>
          <strong>Evaluation:</strong> {parsedBias.evaluation}
        </p>
        <p>
          <strong>Confidence Score:</strong> {parsedBias.confidence_score}
        </p>
      </div>

      {/* Evidence Section */}
      <div style={biasEvidenceStyle}>
        <h3>Evidence</h3>
        <p>{parsedBias.evidence}</p>
      </div>
    </div>
  );
}

// Inline Styles
const biasTabStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'relative', // Required to position the tooltip icon
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

const biasEvaluationStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fafafa',
  fontFamily: 'Shippori Antique B1, sans-serif',
};

const biasEvidenceStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fafafa',
  fontFamily: 'Shippori Antique B1, sans-serif',
};

export default BiasTab;
