#!/bin/bash

# Start script for Support Haven
# This will start both backend and frontend servers

echo "🚀 Starting Support Haven..."
echo ""

# Check if .env exists
if [ ! -f backend/.env ]; then
    echo "❌ backend/.env file not found!"
    echo "Please run ./setup.sh first or create backend/.env manually"
    exit 1
fi

# Start backend in background
echo "🔧 Starting backend server..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started (PID: $BACKEND_PID)"
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend started (PID: $FRONTEND_PID)"
cd ..

echo ""
echo "✅ Support Haven is starting!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

