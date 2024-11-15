import React, { useState } from 'react';
import FactAssessment from './FactAssessment';

function TabsSection({ credibility, bias, facts, loading }) {
  const [activeTab, setActiveTab] = useState('credibility');

  return (
    <div style={tabsSectionStyle}>
      <div style={tabsStyle}>
        <button onClick={() => setActiveTab('credibility')} style={tabButtonStyle}>
          Credibility
        </button>
        <button onClick={() => setActiveTab('bias')} style={tabButtonStyle}>
          Bias
        </button>
        <button onClick={() => setActiveTab('facts')} style={tabButtonStyle}>
          Facts
        </button>
      </div>

      <div style={tabContentStyle}>
        {loading ? (
          <p>Running analysis...</p>
        ) : activeTab === 'credibility' ? (
          <p>{credibility}</p>
        ) : activeTab === 'bias' ? (
          <p>{bias}</p>
        ) : (
          <FactAssessment facts={facts} />
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
