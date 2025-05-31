# backend/tests/test_search_service.py

import pytest
from src.services.search_service import search_products
from src.models.product import Product

def test_search_exact_title_start():
    """Products whose titles start with the query should be ranked highest."""
    # Query for a common prefix (e.g., 'iP' for iPhone)
    results, total = search_products("iP", limit=10, skip=0)
    assert isinstance(results, list)
    assert total >= len(results)
    if results:
        # The first result's title should start with 'ip' (case-insensitive)
        assert results[0].title.lower().startswith("ip")

def test_search_brand_start():
    """Products whose brands start with the query should be ranked after title startswith."""
    # Query for a brand prefix (e.g., 'Sam' for Samsung)
    results, total = search_products("Sam", limit=10, skip=0)
    assert isinstance(results, list)
    if results:
        # At least one result's brand should start with 'sam'
        assert any(p.brand.lower().startswith("sam") for p in results)

def test_search_substring_match():
    """Products matching the query as a substring should be included with lower rank."""
    results, total = search_products("pro", limit=10, skip=0)
    assert isinstance(results, list)
    # At least one result should have 'pro' in title or brand
    assert any("pro" in p.title.lower() or "pro" in p.brand.lower() for p in results)

def test_search_pagination():
    """Pagination should return correct slices of results."""
    all_results, total = search_products("a", limit=100, skip=0)
    paged1, _ = search_products("a", limit=5, skip=0)
    paged2, _ = search_products("a", limit=5, skip=5)
    assert paged1 == all_results[:5]
    assert paged2 == all_results[5:10]

def test_search_empty_query():
    """Empty query should return no results."""
    results, total = search_products("", limit=10, skip=0)
    assert results == []
    assert total == 0

def test_search_skip_beyond():
    """Skip beyond available results should return empty list."""
    results, total = search_products("phone", limit=10, skip=1000)
    assert results == []

def test_search_case_insensitive():
    """Search should be case-insensitive."""
    results1, _ = search_products("iphone", limit=5, skip=0)
    results2, _ = search_products("IPHONE", limit=5, skip=0)
    assert results1 == results2

def test_search_limit():
    """Limit should restrict the number of returned results."""
    results, total = search_products("a", limit=3, skip=0)
    assert len(results) <= 3
