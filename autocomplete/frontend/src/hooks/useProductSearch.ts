// src/hooks/useProductSearch.ts

import { useState, useEffect } from 'react';
import { Product } from '../types/product';

/**
 * useProductSearch
 * Custom React hook to fetch product search results from the external API with pagination and error/loading state.
 * 
 * Features (per assignment and best practices):
 * - Fetches products from https://dummyjson.com/products/search?q=...
 * - Supports pagination via `limit` and `skip`
 * - Only searches when query is at least 2 characters
 * - Handles loading and error states
 * - Returns products, loading, error, total, limit, and manual fetchProducts function
 * - Cleans up fetch on unmount or query/skip change
 */

const API_URL = 'https://dummyjson.com/products/search';
const DEFAULT_LIMIT = 10;

interface UseProductSearchResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  fetchProducts: (query: string, skip: number) => Promise<void>;
}

function useProductSearch(query: string, skip: number): UseProductSearchResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  // Fetch products when query or skip changes
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      if (query.length < 2) {
        setProducts([]);
        setTotal(0);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_URL}?q=${encodeURIComponent(query)}&limit=${DEFAULT_LIMIT}&skip=${skip}`
        );
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        if (!ignore) {
          setProducts(data.products || []);
          setTotal(data.total || 0);
          setLimit(data.limit || DEFAULT_LIMIT);
        }
      } catch (err: any) {
        if (!ignore) {
          setError(err.message || 'Failed to fetch products');
          setProducts([]);
          setTotal(0);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [query, skip]);

  // Manual fetchProducts function (for completeness)
  const fetchProducts = async (newQuery: string, newSkip: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}?q=${encodeURIComponent(newQuery)}&limit=${DEFAULT_LIMIT}&skip=${newSkip}`
      );
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setLimit(data.limit || DEFAULT_LIMIT);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, total, limit, fetchProducts };
}

export default useProductSearch;
