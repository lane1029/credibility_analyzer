// Description: This file contains the code to classify text using OpenAI's ChatGPT API.

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Load the OpenAI client
import { OpenAI } from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// List of possible labels for classification
const LABELS = ['health', 'other'];

// function to classify text
export async function classifyText(text) {

    try {
        // Construct the prompt for classification
        const prompt = `You are a classification assistant. Classify the input text into one of these categories: ${LABELS.join(', ')}.`;

        // Call OpenAI's ChatGPT API
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {"role": "system", "content": prompt},
                {
                    "role": "user",
                    "content": text
                }
            ],
            max_tokens: 10, // Limit the response to avoid excessive token usage
        });

        const classification = response.choices[0].message.content;

        return classification;
    } catch (error) {
        console.error('Error classifying text: ', error);
        throw error;
      }
}
