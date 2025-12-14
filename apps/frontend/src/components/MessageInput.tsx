interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading?: boolean;
}

export default function MessageInput({ value, onChange, onSend, loading }: Props) {
  return (
    <div className="flex gap-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-xl border border-slate-200 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
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
        className="rounded-xl bg-blue-600 px-4 py-3 text-white font-medium shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
