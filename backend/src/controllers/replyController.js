import { OpenAIService } from '../services/openaiService.js';
import { validateTweet } from '../utils/validation.js';

export async function generateReply(req, res, next) {
  try {
    const { tweet } = req.body;

    if (!validateTweet(tweet)) {
      return res.status(400).json({ error: 'Invalid tweet content' });
    }

    const openaiService = new OpenAIService();
    const reply = await openaiService.generateReply(tweet);
    
    res.json({ reply });
  } catch (error) {
    next(error);
  }
}