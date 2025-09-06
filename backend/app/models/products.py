from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    price: float
    image_url: Optional[str] = "placeholder.png"

class ProductCreate(ProductBase):
    pass

class ProductInDB(ProductBase):
    id: str = Field(..., alias="_id")
    owner_id: str  # MongoDB ObjectId stored as string
    created_at: datetime

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
        }
