import { Message } from '../hooks/useChat';
import MessageBubble from './MessageBubble';

interface Props {
  messages: Message[];
  loading?: boolean;
}

export default function ChatWindow({ messages, loading }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-xl h-[60vh] overflow-y-auto border border-slate-200">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {loading ? <div className="text-sm text-slate-500">AI is thinking...</div> : null}
      {!messages.length && !loading ? (
        <div className="text-center text-slate-400 mt-auto">
          Start the conversation by sending a message.
        </div>
      ) : null}
    </div>
  );
}
