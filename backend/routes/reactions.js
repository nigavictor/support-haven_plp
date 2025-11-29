const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// In-memory storage for reactions (fallback if database unavailable)
const reactionsStore = new Map();

// Initialize sample reactions for demo stories
const initializeSampleReactions = () => {
  reactionsStore.set('1', { heart: 12, support: 8, strength: 15 });
  reactionsStore.set('2', { heart: 9, support: 11, strength: 7 });
  reactionsStore.set('3', { heart: 15, support: 13, strength: 10 });
};

initializeSampleReactions();

// Get reactions for a story
router.get('/story/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;
    
    let reactions = { heart: 0, support: 0, strength: 0 };
    
    try {
      // Try to get from database
      const result = await pool.query(
        `SELECT reaction_type, COUNT(*) as count 
         FROM story_reactions 
         WHERE story_id = $1 
         GROUP BY reaction_type`,
        [storyId]
      );
      
      result.rows.forEach(row => {
        reactions[row.reaction_type] = parseInt(row.count);
      });
    } catch (dbError) {
      // Fallback to in-memory store
      const stored = reactionsStore.get(storyId.toString());
      if (stored) {
        reactions = { ...stored };
      }
    }
    
    res.json({
      success: true,
      reactions
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    const stored = reactionsStore.get(req.params.storyId.toString());
    res.json({
      success: true,
      reactions: stored || { heart: 0, support: 0, strength: 0 }
    });
  }
});

// Add a reaction to a story
router.post('/story/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;
    const { reactionType } = req.body;
    
    if (!['heart', 'support', 'strength'].includes(reactionType)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid reaction type' 
      });
    }
    
    // Generate anonymous user ID (in real app, use session/cookie)
    const anonymousUserId = req.headers['x-anonymous-id'] || 
                           `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    let reactions = { heart: 0, support: 0, strength: 0 };
    
    try {
      // Try to insert into database
      await pool.query(
        `INSERT INTO story_reactions (story_id, reaction_type, user_id) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (story_id, user_id, reaction_type) DO NOTHING`,
        [storyId, reactionType, anonymousUserId]
      );
      
      // Get updated counts
      const result = await pool.query(
        `SELECT reaction_type, COUNT(*) as count 
         FROM story_reactions 
         WHERE story_id = $1 
         GROUP BY reaction_type`,
        [storyId]
      );
      
      result.rows.forEach(row => {
        reactions[row.reaction_type] = parseInt(row.count);
      });
    } catch (dbError) {
      // Fallback to in-memory store
      const key = storyId.toString();
      if (!reactionsStore.has(key)) {
        reactionsStore.set(key, { heart: 0, support: 0, strength: 0 });
      }
      
      const current = reactionsStore.get(key);
      current[reactionType] = (current[reactionType] || 0) + 1;
      reactionsStore.set(key, current);
      reactions = { ...current };
    }
    
    res.json({
      success: true,
      reactions,
      message: 'Reaction added'
    });
  } catch (error) {
    console.error('Error adding reaction:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to add reaction' 
    });
  }
});

module.exports = router;

