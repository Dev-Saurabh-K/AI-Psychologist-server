import { GoogleGenAI } from "@google/genai";

export default class GeminiChat {
  constructor(modelName = "gemini-2.5-flash") {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    this.modelName = modelName;
    this.chat = null;
    this.history = [];
  }


  /** Initialize chat session **/
  async init() {
    this.chat = this.ai.chats.create({ model: this.modelName });
  }

  /** Send a message **/
  async sendMessage(message) {
    if (!this.chat) await this.init();

    const response = await this.chat.sendMessage({ message });
    this.history.push({ role: "user", text: message });
    this.history.push({ role: "model", text: response.text });

    return response.text;
  }

  /** Get chat history **/
  async getHistory() {
    return this.history;
  }

  /** Summarize entire chat **/
  async summarize() {
    if (!this.chat) await this.init();

    const summary = await this.chat.sendMessage({
      message: "Summarize this chat briefly for record keeping.",
    });

    return summary.text;
  }
}
