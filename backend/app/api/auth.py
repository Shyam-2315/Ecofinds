from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserCreate, UserRead, UserLogin, UserBase
from app.core.database import db  # Correct import for Motor client
from app.core.security import hash_password, verify_password, create_access_token
from app.core.auth import get_current_user
from app.models.users import UserInDB  # Pydantic user model
from bson.objectid import ObjectId
from datetime import datetime


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead)
async def register(user: UserCreate):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_pw = hash_password(user.password)
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_pw
    user_dict["created_at"] = datetime.utcnow()
    user_dict.pop("password")

    result = await db.users.insert_one(user_dict)
    user_in_db = await db.users.find_one({"_id": result.inserted_id})
    user_in_db["_id"] = str(user_in_db["_id"])
    return UserRead(**user_in_db)


@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    access_token = create_access_token({"sub": db_user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}


@router.put("/profile", response_model=UserRead)
async def update_profile(
    user_update: UserBase,
    current_user: UserInDB = Depends(get_current_user),
):
    obj_id = ObjectId(current_user.id)
    user = await db.users.find_one({"_id": obj_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)
    # Remove keys that should not be updated like id, hashed_password, created_at
    protected_fields = {"_id", "hashed_password", "created_at"}
    update_data = {k: v for k, v in update_data.items() if k not in protected_fields}

    await db.users.update_one({"_id": obj_id}, {"$set": update_data})
    updated_user = await db.users.find_one({"_id": obj_id})
    updated_user["_id"] = str(updated_user["_id"])
    return UserRead(**updated_user)