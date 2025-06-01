
import React from 'react';


interface LoadingProps {
  size?: number;  
  color?: string; 
  message?: string; 
}

const Loading: React.FC<LoadingProps> = ({
  size = 28,
  color = '#1976d2',
  message = 'Loading...',
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: size,
      minWidth: size,
    }}
    role="status"
    aria-live="polite"
    aria-label={message}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray="90, 150"
        strokeDashoffset={0}
        strokeLinecap="round"
        style={{
          animation: 'autocomplete-spinner-rotate 1s linear infinite',
        }}
      />
    </svg>
    <span style={{
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      border: 0,
    }}>
      {message}
    </span>
  </div>
);

export default Loading;
