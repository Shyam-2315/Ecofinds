from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from app.api import auth, products, cart, purchases
from app.core.database import engine
from app.core.database import Base
import os

# Create all tables (use Alembic or other migrations for production)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="EcoFinds API")

# Enable HTTPS redirect only in production environment
if os.getenv("ENV", "development") == "production":
    app.add_middleware(HTTPSRedirectMiddleware)

# Configure allowed frontend origins for CORS
origins = [
    "http://localhost:3000",  # React dev server default port
    "http://localhost:5173",  # Vite dev server default port
    # Add your production frontend URLs here
]

# Add CORS middleware for cross-origin requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],    # Allow all HTTP methods, includes OPTIONS
    allow_headers=["*"],    # Allow all headers, including custom headers
)

# Register API route groups
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(purchases.router)
