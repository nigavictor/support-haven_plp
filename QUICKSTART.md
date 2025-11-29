# Quick Start Guide

Get Support Haven running in 5 minutes!

## Prerequisites

- Node.js (v16+) installed
- PostgreSQL installed and running
- npm or yarn

## Step 1: Database Setup

```bash
# Create the database
createdb support_haven

# Or using psql
psql -U postgres -c "CREATE DATABASE support_haven;"
```

## Step 2: Run Setup Script

```bash
./setup.sh
```

This will:
- Install all dependencies
- Create `.env` file from template

## Step 3: Configure Database

Edit `backend/.env` and update your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=support_haven
DB_USER=postgres
DB_PASSWORD=your_password
```

## Step 4: Start the Application

### Option A: Use the start script (recommended)
```bash
./start.sh
```

### Option B: Manual start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin
  - Username: `admin`
  - Password: `admin123`

## Troubleshooting

### Database connection error?
- Make sure PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database exists: `psql -l | grep support_haven`
- Check credentials in `backend/.env`

### Port already in use?
- Change `PORT` in `backend/.env` (backend)
- Change port in `frontend/vite.config.js` (frontend)

### Dependencies not installing?
- Try deleting `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

1. Submit a test story at http://localhost:3000/submit-story
2. Approve it in the admin panel at http://localhost:3000/admin
3. View it in the stories feed at http://localhost:3000/stories
4. Test the chat feature at http://localhost:3000/chat

Happy coding! 🚀

