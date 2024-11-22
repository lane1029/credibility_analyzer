import React from 'react';

function InputSection({ userInput, setUserInput, handleFetchPreview }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
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
};

const buttonStyle = {
  padding: '10px 10px',
  width: '200px',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#656c74',
  color: '#e6e5de',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Add glow effect
};

export default InputSection;
