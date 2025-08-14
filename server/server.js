import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express"; // ✅ import serve

const app = express();

await connectDB();

// Middleware
app.use(express.json());

// To connect backend and frontend
app.use(cors()); // ✅ call cors()

// Home page route
app.get('/', (req, res) => res.send('Server is running'));

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
