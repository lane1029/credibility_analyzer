import React from 'react';

function PreviewSection({ previewContent, loading }) {
  return (
    <div style={previewSectionStyle}>
      <h3>Preview</h3>
      {loading ? (
        <p>Loading preview...</p>
      ) : (
        <p>{previewContent || 'Your content will appear here...'}</p>
      )}
    </div>
  );
}

const previewSectionStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  minHeight: '100px',
  overflowY: 'auto',
};

export default PreviewSection;
