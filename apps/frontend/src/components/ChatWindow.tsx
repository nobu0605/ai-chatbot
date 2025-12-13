import { Message } from '../hooks/useChat';
import MessageBubble from './MessageBubble';

interface Props {
  messages: Message[];
  loading?: boolean;
}

export default function ChatWindow({ messages, loading }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '16px',
        height: '60vh',
        overflowY: 'auto',
        border: '1px solid #e2e8f0'
      }}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {loading ? (
        <div style={{ color: '#6b7280', fontSize: '14px' }}>AI is thinking...</div>
      ) : null}
      {!messages.length && !loading ? (
        <div style={{ color: '#9ca3af', textAlign: 'center', marginTop: 'auto' }}>
          Start the conversation by sending a message.
        </div>
      ) : null}
    </div>
  );
}
