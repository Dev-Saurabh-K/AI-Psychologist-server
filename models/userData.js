import mongoose from "./db";


// import dotenv from "dotenv";

// dotenv.config();
// // Replace 'chatApp' with your database name
// // const DB_URI = 'mongodb://localhost:27017/chatApp'; 

// const DB_URI=process.env.MONGO_URI;
// console.log(DB_URI);


// mongoose.connect(DB_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;