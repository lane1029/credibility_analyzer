import React, { useState } from 'react';

function AnalyzerForm() {
  const [userInput, setUserInput] = useState('');
  const [biasResult, setBiasResult] = useState('');
  const [factResult, setFactResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setBiasResult('');
    setFactResult('');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      setBiasResult(data.biasResult);
      setFactResult(data.factResult);
    } catch (error) {
      console.error('Error analyzing User Input:', error);
      setBiasResult('An error occurred while analyzing the user input.');
      setFactResult('An error occurred while analyzing the user input.');
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
      {biasResult && <div className="result">{biasResult}</div>}
      {factResult && <div className="result">{factResult}</div>}
    </div>
  );
}

export default AnalyzerForm;
