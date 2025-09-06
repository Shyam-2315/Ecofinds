from typing import List, Optional
from app.core.database import db
from app.schemas.product import ProductCreate, ProductRead
from bson.objectid import ObjectId
from datetime import datetime

async def create_product(product: ProductCreate, owner_id: str) -> ProductRead:
    doc = product.dict()
    doc.update({"owner_id": owner_id, "created_at": datetime.utcnow()})
    result = await db.products.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return ProductRead(**doc)

async def get_products(limit: int = 10, offset: int = 0, category: Optional[str] = None, search: Optional[str] = None) -> List[ProductRead]:
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

async def get_product(product_id: str) -> Optional[ProductRead]:
    obj_id = ObjectId(product_id)
    doc = await db.products.find_one({"_id": obj_id})
    if doc:
        doc["_id"] = str(doc["_id"])
        return ProductRead(**doc)
    return None

async def update_product(product_id: str, product_data: ProductCreate) -> Optional[ProductRead]:
    obj_id = ObjectId(product_id)
    update_data = product_data.dict(exclude_unset=True)
    result = await db.products.update_one({"_id": obj_id}, {"$set": update_data})
    if result.modified_count == 1:
        updated = await db.products.find_one({"_id": obj_id})
        if updated:
            updated["_id"] = str(updated["_id"])
            return ProductRead(**updated)
    return None

async def delete_product(product_id: str) -> bool:
    obj_id = ObjectId(product_id)
    result = await db.products.delete_one({"_id": obj_id})
    return result.deleted_count == 1
