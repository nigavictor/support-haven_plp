# ⚡ Quick Deploy Guide (5 Minutes)

## Fastest Way: Render + Vercel

### 1. Deploy Backend (Render) - 3 minutes

1. Go to https://render.com → Sign up with GitHub
2. Click "New +" → "PostgreSQL"
   - Name: `support-haven-db`
   - Plan: Free
   - Create
3. Click "New +" → "Web Service"
   - Connect GitHub repo
   - Settings:
     - **Root Directory:** `backend`
     - **Build:** `npm install`
     - **Start:** `npm start`
   - Environment Variables:
     ```
     NODE_ENV=production
     DB_HOST=<from database>
     DB_PORT=5432
     DB_NAME=<from database>
     DB_USER=<from database>
     DB_PASSWORD=<from database>
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - Create Service
4. **Copy your backend URL** (e.g., `https://support-haven-backend.onrender.com`)

### 2. Deploy Frontend (Vercel) - 2 minutes

1. Go to https://vercel.com → Sign up with GitHub
2. Click "Add New" → "Project"
   - Import your GitHub repo
   - Settings:
     - **Root Directory:** `frontend`
     - **Framework:** Vite
   - Environment Variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```
   - Deploy
3. **Copy your frontend URL**

### 3. Update Backend CORS

1. Go back to Render
2. Update `FRONTEND_URL` to your Vercel URL
3. Restart service

### 4. Share!

Send your Vercel URL to teammates! 🎉

---

## Alternative: Railway (All-in-One)

1. Go to https://railway.app → Sign up
2. "New Project" → "Deploy from GitHub"
3. Add PostgreSQL database
4. Deploy backend (set root to `backend`)
5. Deploy frontend (set root to `frontend`)
6. Done!

---

## Notes:

- **Render free tier sleeps** after 15 min (first request slow)
- **Railway gives $5 credit** (better for demos)
- Both are free and work great!

