# File: backend/app/api/purchases.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.purchase import PurchaseRead
from app.models.purchase import Purchase
from app.core.database import get_db

router = APIRouter(prefix="/purchases", tags=["purchases"])

@router.get("/", response_model=List[PurchaseRead])
def get_purchases(db: Session = Depends(get_db)):
    return db.query(Purchase).all()
