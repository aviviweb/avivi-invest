import os
import asyncio
import httpx

async def keep_alive():
    url = os.getenv('KEEP_ALIVE_URL')
    interval = int(os.getenv('KEEP_ALIVE_PING_INTERVAL_SECONDS', 600))
    if not url:
        return
    async with httpx.AsyncClient() as client:
        while True:
            try:
                await client.get(url, timeout=10.0)
            except Exception:
                pass
            await asyncio.sleep(interval)
