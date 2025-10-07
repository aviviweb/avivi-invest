#!/usr/bin/env python3
"""
Simple test script to verify Avivi Invest setup
Run this after starting the backend to test basic functionality
"""

import asyncio
import httpx
import json

async def test_api():
    base_url = "http://localhost:8000"
    
    print("🧪 Testing Avivi Invest API...")
    print("=" * 50)
    
    async with httpx.AsyncClient() as client:
        # Test health endpoint
        try:
            response = await client.get(f"{base_url}/health")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Health check passed: {data}")
            else:
                print(f"❌ Health check failed: {response.status_code}")
        except Exception as e:
            print(f"❌ Health check error: {e}")
            return
        
        # Test quote endpoint
        try:
            response = await client.get(f"{base_url}/fetch_quote?ticker=SPY")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Quote fetch passed: {data}")
            else:
                print(f"❌ Quote fetch failed: {response.status_code}")
        except Exception as e:
            print(f"❌ Quote fetch error: {e}")
        
        # Test portfolio endpoint
        try:
            response = await client.get(f"{base_url}/portfolio")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Portfolio fetch passed: {json.dumps(data, indent=2)}")
            else:
                print(f"❌ Portfolio fetch failed: {response.status_code}")
        except Exception as e:
            print(f"❌ Portfolio fetch error: {e}")
    
    print("=" * 50)
    print("🎉 API testing complete!")

if __name__ == "__main__":
    asyncio.run(test_api())
