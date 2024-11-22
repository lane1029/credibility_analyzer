import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={headerTextStyle}>V E R A C I T Y</h1>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/second" style={linkStyle}>Second Page</Link>
      </nav>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  justifyContent: 'center', // Center the content horizontally
  height: 'auto',
  background: 'radial-gradient(circle, rgba(201, 199, 186, 1), rgba(201, 199, 186, 0))',
  color: '#5F6D78',
  fontFamily: 'Namdhinggo, serif',
  position: 'relative', // Allows positioning of nav
};

const headerTextStyle = {
  margin: 0,
  lineHeight: 1,
  fontSize: '6rem',
  fontWeight: '800',
  textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
  WebkitTextStroke: '0.005px #7b8083',
};

const navStyle = {
  display: 'flex',
  gap: '20px',
  position: 'absolute', // Position the nav absolutely
  right: '20px', // Align it to the right
};

const linkStyle = {
  textDecoration: 'none',
  color: '#606970',
  fontSize: '1rem',
};

export default Header;
