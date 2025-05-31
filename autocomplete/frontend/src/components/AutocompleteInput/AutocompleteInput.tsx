

import React, { useState, useRef, useEffect } from 'react';
import ProductList from './ProductList';
import LoadingSpinner from './LoadingSpinner';
import useDebounce from '../../hooks/useDebounce';
import useProductSearch from '../../hooks/useProductSearch';
import '../../components/AutocompleteInput/styles.css';

const MIN_QUERY_LENGTH = 2;

const AutocompleteInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [skip, setSkip] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const {
    products,
    loading,
    error,
    total,
    limit,
    fetchProducts,
  } = useProductSearch(debouncedQuery, skip);

  // Show dropdown only if we have results and input is focused
  useEffect(() => {
    if (debouncedQuery.length >= MIN_QUERY_LENGTH && products.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedQuery, products]);

  // Reset pagination when query changes
  useEffect(() => {
    setSkip(0);
  }, [debouncedQuery]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectProduct = (title: string) => {
    setQuery(title);
    setShowDropdown(false);
  };

  const handlePagination = (direction: 'prev' | 'next') => {
    if (direction === 'prev') setSkip((prev) => Math.max(prev - limit, 0));
    if (direction === 'next') setSkip((prev) => prev + limit);
  };

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        className="autocomplete-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
        autoComplete="off"
        onFocus={() => {
          if (products.length > 0) setShowDropdown(true);
        }}
      />
      {loading && <LoadingSpinner />}
      {showDropdown && (
        <ProductList
          products={products}
          onSelect={handleSelectProduct}
          skip={skip}
          limit={limit}
          total={total}
          onPaginate={handlePagination}
        />
      )}
      {error && <div className="autocomplete-error">{error}</div>}
    </div>
  );
};

export default AutocompleteInput;
