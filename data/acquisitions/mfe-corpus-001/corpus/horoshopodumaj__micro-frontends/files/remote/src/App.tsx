import React from "react";
import ReactDOM from "react-dom/client";
//@ts-ignore
import "./index.css";
import RemoteContent from "./RemoteContent";

const App = () => (
  <div className="container">
    <RemoteContent/>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);