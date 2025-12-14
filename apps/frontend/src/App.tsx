import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { useChat } from "./hooks/useChat";

interface AppProps {
  sessionId?: string;
}

export default function App({ sessionId }: AppProps) {
  const { messages, input, setInput, sendMessage, loading } = useChat({
    sessionId,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-indigo-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold text-slate-900">AI Chatbot</h1>
          </div>
        </header>

        <ChatWindow messages={messages} loading={loading} />
        <MessageInput
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}
