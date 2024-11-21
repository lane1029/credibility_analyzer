// components/Header.jsx
function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={headerTextStyle}>VERACITY</h1>
    </header>
  );
}

const headerStyle = {
  display: 'flex', // Use Flexbox
  alignItems: 'center', // Vertically centers the content
  padding: '10px 20px', // Controls padding inside the header box
  height: 'auto', // Allows the height to shrink with the content
  justifyContent: 'center', // Horizontally centers the content
  height: '100px',
  backgroundColor: 'rgba(201, 199, 186, 0.7)',
  color: '#53585c',
  fontFamily: 'Kalam, sans-serif',
};

const headerTextStyle = {
  margin: 0, // Removes default margins above and below the text
  lineHeight: 1, // Minimizes vertical space between lines (if multiline text)
  fontSize: '6rem',
  fontWeight: 'bold',
};
export default Header;
