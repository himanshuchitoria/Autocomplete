// src/types/product.ts

/**
 * Product TypeScript Interfaces
 * 
 * These interfaces define the expected structure for product data
 * as returned by the DummyJSON API, per assignment requirements and
 * API documentation: https://dummyjson.com/docs/products
 * 
 * Each product has:
 * - id
 * - title
 * - brand
 * - category
 * - price
 * 
 * The API response for a search includes:
 * - products: Product[]
 * - total: number
 * - skip: number
 * - limit: number
 */

export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  // Optionally, you can add:
  // description?: string;
  // thumbnail?: string;
  // images?: string[];
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
