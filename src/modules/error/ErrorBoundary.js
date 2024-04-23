// ErrorBoundary.js
import React, { Component } from 'react';
import CustomErrorPage from './CustomErrorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the custom error page
      return <CustomErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
