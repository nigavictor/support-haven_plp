import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StoryReactions from '../components/StoryReactions';
import { getApiUrl } from '../config/api';

function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getApiUrl(`stories/${id}`));
      if (response.data.success) {
        setStory(response.data.story);
      } else {
        setError('Story not found');
      }
    } catch (err) {
      setError('Failed to load story. Please try again.');
      console.error('Error fetching story:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600">Loading story...</p>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error || 'Story not found'}</p>
          <Link
            to="/stories"
            className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-block"
          >
            ← Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/stories"
        className="text-primary-600 hover:text-primary-700 font-semibold mb-6 inline-block"
      >
        ← Back to Stories
      </Link>

      <article className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded mb-3">
              {story.category}
            </span>
            {story.pseudonym && (
              <p className="text-gray-600">By {story.pseudonym}</p>
            )}
          </div>
          <span className="text-sm text-gray-500">{formatDate(story.created_at)}</span>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {story.content}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          {/* Support Reactions */}
          <StoryReactions storyId={story.id} />
          
          <p className="text-sm text-gray-600 mb-4 mt-6">
            If this story resonates with you, remember you are not alone.
          </p>
          <div className="flex gap-4">
            <Link
              to="/chat"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Talk to an Expert
            </Link>
            <Link
              to="/submit-story"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default StoryDetail;

