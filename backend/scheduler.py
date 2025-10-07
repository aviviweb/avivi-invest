from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler = AsyncIOScheduler()

def start_scheduler():
    scheduler.start()

def add_daily_job(func, hour=0, minute=0):
    scheduler.add_job(func, 'cron', hour=hour, minute=minute)
