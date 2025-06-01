# backend/src/services/search_service.py

import json
import os
from typing import List, Tuple
from ..models.product import Product

# Load products data from JSON file at startup
DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "products.json")

with open(DATA_PATH, encoding="utf-8") as f:
    PRODUCTS = [Product(**item) for item in json.load(f)]

def search_products(query: str, limit: int, skip: int) -> Tuple[List[Product], int]:
    """
    Search products by title or brand (case-insensitive, substring match).
    Results are scored: titles starting with query > brand starting with query > others.
    Returns paginated results and total count.
    """
    q = query.strip().lower()

    # Scoring: higher score for title startswith, then brand startswith, then substring match
    def score(product: Product):
        title = product.title.lower()
        brand = product.brand.lower()
        if title.startswith(q):
            return (3, title)
        elif brand.startswith(q):
            return (2, brand)
        elif q in title:
            return (1, title)
        elif q in brand:
            return (0, brand)
        else:
            return (-1, "")

    # Filter and score products
    filtered = [p for p in PRODUCTS if q in p.title.lower() or q in p.brand.lower()]
    # Sort by score (descending), then alphabetically by title
    filtered.sort(key=score, reverse=True)

    total = len(filtered)
    # Ensure skip is not out of bounds
    if skip >= total:
        paginated = []
    else:
        paginated = filtered[skip:skip+limit]

    return paginated, total
