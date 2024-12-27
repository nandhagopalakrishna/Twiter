import { Configuration, OpenAIApi } from 'openai';

export class OpenAIService {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateReply(tweet) {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a friendly and engaging reply to this tweet (max 100 words):\n\n${tweet}\n\nReply:`,
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return completion.data.choices[0]?.text?.trim() || '';
  }
}