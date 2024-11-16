import React from 'react';

function PreviewSection({ previewContent, loading }) {
  return (
    <div style={previewSectionStyle}>
      <h3>Preview</h3>
      {loading ? (
        <p>Loading preview...</p>
      ) : (
        <div style={contentStyle}>
          <p>{previewContent || 'Your content will appear here...'}</p>
        </div>
      )}
    </div>
  );
}

const previewSectionStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  // minHeight: '100px',
  maxHeight: '50vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
};

const contentStyle = {
  whiteSpace: 'pre-wrap', // Preserve line breaks and spacing
  fontSize: '14px', // Adjust font size for readability
  lineHeight: '1.6', // Adjust line spacing for better readability
};
export default PreviewSection;
