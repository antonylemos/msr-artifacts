import { useState } from "react";

export default function CounterWidget() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button style={btn} onClick={() => setCount(count - 1)}>
        −
      </button>

      <strong style={{ fontSize: 24 }}>{count}</strong>

      <button style={btn} onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

const btn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};
