# 🎯 Deployment Guide - Clear Terminology

Let me clarify the terminology to avoid confusion:

## Key Terms Explained

### On Render:
- **Project** = Your entire application workspace
- **Web Service** = Your backend server (one part of a project)
- **Database** = PostgreSQL database (one part of a project)

### On Vercel:
- **Project** = Your frontend application (one project = one frontend app)
- **Deployment** = Each time you deploy/update your project

---

## 📋 Step-by-Step (Clear Version)

### Step 1: Deploy Backend to Render

1. Go to https://render.com
2. Click **"New +"** → **"Web Service"** 
   - This creates a **Web Service** (your backend server)
   - NOT a "Project" - Render projects are optional
3. Connect GitHub repo: `nigavictor/support-haven_plp`
4. Configure settings and environment variables
5. Deploy!

**Result:** You get a backend URL like `https://support-haven-backend.onrender.com`

---

### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. **First Time Only:** Click **"Add New"** → **"Project"**
   - This creates a **new Project** (your frontend app)
   - Each project = one frontend application
   
   **Already Have Project?**
   - Go to your existing project in dashboard
   - Click "Deploy" or it auto-deploys when you push to GitHub
   
3. Import/Select GitHub repo: `nigavictor/support-haven_plp`
4. Configure settings:
   - Root Directory: `frontend`
   - Framework: Vite
5. Add environment variable: `VITE_API_URL` = your backend URL
6. Deploy!

**Result:** You get a frontend URL like `https://support-haven-plp.vercel.app`

---

### Step 3: Update Backend Environment Variable

1. Go back to Render dashboard
2. Click on your **Web Service** (the backend you created in Step 1)
3. Go to "Environment" tab
4. Update `FRONTEND_URL` with your Vercel URL
5. Save → Auto-redeploys

---

## 🎯 Quick Reference

| Platform | What You Create | What It's Called |
|----------|----------------|------------------|
| **Render** | Backend server | **Web Service** |
| **Render** | Database | **PostgreSQL Database** |
| **Vercel** | Frontend app | **Project** |

---

## ✅ Summary

- **Render:** Create a **Web Service** (not "project")
- **Vercel:** Create a **Project** (first time) or use existing project
- **Update:** Go back to Render **Web Service** → Environment → Update `FRONTEND_URL`

Does this make more sense now? 😊

