import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StoryReactionsCompact from '../components/StoryReactionsCompact';
import { getApiUrl } from '../config/api';

function StoryFeed() {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStories();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;

      const response = await axios.get(getApiUrl('stories'), { params });
      if (response.data && response.data.success) {
        setStories(response.data.stories || []);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Error fetching stories:', err);
      if (err.response) {
        setError(`Failed to load stories: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setError('Cannot connect to server. Please make sure the backend is running.');
      } else {
        setError('Failed to load stories. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(getApiUrl('stories/meta/categories'));
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stories from GBV Survivors</h1>
        <p className="text-primary-700 font-medium">
          Read stories from survivors of gender-based violence. You are not alone.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Stories
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stories List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading stories...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error}</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg">No stories found.</p>
          <Link
            to="/submit-story"
            className="text-primary-600 hover:text-primary-700 font-semibold mt-2 inline-block"
          >
            Be the first to share your story
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {stories.map(story => (
            <Link
              key={story.id}
              to={`/stories/${story.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded mb-2">
                    {story.category}
                  </span>
                  {story.pseudonym && (
                    <p className="text-sm text-gray-600">By {story.pseudonym}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">{formatDate(story.created_at)}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {truncateContent(story.content)}
              </p>
              <StoryReactionsCompact storyId={story.id} />
              <p className="text-primary-600 text-sm font-semibold mt-4">
                Read full story →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default StoryFeed;

