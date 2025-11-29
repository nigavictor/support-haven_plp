# 🚀 Free Hosting Guide for Support Haven

Here are the best free options to host your app so your teammates can see it!

## 🎯 Recommended: Vercel (Frontend) + Render (Backend + Database)

This is the easiest and most reliable free option.

### Option 1: Vercel + Render (Recommended)

#### Step 1: Deploy Backend to Render

1. **Create a Render account:**
   - Go to https://render.com
   - Sign up with GitHub (free)

2. **Create PostgreSQL Database:**
   - In Render dashboard, click "New +" → "PostgreSQL"
   - Name: `support-haven-db`
   - Region: Choose closest to you
   - Plan: Free
   - Click "Create Database"
   - **Save the connection string!** (You'll need it)

3. **Deploy Backend:**
   - In Render dashboard, click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repo
   - Settings:
     - **Name:** `support-haven-backend`
     - **Environment:** Node
     - **Build Command:** `cd backend && npm install`
     - **Start Command:** `cd backend && npm start`
     - **Root Directory:** Leave empty (or set to `backend` if needed)
   - Add Environment Variables:
     ```
     NODE_ENV=production
     PORT=10000
     DB_HOST=<from your database connection string>
     DB_PORT=5432
     DB_NAME=<from your database connection string>
     DB_USER=<from your database connection string>
     DB_PASSWORD=<from your database connection string>
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```
   - Click "Create Web Service"

#### Step 2: Deploy Frontend to Vercel

1. **Create a Vercel account:**
   - Go to https://vercel.com
   - Sign up with GitHub (free)

2. **Update frontend config:**
   - Edit `frontend/vite.config.js` to remove proxy (not needed in production)
   - Create `frontend/.env.production`:
     ```
     VITE_API_URL=https://your-backend-name.onrender.com
     ```

3. **Deploy:**
   - In Vercel dashboard, click "Add New" → "Project"
   - Import your GitHub repository
   - Settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variable:
     ```
     VITE_API_URL=https://your-backend-name.onrender.com
     ```
   - Click "Deploy"

4. **Update backend CORS:**
   - In Render, update `FRONTEND_URL` to your Vercel URL
   - Restart the backend service

---

### Option 2: Railway (All-in-One)

Railway can host everything together.

1. **Sign up:** https://railway.app (free with GitHub)

2. **Create Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL:**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Railway will create it automatically

4. **Deploy Backend:**
   - Click "+ New" → "GitHub Repo"
   - Select your repo
   - Root Directory: `backend`
   - Railway will auto-detect Node.js
   - Add environment variables (Railway will auto-add database vars)
   - Add: `FRONTEND_URL=https://your-app.up.railway.app`

5. **Deploy Frontend:**
   - Click "+ New" → "GitHub Repo" (again)
   - Root Directory: `frontend`
   - Add environment variable: `VITE_API_URL=<your-backend-url>`
   - Railway will build and deploy

---

### Option 3: Netlify (Frontend) + Fly.io (Backend)

#### Netlify for Frontend:
1. Go to https://netlify.com
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Connect repo, set:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Fly.io for Backend:
1. Go to https://fly.io
2. Install flyctl: `curl -L https://fly.io/install.sh | sh`
3. Run: `fly auth signup`
4. In backend folder: `fly launch`
5. Follow prompts, Fly.io will guide you

---

## 📝 Quick Setup Checklist

### Before Deploying:

1. **Update backend for production:**
   ```bash
   # In backend/package.json, make sure you have:
   "scripts": {
     "start": "node server.js"
   }
   ```

2. **Create production environment file:**
   - Backend will use environment variables from hosting platform
   - Frontend needs `VITE_API_URL` set

3. **Update CORS in backend:**
   - Make sure `FRONTEND_URL` in backend matches your frontend URL

4. **Test locally first:**
   ```bash
   # Test production build
   cd frontend && npm run build
   cd ../backend && npm start
   ```

### After Deploying:

1. **Update frontend API URL:**
   - Make sure frontend knows where backend is

2. **Test the deployed app:**
   - Visit your frontend URL
   - Check browser console for errors
   - Test all features

3. **Share with teammates:**
   - Send them the frontend URL
   - They can access it from anywhere!

---

## 🔧 Troubleshooting

### Backend not connecting to database:
- Check environment variables are set correctly
- Verify database connection string
- Check Render/Railway logs

### Frontend can't reach backend:
- Check CORS settings in backend
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors

### Stories not loading:
- Backend might be sleeping (Render free tier sleeps after inactivity)
- First request will be slow (wake up time)
- Consider upgrading or using Railway (no sleep)

---

## 💡 Pro Tips

1. **Render free tier sleeps after 15 min inactivity** - First request will be slow
2. **Railway gives $5 free credit** - Better for demos
3. **Vercel is fastest** for frontend - Great CDN
4. **Use environment variables** - Never commit secrets!

---

## 🎉 Quick Start (Recommended Path)

1. **Deploy backend to Render** (15 min)
2. **Deploy frontend to Vercel** (5 min)
3. **Share Vercel URL** with teammates
4. **Done!** 🎊

Your app will be live and accessible to everyone!

