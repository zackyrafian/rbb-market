import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Chat = () => {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const socket = new WebSocket(`ws://localhost:8080/ws?user_id=${userId}`);

    socket.onopen = () => {
      console.log('Connected to WebSocket as user', userId);
    };

    socket.onmessage = (event) => {
      const incomingMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [userId]);

  const sendMessage = () => {
    if (ws && message && userId && to) {
      const msg = {
        from: parseInt(userId),
        to: parseInt(to),
        content: message,
      };

      ws.send(JSON.stringify(msg));
      setMessage('');
    }
  };

  if (!session) return <p>Loading session...</p>;

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <p>Logged in as: {userId}</p>
        <label>
          To (User ID):
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
      </div>

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h2>Messages:</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
