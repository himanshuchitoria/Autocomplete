

import React, { Component, ErrorInfo, ReactNode } from 'react';


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
    // log the error
    // For now, we just log to the console.
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      //custom fallback ui
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
