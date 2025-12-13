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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0ea5e9 0%, #312e81 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "min(960px, 100%)",
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "24px" }}>AI Chatbot</h1>
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
