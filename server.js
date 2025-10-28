import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Message from "./models/userChat.js";
import { aiService } from "./gemini/ai.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
// 
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true, // allows cookies/auth headers if needed
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
    // console.log(message.text);

    //sending to all user---broadcasting
    // io.emit("receive_message", data);
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});


server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
