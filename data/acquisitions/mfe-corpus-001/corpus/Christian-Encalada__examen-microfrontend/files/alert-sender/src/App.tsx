import ReactDOM from "react-dom/client";
import AlertSender from "./components/AlertSender";

const App = () => (
  <AlertSender />
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
