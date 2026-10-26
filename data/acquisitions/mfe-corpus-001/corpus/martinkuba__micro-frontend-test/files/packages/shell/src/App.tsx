import React, { Suspense } from 'react';
import { LogLevel } from '@grafana/faro-web-sdk';
import { getFaro } from './faro';

// Lazy load the remote components via Module Federation
const MainContent = React.lazy(() => import('mainContent/MainContent'));
// const Sidebar = React.lazy(() => import('sidebar/Sidebar'));

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#1a1a2e',
    color: '#eee',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  main: {
    display: 'flex',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#fff',
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#f8f9fa',
    borderLeft: '1px solid #e9ecef',
    padding: '1.5rem',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    color: '#666',
  },
  error: {
    padding: '1rem',
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '4px',
    color: '#c00',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  buttonError: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  buttonEvent: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  buttonLog: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  buttonConsole: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
};

function LoadingFallback({ name }: { name: string }) {
  return <div style={styles.loading}>Loading {name}...</div>;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.error}>
          <strong>Failed to load {this.props.name}</strong>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const handleTriggerError = () => {
    const faro = getFaro();
    if (!faro) return;
    
    try {
      throw new Error('Test error from shell app');
    } catch (error) {
      faro.api.pushError(error as Error);
      // console.log('[shell] Error pushed to Faro');
    }
  };

  const handlePushEvent = () => {
    const faro = getFaro();
    if (!faro) return;

    faro.api.pushEvent('button_clicked', {
      component: 'shell',
      action: 'test_event',
      timestamp: new Date().toISOString(),
    });
    // console.log('[shell] Custom event pushed to Faro');
  };

  const handlePushLog = () => {
    const faro = getFaro();
    if (!faro) return;

    faro.api.pushLog(['Test log message from shell app'], {
      level: LogLevel.INFO,
      context: {
        component: 'Shell',
        source: 'host-app',
      },
    });
    // console.log('[shell] Log pushed to Faro');
  };

  const handleConsoleLog = () => {
    const salt = Math.random().toString(36).substring(2, 10);
    console.info(`[shell] Test console message (salt: ${salt})`);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Micro Frontend Shell</h1>
          <div style={styles.buttonGroup}>
            <button style={styles.buttonError} onClick={handleTriggerError}>
              Trigger Error
            </button>
            <button style={styles.buttonEvent} onClick={handlePushEvent}>
              Push Event
            </button>
            <button style={styles.buttonLog} onClick={handlePushLog}>
              Push Log
            </button>
            <button style={styles.buttonConsole} onClick={handleConsoleLog}>
              Console Log
            </button>
          </div>
        </div>
      </header>
      
      <main style={styles.main}>
        <section style={styles.content}>
          <ErrorBoundary name="Main Content">
            <Suspense fallback={<LoadingFallback name="Main Content" />}>
              <MainContent />
            </Suspense>
          </ErrorBoundary>
        </section>
        
        {/* Sidebar hidden for now
        <aside style={styles.sidebar}>
          <ErrorBoundary name="Sidebar">
            <Suspense fallback={<LoadingFallback name="Sidebar" />}>
              <Sidebar />
            </Suspense>
          </ErrorBoundary>
        </aside>
        */}
      </main>
    </div>
  );
}

