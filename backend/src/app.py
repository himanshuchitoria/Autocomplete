# backend/src/app.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import products

app = FastAPI(
    title="Product Autocomplete API",
    description="Backend API for product autocomplete, providing search with pagination and scoring.",
    version="1.0.0"
)

# Enable CORS so frontend (e.g., React at localhost:3000) can call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL if different
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include product search routes
app.include_router(products.router, prefix="/api/products", tags=["products"])

# Health check endpoint (optional, but good practice)
@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "ok"}
