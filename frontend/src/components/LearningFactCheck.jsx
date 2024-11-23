// Fact check tab on learning page

import React from 'react';

function LearningFactCheck() {
    return (
        <div style={learningFactsTabStyle}>
            {/* content for tab */}
            <div style={learningFactsStyle}>
                <h3>How is bias determined?</h3>
                <p>
                    <strong>What It Does:</strong>
                    This step determines whether the content leans toward a particular viewpoint or ideology, or if it presents information in a balanced way.
                </p>
                <p>
                    <strong>How It Works:</strong>
                    <ul>
                        <li>The content from the user input (direct text or URL content) is passed into an OpenAI assistant that has specific instructions and data for fact checking.</li>
                        <li>The assistant extracts statements that can be fact-checked, such as statistics or specific claims (e.g., "90% of people prefer X").</li>
                        <li>It then evaluates the truthfulness of these statements by comparing them to a database of known facts and sources.</li>
                        <li>The assistant then provides an evaluation of whether it’s factual, misleading, or needs additional context.</li>
                    </ul>
                </p>
                <p>
                    <strong>For each claim, you will get:</strong>
                    <ul>
                        <li>A fact evaluation (e.g., "True", "False", "Needs Context").</li>
                        <li>A confidence score (0 to 100), reflecting how the confident the model is in the evaluation.</li>
                        <li>The facts that apply to the claim from the fact database.</li>
                        <li>A list of sources where you can find more information about the claim.</li>
                    </ul>
                </p>
            </div>
        </div>
    );
}

// Styles
const learningFactsTabStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%', // Ensure the parent container allows children to stretch
};

const learningFactsStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
    fontFamily: 'Shippori Antique B1, sans-serif',
    position: 'relative',
    height: '100%', // Make the section as long as the parent container
    textAlign: 'left', // Align text to the left
};

export default LearningFactCheck;