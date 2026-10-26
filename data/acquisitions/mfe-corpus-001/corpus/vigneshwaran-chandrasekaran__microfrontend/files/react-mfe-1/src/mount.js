// mount.js — Entry point for the host app to load this MFE.
//
// The host calls: import('reactMfe1/mount').then(({ default: mount }) => mount(element))
// We receive a DOM element and render our React app into it.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const mount = (element) => {
  const root = ReactDOM.createRoot(element);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default mount;
