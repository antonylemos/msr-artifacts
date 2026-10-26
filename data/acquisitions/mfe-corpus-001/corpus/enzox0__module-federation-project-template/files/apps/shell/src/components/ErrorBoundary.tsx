import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const moduleName = this.props.moduleName || 'Module';
      const isNetworkError = this.state.error?.message?.includes('fetch') || 
                            this.state.error?.message?.includes('404');

      return (
        <div style={{
          padding: '2rem',
          margin: '2rem',
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#856404', marginBottom: '1rem' }}>
            {moduleName} Unavailable
          </h2>
          {isNetworkError ? (
            <>
              <p style={{ color: '#856404', marginBottom: '1rem' }}>
                The {moduleName.toLowerCase()} is not running or cannot be reached.
              </p>
              <p style={{ color: '#856404', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Make sure all microfrontends are running with <code>pnpm dev</code>
              </p>
            </>
          ) : (
            <p style={{ color: '#856404', marginBottom: '1.5rem' }}>
              An error occurred while loading the {moduleName.toLowerCase()}.
            </p>
          )}
          <button
            onClick={this.handleRetry}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#ffc107',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e0a800';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffc107';
            }}
          >
            Retry
          </button>
          {this.state.error && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#856404' }}>
                Error Details
              </summary>
              <pre style={{
                marginTop: '0.5rem',
                padding: '1rem',
                background: '#fff',
                border: '1px solid #ffc107',
                borderRadius: '4px',
                fontSize: '0.85rem',
                overflow: 'auto'
              }}>
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
