const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const storyRoutes = require('./routes/stories');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');
const reactionRoutes = require('./routes/reactions');
const { initDatabase } = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/stories', storyRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reactions', reactionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Support Haven API is running' });
});

// Socket.io for real-time chat
const activeChats = new Map(); // Store active chat sessions

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-chat', async (data) => {
    const { chatId, userType } = data;
    socket.join(chatId);
    activeChats.set(socket.id, { chatId, userType });
    console.log(`User ${socket.id} joined chat ${chatId} as ${userType}`);
  });

  socket.on('send-message', async (data) => {
    const { chatId, message, senderType, senderId } = data;
    const chatInfo = activeChats.get(socket.id);
    
    if (chatInfo && chatInfo.chatId === chatId) {
      // Broadcast message to all users in the chat room
      io.to(chatId).emit('new-message', {
        message,
        senderType,
        senderId,
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('disconnect', () => {
    activeChats.delete(socket.id);
    console.log('User disconnected:', socket.id);
  });
});

// Initialize database and start server
initDatabase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Support Haven API server running on port ${PORT}`);
      console.log(`📡 Socket.io server ready for real-time chat`);
      console.log(`📝 Note: Using fallback sample stories (database not connected)`);
    });
  })
  .catch((error) => {
    console.warn('⚠️  Database connection failed, but server will start with fallback data');
    console.warn('   Error:', error.message);
    console.warn('   Stories API will return sample data');
    console.warn('   To fix: Create database and update backend/.env with correct credentials');
    
    // Start server anyway - routes will use fallback data
    server.listen(PORT, () => {
      console.log(`🚀 Support Haven API server running on port ${PORT} (fallback mode)`);
      console.log(`📡 Socket.io server ready for real-time chat`);
      console.log(`📝 Sample stories are available at /api/stories`);
    });
  });

module.exports = { app, io };

