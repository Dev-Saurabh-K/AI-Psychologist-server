import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Message from "./models/userChat.js";
import { aiService } from "./gemini/ai.js";
import { logVel } from "./middleware/loginValidation.js";
import { signVel } from "./middleware/signupValidation.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// 

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // your production client (e.g., https://ai-psychologist.vercel.app)
].filter(Boolean); // removes undefined/null entries

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});
// message when new user conencts
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("send_message", async (data) => {
    console.log("Message:", data);
    //sending input data to ai model
    const res = await aiService(data);
    // console.log(res)

    //storing res to mongodb
    var message = await Message.create({
      username: "ftyhb",
      text: data,
      reply: res,
    });

    console.log(message);
    console.log("connectncdncieciie")
    // console.log(message.text);

    //sending to all user---broadcasting
    // io.emit("receive_message", data);
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.post('/login',logVel,(req,res)=>{
  const {username, password}=req.body;
  // console.log(username,password);
  console.log(req.data);
  res.json({
    username,
    password
  });
})



app.post('/signup',signVel,(req,res)=>{
  // const {username,password}=req.body;
  // console.log(username);
  // console.log(req.data);
  console.log(req.data);
  res.json({
    success: true,
    message: "User registered successfully",
    data: req.data
  })
})

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
