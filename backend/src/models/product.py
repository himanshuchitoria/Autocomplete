# backend/src/models/product.py

from pydantic import BaseModel, Field

class Product(BaseModel):
    id: int = Field(..., example=1)
    title: str = Field(..., example="iPhone 13")
    brand: str = Field(..., example="Apple")
    category: str = Field(..., example="smartphones")
    price: float = Field(..., example=799.99)

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "title": "iPhone 13",
                "brand": "Apple",
                "category": "smartphones",
                "price": 799.99
            }
        }

class ProductSearchResponse(BaseModel):
    products: list[Product]
    total: int
    skip: int
    limit: int

    class Config:
        schema_extra = {
            "example": {
                "products": [
                    {
                        "id": 1,
                        "title": "iPhone 13",
                        "brand": "Apple",
                        "category": "smartphones",
                        "price": 799.99
                    }
                ],
                "total": 100,
                "skip": 0,
                "limit": 10
            }
        }
