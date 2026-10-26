import React, { Suspense, lazy, useState, useEffect } from 'react';

const RemoteA = lazy(() => import('remote_a/App'));
const RemoteB = lazy(() => import('remote_b/App'));

function ShareDump() {
  const [dump, setDump] = useState(null);
  useEffect(() => {
    try {
      const cache = globalThis.__mf_module_cache__;
      const ownersSym = Symbol.for('module-federation.shared-cache-owners');
      const owners = cache?.[ownersSym] ?? cache?.sharedCacheOwners ?? null;
      const share = cache?.share ?? cache?.shared ?? null;
      const out = {
        hasCache: !!cache,
        cacheKeys: cache ? Object.keys(cache) : [],
        owners: owners
          ? typeof owners === 'object'
            ? JSON.parse(JSON.stringify(owners, (_k, v) => (typeof v === 'function' ? '[fn]' : v)))
            : String(owners)
          : null,
        shareSummary: null,
      };
      if (share && typeof share === 'object') {
        out.shareSummary = {};
        for (const [pkg, versions] of Object.entries(share)) {
          out.shareSummary[pkg] = {};
          if (versions && typeof versions === 'object') {
            for (const [ver, info] of Object.entries(versions)) {
              out.shareSummary[pkg][ver] = {
                from: info?.from ?? info?.lib ?? info?.shareConfig?.from,
                loaded: info?.loaded,
                useIn: info?.useIn,
                get: typeof info?.get,
                version: info?.version ?? ver,
              };
            }
          }
        }
      }
      // Also try FederationInstance / runtime globals
      const fed = globalThis.__FEDERATION__;
      out.federationKeys = fed ? Object.keys(fed) : [];
      setDump(out);
      // expose for playwright
      globalThis.__SKEW_DUMP__ = out;
    } catch (e) {
      setDump({ error: String(e) });
      globalThis.__SKEW_DUMP__ = { error: String(e) };
    }
  }, []);
  return (
    <pre id="share-dump" style={{ fontSize: 11, background: '#111', color: '#0f0', padding: 8, overflow: 'auto', maxHeight: 240 }}>
      {dump ? JSON.stringify(dump, null, 2) : 'collecting share dump...'}
    </pre>
  );
}

export default function App() {
  const [aErr, setAErr] = useState(null);
  const [bErr, setBErr] = useState(null);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h1>Host (react {React.version})</h1>
      <p>Mounting remotes with shared React singletons (^19.2.4, version-first).</p>
      <ShareDump />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <section style={{ border: '2px solid #08f', padding: 12 }} id="remote-a-slot">
          <h2>remote_a slot</h2>
          {aErr ? (
            <pre id="remote-a-error" style={{ color: 'red' }}>{String(aErr)}</pre>
          ) : (
            <ErrorBoundary name="remote_a" onError={setAErr}>
              <Suspense fallback={<div>loading remote_a...</div>}>
                <RemoteA />
              </Suspense>
            </ErrorBoundary>
          )}
        </section>
        <section style={{ border: '2px solid #f80', padding: 12 }} id="remote-b-slot">
          <h2>remote_b slot</h2>
          {bErr ? (
            <pre id="remote-b-error" style={{ color: 'red' }}>{String(bErr)}</pre>
          ) : (
            <ErrorBoundary name="remote_b" onError={setBErr}>
              <Suspense fallback={<div>loading remote_b...</div>}>
                <RemoteB />
              </Suspense>
            </ErrorBoundary>
          )}
        </section>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error(`[ErrorBoundary:${this.props.name}]`, error, info);
    this.props.onError?.(error?.stack || error?.message || String(error));
    globalThis.__SKEW_CRASHES__ = globalThis.__SKEW_CRASHES__ || {};
    globalThis.__SKEW_CRASHES__[this.props.name] = {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    };
  }
  render() {
    if (this.state.error) {
      return <pre style={{ color: 'red' }}>{String(this.state.error)}</pre>;
    }
    return this.props.children;
  }
}
