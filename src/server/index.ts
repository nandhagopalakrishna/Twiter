import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
  try {
    const { tweet } = req.body;

    if (!tweet) {
      return res.status(400).json({ error: 'Tweet content is required' });
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a friendly and engaging reply to this tweet (max 100 words):\n\n${tweet}\n\nReply:`,
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const reply = completion.data.choices[0]?.text?.trim() || '';
    res.json({ reply });
  } catch (error) {
    console.error('Error generating reply:', error);
    res.status(500).json({ error: 'Failed to generate reply' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});