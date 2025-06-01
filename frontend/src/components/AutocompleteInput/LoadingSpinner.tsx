import React from 'react';
import './styles.css';

interface LoadingSpinnerProps {
  size?: number;   // Diameter in pixels
  color?: string;  // Spinner color
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = '#1976d2',
}) => (
  <div
    className="autocomplete-loading-spinner"
    style={{ width: size, height: size }}
    role="status"
    aria-label="Loading"
  >
    <svg
      className="spinner-svg"
      viewBox="0 0 50 50"
      style={{ width: size, height: size, display: 'block' }}
      aria-hidden="true"
    >
      <circle
        className="autocomplete-spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
    <span className="visually-hidden">Loading...</span>
  </div>
);

export default LoadingSpinner;
