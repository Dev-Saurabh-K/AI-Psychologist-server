import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
// Replace 'chatApp' with your database name
// const DB_URI = 'mongodb://localhost:27017/chatApp';

const DB_URI = process.env.MONGO_URI;
console.log(DB_URI);

mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


export default mongoose;