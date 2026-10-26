import React from 'react';
import { Suspense } from 'react';
const RemoteApp = React.lazy(() => import("RemoteApp/microfrontend1"));

function Application1() {
  return (
    <div>
      <h1>Host App</h1>

      <Suspense fallback={<div>Loading Remote...</div>}>
        <RemoteApp />
      </Suspense>
    </div>
  )
}

export default Application1