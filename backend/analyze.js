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

export async function analyzeURL(url) {
  await client.connect();
  const db = client.db('credibility_analyzer');
  const filesCollection = db.collection('files');

  // Example analysis logic
  const relatedFiles = await filesCollection.find({ tags: { $regex: url, $options: 'i' } }).limit(3).toArray();
  const context = relatedFiles.map(file => `${file.title}: ${file.content}`).join('\n\n');

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a credibility analyzer assistant.' },
      { role: 'user', content: `Analyze the credibility of the content at: ${url}.\nContext:\n${context}` }
    ],
  });

  return response.data.choices[0].message.content;
}
