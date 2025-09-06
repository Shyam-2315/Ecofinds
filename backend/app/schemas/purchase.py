# File: backend/app/schemas/purchase.py

from pydantic import BaseModel
from datetime import datetime

class PurchaseBase(BaseModel):
    product_id: int

class PurchaseRead(PurchaseBase):
    id: int
    user_id: int
    purchased_at: datetime

    class Config:
        orm_mode = True
