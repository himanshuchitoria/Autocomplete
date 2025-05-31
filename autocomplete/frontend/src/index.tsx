// src/index.tsx

/**
 * Entry point for the Product Autocomplete React app.
 * 
 * Features (per assignment PDF and React 18 best practices):
 * - Uses React 18's createRoot API for rendering
 * - Imports global CSS
 * - Renders the App component inside the #root div
 * - StrictMode enabled for highlighting potential problems
 * 
 * References:
 * - https://dummyjson.com/products/search?q=phone
 * - Assignment PDF[2]
 * - React 18 docs and examples[4][5][7]
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Find the root element in the HTML
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
