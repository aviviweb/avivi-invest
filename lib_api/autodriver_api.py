"""
AutoDriver API - library wrapper for Avivi Invest backend.
Simple async wrapper to reuse core features in other projects.
"""
import os
from alpaca_client import AlpacaClient

class AutoDriverAPI:
    def __init__(self, api_key=None, secret_key=None, base_url=None, paper=True):
        api_key = api_key or os.getenv('ALPACA_API_KEY')
        secret_key = secret_key or os.getenv('ALPACA_SECRET_KEY')
        base_url = base_url or os.getenv('ALPACA_BASE_URL')
        self.client = AlpacaClient(api_key=api_key, secret_key=secret_key, base_url=base_url, paper=paper)

    async def fetch_quote(self, symbol):
        return await self.client.get_last_quote(symbol)

    async def create_order(self, symbol, qty, side='buy', type='market', time_in_force='day'):
        return await self.client.create_order(symbol, qty, side, type, time_in_force)

    async def get_account(self):
        return await self.client.get_account()
