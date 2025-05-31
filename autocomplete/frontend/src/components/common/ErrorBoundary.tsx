// src/components/common/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * ErrorBoundary is a React class component that catches JavaScript errors
 * anywhere in its child component tree, logs those errors, and displays a fallback UI.
 * This prevents the entire app from crashing due to unexpected errors in part of the UI.
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    // For now, we just log to the console.
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided, else default message
      return (
        this.props.fallback || (
          <div style={{ padding: '2rem', color: '#c62828', textAlign: 'center' }}>
            <h2>Something went wrong.</h2>
            <p>We're sorry, but an unexpected error has occurred.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
