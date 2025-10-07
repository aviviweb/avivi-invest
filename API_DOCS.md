# Avivi Invest - API Documentation

## Base URL
- Development: `http://localhost:8000`
- Production: Configure as needed

## Authentication
Currently uses Alpaca API keys configured in environment variables.

## Endpoints

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "paper_mode": true
}
```

### Fetch Quote
```http
GET /fetch_quote?ticker=SPY
```
**Parameters:**
- `ticker` (string): Stock symbol

**Response:**
```json
{
  "symbol": "SPY",
  "price": 450.25,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Create Order
```http
POST /create_order
Content-Type: application/json

{
  "symbol": "AAPL",
  "qty": 10,
  "side": "buy",
  "type": "market",
  "time_in_force": "day"
}
```

**Request Body:**
- `symbol` (string): Stock symbol
- `qty` (number): Quantity to trade
- `side` (string): "buy" or "sell"
- `type` (string): Order type (default: "market")
- `time_in_force` (string): Order duration (default: "day")

**Response:**
```json
{
  "status": "ok",
  "order": {
    "id": "order_id",
    "symbol": "AAPL",
    "qty": 10,
    "side": "buy",
    "status": "accepted"
  }
}
```

### Get Portfolio
```http
GET /portfolio
```

**Response:**
```json
{
  "account": {
    "buying_power": 10000.00,
    "cash": 5000.00,
    "portfolio_value": 15000.00
  },
  "positions": [
    {
      "symbol": "AAPL",
      "qty": 10,
      "market_value": 1500.00,
      "unrealized_pl": 50.00
    }
  ]
}
```

## Error Responses

### 404 Not Found
```json
{
  "detail": "Ticker not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Error message"
}
```

## Rate Limits
- Follows Alpaca API rate limits
- Paper trading: 200 requests per minute
- Live trading: 200 requests per minute

## Paper Trading
- Default mode for safety
- Set `PAPER_MODE=false` in environment for live trading
- **Warning**: Live trading involves real money
