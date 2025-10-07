import os
import asyncio
from alpaca_trade_api.rest import REST
from alpaca_trade_api.common import URL

class AlpacaClient:
    def __init__(self, api_key: str, secret_key: str, base_url: str = None, paper: bool = True):
        self.api_key = api_key
        self.secret_key = secret_key
        self.paper = paper
        if base_url is None or base_url == "":
            base_url = 'https://paper-api.alpaca.markets' if paper else 'https://api.alpaca.markets'
        self.base_url = base_url
        # REST client (blocking) - we'll wrap in executor for async
        self.client = REST(api_key, secret_key, base_url)

    async def get_account(self):
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.client.get_account)

    async def get_positions(self):
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.client.list_positions)

    async def create_order(self, symbol, qty, side, type='market', time_in_force='day'):
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, lambda: self.client.submit_order(symbol=symbol, qty=qty, side=side, type=type, time_in_force=time_in_force))

    async def get_last_quote(self, symbol):
        loop = asyncio.get_running_loop()
        try:
            q = await loop.run_in_executor(None, lambda: self.client.get_latest_trade(symbol))
            return {"symbol": symbol, "price": float(q.price), "timestamp": str(q.timestamp)}
        except Exception:
            return None
