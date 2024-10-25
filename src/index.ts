import express from 'express';
import dotenv from 'dotenv';
import connectDB from '@/config/db';  // MongoDB connection
import routes from '@/routes';  // Centralized routes

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the centralized routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
