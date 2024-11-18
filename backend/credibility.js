import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function calculateCredibilityScore(biasAnalysis, factAnalysis) {
  if (typeof biasAnalysis === 'string') {
    biasAnalysis = JSON.parse(biasAnalysis);
  }
  if (typeof factAnalysis === 'string') {
    factAnalysis = JSON.parse(factAnalysis);
  }
  // Step 1: Bias Contribution
  const biasMultiplier = biasAnalysis.evaluation.toLowerCase() === "unbiased" ? 1 : 0;
  const biasContribution = biasMultiplier * biasAnalysis.confidence_score;

  // Step 2: Fact Check Contribution
  const truthValueWeights = {
    "true": 1,
    "false": 0,
    "Needs Context": 0.5,
  };

  let factScoreSum = 0;
  factAnalysis.forEach(({ truth_value, confidence_score }) => {
    const weight = truthValueWeights[truth_value] || 0;
    factScoreSum += weight * confidence_score/100;
  });

  const factContribution = factAnalysis.length > 0 ? factScoreSum / factAnalysis.length : 0;

  // Step 3: Combine Contributions
  const weightBias = 0.3; // Adjust based on importance
  const weightFact = 0.7; // Adjust based on importance

  let finalScore =
    Math.round(
      (weightBias * biasContribution + weightFact * factContribution) /
      (weightBias + weightFact) * 100
    );

  // Clamp the score to the range [0, 100]
  finalScore = Math.max(0, Math.min(100, finalScore));
  
  return finalScore;
}
  
export async function summarizeCredibilityAnalysis(biasAnalysis, factAnalysis) {
  
  let messages = [
        { role: 'system', content: `You are a helpful assistant. Your job is to summarize the content from the bias analysis and the fact analysis. Please limit the response to three sentences or less.` },
        { role: 'user', content: `Bias Analysis: ${JSON.stringify(biasAnalysis)}. Fact Analysis: ${JSON.stringify(factAnalysis)}.` }
    ];
  try {

    const credibilityScore = await calculateCredibilityScore(biasAnalysis, factAnalysis);

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
    });
    

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