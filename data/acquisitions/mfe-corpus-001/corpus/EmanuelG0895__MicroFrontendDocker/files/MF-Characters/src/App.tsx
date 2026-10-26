import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Vista from "./components/vista";

const App = () => <Vista characterId={10} />;

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
