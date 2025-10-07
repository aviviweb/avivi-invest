# Avivi-Invest Backend (FastAPI)

Local run (requires Docker & docker-compose):
1. Edit `.env` and fill in ALPACA keys and any DB/REDIS values.
2. `docker-compose up --build`
3. API available at http://localhost:8000
4. API docs: http://localhost:8000/docs

Endpoints:
- GET /health
- GET /fetch_quote?ticker=SPY
- POST /create_order  (body: symbol, qty, side)
- GET /portfolio

This is PAPER MODE by default. Switch env PAPER_MODE=false to use live API (only after thorough testing).
