import ReactDOM from "react-dom/client";
import "./index.css";
import View from "./components/view";


const App = () => {
  return (
    <div className="characters-grid-container">
      <View />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
