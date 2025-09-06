from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class CartItemBase(BaseModel):
    user_id: str       # MongoDB ObjectId as string
    product_id: str    # MongoDB ObjectId as string
    quantity: Optional[int] = 1   # Default quantity is 1
    added_at: Optional[datetime] = None

class CartItemCreate(CartItemBase):
    pass

class Cart(CartItemBase):
    id: str = Field(..., alias="_id")
    added_at: datetime

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
        }
