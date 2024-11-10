import React, { useState } from 'react';

function AnalyzerForm() {
  const [url, setUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysisResult('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setAnalysisResult(data.result);
    } catch (error) {
      console.error('Error analyzing URL:', error);
      setAnalysisResult('An error occurred while analyzing the URL.');
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {analysisResult && <div className="result">{analysisResult}</div>}
    </div>
  );
}

export default AnalyzerForm;
