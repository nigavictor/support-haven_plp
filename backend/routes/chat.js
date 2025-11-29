const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { sanitizeHTML } = require('../utils/safety');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');

// Generate anonymous user ID
function generateAnonymousId() {
  return crypto.randomBytes(16).toString('hex');
}

// Create or get existing chat
router.post('/create', async (req, res) => {
  try {
    const { userId } = req.body;
    const anonymousUserId = userId || generateAnonymousId();

    // Check if user already has an active chat
    const existingChat = await pool.query(
      'SELECT * FROM chats WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC LIMIT 1',
      [anonymousUserId, 'active']
    );

    if (existingChat.rows.length > 0) {
      return res.json({
        success: true,
        chat: existingChat.rows[0],
        userId: anonymousUserId
      });
    }

    // Create new chat
    const result = await pool.query(
      'INSERT INTO chats (user_id, status) VALUES ($1, $2) RETURNING *',
      [anonymousUserId, 'active']
    );

    res.json({
      success: true,
      chat: result.rows[0],
      userId: anonymousUserId
    });
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ success: false, error: 'Failed to create chat' });
  }
});

// Get chat messages
router.get('/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE chat_id = $1 
       ORDER BY created_at ASC`,
      [chatId]
    );

    res.json({
      success: true,
      messages: result.rows
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// Save message to database
router.post('/:chatId/message', [
  body('content').trim().notEmpty().withMessage('Message content is required'),
  body('senderType').isIn(['user', 'expert']).withMessage('Invalid sender type'),
  body('senderId').trim().notEmpty().withMessage('Sender ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { chatId } = req.params;
    const { content, senderType, senderId } = req.body;

    // Verify chat exists
    const chatCheck = await pool.query('SELECT * FROM chats WHERE id = $1', [chatId]);
    if (chatCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Chat not found' });
    }

    // Sanitize message content
    const sanitizedContent = sanitizeHTML(content);

    // Save message
    const result = await pool.query(
      `INSERT INTO messages (chat_id, sender_type, sender_id, content) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [chatId, senderType, senderId, sanitizedContent]
    );

    res.json({
      success: true,
      message: result.rows[0]
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

// Assign expert to chat (for demo, can be automated)
router.post('/:chatId/assign-expert', async (req, res) => {
  try {
    const { chatId } = req.params;
    const { expertId } = req.body;

    const result = await pool.query(
      'UPDATE chats SET expert_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [expertId || 'expert-1', chatId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Chat not found' });
    }

    res.json({
      success: true,
      chat: result.rows[0]
    });
  } catch (error) {
    console.error('Error assigning expert:', error);
    res.status(500).json({ success: false, error: 'Failed to assign expert' });
  }
});

module.exports = router;

