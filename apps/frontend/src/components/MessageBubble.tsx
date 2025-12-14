import { Message } from "../hooks/useChat";
import { Role } from "@ai-chatbot/shared";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === Role.USER;
  const roleClasses = isUser
    ? "self-end bg-blue-600 text-white"
    : "self-start bg-slate-200 text-slate-900";
  const baseClasses = "px-3 py-3 rounded-2xl max-w-[70%] shadow-md leading-relaxed";

  return (
    <div className={`${baseClasses} ${roleClasses}`}>
      {message.content}
    </div>
  );
}
