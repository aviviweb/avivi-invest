class RiskManager:
    def __init__(self, max_drawdown_pct=0.2, risk_per_trade=0.01):
        self.max_drawdown_pct = max_drawdown_pct
        self.risk_per_trade = risk_per_trade

    def check_max_drawdown(self, current_drawdown):
        return current_drawdown <= self.max_drawdown_pct

    def position_size(self, account_value, volatility):
        # basic fixed-fraction example; expand with Kelly/vol parity
        return max(1, account_value * self.risk_per_trade)
