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

export async function analyze(text, Assistant) {
  try{
    const thread = await createThread()
    const message = await createMessage(text, thread)
    const run = await createRun(thread, Assistant)
    const response = await getAssistantResponse(run)
    const cleanedResponse = await cleanResponse(response)
    return cleanedResponse
  } catch (error) {
    console.error('Error analyzing bias:', error);
    throw error;
  }
}

// Function to create a message
async function createMessage(text, thread) {
  try {
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: text
      }
    );
    return message;
  } catch (error) { 
    console.error('Error creating message:', error.response?.data || error.message);
    throw error;
  }
}

// Function to create a thread
async function createThread() {
  try{
    let response = await openai.beta.threads.create()
    return response;
  } catch (error) {
    console.error('Error creating thread:', error.response?.data || error.message);
    throw error;
  }
}

async function createRun(thread, assistant) {
  try {
    let run = await openai.beta.threads.runs.createAndPoll(
      thread.id,
      {
        assistant_id: assistant.id,
      }
    );
    return run;
  } catch (error) {
    console.error('Error creating run:', error.response?.data || error.message);
    throw error;
  }
}

async function getAssistantResponse(run) {
  try {
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );
      for (const message of messages.data.reverse()) {
        if (message.role === 'assistant')
          return message.content[0].text.value;
      }
    } else {
      console.log(run.status);
      return "Assistant is still working on the response."
    }
  } catch (error) {
    console.error('Error retrieving assistant response:', error.response?.data || error.message);
    throw error;
  }
}

async function cleanResponse(response) {
  let cleanedResponse = response.split('```')[1]?.trim() || response;
  cleanedResponse = cleanedResponse.replace(/^json\s*/, '');
  return cleanedResponse;
}