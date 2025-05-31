# backend/tests/test_products.py

import pytest
from fastapi.testclient import TestClient
from src.app import app

client = TestClient(app)

def test_search_valid_query():
    """Test searching with a valid query returns results and correct structure."""
    response = client.get("/api/products/search?q=phone&limit=5&skip=0")
    assert response.status_code == 200
    data = response.json()
    assert "products" in data
    assert "total" in data
    assert "skip" in data
    assert "limit" in data
    assert isinstance(data["products"], list)
    assert isinstance(data["total"], int)
    assert isinstance(data["skip"], int)
    assert isinstance(data["limit"], int)
    # Each product should have required fields
    if data["products"]:
        product = data["products"][0]
        for field in ["id", "title", "brand", "category", "price"]:
            assert field in product

def test_search_pagination():
    """Test pagination returns different results for different skip values."""
    response1 = client.get("/api/products/search?q=phone&limit=2&skip=0")
    response2 = client.get("/api/products/search?q=phone&limit=2&skip=2")
    assert response1.status_code == 200
    assert response2.status_code == 200
    data1 = response1.json()
    data2 = response2.json()
    # If there are at least 4 results, the first two pages should not be identical
    if len(data1["products"]) == 2 and len(data2["products"]) == 2:
        assert data1["products"] != data2["products"]

def test_search_min_query_length():
    """Test that queries shorter than 2 characters return 400."""
    response = client.get("/api/products/search?q=p")
    assert response.status_code == 400
    assert "detail" in response.json()

def test_search_no_results():
    """Test searching with a nonsense query returns empty results."""
    response = client.get("/api/products/search?q=zzzznotaproduct")
    assert response.status_code == 200
    data = response.json()
    assert data["products"] == []
    assert data["total"] == 0

def test_search_limit_and_skip_bounds():
    """Test edge cases for limit and skip."""
    response = client.get("/api/products/search?q=phone&limit=1000&skip=0")
    # Should cap at backend's max limit if enforced, or accept large limit
    assert response.status_code in (200, 422)  # 422 if validation error
    response = client.get("/api/products/search?q=phone&limit=2&skip=1000")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data["products"], list)
    # Should return empty if skip is past end
    if data["total"] < 1000:
        assert data["products"] == []
