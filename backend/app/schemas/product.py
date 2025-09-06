from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    description: str
    price: float
    category: str
    image_url: Optional[str]

class ProductCreate(ProductBase):
    pass

class ProductInDB(ProductBase):
    id: str = Field(None, alias="_id")
    owner_id: str
    created_at: datetime

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat()
        }
