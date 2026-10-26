import React from "react";
import ReactDOM from "react-dom/client";
import RemoteContent from 'remote/RemoteContent'

//@ts-ignore
import "./index.css";

const App = () => (
  <div className="container">
    <nav className="sidebar">
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Help</li>
        <li>Exit</li>
      </ul>
    </nav>
    <section className="content">
      <RemoteContent/>
    </section>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);