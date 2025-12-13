export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  answer: string;
  sources?: Array<{ id: string; title: string }>;
}
