# ✅ Clear Deployment Instructions - No Confusion!

You're right - let me make this crystal clear based on what you're actually seeing.

## What You See in Render

You have:
- **Project/Group** (the container)
  - `support-haven-db` (database service)
  - `support-haven_plp` (web service)
  - Options: "Add Service", "Add Environment"

When you click on the **PROJECT**, Settings only shows "Edit Name" and "Delete Project" - that's correct!

---

## 🎯 The Correct Steps

### Step 1: Configure `support-haven_plp` SERVICE (Not Project!)

**You need to click on the SERVICE, not the project:**

1. **Click on `support-haven_plp`** (the service name itself, not the project/group)
   - This opens the SERVICE page (not project settings)
   
2. **Look at the SERVICE page** - you should see tabs like:
   - **"Settings"** (service settings, not project settings!)
   - **"Environment"**
   - **"Events"** or **"Logs"**
   - **"Manual Deploy"**

3. **In SERVICE Settings tab:**
   - Find **"Root Directory"** field
   - Set it to: `backend`
   - Find **"Build Command"**: `npm install`
   - Find **"Start Command"**: `npm start`

4. **In SERVICE Environment tab:**
   - Click **"Add Environment Variable"**
   - Add these one by one:
     ```
     NODE_ENV=production
     PORT=10000
     DB_HOST=dpg-d4lhff0gjchc73anqadg-a.oregon-postgres.render.com
     DB_PORT=5432
     DB_NAME=support_haven_db
     DB_USER=support_haven_db_user
     DB_PASSWORD=XbEPf6zXLEFLTSmmLBgDrcGpocl4fCFP
     FRONTEND_URL=http://localhost:3000
     ```

5. **Save** - Render redeploys automatically

6. **Copy the SERVICE URL** (shown at top of service page)

---

### Step 2: Deploy Frontend to Vercel (Different Platform!)

**This is NOT about Render!** This is deploying to a completely different platform (Vercel).

1. **Go to https://vercel.com** (different website!)
2. Sign up/login
3. Click **"Add New"** → **"Project"**
4. Import GitHub repo: `nigavictor/support-haven_plp`
5. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
6. Add environment variable:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com
   ```
   (Use the URL from Step 1)
7. Deploy
8. **Copy your Vercel URL** (e.g., `https://support-haven-plp.vercel.app`)

---

### Step 3: Update Backend Service in Render

1. **Go back to Render** (render.com)
2. **Click on `support-haven_plp` SERVICE** (the service, not project)
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Update it to your Vercel URL
6. Save → Auto-redeploys

---

## 🔑 Key Points

- **Click on SERVICE** (`support-haven_plp`), not the project/group
- **Step 2 is Vercel** (different platform, not Render!)
- **Service Settings** ≠ **Project Settings**

---

## ❓ If You Still Can't Find Settings

**Please tell me:**
1. When you click `support-haven_plp`, what tabs/sections do you see?
2. Do you see "Settings", "Environment", "Logs" tabs?
3. What options are available on that page?

This will help me give you the exact steps! 😊

