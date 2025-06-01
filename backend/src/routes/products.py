from fastapi import APIRouter, Query, HTTPException, Depends
from typing import List
from ..models.product import ProductSearchResponse
from ..services.search_service import search_products
from ..utils.validation import validate_query_param

router = APIRouter()

@router.get("/search", response_model=ProductSearchResponse)
async def search(
    q: str = Query(..., description="Search query string, minimum 2 characters"),
    limit: int = Query(10, ge=1, le=50, description="Number of results to return"),
    skip: int = Query(0, ge=0, description="Number of results to skip"),
):
    """
    Search products by title or brand (case-insensitive, substring match).
    Results are paginated and scored (title startswith > brand startswith > substring match).
    """
    # Assignment requirement: If query is shorter than 2 chars, return 400 Bad Request
    if len(q) < 2:
        raise HTTPException(
            status_code=400,
            detail="Query parameter 'q' must be at least 2 characters long."
        )

    products, total = search_products(q, limit, skip)

    return ProductSearchResponse(
        products=products,
        total=total,
        skip=skip,
        limit=limit
    )
