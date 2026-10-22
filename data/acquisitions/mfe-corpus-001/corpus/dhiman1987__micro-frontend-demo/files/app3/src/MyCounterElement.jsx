import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styles from './App.css?inline'; 

class MyCounterElement extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const theme = this.getAttribute('theme') || 'light';
    const maxCount = parseInt(this.getAttribute('maxCount') || '10', 10);

    const container = document.createElement('div');
    // Inject CSS into shadow DOM
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    shadow.appendChild(styleTag);
    shadow.appendChild(container);

    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <App theme={theme} maxCount={maxCount} />
      </React.StrictMode>
    );
  }
}

customElements.define('my-counter-app', MyCounterElement);
