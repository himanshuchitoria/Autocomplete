// src/services/productService.ts

import { apiGet, ApiResponse } from './api';
import { Product, ProductSearchResponse } from '../types/product';

/**
 * Product Service
 * Handles product search API calls using the external API:
 * https://dummyjson.com/products/search?q=phone
 *
 * Features (per assignment and best practices):
 * - Searches products by query, paginated with limit and skip
 * - Only triggers search for queries with at least 2 characters
 * - Uses centralized API client (api.ts)
 * - Returns typed results and error handling
 * - Modular, reusable, and ready for integration in hooks/components
 */

interface SearchProductsParams {
  query: string;
  limit?: number;
  skip?: number;
}

/**
 * Search products from the dummyjson API.
 * 
 * @param params - Search parameters (query, limit, skip)
 * @returns ApiResponse<ProductSearchResponse>
 *
 * API Reference:
 * https://dummyjson.com/products/search?q=phone&limit=10&skip=0
 */
export async function searchProducts({
  query,
  limit = 10,
  skip = 0,
}: SearchProductsParams): Promise<ApiResponse<ProductSearchResponse>> {
  // Only search if query is at least 2 characters
  if (query.length < 2) {
    return {
      data: null,
      error: 'Query must be at least 2 characters.',
      status: 400,
    };
  }

  return apiGet<ProductSearchResponse>(
    '/products/search',
    {
      q: query,
      limit,
      skip,
    }
  );
}
