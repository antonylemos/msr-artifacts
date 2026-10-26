import ReactDOM from "react-dom/client";
import AlertDashboard from "./components/AlertDashboard";

const App = () => (
  <AlertDashboard />
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
