class WorldApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<h2>Hello from App 2 🌍</h2>';
  }
}
customElements.define('world-app', WorldApp);