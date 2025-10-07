# Avivi Invest - Trading Strategies

## Available Strategies

### 1. Momentum Strategy (Placeholder)
- **File**: `backend/strategy_engine.py`
- **Description**: Basic momentum-based trading strategy
- **Status**: Framework ready, implementation needed

### 2. Risk Management
- **File**: `backend/risk_manager.py`
- **Features**:
  - Maximum drawdown control
  - Position sizing based on account value
  - Risk per trade limits

### 3. Tax Management
- **File**: `backend/tax_manager.py`
- **Features**:
  - Wash-sale detection
  - Realized/unrealized P&L tracking
  - Tax-aware position management

## Strategy Development

To implement a new strategy:

1. **Extend StrategyEngine class**:
```python
class MyStrategy(StrategyEngine):
    async def execute_strategy(self):
        # Your strategy logic here
        pass
```

2. **Add to scheduler**:
```python
from scheduler import add_daily_job
add_daily_job(my_strategy.execute_strategy, hour=9, minute=30)
```

3. **Integrate with risk management**:
```python
from risk_manager import RiskManager
risk_mgr = RiskManager()
if risk_mgr.check_max_drawdown(current_drawdown):
    # Execute strategy
```

## Backtesting

The framework supports backtesting with:
- **VectorBT**: For vectorized backtesting
- **Backtrader**: For more complex strategies
- **Custom implementations**: Direct database queries

## Paper Trading

All strategies run in paper mode by default:
- No real money at risk
- Full API functionality
- Real market data
- Complete order simulation

## Production Considerations

- **Market Hours**: Schedule strategies during market hours
- **Error Handling**: Implement robust error handling
- **Monitoring**: Add logging and alerting
- **Risk Limits**: Set appropriate position and drawdown limits
