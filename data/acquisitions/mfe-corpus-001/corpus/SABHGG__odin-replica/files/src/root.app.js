import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err) {
    return <div>Error en Odin: {err.message}</div>;
  },
  domElementGetter: () => document.getElementById('root')
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;

// Exportamos todo el objeto para el import dinámico
export default reactLifecycles;