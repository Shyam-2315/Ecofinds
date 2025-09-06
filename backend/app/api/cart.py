# File: backend/app/api/cart.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.cart import CartItemCreate, CartItemRead
from app.models.cart import Cart
from app.core.database import get_db

router = APIRouter(prefix="/cart", tags=["cart"])

@router.post("/", response_model=CartItemRead)
def add_to_cart(item: CartItemCreate, db: Session = Depends(get_db)):
    cart_item = Cart(**item.dict())
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.get("/", response_model=List[CartItemRead])
def get_cart(db: Session = Depends(get_db)):
    return db.query(Cart).all()

@router.delete("/{item_id}")
def delete_cart_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Cart).filter(Cart.id == item_id).first()
    if not item:
        raise HTTPException(404, "Cart item not found")
    db.delete(item)
    db.commit()
    return {"detail": "Item removed from cart"}
