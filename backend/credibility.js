// Description: This file contains the code for calculating the credibility score and summarizing the credibility analysis.

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Import the OpenAI class from the openai module
import { OpenAI } from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to calculate the credibility score based on bias analysis and fact analysis
async function calculateCredibilityScore(biasAnalysis, factAnalysis) {
  // Parse the JSON strings if they are not already parsed
  if (typeof biasAnalysis === 'string') {
    biasAnalysis = JSON.parse(biasAnalysis);
  }
  // Parse the JSON strings if they are not already parsed
  if (typeof factAnalysis === 'string') {
    factAnalysis = JSON.parse(factAnalysis);
  }
  // Bias Contribution
  const biasMultiplier = biasAnalysis.evaluation.toLowerCase() === "unbiased" ? 1 : 0;
  const biasContribution = biasMultiplier * biasAnalysis.confidence_score;

  // Fact Check Contribution
  const truthValueWeights = {
    "true": 1,
    "false": 0,
    "Needs Context": 0.5,
  };

  // Calculate the weighted sum of the fact check scores
  let factScoreSum = 0;
  factAnalysis.forEach(({ truth_value, confidence_score }) => {
    const weight = truthValueWeights[truth_value] || 0;
    factScoreSum += weight * confidence_score/100;
  });

  // Calculate the average fact check score
  const factContribution = factAnalysis.length > 0 ? factScoreSum / factAnalysis.length : 0;

  // Combine Contributions with Weights
  const weightBias = 0.3; // Adjust based on importance
  const weightFact = 0.7; // Adjust based on importance

  // Calculate the final credibility score
  let finalScore =
    Math.round(
      (weightBias * biasContribution + weightFact * factContribution) /
      (weightBias + weightFact) * 100
    );

  // apply and min and max to the score for range [0, 100]
  finalScore = Math.max(0, Math.min(100, finalScore));
  
  return finalScore;
}
  
// Function to summarize the credibility analysis
export async function summarizeCredibilityAnalysis(biasAnalysis, factAnalysis) {
  
  // Define the messages for the OpenAI chat completion
  let messages = [
        { role: 'system', content: `You are a helpful assistant. Your job is to summarize the content from the bias analysis and the fact analysis. Please limit the response to three sentences or less.` },
        { role: 'user', content: `Bias Analysis: ${JSON.stringify(biasAnalysis)}. Fact Analysis: ${JSON.stringify(factAnalysis)}.` }
    ];
  try {

    // Calculate the credibility score
    const credibilityScore = await calculateCredibilityScore(biasAnalysis, factAnalysis);

    // Call the OpenAI API to summarize the credibility analysis
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
    });
    // Extract the summary from the response
    const summary = response.choices[0].message.content;
    return {
      "credibility_score": credibilityScore,
      "credibility_summary": summary
    }
  } catch (error) {
    console.error('Error summarizing credibility analysis:', error);
    throw new Error('Failed to summarize credibility analysis');
  }
}