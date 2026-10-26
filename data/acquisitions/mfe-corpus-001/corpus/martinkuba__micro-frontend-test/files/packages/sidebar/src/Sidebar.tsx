import React, { useEffect } from 'react';
import { initFaro, getFaro } from './faro';

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1a2e',
    marginBottom: '0.5rem',
  },
  section: {
    borderBottom: '1px solid #e9ecef',
    paddingBottom: '1rem',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    padding: '0.5rem 0.75rem',
    marginBottom: '0.25rem',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#555',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  },
  navItemActive: {
    backgroundColor: '#e8f4fd',
    color: '#1a5a96',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#4a90d9',
    color: '#fff',
    fontSize: '0.7rem',
    padding: '0.15rem 0.5rem',
    borderRadius: '10px',
    marginLeft: '0.5rem',
  },
  infoBox: {
    backgroundColor: '#fff',
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    padding: '1rem',
  },
  infoLabel: {
    fontSize: '0.75rem',
    color: '#999',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '0.25rem',
  },
  infoValue: {
    fontSize: '0.9rem',
    color: '#333',
  },
  testButton: {
    backgroundColor: '#6f42c1',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    width: '100%',
  },
};

const navItems = [
  { label: 'Dashboard', active: true },
  { label: 'Analytics', badge: 'New' },
  { label: 'Reports' },
  { label: 'Settings' },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Initialize Faro for this micro frontend
  useEffect(() => {
    initFaro();
  }, []);

  const handleTestFaro = () => {
    const faro = getFaro();
    if (!faro) return;

    faro.api.pushEvent('sidebar_action', {
      component: 'sidebar',
      action: 'test_click',
      activeNav: navItems[activeIndex].label,
    });
    // console.log('[sidebar] Event pushed to Faro');
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h3 style={styles.title}>Navigation</h3>
        <ul style={styles.navList}>
          {navItems.map((item, index) => (
            <li
              key={item.label}
              style={{
                ...styles.navItem,
                ...(activeIndex === index ? styles.navItemActive : {}),
              }}
              onClick={() => setActiveIndex(index)}
              onMouseOver={(e) => {
                if (activeIndex !== index) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseOut={(e) => {
                if (activeIndex !== index) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
              {item.badge && <span style={styles.badge}>{item.badge}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h3 style={styles.title}>Faro Test</h3>
        <button
          style={styles.testButton}
          onClick={handleTestFaro}
        >
          Send Sidebar Event
        </button>
      </div>

      <div>
        <h3 style={styles.title}>Micro Frontend Info</h3>
        <div style={styles.infoBox}>
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={styles.infoLabel}>Source</div>
            <div style={styles.infoValue}>sidebar/remoteEntry.js</div>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={styles.infoLabel}>Faro App</div>
            <div style={styles.infoValue}>mfe-test-sidebar</div>
          </div>
          <div>
            <div style={styles.infoLabel}>Status</div>
            <div style={styles.infoValue}>✓ Loaded via Module Federation</div>
          </div>
        </div>
      </div>
    </div>
  );
}

