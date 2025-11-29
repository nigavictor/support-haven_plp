# 🚀 Support Haven - Start Here!

Your hackathon application is **ready**! Follow these steps to get it running.

## ✅ What's Already Done

- ✅ Backend API (Node.js/Express) - **READY**
- ✅ Frontend (React + TailwindCSS) - **READY**
- ✅ All features implemented - **READY**
- ✅ Dependencies installed - **DONE**

## 📋 Final Setup Steps

### Step 1: Database Setup (Required)

You need to create the PostgreSQL database. Choose one method:

**Method A - Using postgres user:**
```bash
sudo -u postgres createdb support_haven
```

Then edit `backend/.env`:
```env
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

**Method B - Using your user:**
```bash
# Create database
createdb support_haven

# Edit backend/.env (password may be empty)
DB_USER=hduser
DB_PASSWORD=
```

**See `DATABASE_SETUP.md` for detailed instructions.**

### Step 2: Start the Application

**Option 1 - Use the start script:**
```bash
./start.sh
```

**Option 2 - Manual start (2 terminals):**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## 🌐 Access Points

Once running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin
  - Username: `admin`
  - Password: `admin123`

## 🎯 Quick Test

1. Go to http://localhost:3000
2. Click "Share Your Story" and submit a test story
3. Go to http://localhost:3000/admin and approve it
4. View it at http://localhost:3000/stories
5. Test chat at http://localhost:3000/chat

## 📚 Documentation

- `README.md` - Full documentation
- `QUICKSTART.md` - Quick start guide
- `DATABASE_SETUP.md` - Database setup help
- `backend/README.md` - Backend details
- `frontend/README.md` - Frontend details

## 🆘 Need Help?

If you encounter database issues:
1. Check `DATABASE_SETUP.md`
2. Verify PostgreSQL is running: `sudo systemctl status postgresql`
3. Test connection: `psql -U your_user -d support_haven`

---

**You're almost there! Just set up the database and you're ready to demo! 🎉**

