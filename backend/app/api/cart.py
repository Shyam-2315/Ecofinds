# File: backend/app/api/cart.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.schemas.cart import CartItemCreate, CartItemRead
from app.models.cart import Cart
from app.models.purchase import Purchase
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.users import User


router = APIRouter(prefix="/cart", tags=["cart"])


@router.post("/", response_model=CartItemRead)
def add_to_cart(
    item: CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cart_item = Cart(**item.dict(), user_id=current_user.id)
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item


@router.get("/", response_model=List[CartItemRead])
def get_cart(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    return db.query(Cart).filter(Cart.user_id == current_user.id).all()


@router.delete("/{item_id}")
def delete_cart_item(
    item_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    item = db.query(Cart).filter(Cart.id == item_id, Cart.user_id == current_user.id).first()
    if not item:
        raise HTTPException(404, "Cart item not found")
    db.delete(item)
    db.commit()
    return {"detail": "Item removed from cart"}


@router.post("/checkout")
def checkout(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    cart_items = db.query(Cart).filter(Cart.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    for item in cart_items:
        purchase = Purchase(
            user_id=current_user.id,
            product_id=item.product_id,
            purchased_at=datetime.utcnow(),
        )
        db.add(purchase)
        db.delete(item)
    db.commit()
    return {"detail": f"{len(cart_items)} purchases created and cart cleared"}
