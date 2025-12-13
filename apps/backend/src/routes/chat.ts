import { Router } from "express";
import { ChatRequest } from "@ai-chatbot/shared/types/chat";
import { getChatCompletion } from "../services/openaiService";

const router = Router();

router.post("/chat", async (req, res, next) => {
  const { message } = req.body as Partial<ChatRequest>;
  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const response = await getChatCompletion({ message });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
