import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ enable CORS

// Home page route
app.get('/', (req, res) => res.send('Server is running'));

// Inngest route
app.use('/api/inngest', serve({ client: inngest, functions }));

// Connect to DB before handling requests
await connectDB();

// ✅ For Vercel: Export the app instead of listening
export default app;

// ✅ For local development: Start server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
