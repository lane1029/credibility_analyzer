// Desc: LearningTabs component to display the tabs for Misinformation, Credibility, Bias, and Fact Check

// Import necessary libraries
import React, { useState } from 'react';
import LearningMisinformation from './LearningMisinformation';
import LearningCredibility from './LearningCredibility';
import LearningBias from './LearningBias';
import LearningFactCheck from './LearningFactCheck';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function LearningTabs() {
  // Use index-based tabs for MUI set current state to the first tab
  const [activeTab, setActiveTab] = useState(0); // Use index-based tabs for MUI

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        {/* Tab Bar */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth" // Makes the tabs span across the width
          textColor="primary"
          indicatorColor="primary" // Set the indicator color
          sx={{
            padding: '5px', // Optional: add some padding inside the outline
            border: '1px solid #ccc',
            borderRadius: '5px', // Optional: Add rounded corners
            backgroundColor: '#e6e5de', // Optional: background for the tab bar
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Add glow effect
          }}
        >
          <Tab
            label="M I S I N F O R M A T I O N"
            sx={{
              fontFamily: 'Namdhinggo, serif',
              fontWeight: '800',
              fontSize: '1.2rem',
              color: activeTab === 0 ? 'primary.main' : 'text.secondary', // Active tab color
            }}
          />
          <Tab
            label="C R E D I B I L I T Y"
            sx={{
              fontFamily: 'Namdhinggo, serif',
              fontWeight: '800',
              fontSize: '1.2rem',
              color: activeTab === 1 ? 'primary.main' : 'text.secondary', // Active tab color
            }}
          />
          <Tab
            label="B I A S"
            sx={{
              fontFamily: 'Namdhinggo, serif',
              fontWeight: '800',
              fontSize: '1.2rem',
              color: activeTab === 2 ? 'primary.main' : 'text.secondary', // Active tab color
            }}
          />
          <Tab
            label="F A C T S"
            sx={{
              fontFamily: 'Namdhinggo, serif',
              fontWeight: '800',
              fontSize: '1.2rem',
              color: activeTab === 3 ? 'primary.main' : 'text.secondary', // Active tab color
            }}
          />
        </Tabs>
        
        {/* Tab Content */}
        <Box sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#e6e5de', minHeight: '100px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
          {activeTab === 0 && <LearningMisinformation />}
          {activeTab === 1 && <LearningCredibility />}
          {activeTab === 2 && <LearningBias />}
          {activeTab === 3 && <LearningFactCheck />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Theme for the tabs - handles colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#b77b82', // Replace with your desired primary color
    },
    secondary: {
      main: '#b77b82', // Replace with your desired secondary color
    },
  },
});


export default LearningTabs;
