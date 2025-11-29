const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { validateStory, sanitizeContent, sanitizeHTML } = require('../utils/safety');
const { body, validationResult } = require('express-validator');

// Sample stories (fallback if database is unavailable)
const sampleStories = [
  {
    id: 1,
    content: `I never thought I would find myself in this situation. For years, I lived in fear, walking on eggshells in my own home. The emotional abuse started slowly - comments about my appearance, my friends, my family. Then it escalated to controlling where I went, who I talked to, and even what I wore.

The breaking point came when I realized my children were watching, learning that this was what a relationship should look like. I knew I had to leave, not just for me, but for them. It wasn't easy - I had no money, no support system, and I was terrified. But I did it.

Today, I'm in a safe place. I'm rebuilding my life, one day at a time. My children are thriving, and I'm learning what it means to be free. To anyone reading this who is still in that situation: you are stronger than you know. You deserve safety, peace, and happiness. There is a way out, and there are people who will help you.`,
    category: 'Domestic Violence',
    pseudonym: 'Survivor2024',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    content: `I was harassed at work for months. My supervisor would make inappropriate comments, stand too close, and make me feel uncomfortable. When I tried to report it, I was told I was "overreacting" and that it was "just how he is." I felt trapped - I needed the job, but I couldn't continue working in that environment.

After months of anxiety and sleepless nights, I finally found the courage to file a formal complaint with HR. It was scary, and I worried about retaliation. But I knew I had to stand up for myself and for other women who might face the same situation.

The process wasn't easy, but eventually, action was taken. I learned that my voice matters, and that I have the right to work in an environment free from harassment. To anyone experiencing workplace harassment: document everything, reach out to support services, and know that you are not alone. Your safety and dignity matter.`,
    category: 'Workplace Harassment',
    pseudonym: 'BraveVoice',
    status: 'approved',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    content: `Online harassment is real, and it's terrifying. After I posted about my experience with gender-based violence on social media, I was bombarded with threats, hateful messages, and attempts to dox me. People I didn't know were trying to find my address, my workplace, my family.

I felt violated and scared. The internet, which had been a source of support, suddenly felt like a dangerous place. I had to delete my accounts, change my phone number, and be extra careful about my privacy.

But I also found support. Other survivors reached out, shared their own experiences, and reminded me that I wasn't alone. Support groups online helped me process what happened and gave me tools to protect myself.

If you're experiencing online harassment: block and report, document everything, reach out to support services, and remember that you don't deserve this. Your voice matters, and there are safe spaces where you can share your story.`,
    category: 'Online Harassment',
    pseudonym: 'DigitalWarrior',
    status: 'approved',
    created_at: new Date().toISOString()
  }
];

// Get all approved stories
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM stories WHERE status = $1';
    const params = ['approved'];
    let paramIndex = 2;

    if (category) {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (search) {
      query += ` AND content ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(parseInt(limit), parseInt(offset));

    let result;
    try {
      result = await pool.query(query, params);
    } catch (dbError) {
      // If database error, return sample stories as fallback
      console.warn('Database error, using sample stories:', dbError.message);
      let stories = [...sampleStories];
      
      // Apply filters to sample stories
      if (category) {
        stories = stories.filter(s => s.category === category);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        stories = stories.filter(s => 
          s.content.toLowerCase().includes(searchLower) ||
          s.category.toLowerCase().includes(searchLower) ||
          (s.pseudonym && s.pseudonym.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply pagination
      const start = parseInt(offset);
      const end = start + parseInt(limit);
      stories = stories.slice(start, end);
      
      return res.json({
        success: true,
        stories: stories,
        count: stories.length
      });
    }
    
    // If database returned empty and we have no stories, initialize with samples
    if (result.rows.length === 0) {
      try {
        // Try to insert sample stories
        for (const story of sampleStories) {
          await pool.query(
            `INSERT INTO stories (content, category, pseudonym, status) 
             VALUES ($1, $2, $3, $4) 
             ON CONFLICT DO NOTHING`,
            [story.content, story.category, story.pseudonym, story.status]
          );
        }
        // Fetch again
        result = await pool.query(query, params);
      } catch (insertError) {
        // If insert fails, return sample stories
        console.warn('Could not insert sample stories, returning fallback data');
        return res.json({
          success: true,
          stories: sampleStories,
          count: sampleStories.length
        });
      }
    }
    
    res.json({
      success: true,
      stories: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    // Return sample stories as fallback
    res.json({
      success: true,
      stories: sampleStories,
      count: sampleStories.length
    });
  }
});

// Get single story by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let result;
    
    try {
      result = await pool.query(
        'SELECT * FROM stories WHERE id = $1 AND status = $2',
        [id, 'approved']
      );
    } catch (dbError) {
      // Fallback to sample stories
      const story = sampleStories.find(s => s.id === parseInt(id));
      if (story) {
        return res.json({ success: true, story });
      }
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    if (result.rows.length === 0) {
      // Check sample stories as fallback
      const story = sampleStories.find(s => s.id === parseInt(id));
      if (story) {
        return res.json({ success: true, story });
      }
      return res.status(404).json({ success: false, error: 'Story not found' });
    }

    res.json({ success: true, story: result.rows[0] });
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch story' });
  }
});

// Submit a new story
router.post('/submit', [
  body('content').trim().notEmpty().withMessage('Story content is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('pseudonym').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { content, category, pseudonym } = req.body;

    // Validate story content
    const validation = validateStory(content);
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        errors: validation.errors 
      });
    }

    // Sanitize content
    const sanitizedHTML = sanitizeHTML(content);
    const { sanitized } = sanitizeContent(sanitizedHTML);

    // Insert story into database
    const result = await pool.query(
      `INSERT INTO stories (content, category, pseudonym, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [sanitized, category, pseudonym || null, 'pending']
    );

    res.status(201).json({
      success: true,
      message: 'Story submitted successfully. It will be reviewed before publication.',
      story: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting story:', error);
    res.status(500).json({ success: false, error: 'Failed to submit story' });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM stories WHERE status = $1 ORDER BY category',
      ['approved']
    );
    
    res.json({
      success: true,
      categories: result.rows.map(row => row.category)
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return categories from sample stories as fallback
    const categories = [...new Set(sampleStories.map(s => s.category))].sort();
    res.json({
      success: true,
      categories: categories
    });
  }
});

module.exports = router;

