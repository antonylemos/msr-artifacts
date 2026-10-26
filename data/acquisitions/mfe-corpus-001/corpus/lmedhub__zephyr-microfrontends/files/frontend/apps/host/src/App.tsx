import React, { Suspense, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import VueShortener from "./utils/VueShortener";

const RemoteHeader = React.lazy(() => import("remote_header/Header"));
const RemoteFooter = React.lazy(() => import("remote_footer/Footer"));

const App = () => {
  return (
    <div className="container">
      <Suspense fallback={<div>Loading Header...</div>}>
        <RemoteHeader />
      </Suspense>

      <main>
        <VueShortener />
      </main>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <RemoteFooter />
      </Suspense>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
