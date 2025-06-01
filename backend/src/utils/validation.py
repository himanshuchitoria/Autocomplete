# backend/src/utils/validation.py

from fastapi import Query, HTTPException

def validate_query_param(
    q: str = Query(..., min_length=2, description="Search query string, minimum 2 characters")
) -> str:
    """
    Validates the 'q' query parameter for minimum length.
    Returns the query string if valid, otherwise raises HTTP 400.
    """
    if len(q) < 2:
        raise HTTPException(status_code=400, detail="Query parameter 'q' must be at least 2 characters long.")
    return q
