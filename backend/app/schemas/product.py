from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    description: str
    category: str
    price: float
    image_url: Optional[str]

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: str = Field(..., alias="_id")
    owner_id: str
    created_at: datetime

    class Config:
        allow_population_by_field_name = True
