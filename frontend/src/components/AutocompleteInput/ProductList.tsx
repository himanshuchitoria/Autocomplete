import React from 'react';
import { Product } from '../../types/product';
import '../../components/AutocompleteInput/styles.css';

interface ProductListProps {
  products: Product[];
  onSelect: (title: string) => void;
  skip: number;
  limit: number;
  total: number;
  onPaginate: (direction: 'prev' | 'next') => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onSelect,
  skip,
  limit,
  total,
  onPaginate,
}) => {
  const hasPrev = skip > 0;
  // Disable Next if on or past the last page, or if there are no results
  const hasNext = skip + limit < total && products.length > 0;

  // Calculate current page info
  const start = total === 0 ? 0 : skip + 1;
  const end = Math.min(skip + products.length, total);

  return (
    <div className="autocomplete-dropdown" role="listbox">
      {products.length === 0 ? (
        <div className="autocomplete-no-results">No results found.</div>
      ) : (
        <>
          <ul className="autocomplete-list">
            {products.map((product) => (
              <li
                key={product.id}
                className="autocomplete-list-item"
                role="option"
                tabIndex={0}
                onMouseDown={() => onSelect(product.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelect(product.title);
                }}
                aria-label={`${product.title} (${product.brand})`}
              >
                <span className="autocomplete-product-title">{product.title}</span>
                <span className="autocomplete-product-brand">({product.brand})</span>
                <span className="autocomplete-product-price">${product.price}</span>
              </li>
            ))}
          </ul>
          <div className="autocomplete-pagination">
            <button
              className="autocomplete-pagination-btn"
              onClick={() => onPaginate('prev')}
              disabled={!hasPrev}
              aria-label="Previous page"
            >
              Prev
            </button>
            <span className="autocomplete-pagination-info">
              {start}-{end} of {total}
            </span>
            <button
              className="autocomplete-pagination-btn"
              onClick={() => onPaginate('next')}
              disabled={!hasNext}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
