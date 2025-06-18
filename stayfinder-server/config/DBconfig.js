import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const url = process.env.MongBD_URL;
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (e) {
    console.error("MongoDB connection error:", e);
  }
};


