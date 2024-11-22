// components/Header.jsx
function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={headerTextStyle}>V E R A C I T Y</h1>
    </header>
  );
}

const headerStyle = {
  display: 'flex', // Use Flexbox
  alignItems: 'center', // Vertically centers the content
  padding: '10px 20px', // Controls padding inside the header box
  justifyContent: 'center', // Horizontally centers the content
  height: 'auto',
  background: 'radial-gradient(circle, rgba(201, 199, 186, 1), rgba(201, 199, 186, 0))', // Radial gradient from opaque to transparent
  color: '#5F6D78',
  fontFamily: 'Namdhinggo, serif',
};

const headerTextStyle = {
  margin: 0, // Removes default margins above and below the text
  lineHeight: 1, // Minimizes vertical space between lines (if multiline text)
  fontSize: '6rem',
  fontWeight: '800',
  textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)', // Adds shadow behind the letters
  WebkitTextStroke: '0.005px #7b8083', // Adds an outline to the text
};

export default Header;
