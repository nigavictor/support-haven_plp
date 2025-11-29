import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { getApiUrl } from '../config/api';

function ChatPage() {
  const [userId, setUserId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [expertAssigned, setExpertAssigned] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Generate or retrieve anonymous user ID
    let anonymousId = localStorage.getItem('anonymousUserId');
    if (!anonymousId) {
      // Generate random ID using browser crypto API
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      anonymousId = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('anonymousUserId', anonymousId);
    }
    setUserId(anonymousId);

    // Initialize socket connection
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
      createChat(anonymousId);
    });

    newSocket.on('new-message', (data) => {
      setMessages(prev => [...prev, data]);
      scrollToBottom();
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createChat = async (anonymousId) => {
    try {
      const response = await axios.post(getApiUrl('chat/create'), { userId: anonymousId });
      if (response.data.success) {
        const chat = response.data.chat;
        setChatId(chat.id);
        
        // Join socket room
        socket?.emit('join-chat', { chatId: chat.id, userType: 'user' });

        // Assign expert (for demo)
        await axios.post(getApiUrl(`chat/${chat.id}/assign-expert`), { expertId: 'expert-1' });
        setExpertAssigned(true);

        // Load existing messages
        loadMessages(chat.id);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const loadMessages = async (chatId) => {
    try {
      const response = await axios.get(`/api/chat/${chatId}/messages`);
      if (response.data.success) {
        setMessages(response.data.messages.map(msg => ({
          message: msg.content,
          senderType: msg.sender_type,
          senderId: msg.sender_id,
          timestamp: msg.created_at
        })));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId || !socket) return;

    const messageData = {
      chatId,
      message: newMessage.trim(),
      senderType: 'user',
      senderId: userId
    };

    // Send via socket for real-time
    socket.emit('send-message', messageData);

    // Also save to database
    try {
      await axios.post(getApiUrl(`chat/${chatId}/message`), {
        content: newMessage.trim(),
        senderType: 'user',
        senderId: userId
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }

    setNewMessage('');

    // Simulate expert response (for demo)
    setTimeout(() => {
      const expertResponse = generateExpertResponse(newMessage);
      const expertMessage = {
        chatId,
        message: expertResponse,
        senderType: 'expert',
        senderId: 'expert-1'
      };
      socket.emit('send-message', expertMessage);
      
      // Save expert message
      axios.post(getApiUrl(`chat/${chatId}/message`), {
        content: expertResponse,
        senderType: 'expert',
        senderId: 'expert-1'
      }).catch(err => console.error('Error saving expert message:', err));
    }, 2000);
  };

  const generateExpertResponse = (userMessage) => {
    // Simple demo responses - in production, this would be a real expert
    const responses = [
      "Thank you for sharing that with me. I understand this is difficult. You're showing great courage by reaching out.",
      "I hear you, and I want you to know that your feelings are valid. What you're experiencing is real and important.",
      "It takes strength to talk about these things. Remember, you are not alone in this journey.",
      "Thank you for trusting me with your story. How are you feeling right now?",
      "I appreciate you opening up. Would you like to talk more about what support you need right now?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Private Support Chat</h1>
      <p className="text-lg text-primary-700 mb-6 font-semibold">
        Connect with GBV Support Professionals
      </p>

      {/* Safety Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <p className="text-sm text-blue-700">
          <strong>Your privacy is protected:</strong> This chat is completely anonymous. 
          No personal information is stored. For immediate emergencies, please contact your local emergency services.
        </p>
      </div>
      
      {/* GBV Focus Notice */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <p className="text-sm text-purple-700">
          <strong>Specialized Support:</strong> Our counselors are trained to support survivors 
          of gender-based violence. Whether you need to talk about domestic violence, sexual assault, 
          harassment, or any other form of GBV, we're here to listen and support you.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-lg shadow-md flex flex-col" style={{ height: '600px' }}>
        {/* Chat Header */}
        <div className="bg-primary-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Support Chat</h2>
              <p className="text-sm text-primary-100">
                {connected ? (expertAssigned ? 'Connected - Expert available' : 'Connecting...') : 'Connecting...'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-300' : 'bg-yellow-300'}`}></div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Start a conversation. An expert will be with you shortly.</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.senderType === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.senderType === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              disabled={!connected || !expertAssigned}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !connected || !expertAssigned}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          <strong>Note:</strong> This is a demo version. In production, you would be connected 
          with trained counselors and support professionals.
        </p>
      </div>
    </div>
  );
}

export default ChatPage;

