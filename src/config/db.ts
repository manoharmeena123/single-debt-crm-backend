import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB using Mongoose
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
