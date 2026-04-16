import express from "express";
import { chatWithAI, labChatWithAI  } from "../controllers/chatControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/chat", chatWithAI);
router.post("/lab-chat", labChatWithAI);

export default router;