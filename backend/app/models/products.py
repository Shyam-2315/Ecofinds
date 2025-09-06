# File: backend/app/models/product.py

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, index=True, nullable=False)
    price = Column(Float, nullable=False)
    image_url = Column(String, nullable=True, default="placeholder.png")

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="products")
