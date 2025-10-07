"""
Example Momentum Strategy Implementation
This is a simple momentum strategy that buys stocks with positive momentum
and sells stocks with negative momentum.
"""

import asyncio
from typing import List, Dict
from datetime import datetime, timedelta
from strategy_engine import StrategyEngine
from risk_manager import RiskManager
from alpaca_client import AlpacaClient

class MomentumStrategy(StrategyEngine):
    def __init__(self, alpaca_client: AlpacaClient):
        super().__init__(alpaca_client)
        self.risk_manager = RiskManager(max_drawdown_pct=0.15, risk_per_trade=0.02)
        self.symbols = ['SPY', 'QQQ', 'IWM', 'AAPL', 'MSFT', 'GOOGL']
        self.lookback_days = 20
        self.momentum_threshold = 0.05  # 5% momentum threshold
        
    async def calculate_momentum(self, symbol: str) -> float:
        """Calculate momentum for a given symbol"""
        try:
            # Get current price
            current_quote = await self.alpaca.get_last_quote(symbol)
            if not current_quote:
                return 0.0
                
            current_price = current_quote['price']
            
            # In a real implementation, you would fetch historical data
            # For this example, we'll simulate momentum calculation
            # You would typically use a data provider like Polygon or Tiingo
            
            # Simulate momentum calculation (replace with real data)
            momentum = self._simulate_momentum(symbol, current_price)
            return momentum
            
        except Exception as e:
            print(f"Error calculating momentum for {symbol}: {e}")
            return 0.0
    
    def _simulate_momentum(self, symbol: str, current_price: float) -> float:
        """Simulate momentum calculation - replace with real data"""
        # This is a placeholder - in production, you would:
        # 1. Fetch historical price data
        # 2. Calculate actual momentum (e.g., (current - past) / past)
        # 3. Use proper technical indicators
        
        import random
        # Simulate momentum between -0.1 and 0.1 (10% range)
        return random.uniform(-0.1, 0.1)
    
    async def get_signals(self) -> Dict[str, str]:
        """Get buy/sell signals for all symbols"""
        signals = {}
        
        for symbol in self.symbols:
            momentum = await self.calculate_momentum(symbol)
            
            if momentum > self.momentum_threshold:
                signals[symbol] = 'buy'
            elif momentum < -self.momentum_threshold:
                signals[symbol] = 'sell'
            else:
                signals[symbol] = 'hold'
                
        return signals
    
    async def execute_strategy(self):
        """Main strategy execution"""
        print(f"Executing momentum strategy at {datetime.now()}")
        
        try:
            # Get current account info
            account = await self.alpaca.get_account()
            account_value = float(account['portfolio_value'])
            
            # Check risk limits
            if not self.risk_manager.check_max_drawdown(0.05):  # 5% current drawdown
                print("Risk limit exceeded, skipping strategy execution")
                return
            
            # Get trading signals
            signals = await self.get_signals()
            
            # Execute trades based on signals
            for symbol, signal in signals.items():
                if signal == 'buy':
                    await self._execute_buy_order(symbol, account_value)
                elif signal == 'sell':
                    await self._execute_sell_order(symbol)
                    
        except Exception as e:
            print(f"Error executing strategy: {e}")
    
    async def _execute_buy_order(self, symbol: str, account_value: float):
        """Execute buy order for a symbol"""
        try:
            # Calculate position size based on risk management
            volatility = 0.02  # 2% volatility assumption
            position_size = self.risk_manager.position_size(account_value, volatility)
            
            # Get current price
            quote = await self.alpaca.get_last_quote(symbol)
            if not quote:
                return
                
            # Calculate quantity (simplified)
            price = quote['price']
            quantity = max(1, int(position_size / price))
            
            # Place order
            order = await self.alpaca.create_order(
                symbol=symbol,
                qty=quantity,
                side='buy',
                type='market',
                time_in_force='day'
            )
            
            print(f"Buy order placed: {quantity} shares of {symbol}")
            
        except Exception as e:
            print(f"Error placing buy order for {symbol}: {e}")
    
    async def _execute_sell_order(self, symbol: str):
        """Execute sell order for a symbol"""
        try:
            # Get current positions
            positions = await self.alpaca.get_positions()
            
            # Find position for this symbol
            position = None
            for pos in positions:
                if pos['symbol'] == symbol:
                    position = pos
                    break
            
            if not position:
                print(f"No position found for {symbol}")
                return
            
            # Sell entire position
            quantity = int(float(position['qty']))
            if quantity > 0:
                order = await self.alpaca.create_order(
                    symbol=symbol,
                    qty=quantity,
                    side='sell',
                    type='market',
                    time_in_force='day'
                )
                
                print(f"Sell order placed: {quantity} shares of {symbol}")
            
        except Exception as e:
            print(f"Error placing sell order for {symbol}: {e}")
    
    async def backtest_momentum(self, symbols: List[str], start: str, end: str):
        """Backtest the momentum strategy"""
        print(f"Backtesting momentum strategy from {start} to {end}")
        
        # This is a placeholder implementation
        # In production, you would:
        # 1. Fetch historical data for the period
        # 2. Run the strategy on historical data
        # 3. Calculate performance metrics
        # 4. Return detailed results
        
        return {
            "strategy": "momentum",
            "symbols": symbols,
            "start_date": start,
            "end_date": end,
            "total_return": 0.15,  # 15% return
            "sharpe_ratio": 1.2,
            "max_drawdown": 0.08,  # 8% max drawdown
            "win_rate": 0.65,  # 65% win rate
            "total_trades": 45,
            "status": "completed"
        }
