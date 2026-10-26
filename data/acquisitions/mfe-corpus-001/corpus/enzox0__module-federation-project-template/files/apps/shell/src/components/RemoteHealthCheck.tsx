import { useEffect, useState } from 'react';

interface RemoteStatus {
  name: string;
  url: string;
  port: number;
  available: boolean;
  checking: boolean;
}

const remotes = [
  { name: 'Auth', url: 'http://localhost:3001/dist/assets/remoteEntry.js', port: 3001 },
  { name: 'Dashboard', url: 'http://localhost:3002/dist/assets/remoteEntry.js', port: 3002 },
  { name: 'Admin', url: 'http://localhost:3003/dist/assets/remoteEntry.js', port: 3003 },
  { name: 'Messaging', url: 'http://localhost:3004/dist/assets/remoteEntry.js', port: 3004 },
];

export default function RemoteHealthCheck() {
  const [statuses, setStatuses] = useState<RemoteStatus[]>(
    remotes.map(r => ({ ...r, available: false, checking: true }))
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const checkRemote = async (remote: typeof remotes[0]): Promise<boolean> => {
    try {
      await fetch(remote.url, { method: 'HEAD', mode: 'no-cors' });
      // With no-cors, we can't read the response, but if it doesn't throw, the server is reachable
      return true;
    } catch {
      // Try a simple fetch to see if we get any response
      try {
        await fetch(remote.url);
        return true;
      } catch {
        return false;
      }
    }
  };

  const checkAllRemotes = async () => {
    setStatuses(prev => prev.map(s => ({ ...s, checking: true })));
    
    const results = await Promise.all(
      remotes.map(async (remote) => ({
        ...remote,
        available: await checkRemote(remote),
        checking: false,
      }))
    );
    
    setStatuses(results);
  };

  useEffect(() => {
    checkAllRemotes();
    const interval = setInterval(checkAllRemotes, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const allAvailable = statuses.every(s => s.available);
  const someUnavailable = statuses.some(s => !s.available && !s.checking);

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      background: '#fff',
      border: `2px solid ${allAvailable ? '#28a745' : someUnavailable ? '#ffc107' : '#6c757d'}`,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      minWidth: '200px',
      maxWidth: '300px'
    }}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '0.75rem 1rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: allAvailable ? '#28a745' : someUnavailable ? '#ffc107' : '#6c757d'
          }} />
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
            Remote Status
          </span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#666' }}>
          {isExpanded ? '▼' : '▶'}
        </span>
      </div>
      
      {isExpanded && (
        <div style={{
          borderTop: '1px solid #e0e0e0',
          padding: '0.75rem 1rem'
        }}>
          {statuses.map((status) => (
            <div
              key={status.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                fontSize: '0.85rem'
              }}
            >
              <span>{status.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#666', fontSize: '0.75rem' }}>
                  :{status.port}
                </span>
                {status.checking ? (
                  <span style={{ color: '#6c757d' }}>⟳</span>
                ) : (
                  <span style={{
                    color: status.available ? '#28a745' : '#dc3545',
                    fontWeight: 'bold'
                  }}>
                    {status.available ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              checkAllRemotes();
            }}
            style={{
              marginTop: '0.5rem',
              width: '100%',
              padding: '0.5rem',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#007bff';
            }}
          >
            Refresh Status
          </button>
        </div>
      )}
    </div>
  );
}
