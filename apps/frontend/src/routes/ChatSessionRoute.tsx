import { useParams } from 'react-router';
import App from '../App';

export default function ChatSessionRoute() {
  const { sessionId } = useParams<{ sessionId: string }>();
  return <App sessionId={sessionId} />;
}
