import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  fallbackUI?: ReactNode;
  onRetry?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return class ErrorBoundary extends Component<
    P & ErrorBoundaryProps,
    ErrorBoundaryState
  > {
    constructor(props: P & ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      // You can also log the error to an error reporting service
      console.error("Caught an error:", error, errorInfo);
      this.setState({ errorInfo });
    }

    handleRetry = () => {
      this.setState({ hasError: false, error: null, errorInfo: null }, () => {
        if (this.props.onRetry) {
          this.props.onRetry();
        }
      });
    };

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div>
            {this.props.fallbackUI ? (
              this.props.fallbackUI
            ) : (
              <div>
                <h2>Something went wrong.</h2>
                <p>Error: {this.state.error?.message}</p>
              </div>
            )}
            {this.props.onRetry && (
              <button onClick={this.handleRetry}>Try again</button>
            )}
          </div>
        );
      }

      // Render the wrapped component if there are no errors
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withErrorBoundary;
