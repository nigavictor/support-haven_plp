// Safety utilities for content filtering and moderation

// Basic profanity filter (expandable)
const profanityWords = [
  // Add more as needed - keeping minimal for demo
  'hate', 'kill', 'violence'
];

// Personal information patterns
const personalInfoPatterns = {
  phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{10}\b/g,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  address: /\d+\s+[A-Za-z0-9\s,]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Place|Pl)\b/gi,
  zipCode: /\b\d{5}(?:-\d{4})?\b/g
};

/**
 * Sanitize content by removing or masking personal information
 */
function sanitizeContent(content) {
  let sanitized = content;
  const detectedInfo = [];

  // Detect and mask personal information
  for (const [type, pattern] of Object.entries(personalInfoPatterns)) {
    const matches = sanitized.match(pattern);
    if (matches) {
      detectedInfo.push({ type, count: matches.length });
      sanitized = sanitized.replace(pattern, `[${type.toUpperCase()} REMOVED]`);
    }
  }

  return {
    sanitized,
    detectedInfo
  };
}

/**
 * Check for profanity (basic implementation)
 */
function containsProfanity(content) {
  const lowerContent = content.toLowerCase();
  return profanityWords.some(word => lowerContent.includes(word));
}

/**
 * Validate story content
 */
function validateStory(content) {
  const errors = [];
  
  if (!content || content.trim().length < 10) {
    errors.push('Story must be at least 10 characters long');
  }
  
  if (content.length > 10000) {
    errors.push('Story must be less than 10,000 characters');
  }

  // Check for excessive personal information
  const { detectedInfo } = sanitizeContent(content);
  if (detectedInfo.length > 0) {
    const totalDetected = detectedInfo.reduce((sum, info) => sum + info.count, 0);
    if (totalDetected > 5) {
      errors.push('Please remove personal information from your story for your safety');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize HTML to prevent XSS attacks
 */
function sanitizeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, m => map[m]);
}

module.exports = {
  sanitizeContent,
  containsProfanity,
  validateStory,
  sanitizeHTML
};

