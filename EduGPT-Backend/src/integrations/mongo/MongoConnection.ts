import mongoose from "mongoose";
import { env } from "../../config/env";

const MONGO_URI = env.DATABASE_URL || "mongodb://localhost:27017";

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      user: env.DATABASE_USERNAME,
      pass: env.DATABASE_PASS,
      dbName: env.DATABASE_NAME,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
