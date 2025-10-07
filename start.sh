#!/bin/bash

# Avivi Invest - Startup Script
# This script helps you get started with the Avivi Invest trading system

echo "🚀 Avivi Invest - Startup Script"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ All prerequisites are installed"

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found. Creating template..."
    cp backend/.env.example backend/.env 2>/dev/null || echo "Please create backend/.env with your Alpaca API keys"
fi

# Function to start backend
start_backend() {
    echo "🐳 Starting backend services..."
    cd backend
    docker-compose up --build -d
    echo "✅ Backend services started"
    echo "   API: http://localhost:8000"
    echo "   Docs: http://localhost:8000/docs"
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "⚛️  Starting frontend..."
    cd frontend
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install
    fi
    
    echo "🚀 Starting frontend development server..."
    npm run dev &
    echo "✅ Frontend started"
    echo "   Frontend: http://localhost:5173"
    cd ..
}

# Function to test API
test_api() {
    echo "🧪 Testing API..."
    sleep 5  # Wait for services to start
    
    # Test health endpoint
    if curl -s http://localhost:8000/health > /dev/null; then
        echo "✅ API health check passed"
    else
        echo "❌ API health check failed"
        return 1
    fi
    
    # Test quote endpoint
    if curl -s "http://localhost:8000/fetch_quote?ticker=SPY" > /dev/null; then
        echo "✅ Quote endpoint working"
    else
        echo "❌ Quote endpoint failed"
        return 1
    fi
    
    echo "🎉 All tests passed!"
}

# Function to show status
show_status() {
    echo ""
    echo "📊 System Status"
    echo "================"
    
    # Check backend
    if curl -s http://localhost:8000/health > /dev/null; then
        echo "✅ Backend: Running"
    else
        echo "❌ Backend: Not running"
    fi
    
    # Check frontend
    if curl -s http://localhost:5173 > /dev/null; then
        echo "✅ Frontend: Running"
    else
        echo "❌ Frontend: Not running"
    fi
    
    echo ""
    echo "🌐 Access URLs:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend API: http://localhost:8000"
    echo "   API Docs: http://localhost:8000/docs"
    echo ""
    echo "📚 Documentation:"
    echo "   Setup Guide: SETUP_GUIDE.md"
    echo "   API Docs: API_DOCS.md"
    echo "   Testing: TESTING_GUIDE.md"
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping services..."
    
    # Stop frontend
    pkill -f "npm run dev" 2>/dev/null || true
    
    # Stop backend
    cd backend
    docker-compose down
    cd ..
    
    echo "✅ All services stopped"
}

# Function to show logs
show_logs() {
    echo "📋 Backend logs:"
    cd backend
    docker-compose logs -f
    cd ..
}

# Main menu
case "${1:-menu}" in
    "start")
        start_backend
        start_frontend
        test_api
        show_status
        ;;
    "backend")
        start_backend
        ;;
    "frontend")
        start_frontend
        ;;
    "test")
        test_api
        ;;
    "status")
        show_status
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        show_logs
        ;;
    "menu"|*)
        echo ""
        echo "Available commands:"
        echo "  ./start.sh start    - Start all services"
        echo "  ./start.sh backend  - Start only backend"
        echo "  ./start.sh frontend - Start only frontend"
        echo "  ./start.sh test     - Test API endpoints"
        echo "  ./start.sh status   - Show system status"
        echo "  ./start.sh stop     - Stop all services"
        echo "  ./start.sh logs     - Show backend logs"
        echo ""
        echo "Quick start: ./start.sh start"
        ;;
esac
