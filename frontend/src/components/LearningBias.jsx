import React from 'react';

function LearningBias() {
    return (
        <div style={learningBiasTabStyle}>
            <div style={learningBiasStyle}>
                <h3>How is bias determined?</h3>
                <p>
                    <strong>What It Does:</strong>
                    This step determines whether the content leans toward a particular viewpoint or ideology, or if it presents information in a balanced way.
                </p>
                <p>
                    <strong>How It Works:</strong>
                    <ul>
                        <li>The content from the user input (direct text or URL content) is passed into an OpenAI assistant that has specific instructions for bias evaluation.</li>
                        <li>The text is analyzed for bias markers, such as emotionally charged words, selective framing, or one-sided arguments.</li>
                    </ul>
                </p>
                <p>
                    <strong>What You Get:</strong>
                    <ul>
                        <li>A bias assessment (e.g., "Biased", "Unbiased").</li>
                        <li>A confidence score (0 to 100), reflecting how the confident the model is in the bias classification.</li>
                        <li>A summary of the bias evaluation and an explanation of the evidence found to support the classification</li>
                    </ul>
                </p>
            </div>
        </div>
    );
}

const learningBiasTabStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%', // Ensure the parent container allows children to stretch
};

const learningBiasStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
    fontFamily: 'Shippori Antique B1, sans-serif',
    position: 'relative',
    height: '100%', // Make the section as long as the parent container
    textAlign: 'left', // Align text to the left
};

export default LearningBias;