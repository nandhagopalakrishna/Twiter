import { generateReply } from './controllers/replyController.js';

export function setupRoutes(app) {
  app.post('/generate', generateReply);
}