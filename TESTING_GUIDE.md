# Sample Data and Test Scenarios for Avivi Invest

## Test Symbols
Use these popular symbols for testing:

### Major Indices
- **SPY** - SPDR S&P 500 ETF
- **QQQ** - Invesco QQQ Trust (NASDAQ)
- **IWM** - iShares Russell 2000 ETF
- **DIA** - SPDR Dow Jones Industrial Average ETF

### Popular Stocks
- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corporation
- **GOOGL** - Alphabet Inc. (Google)
- **AMZN** - Amazon.com Inc.
- **TSLA** - Tesla Inc.
- **NVDA** - NVIDIA Corporation
- **META** - Meta Platforms Inc. (Facebook)
- **NFLX** - Netflix Inc.

### ETFs
- **VTI** - Vanguard Total Stock Market ETF
- **VEA** - Vanguard FTSE Developed Markets ETF
- **VWO** - Vanguard FTSE Emerging Markets ETF
- **BND** - Vanguard Total Bond Market ETF

## Test Scenarios

### 1. Basic Order Testing
```bash
# Test buy order
curl -X POST http://localhost:8000/create_order \
  -H "Content-Type: application/json" \
  -d '{"symbol": "AAPL", "qty": 1, "side": "buy"}'

# Test sell order
curl -X POST http://localhost:8000/create_order \
  -H "Content-Type: application/json" \
  -d '{"symbol": "AAPL", "qty": 1, "side": "sell"}'
```

### 2. Quote Testing
```bash
# Test quote fetching
curl http://localhost:8000/fetch_quote?ticker=SPY
curl http://localhost:8000/fetch_quote?ticker=AAPL
curl http://localhost:8000/fetch_quote?ticker=INVALID
```

### 3. Portfolio Testing
```bash
# Test portfolio endpoint
curl http://localhost:8000/portfolio
```

### 4. Health Check
```bash
# Test health endpoint
curl http://localhost:8000/health
```

## Sample Portfolio Data Structure

### Account Information
```json
{
  "account": {
    "id": "account_id",
    "account_number": "123456789",
    "status": "ACTIVE",
    "currency": "USD",
    "buying_power": "10000.00",
    "regt_buying_power": "5000.00",
    "daytrading_buying_power": "10000.00",
    "cash": "5000.00",
    "portfolio_value": "15000.00",
    "pattern_day_trader": false,
    "trading_blocked": false,
    "transfers_blocked": false,
    "account_blocked": false,
    "created_at": "2024-01-01T00:00:00Z",
    "trade_suspended_by_user": false,
    "multiplier": "4",
    "shorting_enabled": true,
    "equity": "15000.00",
    "last_equity": "14500.00",
    "long_market_value": "10000.00",
    "short_market_value": "0.00",
    "initial_margin": "4000.00",
    "maintenance_margin": "2000.00",
    "last_maintenance_margin": "1900.00",
    "sma": "5000.00",
    "daytrade_count": 0
  }
}
```

### Positions Information
```json
{
  "positions": [
    {
      "asset_id": "asset_id_1",
      "symbol": "AAPL",
      "exchange": "NASDAQ",
      "asset_class": "us_equity",
      "avg_entry_price": "150.00",
      "qty": "10",
      "side": "long",
      "market_value": "1500.00",
      "cost_basis": "1500.00",
      "unrealized_pl": "50.00",
      "unrealized_plpc": "0.0333",
      "unrealized_day_pl": "25.00",
      "unrealized_day_plpc": "0.0167",
      "current_price": "155.00",
      "lastday_price": "152.50",
      "change_today": "0.0164"
    }
  ]
}
```

## Testing Checklist

### Backend Testing
- [ ] Health endpoint responds correctly
- [ ] Quote fetching works for valid symbols
- [ ] Quote fetching handles invalid symbols gracefully
- [ ] Order creation works for buy orders
- [ ] Order creation works for sell orders
- [ ] Portfolio endpoint returns account and positions
- [ ] Error handling works for invalid requests
- [ ] Database connection is working
- [ ] Redis connection is working

### Frontend Testing
- [ ] Dashboard loads and displays portfolio data
- [ ] Portfolio component shows positions correctly
- [ ] Orders component allows order placement
- [ ] Quote fetching works from frontend
- [ ] Error messages display correctly
- [ ] Loading states work properly
- [ ] Responsive design works on different screen sizes

### Integration Testing
- [ ] Frontend can communicate with backend
- [ ] Orders placed from frontend appear in portfolio
- [ ] Real-time data updates work
- [ ] Error handling works end-to-end
- [ ] Paper trading mode is active

## Performance Testing

### Load Testing
```bash
# Test with multiple concurrent requests
for i in {1..10}; do
  curl http://localhost:8000/health &
done
wait
```

### Memory Usage
```bash
# Monitor Docker container resources
docker stats avivi_api
```

## Security Testing

### Input Validation
- Test with special characters in symbols
- Test with negative quantities
- Test with extremely large quantities
- Test with SQL injection attempts
- Test with XSS attempts

### API Security
- Verify API keys are not exposed in logs
- Test rate limiting
- Test CORS configuration
- Test input sanitization
