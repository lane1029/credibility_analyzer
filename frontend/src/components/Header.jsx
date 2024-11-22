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
  justifyContent: 'center', // Horizontally centers the content
  height: 'Auto',
  background: 'linear-gradient(to bottom, rgba(201, 199, 186, 1), rgba(201, 199, 186, 0))', // Gradient from opaque to transparent
  color: '#5F6D78',
  fontFamily: 'Kalam, sans-serif',
};

const headerTextStyle = {
  margin: 0, // Removes default margins above and below the text
  lineHeight: 1, // Minimizes vertical space between lines (if multiline text)
  fontSize: '6rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Adds shadow behind the letters
};

export default Header;
