import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pendingStories, setPendingStories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated (for demo)
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(getApiUrl('admin/login'), { username, password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        setIsAuthenticated(true);
        fetchData();
      }
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [storiesRes, statsRes] = await Promise.all([
        axios.get(getApiUrl('admin/stories/pending')),
        axios.get(getApiUrl('admin/stats'))
      ]);
      
      if (storiesRes.data.success) {
        setPendingStories(storiesRes.data.stories);
      }
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const moderateStory = async (storyId, action) => {
    try {
      const response = await axios.post(getApiUrl(`admin/stories/${storyId}/moderate`), { action });
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error moderating story:', error);
      alert('Failed to moderate story');
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

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Demo: admin / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            setIsAuthenticated(false);
          }}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300"
        >
          Logout
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Stories</h3>
            <p className="text-3xl font-bold text-primary-600">{stats.totalStories}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approvedStories}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingStories}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600">Active Chats</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalChats}</p>
          </div>
        </div>
      )}

      {/* Pending Stories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Stories for Moderation</h2>
        
        {pendingStories.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No pending stories to review.</p>
        ) : (
          <div className="space-y-6">
            {pendingStories.map(story => (
              <div key={story.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mb-2">
                      {story.category}
                    </span>
                    {story.pseudonym && (
                      <p className="text-sm text-gray-600">By {story.pseudonym}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(story.created_at)}</span>
                </div>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{story.content}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => moderateStory(story.id, 'approve')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => moderateStory(story.id, 'reject')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;

