# 🔧 Troubleshooting 404 Error on Stories

If you're seeing "Failed to load stories: 404", follow these steps:

## Quick Fixes

### 1. Restart Frontend Dev Server

The API configuration was just updated. Restart your frontend:

```bash
# Stop the frontend (Ctrl+C)
# Then restart it:
cd frontend
npm run dev
```

### 2. Check Browser Console

Open your browser's Developer Tools (F12) and check:
- **Console tab:** Look for any error messages
- **Network tab:** Click on the failed request to see:
  - What URL it's trying to reach
  - What status code it's getting

### 3. Verify Backend is Running

Check if backend is running on port 5000:

```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok","message":"Support Haven API is running"}
```

If not running, start it:

```bash
cd backend
npm start
```

### 4. Check API URL Configuration

The frontend should use:
- **Development (localhost):** `/api/stories` (uses proxy)
- **Production:** `https://your-backend-url.onrender.com/api/stories`

Verify in browser console:
```javascript
// Open browser console (F12) and run:
console.log(window.location.hostname); // Should be "localhost" in development
```

### 5. Clear Browser Cache

Sometimes cached JavaScript causes issues:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or clear cache: Browser Settings → Clear Browsing Data

### 6. Check Environment Variables

If you have a `.env` file in `frontend/` folder, make sure `VITE_API_URL` is:
- **Not set** for local development (so it uses proxy)
- **Set correctly** for production deployment

## Common Issues

### Issue: Frontend trying to reach remote URL
**Symptom:** Network tab shows request to `https://...onrender.com/...`  
**Fix:** Remove or comment out `VITE_API_URL` in `.env` file for local development

### Issue: Backend not running
**Symptom:** Network tab shows "Failed to fetch" or connection error  
**Fix:** Start backend: `cd backend && npm start`

### Issue: Proxy not working
**Symptom:** Getting 404 on `/api/stories`  
**Fix:** Check `vite.config.js` has proxy configured, restart Vite dev server

### Issue: CORS error
**Symptom:** Console shows CORS policy error  
**Fix:** Backend CORS is configured for `http://localhost:3000`, verify it's running on correct port

## Still Not Working?

Share:
1. **Browser console errors** (F12 → Console tab)
2. **Network request details** (F12 → Network tab → Click failed request)
3. **Backend logs** (terminal where you ran `npm start` in backend folder)

