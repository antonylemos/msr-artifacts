import React, { Suspense } from 'react';
const RemoteApp = React.lazy(() => import('app2/RemoteApp'));

export default function App() {
  return (
    <div style={{fontFamily:'Arial, sans-serif', padding:20}}>
      <h1>🏠 Host App (app1)</h1>
      <Suspense fallback={<div>Loading remote...</div>}>
        <RemoteApp />
      </Suspense>
    </div>
  );
}
