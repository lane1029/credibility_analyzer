import React, { useState } from 'react';

function AnalyzerForm() {
  const [userInput, setUserInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysisResult('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      setAnalysisResult(data.result);
    } catch (error) {
      console.error('Error analyzing User Input:', error);
      setAnalysisResult('An error occurred while analyzing the user input.');
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL or Text Block"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {analysisResult && <div className="result">{analysisResult}</div>}
    </div>
  );
}

export default AnalyzerForm;
