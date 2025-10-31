import mongoose from "./db.js";

// Replace 'chatApp' with your database name
// const DB_URI = 'mongodb://localhost:27017/chatApp'; 

// mongoose.connect(DB_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.error('MongoDB connection error:', err));

const SummarySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const summaryModel = mongoose.model('summaryModel', SummarySchema);
export default summaryModel;