// components/Header.jsx
function Header() {
  return (
    <header style={headerStyle}>
      <h1>Credibility Analyzer</h1>
    </header>
  );
}

const headerStyle = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#007bff',
  color: 'white',
  fontSize: '1.8rem',
  fontWeight: 'bold',
};

export default Header;
