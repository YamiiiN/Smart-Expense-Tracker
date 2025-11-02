import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client['SmartExpenseTracker']  # or client['smart-expense']
users_collection = db['users']
receipts_collection = db['receipts']
