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
  // Use a ref for the whole container, not just the input
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const {
    products,
    loading,
    error,
    total,
    limit,
    fetchProducts,
  } = useProductSearch(debouncedQuery, skip);

  // Dropdown effect: keep open while loading, or if there are results, or if query is valid (for "No results found")
  useEffect(() => {
    if (
      debouncedQuery.length >= MIN_QUERY_LENGTH &&
      (products.length > 0 || loading || (!loading && !error))
    ) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedQuery, products, loading, error]);

  // Reset pagination when query changes
  useEffect(() => {
    setSkip(0);
  }, [debouncedQuery]);

  // Hide dropdown on outside click (use containerRef)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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

  // Prevent skip from exceeding total so Next button works correctly
  const handlePagination = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSkip((prev) => Math.max(prev - limit, 0));
    }
    if (direction === 'next') {
      setSkip((prev) => {
        if (prev + limit >= total) return prev; // Don't go past last page
        return prev + limit;
      });
    }
  };

  return (
    <div className="autocomplete-container" ref={containerRef}>
      <input
        className="autocomplete-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
        autoComplete="off"
        onFocus={() => {
          if (
            products.length > 0 ||
            loading ||
            (!loading && !error && debouncedQuery.length >= MIN_QUERY_LENGTH)
          ) {
            setShowDropdown(true);
          }
        }}
      />
      {loading && <LoadingSpinner />}
      {showDropdown && (
        <>
          {products.length > 0 ? (
            <ProductList
              products={products}
              onSelect={handleSelectProduct}
              skip={skip}
              limit={limit}
              total={total}
              onPaginate={handlePagination}
            />
          ) : (
            !loading &&
            !error &&
            debouncedQuery.length >= MIN_QUERY_LENGTH && (
              <div className="autocomplete-dropdown">
                <div className="autocomplete-no-results">No results found</div>
              </div>
            )
          )}
        </>
      )}
      {error && <div className="autocomplete-error">{error}</div>}
    </div>
  );
};

export default AutocompleteInput;
