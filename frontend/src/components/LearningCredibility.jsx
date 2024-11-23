// Desc: Learning tab for the credibility assessment feature

import React from 'react';

function LearningCredibility() {
    return (
        <div style={learningCredTabStyle}>
            {/* content for the credibility learning tab */}
            <div style={credStyle}>
                <h3>How is credibility assessed?</h3>
                <p>
                    <strong>What It Does:</strong>
                    This step assesses how reliable and trustworthy the content is. It analyzes whether the article or text uses evidence-based language, cites reputable sources, and avoids sensationalism or manipulation.
                </p>
                <p>
                    <strong>How It Works:</strong>
                    <ul>
                        <li>The content from the user input (direct text or URL content) is passed into two OpenAI assistant that has specific instructions for bias and fact evaluation.</li>
                        <li>It will perform the bias and fact evaluations separately and pass the outputs to Open AI for summarization.</li>
                        <li>The outputs are also used to generate an overall credibility score. This is calculated using the following formula:</li>
                    </ul>
                    <p>
                        Credibility Score = (Bias Weight * Bias Score) + (Fact Check Weight * Fact Check Score) /
                        (Bias Weight + Fact Check Weight) * 100
                    </p>
                    <p>
                        Where:
                    </p>
                    <ul>
                        <li>Bias Weight = 0.3</li>
                        <li>Fact Check Weight = 0.3</li>
                        <li>Bias Score = Bias Evaluation * Bias Confidence Score
                            <ul>
                                <li>If the content is "Unbiased" then Bias Evaluation is equal to 1, otherwise it is 0.</li>
                            </ul>
                        </li>
                        <li>Fact Check Score = Sum(Individual Fact Check Evaluations * Individual Fact Check Confidence Score)
                            <ul>
                                <li>If the content is "True" then Fact Check Evaluation is equal to 1, otherwise it is 0.5 for "Needs Context", and 0 if it is "False".</li>
                            </ul>
                        </li>
                    </ul>
                </p>
                <p>
                    <strong>What You Get:</strong>
                    <ul>
                        <li>A credibility score (0, 100).</li>
                        <li>A summary of the bias and fact check evaluations</li>
                    </ul>
                </p>
            </div>
        </div>
    );
}


// Styles
const learningCredTabStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%', // Ensure the parent container allows children to stretch
};

const credStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
    fontFamily: 'Shippori Antique B1, sans-serif',
    position: 'relative',
    height: '100%', // Make the section as long as the parent container
    textAlign: 'left', // Align text to the left
};

export default LearningCredibility;