// Standalone bootstrap — used when running react-mfe-1 directly on port 3001.
// When loaded via the host, mount.js is used instead of this file.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
