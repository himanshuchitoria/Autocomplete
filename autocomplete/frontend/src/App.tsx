// src/App.tsx

import React from 'react';
import AutocompleteInput from './components/AutocompleteInput';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

/**
 * App Component
 * 
 * This is the main entry point for the frontend application, as described in the assignment PDF[2].
 * 
 * Features included (per assignment and best practices):
 * - Renders the AutocompleteInput component for product search
 * - Wraps the main UI in an ErrorBoundary for robust error handling
 * - Clean, modular structure for easy extension
 * - Imports global styles
 * 
 * References:
 * - API: https://dummyjson.com/products/search?q=phone
 * - Minimum 2 characters for search, debounced input, pagination, loading indicator, error handling
 */

const App: React.FC = () => (
  <ErrorBoundary>
    <div className="app-container">
      <h1>Product Autocomplete</h1>
      <p className="app-description">
        Start typing a product name or brand (at least 2 characters) to search.
      </p>
      <AutocompleteInput />
    </div>
  </ErrorBoundary>
);

export default App;
