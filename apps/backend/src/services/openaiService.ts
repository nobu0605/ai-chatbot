import OpenAI from "openai";
import { env } from "../config/env";
import { ChatRequest, ChatResponse } from "@ai-chatbot/shared/types/chat";
import { prisma } from "../db/prisma";

const client = new OpenAI({
  apiKey: env.openaiApiKey,
});

export async function getChatCompletion(
  request: ChatRequest
): Promise<ChatResponse> {
  try {
    const response = env.openaiApiKey
      ? await callOpenAI(request)
      : { answer: "OpenAI API key is not configured." };

    const sessionId = await persistConversation(request, response);
    return { ...response, sessionId };
  } catch (error) {
    // Best-effort persistence even when OpenAI or downstream fails
    const sessionId = await persistConversation(request, {
      answer: "Error generating response.",
    }).catch(() => undefined);
    throw Object.assign(error, { sessionId });
  }
}

async function callOpenAI(request: ChatRequest): Promise<ChatResponse> {
  const completion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: request.message,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content ?? "";
  return { answer };
}

async function persistConversation(
  request: ChatRequest,
  response: ChatResponse
): Promise<string> {
  if (request.sessionId) {
    await prisma.chatMessage.createMany({
      data: [
        {
          sessionId: request.sessionId,
          role: "user",
          content: request.message,
        },
        {
          sessionId: request.sessionId,
          role: "assistant",
          content: response.answer,
          metadata: response.sources
            ? { sources: response.sources }
            : undefined,
        },
      ],
    });
    return request.sessionId;
  }

  const session = await prisma.chatSession.create({
    data: {
      messages: {
        create: [
          {
            role: "user",
            content: request.message,
          },
          {
            role: "assistant",
            content: response.answer,
            metadata: response.sources
              ? { sources: response.sources }
              : undefined,
          },
        ],
      },
    },
    select: { id: true },
  });
  return session.id;
}
