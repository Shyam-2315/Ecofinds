
from pydantic import BaseModel

class CartItemBase(BaseModel):
    product_id: int

class CartItemCreate(CartItemBase):
    pass

class CartItemRead(CartItemBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
