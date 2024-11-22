import React from 'react';
import LearningTabs from './LearningTabs';

function LearnMorePage() {
    return (
        <div style={pageStyle}>
            <LearningTabs />
        </div>
    );
}

const pageStyle = {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Shippori Antique B1, sans-serif',
};

export default LearnMorePage;
