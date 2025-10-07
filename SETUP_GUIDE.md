# Avivi Invest - Development Setup Guide

## Prerequisites
- Docker and Docker Compose
- Node.js (v16 or higher)
- Python 3.11+ (for local development)

## Quick Start

### 1. Backend Setup
```bash
cd backend
# Edit .env file with your Alpaca API keys
docker-compose up --build
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Configuration

### Environment Variables (backend/.env)
```env
ALPACA_API_KEY=your_alpaca_api_key_here
ALPACA_SECRET_KEY=your_alpaca_secret_key_here
ALPACA_BASE_URL=https://paper-api.alpaca.markets
DATABASE_URL=postgresql+asyncpg://postgres:postgres@postgres:5432/autotrader
REDIS_URL=redis://redis:6379/0
PAPER_MODE=true
PORT=8000
```

### Getting Alpaca API Keys
1. Sign up at https://alpaca.markets/
2. Create a paper trading account
3. Generate API keys from the dashboard
4. Update the .env file with your keys

## API Endpoints

- `GET /health` - Health check
- `GET /fetch_quote?ticker=SPY` - Get latest quote
- `POST /create_order` - Place an order
- `GET /portfolio` - Get portfolio information

## Development Tips

1. **Paper Mode**: Always test in paper mode first
2. **Database**: PostgreSQL data persists in Docker volume
3. **Logs**: Check Docker logs for debugging
4. **Hot Reload**: Frontend supports hot reload during development

## Production Deployment

See `PRODUCT_DETAILS.md` for production deployment options including:
- Railway Pro
- Fly.io
- Render
- White-label deployment
