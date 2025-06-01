

import { ProductSearchResponse } from '../types/product';


interface SearchProductsParams {
  query: string;
  limit?: number;
  skip?: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Search products from FastAPI backend.
 * 
 *
 * API Reference:
 * http://localhost:8000/api/products/search?q=phone&limit=10&skip=0
 */
export async function searchProducts({
  query,
  limit = 10,
  skip = 0,
}: SearchProductsParams): Promise<ApiResponse<ProductSearchResponse>> {
  if (query.length < 2) {
    return {
      data: null,
      error: 'Query must be at least 2 characters.',
      status: 400,
    };
  }

  const url = `http://localhost:8000/api/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        data: null,
        error: `Error: ${response.status}`,
        status: response.status,
      };
    }
    const data = await response.json();
    return { data, error: null, status: response.status };
  } catch (err) {
    return {
      data: null,
      error: 'Network error',
      status: 500,
    };
  }
}
