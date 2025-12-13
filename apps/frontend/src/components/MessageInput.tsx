interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading?: boolean;
}

export default function MessageInput({ value, onChange, onSend, loading }: Props) {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          outline: 'none'
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        disabled={loading}
      />
      <button
        onClick={onSend}
        disabled={loading || !value.trim()}
        style={{
          padding: '12px 18px',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
          opacity: loading || !value.trim() ? 0.6 : 1
        }}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
