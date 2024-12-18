// Desc: Input section component for the main page

import React from 'react';

function InputSection({ userInput, setUserInput, handleFetchPreview }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
      {/* retrieved input from the text box and starts the preview and analysts */}
      <button onClick={handleFetchPreview} style={buttonStyle}>
        Run Analysis
      </button>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter URL or text"
        style={{ ...inputStyle, marginRight: '10px' }}
      />
    </div>
  );
}

// Styles
const inputStyle = {
  width: '500px', // Full width of the parent container
  padding: '10px', // Padding inside the input box
  fontSize: '1rem', // Adjust font size
  border: '1px solid #ccc', // Add a border
  borderRadius: '5px', // Optional: Add rounded corners
  boxSizing: 'border-box', // Ensure padding is included in the width
  backgroundColor: '#e6e5de',
  color: '#53585c',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Add glow effect
  fontFamily: 'Shippori Antique B1, sans-serif',
};

const buttonStyle = {
  padding: '10px 10px',
  width: '200px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#6b7983',
  color: '#e6e5de',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Add glow effect
  fontFamily: 'Shippori Antique B1, sans-serif',
  fontWeight: 'bold'
};

export default InputSection;
