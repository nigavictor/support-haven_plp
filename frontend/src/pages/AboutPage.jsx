import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Support Haven</h1>

      {/* What is Gender-Based Violence */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Gender-Based Violence?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>Gender-Based Violence (GBV)</strong> refers to harmful acts directed at an individual 
          based on their gender. It is rooted in gender inequality, the abuse of power, and harmful norms. 
          GBV can take many forms, including but not limited to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Domestic Violence:</strong> Physical, emotional, or psychological abuse by an intimate partner</li>
          <li><strong>Sexual Assault:</strong> Any non-consensual sexual act or behavior</li>
          <li><strong>Sexual Harassment:</strong> Unwelcome sexual advances, requests, or conduct</li>
          <li><strong>Emotional/Psychological Abuse:</strong> Patterns of behavior that harm mental health</li>
          <li><strong>Economic Abuse:</strong> Controlling access to financial resources</li>
          <li><strong>Online Harassment:</strong> Digital abuse and cyberstalking</li>
          <li><strong>Workplace Harassment:</strong> Gender-based discrimination and abuse at work</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          GBV affects people of all genders, though women and girls are disproportionately affected. 
          It can happen to anyone, regardless of age, race, religion, or socioeconomic status.
        </p>
      </section>

      {/* Our Purpose */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Purpose</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Support Haven was created to address a critical need: providing a safe, anonymous space 
          specifically for survivors of gender-based violence. Many survivors face barriers to seeking 
          help, including fear, shame, lack of resources, or concerns about privacy.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Our platform aims to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Provide a <strong>completely anonymous</strong> space for survivors to share their experiences</li>
          <li>Create a <strong>supportive community</strong> where survivors can connect with others who understand</li>
          <li>Offer <strong>access to professional support</strong> through our private chat system</li>
          <li>Raise awareness about gender-based violence and its impact</li>
          <li>Empower survivors by validating their experiences and stories</li>
        </ul>
      </section>

      {/* How We Help */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Help</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-primary-700 mb-2">📝 Anonymous Story Sharing</h3>
            <p className="text-gray-700">
              Share your story anonymously. Your identity is completely protected, and personal 
              information is automatically filtered for your safety. Your story can help others 
              realize they are not alone.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-700 mb-2">💬 Private Support Chat</h3>
            <p className="text-gray-700">
              Connect with trained counselors and support professionals who specialize in helping 
              survivors of gender-based violence. All conversations are private and anonymous.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-700 mb-2">👥 Community Support</h3>
            <p className="text-gray-700">
              Read stories from other survivors. Find strength in knowing that others have faced 
              similar experiences and are on their own healing journeys.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-700 mb-2">🛡️ Safety First</h3>
            <p className="text-gray-700">
              We use advanced content filtering to automatically remove personal information, 
              and all stories are moderated before publication to ensure a safe environment for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
        <h2 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Important Information</h2>
        <div className="space-y-3 text-yellow-800">
          <p>
            <strong>This platform is not a replacement for emergency services.</strong> If you are 
            in immediate danger, please contact your local emergency services immediately:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Emergency Services: 999, 911, 112, or your local emergency number</li>
            <li>National Domestic Violence Hotline: Available 24/7 in many countries</li>
            <li>Local crisis centers and shelters</li>
          </ul>
          <p className="mt-3">
            Support Haven is designed for support, community, and healing, but it cannot provide 
            emergency intervention or legal assistance.
          </p>
        </div>
      </section>

      {/* Privacy & Safety */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Safety</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Your privacy and safety are our top priorities:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>No account registration required - complete anonymity</li>
          <li>Personal information (phone numbers, addresses, emails) is automatically filtered</li>
          <li>All stories are reviewed by moderators before publication</li>
          <li>Chat conversations are private and not shared</li>
          <li>No tracking or data collection beyond what's necessary for the service</li>
        </ul>
      </section>

      {/* Get Started */}
      <section className="bg-primary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-700 mb-6">
          If you're a survivor of gender-based violence, we're here for you. 
          Take the first step toward healing and connection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/submit-story"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Share Your Story
          </Link>
          <Link
            to="/chat"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Talk to an Expert
          </Link>
          <Link
            to="/stories"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-primary-600"
          >
            Read Stories
          </Link>
        </div>
      </section>

      {/* Contact/Support */}
      <section className="mt-8 text-center text-gray-600">
        <p>
          If you have questions or need additional support, please reach out through our chat system 
          or contact your local GBV support organizations.
        </p>
        <p className="mt-2 text-sm">
          Remember: You are not alone. Your story matters. You deserve support and healing.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;

