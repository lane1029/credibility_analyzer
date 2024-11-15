import React from 'react';

function InputSection({ userInput, setUserInput, handleFetchPreview }) {
  return (
    <div style={inputSectionStyle}>
      <textarea
        placeholder="Enter URL or Text Block"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={textAreaStyle}
      />
      <button
        onClick={handleFetchPreview}
        style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}
      >
        Run Analysis
      </button>
    </div>
  );
}

const inputSectionStyle = {
  width: '100%',
  marginBottom: '20px',
};

const textAreaStyle = {
  width: '100%',
  height: '150px',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  resize: 'vertical',
};

export default InputSection;
