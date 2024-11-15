import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { isUrlOrText, analyze } from './analyze.js';
import { getAssistants } from './assistants.js';
import { scrapeURL } from './scrape.js';
import {classifyText} from './classify.js';
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

  if (!userInput) {
    console.log("No user input provided in request body"); // Debug log
    return res.status(400).json({ error: 'User input is required' });
  }

  try {
    const inputType = await isUrlOrText(userInput);

    if (inputType === 'URL') {
      const textContent = await scrapeURL(userInput);
      const classification = await classifyText(textContent);
      const assistants = await getAssistants(classification);
      const biasAnalysis = await analyze(textContent, assistants[1]);
      const factAnalysis = await analyze(textContent, assistants[0]);

      return res.json({ "biasResult" : biasAnalysis , "factResult" : factAnalysis });
    }
    else {
      console.log("Analysis result:", userInput); // Debug log
      const classification = await classifyText(userInput);

      return res.json({ result: classification });
    }
  } catch (error) {
    console.error('Error analyzing URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
