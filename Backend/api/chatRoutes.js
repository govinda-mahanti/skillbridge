import express from "express";
import { labChatWithAI, chatWithAI  } from "../controllers/chatControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/chat", chatWithAI);
router.post("/lab-chat", authMiddleware, labChatWithAI);

export default router;