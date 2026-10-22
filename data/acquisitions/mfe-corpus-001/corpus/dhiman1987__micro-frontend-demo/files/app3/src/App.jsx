import { useEffect, useState } from 'react';

function App({ theme = 'dark', maxCount = 10 }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    if (count === maxCount) {
      setCount(0);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div data-theme={theme} className="card">
      <div>
        <button onClick={handleClick}>
          {count !== maxCount && <p>Click {count}</p>}
          {count === maxCount && <p>Hurray! 🎉</p>}
        </button>
      </div>
    </div>
  );
}

export default App;
