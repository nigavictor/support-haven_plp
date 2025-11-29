import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StorySubmission from './pages/StorySubmission';
import StoryFeed from './pages/StoryFeed';
import StoryDetail from './pages/StoryDetail';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import SupportWall from './pages/SupportWall';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support-wall" element={<SupportWall />} />
          <Route path="/submit-story" element={<StorySubmission />} />
          <Route path="/stories" element={<StoryFeed />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

