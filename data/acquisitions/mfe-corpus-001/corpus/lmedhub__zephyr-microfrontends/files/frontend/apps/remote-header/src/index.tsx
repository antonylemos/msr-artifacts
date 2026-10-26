import ReactDOM from "react-dom/client";
import Header from "./Header";

const App = () => (
  <div>
    <Header />
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Header Development Mode</h2>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
