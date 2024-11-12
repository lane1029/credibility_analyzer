import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch the list of assistants from OpenAI API
export async function getAssistantList() {
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
export async function retrieveAssistant(assistant_id) {
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

// Function to create a thread
// async function create_thread() {
//   try{
//     let response = await openai.beta.threads.create()
//     return response;
//   } catch (error) {
//     console.error('Error creating thread:', error.response?.data || error.message);
//     throw error;
//   }
// }

// // Function to clean the response from the OpenAI API
// // Removes citation placeholders from the response
// function clean_response(response) {
//   return response.replace(/【\d+:\d+†source】/g, ''); // Removes citation placeholders
// }

// // Function to get all messages from the thread and filter on just the most recent response
// async function get_all_messages(messages) {
//   let full_response = JSON.stringify(messages);
//   full_response = JSON.parse(full_response);

//   // Get the most recent response from the assistant
//   let content = full_response.data[0].content
//   let response_message = content[0].text.value;

//   // Clean the response for citation placeholders
//   const cleanedMessage = clean_response(response_message);
//   return cleanedMessage;
// }