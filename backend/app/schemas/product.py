
from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    price: float
    image_url: Optional[str] = "placeholder.png"

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
