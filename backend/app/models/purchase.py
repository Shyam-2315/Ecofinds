from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PurchaseBase(BaseModel):
    user_id: str    # MongoDB user ObjectId as string
    product_id: str # MongoDB product ObjectId as string
    purchased_at: Optional[datetime] = None

class PurchaseCreate(PurchaseBase):
    pass

class Purchase(PurchaseBase):
    id: str = Field(..., alias="_id")
    purchased_at: datetime

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
        }
