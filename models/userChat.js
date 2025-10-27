import mongoose from 'mongoose';

// Replace 'chatApp' with your database name
// const DB_URI = 'mongodb://localhost:27017/chatApp'; 
const DB_URI=process.env.MONGO_URI;

mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
  },
  reply:{
    type: String,
    // required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;