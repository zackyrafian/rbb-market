import { useEffect, useState } from 'react';

const Chat = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws?user_id=' + from);
    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const incomingMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [from]);

  const sendMessage = () => {
    if (ws && message && from && to) {
      const msg = {
        from: parseInt(from),
        to: parseInt(to),
        content: message,
      };

      ws.send(JSON.stringify(msg));
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <label>
          From (User ID):
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
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
