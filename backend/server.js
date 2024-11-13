import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { isUrlOrText, analyzeURL } from './analyze.js';
import { getAssistantList, retrieveAssistant } from './assistants.js';
import { scrapeURL } from './scrape.js';
// Load environment variables
dotenv.config();

// Set variables for testing
const topic = 'health';

const app = express();

app.use(cors({
  origin: true, // Reflects the request origin automatically
  credentials: true, // Allows cookies and credentials
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allows all origins (or specify specific one if needed)
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(json());

app.post('/api/analyze', async (req, res) => {
  const { userInput } = req.body;
  console.log("Request body URL:", url); // Debug log

  if (!userInput) {
    console.log("No user input provided in request body"); // Debug log
    return res.status(400).json({ error: 'User input is required' });
  }

  try {
    const inputType = await isUrlOrText(userInput);
    console.log("Analysis result:", analysisResult); // Debug log

    if (inputType === 'URL') {
      const textContent = await scrapeURL(userInput);
      console.log("Analysis result:", textContent); // Debug log

      return res.json({ result: analysisResult });
    }
    else {
      console.log("Analysis result:", analysisResult); // Debug log

      return res.json({ result: analysisResult });
    }
  } catch (error) {
    console.error('Error analyzing URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// // API endpoint to fetch assistants and send them to the client
// app.get('/get-assistants', async (req, res) => {
//   try {
//     const assistantList = await getAssistantList();
//     // Select the assistant from the assistant list with the name containing the topic
//     const topicAssistant = assistantList.find(assistant => assistant.name.includes(topic));
//     const biasAssistant = assistantList.find(assistant => assistant.name.includes('bias'));

//     // Retrieve the assistants using the assistant IDs
//     const factCheckAssistant = await retrieveAssistant(topicAssistant.id);
//     const biasCheckAssistant = await retrieveAssistant(biasAssistant.id);
//     res.json({ factCheckAssistant, biasCheckAssistant });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch assistants.' });
//   }

// });

// // API endpoint to create a thread
// app.get('/create-thread', async (req, res) => {
//   try {
//     // Create a new thread
//     const thread = await create_thread();

//     // Update the state with the thread ID
//     state.threadId = thread.id;
//     res.json({message: 'Thread created successfully.', state});
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create a thread.' });
//   }
// });

// // API endpoint to retrieve a response from the assistant
// app.post('/retrieve-response', async (req, res) => {
//   const message = req.body.message;
//   const threadId = state.threadId;

//   // Check if the message and threadId are provided
//   if (!message || !threadId) {
//     return res.status(400).json({ message: 'Message and threadId required.' });
//   }

//   // Add user's message to the state
//   state.messages.push({'role': 'User', 'message': message});

//   try {
//     let thread_id = state.threadId;
//     // Send user's message to the OpenAI API
//     await openai.beta.threads.messages.create(thread_id,
//         {
//             role: "user",
//             content: message,
//         })
//     // Run and poll thread V2 API feature
//     let run = await openai.beta.threads.runs.createAndPoll(thread_id, {
//         assistant_id: state.assistant_id
//     })
//     // update the state with the run ID
//     let run_id = run.id;
//     state.run_id = run_id;

//     // Retrieve the messages from the thread
//     let messages = await openai.beta.threads.messages.list(thread_id);
//     let all_messages = await get_all_messages(messages);
//     all_messages = all_messages.toString();
    
//     // Add assistant's response to the state
//     state.messages.push({'role': 'Assistant', 'message': all_messages});
//     res.json({'response_message': all_messages});
//   }
//   catch (error) {
//       console.log(error);
//       return error;
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
