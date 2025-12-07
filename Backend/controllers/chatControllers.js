import axios from "axios";
import { Chat } from "../models/chatModel.js";
import User from "../models/userModel.js";


export const labChatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Load previous chat history
    const previousChats = await Chat.find({ userId }).sort({ createdAt: 1 });

    const chatHistory = previousChats.flatMap(chat => [
      { role: "user", content: chat.userMessage },
      { role: "assistant", content: chat.botReply }
    ]);

    const systemPrompt = `
You are Lab Assistant, an intelligent and friendly AI designed to help users understand AR, VR, AI, robotics, and emerging technologies.
Tone: simple, warm, human-like.
Do NOT talk about finance or money.
Provide clear explanations and helpful guidance.
If the user asks technical questions, explain them in a beginner-friendly way.
    `;

    const messages = [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: message }
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 350,
          messages,
        }),
      }
    );

    const data = await response.json();

    const aiReply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    // Save chat in DB
    await Chat.create({
      userId,
      userMessage: message,
      botReply: aiReply,
    });

    res.json({
      success: true,
      botName: "Lab Assistant",
      botReply: aiReply,
    });

  } catch (error) {
    console.error("Lab Chat Error:", error);
    res.status(500).json({ success: false, error: "AI failed to respond." });
  }
};



export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = `
You are Lab Assistant, a friendly conversational AI.
You help users with simple explanations about technology, labs, research, AR/VR, AI, and general questions.
Tone: human-like, concise, warm.
Avoid complicated jargon unless the user requests deep technical detail.
Stay under 50 words. No line breaks.
    `;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        }),
      }
    );

    const data = await response.json();

    const aiReply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a response.";

    await Chat.create({
      userMessage: message,
      botReply: aiReply,
    });

    res.status(200).json({
      success: true,
      botName: "Lab Assistant",
      botReply: aiReply,
    });
  } catch (error) {
    console.error("chatWithAI Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get AI response.",
    });
  }
};

