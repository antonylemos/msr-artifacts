// React MFE 2 — User Greeting
//
// A different feature from MFE 1 to show that each MFE is independent.
// The user types their name and receives a personalised greeting.
// This runs on port 3002 and can be loaded by the host or standalone.
//
// State is managed via Redux Toolkit (greetingSlice).

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName, submitName, resetGreeting } from './store/greetingSlice';

export default function App() {
  const { name, submitted } = useSelector((state) => state.greeting);
  const dispatch            = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) dispatch(submitName());
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚛️ React MFE 2 — Greeting</h2>
      <p style={styles.desc}>
        This is <strong>React MFE 2</strong>, running on port <code>3002</code>.
        It is a completely separate app from React MFE 1.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter your name…"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            autoFocus
          />
          <button style={styles.submitBtn} type="submit">
            Say Hello
          </button>
        </form>
      ) : (
        <div style={styles.result}>
          <p style={styles.greeting}>
            Hello, <strong>{name}</strong>! 👋
          </p>
          <p style={styles.note}>This greeting was rendered by React MFE 2.</p>
          <button
            style={styles.resetBtn}
            onClick={() => dispatch(resetGreeting())}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container:  { padding: 24, fontFamily: 'sans-serif' },
  title:      { color: '#61dafb', marginBottom: 8 },
  desc:       { color: '#555', marginBottom: 24, lineHeight: 1.6 },
  form:       { display: 'flex', gap: 10, maxWidth: 400 },
  input: {
    flex: 1, padding: '9px 12px', fontSize: 15,
    border: '2px solid #dee2e6', borderRadius: 6, outline: 'none',
  },
  submitBtn: {
    padding: '9px 18px', background: '#61dafb', border: 'none',
    borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600,
  },
  result:     { padding: 20, background: '#f0f8ff', borderRadius: 8 },
  greeting:   { fontSize: 22, marginBottom: 8, color: '#212529' },
  note:       { color: '#6c757d', fontSize: 13, marginBottom: 14 },
  resetBtn: {
    padding: '7px 16px', cursor: 'pointer', border: '1px solid #ccc',
    background: '#f1f1f1', borderRadius: 6, fontSize: 14,
  },
};
