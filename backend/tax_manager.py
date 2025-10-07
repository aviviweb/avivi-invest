# Basic bookkeeping to support wash-sale detection and P&L reporting
class TaxManager:
    def __init__(self):
        self.trades = []

    def record_trade(self, trade):
        self.trades.append(trade)

    def compute_pnl(self):
        # placeholder: implement proper realized/unrealized accounting
        return {"realized": 0.0, "unrealized": 0.0}
