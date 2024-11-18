import React, { useState } from 'react';
import FactAssessment from './FactAssessment';
import BiasTab from './BiasTab';
import CredibilityTab from './CredibilityTab';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabsSection({ credibilityResult, biasResult, factResult, loading }) {
  const [activeTab, setActiveTab] = useState(0); // Use index-based tabs for MUI

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '50%' }}>
      {/* Tab Bar */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth" // Makes the tabs span across the width
        textColor="primary"
        indicatorColor="primary"
        sx={{
          border: '2px solid #007bff', // Add the outline
          padding: '5px', // Optional: add some padding inside the outline
          backgroundColor: '#f9f9f9', // Optional: background for the tab bar
        }}
      >
        <Tab label="Credibility" />
        <Tab label="Bias" />
        <Tab label="Facts" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', minHeight: '200px' }}>
        {loading ? (
          <p>Running analysis...</p>
        ) : activeTab === 0 ? (
          <CredibilityTab credibility={credibilityResult} />
        ) : activeTab === 1 ? (
          <BiasTab bias={biasResult} />
        ) : (
          <FactAssessment facts={factResult} />
        )}
      </Box>
    </Box>
  );
}

export default TabsSection;
