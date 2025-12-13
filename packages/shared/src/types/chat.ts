export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  answer: string;
  sources?: Array<{ id: string; title: string }>;
  sessionId?: string;
}

export interface ChatMessageDTO {
  id: string;
  sessionId: string | null;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: unknown;
  createdAt: string;
}
