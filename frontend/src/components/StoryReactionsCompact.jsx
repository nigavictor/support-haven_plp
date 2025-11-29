import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

function StoryReactionsCompact({ storyId }) {
  const [reactions, setReactions] = useState({ heart: 0, support: 0, strength: 0 });

  useEffect(() => {
    fetchReactions();
  }, [storyId]);

  const fetchReactions = async () => {
    try {
      const response = await axios.get(getApiUrl(`reactions/story/${storyId}`));
      if (response.data.success) {
        setReactions(response.data.reactions);
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  const totalReactions = reactions.heart + reactions.support + reactions.strength;

  if (totalReactions === 0) return null;

  return (
    <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
      <span className="font-medium">Support shown:</span>
      {reactions.heart > 0 && (
        <span className="flex items-center gap-1">
          <span>❤️</span>
          <span>{reactions.heart}</span>
        </span>
      )}
      {reactions.support > 0 && (
        <span className="flex items-center gap-1">
          <span>🤗</span>
          <span>{reactions.support}</span>
        </span>
      )}
      {reactions.strength > 0 && (
        <span className="flex items-center gap-1">
          <span>💪</span>
          <span>{reactions.strength}</span>
        </span>
      )}
    </div>
  );
}

export default StoryReactionsCompact;

