// src/utils/constants.ts

/**
 * App Constants
 * 
 * This file centralizes all constant values used throughout the frontend,
 * as recommended for clean, modular codebases (per assignment PDF).
 * 
 * API endpoints, default pagination values, and minimum query length
 * are all defined here for easy maintainability.
 * 
 * References:
 * - API: https://dummyjson.com/products/search?q=phone
 * - Pagination: limit, skip
 * - Minimum query length: 2
 */

export const API_BASE_URL = 'https://dummyjson.com';

export const PRODUCT_SEARCH_ENDPOINT = '/products/search';

export const DEFAULT_LIMIT = 10;

export const MIN_QUERY_LENGTH = 2;
