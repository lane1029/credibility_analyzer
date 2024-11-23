// Desc: This component is used to display the preview of the markdown content.

import React from 'react';
import Box from '@mui/material/Box';

function PreviewSection({ previewContent, loading }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={headerSectionStyle}>
        {/* Header block for preview section */}
        <h3 style={headerStyle}>P R E V I E W</h3>
      </Box>
      {/* content block */}
      <Box sx={contentSectionStyle}>
        <Box sx={contentStyle}>
          <p>{previewContent}</p>
        </Box>
      </Box>
    </Box>
  );
}


// Styles
const headerSectionStyle = {
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  padding: '20px', 
  border: '1px solid #ccc', 
  borderRadius: '5px', 
  backgroundColor: '#e6e5de'
};

const headerStyle = {
  margin: '0',
  fontFamily: 'Namdhinggo, serif',
  fontWeight: '800',
  fontSize: '1.3rem',
  color: '#53585c',
};

const contentSectionStyle = {
  maxHeight: '50vh',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  padding: '20px', 
  border: '1px solid #ccc', 
  borderRadius: '5px', 
  backgroundColor: '#e6e5de',
};

const contentStyle = {
  whiteSpace: 'pre-wrap',
  fontSize: '14px',
  lineHeight: '1.6',
  fontFamily: 'Shippori Antique B1, sans-serif',
  backgroundColor: '#fafafa',
  overflowY: 'scroll',
  overflowX: 'hidden',
  maxHeight: '40vh',
  borderRadius: '5px',
  padding: '10px',
};

export default PreviewSection;
