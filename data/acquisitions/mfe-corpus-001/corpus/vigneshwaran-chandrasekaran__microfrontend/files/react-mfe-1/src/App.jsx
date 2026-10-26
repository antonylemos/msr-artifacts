// React MFE 1 — Counter
//
// A simple counter component. Demonstrates a basic interactive React MFE.
// This component is rendered both when the user visits port 3001 directly
// and when the host loads it via Module Federation.
//
// State is managed via Redux Toolkit (counterSlice).

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './store/counterSlice';

export default function App() {
  const count    = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚛️ React MFE 1 — Counter</h2>
      <p style={styles.desc}>
        This is <strong>React MFE 1</strong>, running on port <code>3001</code>.
        It was loaded by the host using Webpack Module Federation.
      </p>

      <div style={styles.counterRow}>
        <button style={styles.btn} onClick={() => dispatch(decrement())}>−</button>
        <span style={styles.count}>{count}</span>
        <button style={styles.btn} onClick={() => dispatch(increment())}>+</button>
      </div>

      <button style={styles.resetBtn} onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

const styles = {
  container: { padding: 24, fontFamily: 'sans-serif' },
  title:     { color: '#61dafb', marginBottom: 8 },
  desc:      { color: '#555', marginBottom: 28, lineHeight: 1.6 },
  counterRow:{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 16 },
  btn: {
    width: 44, height: 44, fontSize: 22, cursor: 'pointer',
    borderRadius: 8, border: '2px solid #61dafb', background: '#fff',
    color: '#333', fontWeight: 'bold',
  },
  count:     { fontSize: 40, fontWeight: 700, minWidth: 64, textAlign: 'center' },
  resetBtn:  {
    padding: '7px 18px', cursor: 'pointer', border: '1px solid #ccc',
    background: '#f1f1f1', borderRadius: 6, fontSize: 14,
  },
};
