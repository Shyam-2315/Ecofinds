from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from typing import List, Optional
from app.schemas.product import ProductCreate, ProductRead
from app.core.auth import get_current_user
from app.models.user import User
from app.core.database import db  # Use your mongodb.py file here (correct import)
from bson.objectid import ObjectId
import shutil
import os
import datetime

router = APIRouter(prefix="/products", tags=["products"])

UPLOAD_DIRECTORY = "backend/uploads"


@router.post("/", response_model=ProductRead)
async def create_product(
    product: ProductCreate,
    current_user: User = Depends(get_current_user),
):
    product_dict = product.dict()
    product_dict.update({
        "owner_id": current_user.id,
        "created_at": datetime.datetime.utcnow()
    })

    result = await db.products.insert_one(product_dict)
    product_dict["_id"] = str(result.inserted_id)
    return ProductRead(**product_dict)


@router.put("/{product_id}", response_model=ProductRead)
async def update_product(
    product_id: str,
    product_data: ProductCreate,
    current_user: User = Depends(get_current_user),
):
    obj_id = ObjectId(product_id)
    product = await db.products.find_one({"_id": obj_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.get("owner_id") != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this product")

    update_data = product_data.dict(exclude_unset=True)
    await db.products.update_one({"_id": obj_id}, {"$set": update_data})
    updated_product = await db.products.find_one({"_id": obj_id})
    updated_product["_id"] = str(updated_product["_id"])
    return ProductRead(**updated_product)


@router.delete("/{product_id}")
async def delete_product(
    product_id: str,
    current_user: User = Depends(get_current_user),
):
    obj_id = ObjectId(product_id)
    product = await db.products.find_one({"_id": obj_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.get("owner_id") != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this product")

    await db.products.delete_one({"_id": obj_id})
    return {"detail": "Product deleted successfully"}


@router.get("/", response_model=List[ProductRead])
async def list_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
):
    query = {}
    if category:
        query["category"] = category
    if search:
        query["title"] = {"$regex": search, "$options": "i"}

    cursor = db.products.find(query).skip(offset).limit(limit)
    products = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        products.append(ProductRead(**doc))
    return products


@router.get("/{product_id}", response_model=ProductRead)
async def get_product(product_id: str):
    obj_id = ObjectId(product_id)
    product = await db.products.find_one({"_id": obj_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product["_id"] = str(product["_id"])
    return ProductRead(**product)


@router.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"image_url": f"/uploads/{file.filename}"}
