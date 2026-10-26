import { createApp, h } from 'vue'
// import './style.css'
import App from './App.vue'
import singleSpaVue from 'single-spa-vue';

// createApp(App).mount('#app')

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    }
  },
  handleInstance(/*app*/) {

  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;