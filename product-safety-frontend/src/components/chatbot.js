import React, { useState } from 'react';
import './chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Ask me anything about skin, food, or cosmetics.' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch('https://f4ikjhtsme.execute-api.us-east-1.amazonaws.com/dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
    
      if (!response.ok) {
        const text = await response.text();
        console.error('Bad response:', response.status, text);
        throw new Error('Bad response from server');
      }
    
      const data = await response.json();
      setMessages([...newMessages, { sender: 'bot', text: data.answer }]);
    } catch (err) {
      console.error('Error fetching response:', err);
      setMessages([...newMessages, { sender: 'bot', text: 'Error fetching response.' }]);
    }
    

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>Ask ProductBot</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
