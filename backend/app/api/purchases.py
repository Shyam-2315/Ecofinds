from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.purchase import PurchaseRead
from app.core.auth import get_current_user
from app.models.users import User
from app.core.database import db
from bson.objectid import ObjectId

router = APIRouter(prefix="/purchases", tags=["purchases"])


@router.get("/", response_model=List[PurchaseRead])
async def get_purchases(current_user: User = Depends(get_current_user)):
    cursor = db.purchases.find({"user_id": current_user.id})
    purchases = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        purchases.append(PurchaseRead(**doc))
    return purchases
