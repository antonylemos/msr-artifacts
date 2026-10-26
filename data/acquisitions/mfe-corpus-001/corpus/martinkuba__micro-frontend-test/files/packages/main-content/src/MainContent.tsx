import React, { useState, useEffect } from 'react';
import { LogLevel } from '@grafana/faro-web-sdk';
import { initFaro, getFaro } from './faro';

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: '1rem',
  },
  subtitle: {
    color: '#666',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    border: '1px solid #e9ecef',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '0.5rem',
  },
  cardText: {
    color: '#666',
    lineHeight: 1.5,
  },
  button: {
    backgroundColor: '#4a90d9',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  buttonError: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    marginRight: '0.5rem',
  },
  buttonEvent: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    marginRight: '0.5rem',
  },
  buttonLog: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  buttonConsole: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  counter: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#e8f4fd',
    borderRadius: '6px',
    color: '#1a5a96',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
    marginTop: '1rem',
  },
};

export default function MainContent() {
  const [count, setCount] = useState(0);

  // Initialize Faro for this micro frontend
  useEffect(() => {
    initFaro();
  }, []);

  const handleTriggerError = () => {
    const faro = getFaro();
    if (!faro) return;
    
    try {
      throw new Error('Test error from main-content micro frontend');
    } catch (error) {
      faro.api.pushError(error as Error);
      // console.error('[main-content] Error pushed to Faro:', error);
    }
  };

  const handlePushEvent = () => {
    const faro = getFaro();
    if (!faro) return;

    faro.api.pushEvent('button_clicked', {
      component: 'main-content',
      action: 'test_event',
      timestamp: new Date().toISOString(),
    });
    // console.log('[main-content] Custom event pushed to Faro');
  };

  const handlePushLog = () => {
    const faro = getFaro();
    if (!faro) return;

    faro.api.pushLog(['Test log message from main-content micro frontend'], {
      level: LogLevel.INFO,
      context: {
        component: 'MainContent',
        source: 'micro-frontend',
      },
    });
    // console.log('[main-content] Log pushed to Faro');
  };

  const handleConsoleLog = () => {
    const salt = Math.random().toString(36).substring(2, 10);
    console.info(`[main-content] Test console message (salt: ${salt})`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Main Content Area</h2>
      <p style={styles.subtitle}>
        This component is loaded from the <strong>main-content</strong> micro frontend 
        via Module Federation. It runs independently but shares React with the shell.
      </p>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Faro SDK Testing</h3>
        <p style={styles.cardText}>
          Use these buttons to test Faro telemetry collection from this micro frontend.
        </p>
        <div style={styles.buttonGroup}>
          <button 
            style={styles.buttonError}
            onClick={handleTriggerError}
          >
            Trigger Error
          </button>
          <button 
            style={styles.buttonEvent}
            onClick={handlePushEvent}
          >
            Push Event
          </button>
          <button 
            style={styles.buttonLog}
            onClick={handlePushLog}
          >
            Push Log
          </button>
          <button 
            style={styles.buttonConsole}
            onClick={handleConsoleLog}
          >
            Console Log
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Interactive Demo</h3>
        <p style={styles.cardText}>
          Click the button below to demonstrate that this micro frontend has its own state management.
        </p>
        <button 
          style={styles.button}
          onClick={() => setCount(c => c + 1)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a7fc8'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a90d9'}
        >
          Click me!
        </button>
        <div style={styles.counter}>
          Button clicked: <strong>{count}</strong> times
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>About This Setup</h3>
        <p style={styles.cardText}>
          This micro frontend architecture uses Webpack Module Federation to dynamically 
          load remote components at runtime. Each micro frontend is built as a separate 
          bundle but shares common dependencies like React to avoid duplication.
        </p>
      </div>
    </div>
  );
}

