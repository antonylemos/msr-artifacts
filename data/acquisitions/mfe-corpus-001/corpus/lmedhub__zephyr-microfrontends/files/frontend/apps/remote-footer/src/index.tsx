import ReactDOM from "react-dom/client";
import Footer from "./Footer";

const App = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, padding: "2rem", textAlign: "center" }}>
      <h2>Footer Development Mode</h2>
    </div>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
