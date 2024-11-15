import dotenv from 'dotenv';
dotenv.config();
console.log("MONGO_URI:", process.env.MONGODB_URI);  // Debugging line

import { MongoClient } from 'mongodb';
import { OpenAI } from 'openai';

const client = new MongoClient(process.env.MONGODB_URI);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Utility function to detect if input is a URL or text
export async function isUrlOrText(input) {
  const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{2,}\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  return urlPattern.test(input) ? 'URL' : 'Text';
};

export async function analyzeText(text, biasAssistant, factCheckAssistant) {
  
}
