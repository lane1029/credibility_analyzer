import React, { useState } from 'react';
import Header from './components/Header';
import AnalyzerForm from './components/AnalyzerForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AnalyzerForm />
    </div>
  );
}

export default App;
