import React, { Suspense, lazy } from 'react';

const RemoteC = lazy(() => import('remote_c/App'));

export default function App() {
  return (
    <div data-app="remote_a">
      <h3>remote_a (react {React.version})</h3>
      <p>Nested host mounting remote_c</p>
      <div style={{ border: '1px dashed #0a0', padding: 8 }} id="remote-c-slot">
        <Suspense fallback={<div>loading remote_c...</div>}>
          <RemoteC />
        </Suspense>
      </div>
    </div>
  );
}
