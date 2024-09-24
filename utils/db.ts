import mongoose from 'mongoose';
import dotenv from 'dotenv';

// dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error('(MONGO_URI) is empty');
    }

    await mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log('MongoDB connected successfully');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
