# File: backend/app/api/products.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.product import ProductCreate, ProductRead
from app.models.products import Product
from app.core.database import get_db

router = APIRouter(prefix="/products", tags=["products"])

@router.post("/", response_model=ProductRead)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/", response_model=List[ProductRead])
def list_products(
    db: Session = Depends(get_db),
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
):
    query = db.query(Product)
    if category:
        query = query.filter(Product.category == category)
    if search:
        search_filter = f"%{search}%"
        query = query.filter(Product.title.ilike(search_filter))
    return query.all()

@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
