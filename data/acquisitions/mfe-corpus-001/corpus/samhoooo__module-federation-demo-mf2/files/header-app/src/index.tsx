import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('app');
if (!container) {
  throw new Error('Root element #app not found');
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App title="Header (MF2)" />
  </React.StrictMode>
);
