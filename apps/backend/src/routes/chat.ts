import { Router } from "express";
import {
  ChatMessageDTO,
  ChatRequest,
} from "@ai-chatbot/shared/types/chat";
import { Role } from "@ai-chatbot/shared";
import { getChatCompletion } from "../services/openaiService";
import { prisma } from "../db/prisma";

const router = Router();

router.post("/chat", async (req, res, next) => {
  const { message, sessionId } = req.body as Partial<ChatRequest>;
  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const response = await getChatCompletion({ message, sessionId });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/chat/:sessionId", async (req, res, next) => {
  const { sessionId } = req.params;
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });

    const result: ChatMessageDTO[] = messages.map((m) => ({
      id: m.id,
      sessionId: m.sessionId,
      role: (m.role as typeof Role[keyof typeof Role]) ?? Role.SYSTEM,
      content: m.content,
      metadata: m.metadata ?? undefined,
      createdAt: m.createdAt.toISOString(),
    }));

    res.json({ messages: result });
  } catch (error) {
    next(error);
  }
});

export default router;
