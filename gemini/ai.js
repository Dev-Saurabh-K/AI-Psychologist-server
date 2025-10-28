import { GoogleGenAI } from "@google/genai";
import Message from "../models/userChat.js"
// import summaryModel from "../models/summery.js";

export async function aiService(input) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const modelName = "gemini-2.0-flash";

  const chat = ai.chats.create({ model: modelName });

//   const chatInput1 = input;
//   console.log(`User: ${chatInput1}`);



// const 
//try using payoad isntead of message.....

let data = await Message.find({ username: 'ftyhb' })
  // .sort({ createdAt: -1 })
  // .limit(10)
  // .lean(); // latest 10 messages only

// console.log(data[data.length-1].text);
// let payload={
//   "past":data,
//   "present":input
// }

// context
// console.log(data);






//context----------last 5 chats
// let payload=[data[data.length-1].text,data[data.length-2].text,data[data.length-3].text,data[data.length-4].text,data[data.length-5].text]
// let payload=[data[data.length-1]]
// console.log(payload)


// await chat.sendMessage({
//   message:payload
// })
//earlier used input instead of payload---working

  let response = await chat.sendMessage({
    message: input,
  });


  
// let summary = await chat.summarizeChat();
// await summaryModel.create({ username, summary });

// console.log(summary);




//   console.log(`Model: ${response.text}\n`);

//   const chatInput2 = "What is my name and how many pets do I have?";
//   console.log(`User: ${chatInput2}`);

//   response = await chat.sendMessage({
//     message: chatInput2,
//   });

//   console.log(`Model: ${response.text}\n`);

//   const history = await chat.getHistory();
//   console.log("--- Full Conversation History ---");
//   for (const message of history) {
//     console.log(`Role: ${message.role}, Text: ${message.parts[0].text}`);
//   }

  return response.text;
}
