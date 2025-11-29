const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

// Simple admin authentication (for demo - use proper auth in production)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // For demo purposes, simple check
    // In production, use proper JWT authentication
    if (username === (process.env.ADMIN_USERNAME || 'admin') && 
        password === (process.env.ADMIN_PASSWORD || 'admin123')) {
      res.json({
        success: true,
        message: 'Login successful',
        token: 'demo-token' // In production, use JWT
      });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in admin login:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Get pending stories for moderation
router.get('/stories/pending', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM stories WHERE status = $1 ORDER BY created_at DESC',
      ['pending']
    );

    res.json({
      success: true,
      stories: result.rows
    });
  } catch (error) {
    console.error('Error fetching pending stories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pending stories' });
  }
});

// Approve or reject a story
router.post('/stories/:id/moderate', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, error: 'Invalid action' });
    }

    const status = action === 'approve' ? 'approved' : 'rejected';
    
    const result = await pool.query(
      'UPDATE stories SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    res.json({
      success: true,
      message: `Story ${action}d successfully`,
      story: result.rows[0]
    });
  } catch (error) {
    console.error('Error moderating story:', error);
    res.status(500).json({ success: false, error: 'Failed to moderate story' });
  }
});

// Get all stories (for admin view)
router.get('/stories/all', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM stories ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      stories: result.rows
    });
  } catch (error) {
    console.error('Error fetching all stories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stories' });
  }
});

// Get chat statistics
router.get('/stats', async (req, res) => {
  try {
    const storiesCount = await pool.query('SELECT COUNT(*) FROM stories');
    const approvedCount = await pool.query("SELECT COUNT(*) FROM stories WHERE status = 'approved'");
    const pendingCount = await pool.query("SELECT COUNT(*) FROM stories WHERE status = 'pending'");
    const chatsCount = await pool.query('SELECT COUNT(*) FROM chats');
    const messagesCount = await pool.query('SELECT COUNT(*) FROM messages');

    res.json({
      success: true,
      stats: {
        totalStories: parseInt(storiesCount.rows[0].count),
        approvedStories: parseInt(approvedCount.rows[0].count),
        pendingStories: parseInt(pendingCount.rows[0].count),
        totalChats: parseInt(chatsCount.rows[0].count),
        totalMessages: parseInt(messagesCount.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
  }
});

module.exports = router;

