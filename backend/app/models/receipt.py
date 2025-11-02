from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReceiptCreate(BaseModel):
    category: str 
class ReceiptOut(BaseModel):
    id: str
    name: str                
    size: str                
    image_url: str
    date: datetime
    total: Optional[float]    
    category: str
    status: str
    userid: str
