import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../config/api';

const CATEGORIES = [
  'Domestic Violence',
  'School Bullying',
  'Online Harassment',
  'Workplace Harassment',
  'Sexual Assault',
  'Emotional Abuse',
  'Other'
];

function StorySubmission() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '',
    category: '',
    pseudonym: ''
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      const response = await axios.post(getApiUrl('stories/submit'), formData);
      
      if (response.data.success) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/stories');
        }, 3000);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([error.response?.data?.error || 'Failed to submit story. Please try again.']);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Story Submitted Successfully!</h2>
          <p className="text-green-700 mb-4">
            Your story has been submitted successfully! It is now visible in the stories feed. 
            Thank you for sharing your experience.
          </p>
          <p className="text-sm text-green-600">Redirecting to stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Share Your Story</h1>
      <p className="text-lg text-primary-700 mb-6 font-semibold">
        A Safe Space for Survivors of Gender-Based Violence
      </p>
      
      {/* Safety Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>Your privacy is protected:</strong> All stories are anonymous. 
          Personal information (phone numbers, addresses, emails) will be automatically removed 
          for your safety. Your story will be reviewed before publication.
        </p>
      </div>
      
      {/* GBV Focus Notice */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <p className="text-sm text-purple-700">
          <strong>This platform is specifically for survivors of gender-based violence (GBV).</strong> 
          Whether you've experienced domestic violence, sexual assault, harassment, or any other 
          form of GBV, your story is welcome here. You are not alone.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
            <ul className="list-disc list-inside text-red-700">
              {errors.map((error, idx) => (
                <li key={idx}>{error.msg || error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Your Story *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={12}
            minLength={10}
            maxLength={10000}
            placeholder="Share your story here. Remember, personal information will be automatically removed for your safety."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="mt-2 text-sm text-gray-500">
            {formData.content.length}/10,000 characters (minimum 10 characters)
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="pseudonym" className="block text-sm font-medium text-gray-700 mb-2">
            Optional Pseudonym
          </label>
          <input
            type="text"
            id="pseudonym"
            name="pseudonym"
            value={formData.pseudonym}
            onChange={handleChange}
            maxLength={100}
            placeholder="A name you'd like to use (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Story'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StorySubmission;

