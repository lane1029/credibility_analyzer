import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { analyzeURL } from './analyze.js';

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.post('/api/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log("Mongo URI:", process.env.MONGO_URI);
    const analysisResult = await analyzeURL(url);
    res.json({ result: analysisResult });
  } catch (error) {
    console.error('Error analyzing URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
