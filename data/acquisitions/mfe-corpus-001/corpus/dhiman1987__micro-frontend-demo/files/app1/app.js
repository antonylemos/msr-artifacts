class HelloApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<h2>Hello from App 1 👋</h2>';
  }
}
customElements.define('hello-app', HelloApp);
