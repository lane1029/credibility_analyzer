import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import PreviewSection from './components/PreviewSection';
import TabsSection from './components/TabsSection';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [analysisResults, setAnalysisResults] = useState({
    credibilityResult: '',
    biasResult: {},
    factResult: [],
  });
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [isAnalysisRun, setIsAnalysisRun] = useState(false);


  // Function to fetch preview content
  const handleFetchPreview = async () => {
    if (!userInput) return;

    setLoadingPreview(true);
    setPreviewContent('');
    setAnalysisResults({ credibilityResult: {}, biasResult: {}, factResult: [] }); // Reset analysis results
    setIsAnalysisRun(false);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/fetch-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput : userInput })
      });
      const data = await response.json();

      setPreviewContent(data.content);

      // Kick off analysis after preview is fetched
      handleRunAnalysis(data.content);
    } catch (error) {
      console.error('Error fetching preview:', error);
      setPreviewContent('An error occurred while fetching content.');
    } finally {
      setLoadingPreview(false);
    }
  };

  // Function to run analysis on fetched content
  const handleRunAnalysis = async (content) => {
    setLoadingAnalysis(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textContent : content }),
      });
      const data = await response.json();
      setAnalysisResults(data);
      setIsAnalysisRun(true);
    } catch (error) {
      console.error('Error running analysis:', error);
      setAnalysisResults({
        credibilityResult: {},
        biasResult: {},
        factResult: [],
      });
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={appContainerStyle}>
        <Header />
        <div style={mainContentStyle}>
          <InputSection
            userInput={userInput}
            setUserInput={setUserInput}
            handleFetchPreview={handleFetchPreview}
          />
          {/* Running Analysis Message */}
          {loadingAnalysis && (
            <div style={runningMessageStyle}>
              Running Analysis<span className="dot-wave">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          )}
          {/* Conditionally Render Preview and Tabs */}
          {isAnalysisRun && (
            <div style={rowLayoutStyle}>
              {/* Preview Section */}
              <div style={previewSectionWrapperStyle}>
                <PreviewSection
                  previewContent={previewContent}
                  loading={loadingPreview}
                />
              </div>
              {/* Tabs Section */}
              <div style={tabsSectionWrapperStyle}>
                <TabsSection
                  credibilityResult={analysisResults.credibilityResult}
                  biasResult={analysisResults.biasResult}
                  factResult={analysisResults.factResult}
                  loading={loadingAnalysis}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

const mainContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  gap: '20px', // Space between input and row layout
};

const runningMessageStyle = {
  fontSize: '1.2rem',
  color: '#606970',
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
};

const rowLayoutStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px', // Space between preview and tabs
  width: '100%',
  padding: '0 60px', // Adds padding on both sides (left and right)
  boxSizing: 'border-box', // Ensures padding is included in the element's total width
};


const previewSectionWrapperStyle = {
  flex: 2, // Takes 1 portion of the available space
  display: 'flex',
};

const tabsSectionWrapperStyle = {
  flex: 3, // Takes 2 portions of the available space
  display: 'flex',
};

const backgroundStyle = {
  backgroundImage: `url('/background.jpg')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh', // Full viewport height
  width: '100vw', // Full viewport width
};

export default App;
