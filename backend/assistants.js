import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch the list of assistants from OpenAI API
async function getAssistantList() {
  try {
    const response = await openai.beta.assistants.list({
      order: 'desc',
      limit: 50, // Limit to 50 assistants
    });
    return response.data
  } catch (error) {
    console.error('Error fetching assistants from OpenAI API:', error.response?.data || error.message);
    throw error;
  }
}

// Function to retrieve an assistant from OpenAI API
async function retrieveAssistant(assistant_id) {
  try {
    const response = await openai.beta.assistants.retrieve(
      assistant_id
    );
    return response;
  } catch (error) {
    console.error('Error fetching assistant from OpenAI API:', error.response?.data || error.message);
    throw error;
  }
}

// API endpoint to fetch assistants and send them to the client
export async function getAssistants(topic) {

  try {
    const assistantList = await getAssistantList();
    // Select the assistant from the assistant list with the name containing the topic
    const topicAssistant = assistantList.find(assistant => assistant.name.toLowerCase().includes(topic));
    const biasAssistant = assistantList.find(assistant => assistant.name.toLowerCase().includes('bias'));

    // Retrieve the assistants using the assistant IDs
    const factCheckAssistant = await retrieveAssistant(topicAssistant.id);
    const biasCheckAssistant = await retrieveAssistant(biasAssistant.id);
    return [factCheckAssistant, biasCheckAssistant];
  } catch (error) {
    console.error('Error fetching assistant from OpenAI API:', error.response?.data || error.message);
    throw error;
  }

}