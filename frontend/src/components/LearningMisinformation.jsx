import React from 'react';

function LearningMisinformation() {
    return (
        <div style={misinformationTabStyle}>
            <div style={misinformationStyle}>
                <h3>What is misinformation</h3>
                <p>
                    Misinformation refers to false, inaccurate, or misleading information that is shared, regardless of intent to deceive. It can spread unintentionally when people believe the incorrect information is true. Misinformation may arise from errors, misunderstandings, or the unintentional sharing of unverified claims.
                </p>
                <p>
                    Examples of misinformation include:
                    <ul>
                        <li><strong>Rumors</strong>: Sharing a claim without verifying its accuracy (e.g., "I heard this product cures the flu").</li>
                        <li><strong>Misinterpretations</strong>: Misunderstanding or misrepresenting data or research findings.</li>
                        <li><strong>Outdated Information</strong>: Sharing facts that were once accurate but have since changed (e.g., outdated health recommendations).</li>
                        <li><strong>Edited Media</strong>: Sharing images, videos, or texts that are manipulated in ways that distort their original meaning.</li>
                    </ul>
                    Key Features of Misinformation:
                    <ul>
                        <li>It often spreads on social media, messaging platforms, and word of mouth.</li>
                        <li>It thrives in environments where information is consumed quickly without verification.</li>
                        <li>It can cause confusion, reinforce biases, and influence beliefs and decisions.</li>
                    </ul>
                </p>
            </div>
        </div>
    );
}

const misinformationTabStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%', // Ensure the parent container allows children to stretch
};


const misinformationStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
    fontFamily: 'Shippori Antique B1, sans-serif',
    position: 'relative',
    height: '100%', // Make the section as long as the parent container
    textAlign: 'left', // Align text to the left
};

export default LearningMisinformation;