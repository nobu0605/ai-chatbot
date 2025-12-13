import { useEffect, useMemo, useState } from "react";
import {
  ChatMessageDTO,
  ChatResponse,
} from "@ai-chatbot/shared/types/chat";
import { Role } from "../constants/message";

export type MessageRole = (typeof Role)[keyof typeof Role];

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface UseChatParams {
  sessionId?: string;
}

export function useChat({ sessionId: initialSessionId }: UseChatParams = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(
    initialSessionId
  );

  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_BASE_URL ?? "", []);

  useEffect(() => {
    if (!sessionId) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/chat/${sessionId}`);
        if (!res.ok) return;
        const data = (await res.json()) as { messages: ChatMessageDTO[] };
        setMessages(
          data.messages.map((m) => ({
            id: m.id,
            role: (m.role === "assistant" ? "assistant" : "user") as MessageRole,
            content: m.content,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [apiBaseUrl, sessionId]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed, sessionId }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ChatResponse;
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer ?? "No answer returned.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, something went wrong while contacting the API.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
  };
}
