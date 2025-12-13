import { Message } from "../hooks/useChat";
import { Role } from "../constants/message";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === Role.USER;

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isUser ? "#2563eb" : "#e5e7eb",
        color: isUser ? "#fff" : "#111827",
        padding: "12px 14px",
        borderRadius: "14px",
        maxWidth: "70%",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        lineHeight: 1.5,
      }}
    >
      {message.content}
    </div>
  );
}
