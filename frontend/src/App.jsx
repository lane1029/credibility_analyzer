import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage'; // Your main page
import LearnMorePage from './components/LearnMorePage'; // The second page
import Header from './components/Header'; // Common Header
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="background"></div>
      <Router>
        <header className="header"> <Header /></header>
        {/* <Header /> Common header displayed on all pages */}
        <main className="content">
          <Routes>
            <Route path="/" element={<MainPage />} /> {/* Main page */}
            <Route path="/second" element={<LearnMorePage />} /> {/* Second page */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}
export default App;
