import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import { setupRoutes } from './routes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'https://twitter.com',
    'https://x.com',
    // Allow local development
    /^http:\/\/localhost:/
  ]
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});