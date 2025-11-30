# 🎯 Deployment Guide - Based on YOUR Render Setup

I understand the confusion! Let me give you instructions that match exactly what you see.

## What You See

In Render dashboard:
- ✅ `support-haven-db` (database)
- ✅ `support-haven_plp` (service)
- Options: "Add Service", "Add Environment"

When you click the PROJECT, Settings only shows "Edit Name" and "Delete Project" - that's normal!

---

## ✅ Step 1: Configure Backend Service in Render

### IMPORTANT: Click on the SERVICE, not the Project!

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

---

## ✅ Step 2: Deploy Frontend to Vercel (Different Website!)

**This is NOT Render - it's a completely different platform called Vercel!**

1. **Open a new browser tab/window**
2. **Go to https://vercel.com**
3. Sign up/login with GitHub
4. Click **"Add New"** → **"Project"**
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

