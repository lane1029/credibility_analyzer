import React, { useState } from 'react';
import FactAssessment from './FactAssessment';
import BiasTab from './BiasTab';
import CredibiltyTab from './CredibilityTab';

function TabsSection({ credibilityResult, biasResult, factResult, loading }) {
  const [activeTab, setActiveTab] = useState('credibilityResult');


  return (
    <div style={tabsSectionStyle}>
      <div style={tabsStyle}>
        <button onClick={() => setActiveTab('credibilityResult')} style={tabButtonStyle}>
          Credibility
        </button>
        <button onClick={() => setActiveTab('biasResult')} style={tabButtonStyle}>
          Bias
        </button>
        <button onClick={() => setActiveTab('factResult')} style={tabButtonStyle}>
          Facts
        </button>
      </div>

      <div style={tabContentStyle}>
        {loading ? (
          <p>Running analysis...</p>
        ) : activeTab === 'credibilityResult' ? (
          <CredibiltyTab credibility={credibilityResult} />
        ) : activeTab === 'biasResult' ? (
          <BiasTab bias={biasResult} />
        ) : (
          <FactAssessment facts={factResult} />
        )}
      </div>
    </div>
  );
}

const tabsSectionStyle = {
  width: '50%',
  marginLeft: '2%',
};

const tabsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '10px',
};

const tabButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f1f1f1',
};

const tabContentStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  minHeight: '200px',
};

export default TabsSection;
