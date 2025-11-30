# 🎯 Deployment Guide - Based on YOUR Render Setup

I understand the confusion! Let me give you instructions that match exactly what you see.

## Render Free Tier Limitation

⚠️ **Important:** Render free tier allows only **1 PROJECT**, but you can have **multiple SERVICES** in that project!

See `RENDER_FREE_TIER.md` for details.

## What You See

In Render dashboard (your 1 project):
- ✅ `support-haven-db` (database service)
- ✅ `support-haven_plp` (web service)
- Options: "Add Service", "Add Environment"

When you click the PROJECT, Settings only shows "Edit Name" and "Delete Project" - that's normal!

**You work with SERVICES, not projects!**

---

## ✅ Step 1: Configure Backend Service in Render

**Note:** Render free tier allows only 1 PROJECT, but you can have multiple SERVICES in it!

### Option A: Configure Existing `support-haven_plp` Service as Backend

1. **Click on `support-haven_plp`** (the service name itself)
   - This opens the SERVICE page (different from project settings)

2. **On the SERVICE page, you should see tabs like:**
   - Settings
   - Environment  
   - Events
   - Logs

3. **Go to "Settings" tab** (of the SERVICE):
   - Find "Root Directory" field
   - Enter: `backend`
   - Find "Build Command": `npm install`
   - Find "Start Command": `npm start`
   - **Save changes**

4. **Go to "Environment" tab** (of the SERVICE):
   - Click "Add Environment Variable" or similar button
   - Add these variables one by one:
     ```
     NODE_ENV = production
     PORT = 10000
     DB_HOST = dpg-d4lhff0gjchc73anqadg-a.oregon-postgres.render.com
     DB_PORT = 5432
     DB_NAME = support_haven_db
     DB_USER = support_haven_db_user
     DB_PASSWORD = XbEPf6zXLEFLTSmmLBgDrcGpocl4fCFP
     FRONTEND_URL = http://localhost:3000
     ```
   - **Save changes**

5. **Copy the service URL** (shown at top of service page)
   - Example: `https://support-haven-plp.onrender.com`

### Option B: Add a New SERVICE (Not Project!)

**If `support-haven_plp` is frontend, add backend as a new SERVICE:**

1. In your Render dashboard (within your existing project)
2. Click **"Add Service"** or **"New +"** button
   - ⚠️ This adds a SERVICE, not a project (you can have multiple services in 1 project)
3. Select **"Web Service"**
4. Connect GitHub repo: `nigavictor/support-haven_plp`
5. Configure:
   - **Name:** `support-haven-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add environment variables (same as above)
7. Click **"Create Web Service"**
8. Copy the service URL

---

## ✅ Step 2: Deploy Frontend to Vercel (Different Website!)

**This is NOT Render - it's a completely different platform called Vercel!**
**Vercel has no project limit on free tier, so you can create a project there.**

1. **Open a new browser tab/window**
2. **Go to https://vercel.com**
3. Sign up/login with GitHub
4. Click **"Add New"** → **"Project"**
   - ✅ You CAN create projects in Vercel (no limit on free tier)
5. Import repository: `nigavictor/support-haven_plp`
6. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
7. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://support-haven-plp.onrender.com` (your Render backend URL from Step 1)
8. Click **"Deploy"**
9. Wait for deployment (1-2 minutes)
10. **Copy your Vercel URL** (shown after deployment)
    - Example: `https://support-haven-plp.vercel.app`

---

## ✅ Step 3: Update Backend's FRONTEND_URL

1. **Go back to Render** (render.com)
2. **Click on `support-haven_plp` SERVICE** (not project)
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Change it from `http://localhost:3000` to your Vercel URL
   - Example: `https://support-haven-plp.vercel.app`
6. **Save** → Auto-redeploys

---

## 🎯 Summary

1. **Render:** Click on SERVICE → Configure → Add environment variables
2. **Vercel:** Different website → Deploy frontend → Get URL
3. **Render:** Update SERVICE environment variable with Vercel URL

---

## ❓ If You Can't Find SERVICE Settings

**Please tell me:**
- When you click `support-haven_plp`, what page opens?
- What tabs/sections do you see?
- Is there a "Settings" or "Environment" section?

Then I can give you exact steps! 😊

