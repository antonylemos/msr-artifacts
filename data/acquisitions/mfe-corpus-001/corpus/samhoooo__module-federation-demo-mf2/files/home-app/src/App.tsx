import React, { lazy, Suspense } from 'react';
import './App.css';
// Because header-app runs with dts: true, this import is fully typed: TS
// downloaded HeaderApp's generated declarations into ./@mf-types/HeaderApp
// and resolves them via the "HeaderApp/*" path in tsconfig.json. HeaderVariant
// is a real enum defined in header-app/src/App.tsx — this pulls in both its
// type AND its runtime values (Light/Dark) from the remote's own build, with
// no shared package and no hand-written .d.ts. Try passing a bad prop (e.g.
// title={42}, or variant={"blue"}) below — tsc will reject it even though
// header-app is a completely separate build/deploy.
import { HeaderVariant } from 'HeaderApp/Header';

const Header = lazy(() => import('HeaderApp/Header'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header title="Header (MF2)" variant={HeaderVariant.Light} />
      </Suspense>
      <div className="container">Demo home page (MF2)</div>
    </div>
  );
}

export default App;
