import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function calculateCredibilityScore(biasAnalysis, factAnalysis) {
    // Step 1: Bias Contribution
    const biasMultiplier = biasAssessment.evaluation.toLowerCase() === "unbiased" ? 1 : -1;
    const biasContribution = biasMultiplier * biasAssessment.confidenceScore;
  
    // Step 2: Fact Check Contribution
    const truthValueWeights = {
      True: 1,
      False: -1,
      "Needs Context": -0.5,
    };
  
    let factScoreSum = 0;
    factAnalysis.forEach(({ truth_value, confidence_score }) => {
      const weight = truthValueWeights[truth_value] || 0;
      factScoreSum += weight * confidence_score;
    });
  
    const factContribution = factAnalysis.length > 0 ? factScoreSum / factAnalysis.length : 0;
  
    // Step 3: Combine Contributions
    const weightBias = 0.3; // Adjust based on importance
    const weightFact = 0.7; // Adjust based on importance
  
    let finalScore =
      (weightBias * biasContribution + weightFact * factContribution) /
      (weightBias + weightFact);
  
    // Clamp the score to the range [-1, 1]
    finalScore = Math.max(-1, Math.min(1, finalScore));
  
    return finalScore;
  }
  