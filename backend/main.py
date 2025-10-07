import os
import asyncio
import logging
from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from alpaca_client import AlpacaClient
from database import init_db
from keep_alive import keep_alive
from typing import Optional
import traceback

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(
    title="Avivi Invest API",
    description="Autonomous trading system with Alpaca integration",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PAPER_MODE = os.getenv('PAPER_MODE', 'true').lower() in ('1','true','yes')
ALPACA_BASE = os.getenv('ALPACA_BASE_URL')

# Initialize Alpaca client
try:
    alpaca = AlpacaClient(
        api_key=os.getenv('ALPACA_API_KEY'),
        secret_key=os.getenv('ALPACA_SECRET_KEY'),
        base_url=ALPACA_BASE,
        paper=PAPER_MODE
    )
    logger.info(f"Alpaca client initialized in {'PAPER' if PAPER_MODE else 'LIVE'} mode")
except Exception as e:
    logger.error(f"Failed to initialize Alpaca client: {e}")
    alpaca = None

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}")
    logger.error(f"Traceback: {traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
    )

@app.on_event("startup")
async def startup_event():
    try:
        await init_db()
        logger.info("Database initialized successfully")
        
        # start keep-alive in background if configured
        task = asyncio.create_task(_start_keep_alive())
        logger.info("Keep-alive service started")
    except Exception as e:
        logger.error(f"Startup error: {e}")

async def _start_keep_alive():
    try:
        await keep_alive()
    except Exception as e:
        logger.error(f"Keep-alive error: {e}")

@app.get('/health')
async def health():
    """Health check endpoint"""
    try:
        if alpaca is None:
            return {"status": "error", "message": "Alpaca client not initialized", "paper_mode": PAPER_MODE}
        
        # Test Alpaca connection
        account = await alpaca.get_account()
        return {
            "status": "ok", 
            "paper_mode": PAPER_MODE,
            "alpaca_connected": True,
            "account_status": account.get('status', 'unknown') if account else 'unknown'
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "error", 
            "paper_mode": PAPER_MODE,
            "alpaca_connected": False,
            "error": str(e)
        }

@app.get('/fetch_quote')
async def fetch_quote(ticker: str):
    """Fetch latest quote for a ticker"""
    if not ticker or not ticker.strip():
        raise HTTPException(status_code=400, detail="Ticker symbol is required")
    
    if alpaca is None:
        raise HTTPException(status_code=503, detail="Alpaca client not available")
    
    try:
        ticker = ticker.strip().upper()
        q = await alpaca.get_last_quote(ticker)
        if q is None:
            raise HTTPException(status_code=404, detail=f"Ticker '{ticker}' not found or no data available")
        return q
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching quote for {ticker}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch quote: {str(e)}")

class OrderRequest(BaseModel):
    symbol: str = Field(..., min_length=1, max_length=10, description="Stock symbol")
    qty: float = Field(..., gt=0, description="Quantity to trade")
    side: str = Field(..., regex="^(buy|sell)$", description="Order side: buy or sell")
    type: str = Field("market", regex="^(market|limit)$", description="Order type")
    time_in_force: str = Field("day", regex="^(day|gtc|ioc|fok)$", description="Time in force")

@app.post('/create_order')
async def create_order(req: OrderRequest):
    """Create a new order"""
    if alpaca is None:
        raise HTTPException(status_code=503, detail="Alpaca client not available")
    
    try:
        # Validate symbol
        symbol = req.symbol.strip().upper()
        if not symbol:
            raise HTTPException(status_code=400, detail="Invalid symbol")
        
        # Validate quantity
        if req.qty <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be positive")
        
        # Validate side
        if req.side.lower() not in ['buy', 'sell']:
            raise HTTPException(status_code=400, detail="Side must be 'buy' or 'sell'")
        
        logger.info(f"Creating {req.side} order: {req.qty} {symbol}")
        
        order = await alpaca.create_order(
            symbol=symbol, 
            qty=req.qty, 
            side=req.side.lower(), 
            type=req.type, 
            time_in_force=req.time_in_force
        )
        
        logger.info(f"Order created successfully: {order}")
        return {"status": "ok", "order": order}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating order: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

@app.get('/portfolio')
async def portfolio():
    """Get portfolio information"""
    if alpaca is None:
        raise HTTPException(status_code=503, detail="Alpaca client not available")
    
    try:
        account = await alpaca.get_account()
        positions = await alpaca.get_positions()
        
        return {
            "account": account, 
            "positions": positions,
            "paper_mode": PAPER_MODE
        }
    except Exception as e:
        logger.error(f"Error fetching portfolio: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch portfolio: {str(e)}")

@app.get('/')
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Avivi Invest API",
        "version": "1.0.0",
        "paper_mode": PAPER_MODE,
        "docs": "/docs",
        "health": "/health"
    }
