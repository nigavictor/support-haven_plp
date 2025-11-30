import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Support Haven
        </h1>
        <p className="text-2xl font-semibold text-primary-700 mb-4">
          A Safe Space for Survivors of Gender-Based Violence
        </p>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A safe, anonymous platform where survivors of gender-based violence can share their stories, 
          find community, and connect with support professionals. 
          You are not alone.
        </p>
        
        {/* Safety Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 max-w-3xl mx-auto">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> This platform is not a replacement for emergency services. 
                If you are in immediate danger, please call your local emergency number (999, 911, 112, etc.).
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/submit-story"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
          >
            Share Your Story
          </Link>
          <Link
            to="/stories"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-primary-600"
          >
            Read Stories
          </Link>
          <Link
            to="/chat"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Anonymous Stories</h3>
          <p className="text-gray-600">
            Share your experience anonymously. Your identity is protected, 
            and your story can help others feel less alone.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">Private Support Chat</h3>
          <p className="text-gray-600">
            Connect with trained counselors and support professionals 
            in a safe, anonymous environment.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-semibold mb-2">Safety First</h3>
          <p className="text-gray-600">
            We automatically filter personal information and moderate content 
            to keep everyone safe.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-4">
          <strong>Support Haven</strong> is dedicated to providing a safe, anonymous platform 
          specifically for survivors of <strong>gender-based violence (GBV)</strong>. We understand 
          that GBV affects millions of people worldwide, and we believe that sharing stories can be 
          healing, empowering, and transformative.
        </p>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          Whether you've experienced domestic violence, sexual assault, harassment, or any other 
          form of gender-based violence, this is your space. Your voice matters, and you are not 
          alone in your journey toward healing and recovery.
        </p>
        <div className="mt-6 text-center">
          <Link
            to="/about"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Learn more about us →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

