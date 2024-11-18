import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { isUrlOrText, analyze } from './analyze.js';
import { getAssistants } from './assistants.js';
import { scrapeURL } from './scrape.js';
import {classifyText} from './classify.js';
import {summarizeCredibilityAnalysis} from './credibility.js';
import e from 'express';
// Load environment variables
dotenv.config();

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
app.use(express.json());

app.post('/api/fetch-content', async (req, res) => {
  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).send({ error: 'URL or Text is required' });
  }

  try {
    const inputType = await isUrlOrText(userInput);
    if (inputType === 'URL') {
      const textContent = await scrapeURL(userInput);
      res.json({ content: textContent });
    }
    else {
      res.json({ content: userInput });
    }
  } catch (error) {
    console.error('Error fetching content:', error.message);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/analyze', async (req, res) => {
  const { textContent } = req.body;
  try {
    const classification = await classifyText(textContent);
    const assistants = await getAssistants(classification);
    const biasAnalysis = await analyze(textContent, assistants[1]);
    const factAnalysis = await analyze(textContent, assistants[0]);
    const credibilityAnalysis = await summarizeCredibilityAnalysis(biasAnalysis, factAnalysis);
    return res.json({ "credibilityResult": credibilityAnalysis, "biasResult" : biasAnalysis , "factResult" : factAnalysis });
  } catch (error) {
    console.error('Error analyzing URL:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
