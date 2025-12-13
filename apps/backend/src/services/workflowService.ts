import { ChatRequest, ChatResponse } from '@ai-chatbot/shared/types/chat';

// Placeholder for future LangGraph orchestration
export async function runWorkflow(request: ChatRequest): Promise<ChatResponse> {
  return { answer: `Workflow not implemented. Echo: ${request.message}` };
}
