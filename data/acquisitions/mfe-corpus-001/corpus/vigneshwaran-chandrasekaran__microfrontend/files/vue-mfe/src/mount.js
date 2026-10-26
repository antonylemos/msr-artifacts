// mount.js — Called by the host to render this Vue MFE.
//
// createApp() creates an isolated Vue 3 application instance.
// app.mount(element) renders it into the container element provided by the host.
import { createApp } from 'vue';
import App from './App.vue';

const mount = (element) => {
  const app = createApp(App);
  app.mount(element);
};

export default mount;
