# Support Haven

A safe, anonymous platform for survivors to share their stories and connect with support professionals.

## 🎯 Project Overview

Support Haven is a hackathon project designed to provide a secure, anonymous space where victims of gender-based violence and other forms of abuse can:
- Share their stories anonymously
- Browse and read stories from other survivors
- Connect with counselors and support professionals via private chat
- Find community and support in a safe environment

## 🏗️ Project Structure

```
support-haven_plp/
├── backend/          # Node.js/Express API
│   ├── config/       # Database configuration
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions (safety, validation)
│   └── server.js     # Main server file
├── frontend/         # React application
│   └── src/
│       ├── components/  # Reusable components
│       └── pages/      # Page components
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Database Setup

First, make sure PostgreSQL is installed and running:

```bash
# Create database
createdb support_haven

# Or using psql
psql -U postgres -c "CREATE DATABASE support_haven;"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=support_haven
# DB_USER=postgres
# DB_PASSWORD=your_password

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📋 Features

### Core Features

- ✅ **Anonymous Story Submission**: Users can submit stories without creating an account
- ✅ **Story Library**: Browse and filter stories by category
- ✅ **Private Support Chat**: Real-time chat with support professionals (demo mode)
- ✅ **Admin Moderation**: Admin panel for reviewing and approving stories
- ✅ **Safety Features**: Automatic filtering of personal information

### Safety Features

- Automatic detection and removal of personal information (phone numbers, emails, addresses)
- Content sanitization to prevent XSS attacks
- Story moderation before publication
- Anonymous user IDs (no personal data stored)
- Rate limiting on API endpoints

## 🔐 Admin Access

- URL: `http://localhost:3000/admin`
- Username: `admin`
- Password: `admin123`


## 🛠️ Technology Stack

### Backend
- **Node.js** + **Express.js**: RESTful API
- **PostgreSQL**: Relational database
- **Socket.io**: Real-time chat functionality
- **Helmet**: Security middleware
- **Express Rate Limit**: API rate limiting

### Frontend
- **React**: UI framework
- **React Router**: Client-side routing
- **TailwindCSS**: Styling
- **Vite**: Build tool
- **Axios**: HTTP client
- **Socket.io Client**: Real-time communication

## 📝 API Endpoints

### Stories
- `GET /api/stories` - Get all approved stories
- `GET /api/stories/:id` - Get single story
- `POST /api/stories/submit` - Submit new story
- `GET /api/stories/meta/categories` - Get categories

### Chat
- `POST /api/chat/create` - Create or get chat
- `GET /api/chat/:chatId/messages` - Get chat messages
- `POST /api/chat/:chatId/message` - Send message
- `POST /api/chat/:chatId/assign-expert` - Assign expert to chat

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stories/pending` - Get pending stories
- `POST /api/admin/stories/:id/moderate` - Approve/reject story
- `GET /api/admin/stats` - Get platform statistics

## 🎨 Pages

1. **Landing Page** (`/`) - Welcome page with mission statement
2. **Story Submission** (`/submit-story`) - Form to submit anonymous stories
3. **Story Feed** (`/stories`) - Browse all approved stories with filters
4. **Story Detail** (`/stories/:id`) - View full story
5. **Chat Page** (`/chat`) - Private support chat
6. **Admin Page** (`/admin`) - Moderation dashboard

## 🔒 Security Considerations

This is a hackathon project. For production use, consider:

- [ ] Implement proper JWT authentication
- [ ] Add HTTPS/SSL certificates
- [ ] Enhance content moderation (ML-based)
- [ ] Add CAPTCHA for story submission
- [ ] Implement proper session management
- [ ] Add logging and monitoring
- [ ] Set up proper backup systems
- [ ] Add GDPR compliance features
- [ ] Implement proper encryption for sensitive data

## 📦 Production Deployment

### Backend (Render)

1. Create a PostgreSQL database on Render
2. Create a Web Service on Render pointing to this repository
3. Configure environment variables in Render dashboard:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `DB_HOST` - Get from Render database dashboard
   - `DB_PORT=5432`
   - `DB_NAME` - Get from Render database dashboard
   - `DB_USER` - Get from Render database dashboard
   - `DB_PASSWORD` - Get from Render database dashboard (Internal Database URL)
   - `FRONTEND_URL` - Your Vercel frontend URL
   - `ADMIN_USERNAME=admin`
   - `ADMIN_PASSWORD` - Set a strong password

4. Set Root Directory to `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`

### Frontend (Vercel)

1. Import this repository to Vercel
2. Configure:
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variable:
   - `VITE_API_URL` - Your Render backend URL
4. Deploy

### Database Credentials

⚠️ **Important:** Never commit database credentials to Git. 

Get all database credentials from your Render dashboard:
1. Go to your Render database service (e.g., `support-haven-db`)
2. Find the "Internal Database URL" or "Connection" section
3. Extract credentials from the connection string:
   - Host: Found in the database URL
   - Port: `5432` (default PostgreSQL port)
   - Database: Database name from Render
   - User: Database username (e.g., `support_haven_db_user2`)
   - Password: From the database connection string
4. Use these credentials in Render environment variables only

**Example format** (DO NOT use actual values in code):
```
postgresql://username:password@host:port/database_name
```

For local development, use a local PostgreSQL database or the fallback mode (sample data).

## 🤝 Contributing

This is a hackathon project. Feel free to fork and improve!

## ⚠️ Important Disclaimer

**This platform is not a replacement for emergency services.** If you are in immediate danger, please contact your local emergency services (999, 911, 112, etc.).

## 📄 License

MIT License

---

Built with ❤️ for survivors everywhere. You are not alone.

