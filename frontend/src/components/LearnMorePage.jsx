import React from 'react';
import LearningTabs from './LearningTabs';
import { Link } from 'react-router-dom';

function LearnMorePage() {
    return (
        <div style={pageStyle}>
            <h1>Welcome to the Second Page</h1>
            <p>This is another page in your React app.</p>
            <LearningTabs />
            <Link to="/" style={linkStyle}>
                Go Back to Home
            </Link>
        </div>
    );
}

const pageStyle = {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Shippori Antique B1, sans-serif',
};

const linkStyle = {
    marginTop: '20px',
    display: 'inline-block',
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '1.2rem',
};

export default LearnMorePage;
