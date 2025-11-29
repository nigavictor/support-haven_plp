import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

function StoryReactions({ storyId }) {
  const [reactions, setReactions] = useState({ heart: 0, support: 0, strength: 0 });
  const [loading, setLoading] = useState(false);
  const [userReactions, setUserReactions] = useState(new Set());

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

  const handleReaction = async (reactionType) => {
    if (loading || userReactions.has(reactionType)) return;
    
    setLoading(true);
    try {
      // Get or create anonymous user ID
      let anonymousId = localStorage.getItem('anonymousUserId');
      if (!anonymousId) {
        anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('anonymousUserId', anonymousId);
      }

      const response = await axios.post(getApiUrl(`reactions/story/${storyId}`), 
        { reactionType },
        { headers: { 'x-anonymous-id': anonymousId } }
      );
      
      if (response.data.success) {
        setReactions(response.data.reactions);
        setUserReactions(prev => new Set([...prev, reactionType]));
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (type) => userReactions.has(type);

  return (
    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-600 mr-2">Show your support:</p>
      
      <button
        onClick={() => handleReaction('heart')}
        disabled={loading || isActive('heart')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isActive('heart')
            ? 'bg-red-100 text-red-700 border-2 border-red-300'
            : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border-2 border-transparent'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">❤️</span>
        <span>Heart</span>
        {reactions.heart > 0 && (
          <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold">
            {reactions.heart}
          </span>
        )}
      </button>

      <button
        onClick={() => handleReaction('support')}
        disabled={loading || isActive('support')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isActive('support')
            ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-2 border-transparent'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">🤗</span>
        <span>Support</span>
        {reactions.support > 0 && (
          <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold">
            {reactions.support}
          </span>
        )}
      </button>

      <button
        onClick={() => handleReaction('strength')}
        disabled={loading || isActive('strength')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isActive('strength')
            ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
            : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-2 border-transparent'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">💪</span>
        <span>Strength</span>
        {reactions.strength > 0 && (
          <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold">
            {reactions.strength}
          </span>
        )}
      </button>
    </div>
  );
}

export default StoryReactions;

