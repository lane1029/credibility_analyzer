import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage'; // Your main page
import LearnMorePage from './components/LearnMorePage'; // The second page
import Header from './components/Header'; // Common Header

function App() {
  return (
    <div style={backgroundStyle}>
      <Router>
        <Header /> {/* Common header displayed on all pages */}
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* Main page */}
          <Route path="/second" element={<LearnMorePage />} /> {/* Second page */}
        </Routes>
      </Router>
    </div>
  );
}

const backgroundStyle = {
  backgroundImage: `url('/background.jpg')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh', // Full viewport height
  width: '100vw', // Full viewport width
};
export default App;
