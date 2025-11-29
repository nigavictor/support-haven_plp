import { useState } from 'react';
import { Link } from 'react-router-dom';

function SupportWall() {
  const [message, setMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState([
    {
      id: 1,
      text: "You are brave. You are strong. You are not alone. Your story matters, and healing is possible. 💜",
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 2,
      text: "To all survivors reading this: Your courage in sharing your story helps others. Thank you for your strength. 🌟",
      timestamp: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 3,
      text: "Healing is not linear, and that's okay. Every step forward, no matter how small, is progress. You've got this. 💪",
      timestamp: new Date(Date.now() - 259200000).toISOString()
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      timestamp: new Date().toISOString()
    };

    setSubmittedMessages([newMessage, ...submittedMessages]);
    setMessage('');
    
    // Show success message
    alert('Thank you for your supportive message! It has been added to the wall.');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Support Wall</h1>
      <p className="text-lg text-gray-600 mb-8">
        A safe space to share messages of support, hope, and solidarity with survivors of gender-based violence. 
        Your words can make a difference.
      </p>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> All messages are moderated before being displayed to ensure a safe, 
          supportive environment. Messages that are harmful, triggering, or inappropriate will not be published.
        </p>
      </div>

      {/* Submit Message Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Share a Message of Support</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message of support, hope, or encouragement for survivors..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-4"
            required
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {message.length}/500 characters
            </p>
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Share Message
            </button>
          </div>
        </form>
      </div>

      {/* Support Messages */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages of Support</h2>
        
        {submittedMessages.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600">No messages yet. Be the first to share support!</p>
          </div>
        ) : (
          submittedMessages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💜</div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed mb-2">{msg.text}</p>
                  <p className="text-sm text-gray-500">{formatDate(msg.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Do More?</h2>
        <p className="text-gray-700 mb-6">
          There are many ways to support survivors of gender-based violence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/stories"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Read Survivor Stories
          </Link>
          <Link
            to="/chat"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Talk to an Expert
          </Link>
          <Link
            to="/submit-story"
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-primary-600"
          >
            Share Your Story
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SupportWall;

