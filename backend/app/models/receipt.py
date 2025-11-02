from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReceiptCreate(BaseModel):
    category: str  # shopping, food, essentials, others

class ReceiptOut(BaseModel):
    id: str
    image_url: str
    date: datetime
    total: Optional[float]
    category: str
    userid: str
