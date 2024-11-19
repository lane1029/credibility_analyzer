// components/Header.jsx
function Header() {
  return (
    <header style={headerStyle}>
      <h1>VerifyAI</h1>
    </header>
  );
}

const headerStyle = {
  padding: '20px',
  textAlign: 'left',
  backgroundColor: '#007bff',
  color: '#0A3D62',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  fontFamily: 'Poppins, sans-serif',
};
export default Header;
