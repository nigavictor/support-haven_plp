#!/bin/bash

echo "🚀 Setting up Support Haven..."
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Setup backend
echo "📦 Setting up backend..."
cd backend
if [ ! -f .env ]; then
    if [ -f env.template ]; then
        cp env.template .env
        echo "✅ Created .env file from template. Please edit it with your database credentials."
    else
        echo "⚠️  env.template not found. Please create .env manually."
    fi
else
    echo "ℹ️  .env file already exists"
fi

npm install
echo "✅ Backend dependencies installed"
echo ""

# Setup frontend
echo "📦 Setting up frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

cd ..

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database: createdb support_haven"
echo "3. Edit backend/.env with your database credentials"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Frontend will be available at http://localhost:3000"
echo "🔧 Backend will be available at http://localhost:5000"

