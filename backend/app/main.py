# File: backend/app/main.py

from fastapi import FastAPI
from app.api import auth, products, cart, purchases
from app.core.database import engine
from app.core.database import Base

# Create tables (use Alembic for real migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="EcoFinds API")

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(purchases.router)
