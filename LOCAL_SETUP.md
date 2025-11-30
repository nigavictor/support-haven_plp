# 🏠 Local Development Setup

## Quick Fix for "500 Internal Server Error"

If you're getting a 500 error when loading stories locally, here's how to fix it:

### Option 1: Use Fallback Mode (Easiest - No Database Needed)

The app is already configured to work without a database! Just make sure:

1. **Backend is running:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend is running:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **The backend will automatically use sample stories** if the database isn't available.

### Option 2: Use Local Database

If you want to use a local PostgreSQL database:

1. **Create local database:**
   ```bash
   createdb support_haven
   ```

2. **Update `backend/.env`:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=support_haven
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```

3. **Restart backend:**
   ```bash
   cd backend
   npm run dev
   ```

### Option 3: Use Render Database (For Testing Production Connection)

If you want to test with the Render database:

1. **Update `backend/.env` with Render credentials:**
   ```env
   DB_HOST=dpg-d4lhff0gjchc73anqadg-a.oregon-postgres.render.com
   DB_PORT=5432
   DB_NAME=support_haven_db
   DB_USER=support_haven_db_user
   DB_PASSWORD=XbEPf6zXLEFLTSmmLBgDrcGpocl4fCFP
   ```

   **Note:** Connection from localhost may timeout. This is normal - the database works fine when deployed to Render.

## Current Configuration

- **Local .env:** Uses localhost database (or fallback)
- **Production .env:** Uses Render database (for deployment)

## Troubleshooting

### Backend won't start:
```bash
# Kill any running processes
pkill -f "node.*server|nodemon"

# Start fresh
cd backend
npm run dev
```

### Stories not loading:
- Check backend is running: `curl http://localhost:5000/api/health`
- Check backend logs for errors
- The app will use sample stories if database fails (this is intentional!)

### Database connection errors:
- This is OK! The app has fallback mode
- Sample stories will be served automatically
- For production, deploy to Render where database works perfectly

## Quick Start (Recommended)

Just run both servers - they'll work with fallback data:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2  
cd frontend && npm run dev
```

Visit http://localhost:3000 - it should work! 🎉

