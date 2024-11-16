import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import PreviewSection from './components/PreviewSection';
import TabsSection from './components/TabsSection';

function App() {
  const [userInput, setUserInput] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [analysisResults, setAnalysisResults] = useState({
    credibility: '',
    bias: '',
    facts: [],
  });
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Function to fetch preview content
  const handleFetchPreview = async () => {
    if (!userInput) return;

    setLoadingPreview(true);
    setPreviewContent('');
    setAnalysisResults({ credibility: '', bias: '', facts: [] }); // Reset analysis results

    try {
      // const response = await fetch(`/api/fetch-content?url=${encodeURIComponent(userInput)}`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/fetch-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput : userInput })
      });
      const data = await response.json();
      // const data = await response.ok
      //   ? await response.json()
      //   : { content: 'Unable to fetch content. Please try again.' };

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
      const response = await fetch(`/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textContent : content }),
      });
      const data = await response.ok
        ? await response.json()
        : { bias: 'Error', facts: [] };

      setAnalysisResults(data);
    } catch (error) {
      console.error('Error running analysis:', error);
      setAnalysisResults({
        bias: 'Error',
        facts: [],
      });
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div style={appContainerStyle}>
      {/* Header at the top */}
      <Header />
      <div style={mainContentStyle}>
        <div style={leftColumnStyle}>
          <InputSection
            userInput={userInput}
            setUserInput={setUserInput}
            handleFetchPreview={handleFetchPreview}
          />
          <PreviewSection
            previewContent={previewContent}
            loading={loadingPreview}
          />
        </div>
        <TabsSection
          credibility={analysisResults.credibility}
          bias={analysisResults.bias}
          facts={analysisResults.facts}
          loading={loadingAnalysis}
        />
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
  justifyContent: 'space-between',
  padding: '20px',
  flexGrow: 1,
};

const leftColumnStyle = {
  width: '40%',
  display: 'flex',
  flexDirection: 'column',
};

export default App;
